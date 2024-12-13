import mongoose from 'mongoose'


export const connectDB = async() => {

try {
    await mongoose.connect("mongodb+srv://tintaramirez1:aTUFPk2NvZImKHMY@cluster0.ue65a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        
    console.log('Conexion a la base de datos')
} catch (error) {
    console.log(error)
}

}
