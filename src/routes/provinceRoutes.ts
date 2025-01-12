import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { Prisma } from '@prisma/client'
import {
    createProvince,
    getProvinces,
    getProvinceByCode,
    updateProvince,
    deleteProvince
} from '../models/province'

const API_TAG = ['Provinces']

// Zod schema for Province
const provinceSchema = z.object({
    name: z.string(),
    provinceCode: z.string().max(10),
    capital_city: z.string(),
    population: z.number().optional(),
    area_size: z.number().optional(),
})

// Zod Schema for params
const paramsSchema = z.object({
  code: z.string().openapi({
    param: {
      name: 'code',
      in: 'path',
    },
    example: 'dki'
  }),
});

// Zod schema for create Province
const createProvinceSchema = z.object({
  name: z.string(),
  provinceCode: z.string().max(10),
  capital_city: z.string(),
  population: z.number().optional(),
  area_size: z.number().optional()
})

// Zod Schema for Query Province
const queryProvinceSchema = z.object({
  name: z.string().optional(),
  capital_city: z.string().optional()
})


const router = new OpenAPIHono()

// GET all Provinces

router.openapi(
  createRoute({
    method: "get",
    path: "/",
    description: "Show All Province in Indonesia",
    request: {
      query: queryProvinceSchema
    },
    responses: {
      200: {
        description: 'Retrieve all province'
      },
    },
    tags: API_TAG
  }),
  async (c) => {
    const provinces = await getProvinces();
    return c.json({
      status: 'success',
      message: 'Successfully retrieved provinces',
      data: provinces
    })
  }
);

// Get Province by code
router.openapi(
  createRoute({
    method: "get",
    path: "/{code}",
    description: 'Show Province by Province Code',
    request: {
      params: paramsSchema,
    },
    responses: {
      200: {
        description: 'Retrieve a Province by code'
      },
      404: {
        description: 'Province not found'
      },
    },
    tags: API_TAG
  }),
  async (c) => {
    const code = c.req.param('code');
    const province = await getProvinceByCode(code);
    if (province) {
      return c.json({
        status: 'success',
        message: 'Successfully retrieved province',
        data: province,
      });
    }
    return c.json(
      {
        status: 'error',
        message:  `Province with code ${code} not found`,
      },
      404
    );
  }
);

// Post /provinces
router.openapi(
  createRoute({
    method: 'post',
    path: '/',
    description: "Add New Province",
    request: {
      body: {
        content: {
          'application/json': {
            schema: createProvinceSchema,
          },
        }
      }
    },
    responses: {
      201: {
        description: 'Successfully created Province'
      },
      400: {
        description: 'Failed to create Province'
      }
    },
    tags: API_TAG
  }),
  async (c) => {
    try {
      const data = await c.req.json()
      provinceSchema.parse(data)
      const newProvince = await createProvince(data)
      return c.json(
        {
          status: 'success',
          message: 'Successfully created Province',
          data: newProvince,
        },
        201
      )
    } catch (error) {
      return c.json(
        {
          status: 'error',
          message: 'Failed to create Province',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      )
    }
  }
)

// Patch /provinces/:code
router.openapi(
  createRoute({
    method: 'patch',
    path: '/{code}',
    description: 'Update an existing Province',
    request: {
      params: paramsSchema,
      body: {
        content: {
          'application/json': {
            schema: provinceSchema.partial(),
          },
        },
      }
    },
    responses: {
      200: {
        description: 'Successfully updated Province',
      },
      400: {
        description: 'Failed to updated Province',
      },
      404: {
        description: 'Province not found'
      }
    },
    tags: API_TAG
  }),
  async (c) => {
    const code = c.req.param('code')
    try {
      const data = await c.req.json()
      const updatedProvince = await updateProvince(code, data)
      if (updatedProvince) {
        return c.json(
          {
            status: 'success',
            message: 'successfully updated province',
            data: updatedProvince
          },
          200
        )
      } else {
        return c.json(
          {
            status: 'error',
            message: `Province with code ${code} not found`,
          },
          404
        )
      }
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
                    return c.json(
                      {
                        status: 'error',
                        message: `Province with code ${code} not found`,
                      },
                      404
                    );
                  }
      return c.json(
        {
          status: 'error',
          message: 'Failed to update Province',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      )
    }
  }
)

// Delete /Province/:code
router.openapi(
  createRoute({
    method: 'delete',
    path: '/{code}',
    description: "Delete a Province",
    request: {
      params: paramsSchema,
    },
    responses: {
      200: {
        description: 'Successfully deleted a Province'
      },
      400: {
        description: "Failed to delete a Provice"
      },
      404: {
        description: "Province not found"
      }
    },
    tags: API_TAG
  }),
  async (c) => {
    const code = c.req.param('code')
    try {
      const deletedProvince = await deleteProvince(code);
      if (deletedProvince) {
        return c.json(
          {
            status: 'success',
            message: 'Successfully deleted a Province',
            data: deletedProvince,
          },
          200
        )
      }
      return c.json(
        {
          status: 'error',
          message: `Province with code ${code} not found`,
        },
        404
      );
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        return c.json(
          {
            status: 'error',
            message: `Province with code ${code} not found`
          }
        )
      } else {
      return c.json(
        {
          status: 'error',
          message: 'Failed to delete province',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      )
    }
  }
}
)



export default router