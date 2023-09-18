!function(){function e(e,t,a,o){o.setDefaults({className:"ngdialog-theme-default",showClose:!0,closeByDocument:!0,closeByEscape:!0,width:"75%",height:"40%"}),a.includeSpinner=!0,a.parentSelector="#loadingContainer",a.spinnerTemplate='<div class="center"><img src="/images/loading.svg"></div>',e.when("/",{templateUrl:"cards.html",controller:"CardController"}).when("/login",{controller:"LoginController",templateUrl:"login.html",controllerAs:"vm"}).when("/test",{controller:"FlashCardTestController",templateUrl:"flash-card-test.html"}).when("/index",{templateUrl:"cards.html",controller:"CardController"}).otherwise({redirectTo:"/login"})}function t(e,t){e.globals.currentUser&&(t.defaults.headers.common["x-access-token"]=e.globals.currentUser.authdata)}function a(e,a,o){t(e,o);var n=-1===$.inArray(a.path(),["/login","/register"]),r=e.globals.currentUser;n&&!r&&a.path("/login")}function o(e,o,n,r){e.globals=r.get("flash_card_creds")||{},t(e,n),a(e,o,n),e.$on("$locationChangeStart",function(t,r,i){a(e,o,n)})}angular.module("flashCard",["ngRoute","flashCard.controllers.main","flashCard.controllers.login","flashCard.controllers.cards","flashCard.controllers.cardModal","flashCard.controllers.cardsTest","flashCard.services","angular-loading-bar","ngAnimate","flash","LocalStorageModule","ngDialog","bw.paging","ui.tinymce"]).config(e).run(o),e.$inject=["$routeProvider","$locationProvider","cfpLoadingBarProvider","ngDialogProvider"],o.$inject=["$rootScope","$location","$http","localStorageService"]}(),function(){function e(e,t,a,o,n,r){function i(){o.getCards(e.currentPage,e.pageSize).then(function(t){e.cards=t.data.data.items;for(var a=0;a<e.cards.length;a++)e.cards[a].isFrontShown=!0;e.total=t.data.data.pagination.rowCount}).catch(function(e){n.create("danger",e.data.message,"custom-class")})}e.currentPage=1,e.pageSize=4,e.total=0,e.dialogShown=!1,e.dialogTitle="",e.currentCard={},e.getCards=i,a.$emit("onTabChanged",0),e.reload=function(){i()},e.pageContent=function(t,a,o,n){e.currentPage=a,e.pageSize=o,i()},e.flip=function(e){e.isFrontShown=!e.isFrontShown},e.delete=function(e){o.deleteCard(e.id).then(function(e){i()}).catch(function(e){n.create("danger",e.data.message,"custom-class")})},e.currentDialog={},e.edit=function(t){e.currentCard=t,e.currentCard.type=e.currentCard.type+"",e.currentDialog=r.open({template:"/templates/card.html",controller:"CardModalController",scope:e})},e.add=function(){e.currentCard={type:"1"},e.currentDialog=r.open({template:"/templates/card.html",controller:"CardModalController",scope:e})},e.addOrUpdate=function(){e.currentCard.id?o.updateCard(e.currentCard).then(function(t){e.dialogShown=!1,i()}).catch(function(e){n.create("danger",e.data.message,"custom-class")}):o.insertCard(e.currentCard).then(function(e){i()}).catch(function(e){n.create("danger",e.data.message,"custom-class")})},e.tinymceOptions={plugins:"link image code codesample autoresize",toolbar:"undo redo | bold italic | alignleft aligncenter alignright | codesample"},e.tinymceOptionsReadOnly={plugins:"codesample autoresize",toolbar:"codesample",menubar:!1,readonly:1},i()}angular.module("flashCard.controllers.cards",[]).controller("CardController",["$scope","$location","$rootScope","flashCardService","Flash","ngDialog",e])}(),function(){function e(e,t,a,o,n,r){e.cancel=function(){e.currentDialog.close()};var i=!1;e.currentCard.hints?(e.currentCard.hints=JSON.parse(e.currentCard.hints),0===e.currentCard.hints.length&&(i=!0)):i=!0,i&&(e.currentCard.hints=[{hint:""}]),e.addHint=function(){e.currentCard.hints.push({hint:""})},e.addOrUpdate=function(){e.currentCard.type=Number(e.currentCard.type);var t=[],a=e.currentCard.hints;if(a&&a.length>0)for(var r=0;r<a.length;r++)null!==a[r].hint&&""!==a[r].hint&&t.push(a[r]);e.currentCard.hints=t,e.currentCard.id?o.updateCard(e.currentCard).then(function(t){e.currentDialog.close(),e.getCards()}).catch(function(e){n.create("danger",e.data.message,"card-error")}):o.insertCard(e.currentCard).then(function(t){e.currentDialog.close(),e.getCards()}).catch(function(e){n.create("danger",e.data.message,"card-error")})},e.tinymceOptions={plugins:"link image code codesample autoresize",toolbar:"undo redo | bold italic | alignleft aligncenter alignright | codesample"}}angular.module("flashCard.controllers.cardModal",[]).controller("CardModalController",["$scope","$location","$rootScope","flashCardService","Flash","ngDialog",e])}(),function(){function e(e,t,a,o,n){function r(){e.currentHint=null,e.currentHintIndex=0,o.getRandom().then(function(t){e.card=t.data.data,e.card.isFrontShown=!0,e.card.hints&&(e.card.hints=JSON.parse(e.card.hints)),e.areHintsAvailable=e.card.hints&&e.card.hints.length>0}).catch(function(e){n.create("danger",e.data.message,"custom-class")})}a.$emit("onTabChanged",1),e.card={isFrontShown:!0},e.flip=function(e){e.isFrontShown=!e.isFrontShown},e.refresh=function(){r()},e.currentHintIndex=0,e.showHints=function(){var t=e.card.hints;t.length>e.currentHintIndex?(e.currentHint=t[e.currentHintIndex].hint,e.currentHintIndex++):e.currentHint="No more hints are available"},e.areHintsAvailable=!1,e.tinymceOptionsReadOnly={plugins:"codesample autoresize",toolbar:"codesample",menubar:!1,readonly:1},r()}angular.module("flashCard.controllers.cardsTest",[]).controller("FlashCardTestController",["$scope","$location","$rootScope","flashCardService","Flash",e])}(),function(){function e(e,t,a){function o(){n.dataLoading=!0,t.login(n.username,n.password).then(function(a){t.setCredentials(n.username,n.password),n.dataLoading=!1,e.path("/index")}).catch(function(e){a.create("danger",e.data.message,"custom-class"),n.dataLoading=!1})}var n=this;n.login=o}angular.module("flashCard.controllers.login",[]).controller("LoginController",["$location","flashCardService","Flash",e])}(),function(){var e=function(e,t,a,o,n){e.selectedTab=-1,e.isLoggedIn=!1,t.$on("onTabChanged",function(t,a){console.log(a),e.isLoggedIn=!0,e.selectedTab=a}),e.logout=function(){e.selectedTab=-1,e.isLoggedIn=!1,a.logout(function(){o.path("/login")})},e.reloadServer=function(){a.flushCache().then(function(e){n.create("info",e.data.data.message,"custom-class")}).catch(function(e){n.create("danger",e.message,"custom-class")})}};angular.module("flashCard.controllers.main",[]).controller("MainController",["$scope","$rootScope","flashCardService","$location","Flash",e])}(),function(){var e=function(e,t,a,o){var n=function(t,a,o){return e.post("/api/v1/authenticate",{username:t,password:a})},r=function(e){o.remove("flash_card_creds"),a.globals={},e()},i=function(e,t){a.globals={currentUser:{username:e,authdata:t}},o.set("flash_card_creds",{currentUser:{username:e,authdata:t}})},l=function(t,a){return e.get("/api/v1/cards",{params:{currentPage:t,pageSize:a}})},c=function(t){return e.put("/api/v1/cards/"+t.id,t)},s=function(t){return e.post("/api/v1/cards",t)};return{login:n,logout:r,setCredentials:i,getCards:l,deleteCard:function(t){return e.delete("/api/v1/cards/"+t)},updateCard:c,insertCard:s,getRandom:function(t,a){return e.get("/api/v1/cards/random")}}};angular.module("flashCard.services",[]).factory("flashCardService",["$http","$location","$rootScope","localStorageService",e])}(),function(){"use strict";var e=angular.module("flash",[]);e.run(["$rootScope",function(e){e.flash={},e.flash.text="",e.flash.type="",e.flash.timeout=5e3,e.hasFlash=!1}]),e.directive("dynamic",["$compile",function(e){return{restrict:"A",replace:!0,link:function(t,a,o){t.$watch(o.dynamic,function(o){a.html(o),e(a.contents())(t)})}}}]),e.directive("closeFlash",["$compile","Flash",function(e,t){return{link:function(e,a){a.on("click",function(){t.dismiss()})}}}]),e.directive("flashMessage",["$compile","$rootScope",function(e,t){return{restrict:"A",template:'<div role="alert" ng-show="hasFlash" class="alert {{flash.addClass}} alert-{{flash.type}} alert-dismissible ng-hide alertIn alertOut "> <span dynamic="flash.text"></span> <button type="button" class="close" close-flash><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button> </div>',link:function(e,a,o){t.flash.timeout=parseInt(o.flashMessage,10)}}}]),e.factory("Flash",["$rootScope","$timeout",function(e,t){var a,o={};return o.create=function(o,n,r){var i=this;t.cancel(a),e.flash.type=o,e.flash.text=n,e.flash.addClass=r,t(function(){e.hasFlash=!0},100),a=t(function(){i.dismiss()},e.flash.timeout)},o.pause=function(){t.cancel(a)},o.dismiss=function(){t.cancel(a),t(function(){e.hasFlash=!1})},o}])}(),function(e,t){"use strict";var a=t.isDefined,o=t.isUndefined,n=t.isNumber,r=t.isObject,i=t.isArray,l=t.extend,c=t.toJson;t.module("LocalStorageModule",[]).provider("localStorageService",function(){this.prefix="ls",this.storageType="localStorage",this.cookie={expiry:30,path:"/"},this.notify={setItem:!0,removeItem:!1},this.setPrefix=function(e){return this.prefix=e,this},this.setStorageType=function(e){return this.storageType=e,this},this.setStorageCookie=function(e,t){return this.cookie.expiry=e,this.cookie.path=t,this},this.setStorageCookieDomain=function(e){return this.cookie.domain=e,this},this.setNotify=function(e,t){return this.notify={setItem:e,removeItem:t},this},this.$get=["$rootScope","$window","$document","$parse",function(e,t,s,d){var u,g=this,f=g.prefix,h=g.cookie,m=g.notify,p=g.storageType;s?s[0]&&(s=s[0]):s=document,"."!==f.substr(-1)&&(f=f?f+".":"");var v=function(e){return f+e},y=function(){try{var a=p in t&&null!==t[p],o=v("__"+Math.round(1e7*Math.random()));return a&&(u=t[p],u.setItem(o,""),u.removeItem(o)),a}catch(t){return p="cookie",e.$broadcast("LocalStorageModule.notification.error",t.message),!1}}(),C=function(t,a){if(a=o(a)?null:c(a),!y||"cookie"===g.storageType)return y||e.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),m.setItem&&e.$broadcast("LocalStorageModule.notification.setitem",{key:t,newvalue:a,storageType:"cookie"}),T(t,a);try{u&&u.setItem(v(t),a),m.setItem&&e.$broadcast("LocalStorageModule.notification.setitem",{key:t,newvalue:a,storageType:g.storageType})}catch(o){return e.$broadcast("LocalStorageModule.notification.error",o.message),T(t,a)}return!0},b=function(t){if(!y||"cookie"===g.storageType)return y||e.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),k(t);var a=u?u.getItem(v(t)):null;if(!a||"null"===a)return null;try{return JSON.parse(a)}catch(e){return a}},D=function(){var t,a;for(t=0;t<arguments.length;t++)if(a=arguments[t],y&&"cookie"!==g.storageType)try{u.removeItem(v(a)),m.removeItem&&e.$broadcast("LocalStorageModule.notification.removeitem",{key:a,storageType:g.storageType})}catch(t){e.$broadcast("LocalStorageModule.notification.error",t.message),A(a)}else y||e.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),m.removeItem&&e.$broadcast("LocalStorageModule.notification.removeitem",{key:a,storageType:"cookie"}),A(a)},S=function(){if(!y)return e.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),!1;var t=f.length,a=[];for(var o in u)if(o.substr(0,t)===f)try{a.push(o.substr(t))}catch(t){return e.$broadcast("LocalStorageModule.notification.error",t.Description),[]}return a},$=function(t){var a=f?new RegExp("^"+f):new RegExp,o=t?new RegExp(t):new RegExp;if(!y||"cookie"===g.storageType)return y||e.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),O();var n=f.length;for(var r in u)if(a.test(r)&&o.test(r.substr(n)))try{D(r.substr(n))}catch(t){return e.$broadcast("LocalStorageModule.notification.error",t.message),O()}return!0},w=function(){try{return t.navigator.cookieEnabled||"cookie"in s&&(s.cookie.length>0||(s.cookie="test").indexOf.call(s.cookie,"test")>-1)}catch(t){return e.$broadcast("LocalStorageModule.notification.error",t.message),!1}}(),T=function(t,a,l){if(o(a))return!1;if((i(a)||r(a))&&(a=c(a)),!w)return e.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var d="",u=new Date,g="";if(null===a?(u.setTime(u.getTime()+-864e5),d="; expires="+u.toGMTString(),a=""):n(l)&&0!==l?(u.setTime(u.getTime()+24*l*60*60*1e3),d="; expires="+u.toGMTString()):0!==h.expiry&&(u.setTime(u.getTime()+24*h.expiry*60*60*1e3),d="; expires="+u.toGMTString()),t){var f="; path="+h.path;h.domain&&(g="; domain="+h.domain),s.cookie=v(t)+"="+encodeURIComponent(a)+d+f+g}}catch(t){return e.$broadcast("LocalStorageModule.notification.error",t.message),!1}return!0},k=function(t){if(!w)return e.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var a=s.cookie&&s.cookie.split(";")||[],o=0;o<a.length;o++){for(var n=a[o];" "===n.charAt(0);)n=n.substring(1,n.length);if(0===n.indexOf(v(t)+"=")){var r=decodeURIComponent(n.substring(f.length+t.length+1,n.length));try{return JSON.parse(r)}catch(e){return r}}}return null},A=function(e){T(e,null)},O=function(){for(var e=null,t=f.length,a=s.cookie.split(";"),o=0;o<a.length;o++){for(e=a[o];" "===e.charAt(0);)e=e.substring(1,e.length);var n=e.substring(t,e.indexOf("="));A(n)}};return{isSupported:y,getStorageType:function(){return p},set:C,add:C,get:b,keys:S,remove:D,clearAll:$,bind:function(e,t,o,n){n=n||t;var i=b(n);return null===i&&a(o)?i=o:r(i)&&r(o)&&(i=l(o,i)),d(t).assign(e,i),e.$watch(t,function(e){C(n,e)},r(e[t]))},deriveKey:v,length:function(){for(var e=0,a=t[p],o=0;o<a.length;o++)0===a.key(o).indexOf(f)&&e++;return e},cookie:{isSupported:w,set:T,add:T,get:k,remove:A,clearAll:O}}}]})}(window,window.angular),function(e,t){"undefined"!=typeof module&&module.exports?(t("undefined"==typeof angular?require("angular"):angular),module.exports="ngDialog"):"function"==typeof define&&define.amd?define(["angular"],t):t(e.angular)}(this,function(e){"use strict";var t=e.module("ngDialog",[]),a=e.element,o=e.isDefined,n=(document.body||document.documentElement).style,r=o(n.animation)||o(n.WebkitAnimation)||o(n.MozAnimation)||o(n.MsAnimation)||o(n.OAnimation),i="animationend webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend",l={html:!1,body:!1},c={},s=[],d=!1,u=!1;return t.provider("ngDialog",function(){var t=this.defaults={className:"ngdialog-theme-default",appendClassName:"",disableAnimation:!1,plain:!1,showClose:!0,closeByDocument:!0,closeByEscape:!0,closeByNavigation:!1,appendTo:!1,preCloseCallback:!1,overlay:!0,cache:!0,trapFocus:!0,preserveFocus:!0,ariaAuto:!0,ariaRole:null,ariaLabelledById:null,ariaLabelledBySelector:null,ariaDescribedById:null,ariaDescribedBySelector:null,bodyClassName:"ngdialog-open",width:null,height:null};this.setForceHtmlReload=function(e){l.html=e||!1},this.setForceBodyReload=function(e){l.body=e||!1},this.setDefaults=function(a){e.extend(t,a)},this.setOpenOnePerName=function(e){u=e||!1};var o,n=0,g=0,f={};this.$get=["$document","$templateCache","$compile","$q","$http","$rootScope","$timeout","$window","$controller","$injector",function(h,m,p,v,y,C,b,D,S,$){var w=[],T={onDocumentKeydown:function(e){27===e.keyCode&&k.close("$escape")},activate:function(e){e.data("$ngDialogOptions").trapFocus&&(e.on("keydown",T.onTrapFocusKeydown),w.body.on("keydown",T.onTrapFocusKeydown))},deactivate:function(e){e.off("keydown",T.onTrapFocusKeydown),w.body.off("keydown",T.onTrapFocusKeydown)},deactivateAll:function(t){e.forEach(t,function(t){var a=e.element(t);T.deactivate(a)})},setBodyPadding:function(e){var t=parseInt(w.body.css("padding-right")||0,10);w.body.css("padding-right",t+e+"px"),w.body.data("ng-dialog-original-padding",t),C.$broadcast("ngDialog.setPadding",e)},resetBodyPadding:function(){var e=w.body.data("ng-dialog-original-padding");e?w.body.css("padding-right",e+"px"):w.body.css("padding-right",""),C.$broadcast("ngDialog.setPadding",0)},performCloseDialog:function(e,t){var a=e.data("$ngDialogOptions"),n=e.attr("id"),l=c[n];if(l){if(void 0!==D.Hammer){var u=l.hammerTime;u.off("tap",o),u.destroy&&u.destroy(),delete l.hammerTime}else e.unbind("click");1===g&&w.body.unbind("keydown",T.onDocumentKeydown),e.hasClass("ngdialog-closing")||(g-=1);var h=e.data("$ngDialogPreviousFocus");h&&h.focus&&h.focus(),C.$broadcast("ngDialog.closing",e,t),g=g<0?0:g,r&&!a.disableAnimation?(l.$destroy(),e.unbind(i).bind(i,function(){T.closeDialogElement(e,t)}).addClass("ngdialog-closing")):(l.$destroy(),T.closeDialogElement(e,t)),f[n]&&(f[n].resolve({id:n,value:t,$dialog:e,remainingDialogs:g}),delete f[n]),c[n]&&delete c[n],s.splice(s.indexOf(n),1),s.length||(w.body.unbind("keydown",T.onDocumentKeydown),d=!1)}},closeDialogElement:function(e,t){var a=e.data("$ngDialogOptions");e.remove(),0===g&&(w.html.removeClass(a.bodyClassName),w.body.removeClass(a.bodyClassName),T.resetBodyPadding()),C.$broadcast("ngDialog.closed",e,t)},closeDialog:function(t,a){var o=t.data("$ngDialogPreCloseCallback");if(o&&e.isFunction(o)){var n=o.call(t,a);if(e.isObject(n))n.closePromise?n.closePromise.then(function(){T.performCloseDialog(t,a)},function(){return!1}):n.then(function(){T.performCloseDialog(t,a)},function(){return!1});else{if(!1===n)return!1;T.performCloseDialog(t,a)}}else T.performCloseDialog(t,a)},onTrapFocusKeydown:function(t){var a,o=e.element(t.currentTarget);if(o.hasClass("ngdialog"))a=o;else if(null===(a=T.getActiveDialog()))return;var n=9===t.keyCode,r=!0===t.shiftKey;n&&T.handleTab(a,t,r)},handleTab:function(e,t,a){var o=T.getFocusableElements(e);if(0===o.length)return void(document.activeElement&&document.activeElement.blur&&document.activeElement.blur());var n=document.activeElement,r=Array.prototype.indexOf.call(o,n),i=-1===r,l=0===r,c=r===o.length-1,s=!1;a?(i||l)&&(o[o.length-1].focus(),s=!0):(i||c)&&(o[0].focus(),s=!0),s&&(t.preventDefault(),t.stopPropagation())},autoFocus:function(e){var t=e[0],o=t.querySelector("*[autofocus]");if(null===o||(o.focus(),document.activeElement!==o)){var n=T.getFocusableElements(e);if(n.length>0)return void n[0].focus();var r=T.filterVisibleElements(t.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span"));if(r.length>0){var i=r[0];a(i).attr("tabindex","-1").css("outline","0"),i.focus()}}},getFocusableElements:function(e){var t=e[0],a=t.querySelectorAll("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]"),o=T.filterTabbableElements(a);return T.filterVisibleElements(o)},filterTabbableElements:function(e){for(var t=[],o=0;o<e.length;o++){var n=e[o];"-1"!==a(n).attr("tabindex")&&t.push(n)}return t},filterVisibleElements:function(e){for(var t=[],a=0;a<e.length;a++){var o=e[a];(o.offsetWidth>0||o.offsetHeight>0)&&t.push(o)}return t},getActiveDialog:function(){var e=document.querySelectorAll(".ngdialog");return 0===e.length?null:a(e[e.length-1])},applyAriaAttributes:function(e,t){if(t.ariaAuto){if(!t.ariaRole){var a=T.getFocusableElements(e).length>0?"dialog":"alertdialog";t.ariaRole=a}t.ariaLabelledBySelector||(t.ariaLabelledBySelector="h1,h2,h3,h4,h5,h6"),t.ariaDescribedBySelector||(t.ariaDescribedBySelector="article,section,p")}t.ariaRole&&e.attr("role",t.ariaRole),T.applyAriaAttribute(e,"aria-labelledby",t.ariaLabelledById,t.ariaLabelledBySelector),T.applyAriaAttribute(e,"aria-describedby",t.ariaDescribedById,t.ariaDescribedBySelector)},applyAriaAttribute:function(e,t,o,n){if(o&&e.attr(t,o),n){var r=e.attr("id"),i=e[0].querySelector(n);if(!i)return;var l=r+"-"+t;return a(i).attr("id",l),e.attr(t,l),l}},detectUIRouter:function(){try{return e.module("ui.router"),!0}catch(e){return!1}},getRouterLocationEventName:function(){return T.detectUIRouter()?"$stateChangeStart":"$locationChangeStart"}},k={__PRIVATE__:T,open:function(r){function i(e,t){return C.$broadcast("ngDialog.templateLoading",e),y.get(e,t||{}).then(function(t){return C.$broadcast("ngDialog.templateLoaded",e),t.data||""})}var l=null;if(r=r||{},!(u&&r.name&&(l=r.name.toLowerCase().replace(/\s/g,"-")+"-dialog",this.isOpen(l)))){var h=e.copy(t),A=++n;l=l||"ngdialog"+A,s.push(l),void 0!==h.data&&(void 0===r.data&&(r.data={}),r.data=e.merge(e.copy(h.data),r.data)),e.extend(h,r);var O;f[l]=O=v.defer();var E;c[l]=E=e.isObject(h.scope)?h.scope.$new():C.$new();var L,x,F,I=e.extend({},h.resolve);return e.forEach(I,function(t,a){I[a]=e.isString(t)?$.get(t):$.invoke(t,null,null,a)}),v.all({template:function(t){return t?e.isString(t)&&h.plain?t:"boolean"!=typeof h.cache||h.cache?i(t,{cache:m}):i(t,{cache:!1}):"Empty template"}(h.template||h.templateUrl),locals:v.all(I)}).then(function(t){var n=t.template,r=t.locals;h.showClose&&(n+='<div class="ngdialog-close"></div>');var i=h.overlay?"":" ngdialog-no-overlay";if(L=a('<div id="'+l+'" class="ngdialog'+i+'"></div>'),L.html(h.overlay?'<div class="ngdialog-overlay"></div><div class="ngdialog-content" role="document">'+n+"</div>":'<div class="ngdialog-content" role="document">'+n+"</div>"),L.data("$ngDialogOptions",h),E.ngDialogId=l,h.data&&e.isString(h.data)){var c=h.data.replace(/^\s*/,"")[0];E.ngDialogData="{"===c||"["===c?e.fromJson(h.data):new String(h.data),E.ngDialogData.ngDialogId=l}else h.data&&e.isObject(h.data)&&(E.ngDialogData=h.data,E.ngDialogData.ngDialogId=l);if(h.className&&L.addClass(h.className),h.appendClassName&&L.addClass(h.appendClassName),h.width&&(F=L[0].querySelector(".ngdialog-content"),e.isString(h.width)?F.style.width=h.width:F.style.width=h.width+"px"),h.height&&(F=L[0].querySelector(".ngdialog-content"),e.isString(h.height)?F.style.height=h.height:F.style.height=h.height+"px"),h.disableAnimation&&L.addClass("ngdialog-disabled-animation"),x=h.appendTo&&e.isString(h.appendTo)?e.element(document.querySelector(h.appendTo)):w.body,T.applyAriaAttributes(L,h),h.preCloseCallback){var s;e.isFunction(h.preCloseCallback)?s=h.preCloseCallback:e.isString(h.preCloseCallback)&&E&&(e.isFunction(E[h.preCloseCallback])?s=E[h.preCloseCallback]:E.$parent&&e.isFunction(E.$parent[h.preCloseCallback])?s=E.$parent[h.preCloseCallback]:C&&e.isFunction(C[h.preCloseCallback])&&(s=C[h.preCloseCallback])),s&&L.data("$ngDialogPreCloseCallback",s)}if(E.closeThisDialog=function(e){T.closeDialog(L,e)},h.controller&&(e.isString(h.controller)||e.isArray(h.controller)||e.isFunction(h.controller))){var u;h.controllerAs&&e.isString(h.controllerAs)&&(u=h.controllerAs);var f=S(h.controller,e.extend(r,{$scope:E,$element:L}),!0,u);h.bindToController&&e.extend(f.instance,{ngDialogId:E.ngDialogId,ngDialogData:E.ngDialogData,closeThisDialog:E.closeThisDialog,confirm:E.confirm}),"function"==typeof f?L.data("$ngDialogControllerController",f()):L.data("$ngDialogControllerController",f)}if(b(function(){var e=document.querySelectorAll(".ngdialog");T.deactivateAll(e),p(L)(E);var t=D.innerWidth-w.body.prop("clientWidth");w.html.addClass(h.bodyClassName),w.body.addClass(h.bodyClassName);var a=t-(D.innerWidth-w.body.prop("clientWidth"));a>0&&T.setBodyPadding(a),x.append(L),T.activate(L),h.trapFocus&&T.autoFocus(L),h.name?C.$broadcast("ngDialog.opened",{dialog:L,name:h.name}):C.$broadcast("ngDialog.opened",L)}),d||(w.body.bind("keydown",T.onDocumentKeydown),d=!0),h.closeByNavigation){var m=T.getRouterLocationEventName();C.$on(m,function(e){!1===T.closeDialog(L)&&e.preventDefault()})}if(h.preserveFocus&&L.data("$ngDialogPreviousFocus",document.activeElement),o=function(e){var t=!!h.closeByDocument&&a(e.target).hasClass("ngdialog-overlay"),o=a(e.target).hasClass("ngdialog-close");(t||o)&&k.close(L.attr("id"),o?"$closeButton":"$document")},void 0!==D.Hammer){(E.hammerTime=D.Hammer(L[0])).on("tap",o)}else L.bind("click",o);return g+=1,k}),{id:l,closePromise:O.promise,close:function(e){T.closeDialog(L,e)}}}},openConfirm:function(o){var n=v.defer(),r=e.copy(t);o=o||{},void 0!==r.data&&(void 0===o.data&&(o.data={}),o.data=e.merge(e.copy(r.data),o.data)),e.extend(r,o),r.scope=e.isObject(r.scope)?r.scope.$new():C.$new(),r.scope.confirm=function(e){n.resolve(e);var t=a(document.getElementById(i.id));T.performCloseDialog(t,e)};var i=k.open(r);if(i)return i.closePromise.then(function(e){return e?n.reject(e.value):n.reject()}),n.promise},isOpen:function(e){return a(document.getElementById(e)).length>0},close:function(e,t){var o=a(document.getElementById(e));if(o.length)T.closeDialog(o,t);else if("$escape"===e){var n=s[s.length-1];o=a(document.getElementById(n)),o.data("$ngDialogOptions").closeByEscape&&T.closeDialog(o,"$escape")}else k.closeAll(t);return k},closeAll:function(e){for(var t=document.querySelectorAll(".ngdialog"),o=t.length-1;o>=0;o--){var n=t[o];T.closeDialog(a(n),e)}},getOpenDialogs:function(){return s},getDefaults:function(){return t}};return e.forEach(["html","body"],function(e){if(w[e]=h.find(e),l[e]){var t=T.getRouterLocationEventName();C.$on(t,function(){w[e]=h.find(e)})}}),k}]}),t.directive("ngDialog",["ngDialog",function(t){return{restrict:"A",scope:{ngDialogScope:"="},link:function(a,o,n){o.on("click",function(o){o.preventDefault();var r=e.isDefined(a.ngDialogScope)?a.ngDialogScope:"noScope";e.isDefined(n.ngDialogClosePrevious)&&t.close(n.ngDialogClosePrevious);var i=t.getDefaults();t.open({template:n.ngDialog,className:n.ngDialogClass||i.className,appendClassName:n.ngDialogAppendClass,controller:n.ngDialogController,controllerAs:n.ngDialogControllerAs,bindToController:n.ngDialogBindToController,scope:r,data:n.ngDialogData,showClose:"false"!==n.ngDialogShowClose&&("true"===n.ngDialogShowClose||i.showClose),closeByDocument:"false"!==n.ngDialogCloseByDocument&&("true"===n.ngDialogCloseByDocument||i.closeByDocument),closeByEscape:"false"!==n.ngDialogCloseByEscape&&("true"===n.ngDialogCloseByEscape||i.closeByEscape),overlay:"false"!==n.ngDialogOverlay&&("true"===n.ngDialogOverlay||i.overlay),preCloseCallback:n.ngDialogPreCloseCallback||i.preCloseCallback,bodyClassName:n.ngDialogBodyClass||i.bodyClassName})})}}}]),t});