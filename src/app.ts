import { Hono } from 'hono'
import provinceRoutes from './routes/provinceRoutes'
import ethnicgroupRoutes from './routes/ethnicgrouproutes'

const app = new Hono()

app.route('/provinces', provinceRoutes)
app.route('/ethnics', ethnicgroupRoutes)

export default app


