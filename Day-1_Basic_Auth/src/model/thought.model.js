import mongoose from "mongoose";

const thoughtSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trime: true
    },
    description: {
        type: String,
        required: [true, "Description is required"]
    }

}, {timestamps: true})

export default mongoose.model("Thought", thoughtSchema)