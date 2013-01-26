/*
 * FoxBox 1.0
 * Date: 2011-08-16 10:15:00 +0800
 * Author: Damien (http://foxsp.com)
 */
$(function(){
	$('a.foxbox, input.foxbox').click(function(){
		var t = this.title;
		var u = this.href;
		var g = this.rel || false;
		foxone(t,u,g);
		return false;
	});
});
function foxone(t, u, g, iww, ihh){
	//ie6 = $.browser.msie && ($.browser.version == "6.0");
	if(!iww){
		ol = $("<div></div>").addClass("foxoverlay").css({"opacity":0.5}).appendTo("body");
	}
	win = $("<div></div>").addClass("foxwin").css({
		"width":iww,
		"height":ihh,
		marginLeft:'-'+(iww/2)+'px',
		marginTop:'-'+(ihh/2)+'px'
	}).appendTo("body");

	tit = $("<div><a href='javascript:void()' class='foxclose'></a>"+t+"</div>").addClass("foxtitle").css({"opacity":0.6}).appendTo(win);

	con = $("<div></div>").addClass("foxcontent").appendTo(win);

	$('.foxclose,.foxoverlay').click(function(){
		win.fadeOut("fast",function(){
			win.trigger("unload").remove();
			ol.remove();
		});
	});
	if(u.match(/\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$/ig)){
		var nh = ph = "";
		var fu = false;
		var img = new Image();
		img.onload = function(){
			var ww = $(window).width();
			var wh = $(window).height();
			var w = img.width;
			var h = img.height;
			var ratio = ww/wh;
			var ratio2 = w/h;
			if(ratio >= ratio2){
				h = h < wh - 200 ? h : wh - 200;
				w = h * ratio2;
			}else{
				w = w < ww - 200 ? w : ww - 200;
				h = w / ratio2;
			}
			mw = w;
			mh = h;

			if(g){
				img_arr = $("a[rel="+g+"]");
				for(i = 0; ((i < img_arr.length) && (nh === "")); i++){
					if(img_arr[i].href != u){
						if(fu){
							nt = img_arr[i].title;
							nu = img_arr[i].href;
							nh = $("<a></a>").css({"height":h-29,"right":0}).addClass("foxbtn_r");
						} else {
							pt = img_arr[i].title;
							pu = img_arr[i].href;
							ph = $("<a></a>").css({"height":h-29,"left":0}).addClass("foxbtn_l");
						}
					} else {
						fu = true;
						tit.append("&nbsp;" + (i+1) + "/" + img_arr.length);
					}
				}
			}

			con.append(ph,nh,"<img src='"+u+"' width='"+w+"' height='"+h+"' />");

			$(ph).click(function(){
				win.remove();
				foxone(pt, pu, g, w, h);
			});
			$(nh).click(function(){
				win.remove();
				foxone(nt, nu, g, w, h);
			});
			foxshow();
		}
		img.src = u;
	}else{
		mw = 500;
		mh = 380;
		con.css({"width":mw,"height":mh});
		if(u.match(/^#([a-z0-9A-Z]+)/ig) != null){
			con.append($(u).children());
			win.unload(function(){
				$(u).append(con.children());
			});
			foxshow();
		}else if(u.match(/#iframe/ig) != null){
			con.remove();
			u = u.replace("#iframe","");
			$("<iframe frameborder='0' hspace='0' src='"+u+"'></iframe>").css({"background-color":"white","width":mw,"height":mh}).appendTo(win);
			foxshow();
		}else{
			u = u.replace("#"," #");
			con.load(u,function(){
				foxshow();
			});
		}
	}
}
function foxshow() {
	win.animate({"width":mw,"height":mh,marginLeft:'-'+(mw/2)+'px',marginTop:'-'+(mh/2)+'px'},"fast",function(){
		win.css("background-image","none");
		tit.fadeIn();
		con.fadeIn();
	});
}