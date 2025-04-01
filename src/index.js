import express from "express";
import {PORT} from "./config.js";
import userRoutes from "./routes/users.routes.js";
import productsRoutes from "./routes/products.routes.js";
import authRoutes from "./routes/auth.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}))

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use("/", userRoutes);
app.use("/api", productsRoutes);
app.use("/api", authRoutes);
app.use("/api", ordersRoutes);

app.listen(PORT);

console.log("Server listen om Port:", PORT);
