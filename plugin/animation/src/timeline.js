'use strict';

var DEFAULT_INTERVAL = 1000 / 60; //默认时间间隔

var STATE_INITIAL = 0; //初始化状态
var STATE_START = 1; //开始状态
var STATE_STOP = 2; //停止状态

/**
 * raf
 */
var requestAnimationFrame = (function(){
    return window.requestAnimationFrame() ||
        window.webkitRequestAnimationFrame() ||
        window.mozRequestAnimationFrame() ||
        window.oRequestAnimationFrame() ||
        function (callback){
            return window.setTimeout(callback,callback.interval || DEFAULT_INTERVAL);
        }
})();

/**
 *
 */
var cancelAnimationFrame = (function(){
    return window.cancelAnimationFrame() ||
        window.webkitCancelAnimationFrame() ||
        window.mozCancelAnimationFrame() ||
        window.oCancelAnimationFrame() ||
        function (id){
            return window.clearTimeout(id);
        }
})();

/**
 * Timeline 时间轴类
 * @constructor
 */
function Timeline(){

}

/**
 * 时间轴每一次回调执行的函数
 * @param time 从动画开始到当前执行的时间
 */
Timeline.prototype.onenterframe = function(time){

};
/**
 * 动画开始
 * @param interval 每一次回调的间隔时间
 */
Timeline.prototype.start = function(interval){

}
/**
 * 动画停止
 */
Timeline.prototype.stop =function(){

}
/**
 * 重新开始动画
 */
Timeline.prototype.restart = function(){

}

















