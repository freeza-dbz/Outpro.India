import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
    },
    business_hours: {
        type: String,
    },
    linkedin_url: {
        type: String,
        trim: true,
    },
    twitter_url: {
        type: String,
        trim: true,
    },
    facebook_url: {
        type: String,
        trim: true,
    }
}, {
    timestamps: true
});

// This will be a singleton document in the database.
// The controller will handle creating it if it doesn't exist, or updating it if it does.

export const Contact = mongoose.model("Contact", contactSchema);