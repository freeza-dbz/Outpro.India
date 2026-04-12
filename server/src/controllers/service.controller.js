import mongoose from "mongoose";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Service } from "../models/service.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getAllServices = asyncHandler(async (req, res) => {
    const services = await Service.find().sort({ display_order: 'asc', createdAt: 'desc' });

    if (!services) {
        throw new ApiError(404, "No services found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, services, "Services fetched successfully"));
});

const createService = asyncHandler(async (req, res) => {
    const { title, description, feature, icon, display_order } = req.body;

    if ([title, description].some((field) => !field || field.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const service = await Service.create({
        title,
        description,
        feature,
        icon,
        display_order,
    });

    if (!service) {
        throw new ApiError(500, "Something went wrong while creating the service");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, service, "Service created successfully"));
});

const updateService = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid service ID");
    }

    const allowedFields = [
        "title",
        "description",
        "feature",
        "icon",
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

    const service = await Service.findByIdAndUpdate(
        id,
        { $set: updateData },
        {
            new: true,
            runValidators: true
        }
    );

    if (!service) {
        throw new ApiError(404, "Service not found");
    }

    return res.status(200).json(
        new ApiResponse(200, service, "Service updated successfully")
    );
});

const deleteService = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Service ID");
    }

    const service = await Service.findByIdAndDelete(id);

    if (!service) {
        throw new ApiError(404, "Service not found or already deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Service deleted successfully"));
});


export {
    getAllServices,
    createService,
    updateService,
    deleteService,
};