"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5577],{3121:(Z,d,a)=>{a.r(d),a.d(d,{LearnPageModule:()=>l});var p=a(6895),u=a(433),e=a(5035),c=a(2598),n=a(8256),m=a(1491);function f(i,o){if(1&i&&(n.TgZ(0,"ion-card")(1,"ion-card-header")(2,"ion-grid")(3,"ion-row",5)(4,"ion-col")(5,"ion-button",6)(6,"ion-card-title"),n._uU(7),n.qZA()()(),n.TgZ(8,"ion-col",7)(9,"ion-card-subtitle"),n._uU(10),n.qZA()()()()()()),2&i){const t=o.$implicit;n.xp6(5),n.Q6J("routerLink","/set/"+t._id),n.xp6(2),n.hij(" ",t.name," "),n.xp6(3),n.hij(" ",t.length," Cards ")}}class s{constructor(o){this.apiService=o,this.learnSets=[],this.query="",this.count=10}ngOnInit(){}search(){this.count=Math.abs(this.count);let o="";this.query.length>0&&(o=this.query),this.apiService.searchSets(o,this.count).then(t=>{this.learnSets=t})}}s.\u0275fac=function(o){return new(o||s)(n.Y36(m.s))},s.\u0275cmp=n.Xpm({type:s,selectors:[["app-learn"]],decls:19,vars:4,consts:[[3,"translucent"],["slot","start"],["enterkeyhint","search","inputMode","search","placeholder","Text",3,"ngModel","ionChange","ngModelChange"],["max","1000","min","0","placeholder","10","type","number",3,"ngModel","ionChange","ngModelChange"],[4,"ngFor","ngForOf"],[1,"ion-align-items-center"],["expand","block","fill","clear",3,"routerLink"],[1,"ion-text-center"]],template:function(o,t){1&o&&(n.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),n._UZ(3,"ion-menu-button"),n.qZA(),n.TgZ(4,"ion-title"),n._uU(5,"Learn"),n.qZA()()(),n.TgZ(6,"ion-content")(7,"ion-grid")(8,"ion-row")(9,"ion-col")(10,"ion-item")(11,"ion-label"),n._uU(12,"Search:"),n.qZA(),n.TgZ(13,"ion-input",2),n.NdJ("ionChange",function(){return t.search()})("ngModelChange",function(h){return t.query=h}),n.qZA(),n.TgZ(14,"ion-input",3),n.NdJ("ionChange",function(){return t.search()})("ngModelChange",function(h){return t.count=h}),n.qZA()()()(),n.TgZ(15,"ion-row")(16,"ion-col")(17,"ion-label"),n.YNc(18,f,11,3,"ion-card",4),n.qZA()()()()()),2&o&&(n.Q6J("translucent",!0),n.xp6(13),n.Q6J("ngModel",t.query),n.xp6(1),n.Q6J("ngModel",t.count),n.xp6(4),n.Q6J("ngForOf",t.learnSets))},dependencies:[p.sg,u.JJ,u.On,e.YG,e.Sm,e.PM,e.Zi,e.tO,e.Dq,e.wI,e.W2,e.jY,e.Gu,e.pK,e.Ie,e.Q$,e.fG,e.Nd,e.wd,e.sr,e.as,e.j9,e.YI,c.rH]});const M=[{path:"",component:s}];class r{}r.\u0275fac=function(o){return new(o||r)},r.\u0275mod=n.oAB({type:r}),r.\u0275inj=n.cJS({imports:[c.Bz.forChild(M),c.Bz]});class l{}l.\u0275fac=function(o){return new(o||l)},l.\u0275mod=n.oAB({type:l}),l.\u0275inj=n.cJS({imports:[p.ez,u.u5,e.Pc,r]})}}]);