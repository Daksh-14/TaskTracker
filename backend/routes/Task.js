import { db } from "../database/db.js";
import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { uploadfiles } from "../cloudinary.js";
import { storage } from "../middleware/multerUpload.js";
import multer from 'multer';
    
const upload = multer({ storage: storage });
const router = express.Router();

router
  .route('/:id/create')
  .post(authenticate, upload.array('files', 10), async (req, res) => {
    console.log(req.body)
    const user = req.user;
    const teamId=parseInt(req.params.id);
    const { title ,description ,dueDate ,links} = req.body;
    const files = req.files;
    const teamLeaderCheck = await db.query('SELECT * FROM teamleader WHERE teamid=$1 AND userid=$2', [teamId, user]);
    let rd=new Date();
    rd=rd.toISOString().slice(0,10);
    let dd=dueDate.slice(0,10);
    if (teamLeaderCheck.rowCount === 0) {
      return res.status(403).json({ message: 'You are not authorized to create tasks for this team.' });
    }

    try {
      let fileUrls = [];
      if (files && files.length > 0) {
        for (const file of files) {
          const uploadedFile = await uploadfiles(file.path);
          if (uploadedFile) {
            fileUrls.push(uploadedFile.url);
          }
        }
      }

      const result = await db.query(
        'INSERT INTO tasks (title, description, teamId, fileUrls, assigndate, duedate, createdby, links) VALUES ($1, $2, $3, $4, $5, $6, $7,$8) RETURNING id',
        [title, description, teamId, JSON.stringify(fileUrls), rd, dd, user,JSON.stringify(links)]
      );
    
      // The ID of the newly inserted task
      const newTaskId = result.rows[0].id;
      
      res.status(201).json({id:newTaskId,user});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Can't proceed your request. Please try again later." });
    }
  });

router
    .route('/addtask')
    .post(authenticate,async(req,res)=>{
        const {uid,taskid}=req.body;
        try{
           
          await db.query('Insert into taskassign(userid,taskId) values($1,$2)',[uid,taskid]);
            
          res.status(200).json({message:"Task assignment successful"});
        }catch(error){
            res.status(500).json({message:"Task assignment failed"});
        }
    })  

router
    .route('/:id/all')
    .get(authenticate,async(req,res)=>{
      const teamid=parseInt(req.params.id);
      const user=req.user;
      const data=await db.query(`Select taskid,title,duedate,firstname,lastname from taskassign join tasks on tasks.id=taskassign.taskid join users on users.id=tasks.createdby
          where taskassign.userid=$1 and tasks.teamid=$2`,[user,teamid]);
          console.log(data.rows);
      res.status(200).json(data.rows);
    })
    
router
    .route('/:id')
    .get(authenticate,async(req,res)=>{
      const taskid=parseInt(req.params.id);
      const user=req.user;
      const data=await db.query(`Select * from taskassign join tasks on tasks.id=taskassign.taskid join users on users.id=tasks.createdby
          where taskid=$1`,[taskid]);
          console.log(data.rows);
      res.status(200).json(data.rows);
    })
export default router;
