import { Hono } from 'hono'
import provinceRoutes from './routes/provinceRoutes'
import ethnicgroupRoutes from './routes/ethnicgrouproutes'
import cultureRoutes from './routes/cultureroutes'

const app = new Hono()

app.route('/provinces', provinceRoutes)
app.route('/ethnics', ethnicgroupRoutes)
app.route('/culture', cultureRoutes)

export default app


