const express = require('express');
const connection = require('../connection');
const router = express.Router();
let ejs = require('ejs');
let pdf = require('html-pdf');
let path = require('path');
var fs = require('fs');
var uuid = require('uuid');
var auth = require('../services/authentification');
var checkRole = require('../services/checkRole');

router.post('/generateReport', auth.authentificateToken, (req, res) => {
    const generatedUuid = uuid.v1();
    const formDetails = req.body;
    var stageDetailsReport = JSON.parse(formDetails.stageDetails);
    var query = "insert into form (name,uuid,email,enseignant,niveauE,stageDetails,createdBy) values(?,?,?,?,?,?,?)";
    connection.query(query, [formDetails.name, generatedUuid, formDetails.email, formDetails.enseignant, formDetails.niveauE, formDetails.stageDetails, res.locals.email], (err, results) => {
        if (!err) {
            ejs.renderFile(path.join(__dirname, '', "report.ejs"), { stageDetails: stageDetailsReport, name: formDetails.name, email: formDetails.email, enseignant: formDetails.enseignant, niveauE: formDetails.niveauE }, (err, results) => {
                if (err) {
                    return res.status(500).json(err);
                }
                else {
                    pdf.create(results).toFile("./generated_pdf/" + generatedUuid + ".pdf", function (err, data) {
                        if (err) {
                            console.log(err);
                            return res.status(500).json(err);
                        }
                        else {
                            return res.status(200).json({ uuid: generatedUuid });
                        }
                    })
                }
            });
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.post('/getPdf', auth.authentificateToken, function (req, res) {
    const formDetails = req.body;
    const pdfPath = './generated_pdf/' + formDetails.uuid + '.pdf';
    if (fs.existsSync(pdfPath)) {
        res.contentType('application/pdf');
        fs.createReadStream(pdfPath).pipe(res);
    }
    else {
        var stageDetailsReport = JSON.parse(formDetails.stageDetails);
        ejs.renderFile(path.join(__dirname, '', "report.ejs"), { stageDetails: stageDetailsReport, name: formDetails.name, email: formDetails.email, enseignant: formDetails.enseignant, niveauE: formDetails.niveauE }, (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            else {
                pdf.create(results).toFile("./generated_pdf/" + formDetails.uuid + ".pdf", function (err, data) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }
                    else {
                        res.contentType('application/pdf');
                        fs.createReadStream(pdfPath).pipe(res);
                    }
                })
            }
        });
    }
})

router.get('/getForms', auth.authentificateToken, (req, res, next) => {
    var query = "select *from form order by id DESC";
    connection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else {
            return res.status(500).json(err);
        }
    })
})

router.delete('/delete/:id', auth.authentificateToken, (req, res, next) => {
    const id = req.params.id;
    var query = "delete from form where id=?";
    connection.query(query, [id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Internship id is not found" });
            }
            return res.status(200).json({ message: "Internship deleted successfully" });
        }
        else {
            return res.status(500).json(err);
        }
    })
})


module.exports = router;