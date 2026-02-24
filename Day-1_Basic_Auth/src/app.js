import express from 'express';
import Thought from '../src/model/thought.model'
import thoughtModel from '../src/model/thought.model';

const app = express();
app.use(express.json());

app.post("/api/thoughts", async(req, res) => {
    try{
        const {title, decrtiption} = req.body;

        const newThought = await thoughtModel.create({
            title,
            decrtiption
        })
    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/', (req, res ) => {
    res.send("Hello World");
})

export default app;