(this.webpackJsonpreacting=this.webpackJsonpreacting||[]).push([[0],{178:function(e,t,a){e.exports=a(395)},183:function(e,t,a){},199:function(e,t){},201:function(e,t){},233:function(e,t){},234:function(e,t){},278:function(e,t){},280:function(e,t){},303:function(e,t){},394:function(e,t,a){},395:function(e,t,a){"use strict";a.r(t);var n=a(10),i=a.n(n),r=a(166),o=a.n(r),c=(a(183),a(167)),l=a(168),d=a(172),s=a(169),u=a(64),h=a(173),m=a(18),f=a(170),p=a(171),g=a.n(p),b=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(d.a)(this,Object(s.a)(t).call(this,e))).state={data:[],width:0,height:100},a.chartRef=i.a.createRef(),a.createGraph=a.createGraph.bind(Object(u.a)(a)),a}return Object(h.a)(t,e),Object(l.a)(t,[{key:"getWidth",value:function(){return document.getElementById("graph").offsetWidth}},{key:"getHeight",value:function(){return document.getElementById("graph").offsetHeight}},{key:"componentDidMount",value:function(){var e,t=this;g.a.init({key:"1nA16yuLtUrdpZFpPzz-HUm-WlpPW2axHhidMOnC1TTQ",callback:function(e){t.setState({data:e,width:t.getWidth(),height:t.getWidth()/2},(function(){t.createGraph()}))},simpleSheet:!0}),window.addEventListener("resize",(function(){clearTimeout(e),e=setTimeout((function(){t.redrawGraph()}),200)}))}},{key:"redrawGraph",value:function(){var e=this.getWidth();this.setState({width:e,height:e/2}),m.h("svg").remove(),this.createGraph=this.createGraph.bind(this),this.createGraph()}},{key:"createGraph",value:function(){var e=0,t=50,a=50,n=0,i=this.state.width-n-t,r=this.state.height-e-a,o=m.h(this.refs.canvas).append("svg").attr("height",r).attr("width",i).append("g").attr("transform","translate(".concat(n,", ").concat(e,")")),c=m.j("%-m/%-d/%Y %H:%M:%S");console.log(this.state.data);var l=this.state.data;l.forEach((function(e){e.date=c(e.Date),e.bilirubin=+e["Bilirubin Total (Calculated)0.2 - 1.2 mg/dL"],e.creatinine=+e["Creatinine0.60 - 1.30 mg/dL"],e.sodium=+e["Na135 - 144 mmol/L"],e.inr=+e["INR 0.9 - 1.1"]})),l.forEach((function(e){if(e.creatinine>0&&e.bilirubin>0&&e.inr>0){var t=e.creatinine<1?1:e.creatinine,a=e.inr<1?1:e.inr,n=e.bilirubin<1?1:e.bilirubin;e.meld1=10*parseFloat(.957*Math.log(t)+.378*Math.log(n)+1.12*Math.log(a)+.643).toFixed(1)}else e.meld1=0})),l.forEach((function(e){if(e.meld1>11&&e.sodium>0){var t=e.sodium;e.sodium<125?t=125:e.sodium>137&&(t=137),e.meld2=parseFloat((e.meld1+1.32*(137-t)-.033*e.meld1*(137-t)).toFixed(1))}else e.meld2=e.meld1}));var d=m.g().range([0,i]).domain(m.c(l,(function(e){return e.date}))),s=m.f().range([r,0]).domain([0,m.e(l,(function(e){return e.meld2}))]),u=m.a(d),h=m.b(s),p=m.d().defined((function(e){return e.meld2>0})).x((function(e){return d(e.date)})).y((function(e){return s(e.meld2)}));o.append("path").datum(l.filter(p.defined())).attr("d",p).style("stroke-dasharray","3, 3").classed("line",!0),o.append("path").datum(l).classed("line",!0).attr("d",p),o.append("g").classed("axis",!0).call(h),o.append("g").classed("axis",!0).attr("transform","translate(0, "+r+")").call(u);var g=o.selectAll("circle").data(l.filter(p.defined())).enter().append("circle").attr("cx",(function(e){return d(e.date)})).attr("cy",(function(e){return s(e.meld2)})).attr("r","8").attr("fill","gold"),b=m.i("%-m/%-d/%y"),v=Object(f.a)().attr("class","tooltip").offset([50,70]).html((function(e){return"<h4>".concat(b(e.date),": ").concat(e.meld2,"</h4><hr><p>bilirubin: ").concat(e.bilirubin,"<br>creatinine: ").concat(e.creatinine,"<br>INR: ").concat(e.inr,"<br>sodium: ").concat(e.sodium,"</p>")}));o.call(v),g.on("mouseover",(function(e){v.show(e,this)})).on("mouseout",(function(e){v.hide(e)}))}},{key:"render",value:function(){return console.log("updated state ---\x3e",this.state),i.a.createElement("div",{ref:"canvas"})}}]),t}(n.Component);a(394);var v=function(){return i.a.createElement("div",{className:"App"},i.a.createElement("header",{className:"App-header"},i.a.createElement("h1",null,"MELD Score Chart")),i.a.createElement("div",{id:"graph"},i.a.createElement(b,null)),i.a.createElement("footer",{className:"App-footer"},i.a.createElement("p",null,"formula source: ",i.a.createElement("a",{href:"https://www.mdcalc.com/meld-score-model-end-stage-liver-disease-12-older#evidence"},"mdcalc")," | raw data: ",i.a.createElement("a",{href:"https://docs.google.com/spreadsheets/d/1nA16yuLtUrdpZFpPzz-HUm-WlpPW2axHhidMOnC1TTQ"},"google sheet"),i.a.createElement("br",null),"MELD(i) = 0.957 \xd7 ln(Cr) + 0.378 \xd7 ln(bilirubin) + 1.120 \xd7 ln(INR) + 0.643 then, round to the tenth decimal place and multiply by 10.",i.a.createElement("br",null),"If MELD(i) > 11, perform additional MELD calculation as follows: MELD = MELD(i) + 1.32 \xd7 (137 \u2013 Na) \u2013  [ 0.033 \xd7 MELD(i) \xd7 (137 \u2013 Na) ]",i.a.createElement("br",null),"Cr, bilirubin and INR values floored to 1; Na floored to 125 and ceilinged to 137.")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[178,1,2]]]);
//# sourceMappingURL=main.edb9babd.chunk.js.map