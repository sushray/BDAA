/*var app = angular.module('plunker', ['nvd3']);


app.controller('MainCtrl', function($scope, $http) {

      $scope.$watch('search', function() {

     $http.get("https://api.mlab.com/api/1/databases/energyx/collections/population?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A")
        .then(function(response2) {
          $scope.popData = [
                   { key: "Population",

                   values: response2.data
                   }]
        }); 

      fetch();
    });

    $scope.search = "2012";


    function fetch() {
      $http.get("https://api.mlab.com/api/1/databases/energyx/collections/energydata_" + $scope.search + "?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A")
        .then(function(response) {
          $scope.data = [
                   { key: "Cumulative Return",

                   values: response.data
                   }]
        });

       $http.get("https://api.mlab.com/api/1/databases/energyx/collections/weatherdata_average_" + $scope.search + "?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A")
        .then(function(response1) {
          $scope.weatherdata = [
                   { key: "Cumulative Return",

                   values: response1.data
                   }]
        }); 

    }

  
    $scope.select = function() {
      this.setSelectionRange(0, this.value.length);

    }

     $scope.options = {
            chart: {
                type: 'discreteBarChart',
                height: 350,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 75
                },
                x: function(d){return d.month;},
                y: function(d){return d.consumption;},
                showValues: true,
                valueFormat: function(d){
                    return d;
                },
                duration: 450,
                xAxis: {
                    axisLabel: 'Month'
                },
                yAxis: {
                    axisLabel: 'Consumption',
                    axisLabelDistance: 5
                }
            }
        };
   



$scope.weatheroptions = {
            chart: {
                type: 'discreteBarChart',
                height: 350,
                margin : {
                    top: 20,
                    right: 20,
                    bottom: 50,
                    left: 75
                },
                x: function(d){return d.month;},
                y: function(d){return d.data.tempAvg;},
                showValues: true,
                valueFormat: function(d){
                     return d.toFixed(3);
                },
                duration: 450,
                xAxis: {
                    axisLabel: 'Month'
                },
                yAxis: {
                    axisLabel: 'Average Temperature',
                    axisLabelDistance: 5
                }
            }
        };

 
   
    }) ; */