(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d208a1d"],{a62d:function(t,e,n){"use strict";n.r(e);var c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("base-collection-card",{attrs:{title:"Customer Retention",subtitle:"Customers who bought on the different dates",data:t.customers,loading:t.loading}})},a=[],r=(n("d3b7"),n("96cf"),n("1da1")),o=n("5530"),i=n("2f62"),s={components:{baseCollectionCard:function(){return n.e("chunk-d4c7e4a2").then(n.bind(null,"4cc5"))}},data:function(){return{customers:[],loading:!0}},computed:Object(o["a"])({},Object(i["c"])({refreshSignal:"refreshSignal"})),watch:{refreshSignal:function(){this.fetchProductsData()}},created:function(){this.fetchProductsData()},methods:Object(o["a"])(Object(o["a"])({},Object(i["b"])({fetchRetention:"fetchRetention"})),{},{fetchProductsData:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.loading=!0,e.next=3,t.fetchRetention({period:"anytime"});case 3:n=e.sent,t.customers=n,t.loading=!1;case 6:case"end":return e.stop()}}),e)})))()}})},u=s,d=n("2877"),l=Object(d["a"])(u,c,a,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d208a1d.9ec48b51.js.map