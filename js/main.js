// Encoding: UTF-8
// Made with heart by kobe-koto in AGPL-3.0 License License
// copyright 2021 kobe-koto

// cookie中存值
function SetCookie(name, value) {
	return !!(
		(value)
			? document.cookie = name + "=" + encodeURI(value)
			: void(0)
	);
}
// cookie中取值
function GetCookie (name) {
	var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	var arr = document.cookie.match(reg)

	return (arr)
		? decodeURI(arr[2])
		: null
}

function show(ElementID) {
	document.getElementById(ElementID).style.display = "unset";
}
function hide(ElementID) {
	document.getElementById(ElementID).style.display = "none";
}


var CopyrightHTML =
		"<h3>友情链接<img style='margin-bottom: -2px;' src='./images>/link.svg' alt='' title='以下列出的的链接全部不受 我们的控制。因此请确认您知晓继续访问的风险。并请记住阅读该网站的隐私政策。'></h3>" +
		"<p>" +
		"<strong><a> | </a></strong>" +
		"<a href='https://afdian.net/@LTCat' rel=' nofollow ugc'>PCL2 赞助网站</a>" +
		"<strong><a> | </a></strong>" +
		"<a href='https://afdian.net/p/0164034c016c11ebafcb52540025c377' rel=' nofollow ugc'>PCL2 正式版下载</a>" +
		"<strong><a> | </a></strong>" +
		"<a href='https://hmcl.huangyuhui.net/' rel=' nofollow ugc'>Hello Minecraft! Launcher 官方网站</a>" +
		"<strong><a> | </a></strong>" +
		"<a href='https://ci.huangyuhui.net/job/HMCL/' rel=' nofollow ugc'>Hello Minecraft! Launcher 发布页</a>" +
		"<strong><a> | </a></strong>" +
		"<a href='https://www.minecraft.net' rel=' nofollow ugc'>Minecraft 官方网站</a" +
			"<strong><a> | </a></strong>" +
		"</p>" +

		"<div style='margin-top: 10px;width: 95%;height: 3px;background: rgba(0,0,0,0.6);display: block;border-radius: 25px;'></div>" +

		"<p>声明：本网站并非Yallage官方网站</p>" +
		"<p>要访问以前的网站，请点击这个<a href='./old/index.html'>链接</a></p>" +
		"<p>如果对网站内容有什么建议，可以联系: <a href='mailto:admin@koto.cc'>admin@koto.cc</a> 或<a href='https://github.com/kobe-koto/Yallage/issues'> 在GitHub提交Issues.</a></p>" +

		"<p>&copy;2022 - <strong>kobe-koto</strong> | AGPL-3.0 License | <a href='https://github.com/kobe-koto/Yallage'>GitHub</a></p>",
	StatementHTML =
		"<h2>" +
			"<img src='./images/warning.svg' style='width: 27px;height: 27px;margin-bottom: -7px;' alt=''>" +
			"<a>请注意</a>" +
			"<img src='./images/warning.svg' style='width: 27px;height: 27px;margin-bottom: -7px;' alt=''>" +
		"</h2>" +

		"<h3>本网站并非Yallage官方网站</h3>" +
		"<h3>且 Yallage 已处于死亡状态, 本站源代码也已经归档.</h3>" +
		"<h3>继续使用即代表您已知晓该网站内容不受Yallage的技术支持,且开源代码的使用受<a href='../LICENSE.html'>AGPL-3.0 License</a>之约束,并愿意自行承担一切后果.</h3>" +
		"<h3>同时,本网站使用Cookie优化您的体验.</h3>" +

		"<button " +
			"class='shakecolor_button' " +
			"style='margin: 50px auto;display: block;' " +
			"id='ReadAndEnter'" +
		"><a>ENTER</a></button>"
;

function checkIP (host,callId) {
	document.getElementById(callId).innerHTML = " Checking";
	var img = new Image();
	var flag = false;
	var isCloseWifi = true;
	var hasFinish = false;
	setTimeout(function(){
		isCloseWifi = false;
	},2);
	img.src = "https://" + host + "/" + new Date().getTime();
	img.onload = img.onerror = function() {
		if ( !hasFinish ) {
			flag = true;
			hasFinish = true;
			console.log("Ping " + host + " success. ");
			document.getElementById(callId).innerHTML = " 連結成功";
		}
	};
	setTimeout(function() {
		if ( !flag ) {
			hasFinish = true;
			flag = false ;
			console.log("Ping " + host + " fail. ");
			document.getElementById(callId).innerHTML = " 連結失敗";
		}
	}, 5000);
}

function GetDeviceType(UA) {
	// 用"navigator.userAgent"來獲得瀏覽器UA & 使用正則表達式查找匹配字段。
	var matchUA = (function () {
			if (UA === "auto") {
				return navigator.userAgent
			} else {
				return UA;
			}
		})()

	return (function () {
		if (matchUA.match(/(rv)/i)) {
			// 我感jio這個是IE。。。
			return "IE";
		} else if (matchUA.match(/(iPhone|Android)/i)) {
			return "Mobile";
		} else if (matchUA.match(/(iPad|Pad|HD)/i)) {
			return "Pad";
		} else if (matchUA.match(/(Mac|Windows)/i)) {
			return "Desktop";
		} else {
			return "Others";
		}
	})()

}

function init () {

	// mobile 適配。
	if (
		window.outerHeight > window.outerWidth ||
		GetDeviceType("auto") === "Mobile" ||
		GetDeviceType("auto") === "Pad"
	) {
		document.getElementById("TypeCSS").href = "./css/Mobile_main.css";
	}

	// Copyright && Statement Init.
	document.getElementsByClassName("copyright")[0].innerHTML = CopyrightHTML;
	document.getElementsByClassName("WarnScreen_words")[0].innerHTML = StatementHTML;

	// 檢查Cookie，以判斷是否顯示WarnScreen。
	if (GetCookie("IsReadWarn") === "ture") {
		try {
			document.getElementById("WarnScreen_bg").remove();
		} catch (e) {
			document.getElementById("WarnScreen_bg").style.display = "none";
		}
	} else {
		document.getElementById("ReadAndEnter").onclick = function () {
			SetCookie("IsReadWarn","ture");
			document.getElementById("WarnScreen_bg").style.transform = "translateY(100vh)";
			setTimeout(function (){
					try {
						document.getElementById("WarnScreen_bg").remove();
					} catch (e) {
						document.getElementById("WarnScreen_bg").style.display = "none";
					}
				},310)
		}
		SetCookie("IsReadWarn","false");

		document.getElementById("WarnScreen_bg").style.display = "unset";

		setTimeout(function (){
			document.getElementById("WarnScreen_bg").style.transform = "translateY(0)";
		},310)
	}

}

