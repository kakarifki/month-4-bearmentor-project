import { Hono } from "hono";
import * as z from "zod";
import {
    createProvince,
    getProvinces,
    getProvinceByCode,
    updateProvince,
    deleteProvince
} from '../models/province'

const provinceSchema = z.object({
    name: z.string(),
    provinceCode: z.string().max(10),
    capital_city: z.string(),
    population: z.number().optional(),
    area_size: z.number().optional(),
})

const router = new Hono()

router.get('/', async (c) => {
  const provinces = await getProvinces()
  return c.json(
    {
      status: 'success',
      message: 'Successfully retrieved provinces',
      data: provinces,
    },
    200
  )
})

router.get('/:code', async (c) => {
  const code = c.req.param('code')
  const province = await getProvinceByCode(code)
  if (province) {
    return c.json(
      {
        status: 'success',
        message: 'Successfully retrieved province',
        data: province,
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
})

router.post('/', async (c) => {
  try {
    const data = await c.req.json()
    provinceSchema.parse(data)
    const newProvince = await createProvince(data)
    return c.json(
      {
        status: 'success',
        message: 'Successfully created province',
        data: newProvince,
      },
      201
    )
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to create province',
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
    const updatedProvince = await updateProvince(code, data)
    if (updatedProvince) {
      return c.json(
        {
          status: 'success',
          message: 'Successfully updated province',
          data: updatedProvince,
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
    return c.json(
      {
        status: 'error',
        message: 'Failed to update province',
        error: error instanceof Error ? error.message : String(error),
      },
      400
    )
  }
})

router.delete('/:code', async (c) => {
  const code = c.req.param('code')
  try {
    const deletedProvince = await deleteProvince(code)
    if (deletedProvince) {
      return c.json(
        {
          status: 'success',
          message: 'Successfully deleted province',
          data: deletedProvince,
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
    return c.json(
      {
        status: 'error',
        message: 'Failed to delete province',
        error: error instanceof Error ? error.message : String(error),
      },
      400
    )
  }
})


export default router