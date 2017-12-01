"use strict";function BlueWave(t){this.animationSettings={xSize:t.xSize||48,ySize:t.ySize||48,steps:t.steps||[.1,.1,.3,.5,.5,1],color:t.color||"#305EFF",speedIn:t.speedIn||4,speedOut:t.speedOut||4,canvasTop:t.canvasTop||0,canvasLeft:t.canvasLeft||0,autoCalculateSquaresSize:t.autoCalculateSquaresSize||!0},this.size={scaleRatio:window.devicePixelRatio||1,w:0,h:0},this.calculatedSettings={currentDistance:0,lastDraw:0,blockRerun:!1},this.addCanvas(),this.eventListeners(),this.resize(),this.calculateSquaresSize(),this.calculateSettings();var e=this}BlueWave.prototype.addCanvas=function(){var t=document.createElement("canvas");t.id="blueWave",t.style.zIndex="99999",t.style.pointerEvents="none",t.style.display="block",t.style.position="fixed",t.style.top=this.animationSettings.canvasTop+"px",t.style.left=this.animationSettings.canvasLeft+"px",document.body.appendChild(t),this.canvas=t,this.ctx=this.canvas.getContext("2d")},BlueWave.prototype.calculateSettings=function(){this.calculatedSettings.coloumns=Math.ceil(this.size.w/this.animationSettings.xSize),this.calculatedSettings.rows=Math.ceil(this.size.h/this.animationSettings.ySize);var t=this.calculatedSettings.rows;this.calculatedSettings.rowArray=Array.apply(null,{length:t}).map(Number.call,Number)},BlueWave.prototype.start=function(t){if(!this.calculateSettings.blockRerun){this.calculateSettings.blockRerun=!0,this.calculatedSettings.currentDistance=0,this.calculatedSettings.lastDraw=0;var e=this.calculatedSettings.coloumns+this.animationSettings.steps.length;e=e.toString();var i=this;this.animation=TweenLite.to(this.calculatedSettings,this.animationSettings.speedIn,{currentDistance:"+="+e,onUpdate:this.updateHandlerRunIn,onUpdateParams:[i,!0],onComplete:this.completeHandlerStart,onCompleteParams:[i,t],ease:Power0.easeNone})}},BlueWave.prototype.end=function(){this.calculatedSettings.currentDistance=0,this.calculatedSettings.lastDraw=0;var t=this.calculatedSettings.coloumns+this.animationSettings.steps.length;t=t.toString();var e=this;this.animation=TweenLite.to(this.calculatedSettings,this.animationSettings.speedOut,{currentDistance:"+="+t,onUpdate:this.updateHandlerRunIn,onUpdateParams:[e,!1],onComplete:this.completeHandlerEnd,onCompleteParams:[e],ease:Power0.easeNone})},BlueWave.prototype.updateHandlerRunIn=function(t,e){var i=Math.round(t.calculatedSettings.currentDistance);i>t.calculatedSettings.lastDraw&&(t.calculatedSettings.lastDraw=i,t.spawnPixels(i,e))},BlueWave.prototype.completeHandlerStart=function(t,e){t.end(),e&&e()},BlueWave.prototype.completeHandlerEnd=function(t){t.calculateSettings.blockRerun=!1},BlueWave.prototype.spawnPixels=function(t,e){this.ctx.fillStyle=this.animationSettings.color;for(var i=0;i<this.animationSettings.steps.length;i++){this.calculatedSettings.rowArray=this.shuffleArray(this.calculatedSettings.rowArray);for(var a=Math.ceil(this.animationSettings.steps[i]*this.calculatedSettings.rows),s=this.calculatedSettings.rowArray.slice(0,a),n=0;n<s.length;n++){var o=(t-i)*this.animationSettings.xSize,l=s[n]*this.animationSettings.ySize;e?this.ctx.fillRect(o,l,this.animationSettings.xSize,this.animationSettings.ySize):this.ctx.clearRect(o,l,this.animationSettings.xSize,this.animationSettings.ySize)}}var c=(t-(this.animationSettings.steps.length-1))*this.animationSettings.xSize;e?this.ctx.fillRect(0,0,c,this.size.h):this.ctx.clearRect(0,0,c,this.size.h)},BlueWave.prototype.setBlueWavePosition=function(t,e){this.animationSettings.canvasTop=e,this.animationSettings.canvasLeft=t,this.canvas.style.top=this.animationSettings.canvasTop+"px",this.canvas.style.left=this.animationSettings.canvasLeft+"px"},BlueWave.prototype.calculateSquaresSize=function(){this.animationSettings.autoCalculateSquaresSize&&(this.size.w>=1600?(this.animationSettings.xSize=48,this.animationSettings.ySize=48):this.size.w>=1200?(this.animationSettings.xSize=42,this.animationSettings.ySize=42):this.size.w>=960?(this.animationSettings.xSize=36,this.animationSettings.ySize=36):(this.animationSettings.xSize=30,this.animationSettings.ySize=30))},BlueWave.prototype.eventListeners=function(){this.resize=this.resize.bind(this),window.addEventListener("resize",this.resize)},BlueWave.prototype.resize=function(){this.size.w=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth,this.size.h=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight,this.canvas.width=this.size.w*this.size.scaleRatio,this.canvas.height=this.size.h*this.size.scaleRatio,this.canvas.style.width=this.size.w+"px",this.canvas.style.height=this.size.h+"px",this.ctx.scale(this.size.scaleRatio,this.size.scaleRatio),console.log(this.animation),this.calculateSettings.blockRerun&&(this.animation.pause(),this.ctx.fillStyle=this.animationSettings.color,this.ctx.fillRect(randomX,randomY,this.animationSettings.xSize,this.animationSettings.ySize))},BlueWave.prototype.shuffleArray=function(t){for(var e=t.length,i,a;0!==e;)a=Math.floor(Math.random()*e),e-=1,i=t[e],t[e]=t[a],t[a]=i;return t};