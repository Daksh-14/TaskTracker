import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({ 
    cloud_name: 'dv534zje8', 
    api_key: '692541759821176', 
    api_secret: '<your_api_secret>' // Click 'View Credentials' below to copy your API secret
});

const uploadfiles=async(filePath)=>{
    try{
        if(!filePath){
            return null;
        }
        const response=await cloudinary.uploader.upload(filePath,{
            resource_type:"auto"
        })
        return response;
    }
    catch(error){
        fs.unlinkSync(filePath)
        return null;
    }
}

export {uploadfiles};