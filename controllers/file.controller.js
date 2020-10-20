var stream = require('stream');

// const db = require('../config/db.config.js');
// const Answer = require('../models').Answer
const File = require('../models').File

exports.uploadFile = (req, res, cb) => {
    File.create({
        type: req.file.mimetype,
        name: req.file.originalname + '-' + Date.now(),
        data: req.file.buffer
    }).then(() => {
        res.json({ msg: 'File uploaded successfully! -> filename = ' + req.file.originalname });
    }).catch(err => {
        console.log(err);
        res.json({ msg: 'Error', detail: err });
    });
}

exports.listAllFiles = (req, res) => {
    File.findAll({ attributes: ['id', 'name'] }).then(files => {
        res.json(files);
    }).catch(err => {
        console.log(err);
        res.json({ msg: 'Error', detail: err });
    });
}

exports.found =(req, res,cb) =>{
    let id = req.params.id
    File.findOne({where: {id: id}})
    .then(data =>{
        res.status(222).json({
            data

        })
    }).catch(err => {
        console.log(err);
        res.json({ msg: 'Error', detail: err });
    });
}

exports.downloadFile = (req, res) => {
    console.log(req.params.id)
    File.findById(req.params.id).then(file => {
        var fileContents = Buffer.from(file.data, "base64");
        var readStream = new stream.PassThrough();
        readStream.end(fileContents);

        res.set('Content-disposition', 'attachment; filename=' + file.name);
        res.set('Content-Type', file.type);

        readStream.pipe(res);
    }).catch(err => {
        console.log(err);
        res.json({ msg: 'Error', detail: err });
    });
}