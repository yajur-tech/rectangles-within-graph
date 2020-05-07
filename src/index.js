import * as d3 from 'd3';
import $ from "jquery";
import 'bootstrap';


import 'bootstrap/dist/css/bootstrap.min.css';
import 'webpack-icons-installer/bootstrap';
import './css/style.css';


let aggGraphSvgModerate = null;


let aggGraphSvgModerateDetails = null;

let aggGraphWidth = document.getElementById("aggGraphModerate").offsetWidth/2;
let aggGraphHeight = aggGraphWidth;
let aggGraphPadding = 60; 

let colors = {
  "a": "#E933B7", 
  "b": "#2DC110"
}

// The location of the bar comes from the keys 00 => the co-ordinates of 0,0 and the value implies the height. for e.g. 0.00625 is 6.25% of the height of the section. Each section has two bars one for "a" and another for "b"
let barData = {
  0 : {
    "a": [
    {"00": 0.0625},
    {"01": 0.125},
    {"02": 1},
    {"03": 0.0625},
    {"10": 0.0625},
    {"11": 0.0625},
    {"12": 0.0625},
    {"13": 0.0625},
    {"20": 0.0625},
    {"21": 0.0625},
    {"22": 0.0625},
    {"23": 0.0625},
    {"30": 0.0625},
    {"31": 0.0625},
    {"32": 0.0625},
    {"33": 0.0625}
  ],
    "b": [
      { "00": 0.0625 } ,
      { "01": 0.0625},
      { "02": 0.0625},
      { "03": 0.0625},
      { "10": 0.0625},
      { "11": 0.0625},
      { "12": 0.0625},
      { "13": 0.0625},
      { "20": 0.0625},
      { "21": 0.0625},
      { "22": 0.0625},
      { "23": 0.0625},
      { "30": 0.0625},
      { "31": 0.0625},
      { "32": 0.0625},
      { "33": 0.0625}
    ]
  },
  0.5 : {
    "a": [
      {"00": 0.0325},
      {"01": 0.0625},
      {"02": 0.0625},
      {"03": 0.0625},
      {"10": 0.535},
      {"11": 0.0625},
      {"12": 0.0625},
      {"13": 0.0625},
      {"20": 0.0225},
      {"21": 0.0625},
      {"22": 0.0625},
      {"23": 0.2098},
      {"30": 0.0625},
      {"31": 0.53625},
      {"32": 0.0625},
      {"33": 0.0625}
    ],
      "b": [
        { "00": 0.0625 } ,
        { "01": 0.0625},
        { "02": 0.0625},
        { "03": 0.0625},
        { "10": 0.3625},
        { "11": 0.3625},
        { "12": 0.0625},
        { "13": 0.0625},
        { "20": 0.4625},
        { "21": 0.0625},
        { "22": 0.5625},
        { "23": 0.0035},
        { "30": 0.055},
        { "31": 0.0625},
        { "32": 0.0625},
        { "33": 0.0625}
      ]
  },
};

window.addEventListener("load", (event) => {


  aggGraphSvgModerate = createSvgForDiv(aggGraphWidth, aggGraphWidth, "#aggGraphModerate", "aggGraphSvgModerate");

  aggGraphSvgModerateDetails = setupGraph(aggGraphSvgModerate, aggGraphWidth, aggGraphHeight, aggGraphPadding, "Rectangles in Graph", [0,1,2,3,4], [0,1,2,3,4], "X Values", "Y Values");

  console.log(barData[0]["a"]);

  // TODO1: The problem here is that the rectangle height is not being set correctly. What we want is that if the value of the height in bar data is 0.0625 it means it should be 6.25% of the section height. Each square is considered a section in the graph. If the data in barData is 1 it means it should fill up the section. 
  let aRects = aggGraphSvgModerateDetails.graphSvg.selectAll(".a")
                            .data(barData[0]["a"])
                            .enter()
                            .append("rect")
                            // .attr("transform", d => {
                            //   let xVal = d.split("")[0];
                            //   let yVal = d.split("")[1];
                            //   "translate(" + aggGraphSvgModerateDetails.xScale(xVal) + 30 + "," +  aggGraphSvgModerateDetails.yScale(yVal) + ") rotate(90)"
                            // })
                            .attr("x", d => {
                              let xVal = Object.keys(d)[0].split("")[0];
                              return aggGraphSvgModerateDetails.xScale(xVal) + 30
                            })
                            .attr("y", d => {
                              let yVal = Object.keys(d)[0].split("")[1];
                              return aggGraphSvgModerateDetails.yScale(yVal);
                            })
                            .attr("width", d=> {
                              return 10;
                            })
                            .attr("height", d=> {
                              return (aggGraphSvgModerateDetails.yScale(0) - aggGraphSvgModerateDetails.yScale(1)) * d[Object.keys(d)[0]]   ;
                            })
                            .attr("fill", d => {
                              return colors["a"];
                            })
  
  let bRects = aggGraphSvgModerateDetails.graphSvg.selectAll(".b")
                          .data(barData[0]["b"])
                          .enter()
                          .append("rect")
                          // .attr("transform", d => {
                          //   let xVal = d.split("")[0];
                          //   let yVal = d.split("")[1];
                          //   "translate(" + aggGraphSvgModerateDetails.xScale(xVal) + 30 + "," +  aggGraphSvgModerateDetails.yScale(yVal) + ") rotate(90)"
                          // })
                          .attr("x", d => {
                            let xVal = Object.keys(d)[0].split("")[0];
                            return aggGraphSvgModerateDetails.xScale(xVal) + 50
                          })
                          .attr("y", d => {
                            let yVal = Object.keys(d)[0].split("")[1];
                            return aggGraphSvgModerateDetails.yScale(yVal);
                          })
                          .attr("width", d=> {
                            return 10;
                          })
                          .attr("height", d=> {
                            return (aggGraphSvgModerateDetails.yScale(0) - aggGraphSvgModerateDetails.yScale(1)) * d[Object.keys(d)[0]]  ;
                          })
                          .attr("fill", d => {
                            return colors["b"];
                          })
                            
  console.log(aggGraphSvgModerateDetails.graphSvg)

  timerFunction();

});


function timerFunction() {
  // write the code to transition from barData 0 to barData 0.5 so that we get the height values from 0.5
   // so you will be using barData[0.5]
}


function createSvgForDiv(width, height, divId, svgId) {
  var svg = d3.select(divId)
            .append("svg")
              .attr("id", svgId)
              .attr("width", width)
              .attr("height", height)
              .attr("background-color", "#9C817B");;
  return svg;
}

function setupGraph(graphSvg, graphWidth, graphHeight, graphPadding, title, xArray, yArray, xLabel, yLabel) {

  let graphDetails = {};

  let xScale = d3.scaleLinear()
            .domain([d3.min(xArray),d3.max(xArray)])
            .range([graphPadding, graphWidth - graphPadding]);
  let yScale = d3.scaleLinear()
                  .domain([d3.min(yArray),d3.max(yArray)])
                  .range([graphHeight - graphPadding, graphPadding]);

  let xAxis = d3.axisBottom()
                .scale(xScale)
                .tickValues(xArray)
                .tickFormat(i => {
                  return maptoThree(i)
                });

  let yAxis = d3.axisLeft()
                .scale(yScale)
                .tickValues(yArray)
                .tickFormat(i => {
                  return maptoThree(i)
                });

  // Drawing the x axis
  graphSvg.append("g")
          .attr("class","axisline")
          .attr("transform", "translate(0," + (graphHeight - graphPadding) + ")")
          .call(xAxis)
            .selectAll("text")
            .attr("class", "axisTickLbls")
            .attr("dx", "3em")

  // Drawing the Y axis
  graphSvg.append("g")
  .attr("transform", "translate("+(graphPadding) + ",0)")
  .call(yAxis)
    .selectAll("text")
    .attr("class", "axisTickLbls")
    .attr("dy", "-2em");

  // Draw the x axis grid lines
  graphSvg.append("g")
          .attr("class", "grid")
          .attr("transform", "translate(0," + (graphHeight - graphPadding) + ")")
          .call(d3.axisBottom().scale(xScale).tickValues(xArray).tickFormat("").tickSize(-(graphHeight - (2 * graphPadding))));

  // Draw the y axis grid lines
  graphSvg.append("g")
          .attr("class", "grid")
          .attr("transform", "translate(" + graphPadding + ",0)")
          .call(d3.axisLeft().scale(yScale).tickValues(yArray).tickFormat("").tickSize(-(graphWidth - (2 * graphPadding))));
  
  // X Axis Label
  graphSvg.append("text")
            .attr("class", "axisLbl xAxisLbl")
            .attr("transform", "translate(" + (graphWidth/2.2) + "," + (graphHeight -(graphPadding/3)) + ")")
            .text(xLabel)

  // Y Axis Label
  graphSvg.append("text")
            .attr("class", "axisLbl yAxisLbl")
            .attr("transform", "rotate(-90)")
            .attr("y", (graphPadding/1.2))
            .attr("x", -(graphHeight/1.5))
            .attr("dy", "-1.7em")
            .text(yLabel);

  // Graph Title
  graphSvg.append("text")
            .attr("x", (graphWidth / 4.5))
            .attr("y", (graphHeight/15))
            .attr("class", "pltTitle")
            .text(title);
  
  graphDetails.xScale = xScale;
  graphDetails.yScale = yScale;
  graphDetails.graphSvg = graphSvg;
  return graphDetails;
}

function maptoThree(i) {
  if(i==0) {
    return 3
  } else if(i==1) {
    return 2
  } else if(i==2) {
    return 1
  } else if(i==3) {
    return 0
  }
}

