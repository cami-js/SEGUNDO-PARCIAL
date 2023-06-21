import 'dotenv/config'
import express from 'express'
import mysql2 from 'mysql2'
import mongoose from 'mongoose'


const app = express()


// Conexión MySQL
const connection = mysql2.createConnection({
  host: "mysql",
  user: "root",
  password: "root",
  database: "tienda"
})

app.get('/check-mysql-connection', (req, res) => {
  connection.connect((err) => {
    if (err) {
      return res.send('Error al conectar con la base de datos MySQL')
    }
    return res.send('Conexión exitosa a la base de datos MySQL.')
  })
})

//Conexión MongoDB
  app.get('/check-mongodb-connection', async (req, res) => {
    try {
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      res.json({ message: 'La conexión a MongoDB se realizó exitosamente.' });
    } catch (error) {
      res.json({ error: error.message });
    }
  });


app.listen(process.env.PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${process.env.PORT}`)
})

