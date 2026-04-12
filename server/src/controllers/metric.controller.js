import mongoose from "mongoose";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Metric } from "../models/metric.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAllMetrics = asyncHandler(async (req, res) => {
    const metrics = await Metric.find({ is_active: true }).sort({ display_order: 'asc', createdAt: 'desc' });

    if (!metrics) {
        throw new ApiError(404, "No metrics found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, metrics, "Metrics fetched successfully"));
});

const createMetric = asyncHandler(async (req, res) => {
    const { title, value, description, icon, suffix, label, is_active, display_order } = req.body;

    if ([title, value].some((field) => !field || (typeof field === 'string' && field.trim() === ""))) {
        throw new ApiError(400, "Title and value are required");
    }

    const metric = await Metric.create({
        title,
        value,
        description,
        icon,
        suffix,
        label,
        is_active,
        display_order
    });

    if (!metric) {
        throw new ApiError(500, "Something went wrong while creating the metric");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, metric, "Metric created successfully"));
});

const updateMetric = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid metric ID");
    }

    const allowedFields = [
        "title", "value", "description", "icon", "suffix",
        "label", "is_active", "display_order"
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

    const metric = await Metric.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!metric) {
        throw new ApiError(404, "Metric not found");
    }

    return res.status(200).json(
        new ApiResponse(200, metric, "Metric updated successfully")
    );
});

const deleteMetric = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        throw new ApiError(400, "Invalid Metric ID");
    }

    const metric = await Metric.findByIdAndDelete(id);

    if (!metric) {
        throw new ApiError(404, "Metric not found or already deleted");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Metric deleted successfully"));
});

export {
    getAllMetrics,
    createMetric,
    updateMetric,
    deleteMetric,
};