(this.webpackJsonpreacting=this.webpackJsonpreacting||[]).push([[0],{178:function(e,t,a){e.exports=a(395)},183:function(e,t,a){},199:function(e,t){},201:function(e,t){},233:function(e,t){},234:function(e,t){},278:function(e,t){},280:function(e,t){},303:function(e,t){},394:function(e,t,a){},395:function(e,t,a){"use strict";a.r(t);var n=a(12),r=a.n(n),i=a(166),o=a.n(i),c=(a(183),a(167)),l=a(168),d=a(172),s=a(169),u=a(64),m=a(173),f=a(20),h=a(170),p=a(171),b=a.n(p),g=function(e){function t(){var e;return Object(c.a)(this,t),(e=Object(d.a)(this,Object(s.a)(t).call(this))).state={data:[]},e.createGraph=e.createGraph.bind(Object(u.a)(e)),e}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.a.init({key:"1nA16yuLtUrdpZFpPzz-HUm-WlpPW2axHhidMOnC1TTQ",callback:function(t){e.setState({data:t})},simpleSheet:!0})}},{key:"createGraph",value:function(e){var t=20,a=30,n=800-a-100,r=400-t-50,i=f.h(this.refs.canvas).append("svg").attr("height",400).attr("width",800).append("g").attr("transform","translate(".concat(a,", ").concat(t,")")),o=f.j("%-m/%-d/%y");console.log(e);var c=e;c.forEach((function(e){e.date=o(e.Date),e.bilirubin=+e["Bilirubin Total (Calculated)0.2 - 1.2 mg/dL"],e.creatinine=+e["Creatinine0.60 - 1.30 mg/dL"],e.sodium=+e["Na135 - 144 mmol/L"],e.inr=+e["INR 0.9 - 1.1"]})),c.forEach((function(e){if(e.creatinine>0&&e.bilirubin>0&&e.inr>0){var t=e.creatinine<1?1:e.creatinine,a=e.inr<1?1:e.inr,n=e.bilirubin<1?1:e.bilirubin;e.meld1=10*parseFloat(.957*Math.log(t)+.378*Math.log(n)+1.12*Math.log(a)+.643).toFixed(1)}else e.meld1=0})),c.forEach((function(e){if(e.meld1>11&&e.sodium>0){var t=e.sodium;e.sodium<125?t=125:e.sodium>137&&(t=137),e.meld2=parseFloat((e.meld1+1.32*(137-t)-.033*e.meld1*(137-t)).toFixed(1))}else e.meld2=e.meld1}));var l=f.g().range([0,n]).domain(f.c(c,(function(e){return e.date}))),d=f.f().range([r,0]).domain([0,f.e(c,(function(e){return e.meld2}))]),s=f.a(l),u=f.b(d),m=f.d().defined((function(e){return e.meld2>0})).x((function(e){return l(e.date)})).y((function(e){return d(e.meld2)}));i.append("path").datum(c.filter(m.defined())).attr("d",m).style("stroke-dasharray","3, 3").classed("line",!0),i.append("path").datum(c).classed("line",!0).attr("d",m),i.append("g").classed("axis",!0).call(u),i.append("g").classed("axis",!0).attr("transform","translate(0, "+r+")").call(s);var p=i.selectAll("circle").data(c.filter(m.defined())).enter().append("circle").attr("cx",(function(e){return l(e.date)})).attr("cy",(function(e){return d(e.meld2)})).attr("r","8").attr("fill","gold"),b=f.i("%-m/%-d/%y"),g=Object(h.a)().attr("class","tooltip").offset([50,70]).html((function(e){return"<h4>".concat(b(e.date),": ").concat(e.meld2,"</h4><hr><p>bilirubin: ").concat(e.bilirubin,"<br>creatinine: ").concat(e.creatinine,"<br>INR: ").concat(e.inr,"<br>sodium: ").concat(e.sodium,"</p>")}));i.call(g),p.on("mouseover",(function(e){g.show(e,this)})).on("mouseout",(function(e){g.hide(e)}))}},{key:"render",value:function(){console.log("updated state ---\x3e",this.state);var e=this.state.data;return r.a.createElement("div",{ref:"canvas"},this.createGraph(e))}}]),t}(n.Component);a(394);var v=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("h1",null,"MELD Score Chart")),r.a.createElement(g,null),r.a.createElement("footer",{className:"App-footer"},r.a.createElement("p",null,"formula source: ",r.a.createElement("a",{href:"https://www.mdcalc.com/meld-score-model-end-stage-liver-disease-12-older#evidence"},"mdcalc")," | raw data: ",r.a.createElement("a",{href:"https://docs.google.com/spreadsheets/d/1nA16yuLtUrdpZFpPzz-HUm-WlpPW2axHhidMOnC1TTQ"},"google sheet"),r.a.createElement("br",null),"MELD(i) = 0.957 \xd7 ln(Cr) + 0.378 \xd7 ln(bilirubin) + 1.120 \xd7 ln(INR) + 0.643 then, round to the tenth decimal place and multiply by 10.",r.a.createElement("br",null),"If MELD(i) > 11, perform additional MELD calculation as follows: MELD = MELD(i) + 1.32 \xd7 (137 \u2013 Na) \u2013  [ 0.033 \xd7 MELD(i) \xd7 (137 \u2013 Na) ]",r.a.createElement("br",null),"Cr, bilirubin and INR values floored to 1; Na floored to 125 and ceilinged to 137.")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[178,1,2]]]);
//# sourceMappingURL=main.a8a6f393.chunk.js.map