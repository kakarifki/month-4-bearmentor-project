import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

import {
  createCulture,
  getCultures,
  getCultureByCode,
  updateCulture,
  deleteCulture,
} from '../models/culture'
import { getProvinceByCode } from '../models/province'

const API_TAG = ['Cultures']

// Define the Zod schema for the enum + example
const cultureCategoryEnum = z.enum(['DANCE', 'TRADITIONAL_CLOTHING', 'TRADITIONAL_HOUSE']).openapi({
    description: 'Category of culture',
    example: 'DANCE', // Menggunakan `example` di metadata, bukan `examples`
});

// Define the Zod schema for the culture
const cultureSchema = z.object({
  name: z.string(),
  cultureCode: z.string().max(10),
  category: cultureCategoryEnum,
  description: z.string().optional(),
  provinceCode: z.string(),
})

// Schema untuk Path Parameters
const paramsSchema = z.object({
    code: z.string().openapi({
        param: {
            name: 'code',
            in: 'path',
        },
        example: 'taritopeng',
    }),
});

// Schema untuk Request Body
const createCultureSchema = z.object({
    name: z.string(),
    cultureCode: z.string().max(10),
    category: cultureCategoryEnum,
    description: z.string(),
    provinceCode: z.string(),
});

//Schema untuk Query Culture
const queryCultureSchema = z.object({
  name: z.string().optional(),
  category: z.enum(['DANCE', 'TRADITIONAL_CLOTHING', 'TRADITIONAL_HOUSE']).optional(),
})


const router = new OpenAPIHono();

// GET /cultures openAPI

router.openapi(
    createRoute({
        method: "get",
        path: "/",
        description: "Show all Culture",
        request: {
          query: queryCultureSchema
        },
        responses: {
            200: {
                description: 'Retrieve all cultures',
            },
        },
        tags: API_TAG
    }),
    async (c) => {
        const cultures = await getCultures();
        return c.json ({
            status: 'success',
            message: 'Successfully retrieved cultures',
            data: cultures
        })
    }
)

// GET /cultures/:code
router.openapi(
  createRoute({
    method: 'get',
    path: '/{code}',
    description: 'get culture by culturecode',
    request: {
      params: paramsSchema,
    },
      responses: {
      200: {
        description: 'Retrieve a culture by code',
      },
      404: {
        description: 'Culture not found',
      },
    },
    tags: API_TAG
  }),
  async (c) => {
    const code = c.req.param('code');
    const culture = await getCultureByCode(code);
    if (culture) {
      return c.json({
        status: 'success',
        message: 'Successfully retrieved culture',
        data: culture,
      });
    }
    return c.json(
      {
        status: 'error',
        message: `Culture with code ${code} not found`,
      },
      404
    );
  }
);

// POST /cultures
router.openapi(
  createRoute({
    method: 'post',
    path: '/',
    description: "Create new culture entry. The 'Category' is between 'DANCE','TRADITIONAL_CLOTHING', 'TRADITIONAL_HOUSE'.",
    request: {
      body: {
        content: {
          "application/json": {
            schema: createCultureSchema,
          },
        }
      }
    },
    responses: {
      201: {
        description: 'Successfully created culture',
      },
      400: {
        description: 'Failed to create culture',
      },
    },
    tags: API_TAG
  }),
  async (c) => {
    try {
      const data = await c.req.json();
      createCultureSchema.parse(data);

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

      const newCulture = await createCulture(data);
      return c.json(
        {
          status: 'success',
          message: 'Successfully created culture',
          data: newCulture,
        },
        201
      );
    } catch (error) {
      return c.json(
        {
          status: 'error',
          message: 'Failed to create culture',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      );
    }
  }
);

// PATCH /cultures/:code
router.openapi(
  createRoute({
    method: 'patch',
    path: '/{code}',
    description: 'Update an existing culture',
    request: {
      params: paramsSchema,
      body: {
        content: {
          'application/json': {
            schema: cultureSchema.partial(),
          },
        },
      }
    },
    responses: {
      200: {
        description: 'Successfully updated culture',
      },
      404: {
        description: 'Culture not found',
      },
    },
    tags: API_TAG
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

      const updatedCulture = await updateCulture(code, data);
      if (updatedCulture) {
        return c.json({
          status: 'success',
          message: 'Successfully updated culture',
          data: updatedCulture,
        });
      }
      return c.json(
        {
          status: 'error',
          message: `Culture with code ${code} not found`,
        },
        404
      );
    } catch (error) {
      return c.json(
        {
          status: 'error',
          message: 'Failed to update culture',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      );
    }
  }
);

// DELETE /cultures/:code
router.openapi(
  createRoute({
    method: 'delete',
    path: '/{code}',
    description: "Delete a Culture Entry",
    request: {
      params: paramsSchema,
    },
    responses: {
      200: {
        description: 'Successfully deleted culture',
      },
      404: {
        description: 'Culture not found',
      },
    },
    tags: API_TAG
  }),
  async (c) => {
    const code = c.req.param('code');
    try {
      const deletedCulture = await deleteCulture(code);
      if (deletedCulture) {
        return c.json({
          status: 'success',
          message: 'Successfully deleted culture',
          data: deletedCulture,
        });
      }
      return c.json(
        {
          status: 'error',
          message: `Culture with code ${code} not found`,
        },
        404
      );
    } catch (error) {
      return c.json(
        {
          status: 'error',
          message: 'Failed to delete culture',
          error: error instanceof Error ? error.message : String(error),
        },
        400
      );
    }
  }
);

export default router
