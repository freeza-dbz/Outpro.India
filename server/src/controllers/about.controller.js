import { About } from "../models/about.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getAboutInfo = asyncHandler(async (req, res) => {
    let aboutInfo = await About.findOne();

    if (!aboutInfo) {
        aboutInfo = await About.create({
            mission: "To deliver exceptional digital solutions.",
            vision: "To be a leading provider of innovative technology services.",
            story: "We are a team of passionate developers, designers, and strategists focused on helping businesses grow through meaningful digital experiences.",
            founded_year: new Date().getFullYear(),
            values: [{ title: 'Innovation', description: 'We embrace new technologies.' }]
        });
    }

    return res.status(200).json(new ApiResponse(200, aboutInfo, "About info fetched successfully"));
});

const updateAboutInfo = asyncHandler(async (req, res) => {
    const { mission, vision, story, founded_year, values } = req.body;

    const updateData = {
        mission,
        vision,
        story,
        founded_year,
        values
    };

    const aboutInfo = await About.findOneAndUpdate(
        {}, 
        { $set: updateData },
        {
            new: true,
            upsert: true, 
            runValidators: true,
            setDefaultsOnInsert: true,
        }
    );

    if (!aboutInfo) {
        throw new ApiError(500, "Something went wrong while updating about info");
    }

    return res.status(200).json(new ApiResponse(200, aboutInfo, "About info updated successfully"));
});

export {
    getAboutInfo,
    updateAboutInfo,
};