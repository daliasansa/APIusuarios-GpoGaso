const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Aplicar el middleware para incrementar el contador en todas las rutas
router.use(userController.incrementarContador);

/**
 * @swagger
 * /api/usuarios/contar-ejecuciones:
 *   get:
 *     summary: Obtener el número de veces que la API ha sido llamada
 *     description: Devuelve el número total de ejecuciones de la API desde que el servidor fue iniciado.
 *     responses:
 *       200:
 *         description: Número total de ejecuciones de la API
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: La API ha sido llamada 5 veces.
 */
router.get('/contar-ejecuciones', userController.contarEjecuciones);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     description: Registra un nuevo usuario en la base de datos. El nombre y el correo son obligatorios, y el correo debe ser único.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del usuario (obligatorio).
 *                 example: Juan Perez
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario (obligatorio y único).
 *                 example: juan.perez@example.com
 *               direccion:
 *                 type: string
 *                 description: Dirección del usuario.
 *                 example: 123 Calle Falsa
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono.
 *                 example: 555-1234
 *               genero:
 *                 type: string
 *                 description: Género del usuario.
 *                 example: Masculino
 *               ocupacion:
 *                 type: string
 *                 description: Ocupación del usuario.
 *                 example: Ingeniero
 *     responses:
 *       201:
 *         description: Usuario creado con éxito.
 *       400:
 *         description: Error en la solicitud (por ejemplo, falta de campos obligatorios o correo duplicado).
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener lista de usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a obtener
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     description: Actualiza los datos de un usuario existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               direccion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               genero:
 *                 type: string
 *               ocupacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       400:
 *         description: Error en la solicitud (por ejemplo, correo duplicado)
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/:id', userController.updateUser);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       204:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/:id', userController.deleteUser);

module.exports = router;
