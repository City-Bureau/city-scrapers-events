(this["webpackJsonpcity-scrapers-events"]=this["webpackJsonpcity-scrapers-events"]||[]).push([[0],{44:function(e,t,a){e.exports=a.p+"static/media/logo.0d6bbdaf.png"},47:function(e,t,a){e.exports=a(71)},69:function(e,t,a){},70:function(e,t,a){},71:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(7),l=a.n(c),o=a(46),s=a(15),i=a(13),u=a(30),m=a.n(u),d=a(34),f=a(25),v=a(24),b=(a(66),a(67),a(68),a(69),a(44)),E=a.n(b),h=(new Date).getFullYear(),O={EVENT_SOURCE:"https://cityscrapers.blob.core.windows.net/meetings-feed/upcoming.json",REGION_OPTIONS:[{label:"Chicago",value:"chi"},{label:"Cook County",value:"cook"},{label:"Illinois",value:"il"}],MONTH_OPTIONS:[{label:"January",value:0},{label:"February",value:1},{label:"March",value:2},{label:"April",value:3},{label:"May",value:4},{label:"June",value:5},{label:"July",value:6},{label:"August",value:7},{label:"September",value:8},{label:"October",value:9},{label:"November",value:10},{label:"December",value:11}],YEAR_OPTIONS:[h,h+1].map((function(e){return{label:e,value:e}}))},p=(a(70),function(e){var t=e.agency,a=e.name,n=e.start,r=e.end,c=e.location,l=e.sources,o=encodeURIComponent("".concat(t," - ").concat(a)),s=encodeURIComponent("".concat(n.format("YYYYMMDD"),"T").concat(n.format("HHmmss"),"/").concat(r.format("YYYYMMDD"),"T").concat(r.format("HHmmss")));return"https://www.google.com/calendar/event?action=TEMPLATE&dates=".concat(s,"&text=").concat(o).concat(c.name?"&location=".concat(encodeURIComponent(c.name)):"").concat(l.length>0?"&details=".concat(encodeURIComponent(l[0].url)):"")}),g=function(e){var t=e.event,a=e.selected,n=e.style;return r.a.createElement("div",{className:"Event ".concat(a?"selected":""),style:n},r.a.createElement("div",{className:"card"},r.a.createElement("div",{className:"card-content"},r.a.createElement("h4",{className:"title is-4"},t.agency),r.a.createElement("h5",{className:"subtitle"},t.name),r.a.createElement("p",{className:"date"},t.start.format("dddd, MMMM Do, YYYY"),r.a.createElement("br",null),t.start.format("h:mma")),r.a.createElement("p",{className:"location"},r.a.createElement("span",{className:"tag is-white"},"Location")," ",t.location.name)),r.a.createElement("footer",{className:"card-footer"},t.sources.length>0?r.a.createElement("p",{className:"card-footer-item"},r.a.createElement("a",{href:t.sources[0].url,target:"_blank",rel:"noopener noreferrer"},"View On Agency Site")):"",r.a.createElement("p",{className:"card-footer-item"},r.a.createElement("a",{href:p(t),target:"_blank",rel:"noopener noreferrer"},"Add to Google Calendar")))))};var N=Object(d.b)(m.a),y=function(){var e=Object(n.useState)(new v.c({fixedWidth:!0,minHeight:200})),t=Object(s.a)(e,2),a=t[0],c=(t[1],Object(n.useState)(!0)),l=Object(s.a)(c,2),u=l[0],b=l[1],h=Object(n.useState)([]),p=Object(s.a)(h,2),y=p[0],j=p[1],S=Object(n.useState)([]),w=Object(s.a)(S,2),C=w[0],M=w[1],T=Object(n.useState)(null),I=Object(s.a)(T,2),_=I[0],Y=I[1],x=Object(n.useState)({region:[],agency:[],month:[],year:[]}),D=Object(s.a)(x,2),A=D[0],R=D[1],H=Object(n.useState)(""),P=Object(s.a)(H,2),k=P[0],z=P[1],U=function(e,t){var a=Object(n.useState)(e),r=Object(s.a)(a,2),c=r[0],l=r[1];return Object(n.useEffect)((function(){var a=setTimeout((function(){l(e)}),t);return function(){clearTimeout(a)}}),[e,t]),c}(k,500),J=Object(n.useMemo)((function(){return function(e){var t=e.allEvents,a=e.region,n=e.agency,r=e.month,c=e.year,l=e.search,o=t;if(a.length&&(o=o.filter((function(e){var t=e.extras;return a.includes(t["cityscrapers.org/id"].split("_")[0])}))),n.length&&(o=o.filter((function(e){var t=e.agency;return n.includes(t)}))),r.length&&(o=o.filter((function(e){var t=e.start;return r.includes(t.get("month"))}))),c.length&&(o=o.filter((function(e){var t=e.start;return c.includes(t.get("year"))}))),l.trim()){var s=l.trim().toLowerCase();o=o.filter((function(e){return[e.agency,e.name,e.description].join(" ").toLowerCase().includes(s)}))}return o}(Object(i.a)(Object(i.a)({allEvents:y},A),{},{search:U}))}),[y,A.region,A.agency,A.month,A.year,U]),L=Object(n.useMemo)((function(){return J.findIndex((function(e){return e.extras["cityscrapers.org/id"]===_}))}),[J,_]);Object(n.useEffect)((function(){var e=function(){return a.clearAll()};return window.addEventListener("resize",e),fetch(O.EVENT_SOURCE).then((function(e){return e.text()})).then((function(e){return e.split("\n").filter((function(e){return e.trim()})).map(JSON.parse).map((function(e){return Object(i.a)(Object(i.a)({},e),{},{agency:e.extras["cityscrapers.org/agency"],start:m.a.tz(e.start_time,e.timezone),end:m.a.tz(e.end_time,e.timezone)})})).sort((function(e,t){return e.start.toDate()-t.start.toDate()}))})).then((function(e){j(e),M(Object(o.a)(new Set(e.map((function(e){return e.agency})))).map((function(e){return{label:e,value:e}}))),b(!1)})),function(){window.removeEventListener("resize",e)}}),[]),Object(n.useEffect)((function(){_&&setTimeout((function(){return Y(null)}),1e3)}),[_]);var G=function(e){var t=e.index,n=e.key,c=e.parent,l=e.style,o=J[t];return r.a.createElement(v.b,{cache:a,columnIndex:0,key:n,rowIndex:t,parent:c},(function(){return r.a.createElement(g,{event:o,selected:t===L,style:l})}))},V=u?r.a.createElement("div",{className:"lds-ring"},r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null),r.a.createElement("div",null)):"";return r.a.createElement("section",{className:"hero is-fullheight"},r.a.createElement("div",{className:"hero-body"},r.a.createElement("div",{className:"container"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:E.a,alt:"City Bureau logo"}),r.a.createElement("h1",{className:"title"},"City Scrapers Events"),r.a.createElement("a",{href:O.EVENT_SOURCE,className:"is-pulled-right"},"Download Source Data")),r.a.createElement("div",{className:"columns"},r.a.createElement("div",{className:"events-panel column is-one-half"},r.a.createElement("div",{className:"events-panel-container"},r.a.createElement("div",{className:"controls columns is-gapless is-multiline is-mobile"},r.a.createElement("div",{className:"column is-one-half"},r.a.createElement("input",{className:"input",type:"text",placeholder:"Search names and descriptions",onChange:function(e){return z(e.target.value)}})),r.a.createElement("div",{className:"column is-one-half"},r.a.createElement(f.a,{closeMenuOnSelect:!1,isClearable:!0,isMulti:!0,onChange:function(e){return R(Object(i.a)(Object(i.a)({},A),{},{region:(e||[]).map((function(e){return e.value}))}))},placeholder:"Select regions",options:O.REGION_OPTIONS,value:O.REGION_OPTIONS.filter((function(e){var t=e.value;return A.region.includes(t)}))})),r.a.createElement("div",{className:"column is-full"},r.a.createElement(f.a,{closeMenuOnSelect:!1,isClearable:!0,isMulti:!0,onChange:function(e){return R(Object(i.a)(Object(i.a)({},A),{},{agency:(e||[]).map((function(e){return e.value}))}))},placeholder:"Select agencies",options:C,value:C.filter((function(e){var t=e.value;return A.agency.includes(t)}))})),r.a.createElement("div",{className:"column is-one-half"},r.a.createElement(f.a,{closeMenuOnSelect:!1,isClearable:!0,isMulti:!0,onChange:function(e){return R(Object(i.a)(Object(i.a)({},A),{},{month:(e||[]).map((function(e){return e.value}))}))},placeholder:"Select month(s)",options:O.MONTH_OPTIONS,value:O.MONTH_OPTIONS.filter((function(e){var t=e.value;return A.month.includes(t)}))})),r.a.createElement("div",{className:"column is-one-half"},r.a.createElement(f.a,{closeOnSelect:!1,isClearable:!0,isMulti:!0,onChange:function(e){return R(Object(i.a)(Object(i.a)({},A),{},{year:(e||[]).map((function(e){return e.value}))}))},placeholder:"Select year(s)",options:O.YEAR_OPTIONS,value:O.YEAR_OPTIONS.filter((function(e){var t=e.value;return A.year.includes(t)}))}))),r.a.createElement("div",{className:"events-scroll-panel"},V,r.a.createElement(v.a,null,(function(e){var t=e.height,n=e.width;return r.a.createElement(v.d,{width:n,height:t,rowCount:J.length,deferredMeasurementCache:a,rowHeight:a.rowHeight,rowRenderer:G,scrollToAlignment:"start",scrollToIndex:L})}))))),r.a.createElement("div",{className:"calendar column is-one-half is-hidden-touch"},r.a.createElement(d.a,{localizer:N,events:J,startAccessor:function(e){return e.start.toDate()},endAccessor:function(e){return e.end.toDate()},titleAccessor:"name",defaultDate:new Date,selectable:!0,onSelectEvent:function(e){var t=e.extras;return Y(t["cityscrapers.org/id"])}}))))))};l.a.render(r.a.createElement(y,null),document.getElementById("root"))}},[[47,1,2]]]);
//# sourceMappingURL=main.c055aea0.chunk.js.map