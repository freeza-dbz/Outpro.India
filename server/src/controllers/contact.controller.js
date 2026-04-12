import { Contact } from "../models/contact.model.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Get the single contact document
const getContactInfo = asyncHandler(async (req, res) => {
    let contactInfo = await Contact.findOne();

    if (!contactInfo) {
        // To avoid 404 on a fresh setup, create and return a default document.
        contactInfo = await Contact.create({
            email: "contact@example.com",
            phone: "+1 234 567 890",
            address: "123 Example St, City, Country",
            business_hours: "Mon-Fri, 9am - 5pm",
        });
    }

    return res.status(200).json(new ApiResponse(200, contactInfo, "Contact info fetched successfully"));
});

// Create or Update the single contact document
const updateContactInfo = asyncHandler(async (req, res) => {
    const { email, phone, address, business_hours, linkedin_url, twitter_url, facebook_url } = req.body;

    const updateData = {
        email, phone, address, business_hours, linkedin_url, twitter_url, facebook_url
    };

    // Use findOneAndUpdate with upsert:true to handle both creation and update
    const contactInfo = await Contact.findOneAndUpdate(
        {}, // An empty filter will match the first document found
        { $set: updateData },
        {
            new: true,
            upsert: true, // Create the document if it doesn't exist
            runValidators: true,
            setDefaultsOnInsert: true,
        }
    );

    if (!contactInfo) {
        throw new ApiError(500, "Something went wrong while updating contact info");
    }

    return res.status(200).json(new ApiResponse(200, contactInfo, "Contact info updated successfully"));
});

export {
    getContactInfo,
    updateContactInfo,
};