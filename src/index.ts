import { Hono } from "hono";
import {
  addUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateEmailById,
} from "./users";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Honooooooo!");
});

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