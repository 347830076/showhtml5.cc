/**
* DD_roundies, this adds rounded-corner CSS in standard browsers and VML sublayers in IE that accomplish a similar appearance when comparing said browsers.
* Author: Drew Diller
* Email: drew.diller@gmail.com
* URL: http://www.dillerdesign.com/experiment/DD_roundies/
* Version: 0.0.2a -  preview 2008.12.26
* Licensed under the MIT License: http://dillerdesign.com/experiment/DD_roundies/#license
*
* Usage:
* DD_roundies.addRule('#doc .container', '10px 5px'); // selector and multiple radii
* DD_roundies.addRule('.box', 5, true); // selector, radius, and optional addition of border-radius code for standard browsers.
* 
* Just want the PNG fixing effect for IE6, and don't want to also use the DD_belatedPNG library?  Don't give any additional arguments after the CSS selector.
* DD_roundies.addRule('.your .example img');
**/

var DD_roundies = {
	ns: 'DD_roundies',
	IE6: false,
	IE7: false,
	IE8: false,
	IEversion: function() {
		if (document.documentMode != 8 && document.namespaces && !document.namespaces[this.ns]) {
			this.IE6 = true;
			this.IE7 = true
		} else if (document.documentMode == 8) {
			this.IE8 = true
		}
	},
	querySelector: document.querySelectorAll,
	selectorsToProcess: [],
	imgSize: {},
	createVmlNameSpace: function() {
		if (this.IE6 || this.IE7) {
			document.namespaces.add(this.ns, 'urn:schemas-microsoft-com:vml')
		}
		if (this.IE8) {
			document.writeln('<?import namespace="' + this.ns + '" implementation="#default#VML" ?>')
		}
	},
	createVmlStyleSheet: function() {
		var a = document.createElement('style');
		document.documentElement.firstChild.insertBefore(a, document.documentElement.firstChild.firstChild);
		if (a.styleSheet) {
			try {
				var b = a.styleSheet;
				b.addRule(this.ns + '\\:*', '{behavior:url(#default#VML)}');
				this.styleSheet = b
			} catch (err) {}
		} else {
			this.styleSheet = a
		}
	},
	addRule: function(a, b, c) {
		if (typeof b == 'undefined' || b === null) {
			b = 0
		}
		if (b.constructor.toString().search('Array') == -1) {
			b = b.toString().replace(/[^0-9 ]/g, '').split(' ')
		}
		for (var i = 0; i < 4; i++) {
			b[i] = (!b[i] && b[i] !== 0) ? b[Math.max((i - 2), 0)] : b[i]
		}
		if (this.styleSheet) {
			if (this.styleSheet.addRule) {
				var d = a.split(',');
				for (var i = 0; i < d.length; i++) {
					this.styleSheet.addRule(d[i], 'behavior:expression(DD_roundies.roundify.call(this, [' + b.join(',') + ']))')
				}
			} else if (c) {
				var e = b.join('px ') + 'px';
				this.styleSheet.appendChild(document.createTextNode(a + ' {border-radius:' + e + '; -moz-border-radius:' + e + ';}'));
				this.styleSheet.appendChild(document.createTextNode(a + ' {-webkit-border-top-left-radius:' + b[0] + 'px ' + b[0] + 'px; -webkit-border-top-right-radius:' + b[1] + 'px ' + b[1] + 'px; -webkit-border-bottom-right-radius:' + b[2] + 'px ' + b[2] + 'px; -webkit-border-bottom-left-radius:' + b[3] + 'px ' + b[3] + 'px;}'))
			}
		} else if (this.IE8) {
			this.selectorsToProcess.push({
				'selector': a,
				'radii': b
			})
		}
	},
	readPropertyChanges: function(a) {
		switch (event.propertyName) {
		case 'style.border':
		case 'style.borderWidth':
		case 'style.padding':
			this.applyVML(a);
			break;
		case 'style.borderColor':
			this.vmlStrokeColor(a);
			break;
		case 'style.backgroundColor':
		case 'style.backgroundPosition':
		case 'style.backgroundRepeat':
			this.applyVML(a);
			break;
		case 'style.display':
			a.vmlBox.style.display = (a.style.display == 'none') ? 'none' : 'block';
			break;
		case 'style.filter':
			this.vmlOpacity(a);
			break;
		case 'style.zIndex':
			a.vmlBox.style.zIndex = a.style.zIndex;
			break
		}
	},
	applyVML: function(a) {
		a.runtimeStyle.cssText = '';
		this.vmlFill(a);
		this.vmlStrokeColor(a);
		this.vmlStrokeWeight(a);
		this.vmlOffsets(a);
		this.vmlPath(a);
		this.nixBorder(a);
		this.vmlOpacity(a)
	},
	vmlOpacity: function(a) {
		if (a.currentStyle.filter.search('lpha') != -1) {
			var b = a.currentStyle.filter;
			b = parseInt(b.substring(b.lastIndexOf('=') + 1, b.lastIndexOf(')')), 10) / 100;
			for (var v in a.vml) {
				a.vml[v].filler.opacity = b
			}
		}
	},
	vmlFill: function(a) {
		if (!a.currentStyle) {
			return
		} else {
			var b = a.currentStyle
		}
		a.runtimeStyle.backgroundColor = '';
		a.runtimeStyle.backgroundImage = '';
		var c = (b.backgroundColor == 'transparent');
		var d = true;
		if (b.backgroundImage != 'none' || a.isImg) {
			if (!a.isImg) {
				a.vmlBg = b.backgroundImage;
				a.vmlBg = a.vmlBg.substr(5, a.vmlBg.lastIndexOf('")') - 5)
			} else {
				a.vmlBg = a.src
			}
			var e = this;
			if (!e.imgSize[a.vmlBg]) {
				var f = document.createElement('img');
				f.attachEvent('onload', function() {
					this.width = this.offsetWidth;
					this.height = this.offsetHeight;
					e.vmlOffsets(a)
				});
				f.className = e.ns + '_sizeFinder';
				f.runtimeStyle.cssText = 'behavior:none; position:absolute; top:-10000px; left:-10000px; border:none;';
				f.src = a.vmlBg;
				f.removeAttribute('width');
				f.removeAttribute('height');
				document.body.insertBefore(f, document.body.firstChild);
				e.imgSize[a.vmlBg] = f
			}
			a.vml.image.filler.src = a.vmlBg;
			d = false
		}
		a.vml.image.filled = !d;
		a.vml.image.fillcolor = 'none';
		a.vml.color.filled = !c;
		a.vml.color.fillcolor = b.backgroundColor;
		a.runtimeStyle.backgroundImage = 'none';
		a.runtimeStyle.backgroundColor = 'transparent'
	},
	vmlStrokeColor: function(a) {
		a.vml.stroke.fillcolor = a.currentStyle.borderColor
	},
	vmlStrokeWeight: function(a) {
		var c = ['Top', 'Right', 'Bottom', 'Left'];
		a.bW = {};
		for (var b = 0; b < 4; b++) {
			a.bW[c[b]] = parseInt(a.currentStyle['border' + c[b] + 'Width'], 10) || 0
		}
	},
	vmlOffsets: function(c) {
		var e = ['Left', 'Top', 'Width', 'Height'];
		for (var d = 0; d < 4; d++) {
			c.dim[e[d]] = c['offset' + e[d]]
		}
		var f = function(a, b) {
				a.style.left = (b ? 0 : c.dim.Left) + 'px';
				a.style.top = (b ? 0 : c.dim.Top) + 'px';
				a.style.width = c.dim.Width + 'px';
				a.style.height = c.dim.Height + 'px'
			};
		for (var v in c.vml) {
			var g = (v == 'image') ? 1 : 2;
			c.vml[v].coordsize = (c.dim.Width * g) + ', ' + (c.dim.Height * g);
			f(c.vml[v], true)
		}
		f(c.vmlBox, false);
		if (DD_roundies.IE8) {
			c.vml.stroke.style.margin = '-1px';
			if (typeof c.bW == 'undefined') {
				this.vmlStrokeWeight(c)
			}
			c.vml.color.style.margin = (c.bW.Top - 1) + 'px ' + (c.bW.Left - 1) + 'px'
		}
	},
	vmlPath: function(j) {
		var k = function(a, w, h, r, b, c, d) {
				var e = a ? ['m', 'qy', 'l', 'qx', 'l', 'qy', 'l', 'qx', 'l'] : ['qx', 'l', 'qy', 'l', 'qx', 'l', 'qy', 'l', 'm'];
				b *= d;
				c *= d;
				w *= d;
				h *= d;
				var R = r.slice();
				for (var i = 0; i < 4; i++) {
					R[i] *= d;
					R[i] = Math.min(w / 2, h / 2, R[i])
				}
				var f = [e[0] + Math.floor(0 + b) + ',' + Math.floor(R[0] + c), e[1] + Math.floor(R[0] + b) + ',' + Math.floor(0 + c), e[2] + Math.ceil(w - R[1] + b) + ',' + Math.floor(0 + c), e[3] + Math.ceil(w + b) + ',' + Math.floor(R[1] + c), e[4] + Math.ceil(w + b) + ',' + Math.ceil(h - R[2] + c), e[5] + Math.ceil(w - R[2] + b) + ',' + Math.ceil(h + c), e[6] + Math.floor(R[3] + b) + ',' + Math.ceil(h + c), e[7] + Math.floor(0 + b) + ',' + Math.ceil(h - R[3] + c), e[8] + Math.floor(0 + b) + ',' + Math.floor(R[0] + c)];
				if (!a) {
					f.reverse()
				}
				var g = f.join('');
				return g
			};
		if (typeof j.bW == 'undefined') {
			this.vmlStrokeWeight(j)
		}
		var l = j.bW;
		var m = j.DD_radii.slice();
		var n = k(true, j.dim.Width, j.dim.Height, m, 0, 0, 2);
		m[0] -= Math.max(l.Left, l.Top);
		m[1] -= Math.max(l.Top, l.Right);
		m[2] -= Math.max(l.Right, l.Bottom);
		m[3] -= Math.max(l.Bottom, l.Left);
		for (var i = 0; i < 4; i++) {
			m[i] = Math.max(m[i], 0)
		}
		var o = k(false, j.dim.Width - l.Left - l.Right, j.dim.Height - l.Top - l.Bottom, m, l.Left, l.Top, 2);
		var p = k(true, j.dim.Width - l.Left - l.Right + 1, j.dim.Height - l.Top - l.Bottom + 1, m, l.Left, l.Top, 1);
		j.vml.color.path = o;
		j.vml.image.path = p;
		j.vml.stroke.path = n + o;
		this.clipImage(j)
	},
	nixBorder: function(a) {
		var s = a.currentStyle;
		var b = ['Top', 'Left', 'Right', 'Bottom'];
		for (var i = 0; i < 4; i++) {
			a.runtimeStyle['padding' + b[i]] = (parseInt(s['padding' + b[i]], 10) || 0) + (parseInt(s['border' + b[i] + 'Width'], 10) || 0) + 'px'
		}
		a.runtimeStyle.border = 'none'
	},
	clipImage: function(e) {
		var f = DD_roundies;
		if (!e.vmlBg || !f.imgSize[e.vmlBg]) {
			return
		}
		var g = e.currentStyle;
		var h = {
			'X': 0,
			'Y': 0
		};
		var i = function(a, b) {
				var c = true;
				switch (b) {
				case 'left':
				case 'top':
					h[a] = 0;
					break;
				case 'center':
					h[a] = 0.5;
					break;
				case 'right':
				case 'bottom':
					h[a] = 1;
					break;
				default:
					if (b.search('%') != -1) {
						h[a] = parseInt(b, 10) * 0.01
					} else {
						c = false
					}
				}
				var d = (a == 'X');
				h[a] = Math.ceil(c ? ((e.dim[d ? 'Width' : 'Height'] - (e.bW[d ? 'Left' : 'Top'] + e.bW[d ? 'Right' : 'Bottom'])) * h[a]) - (f.imgSize[e.vmlBg][d ? 'width' : 'height'] * h[a]) : parseInt(b, 10));
				h[a] += 1
			};
		for (var b in h) {
			i(b, g['backgroundPosition' + b])
		}
		e.vml.image.filler.position = (h.X / (e.dim.Width - e.bW.Left - e.bW.Right + 1)) + ',' + (h.Y / (e.dim.Height - e.bW.Top - e.bW.Bottom + 1));
		var j = g.backgroundRepeat;
		var c = {
			'T': 1,
			'R': e.dim.Width + 1,
			'B': e.dim.Height + 1,
			'L': 1
		};
		var k = {
			'X': {
				'b1': 'L',
				'b2': 'R',
				'd': 'Width'
			},
			'Y': {
				'b1': 'T',
				'b2': 'B',
				'd': 'Height'
			}
		};
		if (j != 'repeat') {
			c = {
				'T': (h.Y),
				'R': (h.X + f.imgSize[e.vmlBg].width),
				'B': (h.Y + f.imgSize[e.vmlBg].height),
				'L': (h.X)
			};
			if (j.search('repeat-') != -1) {
				var v = j.split('repeat-')[1].toUpperCase();
				c[k[v].b1] = 1;
				c[k[v].b2] = e.dim[k[v].d] + 1
			}
			if (c.B > e.dim.Height) {
				c.B = e.dim.Height + 1
			}
		}
		e.vml.image.style.clip = 'rect(' + c.T + 'px ' + c.R + 'px ' + c.B + 'px ' + c.L + 'px)'
	},
	pseudoClass: function(a) {
		var b = this;
		setTimeout(function() {
			b.applyVML(a)
		}, 1)
	},
	reposition: function(a) {
		this.vmlOffsets(a);
		this.vmlPath(a)
	},
	roundify: function(b) {
		this.style.behavior = 'none';
		if (!this.currentStyle) {
			return
		} else {
			var c = this.currentStyle
		}
		var d = {
			BODY: false,
			TABLE: false,
			TR: false,
			TD: false,
			SELECT: false,
			OPTION: false,
			TEXTAREA: false
		};
		if (d[this.nodeName] === false) {
			return
		}
		var e = this;
		var f = DD_roundies;
		this.DD_radii = b;
		this.dim = {};
		var g = {
			resize: 'reposition',
			move: 'reposition'
		};
		if (this.nodeName == 'A') {
			var i = {
				mouseleave: 'pseudoClass',
				mouseenter: 'pseudoClass',
				focus: 'pseudoClass',
				blur: 'pseudoClass'
			};
			for (var a in i) {
				g[a] = i[a]
			}
		}
		for (var h in g) {
			this.attachEvent('on' + h, function() {
				f[g[h]](e)
			})
		}
		this.attachEvent('onpropertychange', function() {
			f.readPropertyChanges(e)
		});
		var j = function(a) {
				a.style.zoom = 1;
				if (a.currentStyle.position == 'static') {
					a.style.position = 'relative'
				}
			};
		j(this.offsetParent);
		j(this);
		this.vmlBox = document.createElement('ignore');
		this.vmlBox.runtimeStyle.cssText = 'behavior:none; position:absolute; margin:0; padding:0; border:0; background:none;';
		this.vmlBox.style.zIndex = c.zIndex;
		this.vml = {
			'color': true,
			'image': true,
			'stroke': true
		};
		for (var v in this.vml) {
			this.vml[v] = document.createElement(f.ns + ':shape');
			this.vml[v].filler = document.createElement(f.ns + ':fill');
			this.vml[v].appendChild(this.vml[v].filler);
			this.vml[v].stroked = false;
			this.vml[v].style.position = 'absolute';
			this.vml[v].style.zIndex = c.zIndex;
			this.vml[v].coordorigin = '1,1';
			this.vmlBox.appendChild(this.vml[v])
		}
		this.vml.image.fillcolor = 'none';
		this.vml.image.filler.type = 'tile';
		this.parentNode.insertBefore(this.vmlBox, this);
		this.isImg = false;
		if (this.nodeName == 'IMG') {
			this.isImg = true;
			this.style.visibility = 'hidden'
		}
		setTimeout(function() {
			f.applyVML(e)
		}, 1)
	}
};
try {
	document.execCommand("BackgroundImageCache", false, true)
} catch (err) {}
DD_roundies.IEversion();
DD_roundies.createVmlNameSpace();
DD_roundies.createVmlStyleSheet();
if (DD_roundies.IE8 && document.attachEvent && DD_roundies.querySelector) {
	document.attachEvent('onreadystatechange', function() {
		if (document.readyState == 'complete') {
			var d = DD_roundies.selectorsToProcess;
			var e = d.length;
			var f = function(a, b, c) {
					setTimeout(function() {
						DD_roundies.roundify.call(a, b)
					}, c * 100)
				};
			for (var i = 0; i < e; i++) {
				var g = document.querySelectorAll(d[i].selector);
				var h = g.length;
				for (var r = 0; r < h; r++) {
					if (g[r].nodeName != 'INPUT') {
						f(g[r], d[i].radii, r)
					}
				}
			}
		}
	})
}