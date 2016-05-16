angular.module("bookmarker").factory("FolderService", FolderService);


FolderService.$inject = ["$http"]

//The service that takes care of Folder related crud operations
function FolderService($http) {

    var folderService = {
        getFolder: getFolder,
        createFolder: createFolder,
        deleteFolder: deleteFolder
    }

    return folderService;


    //Function that deletes the selected folder
    function deleteFolder(folderId) {
        var config = {
            method: "DELETE",
            url: "/folders/" + folderId
        }

        return $http(config);
    }

    //Function that creates a new Folder
    function createFolder(name) {
        var config = {
            method: "PUT",
            url: "/folders",
            data: {folderName: name}
        }

        return $http(config);
    }

    //Function that gets the folder
    function getFolder(folderId) {

        var config = {
            method: "GET",
            url: "/folders"
        }
        if (folderId) {
            config.url = config.url + "/" + folderId
        }

        return $http(config)

    }

}
