(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d208337"],{a47e:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-card",{staticClass:"card",attrs:{loading:t.loading}},[e("v-card-title",{staticClass:"px-4"},[t._v("Trend chart (pages)")]),e("v-card-text",{staticClass:"px-4"},[e("base-line-chart",{staticClass:"px-8",attrs:{"chart-data":t.chartData}})],1)],1)},n=[],c=(e("4de4"),e("4160"),e("d81d"),e("d3b7"),e("159b"),e("96cf"),e("1da1")),o=e("5530"),s=e("2f62"),u={components:{baseLineChart:function(){return Promise.all([e.e("chunk-434cf637"),e.e("chunk-2d237d5d")]).then(e.bind(null,"fd8a"))}},data:function(){return{loading:!1,datasets:[],labels:[]}},computed:Object(o["a"])(Object(o["a"])({},Object(s["c"])({refreshSignal:"refreshSignal",period:"getPeriod"})),{},{chartData:function(){var t=["rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)","rgba(0, 0, 0, 0)"],a=function(t){for(var a=[],e=0;e<31;e++)a.push(t);return a},e=[a("rgba(255, 99, 132, 1)"),a("rgba(54, 162, 235, 1)"),a("rgba(255, 206, 86, 1)"),a("rgba(75, 192, 192, 1)")],r=1,n=["Homepage","Product1 Page","Product2 Page","Product3 Page"],c={labels:this.labels,datasets:[]};return this.datasets.forEach((function(a,o){c.datasets.push({backgroundColor:t,borderWidth:r,data:a,borderColor:e[o],label:n[o]})})),c}}),created:function(){this.fetchTrafficData(this.period)},watch:{refreshSignal:function(){this.fetchTrafficData(this.period)},period:function(t){this.fetchTrafficData(t)}},methods:Object(o["a"])(Object(o["a"])({},Object(s["b"])({fetchTrend:"fetchTrend"})),{},{fetchTrafficData:function(t){var a=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var r,n,c,o,s,u,i,d,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r={"2015-12/1":{from:"2015-12-01",to:"2015-12-07",labels:["2015-12-01","2015-12-02","2015-12-03","2015-12-04","2015-12-05","2015-12-06","2015-12-07"]},"2015-12/2":{from:"2015-12-08",to:"2015-12-14",labels:["2015-12-08","2015-12-09","2015-12-10","2015-12-11","2015-12-12","2015-12-13","2015-12-14"]},"2015-12/3":{from:"2015-12-15",to:"2015-12-21",labels:["2015-12-15","2015-12-16","2015-12-17","2015-12-18","2015-12-19","2015-12-20","2015-12-21"]},"2015-12/4":{from:"2015-12-22",to:"2015-12-28",labels:["2015-12-22","2015-12-23","2015-12-24","2015-12-25","2015-12-26","2015-12-27","2015-12-28"]},"2015-12/5":{from:"2015-12-29",to:"2015-12-31",labels:["2015-12-29","2015-12-30","2015-12-31"]}},n=r[t]||{},c=n.from,o=n.to,a.loading=!0,e.next=5,a.fetchTrend({filter:{pages:["homepage","product1","product2","product3"]},period:{from:c,to:o}});case 5:s=e.sent,a.datasets=[],a.labels=r[t]?r[t].labels:["2015-12-01","2015-12-02","2015-12-03","2015-12-04","2015-12-05","2015-12-06","2015-12-07","2015-12-08","2015-12-09","2015-12-10","2015-12-11","2015-12-12","2015-12-13","2015-12-14","2015-12-15","2015-12-16","2015-12-17","2015-12-18","2015-12-19","2015-12-20","2015-12-21","2015-12-22","2015-12-23","2015-12-24","2015-12-25","2015-12-26","2015-12-27","2015-12-28","2015-12-29","2015-12-30","2015-12-31"],u=s.filter((function(t){return"homepage"===t.value})).map((function(t){return t.count})),i=s.filter((function(t){return"product1"===t.value})).map((function(t){return t.count})),d=s.filter((function(t){return"product2"===t.value})).map((function(t){return t.count})),l=s.filter((function(t){return"product3"===t.value})).map((function(t){return t.count})),a.datasets.push(u,i,d,l),a.loading=!1;case 14:case"end":return e.stop()}}),e)})))()}})},i=u,d=e("2877"),l=e("6544"),f=e.n(l),h=e("b0af"),b=e("99d9"),p=Object(d["a"])(i,r,n,!1,null,null,null);a["default"]=p.exports;f()(p,{VCard:h["a"],VCardText:b["c"],VCardTitle:b["d"]})}}]);
//# sourceMappingURL=chunk-2d208337.570ba9ae.js.map