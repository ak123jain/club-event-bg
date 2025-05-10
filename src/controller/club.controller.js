import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Club } from "../models/club.models.js";

export const addclub = asynchandler(async (req, res) => {


    if (!req.user) {
        throw new ApiError(400, " userbis not logged in is required");
    }

    const userid = req.user._id;

    const  existingclub = await Club.findOne({ admin: userid });

    if (existingclub) {
        throw new ApiError(400, "You already have a club");
    }

    console.log("req.user", req.body);
    

    const {name ,description , sociallink } = req.body;

    if (!name || !description || !sociallink) {
        throw new ApiError(400, "All fields (name, description, sociallink) are required");
    }

    const file = req.file?.path || null;

    const clubphoto = await uploadOnCloudinary(file);

    console.log("clubphoto", clubphoto);

    if (!clubphoto) {
        throw new ApiError(500, "clubphoto upload failed");
    }

    const newclub = await Club.create({
        name,
        description,
        sociallink,
        clubphoto: clubphoto?.url || null,
        admin: req.user._id,
    });

    res.status(200).json(new ApiResponse(200, newclub, "club created"));

})


export const getallclub = asynchandler(async (req, res) => {

    const allclub = await Club.find({}).populate("admin", "-password -refreshtoken") 

    if (!allclub) {
        throw new ApiError(404, "No club found");
    }

    res.status(200).json(new ApiResponse(200, allclub, "all club found"));

})


export const addeventinclub = asynchandler(async (req, res) => {

    const clubId = req.params.clubId;
    const eventId = req.params.eventId;

    const club = await Club.findById(clubId);

    if (!club) {
        throw new ApiError(404, "Club not found");
    }

    club.events.push(eventId);
    await club.save();

    res.status(200).json(new ApiResponse(200, club, "Event added to club successfully"));

})


export const removeeventfromclub = asynchandler(async (req, res) => {

    const clubId = req.params.clubId;
    const eventId = req.params.eventId;

    const club = await Club.findById(clubId);

    if (!club) {
        throw new ApiError(404, "Club not found");
    }

    club.events.pull(eventId);
    await club.save();

    res.status(200).json(new ApiResponse(200, club, "Event removed from club successfully"));

})

