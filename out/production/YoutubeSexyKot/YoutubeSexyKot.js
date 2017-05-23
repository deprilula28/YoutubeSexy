if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'YoutubeSexyKot'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'YoutubeSexyKot'.");
}
var YoutubeSexyKot = function (_, Kotlin) {
  'use strict';
  var to = Kotlin.kotlin.to_ujzrz7$;
  var json = Kotlin.kotlin.js.json_pyyo18$;
  var split = Kotlin.kotlin.text.split_o64adg$;
  var indexOf = Kotlin.kotlin.text.indexOf_l5u8uk$;
  HTMLBodyElementAppendable.prototype = Object.create(HTMLBodyAppendable.prototype);
  HTMLBodyElementAppendable.prototype.constructor = HTMLBodyElementAppendable;
  ULBodyElementAppendable.prototype = Object.create(HTMLBodyAppendable.prototype);
  ULBodyElementAppendable.prototype.constructor = ULBodyElementAppendable;
  function CookieManager() {
    if (this.getCookie_61zpoe$('annoyingGithubInviteClosed') != null || !Kotlin.equals(this.getCookie_61zpoe$('annoyingGithubInviteClosed'), 'true')) {
      setTimeout(CookieManager_init$lambda(this), 120000);
      console.log('Displaying annoying github invite in 1 minute!');
    }
     else {
      this.setCookie_puj7f4$('annoyingGithubInviteClosed', 'true');
      $('.annoyingGithubInvite').remove();
    }
  }
  function CookieManager$hideAnnoyingGithubInvite$lambda() {
    $('.annoyingGithubInvite').remove();
  }
  function CookieManager$hideAnnoyingGithubInvite$lambda_0() {
    $('.content').removeClass('blurOutFrames');
  }
  CookieManager.prototype.hideAnnoyingGithubInvite = function () {
    $('.content').removeClass('blurInFrames').addClass('blurOutFrames');
    $('.annoyingGithubInvite').css(json([to('display', ''), to('opacity', 1)])).animate(json([to('opacity', 1)]), 100, 'linear', CookieManager$hideAnnoyingGithubInvite$lambda).remove();
    setTimeout(CookieManager$hideAnnoyingGithubInvite$lambda_0, 500);
  };
  CookieManager.prototype.setCookie_puj7f4$ = function (name, value) {
    document.cookie = name + '=' + value + ';path=/';
  };
  CookieManager.prototype.getCookie_61zpoe$ = function (name) {
    var finalName = name + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = split(decodedCookie, [59]);
    var tmp$;
    tmp$ = ca.iterator();
    while (tmp$.hasNext()) {
      var element = tmp$.next();
      var c = element;
      while (Kotlin.unboxChar(c.charCodeAt(0)) === 32) {
        c = c.substring(1);
      }
      if (indexOf(c, finalName) === 0) {
        var $receiver = c;
        var startIndex = finalName.length;
        var endIndex = c.length;
        return $receiver.substring(startIndex, endIndex);
      }
    }
    return null;
  };
  function CookieManager_init$lambda(this$CookieManager) {
    return function () {
      $('.content').addClass('blurInFrames');
      $('.annoyingGithubInvite').css(json([to('display', ''), to('opacity', 0)])).animate(json([to('opacity', 1)]));
      this$CookieManager.setCookie_puj7f4$('annoyingGithubInviteClosed', 'true');
      console.log('Annoying github invite displayed.');
    };
  }
  CookieManager.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'CookieManager',
    interfaces: []
  };
  function GL() {
    var tmp$, tmp$_0;
    this.canvas = Kotlin.isType(tmp$ = document.getElementById('thumbnailBackgroundOverlayCanvasObj'), HTMLCanvasElement) ? tmp$ : Kotlin.throwCCE();
    this.blur = null;
    this.glContext = null;
    this.glContext = (tmp$_0 = this.canvas.getContext('webgl')) != null ? tmp$_0 : this.canvas.getContext('experimental-webgl');
    if (this.glContext == null) {
      this.blur = new StackBlur();
    }
     else {
      this.blur = new WebGLBlur();
    }
  }
  GL.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'GL',
    interfaces: []
  };
  function StackBlur() {
  }
  StackBlur.prototype.blur_a6pk20$ = function (image, gl) {
    var tmp$;
    image.id = 'thumbnailBackgroundOverlayCanvasImgSrc';
    stackBlurImage('thumbnailBackgroundOverlayCanvasImgSrc', gl.canvas.id, 20, 255);
    var ctx = Kotlin.isType(tmp$ = gl.canvas.getContext('2d'), CanvasRenderingContext2D) ? tmp$ : Kotlin.throwCCE();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    var window_0 = $(window);
    ctx.fillRect(0.0, 0.0, Kotlin.numberToDouble(window_0.height()) * 3, Kotlin.numberToDouble(window_0.width()) * 3);
  };
  StackBlur.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'StackBlur',
    interfaces: [BlurMethod]
  };
  function WebGLBlur() {
  }
  WebGLBlur.prototype.blur_a6pk20$ = function (image, gl) {
  };
  WebGLBlur.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'WebGLBlur',
    interfaces: [BlurMethod]
  };
  function BlurMethod() {
  }
  BlurMethod.$metadata$ = {
    kind: Kotlin.Kind.INTERFACE,
    simpleName: 'BlurMethod',
    interfaces: []
  };
  function HTMLBodyAppendable() {
  }
  HTMLBodyAppendable.prototype.div_mug8yy$ = function (appendFunc) {
    var tmp$;
    var htmlElement = Kotlin.isType(tmp$ = document.createElement('div'), HTMLElement) ? tmp$ : Kotlin.throwCCE();
    appendFunc(new HTMLBodyElementAppendable(htmlElement));
  };
  HTMLBodyAppendable.prototype.a_mug8yy$ = function (appendFunc) {
    var tmp$;
    var htmlElement = Kotlin.isType(tmp$ = document.createElement('a'), HTMLElement) ? tmp$ : Kotlin.throwCCE();
    appendFunc(new HTMLBodyElementAppendable(htmlElement));
  };
  HTMLBodyAppendable.prototype.ul_mug8yy$ = function (appendFunc) {
    var tmp$;
    var htmlElement = Kotlin.isType(tmp$ = document.createElement('ul'), HTMLElement) ? tmp$ : Kotlin.throwCCE();
    appendFunc(new ULBodyElementAppendable(htmlElement));
  };
  HTMLBodyAppendable.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'HTMLBodyAppendable',
    interfaces: []
  };
  function HTMLBodyElementAppendable(sourceElement) {
    HTMLBodyAppendable.call(this);
    this.sourceElement = sourceElement;
  }
  HTMLBodyElementAppendable.prototype.appendElement_lt8gi4$ = function (element) {
    this.sourceElement.appendChild(element);
  };
  HTMLBodyElementAppendable.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'HTMLBodyElementAppendable',
    interfaces: [HTMLBodyAppendable]
  };
  function ULBodyElementAppendable(sourceElement) {
    HTMLBodyAppendable.call(this);
    this.sourceElement = sourceElement;
  }
  ULBodyElementAppendable.prototype.appendElement_lt8gi4$ = function (element) {
    this.sourceElement.appendChild(element);
  };
  ULBodyElementAppendable.prototype.li_mug8yy$ = function (appendFunc) {
    var tmp$;
    var htmlElement = Kotlin.isType(tmp$ = document.createElement('li'), HTMLElement) ? tmp$ : Kotlin.throwCCE();
    appendFunc(new HTMLBodyElementAppendable(htmlElement));
  };
  ULBodyElementAppendable.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'ULBodyElementAppendable',
    interfaces: [HTMLBodyAppendable]
  };
  function OptionManager() {
  }
  OptionManager.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'OptionManager',
    interfaces: []
  };
  function UIManager() {
  }
  UIManager.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'UIManager',
    interfaces: []
  };
  function YoutubeSexy() {
    this.ui = new UIManager();
    this.cookies = new CookieManager();
    this.options = new OptionManager();
    this.ytDataAPI = new YTDataAPI();
    this.gl = new GL();
    this.playing = false;
    this.playlist = false;
    this.ytDataAPI.startAPILibrary_e4ivef$(this.cookies);
  }
  YoutubeSexy.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'YoutubeSexy',
    interfaces: []
  };
  function YTDataAPI() {
    this.authenticated = false;
    this.accessToken = this.accessToken;
  }
  YTDataAPI.prototype.startAPILibrary_e4ivef$ = function (cookieManager) {
  };
  YTDataAPI.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'YTDataAPI',
    interfaces: []
  };
  _.CookieManager = CookieManager;
  _.GL = GL;
  _.StackBlur = StackBlur;
  _.WebGLBlur = WebGLBlur;
  _.BlurMethod = BlurMethod;
  _.HTMLBodyAppendable = HTMLBodyAppendable;
  _.HTMLBodyElementAppendable = HTMLBodyElementAppendable;
  _.ULBodyElementAppendable = ULBodyElementAppendable;
  _.OptionManager = OptionManager;
  _.UIManager = UIManager;
  _.YoutubeSexy = YoutubeSexy;
  _.YTDataAPI = YTDataAPI;
  Kotlin.defineModule('YoutubeSexyKot', _);
  return _;
}(typeof YoutubeSexyKot === 'undefined' ? {} : YoutubeSexyKot, kotlin);
