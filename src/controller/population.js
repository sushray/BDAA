    /**
 * @ngdoc controller
 * @name plunker.controller:MainCtrl
 *
 * @description
 * This controller send and http request and retrieves average weather and energy data from REST API.
   Sets values for plotting average weather and energy data.
 */

    var app = angular.module('plunker', ['nvd3']);
     app.controller('MainCtrl', function($scope, $http) {

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
       * @methodOf plunker.controller:MainCtrl
       * @description
       * This method will retrieve average average weather and energy from REST API as https response and assign to local variable.
       *

      */
        function fetch() {

            /* Retrieves average weather data */
          $http.get("https://api.mlab.com/api/1/databases/energyx/collections/weatherdata_average_" + $scope.search + "?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A")
            .then(function(response) {
                $scope.data = [{ values: [], key: "Average Temperature" }];
                $scope.temp = response.data;
                for(k in $scope.temp){
                    var a = $scope.temp[k].month;
                    var b = $scope.temp[k].data.tempAvg;
               $scope.data[0].values.push({ x: a ,  y: b});
           }

            $scope.winddata = [{ values: [], key: "Average Wind Speed" }];
                $scope.windtemp = response.data;
                for(k in $scope.windtemp){
                    var c = $scope.temp[k].month;
                    var d = $scope.temp[k].data.windSpdAvg;
               $scope.winddata[0].values.push({ x: c ,  y: d});
           }

            $scope.humdata = [{ values: [], key: "Relative Humidity" }];
                $scope.humtemp = response.data;
                for(k in $scope.humtemp){
                    var c = $scope.temp[k].month;
                    var d = $scope.temp[k].data.relHumAvg;
               $scope.humdata[0].values.push({ x: c ,  y: d});
           }

            $scope.predata = [{ values: [], key: "Precipitation" }];
                $scope.pretemp = response.data;
                for(k in $scope.pretemp){
                    var c = $scope.temp[k].month;
                    var d = $scope.temp[k].data.precip;
               $scope.predata[0].values.push({ x: c ,  y: d});
           }
                    
                
            });

        /* Retrieve average energy data*/

              $http.get("https://api.mlab.com/api/1/databases/energyx/collections/energydata_" + $scope.search + "?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A")
            .then(function(response) {
                $scope.energydata = [{ values: [], key: "Energy Data" }];
                $scope.temp = response.data;
                for(k in $scope.temp){
                    var a = $scope.temp[k].month;
                    var b = $scope.temp[k].consumption;
                    if(a=='january')
                        a=1;
                    else if(b=='march')
                        a=3;
                    else if(a=='february')
                        a=2;
                    else if(a=='april')
                        a=4;
                    else if(a=='may')
                        a=5;
                    else if(a=='june')
                        a=6;
                    else if(a=='july')
                        a=7;
                    else if(a=='august')
                        a=8;
                    else if(a=='september')
                        a=9;
                    else if(a=='october')
                        a=10;
                    else if(a=='november')
                        a=11;
                    else if(a=='december')
                        a=12;

                        $scope.energydata[0].values.push({ x: a ,  y: b});
                   
           }
                    
                
            });


        }


         /*
          @ngdoc variable
          @name options
          Sets plotting options like the scale and values for average temperature.Format the values if required
        */
         $scope.options = {
                chart: {
                    type: 'lineChart',
                    height: 350,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 75
                    },
                    x: function(d){return d.x;},
                    y: function(d){return d.y;},
                    showValues: true,
                    valueFormat: function(d){
                        return d.toFixed(3);
                    },
                    duration: 450,
                    xAxis: {
                        axisLabel: 'Month'
                    },
                    yAxis: {
                        axisLabel: 'Average Temperature (℉)',
                        axisLabelDistance: 5
                    }
                }
            };


             /*
          @ngdoc variable
          @name windoptions
          Sets plotting options like the scale and values for wind speed.Format the values if required
        */
        $scope.windoptions = {
                chart: {
                    type: 'lineChart',
                    height: 350,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 75
                    },
                    x: function(d){return d.x;},
                    y: function(d){return d.y;},
                    showValues: true,
                    valueFormat: function(d){
                        return d;
                    },
                    duration: 450,
                    xAxis: {
                        axisLabel: 'Month'
                    },
                    yAxis: {
                        axisLabel: 'Average Wind Speed(km/h)',
                        axisLabelDistance: 5
                    }
                }
            };


             /*
          @ngdoc variable
          @name preoptions
          Sets plotting options like the scale and values for precipitation.Format the values if required
        */

            $scope.preoptions = {
                chart: {
                    type: 'lineChart',
                    height: 350,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 75
                    },
                    x: function(d){return d.x;},
                    y: function(d){return d.y;},
                    showValues: true,
                    valueFormat: function(d){
                        return d;
                    },
                    duration: 450,
                    xAxis: {
                        axisLabel: 'Month'
                    },
                    yAxis: {
                        axisLabel: 'Precipitation(%)',
                        axisLabelDistance: 5
                    }
                }
            };

             /*
          @ngdoc variable
          @name humoptions
          Sets plotting options like the scale and values for humidity.Format the values if required
        */
            $scope.humoptions = {
                chart: {
                    type: 'lineChart',
                    height: 350,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 75
                    },
                    x: function(d){return d.x;},
                    y: function(d){return d.y;},
                    showValues: true,
                    valueFormat: function(d){
                        return d;
                    },
                    duration: 450,
                    xAxis: {
                        axisLabel: 'Month'
                    },
                    yAxis: {
                        axisLabel: 'Relative Humidity(%)',
                        axisLabelDistance: 5
                    }
                }
            };

             /*
          @ngdoc variable
          @name energyOptions
          Sets plotting options like the scale and values for energy consumption.Format the values if required
        */
               $scope.energyOptions = {
                chart: {
                    type: 'lineChart',
                    height: 350,
                    margin : {
                        top: 20,
                        right: 20,
                        bottom: 50,
                        left: 75
                    },
                    x: function(d){return d.x;},
                    y: function(d){return d.y;},
                    showValues: true,
                    valueFormat: function(d){
                        return d;
                    },
                    duration: 450,
                    xAxis: {
                        axisLabel: 'Month (Jan-Dec)'
                    },
                    yAxis: {
                        axisLabel: 'Consumption Units (kWh)',
                        axisLabelDistance: 5
                    }
                }
            };
       
       }) ; 