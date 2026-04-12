import mongoose from "mongoose";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Testimonial } from "../models/testimonial.model.js";

const getAllTestimonials = asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find().sort({ display_order: 'asc', createdAt: 'desc' });

    if (!testimonials) {
        throw new ApiError(404, "No testimonials found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, testimonials, "Testimonials fetched successfully"));
});

const createTestimonial = asyncHandler(async (req, res) => {
    const { name, role, company, content, rating, displayOrder } = req.body;

    if ([name, role, company, content].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const testimonial = await Testimonial.create({
        name,
        role,
        company,
        content,
        displayOrder,
        rating: rating || 5,
    });

    if (!testimonial) {
        throw new ApiError(500, "Something went wrong while creating the testimonial");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, testimonial, "Testimonial created successfully"));
});

const updateTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid testimonial ID");
    }

    const allowedFields = [
        "name",
        "role",
        "company",
        "content",
        "rating",
        "is_featured",
        "is_active",
        "display_order"
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

    const testimonial = await Testimonial.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
            new: true,
            runValidators: true 
        }
    );

    if (!testimonial) {
        throw new ApiError(404, "Testimonial not found");
    }

    return res.status(200).json(
        new ApiResponse(200, testimonial, "Testimonial updated successfully")
    );
});

const deleteTestimonial = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid testimonial ID");
    }

    const testimonial = await Testimonial.findByIdAndDelete(id);

    if (!testimonial) {
        throw new ApiError(404, "Testimonial not found or already deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Testimonial deleted successfully"));
});


export {
    getAllTestimonials,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
};