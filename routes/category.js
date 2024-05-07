const express = require('express');
const connection = require('../connection');
const router = express.Router();
var auth = require('../services/authentification');
var checkRole = require('../services/checkRole');

router.post('/add', auth.authentificateToken, checkRole.checkRole, (req, res, next) => {
    let category = req.body;
    query = "insert into category (name) values(?)";
    connection.query(query, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Category added successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})


router.get('/get', auth.authentificateToken, (req, res, next) => {
    var query = "select * from category order by name";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.patch('/update', auth.authentificateToken, checkRole.checkRole, (req, res, next) => {
    let stage = req.body;
    var query = "update category set name =? where id=?";
    connection.query(query, [stage.name, stage.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Category id not found" });
            }
            return res.status(200).json({ message: "Category updeated successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

module.exports = router;