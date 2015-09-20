var margin = {top: 30, right: 20, bottom: 40, left: 40},
width = Math.min(window.innerWidth, 1000) - margin.left - margin.right,
height = Math.min(window.innerHeight, 900) - margin.top - margin.bottom;

//bar Width
var barWidth = 100;

//formatter
var formatValue = d3.format("0,000");

var barHeight = 10, barGap = 13;

//translating the graph
var translate = 110;

//load csv
d3.csv("data/CO2-Emissions.csv", function(error, data){
    if (error) throw error;

    data.forEach(function(d){
        d.value = +d.value;
    });

    //create the color scale
    var xScale = d3.scale.linear()
    .range([0, width- translate])
    .domain(d3.extent(data, function(d){return d.value;}));

    //create the container
    var svg = d3.select("#graph").append("svg")
    .attr("width", width +translate)
    .attr("height", height);

    //select bars
    var bar = svg.append("g").attr("class", "bars").selectAll(".bar")
    .data(data);

    bar.enter()
    .append("rect")
    .attr("width", 0)
    .attr("height", barHeight)
    .attr("x", 0)
    .attr("y", function(d, i){
        return i * barGap;
    })
    .attr("fill", "rgb(170, 49, 93)")
    .attr("class", "bar")
    .append("title")
    .html(function(d){
        return d.country + ": "+d.value;
    });

    bar.transition().duration(1000)
    .attr("width", function(d){
        return xScale(d.value) ;
    });
    d3.selectAll(".bars").attr("transform", "translate(" + translate + ",0)");


    //bar values
    var values = svg.append("g").attr("class", "values").selectAll(".value")
    .data(data);

    values.enter()
    .append("text")
    .attr("class", "value")
    .attr("x", 0)
    .attr("dy", ".75em")
    .attr("dx", ".5em")
    .attr("y", function(d, i){
        return i * barGap;
    })
    .text(function(d){
        return addComas(d.value);
    });

    values
    .transition()
    .duration(1000)
    .attr("x", function(d){
        return xScale(d.value) ;
    })

    d3.selectAll(".values").attr("transform", "translate(" + translate + ",0)");

    //countries
    var values = svg.append("g").attr("class", "countries").selectAll(".country")
    .data(data)
    .enter()
    .append("text")
    .attr("class", "country")
    .attr("x", 0)
    .attr("dy", ".75em")
    .attr("dx", "7em")
    .attr("y", function(d, i){
        return i * barGap;
    })
    .attr("text-anchor", "end")
    .text(function(d){
        return d.country;
    });

    var line = svg.append("line")
    .attr("x1", -1)
    .attr("x2", -1)
    .attr("y1", 0)
    .attr("y2", data.length * barGap)
    .attr("stroke", "#777")
    .attr("stroke-width", 1)
    .attr("transform", "translate(" + translate + ",0)");



});

//function to
function addComas(n) {
       return formatValue(n).replace('.', ',').replace('.', ',');
   }
