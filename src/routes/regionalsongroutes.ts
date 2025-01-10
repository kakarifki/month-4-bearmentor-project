import { Hono } from 'hono'
import * as z from 'zod'
import {
  createRegionalSong,
  getRegionalSongs,
  getRegionalSongByCode,
  updateRegionalSong,
  deleteRegionalSong,
} from '../models/regionalsong'
import { getProvinceByCode } from '../models/province'

const regionalSongSchema = z.object({
  title: z.string(),
  regionalSongCode: z.string().max(10),
  composer: z.string(),
  provinceCode: z.string(),
})

const router = new Hono()

router.get('/', async (c) => {
  const regionalSongs = await getRegionalSongs()
  return c.json(
    {
      status: 'success',
      message: 'Successfully retrieved regional songs',
      data: regionalSongs,
    },
    200
  )
})

router.get('/:code', async (c) => {
  const code = c.req.param('code')
  const regionalSong = await getRegionalSongByCode(code)
  if (regionalSong) {
    return c.json(
      {
        status: 'success',
        message: 'Successfully retrieved regional song',
        data: regionalSong,
      },
      200
    )
  } else {
    return c.json(
      {
        status: 'error',
        message: `Regional Song with code ${code} not found`,
      },
      404
    )
  }
})

router.post('/', async (c) => {
  try {
    const data = await c.req.json()
    regionalSongSchema.parse(data)

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

    const newRegionalSong = await createRegionalSong(data)
    return c.json(
      {
        status: 'success',
        message: 'Successfully created regional song',
        data: newRegionalSong,
      },
      201
    )
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to create regional song',
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

    const updatedRegionalSong = await updateRegionalSong(code, data)
    if (updatedRegionalSong) {
      return c.json(
        {
          status: 'success',
          message: 'Successfully updated regional song',
          data: updatedRegionalSong,
        },
        200
      )
    } else {
      return c.json(
        {
          status: 'error',
          message: `Regional song with code ${code} not found`,
        },
        404
      )
    }
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to update regional song',
        error: error instanceof Error ? error.message : String(error),
      },
      400
    )
  }
})

router.delete('/:code', async (c) => {
  const code = c.req.param('code')
  try {
    const deletedRegionalSong = await deleteRegionalSong(code)
    if (deletedRegionalSong) {
      return c.json(
        {
          status: 'success',
          message: 'Successfully deleted regional song',
          data: deletedRegionalSong,
        },
        200
      )
    } else {
      return c.json(
        {
          status: 'error',
          message: `Regional song with code ${code} not found`,
        },
        404
      )
    }
  } catch (error) {
    return c.json(
      {
        status: 'error',
        message: 'Failed to delete regional song',
        error: error instanceof Error ? error.message : String(error),
      },
      400
    )
  }
})

export default router
