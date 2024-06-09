import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary}  from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async(userId)=>{
    try {
       const user = await User.findById(userId);
       const accessToken = user.generateAccessToken();
       const refreshToken = user.generateRefreshToken();

       user.refreshToken = refreshToken
       await user.save({validateBeforeSave: false})

       return {accessToken, refreshToken}
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generate token")
    }
}

const userRegister = asyncHandler(async (req, res)=>{

    const {fullName, email, username, password} = req.body;

    if(
        [fullName, email, username, password].some(field => field?.trim()==="")
    ){
        throw new ApiError(400, "All Fields are required")
    }

    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    console.log(existedUser);

    if(existedUser){
        throw new ApiError(400, "user already existed")
    }

    // console.log("avatar img"+ req.files);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverLocalPath)

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || 0, 
        email,
        password,
        username: username.toLowerCase(),
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "User is not created")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, 'user created successfully')
    )

    // return res.status(200).json({"message":" User is Created"})

    // console.log(req.body);
    // console.log(email);
    // res.status(200)
})

const loginUser = asyncHandler( async (req, res)=>{
    
    const {email, username, password} = req.body;

    if(!username && !email ){
        throw new ApiError(400, "User Name or Email not found");
    }

   const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "User Not found")
    }

   const isPasswordValid =  await user.isPasswordCorrect(password);

   if(!isPasswordValid){
    throw new ApiError(404, "Invalid user Credentials")
    }

   const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

  const loggedInUser =  await User.findById(user._id).select("-password -refreshToken");

  console.log(loggedInUser);

  // for cookie
  const options = {
      httpOnly: true,
      secure: false
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
      new ApiResponse(
          200,
          {
              user: loggedInUser, accessToken, refreshToken
          },
          "User logged in Successfully"
      )
  )

})

const logOutUser = asyncHandler( async(req, res) =>{
    // req.user._id 
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: undefined
        }
    },
    {
        new: true
    }
    )

    const options = {
        httpOnly: true,
        secure: false
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged out Seccfully"))
})

const refreshAccessToken = asyncHandler(async(req, res)=> {
 const incomingRefreshToken =   req.cookies.refreshToken || req.body.refreshToken;

 if(!incomingRefreshToken){
    throw new ApiError(401, "Anuthorized Error")
 }
try {
    
    const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
    
     const user = User.findById(decodedToken?._id);
    
     if(!user){
         throw new ApiError(401, "Invalid Refresh Token")
     }
    
     if(incomingRefreshToken !== user?.refreshToken){
         throw new ApiError(401, "Refresh Token is expired")
     }
    
     
     const options = {
         httpOnly: true,
         secure: false
        }
     const {accessToken, newRefreshToken} =   await generateAccessAndRefreshToken(user?._id);
    
    return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', newRefreshToken, options)
    .json(
        new ApiResponse(
            200,
            {accessToken, refreshToken: newRefreshToken},
            "Access token refreshed"
        )
    )
} catch (error) {
    throw new ApiError(401, "unauthorized")
}
    
})

const changeCurrentPassword = asyncHandler(async(req, res)=>{
    
    const {oldPassword, newPasword} = req.body;

    const user = await User.findById(req?.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid Old Password")
    }

    user.password = newPasword;
    await user.save({validateBeforeSave: false})
})


const getCurrentUser = asyncHandler(async(req, res)=>{
    return res
    .status(200)
    .json(200, req.user, "current user fetched Succesfully")
});

const updateAccountDetails = asyncHandler(async(req, res)=>{
    const {fullName, email} = req.body;

    if(!fullName || !email){
        throw new ApiError(400, "All fields are required")
    }

    const user = User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                fullName,
                email
            }
        },
        {new: true}
    ).select("-password")

    return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated Succesfully"))
})

const updateAvatarImage = asyncHandler(async(req, res)=> {

    const imageLocalPath = req.file?.path;

    if(!imageLocalPath){
        throw new ApiError(400, "Image path not found")
    }

    const updateOnCloudinary = await uploadOnCloudinary(imageLocalPath)

    if(!updateOnCloudinary.url){
        throw new ApiError(400, "cloudnary url not found");
    }

    await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set:{
                avatar: updateOnCloudinary.url
            }
        },
        {new: true}
        )

    return res
    .status(200)
    .json(
       new ApiResponse(
        200,
        user,
        "Avatar image updated successfully"
       )
    ).select("-password")    
})



export {
    userRegister,
    loginUser,
    logOutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateAvatarImage
}