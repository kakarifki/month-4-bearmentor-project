import { Hono } from 'hono'
import provinceRoutes from './routes/provinceRoutes'
import ethnicgroupRoutes from './routes/ethnicgrouproutes'
import cultureRoutes from './routes/cultureroutes'
import regionalsongRoutes from './routes/regionalsongroutes'

const app = new Hono()

app.route('/provinces', provinceRoutes)
app.route('/ethnics', ethnicgroupRoutes)
app.route('/cultures', cultureRoutes)
app.route('/songs', regionalsongRoutes)

export default app


