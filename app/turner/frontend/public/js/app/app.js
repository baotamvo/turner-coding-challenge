/**
 * User: thomas.vo
 * Date: 1/22/14
 * Time: 1:51 AM
 *
 */
angular.module('titleSearch',[])
  .controller('main',function($scope,$http) {
    $scope.keyChanged = function() {
      var key = $scope.titleSearchKey;
      if(!key) {
        $scope.titles = null;
        return;
      }

      $http.get('/title/q',{params: {key:key}})
        .then(function(resp) {
          $scope.titles = resp.data;
        });
    };
  });