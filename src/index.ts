import express from 'express';
import routes from "./routes/index"

const app = express();
const port = 3000;

app.use("/api", routes);

try {
    app.listen(port, () => {
        console.log(`Server listening on localhost:${port}`);
    });
} catch (error) {
    console.log(error);
}

export default app;
