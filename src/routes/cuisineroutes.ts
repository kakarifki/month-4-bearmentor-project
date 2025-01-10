import { Hono } from 'hono'
import * as z from 'zod'
import {
  createCuisine,
  getCuisines,
  getCuisineByCode,
  updateCuisine,
  deleteCuisine,
} from '../models/cuisine'
import { getProvinceByCode } from '../models/province'

const cuisineSchema = z.object({
  name: z.string(),
  cuisineCode: z.string().max(10),
  description: z.string(),
  provinceCode: z.string(),
})

const router = new Hono()

router.get('/', async (c) => {
  const cuisines = await getCuisines()
  return c.json(
    {
      status: 'success',
      message: 'Successfully retrieved cuisines',
      data: cuisines,
    },
    200
  )
})

router.get('/:code', async (c) => {
  const code = c.req.param('code')
  const cuisine = await getCuisineByCode(code)
  if (cuisine) {
    return c.json(
      {
        status: 'success',
        message: 'Successfully retrieved cuisine',
        data: cuisine,
      },
      200
    )
  } else {
    return c.json(
      {
        status: 'error',
        message: `Cuisine with code ${code} not found`,
      },
      404
    )
  }
})

router.post('/', async (c) => {
  try {
    const data = await c.req.json()
    cuisineSchema.parse(data)

    // Validasi relasi: cek apakah provinceCode ada di tabel Province
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

    const newCuisine = await createCuisine(data)
    return c.json(
      {
        status: 'success',
        message: 'Successfully created cuisine',
        data: newCuisine,
      },
      201
    )
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to create cuisine',
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

    // Jika ada perubahan provinceCode, validasi relasi terlebih dahulu
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

    const updatedCuisine = await updateCuisine(code, data)
    if (updatedCuisine) {
      return c.json(
        {
          status: 'success',
          message: 'Successfully updated cuisine',
          data: updatedCuisine,
        },
        200
      )
    } else {
      return c.json(
        {
          status: 'error',
          message: `Cuisine with code ${code} not found`,
        },
        404
      )
    }
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to update cuisine',
        error: error instanceof Error ? error.message : String(error),
      },
      400
    )
  }
})

router.delete('/:code', async (c) => {
  const code = c.req.param('code')
  try {
    const deletedCuisine = await deleteCuisine(code)
    if (deletedCuisine) {
      return c.json(
        {
          status: 'success',
          message: 'Successfully deleted cuisine',
          data: deletedCuisine,
        },
        200
      )
    } else {
      return c.json(
        {
          status: 'error',
          message: `Cuisine with code ${code} not found`,
        },
        404
      )
    }
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to delete cuisine',
        error: error instanceof Error ? error.message : String(error),
      },
      400
    )
  }
})

export default router
