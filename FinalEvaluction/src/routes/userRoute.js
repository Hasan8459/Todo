const express = require("express")
const { UserModel } = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const UserRouter =  express.Router()

UserRouter.post("/users/register",async(req,res)=>{
    try {
        const {name,email,gender,password} = await UserModel(req.body)
      
        bcrypt.hash(password, 5, async function(err,hash){  
            //    res.send(hash)
               if(err){
                res.send({"error":err.message})
               } else {
                const User = new UserModel({name,email,gender,password:hash})
                await User.save()
                res.status(200).send({"msg":"New User has been created"})
               }
            })

    } catch (error) {
        res.status(501).send({"error":error.message})      
    }
})

UserRouter.post("/users/login",async(req,res)=>{
    try {

        const {email,password} = req.body
        const user = await UserModel.findOne({email})
       
        if(user){
            bcrypt.compare(password,user.password,function(err,result){
                if(result){
                 accesToken = jwt.sign({userId: user._id,name:user.name},`masai`, {expiresIn: `1h`})

                 refreshToken = jwt.sign({batch:`cap05-170`},`prepleaf`,{expiresIn:`24h`})
            
                 res.status(200).send({"msg":"Login succesful","token":accesToken,"refreshToken":refreshToken})
                } else {
                    res.status(200).send({"msg":"Password is wrong"})
                }
            })
           
        } else {
            res.status(200).send({"msg":"Email is wrong "})
        }

    } catch (error) {
        res.status(501).send({"error":error.message})      
    }
})

module.exports = {UserRouter}