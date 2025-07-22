import Resume from "../models/resumeModel.js";
import fs from "fs";
import path from "path";

// Create Resume
export const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    // DEFAULT TEMPLETE
    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
        },
      ],
      skills: [
        {
          name: "",
          progress: 0,
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          liveDemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: "",
        },
      ],
      interests: [""],
    };

    const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
      ...req.body,
    });
    res.status(201).json(newResume);
  } catch (error) {
    res.status(500).json({
      message: "Failed to Create Resume",
      error: error.message,
    });
  }
};

// get the Resume
export const getUserResume = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updateAt: -1,
    });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get Resume ",
      error: error.message,
    });
  }
};
// GET RESUME BY ID
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!resume) {
      return res.status(404).json({ message: "Resume Not Found" });
    }
    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: "Resume Not found",
    });
  }
};

// update Resume
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!Resume) {
      return res.status(404).json({
        message: "Resume Not Found or not Authorized",
      });
    }

    // MERGE UPDATED resume
    Object.assign(resume, req.body);

    //
    const saveResume = await Resume.save();
    res.json(saveResume);
  } catch (error) {
    res.status(500).json({
      message: "Resume Not found",
    });
  }
};

// DELETE RESUME
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!Resume) {
      return res.status(404).json({
        message: "Resume Not Found or not Authorized",
      });
      // Create a Upload Folder and Store the Resume there
      const uploadFloder = path.join(process.cwd(), "uploads");

      // DELETE the Resume
      if (resume.thumbnailink) {
        const oldthumbnailink = path.join(
          uploadFloder,
          path.basename(resume.thumbnailink)
        );
        if (fs.existsSync(oldthumbnailink)) {
          fs.unlinkSync(oldthumbnailink);
        }
      }
      if (resume.profileInfo?.profilePreviewUrl) {
        const oldprofile = path.join(
          uploadFloder,
          path.basename(resume.profileInfo.profilePreviewUrl)
        );
        if (fs.existsSync(oldprofile)) {
          fs.unlinkSync(oldprofile);
        }
      }

      // DELETE THE RESUME DOC
      const deleted = await Resume.findOneAndDelete({
        _id: req.params.id,
        userId: req.user._id,
      });
      if (!deleted) {
        return res.status(404).json({
          message: "Resume is not found  or you are not authorized",
        });
      }
      res.status(200).json({
        message: "Resume Deleted Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
        message:'Failed to Delete the Resume ',
        error:error.message
    })
  }
};
