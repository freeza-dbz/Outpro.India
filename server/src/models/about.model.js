import mongoose from "mongoose";

const valueSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    }
});

const aboutSchema = new mongoose.Schema({
    mission: {
        type: String,
        required: true,
    },
    vision: {
        type: String,
        required: true,
    },
    story: {
        type: String,
        required: true,
    },
    founded_year: {
        type: Number,
    },
    values: {
        type: [valueSchema],
        default: [],
    }
}, {
    timestamps: true
});


export const About = mongoose.model("About", aboutSchema);