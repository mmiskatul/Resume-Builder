import fs from 'fs'
import path from 'path'

import Resume from '../models/resumeModel.js'
import upload from '../middleware/uploadMiddle.js'


export const uploadResumeImage=async (req,res)=>{
    try {
        // Configure multer to handle images
        upload.fields([ {name:"thumbnail"},{name: "profileImage"}]);
        (req,res,async()=>{
            if(err){
                return res.status(400).json({
                    message:"file upload failed ",
                    error: err.message
                })
            }
            const resumeId=req.params.id;
            const resume =await Resume.findOne({_id :resumeId,userId:req.user._id});
            if(!resume){
                return res.status(404).json({
                    message:"resume not found or unauthorized"
                })
            }
            // Use process CWD to locate uploads folder 

            const uploadsFolder=path.join(process.cwd(),"uploads")
            const baseUrl=`${req.protocol}://${req.get("host")}`;
            const newthumbnail=req.files.thumbnails?.[0];
            const newprofileImage=req.files.profileImage?.[0];
            
            if(newthumbnail){
                if(resume.thumbnailink){
                    const oldThumbnail=path.join(uploadsFolder,path.basename(resume.thumbnailink));
                    if(fs.existsSync(oldThumbnail)){
                        fs.unlinkSync(oldThumbnail);
                    }
                }
                resume.thumbnailink =`${baseUrl}/uploads/${newthumbnail.filename}`;

            }
             
            // 
            if(newprofileImage){
               if(resume.profileInfo?.profilePreviewUrl){
                    const oldProfile=path.join(uploadsFolder,path.basename(resume.profileInfo?.profilePreviewUrl));
                    if(fs.existsSync(oldProfile)){
                        fs.unlinkSync(oldProfile);
                    }
                }
                resume.profileInfo.profilePreviewUrl =`${baseUrl}/uploads/${newprofileImage.filename}`;

            }

            await resume.save();
            res.status(200).json({
                message :"Image Uploaded Successfully ",
                thumbnailink :resume.thumbnailink,
                profilePreviewUrl :resume.profileInfo.profilePreviewUrl
            })
        })
        
        // 
    } catch (error) {
        console.error('Error Uploading image :',error);
        res.status().json({
            message :"Failed to uploads Images ",
            error:error.message
        })
    }
}