var app = angular.module("lineApp",[]);

/**
 * @ngdoc factory
 * @name lineApp.factory:locations
 *
 * @description
 * This factory creates http request for yearly energy data from REST API.
 */
app.factory('locations', function($http) {
  var promise = null;

  return function() {
    if (promise) {
      // If we've already asked for this data once,
      // return the promise that already exists.
      return promise;
    } else {
      promise = $http.get('https://api.mlab.com/api/1/databases/energyx/collections/energydata_all?&apiKey=6JzRAzvdeqyLKAfQAqMOsLYLvvIdJG6A');
      return promise;
    }
  };
});

/**
 * @ngdoc controller
 * @name lineApp.controller:MultiController
 *
 * @description
 * This controller send and http request and retrieves yearly energy data from REST API.
   Sets values for plotting multiline energy data.
 */
app.controller('MultiController', function($scope, locations) {
  locations().success(function(data) {
    $scope.locations = data;
  });
});

/**
 * @ngdoc directive
 * @name lineApp.directive:map
 *
 * @description
 * This directive plots the dynamic energy consumption data through the years 2012 till 2016 .
 */
app.directive('map', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      locations: '=locations'
    },
    link: function(scope, element, attrs) {
      scope.$watch('locations', function(locations) {
  
        var data= scope.locations;
        var margin = {
            top: 20,
            right: 80,
            bottom: 30,
            left: 50
          },
          width = 500 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;


        var x = d3.scale.linear()
          .range([0, width]);

        var y = d3.scale.linear()
          .range([height, 0]);

        var color = d3.scale.category10();

        var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

        var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left").tickFormat(d3.format("0s")) ;

        var line = d3.svg.line()
          .interpolate("linear")
          .x(function(d) {
            return x(d.month);
          })
          .y(function(d) {
            return y(d.temperature);
          });

        var svg = d3.select(element[0]).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        color.domain(d3.keys(data[0]).filter(function(key) {
          return (key !== "month" &&  key !== "_id") ;
        }));



        var cities = color.domain().map(function(name) {
          return {
            name: name,
            values: data.map(function(d) {
              return {
                month: +d.month,
                temperature: +d[name]
              };
            })
          };
        });

        x.domain([0,12]);

        y.domain([
          d3.min(cities, function(c) {
            return d3.min(c.values, function(v) {
              return v.temperature;
            });
          }),
          d3.max(cities, function(c) {
            return d3.max(c.values, function(v) {
              return v.temperature;
            });
          })
        ]);


        svg.append("rect")
                    .attr("width", "100%")
                    .attr("height", "100%")
                    .attr("fill", "#ffffcc");

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis)
          .append("text")
          .attr("x", 100)
          .attr("y", -10)
          .text("Months (Jan-Dec)");

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Consumption(kwh)");

          svg.append("text")
                      .attr("x", 400)             
                      .attr("y", 75)
                      .attr("text-anchor", "middle")  
                      .style("font-size", "14px") 
                      .style("font-weight", "bold") 
                      .style("fill", "#3366cc")  
                      .text("2012");
         svg.append("text")
                      .attr("x", 400)             
                      .attr("y", 90)
                      .attr("text-anchor", "middle")  
                      .style("font-size", "14px") 
                      .style("font-weight", "bold") 
                      .style("fill", "#ff9900")  
                      .text("2013");
         svg.append("text")
                      .attr("x", 400)             
                      .attr("y", 105)
                      .attr("text-anchor", "middle")  
                      .style("font-size", "14px") 
                      .style("font-weight", "bold") 
                      .style("fill", "#109618")  
                      .text("2014");
         svg.append("text")
                      .attr("x", 400)             
                      .attr("y", 120)
                      .attr("text-anchor", "middle")  
                      .style("font-size", "14px") 
                      .style("font-weight", "bold") 
                      .style("fill", "#dc3912")  
                      .text("2015");
          svg.append("text")
                      .attr("x", 400)             
                      .attr("y", 135)
                      .attr("text-anchor", "middle")  
                      .style("font-size", "14px") 
                      .style("font-weight", "bold") 
                      .style("fill", "#a939ff")  
                      .text("2016");                                                       
        var city = svg.selectAll(".city")
          .data(cities)
          .enter().append("g")
          .attr("class", "city");
        
        city.selectAll(".points")
          .data(function(d){
            return d.values;
          })
          .enter()
          .append("circle")
          .attr("cx", function(d){
             return x(d.month);
          })
          .attr("cy", function(d){
            return y(d.temperature);
          }) 
          .attr("r", 5)
          .style("fill", function(d,i,j){
            return color(cities[j].name);      
          });

        city.append("path")
          .attr("class", "line")
          .attr("d", function(d) {
            return line(d.values);
          })
          .style("stroke", function(d) {
            return color(d.name);
          });

       




      });
    }
  };
});