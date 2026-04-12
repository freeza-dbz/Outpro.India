import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    feature: {
        type: [String],
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
    display_order: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true
})

export const Service = mongoose.model("Service", serviceSchema)