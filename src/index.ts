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

//Update Province
app.patch("/provinces/:uniquecode", async (c) => {
 const name = c.req.param('uniquecode')
 const body = await c.req.json<{ name: string}>()
 const updatedProvince = await prisma.province.update({
  where: {
    uniqueCode: name
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
app.delete("/provinces/:uniquecode", async (c) => {
  const name = c.req.param('uniquecode')
  const deletedProvince = await prisma.province.delete ({
    where: {
      uniqueCode: name
    }
  })
  return c.json({
    status: "success",
    message: "successfully deleted a province",
    data: deletedProvince
  })
})



// Get Users
app.get("/users", async (c) => {
  const users = await getUsers(); // WILL BE CHANGED SOON IF WE USE REAL DATABASE
  return c.json(users);
});

// Get User By ID
app.get("/users/:id", async (c) => {
  const id = c.req.param("id");
  const user = await getUserById(+id);
  return c.json(user);
});

// Add new user
app.post("/users", async (c) => {
  type UserAddInput = {
    name: string;
    email: string;
  };
  const { name, email }: UserAddInput =
    await c.req.parseBody();
  const newUser = addUser({ name, email });
  return c.json(newUser, 201);
});

// Update Email User by ID
app.patch("/users/:id", async (c) => {
  const id = c.req.param("id");
  const { email }: { email: string } =
    await c.req.parseBody();
  
  const updatedUser = await updateEmailById({ id: +id, email })
  return c.json(updatedUser, 200)
});

// Delete User By ID
app.delete("/users/:id", (c) => {
  const id = c.req.param("id");
  const deletedUser = deleteUserById(+id)
  return c.text(deletedUser)
})

export default {
  port: 3000,
  fetch: app.fetch,
};