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
    const provinces = await getProvinces();
    return c.json ({
        status: "success",
        message: "successfully get provinces",
        data: provinces
    }, 200);
})


router.get('/:code', async (c) => {
  const code = c.req.param('code')
  const province = await getProvinceByCode(code)
  if (province) {
    return c.json ({
        status: "success",
            message: "Successfully retrieved province",
            data: province
    }, 200);
  } else {
    return c.notFound()}
})

export default router