import { db } from "../database/db.js";
import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { uploadfiles } from "../cloudinary.js";
import { storage } from "../middleware/multerUpload.js";
import multer from 'multer';
    
const upload = multer({ storage: storage });
const router = express.Router();

router
  .route('/create')
  .post(authenticate, upload.array('files', 10), async (req, res) => {
    const user = req.user;
    const teamId=req.params.id;
    const { title, description, dueDate } = req.body;
    const files = req.files;

    // Check if user is a team leader
    const teamLeaderCheck = await db.query('SELECT * FROM teams WHERE id=$1 AND teamleader=$2', [teamId, user.id]);

    if (teamLeaderCheck.rowCount === 0) {
      return res.status(403).json({ message: 'You are not authorized to create tasks for this team.' });
    }

    try {
      let fileUrls = [];
      if (files && files.length > 0) {
        for (const file of files) {
          const uploadedFile = await uploadfiles(file.path);
          if (uploadedFile) {
            fileUrls.push(uploadedFile);
          }
        }
      }
      console.log(JSON.stringify(fileUrls));
      await db.query(
        'INSERT INTO tasks (title, description, teamId, fileUrls) VALUES ($1, $2, $3, $4)',
        [title, description, teamId, JSON.stringify(fileUrls)]
      );

      res.status(201).json({ message: 'Task created successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Can't proceed your request. Please try again later." });
    }
  });

router
    .route('/addtask')
    .post(authenticate,async(req,res)=>{
        const {array,taskid}=req.body;
        const id=req.params.id
        try{
            for(const uid of array){
                await db.query('Insert into membertasks(userid,teamid,taskId) values($1,$2,$3)',[uid,id,taskid]);
            }
            res.status(200).json({message:"Task assignment successful"});
        }catch(error){
            res.status(500).json({message:"Task assignment failed"});
        }
    })  

export default router;