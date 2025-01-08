import { Hono } from 'hono'
import provinceRoutes from './routes/provinceRoutes'

const app = new Hono()

app.route('/provinces', provinceRoutes)

export default app


