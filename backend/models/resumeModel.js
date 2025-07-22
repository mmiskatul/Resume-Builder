import mongoose from 'mongoose'

const ResumeSchema=new mongoose.Schema({
    UserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref :'User',
        required:true,
    },title:{
        type:String,
        required :true,

    },thumbnailink:{
        type:String,
    },template:{
        theme:String ,
        colorPalette:[String ]
    },profileInfo:{
        profilePreviewUrl :String ,
        fullName:String ,
        designation :String,
        summary :String ,
    },contactInfo:{
        email:String,
        phone:String,
        location:String,
        linkedin:String ,
        githubLink:String,
        website:String,
    },
    // Work Exp
    workExperience:[
        {
            company:String,
            role:String ,
            startDate: String ,
            endDate:String ,
        },
    ],education:[
        {
            degres:String,
            institution:String,
            startDate:String,
            endDate:String,
        },
    ],
    skill:[
        {
        name:String ,
        progress:Number,

        },
    ],
    projects:[
        {
            title:String ,
            description:String,
            githubLink:String,
            liveDemo:String,
        },
    ],certification:[
        {
            title:String,
            issure:String,
            year:String,
        }
    ],languages:[
        {
            name:String,
            progress:Number,
        }
    ],interests:[String],
},{
    timestamps:{createdAt :"createdAt",updatedAt:"updatedAt"}
});

export default mongoose.model('Resume',ResumeSchema);