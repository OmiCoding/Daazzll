"use strict";(self.__LOADABLE_LOADED_CHUNKS__=self.__LOADABLE_LOADED_CHUNKS__||[]).push([["npm.scheduler"],{"./node_modules/scheduler/cjs/scheduler-tracing.development.js":(n,e)=>{(function(){var n=0,t=0;e.__interactionsRef=null,e.__subscriberRef=null,e.__interactionsRef={current:new Set},e.__subscriberRef={current:null};var r=null;function o(n){var e=!1,t=null;if(r.forEach((function(r){try{r.onInteractionTraced(n)}catch(n){e||(e=!0,t=n)}})),e)throw t}function l(n){var e=!1,t=null;if(r.forEach((function(r){try{r.onInteractionScheduledWorkCompleted(n)}catch(n){e||(e=!0,t=n)}})),e)throw t}function u(n,e){var t=!1,o=null;if(r.forEach((function(r){try{r.onWorkScheduled(n,e)}catch(n){t||(t=!0,o=n)}})),t)throw o}function a(n,e){var t=!1,o=null;if(r.forEach((function(r){try{r.onWorkStarted(n,e)}catch(n){t||(t=!0,o=n)}})),t)throw o}function i(n,e){var t=!1,o=null;if(r.forEach((function(r){try{r.onWorkStopped(n,e)}catch(n){t||(t=!0,o=n)}})),t)throw o}function c(n,e){var t=!1,o=null;if(r.forEach((function(r){try{r.onWorkCanceled(n,e)}catch(n){t||(t=!0,o=n)}})),t)throw o}r=new Set,e.unstable_clear=function(n){var t=e.__interactionsRef.current;e.__interactionsRef.current=new Set;try{return n()}finally{e.__interactionsRef.current=t}},e.unstable_getCurrent=function(){return e.__interactionsRef.current},e.unstable_getThreadID=function(){return++t},e.unstable_subscribe=function(n){r.add(n),1===r.size&&(e.__subscriberRef.current={onInteractionScheduledWorkCompleted:l,onInteractionTraced:o,onWorkCanceled:c,onWorkScheduled:u,onWorkStarted:a,onWorkStopped:i})},e.unstable_trace=function(t,r,o){var l=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,u={__count:1,id:n++,name:t,timestamp:r},a=e.__interactionsRef.current,i=new Set(a);i.add(u),e.__interactionsRef.current=i;var c,s=e.__subscriberRef.current;try{null!==s&&s.onInteractionTraced(u)}finally{try{null!==s&&s.onWorkStarted(i,l)}finally{try{c=o()}finally{e.__interactionsRef.current=a;try{null!==s&&s.onWorkStopped(i,l)}finally{u.__count--,null!==s&&0===u.__count&&s.onInteractionScheduledWorkCompleted(u)}}}}return c},e.unstable_unsubscribe=function(n){r.delete(n),0===r.size&&(e.__subscriberRef.current=null)},e.unstable_wrap=function(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=e.__interactionsRef.current,o=e.__subscriberRef.current;null!==o&&o.onWorkScheduled(r,t),r.forEach((function(n){n.__count++}));var l=!1;function u(){var u=e.__interactionsRef.current;e.__interactionsRef.current=r,o=e.__subscriberRef.current;try{var a;try{null!==o&&o.onWorkStarted(r,t)}finally{try{a=n.apply(void 0,arguments)}finally{e.__interactionsRef.current=u,null!==o&&o.onWorkStopped(r,t)}}return a}finally{l||(l=!0,r.forEach((function(n){n.__count--,null!==o&&0===n.__count&&o.onInteractionScheduledWorkCompleted(n)})))}}return u.cancel=function(){o=e.__subscriberRef.current;try{null!==o&&o.onWorkCanceled(r,t)}finally{r.forEach((function(n){n.__count--,o&&0===n.__count&&o.onInteractionScheduledWorkCompleted(n)}))}},u}})()},"./node_modules/scheduler/cjs/scheduler.development.js":(n,e)=>{(function(){var n,t,r,o;if("object"==typeof performance&&"function"==typeof performance.now){var l=performance;e.unstable_now=function(){return l.now()}}else{var u=Date,a=u.now();e.unstable_now=function(){return u.now()-a}}if("undefined"==typeof window||"function"!=typeof MessageChannel){var i=null,c=null,s=function(){if(null!==i)try{var n=e.unstable_now();i(!0,n),i=null}catch(n){throw setTimeout(s,0),n}};n=function(e){null!==i?setTimeout(n,0,e):(i=e,setTimeout(s,0))},t=function(n,e){c=setTimeout(n,e)},r=function(){clearTimeout(c)},e.unstable_shouldYield=function(){return!1},o=e.unstable_forceFrameRate=function(){}}else{var f=window.setTimeout,d=window.clearTimeout;if("undefined"!=typeof console){var _=window.requestAnimationFrame,b=window.cancelAnimationFrame;"function"!=typeof _&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),"function"!=typeof b&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills")}var h=!1,p=null,v=-1,y=5,m=0;e.unstable_shouldYield=function(){return e.unstable_now()>=m},o=function(){},e.unstable_forceFrameRate=function(n){n<0||n>125?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=n>0?Math.floor(1e3/n):5};var w=new MessageChannel,k=w.port2;w.port1.onmessage=function(){if(null!==p){var n=e.unstable_now();m=n+y;try{p(!0,n)?k.postMessage(null):(h=!1,p=null)}catch(n){throw k.postMessage(null),n}}else h=!1},n=function(n){p=n,h||(h=!0,k.postMessage(null))},t=function(n,t){v=f((function(){n(e.unstable_now())}),t)},r=function(){d(v),v=-1}}function R(n,e){var t=n.length;n.push(e),function(n,e,t){var r=t;for(;;){var o=r-1>>>1,l=n[o];if(!(void 0!==l&&T(l,e)>0))return;n[o]=e,n[r]=l,r=o}}(n,e,t)}function g(n){var e=n[0];return void 0===e?null:e}function S(n){var e=n[0];if(void 0!==e){var t=n.pop();return t!==e&&(n[0]=t,function(n,e,t){var r=t,o=n.length;for(;r<o;){var l=2*(r+1)-1,u=n[l],a=l+1,i=n[a];if(void 0!==u&&T(u,e)<0)void 0!==i&&T(i,u)<0?(n[r]=i,n[a]=e,r=a):(n[r]=u,n[l]=e,r=l);else{if(!(void 0!==i&&T(i,e)<0))return;n[r]=i,n[a]=e,r=a}}}(n,t,0)),e}return null}function T(n,e){var t=n.sortIndex-e.sortIndex;return 0!==t?t:n.id-e.id}var W=[],C=[],I=1,x=null,E=3,j=!1,A=!1,L=!1;function P(n){for(var e=g(C);null!==e;){if(null===e.callback)S(C);else{if(!(e.startTime<=n))return;S(C),e.sortIndex=e.expirationTime,R(W,e)}e=g(C)}}function D(e){if(L=!1,P(e),!A)if(null!==g(W))A=!0,n(F);else{var r=g(C);null!==r&&t(D,r.startTime-e)}}function F(n,e){A=!1,L&&(L=!1,r()),j=!0;var t=E;try{return M(n,e)}finally{x=null,E=t,j=!1}}function M(n,r){var o=r;for(P(o),x=g(W);null!==x&&(!(x.expirationTime>o)||n&&!e.unstable_shouldYield());){var l=x.callback;if("function"==typeof l){x.callback=null,E=x.priorityLevel;var u=l(x.expirationTime<=o);o=e.unstable_now(),"function"==typeof u?x.callback=u:x===g(W)&&S(W),P(o)}else S(W);x=g(W)}if(null!==x)return!0;var a=g(C);return null!==a&&t(D,a.startTime-o),!1}var N=o;e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(n){n.callback=null},e.unstable_continueExecution=function(){A||j||(A=!0,n(F))},e.unstable_getCurrentPriorityLevel=function(){return E},e.unstable_getFirstCallbackNode=function(){return g(W)},e.unstable_next=function(n){var e;switch(E){case 1:case 2:case 3:e=3;break;default:e=E}var t=E;E=e;try{return n()}finally{E=t}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=N,e.unstable_runWithPriority=function(n,e){switch(n){case 1:case 2:case 3:case 4:case 5:break;default:n=3}var t=E;E=n;try{return e()}finally{E=t}},e.unstable_scheduleCallback=function(o,l,u){var a,i,c=e.unstable_now();if("object"==typeof u&&null!==u){var s=u.delay;a="number"==typeof s&&s>0?c+s:c}else a=c;switch(o){case 1:i=-1;break;case 2:i=250;break;case 5:i=1073741823;break;case 4:i=1e4;break;default:i=5e3}var f=a+i,d={id:I++,callback:l,priorityLevel:o,startTime:a,expirationTime:f,sortIndex:-1};return a>c?(d.sortIndex=a,R(C,d),null===g(W)&&d===g(C)&&(L?r():L=!0,t(D,a-c))):(d.sortIndex=f,R(W,d),A||j||(A=!0,n(F))),d},e.unstable_wrapCallback=function(n){var e=E;return function(){var t=E;E=e;try{return n.apply(this,arguments)}finally{E=t}}}})()},"./node_modules/scheduler/index.js":(n,e,t)=>{n.exports=t("./node_modules/scheduler/cjs/scheduler.development.js")},"./node_modules/scheduler/tracing.js":(n,e,t)=>{n.exports=t("./node_modules/scheduler/cjs/scheduler-tracing.development.js")}}]);
//# sourceMappingURL=npm.scheduler.js.map