"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[6418],{6418:(y,x,l)=>{l.r(x),l.d(x,{LearningPageModule:()=>d});var g=l(6895),f=l(433),a=l(5035),p=l(2598),_=l(5861),t=l(8256),m=l(1491);const w=["answer"],Z=["correction"];function T(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"div")(1,"ion-grid")(2,"ion-row")(3,"ion-col")(4,"ion-item")(5,"ion-label",8),t._uU(6),t.qZA()()()(),t.TgZ(7,"ion-row")(8,"ion-col")(9,"ion-item",9)(10,"ion-label"),t._uU(11,"Answer:"),t.qZA(),t.TgZ(12,"ion-input",10,11),t.NdJ("keyup.enter",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.checkAnswer())})("ngModelChange",function(i){t.CHM(e);const c=t.oxw();return t.KtG(c.answerText=i)}),t.qZA(),t.TgZ(14,"ion-button",12),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.checkAnswer())}),t._uU(15,"Check"),t.qZA(),t.TgZ(16,"ion-button",13),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.skip())}),t._uU(17,"Skip"),t.qZA()()()()()()}if(2&o){const e=t.oxw();t.xp6(6),t.hij(" Question: ",e.getQuestion()," "),t.xp6(3),t.Q6J("color",e.tempColor),t.xp6(3),t.Q6J("ngModel",e.answerText)("readonly",e.tempReadonly),t.xp6(2),t.Q6J("disabled",e.tempReadonly),t.xp6(2),t.Q6J("disabled",e.tempReadonly)}}function A(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"div")(1,"ion-grid")(2,"ion-row")(3,"ion-col")(4,"ion-item")(5,"ion-label",8),t._uU(6),t.qZA()()()(),t.TgZ(7,"ion-row")(8,"ion-col",14)(9,"ion-item")(10,"ion-label",15),t._uU(11),t.qZA()()(),t.TgZ(12,"ion-col",14)(13,"ion-item")(14,"ion-label",16),t._uU(15),t.qZA()()()(),t.TgZ(16,"ion-row")(17,"ion-col")(18,"ion-item",9)(19,"ion-label"),t._uU(20,"Answer:"),t.qZA(),t.TgZ(21,"ion-input",17,18),t.NdJ("keyup",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.enterAnswer())})("ngModelChange",function(i){t.CHM(e);const c=t.oxw();return t.KtG(c.correctionText=i)}),t.qZA(),t.TgZ(23,"ion-button",19),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.changeWrong())}),t._uU(24,"I was right!"),t.qZA()()()()()()}if(2&o){const e=t.oxw();t.xp6(6),t.hij(" Question: ",e.getQuestion()," "),t.xp6(5),t.hij(" Correct Answer: ",e.getAnswer()," "),t.xp6(4),t.hij(" Your Answer: ",e.answerText," "),t.xp6(3),t.Q6J("color",e.tempColor),t.xp6(3),t.Q6J("ngModel",e.correctionText)("readonly",e.tempReadonly),t.xp6(2),t.Q6J("disabled",e.tempReadonly)}}function k(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"ion-item")(1,"ion-label",29)(2,"ion-row")(3,"ion-col"),t._uU(4),t.qZA(),t.TgZ(5,"ion-col"),t._uU(6," - "),t.qZA(),t.TgZ(7,"ion-col"),t._uU(8),t.qZA(),t.TgZ(9,"ion-col")(10,"ion-col",30)(11,"ion-button",31),t.NdJ("click",function(){const c=t.CHM(e).$implicit,C=t.oxw(2);return t.KtG(C.setStar(c._id))}),t._UZ(12,"ion-icon",32),t.qZA()()()()()()}if(2&o){const e=n.$implicit,r=t.oxw(2);t.xp6(1),t.Q6J("color",e.correct?"success":e.wrong?"danger":e.changed?"warning":"dark"),t.xp6(3),t.hij(" ",e.first," "),t.xp6(4),t.hij(" ",e.second," "),t.xp6(3),t.Q6J("color",r.getStar(e._id)?"warning":"medium")}}function S(o,n){if(1&o){const e=t.EpF();t.TgZ(0,"div")(1,"ion-grid")(2,"ion-row")(3,"ion-col")(4,"ion-item",20)(5,"ion-label"),t._uU(6,"Final"),t.qZA()()()(),t.TgZ(7,"ion-row")(8,"ion-col")(9,"ion-item",21)(10,"ion-label"),t._uU(11),t.qZA()()(),t.TgZ(12,"ion-col")(13,"ion-item",22)(14,"ion-label"),t._uU(15),t.qZA()()(),t.TgZ(16,"ion-col")(17,"ion-item",23)(18,"ion-label"),t._uU(19),t.qZA()()()(),t.TgZ(20,"ion-row")(21,"ion-col")(22,"ion-button",24),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.markNothing())}),t._uU(23,"Mark nothing"),t.qZA()(),t.TgZ(24,"ion-col")(25,"ion-button",24),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.markAll())}),t._uU(26,"Mark all"),t.qZA()(),t.TgZ(27,"ion-col")(28,"ion-button",24),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.markCorrect())}),t._uU(29,"Mark Correct"),t.qZA()(),t.TgZ(30,"ion-col")(31,"ion-button",24),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.markWrong())}),t._uU(32,"Mark Wrong"),t.qZA()()(),t.TgZ(33,"ion-row")(34,"ion-col"),t.YNc(35,k,13,4,"ion-item",25),t.qZA()(),t.TgZ(36,"ion-row")(37,"ion-col")(38,"ion-button",26),t._uU(39," Back to Set Page "),t.qZA()(),t.TgZ(40,"ion-col")(41,"ion-button",27),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.again())}),t._uU(42," Again with all "),t.qZA()(),t.TgZ(43,"ion-col")(44,"ion-button",27),t.NdJ("click",function(){t.CHM(e);const i=t.oxw();return t.KtG(i.again())}),t._uU(45," Again with "),t._UZ(46,"ion-icon",28),t.qZA()()()()()}if(2&o){const e=t.oxw();t.xp6(11),t.AsE("",e.correctCount," - ",e.floor(100*e.correctCount/e.index),"% Correct"),t.xp6(4),t.AsE("",e.skippedCount," - ",e.floor(100*e.skippedCount/e.index),"% Skipped"),t.xp6(4),t.AsE("",e.index-e.correctCount-e.skippedCount," - ",e.floor(100*(e.index-e.correctCount-e.skippedCount)/e.index),"% Wrong"),t.xp6(16),t.Q6J("ngForOf",e.data),t.xp6(3),t.Q6J("routerLink","/set/"+e.id),t.xp6(3),t.Q6J("routerLink","/learning/"+e.id+"/false"),t.xp6(3),t.Q6J("routerLink","/learning/"+e.id+"/true")}}var s=(()=>{return(o=s||(s={}))[o.Ask=0]="Ask",o[o.Answer=1]="Answer",o[o.Final=2]="Final",s;var o})();class h{constructor(n,e){this.activatedRoute=n,this.apiService=e,this.starred=!1,this.status=s.Ask,this.userStat=null,this.correctionText="",this.index=0,this.correctCount=0,this.skippedCount=0,this.tempReadonly=!1,this.tempColor="none"}ionViewWillEnter(){this.apiService.getSet(this.id).then(n=>{this.set=n,this.starred?this.apiService.getUserStats(this.id).then(e=>{let r=[];for(let i of e.data)if(i.stared)for(let c of this.set.data)if(c._id==i.cardid){r.push(c);break}this.data=this.shuffleArray(r)}):(this.data=n.data,this.data=this.shuffleArray(this.data))}),this.apiService.getUserStats(this.id).then(n=>{this.userStat=n}),this.correctCount=0,this.index=0,this.status=s.Ask,this.correctionText="",this.answerText="",this.setFocus()}floor(n){return Math.round(n)}getQuestion(){if(void 0!==this.data)return this.data[this.index].first}getAnswer(){return void 0===this.data?"":this.answerFormat(this.data[this.index].second)}answerFormat(n){let e=n;return e=e.replace(/[(\[{][^(\[{}\])]*[}\])]/g," "),e=e.replace(/[;()\[\]{}\\/]/g," "),e=e.replace(new RegExp("(?<=[^\\d]|([\\d][,.][\\d]))[.,]","g")," "),e=e.replace(/ {2,}/g," "),e=e.trim(),e}getAnswerText(){let n="";if(this.status==s.Ask){if(void 0===this.answerText)return"";n=this.answerText}else{if(void 0===this.correctionText)return"";n=this.correctionText}return this.answerFormat(n)}setFocus(){setTimeout(()=>{var n,e;this.status==s.Ask?null===(n=this.answer)||void 0===n||n.setFocus():null===(e=this.correction)||void 0===e||e.setFocus()},100)}ngOnInit(){this.id=this.activatedRoute.snapshot.paramMap.get("id"),this.starred="true"===this.activatedRoute.snapshot.paramMap.get("starred")}checkAnswer(){this.tempReadonly||(this.getAnswerText().trim()==this.getAnswer().trim()?(this.tempColor="success",this.tempReadonly=!0,setTimeout(()=>{this.tempColor="none",this.tempReadonly=!1,this.status=s.Ask,this.correctCount++,this.data[this.index].correct=!0,this.apiService.updateUserStats(this.id,this.data[this.index]._id,"success"),this.nextItem()},500)):this.status=s.Answer,this.setFocus())}enterAnswer(){this.tempReadonly||this.getAnswerText().trim()==this.getAnswer().trim()&&(this.tempColor="danger",this.tempReadonly=!0,setTimeout(()=>{this.tempColor="none",this.tempReadonly=!1,this.status=s.Ask,this.data[this.index].wrong=!0,this.apiService.updateUserStats(this.id,this.data[this.index]._id,"wrong"),this.correctionText="",this.nextItem(),this.setFocus()},2e3))}skip(){this.tempReadonly||(this.status=s.Ask,this.skippedCount++,this.apiService.updateUserStats(this.id,this.data[this.index]._id,"skip"),this.nextItem(),this.setFocus())}changeWrong(){this.tempReadonly||(this.status=s.Ask,this.correctCount++,this.data[this.index].changed=!0,this.apiService.updateUserStats(this.id,this.data[this.index]._id,"changed"),this.correctionText="",this.nextItem(),this.setFocus())}nextItem(){this.tempReadonly||(this.answerText="",this.index++,this.index>=this.data.length&&(this.status=s.Final))}markNothing(){var n=this;!function(){var r=(0,_.Z)(function*(){if(null!=n.userStat&&null!=n.userStat.data){for(let i=0;i<n.userStat.data.length;i++)yield n.setStarVal(n.userStat.data[i].cardid,!1);yield n.apiService.getUserStats(n.id).then(i=>{n.userStat=i})}});return function(){return r.apply(this,arguments)}}()()}markAll(){var n=this;!function(){var r=(0,_.Z)(function*(){if(null!=n.userStat&&null!=n.userStat.data){for(let i=0;i<n.userStat.data.length;i++)yield n.setStarVal(n.userStat.data[i].cardid,!0);yield n.apiService.getUserStats(n.id).then(i=>{n.userStat=i})}});return function(){return r.apply(this,arguments)}}()()}markWrong(){var n=this;!function(){var r=(0,_.Z)(function*(){for(let i of n.data)i.wrong||null==i.wrong&&null==i.correct&&null==i.changed?yield n.setStarVal(i._id,!0):yield n.setStarVal(i._id,!1);yield n.apiService.getUserStats(n.id).then(i=>{n.userStat=i})});return function(){return r.apply(this,arguments)}}()()}markCorrect(){var n=this;!function(){var r=(0,_.Z)(function*(){for(let i of n.data)i.correct||i.changed?yield n.setStarVal(i._id,!0):yield n.setStarVal(i._id,!1);yield n.apiService.getUserStats(n.id).then(i=>{n.userStat=i})});return function(){return r.apply(this,arguments)}}()()}getStar(n){if(null!=this.userStat&&null!=this.userStat.data)for(let e=0;e<this.userStat.data.length;e++)if(this.userStat.data[e].cardid==n)return null!=this.userStat.data[e].stared&&this.userStat.data[e].stared;return!1}setStar(n){return this.setStarVal(n,!this.getStar(n)).then(()=>{this.apiService.getUserStats(this.id).then(e=>{this.userStat=e})})}setStarVal(n,e){return this.apiService.updateUserStared(this.id,n,e).then(r=>{if(null!=this.userStat&&null!=this.userStat.data)for(let i=0;i<this.userStat.data.length;i++)this.userStat.data[i].cardid==n&&(this.userStat.data[i].stared=e)})}again(){this.status=s.Ask,this.answerText="",this.index=0,this.ionViewWillEnter()}shuffleArray(n){let e=[];for(let r=0;r<n.length;r++)e.push(n[r]);for(let r=e.length-1;r>0;r--){const i=Math.floor(Math.random()*(r+1));[e[r],e[i]]=[e[i],e[r]]}return e}}h.\u0275fac=function(n){return new(n||h)(t.Y36(p.gz),t.Y36(m.s))},h.\u0275cmp=t.Xpm({type:h,selectors:[["app-learning"]],viewQuery:function(n,e){if(1&n&&(t.Gf(w,5),t.Gf(Z,5)),2&n){let r;t.iGM(r=t.CRH())&&(e.answer=r.first),t.iGM(r=t.CRH())&&(e.correction=r.first)}},decls:30,vars:12,consts:[[3,"translucent"],["slot","start"],["lines","none",1,"ion-text-center"],["color","success",1,"bar",3,"value"],["color","danger",1,"bar",3,"value"],[1,"bar",3,"value"],[3,"ngSwitch"],[4,"ngSwitchCase"],[1,"ion-text-wrap"],[3,"color"],["placeholder","Your Text",3,"ngModel","readonly","keyup.enter","ngModelChange"],["answer",""],["expand","full",3,"disabled","click"],["color","danger","expand","full",3,"disabled","click"],["size-md","6","size-sm","12","size-xl","6","size-xs","12"],["color","success",1,"ion-text-wrap"],["color","danger",1,"ion-text-wrap"],["placeholder","Your Text",3,"ngModel","readonly","keyup","ngModelChange"],["correction",""],["color","warning","expand","full",3,"disabled","click"],[1,"ion-text-center"],["color","success",1,"ion-text-center","ion-text-wrap"],["color","warning",1,"ion-text-center","ion-text-wrap"],["color","danger",1,"ion-text-center","ion-text-wrap"],["expand","full",3,"click"],[4,"ngFor","ngForOf"],["expand","full","fill","clear","routerDirection","root",3,"routerLink"],["expand","full","fill","clear","routerDirection","root",3,"routerLink","click"],["ios","star-outline","md","star-sharp","slot","end"],[1,"ion-text-center",3,"color"],["sizeMd","2","sizeXl","2","sizeXs","4",1,"ion-no-padding"],["expand","block","fill","clear",3,"color","click"],["ios","star-outline","md","star-sharp","slot","icon-only"]],template:function(n,e){1&n&&(t.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),t._UZ(3,"ion-menu-button"),t.qZA(),t.TgZ(4,"ion-title"),t._uU(5),t.qZA()()(),t.TgZ(6,"ion-content")(7,"ion-grid")(8,"ion-row")(9,"ion-col")(10,"ion-item",2),t._UZ(11,"ion-label")(12,"ion-label"),t.TgZ(13,"ion-label"),t._uU(14),t.qZA(),t.TgZ(15,"ion-label"),t._uU(16," - "),t.qZA(),t.TgZ(17,"ion-label"),t._uU(18),t.qZA(),t._UZ(19,"ion-label")(20,"ion-label"),t.qZA(),t.TgZ(21,"ion-item"),t._UZ(22,"ion-progress-bar",3)(23,"ion-progress-bar",4),t.TgZ(24,"ion-progress-bar",5),t._uU(25,' color="primary" '),t.qZA()()()()(),t.TgZ(26,"div",6),t.YNc(27,T,18,6,"div",7),t.YNc(28,A,25,7,"div",7),t.YNc(29,S,47,10,"div",7),t.qZA()()),2&n&&(t.Q6J("translucent",!0),t.xp6(5),t.hij("Learning ",e.starred?"Starred":"",""),t.xp6(9),t.AsE(" ",e.index," / ",null==e.data?null:e.data.length," "),t.xp6(4),t.hij(" ",e.floor(e.index/(null==e.data?null:e.data.length)*100),"% "),t.xp6(4),t.Q6J("value",e.correctCount/(null==e.data?null:e.data.length)),t.xp6(1),t.Q6J("value",(e.index-e.correctCount)/(null==e.data?null:e.data.length)),t.xp6(1),t.Q6J("value",e.index/(null==e.data?null:e.data.length)),t.xp6(2),t.Q6J("ngSwitch",e.status),t.xp6(1),t.Q6J("ngSwitchCase",0),t.xp6(1),t.Q6J("ngSwitchCase",1),t.xp6(1),t.Q6J("ngSwitchCase",2))},dependencies:[g.sg,g.RF,g.n9,f.JJ,f.On,a.YG,a.Sm,a.wI,a.W2,a.jY,a.Gu,a.gu,a.pK,a.Ie,a.Q$,a.fG,a.X7,a.Nd,a.wd,a.sr,a.j9,a.YI,p.rH],styles:[".bar[_ngcontent-%COMP%]{height:.5em;margin:5px}"]});const v=[{path:"",component:h}];class u{}u.\u0275fac=function(n){return new(n||u)},u.\u0275mod=t.oAB({type:u}),u.\u0275inj=t.cJS({imports:[p.Bz.forChild(v),p.Bz]});class d{}d.\u0275fac=function(n){return new(n||d)},d.\u0275mod=t.oAB({type:d}),d.\u0275inj=t.cJS({imports:[g.ez,f.u5,a.Pc,u]})}}]);