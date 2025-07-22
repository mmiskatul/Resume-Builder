import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


// Generate a Token JWT
const generateToken =(userid)=>{
    return jwt.sign({id:userid},process.env.JWT_SECRET,{expiresIn:'7d'})
}


export const registerUser =async (req,res)=>{
    try {
        const {name,email ,password}=req.body;

        // check if the user already register
        const userExits =await User.findOne({email});
        if(userExits){
            return res.status(400).json({
                message:"User already Exists "
            })
        }
        if(password.length<8 ){
            return res.status(400).json({
                success:false,
                message: 'password must be atleast of 8 character'
            })
        }
        // Hasing Password
        const salt=await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(password,salt);
        
        // CREATE A USER
        const user=await User.create({
            name,
            email,
            password :hashpassword,
        })
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)

        })

    } catch (error) {
        res.status(500).json({
            message:"Sever Error !Somthing Went Wrong ",
            error:error.message
        })
    }
}


// Login Function 
export const loginUser=async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(404).json({
                message:"Invalide email or password  "
            }) 
        }
        // Compare with Password 
        const isMatch=await bcrypt.compare(password,user.password);
         if(!isMatch){
            return res.status(500).json({
                message :"Invalide email or password"
            })
        }
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)

        })
    } catch (error) {
         res.status(500).json({
            message:"Sever Error !Somthing Went Wrong ",
            error:error.message
        })
    }
}

// get user profile
export const getuserProfile =async (req,res)=>{
    try {
        const user =await User.findById(req.user.id).select("-password");
        if(!user){
            return res.status(404).json({
                message:"User Not Found"
            })
        }
        res.json(user)
    } catch (error) {
        res.status(500).json({
            message:"Sever Error !Somthing Went Wrong ",
            error:error.message
        })
    }
}