import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

import {
  createCulture,
  getCultures,
  getCultureByCode,
  updateCulture,
  deleteCulture,
} from '../models/culture'
import { getProvinceByCode } from '../models/province'

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
const ParamsSchema = z.object({
    code: z.string().openapi({
        param: {
            name: 'code',
            in: 'path',
        },
        example: 'JKT123',
    }),
});

// Schema untuk Request Body
const createCultureSchema = z.object({
    name: z.string(),
    cultureCode: z.string().max(10),
    category: cultureCategoryEnum,
    provinceCode: z.string(),
});

// Schema untuk Response
const cultureResponseSchema = z.object({
    id: z.number(),
    name: z.string(),
    cultureCode: z.string(),
    category: cultureCategoryEnum,
    provinceCode: z.string(),
});

const responseWrapperSchema = z.object({
    status: z.string(),
    message: z.string(),
    data: z.array(cultureResponseSchema),
});




const router = new OpenAPIHono();

// GET /cultures openAPI

router.openapi(
    createRoute({
        method: "get",
        path: "/",
        responses: {
            200: {
                description: 'Retrieve all cultures',
                content: {
                    "application/json": {
                        schema: responseWrapperSchema,
                    },
                },
            },
        },
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

// router.get('/', async (c) => {
//   const cultures = await getCultures()
//   return c.json(
//     {
//       status: 'success',
//       message: 'Successfully retrieved cultures',
//       data: cultures,
//     },
//     200
//   )
// })

// router.get('/:code', async (c) => {
//   const code = c.req.param('code')
//   const culture = await getCultureByCode(code)
//   if (culture) {
//     return c.json(
//       {
//         status: 'success',
//         message: 'Successfully retrieved culture',
//         data: culture,
//       },
//       200
//     )
//   } else {
//     return c.json(
//       {
//         status: 'error',
//         message: `Culture with code ${code} not found`,
//       },
//       404
//     )
//   }
// })

router.post('/', async (c) => {
  try {
    const data = await c.req.json()
    cultureSchema.parse(data)

    // Validate provinceCode relationship
    const province = await getProvinceByCode(data.provinceCode)
    if (!province) {
      return c.json(
        {
          status: 'error',
          message: `Province with code ${data.provinceCode} not found`,
        },
        400
      )
    }

    const newCulture = await createCulture(data)
    return c.json(
      {
        status: 'success',
        message: 'Successfully created culture',
        data: newCulture,
      },
      201
    )
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to create culture',
        error: error instanceof Error ? error.message : String(error),
      },
      400
    )
  }
})

router.patch('/:code', async (c) => {
  const code = c.req.param('code')
  try {
    const data = await c.req.json()

    // Validate the schema and provinceCode if it is being updated
    if (data.provinceCode) {
      const province = await getProvinceByCode(data.provinceCode)
      if (!province) {
        return c.json(
          {
            status: 'error',
            message: `Province with code ${data.provinceCode} not found`,
          },
          400
        )
      }
    }

    const updatedCulture = await updateCulture(code, data)
    if (updatedCulture) {
      return c.json(
        {
          status: 'success',
          message: 'Successfully updated culture',
          data: updatedCulture,
        },
        200
      )
    } else {
      return c.json(
        {
          status: 'error',
          message: `Culture with code ${code} not found`,
        },
        404
      )
    }
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to update culture',
        error: error instanceof Error ? error.message : String(error),
      },
      400
    )
  }
})

router.delete('/:code', async (c) => {
  const code = c.req.param('code')
  try {
    const deletedCulture = await deleteCulture(code)
    if (deletedCulture) {
      return c.json(
        {
          status: 'success',
          message: 'Successfully deleted culture',
          data: deletedCulture,
        },
        200
      )
    } else {
      return c.json(
        {
          status: 'error',
          message: `Culture with code ${code} not found`,
        },
        404
      )
    }
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to delete culture',
        error: error instanceof Error ? error.message : String(error),
      },
      400
    )
  }
})

export default router
