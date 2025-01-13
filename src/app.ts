import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import provinceRoutes from './routes/provinceRoutes';
import ethnicgroupRoutes from './routes/ethnicgrouproutes';
import cultureRoutes from './routes/cultureroutes';
import regionalsongRoutes from './routes/regionalsongroutes';
import cuisineRoutes from './routes/cuisineroutes';
import { WelcomePage } from './welcomepage';
import { html } from 'hono/html';

const app = new OpenAPIHono();


app.get(
    '/api',
    swaggerUI({
      url: '/doc'
    })
  )
  
app.doc('/doc', {
    info: {
      title: 'Indonesian Cultural Heritage API',
      version: 'v1.0',
      description: "This API provides access to data on Indonesian provinces, ethnic groups, cultures, regional songs, and traditional cuisine. It aims to preserve and promote Indonesian cultural heritage.",
      contact: {
        name: "Rifki Septiawan",
      url: "https://rifkiseptiawan.com",
      email: "rifkim91@gmail.com",
    }
    },
    openapi: '3.1.0'
  })

app.get('/', (c) => {
    return c.html(WelcomePage());
  });

// Daftar semua route
app.route('/provinces', provinceRoutes);
app.route('/ethnics', ethnicgroupRoutes);
app.route('/cultures', cultureRoutes);
app.route('/songs', regionalsongRoutes);
app.route('/cuisine', cuisineRoutes);

export default app;