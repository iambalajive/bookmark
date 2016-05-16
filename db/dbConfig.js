var mongoose = require("mongoose");
var mongooseIncrement = require("mongoose-auto-increment");

// var connection = mongoose.connect('mongodb://localhost:27017/local');
var connection = mongoose.connect("mongodb://admin:admin@ds059165.mlab.com:59165/iambalajive")


mongooseIncrement.initialize(connection);
var Schema = mongoose.Schema;


var bookMarkSchema = new Schema({title: {type: String}, url: {type: String}, id: {type: Number}})

var FolderSchema = new Schema({
    folderName: {type: String, required: true},
    folderId: {type: Number},
    bookmarks: [bookMarkSchema]
})

FolderSchema.plugin(mongooseIncrement.plugin, {
    model: 'folder',
    field: 'folderId',
    startAt: 1,
    incrementBy: 1
});


var FolderModel = mongoose.model("folder", FolderSchema);

// var Folder =new FolderModel();
module.exports.Folder = FolderModel;
