import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import authRoutes from './routes/auth.routes.js'
import productoRoutes from './routes/producto.routes.js'
import tiendaRoutes from './routes/tienda.routes.js'
import clienteRoutes from './routes/cliente.routes.js'

const app = express()

// Configuración de middlewares
app.use(cors({
    origin: 'http://localhost:4200',
    
    
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

// Configuración de rutas
app.use('/servicios/auth', authRoutes)
app.use('/servicios/productos', productoRoutes)
app.use('/servicios/tiendas', tiendaRoutes)
app.use('/servicios/clientes', clienteRoutes)

app.get('/', (req, res) => {
    res.send('<h1>JavaScript</h1>')
})

export default app