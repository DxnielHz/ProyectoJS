import app from './app.js'
import { connectDB } from './db.js'

// ejecutar la base de datos (MONGODB)
connectDB()

// ejecutar web server (EXPRESS)
const PORT = 4000
app.listen(PORT)
console.log('Server port running on ', PORT)

//Unir esto con db.js y hacer que siga funcionando sexo quiero