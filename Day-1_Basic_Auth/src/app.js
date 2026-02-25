import express from 'express';
import thoughtModel from '../src/model/thought.model.js';

const app = express();
app.use(express.json());

app.post("/api/thoughts", async(req, res) => {
    try{
        const {title, descrtiption} = req.body;

        const newThought = await thoughtModel.create({
            title,
            descrtiption
        })

        res.status(201).json({message: "Thought saved successfully", newThought: newThought})

    }catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/', (req, res ) => {
    res.send("Hello World");
})

export default app;