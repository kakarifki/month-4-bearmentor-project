import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { swaggerUI } from '@hono/swagger-ui';
import provinceRoutes from './routes/provinceRoutes'
import ethnicgroupRoutes from './routes/ethnicgrouproutes'
import cultureRoutes from './routes/cultureroutes'
import regionalsongRoutes from './routes/regionalsongroutes'
import cuisineRoutes from './routes/cuisineroutes'

const app = new OpenAPIHono()

app.get(
    '/ui',
    swaggerUI({
        url: '/doc', // Path untuk OpenAPI JSON
    })
);

app.route('/provinces', provinceRoutes)
app.route('/ethnics', ethnicgroupRoutes)
app.route('/cultures', cultureRoutes)
app.route('/songs', regionalsongRoutes)
app.route('/cuisine', cuisineRoutes)

export default app


