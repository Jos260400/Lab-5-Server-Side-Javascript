const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API del Blog',
      version: '1.0.0',
      description: 'Documentación de la API del Blog',
    },
  },
  apis: ['./app.js'], 
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
  const originalSend = res.send;
  const logStream = fs.createWriteStream(path.join(__dirname, 'log.txt'), { flags: 'a' });
  const { method, url } = req;
  const startTime = new Date();

  res.send = function(data) {
    const endTime = new Date();
    const responseTime = endTime - startTime;
    const log = `${startTime.toISOString()} - ${method} ${url} - Payload: ${JSON.stringify(req.body)} - Response: ${data} - ResponseTime: ${responseTime}ms\n`;

    logStream.write(log, () => {
      logStream.end();
    });

    originalSend.apply(res, arguments);
  };

  next();
});

let posts = [
  { id: 1, title: 'Primer post', content: 'Contenido del primer post', image: '' },
];

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: integer
 *           description: El ID del post.
 *         title:
 *           type: string
 *           description: El título del post.
 *         content:
 *           type: string
 *           description: El contenido del post.
 *         image:
 *           type: string
 *           description: Imagen en formato base64.
 *       example:
 *         id: 1
 *         title: Ejemplo de título
 *         content: Ejemplo de contenido
 *         image: data:image/png;base64,iVBORw0KGgo...
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API para gestionar posts.
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retorna un listado de todos los posts.
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Un array de posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */
app.get('/posts', (req, res) => {
  res.status(200).json(posts);
});

/**
 * @swagger
 * /posts/{postId}:
 *   get:
 *     summary: Obtiene el detalle de un post específico por su ID.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del post
 *     responses:
 *       200:
 *         description: Detalles del post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: El post no fue encontrado
 */
app.get('/posts/:postId', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.postId));
  if (!post) {
    return res.status(404).send('El post no se encontro.');
  }
  res.status(200).json(post);
});

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Crea un nuevo post.
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         applicationjson:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: El post fue creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
app.post('/posts', (req, res) => {
    const { title, content, image } = req.body; 
    const newPost = {
        id: posts.length + 1,
        title,
        content,
        image, 
    };
    posts.push(newPost);
    res.status(200).json(newPost);
});

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Actualiza un post existente por su ID.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: El post fue actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: El post no fue encontrado
 */
app.put('/posts/:postId', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.postId));
    if (!post) {
        return res.status(404).send('El post no se encontro');
    }
    post.title = req.body.title;
    post.content = req.body.content;
    post.image = req.body.image; 
    res.status(200).json(post);
});

/**
 * @swagger
 * /posts/{postId}:
 *   delete:
 *     summary: Elimina un post por su ID.
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del post a eliminar
 *     responses:
 *       204:
 *         description: El post fue eliminado correctamente
 *       404:
 *         description: El post no fue encontrado
 */
app.delete('/posts/:postId', (req, res) => {
    const postIndex = posts.findIndex(p => p.id === parseInt(req.params.postId));
    if (postIndex === -1) {
        return res.status(404).send('El post no se pudo encontrar');
    }
    posts = posts.filter(p => p.id !== parseInt(req.params.postId));
    res.status(204).send();
});

app.use((req, res, next) => {
  res.status(400).send('La ruta especifica no existe');
});

app.use((req, res, next) => {
  res.status(501).send('El metodo no es implementado');
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Algo salió mal en el server');
});

app.listen(port, () => {
  console.log(`Server ejecutándose en el puerto ${port}`);
});
