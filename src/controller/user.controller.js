import { asynchandler } from "../utils/asynchandler.js";
import { User } from "../models/user.models.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { json } from "express";
 

 




export const createWaitlist = async (req, res) => {
    try {
        const { email,name,phoneNumber } = req.body;
    
        if (!email || !email.includes('@')) {
          return res.status(400).json({ message: 'Invalid email' });
        }
    
        const existing = await User.findOne({ email });

        if (existing) {
          return res.status(409).json({ message: 'Email already joined the waitlist' });
        }
    
        const saved = await User.create({ email, name, phoneNumber });
        res.status(201).json({ message: 'Successfully joined the waitlist', data: saved });
    
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
}










const generateTokens = async(userId)=>{

  const user = await User.findById(userId).select("-password -refreshToken")

  const accessToken = user.generateAccessToken(user._id)
  const refreshToken = user.generateRefreshToken(user._id)

  user.refreshToken = refreshToken;

  await user.save();

  console.log("user after refresh token save", user);

  return {accessToken, refreshToken};

}

export const registeruser = asynchandler(async (req, res) => {

  console.log("req.body", req.body);
  

  const { fullname, email, password } = req.body;



  // 1. Validate required fields
  if (!fullname || !email || !password) {
    throw new ApiError(400, "All fields (fullname, email, password) are required");
  }

  // 2. Check if user already exists
  const existingUser = await User.findOne({ email });

  console.log("existingUser", existingUser);
  

  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

   

  // 3. Create new user
  const newUser = await User.create({
    fullname,
    email,
    password,
     
    Role: "user",
  });

  console.log("newUser", newUser);
  

  

  // 5. Send response
  res.status(201).json(new ApiResponse(201, newUser, "User registered successfully"));

})


export const createAdmin = asynchandler(async (req, res) => {

  console.log("req.body", req.body);
  
  const { fullname, email, password , mobile } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ApiError(409, "User with this email already exists");
    }

      
      const path =  req.file?.buffer

      console.log("path" , path);
      
  
    const avatar = await uploadOnCloudinary(path );

    console.log("avatar urll" , avatar);
    

    if (!avatar) {
      throw new ApiError(500, "Avatar upload failed");
    }

    const newUser = await User.create({
      fullname,
      email,
      password,
      mobile,
      avatar: avatar?.url || null,
      Role: "admin",
    });

    res.status(201).json(new ApiResponse(201, newUser, "Admin created successfully"));

})

export const login = asynchandler(async (req, res) => {

  console.log("req.body", req.body);
  
  const { email, password } = req.body;

  // 1. Validate required fields
  if (!email || !password) {
    throw new ApiError(400, "All fields (email, password) are required");
  }

  // 2. Check if user exists
  const user = await User.findOne({ email }) 
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  console.log("user",  password);
  

  // 3. Check password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const { accessToken, refreshToken } = await generateTokens(user._id);

  const loggedin = await User.findById(user._id).select("-password")

  const options = {
      httpOnly: true,
      secure: false,
      
      sameSite: "Lax", // Adjust as needed for cross-site requests
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    };
  

     return res.status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
          201, 
          {
              user :  loggedin,
              accessToken,
              refreshToken
          },
          "User logged in successfully"
      )
  )
}
)


export const updateProfile = asynchandler(async (req, res) => {

  const userId = req.user.id; // from auth middleware
  const { mobile, bio, college, club, events } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { mobile, bio, college, club, events },
    { new: true }
  );

  res.status(200).json(new ApiResponse(200, updatedUser, "Profile updated"));
});


export const getuserbyid = asynchandler(async (req, res) => {

  const userId =req.user._id;



  const user = await User.findById(userId).select("-password -refreshToken");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  res.status(200).json(new ApiResponse(200, user, "User found"));
})

export const getallusers = asynchandler(async (req, res) => {  

  const users = await User.find().select("-password -refreshToken");

  if (!users) {
    throw new ApiError(404, "No users found");
  }

  res.status(200).json(new ApiResponse(200, users, "Users found"));
})