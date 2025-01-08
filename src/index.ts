import { Hono } from "hono";
import { PrismaClient } from '@prisma/client'



const app = new Hono();
const prisma = new PrismaClient()

app.get("/", (c) => {
  return c.text("Hello nyoba update data!");
});

//insert provinsi
app.post("seed/provinsi", async (c) => {
 const insertedProvinsi = await prisma.province.createMany({
  data: [
    { name: "DKI Jakarta", provinceCode: "dki",  capital_city: "Jakarta", population: 10672100, area_size: 35377.76}, 
    { name: "Jawa Barat", provinceCode: "jabar", capital_city: "Bandung", population: 49935858, area_size:35377.76}
  ],
  skipDuplicates: true,
 });
 return c.json(insertedProvinsi, 201)
})

// Insert Ethnic Grup
app.post("seed/ethnics", async (c) => {
  const insertedEthnic = await prisma.ethnicGroup.createMany({
   data: [
     { name: "Betawi", ethnicGroupCode: "betawi", provinceCode: "dki" }, 
     { name: "Sunda", ethnicGroupCode: "sunda", provinceCode: "jabar"}
   ],
   skipDuplicates: true,
  });
  return c.json(insertedEthnic, 201)
 })

//select province
app.get("/provinces", async (c) => {
  const provinces = await prisma.province.findMany({
    include: {
      ethnicgroups: true
    }
  })
  return c.json ({
    status: "success",
    message: "successfully get provinces",
    data: provinces
  }, 200)
})

//select ethnic
app.get("/etchnics", async (c) => {
  const ethnicGroups = await prisma.ethnicGroup.findMany()
  return c.json ({
    status: "success",
    message: "successfully get provinces",
    data: ethnicGroups
  }, 200)
})

//Update Province
app.patch("/provinces/:provincecode", async (c) => {
 const name = c.req.param('provincecode')
 const body = await c.req.json<{ name: string}>()
 const updatedProvince = await prisma.province.update({
  where: {
    provinceCode: name
  },
  data: { 
   name: body.name
  }
 })
 return c.json({
  status: "success",
  message: "successfully update a province name",
  data: updatedProvince
 }, 200)
})

// Delete a Province
app.delete("/provinces/:provincecode", async (c) => {
  const name = c.req.param('provincecode')
  const deletedProvince = await prisma.province.delete ({
    where: {
      provinceCode: name
    }
  })
  return c.json({
    status: "success",
    message: "successfully deleted a province",
    data: deletedProvince
  })
})





export default {
  port: 3000,
  fetch: app.fetch,
};