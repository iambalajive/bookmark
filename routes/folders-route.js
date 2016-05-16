var express = require('express');
var router = express.Router();
var Folder = require("../db/dbConfig.js").Folder;


router.post("/:id", editFolder);
router.put("/", createFolder);
router.get("/", getFolders);
router.get("/:id", getFolder);
router.delete("/:id", deleteFolder);


//Delete the given folder based on folder id
function deleteFolder(req, res) {

    if (!req.params.id) {
        res.status(500).json({"message": "internal server error"});
    }

    Folder.remove({
        folderId: req.params.id
    }, function (err, folder) {
        if (err) {
            res.status(500).json({"message": "internal server error"});
        }

        res.json({message: 'Folder Successfully deleted'});
    });
}


//Edit the folder based on Folder Id
function editFolder(req, res) {

    Folder.findOneAndUpdate({folderId: req.params.id}, {$set: {folderName: req.body.folderName}}, function (err, doc) {
        if (err) {
            res.status(500).json({"message": "internal server error"});
        }

        res.json({message: 'Folder Edited SuccessFully'});

    })

}

function createFolder(req, res) {
    var folder = new Folder({
        folderName: req.body.folderName,
    })
    folder.save(function (err) {
        if (err) {
            res.status(500).json({"message": "internal server error"});
        }
        res.json({message: 'Folder Saved SuccessFully'});

    });
}

//List all the folders
function getFolders(req, res) {
    Folder.find({}, function (err, folders) {
        if (err) {
            res.status(500).json({"message": "internal server error"});
        }
        var listFolders = {};
        listFolders.folders = folders;
        res.send(listFolders);
    });
}

//Get the particular folder based on folderid
function getFolder(req, res) {
    var listFolders = {};
    listFolders.folders = new Array();

    var query = Folder.where({folderId: req.params.id});
    query.findOne(function (err, folder) {
        if (err) {
            res.status(500).json({"message": "internal server error"});
        }
        if (folder) {
            listFolders.folders.push(folder);
            res.send(listFolders);
        }
    });
}

module.exports = router;
