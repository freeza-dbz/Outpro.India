import mongoose from "mongoose";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { TeamMember } from "../models/team.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllTeamMembers = asyncHandler(async (req, res) => {
    const teamMembers = await TeamMember.find({ is_active: true }).sort({ display_order: 'asc', createdAt: 'desc' });

    if (!teamMembers) {
        throw new ApiError(404, "No team members found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, teamMembers, "Team members fetched successfully"));
});

const createTeamMember = asyncHandler(async (req, res) => {
    const { name, position, bio, avatar_url, linkedin_url, department, is_leadership, is_active, display_order } = req.body;

    if ([name, position].some((field) => !field || (typeof field === 'string' && field.trim() === ""))) {
        throw new ApiError(400, "Name and position are required");
    }

    const member = await TeamMember.create({
        name,
        position,
        bio,
        avatar_url,
        linkedin_url,
        department,
        is_leadership,
        is_active,
        display_order
    });

    if (!member) {
        throw new ApiError(500, "Something went wrong while creating the team member");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, member, "Team member created successfully"));
});

const updateTeamMember = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid team member ID");
    }

    const allowedFields = [
        "name", "position", "bio", "avatar_url", "linkedin_url",
        "department", "is_leadership", "is_active", "display_order"
    ];

    const updateData = {};
    allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
            updateData[field] = req.body[field];
        }
    });

    if (Object.keys(updateData).length === 0) {
        throw new ApiError(400, "No valid fields provided for update");
    }

    const member = await TeamMember.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!member) {
        throw new ApiError(404, "Team member not found");
    }

    return res.status(200).json(
        new ApiResponse(200, member, "Team member updated successfully")
    );
});

const deleteTeamMember = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Team Member ID");
    }

    const member = await TeamMember.findByIdAndDelete(id);

    if (!member) {
        throw new ApiError(404, "Team member not found or already deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Team member deleted successfully"));
});

export {
    getAllTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
};