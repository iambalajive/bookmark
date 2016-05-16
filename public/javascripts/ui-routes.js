angular.module('bookmarker').config(function ($routeProvider) {
    $routeProvider

    // route for deleting bookmark
        .when('/bookmark-delete', {
            templateUrl: 'templates/bookmark-delete.html',
        })

        // route for llisting folders
        .when('/folder', {
            templateUrl: 'templates/folder-add.html',
        })
        // route for adding bookmark
        .when('/bookmark-add', {
            templateUrl: 'templates/bookmark-add.html',
        })

        // route for Editing bookmark
        .when('/bookmark-edit', {
            templateUrl: 'templates/bookmark-edit.html',
        }).otherwise({
        redirectTo: '/'
    });
});
