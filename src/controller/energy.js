
/**
 * @ngdoc controller
 * @name energyApp.controller:EnergyController
 *
 * @description
 * This controller send and http request and retrieves energy data from REST API.
   Sets values for plotting energy data.
 */
  angular.module('energyApp', ['nvd3'])
    .controller('EnergyController', function($scope, $http) {
      $scope.$watch('search', function() {
        fetch();
      });

       /*
          @ngdoc variable
          @name search
          Sets default value for years dropdown
        */
         $scope.search = "2012";

          /*
          @ngdoc variable
          @name years
          Sets the year dropdown list
        */
          $scope.years = ["2012", "2013", "2014", "2015", "2016"];


      /**
       * @ngdoc method
       * @name fetch
       * @methodOf energyApp.controller:EnergyController
       * @description
       * This method will retrieve energy data from REST API as https response and assign to local variable.
       *

      */

      function fetch() {
        $http.get("https://api.mlab.com/api/1/databases/energyx/collections/energydata_" + $scope.search + "?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A")
          .then(function(response) {
            $scope.items = response.data;
          });


        $http.get("https://api.mlab.com/api/1/databases/energyx/collections/energydata_" + $scope.search + "?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A")
          .then(function(response) {
            $scope.energydata = [
                     { key: "Energy Data",

                     values: response.data
                     }]
          });

      }



        /*
          @ngdoc variable
          @name energyoptions
          Sets plotting options like the scale and values.Format the values if required
        */

       $scope.energyoptions = {
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
                      axisLabel: 'Consumption (kWh)',
                      axisLabelDistance: 5
                  }
              }
          };


    });