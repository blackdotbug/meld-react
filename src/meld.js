import React, { Component } from 'react'
import * as d3 from 'd3';
import d3Tip from 'd3-tip';
import Tabletop from 'tabletop';

// $(function() {
//     d3.select(window).on("resize", handleResize);

//     // When the browser loads, loadChart() is called
//     createGraph();
    
//   });

// function handleResize() {
//     var svgArea = d3.select("svg");

//     // If there is already an svg container on the page, remove it and reload the chart
//     if (!svgArea.empty()) {
//         svgArea.remove();
//         createGraph();
//     }
// }

class MELDChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
          data: [],
          width: 0,
          height: 100
        }
        this.chartRef = React.createRef();
        this.createGraph = this.createGraph.bind(this);
    }

    getWidth(){
        return document.getElementById('graph').offsetWidth;
    }
    getHeight(){
        return document.getElementById('graph').offsetHeight;
    }
    
    componentDidMount() {
        Tabletop.init({
          key: '1nA16yuLtUrdpZFpPzz-HUm-WlpPW2axHhidMOnC1TTQ',
          callback: googleData => {
            let meld = googleData["Sheet2"].elements;
            let wbc = googleData["Sheet3"].elements;
            this.setState({
                data: [meld, wbc],
                width: this.getWidth(),
                height: this.getWidth()/2
            }, ()=>{this.createGraph()});
          },
          simpleSheet: false
        })
        let resizedFn;
        window.addEventListener("resize", () => {
            clearTimeout(resizedFn);
            resizedFn = setTimeout(() => {
                this.redrawGraph();
            }, 200)
        });
    }

    redrawGraph() {
        let width = this.getWidth()
        this.setState({width: width, height: width/2});
        d3.select("svg").remove();
        this.createGraph = this.createGraph.bind(this);
        this.createGraph();
    }

    createGraph() {
        var margin = {
            top: 0,
            right: 50,
            bottom: 50,
            left: 0
        },
            chartWidth = this.state.width - margin.left - margin.right,
            chartHeight = this.state.height - margin.top - margin.bottom;

        var svg = d3.select(this.refs.canvas)
            .append("svg")
            .attr("height", chartHeight)
            .attr("width", chartWidth);
    
        var chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        var parseTime = d3.timeParse("%-m/%-d/%Y %H:%M:%S");
    
        // d3.json('/data').then(function(data){
            // version 1
            // source: https://www.hepatitisc.uw.edu/go/management-cirrhosis-related-complications/liver-transplantation-referral/calculate-meld-score
            // MELD(i) = round[ 0.378 * loge(bilirubin)) + (1.120*loge(INR)) + (0.957*loge(creatinine)) + 0.643 ] * 10(rounded to the tenth decimal place.)
            // MELD = MELD(i) + 1.32 * (137-Na) - [0.033*MELD(i)*(137-Na)]
            //Notes
            //This version of the MELD calculator includes United Network for Organ Sharing (UNOS) modifications of the original model.
            //The MELD utlizes log scale calculations and thus any value less than 1 is automatically given a lower limit value of 1 to prevent generating a negative score.
            //The lower limit of Serum Sodium (Na) is capped at 125, and the upper limit is capped at 137.
            //The upper limit of serum creatinine is capped at 4; in addition, if the patient had dialysis at least twice in the past week, the value for serum creatinine will be automatically adjusted to 4.0.
            //The maximum MELD score is 40.

            // source: https://en.wikipedia.org/wiki/Model_for_End-Stage_Liver_Disease
            //MELD = 3.78×ln[serum bilirubin (mg/dL)] + 11.2×ln[INR] + 9.57×ln[serum creatinine (mg/dL)] + 6.43

            // version 2
            // source: https://www.merckmanuals.com/medical-calculators/MELDNa.htm
            // MELDscore = 10 * ((0.957 * ln(Creatinine)) + (0.378 * ln(Bilirubin)) + (1.12 * ln(INR))) + 6.43
            // MELDNascore = MELDscore - SerumNa - (0.025 * MELDscore * (140 - SerumNa)) + 140

            // version 3
            // source: https://www.mdcalc.com/meld-score-model-end-stage-liver-disease-12-older#evidence
            // MELD(i) = 0.957 × ln(Cr) + 0.378 × ln(bilirubin) + 1.120 × ln(INR) + 0.643
            // Then, round to the tenth decimal place and multiply by 10. 
            // If MELD(i) > 11, perform additional MELD calculation as follows:
            // MELD = MELD(i) + 1.32 × (137 – Na) –  [ 0.033 × MELD(i) × (137 – Na) ]

            // var dates = JSON.parse(data);
            var dates = this.state.data[0];
            var wbc = this.state.data[1];

            dates.forEach(function(d) {
                d.date = parseTime(d['Date']);
                d.bilirubin = +d['Bilirubin Total (Calculated)0.2 - 1.2 mg/dL'];
                d.creatinine = +d['Creatinine0.60 - 1.30 mg/dL'];
                d.sodium = +d['Na135 - 144 mmol/L'];
                d.inr = +d['INR 0.9 - 1.1'];
            });

            wbc.forEach(function(d) {
                d.date = parseTime(d['Date']);
                d.wbc = +d['WBC Count (3.8 - 10.8 Thousand/uL)'];
            });

            // version 3
            dates.forEach(function(d) {
                if (d.creatinine > 0 && d.bilirubin > 0 && d.inr > 0){
                    var cr = d.creatinine < 1 ? 1 : d.creatinine;
                    var inr = d.inr < 1 ? 1 : d.inr;
                    var bi = d.bilirubin < 1 ? 1 : d.bilirubin;
                    d.meld1 = (10 * parseFloat(0.957 * Math.log(cr) + 0.378 * Math.log(bi) + 1.12 * Math.log(inr) + 0.643).toFixed(1));
                }
                else {d.meld1 = 0;}
            });

            dates.forEach(function(d) {
                if (d.meld1 > 11 && d.sodium > 0) {
                    var na = d.sodium;
                    if (d.sodium < 125) {
                        na = 125;
                    }
                    else if (d.sodium > 137) {
                        na = 137;
                    }
                    d.meld2 = parseFloat((d.meld1+1.32*(137-na)-(0.033*d.meld1*(137-na))).toFixed(1));
                }
                else {d.meld2 = d.meld1;}
            });


            // version 2
            // dates.forEach(function(d) {
            //     if (d.creatinine > 0 && d.bilirubin > 0 && d.inr > 0){
            //         d.meld1 = (10 * ((0.957 * Math.log(d.creatinine)) + (0.378 * Math.log(d.bilirubin)) + (1.12 * Math.log(d.inr))) + 6.43);
            //     }
            //     else {d.meld1 = 0;}
            // });

            // dates.forEach(function(d) {
            //     if (d.meld1 > 0 && d.sodium > 0) {
            //         d.meld2 = parseFloat((d.meld1 - d.sodium - (0.025 * d.meld1 * (140 - d.sodium)) + 140).toFixed(1));
            //     }
            //     else {d.meld2 = 0;}
            // });

            // version 1
            // dates.forEach(function(d) {
            //     if (d.creatinine > 0 && d.bilirubin > 0 && d.inr > 0){
            //         d.meld1 = parseFloat((((0.378*Math.log(d.bilirubin)) + (1.12*Math.log(d.inr)) + (0.957*Math.log(d.creatinine)) + 0.643) * 10).toFixed(1));
            //     }
            //     else {d.meld1 = 0;}
            // });

            // dates.forEach(function(d) {
            //     if (d.meld1 > 0 && d.sodium > 0) {
            //         d.meld2 = parseFloat((d.meld1+1.32*(137-d.sodium)-(0.033*d.meld1*(137-d.sodium))).toFixed(1));
            //     }
            //     else {d.meld2 = 0;}
            // });

            var extDates = d3.extent(dates, d => d.date);
            var extWBC = d3.extent(wbc, d => d.date);
            var extent = [d3.min([extDates[0], extWBC[0]]), d3.max([extDates[1], extWBC[1]])];

            var xTimeScale = d3.scaleTime()
                .range([0, chartWidth])
                .domain(extent);

            var xTimeScale2 = d3.scaleTime()
                .range([0, chartWidth])
                .domain(extent);

            var maxDates = d3.max(dates, d=>d.meld2);
            var maxWBC = d3.max(wbc, d=>d.wbc);

            var yLinearScale = d3.scaleLinear()
                .range([chartHeight, 0])
                .domain([0, d3.max([maxDates, maxWBC])]);
                
            var bottomAxis = d3.axisBottom(xTimeScale);
            var brushAxis = d3.axisBottom(xTimeScale2);
            var leftAxis = d3.axisLeft(yLinearScale);

            // chartGroup.append("rect")
            //     .attr("width", chartWidth)
            //     .attr("height", chartHeight)                                    
            //     .attr("x", 0) 
            //     .attr("y", 0)
            //     .attr("id", "mouse-tracker")
            //     .style("fill", "white");
            
            var context = chartGroup.append("g") // Brushing context box container
                .attr("transform", "translate(" + 0 + "," + (chartHeight + 30) + ")")
                .attr("class", "context");

            var brush = d3.brushX()//for slider bar at the bottom
                .extent([[xTimeScale.range()[0], 0], [xTimeScale.range()[1], chartHeight/4]]) 
                .on("brush end", brushed);
            
            var zoom = d3.zoom()
                .scaleExtent([1, Infinity])
                .translateExtent([[0, 0], [chartWidth, chartHeight]])
                .extent([[0, 0], [chartWidth, chartHeight]])
                .on("zoom", zoomed);
            
            var clip = chartGroup.append("defs").append("svg:clipPath")
                .attr("id", "clip")
                .append("svg:rect")
                .attr("width", chartWidth)
                .attr("height", chartHeight)
                .attr("x", 0)
                .attr("y", 0);
            
            var Line_chart = chartGroup.append("g")
                .attr("class", "focus")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .attr("clip-path", "url(#clip)");
        
            var focus = svg.append("g")
                .attr("class", "focus")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            context.append("g") // Create brushing xAxis
                .attr("class", "x axis1")
                .attr("transform", "translate(0," + chartHeight/4 + ")")
                .call(brushAxis);
            
            // var contextArea = d3.area() // Set attributes for area chart in brushing context graph
            //     .curve(d3.curveMonotoneX)
            //     .x(function(d) { return xTimeScale2(d.date); }) // x is scaled to xScale2
            //     .y0(20) // Bottom line begins at height2 (area chart not inverted) 
            //     .y1(0); // Top line of area, 0 (area chart not inverted)
            
            //plot the rect as the bar at the bottom
            // context.append("path") // Path is created using area details
            //     .attr("class", "area")
            //     .attr("d", contextArea(dates)) // pass first categories data .values to area path generator 
            //     .attr("fill", "#F1F1F2");
                
            //append the brush for the selection of subsection  
            
            chartGroup.append("rect")
                .attr("class", "zoom")
                .attr("width", chartWidth)
                .attr("height", chartHeight)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .call(zoom);
            
            context.append("g")
                .attr("class", "x brush")
                .call(brush)
                .call(brush.move, xTimeScale.range())
                .selectAll("rect")
                .attr("height", chartHeight/4) // Make brush rects same height 
                .attr("fill", "#E6E7E8");  

            var drawLine = d3
                .line()
                .defined(d => d.meld2 > 0)
                .x(d => xTimeScale(d.date))
                .y(d => yLinearScale(d.meld2));

            var wbcLine = d3
                .line()
                .x(d => xTimeScale(d.date))
                .y(d => yLinearScale(d.wbc));

            Line_chart.append("path")
                .datum(wbc)
                .classed("line wbc", true)
                .attr("d", wbcLine);
            
            Line_chart.append("path")
                .datum(dates.filter(drawLine.defined()))
                .attr("d", drawLine)
                .style("stroke-dasharray", ("3, 3"))
                .classed("line meld2", true);
            
            Line_chart.append("path")
                .datum(dates)
                .classed("line meld", true)
                .attr("d", drawLine);
            
            focus.append("g")
                .classed("y axis", true)
                .call(leftAxis);
            
            focus.append("g")
                .classed("x axis", true)
                .attr("transform", "translate(0, " + chartHeight + ")")
                .call(bottomAxis);

            var circlesGroup = Line_chart.selectAll("circle")
                .data(dates.filter(drawLine.defined()))
                .enter()
                .append("circle")
                .attr("cx", d => xTimeScale(d.date))
                .attr("cy", d => yLinearScale(d.meld2))
                .attr("r", "8")
                .attr("fill", "gold");

            var dateFormatter = d3.timeFormat("%-m/%-d/%y");

            var toolTip = d3Tip()
                .attr("class", "tooltip")
                .offset([50, 70])
                .html(function(d) {
                    return (`<h4>${dateFormatter(d.date)}: ${d.meld2}</h4><hr><p>bilirubin: ${d.bilirubin}<br>creatinine: ${d.creatinine}<br>INR: ${d.inr}<br>sodium: ${d.sodium}</p>`);
                });
        
            chartGroup.call(toolTip);
        
            circlesGroup.on("mouseover", function(d) {
                toolTip.show(d, this);
                })
                .on("mouseout", function(d) {
                    toolTip.hide(d);
                });
            
            function brushed() {
                if (d3.event.sourceEvent && d3.event.sourceEvent.type === "zoom") return; // ignore brush-by-zoom
                var s = d3.event.selection || xTimeScale2.range();
                xTimeScale.domain(s.map(xTimeScale2.invert, xTimeScale2));
                Line_chart.select(".meld").attr("d", drawLine);
                Line_chart.select(".meld2").attr("d", drawLine);
                Line_chart.select(".wbc").attr("d", wbcLine);
                Line_chart.selectAll("circle").attr("cx", d => xTimeScale(d.date)).attr("cy", d => yLinearScale(d.meld2));
                focus.select(".axis.x").call(bottomAxis);
                chartGroup.select(".zoom").call(zoom.transform, d3.zoomIdentity
                    .scale(chartWidth / (s[1] - s[0]))
                    .translate(-s[0], 0));
            };      

            function zoomed() {
                if (d3.event.sourceEvent && d3.event.sourceEvent.type === "brush") return; // ignore zoom-by-brush
                var t = d3.event.transform;
                xTimeScale.domain(t.rescaleX(xTimeScale2).domain());
                Line_chart.select(".meld").attr("d", drawLine);
                Line_chart.select(".meld2").attr("d", drawLine);
                Line_chart.select(".wbc").attr("d", wbcLine);
                Line_chart.selectAll("circle").attr("cx", d => xTimeScale(d.date)).attr("cy", d => yLinearScale(d.meld2));
                focus.select(".axis.x").call(bottomAxis);
                context.select(".brush").call(brush.move, xTimeScale.range().map(t.invertX, t));
            };
            // }).catch(function(error) {
            // console.log(error);          
        // });
    }
    render() {
        console.log('updated state --->', this.state)  
        return <div ref="canvas"></div> 
    }
}
export default MELDChart
