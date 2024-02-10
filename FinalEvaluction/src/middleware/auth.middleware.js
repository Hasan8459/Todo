const express = require("express")
const jwt = require("jsonwebtoken")


const Authentication = async(req,res,next)=>{
    try {
        const headerauthorization = req.headers.authorization
        const [Bearer, token2] = headerauthorization.split(` `)

        jwt.verify(token2, "masai", function(err, decoded) {
            if(decoded){
                //console.log(decoded.userId,decoded.username,req.body)
                req.body.username = decoded.name
                req.body.userId = decoded.userId
               next()
            } else{
                res.status(200).send({"msg":"login first or wrong token or token expired"})
            }
          });

    } catch (error) {
        res.status(501).send({"error":error.message})
    }
}

module.exports = {Authentication}