import express from 'express'
import { protect } from '../middleware/authMiddle.js';
import { createResume, deleteResume, getResumeById, getUserResume, updateResume } from '../controller/resumeController.js';
import { uploadResumeImage } from '../controller/uploadImages';



const resumeRoute=express.Router();

resumeRoute.post('/',protect,createResume);

resumeRoute.get('/',protect,getUserResume);
resumeRoute.get('/:id',protect,getResumeById);

resumeRoute.put('/:id',protect,updateResume);

resumeRoute.put('/:id/upload-images',protect,uploadResumeImage)

resumeRoute.delete('/:id',protect,deleteResume);

export default resumeRoute;