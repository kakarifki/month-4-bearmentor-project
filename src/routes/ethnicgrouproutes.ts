import { Hono } from 'hono'
import * as z from 'zod'
import {
  createEthnicGroup,
  getEthnicGroups,
  getEthnicGroupByCode,
  updateEthnicGroup,
  deleteEthnicGroup,
} from '../models/ethnicgroup'
import { getProvinceByCode } from '../models/province'

const ethnicGroupSchema = z.object({
  name: z.string(),
  ethnicGroupCode: z.string().max(10),
  provinceCode: z.string(),
})

const router = new Hono()

router.get('/', async (c) => {
  const ethnicGroups = await getEthnicGroups()
  return c.json(
    {
      status: 'success',
      message: 'Successfully retrieved ethnic groups',
      data: ethnicGroups,
    },
    200
  )
})

router.get('/:code', async (c) => {
  const code = c.req.param('code')
  const ethnicGroup = await getEthnicGroupByCode(code)
  if (ethnicGroup) {
    return c.json(
      {
        status: 'success',
        message: 'Successfully retrieved ethnic group',
        data: ethnicGroup,
      },
      200
    )
  } else {
    return c.json(
      {
        status: 'error',
        message: `Ethnic group with code ${code} not found`,
      },
      404
    )
  }
})

router.post('/', async (c) => {
  try {
    const data = await c.req.json()
    ethnicGroupSchema.parse(data)

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

    const newEthnicGroup = await createEthnicGroup(data)
    return c.json(
      {
        status: 'success',
        message: 'Successfully created ethnic group',
        data: newEthnicGroup,
      },
      201
    )
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to create ethnic group',
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

    const updatedEthnicGroup = await updateEthnicGroup(code, data)
    if (updatedEthnicGroup) {
      return c.json(
        {
          status: 'success',
          message: 'Successfully updated ethnic group',
          data: updatedEthnicGroup,
        },
        200
      )
    } else {
      return c.json(
        {
          status: 'error',
          message: `Ethnic group with code ${code} not found`,
        },
        404
      )
    }
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to update ethnic group',
        error: error instanceof Error ? error.message : String(error),
      },
      400
    )
  }
})

router.delete('/:code', async (c) => {
  const code = c.req.param('code')
  try {
    const deletedEthnicGroup = await deleteEthnicGroup(code)
    if (deletedEthnicGroup) {
      return c.json(
        {
          status: 'success',
          message: 'Successfully deleted ethnic group',
          data: deletedEthnicGroup,
        },
        200
      )
    } else {
      return c.json(
        {
          status: 'error',
          message: `Ethnic group with code ${code} not found`,
        },
        404
      )
    }
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to delete ethnic group',
        error: error instanceof Error ? error.message : String(error),
      },
      400
    )
  }
})

export default router
