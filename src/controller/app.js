    /**
 * @ngdoc controller
 * @name popApp.controller:PopCtrl
 *
 * @description
 * This controller send and http request and retrieves population data from REST API.
   Sets values for plotting population data.
 */

    var app = angular.module('popApp', ['nvd3']);


    app.controller('PopCtrl', function($scope, $http) {

          $scope.$watch('search', function() {

         $http.get("https://api.mlab.com/api/1/databases/energyx/collections/population?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A")
            .then(function(response2) {
              $scope.popData = [
                       { key: "Population",

                       values: response2.data
                       }]
            }); 

        });
        
        /*
         @ngdoc variable
         @name popOptions
          Sets plotting options like the scale and values
        */

         $scope.popOptions = {
                chart: {
                    type: 'discreteBarChart',
                    height: 250,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 75
                    },
                    x: function(d){return d.year;},
                    y: function(d){return ((d.population/1000).toFixed(1));},
                    showValues: true,
                    valueFormat: function(d){
                       // return d3.format(',.4f')(d);
                        return d > 999 ? (d/1000).toFixed(1) + 'k' : d

                    },
                    duration: 300,
                    xAxis: {
                        axisLabel: 'Year'
                    },
                    yAxis: {
                        axisLabel: 'Population(in thousands)',
                        axisLabelDistance: 5
                    }
                }
            };
       
                    }) ; 