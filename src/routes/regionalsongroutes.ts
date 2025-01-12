import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import {
  createRegionalSong,
  getRegionalSongs,
  getRegionalSongByCode,
  updateRegionalSong,
  deleteRegionalSong,
} from '../models/regionalsong'
import { getProvinceByCode } from '../models/province'
import { Prisma } from '@prisma/client';

const API_TAG = ['Regional Songs'];

// Zod schema for RegionalSong
const regionalSongSchema = z.object({
  title: z.string(),
  regionalSongCode: z.string().max(10),
  composer: z.string().optional(),
  provinceCode: z.string(),
});

// Schema for Path Parameters
const paramsSchema = z.object({
  code: z.string().openapi({
    param: {
      name: 'code',
      in: 'path',
    },
    example: 'bengawan',
  }),
});

// Schema for Request Body
const createRegionalSongSchema = z.object({
  title: z.string(),
  regionalSongCode: z.string().max(10),
  composer: z.string().optional(),
  provinceCode: z.string(),
});

// Schema for Query RegionalSong
const queryRegionalSongSchema = z.object({
  title: z.string().optional(),
});

const router = new OpenAPIHono();

// GET /regionalsongs
router.openapi(
  createRoute({
    method: 'get',
    path: '/',
    description: 'Show all Regional Songs',
    request: {
      query: queryRegionalSongSchema,
    },
    responses: {
      200: {
        description: 'Retrieve all regional songs',
      },
    },
    tags: API_TAG,
  }),
  async (c) => {
    const regionalSongs = await getRegionalSongs();
    return c.json({
      status: 'success',
      message: 'Successfully retrieved regional songs',
      data: regionalSongs,
    });
  }
);

// GET /regionalsongs/:code
router.openapi(
  createRoute({
    method: 'get',
    path: '/{code}',
    description: 'Get regional song by regional song code',
    request: {
      params: paramsSchema,
    },
    responses: {
      200: {
        description: 'Retrieve a regional song by code',
      },
      404: {
        description: 'Regional song not found',
      },
    },
    tags: API_TAG,
  }),
  async (c) => {
    const code = c.req.param('code');
    const regionalSong = await getRegionalSongByCode(code);
    if (regionalSong) {
      return c.json({
        status: 'success',
        message: 'Successfully retrieved regional song',
        data: regionalSong,
      });
    }
    return c.json(
      {
        status: 'error',
        message: `Regional song with code ${code} not found`,
      },
      404
    );
  }
);

// POST /regionalsongs
router.openapi(
  createRoute({
    method: 'post',
    path: '/',
    description: 'Create a new regional song entry',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createRegionalSongSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Successfully created regional song',
      },
      400: {
        description: 'Failed to create regional song',
      },
    },
    tags: API_TAG,
  }),
  async (c) => {
    try {
      const data = await c.req.json();
      createRegionalSongSchema.parse(data);

      const province = await getProvinceByCode(data.provinceCode);
      if (!province) {
        return c.json(
          {
            status: 'error',
            message: `Province with code ${data.provinceCode} not found`,
          },
          400
        );
      }

      const newRegionalSong = await createRegionalSong(data);
      return c.json(
        {
          status: 'success',
          message: 'Successfully created regional song',
          data: newRegionalSong,
        },
        201
      );
    } catch (error) {
      return c.json(
        {
          status: 'error',
          message: 'Failed to create regional song',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      );
    }
  }
);

// PATCH /regionalsongs/:code
router.openapi(
  createRoute({
    method: 'patch',
    path: '/{code}',
    description: 'Update an existing regional song',
    request: {
      params: paramsSchema,
      body: {
        content: {
          'application/json': {
            schema: regionalSongSchema.partial(),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Successfully updated regional song',
      },
      404: {
        description: 'Regional song not found',
      },
    },
    tags: API_TAG,
  }),
  async (c) => {
    const code = c.req.param('code');
    try {
      const data = await c.req.json();
      if (data.provinceCode) {
        const province = await getProvinceByCode(data.provinceCode);
        if (!province) {
          return c.json(
            {
              status: 'error',
              message: `Province with code ${data.provinceCode} not found`,
            },
            400
          );
        }
      }

      const updatedRegionalSong = await updateRegionalSong(code, data);
      if (updatedRegionalSong) {
        return c.json({
          status: 'success',
          message: 'Successfully updated regional song',
          data: updatedRegionalSong,
        });
      }
      return c.json(
        {
          status: 'error',
          message: `Regional song with code ${code} not found`,
        },
        404
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                    return c.json(
                      {
                        status: 'error',
                        message: `Regional Song with code ${code} not found`,
                      },
                      404
                    );
                  }
      return c.json(
        {
          status: 'error',
          message: 'Failed to update regional song',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      );
    }
  }
);

// DELETE /regionalsongs/:code
router.openapi(
  createRoute({
    method: 'delete',
    path: '/{code}',
    description: 'Delete a regional song entry',
    request: {
      params: paramsSchema,
    },
    responses: {
      200: {
        description: 'Successfully deleted regional song',
      },
      404: {
        description: 'Regional song not found',
      },
    },
    tags: API_TAG,
  }),
  async (c) => {
    const code = c.req.param('code');
    try {
      const deletedRegionalSong = await deleteRegionalSong(code);
      if (deletedRegionalSong) {
        return c.json({
          status: 'success',
          message: 'Successfully deleted regional song',
          data: deletedRegionalSong,
        });
      }
      return c.json(
        {
          status: 'error',
          message: `Regional song with code ${code} not found`,
        },
        404
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                    return c.json(
                      {
                        status: 'error',
                        message: `Cuisine with code ${code} not found`,
                      },
                      404
                    );
                  }
      return c.json(
        {
          status: 'error',
          message: 'Failed to delete regional song',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      );
    }
  }
);



export default router
