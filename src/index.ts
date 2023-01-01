import express from 'express';
import routes from "./routes/index";
// import apicache from "apicache";

const app = express();
const port = 3000;

// const cache = apicache.middleware

// const status200 = (req: Request, res: Response) => res.status === 200

// const cacheStatus200 = cache('60 minutes', status200)

// app.use(cacheStatus200);

app.use("/api", routes);

try {
    app.listen(port, () => {
        console.log(`Server listening on localhost:${port}`);
    });
} catch (error) {
    console.log(error);
}

export default app;
