(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d4b8c67a"],{"1f4f":function(t,e,a){"use strict";a("a9e3");var r=a("5530"),s=(a("8b37"),a("80d2")),o=a("7560"),n=a("58df");e["a"]=Object(n["a"])(o["a"]).extend({name:"v-simple-table",props:{dense:Boolean,fixedHeader:Boolean,height:[Number,String]},computed:{classes:function(){return Object(r["a"])({"v-data-table--dense":this.dense,"v-data-table--fixed-height":!!this.height&&!this.fixedHeader,"v-data-table--fixed-header":this.fixedHeader,"v-data-table--has-top":!!this.$slots.top,"v-data-table--has-bottom":!!this.$slots.bottom},this.themeClasses)}},methods:{genWrapper:function(){return this.$slots.wrapper||this.$createElement("div",{staticClass:"v-data-table__wrapper",style:{height:Object(s["d"])(this.height)}},[this.$createElement("table",this.$slots.default)])}},render:function(t){return t("div",{staticClass:"v-data-table",class:this.classes},[this.$slots.top,this.genWrapper(),this.$slots.bottom])}})},"677c":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"card"},[a("v-card-title",{staticClass:"px-4"},[t._v(" Cohort Analysis ")]),a("v-card-subtitle",{staticClass:"px-4"},[t._v(" % of people who registered in December and then bought some product ")]),a("v-card-text",{staticClass:"px-4"},[a("v-row",[a("v-col",{attrs:{cols:"12",lg:"7"}},[a("v-simple-table",[a("thead",[a("tr",[a("th",{staticClass:"text-left"},[t._v(" Name ")]),a("th",{staticClass:"text-left"},[t._v(" Count ")])])]),a("tbody",[a("tr",[a("td",[t._v("People who registered")]),a("td",[t._v(t._s(t.register))])]),a("tr",[a("td",[t._v("People who bought")]),a("td",[t._v(t._s(t.registerThenBought))])]),a("tr",[a("td",[t._v("Dropoff")]),a("td",[t._v(t._s(t.dropoff||"0"))])])])])],1),a("v-col",{attrs:{cols:"12",lg:"5"}},[a("base-horizontal-bar-chart",{attrs:{"chart-data":t.chartData}})],1)],1)],1)],1)},s=[],o=(a("d3b7"),a("96cf"),a("1da1")),n=a("5530"),i=a("2f62"),h={components:{baseHorizontalBarChart:function(){return Promise.all([a.e("chunk-434cf637"),a.e("chunk-2d0e9995")]).then(a.bind(null,"8de8"))}},data:function(){return{register:0,registerThenBought:0,dropoff:0,loading:!1}},computed:Object(n["a"])(Object(n["a"])({},Object(i["c"])({refreshSignal:"refreshSignal"})),{},{chartData:function(){return{labels:["Registered","Bought","Dropoff [in %]"],datasets:[{barPercentage:.5,barThickness:6,maxBarThickness:8,minBarLength:2,data:[this.register,this.registerThenBought,this.dropoff],label:"December",borderColor:"rgba(225, 225, 60, 50)",backgroundColor:"rgba(225, 225, 60, 50)"}]}}}),watch:{refreshSignal:function(){this.fetchCohortData()}},created:function(){this.fetchCohortData()},methods:Object(n["a"])(Object(n["a"])({},Object(i["b"])({fetchCohort:"fetchCohort"})),{},{fetchCohortData:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a,r,s,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,t.fetchCohort();case 3:a=e.sent,r=a.register,s=a.registerThenBought,o=a.dropoff,t.register=r,t.registerThenBought=s,t.dropoff=o,t.loading=!1;case 11:case"end":return e.stop()}}),e)})))()}})},c=h,l=a("2877"),d=a("6544"),f=a.n(d),u=a("b0af"),b=a("99d9"),g=a("62ad"),p=a("0fd9"),v=a("1f4f"),m=Object(l["a"])(c,r,s,!1,null,null,null);e["default"]=m.exports;f()(m,{VCard:u["a"],VCardSubtitle:b["b"],VCardText:b["c"],VCardTitle:b["d"],VCol:g["a"],VRow:p["a"],VSimpleTable:v["a"]})},"8b37":function(t,e,a){}}]);
//# sourceMappingURL=chunk-d4b8c67a.9577398a.js.map