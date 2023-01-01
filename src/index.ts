import express from 'express';
import routes from './routes/index';

// create express application
const app = express();

//define port number used by application
const port = 3000;

//add application endpoints as middleware
app.use('/api', routes);

try {
    // application listens for requests on specified port
    app.listen(port, () => {
        console.log(`Server listening on localhost:${port}`);
    });
} catch (error) {
    console.log(error);
}

export default app;
