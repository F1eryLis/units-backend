import express from 'express';
import cors from 'cors';
import bodyparser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import campaingsRouter from './routes/campaing';
import phoneListRouter from './routes/phonelist';

const port = process.env.PORT || 8001;
const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Units API',
      version: '1.0.0',
      description: 'API documentation for the Units API',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./src/**/*.ts'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use(cors({
  origin: ['http://localhost:5173'],
}));
app.use(bodyparser.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Add routes to the app
/**
 * @swagger
 * tags:
 *   name: Campaings
 *   description: Campaings management
*/
app.use('/campaings', campaingsRouter);

/**
 * @swagger
 * tags:
 *   name: Phone List
 *   description: Phone list management
*/
app.use('/phonelist', phoneListRouter);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns hello world
 *     responses:
 *       200:
 *         description: Hello World message
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger documentation available at http://localhost:${port}/docs`);
});