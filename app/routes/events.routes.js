const express = require('express');
const router = express.Router();
const multer = require('multer');
const events = require('../controllers/events.controller');

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime().toString() + "_" + file.originalname);
    }
})

const fileFiler = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // accept
        cb(null, true)
    } else {
        // reject
        cb(new Error('message : file not acceptable'), false)
    }
}
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFiler
});

router.get('/test' ,  (req ,res) => {
    res.json("done");
});

//insert new event
router.post('/insert' , upload.single('photos') , events.insert );

//get all events
router.get('/getall' , events.getAll );

//get single event
router.get('/getsingle/:id' , events.getsingle );

//get all events by userid
router.get('/get/:userid' , events.getalluser );

//update event by id
router.patch('/update/:id' ,  events.update );

//delete event by id
router.delete('/delete/:id' , events.delete );

module.exports = router;