import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({ 
    cloud_name: 'dv534zje8', 
    api_key: '692541759821176', 
    api_secret: 'TSVQ70NiJ3J_2-QhddD_pWPdy38' // Click 'View 
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
        return null;
    }
    finally{
        fs.unlinkSync(filePath)

    }
}

export {uploadfiles};