import { db } from "../database/db.js";
import express from "express";
import { authenticate } from "../middleware/authenticate.js";
import { v4 as uuidv4 } from "uuid";
import { JWT_SECRET, JWT_REFRESH_SECRET, JWT_EXPIRATION, JWT_REFRESH_EXPIRATION } from '../config.js';

const router=express.Router();

router
    .route('/create')
    .post(authenticate,async(req,res)=>{
        const {teamName}=req.body;
        const user=req.user;
        try{
            const teamCode=uuidv4();
            await db.query('Insert into teams (TeamName,teamleader,joincode) values($1,$2,$3)',[teamName,user,teamCode]);
            res.status(201).json({message:"Team formed successfully"});
        }
        catch(error){
            res.status(500).json({message:"Team formation unsuccessful"});
        }
    })

    router
    .route('/all/joined')
    .get(authenticate, async (req, res) => {
      const user = req.user;
      try {
        const teams = await db.query(
          `SELECT teams.id,teams.TeamName, users.firstName AS fName, users.lastName AS lName
           FROM teamMember 
           JOIN teams ON teamMember.teamId = teams.id 
           JOIN users ON teams.teamLeader = users.id
           WHERE teamMember.userId = $1`,
          [user]
        );
        return res.status(200).json({ teams: teams.rows });
      } catch (error) {
        res.status(500).json({ message: "Can't proceed your request.\n Please try again later." });
      }
    });
  

router
    .route('/all/created')
    .get(authenticate,async(req,res)=>{
        const user=req.user;
        try{
            const teams = await db.query(
                `SELECT *
                 FROM teams  
                 WHERE teamleader = $1`,
                [user]
            );
            res.status(200).json({teams:teams.rows});
        }
        catch(error){
            res.status(500).json({message:"Can't proceed your request.\n Please try again later."})
        }
    })

router
    .route('/join')
    .post(authenticate,async(req,res)=>{
        const user=req.user;
        const {joinCode}=req.body.formData;
        try{
            const id=await db.query('select id from teams where joincode=$1',[joinCode]);

            if(id.rowCount==0){
                return res.status(403).json({message:"No team found. Please enter correct join code."});
            }
            await db.query('Insert into teamMember (userId,teamId) values($1,$2)',[user,id.rows[0].id]);
            res.status(200).json({message:"Team joined successfully."})
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"Can't process your request. Please try again later."})
        }
    })

router
    .route('/update/:id')
    .put(authenticate,async(req,res)=>{
        const user=req.user;
        const id=req.params.id;
        const {teamName}=req.body;
        try{
            await db.query("Update teams set teamName=$1 where id=$2 and teamleader=$3",[teamName,id,user]);
            res.status(200).json({message:"Name changed successfully"});
        }
        catch(error){
            res.status(500).json({message:"Can't proceed your request. Please try again."} );
        }
    })

router
    .route('/delete/:id')
    .delete(authenticate,async(req,res)=>{
        const id=req.params.id;
        try{
            await db.query('delete from teamMember where teamid=$1',[id]);
            await db.query('delete from teams where id=$1',[id]);
            res.status(200).json({message:"Team deletion succesful"})
        }
        catch(error){
            console.log(error)
            res.status(500).json({message:"Can't proceed your request. Please try again."} );
        }
    })

export default router;