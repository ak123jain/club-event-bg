import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { json } from "express";
import { Club } from "../models/club.models.js";
import { Event } from "../models/event.model.js";   
import { User } from "../models/user.models.js";

 
export const addevent = asynchandler(async (req, res) => {

    console.log("from from add evnt" , req.body);
    

    const {name ,description ,  location , startdate , enddate , eventtype } = req.body;

    if (!name || !description  || !startdate || !enddate || !location || !eventtype) {
        throw new ApiError(400, "All fields (name, description, eventphoto , startdate , enddate) are required");
    }

    const path = req.file?.path

    console.log("path" , path);

    if (!path) {
      throw new ApiError(400, "eventphoto is required");
    }


    
    

    const eventphoto = await uploadOnCloudinary(path);

    if (!eventphoto) {
        throw new ApiError(500, "eventphoto upload failed");
    }

    
    const clubid = req.params.id
    console.log("club id" , clubid);
    
    

    const newevent = await Event.create({
        name,
        description,
        eventphoto: eventphoto?.url || null,
        startdate,
        enddate,
        location,
        eventtype,
        club:  clubid,
    });

    if(!newevent) {
        throw new ApiError(500, "Event creation failed");
    }


    
    const club = await Club.findByIdAndUpdate(
         clubid,
        {
            $addToSet: {
                events: newevent._id,
            },
        },
        { new: true }
    );


    if (!club) {
        throw new ApiError(404, "Club not found");
    }



    return res.status(200).json(new ApiResponse(200, newevent, "event created"));
})

export const geteventbyid = asynchandler(async (req, res) => {

    const id = req.params.eventId;

    const event = await Event.findById(id).populate("club", "-password -refreshtoken").populate("participant" , "-password -refreshtoken");

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    res.status(200).json(new ApiResponse(200, event, "Event found"));
})

export const getallevent = asynchandler(async (req, res) => {

    const allclub = await Event.find({}) 

    if (!allclub) {
        throw new ApiError(404, "No event found");
    }

    console.log("all events" , allclub);
    

    res.status(200).json(new ApiResponse(200, allclub, "all event found"));

})




 

export const leaveevent = asynchandler(async (req, res) => {

    const id = req.params.eventId;

    const userId = req.user.id;

    const event = await User.findByIdAndUpdate(
        userId,
        {
            $pull: {
                events: id,
            },
        },
        { new: true }
    );

    await Event.findByIdAndUpdate(
        id,
        {
            $pull: {
                participant: userId,
            },
        },
        { new: true }
    );
    res.status(200).json(new ApiResponse(200, event, "Event left"));
})

export const editevents = asynchandler(async (req, res) => {

    const id = req.params.id;

    console.log("from edit event" , req.body);
    

    const { name, description, startdate, enddate, location, eventtype } = req.body;

    const event = await Event.findByIdAndUpdate(
        id,
        {
            name : name,
            description : description,
            startdate : startdate,
            enddate : enddate,
            location : location,
            eventtype : eventtype,
        },
        { new: true }
    );

    res.status(200).json(new ApiResponse(200, event, "Event updated"));
})
    

export const joinevent = asynchandler(async (req, res) => {

    const eventid = req.params.id;
    console.log("event id" , eventid);

    const userId = req.user.id;
    console.log("user id" , userId);

    const event = await Event.findByIdAndUpdate(
        eventid,
        {
            $addToSet: {
                participant: userId,
            },
        },
        { new: true }
    );

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $addToSet: {
                events: eventid,
            },
        },
        { new: true }
    )


    res.status(200).json(new ApiResponse(200, user, "Event joined"));   

 })


export const getallparticipants = asynchandler(async (req, res) => {

    const eventsid = req.params.id;

    console.log( "event id" , eventsid);

    const event = await Event.findById(eventsid).populate("participant" , "-password -refreshtoken");

    console.log( "event" , event);
    
    
    
    res.status(200).json(new ApiResponse(200, event, "Event found"));

})