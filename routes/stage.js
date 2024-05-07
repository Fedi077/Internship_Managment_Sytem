const express =require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentification');
var checkRole = require('../services/checkRole');

router.post('/add',auth.authentificateToken,checkRole.checkRole,(req,res)=>{
    let stage = req.body;
    query = "insert into stage (name,categoryID,description,status) values(?,?,?,'true')";
    connection.query(query,[stage.name,stage.categoryID,stage.description],(err,results)=>{
        if(!err){
            return res.status(200).json({message:"Internship Added Successfully."});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.get('/get',auth.authentificateToken,(req,res,next)=>{
    var query ="select s.id,s.name,s.description,s.status,c.id as categoryID,c.name as categoryName from stage as s INNER JOIN category as c where s.categoryID=c.id";
    connection.query(query,(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})


router.get('/getByCategory/:id',auth.authentificateToken,(req,res,next)=>{
    const id =req.params.id;
    var query ="select id,name from stage where categoryID= ? and status='true'";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results);
        }
        else{
            return res.status(500).json(err);
        }
    })
})


router.get('/getById/:id',auth.authentificateToken,(req,res,next)=>{
    const id =req.params.id;
    var query ="select id,name,description from stage where id =?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            return res.status(200).json(results[0]);
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/update',auth.authentificateToken,checkRole.checkRole,(req,res,next)=>{
    let stage = req.body;
    var query ="update stage set name=?,categoryID=?,description=? where id=?"
    connection.query(query,[stage.name,stage.categoryID,stage.description,stage.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(400).json({message:"Internship id is not found"});
            }
            return res.status(200).json({message: "Internship updated successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id',auth.authentificateToken,checkRole.checkRole,(req,res,next)=>{
    const id =req.params.id;
    var query ="delete from stage where id=?";
    connection.query(query,[id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Internship id is not found"});
            }
            return res.status(200).json({message:"Internship deleted successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

router.patch('/updateStatus',auth.authentificateToken,checkRole.checkRole,(req,res,next)=>{
    let user = req.body;
    var query ="update stage set status=? where id=?";
    connection.query(query,[user.status,user.id],(err,results)=>{
        if(!err){
            if(results.affectedRows == 0){
                return res.status(404).json({message:"Internship id is not found"});
            }
            return res.status(200).json({message:"Internship Status Updated Successfully"});
        }
        else{
            return res.status(500).json(err);
        }
    })
})

module.exports = router;