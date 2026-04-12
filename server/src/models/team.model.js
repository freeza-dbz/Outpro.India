import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    position: {
        type: String,
        required: true,
        trim: true,
    },
    bio: {
        type: String,
    },
    avatar_url: {
        type: String,
        trim: true,
    },
    linkedin_url: {
        type: String,
        trim: true,
    },
    department: {
        type: String,
        trim: true,
    },
    is_leadership: {
        type: Boolean,
        default: false,
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

export const TeamMember = mongoose.model("TeamMember", teamMemberSchema);