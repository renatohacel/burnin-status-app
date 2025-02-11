//dependencies
import express from "express";
//middlewares
import cors from 'cors';
import cookieParser from 'cookie-parser';
//PORT
import { PORT } from "./config/config.js";
//routers
import { authRouter } from "./routes/auth.router.js";
import { usersRouter } from "./routes/users.router.js";
import { tasksRouter } from "./routes/tasks.router.js";


const app = express();

app.disable("x-powered-by");

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//ROUTES
app.use('/', authRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);



//RUN
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});