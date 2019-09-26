//图片预加载
(function($) {
	function PreLoad(imgs, options) {
		this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
		this.opts = $.extend({}, PreLoad.DEFAULTS, options); //合并对象

		if(this.opts.order === "ordered") { //执行有序加载
			this._ordered()
		} else { //执行无序加载
			this._unordered();
		}
	}
	//默认值
	PreLoad.DEFAULTS = {
		order: 'unordered', //无序预加载
		each: null, //每张图片加载完毕后执行的方法
		all: null //所有图片加载完后执行的方法
	};

	PreLoad.prototype._unordered = function() { //无序加载
		var imgs = this.imgs, //图片数组
			opts = this.opts, //属性
			count = 0,
			len = imgs.length;
		$.each(imgs, function(i, src) {
			if(typeof src != 'string') {
				return;
			}
			var imgObj = new Image();
			$(imgObj).on('load error', function() {
				opts.each && opts.each(count); //存在opts.each函数就执行
				if(count >= len - 1) {
					opts.all && opts.all(); //存在opts.all函数就执行
				}
				count++;
			});
			imgObj.src = src;
		});
	};

	PreLoad.prototype._ordered = function() { //有序加载
		var opts = this.opts,
			imgs = this.imgs,
			len = imgs.length,
			count = 0;

		load();

		function load() {
			var imgObj = new Image();
			$(imgObj).on('load error', function() {
				opts.each && opts.each(count);
				if(count >= len) {
					//所有图片已经加载完毕
					opts.all && opts.all();
				} else {
					load();
				}
				count++;
			});
			imgObj.src = imgs[count];
		}
	}

	$.extend({
		preload: function(imgs, opts) {
			new PreLoad(imgs, opts);
		}
	});
})(jQuery);