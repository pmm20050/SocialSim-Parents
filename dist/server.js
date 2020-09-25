!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/",r(r.s=7)}([function(e,t){e.exports=require("express")},function(e,t){e.exports=require("fs")},function(e,t){e.exports=require("googleapis")},function(e,t){e.exports=require("body-parser")},function(e,t){e.exports=require("path")},function(e,t){e.exports=require("readline")},function(e,t){e.exports=require("cors")},function(e,t,r){"use strict";r.r(t);var n=r(4),o=r.n(n),s=r(0),i=r.n(s),a=(r(6),r(1)),l=r.n(a),u=r(5),c=r.n(u),d=r(2);const p=["https://www.googleapis.com/auth/spreadsheets"],f="token.json";function g(e,t){const{client_secret:r,client_id:n,redirect_uris:o}=e.installed,s=new d.google.auth.OAuth2(n,r,o[0]);l.a.readFile(f,(e,r)=>{if(e)return function(e,t){const r=e.generateAuthUrl({access_type:"offline",scope:p});console.log("Authorize this app by visiting this url:",r);const n=c.a.createInterface({input:process.stdin,output:process.stdout});n.question("Enter the code from that page here: ",r=>{n.close(),e.getToken(r,(r,n)=>{if(r)return console.error("Error while trying to retrieve access token",r);e.setCredentials(n),l.a.writeFile(f,JSON.stringify(n),e=>{if(e)return console.error(e);console.log("Token stored to",f)}),t(e)})})}(s,t);s.setCredentials(JSON.parse(r)),t(s)})}const h=i.a.Router();h.route("/getAllData").get(function(e,t,r){let n=["id","email","password","firstname","lastname","dob","address","gender","childs","privacy","post1","semantic1","post2","semantic2","post3","semantic3","post4","semantic4","post5","semantic5","reason1","reason2","reason3","reason4","reason5","optout","risk","like","score"];l.a.readFile("credentials.json",(e,r)=>{if(e)return console.log("Error loading client secret file:",e);g(JSON.parse(r),e=>{d.google.sheets({version:"v4",auth:e}).spreadsheets.values.get({spreadsheetId:"1Uu4KQQH3b_16AUR9GeGtdWvmmOx03sbtXx6YHbHlmbQ",range:"Sheet1!A2:AC"},(e,r)=>{if(e)return t.send("The API returned an error: "+e);const o=r.data.values;if(o.length){let e=[];o.map(t=>{let r={};for(let e=0;e<n.length;++e)r[n[e]]=t[e];e.push(r)});let r=JSON.parse(JSON.stringify(e));t.send(r)}else t.send("No data found.")})})})}),h.route("/addNewUser").post(function(e,t,r){let n=["id","email","password","firstname","lastname","dob","address","gender","childs","privacy","post1","semantic1","post2","semantic2","post3","semantic3","post4","semantic4","post5","semantic5","reason1","reason2","reason3","reason4","reason5","optout","risk","like","score"],o=[];for(let t=0;t<e.body.length;++t){let r=e.body[t],s=[];for(let e=0;e<n.length;++e)s[e]=n[e]in r?r[n[e]]:"";o.push(s)}console.log(o),l.a.readFile("credentials.json",(e,r)=>{if(e)return console.log("Error loading client secret file:",e);g(JSON.parse(r),e=>{d.google.sheets({version:"v4",auth:e}).spreadsheets.values.update({spreadsheetId:"1Uu4KQQH3b_16AUR9GeGtdWvmmOx03sbtXx6YHbHlmbQ",range:"Sheet1!A2:AC",//!A2:S
valueInputOption:"RAW",resource:{values:o}},(e,r)=>{e?t.send(e):(console.log("%d cells updated.",r.updatedCells),t.send("done"))})})})});var m=h,b=r(3),v=r.n(b);const y=i()(),O=__dirname,x=o.a.join(O,"index.html");y.use(i.a.static(O)),y.use(v.a.json()),y.use(i.a.static("asset")),y.use(v.a.urlencoded({extended:!0})),y.use(function(e,t,r){t.header("Access-Control-Allow-Origin","*"),t.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept"),r()}),y.use("/",m),y.get("*",(e,t)=>{t.sendFile(x)});const A=process.env.PORT||3e3;y.listen(A,()=>{console.log(`App listening to ${A} ...`)})}]);