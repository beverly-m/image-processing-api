import express from 'express';
import images from './api/images';

const routes = express.Router();

// GET /api endpoint
routes.get('/', (req, res) => {
    res.send('Hello, Welcome to Image Processing API!');
});

// add images routes as middleware
routes.use('/images', images);

export default routes;
