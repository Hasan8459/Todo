const express = require("express")
const {Authentication} = require("../middleware/auth.middleware")
const { PostModel } = require("../models/postModel")
const { UserRouter } = require("./userRoute")

const PostRouter = express.Router()

//posts/add ==> A logged in user should only be able to add a new post.
PostRouter.post("/posts/add",Authentication,async(req,res)=>{
    try {
        const post = await PostModel(req.body)
        await post.save()
        res.status(200).send({"msg":"post created succesfully"})
        
    } catch (error) {
        res.send({"error":error.message})
    }
})

//posts ==> This will show the posts of logged in users.
PostRouter.get("/posts",Authentication,async(req,res)=>{
    try {
        const posts = await PostModel.find({userId:req.body.userId})
         res.status(200).send({"posts":posts})

    } catch (error) {
        res.status(501).send({"error":error.message})
    }
})

// /posts/update ==> The logged in user can update his/her posts.
UserRouter.patch("/posts/update:postId",Authentication,async(req,res)=>{
    try {

        const {postId} = req.params
        await PostModel.findByIdAndUpdate({_id:postId},req.body)
        res.status(200).send({"msg":"Updated succesfully"})
        
    } catch (error) {
        res.status(501).send({"error":error.message})
    }
})
//http://localhost:8080/posts/update/65c79b5d64e2fc7d5295bea3

// /posts/delete ==> The logged in user can delete his/her posts.
UserRouter.delete("/posts/delete/:postId",Authentication,async(req,res)=>{
    try {
        const {postId} = req.params
        await PostModel.findByIdAndDelete({_id:postId})
        res.status(200).send({"msg":"Deleted succesfully"})
        
    } catch (error) {
        res.status(501).send({"error ":error})
    }
})

// PostRouter.get("/posts?device=m",Authentication,async(req,res)=>{
//     try {
//         const {m} = req.query
//         const posts = await PostModel.find({"device":device})
//          res.status(200).send({"posts":posts})

//     } catch (error) {
//         res.status(501).send({"error":error.message})
//     }
// })


module.exports  = {PostRouter}