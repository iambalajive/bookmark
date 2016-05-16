var Folder = require("../db/dbConfig.js").Folder;
var express = require('express');
var router = express.Router();


router.put("/:folderId", addBookMarks);
router.post("/:bookmarkId", deleteBookMark);

//Function that finds the folder id and add the bookmark object to it
function addBookMarks(req, res) {
    var bookmark = {
        title: req.body.title,
        url: req.body.url
    }
    Folder.findOneAndUpdate({folderId: req.params.folderId}, {$push: {bookmarks: bookmark}}, function (err, doc) {
        if (err) {
            res.status(500).json({"message": "internal server error"});
        }
        res.json({message: 'bookmark Added Successfully '});

    })
}


//Function that deletes the bookmark from a particular folder
function deleteBookMark(req, res) {

    Folder.findOneAndUpdate({folderId: req.body.sourceFolderId}, {$pull: {bookmarks: {"_id": req.params.bookmarkId}}}, function (err, doc) {
        if (err) {
            res.status(500).json({"message": "internal server error"});
        }
        res.json({message: 'bookmark Deleted Successfully '});
    })
}


module.exports = router;


var router = express.Router();
