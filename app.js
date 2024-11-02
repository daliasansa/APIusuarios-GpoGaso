const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

// Configurar Swagger en la ruta /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de usuarios
app.use('/api/usuarios', userRoutes); // Prefijo '/api' agregado para que coincida con la URL esperada


const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en ejecución en http://localhost:${PORT}`));