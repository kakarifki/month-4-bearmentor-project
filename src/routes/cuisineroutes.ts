import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import {
  createCuisine,
  getCuisines,
  getCuisineByCode,
  updateCuisine,
  deleteCuisine,
} from '../models/cuisine'
import { getProvinceByCode } from '../models/province'
import { Prisma } from '@prisma/client';

const API_TAG = ['Cuisines'];

// Zod schema for Cuisine
const cuisineSchema = z.object({
  name: z.string(),
  cuisineCode: z.string().max(10),
  description: z.string().optional(),
  provinceCode: z.string(),
});

// Schema for Path Parameters
const paramsSchema = z.object({
  code: z.string().openapi({
    param: {
      name: 'code',
      in: 'path',
    },
    example: 'rendang',
  }),
});

// Schema for Request Body
const createCuisineSchema = z.object({
  name: z.string(),
  cuisineCode: z.string().max(10),
  description: z.string().optional(),
  provinceCode: z.string(),
});

// Schema for Query Cuisine
const queryCuisineSchema = z.object({
  name: z.string().optional(),
});

const router = new OpenAPIHono();

// GET /cuisines
router.openapi(
  createRoute({
    method: 'get',
    path: '/',
    description: 'Show all Cuisines',
    request: {
      query: queryCuisineSchema,
    },
    responses: {
      200: {
        description: 'Retrieve all cuisines',
      },
      404: {
        description: 'No Cuisines found'
      }
    },
    tags: API_TAG,
  }),
  async (c) => {
    const cuisines = await getCuisines();
    if (cuisines) {
      return c.json({
        status: 'success',
        message: 'Successfully retrieved cuisines',
        data: cuisines,
      });  
    }
    return c.json(
      {
        status: 'error',
        message: `Cuisines not found`,
      },
      404
    );
  }
);

// GET /cuisines/:code
router.openapi(
  createRoute({
    method: 'get',
    path: '/{code}',
    description: 'Get cuisine by cuisine code',
    request: {
      params: paramsSchema,
    },
    responses: {
      200: {
        description: 'Retrieve a cuisine by code',
      },
      404: {
        description: 'Cuisine not found',
      },
    },
    tags: API_TAG,
  }),
  async (c) => {
    const code = c.req.param('code');
    const cuisine = await getCuisineByCode(code);
    if (cuisine) {
      return c.json({
        status: 'success',
        message: 'Successfully retrieved cuisine',
        data: cuisine,
      });
    }
    return c.json(
      {
        status: 'error',
        message: `Cuisine with code ${code} not found`,
      },
      404
    );
  }
);

// POST /cuisines
router.openapi(
  createRoute({
    method: 'post',
    path: '/',
    description: 'Create a new cuisine entry',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createCuisineSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Successfully created cuisine',
      },
      400: {
        description: 'Failed to create cuisine',
      },
    },
    tags: API_TAG,
  }),
  async (c) => {
    try {
      const data = await c.req.json();
      createCuisineSchema.parse(data);

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

      const newCuisine = await createCuisine(data);
      return c.json(
        {
          status: 'success',
          message: 'Successfully created cuisine',
          data: newCuisine,
        },
        201
      );
    } catch (error) {
      return c.json(
        {
          status: 'error',
          message: 'Failed to create cuisine',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      );
    }
  }
);

// PATCH /cuisines/:code
router.openapi(
  createRoute({
    method: 'patch',
    path: '/{code}',
    description: 'Update an existing cuisine',
    request: {
      params: paramsSchema,
      body: {
        content: {
          'application/json': {
            schema: cuisineSchema.partial(),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Successfully updated cuisine',
      },
      404: {
        description: 'Cuisine not found',
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

      const updatedCuisine = await updateCuisine(code, data);
        return c.json({
          status: 'success',
          message: 'Successfully updated cuisine',
          data: updatedCuisine,
        });

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
          message: 'Failed to update cuisine',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      );
    }
  }
);

// DELETE /cuisines/:code
router.openapi(
  createRoute({
    method: 'delete',
    path: '/{code}',
    description: 'Delete a cuisine entry',
    request: {
      params: paramsSchema,
    },
    responses: {
      200: {
        description: 'Successfully deleted cuisine',
      },
      404: {
        description: 'Cuisine not found',
      },
    },
    tags: API_TAG,
  }),
  async (c) => {
    const code = c.req.param('code');
    try {
      const deletedCuisine = await deleteCuisine(code);
        return c.json({
          status: 'success',
          message: 'Successfully deleted cuisine',
          data: deletedCuisine,
        });
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
          message: 'Failed to delete cuisine',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      );
    }
  }
);



export default router
