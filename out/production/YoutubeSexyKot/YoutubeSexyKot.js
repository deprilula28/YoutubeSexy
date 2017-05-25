if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'YoutubeSexyKot'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'YoutubeSexyKot'.");
}
var YoutubeSexyKot = function (_, Kotlin) {
  'use strict';
  var to = Kotlin.kotlin.to_ujzrz7$;
  var json = Kotlin.kotlin.js.json_pyyo18$;
  var split = Kotlin.kotlin.text.split_o64adg$;
  var indexOf = Kotlin.kotlin.text.indexOf_l5u8uk$;
  var Regex = Kotlin.kotlin.text.Regex_61zpoe$;
  var addClass = Kotlin.kotlin.dom.addClass_hhb33f$;
  var StringBuilder = Kotlin.kotlin.text.StringBuilder;
  JQueryAppendable.prototype = Object.create(HTMLBodyAppendable.prototype);
  JQueryAppendable.prototype.constructor = JQueryAppendable;
  HTMLBodyElementAppendable.prototype = Object.create(JQueryAppendable.prototype);
  HTMLBodyElementAppendable.prototype.constructor = HTMLBodyElementAppendable;
  ULBodyElementAppendable.prototype = Object.create(HTMLBodyElementAppendable.prototype);
  ULBodyElementAppendable.prototype.constructor = ULBodyElementAppendable;
  function plusAssign($receiver, str) {
    $receiver.append_gw00v9$(str);
  }
  function forEach($receiver, f) {
    forEach($receiver, f);
  }
  function appendBuilder($receiver, appendFunction) {
    appendFunction(new JQueryAppendable($receiver));
  }
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
  HTMLBodyAppendable.prototype.load_gbr1zf$ = function (handleFunc) {
    this.bind_8s0k5j$('load', handleFunc);
  };
  HTMLBodyAppendable.prototype.click_gbr1zf$ = function (handleFunc) {
    this.bind_8s0k5j$('click', handleFunc);
  };
  HTMLBodyAppendable.prototype.text_61zpoe$ = function (str) {
    this.textInternal_61zpoe$(str);
  };
  HTMLBodyAppendable.prototype.i_wxxdja$ = function (classes, css, appendFunc) {
    if (classes === void 0)
      classes = [];
    if (css === void 0)
      css = json([]);
    var tmp$;
    var htmlElement = Kotlin.isType(tmp$ = document.createElement('div'), HTMLElement) ? tmp$ : Kotlin.throwCCE();
    var appendable = new HTMLBodyElementAppendable(htmlElement);
    var $receiver = classes;
    var tmp$_0;
    for (tmp$_0 = 0; tmp$_0 !== $receiver.length; ++tmp$_0) {
      var element = $receiver[tmp$_0];
      appendable.addClass_61zpoe$(element);
    }
    appendable.css_qk3xy8$(css);
    appendFunc(appendable);
    return appendable;
  };
  HTMLBodyAppendable.prototype.img_wxxdja$ = function (classes, css, appendFunc) {
    if (classes === void 0)
      classes = [];
    if (css === void 0)
      css = json([]);
    var tmp$;
    var htmlElement = Kotlin.isType(tmp$ = document.createElement('div'), HTMLElement) ? tmp$ : Kotlin.throwCCE();
    var appendable = new HTMLBodyElementAppendable(htmlElement);
    var $receiver = classes;
    var tmp$_0;
    for (tmp$_0 = 0; tmp$_0 !== $receiver.length; ++tmp$_0) {
      var element = $receiver[tmp$_0];
      appendable.addClass_61zpoe$(element);
    }
    appendable.css_qk3xy8$(css);
    appendFunc(appendable);
    return appendable;
  };
  HTMLBodyAppendable.prototype.span_wxxdja$ = function (classes, css, appendFunc) {
    if (classes === void 0)
      classes = [];
    if (css === void 0)
      css = json([]);
    var tmp$;
    var htmlElement = Kotlin.isType(tmp$ = document.createElement('div'), HTMLElement) ? tmp$ : Kotlin.throwCCE();
    var appendable = new HTMLBodyElementAppendable(htmlElement);
    var $receiver = classes;
    var tmp$_0;
    for (tmp$_0 = 0; tmp$_0 !== $receiver.length; ++tmp$_0) {
      var element = $receiver[tmp$_0];
      appendable.addClass_61zpoe$(element);
    }
    appendable.css_qk3xy8$(css);
    appendFunc(appendable);
    return appendable;
  };
  HTMLBodyAppendable.prototype.div_wxxdja$ = function (classes, css, appendFunc) {
    if (classes === void 0)
      classes = [];
    if (css === void 0)
      css = json([]);
    var tmp$;
    var htmlElement = Kotlin.isType(tmp$ = document.createElement('div'), HTMLElement) ? tmp$ : Kotlin.throwCCE();
    var appendable = new HTMLBodyElementAppendable(htmlElement);
    var $receiver = classes;
    var tmp$_0;
    for (tmp$_0 = 0; tmp$_0 !== $receiver.length; ++tmp$_0) {
      var element = $receiver[tmp$_0];
      appendable.addClass_61zpoe$(element);
    }
    appendable.css_qk3xy8$(css);
    appendFunc(appendable);
    return appendable;
  };
  HTMLBodyAppendable.prototype.a_wxxdja$ = function (classes, css, appendFunc) {
    if (classes === void 0)
      classes = [];
    if (css === void 0)
      css = json([]);
    var tmp$;
    var htmlElement = Kotlin.isType(tmp$ = document.createElement('a'), HTMLElement) ? tmp$ : Kotlin.throwCCE();
    var appendable = new HTMLBodyElementAppendable(htmlElement);
    var $receiver = classes;
    var tmp$_0;
    for (tmp$_0 = 0; tmp$_0 !== $receiver.length; ++tmp$_0) {
      var element = $receiver[tmp$_0];
      appendable.addClass_61zpoe$(element);
    }
    appendable.css_qk3xy8$(css);
    appendFunc(appendable);
    return appendable;
  };
  HTMLBodyAppendable.prototype.ul_wxxdja$ = function (classes, css, appendFunc) {
    if (classes === void 0)
      classes = [];
    if (css === void 0)
      css = json([]);
    var tmp$;
    var htmlElement = Kotlin.isType(tmp$ = document.createElement('ul'), HTMLElement) ? tmp$ : Kotlin.throwCCE();
    var appendable = new ULBodyElementAppendable(htmlElement);
    var $receiver = classes;
    var tmp$_0;
    for (tmp$_0 = 0; tmp$_0 !== $receiver.length; ++tmp$_0) {
      var element = $receiver[tmp$_0];
      appendable.addClass_61zpoe$(element);
    }
    appendable.css_qk3xy8$(css);
    appendFunc(appendable);
    return appendable;
  };
  HTMLBodyAppendable.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'HTMLBodyAppendable',
    interfaces: []
  };
  function JQueryAppendable(jq) {
    HTMLBodyAppendable.call(this);
    this.jq = jq;
  }
  JQueryAppendable.prototype.appendElement_lt8gi4$ = function (element) {
    this.jq.append(element);
  };
  JQueryAppendable.prototype.addClass_61zpoe$ = function (clazz) {
    this.jq.addClass(clazz);
  };
  JQueryAppendable.prototype.css_qk3xy8$ = function (css) {
    this.jq.css(css);
  };
  JQueryAppendable.prototype.animate_qk3xy8$ = function (css) {
    this.jq.animate(css);
  };
  JQueryAppendable.prototype.animate_oir0if$ = function (css, time, animation, callback) {
    this.jq.animate(css, time, animation, callback);
  };
  JQueryAppendable.prototype.bind_8s0k5j$ = function (name, handleFunc) {
    this.jq.on(name, handleFunc);
  };
  JQueryAppendable.prototype.textInternal_61zpoe$ = function (str) {
    this.jq.text(str);
  };
  JQueryAppendable.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'JQueryAppendable',
    interfaces: [HTMLBodyAppendable]
  };
  function HTMLBodyElementAppendable(sourceElement) {
    JQueryAppendable.call(this, $(sourceElement));
  }
  HTMLBodyElementAppendable.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'HTMLBodyElementAppendable',
    interfaces: [JQueryAppendable]
  };
  function ULBodyElementAppendable(sourceElement) {
    HTMLBodyElementAppendable.call(this, sourceElement);
  }
  ULBodyElementAppendable.prototype.li_mug8yy$ = function (appendFunc) {
    var tmp$;
    var htmlElement = Kotlin.isType(tmp$ = document.createElement('li'), HTMLElement) ? tmp$ : Kotlin.throwCCE();
    appendFunc(new HTMLBodyElementAppendable(htmlElement));
  };
  ULBodyElementAppendable.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'ULBodyElementAppendable',
    interfaces: [HTMLBodyElementAppendable]
  };
  function OptionManager() {
  }
  OptionManager.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'OptionManager',
    interfaces: []
  };
  function UIManager() {
    this.darkThemed = true;
  }
  function UIManager$generateVideo$lambda$lambda$lambda(this$) {
    return function () {
      this$.css_qk3xy8$(json([to('opacity', '')]));
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda($receiver) {
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda($receiver) {
    for (var i = 0; i <= 5; i++) {
      $receiver.span_wxxdja$(void 0, void 0, UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda);
    }
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda(this$) {
    return function () {
      this$.css_qk3xy8$(json([to('display', '')]));
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda_0(closure$preloader, this$) {
    return function (it) {
      closure$preloader.css_qk3xy8$(json([to('display', 'none')]));
      this$.css_qk3xy8$(json([to('display', ''), to('opacity', 0)]));
      this$.animate_oir0if$(json([to('opacity', 1)]), 100, 'linear', UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda(this$));
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda_0(closure$preloader) {
    return function ($receiver) {
      $receiver.load_gbr1zf$(UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda_0(closure$preloader, $receiver));
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda_0(closure$item, this$UIManager) {
    return function ($receiver) {
      var tmp$, tmp$_0, tmp$_1, tmp$_2;
      if (closure$item['statistics'] != null && (Kotlin.isType(tmp$ = closure$item['statistics'], Object) ? tmp$ : Kotlin.throwCCE())['viewCount'] != null) {
        tmp$_2 = Kotlin.isNumber(tmp$_1 = (Kotlin.isType(tmp$_0 = closure$item['statistics'], Object) ? tmp$_0 : Kotlin.throwCCE())['viewCount']) ? tmp$_1 : Kotlin.throwCCE();
        $receiver.text_61zpoe$(this$UIManager.prettifyNumber_3p81yu$(tmp$_2) + ' views');
      }
       else {
        $receiver.text_61zpoe$('???');
      }
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda_1(this$UIManager, closure$item) {
    return function ($receiver) {
      $receiver.a_wxxdja$(['videoNameTextComponent', 'truncate', this$UIManager.darkThemed ? 'white-text' : 'black-text'], void 0, UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda_0(closure$item, this$UIManager));
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda_1(this$UIManager, closure$item) {
    return function ($receiver) {
      $receiver.div_wxxdja$(['col', 's12'], void 0, UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda_1(this$UIManager, closure$item));
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda_2(closure$ytDataAPI) {
    return function () {
      if (closure$ytDataAPI.authenticated)
        return true;
      return false;
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda(it) {
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda$lambda(closure$authVerify, closure$ytDataAPI, closure$item) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1;
      if (!closure$authVerify())
        return;
      tmp$_1 = json([to('id', typeof (tmp$_0 = (Kotlin.isType(tmp$ = closure$item['snippet'], Object) ? tmp$ : Kotlin.throwCCE())['id']) === 'string' ? tmp$_0 : Kotlin.throwCCE()), to('rating', 'like')]);
      closure$ytDataAPI.googleAPIGet_lao753$('https://www.googleapis.com/youtube/v3/videos/rate', tmp$_1, UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda);
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda$lambda_0($receiver) {
    $receiver.text_61zpoe$('thumb_up');
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda_1(closure$authVerify, closure$ytDataAPI, closure$item) {
    return function ($receiver) {
      $receiver.click_gbr1zf$(UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda$lambda(closure$authVerify, closure$ytDataAPI, closure$item));
      $receiver.i_wxxdja$(['material-icon', 'black-text'], json([to('margin-right', '4px')]), UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda$lambda_0);
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda_2(closure$authVerify, closure$ytDataAPI, closure$item) {
    return function ($receiver) {
      $receiver.div_wxxdja$(['chip', 'small', 'waves-effect', 'waves-dark'], void 0, UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda_1(closure$authVerify, closure$ytDataAPI, closure$item));
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda_3(closure$authVerify, closure$ytDataAPI, closure$item) {
    return function ($receiver) {
      $receiver.div_wxxdja$(['col', 's6'], json([to('padding-right', '0px')]), UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda_2(closure$authVerify, closure$ytDataAPI, closure$item));
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda_0(it) {
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda$lambda_1(closure$authVerify, closure$ytDataAPI, closure$item) {
    return function (it) {
      var tmp$, tmp$_0, tmp$_1;
      if (!closure$authVerify())
        return;
      tmp$_1 = json([to('id', typeof (tmp$_0 = (Kotlin.isType(tmp$ = closure$item['snippet'], Object) ? tmp$ : Kotlin.throwCCE())['id']) === 'string' ? tmp$_0 : Kotlin.throwCCE()), to('rating', 'dislike')]);
      closure$ytDataAPI.googleAPIGet_lao753$('https://www.googleapis.com/youtube/v3/videos/rate', tmp$_1, UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda$lambda$lambda_0);
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda$lambda_2($receiver) {
    $receiver.text_61zpoe$('thumb_down');
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda_2(closure$authVerify, closure$ytDataAPI, closure$item) {
    return function ($receiver) {
      $receiver.click_gbr1zf$(UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda$lambda_1(closure$authVerify, closure$ytDataAPI, closure$item));
      $receiver.i_wxxdja$(['material-icon', 'black-text'], json([to('margin-right', '4px')]), UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda$lambda_2);
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda_3(closure$authVerify, closure$ytDataAPI, closure$item) {
    return function ($receiver) {
      $receiver.div_wxxdja$(['chip', 'small', 'waves-effect', 'waves-dark'], void 0, UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda$lambda_2(closure$authVerify, closure$ytDataAPI, closure$item));
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda_4(closure$authVerify, closure$ytDataAPI, closure$item) {
    return function ($receiver) {
      $receiver.div_wxxdja$(['col', 's6'], json([to('padding-right', '0px')]), UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda_3(closure$authVerify, closure$ytDataAPI, closure$item));
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda_4(closure$channelChip) {
    return function ($receiver) {
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda$lambda_5(closure$channelChip) {
    return function ($receiver) {
      $receiver.div_wxxdja$(['col', 's12'], void 0, UIManager$generateVideo$lambda$lambda$lambda$lambda$lambda_4(closure$channelChip));
    };
  }
  function UIManager$generateVideo$lambda$lambda$lambda_0(this$UIManager, closure$item, closure$ytDataAPI, closure$channelChip) {
    return function ($receiver) {
      var preloader = $receiver.div_wxxdja$(['bubblesAnimation'], void 0, UIManager$generateVideo$lambda$lambda$lambda$lambda);
      $receiver.img_wxxdja$(['center-align'], json([to('width', '100%'), to('height', '100%'), to('cursor', 'pointer'), to('display', 'none')]), UIManager$generateVideo$lambda$lambda$lambda$lambda_0(preloader));
      $receiver.div_wxxdja$(['row'], void 0, UIManager$generateVideo$lambda$lambda$lambda$lambda_1(this$UIManager, closure$item));
      var authVerify = UIManager$generateVideo$lambda$lambda$lambda$lambda_2(closure$ytDataAPI);
      $receiver.div_wxxdja$(['row'], json([to('margin-bottom', '10px')]), UIManager$generateVideo$lambda$lambda$lambda$lambda_3(authVerify, closure$ytDataAPI, closure$item));
      $receiver.div_wxxdja$(['row'], json([to('margin-bottom', '10px')]), UIManager$generateVideo$lambda$lambda$lambda$lambda_4(authVerify, closure$ytDataAPI, closure$item));
      $receiver.div_wxxdja$(['row'], json([to('margin-bottom', '20px')]), UIManager$generateVideo$lambda$lambda$lambda$lambda_5(closure$channelChip));
    };
  }
  function UIManager$generateVideo$lambda$lambda(this$UIManager, closure$item, closure$ytDataAPI, closure$channelChip) {
    return function ($receiver) {
      setTimeout(UIManager$generateVideo$lambda$lambda$lambda($receiver), 1000);
      $receiver.div_wxxdja$(void 0, json([to('width', '214px'), to('height', '120px')]), UIManager$generateVideo$lambda$lambda$lambda_0(this$UIManager, closure$item, closure$ytDataAPI, closure$channelChip));
    };
  }
  function UIManager$generateVideo$lambda(closure$delay, this$UIManager, closure$item, closure$ytDataAPI, closure$channelChip) {
    return function ($receiver) {
      $receiver.div_wxxdja$(['col', 's12', 'm6', 'l4'], json([to('height', '240px'), to('width', '214px'), to('overflow', 'none'), to('margin-right', '20px'), to('opacity', 0.0), to('animation', 'mainMenuAppearItem 1s ease-out ' + closure$delay + 's')]), UIManager$generateVideo$lambda$lambda(this$UIManager, closure$item, closure$ytDataAPI, closure$channelChip));
    };
  }
  UIManager.prototype.generateVideo_x1nv6n$ = function (item, channel, delay, ytDataAPI, channelChip) {
    if (channelChip === void 0)
      channelChip = true;
    return UIManager$generateVideo$lambda(delay, this, item, ytDataAPI, channelChip);
  };
  UIManager.prototype.prettifyNumber_3p81yu$ = function (numb) {
    var $receiver = numb.toString();
    return Regex('\\B(?=(\\d{3})+(?!\\d)))').replace_x2uqeu$($receiver, ',');
  };
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
    this.lastPageToken = null;
    this.loadingPage = true;
    this.playing = null;
    this.playlist = null;
    console.log('Loading YoutubeSexy...');
    this.ytDataAPI.startAPILibrary_qb7cl2$(this);
  }
  YoutubeSexy.prototype.loadMainMenuPage_qk3xy8$ = function (mainMenuSource) {
    var tmp$, tmp$_0, tmp$_1;
    this.lastPageToken = (tmp$ = mainMenuSource['nextPageToken']) == null || typeof tmp$ === 'string' ? tmp$ : null;
    if (this.lastPageToken == null)
      $('#loadingcircle').css(json([to('display', 'none')]));
    if (this.ytDataAPI.authenticated) {
      var reason = 'Authenticated main menu page not implemented yet.';
      throw new Kotlin.kotlin.NotImplementedError('An operation is not implemented: ' + reason);
    }
     else {
      var videosRow = document.createElement('div');
      addClass(videosRow, ['row']);
      ((tmp$_0 = document.getElementById('main-page')) != null ? tmp$_0 : Kotlin.throwNPE()).appendChild(videosRow);
      var delay = {v: 0.0};
      var $receiver = Array.isArray(tmp$_1 = mainMenuSource['items']) ? tmp$_1 : Kotlin.throwCCE();
      var tmp$_2;
      for (tmp$_2 = 0; tmp$_2 !== $receiver.length; ++tmp$_2) {
        var element = $receiver[tmp$_2];
        var tmp$_3;
        this.ui.generateVideo_x1nv6n$(element, null, delay.v, this.ytDataAPI)(new HTMLBodyElementAppendable(Kotlin.isType(tmp$_3 = videosRow, HTMLElement) ? tmp$_3 : Kotlin.throwCCE()));
        delay.v += 0.05;
      }
    }
  };
  YoutubeSexy.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'YoutubeSexy',
    interfaces: []
  };
  function main(args) {
    new YoutubeSexy();
  }
  var SCOPE;
  var API_KEY;
  function YTDataAPI() {
    this.authenticated = false;
    this.accessToken = this.accessToken;
  }
  function YTDataAPI$startAPILibrary$lambda(closure$youtubeSexy) {
    return function (it) {
      closure$youtubeSexy.loadMainMenuPage_qk3xy8$(it);
      closure$youtubeSexy.loadingPage = false;
    };
  }
  YTDataAPI.prototype.startAPILibrary_qb7cl2$ = function (youtubeSexy) {
    var cookieManager = youtubeSexy.cookies;
    if (cookieManager.getCookie_61zpoe$('doAuthenticate') != null && cookieManager.getCookie_61zpoe$('doAuthenticate') === 'true') {
      console.log('Requesting authentication because of a cookie.');
    }
     else if (this.authenticated) {
      this.googleAPIGet_lao753$('https://www.googleapis.com/youtube/v3/activities', json([to('part', 'snippet, statistics'), to('maxResults', 50), to('home', true)]), YTDataAPI$startAPILibrary$lambda(youtubeSexy));
    }
  };
  function YTDataAPI$googleAPIGet$lambda(closure$url) {
    return function (k, v) {
      closure$url.v += '&' + k + '=' + v;
    };
  }
  function YTDataAPI$googleAPIGet$lambda_0(closure$xhttp, closure$complete) {
    return function (it) {
      var tmp$, tmp$_0;
      var json_0 = JSON.parse(closure$xhttp.responseText);
      if (json_0['error'] != null) {
        var errorJson = Kotlin.isType(tmp$ = json_0['errorJson'], Object) ? tmp$ : Kotlin.throwCCE();
        var errorAlert = new StringBuilder('An errorJson has been returned by the Youtube API! Error Code: ' + Kotlin.toString(errorJson['code']) + '\n' + ('Message: ' + Kotlin.toString(errorJson['message']) + '4' + '\n' + '\n' + 'Full errorJson log:'));
        console.log(errorJson['errors']);
        var $receiver = Array.isArray(tmp$_0 = errorJson['errors']) ? tmp$_0 : Kotlin.throwCCE();
        var tmp$_1, tmp$_2;
        var index = 0;
        for (tmp$_1 = 0; tmp$_1 !== $receiver.length; ++tmp$_1) {
          var item = $receiver[tmp$_1];
          plusAssign(errorAlert, '\n' + 'Error #' + (tmp$_2 = index, index = tmp$_2 + 1 | 0, tmp$_2) + ': ' + Kotlin.toString(item['reason']) + ' (' + Kotlin.toString(item['message']) + ')');
        }
        console.log(errorAlert.toString());
        alert(errorAlert.toString());
      }
       else
        closure$complete(json_0);
    };
  }
  YTDataAPI.prototype.googleAPIGet_lao753$ = function (path, params, complete) {
    var url = {v: path + '?key=' + API_KEY + (this.authenticated ? '&access_token=' + this.accessToken : '')};
    forEach(params, YTDataAPI$googleAPIGet$lambda(url));
    var requestJSON = json([to('url', url.v), to('contentType', 'content/json')]);
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url.v, true);
    xhttp.onreadystatechange = YTDataAPI$googleAPIGet$lambda_0(xhttp, complete);
    xhttp.send();
  };
  YTDataAPI.$metadata$ = {
    kind: Kotlin.Kind.CLASS,
    simpleName: 'YTDataAPI',
    interfaces: []
  };
  _.plusAssign_s47sd7$ = plusAssign;
  _.forEach_uluvmw$ = forEach;
  _.appendBuilder_c0wbp1$ = appendBuilder;
  _.CookieManager = CookieManager;
  _.GL = GL;
  _.StackBlur = StackBlur;
  _.WebGLBlur = WebGLBlur;
  _.BlurMethod = BlurMethod;
  _.HTMLBodyAppendable = HTMLBodyAppendable;
  _.JQueryAppendable = JQueryAppendable;
  _.HTMLBodyElementAppendable = HTMLBodyElementAppendable;
  _.ULBodyElementAppendable = ULBodyElementAppendable;
  _.OptionManager = OptionManager;
  _.UIManager = UIManager;
  _.YoutubeSexy = YoutubeSexy;
  _.main_kand9s$ = main;
  _.YTDataAPI = YTDataAPI;
  SCOPE = 'https://www.googleapis.com/auth/yt-analytics.readonly' + '%20https://www.googleapis.com/auth/yt-analytics-monetary.readonly' + '%20https://www.googleapis.com/auth/youtube' + '%20https://www.googleapis.com/auth/youtube.readonly' + '%20https://www.googleapis.com/auth/youtube.upload' + '%20https://www.googleapis.com/auth/youtubepartner' + '%20https://www.googleapis.com/auth/plus.login';
  API_KEY = 'AIzaSyBlV48q70B0bP3URvRVw_7-uW0YhXZA8GE';
  Kotlin.defineModule('YoutubeSexyKot', _);
  main([]);
  return _;
}(typeof YoutubeSexyKot === 'undefined' ? {} : YoutubeSexyKot, kotlin);
