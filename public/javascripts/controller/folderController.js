angular.module("bookmarker", ['ngRoute']).controller("FolderController", FolderController);

FolderController.$inject = ['$scope', 'FolderService', 'BookMarkService', '$location']

function FolderController($scope, FolderService, BookMarkService, $location) {

    var vm = this;

    //the model Attributes go here
    vm.bookmarks = [];
    vm.folders = [];
    vm.newBookMark = {};
    vm.folder = {}

    vm.createFolder = createFolder;
    vm.deleteFolder = deleteFolder;
    vm.createBookMark = createBookMark;
    vm.moveBookMark = moveBookMark;
    vm.defaultRedirect = defaultRedirect;
    vm.deleteBookMark = deleteBookMark;

    vm.init = init;

//Function to create folder
    function createFolder() {
        FolderService.createFolder(vm.folderName).then(function successCb(response) {
            init();
            vm.folderName = "";
        })
    }

    //Function to delete the folder based on given folder Id
    function deleteFolder(folderId) {

        FolderService.deleteFolder(folderId).then(function successCb(response) {
            init();
        })
    }

//Function to delete the the bookmarks
    function deleteBookMark() {
        if (vm.newBookMark._id) {
            BookMarkService.deleteBookMark(vm.newBookMark._id, vm.newBookMark.folderId).then(function successCb(response) {
                init();
            })
        }

    }

//navigate to default path
    function defaultRedirect() {
        $location.path("/");
    }

//Migrate bokkmark to another folder
    function moveBookMark() {
        BookMarkService.deleteBookMark(vm.newBookMark._id, vm.newBookMark.folderId).then(function successCb(response) {
            vm.createBookMark();
            vm.newBookMark = {};
        })
    }

//Create a new Bookmark
    function createBookMark() {
        BookMarkService.createBookMark(vm.folder.folderId, vm.newBookMark.title, vm.newBookMark.url).then(function successCb() {
            init();
            vm.newBookMark = {};
        })
    }

//Function that is called during the contoller initialization on page load
    function init() {

        FolderService.getFolder().then(function successCb(response) {

                var bookmarks = [];
                vm.folders = response.data.folders;
                angular.forEach(vm.folders, function (folder) {
                    angular.forEach(folder.bookmarks, function (bookmark) {
                        bookmark.folderName = folder.folderName;
                        bookmark.folderId = folder.folderId;
                        bookmarks.push(bookmark);
                    })
                })
                vm.bookmarks = bookmarks;
                if (vm.folders.length > 0) {
                    vm.folder = vm.folders[0];
                }


            }
        )
    }

    //init function called
    init();
}
