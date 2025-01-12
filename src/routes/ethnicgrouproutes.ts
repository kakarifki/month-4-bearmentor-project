import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import {
  createEthnicGroup,
  getEthnicGroups,
  getEthnicGroupByCode,
  updateEthnicGroup,
  deleteEthnicGroup,
} from '../models/ethnicgroup'
import { getProvinceByCode } from '../models/province'
import { Prisma } from '@prisma/client';

const API_TAG = ['Ethnic Groups'];

// Zod schema for EthnicGroup
const ethnicGroupSchema = z.object({
  name: z.string(),
  ethnicGroupCode: z.string().max(10),
  provinceCode: z.string(),
});

// Schema for Path Parameters
const paramsSchema = z.object({
  code: z.string().openapi({
    param: {
      name: 'code',
      in: 'path',
    },
    example: 'batak',
  }),
});

// Schema for Request Body
const createEthnicGroupSchema = z.object({
  name: z.string(),
  ethnicGroupCode: z.string().max(10),
  provinceCode: z.string(),
});

// Schema for Query EthnicGroup
const queryEthnicGroupSchema = z.object({
  name: z.string().optional(),
});

const router = new OpenAPIHono();

// GET /ethnicgroups
router.openapi(
  createRoute({
    method: 'get',
    path: '/',
    description: 'Show all Ethnic Groups',
    request: {
      query: queryEthnicGroupSchema,
    },
    responses: {
      200: {
        description: 'Retrieve all ethnic groups',
      },
    },
    tags: API_TAG,
  }),
  async (c) => {
    const ethnicGroups = await getEthnicGroups();
    return c.json({
      status: 'success',
      message: 'Successfully retrieved ethnic groups',
      data: ethnicGroups,
    });
  }
);

// GET /ethnicgroups/:code
router.openapi(
  createRoute({
    method: 'get',
    path: '/{code}',
    description: 'Get ethnic group by ethnic group code',
    request: {
      params: paramsSchema,
    },
    responses: {
      200: {
        description: 'Retrieve an ethnic group by code',
      },
      404: {
        description: 'Ethnic group not found',
      },
    },
    tags: API_TAG,
  }),
  async (c) => {
    const code = c.req.param('code');
    const ethnicGroup = await getEthnicGroupByCode(code);
    if (ethnicGroup) {
      return c.json({
        status: 'success',
        message: 'Successfully retrieved ethnic group',
        data: ethnicGroup,
      });
    }
    return c.json(
      {
        status: 'error',
        message: `Ethnic group with code ${code} not found`,
      },
      404
    );
  }
);

// POST /ethnicgroups
router.openapi(
  createRoute({
    method: 'post',
    path: '/',
    description: 'Create a new ethnic group entry',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createEthnicGroupSchema,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Successfully created ethnic group',
      },
      400: {
        description: 'Failed to create ethnic group',
      },
    },
    tags: API_TAG,
  }),
  async (c) => {
    try {
      const data = await c.req.json();
      createEthnicGroupSchema.parse(data);

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

      const newEthnicGroup = await createEthnicGroup(data);
      return c.json(
        {
          status: 'success',
          message: 'Successfully created ethnic group',
          data: newEthnicGroup,
        },
        201
      );
    } catch (error) {
      return c.json(
        {
          status: 'error',
          message: 'Failed to create ethnic group',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      );
    }
  }
);

// PATCH /ethnicgroups/:code
router.openapi(
  createRoute({
    method: 'patch',
    path: '/{code}',
    description: 'Update an existing ethnic group',
    request: {
      params: paramsSchema,
      body: {
        content: {
          'application/json': {
            schema: ethnicGroupSchema.partial(),
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Successfully updated ethnic group',
      },
      404: {
        description: 'Ethnic group not found',
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

      const updatedEthnicGroup = await updateEthnicGroup(code, data);
      if (updatedEthnicGroup) {
        return c.json({
          status: 'success',
          message: 'Successfully updated ethnic group',
          data: updatedEthnicGroup,
        });
      }
      return c.json(
        {
          status: 'error',
          message: `Ethnic group with code ${code} not found`,
        },
        404
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                    return c.json(
                      {
                        status: 'error',
                        message: `Ethnic group with code ${code} not found`,
                      },
                      404
                    );
                  }
      return c.json(
        {
          status: 'error',
          message: 'Failed to update ethnic group',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      );
    }
  }
);

// DELETE /ethnicgroups/:code
router.openapi(
  createRoute({
    method: 'delete',
    path: '/{code}',
    description: 'Delete an ethnic group entry',
    request: {
      params: paramsSchema,
    },
    responses: {
      200: {
        description: 'Successfully deleted ethnic group',
      },
      404: {
        description: 'Ethnic group not found',
      },
    },
    tags: API_TAG,
  }),
  async (c) => {
    const code = c.req.param('code');
    try {
      const deletedEthnicGroup = await deleteEthnicGroup(code);
      if (deletedEthnicGroup) {
        return c.json({
          status: 'success',
          message: 'Successfully deleted ethnic group',
          data: deletedEthnicGroup,
        });
      }
      return c.json(
        {
          status: 'error',
          message: `Ethnic group with code ${code} not found`,
        },
        404
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return c.json(
          {
            status: 'error',
            message: `Ethnic group with code ${code} not found`,
          },
          404
        );
      }
      return c.json(
        {
          status: 'error',
          message: 'Failed to delete ethnic group',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      );
    }
  }
);

export default router;