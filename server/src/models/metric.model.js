import mongoose from "mongoose";

const metricSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    value: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    icon: {
        type: String,
        trim: true,
    },
    suffix: {
        type: String,
        trim: true,
    },
    label: {
        type: String,
        trim: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    display_order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

export const Metric = mongoose.model("Metric", metricSchema);