angular.module("bookmarker").factory("BookMarkService", BookMarkService);

BookMarkService.$inject = ["$http"];

//The Service that takes care of Bookmark CRUD operations
function BookMarkService($http) {

    //Exposing the api functions
    var bookMark = {
        createBookMark: createBookMark,
        deleteBookMark: deleteBookMark

    }

    return bookMark;

    //Function to delete the bookmark
    function deleteBookMark(bookmarkId, sourceFolderId) {
        var config = {
            method: "POST",
            url: "/bookmarks/" + bookmarkId,
            data: {
                sourceFolderId: sourceFolderId,
            }
        }
        return $http(config)
    }

//Function to createBookMark
    function createBookMark(folderId, title, url) {
        var config = {
            method: "PUT",
            url: "/bookmarks/" + folderId,
            data: {
                title: title,
                url: url
            }
        }

        return $http(config)
    }


}
