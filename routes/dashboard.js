const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentification');

router.get('/details',auth.authentificateToken,(req,res,next)=>{
    var categoryCount;
    var stageCount;
    var formCount;
    var query = "select count(id) as categoryCount from category";
    connection.query(query,(err,results)=>{
        if(!err){
            categoryCount = results[0].categoryCount;
        }
        else{
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as stageCount from stage";
    connection.query(query,(err,results)=>{
        if(!err){
            stageCount = results[0].stageCount;
        }
        else{
            return res.status(500).json(err);
        }
    })

    var query = "select count(id) as formCount from form";
    connection.query(query,(err,results)=>{
        if(!err){
            formCount = results[0].formCount;
            var data ={
                category:categoryCount,
                stage:stageCount,
                form:formCount
            }

            return res.status(200).json(data);
        }
        else{
            return res.status(500).json(err);
        }
    })



})

module.exports = router;