import app from "./app"

// const PORT = 3000

Bun.serve({
    fetch: app.fetch,
    port: 3000,
  })
  
console.log('Server is running at http://localhost:3000')