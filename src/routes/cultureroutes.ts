import { Hono } from 'hono'
import * as z from 'zod'
import {
  createCulture,
  getCultures,
  getCultureByCode,
  updateCulture,
  deleteCulture,
} from '../models/culture'
import { getProvinceByCode } from '../models/province'

// Define the Zod schema for the enum
const cultureCategoryEnum = z.enum(['DANCE', 'TRADITIONAL_CLOTHING', 'TRADITIONAL_HOUSE'])

// Define the Zod schema for the culture
const cultureSchema = z.object({
  name: z.string(),
  cultureCode: z.string().max(10),
  category: cultureCategoryEnum,
  description: z.string().optional(),
  provinceCode: z.string(),
})

const router = new Hono()

router.get('/', async (c) => {
  const cultures = await getCultures()
  return c.json(
    {
      status: 'success',
      message: 'Successfully retrieved cultures',
      data: cultures,
    },
    200
  )
})

router.get('/:code', async (c) => {
  const code = c.req.param('code')
  const culture = await getCultureByCode(code)
  if (culture) {
    return c.json(
      {
        status: 'success',
        message: 'Successfully retrieved culture',
        data: culture,
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
})

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
