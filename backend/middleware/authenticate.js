import express from "express"
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_REFRESH_SECRET, JWT_EXPIRATION, JWT_REFRESH_EXPIRATION } from '../config.js';

export const authenticate=(req,res,next)=>{
    const accessToken=req.cookies.accessToken;
    const refreshToken=req.cookies.refreshToken;
    if(!accessToken){
        if(!refreshToken){
            return res.status(404).json({message:"Refresh token expired"});
        }
        try{
        const user=jwt.verify(refreshToken,JWT_REFRESH_SECRET);
        const userid=user.userId;
        const newAccessToken=jwt.sign({userId:userid},JWT_SECRET,{expiresIn:JWT_EXPIRATION});
        res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
        req.user=userid;
        next()
        }
        catch(error){
            return res.status(404).json({message:"Refresh token expired"});
        }
    }
    else{
        try{
            const user=jwt.verify(accessToken,JWT_SECRET);
            const userid=user.userId;
            req.user=userid;
            next();
        }
        catch(error){
            console.log("here");
            if(!refreshToken){
                return res.status(404).json({message:"Refresh token expired"});
            }
            try{
            const user=jwt.verify(refreshToken,JWT_REFRESH_SECRET);
            const userid=user.userId;
            const newAccessToken=jwt.sign({userId:userid},JWT_SECRET,{expiresIn:JWT_EXPIRATION});
            res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: true, sameSite: 'Strict' });
            req.user=userid;
            next()
            }
            catch(error){
                return res.status(404).json({message:"Refresh token expired"});
            }
        }
    }
}
