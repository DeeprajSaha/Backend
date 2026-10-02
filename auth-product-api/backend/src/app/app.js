import express from 'express'
import authRoute from '../routes/auth.routes.js'
import productRoute from '../routes/product.route.js'
import cors from 'cors'

const app = express();

app.use(express.json());

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://backend-auth-drab.vercel.app"
    ]
}));

app.get("/", (req, res) => {
    res.send("Hello")
})

app.use("/api/auth", authRoute)

app.use("/api/products", productRoute)


export default app;