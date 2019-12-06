;(function(w,d){
	w.main = {		
		shareUrl: "https://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=" + ~(-new Date() / 36e5),
		setIDAll: function(cls,id){
			var ids = $(cls);
		    for(var i = 0,len = ids.length; i < len; i++){
		        index = i + 1;
		        ids[i].setAttribute("id",id + index);
		    }
		},

		creatScript: function(url){
			var head = d.getElementsByTagName('head')[0];
			var script = d.createElement('script');
			head.appendChild(script);
			script.src = url;
		},

		replaceSrc: function(obj, srcName){
			if (!obj || 'object' != typeof obj) return;
			var imgArr = obj.getElementsByTagName('img');
			for (var i = 0; i < imgArr.length; i++) {
				var oimg = imgArr[i];
				var lazySrc = oimg.getAttribute(srcName);
				if (!lazySrc) break;
				oimg.src = lazySrc;
				oimg.removeAttribute(srcName);
			}
		},

		slideRpSrc: function(target){
			if (!target) { return; }	
			var currentPage = target;
			this.replaceSrc(currentPage, "src1");
		},

		initSlideH: function(obj){
			var _self = this;
			var targetObj = $(obj).find('.slider-con .slider-item'),
				controlObj = $(obj).find('.slider-nav li'),
				prevObj = $(obj).find('.btn-prev'),
				nextObj = $(obj).find('.btn-next');

			return new Slide({
				target: targetObj,
				prevBtn: prevObj,
				nextBtn: nextObj,
				control: controlObj,
				direction: 'x',
				effect: 'slide',		
				autoPlay: false,
				merge: false,
				animateTime: 500,
				onchange: function() {		
					//鍥剧墖鎳掑姞杞�
					_self.slideRpSrc(this.target[this.curPage]);				
				}
			});
		},

		shareModel: function(){
			var _self = this;
			w._bd_share_config = {
		        common: w.COMMON_CONFIG,
		        share: [{
		            "bdSize": 16
		        }],
		        slide: [{
		            bdImg: 7,
		            bdPos: "left",
		            bdTop: 150
		        }]
		    }
		    _self.creatScript(_self.shareUrl);
		},	

		navFixed: function(obj){
			var _self = this;
			$(w).bind('scroll', function() {
				var scrollT = d.body.scrollTop ? d.body.scrollTop : d.documentElement.scrollTop;				
				if (scrollT < 500) {
					$(obj).css('display', 'none');
				} else {
					$(obj).css('display', 'block');
				}
			});
		},

		topTop: function(obj){
            $(obj).bind('click', function() {
                $('html, body').animate({
                    scrollTop: 0
                }, 500);
            });
		}
	}

}(window, document));

(function(){	
	var m = window.main;
	m.setIDAll(".slider", "Jslider_");//鍔ㄦ€佽缃甶d
	m.navFixed("#Jnav");//渚у鑸�
	m.shareModel(); //鍒嗕韩
	m.topTop("#JtoTop");//杩斿洖椤堕儴

	var jsList_ = [		
		{
			id: "Jslider_1",
			js: "main.initSlideH(this);"
		}
	];

	//鎳掑姞杞�
	var jsload = Lazy.create({
		lazyId: "Jlazy",
		trueSrc: '#src',
		jsList: jsList_,
		offset: 100,
		delay: 100,
		delay_tot: 1000
	});
	Lazy.init(jsload);
}())