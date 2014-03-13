"use strict";angular.module("labsVisualizationsApp",[]),function(){window.SentimentWave=function(){function a(a,b,c,d){var e,f=this;this.parent=a,this.width=b,this.height=c,this.data=d,e=this.buildLayers(this.data),this.svg=d3.select(this.parent).append("svg").attr("width",this.width).attr("height",this.height),this.colors=["#ff6666","#aaaaaa","#66ff66"],this.svg.selectAll("path.main").data(e.layers).enter().append("path").attr({d:e.area,"class":"main"}).style("fill",function(a,b){return f.colors[b]})}return a.prototype.subwave=function(a){var b,c=this;return b=this.buildLayers(this.data,a),this.svg.selectAll("path.main").style("opacity",.2),this.svg.selectAll("path.subwave").data(b.layers).enter().append("path").attr({d:b.area,"class":"subwave"}).attr("d",b.area).attr("transform","translate(0,-"+b.offset+")").style({fill:function(a,b){return c.colors[b]},opacity:1})},a.prototype.findMax=function(a){var b,c,d,e;for(c=0,d=0,e=a.length;e>d;d++)b=a[d],null!=b&&(b.positive>c&&(c=b.positive),b.neutral>c&&(c=b.neutral),b.negative>c&&(c=b.negative));return c},a.prototype.buildWaves=function(a,b){var c,d,e;return e=[],d=[],c=[],0!==b?(e=a.map(function(a,c){return a?{x:c,y:a.positive/b}:{x:c,y:0}}),d=a.map(function(a,c){return a?{x:c,y:a.neutral/b}:{x:c,y:0}}),c=a.map(function(a,c){return a?{x:c,y:a.negative/b}:{x:c,y:0}})):(e=a.map(function(a,b){return{x:b,y:0}}),d=a.map(function(a,b){return{x:b,y:0}}),c=a.map(function(a,b){return{x:b,y:0}})),[c,d,e]},a.prototype.buildLayers=function(a,b){var c,d,e,f,g,h,i,j,k,l,m;return null==b&&(b=null),f=this.findMax(a),e=this.buildWaves(a,f),d=d3.layout.stack().offset("wiggle")(e),i=0,k=d3.layout.stack().offset("wiggle"),null!=b?(g=k(this.buildWaves(b,f)),j=this.findMax(b),h=1-j/f,i=this.height*(h/2)):g=k(e),l=d3.scale.linear().domain([0,a.length]).range([0,this.width]),m=d3.scale.linear().domain([0,d3.max(d,function(a){return d3.max(a,function(a){return a.y0+a.y})})]).range([this.height,0]),c=d3.svg.area().x(function(a){return l(a.x)}).y0(function(a){return m(a.y0)}).y1(function(a){return m(a.y0+a.y)}).interpolate("basis"),{layers:g,area:c,offset:i}},a}()}.call(this),function(){var a,b;b=function(){function a(a,b,c,d,e,f,g,h,i){var j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A;for(this.parent=a,this.data=b,this.width=c,this.height=d,this.radius=e,this.start=f,this.end=g,this.color=h,this.key=i,this.svg=this.parent.append("g").attr("transform","translate("+c/2+","+d/2+")").style({"pointer-events":"none"}),this.sticks=[],this.balls=[],this.texts=[],o=2*Math.PI/360,f=Math.PI/2*3,m=2*Math.PI*(1/720),z=this.data,l=v=0,x=z.length;x>v;l=++v)j=z[l],n=j.size*o,p=f+m+n/2,r=.3*Math.cos(p)*e,s=1.3*Math.cos(p)*e,t=.3*Math.sin(p)*e,u=1.3*Math.sin(p)*e,this.sticks[j.id]=this.svg.append("svg:line").attr({x1:r,y1:t,x2:s,y2:u}).style({stroke:"black","stroke-width":.3,"pointer-events":"none"}),this.balls[j.id]=this.svg.append("svg:ellipse").attr({cx:s,cy:u,rx:3,ry:3}).style({fill:"black","pointer-events":"none"}),q=s-5,0>s&&(q=s-13),this.texts[j.id]=this.svg.append("svg:text").attr({x:q,y:u+4,dx:"0.8em","text-anchor":0>s?"end":"start","data-id":j.id}).style({fill:"black"}).text(j.label),f+=n;for(A=this.data,l=w=0,y=A.length;y>w;l=++w)j=A[l],k=!1,(j.positive>0||j.negative>0||j.neutral>0)&&(k=!0),h=k?"black":"#cccccc",this.sticks[j.id].style("stroke",h),this.balls[j.id].style("fill",h),this.texts[j.id].style("fill",h)}return a}(),a=function(){function a(a,b,c,d,e,f,g,h,i){var j,k,l;this.parent=a,this.data=b,this.width=c,this.height=d,this.radius=e,this.start=f,this.end=g,this.color=h,this.key=i,this.innerRadius=this.radius-this.end,j=d3.svg.arc().outerRadius(this.radius-this.start).innerRadius(this.innerRadius),this.svg=this.parent.append("g").attr("transform","translate("+c/2+","+d/2+")").style({"pointer-events":"none"}),l=this.build_pie(),k=this.svg.selectAll(".arc").data(l).enter().append("g").attr("class","arc").style({"pointer-events":"none"}),k.append("path").style({fill:this.color,"pointer-events":"none"}).attr("d",j)}return a.prototype.build_pie=function(){var a,b,c,d,e,f,g,h,i,j,k,l,m;for(g=[],h=2*Math.PI/360,j=0,e=2*Math.PI*(1/720),m=this.data,d=k=0,l=m.length;l>k;d=++k)b=m[d],f=b.size*h,i=j+e,c=j+f-e,null!=this.key&&(a=b[this.key]/b.max*f,i=j+(f/2-a/2)+e,c=j+(f/2+a/2)-e),i>c&&(i=c),g.push({index:d,startAngle:i,endAngle:c,value:b[this.key],data:b,innerRadius:this.innerRadius}),j+=f;return g},a}(),window.Reticule=function(){function c(c,d,e){var f,g,h,i,j,k,l;for(this.parent=c,this.height=d,this.data=e,this.width=1.6*this.height,this.diameter=.5*this.height,this.svg=d3.select(this.parent).append("svg").attr("width",this.width).attr("height",this.height),j=.08*this.diameter,h=.01*this.diameter,k=h+h,i=[],f=l=0;2>=l;f=++l)i.push({start:k,end:k+j}),k+=j+h;g=this.diameter/2,new a(this.svg,this.data,this.width,this.height,g,0,k,"rgba(128,128,128,0.3)",null),this.p=new a(this.svg,this.data,this.width,this.height,g,i[0].start,i[0].end,"green","positive"),this.o=new a(this.svg,this.data,this.width,this.height,g,i[1].start,i[1].end,"#999999","neutral"),this.n=new a(this.svg,this.data,this.width,this.height,g,i[2].start,i[2].end,"red","negative"),this.labels=new b(this.svg,this.data,this.width,this.height,g)}return c}()}.call(this),function(){var a,b;a=function(){function a(a){var b,c,d;for(this.totalSlots=Math.floor(a),this.slots=[],b=c=0,d=this.totalSlots-1;d>=0?d>c:c>d;b=d>=0?++c:--c)this.slots.push(null)}return a.prototype.add=function(a,b){var c,d;if(a>this.totalSlots-1&&(a=this.totalSlots-1),null!=this.slots[a])for(a=c=a,d=this.totalSlots-1;(d>=a?d>c:c>d)&&this.slots[a];a=d>=a?++c:--c);return a===this.totalSlots-1&&null!=this.slots[a]&&this.crunch(),this.slots[a]=b},a.prototype.crunch=function(){var a,b,c,d;for(d=[],a=b=c=this.totalSlots-1;0>=c?0>b:b>0;a=0>=c?++b:--b){if(null==this.slots[a]){this.slots.splice(a,1);break}d.push(void 0)}return d},a.prototype.get=function(a){var b,c,d,e,f;for(b=0,f=this.slots,b=d=0,e=f.length;e>d;b=++d){if(c=f[b],c===a)return b;b+=1}return 0},a}(),b=function(a){var b,c;return b="",Math.abs(a)>1e9&&(a/=1e9,b="B"),Math.abs(a)>1e6&&(a/=1e6,b="M"),Math.abs(a)>1e3&&(a/=1e3,b="K"),c=Math.floor(100*a)/100,""+c+b},window.ElegantWaves=function(){function c(c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,$,_,ab,bb,cb,db,eb,fb,gb,hb,ib,jb,kb,lb=this;for(this.parent=c,this.data=d,this.options=null!=e?e:{},null==this.options.margin&&(this.options.margin={top:20,right:250,bottom:30,left:0}),null==this.options.width&&(this.options.width=600),null==this.options.height&&(this.options.height=200),F=d3.select(this.parent).append("svg").attr("class","elegant-waves").attr("width",this.options.width+this.options.margin.left+this.options.margin.right).attr("height",this.options.height+this.options.margin.top+this.options.margin.bottom).append("g").attr("transform","translate("+this.options.margin.left+","+this.options.margin.top+")"),s=new Date,v=new Date,x=new Date,x.setMonth(s.getMonth()-13),fb=d3.keys(this.data),T=0,X=fb.length;X>T;T++)for(p=fb[T],gb=this.data[p],U=0,Y=gb.length;Y>U;U++)i=gb[U],i.date<v&&(v=i.date);for(k=v,this.options.daterange&&(j=this.options.daterange+30,k=s-24*j*60*60*1e3),I=d3.time.scale().range([0,this.options.width]),J=d3.svg.axis().ticks(5).scale(I).orient("bottom"),I.domain([k,s]),o=null,n=null,(null!=(hb=this.options.hilightstart)?hb.length:void 0)>0&&(o=this.options.hilightstart,null==o&&(o=this.options.hilightstart),n=s,(null!=(ib=this.options.hilightend)?ib.length:void 0)>0&&(n=this.options.hilightend,null==n&&(n=this.options.hilightend))),F.append("g").attr("class","x axis").attr("transform","translate(0,"+this.options.height+")").call(J),h=d3.scale.category10(),h.domain(d3.keys(this.data)),N=15,O={},G=this.options.height/N,E=new a(G+1),S={},jb=d3.keys(this.data),V=0,Z=jb.length;Z>V;V++)p=jb[V],H=this.data[p].filter(function(a){return a.date>=x}),S[p]=d3.scale.linear().range([this.options.height-3,4]),S[p].domain(d3.extent(H,function(a){return a.value}));for(B=d3.keys(this.data),B=B.sort(function(a,b){var c,d;return c=S[a](lb.data[a][lb.data[a].length-1].value),d=S[b](lb.data[b][lb.data[b].length-1].value),c>d}),null!==n&&null!==o&&F.append("rect").attr("x",I(o)).attr("width",I(n)-I(o)).attr("y",0).attr("height",this.options.height).style({fill:"black","fill-opacity":"0.2"}),F.append("text").attr("transform","translate("+(I(s)+190)+",0)").attr("x",3).attr("y",-10).style("fill","black").style("font-weight","bold").text("Max"),F.append("text").attr("transform","translate("+(I(s)+130)+",0)").attr("x",3).attr("y",-10).style("fill","black").style("font-weight","bold").text("Min"),W=0,$=B.length;$>W;W++)p=B[W],H=this.data[p],M=Math.floor(S[p](H[H.length-1].value)/N),E.add(M,p);for(R=11,f=d3.bisector(function(a){return a.date}).left,d=this.data,y=function(){var a,b,c,e,g,h,j,k,l,n,o,q,r;r=[];for(p in m){for(n=S[p],g=d[p],k=I.invert(d3.mouse(this)[0]),e=f(g,k,1),b=g[e-1],c=g[e],void 0===c&&(c=g[e-1]),i=k-b.date>c.date-k?c:b,o=0,j=null,h=!1,q=6,a=function(){var a,b,c,d;j=o,d=[];for(a in P){if(b=P[a],a===p)break;d.push(function(){var a;for(a=[];;)if(c=Math.abs(b-(n(i.value)+o)),n(i.value)+o<q&&(h=!0),R>c&&h===!0)a.push(o+=R-c);else{if(!(R>c))break;a.push(o-=R-c)}return a}())}return d},a();j!==o;)a();P[p]=n(i.value)+o,l=new Date(i.date).getTime()===s.getTime()?-5.9*i.value.toString().length-7:9,m[p].attr("transform","translate("+I(i.date)+","+(n(i.value)+o)+")"),r.push(m[p].select("text").attr("x",l).text(i.value))}return r},A=function(){var a;a=[];for(p in m)a.push(m[p].style("display",null));return a},z=function(){var a;a=[];for(p in m)a.push(m[p].style("display","none"));return a},m={},P={},Q={},cb=0,_=B.length;_>cb;cb++){if(p=B[cb],H=this.data[p],L=S[p],this.options.autoscale)for(C=H,H=[],db=0,ab=C.length;ab>db;db++)D=C[db],I(D.date)>=0&&H.push(D);q=d3.svg.line().interpolate("monotone").x(function(a){return I(a.date)}).y(function(a){return L(a.value)}),F.append("path").datum(H).attr("class","line").style("fill","none").attr("d",q).style("stroke",function(){return h(p)}).style("stroke-width",1),M=E.get(p)*N,F.append("text").datum(function(){return{name:p,value:H[H.length-1]}}).attr("transform",function(){return"translate("+I(s)+","+M+")"}).attr("x",3).attr("dy",".35em").style("fill",function(){return h(p)}).text(""+p),m[p]=F.append("g").attr("class","focus").style("display","none"),m[p].append("circle").attr("r",3.5).style("stroke",function(){return h(p)}).style("fill","none"),m[p].append("text").attr("x",9).attr("y",0).attr("dy",".35em"),F.append("rect").attr("width",this.options.width).attr("height",this.options.height).style({fill:"none","pointer-events":"all"}).on("mouseover",A).on("mouseout",z).on("mousemove",y),l=H.filter(function(a){return a.date>=x}),u=Math.floor(d3.min(l,function(a){return a.value})),r=Math.floor(d3.max(l,function(a){return a.value})),w=b(u),t=b(r),F.append("text").datum(function(){return{name:p,value:H[H.length-1]}}).attr("transform",function(){return"translate("+(I(s)+130)+","+M+")"}).attr("x",3).attr("dy",".35em").style("fill",function(){return h(p)}).style("font-weight","overall_chi_score"===p?"bold":"").text(w),F.append("text").datum(function(){return{name:p,value:H[H.length-1]}}).attr("transform",function(){return"translate("+(I(s)+190)+","+M+")"}).attr("x",3).attr("dy",".35em").style("fill",function(){return h(p)}).style("font-weight","overall_chi_score"===p?"bold":"").text(t)}if(null!=this.options.events)for(kb=this.options.events,eb=0,bb=kb.length;bb>eb;eb++)g=kb[eb],K=I(g.date),g.date<=s&&K>=0&&F.append("line").datum(g).attr("x1",I(g.date)).attr("x2",I(g.date)).attr("y1",0).attr("y2",this.options.height).attr({"data-original-title":""+g.date+": "+g.subject,"data-placement":"bottom","data-toggle":"tooltip","data-container":"body","class":"line-tooltip"}).style({stroke:1===g.priority?"red":"orange","stroke-width":"4","stroke-opacity":"0.5"}).on("click",function(a){return null!=lb.options.click&&lb.options.click(a),$rootScope.$apply()})}return c}()}.call(this),function(){angular.module("visualizations",[]).directive("sentimentwave",function(){return{restrict:"E",scope:{wave:"=",subwave:"=?",width:"@?",height:"@?"},template:"<div></div>",link:function(a,b){var c;return $(b).empty(),c=new window.SentimentWave($(b)[0],a.width?a.width:800,a.height?a.height:100,a.wave),a.subwave?c.subwave(a.subwave):void 0}}}).directive("reticule",function(){return{restrict:"E",scope:{data:"=",size:"@?"},template:"<div></div>",link:function(a,b){var c;return $(b).empty(),c=new window.Reticule($(b)[0],a.size?a.size:250,a.data)}}}).directive("elegantwaves",function(){return{restrict:"E",scope:{data:"=",options:"=?",size:"@?"},template:"<div></div>",link:function(a,b){var c;return $(b).empty(),c=new window.ElegantWaves($(b)[0],a.data,a.options)}}})}.call(this),angular.module("labsVisualizationsApp",["visualizations"]).controller("MainCtrl",["$scope",function(a){for(var b=[],c=[],d=0;500>d;d++){var e=200*Math.sin(d/20)+20;b.push({positive:Math.abs(.3*e),negative:Math.abs(.2*e),neutral:Math.abs(.5*e)});var e=50*Math.sin(d/20)+5;c.push({positive:Math.abs(.3*e),negative:Math.abs(.2*e),neutral:Math.abs(.5*e)})}a.firstwave=b,a.subwave=c,a.reticule_data=[{label:"a",id:"3",negative:0,positive:1,neutral:1,size:13.801670593274793,max:3},{label:"b",id:"6",negative:0,positive:0,neutral:0,size:14.139001927607625,max:3},{label:"c",id:"7",negative:0,positive:0,neutral:0,size:16.635253801670594,max:2},{label:"d",id:"9",negative:0,positive:0,neutral:0,size:16.635253801670594,max:2},{label:"e",id:"42",negative:0,positive:1,neutral:2,size:21.965088884129365,max:4},{label:"f",id:"29",negative:0,positive:0,neutral:2,size:24.5288070250589,max:3},{label:"g",id:"47",negative:0,positive:4,neutral:0,size:25.810666095523665,max:5},{label:"h",id:"54",negative:0,positive:1,neutral:2,size:26.013064896123367,max:5},{label:"h",id:"41",negative:0,positive:0,neutral:2,size:26.147997429856503,max:6},{label:"j",id:"98",negative:0,positive:1,neutral:3,size:27.429856500321268,max:6},{label:"k",id:"53",negative:0,positive:1,neutral:1,size:31.07303491111587,max:7},{label:"l",id:"30",negative:1,positive:4,neutral:3,size:33.77168558577854,max:7},{label:"m",id:"8",negative:1,positive:5,neutral:3,size:33.77168558577854,max:5},{label:"n",id:"2",negative:1,positive:4,neutral:3,size:48.276932962090385,max:8}];for(var f={a:[],b:[],c:[]},g=new Date,h=100;h>=0;h--){var i=g-864e5*h;f.a.push({date:i,value:Math.abs(70*Math.cos((100-h)/5))}),f.b.push({date:i,value:Math.abs(100*Math.cos((100-h)/8))}),f.c.push({date:i,value:Math.abs(80*Math.cos((100-h)/25))})}a.signals=f}]);