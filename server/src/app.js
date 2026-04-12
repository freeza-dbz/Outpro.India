import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true
}))


app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("cache"));
app.use(morgan("dev"));
app.use(helmet());

// routes import

import userRouter from "./routes/user.routes.js";

import testimonialRouter from "./routes/testimonial.routes.js";

import serviceRouter from "./routes/service.routes.js";

import portfolioRouter from "./routes/portfolio.routes.js";

// routes declaration

app.use("/api/v1/users", userRouter);

app.use("/api/v1/testimonials", testimonialRouter);

app.use("/api/v1/services", serviceRouter);

app.use("/api/v1/portfolios", portfolioRouter);

export { app };
