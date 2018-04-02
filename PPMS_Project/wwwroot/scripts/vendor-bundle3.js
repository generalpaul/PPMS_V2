define('aurelia-breeze',['exports', 'breeze-client', 'aurelia-binding', 'aurelia-fetch-client'], function (exports, _breezeClient, _aureliaBinding, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BreezeObservationAdapter = exports.BreezeObjectObserver = exports.BreezePropertyObserver = exports.Deferred = exports.Q = exports.AjaxAdapter = exports.HttpResponse = undefined;
  exports.configure = configure;

  var _breezeClient2 = _interopRequireDefault(_breezeClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _dec, _class;

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  

  var extend = _breezeClient2.default.core.extend;

  var HttpResponse = exports.HttpResponse = function () {
    function HttpResponse(status, data, headers, config) {
      

      this.config = config;
      this.status = status;
      this.data = data;
      this.headers = headers;
    }

    HttpResponse.prototype.getHeader = function getHeader(headerName) {
      return this.getHeaders(headerName);
    };

    HttpResponse.prototype.getHeaders = function getHeaders(headerName) {
      if (headerName === null || headerName === undefined || headerName === '') {
        return this.headers.headers;
      }
      return this.headers.get(headerName);
    };

    return HttpResponse;
  }();

  function encodeParams(obj) {
    var query = '';
    var subValue, innerObj, fullSubName;

    for (var name in obj) {
      var value = obj[name];

      if (value instanceof Array) {
        for (var i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += encodeParams(innerObj) + '&';
        }
      } else if (value && value.toISOString) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value.toISOString()) + '&';
      } else if (value instanceof Object) {
        for (var subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += encodeParams(innerObj) + '&';
        }
      } else if (value === null) {
        query += encodeURIComponent(name) + '=&';
      } else if (value !== undefined) {
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
      }
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  };

  var AjaxAdapter = exports.AjaxAdapter = function () {
    function AjaxAdapter() {
      

      this.name = 'aurelia';
      this.requestInterceptor = null;
    }

    AjaxAdapter.prototype.setHttpClientFactory = function setHttpClientFactory(createHttpClient) {
      this.createHttpClient = createHttpClient;
    };

    AjaxAdapter.prototype.initialize = function initialize() {};

    AjaxAdapter.prototype.ajax = function ajax(config) {
      var requestInfo = {
        adapter: this,
        config: extend({}, config),
        zConfig: config,
        success: config.success,
        error: config.error
      };
      requestInfo.config.request = this.httpClient;
      requestInfo.config.headers = extend({}, config.headers);

      if (_breezeClient2.default.core.isFunction(this.requestInterceptor)) {
        this.requestInterceptor(requestInfo);
        if (this.requestInterceptor.oneTime) {
          this.requestInterceptor = null;
        }
        if (!requestInfo.config) {
          return;
        }
      }

      config = requestInfo.config;
      var init = {
        method: config.type
      };

      init.headers = new Headers();
      for (var header in config.headers) {
        if (config.headers.hasOwnProperty(header)) {
          init.headers.append(header, config.headers[header]);
        }
      }

      if (config.hasOwnProperty('data')) {
        init.body = config.data;
      }

      if (config.params) {
        var delim = config.url.indexOf('?') >= 0 ? '&' : '?';
        config.url = config.url + delim + encodeParams(config.params);
      }

      if (config.contentType) {
        init.headers.append('Content-Type', config.contentType);
      }

      requestInfo.config.request.fetch(config.url, init).then(function (response) {
        response.json().then(function (data) {
          var breezeResponse = new HttpResponse(response.status, data, response.headers, requestInfo.zConfig);

          if (response.ok) {
            requestInfo.success(breezeResponse);
          } else {
            requestInfo.error(breezeResponse);
          }
        });
      }).catch(function (error) {
        return requestInfo.error(error);
      });
    };

    _createClass(AjaxAdapter, [{
      key: 'httpClient',
      get: function get() {
        return this.client || (this.client = this.createHttpClient());
      }
    }]);

    return AjaxAdapter;
  }();

  _breezeClient2.default.config.registerAdapter('ajax', AjaxAdapter);

  var Q = exports.Q = function () {
    function Q() {
      
    }

    Q.defer = function defer() {
      return new Deferred();
    };

    Q.resolve = function resolve(data) {
      return Promise.resolve(data);
    };

    Q.reject = function reject(reason) {
      return Promise.reject(reason);
    };

    return Q;
  }();

  var Deferred = exports.Deferred = function Deferred() {
    

    var self = this;
    this.promise = new Promise(function (resolve, reject) {
      self.resolve = resolve;
      self.reject = reject;
    });
  };

  var BreezePropertyObserver = exports.BreezePropertyObserver = (_dec = (0, _aureliaBinding.subscriberCollection)(), _dec(_class = function () {
    function BreezePropertyObserver(obj, propertyName) {
      

      this.obj = obj;
      this.propertyName = propertyName;
    }

    BreezePropertyObserver.prototype.getValue = function getValue() {
      return this.obj[this.propertyName];
    };

    BreezePropertyObserver.prototype.setValue = function setValue(newValue) {
      this.obj[this.propertyName] = newValue;
    };

    BreezePropertyObserver.prototype.subscribe = function subscribe(context, callable) {
      if (this.addSubscriber(context, callable)) {
        this.oldValue = this.obj[this.propertyName];
        this.obj.__breezeObserver__.subscriberAdded();
      }
    };

    BreezePropertyObserver.prototype.unsubscribe = function unsubscribe(context, callable) {
      if (this.removeSubscriber(context, callable)) {
        this.obj.__breezeObserver__.subscriberRemoved();
      }
    };

    return BreezePropertyObserver;
  }()) || _class);


  function handleChange(change) {
    var object = change.entity;
    var propertyName = change.propertyName;
    var objectObserver = object.__breezeObserver__;
    if (propertyName === null) {
      var observers = objectObserver.observers;
      for (propertyName in observers) {
        if (observers.hasOwnProperty(propertyName)) {
          change.propertyName = propertyName;
          handleChange(change);
        }
      }
      change.propertyName = null;
      return;
    }

    var observer = objectObserver.observers[propertyName];
    var newValue = object[propertyName];
    if (!observer || newValue === observer.oldValue) {
      return;
    }
    observer.callSubscribers(newValue, observer.oldValue);
    observer.oldValue = newValue;
  }

  var BreezeObjectObserver = exports.BreezeObjectObserver = function () {
    function BreezeObjectObserver(obj) {
      

      this.obj = obj;
      this.observers = {};
      this.subscribers = 0;
    }

    BreezeObjectObserver.prototype.subscriberAdded = function subscriberAdded() {
      if (this.subscribers === 0) {
        this.subscription = this.obj.entityAspect.propertyChanged.subscribe(handleChange);
      }

      this.subscribers++;
    };

    BreezeObjectObserver.prototype.subscriberRemoved = function subscriberRemoved(propertyName, callback) {
      this.subscribers--;

      if (this.subscribers === 0) {
        this.obj.entityAspect.propertyChanged.unsubscribe(this.subscription);
      }
    };

    BreezeObjectObserver.prototype.getObserver = function getObserver(propertyName) {
      return this.observers[propertyName] || (this.observers[propertyName] = new BreezePropertyObserver(this.obj, propertyName));
    };

    return BreezeObjectObserver;
  }();

  function createObserverLookup(obj) {
    var value = new BreezeObjectObserver(obj);

    Object.defineProperty(obj, '__breezeObserver__', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    });

    return value;
  }

  function createCanObserveLookup(entityType) {
    var value = {};
    var properties = entityType.getProperties();
    for (var i = 0, ii = properties.length; i < ii; i++) {
      var property = properties[i];

      value[property.name] = property.isDataProperty || property.isScalar;
    }

    Object.defineProperty(entityType, '__canObserve__', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: value
    });

    return value;
  }

  var BreezeObservationAdapter = exports.BreezeObservationAdapter = function () {
    function BreezeObservationAdapter() {
      
    }

    BreezeObservationAdapter.prototype.getObserver = function getObserver(object, propertyName, descriptor) {
      var type = object.entityType;
      if (!type || !(type.__canObserve__ || createCanObserveLookup(type))[propertyName]) {
        return null;
      }

      var observerLookup = object.__breezeObserver__ || createObserverLookup(object);
      return observerLookup.getObserver(propertyName);
    };

    return BreezeObservationAdapter;
  }();

  function configure(frameworkConfig) {
    _breezeClient2.default.config.initializeAdapterInstance('modelLibrary', 'backingStore');

    _breezeClient2.default.config.setQ(Q);

    frameworkConfig.container.get(_aureliaBinding.ObserverLocator).addAdapter(new BreezeObservationAdapter());

    var adapter = _breezeClient2.default.config.initializeAdapterInstance('ajax', 'aurelia', true);
    adapter.setHttpClientFactory(function () {
      return frameworkConfig.container.get(_aureliaFetchClient.HttpClient);
    });
  }
});
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");+function(a){"use strict";var b=a.fn.jquery.split(" ")[0].split(".");if(b[0]<2&&b[1]<9||1==b[0]&&9==b[1]&&b[2]<1||b[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(jQuery),+function(a){"use strict";function b(){var a=document.createElement("bootstrap"),b={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var c in b)if(void 0!==a.style[c])return{end:b[c]};return!1}a.fn.emulateTransitionEnd=function(b){var c=!1,d=this;a(this).one("bsTransitionEnd",function(){c=!0});var e=function(){c||a(d).trigger(a.support.transition.end)};return setTimeout(e,b),this},a(function(){a.support.transition=b(),a.support.transition&&(a.event.special.bsTransitionEnd={bindType:a.support.transition.end,delegateType:a.support.transition.end,handle:function(b){if(a(b.target).is(this))return b.handleObj.handler.apply(this,arguments)}})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var c=a(this),e=c.data("bs.alert");e||c.data("bs.alert",e=new d(this)),"string"==typeof b&&e[b].call(c)})}var c='[data-dismiss="alert"]',d=function(b){a(b).on("click",c,this.close)};d.VERSION="3.3.7",d.TRANSITION_DURATION=150,d.prototype.close=function(b){function c(){g.detach().trigger("closed.bs.alert").remove()}var e=a(this),f=e.attr("data-target");f||(f=e.attr("href"),f=f&&f.replace(/.*(?=#[^\s]*$)/,""));var g=a("#"===f?[]:f);b&&b.preventDefault(),g.length||(g=e.closest(".alert")),g.trigger(b=a.Event("close.bs.alert")),b.isDefaultPrevented()||(g.removeClass("in"),a.support.transition&&g.hasClass("fade")?g.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c())};var e=a.fn.alert;a.fn.alert=b,a.fn.alert.Constructor=d,a.fn.alert.noConflict=function(){return a.fn.alert=e,this},a(document).on("click.bs.alert.data-api",c,d.prototype.close)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.button"),f="object"==typeof b&&b;e||d.data("bs.button",e=new c(this,f)),"toggle"==b?e.toggle():b&&e.setState(b)})}var c=function(b,d){this.$element=a(b),this.options=a.extend({},c.DEFAULTS,d),this.isLoading=!1};c.VERSION="3.3.7",c.DEFAULTS={loadingText:"loading..."},c.prototype.setState=function(b){var c="disabled",d=this.$element,e=d.is("input")?"val":"html",f=d.data();b+="Text",null==f.resetText&&d.data("resetText",d[e]()),setTimeout(a.proxy(function(){d[e](null==f[b]?this.options[b]:f[b]),"loadingText"==b?(this.isLoading=!0,d.addClass(c).attr(c,c).prop(c,!0)):this.isLoading&&(this.isLoading=!1,d.removeClass(c).removeAttr(c).prop(c,!1))},this),0)},c.prototype.toggle=function(){var a=!0,b=this.$element.closest('[data-toggle="buttons"]');if(b.length){var c=this.$element.find("input");"radio"==c.prop("type")?(c.prop("checked")&&(a=!1),b.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==c.prop("type")&&(c.prop("checked")!==this.$element.hasClass("active")&&(a=!1),this.$element.toggleClass("active")),c.prop("checked",this.$element.hasClass("active")),a&&c.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var d=a.fn.button;a.fn.button=b,a.fn.button.Constructor=c,a.fn.button.noConflict=function(){return a.fn.button=d,this},a(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(c){var d=a(c.target).closest(".btn");b.call(d,"toggle"),a(c.target).is('input[type="radio"], input[type="checkbox"]')||(c.preventDefault(),d.is("input,button")?d.trigger("focus"):d.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(b){a(b.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(b.type))})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.carousel"),f=a.extend({},c.DEFAULTS,d.data(),"object"==typeof b&&b),g="string"==typeof b?b:f.slide;e||d.data("bs.carousel",e=new c(this,f)),"number"==typeof b?e.to(b):g?e[g]():f.interval&&e.pause().cycle()})}var c=function(b,c){this.$element=a(b),this.$indicators=this.$element.find(".carousel-indicators"),this.options=c,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",a.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",a.proxy(this.pause,this)).on("mouseleave.bs.carousel",a.proxy(this.cycle,this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=600,c.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},c.prototype.keydown=function(a){if(!/input|textarea/i.test(a.target.tagName)){switch(a.which){case 37:this.prev();break;case 39:this.next();break;default:return}a.preventDefault()}},c.prototype.cycle=function(b){return b||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(a.proxy(this.next,this),this.options.interval)),this},c.prototype.getItemIndex=function(a){return this.$items=a.parent().children(".item"),this.$items.index(a||this.$active)},c.prototype.getItemForDirection=function(a,b){var c=this.getItemIndex(b),d="prev"==a&&0===c||"next"==a&&c==this.$items.length-1;if(d&&!this.options.wrap)return b;var e="prev"==a?-1:1,f=(c+e)%this.$items.length;return this.$items.eq(f)},c.prototype.to=function(a){var b=this,c=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(a>this.$items.length-1||a<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){b.to(a)}):c==a?this.pause().cycle():this.slide(a>c?"next":"prev",this.$items.eq(a))},c.prototype.pause=function(b){return b||(this.paused=!0),this.$element.find(".next, .prev").length&&a.support.transition&&(this.$element.trigger(a.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},c.prototype.next=function(){if(!this.sliding)return this.slide("next")},c.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},c.prototype.slide=function(b,d){var e=this.$element.find(".item.active"),f=d||this.getItemForDirection(b,e),g=this.interval,h="next"==b?"left":"right",i=this;if(f.hasClass("active"))return this.sliding=!1;var j=f[0],k=a.Event("slide.bs.carousel",{relatedTarget:j,direction:h});if(this.$element.trigger(k),!k.isDefaultPrevented()){if(this.sliding=!0,g&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var l=a(this.$indicators.children()[this.getItemIndex(f)]);l&&l.addClass("active")}var m=a.Event("slid.bs.carousel",{relatedTarget:j,direction:h});return a.support.transition&&this.$element.hasClass("slide")?(f.addClass(b),f[0].offsetWidth,e.addClass(h),f.addClass(h),e.one("bsTransitionEnd",function(){f.removeClass([b,h].join(" ")).addClass("active"),e.removeClass(["active",h].join(" ")),i.sliding=!1,setTimeout(function(){i.$element.trigger(m)},0)}).emulateTransitionEnd(c.TRANSITION_DURATION)):(e.removeClass("active"),f.addClass("active"),this.sliding=!1,this.$element.trigger(m)),g&&this.cycle(),this}};var d=a.fn.carousel;a.fn.carousel=b,a.fn.carousel.Constructor=c,a.fn.carousel.noConflict=function(){return a.fn.carousel=d,this};var e=function(c){var d,e=a(this),f=a(e.attr("data-target")||(d=e.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,""));if(f.hasClass("carousel")){var g=a.extend({},f.data(),e.data()),h=e.attr("data-slide-to");h&&(g.interval=!1),b.call(f,g),h&&f.data("bs.carousel").to(h),c.preventDefault()}};a(document).on("click.bs.carousel.data-api","[data-slide]",e).on("click.bs.carousel.data-api","[data-slide-to]",e),a(window).on("load",function(){a('[data-ride="carousel"]').each(function(){var c=a(this);b.call(c,c.data())})})}(jQuery),+function(a){"use strict";function b(b){var c,d=b.attr("data-target")||(c=b.attr("href"))&&c.replace(/.*(?=#[^\s]+$)/,"");return a(d)}function c(b){return this.each(function(){var c=a(this),e=c.data("bs.collapse"),f=a.extend({},d.DEFAULTS,c.data(),"object"==typeof b&&b);!e&&f.toggle&&/show|hide/.test(b)&&(f.toggle=!1),e||c.data("bs.collapse",e=new d(this,f)),"string"==typeof b&&e[b]()})}var d=function(b,c){this.$element=a(b),this.options=a.extend({},d.DEFAULTS,c),this.$trigger=a('[data-toggle="collapse"][href="#'+b.id+'"],[data-toggle="collapse"][data-target="#'+b.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};d.VERSION="3.3.7",d.TRANSITION_DURATION=350,d.DEFAULTS={toggle:!0},d.prototype.dimension=function(){var a=this.$element.hasClass("width");return a?"width":"height"},d.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var b,e=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(e&&e.length&&(b=e.data("bs.collapse"),b&&b.transitioning))){var f=a.Event("show.bs.collapse");if(this.$element.trigger(f),!f.isDefaultPrevented()){e&&e.length&&(c.call(e,"hide"),b||e.data("bs.collapse",null));var g=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[g](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var h=function(){this.$element.removeClass("collapsing").addClass("collapse in")[g](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!a.support.transition)return h.call(this);var i=a.camelCase(["scroll",g].join("-"));this.$element.one("bsTransitionEnd",a.proxy(h,this)).emulateTransitionEnd(d.TRANSITION_DURATION)[g](this.$element[0][i])}}}},d.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var b=a.Event("hide.bs.collapse");if(this.$element.trigger(b),!b.isDefaultPrevented()){var c=this.dimension();this.$element[c](this.$element[c]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var e=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};return a.support.transition?void this.$element[c](0).one("bsTransitionEnd",a.proxy(e,this)).emulateTransitionEnd(d.TRANSITION_DURATION):e.call(this)}}},d.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},d.prototype.getParent=function(){return a(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(a.proxy(function(c,d){var e=a(d);this.addAriaAndCollapsedClass(b(e),e)},this)).end()},d.prototype.addAriaAndCollapsedClass=function(a,b){var c=a.hasClass("in");a.attr("aria-expanded",c),b.toggleClass("collapsed",!c).attr("aria-expanded",c)};var e=a.fn.collapse;a.fn.collapse=c,a.fn.collapse.Constructor=d,a.fn.collapse.noConflict=function(){return a.fn.collapse=e,this},a(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(d){var e=a(this);e.attr("data-target")||d.preventDefault();var f=b(e),g=f.data("bs.collapse"),h=g?"toggle":e.data();c.call(f,h)})}(jQuery),+function(a){"use strict";function b(b){var c=b.attr("data-target");c||(c=b.attr("href"),c=c&&/#[A-Za-z]/.test(c)&&c.replace(/.*(?=#[^\s]*$)/,""));var d=c&&a(c);return d&&d.length?d:b.parent()}function c(c){c&&3===c.which||(a(e).remove(),a(f).each(function(){var d=a(this),e=b(d),f={relatedTarget:this};e.hasClass("open")&&(c&&"click"==c.type&&/input|textarea/i.test(c.target.tagName)&&a.contains(e[0],c.target)||(e.trigger(c=a.Event("hide.bs.dropdown",f)),c.isDefaultPrevented()||(d.attr("aria-expanded","false"),e.removeClass("open").trigger(a.Event("hidden.bs.dropdown",f)))))}))}function d(b){return this.each(function(){var c=a(this),d=c.data("bs.dropdown");d||c.data("bs.dropdown",d=new g(this)),"string"==typeof b&&d[b].call(c)})}var e=".dropdown-backdrop",f='[data-toggle="dropdown"]',g=function(b){a(b).on("click.bs.dropdown",this.toggle)};g.VERSION="3.3.7",g.prototype.toggle=function(d){var e=a(this);if(!e.is(".disabled, :disabled")){var f=b(e),g=f.hasClass("open");if(c(),!g){"ontouchstart"in document.documentElement&&!f.closest(".navbar-nav").length&&a(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(a(this)).on("click",c);var h={relatedTarget:this};if(f.trigger(d=a.Event("show.bs.dropdown",h)),d.isDefaultPrevented())return;e.trigger("focus").attr("aria-expanded","true"),f.toggleClass("open").trigger(a.Event("shown.bs.dropdown",h))}return!1}},g.prototype.keydown=function(c){if(/(38|40|27|32)/.test(c.which)&&!/input|textarea/i.test(c.target.tagName)){var d=a(this);if(c.preventDefault(),c.stopPropagation(),!d.is(".disabled, :disabled")){var e=b(d),g=e.hasClass("open");if(!g&&27!=c.which||g&&27==c.which)return 27==c.which&&e.find(f).trigger("focus"),d.trigger("click");var h=" li:not(.disabled):visible a",i=e.find(".dropdown-menu"+h);if(i.length){var j=i.index(c.target);38==c.which&&j>0&&j--,40==c.which&&j<i.length-1&&j++,~j||(j=0),i.eq(j).trigger("focus")}}}};var h=a.fn.dropdown;a.fn.dropdown=d,a.fn.dropdown.Constructor=g,a.fn.dropdown.noConflict=function(){return a.fn.dropdown=h,this},a(document).on("click.bs.dropdown.data-api",c).on("click.bs.dropdown.data-api",".dropdown form",function(a){a.stopPropagation()}).on("click.bs.dropdown.data-api",f,g.prototype.toggle).on("keydown.bs.dropdown.data-api",f,g.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",g.prototype.keydown)}(jQuery),+function(a){"use strict";function b(b,d){return this.each(function(){var e=a(this),f=e.data("bs.modal"),g=a.extend({},c.DEFAULTS,e.data(),"object"==typeof b&&b);f||e.data("bs.modal",f=new c(this,g)),"string"==typeof b?f[b](d):g.show&&f.show(d)})}var c=function(b,c){this.options=c,this.$body=a(document.body),this.$element=a(b),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,a.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};c.VERSION="3.3.7",c.TRANSITION_DURATION=300,c.BACKDROP_TRANSITION_DURATION=150,c.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},c.prototype.toggle=function(a){return this.isShown?this.hide():this.show(a)},c.prototype.show=function(b){var d=this,e=a.Event("show.bs.modal",{relatedTarget:b});this.$element.trigger(e),this.isShown||e.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',a.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){d.$element.one("mouseup.dismiss.bs.modal",function(b){a(b.target).is(d.$element)&&(d.ignoreBackdropClick=!0)})}),this.backdrop(function(){var e=a.support.transition&&d.$element.hasClass("fade");d.$element.parent().length||d.$element.appendTo(d.$body),d.$element.show().scrollTop(0),d.adjustDialog(),e&&d.$element[0].offsetWidth,d.$element.addClass("in"),d.enforceFocus();var f=a.Event("shown.bs.modal",{relatedTarget:b});e?d.$dialog.one("bsTransitionEnd",function(){d.$element.trigger("focus").trigger(f)}).emulateTransitionEnd(c.TRANSITION_DURATION):d.$element.trigger("focus").trigger(f)}))},c.prototype.hide=function(b){b&&b.preventDefault(),b=a.Event("hide.bs.modal"),this.$element.trigger(b),this.isShown&&!b.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),a(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),a.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",a.proxy(this.hideModal,this)).emulateTransitionEnd(c.TRANSITION_DURATION):this.hideModal())},c.prototype.enforceFocus=function(){a(document).off("focusin.bs.modal").on("focusin.bs.modal",a.proxy(function(a){document===a.target||this.$element[0]===a.target||this.$element.has(a.target).length||this.$element.trigger("focus")},this))},c.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",a.proxy(function(a){27==a.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},c.prototype.resize=function(){this.isShown?a(window).on("resize.bs.modal",a.proxy(this.handleUpdate,this)):a(window).off("resize.bs.modal")},c.prototype.hideModal=function(){var a=this;this.$element.hide(),this.backdrop(function(){a.$body.removeClass("modal-open"),a.resetAdjustments(),a.resetScrollbar(),a.$element.trigger("hidden.bs.modal")})},c.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},c.prototype.backdrop=function(b){var d=this,e=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var f=a.support.transition&&e;if(this.$backdrop=a(document.createElement("div")).addClass("modal-backdrop "+e).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",a.proxy(function(a){return this.ignoreBackdropClick?void(this.ignoreBackdropClick=!1):void(a.target===a.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide()))},this)),f&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!b)return;f?this.$backdrop.one("bsTransitionEnd",b).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):b()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var g=function(){d.removeBackdrop(),b&&b()};a.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",g).emulateTransitionEnd(c.BACKDROP_TRANSITION_DURATION):g()}else b&&b()},c.prototype.handleUpdate=function(){this.adjustDialog()},c.prototype.adjustDialog=function(){var a=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&a?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!a?this.scrollbarWidth:""})},c.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},c.prototype.checkScrollbar=function(){var a=window.innerWidth;if(!a){var b=document.documentElement.getBoundingClientRect();a=b.right-Math.abs(b.left)}this.bodyIsOverflowing=document.body.clientWidth<a,this.scrollbarWidth=this.measureScrollbar()},c.prototype.setScrollbar=function(){var a=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"",this.bodyIsOverflowing&&this.$body.css("padding-right",a+this.scrollbarWidth)},c.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad)},c.prototype.measureScrollbar=function(){var a=document.createElement("div");a.className="modal-scrollbar-measure",this.$body.append(a);var b=a.offsetWidth-a.clientWidth;return this.$body[0].removeChild(a),b};var d=a.fn.modal;a.fn.modal=b,a.fn.modal.Constructor=c,a.fn.modal.noConflict=function(){return a.fn.modal=d,this},a(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(c){var d=a(this),e=d.attr("href"),f=a(d.attr("data-target")||e&&e.replace(/.*(?=#[^\s]+$)/,"")),g=f.data("bs.modal")?"toggle":a.extend({remote:!/#/.test(e)&&e},f.data(),d.data());d.is("a")&&c.preventDefault(),f.one("show.bs.modal",function(a){a.isDefaultPrevented()||f.one("hidden.bs.modal",function(){d.is(":visible")&&d.trigger("focus")})}),b.call(f,g,this)})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tooltip"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.tooltip",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",a,b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},c.prototype.init=function(b,c,d){if(this.enabled=!0,this.type=b,this.$element=a(c),this.options=this.getOptions(d),this.$viewport=this.options.viewport&&a(a.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var e=this.options.trigger.split(" "),f=e.length;f--;){var g=e[f];if("click"==g)this.$element.on("click."+this.type,this.options.selector,a.proxy(this.toggle,this));else if("manual"!=g){var h="hover"==g?"mouseenter":"focusin",i="hover"==g?"mouseleave":"focusout";this.$element.on(h+"."+this.type,this.options.selector,a.proxy(this.enter,this)),this.$element.on(i+"."+this.type,this.options.selector,a.proxy(this.leave,this))}}this.options.selector?this._options=a.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.getOptions=function(b){return b=a.extend({},this.getDefaults(),this.$element.data(),b),b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay}),b},c.prototype.getDelegateOptions=function(){var b={},c=this.getDefaults();return this._options&&a.each(this._options,function(a,d){c[a]!=d&&(b[a]=d)}),b},c.prototype.enter=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);return c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusin"==b.type?"focus":"hover"]=!0),c.tip().hasClass("in")||"in"==c.hoverState?void(c.hoverState="in"):(clearTimeout(c.timeout),c.hoverState="in",c.options.delay&&c.options.delay.show?void(c.timeout=setTimeout(function(){"in"==c.hoverState&&c.show()},c.options.delay.show)):c.show())},c.prototype.isInStateTrue=function(){for(var a in this.inState)if(this.inState[a])return!0;return!1},c.prototype.leave=function(b){var c=b instanceof this.constructor?b:a(b.currentTarget).data("bs."+this.type);if(c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c)),b instanceof a.Event&&(c.inState["focusout"==b.type?"focus":"hover"]=!1),!c.isInStateTrue())return clearTimeout(c.timeout),c.hoverState="out",c.options.delay&&c.options.delay.hide?void(c.timeout=setTimeout(function(){"out"==c.hoverState&&c.hide()},c.options.delay.hide)):c.hide()},c.prototype.show=function(){var b=a.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(b);var d=a.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(b.isDefaultPrevented()||!d)return;var e=this,f=this.tip(),g=this.getUID(this.type);this.setContent(),f.attr("id",g),this.$element.attr("aria-describedby",g),this.options.animation&&f.addClass("fade");var h="function"==typeof this.options.placement?this.options.placement.call(this,f[0],this.$element[0]):this.options.placement,i=/\s?auto?\s?/i,j=i.test(h);j&&(h=h.replace(i,"")||"top"),f.detach().css({top:0,left:0,display:"block"}).addClass(h).data("bs."+this.type,this),this.options.container?f.appendTo(this.options.container):f.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var k=this.getPosition(),l=f[0].offsetWidth,m=f[0].offsetHeight;if(j){var n=h,o=this.getPosition(this.$viewport);h="bottom"==h&&k.bottom+m>o.bottom?"top":"top"==h&&k.top-m<o.top?"bottom":"right"==h&&k.right+l>o.width?"left":"left"==h&&k.left-l<o.left?"right":h,f.removeClass(n).addClass(h)}var p=this.getCalculatedOffset(h,k,l,m);this.applyPlacement(p,h);var q=function(){var a=e.hoverState;e.$element.trigger("shown.bs."+e.type),e.hoverState=null,"out"==a&&e.leave(e)};a.support.transition&&this.$tip.hasClass("fade")?f.one("bsTransitionEnd",q).emulateTransitionEnd(c.TRANSITION_DURATION):q()}},c.prototype.applyPlacement=function(b,c){var d=this.tip(),e=d[0].offsetWidth,f=d[0].offsetHeight,g=parseInt(d.css("margin-top"),10),h=parseInt(d.css("margin-left"),10);isNaN(g)&&(g=0),isNaN(h)&&(h=0),b.top+=g,b.left+=h,a.offset.setOffset(d[0],a.extend({using:function(a){d.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0),d.addClass("in");var i=d[0].offsetWidth,j=d[0].offsetHeight;"top"==c&&j!=f&&(b.top=b.top+f-j);var k=this.getViewportAdjustedDelta(c,b,i,j);k.left?b.left+=k.left:b.top+=k.top;var l=/top|bottom/.test(c),m=l?2*k.left-e+i:2*k.top-f+j,n=l?"offsetWidth":"offsetHeight";d.offset(b),this.replaceArrow(m,d[0][n],l)},c.prototype.replaceArrow=function(a,b,c){this.arrow().css(c?"left":"top",50*(1-a/b)+"%").css(c?"top":"left","")},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b),a.removeClass("fade in top bottom left right")},c.prototype.hide=function(b){function d(){"in"!=e.hoverState&&f.detach(),e.$element&&e.$element.removeAttr("aria-describedby").trigger("hidden.bs."+e.type),b&&b()}var e=this,f=a(this.$tip),g=a.Event("hide.bs."+this.type);if(this.$element.trigger(g),!g.isDefaultPrevented())return f.removeClass("in"),a.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",d).emulateTransitionEnd(c.TRANSITION_DURATION):d(),this.hoverState=null,this},c.prototype.fixTitle=function(){var a=this.$element;(a.attr("title")||"string"!=typeof a.attr("data-original-title"))&&a.attr("data-original-title",a.attr("title")||"").attr("title","")},c.prototype.hasContent=function(){return this.getTitle()},c.prototype.getPosition=function(b){b=b||this.$element;var c=b[0],d="BODY"==c.tagName,e=c.getBoundingClientRect();null==e.width&&(e=a.extend({},e,{width:e.right-e.left,height:e.bottom-e.top}));var f=window.SVGElement&&c instanceof window.SVGElement,g=d?{top:0,left:0}:f?null:b.offset(),h={scroll:d?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()},i=d?{width:a(window).width(),height:a(window).height()}:null;return a.extend({},e,h,i,g)},c.prototype.getCalculatedOffset=function(a,b,c,d){return"bottom"==a?{top:b.top+b.height,left:b.left+b.width/2-c/2}:"top"==a?{top:b.top-d,left:b.left+b.width/2-c/2}:"left"==a?{top:b.top+b.height/2-d/2,left:b.left-c}:{top:b.top+b.height/2-d/2,left:b.left+b.width}},c.prototype.getViewportAdjustedDelta=function(a,b,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);if(/right|left/.test(a)){var h=b.top-f-g.scroll,i=b.top+f-g.scroll+d;h<g.top?e.top=g.top-h:i>g.top+g.height&&(e.top=g.top+g.height-i)}else{var j=b.left-f,k=b.left+f+c;j<g.left?e.left=g.left-j:k>g.right&&(e.left=g.left+g.width-k)}return e},c.prototype.getTitle=function(){var a,b=this.$element,c=this.options;return a=b.attr("data-original-title")||("function"==typeof c.title?c.title.call(b[0]):c.title)},c.prototype.getUID=function(a){do a+=~~(1e6*Math.random());while(document.getElementById(a));return a},c.prototype.tip=function(){if(!this.$tip&&(this.$tip=a(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},c.prototype.enable=function(){this.enabled=!0},c.prototype.disable=function(){this.enabled=!1},c.prototype.toggleEnabled=function(){this.enabled=!this.enabled},c.prototype.toggle=function(b){var c=this;b&&(c=a(b.currentTarget).data("bs."+this.type),c||(c=new this.constructor(b.currentTarget,this.getDelegateOptions()),a(b.currentTarget).data("bs."+this.type,c))),b?(c.inState.click=!c.inState.click,c.isInStateTrue()?c.enter(c):c.leave(c)):c.tip().hasClass("in")?c.leave(c):c.enter(c)},c.prototype.destroy=function(){var a=this;clearTimeout(this.timeout),this.hide(function(){a.$element.off("."+a.type).removeData("bs."+a.type),a.$tip&&a.$tip.detach(),a.$tip=null,a.$arrow=null,a.$viewport=null,a.$element=null})};var d=a.fn.tooltip;a.fn.tooltip=b,a.fn.tooltip.Constructor=c,a.fn.tooltip.noConflict=function(){return a.fn.tooltip=d,this}}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.popover"),f="object"==typeof b&&b;!e&&/destroy|hide/.test(b)||(e||d.data("bs.popover",e=new c(this,f)),"string"==typeof b&&e[b]())})}var c=function(a,b){this.init("popover",a,b)};if(!a.fn.tooltip)throw new Error("Popover requires tooltip.js");c.VERSION="3.3.7",c.DEFAULTS=a.extend({},a.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),c.prototype=a.extend({},a.fn.tooltip.Constructor.prototype),c.prototype.constructor=c,c.prototype.getDefaults=function(){return c.DEFAULTS},c.prototype.setContent=function(){var a=this.tip(),b=this.getTitle(),c=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b),a.find(".popover-content").children().detach().end()[this.options.html?"string"==typeof c?"html":"append":"text"](c),a.removeClass("fade top bottom left right in"),a.find(".popover-title").html()||a.find(".popover-title").hide()},c.prototype.hasContent=function(){return this.getTitle()||this.getContent()},c.prototype.getContent=function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},c.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var d=a.fn.popover;a.fn.popover=b,a.fn.popover.Constructor=c,a.fn.popover.noConflict=function(){return a.fn.popover=d,this}}(jQuery),+function(a){"use strict";function b(c,d){this.$body=a(document.body),this.$scrollElement=a(a(c).is(document.body)?window:c),this.options=a.extend({},b.DEFAULTS,d),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",a.proxy(this.process,this)),this.refresh(),this.process()}function c(c){return this.each(function(){var d=a(this),e=d.data("bs.scrollspy"),f="object"==typeof c&&c;e||d.data("bs.scrollspy",e=new b(this,f)),"string"==typeof c&&e[c]()})}b.VERSION="3.3.7",b.DEFAULTS={offset:10},b.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},b.prototype.refresh=function(){var b=this,c="offset",d=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),a.isWindow(this.$scrollElement[0])||(c="position",d=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var b=a(this),e=b.data("target")||b.attr("href"),f=/^#./.test(e)&&a(e);return f&&f.length&&f.is(":visible")&&[[f[c]().top+d,e]]||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){b.offsets.push(this[0]),b.targets.push(this[1])})},b.prototype.process=function(){var a,b=this.$scrollElement.scrollTop()+this.options.offset,c=this.getScrollHeight(),d=this.options.offset+c-this.$scrollElement.height(),e=this.offsets,f=this.targets,g=this.activeTarget;if(this.scrollHeight!=c&&this.refresh(),b>=d)return g!=(a=f[f.length-1])&&this.activate(a);if(g&&b<e[0])return this.activeTarget=null,this.clear();for(a=e.length;a--;)g!=f[a]&&b>=e[a]&&(void 0===e[a+1]||b<e[a+1])&&this.activate(f[a])},b.prototype.activate=function(b){
this.activeTarget=b,this.clear();var c=this.selector+'[data-target="'+b+'"],'+this.selector+'[href="'+b+'"]',d=a(c).parents("li").addClass("active");d.parent(".dropdown-menu").length&&(d=d.closest("li.dropdown").addClass("active")),d.trigger("activate.bs.scrollspy")},b.prototype.clear=function(){a(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var d=a.fn.scrollspy;a.fn.scrollspy=c,a.fn.scrollspy.Constructor=b,a.fn.scrollspy.noConflict=function(){return a.fn.scrollspy=d,this},a(window).on("load.bs.scrollspy.data-api",function(){a('[data-spy="scroll"]').each(function(){var b=a(this);c.call(b,b.data())})})}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.tab");e||d.data("bs.tab",e=new c(this)),"string"==typeof b&&e[b]()})}var c=function(b){this.element=a(b)};c.VERSION="3.3.7",c.TRANSITION_DURATION=150,c.prototype.show=function(){var b=this.element,c=b.closest("ul:not(.dropdown-menu)"),d=b.data("target");if(d||(d=b.attr("href"),d=d&&d.replace(/.*(?=#[^\s]*$)/,"")),!b.parent("li").hasClass("active")){var e=c.find(".active:last a"),f=a.Event("hide.bs.tab",{relatedTarget:b[0]}),g=a.Event("show.bs.tab",{relatedTarget:e[0]});if(e.trigger(f),b.trigger(g),!g.isDefaultPrevented()&&!f.isDefaultPrevented()){var h=a(d);this.activate(b.closest("li"),c),this.activate(h,h.parent(),function(){e.trigger({type:"hidden.bs.tab",relatedTarget:b[0]}),b.trigger({type:"shown.bs.tab",relatedTarget:e[0]})})}}},c.prototype.activate=function(b,d,e){function f(){g.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),b.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),h?(b[0].offsetWidth,b.addClass("in")):b.removeClass("fade"),b.parent(".dropdown-menu").length&&b.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),e&&e()}var g=d.find("> .active"),h=e&&a.support.transition&&(g.length&&g.hasClass("fade")||!!d.find("> .fade").length);g.length&&h?g.one("bsTransitionEnd",f).emulateTransitionEnd(c.TRANSITION_DURATION):f(),g.removeClass("in")};var d=a.fn.tab;a.fn.tab=b,a.fn.tab.Constructor=c,a.fn.tab.noConflict=function(){return a.fn.tab=d,this};var e=function(c){c.preventDefault(),b.call(a(this),"show")};a(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',e).on("click.bs.tab.data-api",'[data-toggle="pill"]',e)}(jQuery),+function(a){"use strict";function b(b){return this.each(function(){var d=a(this),e=d.data("bs.affix"),f="object"==typeof b&&b;e||d.data("bs.affix",e=new c(this,f)),"string"==typeof b&&e[b]()})}var c=function(b,d){this.options=a.extend({},c.DEFAULTS,d),this.$target=a(this.options.target).on("scroll.bs.affix.data-api",a.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",a.proxy(this.checkPositionWithEventLoop,this)),this.$element=a(b),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};c.VERSION="3.3.7",c.RESET="affix affix-top affix-bottom",c.DEFAULTS={offset:0,target:window},c.prototype.getState=function(a,b,c,d){var e=this.$target.scrollTop(),f=this.$element.offset(),g=this.$target.height();if(null!=c&&"top"==this.affixed)return e<c&&"top";if("bottom"==this.affixed)return null!=c?!(e+this.unpin<=f.top)&&"bottom":!(e+g<=a-d)&&"bottom";var h=null==this.affixed,i=h?e:f.top,j=h?g:b;return null!=c&&e<=c?"top":null!=d&&i+j>=a-d&&"bottom"},c.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(c.RESET).addClass("affix");var a=this.$target.scrollTop(),b=this.$element.offset();return this.pinnedOffset=b.top-a},c.prototype.checkPositionWithEventLoop=function(){setTimeout(a.proxy(this.checkPosition,this),1)},c.prototype.checkPosition=function(){if(this.$element.is(":visible")){var b=this.$element.height(),d=this.options.offset,e=d.top,f=d.bottom,g=Math.max(a(document).height(),a(document.body).height());"object"!=typeof d&&(f=e=d),"function"==typeof e&&(e=d.top(this.$element)),"function"==typeof f&&(f=d.bottom(this.$element));var h=this.getState(g,b,e,f);if(this.affixed!=h){null!=this.unpin&&this.$element.css("top","");var i="affix"+(h?"-"+h:""),j=a.Event(i+".bs.affix");if(this.$element.trigger(j),j.isDefaultPrevented())return;this.affixed=h,this.unpin="bottom"==h?this.getPinnedOffset():null,this.$element.removeClass(c.RESET).addClass(i).trigger(i.replace("affix","affixed")+".bs.affix")}"bottom"==h&&this.$element.offset({top:g-b-f})}};var d=a.fn.affix;a.fn.affix=b,a.fn.affix.Constructor=c,a.fn.affix.noConflict=function(){return a.fn.affix=d,this},a(window).on("load",function(){a('[data-spy="affix"]').each(function(){var c=a(this),d=c.data();d.offset=d.offset||{},null!=d.offsetBottom&&(d.offset.bottom=d.offsetBottom),null!=d.offsetTop&&(d.offset.top=d.offsetTop),b.call(c,d)})})}(jQuery);
define("bootstrap/js/bootstrap.min", ["jquery"], (function (global) {
  return function () {
    var ret, fn;
    return ret || global.$;
  };
}(this)));
;define('bootstrap', ['bootstrap/js/bootstrap.min'], function (main) { return main; });

define('text!bootstrap/css/bootstrap.css', ['module'], function(module) { module.exports = "/*!\n * Bootstrap v3.3.5 (http://getbootstrap.com)\n * Copyright 2011-2015 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  -webkit-text-size-adjust: 100%;\n      -ms-text-size-adjust: 100%;\n}\nbody {\n  margin: 0;\n}\n\n/*\n[class^=\"icon-\"],\n[class*=\" icon-\"] {\n  display: inline-block;\n  width: 14px;\n  height: 14px;\n  margin-top: 1px;\n  *margin-right: .3em;\n  line-height: 14px;\n  vertical-align: text-top;\n  background-image: url(\"../img/glyphicons-halflings.png\");\n  background-position: 14px 14px;\n  background-repeat: no-repeat;\n}\n*/\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline;\n}\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n[hidden],\ntemplate {\n  display: none;\n}\na {\n  background-color: transparent;\n}\na:active,\na:hover {\n  outline: 0;\n}\nabbr[title] {\n  border-bottom: 1px dotted;\n}\nb,\nstrong {\n  font-weight: bold;\n}\ndfn {\n  font-style: italic;\n}\nh1 {\n  margin: .67em 0;\n  font-size: 2em;\n}\nmark {\n  color: #000;\n  background: #ff0;\n}\nsmall {\n  font-size: 80%;\n}\nsub,\nsup {\n  position: relative;\n  font-size: 75%;\n  line-height: 0;\n  vertical-align: baseline;\n}\nsup {\n  top: -.5em;\n}\nsub {\n  bottom: -.25em;\n}\nimg {\n  border: 0;\n}\nsvg:not(:root) {\n  overflow: hidden;\n}\nfigure {\n  margin: 1em 40px;\n}\nhr {\n  height: 0;\n  -webkit-box-sizing: content-box;\n     -moz-box-sizing: content-box;\n          box-sizing: content-box;\n}\npre {\n  overflow: auto;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  margin: 0;\n  /*font: inherit;*/\n  color: #222;\n}\nbutton {\n  overflow: visible;\n}\nbutton,\nselect {\n  text-transform: none;\n}\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer;\n}\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  padding: 0;\n  border: 0;\n}\ninput {\n  line-height: normal;\n}\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0;\n}\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\ninput[type=\"search\"] {\n  -webkit-box-sizing: content-box;\n     -moz-box-sizing: content-box;\n          box-sizing: content-box;\n  -webkit-appearance: textfield;\n}\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\nfieldset {\n  padding: .35em .625em .75em;\n  margin: 0 2px;\n  border: 1px solid #c0c0c0;\n}\nlegend {\n  padding: 0;\n  border: 0;\n}\ntextarea {\n  overflow: auto;\n  height: 80px;\n}\noptgroup {\n  font-weight: bold;\n}\ntable {\n  border-spacing: 0;\n  border-collapse: collapse;\n\n    border-spacing: 2px;\n    -webkit-border-horizontal-spacing: 2px;\n    -webkit-border-vertical-spacing: 2px;\n}\ntd,\nth {\n  padding: 4px;\n}\n/*! Source: https://github.com/h5bp/html5-boilerplate/blob/master/src/css/main.css */\n@media print {\n  *,\n  *:before,\n  *:after {\n    color: #000 !important;\n    text-shadow: none !important;\n    background: transparent !important;\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n  }\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n  a[href]:after {\n    content: \" (\" attr(href) \")\";\n  }\n  abbr[title]:after {\n    content: \" (\" attr(title) \")\";\n  }\n  a[href^=\"#\"]:after,\n  a[href^=\"javascript:\"]:after {\n    content: \"\";\n  }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n\n    page-break-inside: avoid;\n  }\n  thead {\n    display: table-header-group;\n  }\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n  img {\n    max-width: 100% !important;\n  }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n  .navbar {\n    display: none;\n  }\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important;\n  }\n  .label {\n    border: 1px solid #000;\n  }\n  .table {\n    border-collapse: collapse !important;\n  }\n  .table td,\n  .table th {\n    background-color: #fff !important;\n  }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #a4d4e6 !important;\n  }\n}\n/*@font-face {\n  font-family: 'Glyphicons Halflings';\n\n  src: url('../fonts/glyphicons-halflings-regular.eot');\n  src: url('../fonts/glyphicons-halflings-regular.eot?#iefix') format('embedded-opentype'), url('../fonts/glyphicons-halflings-regular.woff2') format('woff2'), url('../fonts/glyphicons-halflings-regular.woff') format('woff'), url('../fonts/glyphicons-halflings-regular.ttf') format('truetype'), url('../fonts/glyphicons-halflings-regular.svg#glyphicons_halflingsregular') format('svg');\n}*/\n.glyphicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'Glyphicons Halflings';\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1;\n\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n.glyphicon-asterisk:before {\n  content: \"\\2a\";\n}\n.glyphicon-plus:before {\n  content: \"\\2b\";\n}\n.glyphicon-euro:before,\n.glyphicon-eur:before {\n  content: \"\\20ac\";\n}\n.glyphicon-minus:before {\n  content: \"\\2212\";\n}\n.glyphicon-cloud:before {\n  content: \"\\2601\";\n}\n.glyphicon-envelope:before {\n  content: \"\\2709\";\n}\n.glyphicon-pencil:before {\n  content: \"\\270f\";\n}\n.glyphicon-glass:before {\n  content: \"\\e001\";\n}\n.glyphicon-music:before {\n  content: \"\\e002\";\n}\n.glyphicon-search:before {\n  content: \"\\e003\";\n}\n.glyphicon-heart:before {\n  content: \"\\e005\";\n}\n.glyphicon-star:before {\n  content: \"\\e006\";\n}\n.glyphicon-star-empty:before {\n  content: \"\\e007\";\n}\n.glyphicon-user:before {\n  content: \"\\e008\";\n}\n.glyphicon-film:before {\n  content: \"\\e009\";\n}\n.glyphicon-th-large:before {\n  content: \"\\e010\";\n}\n.glyphicon-th:before {\n  content: \"\\e011\";\n}\n.glyphicon-th-list:before {\n  content: \"\\e012\";\n}\n.glyphicon-ok:before {\n  content: \"\\e013\";\n}\n.glyphicon-remove:before {\n  content: \"\\e014\";\n}\n.glyphicon-zoom-in:before {\n  content: \"\\e015\";\n}\n.glyphicon-zoom-out:before {\n  content: \"\\e016\";\n}\n.glyphicon-off:before {\n  content: \"\\e017\";\n}\n.glyphicon-signal:before {\n  content: \"\\e018\";\n}\n.glyphicon-cog:before {\n  content: \"\\e019\";\n}\n.glyphicon-trash:before {\n  content: \"\\e020\";\n}\n.glyphicon-home:before {\n  content: \"\\e021\";\n}\n.glyphicon-file:before {\n  content: \"\\e022\";\n}\n.glyphicon-time:before {\n  content: \"\\e023\";\n}\n.glyphicon-road:before {\n  content: \"\\e024\";\n}\n.glyphicon-download-alt:before {\n  content: \"\\e025\";\n}\n.glyphicon-download:before {\n  content: \"\\e026\";\n}\n.glyphicon-upload:before {\n  content: \"\\e027\";\n}\n.glyphicon-inbox:before {\n  content: \"\\e028\";\n}\n.glyphicon-play-circle:before {\n  content: \"\\e029\";\n}\n.glyphicon-repeat:before {\n  content: \"\\e030\";\n}\n.glyphicon-refresh:before {\n  content: \"\\e031\";\n}\n.glyphicon-list-alt:before {\n  content: \"\\e032\";\n}\n.glyphicon-lock:before {\n  content: \"\\e033\";\n}\n.glyphicon-flag:before {\n  content: \"\\e034\";\n}\n.glyphicon-headphones:before {\n  content: \"\\e035\";\n}\n.glyphicon-volume-off:before {\n  content: \"\\e036\";\n}\n.glyphicon-volume-down:before {\n  content: \"\\e037\";\n}\n.glyphicon-volume-up:before {\n  content: \"\\e038\";\n}\n.glyphicon-qrcode:before {\n  content: \"\\e039\";\n}\n.glyphicon-barcode:before {\n  content: \"\\e040\";\n}\n.glyphicon-tag:before {\n  content: \"\\e041\";\n}\n.glyphicon-tags:before {\n  content: \"\\e042\";\n}\n.glyphicon-book:before {\n  content: \"\\e043\";\n}\n.glyphicon-bookmark:before {\n  content: \"\\e044\";\n}\n.glyphicon-print:before {\n  content: \"\\e045\";\n}\n.glyphicon-camera:before {\n  content: \"\\e046\";\n}\n.glyphicon-font:before {\n  content: \"\\e047\";\n}\n.glyphicon-bold:before {\n  content: \"\\e048\";\n}\n.glyphicon-italic:before {\n  content: \"\\e049\";\n}\n.glyphicon-text-height:before {\n  content: \"\\e050\";\n}\n.glyphicon-text-width:before {\n  content: \"\\e051\";\n}\n.glyphicon-align-left:before {\n  content: \"\\e052\";\n}\n.glyphicon-align-center:before {\n  content: \"\\e053\";\n}\n.glyphicon-align-right:before {\n  content: \"\\e054\";\n}\n.glyphicon-align-justify:before {\n  content: \"\\e055\";\n}\n.glyphicon-list:before {\n  content: \"\\e056\";\n}\n.glyphicon-indent-left:before {\n  content: \"\\e057\";\n}\n.glyphicon-indent-right:before {\n  content: \"\\e058\";\n}\n.glyphicon-facetime-video:before {\n  content: \"\\e059\";\n}\n.glyphicon-picture:before {\n  content: \"\\e060\";\n}\n.glyphicon-map-marker:before {\n  content: \"\\e062\";\n}\n.glyphicon-adjust:before {\n  content: \"\\e063\";\n}\n.glyphicon-tint:before {\n  content: \"\\e064\";\n}\n.glyphicon-edit:before {\n  content: \"\\e065\";\n}\n.glyphicon-share:before {\n  content: \"\\e066\";\n}\n.glyphicon-check:before {\n  content: \"\\e067\";\n}\n.glyphicon-move:before {\n  content: \"\\e068\";\n}\n.glyphicon-step-backward:before {\n  content: \"\\e069\";\n}\n.glyphicon-fast-backward:before {\n  content: \"\\e070\";\n}\n.glyphicon-backward:before {\n  content: \"\\e071\";\n}\n.glyphicon-play:before {\n  content: \"\\e072\";\n}\n.glyphicon-pause:before {\n  content: \"\\e073\";\n}\n.glyphicon-stop:before {\n  content: \"\\e074\";\n}\n.glyphicon-forward:before {\n  content: \"\\e075\";\n}\n.glyphicon-fast-forward:before {\n  content: \"\\e076\";\n}\n.glyphicon-step-forward:before {\n  content: \"\\e077\";\n}\n.glyphicon-eject:before {\n  content: \"\\e078\";\n}\n.glyphicon-chevron-left:before {\n  content: \"\\e079\";\n}\n.glyphicon-chevron-right:before {\n  content: \"\\e080\";\n}\n.glyphicon-plus-sign:before {\n  content: \"\\e081\";\n}\n.glyphicon-minus-sign:before {\n  content: \"\\e082\";\n}\n.glyphicon-remove-sign:before {\n  content: \"\\e083\";\n}\n.glyphicon-ok-sign:before {\n  content: \"\\e084\";\n}\n.glyphicon-question-sign:before {\n  content: \"\\e085\";\n}\n.glyphicon-info-sign:before {\n  content: \"\\e086\";\n}\n.glyphicon-screenshot:before {\n  content: \"\\e087\";\n}\n.glyphicon-remove-circle:before {\n  content: \"\\e088\";\n}\n.glyphicon-ok-circle:before {\n  content: \"\\e089\";\n}\n.glyphicon-ban-circle:before {\n  content: \"\\e090\";\n}\n.glyphicon-arrow-left:before {\n  content: \"\\e091\";\n}\n.glyphicon-arrow-right:before {\n  content: \"\\e092\";\n}\n.glyphicon-arrow-up:before {\n  content: \"\\e093\";\n}\n.glyphicon-arrow-down:before {\n  content: \"\\e094\";\n}\n.glyphicon-share-alt:before {\n  content: \"\\e095\";\n}\n.glyphicon-resize-full:before {\n  content: \"\\e096\";\n}\n.glyphicon-resize-small:before {\n  content: \"\\e097\";\n}\n.glyphicon-exclamation-sign:before {\n  content: \"\\e101\";\n}\n.glyphicon-gift:before {\n  content: \"\\e102\";\n}\n.glyphicon-leaf:before {\n  content: \"\\e103\";\n}\n.glyphicon-fire:before {\n  content: \"\\e104\";\n}\n.glyphicon-eye-open:before {\n  content: \"\\e105\";\n}\n.glyphicon-eye-close:before {\n  content: \"\\e106\";\n}\n.glyphicon-warning-sign:before {\n  content: \"\\e107\";\n}\n.glyphicon-plane:before {\n  content: \"\\e108\";\n}\n.glyphicon-calendar:before {\n  content: \"\\e109\";\n}\n.glyphicon-random:before {\n  content: \"\\e110\";\n}\n.glyphicon-comment:before {\n  content: \"\\e111\";\n}\n.glyphicon-magnet:before {\n  content: \"\\e112\";\n}\n.glyphicon-chevron-up:before {\n  content: \"\\e113\";\n}\n.glyphicon-chevron-down:before {\n  content: \"\\e114\";\n}\n.glyphicon-retweet:before {\n  content: \"\\e115\";\n}\n.glyphicon-shopping-cart:before {\n  content: \"\\e116\";\n}\n.glyphicon-folder-close:before {\n  content: \"\\e117\";\n}\n.glyphicon-folder-open:before {\n  content: \"\\e118\";\n}\n.glyphicon-resize-vertical:before {\n  content: \"\\e119\";\n}\n.glyphicon-resize-horizontal:before {\n  content: \"\\e120\";\n}\n.glyphicon-hdd:before {\n  content: \"\\e121\";\n}\n.glyphicon-bullhorn:before {\n  content: \"\\e122\";\n}\n.glyphicon-bell:before {\n  content: \"\\e123\";\n}\n.glyphicon-certificate:before {\n  content: \"\\e124\";\n}\n.glyphicon-thumbs-up:before {\n  content: \"\\e125\";\n}\n.glyphicon-thumbs-down:before {\n  content: \"\\e126\";\n}\n.glyphicon-hand-right:before {\n  content: \"\\e127\";\n}\n.glyphicon-hand-left:before {\n  content: \"\\e128\";\n}\n.glyphicon-hand-up:before {\n  content: \"\\e129\";\n}\n.glyphicon-hand-down:before {\n  content: \"\\e130\";\n}\n.glyphicon-circle-arrow-right:before {\n  content: \"\\e131\";\n}\n.glyphicon-circle-arrow-left:before {\n  content: \"\\e132\";\n}\n.glyphicon-circle-arrow-up:before {\n  content: \"\\e133\";\n}\n.glyphicon-circle-arrow-down:before {\n  content: \"\\e134\";\n}\n.glyphicon-globe:before {\n  content: \"\\e135\";\n}\n.glyphicon-wrench:before {\n  content: \"\\e136\";\n}\n.glyphicon-tasks:before {\n  content: \"\\e137\";\n}\n.glyphicon-filter:before {\n  content: \"\\e138\";\n}\n.glyphicon-briefcase:before {\n  content: \"\\e139\";\n}\n.glyphicon-fullscreen:before {\n  content: \"\\e140\";\n}\n.glyphicon-dashboard:before {\n  content: \"\\e141\";\n}\n.glyphicon-paperclip:before {\n  content: \"\\e142\";\n}\n.glyphicon-heart-empty:before {\n  content: \"\\e143\";\n}\n.glyphicon-link:before {\n  content: \"\\e144\";\n}\n.glyphicon-phone:before {\n  content: \"\\e145\";\n}\n.glyphicon-pushpin:before {\n  content: \"\\e146\";\n}\n.glyphicon-usd:before {\n  content: \"\\e148\";\n}\n.glyphicon-gbp:before {\n  content: \"\\e149\";\n}\n.glyphicon-sort:before {\n  content: \"\\e150\";\n}\n.glyphicon-sort-by-alphabet:before {\n  content: \"\\e151\";\n}\n.glyphicon-sort-by-alphabet-alt:before {\n  content: \"\\e152\";\n}\n.glyphicon-sort-by-order:before {\n  content: \"\\e153\";\n}\n.glyphicon-sort-by-order-alt:before {\n  content: \"\\e154\";\n}\n.glyphicon-sort-by-attributes:before {\n  content: \"\\e155\";\n}\n.glyphicon-sort-by-attributes-alt:before {\n  content: \"\\e156\";\n}\n.glyphicon-unchecked:before {\n  content: \"\\e157\";\n}\n.glyphicon-expand:before {\n  content: \"\\e158\";\n}\n.glyphicon-collapse-down:before {\n  content: \"\\e159\";\n}\n.glyphicon-collapse-up:before {\n  content: \"\\e160\";\n}\n.glyphicon-log-in:before {\n  content: \"\\e161\";\n}\n.glyphicon-flash:before {\n  content: \"\\e162\";\n}\n.glyphicon-log-out:before {\n  content: \"\\e163\";\n}\n.glyphicon-new-window:before {\n  content: \"\\e164\";\n}\n.glyphicon-record:before {\n  content: \"\\e165\";\n}\n.glyphicon-save:before {\n  content: \"\\e166\";\n}\n.glyphicon-open:before {\n  content: \"\\e167\";\n}\n.glyphicon-saved:before {\n  content: \"\\e168\";\n}\n.glyphicon-import:before {\n  content: \"\\e169\";\n}\n.glyphicon-export:before {\n  content: \"\\e170\";\n}\n.glyphicon-send:before {\n  content: \"\\e171\";\n}\n.glyphicon-floppy-disk:before {\n  content: \"\\e172\";\n}\n.glyphicon-floppy-saved:before {\n  content: \"\\e173\";\n}\n.glyphicon-floppy-remove:before {\n  content: \"\\e174\";\n}\n.glyphicon-floppy-save:before {\n  content: \"\\e175\";\n}\n.glyphicon-floppy-open:before {\n  content: \"\\e176\";\n}\n.glyphicon-credit-card:before {\n  content: \"\\e177\";\n}\n.glyphicon-transfer:before {\n  content: \"\\e178\";\n}\n.glyphicon-cutlery:before {\n  content: \"\\e179\";\n}\n.glyphicon-header:before {\n  content: \"\\e180\";\n}\n.glyphicon-compressed:before {\n  content: \"\\e181\";\n}\n.glyphicon-earphone:before {\n  content: \"\\e182\";\n}\n.glyphicon-phone-alt:before {\n  content: \"\\e183\";\n}\n.glyphicon-tower:before {\n  content: \"\\e184\";\n}\n.glyphicon-stats:before {\n  content: \"\\e185\";\n}\n.glyphicon-sd-video:before {\n  content: \"\\e186\";\n}\n.glyphicon-hd-video:before {\n  content: \"\\e187\";\n}\n.glyphicon-subtitles:before {\n  content: \"\\e188\";\n}\n.glyphicon-sound-stereo:before {\n  content: \"\\e189\";\n}\n.glyphicon-sound-dolby:before {\n  content: \"\\e190\";\n}\n.glyphicon-sound-5-1:before {\n  content: \"\\e191\";\n}\n.glyphicon-sound-6-1:before {\n  content: \"\\e192\";\n}\n.glyphicon-sound-7-1:before {\n  content: \"\\e193\";\n}\n.glyphicon-copyright-mark:before {\n  content: \"\\e194\";\n}\n.glyphicon-registration-mark:before {\n  content: \"\\e195\";\n}\n.glyphicon-cloud-download:before {\n  content: \"\\e197\";\n}\n.glyphicon-cloud-upload:before {\n  content: \"\\e198\";\n}\n.glyphicon-tree-conifer:before {\n  content: \"\\e199\";\n}\n.glyphicon-tree-deciduous:before {\n  content: \"\\e200\";\n}\n.glyphicon-cd:before {\n  content: \"\\e201\";\n}\n.glyphicon-save-file:before {\n  content: \"\\e202\";\n}\n.glyphicon-open-file:before {\n  content: \"\\e203\";\n}\n.glyphicon-level-up:before {\n  content: \"\\e204\";\n}\n.glyphicon-copy:before {\n  content: \"\\e205\";\n}\n.glyphicon-paste:before {\n  content: \"\\e206\";\n}\n.glyphicon-alert:before {\n  content: \"\\e209\";\n}\n.glyphicon-equalizer:before {\n  content: \"\\e210\";\n}\n.glyphicon-king:before {\n  content: \"\\e211\";\n}\n.glyphicon-queen:before {\n  content: \"\\e212\";\n}\n.glyphicon-pawn:before {\n  content: \"\\e213\";\n}\n.glyphicon-bishop:before {\n  content: \"\\e214\";\n}\n.glyphicon-knight:before {\n  content: \"\\e215\";\n}\n.glyphicon-baby-formula:before {\n  content: \"\\e216\";\n}\n.glyphicon-tent:before {\n  content: \"\\26fa\";\n}\n.glyphicon-blackboard:before {\n  content: \"\\e218\";\n}\n.glyphicon-bed:before {\n  content: \"\\e219\";\n}\n.glyphicon-apple:before {\n  content: \"\\f8ff\";\n}\n.glyphicon-erase:before {\n  content: \"\\e221\";\n}\n.glyphicon-hourglass:before {\n  content: \"\\231b\";\n}\n.glyphicon-lamp:before {\n  content: \"\\e223\";\n}\n.glyphicon-duplicate:before {\n  content: \"\\e224\";\n}\n.glyphicon-piggy-bank:before {\n  content: \"\\e225\";\n}\n.glyphicon-scissors:before {\n  content: \"\\e226\";\n}\n.glyphicon-bitcoin:before {\n  content: \"\\e227\";\n}\n.glyphicon-btc:before {\n  content: \"\\e227\";\n}\n.glyphicon-xbt:before {\n  content: \"\\e227\";\n}\n.glyphicon-yen:before {\n  content: \"\\00a5\";\n}\n.glyphicon-jpy:before {\n  content: \"\\00a5\";\n}\n.glyphicon-ruble:before {\n  content: \"\\20bd\";\n}\n.glyphicon-rub:before {\n  content: \"\\20bd\";\n}\n.glyphicon-scale:before {\n  content: \"\\e230\";\n}\n.glyphicon-ice-lolly:before {\n  content: \"\\e231\";\n}\n.glyphicon-ice-lolly-tasted:before {\n  content: \"\\e232\";\n}\n.glyphicon-education:before {\n  content: \"\\e233\";\n}\n.glyphicon-option-horizontal:before {\n  content: \"\\e234\";\n}\n.glyphicon-option-vertical:before {\n  content: \"\\e235\";\n}\n.glyphicon-menu-hamburger:before {\n  content: \"\\e236\";\n}\n.glyphicon-modal-window:before {\n  content: \"\\e237\";\n}\n.glyphicon-oil:before {\n  content: \"\\e238\";\n}\n.glyphicon-grain:before {\n  content: \"\\e239\";\n}\n.glyphicon-sunglasses:before {\n  content: \"\\e240\";\n}\n.glyphicon-text-size:before {\n  content: \"\\e241\";\n}\n.glyphicon-text-color:before {\n  content: \"\\e242\";\n}\n.glyphicon-text-background:before {\n  content: \"\\e243\";\n}\n.glyphicon-object-align-top:before {\n  content: \"\\e244\";\n}\n.glyphicon-object-align-bottom:before {\n  content: \"\\e245\";\n}\n.glyphicon-object-align-horizontal:before {\n  content: \"\\e246\";\n}\n.glyphicon-object-align-left:before {\n  content: \"\\e247\";\n}\n.glyphicon-object-align-vertical:before {\n  content: \"\\e248\";\n}\n.glyphicon-object-align-right:before {\n  content: \"\\e249\";\n}\n.glyphicon-triangle-right:before {\n  content: \"\\e250\";\n}\n.glyphicon-triangle-left:before {\n  content: \"\\e251\";\n}\n.glyphicon-triangle-bottom:before {\n  content: \"\\e252\";\n}\n.glyphicon-triangle-top:before {\n  content: \"\\e253\";\n}\n.glyphicon-console:before {\n  content: \"\\e254\";\n}\n.glyphicon-superscript:before {\n  content: \"\\e255\";\n}\n.glyphicon-subscript:before {\n  content: \"\\e256\";\n}\n.glyphicon-menu-left:before {\n  content: \"\\e257\";\n}\n.glyphicon-menu-right:before {\n  content: \"\\e258\";\n}\n.glyphicon-menu-down:before {\n  content: \"\\e259\";\n}\n.glyphicon-menu-up:before {\n  content: \"\\e260\";\n}\n* {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n}\n*:before,\n*:after {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n}\nhtml {\n\n  font-size: .7em!important;\n  font-family: Verdana, Geneva, Tahoma, sans-serif;\n    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);\n}\nbody {\n  /*font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;*/\n  line-height: 1.42857143;\n  color: #333;\n  background-color: #fff;\n}\ninput,\nbutton,\nselect,\ntextarea {\n  font-family: inherit;\n  font-size: inherit;\n  line-height: inherit;\n}\na {\n  color: #337ab7;\n  text-decoration: none;\n}\na:hover,\na:focus {\n  color: #23527c;\n  text-decoration: underline;\n}\na:focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\nfigure {\n  margin: 0;\n}\nimg {\n  vertical-align: middle;\n}\n.img-responsive,\n.thumbnail > img,\n.thumbnail a > img,\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  display: block;\n  max-width: 100%;\n  height: auto;\n}\n.img-rounded {\n  border-radius: 6px;\n}\n.img-thumbnail {\n  display: inline-block;\n  max-width: 100%;\n  height: auto;\n  padding: 4px;\n  line-height: 1.42857143;\n  background-color: #fff;\n  border: 1px solid #a4d4e6;\n  border-radius: 4px;\n  -webkit-transition: all .2s ease-in-out;\n       -o-transition: all .2s ease-in-out;\n          transition: all .2s ease-in-out;\n}\n.img-circle {\n  border-radius: 50%;\n}\nhr {\n  margin-top: 20px;\n  margin-bottom: 20px;\n  border: 0;\n  border-top: 1px solid #eee;\n}\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n.sr-only-focusable:active,\n.sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n[role=\"button\"] {\n  cursor: pointer;\n}\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\n.h1,\n.h2,\n.h3,\n.h4,\n.h5,\n.h6 {\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit;\n}\nh1 small,\nh2 small,\nh3 small,\nh4 small,\nh5 small,\nh6 small,\n.h1 small,\n.h2 small,\n.h3 small,\n.h4 small,\n.h5 small,\n.h6 small,\nh1 .small,\nh2 .small,\nh3 .small,\nh4 .small,\nh5 .small,\nh6 .small,\n.h1 .small,\n.h2 .small,\n.h3 .small,\n.h4 .small,\n.h5 .small,\n.h6 .small {\n  font-weight: normal;\n  line-height: 1;\n  color: #160000;\n}\nh1,\n.h1,\nh2,\n.h2,\nh3,\n.h3 {\n  margin-top: 20px;\n  margin-bottom: 10px;\n}\nh1 small,\n.h1 small,\nh2 small,\n.h2 small,\nh3 small,\n.h3 small,\nh1 .small,\n.h1 .small,\nh2 .small,\n.h2 .small,\nh3 .small,\n.h3 .small {\n  font-size: 65%;\n}\nh4,\n.h4,\nh5,\n.h5,\nh6,\n.h6 {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\nh4 small,\n.h4 small,\nh5 small,\n.h5 small,\nh6 small,\n.h6 small,\nh4 .small,\n.h4 .small,\nh5 .small,\n.h5 .small,\nh6 .small,\n.h6 .small {\n  font-size: 75%;\n}\nh1,\n.h1 {\n  font-size: 36px;\n}\nh2,\n.h2 {\n  font-size: 30px;\n}\nh3,\n.h3 {\n  font-size: 24px;\n}\nh4,\n.h4 {\n  font-size: 18px;\n}\nh5,\n.h5 {\n  font-size: 14px;\n}\nh6,\n.h6 {\n  font-size: 12px;\n}\np {\n  margin: 0 0 10px;\n}\n.lead {\n  margin-bottom: 20px;\n  font-size: 16px;\n  font-weight: 300;\n  line-height: 1.4;\n}\n@media (min-width: 768px) {\n  .lead {\n    font-size: 21px;\n  }\n}\nsmall,\n.small {\n  font-size: 85%;\n}\nmark,\n.mark {\n  padding: .2em;\n  background-color: #fcf8e3;\n}\n.text-left {\n  text-align: left;\n}\n.text-right {\n  text-align: right;\n}\n.text-center {\n  text-align: center;\n}\n.text-justify {\n  text-align: justify;\n}\n.text-nowrap {\n  white-space: nowrap;\n}\n.text-lowercase {\n  text-transform: lowercase;\n}\n.text-uppercase {\n  text-transform: uppercase;\n}\n.text-capitalize {\n  text-transform: capitalize;\n}\n.text-muted {\n  color: #160000;\n}\n.text-primary {\n  color: #337ab7;\n}\na.text-primary:hover,\na.text-primary:focus {\n  color: #286090;\n}\n.text-success {\n  color: #3c763d;\n}\na.text-success:hover,\na.text-success:focus {\n  color: #2b542c;\n}\n.text-info {\n  color: #31708f;\n}\na.text-info:hover,\na.text-info:focus {\n  color: #245269;\n}\n.text-warning {\n  color: #8a6d3b;\n}\na.text-warning:hover,\na.text-warning:focus {\n  color: #66512c;\n}\n.text-danger {\n  color: #a94442;\n}\na.text-danger:hover,\na.text-danger:focus {\n  color: #843534;\n}\n.bg-primary {\n  color: #fff;\n  background-color: #337ab7;\n}\na.bg-primary:hover,\na.bg-primary:focus {\n  background-color: #286090;\n}\n.bg-success {\n  background-color: #dff0d8;\n}\na.bg-success:hover,\na.bg-success:focus {\n  background-color: #c1e2b3;\n}\n.bg-info {\n  background-color: #d9edf7;\n}\na.bg-info:hover,\na.bg-info:focus {\n  background-color: #afd9ee;\n}\n.bg-warning {\n  background-color: #fcf8e3;\n}\na.bg-warning:hover,\na.bg-warning:focus {\n  background-color: #f7ecb5;\n}\n.bg-danger {\n  background-color: #f2dede;\n}\na.bg-danger:hover,\na.bg-danger:focus {\n  background-color: #e4b9b9;\n}\n.page-header {\n  padding-bottom: 9px;\n  margin: 40px 0 20px;\n  border-bottom: 1px solid #eee;\n}\nul,\nol {\n  margin-top: 0;\n  margin-bottom: 10px;\n}\nul ul,\nol ul,\nul ol,\nol ol {\n  margin-bottom: 0;\n}\n.list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n.list-inline {\n  padding-left: 0;\n  margin-left: -5px;\n  list-style: none;\n}\n.list-inline > li {\n  display: inline-block;\n  padding-right: 5px;\n  padding-left: 5px;\n}\ndl {\n  margin-top: 0;\n  margin-bottom: 20px;\n}\ndt,\ndd {\n  line-height: 1.42857143;\n}\ndt {\n  font-weight: bold;\n}\ndd {\n  margin-left: 0;\n}\n@media (min-width: 768px) {\n  .dl-horizontal dt {\n    float: left;\n    width: 160px;\n    overflow: hidden;\n    clear: left;\n    text-align: right;\n    text-overflow: ellipsis;\n    white-space: nowrap;\n  }\n  .dl-horizontal dd {\n    margin-left: 180px;\n  }\n}\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #160000;\n}\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase;\n}\nblockquote {\n  padding: 10px 20px;\n  margin: 0 0 20px;\n  font-size: 17.5px;\n  border-left: 5px solid #eee;\n}\nblockquote p:last-child,\nblockquote ul:last-child,\nblockquote ol:last-child {\n  margin-bottom: 0;\n}\nblockquote footer,\nblockquote small,\nblockquote .small {\n  display: block;\n  font-size: 80%;\n  line-height: 1.42857143;\n  color: #160000;\n}\nblockquote footer:before,\nblockquote small:before,\nblockquote .small:before {\n  content: '\\2014 \\00A0';\n}\n.blockquote-reverse,\nblockquote.pull-right {\n  padding-right: 15px;\n  padding-left: 0;\n  text-align: right;\n  border-right: 5px solid #eee;\n  border-left: 0;\n}\n.blockquote-reverse footer:before,\nblockquote.pull-right footer:before,\n.blockquote-reverse small:before,\nblockquote.pull-right small:before,\n.blockquote-reverse .small:before,\nblockquote.pull-right .small:before {\n  content: '';\n}\n.blockquote-reverse footer:after,\nblockquote.pull-right footer:after,\n.blockquote-reverse small:after,\nblockquote.pull-right small:after,\n.blockquote-reverse .small:after,\nblockquote.pull-right .small:after {\n  content: '\\00A0 \\2014';\n}\naddress {\n  margin-bottom: 20px;\n  font-style: normal;\n  line-height: 1.42857143;\n}\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Courier New\", monospace;\n}\ncode {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #c7254e;\n  background-color: #f9f2f4;\n  border-radius: 4px;\n}\nkbd {\n  padding: 2px 4px;\n  font-size: 90%;\n  color: #fff;\n  background-color: #333;\n  border-radius: 3px;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);\n          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .25);\n}\nkbd kbd {\n  padding: 0;\n  font-size: 100%;\n  font-weight: bold;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\npre {\n  display: block;\n  padding: 9.5px;\n  margin: 0 0 10px;\n  font-size: 13px;\n  line-height: 1.42857143;\n  color: #333;\n  word-break: break-all;\n  word-wrap: break-word;\n  background-color: #d0f3fF;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\npre code {\n  padding: 0;\n  font-size: inherit;\n  color: inherit;\n  white-space: pre-wrap;\n  background-color: transparent;\n  border-radius: 0;\n}\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n.container {\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto;\n}\n@media (min-width: 768px) {\n  .container {\n    width: 750px;\n  }\n}\n@media (min-width: 992px) {\n  .container {\n    width: 970px;\n  }\n}\n@media (min-width: 1200px) {\n  .container {\n    width: 1170px;\n  }\n}\n.container-fluid {\n  padding-right: 15px;\n  padding-left: 15px;\n  margin-right: auto;\n  margin-left: auto;\n}\n.row {\n  margin-right: -15px;\n  margin-left: -15px;\n}\n.col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {\n  position: relative;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n.col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12 {\n  float: left;\n}\n.col-xs-12 {\n  width: 100%;\n}\n.col-xs-11 {\n  width: 91.66666667%;\n}\n.col-xs-10 {\n  width: 83.33333333%;\n}\n.col-xs-9 {\n  width: 75%;\n}\n.col-xs-8 {\n  width: 66.66666667%;\n}\n.col-xs-7 {\n  width: 58.33333333%;\n}\n.col-xs-6 {\n  width: 50%;\n}\n.col-xs-5 {\n  width: 41.66666667%;\n}\n.col-xs-4 {\n  width: 33.33333333%;\n}\n.col-xs-3 {\n  width: 25%;\n}\n.col-xs-2 {\n  width: 16.66666667%;\n}\n.col-xs-1 {\n  width: 8.33333333%;\n}\n.col-xs-pull-12 {\n  right: 100%;\n}\n.col-xs-pull-11 {\n  right: 91.66666667%;\n}\n.col-xs-pull-10 {\n  right: 83.33333333%;\n}\n.col-xs-pull-9 {\n  right: 75%;\n}\n.col-xs-pull-8 {\n  right: 66.66666667%;\n}\n.col-xs-pull-7 {\n  right: 58.33333333%;\n}\n.col-xs-pull-6 {\n  right: 50%;\n}\n.col-xs-pull-5 {\n  right: 41.66666667%;\n}\n.col-xs-pull-4 {\n  right: 33.33333333%;\n}\n.col-xs-pull-3 {\n  right: 25%;\n}\n.col-xs-pull-2 {\n  right: 16.66666667%;\n}\n.col-xs-pull-1 {\n  right: 8.33333333%;\n}\n.col-xs-pull-0 {\n  right: auto;\n}\n.col-xs-push-12 {\n  left: 100%;\n}\n.col-xs-push-11 {\n  left: 91.66666667%;\n}\n.col-xs-push-10 {\n  left: 83.33333333%;\n}\n.col-xs-push-9 {\n  left: 75%;\n}\n.col-xs-push-8 {\n  left: 66.66666667%;\n}\n.col-xs-push-7 {\n  left: 58.33333333%;\n}\n.col-xs-push-6 {\n  left: 50%;\n}\n.col-xs-push-5 {\n  left: 41.66666667%;\n}\n.col-xs-push-4 {\n  left: 33.33333333%;\n}\n.col-xs-push-3 {\n  left: 25%;\n}\n.col-xs-push-2 {\n  left: 16.66666667%;\n}\n.col-xs-push-1 {\n  left: 8.33333333%;\n}\n.col-xs-push-0 {\n  left: auto;\n}\n.col-xs-offset-12 {\n  margin-left: 100%;\n}\n.col-xs-offset-11 {\n  margin-left: 91.66666667%;\n}\n.col-xs-offset-10 {\n  margin-left: 83.33333333%;\n}\n.col-xs-offset-9 {\n  margin-left: 75%;\n}\n.col-xs-offset-8 {\n  margin-left: 66.66666667%;\n}\n.col-xs-offset-7 {\n  margin-left: 58.33333333%;\n}\n.col-xs-offset-6 {\n  margin-left: 50%;\n}\n.col-xs-offset-5 {\n  margin-left: 41.66666667%;\n}\n.col-xs-offset-4 {\n  margin-left: 33.33333333%;\n}\n.col-xs-offset-3 {\n  margin-left: 25%;\n}\n.col-xs-offset-2 {\n  margin-left: 16.66666667%;\n}\n.col-xs-offset-1 {\n  margin-left: 8.33333333%;\n}\n.col-xs-offset-0 {\n  margin-left: 0;\n}\n@media (min-width: 768px) {\n  .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12 {\n    float: left;\n  }\n  .col-sm-12 {\n    width: 100%;\n  }\n  .col-sm-11 {\n    width: 91.66666667%;\n  }\n  .col-sm-10 {\n    width: 83.33333333%;\n  }\n  .col-sm-9 {\n    width: 75%;\n  }\n  .col-sm-8 {\n    width: 66.66666667%;\n  }\n  .col-sm-7 {\n    width: 58.33333333%;\n  }\n  .col-sm-6 {\n    width: 50%;\n  }\n  .col-sm-5 {\n    width: 41.66666667%;\n  }\n  .col-sm-4 {\n    width: 33.33333333%;\n  }\n  .col-sm-3 {\n    width: 25%;\n  }\n  .col-sm-2 {\n    width: 16.66666667%;\n  }\n  .col-sm-1 {\n    width: 8.33333333%;\n  }\n  .col-sm-pull-12 {\n    right: 100%;\n  }\n  .col-sm-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-sm-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-sm-pull-9 {\n    right: 75%;\n  }\n  .col-sm-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-sm-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-sm-pull-6 {\n    right: 50%;\n  }\n  .col-sm-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-sm-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-sm-pull-3 {\n    right: 25%;\n  }\n  .col-sm-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-sm-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-sm-pull-0 {\n    right: auto;\n  }\n  .col-sm-push-12 {\n    left: 100%;\n  }\n  .col-sm-push-11 {\n    left: 91.66666667%;\n  }\n  .col-sm-push-10 {\n    left: 83.33333333%;\n  }\n  .col-sm-push-9 {\n    left: 75%;\n  }\n  .col-sm-push-8 {\n    left: 66.66666667%;\n  }\n  .col-sm-push-7 {\n    left: 58.33333333%;\n  }\n  .col-sm-push-6 {\n    left: 50%;\n  }\n  .col-sm-push-5 {\n    left: 41.66666667%;\n  }\n  .col-sm-push-4 {\n    left: 33.33333333%;\n  }\n  .col-sm-push-3 {\n    left: 25%;\n  }\n  .col-sm-push-2 {\n    left: 16.66666667%;\n  }\n  .col-sm-push-1 {\n    left: 8.33333333%;\n  }\n  .col-sm-push-0 {\n    left: auto;\n  }\n  .col-sm-offset-12 {\n    margin-left: 100%;\n  }\n  .col-sm-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-sm-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-sm-offset-9 {\n    margin-left: 75%;\n  }\n  .col-sm-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-sm-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-sm-offset-6 {\n    margin-left: 50%;\n  }\n  .col-sm-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-sm-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-sm-offset-3 {\n    margin-left: 25%;\n  }\n  .col-sm-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-sm-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-sm-offset-0 {\n    margin-left: 0;\n  }\n}\n@media (min-width: 992px) {\n  .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12 {\n    float: left;\n  }\n  .col-md-12 {\n    width: 100%;\n  }\n  .col-md-11 {\n    width: 91.66666667%;\n  }\n  .col-md-10 {\n    width: 83.33333333%;\n  }\n  .col-md-9 {\n    width: 75%;\n  }\n  .col-md-8 {\n    width: 66.66666667%;\n  }\n  .col-md-7 {\n    width: 58.33333333%;\n  }\n  .col-md-6 {\n    width: 50%;\n  }\n  .col-md-5 {\n    width: 41.66666667%;\n  }\n  .col-md-4 {\n    width: 33.33333333%;\n  }\n  .col-md-3 {\n    width: 25%;\n  }\n  .col-md-2 {\n    width: 16.66666667%;\n  }\n  .col-md-1 {\n    width: 8.33333333%;\n  }\n  .col-md-pull-12 {\n    right: 100%;\n  }\n  .col-md-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-md-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-md-pull-9 {\n    right: 75%;\n  }\n  .col-md-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-md-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-md-pull-6 {\n    right: 50%;\n  }\n  .col-md-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-md-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-md-pull-3 {\n    right: 25%;\n  }\n  .col-md-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-md-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-md-pull-0 {\n    right: auto;\n  }\n  .col-md-push-12 {\n    left: 100%;\n  }\n  .col-md-push-11 {\n    left: 91.66666667%;\n  }\n  .col-md-push-10 {\n    left: 83.33333333%;\n  }\n  .col-md-push-9 {\n    left: 75%;\n  }\n  .col-md-push-8 {\n    left: 66.66666667%;\n  }\n  .col-md-push-7 {\n    left: 58.33333333%;\n  }\n  .col-md-push-6 {\n    left: 50%;\n  }\n  .col-md-push-5 {\n    left: 41.66666667%;\n  }\n  .col-md-push-4 {\n    left: 33.33333333%;\n  }\n  .col-md-push-3 {\n    left: 25%;\n  }\n  .col-md-push-2 {\n    left: 16.66666667%;\n  }\n  .col-md-push-1 {\n    left: 8.33333333%;\n  }\n  .col-md-push-0 {\n    left: auto;\n  }\n  .col-md-offset-12 {\n    margin-left: 100%;\n  }\n  .col-md-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-md-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-md-offset-9 {\n    margin-left: 75%;\n  }\n  .col-md-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-md-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-md-offset-6 {\n    margin-left: 50%;\n  }\n  .col-md-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-md-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-md-offset-3 {\n    margin-left: 25%;\n  }\n  .col-md-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-md-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-md-offset-0 {\n    margin-left: 0;\n  }\n}\n@media (min-width: 1200px) {\n  .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12 {\n    float: left;\n  }\n  .col-lg-12 {\n    width: 100%;\n  }\n  .col-lg-11 {\n    width: 91.66666667%;\n  }\n  .col-lg-10 {\n    width: 83.33333333%;\n  }\n  .col-lg-9 {\n    width: 75%;\n  }\n  .col-lg-8 {\n    width: 66.66666667%;\n  }\n  .col-lg-7 {\n    width: 58.33333333%;\n  }\n  .col-lg-6 {\n    width: 50%;\n  }\n  .col-lg-5 {\n    width: 41.66666667%;\n  }\n  .col-lg-4 {\n    width: 33.33333333%;\n  }\n  .col-lg-3 {\n    width: 25%;\n  }\n  .col-lg-2 {\n    width: 16.66666667%;\n  }\n  .col-lg-1 {\n    width: 8.33333333%;\n  }\n  .col-lg-pull-12 {\n    right: 100%;\n  }\n  .col-lg-pull-11 {\n    right: 91.66666667%;\n  }\n  .col-lg-pull-10 {\n    right: 83.33333333%;\n  }\n  .col-lg-pull-9 {\n    right: 75%;\n  }\n  .col-lg-pull-8 {\n    right: 66.66666667%;\n  }\n  .col-lg-pull-7 {\n    right: 58.33333333%;\n  }\n  .col-lg-pull-6 {\n    right: 50%;\n  }\n  .col-lg-pull-5 {\n    right: 41.66666667%;\n  }\n  .col-lg-pull-4 {\n    right: 33.33333333%;\n  }\n  .col-lg-pull-3 {\n    right: 25%;\n  }\n  .col-lg-pull-2 {\n    right: 16.66666667%;\n  }\n  .col-lg-pull-1 {\n    right: 8.33333333%;\n  }\n  .col-lg-pull-0 {\n    right: auto;\n  }\n  .col-lg-push-12 {\n    left: 100%;\n  }\n  .col-lg-push-11 {\n    left: 91.66666667%;\n  }\n  .col-lg-push-10 {\n    left: 83.33333333%;\n  }\n  .col-lg-push-9 {\n    left: 75%;\n  }\n  .col-lg-push-8 {\n    left: 66.66666667%;\n  }\n  .col-lg-push-7 {\n    left: 58.33333333%;\n  }\n  .col-lg-push-6 {\n    left: 50%;\n  }\n  .col-lg-push-5 {\n    left: 41.66666667%;\n  }\n  .col-lg-push-4 {\n    left: 33.33333333%;\n  }\n  .col-lg-push-3 {\n    left: 25%;\n  }\n  .col-lg-push-2 {\n    left: 16.66666667%;\n  }\n  .col-lg-push-1 {\n    left: 8.33333333%;\n  }\n  .col-lg-push-0 {\n    left: auto;\n  }\n  .col-lg-offset-12 {\n    margin-left: 100%;\n  }\n  .col-lg-offset-11 {\n    margin-left: 91.66666667%;\n  }\n  .col-lg-offset-10 {\n    margin-left: 83.33333333%;\n  }\n  .col-lg-offset-9 {\n    margin-left: 75%;\n  }\n  .col-lg-offset-8 {\n    margin-left: 66.66666667%;\n  }\n  .col-lg-offset-7 {\n    margin-left: 58.33333333%;\n  }\n  .col-lg-offset-6 {\n    margin-left: 50%;\n  }\n  .col-lg-offset-5 {\n    margin-left: 41.66666667%;\n  }\n  .col-lg-offset-4 {\n    margin-left: 33.33333333%;\n  }\n  .col-lg-offset-3 {\n    margin-left: 25%;\n  }\n  .col-lg-offset-2 {\n    margin-left: 16.66666667%;\n  }\n  .col-lg-offset-1 {\n    margin-left: 8.33333333%;\n  }\n  .col-lg-offset-0 {\n    margin-left: 0;\n  }\n}\ntable {\n  background-color: transparent;\n}\ncaption {\n  padding-top: 8px;\n  padding-bottom: 8px;\n  color: #160000;\n  text-align: left;\n}\nth {\n  text-align: left;\n}\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 20px;\n}\n.table > thead > tr > th,\n.table > tbody > tr > th,\n.table > tfoot > tr > th,\n.table > thead > tr > td,\n.table > tbody > tr > td,\n.table > tfoot > tr > td {\n  padding: 8px;\n  line-height: 1.42857143;\n  vertical-align: top;\n  border-top: 1px solid #a4d4e6;\n}\n.table > thead > tr > th {\n  vertical-align: bottom;\n  border-bottom: 2px solid #a4d4e6;\n}\n.table > caption + thead > tr:first-child > th,\n.table > colgroup + thead > tr:first-child > th,\n.table > thead:first-child > tr:first-child > th,\n.table > caption + thead > tr:first-child > td,\n.table > colgroup + thead > tr:first-child > td,\n.table > thead:first-child > tr:first-child > td {\n  border-top: 0;\n}\n.table > tbody + tbody {\n  border-top: 2px solid #a4d4e6;\n}\n.table .table {\n  background-color: #fff;\n}\n.table-condensed > thead > tr > th,\n.table-condensed > tbody > tr > th,\n.table-condensed > tfoot > tr > th,\n.table-condensed > thead > tr > td,\n.table-condensed > tbody > tr > td,\n.table-condensed > tfoot > tr > td {\n  padding: 5px;\n}\n.table-bordered {\n  border: 1px solid #a4d4e6;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > tbody > tr > th,\n.table-bordered > tfoot > tr > th,\n.table-bordered > thead > tr > td,\n.table-bordered > tbody > tr > td,\n.table-bordered > tfoot > tr > td {\n  border: 1px solid #a4d4e6;\n}\n.table-bordered > thead > tr > th,\n.table-bordered > thead > tr > td {\n  border-bottom-width: 2px;\n}\n.table-striped > tbody > tr:nth-of-type(odd) {\n  background-color: #CCF4FF;\n  /*#CFEFFA*/\n}\n.table-hover > tbody > tr:hover {\n  background-color: #CFF4FF;\n}\ntable col[class*=\"col-\"] {\n  position: static;\n  display: table-column;\n  float: none;\n}\ntable td[class*=\"col-\"],\ntable th[class*=\"col-\"] {\n  position: static;\n  display: table-cell;\n  float: none;\n}\n.table > thead > tr > td.active,\n.table > tbody > tr > td.active,\n.table > tfoot > tr > td.active,\n.table > thead > tr > th.active,\n.table > tbody > tr > th.active,\n.table > tfoot > tr > th.active,\n.table > thead > tr.active > td,\n.table > tbody > tr.active > td,\n.table > tfoot > tr.active > td,\n.table > thead > tr.active > th,\n.table > tbody > tr.active > th,\n.table > tfoot > tr.active > th {\n  background-color: #d0f3fF;\n}\n.table-hover > tbody > tr > td.active:hover,\n.table-hover > tbody > tr > th.active:hover,\n.table-hover > tbody > tr.active:hover > td,\n.table-hover > tbody > tr:hover > .active,\n.table-hover > tbody > tr.active:hover > th {\n  background-color: #e8e8e8;\n}\n.table > thead > tr > td.success,\n.table > tbody > tr > td.success,\n.table > tfoot > tr > td.success,\n.table > thead > tr > th.success,\n.table > tbody > tr > th.success,\n.table > tfoot > tr > th.success,\n.table > thead > tr.success > td,\n.table > tbody > tr.success > td,\n.table > tfoot > tr.success > td,\n.table > thead > tr.success > th,\n.table > tbody > tr.success > th,\n.table > tfoot > tr.success > th {\n  background-color: #dff0d8;\n}\n.table-hover > tbody > tr > td.success:hover,\n.table-hover > tbody > tr > th.success:hover,\n.table-hover > tbody > tr.success:hover > td,\n.table-hover > tbody > tr:hover > .success,\n.table-hover > tbody > tr.success:hover > th {\n  background-color: #d0e9c6;\n}\n.table > thead > tr > td.info,\n.table > tbody > tr > td.info,\n.table > tfoot > tr > td.info,\n.table > thead > tr > th.info,\n.table > tbody > tr > th.info,\n.table > tfoot > tr > th.info,\n.table > thead > tr.info > td,\n.table > tbody > tr.info > td,\n.table > tfoot > tr.info > td,\n.table > thead > tr.info > th,\n.table > tbody > tr.info > th,\n.table > tfoot > tr.info > th {\n  background-color: #d9edf7;\n}\n.table-hover > tbody > tr > td.info:hover,\n.table-hover > tbody > tr > th.info:hover,\n.table-hover > tbody > tr.info:hover > td,\n.table-hover > tbody > tr:hover > .info,\n.table-hover > tbody > tr.info:hover > th {\n  background-color: #c4e3f3;\n}\n.table > thead > tr > td.warning,\n.table > tbody > tr > td.warning,\n.table > tfoot > tr > td.warning,\n.table > thead > tr > th.warning,\n.table > tbody > tr > th.warning,\n.table > tfoot > tr > th.warning,\n.table > thead > tr.warning > td,\n.table > tbody > tr.warning > td,\n.table > tfoot > tr.warning > td,\n.table > thead > tr.warning > th,\n.table > tbody > tr.warning > th,\n.table > tfoot > tr.warning > th {\n  background-color: #fcf8e3;\n}\n.table-hover > tbody > tr > td.warning:hover,\n.table-hover > tbody > tr > th.warning:hover,\n.table-hover > tbody > tr.warning:hover > td,\n.table-hover > tbody > tr:hover > .warning,\n.table-hover > tbody > tr.warning:hover > th {\n  background-color: #faf2cc;\n}\n.table > thead > tr > td.danger,\n.table > tbody > tr > td.danger,\n.table > tfoot > tr > td.danger,\n.table > thead > tr > th.danger,\n.table > tbody > tr > th.danger,\n.table > tfoot > tr > th.danger,\n.table > thead > tr.danger > td,\n.table > tbody > tr.danger > td,\n.table > tfoot > tr.danger > td,\n.table > thead > tr.danger > th,\n.table > tbody > tr.danger > th,\n.table > tfoot > tr.danger > th {\n  background-color: #f2dede;\n}\n.table-hover > tbody > tr > td.danger:hover,\n.table-hover > tbody > tr > th.danger:hover,\n.table-hover > tbody > tr.danger:hover > td,\n.table-hover > tbody > tr:hover > .danger,\n.table-hover > tbody > tr.danger:hover > th {\n  background-color: #ebcccc;\n}\n.table-responsive {\n  min-height: .01%;\n  overflow-x: auto;\n}\n@media screen and (max-width: 767px) {\n  .table-responsive {\n    width: 100%;\n    margin-bottom: 15px;\n    overflow-y: hidden;\n    -ms-overflow-style: -ms-autohiding-scrollbar;\n    border: 1px solid #a4d4e6;\n  }\n  .table-responsive > .table {\n    margin-bottom: 0;\n  }\n  .table-responsive > .table > thead > tr > th,\n  .table-responsive > .table > tbody > tr > th,\n  .table-responsive > .table > tfoot > tr > th,\n  .table-responsive > .table > thead > tr > td,\n  .table-responsive > .table > tbody > tr > td,\n  .table-responsive > .table > tfoot > tr > td {\n    white-space: nowrap;\n  }\n  .table-responsive > .table-bordered {\n    border: 0;\n  }\n  .table-responsive > .table-bordered > thead > tr > th:first-child,\n  .table-responsive > .table-bordered > tbody > tr > th:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n  .table-responsive > .table-bordered > thead > tr > td:first-child,\n  .table-responsive > .table-bordered > tbody > tr > td:first-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n    border-left: 0;\n  }\n  .table-responsive > .table-bordered > thead > tr > th:last-child,\n  .table-responsive > .table-bordered > tbody > tr > th:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n  .table-responsive > .table-bordered > thead > tr > td:last-child,\n  .table-responsive > .table-bordered > tbody > tr > td:last-child,\n  .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n    border-right: 0;\n  }\n  .table-responsive > .table-bordered > tbody > tr:last-child > th,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > th,\n  .table-responsive > .table-bordered > tbody > tr:last-child > td,\n  .table-responsive > .table-bordered > tfoot > tr:last-child > td {\n    border-bottom: 0;\n  }\n}\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: 20px;\n  font-size: 21px;\n  line-height: inherit;\n  color: #333;\n  border: 0;\n  border-bottom: 1px solid #e5e5e5;\n}\nlabel {\n  display: inline-block;\n  max-width: 100%;\n  margin-bottom: 5px;\n  font-weight: bold;\n}\ninput[type=\"search\"] {\n  -webkit-box-sizing: border-box;\n     -moz-box-sizing: border-box;\n          box-sizing: border-box;\n}\ninput[type=\"radio\"],\ninput[type=\"checkbox\"] {\n  margin: 4px 0 0;\n  margin-top: 1px \\9;\n  line-height: normal;\n}\ninput[type=\"file\"] {\n  display: block;\n}\ninput[type=\"range\"] {\n  display: block;\n  width: 100%;\n}\nselect[multiple],\nselect[size] {\n  height: auto;\n}\ninput[type=\"file\"]:focus,\ninput[type=\"radio\"]:focus,\ninput[type=\"checkbox\"]:focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\noutput {\n  display: block;\n  padding-top: 7px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #555;\n}\n.form-control {\n  display: block;\n  width: 100%;\n  height: 34px;\n  padding: 6px 12px;\n  font-size: 14px;\n  line-height: 1.42857143;\n  color: #555;\n  background-color: #fff;\n  background-image: none;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n  -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;\n       -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n          transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n}\n.form-control:focus {\n  border-color: #66afe9;\n  outline: 0;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);\n          box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);\n}\n.form-control::-moz-placeholder {\n  color: #999;\n  opacity: 1;\n}\n.form-control:-ms-input-placeholder {\n  color: #999;\n}\n.form-control::-webkit-input-placeholder {\n  color: #999;\n}\n.form-control[disabled],\n.form-control[readonly],\nfieldset[disabled] .form-control {\n  background-color: #eee;\n  opacity: 1;\n}\n.form-control[disabled],\nfieldset[disabled] .form-control {\n  cursor: not-allowed;\n}\ntextarea.form-control {\n  height: auto;\n}\ninput[type=\"search\"] {\n  -webkit-appearance: none;\n}\n@media screen and (-webkit-min-device-pixel-ratio: 0) {\n  input[type=\"date\"].form-control,\n  input[type=\"time\"].form-control,\n  input[type=\"datetime-local\"].form-control,\n  input[type=\"month\"].form-control {\n    line-height: 34px;\n  }\n  input[type=\"date\"].input-sm,\n  input[type=\"time\"].input-sm,\n  input[type=\"datetime-local\"].input-sm,\n  input[type=\"month\"].input-sm,\n  .input-group-sm input[type=\"date\"],\n  .input-group-sm input[type=\"time\"],\n  .input-group-sm input[type=\"datetime-local\"],\n  .input-group-sm input[type=\"month\"] {\n    line-height: 30px;\n  }\n  input[type=\"date\"].input-lg,\n  input[type=\"time\"].input-lg,\n  input[type=\"datetime-local\"].input-lg,\n  input[type=\"month\"].input-lg,\n  .input-group-lg input[type=\"date\"],\n  .input-group-lg input[type=\"time\"],\n  .input-group-lg input[type=\"datetime-local\"],\n  .input-group-lg input[type=\"month\"] {\n    line-height: 46px;\n  }\n}\n.form-group {\n  margin-bottom: 15px;\n}\n.radio,\n.checkbox {\n  position: relative;\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.radio label,\n.checkbox label {\n  min-height: 20px;\n  padding-left: 20px;\n  margin-bottom: 0;\n  font-weight: normal;\n  cursor: pointer;\n}\n.radio input[type=\"radio\"],\n.radio-inline input[type=\"radio\"],\n.checkbox input[type=\"checkbox\"],\n.checkbox-inline input[type=\"checkbox\"] {\n  position: absolute;\n  margin-top: 4px \\9;\n  margin-left: -20px;\n}\n.radio + .radio,\n.checkbox + .checkbox {\n  margin-top: -5px;\n}\n.radio-inline,\n.checkbox-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 20px;\n  margin-bottom: 0;\n  font-weight: normal;\n  vertical-align: middle;\n  cursor: pointer;\n}\n.radio-inline + .radio-inline,\n.checkbox-inline + .checkbox-inline {\n  margin-top: 0;\n  margin-left: 10px;\n}\ninput[type=\"radio\"][disabled],\ninput[type=\"checkbox\"][disabled],\ninput[type=\"radio\"].disabled,\ninput[type=\"checkbox\"].disabled,\nfieldset[disabled] input[type=\"radio\"],\nfieldset[disabled] input[type=\"checkbox\"] {\n  cursor: not-allowed;\n}\n.radio-inline.disabled,\n.checkbox-inline.disabled,\nfieldset[disabled] .radio-inline,\nfieldset[disabled] .checkbox-inline {\n  cursor: not-allowed;\n}\n.radio.disabled label,\n.checkbox.disabled label,\nfieldset[disabled] .radio label,\nfieldset[disabled] .checkbox label {\n  cursor: not-allowed;\n}\n.form-control-static {\n  min-height: 34px;\n  padding-top: 7px;\n  padding-bottom: 7px;\n  margin-bottom: 0;\n}\n.form-control-static.input-lg,\n.form-control-static.input-sm {\n  padding-right: 0;\n  padding-left: 0;\n}\n.input-sm {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\nselect.input-sm {\n  height: 30px;\n  line-height: 30px;\n}\ntextarea.input-sm,\nselect[multiple].input-sm {\n  height: auto;\n}\n.form-group-sm .form-control {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.form-group-sm select.form-control {\n  height: 30px;\n  line-height: 30px;\n}\n.form-group-sm textarea.form-control,\n.form-group-sm select[multiple].form-control {\n  height: auto;\n}\n.form-group-sm .form-control-static {\n  height: 30px;\n  min-height: 32px;\n  padding: 6px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.input-lg {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\nselect.input-lg {\n  height: 46px;\n  line-height: 46px;\n}\ntextarea.input-lg,\nselect[multiple].input-lg {\n  height: auto;\n}\n.form-group-lg .form-control {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\n.form-group-lg select.form-control {\n  height: 46px;\n  line-height: 46px;\n}\n.form-group-lg textarea.form-control,\n.form-group-lg select[multiple].form-control {\n  height: auto;\n}\n.form-group-lg .form-control-static {\n  height: 46px;\n  min-height: 38px;\n  padding: 11px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n}\n.has-feedback {\n  position: relative;\n}\n.has-feedback .form-control {\n  padding-right: 42.5px;\n}\n.form-control-feedback {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  pointer-events: none;\n}\n.input-lg + .form-control-feedback,\n.input-group-lg + .form-control-feedback,\n.form-group-lg .form-control + .form-control-feedback {\n  width: 46px;\n  height: 46px;\n  line-height: 46px;\n}\n.input-sm + .form-control-feedback,\n.input-group-sm + .form-control-feedback,\n.form-group-sm .form-control + .form-control-feedback {\n  width: 30px;\n  height: 30px;\n  line-height: 30px;\n}\n.has-success .help-block,\n.has-success .control-label,\n.has-success .radio,\n.has-success .checkbox,\n.has-success .radio-inline,\n.has-success .checkbox-inline,\n.has-success.radio label,\n.has-success.checkbox label,\n.has-success.radio-inline label,\n.has-success.checkbox-inline label {\n  color: #3c763d;\n}\n.has-success .form-control {\n  border-color: #3c763d;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n}\n.has-success .form-control:focus {\n  border-color: #2b542c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #67b168;\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #67b168;\n}\n.has-success .input-group-addon {\n  color: #3c763d;\n  background-color: #dff0d8;\n  border-color: #3c763d;\n}\n.has-success .form-control-feedback {\n  color: #3c763d;\n}\n.has-warning .help-block,\n.has-warning .control-label,\n.has-warning .radio,\n.has-warning .checkbox,\n.has-warning .radio-inline,\n.has-warning .checkbox-inline,\n.has-warning.radio label,\n.has-warning.checkbox label,\n.has-warning.radio-inline label,\n.has-warning.checkbox-inline label {\n  color: #8a6d3b;\n}\n.has-warning .form-control {\n  border-color: #8a6d3b;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n}\n.has-warning .form-control:focus {\n  border-color: #66512c;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #c0a16b;\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #c0a16b;\n}\n.has-warning .input-group-addon {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #8a6d3b;\n}\n.has-warning .form-control-feedback {\n  color: #8a6d3b;\n}\n.has-error .help-block,\n.has-error .control-label,\n.has-error .radio,\n.has-error .checkbox,\n.has-error .radio-inline,\n.has-error .checkbox-inline,\n.has-error.radio label,\n.has-error.checkbox label,\n.has-error.radio-inline label,\n.has-error.checkbox-inline label {\n  color: #a94442;\n}\n.has-error .form-control {\n  border-color: #a94442;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);\n}\n.has-error .form-control:focus {\n  border-color: #843534;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #ce8483;\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #ce8483;\n}\n.has-error .input-group-addon {\n  color: #a94442;\n  background-color: #f2dede;\n  border-color: #a94442;\n}\n.has-error .form-control-feedback {\n  color: #a94442;\n}\n.has-feedback label ~ .form-control-feedback {\n  top: 25px;\n}\n.has-feedback label.sr-only ~ .form-control-feedback {\n  top: 0;\n}\n.help-block {\n  display: block;\n  margin-top: 5px;\n  margin-bottom: 10px;\n  color: #737373;\n}\n@media (min-width: 768px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .form-inline .form-control-static {\n    display: inline-block;\n  }\n  .form-inline .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n  .form-inline .input-group .input-group-addon,\n  .form-inline .input-group .input-group-btn,\n  .form-inline .input-group .form-control {\n    width: auto;\n  }\n  .form-inline .input-group > .form-control {\n    width: 100%;\n  }\n  .form-inline .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .radio,\n  .form-inline .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .radio label,\n  .form-inline .checkbox label {\n    padding-left: 0;\n  }\n  .form-inline .radio input[type=\"radio\"],\n  .form-inline .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n.form-horizontal .radio,\n.form-horizontal .checkbox,\n.form-horizontal .radio-inline,\n.form-horizontal .checkbox-inline {\n  padding-top: 7px;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.form-horizontal .radio,\n.form-horizontal .checkbox {\n  min-height: 27px;\n}\n.form-horizontal .form-group {\n  margin-right: -15px;\n  margin-left: -15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .control-label {\n    padding-top: 7px;\n    margin-bottom: 0;\n    text-align: right;\n  }\n}\n.form-horizontal .has-feedback .form-control-feedback {\n  right: 15px;\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group-lg .control-label {\n    padding-top: 14.333333px;\n    font-size: 18px;\n  }\n}\n@media (min-width: 768px) {\n  .form-horizontal .form-group-sm .control-label {\n    padding-top: 6px;\n    font-size: 12px;\n  }\n}\n.btn {\n  display: inline-block;\n  padding: 6px 12px;\n  margin-bottom: 0;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1.42857143;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.btn:focus,\n.btn:active:focus,\n.btn.active:focus,\n.btn.focus,\n.btn:active.focus,\n.btn.active.focus {\n  outline: thin dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n  outline-offset: -2px;\n}\n.btn:hover,\n.btn:focus,\n.btn.focus {\n  color: #E8F0F2;\n  text-decoration: none;\n}\n.btn:active,\n.btn.active {\n  background-image: none;\n  outline: 0;\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);\n          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);\n}\n.btn.disabled,\n.btn[disabled],\nfieldset[disabled] .btn {\n  cursor: not-allowed;\n  filter: alpha(opacity=65);\n  -webkit-box-shadow: none;\n          box-shadow: none;\n  opacity: .65;\n}\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none;\n}\n.btn-default {\n  color: #333;\n  background-color: #fff;\n  border-color: #ccc;\n}\n.btn-default:focus,\n.btn-default.focus {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #8c8c8c;\n}\n.btn-default:hover {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.btn-default:active,\n.btn-default.active,\n.open > .dropdown-toggle.btn-default {\n  color: #333;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n.btn-default:active:hover,\n.btn-default.active:hover,\n.open > .dropdown-toggle.btn-default:hover,\n.btn-default:active:focus,\n.btn-default.active:focus,\n.open > .dropdown-toggle.btn-default:focus,\n.btn-default:active.focus,\n.btn-default.active.focus,\n.open > .dropdown-toggle.btn-default.focus {\n  color: #333;\n  background-color: #d4d4d4;\n  border-color: #8c8c8c;\n}\n.btn-default:active,\n.btn-default.active,\n.open > .dropdown-toggle.btn-default {\n  background-image: none;\n}\n.btn-default.disabled,\n.btn-default[disabled],\nfieldset[disabled] .btn-default,\n.btn-default.disabled:hover,\n.btn-default[disabled]:hover,\nfieldset[disabled] .btn-default:hover,\n.btn-default.disabled:focus,\n.btn-default[disabled]:focus,\nfieldset[disabled] .btn-default:focus,\n.btn-default.disabled.focus,\n.btn-default[disabled].focus,\nfieldset[disabled] .btn-default.focus,\n.btn-default.disabled:active,\n.btn-default[disabled]:active,\nfieldset[disabled] .btn-default:active,\n.btn-default.disabled.active,\n.btn-default[disabled].active,\nfieldset[disabled] .btn-default.active {\n  background-color: #fff;\n  border-color: #ccc;\n}\n.btn-default .badge {\n  color: #fff;\n  background-color: #333;\n}\n.btn-primary {\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #2e6da4;\n}\n.btn-primary:focus,\n.btn-primary.focus {\n  color: #fff;\n  background-color: #286090;\n  border-color: #122b40;\n}\n.btn-primary:hover {\n  color: #fff;\n  background-color: #286090;\n  border-color: #204d74;\n}\n.btn-primary:active,\n.btn-primary.active,\n.open > .dropdown-toggle.btn-primary {\n  color: #fff;\n  background-color: #286090;\n  border-color: #204d74;\n}\n.btn-primary:active:hover,\n.btn-primary.active:hover,\n.open > .dropdown-toggle.btn-primary:hover,\n.btn-primary:active:focus,\n.btn-primary.active:focus,\n.open > .dropdown-toggle.btn-primary:focus,\n.btn-primary:active.focus,\n.btn-primary.active.focus,\n.open > .dropdown-toggle.btn-primary.focus {\n  color: #fff;\n  background-color: #204d74;\n  border-color: #122b40;\n}\n.btn-primary:active,\n.btn-primary.active,\n.open > .dropdown-toggle.btn-primary {\n  background-image: none;\n}\n.btn-primary.disabled,\n.btn-primary[disabled],\nfieldset[disabled] .btn-primary,\n.btn-primary.disabled:hover,\n.btn-primary[disabled]:hover,\nfieldset[disabled] .btn-primary:hover,\n.btn-primary.disabled:focus,\n.btn-primary[disabled]:focus,\nfieldset[disabled] .btn-primary:focus,\n.btn-primary.disabled.focus,\n.btn-primary[disabled].focus,\nfieldset[disabled] .btn-primary.focus,\n.btn-primary.disabled:active,\n.btn-primary[disabled]:active,\nfieldset[disabled] .btn-primary:active,\n.btn-primary.disabled.active,\n.btn-primary[disabled].active,\nfieldset[disabled] .btn-primary.active {\n  background-color: #337ab7;\n  border-color: #2e6da4;\n}\n.btn-primary .badge {\n  color: #337ab7;\n  background-color: #fff;\n}\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n}\n.btn-success:focus,\n.btn-success.focus {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #255625;\n}\n.btn-success:hover {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #398439;\n}\n.btn-success:active,\n.btn-success.active,\n.open > .dropdown-toggle.btn-success {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #398439;\n}\n.btn-success:active:hover,\n.btn-success.active:hover,\n.open > .dropdown-toggle.btn-success:hover,\n.btn-success:active:focus,\n.btn-success.active:focus,\n.open > .dropdown-toggle.btn-success:focus,\n.btn-success:active.focus,\n.btn-success.active.focus,\n.open > .dropdown-toggle.btn-success.focus {\n  color: #fff;\n  background-color: #398439;\n  border-color: #255625;\n}\n.btn-success:active,\n.btn-success.active,\n.open > .dropdown-toggle.btn-success {\n  background-image: none;\n}\n.btn-success.disabled,\n.btn-success[disabled],\nfieldset[disabled] .btn-success,\n.btn-success.disabled:hover,\n.btn-success[disabled]:hover,\nfieldset[disabled] .btn-success:hover,\n.btn-success.disabled:focus,\n.btn-success[disabled]:focus,\nfieldset[disabled] .btn-success:focus,\n.btn-success.disabled.focus,\n.btn-success[disabled].focus,\nfieldset[disabled] .btn-success.focus,\n.btn-success.disabled:active,\n.btn-success[disabled]:active,\nfieldset[disabled] .btn-success:active,\n.btn-success.disabled.active,\n.btn-success[disabled].active,\nfieldset[disabled] .btn-success.active {\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n}\n.btn-success .badge {\n  color: #5cb85c;\n  background-color: #fff;\n}\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #46b8da;\n}\n.btn-info:focus,\n.btn-info.focus {\n  color: #fff;\n  background-color: #31b0d5;\n  border-color: #1b6d85;\n}\n.btn-info:hover {\n  color: #fff;\n  background-color: #31b0d5;\n  border-color: #269abc;\n}\n.btn-info:active,\n.btn-info.active,\n.open > .dropdown-toggle.btn-info {\n  color: #fff;\n  background-color: #31b0d5;\n  border-color: #269abc;\n}\n.btn-info:active:hover,\n.btn-info.active:hover,\n.open > .dropdown-toggle.btn-info:hover,\n.btn-info:active:focus,\n.btn-info.active:focus,\n.open > .dropdown-toggle.btn-info:focus,\n.btn-info:active.focus,\n.btn-info.active.focus,\n.open > .dropdown-toggle.btn-info.focus {\n  color: #fff;\n  background-color: #269abc;\n  border-color: #1b6d85;\n}\n.btn-info:active,\n.btn-info.active,\n.open > .dropdown-toggle.btn-info {\n  background-image: none;\n}\n.btn-info.disabled,\n.btn-info[disabled],\nfieldset[disabled] .btn-info,\n.btn-info.disabled:hover,\n.btn-info[disabled]:hover,\nfieldset[disabled] .btn-info:hover,\n.btn-info.disabled:focus,\n.btn-info[disabled]:focus,\nfieldset[disabled] .btn-info:focus,\n.btn-info.disabled.focus,\n.btn-info[disabled].focus,\nfieldset[disabled] .btn-info.focus,\n.btn-info.disabled:active,\n.btn-info[disabled]:active,\nfieldset[disabled] .btn-info:active,\n.btn-info.disabled.active,\n.btn-info[disabled].active,\nfieldset[disabled] .btn-info.active {\n  background-color: #5bc0de;\n  border-color: #46b8da;\n}\n.btn-info .badge {\n  color: #5bc0de;\n  background-color: #fff;\n}\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #eea236;\n}\n.btn-warning:focus,\n.btn-warning.focus {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #985f0d;\n}\n.btn-warning:hover {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #d58512;\n}\n.btn-warning:active,\n.btn-warning.active,\n.open > .dropdown-toggle.btn-warning {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #d58512;\n}\n.btn-warning:active:hover,\n.btn-warning.active:hover,\n.open > .dropdown-toggle.btn-warning:hover,\n.btn-warning:active:focus,\n.btn-warning.active:focus,\n.open > .dropdown-toggle.btn-warning:focus,\n.btn-warning:active.focus,\n.btn-warning.active.focus,\n.open > .dropdown-toggle.btn-warning.focus {\n  color: #fff;\n  background-color: #d58512;\n  border-color: #985f0d;\n}\n.btn-warning:active,\n.btn-warning.active,\n.open > .dropdown-toggle.btn-warning {\n  background-image: none;\n}\n.btn-warning.disabled,\n.btn-warning[disabled],\nfieldset[disabled] .btn-warning,\n.btn-warning.disabled:hover,\n.btn-warning[disabled]:hover,\nfieldset[disabled] .btn-warning:hover,\n.btn-warning.disabled:focus,\n.btn-warning[disabled]:focus,\nfieldset[disabled] .btn-warning:focus,\n.btn-warning.disabled.focus,\n.btn-warning[disabled].focus,\nfieldset[disabled] .btn-warning.focus,\n.btn-warning.disabled:active,\n.btn-warning[disabled]:active,\nfieldset[disabled] .btn-warning:active,\n.btn-warning.disabled.active,\n.btn-warning[disabled].active,\nfieldset[disabled] .btn-warning.active {\n  background-color: #f0ad4e;\n  border-color: #eea236;\n}\n.btn-warning .badge {\n  color: #f0ad4e;\n  background-color: #fff;\n}\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d43f3a;\n}\n.btn-danger:focus,\n.btn-danger.focus {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #761c19;\n}\n.btn-danger:hover {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #ac2925;\n}\n.btn-danger:active,\n.btn-danger.active,\n.open > .dropdown-toggle.btn-danger {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #ac2925;\n}\n.btn-danger:active:hover,\n.btn-danger.active:hover,\n.open > .dropdown-toggle.btn-danger:hover,\n.btn-danger:active:focus,\n.btn-danger.active:focus,\n.open > .dropdown-toggle.btn-danger:focus,\n.btn-danger:active.focus,\n.btn-danger.active.focus,\n.open > .dropdown-toggle.btn-danger.focus {\n  color: #fff;\n  background-color: #ac2925;\n  border-color: #761c19;\n}\n.btn-danger:active,\n.btn-danger.active,\n.open > .dropdown-toggle.btn-danger {\n  background-image: none;\n}\n.btn-danger.disabled,\n.btn-danger[disabled],\nfieldset[disabled] .btn-danger,\n.btn-danger.disabled:hover,\n.btn-danger[disabled]:hover,\nfieldset[disabled] .btn-danger:hover,\n.btn-danger.disabled:focus,\n.btn-danger[disabled]:focus,\nfieldset[disabled] .btn-danger:focus,\n.btn-danger.disabled.focus,\n.btn-danger[disabled].focus,\nfieldset[disabled] .btn-danger.focus,\n.btn-danger.disabled:active,\n.btn-danger[disabled]:active,\nfieldset[disabled] .btn-danger:active,\n.btn-danger.disabled.active,\n.btn-danger[disabled].active,\nfieldset[disabled] .btn-danger.active {\n  background-color: #d9534f;\n  border-color: #d43f3a;\n}\n.btn-danger .badge {\n  color: #d9534f;\n  background-color: #fff;\n}\n.btn-link {\n  font-weight: normal;\n  color: #337ab7;\n  border-radius: 0;\n}\n.btn-link,\n.btn-link:active,\n.btn-link.active,\n.btn-link[disabled],\nfieldset[disabled] .btn-link {\n  background-color: transparent;\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.btn-link,\n.btn-link:hover,\n.btn-link:focus,\n.btn-link:active {\n  border-color: transparent;\n}\n.btn-link:hover,\n.btn-link:focus {\n  color: #23527c;\n  text-decoration: underline;\n  background-color: transparent;\n}\n.btn-link[disabled]:hover,\nfieldset[disabled] .btn-link:hover,\n.btn-link[disabled]:focus,\nfieldset[disabled] .btn-link:focus {\n  color: #160000;\n  text-decoration: none;\n}\n.btn-lg,\n.btn-group-lg > .btn {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\n.btn-sm,\n.btn-group-sm > .btn {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.btn-xs,\n.btn-group-xs > .btn {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\n.btn-block {\n  display: block;\n  width: 100%;\n}\n.btn-block + .btn-block {\n  margin-top: 5px;\n}\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%;\n}\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity .15s linear;\n       -o-transition: opacity .15s linear;\n          transition: opacity .15s linear;\n}\n.fade.in {\n  opacity: 1;\n}\n.collapse {\n  display: none;\n}\n.collapse.in {\n  display: block;\n}\ntr.collapse.in {\n  display: table-row;\n}\ntbody.collapse.in {\n  display: table-row-group;\n}\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition-timing-function: ease;\n       -o-transition-timing-function: ease;\n          transition-timing-function: ease;\n  -webkit-transition-duration: .35s;\n       -o-transition-duration: .35s;\n          transition-duration: .35s;\n  -webkit-transition-property: height, visibility;\n       -o-transition-property: height, visibility;\n          transition-property: height, visibility;\n}\n.caret {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 2px;\n  vertical-align: middle;\n  border-top: 4px dashed;\n  border-top: 4px solid \\9;\n  border-right: 4px solid transparent;\n  border-left: 4px solid transparent;\n}\n.dropup,\n.dropdown {\n  position: relative;\n}\n.dropdown-toggle:focus {\n  outline: 0;\n}\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  font-size: 14px;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, .15);\n  border-radius: 4px;\n  -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, .175);\n          box-shadow: 0 6px 12px rgba(0, 0, 0, .175);\n}\n.dropdown-menu.pull-right {\n  right: 0;\n  left: auto;\n}\n.dropdown-menu .divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.dropdown-menu > li > a {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.42857143;\n  color: #333;\n  white-space: nowrap;\n}\n.dropdown-menu > li > a:hover,\n.dropdown-menu > li > a:focus {\n  color: #262626;\n  text-decoration: none;\n  background-color: #d0f3fF;\n}\n.dropdown-menu > .active > a,\n.dropdown-menu > .active > a:hover,\n.dropdown-menu > .active > a:focus {\n  color: #fff;\n  text-decoration: none;\n  background-color: #337ab7;\n  outline: 0;\n}\n.dropdown-menu > .disabled > a,\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  color: #160000;\n}\n.dropdown-menu > .disabled > a:hover,\n.dropdown-menu > .disabled > a:focus {\n  text-decoration: none;\n  cursor: not-allowed;\n  background-color: transparent;\n  background-image: none;\n  filter: progid:DXImageTransform.Microsoft.gradient(enabled = false);\n}\n.open > .dropdown-menu {\n  display: block;\n}\n.open > a {\n  outline: 0;\n}\n.dropdown-menu-right {\n  right: 0;\n  left: auto;\n}\n.dropdown-menu-left {\n  right: auto;\n  left: 0;\n}\n.dropdown-header {\n  display: block;\n  padding: 3px 20px;\n  font-size: 12px;\n  line-height: 1.42857143;\n  color: #160000;\n  white-space: nowrap;\n}\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990;\n}\n.pull-right > .dropdown-menu {\n  right: 0;\n  left: auto;\n}\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  content: \"\";\n  border-top: 0;\n  border-bottom: 4px dashed;\n  border-bottom: 4px solid \\9;\n}\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 2px;\n}\n@media (min-width: 768px) {\n  .navbar-right .dropdown-menu {\n    right: 0;\n    left: auto;\n  }\n  .navbar-right .dropdown-menu-left {\n    right: auto;\n    left: 0;\n  }\n}\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle;\n}\n.btn-group > .btn,\n.btn-group-vertical > .btn {\n  position: relative;\n  float: left;\n}\n.btn-group > .btn:hover,\n.btn-group-vertical > .btn:hover,\n.btn-group > .btn:focus,\n.btn-group-vertical > .btn:focus,\n.btn-group > .btn:active,\n.btn-group-vertical > .btn:active,\n.btn-group > .btn.active,\n.btn-group-vertical > .btn.active {\n  z-index: 2;\n}\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px;\n}\n.btn-toolbar {\n  margin-left: -5px;\n}\n.btn-toolbar .btn,\n.btn-toolbar .btn-group,\n.btn-toolbar .input-group {\n  float: left;\n}\n.btn-toolbar > .btn,\n.btn-toolbar > .btn-group,\n.btn-toolbar > .input-group {\n  margin-left: 5px;\n}\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0;\n}\n.btn-group > .btn:first-child {\n  margin-left: 0;\n}\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group > .btn-group {\n  float: left;\n}\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0;\n}\n.btn-group > .btn + .dropdown-toggle {\n  padding-right: 8px;\n  padding-left: 8px;\n}\n.btn-group > .btn-lg + .dropdown-toggle {\n  padding-right: 12px;\n  padding-left: 12px;\n}\n.btn-group.open .dropdown-toggle {\n  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);\n          box-shadow: inset 0 3px 5px rgba(0, 0, 0, .125);\n}\n.btn-group.open .dropdown-toggle.btn-link {\n  -webkit-box-shadow: none;\n          box-shadow: none;\n}\n.btn .caret {\n  margin-left: 0;\n}\n.btn-lg .caret {\n  border-width: 5px 5px 0;\n  border-bottom-width: 0;\n}\n.dropup .btn-lg .caret {\n  border-width: 0 5px 5px;\n}\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group,\n.btn-group-vertical > .btn-group > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%;\n}\n.btn-group-vertical > .btn-group > .btn {\n  float: none;\n}\n.btn-group-vertical > .btn + .btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0;\n}\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  border-bottom-left-radius: 4px;\n}\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.btn-group-justified {\n  display: table;\n  width: 100%;\n  table-layout: fixed;\n  border-collapse: separate;\n}\n.btn-group-justified > .btn,\n.btn-group-justified > .btn-group {\n  display: table-cell;\n  float: none;\n  width: 1%;\n}\n.btn-group-justified > .btn-group .btn {\n  width: 100%;\n}\n.btn-group-justified > .btn-group .dropdown-menu {\n  left: auto;\n}\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none;\n}\n.input-group {\n  position: relative;\n  display: table;\n  border-collapse: separate;\n}\n.input-group[class*=\"col-\"] {\n  float: none;\n  padding-right: 0;\n  padding-left: 0;\n}\n.input-group .form-control {\n  position: relative;\n  z-index: 2;\n  float: left;\n  width: 100%;\n  margin-bottom: 0;\n}\n.input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 6px;\n}\nselect.input-group-lg > .form-control,\nselect.input-group-lg > .input-group-addon,\nselect.input-group-lg > .input-group-btn > .btn {\n  height: 46px;\n  line-height: 46px;\n}\ntextarea.input-group-lg > .form-control,\ntextarea.input-group-lg > .input-group-addon,\ntextarea.input-group-lg > .input-group-btn > .btn,\nselect[multiple].input-group-lg > .form-control,\nselect[multiple].input-group-lg > .input-group-addon,\nselect[multiple].input-group-lg > .input-group-btn > .btn {\n  height: auto;\n}\n.input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n}\nselect.input-group-sm > .form-control,\nselect.input-group-sm > .input-group-addon,\nselect.input-group-sm > .input-group-btn > .btn {\n  height: 30px;\n  line-height: 30px;\n}\ntextarea.input-group-sm > .form-control,\ntextarea.input-group-sm > .input-group-addon,\ntextarea.input-group-sm > .input-group-btn > .btn,\nselect[multiple].input-group-sm > .form-control,\nselect[multiple].input-group-sm > .input-group-addon,\nselect[multiple].input-group-sm > .input-group-btn > .btn {\n  height: auto;\n}\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell;\n}\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle;\n}\n.input-group-addon {\n  padding: 6px 12px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: 1;\n  color: #555;\n  text-align: center;\n  background-color: #eee;\n  border: 1px solid #ccc;\n  border-radius: 4px;\n}\n.input-group-addon.input-sm {\n  padding: 5px 10px;\n  font-size: 12px;\n  border-radius: 3px;\n}\n.input-group-addon.input-lg {\n  padding: 10px 16px;\n  font-size: 18px;\n  border-radius: 6px;\n}\n.input-group-addon input[type=\"radio\"],\n.input-group-addon input[type=\"checkbox\"] {\n  margin-top: 0;\n}\n.input-group .form-control:first-child,\n.input-group-addon:first-child,\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group > .btn,\n.input-group-btn:first-child > .dropdown-toggle,\n.input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:last-child > .btn-group:not(:last-child) > .btn {\n  border-top-right-radius: 0;\n  border-bottom-right-radius: 0;\n}\n.input-group-addon:first-child {\n  border-right: 0;\n}\n.input-group .form-control:last-child,\n.input-group-addon:last-child,\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group > .btn,\n.input-group-btn:last-child > .dropdown-toggle,\n.input-group-btn:first-child > .btn:not(:first-child),\n.input-group-btn:first-child > .btn-group:not(:first-child) > .btn {\n  border-top-left-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.input-group-addon:last-child {\n  border-left: 0;\n}\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap;\n}\n.input-group-btn > .btn {\n  position: relative;\n}\n.input-group-btn > .btn + .btn {\n  margin-left: -1px;\n}\n.input-group-btn > .btn:hover,\n.input-group-btn > .btn:focus,\n.input-group-btn > .btn:active {\n  z-index: 2;\n}\n.input-group-btn:first-child > .btn,\n.input-group-btn:first-child > .btn-group {\n  margin-right: -1px;\n}\n.input-group-btn:last-child > .btn,\n.input-group-btn:last-child > .btn-group {\n  z-index: 2;\n  margin-left: -1px;\n}\n.nav {\n  padding-left: 5px;\n  margin-bottom: 0;\n  list-style: none;\n}\n.nav > li {\n  position: relative;\n  display: block;\n}\n.nav > li > a {\n  position: relative;\n  display: block;\n  padding: 6px 10px;\n}\n.nav > li > a:hover,\n.nav > li > a:focus {\n  text-decoration: none;\n  background-color: #eee;\n}\n.nav > li.disabled > a {\n  color: #160000;\n}\n.nav > li.disabled > a:hover,\n.nav > li.disabled > a:focus {\n  color: #160000;\n  text-decoration: none;\n  cursor: not-allowed;\n  background-color: transparent;\n}\n.nav .open > a,\n.nav .open > a:hover,\n.nav .open > a:focus {\n  background-color: #eee;\n  border-color: #337ab7;\n}\n.nav .nav-divider {\n  height: 1px;\n  margin: 9px 0;\n  overflow: hidden;\n  background-color: #e5e5e5;\n}\n.nav > li > a > img {\n  max-width: none;\n}\n.nav-tabs {\n  border-bottom: 1px solid #cbebf7;\n}\n.nav-tabs > li {\n  float: left;\n  margin-bottom: -1px;\n}\n.nav-tabs > li > a {\n  margin-right: 2px;\n  line-height: 1.42857143;\n  border: 1px solid #77d5f7;\n  /*border-bottom: 1px solid transparent;*/\n  /*background-color: #cbebf7;*/\n  background: #0078ae url('../../../../../styles/images/ui-bg_glass_45_0078ae_1x400.png') 50% 50% repeat-x;\n  border-radius: 4px 4px 0 0;\n  color: white;\n}\n.nav-tabs > li > a:hover {\n  border-color: #eee #eee #cbebf7;\n}\n.nav-tabs > li.active > a,\n.nav-tabs > li.active > a:hover,\n.nav-tabs > li.active > a:focus {\n  /*color: #28333E;*/\n  color: white;\n  cursor: default;\n  background: #2a9dd0 url('../../../../../styles/images/ui-bg_glass_45_0078ae_1x400.png') 80% 80% repeat-x;\n  border: 1px solid #B4E7FC;\n  border-bottom-color: transparent;\n  font-weight:bold;\n}\n.nav-tabs.nav-justified {\n  width: 100%;\n  border-bottom: 0;\n}\n.nav-tabs.nav-justified > li {\n  float: none;\n}\n.nav-tabs.nav-justified > li > a {\n  margin-bottom: 5px;\n  text-align: center;\n}\n.nav-tabs.nav-justified > .dropdown .dropdown-menu {\n  top: auto;\n  left: auto;\n}\n@media (min-width: 768px) {\n  .nav-tabs.nav-justified > li {\n    display: table-cell;\n    width: 1%;\n  }\n  .nav-tabs.nav-justified > li > a {\n    margin-bottom: 0;\n  }\n}\n.nav-tabs.nav-justified > li > a {\n  margin-right: 0;\n  border-radius: 4px;\n}\n.nav-tabs.nav-justified > .active > a,\n.nav-tabs.nav-justified > .active > a:hover,\n.nav-tabs.nav-justified > .active > a:focus {\n  border: 1px solid #a4d4e6;\n}\n@media (min-width: 768px) {\n  .nav-tabs.nav-justified > li > a {\n    border-bottom: 1px solid #a4d4e6;\n    border-radius: 4px 4px 0 0;\n  }\n  .nav-tabs.nav-justified > .active > a,\n  .nav-tabs.nav-justified > .active > a:hover,\n  .nav-tabs.nav-justified > .active > a:focus {\n    border-bottom-color: #fff;\n  }\n}\n.nav-pills > li {\n  float: left;\n}\n.nav-pills > li > a {\n  border-radius: 4px;\n}\n.nav-pills > li + li {\n  margin-left: 2px;\n}\n.nav-pills > li.active > a,\n.nav-pills > li.active > a:hover,\n.nav-pills > li.active > a:focus {\n  color: #fff;\n  background-color: #337ab7;\n}\n.nav-stacked > li {\n  float: none;\n}\n.nav-stacked > li + li {\n  margin-top: 2px;\n  margin-left: 0;\n}\n.nav-justified {\n  width: 100%;\n}\n.nav-justified > li {\n  float: none;\n}\n.nav-justified > li > a {\n  margin-bottom: 5px;\n  text-align: center;\n}\n.nav-justified > .dropdown .dropdown-menu {\n  top: auto;\n  left: auto;\n}\n@media (min-width: 768px) {\n  .nav-justified > li {\n    display: table-cell;\n    width: 1%;\n  }\n  .nav-justified > li > a {\n    margin-bottom: 0;\n  }\n}\n.nav-tabs-justified {\n  border-bottom: 0;\n}\n.nav-tabs-justified > li > a {\n  margin-right: 0;\n  border-radius: 4px;\n}\n.nav-tabs-justified > .active > a,\n.nav-tabs-justified > .active > a:hover,\n.nav-tabs-justified > .active > a:focus {\n  border: 1px solid #a4d4e6;\n}\n@media (min-width: 768px) {\n  .nav-tabs-justified > li > a {\n    border-bottom: 1px solid #a4d4e6;\n    border-radius: 4px 4px 0 0;\n  }\n  .nav-tabs-justified > .active > a,\n  .nav-tabs-justified > .active > a:hover,\n  .nav-tabs-justified > .active > a:focus {\n    border-bottom-color: #fff;\n  }\n}\n.tab-content > .tab-pane {\n  display: none;\n}\n.tab-content > .active {\n  display: block;\n}\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.navbar {\n  position: relative;\n  min-height: 50px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n}\n@media (min-width: 768px) {\n  .navbar {\n    border-radius: 4px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-header {\n    float: left;\n  }\n}\n.navbar-collapse {\n  padding-right: 15px;\n  padding-left: 15px;\n  overflow-x: visible;\n  -webkit-overflow-scrolling: touch;\n  border-top: 1px solid transparent;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);\n          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1);\n}\n.navbar-collapse.in {\n  overflow-y: auto;\n}\n@media (min-width: 768px) {\n  .navbar-collapse {\n    width: auto;\n    border-top: 0;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n  }\n  .navbar-collapse.collapse {\n    display: block !important;\n    height: auto !important;\n    padding-bottom: 0;\n    overflow: visible !important;\n  }\n  .navbar-collapse.in {\n    overflow-y: visible;\n  }\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-static-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n.navbar-fixed-top .navbar-collapse,\n.navbar-fixed-bottom .navbar-collapse {\n  max-height: 340px;\n}\n@media (max-device-width: 480px) and (orientation: landscape) {\n  .navbar-fixed-top .navbar-collapse,\n  .navbar-fixed-bottom .navbar-collapse {\n    max-height: 200px;\n  }\n}\n.container > .navbar-header,\n.container-fluid > .navbar-header,\n.container > .navbar-collapse,\n.container-fluid > .navbar-collapse {\n  margin-right: -15px;\n  margin-left: -15px;\n}\n@media (min-width: 768px) {\n  .container > .navbar-header,\n  .container-fluid > .navbar-header,\n  .container > .navbar-collapse,\n  .container-fluid > .navbar-collapse {\n    margin-right: 0;\n    margin-left: 0;\n  }\n}\n.navbar-static-top {\n  z-index: 1000;\n  border-width: 0 0 1px;\n}\n@media (min-width: 768px) {\n  .navbar-static-top {\n    border-radius: 0;\n  }\n}\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n}\n@media (min-width: 768px) {\n  .navbar-fixed-top,\n  .navbar-fixed-bottom {\n    border-radius: 0;\n  }\n}\n.navbar-fixed-top {\n  top: 0;\n  border-width: 0 0 1px;\n}\n.navbar-fixed-bottom {\n  bottom: 0;\n  margin-bottom: 0;\n  border-width: 1px 0 0;\n}\n.navbar-brand {\n  float: left;\n  height: 50px;\n  padding: 15px 15px;\n  font-size: 18px;\n  line-height: 20px;\n}\n.navbar-brand:hover,\n.navbar-brand:focus {\n  text-decoration: none;\n}\n.navbar-brand > img {\n  display: block;\n}\n@media (min-width: 768px) {\n  .navbar > .container .navbar-brand,\n  .navbar > .container-fluid .navbar-brand {\n    margin-left: -15px;\n  }\n}\n.navbar-toggle {\n  position: relative;\n  float: right;\n  padding: 9px 10px;\n  margin-top: 8px;\n  margin-right: 15px;\n  margin-bottom: 8px;\n  background-color: transparent;\n  background-image: none;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.navbar-toggle:focus {\n  outline: 0;\n}\n.navbar-toggle .icon-bar {\n  display: block;\n  width: 22px;\n  height: 2px;\n  border-radius: 1px;\n}\n.navbar-toggle .icon-bar + .icon-bar {\n  margin-top: 4px;\n}\n@media (min-width: 768px) {\n  .navbar-toggle {\n    display: none;\n  }\n}\n.navbar-nav {\n  margin: 7.5px -15px;\n}\n.navbar-nav > li > a {\n  padding-top: 10px;\n  padding-bottom: 10px;\n  line-height: 20px;\n}\n@media (max-width: 767px) {\n  .navbar-nav .open .dropdown-menu {\n    position: static;\n    float: none;\n    width: auto;\n    margin-top: 0;\n    background-color: transparent;\n    border: 0;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n  }\n  .navbar-nav .open .dropdown-menu > li > a,\n  .navbar-nav .open .dropdown-menu .dropdown-header {\n    padding: 5px 15px 5px 25px;\n  }\n  .navbar-nav .open .dropdown-menu > li > a {\n    line-height: 20px;\n  }\n  .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-nav .open .dropdown-menu > li > a:focus {\n    background-image: none;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-nav {\n    float: left;\n    margin: 0;\n  }\n  .navbar-nav > li {\n    float: left;\n  }\n  .navbar-nav > li > a {\n    padding-top: 15px;\n    padding-bottom: 15px;\n  }\n}\n.navbar-form {\n  padding: 10px 15px;\n  margin-top: 8px;\n  margin-right: -15px;\n  margin-bottom: 8px;\n  margin-left: -15px;\n  border-top: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n  -webkit-box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1);\n          box-shadow: inset 0 1px 0 rgba(255, 255, 255, .1), 0 1px 0 rgba(255, 255, 255, .1);\n}\n@media (min-width: 768px) {\n  .navbar-form .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .navbar-form .form-control-static {\n    display: inline-block;\n  }\n  .navbar-form .input-group {\n    display: inline-table;\n    vertical-align: middle;\n  }\n  .navbar-form .input-group .input-group-addon,\n  .navbar-form .input-group .input-group-btn,\n  .navbar-form .input-group .form-control {\n    width: auto;\n  }\n  .navbar-form .input-group > .form-control {\n    width: 100%;\n  }\n  .navbar-form .control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .radio,\n  .navbar-form .checkbox {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .navbar-form .radio label,\n  .navbar-form .checkbox label {\n    padding-left: 0;\n  }\n  .navbar-form .radio input[type=\"radio\"],\n  .navbar-form .checkbox input[type=\"checkbox\"] {\n    position: relative;\n    margin-left: 0;\n  }\n  .navbar-form .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n@media (max-width: 767px) {\n  .navbar-form .form-group {\n    margin-bottom: 5px;\n  }\n  .navbar-form .form-group:last-child {\n    margin-bottom: 0;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-form {\n    width: auto;\n    padding-top: 0;\n    padding-bottom: 0;\n    margin-right: 0;\n    margin-left: 0;\n    border: 0;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n  }\n}\n.navbar-nav > li > .dropdown-menu {\n  margin-top: 0;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.navbar-fixed-bottom .navbar-nav > li > .dropdown-menu {\n  margin-bottom: 0;\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n.navbar-btn {\n  margin-top: 8px;\n  margin-bottom: 8px;\n}\n.navbar-btn.btn-sm {\n  margin-top: 10px;\n  margin-bottom: 10px;\n}\n.navbar-btn.btn-xs {\n  margin-top: 14px;\n  margin-bottom: 14px;\n}\n.navbar-text {\n  margin-top: 15px;\n  margin-bottom: 15px;\n}\n@media (min-width: 768px) {\n  .navbar-text {\n    float: left;\n    margin-right: 15px;\n    margin-left: 15px;\n  }\n}\n@media (min-width: 768px) {\n  .navbar-left {\n    float: left !important;\n  }\n  .navbar-right {\n    float: right !important;\n    margin-right: -15px;\n  }\n  .navbar-right ~ .navbar-right {\n    margin-right: 0;\n  }\n}\n.navbar-default {\n  background-color: #A4DFF5;\n  border-color: #4d9cd5;\n}\n.navbar-default .navbar-brand {\n  color: #160000;\n}\n.navbar-default .navbar-brand:hover,\n.navbar-default .navbar-brand:focus {\n  color: #5e5e5e;\n  background-color: transparent;\n}\n.navbar-default .navbar-text {\n  color: #160000;\n}\n.navbar-default .navbar-nav > li > a {\n  color: #160000;\n}\n.navbar-default .navbar-nav > li > a:hover,\n.navbar-default .navbar-nav > li > a:focus {\n  color: #333;\n  background-color: transparent;\n}\n.navbar-default .navbar-nav > .active > a,\n.navbar-default .navbar-nav > .active > a:hover,\n.navbar-default .navbar-nav > .active > a:focus {\n  color: #555;\n  background-color: #cbebf7;\n}\n.navbar-default .navbar-nav > .disabled > a,\n.navbar-default .navbar-nav > .disabled > a:hover,\n.navbar-default .navbar-nav > .disabled > a:focus {\n  color: #ccc;\n  background-color: transparent;\n}\n.navbar-default .navbar-toggle {\n  border-color: #a4d4e6;\n}\n.navbar-default .navbar-toggle:hover,\n.navbar-default .navbar-toggle:focus {\n  background-color: #a4d4e6;\n}\n.navbar-default .navbar-toggle .icon-bar {\n  background-color: #888;\n}\n.navbar-default .navbar-collapse,\n.navbar-default .navbar-form {\n  border-color: #cbebf7;\n}\n.navbar-default .navbar-nav > .open > a,\n.navbar-default .navbar-nav > .open > a:hover,\n.navbar-default .navbar-nav > .open > a:focus {\n  color: #555;\n  background-color: #cbebf7;\n}\n@media (max-width: 767px) {\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a {\n    color: #160000;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #333;\n    background-color: transparent;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a,\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #555;\n    background-color: #cbebf7;\n  }\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a,\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:hover,\n  .navbar-default .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #ccc;\n    background-color: transparent;\n  }\n}\n.navbar-default .navbar-link {\n  color: #160000;\n}\n.navbar-default .navbar-link:hover {\n  color: #333;\n}\n.navbar-default .btn-link {\n  color: #160000;\n}\n.navbar-default .btn-link:hover,\n.navbar-default .btn-link:focus {\n  color: #333;\n}\n.navbar-default .btn-link[disabled]:hover,\nfieldset[disabled] .navbar-default .btn-link:hover,\n.navbar-default .btn-link[disabled]:focus,\nfieldset[disabled] .navbar-default .btn-link:focus {\n  color: #ccc;\n}\n.navbar-inverse {\n  background-color: #222;\n  border-color: #080808;\n}\n.navbar-inverse .navbar-brand {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-brand:hover,\n.navbar-inverse .navbar-brand:focus {\n  color: #fff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-text {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-nav > li > a {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-nav > li > a:hover,\n.navbar-inverse .navbar-nav > li > a:focus {\n  color: #fff;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-nav > .active > a,\n.navbar-inverse .navbar-nav > .active > a:hover,\n.navbar-inverse .navbar-nav > .active > a:focus {\n  color: #fff;\n  background-color: #080808;\n}\n.navbar-inverse .navbar-nav > .disabled > a,\n.navbar-inverse .navbar-nav > .disabled > a:hover,\n.navbar-inverse .navbar-nav > .disabled > a:focus {\n  color: #444;\n  background-color: transparent;\n}\n.navbar-inverse .navbar-toggle {\n  border-color: #333;\n}\n.navbar-inverse .navbar-toggle:hover,\n.navbar-inverse .navbar-toggle:focus {\n  background-color: #333;\n}\n.navbar-inverse .navbar-toggle .icon-bar {\n  background-color: #fff;\n}\n.navbar-inverse .navbar-collapse,\n.navbar-inverse .navbar-form {\n  border-color: #101010;\n}\n.navbar-inverse .navbar-nav > .open > a,\n.navbar-inverse .navbar-nav > .open > a:hover,\n.navbar-inverse .navbar-nav > .open > a:focus {\n  color: #fff;\n  background-color: #080808;\n}\n@media (max-width: 767px) {\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .dropdown-header {\n    border-color: #080808;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu .divider {\n    background-color: #080808;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a {\n    color: #9d9d9d;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > li > a:focus {\n    color: #fff;\n    background-color: transparent;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .active > a:focus {\n    color: #fff;\n    background-color: #080808;\n  }\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:hover,\n  .navbar-inverse .navbar-nav .open .dropdown-menu > .disabled > a:focus {\n    color: #444;\n    background-color: transparent;\n  }\n}\n.navbar-inverse .navbar-link {\n  color: #9d9d9d;\n}\n.navbar-inverse .navbar-link:hover {\n  color: #fff;\n}\n.navbar-inverse .btn-link {\n  color: #9d9d9d;\n}\n.navbar-inverse .btn-link:hover,\n.navbar-inverse .btn-link:focus {\n  color: #fff;\n}\n.navbar-inverse .btn-link[disabled]:hover,\nfieldset[disabled] .navbar-inverse .btn-link:hover,\n.navbar-inverse .btn-link[disabled]:focus,\nfieldset[disabled] .navbar-inverse .btn-link:focus {\n  color: #444;\n}\n.breadcrumb {\n  padding: 8px 15px;\n  margin-bottom: 20px;\n  list-style: none;\n  background-color: #d0f3fF;\n  border-radius: 4px;\n}\n.breadcrumb > li {\n  display: inline-block;\n}\n.breadcrumb > li + li:before {\n  padding: 0 5px;\n  color: #ccc;\n  content: \"/\\00a0\";\n}\n.breadcrumb > .active {\n  color: #160000;\n}\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin: 20px 0;\n  border-radius: 4px;\n}\n.pagination > li {\n  display: inline;\n}\n.pagination > li > a,\n.pagination > li > span {\n  position: relative;\n  float: left;\n  padding: 6px 12px;\n  margin-left: -1px;\n  line-height: 1.42857143;\n  color: #337ab7;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #a4d4e6;\n}\n.pagination > li:first-child > a,\n.pagination > li:first-child > span {\n  margin-left: 0;\n  border-top-left-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\n.pagination > li:last-child > a,\n.pagination > li:last-child > span {\n  border-top-right-radius: 4px;\n  border-bottom-right-radius: 4px;\n}\n.pagination > li > a:hover,\n.pagination > li > span:hover,\n.pagination > li > a:focus,\n.pagination > li > span:focus {\n  z-index: 3;\n  color: #23527c;\n  background-color: #eee;\n  border-color: #a4d4e6;\n}\n.pagination > .active > a,\n.pagination > .active > span,\n.pagination > .active > a:hover,\n.pagination > .active > span:hover,\n.pagination > .active > a:focus,\n.pagination > .active > span:focus {\n  z-index: 2;\n  color: #fff;\n  cursor: default;\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n.pagination > .disabled > span,\n.pagination > .disabled > span:hover,\n.pagination > .disabled > span:focus,\n.pagination > .disabled > a,\n.pagination > .disabled > a:hover,\n.pagination > .disabled > a:focus {\n  color: #160000;\n  cursor: not-allowed;\n  background-color: #fff;\n  border-color: #a4d4e6;\n}\n.pagination-lg > li > a,\n.pagination-lg > li > span {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n}\n.pagination-lg > li:first-child > a,\n.pagination-lg > li:first-child > span {\n  border-top-left-radius: 6px;\n  border-bottom-left-radius: 6px;\n}\n.pagination-lg > li:last-child > a,\n.pagination-lg > li:last-child > span {\n  border-top-right-radius: 6px;\n  border-bottom-right-radius: 6px;\n}\n.pagination-sm > li > a,\n.pagination-sm > li > span {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n}\n.pagination-sm > li:first-child > a,\n.pagination-sm > li:first-child > span {\n  border-top-left-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.pagination-sm > li:last-child > a,\n.pagination-sm > li:last-child > span {\n  border-top-right-radius: 3px;\n  border-bottom-right-radius: 3px;\n}\n.pager {\n  padding-left: 0;\n  margin: 20px 0;\n  text-align: center;\n  list-style: none;\n}\n.pager li {\n  display: inline;\n}\n.pager li > a,\n.pager li > span {\n  display: inline-block;\n  padding: 5px 14px;\n  background-color: #fff;\n  border: 1px solid #a4d4e6;\n  border-radius: 15px;\n}\n.pager li > a:hover,\n.pager li > a:focus {\n  text-decoration: none;\n  background-color: #eee;\n}\n.pager .next > a,\n.pager .next > span {\n  float: right;\n}\n.pager .previous > a,\n.pager .previous > span {\n  float: left;\n}\n.pager .disabled > a,\n.pager .disabled > a:hover,\n.pager .disabled > a:focus,\n.pager .disabled > span {\n  color: #160000;\n  cursor: not-allowed;\n  background-color: #fff;\n}\n.label {\n  display: inline;\n  padding: .2em .6em .3em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: .25em;\n}\na.label:hover,\na.label:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n.label:empty {\n  display: none;\n}\n.btn .label {\n  position: relative;\n  top: -1px;\n}\n.label-default {\n  background-color: #160000;\n}\n.label-default[href]:hover,\n.label-default[href]:focus {\n  background-color: #5e5e5e;\n}\n.label-primary {\n  background-color: #337ab7;\n}\n.label-primary[href]:hover,\n.label-primary[href]:focus {\n  background-color: #286090;\n}\n.label-success {\n  background-color: #5cb85c;\n}\n.label-success[href]:hover,\n.label-success[href]:focus {\n  background-color: #449d44;\n}\n.label-info {\n  background-color: #5bc0de;\n}\n.label-info[href]:hover,\n.label-info[href]:focus {\n  background-color: #31b0d5;\n}\n.label-warning {\n  background-color: #f0ad4e;\n}\n.label-warning[href]:hover,\n.label-warning[href]:focus {\n  background-color: #ec971f;\n}\n.label-danger {\n  background-color: #d9534f;\n}\n.label-danger[href]:hover,\n.label-danger[href]:focus {\n  background-color: #c9302c;\n}\n.badge {\n  display: inline-block;\n  min-width: 10px;\n  padding: 3px 7px;\n  font-size: 12px;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  background-color: #160000;\n  border-radius: 10px;\n}\n.badge:empty {\n  display: none;\n}\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\n.btn-xs .badge,\n.btn-group-xs > .btn .badge {\n  top: 0;\n  padding: 1px 5px;\n}\na.badge:hover,\na.badge:focus {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n.list-group-item.active > .badge,\n.nav-pills > .active > a > .badge {\n  color: #337ab7;\n  background-color: #fff;\n}\n.list-group-item > .badge {\n  float: right;\n}\n.list-group-item > .badge + .badge {\n  margin-right: 5px;\n}\n.nav-pills > li > a > .badge {\n  margin-left: 3px;\n}\n.jumbotron {\n  padding-top: 30px;\n  padding-bottom: 30px;\n  margin-bottom: 30px;\n  color: inherit;\n  background-color: #eee;\n}\n.jumbotron h1,\n.jumbotron .h1 {\n  color: inherit;\n}\n.jumbotron p {\n  margin-bottom: 15px;\n  font-size: 21px;\n  font-weight: 200;\n}\n.jumbotron > hr {\n  border-top-color: #d5d5d5;\n}\n.container .jumbotron,\n.container-fluid .jumbotron {\n  border-radius: 6px;\n}\n.jumbotron .container {\n  max-width: 100%;\n}\n@media screen and (min-width: 768px) {\n  .jumbotron {\n    padding-top: 48px;\n    padding-bottom: 48px;\n  }\n  .container .jumbotron,\n  .container-fluid .jumbotron {\n    padding-right: 60px;\n    padding-left: 60px;\n  }\n  .jumbotron h1,\n  .jumbotron .h1 {\n    font-size: 63px;\n  }\n}\n.thumbnail {\n  display: block;\n  padding: 4px;\n  margin-bottom: 20px;\n  line-height: 1.42857143;\n  background-color: #fff;\n  border: 1px solid #a4d4e6;\n  border-radius: 4px;\n  -webkit-transition: border .2s ease-in-out;\n       -o-transition: border .2s ease-in-out;\n          transition: border .2s ease-in-out;\n}\n.thumbnail > img,\n.thumbnail a > img {\n  margin-right: auto;\n  margin-left: auto;\n}\na.thumbnail:hover,\na.thumbnail:focus,\na.thumbnail.active {\n  border-color: #337ab7;\n}\n.thumbnail .caption {\n  padding: 9px;\n  color: #333;\n}\n.alert {\n  padding: 15px;\n  margin-bottom: 20px;\n  border: 1px solid transparent;\n  border-radius: 4px;\n}\n.alert h4 {\n  margin-top: 0;\n  color: inherit;\n}\n.alert .alert-link {\n  font-weight: bold;\n}\n.alert > p,\n.alert > ul {\n  margin-bottom: 0;\n}\n.alert > p + p {\n  margin-top: 5px;\n}\n.alert-dismissable,\n.alert-dismissible {\n  padding-right: 35px;\n}\n.alert-dismissable .close,\n.alert-dismissible .close {\n  position: relative;\n  top: -2px;\n  right: -21px;\n  color: inherit;\n}\n.alert-success {\n  color: #3c763d;\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n}\n.alert-success hr {\n  border-top-color: #c9e2b3;\n}\n.alert-success .alert-link {\n  color: #2b542c;\n}\n.alert-info {\n  color: #31708f;\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n}\n.alert-info hr {\n  border-top-color: #a6e1ec;\n}\n.alert-info .alert-link {\n  color: #245269;\n}\n.alert-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n}\n.alert-warning hr {\n  border-top-color: #f7e1b5;\n}\n.alert-warning .alert-link {\n  color: #66512c;\n}\n.alert-danger {\n  color: #a94442;\n  background-color: #f2dede;\n  border-color: #ebccd1;\n}\n.alert-danger hr {\n  border-top-color: #e4b9c0;\n}\n.alert-danger .alert-link {\n  color: #843534;\n}\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@-o-keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 40px 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n.progress {\n  height: 20px;\n  margin-bottom: 20px;\n  overflow: hidden;\n  background-color: #d0f3fF;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);\n          box-shadow: inset 0 1px 2px rgba(0, 0, 0, .1);\n}\n.progress-bar {\n  float: left;\n  width: 0;\n  height: 100%;\n  font-size: 12px;\n  line-height: 20px;\n  color: #fff;\n  text-align: center;\n  background-color: #337ab7;\n  -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);\n          box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);\n  -webkit-transition: width .6s ease;\n       -o-transition: width .6s ease;\n          transition: width .6s ease;\n}\n.progress-striped .progress-bar,\n.progress-bar-striped {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  -webkit-background-size: 40px 40px;\n          background-size: 40px 40px;\n}\n.progress.active .progress-bar,\n.progress-bar.active {\n  -webkit-animation: progress-bar-stripes 2s linear infinite;\n       -o-animation: progress-bar-stripes 2s linear infinite;\n          animation: progress-bar-stripes 2s linear infinite;\n}\n.progress-bar-success {\n  background-color: #5cb85c;\n}\n.progress-striped .progress-bar-success {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n}\n.progress-bar-info {\n  background-color: #5bc0de;\n}\n.progress-striped .progress-bar-info {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n}\n.progress-bar-warning {\n  background-color: #f0ad4e;\n}\n.progress-striped .progress-bar-warning {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n}\n.progress-bar-danger {\n  background-color: #d9534f;\n}\n.progress-striped .progress-bar-danger {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:      -o-linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n  background-image:         linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);\n}\n.media {\n  margin-top: 15px;\n}\n.media:first-child {\n  margin-top: 0;\n}\n.media,\n.media-body {\n  overflow: hidden;\n  zoom: 1;\n}\n.media-body {\n  width: 10000px;\n}\n.media-object {\n  display: block;\n}\n.media-object.img-thumbnail {\n  max-width: none;\n}\n.media-right,\n.media > .pull-right {\n  padding-left: 10px;\n}\n.media-left,\n.media > .pull-left {\n  padding-right: 10px;\n}\n.media-left,\n.media-right,\n.media-body {\n  display: table-cell;\n  vertical-align: top;\n}\n.media-middle {\n  vertical-align: middle;\n}\n.media-bottom {\n  vertical-align: bottom;\n}\n.media-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n.media-list {\n  padding-left: 0;\n  list-style: none;\n}\n.list-group {\n  padding-left: 0;\n  margin-bottom: 20px;\n}\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 10px 15px;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid #a4d4e6;\n}\n.list-group-item:first-child {\n  border-top-left-radius: 4px;\n  border-top-right-radius: 4px;\n}\n.list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 4px;\n  border-bottom-left-radius: 4px;\n}\na.list-group-item,\nbutton.list-group-item {\n  color: #555;\n}\na.list-group-item .list-group-item-heading,\nbutton.list-group-item .list-group-item-heading {\n  color: #333;\n}\na.list-group-item:hover,\nbutton.list-group-item:hover,\na.list-group-item:focus,\nbutton.list-group-item:focus {\n  color: #555;\n  text-decoration: none;\n  background-color: #d0f3fF;\n}\nbutton.list-group-item {\n  width: 100%;\n  text-align: left;\n}\n.list-group-item.disabled,\n.list-group-item.disabled:hover,\n.list-group-item.disabled:focus {\n  color: #160000;\n  cursor: not-allowed;\n  background-color: #eee;\n}\n.list-group-item.disabled .list-group-item-heading,\n.list-group-item.disabled:hover .list-group-item-heading,\n.list-group-item.disabled:focus .list-group-item-heading {\n  color: inherit;\n}\n.list-group-item.disabled .list-group-item-text,\n.list-group-item.disabled:hover .list-group-item-text,\n.list-group-item.disabled:focus .list-group-item-text {\n  color: #160000;\n}\n.list-group-item.active,\n.list-group-item.active:hover,\n.list-group-item.active:focus {\n  z-index: 2;\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n.list-group-item.active .list-group-item-heading,\n.list-group-item.active:hover .list-group-item-heading,\n.list-group-item.active:focus .list-group-item-heading,\n.list-group-item.active .list-group-item-heading > small,\n.list-group-item.active:hover .list-group-item-heading > small,\n.list-group-item.active:focus .list-group-item-heading > small,\n.list-group-item.active .list-group-item-heading > .small,\n.list-group-item.active:hover .list-group-item-heading > .small,\n.list-group-item.active:focus .list-group-item-heading > .small {\n  color: inherit;\n}\n.list-group-item.active .list-group-item-text,\n.list-group-item.active:hover .list-group-item-text,\n.list-group-item.active:focus .list-group-item-text {\n  color: #c7ddef;\n}\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8;\n}\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d;\n}\na.list-group-item-success .list-group-item-heading,\nbutton.list-group-item-success .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-success:hover,\nbutton.list-group-item-success:hover,\na.list-group-item-success:focus,\nbutton.list-group-item-success:focus {\n  color: #3c763d;\n  background-color: #d0e9c6;\n}\na.list-group-item-success.active,\nbutton.list-group-item-success.active,\na.list-group-item-success.active:hover,\nbutton.list-group-item-success.active:hover,\na.list-group-item-success.active:focus,\nbutton.list-group-item-success.active:focus {\n  color: #fff;\n  background-color: #3c763d;\n  border-color: #3c763d;\n}\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7;\n}\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f;\n}\na.list-group-item-info .list-group-item-heading,\nbutton.list-group-item-info .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-info:hover,\nbutton.list-group-item-info:hover,\na.list-group-item-info:focus,\nbutton.list-group-item-info:focus {\n  color: #31708f;\n  background-color: #c4e3f3;\n}\na.list-group-item-info.active,\nbutton.list-group-item-info.active,\na.list-group-item-info.active:hover,\nbutton.list-group-item-info.active:hover,\na.list-group-item-info.active:focus,\nbutton.list-group-item-info.active:focus {\n  color: #fff;\n  background-color: #31708f;\n  border-color: #31708f;\n}\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n}\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b;\n}\na.list-group-item-warning .list-group-item-heading,\nbutton.list-group-item-warning .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-warning:hover,\nbutton.list-group-item-warning:hover,\na.list-group-item-warning:focus,\nbutton.list-group-item-warning:focus {\n  color: #8a6d3b;\n  background-color: #faf2cc;\n}\na.list-group-item-warning.active,\nbutton.list-group-item-warning.active,\na.list-group-item-warning.active:hover,\nbutton.list-group-item-warning.active:hover,\na.list-group-item-warning.active:focus,\nbutton.list-group-item-warning.active:focus {\n  color: #fff;\n  background-color: #8a6d3b;\n  border-color: #8a6d3b;\n}\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede;\n}\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442;\n}\na.list-group-item-danger .list-group-item-heading,\nbutton.list-group-item-danger .list-group-item-heading {\n  color: inherit;\n}\na.list-group-item-danger:hover,\nbutton.list-group-item-danger:hover,\na.list-group-item-danger:focus,\nbutton.list-group-item-danger:focus {\n  color: #a94442;\n  background-color: #ebcccc;\n}\na.list-group-item-danger.active,\nbutton.list-group-item-danger.active,\na.list-group-item-danger.active:hover,\nbutton.list-group-item-danger.active:hover,\na.list-group-item-danger.active:focus,\nbutton.list-group-item-danger.active:focus {\n  color: #fff;\n  background-color: #a94442;\n  border-color: #a94442;\n}\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px;\n}\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3;\n}\n.panel {\n  margin-bottom: 20px;\n  background-color: #fff;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\n          box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\n}\n.panel-body {\n  padding: 15px;\n}\n.panel-heading {\n  padding: 10px 15px;\n  border-bottom: 1px solid transparent;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel-heading > .dropdown .dropdown-toggle {\n  color: inherit;\n}\n.panel-title {\n  margin-top: 0;\n  margin-bottom: 0;\n  font-size: 16px;\n  color: inherit;\n}\n.panel-title > a,\n.panel-title > small,\n.panel-title > .small,\n.panel-title > small > a,\n.panel-title > .small > a {\n  color: inherit;\n}\n.panel-footer {\n  padding: 10px 15px;\n  background-color: #d0f3fF;\n  border-top: 1px solid #a4d4e6;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .list-group,\n.panel > .panel-collapse > .list-group {\n  margin-bottom: 0;\n}\n.panel > .list-group .list-group-item,\n.panel > .panel-collapse > .list-group .list-group-item {\n  border-width: 1px 0;\n  border-radius: 0;\n}\n.panel > .list-group:first-child .list-group-item:first-child,\n.panel > .panel-collapse > .list-group:first-child .list-group-item:first-child {\n  border-top: 0;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel > .list-group:last-child .list-group-item:last-child,\n.panel > .panel-collapse > .list-group:last-child .list-group-item:last-child {\n  border-bottom: 0;\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .panel-heading + .panel-collapse > .list-group .list-group-item:first-child {\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n}\n.panel-heading + .list-group .list-group-item:first-child {\n  border-top-width: 0;\n}\n.list-group + .panel-footer {\n  border-top-width: 0;\n}\n.panel > .table,\n.panel > .table-responsive > .table,\n.panel > .panel-collapse > .table {\n  margin-bottom: 0;\n}\n.panel > .table caption,\n.panel > .table-responsive > .table caption,\n.panel > .panel-collapse > .table caption {\n  padding-right: 15px;\n  padding-left: 15px;\n}\n.panel > .table:first-child,\n.panel > .table-responsive:first-child > .table:first-child {\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child {\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:first-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:first-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:first-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:first-child {\n  border-top-left-radius: 3px;\n}\n.panel > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child td:last-child,\n.panel > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > thead:first-child > tr:first-child th:last-child,\n.panel > .table:first-child > tbody:first-child > tr:first-child th:last-child,\n.panel > .table-responsive:first-child > .table:first-child > tbody:first-child > tr:first-child th:last-child {\n  border-top-right-radius: 3px;\n}\n.panel > .table:last-child,\n.panel > .table-responsive:last-child > .table:last-child {\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child {\n  border-bottom-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:first-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:first-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:first-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:first-child {\n  border-bottom-left-radius: 3px;\n}\n.panel > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child td:last-child,\n.panel > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tbody:last-child > tr:last-child th:last-child,\n.panel > .table:last-child > tfoot:last-child > tr:last-child th:last-child,\n.panel > .table-responsive:last-child > .table:last-child > tfoot:last-child > tr:last-child th:last-child {\n  border-bottom-right-radius: 3px;\n}\n.panel > .panel-body + .table,\n.panel > .panel-body + .table-responsive,\n.panel > .table + .panel-body,\n.panel > .table-responsive + .panel-body {\n  border-top: 1px solid #a4d4e6;\n}\n.panel > .table > tbody:first-child > tr:first-child th,\n.panel > .table > tbody:first-child > tr:first-child td {\n  border-top: 0;\n}\n.panel > .table-bordered,\n.panel > .table-responsive > .table-bordered {\n  border: 0;\n}\n.panel > .table-bordered > thead > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:first-child,\n.panel > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:first-child,\n.panel > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:first-child,\n.panel > .table-bordered > thead > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:first-child,\n.panel > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:first-child,\n.panel > .table-bordered > tfoot > tr > td:first-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:first-child {\n  border-left: 0;\n}\n.panel > .table-bordered > thead > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > th:last-child,\n.panel > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > th:last-child,\n.panel > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > th:last-child,\n.panel > .table-bordered > thead > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > thead > tr > td:last-child,\n.panel > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tbody > tr > td:last-child,\n.panel > .table-bordered > tfoot > tr > td:last-child,\n.panel > .table-responsive > .table-bordered > tfoot > tr > td:last-child {\n  border-right: 0;\n}\n.panel > .table-bordered > thead > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > td,\n.panel > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > td,\n.panel > .table-bordered > thead > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > thead > tr:first-child > th,\n.panel > .table-bordered > tbody > tr:first-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:first-child > th {\n  border-bottom: 0;\n}\n.panel > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > td,\n.panel > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > td,\n.panel > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tbody > tr:last-child > th,\n.panel > .table-bordered > tfoot > tr:last-child > th,\n.panel > .table-responsive > .table-bordered > tfoot > tr:last-child > th {\n  border-bottom: 0;\n}\n.panel > .table-responsive {\n  margin-bottom: 0;\n  border: 0;\n}\n.panel-group {\n  margin-bottom: 20px;\n}\n.panel-group .panel {\n  margin-bottom: 0;\n  border-radius: 4px;\n}\n.panel-group .panel + .panel {\n  margin-top: 5px;\n}\n.panel-group .panel-heading {\n  border-bottom: 0;\n}\n.panel-group .panel-heading + .panel-collapse > .panel-body,\n.panel-group .panel-heading + .panel-collapse > .list-group {\n  border-top: 1px solid #a4d4e6;\n}\n.panel-group .panel-footer {\n  border-top: 0;\n}\n.panel-group .panel-footer + .panel-collapse .panel-body {\n  border-bottom: 1px solid #a4d4e6;\n}\n.panel-default {\n  border-color: #a4d4e6;\n}\n.panel-default > .panel-heading {\n  color: #333;\n  background-color: #d0f3fF;\n  border-color: #a4d4e6;\n}\n.panel-default > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #a4d4e6;\n}\n.panel-default > .panel-heading .badge {\n  color: #d0f3fF;\n  background-color: #333;\n}\n.panel-default > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #a4d4e6;\n}\n.panel-primary {\n  border-color: #337ab7;\n}\n.panel-primary > .panel-heading {\n  color: #fff;\n  background-color: #337ab7;\n  border-color: #337ab7;\n}\n.panel-primary > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #337ab7;\n}\n.panel-primary > .panel-heading .badge {\n  color: #337ab7;\n  background-color: #fff;\n}\n.panel-primary > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #337ab7;\n}\n.panel-success {\n  border-color: #d6e9c6;\n}\n.panel-success > .panel-heading {\n  color: #3c763d;\n  background-color: #dff0d8;\n  border-color: #d6e9c6;\n}\n.panel-success > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #d6e9c6;\n}\n.panel-success > .panel-heading .badge {\n  color: #dff0d8;\n  background-color: #3c763d;\n}\n.panel-success > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #d6e9c6;\n}\n.panel-info {\n  border-color: #bce8f1;\n}\n.panel-info > .panel-heading {\n  color: #31708f;\n  background-color: #d9edf7;\n  border-color: #bce8f1;\n}\n.panel-info > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #bce8f1;\n}\n.panel-info > .panel-heading .badge {\n  color: #d9edf7;\n  background-color: #31708f;\n}\n.panel-info > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #bce8f1;\n}\n.panel-warning {\n  border-color: #faebcc;\n}\n.panel-warning > .panel-heading {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n  border-color: #faebcc;\n}\n.panel-warning > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #faebcc;\n}\n.panel-warning > .panel-heading .badge {\n  color: #fcf8e3;\n  background-color: #8a6d3b;\n}\n.panel-warning > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #faebcc;\n}\n.panel-danger {\n  border-color: #ebccd1;\n}\n.panel-danger > .panel-heading {\n  color: #a94442;\n  background-color: #f2dede;\n  border-color: #ebccd1;\n}\n.panel-danger > .panel-heading + .panel-collapse > .panel-body {\n  border-top-color: #ebccd1;\n}\n.panel-danger > .panel-heading .badge {\n  color: #f2dede;\n  background-color: #a94442;\n}\n.panel-danger > .panel-footer + .panel-collapse > .panel-body {\n  border-bottom-color: #ebccd1;\n}\n.embed-responsive {\n  position: relative;\n  display: block;\n  height: 0;\n  padding: 0;\n  overflow: hidden;\n}\n.embed-responsive .embed-responsive-item,\n.embed-responsive iframe,\n.embed-responsive embed,\n.embed-responsive object,\n.embed-responsive video {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n.embed-responsive-16by9 {\n  padding-bottom: 56.25%;\n}\n.embed-responsive-4by3 {\n  padding-bottom: 75%;\n}\n.well {\n  min-height: 20px;\n  padding: 19px;\n  margin-bottom: 20px;\n  background-color: #d0f3fF;\n  border: 1px solid #e3e3e3;\n  border-radius: 4px;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, .05);\n}\n.well blockquote {\n  border-color: #a4d4e6;\n  border-color: rgba(0, 0, 0, .15);\n}\n.well-lg {\n  padding: 24px;\n  border-radius: 6px;\n}\n.well-sm {\n  padding: 9px;\n  border-radius: 3px;\n}\n.close {\n  float: right;\n  font-size: 21px;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  filter: alpha(opacity=20);\n  opacity: .2;\n}\n.close:hover,\n.close:focus {\n  color: #000;\n  text-decoration: none;\n  cursor: pointer;\n  filter: alpha(opacity=50);\n  opacity: .5;\n}\nbutton.close {\n  -webkit-appearance: none;\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n}\n.modal-open {\n  overflow: hidden;\n}\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  -webkit-overflow-scrolling: touch;\n  outline: 0;\n}\n.modal.fade .modal-dialog {\n  -webkit-transition: -webkit-transform .3s ease-out;\n       -o-transition:      -o-transform .3s ease-out;\n          transition:         transform .3s ease-out;\n  -webkit-transform: translate(0, -25%);\n      -ms-transform: translate(0, -25%);\n       -o-transform: translate(0, -25%);\n          transform: translate(0, -25%);\n}\n.modal.in .modal-dialog {\n  -webkit-transform: translate(0, 0);\n      -ms-transform: translate(0, 0);\n       -o-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px;\n}\n.modal-content {\n  position: relative;\n  background-color: #fff;\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n  border: 1px solid #999;\n  border: 1px solid rgba(0, 0, 0, .2);\n  border-radius: 6px;\n  outline: 0;\n  -webkit-box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\n          box-shadow: 0 3px 9px rgba(0, 0, 0, .5);\n}\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000;\n}\n.modal-backdrop.fade {\n  filter: alpha(opacity=0);\n  opacity: 0;\n}\n.modal-backdrop.in {\n  filter: alpha(opacity=50);\n  opacity: .5;\n}\n.modal-header {\n  min-height: 16.42857143px;\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5;\n}\n.modal-header .close {\n  margin-top: -2px;\n}\n.modal-title {\n  margin: 0;\n  line-height: 1.42857143;\n}\n.modal-body {\n  position: relative;\n  padding: 15px;\n}\n.modal-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5;\n}\n.modal-footer .btn + .btn {\n  margin-bottom: 0;\n  margin-left: 5px;\n}\n.modal-footer .btn-group .btn + .btn {\n  margin-left: -1px;\n}\n.modal-footer .btn-block + .btn-block {\n  margin-left: 0;\n}\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll;\n}\n@media (min-width: 768px) {\n  .modal-dialog {\n    width: 600px;\n    margin: 30px auto;\n  }\n  .modal-content {\n    -webkit-box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\n            box-shadow: 0 5px 15px rgba(0, 0, 0, .5);\n  }\n  .modal-sm {\n    width: 300px;\n  }\n}\n@media (min-width: 992px) {\n  .modal-lg {\n    width: 900px;\n  }\n}\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 12px;\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1.42857143;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  white-space: normal;\n  filter: alpha(opacity=0);\n  opacity: 0;\n\n  line-break: auto;\n}\n.tooltip.in {\n  filter: alpha(opacity=90);\n  opacity: .9;\n}\n.tooltip.top {\n  padding: 5px 0;\n  margin-top: -3px;\n}\n.tooltip.right {\n  padding: 0 5px;\n  margin-left: 3px;\n}\n.tooltip.bottom {\n  padding: 5px 0;\n  margin-top: 3px;\n}\n.tooltip.left {\n  padding: 0 5px;\n  margin-left: -3px;\n}\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 4px;\n}\n.tooltip-arrow {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.tooltip.top .tooltip-arrow {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.top-left .tooltip-arrow {\n  right: 5px;\n  bottom: 0;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.top-right .tooltip-arrow {\n  bottom: 0;\n  left: 5px;\n  margin-bottom: -5px;\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n.tooltip.right .tooltip-arrow {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  border-width: 5px 5px 5px 0;\n  border-right-color: #000;\n}\n.tooltip.left .tooltip-arrow {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  border-width: 5px 0 5px 5px;\n  border-left-color: #000;\n}\n.tooltip.bottom .tooltip-arrow {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.tooltip.bottom-left .tooltip-arrow {\n  top: 0;\n  right: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.tooltip.bottom-right .tooltip-arrow {\n  top: 0;\n  left: 5px;\n  margin-top: -5px;\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: none;\n  max-width: 276px;\n  padding: 1px;\n  font-family: \"Helvetica Neue\", Helvetica, Arial, sans-serif;\n  font-size: 14px;\n  font-style: normal;\n  font-weight: normal;\n  line-height: 1.42857143;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  letter-spacing: normal;\n  word-break: normal;\n  word-spacing: normal;\n  word-wrap: normal;\n  white-space: normal;\n  background-color: #fff;\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n  border: 1px solid #ccc;\n  border: 1px solid rgba(0, 0, 0, .2);\n  border-radius: 6px;\n  -webkit-box-shadow: 0 5px 10px rgba(0, 0, 0, .2);\n          box-shadow: 0 5px 10px rgba(0, 0, 0, .2);\n\n  line-break: auto;\n}\n.popover.top {\n  margin-top: -10px;\n}\n.popover.right {\n  margin-left: 10px;\n}\n.popover.bottom {\n  margin-top: 10px;\n}\n.popover.left {\n  margin-left: -10px;\n}\n.popover-title {\n  padding: 8px 14px;\n  margin: 0;\n  font-size: 14px;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: 5px 5px 0 0;\n}\n.popover-content {\n  padding: 9px 14px;\n}\n.popover > .arrow,\n.popover > .arrow:after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n.popover > .arrow {\n  border-width: 11px;\n}\n.popover > .arrow:after {\n  content: \"\";\n  border-width: 10px;\n}\n.popover.top > .arrow {\n  bottom: -11px;\n  left: 50%;\n  margin-left: -11px;\n  border-top-color: #999;\n  border-top-color: rgba(0, 0, 0, .25);\n  border-bottom-width: 0;\n}\n.popover.top > .arrow:after {\n  bottom: 1px;\n  margin-left: -10px;\n  content: \" \";\n  border-top-color: #fff;\n  border-bottom-width: 0;\n}\n.popover.right > .arrow {\n  top: 50%;\n  left: -11px;\n  margin-top: -11px;\n  border-right-color: #999;\n  border-right-color: rgba(0, 0, 0, .25);\n  border-left-width: 0;\n}\n.popover.right > .arrow:after {\n  bottom: -10px;\n  left: 1px;\n  content: \" \";\n  border-right-color: #fff;\n  border-left-width: 0;\n}\n.popover.bottom > .arrow {\n  top: -11px;\n  left: 50%;\n  margin-left: -11px;\n  border-top-width: 0;\n  border-bottom-color: #999;\n  border-bottom-color: rgba(0, 0, 0, .25);\n}\n.popover.bottom > .arrow:after {\n  top: 1px;\n  margin-left: -10px;\n  content: \" \";\n  border-top-width: 0;\n  border-bottom-color: #fff;\n}\n.popover.left > .arrow {\n  top: 50%;\n  right: -11px;\n  margin-top: -11px;\n  border-right-width: 0;\n  border-left-color: #999;\n  border-left-color: rgba(0, 0, 0, .25);\n}\n.popover.left > .arrow:after {\n  right: 1px;\n  bottom: -10px;\n  content: \" \";\n  border-right-width: 0;\n  border-left-color: #fff;\n}\n.carousel {\n  position: relative;\n}\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n.carousel-inner > .item {\n  position: relative;\n  display: none;\n  -webkit-transition: .6s ease-in-out left;\n       -o-transition: .6s ease-in-out left;\n          transition: .6s ease-in-out left;\n}\n.carousel-inner > .item > img,\n.carousel-inner > .item > a > img {\n  line-height: 1;\n}\n@media all and (transform-3d), (-webkit-transform-3d) {\n  .carousel-inner > .item {\n    -webkit-transition: -webkit-transform .6s ease-in-out;\n         -o-transition:      -o-transform .6s ease-in-out;\n            transition:         transform .6s ease-in-out;\n\n    -webkit-backface-visibility: hidden;\n            backface-visibility: hidden;\n    -webkit-perspective: 1000px;\n            perspective: 1000px;\n  }\n  .carousel-inner > .item.next,\n  .carousel-inner > .item.active.right {\n    left: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0);\n  }\n  .carousel-inner > .item.prev,\n  .carousel-inner > .item.active.left {\n    left: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0);\n  }\n  .carousel-inner > .item.next.left,\n  .carousel-inner > .item.prev.right,\n  .carousel-inner > .item.active {\n    left: 0;\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n  }\n}\n.carousel-inner > .active,\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  display: block;\n}\n.carousel-inner > .active {\n  left: 0;\n}\n.carousel-inner > .next,\n.carousel-inner > .prev {\n  position: absolute;\n  top: 0;\n  width: 100%;\n}\n.carousel-inner > .next {\n  left: 100%;\n}\n.carousel-inner > .prev {\n  left: -100%;\n}\n.carousel-inner > .next.left,\n.carousel-inner > .prev.right {\n  left: 0;\n}\n.carousel-inner > .active.left {\n  left: -100%;\n}\n.carousel-inner > .active.right {\n  left: 100%;\n}\n.carousel-control {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 15%;\n  font-size: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, .6);\n  filter: alpha(opacity=50);\n  opacity: .5;\n}\n.carousel-control.left {\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);\n  background-image:      -o-linear-gradient(left, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, .5)), to(rgba(0, 0, 0, .0001)));\n  background-image:         linear-gradient(to right, rgba(0, 0, 0, .5) 0%, rgba(0, 0, 0, .0001) 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1);\n  background-repeat: repeat-x;\n}\n.carousel-control.right {\n  right: 0;\n  left: auto;\n  background-image: -webkit-linear-gradient(left, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);\n  background-image:      -o-linear-gradient(left, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);\n  background-image: -webkit-gradient(linear, left top, right top, from(rgba(0, 0, 0, .0001)), to(rgba(0, 0, 0, .5)));\n  background-image:         linear-gradient(to right, rgba(0, 0, 0, .0001) 0%, rgba(0, 0, 0, .5) 100%);\n  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1);\n  background-repeat: repeat-x;\n}\n.carousel-control:hover,\n.carousel-control:focus {\n  color: #fff;\n  text-decoration: none;\n  filter: alpha(opacity=90);\n  outline: 0;\n  opacity: .9;\n}\n.carousel-control .icon-prev,\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-left,\n.carousel-control .glyphicon-chevron-right {\n  position: absolute;\n  top: 50%;\n  z-index: 5;\n  display: inline-block;\n  margin-top: -10px;\n}\n.carousel-control .icon-prev,\n.carousel-control .glyphicon-chevron-left {\n  left: 50%;\n  margin-left: -10px;\n}\n.carousel-control .icon-next,\n.carousel-control .glyphicon-chevron-right {\n  right: 50%;\n  margin-right: -10px;\n}\n.carousel-control .icon-prev,\n.carousel-control .icon-next {\n  width: 20px;\n  height: 20px;\n  font-family: serif;\n  line-height: 1;\n}\n.carousel-control .icon-prev:before {\n  content: '\\2039';\n}\n.carousel-control .icon-next:before {\n  content: '\\203a';\n}\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 60%;\n  padding-left: 0;\n  margin-left: -30%;\n  text-align: center;\n  list-style: none;\n}\n.carousel-indicators li {\n  display: inline-block;\n  width: 10px;\n  height: 10px;\n  margin: 1px;\n  text-indent: -999px;\n  cursor: pointer;\n  background-color: #000 \\9;\n  background-color: rgba(0, 0, 0, 0);\n  border: 1px solid #fff;\n  border-radius: 10px;\n}\n.carousel-indicators .active {\n  width: 12px;\n  height: 12px;\n  margin: 0;\n  background-color: #fff;\n}\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, .6);\n}\n.carousel-caption .btn {\n  text-shadow: none;\n}\n@media screen and (min-width: 768px) {\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -15px;\n    font-size: 30px;\n  }\n  .carousel-control .glyphicon-chevron-left,\n  .carousel-control .icon-prev {\n    margin-left: -15px;\n  }\n  .carousel-control .glyphicon-chevron-right,\n  .carousel-control .icon-next {\n    margin-right: -15px;\n  }\n  .carousel-caption {\n    right: 20%;\n    left: 20%;\n    padding-bottom: 30px;\n  }\n  .carousel-indicators {\n    bottom: 20px;\n  }\n}\n.clearfix:before,\n.clearfix:after,\n.dl-horizontal dd:before,\n.dl-horizontal dd:after,\n.container:before,\n.container:after,\n.container-fluid:before,\n.container-fluid:after,\n.row:before,\n.row:after,\n.form-horizontal .form-group:before,\n.form-horizontal .form-group:after,\n.btn-toolbar:before,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:before,\n.btn-group-vertical > .btn-group:after,\n.nav:before,\n.nav:after,\n.navbar:before,\n.navbar:after,\n.navbar-header:before,\n.navbar-header:after,\n.navbar-collapse:before,\n.navbar-collapse:after,\n.pager:before,\n.pager:after,\n.panel-body:before,\n.panel-body:after,\n.modal-footer:before,\n.modal-footer:after {\n  display: table;\n  content: \" \";\n}\n.clearfix:after,\n.dl-horizontal dd:after,\n.container:after,\n.container-fluid:after,\n.row:after,\n.form-horizontal .form-group:after,\n.btn-toolbar:after,\n.btn-group-vertical > .btn-group:after,\n.nav:after,\n.navbar:after,\n.navbar-header:after,\n.navbar-collapse:after,\n.pager:after,\n.panel-body:after,\n.modal-footer:after {\n  clear: both;\n}\n.center-block {\n  display: block;\n  margin-right: auto;\n  margin-left: auto;\n}\n.pull-right {\n  float: right !important;\n}\n.pull-left {\n  float: left !important;\n}\n.hide {\n  display: none !important;\n}\n.show {\n  display: block !important;\n}\n.invisible {\n  visibility: hidden;\n}\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n.hidden {\n  display: none !important;\n}\n.affix {\n  position: fixed;\n}\n@-ms-viewport {\n  width: device-width;\n}\n.visible-xs,\n.visible-sm,\n.visible-md,\n.visible-lg {\n  display: none !important;\n}\n.visible-xs-block,\n.visible-xs-inline,\n.visible-xs-inline-block,\n.visible-sm-block,\n.visible-sm-inline,\n.visible-sm-inline-block,\n.visible-md-block,\n.visible-md-inline,\n.visible-md-inline-block,\n.visible-lg-block,\n.visible-lg-inline,\n.visible-lg-inline-block {\n  display: none !important;\n}\n@media (max-width: 767px) {\n  .visible-xs {\n    display: block !important;\n  }\n  table.visible-xs {\n    display: table !important;\n  }\n  tr.visible-xs {\n    display: table-row !important;\n  }\n  th.visible-xs,\n  td.visible-xs {\n    display: table-cell !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-block {\n    display: block !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-inline {\n    display: inline !important;\n  }\n}\n@media (max-width: 767px) {\n  .visible-xs-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm {\n    display: block !important;\n  }\n  table.visible-sm {\n    display: table !important;\n  }\n  tr.visible-sm {\n    display: table-row !important;\n  }\n  th.visible-sm,\n  td.visible-sm {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-block {\n    display: block !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .visible-sm-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md {\n    display: block !important;\n  }\n  table.visible-md {\n    display: table !important;\n  }\n  tr.visible-md {\n    display: table-row !important;\n  }\n  th.visible-md,\n  td.visible-md {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-block {\n    display: block !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .visible-md-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg {\n    display: block !important;\n  }\n  table.visible-lg {\n    display: table !important;\n  }\n  tr.visible-lg {\n    display: table-row !important;\n  }\n  th.visible-lg,\n  td.visible-lg {\n    display: table-cell !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-block {\n    display: block !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-inline {\n    display: inline !important;\n  }\n}\n@media (min-width: 1200px) {\n  .visible-lg-inline-block {\n    display: inline-block !important;\n  }\n}\n@media (max-width: 767px) {\n  .hidden-xs {\n    display: none !important;\n  }\n}\n@media (min-width: 768px) and (max-width: 991px) {\n  .hidden-sm {\n    display: none !important;\n  }\n}\n@media (min-width: 992px) and (max-width: 1199px) {\n  .hidden-md {\n    display: none !important;\n  }\n}\n@media (min-width: 1200px) {\n  .hidden-lg {\n    display: none !important;\n  }\n}\n.visible-print {\n  display: none !important;\n}\n@media print {\n  .visible-print {\n    display: block !important;\n  }\n  table.visible-print {\n    display: table !important;\n  }\n  tr.visible-print {\n    display: table-row !important;\n  }\n  th.visible-print,\n  td.visible-print {\n    display: table-cell !important;\n  }\n}\n.visible-print-block {\n  display: none !important;\n}\n@media print {\n  .visible-print-block {\n    display: block !important;\n  }\n}\n.visible-print-inline {\n  display: none !important;\n}\n@media print {\n  .visible-print-inline {\n    display: inline !important;\n  }\n}\n.visible-print-inline-block {\n  display: none !important;\n}\n@media print {\n  .visible-print-inline-block {\n    display: inline-block !important;\n  }\n}\n@media print {\n  .hidden-print {\n    display: none !important;\n  }\n}\n/*# sourceMappingURL=bootstrap.css.map */\n"; });
/*!
 * Datepicker for Bootstrap v1.6.4 (https://github.com/eternicode/bootstrap-datepicker)
 *
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 * Licensed under the Apache License v2.0 (http://www.apache.org/licenses/LICENSE-2.0)
 */(function(factory){
    if (typeof define === "function" && define.amd) {
        define('bootstrap-datepicker',["jquery"], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function($, undefined){

	function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}
	function UTCToday(){
		var today = new Date();
		return UTCDate(today.getFullYear(), today.getMonth(), today.getDate());
	}
	function isUTCEquals(date1, date2) {
		return (
			date1.getUTCFullYear() === date2.getUTCFullYear() &&
			date1.getUTCMonth() === date2.getUTCMonth() &&
			date1.getUTCDate() === date2.getUTCDate()
		);
	}
	function alias(method){
		return function(){
			return this[method].apply(this, arguments);
		};
	}
	function isValidDate(d) {
		return d && !isNaN(d.getTime());
	}

	var DateArray = (function(){
		var extras = {
			get: function(i){
				return this.slice(i)[0];
			},
			contains: function(d){
				// Array.indexOf is not cross-browser;
				// $.inArray doesn't work with Dates
				var val = d && d.valueOf();
				for (var i=0, l=this.length; i < l; i++)
					if (this[i].valueOf() === val)
						return i;
				return -1;
			},
			remove: function(i){
				this.splice(i,1);
			},
			replace: function(new_array){
				if (!new_array)
					return;
				if (!$.isArray(new_array))
					new_array = [new_array];
				this.clear();
				this.push.apply(this, new_array);
			},
			clear: function(){
				this.length = 0;
			},
			copy: function(){
				var a = new DateArray();
				a.replace(this);
				return a;
			}
		};

		return function(){
			var a = [];
			a.push.apply(a, arguments);
			$.extend(a, extras);
			return a;
		};
	})();


	// Picker object

	var Datepicker = function(element, options){
		$(element).data('datepicker', this);
		this._process_options(options);

		this.dates = new DateArray();
		this.viewDate = this.o.defaultViewDate;
		this.focusDate = null;

		this.element = $(element);
		this.isInput = this.element.is('input');
		this.inputField = this.isInput ? this.element : this.element.find('input');
		this.component = this.element.hasClass('date') ? this.element.find('.add-on, .input-group-addon, .btn') : false;
		this.hasInput = this.component && this.inputField.length;
		if (this.component && this.component.length === 0)
			this.component = false;
		this.isInline = !this.component && this.element.is('div');

		this.picker = $(DPGlobal.template);

		// Checking templates and inserting
		if (this._check_template(this.o.templates.leftArrow)) {
			this.picker.find('.prev').html(this.o.templates.leftArrow);
		}
		if (this._check_template(this.o.templates.rightArrow)) {
			this.picker.find('.next').html(this.o.templates.rightArrow);
		}

		this._buildEvents();
		this._attachEvents();

		if (this.isInline){
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		}
		else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}

		if (this.o.rtl){
			this.picker.addClass('datepicker-rtl');
		}

		this.viewMode = this.o.startView;

		if (this.o.calendarWeeks)
			this.picker.find('thead .datepicker-title, tfoot .today, tfoot .clear')
						.attr('colspan', function(i, val){
							return parseInt(val) + 1;
						});

		this._allow_update = false;

		this.setStartDate(this._o.startDate);
		this.setEndDate(this._o.endDate);
		this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);
		this.setDaysOfWeekHighlighted(this.o.daysOfWeekHighlighted);
		this.setDatesDisabled(this.o.datesDisabled);

		this.fillDow();
		this.fillMonths();

		this._allow_update = true;

		this.update();
		this.showMode();

		if (this.isInline){
			this.show();
		}
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		_resolveViewName: function(view, default_value){
			if (view === 0 || view === 'days' || view === 'month') {
				return 0;
			}
			if (view === 1 || view === 'months' || view === 'year') {
				return 1;
			}
			if (view === 2 || view === 'years' || view === 'decade') {
				return 2;
			}
			if (view === 3 || view === 'decades' || view === 'century') {
				return 3;
			}
			if (view === 4 || view === 'centuries' || view === 'millennium') {
				return 4;
			}
			return default_value === undefined ? false : default_value;
		},

		_check_template: function(tmp){
			try {
				// If empty
				if (tmp === undefined || tmp === "") {
					return false;
				}
				// If no html, everything ok
				if ((tmp.match(/[<>]/g) || []).length <= 0) {
					return true;
				}
				// Checking if html is fine
				var jDom = $(tmp);
				return jDom.length > 0;
			}
			catch (ex) {
				return false;
			}
		},

		_process_options: function(opts){
			// Store raw options for reference
			this._o = $.extend({}, this._o, opts);
			// Processed options
			var o = this.o = $.extend({}, this._o);

			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			var lang = o.language;
			if (!dates[lang]){
				lang = lang.split('-')[0];
				if (!dates[lang])
					lang = defaults.language;
			}
			o.language = lang;

			// Retrieve view index from any aliases
			o.startView = this._resolveViewName(o.startView, 0);
			o.minViewMode = this._resolveViewName(o.minViewMode, 0);
			o.maxViewMode = this._resolveViewName(o.maxViewMode, 4);

			// Check that the start view is between min and max
			o.startView = Math.min(o.startView, o.maxViewMode);
			o.startView = Math.max(o.startView, o.minViewMode);

			// true, false, or Number > 0
			if (o.multidate !== true){
				o.multidate = Number(o.multidate) || false;
				if (o.multidate !== false)
					o.multidate = Math.max(0, o.multidate);
			}
			o.multidateSeparator = String(o.multidateSeparator);

			o.weekStart %= 7;
			o.weekEnd = (o.weekStart + 6) % 7;

			var format = DPGlobal.parseFormat(o.format);
			if (o.startDate !== -Infinity){
				if (!!o.startDate){
					if (o.startDate instanceof Date)
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));
					else
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language, o.assumeNearbyYear);
				}
				else {
					o.startDate = -Infinity;
				}
			}
			if (o.endDate !== Infinity){
				if (!!o.endDate){
					if (o.endDate instanceof Date)
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));
					else
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language, o.assumeNearbyYear);
				}
				else {
					o.endDate = Infinity;
				}
			}

			o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
			if (!$.isArray(o.daysOfWeekDisabled))
				o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
			o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function(d){
				return parseInt(d, 10);
			});

			o.daysOfWeekHighlighted = o.daysOfWeekHighlighted||[];
			if (!$.isArray(o.daysOfWeekHighlighted))
				o.daysOfWeekHighlighted = o.daysOfWeekHighlighted.split(/[,\s]*/);
			o.daysOfWeekHighlighted = $.map(o.daysOfWeekHighlighted, function(d){
				return parseInt(d, 10);
			});

			o.datesDisabled = o.datesDisabled||[];
			if (!$.isArray(o.datesDisabled)) {
				o.datesDisabled = [
					o.datesDisabled
				];
			}
			o.datesDisabled = $.map(o.datesDisabled,function(d){
				return DPGlobal.parseDate(d, format, o.language, o.assumeNearbyYear);
			});

			var plc = String(o.orientation).toLowerCase().split(/\s+/g),
				_plc = o.orientation.toLowerCase();
			plc = $.grep(plc, function(word){
				return /^auto|left|right|top|bottom$/.test(word);
			});
			o.orientation = {x: 'auto', y: 'auto'};
			if (!_plc || _plc === 'auto')
				; // no action
			else if (plc.length === 1){
				switch (plc[0]){
					case 'top':
					case 'bottom':
						o.orientation.y = plc[0];
						break;
					case 'left':
					case 'right':
						o.orientation.x = plc[0];
						break;
				}
			}
			else {
				_plc = $.grep(plc, function(word){
					return /^left|right$/.test(word);
				});
				o.orientation.x = _plc[0] || 'auto';

				_plc = $.grep(plc, function(word){
					return /^top|bottom$/.test(word);
				});
				o.orientation.y = _plc[0] || 'auto';
			}
			if (o.defaultViewDate) {
				var year = o.defaultViewDate.year || new Date().getFullYear();
				var month = o.defaultViewDate.month || 0;
				var day = o.defaultViewDate.day || 1;
				o.defaultViewDate = UTCDate(year, month, day);
			} else {
				o.defaultViewDate = UTCToday();
			}
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(evs){
			for (var i=0, el, ch, ev; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.on(ev, ch);
			}
		},
		_unapplyEvents: function(evs){
			for (var i=0, el, ev, ch; i < evs.length; i++){
				el = evs[i][0];
				if (evs[i].length === 2){
					ch = undefined;
					ev = evs[i][1];
				}
				else if (evs[i].length === 3){
					ch = evs[i][1];
					ev = evs[i][2];
				}
				el.off(ev, ch);
			}
		},
		_buildEvents: function(){
            var events = {
                keyup: $.proxy(function(e){
                    if ($.inArray(e.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) === -1)
                        this.update();
                }, this),
                keydown: $.proxy(this.keydown, this),
                paste: $.proxy(this.paste, this)
            };

            if (this.o.showOnFocus === true) {
                events.focus = $.proxy(this.show, this);
            }

            if (this.isInput) { // single input
                this._events = [
                    [this.element, events]
                ];
            }
            else if (this.component && this.hasInput) { // component: input + button
                this._events = [
                    // For components that are not readonly, allow keyboard nav
                    [this.inputField, events],
                    [this.component, {
                        click: $.proxy(this.show, this)
                    }]
                ];
            }
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			this._events.push(
				// Component: listen for blur on element descendants
				[this.element, '*', {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}],
				// Input: listen for blur on element
				[this.element, {
					blur: $.proxy(function(e){
						this._focused_from = e.target;
					}, this)
				}]
			);

			if (this.o.immediateUpdates) {
				// Trigger input updates immediately on changed year/month
				this._events.push([this.element, {
					'changeYear changeMonth': $.proxy(function(e){
						this.update(e.date);
					}, this)
				}]);
			}

			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					mousedown: $.proxy(function(e){
						// Clicked outside the datepicker, hide it
						if (!(
							this.element.is(e.target) ||
							this.element.find(e.target).length ||
							this.picker.is(e.target) ||
							this.picker.find(e.target).length ||
							this.isInline
						)){
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function(){
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function(){
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function(){
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
		},
		_detachSecondaryEvents: function(){
			this._unapplyEvents(this._secondaryEvents);
		},
		_trigger: function(event, altdate){
			var date = altdate || this.dates.get(-1),
				local_date = this._utc_to_local(date);

			this.element.trigger({
				type: event,
				date: local_date,
				dates: $.map(this.dates, this._utc_to_local),
				format: $.proxy(function(ix, format){
					if (arguments.length === 0){
						ix = this.dates.length - 1;
						format = this.o.format;
					}
					else if (typeof ix === 'string'){
						format = ix;
						ix = this.dates.length - 1;
					}
					format = format || this.o.format;
					var date = this.dates.get(ix);
					return DPGlobal.formatDate(date, format, this.o.language);
				}, this)
			});
		},

		show: function(){
			if (this.inputField.prop('disabled') || (this.inputField.prop('readonly') && this.o.enableOnReadonly === false))
				return;
			if (!this.isInline)
				this.picker.appendTo(this.o.container);
			this.place();
			this.picker.show();
			this._attachSecondaryEvents();
			this._trigger('show');
			if ((window.navigator.msMaxTouchPoints || 'ontouchstart' in document) && this.o.disableTouchKeyboard) {
				$(this.element).blur();
			}
			return this;
		},

		hide: function(){
			if (this.isInline || !this.picker.is(':visible'))
				return this;
			this.focusDate = null;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.viewMode = this.o.startView;
			this.showMode();

			if (this.o.forceParse && this.inputField.val())
				this.setValue();
			this._trigger('hide');
			return this;
		},

		destroy: function(){
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput){
				delete this.element.data().date;
			}
			return this;
		},

		paste: function(evt){
			var dateString;
			if (evt.originalEvent.clipboardData && evt.originalEvent.clipboardData.types
				&& $.inArray('text/plain', evt.originalEvent.clipboardData.types) !== -1) {
				dateString = evt.originalEvent.clipboardData.getData('text/plain');
			}
			else if (window.clipboardData) {
				dateString = window.clipboardData.getData('Text');
			}
			else {
				return;
			}
			this.setDate(dateString);
			this.update();
			evt.preventDefault();
		},

		_utc_to_local: function(utc){
			return utc && new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
		},
		_local_to_utc: function(local){
			return local && new Date(local.getTime() - (local.getTimezoneOffset()*60000));
		},
		_zero_time: function(local){
			return local && new Date(local.getFullYear(), local.getMonth(), local.getDate());
		},
		_zero_utc_time: function(utc){
			return utc && new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
		},

		getDates: function(){
			return $.map(this.dates, this._utc_to_local);
		},

		getUTCDates: function(){
			return $.map(this.dates, function(d){
				return new Date(d);
			});
		},

		getDate: function(){
			return this._utc_to_local(this.getUTCDate());
		},

		getUTCDate: function(){
			var selected_date = this.dates.get(-1);
			if (typeof selected_date !== 'undefined') {
				return new Date(selected_date);
			} else {
				return null;
			}
		},

		clearDates: function(){
			if (this.inputField) {
				this.inputField.val('');
			}

			this.update();
			this._trigger('changeDate');

			if (this.o.autoclose) {
				this.hide();
			}
		},
		setDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, args);
			this._trigger('changeDate');
			this.setValue();
			return this;
		},

		setUTCDates: function(){
			var args = $.isArray(arguments[0]) ? arguments[0] : arguments;
			this.update.apply(this, $.map(args, this._utc_to_local));
			this._trigger('changeDate');
			this.setValue();
			return this;
		},

		setDate: alias('setDates'),
		setUTCDate: alias('setUTCDates'),
		remove: alias('destroy'),

		setValue: function(){
			var formatted = this.getFormattedDate();
			this.inputField.val(formatted);
			return this;
		},

		getFormattedDate: function(format){
			if (format === undefined)
				format = this.o.format;

			var lang = this.o.language;
			return $.map(this.dates, function(d){
				return DPGlobal.formatDate(d, format, lang);
			}).join(this.o.multidateSeparator);
		},

		getStartDate: function(){
			return this.o.startDate;
		},

		setStartDate: function(startDate){
			this._process_options({startDate: startDate});
			this.update();
			this.updateNavArrows();
			return this;
		},

		getEndDate: function(){
			return this.o.endDate;
		},

		setEndDate: function(endDate){
			this._process_options({endDate: endDate});
			this.update();
			this.updateNavArrows();
			return this;
		},

		setDaysOfWeekDisabled: function(daysOfWeekDisabled){
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
			this.update();
			this.updateNavArrows();
			return this;
		},

		setDaysOfWeekHighlighted: function(daysOfWeekHighlighted){
			this._process_options({daysOfWeekHighlighted: daysOfWeekHighlighted});
			this.update();
			return this;
		},

		setDatesDisabled: function(datesDisabled){
			this._process_options({datesDisabled: datesDisabled});
			this.update();
			this.updateNavArrows();
		},

		place: function(){
			if (this.isInline)
				return this;
			var calendarWidth = this.picker.outerWidth(),
				calendarHeight = this.picker.outerHeight(),
				visualPadding = 10,
				container = $(this.o.container),
				windowWidth = container.width(),
				scrollTop = this.o.container === 'body' ? $(document).scrollTop() : container.scrollTop(),
				appendOffset = container.offset();

			var parentsZindex = [];
			this.element.parents().each(function(){
				var itemZIndex = $(this).css('z-index');
				if (itemZIndex !== 'auto' && itemZIndex !== 0) parentsZindex.push(parseInt(itemZIndex));
			});
			var zIndex = Math.max.apply(Math, parentsZindex) + this.o.zIndexOffset;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
			var left = offset.left - appendOffset.left,
				top = offset.top - appendOffset.top;

			if (this.o.container !== 'body') {
				top += scrollTop;
			}

			this.picker.removeClass(
				'datepicker-orient-top datepicker-orient-bottom '+
				'datepicker-orient-right datepicker-orient-left'
			);

			if (this.o.orientation.x !== 'auto'){
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
				if (this.o.orientation.x === 'right')
					left -= calendarWidth - width;
			}
			// auto x orientation is best-placement: if it crosses a window
			// edge, fudge it sideways
			else {
				if (offset.left < 0) {
					// component is outside the window on the left side. Move it into visible range
					this.picker.addClass('datepicker-orient-left');
					left -= offset.left - visualPadding;
				} else if (left + calendarWidth > windowWidth) {
					// the calendar passes the widow right edge. Align it to component right side
					this.picker.addClass('datepicker-orient-right');
					left += width - calendarWidth;
				} else {
					// Default to left
					this.picker.addClass('datepicker-orient-left');
				}
			}

			// auto y orientation is best-situation: top or bottom, no fudging,
			// decision based on which shows more of the calendar
			var yorient = this.o.orientation.y,
				top_overflow;
			if (yorient === 'auto'){
				top_overflow = -scrollTop + top - calendarHeight;
				yorient = top_overflow < 0 ? 'bottom' : 'top';
			}

			this.picker.addClass('datepicker-orient-' + yorient);
			if (yorient === 'top')
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));
			else
				top += height;

			if (this.o.rtl) {
				var right = windowWidth - (left + width);
				this.picker.css({
					top: top,
					right: right,
					zIndex: zIndex
				});
			} else {
				this.picker.css({
					top: top,
					left: left,
					zIndex: zIndex
				});
			}
			return this;
		},

		_allow_update: true,
		update: function(){
			if (!this._allow_update)
				return this;

			var oldDates = this.dates.copy(),
				dates = [],
				fromArgs = false;
			if (arguments.length){
				$.each(arguments, $.proxy(function(i, date){
					if (date instanceof Date)
						date = this._local_to_utc(date);
					dates.push(date);
				}, this));
				fromArgs = true;
			}
			else {
				dates = this.isInput
						? this.element.val()
						: this.element.data('date') || this.inputField.val();
				if (dates && this.o.multidate)
					dates = dates.split(this.o.multidateSeparator);
				else
					dates = [dates];
				delete this.element.data().date;
			}

			dates = $.map(dates, $.proxy(function(date){
				return DPGlobal.parseDate(date, this.o.format, this.o.language, this.o.assumeNearbyYear);
			}, this));
			dates = $.grep(dates, $.proxy(function(date){
				return (
					!this.dateWithinRange(date) ||
					!date
				);
			}, this), true);
			this.dates.replace(dates);

			if (this.dates.length)
				this.viewDate = new Date(this.dates.get(-1));
			else if (this.viewDate < this.o.startDate)
				this.viewDate = new Date(this.o.startDate);
			else if (this.viewDate > this.o.endDate)
				this.viewDate = new Date(this.o.endDate);
			else
				this.viewDate = this.o.defaultViewDate;

			if (fromArgs){
				// setting date by clicking
				this.setValue();
			}
			else if (dates.length){
				// setting date by typing
				if (String(oldDates) !== String(this.dates))
					this._trigger('changeDate');
			}
			if (!this.dates.length && oldDates.length)
				this._trigger('clearDate');

			this.fill();
			this.element.change();
			return this;
		},

		fillDow: function(){
			var dowCnt = this.o.weekStart,
				html = '<tr>';
			if (this.o.calendarWeeks){
				this.picker.find('.datepicker-days .datepicker-switch')
					.attr('colspan', function(i, val){
						return parseInt(val) + 1;
					});
				html += '<th class="cw">&#160;</th>';
			}
			while (dowCnt < this.o.weekStart + 7){
				html += '<th class="dow';
        if ($.inArray(dowCnt, this.o.daysOfWeekDisabled) > -1)
          html += ' disabled';
        html += '">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},

		fillMonths: function(){
      var localDate = this._utc_to_local(this.viewDate);
			var html = '',
			i = 0;
			while (i < 12){
        var focused = localDate && localDate.getMonth() === i ? ' focused' : '';
				html += '<span class="month' + focused + '">' + dates[this.o.language].monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		setRange: function(range){
			if (!range || !range.length)
				delete this.range;
			else
				this.range = $.map(range, function(d){
					return d.valueOf();
				});
			this.fill();
		},

		getClassNames: function(date){
			var cls = [],
				year = this.viewDate.getUTCFullYear(),
				month = this.viewDate.getUTCMonth(),
				today = new Date();
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() === year && date.getUTCMonth() < month)){
				cls.push('old');
			}
			else if (date.getUTCFullYear() > year || (date.getUTCFullYear() === year && date.getUTCMonth() > month)){
				cls.push('new');
			}
			if (this.focusDate && date.valueOf() === this.focusDate.valueOf())
				cls.push('focused');
			// Compare internal UTC date with local today, not UTC today
			if (this.o.todayHighlight &&
				date.getUTCFullYear() === today.getFullYear() &&
				date.getUTCMonth() === today.getMonth() &&
				date.getUTCDate() === today.getDate()){
				cls.push('today');
			}
			if (this.dates.contains(date) !== -1)
				cls.push('active');
			if (!this.dateWithinRange(date)){
				cls.push('disabled');
			}
			if (this.dateIsDisabled(date)){
				cls.push('disabled', 'disabled-date');	
			} 
			if ($.inArray(date.getUTCDay(), this.o.daysOfWeekHighlighted) !== -1){
				cls.push('highlighted');
			}

			if (this.range){
				if (date > this.range[0] && date < this.range[this.range.length-1]){
					cls.push('range');
				}
				if ($.inArray(date.valueOf(), this.range) !== -1){
					cls.push('selected');
				}
				if (date.valueOf() === this.range[0]){
          cls.push('range-start');
        }
        if (date.valueOf() === this.range[this.range.length-1]){
          cls.push('range-end');
        }
			}
			return cls;
		},

		_fill_yearsView: function(selector, cssClass, factor, step, currentYear, startYear, endYear, callback){
			var html, view, year, steps, startStep, endStep, thisYear, i, classes, tooltip, before;

			html      = '';
			view      = this.picker.find(selector);
			year      = parseInt(currentYear / factor, 10) * factor;
			startStep = parseInt(startYear / step, 10) * step;
			endStep   = parseInt(endYear / step, 10) * step;
			steps     = $.map(this.dates, function(d){
				return parseInt(d.getUTCFullYear() / step, 10) * step;
			});

			view.find('.datepicker-switch').text(year + '-' + (year + step * 9));

			thisYear = year - step;
			for (i = -1; i < 11; i += 1) {
				classes = [cssClass];
				tooltip = null;

				if (i === -1) {
					classes.push('old');
				} else if (i === 10) {
					classes.push('new');
				}
				if ($.inArray(thisYear, steps) !== -1) {
					classes.push('active');
				}
				if (thisYear < startStep || thisYear > endStep) {
					classes.push('disabled');
				}
        if (thisYear === this.viewDate.getFullYear()) {
				  classes.push('focused');
        }

				if (callback !== $.noop) {
					before = callback(new Date(thisYear, 0, 1));
					if (before === undefined) {
						before = {};
					} else if (typeof(before) === 'boolean') {
						before = {enabled: before};
					} else if (typeof(before) === 'string') {
						before = {classes: before};
					}
					if (before.enabled === false) {
						classes.push('disabled');
					}
					if (before.classes) {
						classes = classes.concat(before.classes.split(/\s+/));
					}
					if (before.tooltip) {
						tooltip = before.tooltip;
					}
				}

				html += '<span class="' + classes.join(' ') + '"' + (tooltip ? ' title="' + tooltip + '"' : '') + '>' + thisYear + '</span>';
				thisYear += step;
			}
			view.find('td').html(html);
		},

		fill: function(){
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				todaytxt = dates[this.o.language].today || dates['en'].today || '',
				cleartxt = dates[this.o.language].clear || dates['en'].clear || '',
				titleFormat = dates[this.o.language].titleFormat || dates['en'].titleFormat,
				tooltip,
				before;
			if (isNaN(year) || isNaN(month))
				return;
			this.picker.find('.datepicker-days .datepicker-switch')
						.text(DPGlobal.formatDate(d, titleFormat, this.o.language));
			this.picker.find('tfoot .today')
						.text(todaytxt)
						.toggle(this.o.todayBtn !== false);
			this.picker.find('tfoot .clear')
						.text(cleartxt)
						.toggle(this.o.clearBtn !== false);
			this.picker.find('thead .datepicker-title')
						.text(this.o.title)
						.toggle(this.o.title !== '');
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month-1, 28),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			if (prevMonth.getUTCFullYear() < 100){
        nextMonth.setUTCFullYear(prevMonth.getUTCFullYear());
      }
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while (prevMonth.valueOf() < nextMonth){
				if (prevMonth.getUTCDay() === this.o.weekStart){
					html.push('<tr>');
					if (this.o.calendarWeeks){
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
							// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(Number(ws) + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(Number(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek =  (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">'+ calWeek +'</td>');
					}
				}
				clsName = this.getClassNames(prevMonth);
				clsName.push('day');

				if (this.o.beforeShowDay !== $.noop){
					before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;
				}

				//Check if uniqueSort exists (supported by jquery >=1.12 and >=2.2)
				//Fallback to unique function for older jquery versions
				if ($.isFunction($.uniqueSort)) {
					clsName = $.uniqueSort(clsName);
				} else {
					clsName = $.unique(clsName);
				}

				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
				tooltip = null;
				if (prevMonth.getUTCDay() === this.o.weekEnd){
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));

			var monthsTitle = dates[this.o.language].monthsTitle || dates['en'].monthsTitle || 'Months';
			var months = this.picker.find('.datepicker-months')
						.find('.datepicker-switch')
							.text(this.o.maxViewMode < 2 ? monthsTitle : year)
							.end()
						.find('span').removeClass('active');

			$.each(this.dates, function(i, d){
				if (d.getUTCFullYear() === year)
					months.eq(d.getUTCMonth()).addClass('active');
			});

			if (year < startYear || year > endYear){
				months.addClass('disabled');
			}
			if (year === startYear){
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year === endYear){
				months.slice(endMonth+1).addClass('disabled');
			}

			if (this.o.beforeShowMonth !== $.noop){
				var that = this;
				$.each(months, function(i, month){
          var moDate = new Date(year, i, 1);
          var before = that.o.beforeShowMonth(moDate);
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false && !$(month).hasClass('disabled'))
					    $(month).addClass('disabled');
					if (before.classes)
					    $(month).addClass(before.classes);
					if (before.tooltip)
					    $(month).prop('title', before.tooltip);
				});
			}

			// Generating decade/years picker
			this._fill_yearsView(
				'.datepicker-years',
				'year',
				10,
				1,
				year,
				startYear,
				endYear,
				this.o.beforeShowYear
			);

			// Generating century/decades picker
			this._fill_yearsView(
				'.datepicker-decades',
				'decade',
				100,
				10,
				year,
				startYear,
				endYear,
				this.o.beforeShowDecade
			);

			// Generating millennium/centuries picker
			this._fill_yearsView(
				'.datepicker-centuries',
				'century',
				1000,
				100,
				year,
				startYear,
				endYear,
				this.o.beforeShowCentury
			);
		},

		updateNavArrows: function(){
			if (!this._allow_update)
				return;

			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth();
			switch (this.viewMode){
				case 0:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
				case 2:
				case 3:
				case 4:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() || this.o.maxViewMode < 2){
						this.picker.find('.prev').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() || this.o.maxViewMode < 2){
						this.picker.find('.next').css({visibility: 'hidden'});
					}
					else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		click: function(e){
			e.preventDefault();
			e.stopPropagation();

			var target, dir, day, year, month, monthChanged, yearChanged;
			target = $(e.target);

			// Clicked on the switch
			if (target.hasClass('datepicker-switch')){
				this.showMode(1);
			}

			// Clicked on prev or next
			var navArrow = target.closest('.prev, .next');
			if (navArrow.length > 0) {
				dir = DPGlobal.modes[this.viewMode].navStep * (navArrow.hasClass('prev') ? -1 : 1);
				if (this.viewMode === 0){
					this.viewDate = this.moveMonth(this.viewDate, dir);
					this._trigger('changeMonth', this.viewDate);
				} else {
					this.viewDate = this.moveYear(this.viewDate, dir);
					if (this.viewMode === 1){
						this._trigger('changeYear', this.viewDate);
					}
				}
				this.fill();
			}

			// Clicked on today button
			if (target.hasClass('today') && !target.hasClass('day')){
				this.showMode(-2);
				this._setDate(UTCToday(), this.o.todayBtn === 'linked' ? null : 'view');
			}

			// Clicked on clear button
			if (target.hasClass('clear')){
				this.clearDates();
			}

			if (!target.hasClass('disabled')){
				// Clicked on a day
				if (target.hasClass('day')){
					day = parseInt(target.text(), 10) || 1;
					year = this.viewDate.getUTCFullYear();
					month = this.viewDate.getUTCMonth();

					// From last month
					if (target.hasClass('old')){
						if (month === 0) {
							month = 11;
							year = year - 1;
							monthChanged = true;
							yearChanged = true;
						} else {
							month = month - 1;
							monthChanged = true;
 						}
 					}

					// From next month
					if (target.hasClass('new')) {
						if (month === 11){
							month = 0;
							year = year + 1;
							monthChanged = true;
							yearChanged = true;
 						} else {
							month = month + 1;
							monthChanged = true;
 						}
					}
					this._setDate(UTCDate(year, month, day));
					if (yearChanged) {
						this._trigger('changeYear', this.viewDate);
					}
					if (monthChanged) {
						this._trigger('changeMonth', this.viewDate);
					}
				}

				// Clicked on a month
				if (target.hasClass('month')) {
					this.viewDate.setUTCDate(1);
					day = 1;
					month = target.parent().find('span').index(target);
					year = this.viewDate.getUTCFullYear();
					this.viewDate.setUTCMonth(month);
					this._trigger('changeMonth', this.viewDate);
					if (this.o.minViewMode === 1){
						this._setDate(UTCDate(year, month, day));
						this.showMode();
					} else {
						this.showMode(-1);
					}
					this.fill();
				}

				// Clicked on a year
				if (target.hasClass('year')
						|| target.hasClass('decade')
						|| target.hasClass('century')) {
					this.viewDate.setUTCDate(1);

					day = 1;
					month = 0;
					year = parseInt(target.text(), 10)||0;
					this.viewDate.setUTCFullYear(year);

					if (target.hasClass('year')){
						this._trigger('changeYear', this.viewDate);
						if (this.o.minViewMode === 2){
							this._setDate(UTCDate(year, month, day));
						}
					}
					if (target.hasClass('decade')){
						this._trigger('changeDecade', this.viewDate);
						if (this.o.minViewMode === 3){
							this._setDate(UTCDate(year, month, day));
						}
					}
					if (target.hasClass('century')){
						this._trigger('changeCentury', this.viewDate);
						if (this.o.minViewMode === 4){
							this._setDate(UTCDate(year, month, day));
						}
					}

					this.showMode(-1);
					this.fill();
				}
			}

			if (this.picker.is(':visible') && this._focused_from){
				$(this._focused_from).focus();
			}
			delete this._focused_from;
		},

		_toggle_multidate: function(date){
			var ix = this.dates.contains(date);
			if (!date){
				this.dates.clear();
			}

			if (ix !== -1){
				if (this.o.multidate === true || this.o.multidate > 1 || this.o.toggleActive){
					this.dates.remove(ix);
				}
			} else if (this.o.multidate === false) {
				this.dates.clear();
				this.dates.push(date);
			}
			else {
				this.dates.push(date);
			}

			if (typeof this.o.multidate === 'number')
				while (this.dates.length > this.o.multidate)
					this.dates.remove(0);
		},

		_setDate: function(date, which){
			if (!which || which === 'date')
				this._toggle_multidate(date && new Date(date));
			if (!which || which === 'view')
				this.viewDate = date && new Date(date);

			this.fill();
			this.setValue();
			if (!which || which !== 'view') {
				this._trigger('changeDate');
			}
			if (this.inputField){
				this.inputField.change();
			}
			if (this.o.autoclose && (!which || which === 'date')){
				this.hide();
			}
		},

		moveDay: function(date, dir){
			var newDate = new Date(date);
			newDate.setUTCDate(date.getUTCDate() + dir);

			return newDate;
		},

		moveWeek: function(date, dir){
			return this.moveDay(date, dir * 7);
		},

		moveMonth: function(date, dir){
			if (!isValidDate(date))
				return this.o.defaultViewDate;
			if (!dir)
				return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag === 1){
				test = dir === -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){
						return new_date.getUTCMonth() === month;
					}
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){
						return new_date.getUTCMonth() !== new_month;
					};
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			}
			else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i < mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function(){
					return new_month !== new_date.getUTCMonth();
				};
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		},

		moveAvailableDate: function(date, dir, fn){
			do {
				date = this[fn](date, dir);

				if (!this.dateWithinRange(date))
					return false;

				fn = 'moveDay';
			}
			while (this.dateIsDisabled(date));

			return date;
		},

		weekOfDateIsDisabled: function(date){
			return $.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1;
		},

		dateIsDisabled: function(date){
			return (
				this.weekOfDateIsDisabled(date) ||
				$.grep(this.o.datesDisabled, function(d){
					return isUTCEquals(date, d);
				}).length > 0
			);
		},

		dateWithinRange: function(date){
			return date >= this.o.startDate && date <= this.o.endDate;
		},

		keydown: function(e){
			if (!this.picker.is(':visible')){
				if (e.keyCode === 40 || e.keyCode === 27) { // allow down to re-show picker
					this.show();
					e.stopPropagation();
        }
				return;
			}
			var dateChanged = false,
				dir, newViewDate,
				focusDate = this.focusDate || this.viewDate;
			switch (e.keyCode){
				case 27: // escape
					if (this.focusDate){
						this.focusDate = null;
						this.viewDate = this.dates.get(-1) || this.viewDate;
						this.fill();
					}
					else
						this.hide();
					e.preventDefault();
					e.stopPropagation();
					break;
				case 37: // left
				case 38: // up
				case 39: // right
				case 40: // down
					if (!this.o.keyboardNavigation || this.o.daysOfWeekDisabled.length === 7)
						break;
					dir = e.keyCode === 37 || e.keyCode === 38 ? -1 : 1;
          if (this.viewMode === 0) {
  					if (e.ctrlKey){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');

  						if (newViewDate)
  							this._trigger('changeYear', this.viewDate);
  					}
  					else if (e.shiftKey){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');

  						if (newViewDate)
  							this._trigger('changeMonth', this.viewDate);
  					}
  					else if (e.keyCode === 37 || e.keyCode === 39){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveDay');
  					}
  					else if (!this.weekOfDateIsDisabled(focusDate)){
  						newViewDate = this.moveAvailableDate(focusDate, dir, 'moveWeek');
  					}
          } else if (this.viewMode === 1) {
            if (e.keyCode === 38 || e.keyCode === 40) {
              dir = dir * 4;
            }
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveMonth');
          } else if (this.viewMode === 2) {
            if (e.keyCode === 38 || e.keyCode === 40) {
              dir = dir * 4;
            }
            newViewDate = this.moveAvailableDate(focusDate, dir, 'moveYear');
          }
					if (newViewDate){
						this.focusDate = this.viewDate = newViewDate;
						this.setValue();
						this.fill();
						e.preventDefault();
					}
					break;
				case 13: // enter
					if (!this.o.forceParse)
						break;
					focusDate = this.focusDate || this.dates.get(-1) || this.viewDate;
					if (this.o.keyboardNavigation) {
						this._toggle_multidate(focusDate);
						dateChanged = true;
					}
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.setValue();
					this.fill();
					if (this.picker.is(':visible')){
						e.preventDefault();
						e.stopPropagation();
						if (this.o.autoclose)
							this.hide();
					}
					break;
				case 9: // tab
					this.focusDate = null;
					this.viewDate = this.dates.get(-1) || this.viewDate;
					this.fill();
					this.hide();
					break;
			}
			if (dateChanged){
				if (this.dates.length)
					this._trigger('changeDate');
				else
					this._trigger('clearDate');
				if (this.inputField){
					this.inputField.change();
				}
			}
		},

		showMode: function(dir){
			if (dir){
				this.viewMode = Math.max(this.o.minViewMode, Math.min(this.o.maxViewMode, this.viewMode + dir));
			}
			this.picker
				.children('div')
				.hide()
				.filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName)
					.show();
			this.updateNavArrows();
		}
	};

	var DateRangePicker = function(element, options){
		$(element).data('datepicker', this);
		this.element = $(element);
		this.inputs = $.map(options.inputs, function(i){
			return i.jquery ? i[0] : i;
		});
		delete options.inputs;

		datepickerPlugin.call($(this.inputs), options)
			.on('changeDate', $.proxy(this.dateUpdated, this));

		this.pickers = $.map(this.inputs, function(i){
			return $(i).data('datepicker');
		});
		this.updateDates();
	};
	DateRangePicker.prototype = {
		updateDates: function(){
			this.dates = $.map(this.pickers, function(i){
				return i.getUTCDate();
			});
			this.updateRanges();
		},
		updateRanges: function(){
			var range = $.map(this.dates, function(d){
				return d.valueOf();
			});
			$.each(this.pickers, function(i, p){
				p.setRange(range);
			});
		},
		dateUpdated: function(e){
			// `this.updating` is a workaround for preventing infinite recursion
			// between `changeDate` triggering and `setUTCDate` calling.  Until
			// there is a better mechanism.
			if (this.updating)
				return;
			this.updating = true;

			var dp = $(e.target).data('datepicker');

			if (typeof(dp) === "undefined") {
				return;
			}

			var new_date = dp.getUTCDate(),
				i = $.inArray(e.target, this.inputs),
				j = i - 1,
				k = i + 1,
				l = this.inputs.length;
			if (i === -1)
				return;

			$.each(this.pickers, function(i, p){
				if (!p.getUTCDate())
					p.setUTCDate(new_date);
			});

			if (new_date < this.dates[j]){
				// Date being moved earlier/left
				while (j >= 0 && new_date < this.dates[j]){
					this.pickers[j--].setUTCDate(new_date);
				}
			}
			else if (new_date > this.dates[k]){
				// Date being moved later/right
				while (k < l && new_date > this.dates[k]){
					this.pickers[k++].setUTCDate(new_date);
				}
			}
			this.updateDates();

			delete this.updating;
		},
		remove: function(){
			$.map(this.pickers, function(p){ p.remove(); });
			delete this.element.data().datepicker;
		}
	};

	function opts_from_el(el, prefix){
		// Derive options from element data-attrs
		var data = $(el).data(),
			out = {}, inkey,
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])');
		prefix = new RegExp('^' + prefix.toLowerCase());
		function re_lower(_,a){
			return a.toLowerCase();
		}
		for (var key in data)
			if (prefix.test(key)){
				inkey = key.replace(replace, re_lower);
				out[inkey] = data[key];
			}
		return out;
	}

	function opts_from_locale(lang){
		// Derive options from locale plugins
		var out = {};
		// Check if "de-DE" style date is available, if not language should
		// fallback to 2 letter code eg "de"
		if (!dates[lang]){
			lang = lang.split('-')[0];
			if (!dates[lang])
				return;
		}
		var d = dates[lang];
		$.each(locale_opts, function(i,k){
			if (k in d)
				out[k] = d[k];
		});
		return out;
	}

	var old = $.fn.datepicker;
	var datepickerPlugin = function(option){
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return;
		this.each(function(){
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option === 'object' && option;
			if (!data){
				var elopts = opts_from_el(this, 'date'),
					// Preliminary otions
					xopts = $.extend({}, defaults, elopts, options),
					locopts = opts_from_locale(xopts.language),
					// Options priority: js args, data-attrs, locales, defaults
					opts = $.extend({}, defaults, locopts, elopts, options);
				if ($this.hasClass('input-daterange') || opts.inputs){
					$.extend(opts, {
						inputs: opts.inputs || $this.find('input').toArray()
					});
					data = new DateRangePicker(this, opts);
				}
				else {
					data = new Datepicker(this, opts);
				}
				$this.data('datepicker', data);
			}
			if (typeof option === 'string' && typeof data[option] === 'function'){
				internal_return = data[option].apply(data, args);
			}
		});

		if (
			internal_return === undefined ||
			internal_return instanceof Datepicker ||
			internal_return instanceof DateRangePicker
		)
			return this;

		if (this.length > 1)
			throw new Error('Using only allowed for the collection of a single element (' + option + ' function)');
		else
			return internal_return;
	};
	$.fn.datepicker = datepickerPlugin;

	var defaults = $.fn.datepicker.defaults = {
		assumeNearbyYear: false,
		autoclose: false,
		beforeShowDay: $.noop,
		beforeShowMonth: $.noop,
		beforeShowYear: $.noop,
		beforeShowDecade: $.noop,
		beforeShowCentury: $.noop,
		calendarWeeks: false,
		clearBtn: false,
		toggleActive: false,
		daysOfWeekDisabled: [],
		daysOfWeekHighlighted: [],
		datesDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'mm/dd/yyyy',
		keyboardNavigation: true,
		language: 'en',
		minViewMode: 0,
		maxViewMode: 4,
		multidate: false,
		multidateSeparator: ',',
		orientation: "auto",
		rtl: false,
		startDate: -Infinity,
		startView: 0,
		todayBtn: false,
		todayHighlight: false,
		weekStart: 0,
		disableTouchKeyboard: false,
		enableOnReadonly: true,
		showOnFocus: true,
		zIndexOffset: 10,
		container: 'body',
		immediateUpdates: false,
		title: '',
		templates: {
			leftArrow: '&laquo;',
			rightArrow: '&raquo;'
		}
	};
	var locale_opts = $.fn.datepicker.locale_opts = [
		'format',
		'rtl',
		'weekStart'
	];
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		en: {
			days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			today: "Today",
			clear: "Clear",
			titleFormat: "MM yyyy"
		}
	};

	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
			},
			{
				clsName: 'decades',
				navFnc: 'FullDecade',
				navStep: 100
			},
			{
				clsName: 'centuries',
				navFnc: 'FullCentury',
				navStep: 1000
		}],
		isLeapYear: function(year){
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
		},
		getDaysInMonth: function(year, month){
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
		},
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\u5e74\u6708\u65e5\[-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			if (typeof format.toValue === 'function' && typeof format.toDisplay === 'function')
                return format;
            // IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate: function(date, format, language, assumeNearby){
			if (!date)
				return undefined;
			if (date instanceof Date)
				return date;
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			if (format.toValue)
                return format.toValue(date, format, language);
            var part_re = /([\-+]\d+)([dmwy])/,
				parts = date.match(/([\-+]\d+)([dmwy])/g),
				fn_map = {
					d: 'moveDay',
					m: 'moveMonth',
					w: 'moveWeek',
					y: 'moveYear'
				},
				dateAliases = {
					yesterday: '-1d',
					today: '+0d',
					tomorrow: '+1d'
				},
				part, dir, i, fn;
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
				date = new Date();
				for (i=0; i < parts.length; i++){
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					fn = fn_map[part[2]];
					date = Datepicker.prototype[fn](date, dir);
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
			}

			if (typeof dateAliases[date] !== 'undefined') {
				date = dateAliases[date];
				parts = date.match(/([\-+]\d+)([dmwy])/g);

				if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)){
					date = new Date();
				  	for (i=0; i < parts.length; i++){
						part = part_re.exec(parts[i]);
						dir = parseInt(part[1]);
						fn = fn_map[part[2]];
						date = Datepicker.prototype[fn](date, dir);
				  	}

			  		return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
				}
			}

			parts = date && date.match(this.nonpunctuation) || [];
			date = new Date();

			function applyNearbyYear(year, threshold){
				if (threshold === true)
					threshold = 10;

				// if year is 2 digits or less, than the user most likely is trying to get a recent century
				if (year < 100){
					year += 2000;
					// if the new year is more than threshold years in advance, use last century
					if (year > ((new Date()).getFullYear()+threshold)){
						year -= 100;
					}
				}

				return year;
			}

			var parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d,v){
						return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
					},
					yy: function(d,v){
						return d.setUTCFullYear(assumeNearby ? applyNearbyYear(v, assumeNearby) : v);
					},
					m: function(d,v){
						if (isNaN(d))
							return d;
						v -= 1;
						while (v < 0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() !== v)
							d.setUTCDate(d.getUTCDate()-1);
						return d;
					},
					d: function(d,v){
						return d.setUTCDate(v);
					}
				},
				val, filtered;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCToday();
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length !== fparts.length){
				fparts = $(fparts).filter(function(i,p){
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			function match_part(){
				var m = this.slice(0, parts[i].length),
					p = parts[i].slice(0, m.length);
				return m.toLowerCase() === p.toLowerCase();
			}
			if (parts.length === fparts.length){
				var cnt;
				for (i=0, cnt = fparts.length; i < cnt; i++){
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)){
						switch (part){
							case 'MM':
								filtered = $(dates[language].months).filter(match_part);
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(match_part);
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				var _date, s;
				for (i=0; i < setters_order.length; i++){
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s])){
						_date = new Date(date);
						setters_map[s](_date, parsed[s]);
						if (!isNaN(_date))
							date = _date;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			if (!date)
				return '';
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			if (format.toDisplay)
                return format.toDisplay(date, format, language);
            var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			date = [];
			var seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i <= cnt; i++){
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
			              '<tr>'+
			                '<th colspan="7" class="datepicker-title"></th>'+
			              '</tr>'+
							'<tr>'+
								'<th class="prev">&laquo;</th>'+
								'<th colspan="5" class="datepicker-switch"></th>'+
								'<th class="next">&raquo;</th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot>'+
							'<tr>'+
								'<th colspan="7" class="today"></th>'+
							'</tr>'+
							'<tr>'+
								'<th colspan="7" class="clear"></th>'+
							'</tr>'+
						'</tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-decades">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-centuries">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
						'</div>';

	$.fn.datepicker.DPGlobal = DPGlobal;


	/* DATEPICKER NO CONFLICT
	* =================== */

	$.fn.datepicker.noConflict = function(){
		$.fn.datepicker = old;
		return this;
	};

	/* DATEPICKER VERSION
	 * =================== */
	$.fn.datepicker.version = '1.6.4';

	/* DATEPICKER DATA-API
	* ================== */

	$(document).on(
		'focus.datepicker.data-api click.datepicker.data-api',
		'[data-provide="datepicker"]',
		function(e){
			var $this = $(this);
			if ($this.data('datepicker'))
				return;
			e.preventDefault();
			// component click requires us to explicitly show it
			datepickerPlugin.call($this, 'show');
		}
	);
	$(function(){
		datepickerPlugin.call($('[data-provide="datepicker-inline"]'));
	});

}));

// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2017 Kris Kowal under the terms of the MIT
 * license found at https://github.com/kriskowal/q/blob/v1/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

(function (definition) {
    "use strict";

    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.  In
    // Common/Node/RequireJS, the module exports the Q API and when
    // executed as a simple <script>, it creates a Q global instead.

    // Montage Require
    if (typeof bootstrap === "function") {
        bootstrap("promise", definition);

    // CommonJS
    } else if (typeof exports === "object" && typeof module === "object") {
        module.exports = definition();

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
        define('Q/q',definition);

    // SES (Secure EcmaScript)
    } else if (typeof ses !== "undefined") {
        if (!ses.ok()) {
            return;
        } else {
            ses.makeQ = definition;
        }

    // <script>
    } else if (typeof window !== "undefined" || typeof self !== "undefined") {
        // Prefer window over self for add-on scripts. Use self for
        // non-windowed contexts.
        var global = typeof window !== "undefined" ? window : self;

        // Get the `window` object, save the previous Q global
        // and initialize Q as a global.
        var previousQ = global.Q;
        global.Q = definition();

        // Add a noConflict function so Q can be removed from the
        // global namespace.
        global.Q.noConflict = function () {
            global.Q = previousQ;
            return this;
        };

    } else {
        throw new Error("This environment was not anticipated by Q. Please file a bug.");
    }

})(function () {
"use strict";

var hasStacks = false;
try {
    throw new Error();
} catch (e) {
    hasStacks = !!e.stack;
}

// All code after this point will be filtered from stack traces reported
// by Q.
var qStartingLine = captureLine();
var qFileName;

// shims

// used for fallback in "allResolved"
var noop = function () {};

// Use the fastest possible means to execute a task in a future turn
// of the event loop.
var nextTick =(function () {
    // linked list of tasks (single, with head node)
    var head = {task: void 0, next: null};
    var tail = head;
    var flushing = false;
    var requestTick = void 0;
    var isNodeJS = false;
    // queue for late tasks, used by unhandled rejection tracking
    var laterQueue = [];

    function flush() {
        /* jshint loopfunc: true */
        var task, domain;

        while (head.next) {
            head = head.next;
            task = head.task;
            head.task = void 0;
            domain = head.domain;

            if (domain) {
                head.domain = void 0;
                domain.enter();
            }
            runSingle(task, domain);

        }
        while (laterQueue.length) {
            task = laterQueue.pop();
            runSingle(task);
        }
        flushing = false;
    }
    // runs a single function in the async queue
    function runSingle(task, domain) {
        try {
            task();

        } catch (e) {
            if (isNodeJS) {
                // In node, uncaught exceptions are considered fatal errors.
                // Re-throw them synchronously to interrupt flushing!

                // Ensure continuation if the uncaught exception is suppressed
                // listening "uncaughtException" events (as domains does).
                // Continue in next event to avoid tick recursion.
                if (domain) {
                    domain.exit();
                }
                setTimeout(flush, 0);
                if (domain) {
                    domain.enter();
                }

                throw e;

            } else {
                // In browsers, uncaught exceptions are not fatal.
                // Re-throw them asynchronously to avoid slow-downs.
                setTimeout(function () {
                    throw e;
                }, 0);
            }
        }

        if (domain) {
            domain.exit();
        }
    }

    nextTick = function (task) {
        tail = tail.next = {
            task: task,
            domain: isNodeJS && process.domain,
            next: null
        };

        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };

    if (typeof process === "object" &&
        process.toString() === "[object process]" && process.nextTick) {
        // Ensure Q is in a real Node environment, with a `process.nextTick`.
        // To see through fake Node environments:
        // * Mocha test runner - exposes a `process` global without a `nextTick`
        // * Browserify - exposes a `process.nexTick` function that uses
        //   `setTimeout`. In this case `setImmediate` is preferred because
        //    it is faster. Browserify's `process.toString()` yields
        //   "[object Object]", while in a real Node environment
        //   `process.toString()` yields "[object process]".
        isNodeJS = true;

        requestTick = function () {
            process.nextTick(flush);
        };

    } else if (typeof setImmediate === "function") {
        // In IE10, Node.js 0.9+, or https://github.com/NobleJS/setImmediate
        if (typeof window !== "undefined") {
            requestTick = setImmediate.bind(window, flush);
        } else {
            requestTick = function () {
                setImmediate(flush);
            };
        }

    } else if (typeof MessageChannel !== "undefined") {
        // modern browsers
        // http://www.nonblocking.io/2011/06/windownexttick.html
        var channel = new MessageChannel();
        // At least Safari Version 6.0.5 (8536.30.1) intermittently cannot create
        // working message ports the first time a page loads.
        channel.port1.onmessage = function () {
            requestTick = requestPortTick;
            channel.port1.onmessage = flush;
            flush();
        };
        var requestPortTick = function () {
            // Opera requires us to provide a message payload, regardless of
            // whether we use it.
            channel.port2.postMessage(0);
        };
        requestTick = function () {
            setTimeout(flush, 0);
            requestPortTick();
        };

    } else {
        // old browsers
        requestTick = function () {
            setTimeout(flush, 0);
        };
    }
    // runs a task after all other tasks have been run
    // this is useful for unhandled rejection tracking that needs to happen
    // after all `then`d tasks have been run.
    nextTick.runAfter = function (task) {
        laterQueue.push(task);
        if (!flushing) {
            flushing = true;
            requestTick();
        }
    };
    return nextTick;
})();

// Attempt to make generics safe in the face of downstream
// modifications.
// There is no situation where this is necessary.
// If you need a security guarantee, these primordials need to be
// deeply frozen anyway, and if you don’t need a security guarantee,
// this is just plain paranoid.
// However, this **might** have the nice side-effect of reducing the size of
// the minified code by reducing x.call() to merely x()
// See Mark Miller’s explanation of what this does.
// http://wiki.ecmascript.org/doku.php?id=conventions:safe_meta_programming
var call = Function.call;
function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}
// This is equivalent, but slower:
// uncurryThis = Function_bind.bind(Function_bind.call);
// http://jsperf.com/uncurrythis

var array_slice = uncurryThis(Array.prototype.slice);

var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
        var index = 0,
            length = this.length;
        // concerning the initial value, if one is not provided
        if (arguments.length === 1) {
            // seek to the first value in the array, accounting
            // for the possibility that is is a sparse array
            do {
                if (index in this) {
                    basis = this[index++];
                    break;
                }
                if (++index >= length) {
                    throw new TypeError();
                }
            } while (1);
        }
        // reduce
        for (; index < length; index++) {
            // account for the possibility that the array is sparse
            if (index in this) {
                basis = callback(basis, this[index], index);
            }
        }
        return basis;
    }
);

var array_indexOf = uncurryThis(
    Array.prototype.indexOf || function (value) {
        // not a very good shim, but good enough for our one use of it
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) {
                return i;
            }
        }
        return -1;
    }
);

var array_map = uncurryThis(
    Array.prototype.map || function (callback, thisp) {
        var self = this;
        var collect = [];
        array_reduce(self, function (undefined, value, index) {
            collect.push(callback.call(thisp, value, index, self));
        }, void 0);
        return collect;
    }
);

var object_create = Object.create || function (prototype) {
    function Type() { }
    Type.prototype = prototype;
    return new Type();
};

var object_defineProperty = Object.defineProperty || function (obj, prop, descriptor) {
    obj[prop] = descriptor.value;
    return obj;
};

var object_hasOwnProperty = uncurryThis(Object.prototype.hasOwnProperty);

var object_keys = Object.keys || function (object) {
    var keys = [];
    for (var key in object) {
        if (object_hasOwnProperty(object, key)) {
            keys.push(key);
        }
    }
    return keys;
};

var object_toString = uncurryThis(Object.prototype.toString);

function isObject(value) {
    return value === Object(value);
}

// generator related shims

// FIXME: Remove this function once ES6 generators are in SpiderMonkey.
function isStopIteration(exception) {
    return (
        object_toString(exception) === "[object StopIteration]" ||
        exception instanceof QReturnValue
    );
}

// FIXME: Remove this helper and Q.return once ES6 generators are in
// SpiderMonkey.
var QReturnValue;
if (typeof ReturnValue !== "undefined") {
    QReturnValue = ReturnValue;
} else {
    QReturnValue = function (value) {
        this.value = value;
    };
}

// long stack traces

var STACK_JUMP_SEPARATOR = "From previous event:";

function makeStackTraceLong(error, promise) {
    // If possible, transform the error stack trace by removing Node and Q
    // cruft, then concatenating with the stack trace of `promise`. See #57.
    if (hasStacks &&
        promise.stack &&
        typeof error === "object" &&
        error !== null &&
        error.stack
    ) {
        var stacks = [];
        for (var p = promise; !!p; p = p.source) {
            if (p.stack && (!error.__minimumStackCounter__ || error.__minimumStackCounter__ > p.stackCounter)) {
                object_defineProperty(error, "__minimumStackCounter__", {value: p.stackCounter, configurable: true});
                stacks.unshift(p.stack);
            }
        }
        stacks.unshift(error.stack);

        var concatedStacks = stacks.join("\n" + STACK_JUMP_SEPARATOR + "\n");
        var stack = filterStackString(concatedStacks);
        object_defineProperty(error, "stack", {value: stack, configurable: true});
    }
}

function filterStackString(stackString) {
    var lines = stackString.split("\n");
    var desiredLines = [];
    for (var i = 0; i < lines.length; ++i) {
        var line = lines[i];

        if (!isInternalFrame(line) && !isNodeFrame(line) && line) {
            desiredLines.push(line);
        }
    }
    return desiredLines.join("\n");
}

function isNodeFrame(stackLine) {
    return stackLine.indexOf("(module.js:") !== -1 ||
           stackLine.indexOf("(node.js:") !== -1;
}

function getFileNameAndLineNumber(stackLine) {
    // Named functions: "at functionName (filename:lineNumber:columnNumber)"
    // In IE10 function name can have spaces ("Anonymous function") O_o
    var attempt1 = /at .+ \((.+):(\d+):(?:\d+)\)$/.exec(stackLine);
    if (attempt1) {
        return [attempt1[1], Number(attempt1[2])];
    }

    // Anonymous functions: "at filename:lineNumber:columnNumber"
    var attempt2 = /at ([^ ]+):(\d+):(?:\d+)$/.exec(stackLine);
    if (attempt2) {
        return [attempt2[1], Number(attempt2[2])];
    }

    // Firefox style: "function@filename:lineNumber or @filename:lineNumber"
    var attempt3 = /.*@(.+):(\d+)$/.exec(stackLine);
    if (attempt3) {
        return [attempt3[1], Number(attempt3[2])];
    }
}

function isInternalFrame(stackLine) {
    var fileNameAndLineNumber = getFileNameAndLineNumber(stackLine);

    if (!fileNameAndLineNumber) {
        return false;
    }

    var fileName = fileNameAndLineNumber[0];
    var lineNumber = fileNameAndLineNumber[1];

    return fileName === qFileName &&
        lineNumber >= qStartingLine &&
        lineNumber <= qEndingLine;
}

// discover own file name and line number range for filtering stack
// traces
function captureLine() {
    if (!hasStacks) {
        return;
    }

    try {
        throw new Error();
    } catch (e) {
        var lines = e.stack.split("\n");
        var firstLine = lines[0].indexOf("@") > 0 ? lines[1] : lines[2];
        var fileNameAndLineNumber = getFileNameAndLineNumber(firstLine);
        if (!fileNameAndLineNumber) {
            return;
        }

        qFileName = fileNameAndLineNumber[0];
        return fileNameAndLineNumber[1];
    }
}

function deprecate(callback, name, alternative) {
    return function () {
        if (typeof console !== "undefined" &&
            typeof console.warn === "function") {
            console.warn(name + " is deprecated, use " + alternative +
                         " instead.", new Error("").stack);
        }
        return callback.apply(callback, arguments);
    };
}

// end of shims
// beginning of real work

/**
 * Constructs a promise for an immediate reference, passes promises through, or
 * coerces promises from different systems.
 * @param value immediate reference or promise
 */
function Q(value) {
    // If the object is already a Promise, return it directly.  This enables
    // the resolve function to both be used to created references from objects,
    // but to tolerably coerce non-promises to promises.
    if (value instanceof Promise) {
        return value;
    }

    // assimilate thenables
    if (isPromiseAlike(value)) {
        return coerce(value);
    } else {
        return fulfill(value);
    }
}
Q.resolve = Q;

/**
 * Performs a task in a future turn of the event loop.
 * @param {Function} task
 */
Q.nextTick = nextTick;

/**
 * Controls whether or not long stack traces will be on
 */
Q.longStackSupport = false;

/**
 * The counter is used to determine the stopping point for building
 * long stack traces. In makeStackTraceLong we walk backwards through
 * the linked list of promises, only stacks which were created before
 * the rejection are concatenated.
 */
var longStackCounter = 1;

// enable long stacks if Q_DEBUG is set
if (typeof process === "object" && process && process.env && process.env.Q_DEBUG) {
    Q.longStackSupport = true;
}

/**
 * Constructs a {promise, resolve, reject} object.
 *
 * `resolve` is a callback to invoke with a more resolved value for the
 * promise. To fulfill the promise, invoke `resolve` with any value that is
 * not a thenable. To reject the promise, invoke `resolve` with a rejected
 * thenable, or invoke `reject` with the reason directly. To resolve the
 * promise to another thenable, thus putting it in the same state, invoke
 * `resolve` with that other thenable.
 */
Q.defer = defer;
function defer() {
    // if "messages" is an "Array", that indicates that the promise has not yet
    // been resolved.  If it is "undefined", it has been resolved.  Each
    // element of the messages array is itself an array of complete arguments to
    // forward to the resolved promise.  We coerce the resolution value to a
    // promise using the `resolve` function because it handles both fully
    // non-thenable values and other thenables gracefully.
    var messages = [], progressListeners = [], resolvedPromise;

    var deferred = object_create(defer.prototype);
    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, operands) {
        var args = array_slice(arguments);
        if (messages) {
            messages.push(args);
            if (op === "when" && operands[1]) { // progress operand
                progressListeners.push(operands[1]);
            }
        } else {
            Q.nextTick(function () {
                resolvedPromise.promiseDispatch.apply(resolvedPromise, args);
            });
        }
    };

    // XXX deprecated
    promise.valueOf = function () {
        if (messages) {
            return promise;
        }
        var nearerValue = nearer(resolvedPromise);
        if (isPromise(nearerValue)) {
            resolvedPromise = nearerValue; // shorten chain
        }
        return nearerValue;
    };

    promise.inspect = function () {
        if (!resolvedPromise) {
            return { state: "pending" };
        }
        return resolvedPromise.inspect();
    };

    if (Q.longStackSupport && hasStacks) {
        try {
            throw new Error();
        } catch (e) {
            // NOTE: don't try to use `Error.captureStackTrace` or transfer the
            // accessor around; that causes memory leaks as per GH-111. Just
            // reify the stack trace as a string ASAP.
            //
            // At the same time, cut off the first line; it's always just
            // "[object Promise]\n", as per the `toString`.
            promise.stack = e.stack.substring(e.stack.indexOf("\n") + 1);
            promise.stackCounter = longStackCounter++;
        }
    }

    // NOTE: we do the checks for `resolvedPromise` in each method, instead of
    // consolidating them into `become`, since otherwise we'd create new
    // promises with the lines `become(whatever(value))`. See e.g. GH-252.

    function become(newPromise) {
        resolvedPromise = newPromise;

        if (Q.longStackSupport && hasStacks) {
            // Only hold a reference to the new promise if long stacks
            // are enabled to reduce memory usage
            promise.source = newPromise;
        }

        array_reduce(messages, function (undefined, message) {
            Q.nextTick(function () {
                newPromise.promiseDispatch.apply(newPromise, message);
            });
        }, void 0);

        messages = void 0;
        progressListeners = void 0;
    }

    deferred.promise = promise;
    deferred.resolve = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(Q(value));
    };

    deferred.fulfill = function (value) {
        if (resolvedPromise) {
            return;
        }

        become(fulfill(value));
    };
    deferred.reject = function (reason) {
        if (resolvedPromise) {
            return;
        }

        become(reject(reason));
    };
    deferred.notify = function (progress) {
        if (resolvedPromise) {
            return;
        }

        array_reduce(progressListeners, function (undefined, progressListener) {
            Q.nextTick(function () {
                progressListener(progress);
            });
        }, void 0);
    };

    return deferred;
}

/**
 * Creates a Node-style callback that will resolve or reject the deferred
 * promise.
 * @returns a nodeback
 */
defer.prototype.makeNodeResolver = function () {
    var self = this;
    return function (error, value) {
        if (error) {
            self.reject(error);
        } else if (arguments.length > 2) {
            self.resolve(array_slice(arguments, 1));
        } else {
            self.resolve(value);
        }
    };
};

/**
 * @param resolver {Function} a function that returns nothing and accepts
 * the resolve, reject, and notify functions for a deferred.
 * @returns a promise that may be resolved with the given resolve and reject
 * functions, or rejected by a thrown exception in resolver
 */
Q.Promise = promise; // ES6
Q.promise = promise;
function promise(resolver) {
    if (typeof resolver !== "function") {
        throw new TypeError("resolver must be a function.");
    }
    var deferred = defer();
    try {
        resolver(deferred.resolve, deferred.reject, deferred.notify);
    } catch (reason) {
        deferred.reject(reason);
    }
    return deferred.promise;
}

promise.race = race; // ES6
promise.all = all; // ES6
promise.reject = reject; // ES6
promise.resolve = Q; // ES6

// XXX experimental.  This method is a way to denote that a local value is
// serializable and should be immediately dispatched to a remote upon request,
// instead of passing a reference.
Q.passByCopy = function (object) {
    //freeze(object);
    //passByCopies.set(object, true);
    return object;
};

Promise.prototype.passByCopy = function () {
    //freeze(object);
    //passByCopies.set(object, true);
    return this;
};

/**
 * If two promises eventually fulfill to the same value, promises that value,
 * but otherwise rejects.
 * @param x {Any*}
 * @param y {Any*}
 * @returns {Any*} a promise for x and y if they are the same, but a rejection
 * otherwise.
 *
 */
Q.join = function (x, y) {
    return Q(x).join(y);
};

Promise.prototype.join = function (that) {
    return Q([this, that]).spread(function (x, y) {
        if (x === y) {
            // TODO: "===" should be Object.is or equiv
            return x;
        } else {
            throw new Error("Q can't join: not the same: " + x + " " + y);
        }
    });
};

/**
 * Returns a promise for the first of an array of promises to become settled.
 * @param answers {Array[Any*]} promises to race
 * @returns {Any*} the first promise to be settled
 */
Q.race = race;
function race(answerPs) {
    return promise(function (resolve, reject) {
        // Switch to this once we can assume at least ES5
        // answerPs.forEach(function (answerP) {
        //     Q(answerP).then(resolve, reject);
        // });
        // Use this in the meantime
        for (var i = 0, len = answerPs.length; i < len; i++) {
            Q(answerPs[i]).then(resolve, reject);
        }
    });
}

Promise.prototype.race = function () {
    return this.then(Q.race);
};

/**
 * Constructs a Promise with a promise descriptor object and optional fallback
 * function.  The descriptor contains methods like when(rejected), get(name),
 * set(name, value), post(name, args), and delete(name), which all
 * return either a value, a promise for a value, or a rejection.  The fallback
 * accepts the operation name, a resolver, and any further arguments that would
 * have been forwarded to the appropriate method above had a method been
 * provided with the proper name.  The API makes no guarantees about the nature
 * of the returned object, apart from that it is usable whereever promises are
 * bought and sold.
 */
Q.makePromise = Promise;
function Promise(descriptor, fallback, inspect) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error(
                "Promise does not support operation: " + op
            ));
        };
    }
    if (inspect === void 0) {
        inspect = function () {
            return {state: "unknown"};
        };
    }

    var promise = object_create(Promise.prototype);

    promise.promiseDispatch = function (resolve, op, args) {
        var result;
        try {
            if (descriptor[op]) {
                result = descriptor[op].apply(promise, args);
            } else {
                result = fallback.call(promise, op, args);
            }
        } catch (exception) {
            result = reject(exception);
        }
        if (resolve) {
            resolve(result);
        }
    };

    promise.inspect = inspect;

    // XXX deprecated `valueOf` and `exception` support
    if (inspect) {
        var inspected = inspect();
        if (inspected.state === "rejected") {
            promise.exception = inspected.reason;
        }

        promise.valueOf = function () {
            var inspected = inspect();
            if (inspected.state === "pending" ||
                inspected.state === "rejected") {
                return promise;
            }
            return inspected.value;
        };
    }

    return promise;
}

Promise.prototype.toString = function () {
    return "[object Promise]";
};

Promise.prototype.then = function (fulfilled, rejected, progressed) {
    var self = this;
    var deferred = defer();
    var done = false;   // ensure the untrusted promise makes at most a
                        // single call to one of the callbacks

    function _fulfilled(value) {
        try {
            return typeof fulfilled === "function" ? fulfilled(value) : value;
        } catch (exception) {
            return reject(exception);
        }
    }

    function _rejected(exception) {
        if (typeof rejected === "function") {
            makeStackTraceLong(exception, self);
            try {
                return rejected(exception);
            } catch (newException) {
                return reject(newException);
            }
        }
        return reject(exception);
    }

    function _progressed(value) {
        return typeof progressed === "function" ? progressed(value) : value;
    }

    Q.nextTick(function () {
        self.promiseDispatch(function (value) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_fulfilled(value));
        }, "when", [function (exception) {
            if (done) {
                return;
            }
            done = true;

            deferred.resolve(_rejected(exception));
        }]);
    });

    // Progress propagator need to be attached in the current tick.
    self.promiseDispatch(void 0, "when", [void 0, function (value) {
        var newValue;
        var threw = false;
        try {
            newValue = _progressed(value);
        } catch (e) {
            threw = true;
            if (Q.onerror) {
                Q.onerror(e);
            } else {
                throw e;
            }
        }

        if (!threw) {
            deferred.notify(newValue);
        }
    }]);

    return deferred.promise;
};

Q.tap = function (promise, callback) {
    return Q(promise).tap(callback);
};

/**
 * Works almost like "finally", but not called for rejections.
 * Original resolution value is passed through callback unaffected.
 * Callback may return a promise that will be awaited for.
 * @param {Function} callback
 * @returns {Q.Promise}
 * @example
 * doSomething()
 *   .then(...)
 *   .tap(console.log)
 *   .then(...);
 */
Promise.prototype.tap = function (callback) {
    callback = Q(callback);

    return this.then(function (value) {
        return callback.fcall(value).thenResolve(value);
    });
};

/**
 * Registers an observer on a promise.
 *
 * Guarantees:
 *
 * 1. that fulfilled and rejected will be called only once.
 * 2. that either the fulfilled callback or the rejected callback will be
 *    called, but not both.
 * 3. that fulfilled and rejected will not be called in this turn.
 *
 * @param value      promise or immediate reference to observe
 * @param fulfilled  function to be called with the fulfilled value
 * @param rejected   function to be called with the rejection exception
 * @param progressed function to be called on any progress notifications
 * @return promise for the return value from the invoked callback
 */
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
    return Q(value).then(fulfilled, rejected, progressed);
}

Promise.prototype.thenResolve = function (value) {
    return this.then(function () { return value; });
};

Q.thenResolve = function (promise, value) {
    return Q(promise).thenResolve(value);
};

Promise.prototype.thenReject = function (reason) {
    return this.then(function () { throw reason; });
};

Q.thenReject = function (promise, reason) {
    return Q(promise).thenReject(reason);
};

/**
 * If an object is not a promise, it is as "near" as possible.
 * If a promise is rejected, it is as "near" as possible too.
 * If it’s a fulfilled promise, the fulfillment value is nearer.
 * If it’s a deferred promise and the deferred has been resolved, the
 * resolution is "nearer".
 * @param object
 * @returns most resolved (nearest) form of the object
 */

// XXX should we re-do this?
Q.nearer = nearer;
function nearer(value) {
    if (isPromise(value)) {
        var inspected = value.inspect();
        if (inspected.state === "fulfilled") {
            return inspected.value;
        }
    }
    return value;
}

/**
 * @returns whether the given object is a promise.
 * Otherwise it is a fulfilled value.
 */
Q.isPromise = isPromise;
function isPromise(object) {
    return object instanceof Promise;
}

Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
    return isObject(object) && typeof object.then === "function";
}

/**
 * @returns whether the given object is a pending promise, meaning not
 * fulfilled or rejected.
 */
Q.isPending = isPending;
function isPending(object) {
    return isPromise(object) && object.inspect().state === "pending";
}

Promise.prototype.isPending = function () {
    return this.inspect().state === "pending";
};

/**
 * @returns whether the given object is a value or fulfilled
 * promise.
 */
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
    return !isPromise(object) || object.inspect().state === "fulfilled";
}

Promise.prototype.isFulfilled = function () {
    return this.inspect().state === "fulfilled";
};

/**
 * @returns whether the given object is a rejected promise.
 */
Q.isRejected = isRejected;
function isRejected(object) {
    return isPromise(object) && object.inspect().state === "rejected";
}

Promise.prototype.isRejected = function () {
    return this.inspect().state === "rejected";
};

//// BEGIN UNHANDLED REJECTION TRACKING

// This promise library consumes exceptions thrown in handlers so they can be
// handled by a subsequent promise.  The exceptions get added to this array when
// they are created, and removed when they are handled.  Note that in ES6 or
// shimmed environments, this would naturally be a `Set`.
var unhandledReasons = [];
var unhandledRejections = [];
var reportedUnhandledRejections = [];
var trackUnhandledRejections = true;

function resetUnhandledRejections() {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;

    if (!trackUnhandledRejections) {
        trackUnhandledRejections = true;
    }
}

function trackRejection(promise, reason) {
    if (!trackUnhandledRejections) {
        return;
    }
    if (typeof process === "object" && typeof process.emit === "function") {
        Q.nextTick.runAfter(function () {
            if (array_indexOf(unhandledRejections, promise) !== -1) {
                process.emit("unhandledRejection", reason, promise);
                reportedUnhandledRejections.push(promise);
            }
        });
    }

    unhandledRejections.push(promise);
    if (reason && typeof reason.stack !== "undefined") {
        unhandledReasons.push(reason.stack);
    } else {
        unhandledReasons.push("(no stack) " + reason);
    }
}

function untrackRejection(promise) {
    if (!trackUnhandledRejections) {
        return;
    }

    var at = array_indexOf(unhandledRejections, promise);
    if (at !== -1) {
        if (typeof process === "object" && typeof process.emit === "function") {
            Q.nextTick.runAfter(function () {
                var atReport = array_indexOf(reportedUnhandledRejections, promise);
                if (atReport !== -1) {
                    process.emit("rejectionHandled", unhandledReasons[at], promise);
                    reportedUnhandledRejections.splice(atReport, 1);
                }
            });
        }
        unhandledRejections.splice(at, 1);
        unhandledReasons.splice(at, 1);
    }
}

Q.resetUnhandledRejections = resetUnhandledRejections;

Q.getUnhandledReasons = function () {
    // Make a copy so that consumers can't interfere with our internal state.
    return unhandledReasons.slice();
};

Q.stopUnhandledRejectionTracking = function () {
    resetUnhandledRejections();
    trackUnhandledRejections = false;
};

resetUnhandledRejections();

//// END UNHANDLED REJECTION TRACKING

/**
 * Constructs a rejected promise.
 * @param reason value describing the failure
 */
Q.reject = reject;
function reject(reason) {
    var rejection = Promise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                untrackRejection(this);
            }
            return rejected ? rejected(reason) : this;
        }
    }, function fallback() {
        return this;
    }, function inspect() {
        return { state: "rejected", reason: reason };
    });

    // Note that the reason has not been handled.
    trackRejection(rejection, reason);

    return rejection;
}

/**
 * Constructs a fulfilled promise for an immediate reference.
 * @param value immediate reference
 */
Q.fulfill = fulfill;
function fulfill(value) {
    return Promise({
        "when": function () {
            return value;
        },
        "get": function (name) {
            return value[name];
        },
        "set": function (name, rhs) {
            value[name] = rhs;
        },
        "delete": function (name) {
            delete value[name];
        },
        "post": function (name, args) {
            // Mark Miller proposes that post with no name should apply a
            // promised function.
            if (name === null || name === void 0) {
                return value.apply(void 0, args);
            } else {
                return value[name].apply(value, args);
            }
        },
        "apply": function (thisp, args) {
            return value.apply(thisp, args);
        },
        "keys": function () {
            return object_keys(value);
        }
    }, void 0, function inspect() {
        return { state: "fulfilled", value: value };
    });
}

/**
 * Converts thenables to Q promises.
 * @param promise thenable promise
 * @returns a Q promise
 */
function coerce(promise) {
    var deferred = defer();
    Q.nextTick(function () {
        try {
            promise.then(deferred.resolve, deferred.reject, deferred.notify);
        } catch (exception) {
            deferred.reject(exception);
        }
    });
    return deferred.promise;
}

/**
 * Annotates an object such that it will never be
 * transferred away from this process over any promise
 * communication channel.
 * @param object
 * @returns promise a wrapping of that object that
 * additionally responds to the "isDef" message
 * without a rejection.
 */
Q.master = master;
function master(object) {
    return Promise({
        "isDef": function () {}
    }, function fallback(op, args) {
        return dispatch(object, op, args);
    }, function () {
        return Q(object).inspect();
    });
}

/**
 * Spreads the values of a promised array of arguments into the
 * fulfillment callback.
 * @param fulfilled callback that receives variadic arguments from the
 * promised array
 * @param rejected callback that receives the exception if the promise
 * is rejected.
 * @returns a promise for the return value or thrown exception of
 * either callback.
 */
Q.spread = spread;
function spread(value, fulfilled, rejected) {
    return Q(value).spread(fulfilled, rejected);
}

Promise.prototype.spread = function (fulfilled, rejected) {
    return this.all().then(function (array) {
        return fulfilled.apply(void 0, array);
    }, rejected);
};

/**
 * The async function is a decorator for generator functions, turning
 * them into asynchronous generators.  Although generators are only part
 * of the newest ECMAScript 6 drafts, this code does not cause syntax
 * errors in older engines.  This code should continue to work and will
 * in fact improve over time as the language improves.
 *
 * ES6 generators are currently part of V8 version 3.19 with the
 * --harmony-generators runtime flag enabled.  SpiderMonkey has had them
 * for longer, but under an older Python-inspired form.  This function
 * works on both kinds of generators.
 *
 * Decorates a generator function such that:
 *  - it may yield promises
 *  - execution will continue when that promise is fulfilled
 *  - the value of the yield expression will be the fulfilled value
 *  - it returns a promise for the return value (when the generator
 *    stops iterating)
 *  - the decorated function returns a promise for the return value
 *    of the generator or the first rejected promise among those
 *    yielded.
 *  - if an error is thrown in the generator, it propagates through
 *    every following yield until it is caught, or until it escapes
 *    the generator function altogether, and is translated into a
 *    rejection for the promise returned by the decorated generator.
 */
Q.async = async;
function async(makeGenerator) {
    return function () {
        // when verb is "send", arg is a value
        // when verb is "throw", arg is an exception
        function continuer(verb, arg) {
            var result;

            // Until V8 3.19 / Chromium 29 is released, SpiderMonkey is the only
            // engine that has a deployed base of browsers that support generators.
            // However, SM's generators use the Python-inspired semantics of
            // outdated ES6 drafts.  We would like to support ES6, but we'd also
            // like to make it possible to use generators in deployed browsers, so
            // we also support Python-style generators.  At some point we can remove
            // this block.

            if (typeof StopIteration === "undefined") {
                // ES6 Generators
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    return reject(exception);
                }
                if (result.done) {
                    return Q(result.value);
                } else {
                    return when(result.value, callback, errback);
                }
            } else {
                // SpiderMonkey Generators
                // FIXME: Remove this case when SM does ES6 generators.
                try {
                    result = generator[verb](arg);
                } catch (exception) {
                    if (isStopIteration(exception)) {
                        return Q(exception.value);
                    } else {
                        return reject(exception);
                    }
                }
                return when(result, callback, errback);
            }
        }
        var generator = makeGenerator.apply(this, arguments);
        var callback = continuer.bind(continuer, "next");
        var errback = continuer.bind(continuer, "throw");
        return callback();
    };
}

/**
 * The spawn function is a small wrapper around async that immediately
 * calls the generator and also ends the promise chain, so that any
 * unhandled errors are thrown instead of forwarded to the error
 * handler. This is useful because it's extremely common to run
 * generators at the top-level to work with libraries.
 */
Q.spawn = spawn;
function spawn(makeGenerator) {
    Q.done(Q.async(makeGenerator)());
}

// FIXME: Remove this interface once ES6 generators are in SpiderMonkey.
/**
 * Throws a ReturnValue exception to stop an asynchronous generator.
 *
 * This interface is a stop-gap measure to support generator return
 * values in older Firefox/SpiderMonkey.  In browsers that support ES6
 * generators like Chromium 29, just use "return" in your generator
 * functions.
 *
 * @param value the return value for the surrounding generator
 * @throws ReturnValue exception with the value.
 * @example
 * // ES6 style
 * Q.async(function* () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      return foo + bar;
 * })
 * // Older SpiderMonkey style
 * Q.async(function () {
 *      var foo = yield getFooPromise();
 *      var bar = yield getBarPromise();
 *      Q.return(foo + bar);
 * })
 */
Q["return"] = _return;
function _return(value) {
    throw new QReturnValue(value);
}

/**
 * The promised function decorator ensures that any promise arguments
 * are settled and passed as values (`this` is also settled and passed
 * as a value).  It will also ensure that the result of a function is
 * always a promise.
 *
 * @example
 * var add = Q.promised(function (a, b) {
 *     return a + b;
 * });
 * add(Q(a), Q(B));
 *
 * @param {function} callback The function to decorate
 * @returns {function} a function that has been decorated.
 */
Q.promised = promised;
function promised(callback) {
    return function () {
        return spread([this, all(arguments)], function (self, args) {
            return callback.apply(self, args);
        });
    };
}

/**
 * sends a message to a value in a future turn
 * @param object* the recipient
 * @param op the name of the message operation, e.g., "when",
 * @param args further arguments to be forwarded to the operation
 * @returns result {Promise} a promise for the result of the operation
 */
Q.dispatch = dispatch;
function dispatch(object, op, args) {
    return Q(object).dispatch(op, args);
}

Promise.prototype.dispatch = function (op, args) {
    var self = this;
    var deferred = defer();
    Q.nextTick(function () {
        self.promiseDispatch(deferred.resolve, op, args);
    });
    return deferred.promise;
};

/**
 * Gets the value of a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to get
 * @return promise for the property value
 */
Q.get = function (object, key) {
    return Q(object).dispatch("get", [key]);
};

Promise.prototype.get = function (key) {
    return this.dispatch("get", [key]);
};

/**
 * Sets the value of a property in a future turn.
 * @param object    promise or immediate reference for object object
 * @param name      name of property to set
 * @param value     new value of property
 * @return promise for the return value
 */
Q.set = function (object, key, value) {
    return Q(object).dispatch("set", [key, value]);
};

Promise.prototype.set = function (key, value) {
    return this.dispatch("set", [key, value]);
};

/**
 * Deletes a property in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of property to delete
 * @return promise for the return value
 */
Q.del = // XXX legacy
Q["delete"] = function (object, key) {
    return Q(object).dispatch("delete", [key]);
};

Promise.prototype.del = // XXX legacy
Promise.prototype["delete"] = function (key) {
    return this.dispatch("delete", [key]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param value     a value to post, typically an array of
 *                  invocation arguments for promises that
 *                  are ultimately backed with `resolve` values,
 *                  as opposed to those backed with URLs
 *                  wherein the posted value can be any
 *                  JSON serializable object.
 * @return promise for the return value
 */
// bound locally because it is used by other methods
Q.mapply = // XXX As proposed by "Redsandro"
Q.post = function (object, name, args) {
    return Q(object).dispatch("post", [name, args]);
};

Promise.prototype.mapply = // XXX As proposed by "Redsandro"
Promise.prototype.post = function (name, args) {
    return this.dispatch("post", [name, args]);
};

/**
 * Invokes a method in a future turn.
 * @param object    promise or immediate reference for target object
 * @param name      name of method to invoke
 * @param ...args   array of invocation arguments
 * @return promise for the return value
 */
Q.send = // XXX Mark Miller's proposed parlance
Q.mcall = // XXX As proposed by "Redsandro"
Q.invoke = function (object, name /*...args*/) {
    return Q(object).dispatch("post", [name, array_slice(arguments, 2)]);
};

Promise.prototype.send = // XXX Mark Miller's proposed parlance
Promise.prototype.mcall = // XXX As proposed by "Redsandro"
Promise.prototype.invoke = function (name /*...args*/) {
    return this.dispatch("post", [name, array_slice(arguments, 1)]);
};

/**
 * Applies the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param args      array of application arguments
 */
Q.fapply = function (object, args) {
    return Q(object).dispatch("apply", [void 0, args]);
};

Promise.prototype.fapply = function (args) {
    return this.dispatch("apply", [void 0, args]);
};

/**
 * Calls the promised function in a future turn.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q["try"] =
Q.fcall = function (object /* ...args*/) {
    return Q(object).dispatch("apply", [void 0, array_slice(arguments, 1)]);
};

Promise.prototype.fcall = function (/*...args*/) {
    return this.dispatch("apply", [void 0, array_slice(arguments)]);
};

/**
 * Binds the promised function, transforming return values into a fulfilled
 * promise and thrown errors into a rejected one.
 * @param object    promise or immediate reference for target function
 * @param ...args   array of application arguments
 */
Q.fbind = function (object /*...args*/) {
    var promise = Q(object);
    var args = array_slice(arguments, 1);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};
Promise.prototype.fbind = function (/*...args*/) {
    var promise = this;
    var args = array_slice(arguments);
    return function fbound() {
        return promise.dispatch("apply", [
            this,
            args.concat(array_slice(arguments))
        ]);
    };
};

/**
 * Requests the names of the owned properties of a promised
 * object in a future turn.
 * @param object    promise or immediate reference for target object
 * @return promise for the keys of the eventually settled object
 */
Q.keys = function (object) {
    return Q(object).dispatch("keys", []);
};

Promise.prototype.keys = function () {
    return this.dispatch("keys", []);
};

/**
 * Turns an array of promises into a promise for an array.  If any of
 * the promises gets rejected, the whole array is rejected immediately.
 * @param {Array*} an array (or promise for an array) of values (or
 * promises for values)
 * @returns a promise for an array of the corresponding values
 */
// By Mark Miller
// http://wiki.ecmascript.org/doku.php?id=strawman:concurrency&rev=1308776521#allfulfilled
Q.all = all;
function all(promises) {
    return when(promises, function (promises) {
        var pendingCount = 0;
        var deferred = defer();
        array_reduce(promises, function (undefined, promise, index) {
            var snapshot;
            if (
                isPromise(promise) &&
                (snapshot = promise.inspect()).state === "fulfilled"
            ) {
                promises[index] = snapshot.value;
            } else {
                ++pendingCount;
                when(
                    promise,
                    function (value) {
                        promises[index] = value;
                        if (--pendingCount === 0) {
                            deferred.resolve(promises);
                        }
                    },
                    deferred.reject,
                    function (progress) {
                        deferred.notify({ index: index, value: progress });
                    }
                );
            }
        }, void 0);
        if (pendingCount === 0) {
            deferred.resolve(promises);
        }
        return deferred.promise;
    });
}

Promise.prototype.all = function () {
    return all(this);
};

/**
 * Returns the first resolved promise of an array. Prior rejected promises are
 * ignored.  Rejects only if all promises are rejected.
 * @param {Array*} an array containing values or promises for values
 * @returns a promise fulfilled with the value of the first resolved promise,
 * or a rejected promise if all promises are rejected.
 */
Q.any = any;

function any(promises) {
    if (promises.length === 0) {
        return Q.resolve();
    }

    var deferred = Q.defer();
    var pendingCount = 0;
    array_reduce(promises, function (prev, current, index) {
        var promise = promises[index];

        pendingCount++;

        when(promise, onFulfilled, onRejected, onProgress);
        function onFulfilled(result) {
            deferred.resolve(result);
        }
        function onRejected(err) {
            pendingCount--;
            if (pendingCount === 0) {
                err.message = ("Q can't get fulfillment value from any promise, all " +
                    "promises were rejected. Last error message: " + err.message);
                deferred.reject(err);
            }
        }
        function onProgress(progress) {
            deferred.notify({
                index: index,
                value: progress
            });
        }
    }, undefined);

    return deferred.promise;
}

Promise.prototype.any = function () {
    return any(this);
};

/**
 * Waits for all promises to be settled, either fulfilled or
 * rejected.  This is distinct from `all` since that would stop
 * waiting at the first rejection.  The promise returned by
 * `allResolved` will never be rejected.
 * @param promises a promise for an array (or an array) of promises
 * (or values)
 * @return a promise for an array of promises
 */
Q.allResolved = deprecate(allResolved, "allResolved", "allSettled");
function allResolved(promises) {
    return when(promises, function (promises) {
        promises = array_map(promises, Q);
        return when(all(array_map(promises, function (promise) {
            return when(promise, noop, noop);
        })), function () {
            return promises;
        });
    });
}

Promise.prototype.allResolved = function () {
    return allResolved(this);
};

/**
 * @see Promise#allSettled
 */
Q.allSettled = allSettled;
function allSettled(promises) {
    return Q(promises).allSettled();
}

/**
 * Turns an array of promises into a promise for an array of their states (as
 * returned by `inspect`) when they have all settled.
 * @param {Array[Any*]} values an array (or promise for an array) of values (or
 * promises for values)
 * @returns {Array[State]} an array of states for the respective values.
 */
Promise.prototype.allSettled = function () {
    return this.then(function (promises) {
        return all(array_map(promises, function (promise) {
            promise = Q(promise);
            function regardless() {
                return promise.inspect();
            }
            return promise.then(regardless, regardless);
        }));
    });
};

/**
 * Captures the failure of a promise, giving an oportunity to recover
 * with a callback.  If the given promise is fulfilled, the returned
 * promise is fulfilled.
 * @param {Any*} promise for something
 * @param {Function} callback to fulfill the returned promise if the
 * given promise is rejected
 * @returns a promise for the return value of the callback
 */
Q.fail = // XXX legacy
Q["catch"] = function (object, rejected) {
    return Q(object).then(void 0, rejected);
};

Promise.prototype.fail = // XXX legacy
Promise.prototype["catch"] = function (rejected) {
    return this.then(void 0, rejected);
};

/**
 * Attaches a listener that can respond to progress notifications from a
 * promise's originating deferred. This listener receives the exact arguments
 * passed to ``deferred.notify``.
 * @param {Any*} promise for something
 * @param {Function} callback to receive any progress notifications
 * @returns the given promise, unchanged
 */
Q.progress = progress;
function progress(object, progressed) {
    return Q(object).then(void 0, void 0, progressed);
}

Promise.prototype.progress = function (progressed) {
    return this.then(void 0, void 0, progressed);
};

/**
 * Provides an opportunity to observe the settling of a promise,
 * regardless of whether the promise is fulfilled or rejected.  Forwards
 * the resolution to the returned promise when the callback is done.
 * The callback can return a promise to defer completion.
 * @param {Any*} promise
 * @param {Function} callback to observe the resolution of the given
 * promise, takes no arguments.
 * @returns a promise for the resolution of the given promise when
 * ``fin`` is done.
 */
Q.fin = // XXX legacy
Q["finally"] = function (object, callback) {
    return Q(object)["finally"](callback);
};

Promise.prototype.fin = // XXX legacy
Promise.prototype["finally"] = function (callback) {
    if (!callback || typeof callback.apply !== "function") {
        throw new Error("Q can't apply finally callback");
    }
    callback = Q(callback);
    return this.then(function (value) {
        return callback.fcall().then(function () {
            return value;
        });
    }, function (reason) {
        // TODO attempt to recycle the rejection with "this".
        return callback.fcall().then(function () {
            throw reason;
        });
    });
};

/**
 * Terminates a chain of promises, forcing rejections to be
 * thrown as exceptions.
 * @param {Any*} promise at the end of a chain of promises
 * @returns nothing
 */
Q.done = function (object, fulfilled, rejected, progress) {
    return Q(object).done(fulfilled, rejected, progress);
};

Promise.prototype.done = function (fulfilled, rejected, progress) {
    var onUnhandledError = function (error) {
        // forward to a future turn so that ``when``
        // does not catch it and turn it into a rejection.
        Q.nextTick(function () {
            makeStackTraceLong(error, promise);
            if (Q.onerror) {
                Q.onerror(error);
            } else {
                throw error;
            }
        });
    };

    // Avoid unnecessary `nextTick`ing via an unnecessary `when`.
    var promise = fulfilled || rejected || progress ?
        this.then(fulfilled, rejected, progress) :
        this;

    if (typeof process === "object" && process && process.domain) {
        onUnhandledError = process.domain.bind(onUnhandledError);
    }

    promise.then(void 0, onUnhandledError);
};

/**
 * Causes a promise to be rejected if it does not get fulfilled before
 * some milliseconds time out.
 * @param {Any*} promise
 * @param {Number} milliseconds timeout
 * @param {Any*} custom error message or Error object (optional)
 * @returns a promise for the resolution of the given promise if it is
 * fulfilled before the timeout, otherwise rejected.
 */
Q.timeout = function (object, ms, error) {
    return Q(object).timeout(ms, error);
};

Promise.prototype.timeout = function (ms, error) {
    var deferred = defer();
    var timeoutId = setTimeout(function () {
        if (!error || "string" === typeof error) {
            error = new Error(error || "Timed out after " + ms + " ms");
            error.code = "ETIMEDOUT";
        }
        deferred.reject(error);
    }, ms);

    this.then(function (value) {
        clearTimeout(timeoutId);
        deferred.resolve(value);
    }, function (exception) {
        clearTimeout(timeoutId);
        deferred.reject(exception);
    }, deferred.notify);

    return deferred.promise;
};

/**
 * Returns a promise for the given value (or promised value), some
 * milliseconds after it resolved. Passes rejections immediately.
 * @param {Any*} promise
 * @param {Number} milliseconds
 * @returns a promise for the resolution of the given promise after milliseconds
 * time has elapsed since the resolution of the given promise.
 * If the given promise rejects, that is passed immediately.
 */
Q.delay = function (object, timeout) {
    if (timeout === void 0) {
        timeout = object;
        object = void 0;
    }
    return Q(object).delay(timeout);
};

Promise.prototype.delay = function (timeout) {
    return this.then(function (value) {
        var deferred = defer();
        setTimeout(function () {
            deferred.resolve(value);
        }, timeout);
        return deferred.promise;
    });
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided as an array, and returns a promise.
 *
 *      Q.nfapply(FS.readFile, [__filename])
 *      .then(function (content) {
 *      })
 *
 */
Q.nfapply = function (callback, args) {
    return Q(callback).nfapply(args);
};

Promise.prototype.nfapply = function (args) {
    var deferred = defer();
    var nodeArgs = array_slice(args);
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Passes a continuation to a Node function, which is called with the given
 * arguments provided individually, and returns a promise.
 * @example
 * Q.nfcall(FS.readFile, __filename)
 * .then(function (content) {
 * })
 *
 */
Q.nfcall = function (callback /*...args*/) {
    var args = array_slice(arguments, 1);
    return Q(callback).nfapply(args);
};

Promise.prototype.nfcall = function (/*...args*/) {
    var nodeArgs = array_slice(arguments);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.fapply(nodeArgs).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Wraps a NodeJS continuation passing function and returns an equivalent
 * version that returns a promise.
 * @example
 * Q.nfbind(FS.readFile, __filename)("utf-8")
 * .then(console.log)
 * .done()
 */
Q.nfbind =
Q.denodeify = function (callback /*...args*/) {
    if (callback === undefined) {
        throw new Error("Q can't wrap an undefined function");
    }
    var baseArgs = array_slice(arguments, 1);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        Q(callback).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nfbind =
Promise.prototype.denodeify = function (/*...args*/) {
    var args = array_slice(arguments);
    args.unshift(this);
    return Q.denodeify.apply(void 0, args);
};

Q.nbind = function (callback, thisp /*...args*/) {
    var baseArgs = array_slice(arguments, 2);
    return function () {
        var nodeArgs = baseArgs.concat(array_slice(arguments));
        var deferred = defer();
        nodeArgs.push(deferred.makeNodeResolver());
        function bound() {
            return callback.apply(thisp, arguments);
        }
        Q(bound).fapply(nodeArgs).fail(deferred.reject);
        return deferred.promise;
    };
};

Promise.prototype.nbind = function (/*thisp, ...args*/) {
    var args = array_slice(arguments, 0);
    args.unshift(this);
    return Q.nbind.apply(void 0, args);
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback with a given array of arguments, plus a provided callback.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param {Array} args arguments to pass to the method; the callback
 * will be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nmapply = // XXX As proposed by "Redsandro"
Q.npost = function (object, name, args) {
    return Q(object).npost(name, args);
};

Promise.prototype.nmapply = // XXX As proposed by "Redsandro"
Promise.prototype.npost = function (name, args) {
    var nodeArgs = array_slice(args || []);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * Calls a method of a Node-style object that accepts a Node-style
 * callback, forwarding the given variadic arguments, plus a provided
 * callback argument.
 * @param object an object that has the named method
 * @param {String} name name of the method of object
 * @param ...args arguments to pass to the method; the callback will
 * be provided by Q and appended to these arguments.
 * @returns a promise for the value or error
 */
Q.nsend = // XXX Based on Mark Miller's proposed "send"
Q.nmcall = // XXX Based on "Redsandro's" proposal
Q.ninvoke = function (object, name /*...args*/) {
    var nodeArgs = array_slice(arguments, 2);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    Q(object).dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

Promise.prototype.nsend = // XXX Based on Mark Miller's proposed "send"
Promise.prototype.nmcall = // XXX Based on "Redsandro's" proposal
Promise.prototype.ninvoke = function (name /*...args*/) {
    var nodeArgs = array_slice(arguments, 1);
    var deferred = defer();
    nodeArgs.push(deferred.makeNodeResolver());
    this.dispatch("post", [name, nodeArgs]).fail(deferred.reject);
    return deferred.promise;
};

/**
 * If a function would like to support both Node continuation-passing-style and
 * promise-returning-style, it can end its internal promise chain with
 * `nodeify(nodeback)`, forwarding the optional nodeback argument.  If the user
 * elects to use a nodeback, the result will be sent there.  If they do not
 * pass a nodeback, they will receive the result promise.
 * @param object a result (or a promise for a result)
 * @param {Function} nodeback a Node.js-style callback
 * @returns either the promise or nothing
 */
Q.nodeify = nodeify;
function nodeify(object, nodeback) {
    return Q(object).nodeify(nodeback);
}

Promise.prototype.nodeify = function (nodeback) {
    if (nodeback) {
        this.then(function (value) {
            Q.nextTick(function () {
                nodeback(null, value);
            });
        }, function (error) {
            Q.nextTick(function () {
                nodeback(error);
            });
        });
    } else {
        return this;
    }
};

Q.noConflict = function() {
    throw new Error("Q.noConflict only works when Q is used as a global");
};

// All code before this point will be filtered from stack traces.
var qEndingLine = captureLine();

return Q;

});
;define('Q', ['Q/q'], function (main) { return main; });

// Copyright (c) Microsoft.  All rights reserved.
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
// files (the "Software"), to deal  in the Software without restriction, including without limitation the rights  to use, copy,
// modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  IMPLIED, INCLUDING BUT NOT LIMITED TO THE
// WARRANTIES OF MERCHANTABILITY,  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
// ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

// datajs.js

(function(global){
    if (typeof window === "undefined") {
        window = this;
    }
})(this);

(function (window, undefined) {
    if (!window.datajs) {
        window.datajs = {};
    }

    if (!window.OData) {
        window.OData = {};
    }

    var datajs = window.datajs;
    var odata = window.OData;
    

    // Provides an enumeration of possible kinds of payloads.
    var PAYLOADTYPE_BATCH = "b";
    var PAYLOADTYPE_COMPLEXTYPE = "c";
    var PAYLOADTYPE_ENTRY = "entry";        // This is used when building the payload.
    var PAYLOADTYPE_FEEDORLINKS = "f";
    var PAYLOADTYPE_PRIMITIVETYPE = "p";
    var PAYLOADTYPE_SVCDOC = "s";
    var PAYLOADTYPE_UNKNOWN = "u";
    var PAYLOADTYPE_NONE = "n";

    // Provides an enumeration of possible kinds of properties.
    var PROPERTYKIND_COMPLEX = "c";
    var PROPERTYKIND_DEFERRED = "d";
    var PROPERTYKIND_INLINE = "i";
    var PROPERTYKIND_PRIMITIVE = "p";
    var PROPERTYKIND_NONE = "n";

    var assigned = function (value) {
        /// <summary>Checks whether the specified value is different from null and undefined.</summary>
        /// <param name="value" mayBeNull="true" optional="true">Value to check.</param>
        /// <returns type="Boolean">true if the value is assigned; false otherwise.</returns>
        return value !== null && value !== undefined;
    };

    var contains = function (arr, item) {
        /// <summary>Checks whether the specified item is in the array.</summary>
        /// <param name="arr" type="Array" optional="false" mayBeNull="false">Array to check in.</param>
        /// <param name="item">Item to look for.</param>
        /// <returns type="Boolean">true if the item is contained, false otherwise.</returns>

        var i, len;
        for (i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                return true;
            }
        }

        return false;
    };

    var defined = function (a, b) {
        /// <summary>Given two values, picks the first one that is not undefined.</summary>
        /// <param name="a">First value.</param>
        /// <param name="b">Second value.</param>
        /// <returns>a if it's a defined value; else b.</returns>
        return (a !== undefined) ? a : b;
    };

    var delay = function (callback) {
        /// <summary>Delays the invocation of the specified function until execution unwinds.</summary>
        /// <param name="callback" type="Function">Callback function.</param>
        if (arguments.length === 1) {
            window.setTimeout(callback, 0);
            return;
        }

        var args = Array.prototype.slice.call(arguments, 1);
        window.setTimeout(function () {
            callback.apply(this, args);
        }, 0);
    };


    var forEachSchema = function (metadata, callback) {
        /// <summary>Invokes a function once per schema in metadata.</summary>
        /// <param name="metadata">Metadata store; one of edmx, schema, or an array of any of them.</param>
        /// <param name="callback" type="Function">Callback function to invoke once per schema.</param>
        /// <returns>
        /// The first truthy value to be returned from the callback; null or the last falsy value otherwise.
        /// </returns>

        if (!metadata) {
            return null;
        }

        if (isArray(metadata)) {
            var i, len, result;
            for (i = 0, len = metadata.length; i < len; i++) {
                result = forEachSchema(metadata[i], callback);
                if (result) {
                    return result;
                }
            }

            return null;
        } else {
            if (metadata.dataServices) {
                return forEachSchema(metadata.dataServices.schema, callback);
            }

            return callback(metadata);
        }
    };

    var isDateTimeOffset = function (value) {
        /// <summary>Checks whether a Date object is DateTimeOffset value</summary>
        /// <param name="value" type="Date" mayBeNull="false">Value to check.</param>
        /// <returns type="Boolean">true if the value is a DateTimeOffset, false otherwise.</returns>
        return (value.__edmType === "Edm.DateTimeOffset" || (!value.__edmType && value.__offset));
    };

    var formatMilliseconds = function (ms, ns) {
        /// <summary>Formats a millisecond and a nanosecond value into a single string.</summary>
        /// <param name="ms" type="Number" mayBeNull="false">Number of milliseconds to format.</param>
        /// <param name="ns" type="Number" mayBeNull="false">Number of nanoseconds to format.</param>
        /// <returns type="String">Formatted text.</returns>
        /// <remarks>If the value is already as string it's returned as-is.</remarks>

        // Avoid generating milliseconds if not necessary.
        if (ms === 0) {
            ms = "";
        } else {
            ms = "." + formatNumberWidth(ms.toString(), 3);
        }
        if (ns > 0) {
            if (ms === "") {
                ms = ".000";
            }
            ms += formatNumberWidth(ns.toString(), 4);
        }
        return ms;
    };

    var formatDateTimeOffset = function (value) {
        /// <summary>Formats a DateTime or DateTimeOffset value a string.</summary>
        /// <param name="value" type="Date" mayBeNull="false">Value to format.</param>
        /// <returns type="String">Formatted text.</returns>
        /// <remarks>If the value is already as string it's returned as-is.</remarks>

        if (typeof value === "string") {
            return value;
        }

        var hasOffset = isDateTimeOffset(value);
        var offset = getCanonicalTimezone(value.__offset);
        if (hasOffset && offset !== "Z") {
            // We're about to change the value, so make a copy.
            value = new Date(value.valueOf());

            var timezone = parseTimezone(offset);
            var hours = value.getUTCHours() + (timezone.d * timezone.h);
            var minutes = value.getMinutes() + (timezone.d * timezone.m);

            value.setUTCHours(hours, minutes);
        } else if (!hasOffset) {
            // Don't suffix a 'Z' for Edm.DateTime values.
            offset = "";
        }

        var year = value.getUTCFullYear();
        var month = value.getUTCMonth() + 1;
        var sign = "";
        if (year <= 0) {
            year = -(year - 1);
            sign = "-";
        }

        var ms = formatMilliseconds(value.getUTCMilliseconds(), value.__ns);

        return sign +
            formatNumberWidth(year, 4) + "-" +
            formatNumberWidth(month, 2) + "-" +
            formatNumberWidth(value.getUTCDate(), 2) + "T" +
            formatNumberWidth(value.getUTCHours(), 2) + ":" +
            formatNumberWidth(value.getUTCMinutes(), 2) + ":" +
            formatNumberWidth(value.getUTCSeconds(), 2) +
            ms + offset;
    };

    var formatDuration = function (value) {
        /// <summary>Converts a duration to a string in xsd:duration format.</summary>
        /// <param name="value" type="Object">Object with ms and __edmType properties.</param>
        /// <returns type="String">String representation of the time object in xsd:duration format.</returns>

        var ms = value.ms;

        var sign = "";
        if (ms < 0) {
            sign = "-";
            ms = -ms;
        }

        var days = Math.floor(ms / 86400000);
        ms -= 86400000 * days;
        var hours = Math.floor(ms / 3600000);
        ms -= 3600000 * hours;
        var minutes = Math.floor(ms / 60000);
        ms -= 60000 * minutes;
        var seconds = Math.floor(ms / 1000);
        ms -= seconds * 1000;

        return sign + "P" +
               formatNumberWidth(days, 2) + "DT" +
               formatNumberWidth(hours, 2) + "H" +
               formatNumberWidth(minutes, 2) + "M" +
               formatNumberWidth(seconds, 2) +
               formatMilliseconds(ms, value.ns) + "S";
    };

    var formatNumberWidth = function (value, width, append) {
        /// <summary>Formats the specified value to the given width.</summary>
        /// <param name="value" type="Number">Number to format (non-negative).</param>
        /// <param name="width" type="Number">Minimum width for number.</param>
        /// <param name="append" type="Boolean">Flag indicating if the value is padded at the beginning (false) or at the end (true).</param>
        /// <returns type="String">Text representation.</returns>
        var result = value.toString(10);
        while (result.length < width) {
            if (append) {
                result += "0";
            } else {
                result = "0" + result;
            }
        }

        return result;
    };

    var getCanonicalTimezone = function (timezone) {
        /// <summary>Gets the canonical timezone representation.</summary>
        /// <param name="timezone" type="String">Timezone representation.</param>
        /// <returns type="String">An 'Z' string if the timezone is absent or 0; the timezone otherwise.</returns>

        return (!timezone || timezone === "Z" || timezone === "+00:00" || timezone === "-00:00") ? "Z" : timezone;
    };

    var invokeRequest = function (request, success, error, handler, httpClient, context) {
        /// <summary>Sends a request containing OData payload to a server.</summary>
        /// <param name="request">Object that represents the request to be sent..</param>
        /// <param name="success">Callback for a successful read operation.</param>
        /// <param name="error">Callback for handling errors.</param>
        /// <param name="handler">Handler for data serialization.</param>
        /// <param name="httpClient">HTTP client layer.</param>
        /// <param name="context">Context used for processing the request</param>
        return httpClient.request(request, function (response) {
            try {
                if (response.headers) {
                    normalizeHeaders(response.headers);
                }

                if (response.data === undefined) {
                    handler.read(response, context);
                }
            } catch (err) {
                if (err.request === undefined) {
                    err.request = request;
                }
                if (err.response === undefined) {
                    err.response = response;
                }
                error(err);
                return;
            }

            success(response.data, response);
        }, error);
    };

    var isArray = function (value) {
        /// <summary>Checks whether the specified value is an array object.</summary>
        /// <param name="value">Value to check.</param>
        /// <returns type="Boolean">true if the value is an array object; false otherwise.</returns>

        return Object.prototype.toString.call(value) === "[object Array]";
    };

    var isDate = function (value) {
        /// <summary>Checks whether the specified value is a Date object.</summary>
        /// <param name="value">Value to check.</param>
        /// <returns type="Boolean">true if the value is a Date object; false otherwise.</returns>

        return Object.prototype.toString.call(value) === "[object Date]";
    };

    var lookupProperty = function (properties, name) {
        /// <summary>Looks up a property by name.</summary>
        /// <param name="properties" type="Array" mayBeNull="true">Array of property objects as per EDM metadata.</param>
        /// <param name="name" type="String">Name to look for.</param>
        /// <returns type="Object">The property object; null if not found.</returns>

        if (properties) {
            var i, len;
            for (i = 0, len = properties.length; i < len; i++) {
                if (properties[i].name === name) {
                    return properties[i];
                }
            }
        }

        return null;
    };

    var lookupTypeInMetadata = function (name, metadata, kind) {
        /// <summary>Looks up a type object by name.</summary>
        /// <param name="name" type="String">Name, possibly null or empty.</param>
        /// <param name="metadata">Metadata store; one of edmx, schema, or an array of any of them.</param>
        /// <param name="kind" type="String">Kind of type to look for; one of 'entityType' or 'complexType'.</param>
        /// <returns>An type description if the name is found; null otherwise.</returns>

        return (name) ? forEachSchema(metadata, function (schema) {
            return lookupTypeInSchema(name, schema, kind);
        }) : null;
    };

    var lookupComplexType = function (name, metadata) {
        /// <summary>Looks up a complex type object by name.</summary>
        /// <param name="name" type="String">Name, possibly null or empty.</param>
        /// <param name="metadata">Metadata store; one of edmx, schema, or an array of any of them.</param>
        /// <returns>A complex type description if the name is found; null otherwise.</returns>

        return lookupTypeInMetadata(name, metadata, "complexType");
    };

    var lookupEntityType = function (name, metadata) {
        /// <summary>Looks up an entity type object by name.</summary>
        /// <param name="name" type="String">Name, possibly null or empty.</param>
        /// <param name="metadata">Metadata store; one of edmx, schema, or an array of any of them.</param>
        /// <returns>An entity type description if the name is found; null otherwise.</returns>

        return lookupTypeInMetadata(name, metadata, "entityType");
    };

    ////    Commented out - metadata is largely optional and we don't rely on it to this extent.
    ////    var lookupEntityTypeForNavigation = function (navigationProperty, metadata) {
    ////        /// <summary>Looks up the target entity type for a navigation property.</summary>
    ////        /// <param name="navigationProperty" type="Object"></param>
    ////        /// <param name="metadata" type="Object"></param>
    ////        /// <returns type="Object">The entity type metadata for the specified property, null if not found.</returns>
    ////        var rel = navigationProperty.relationship;
    ////        var association = forEachSchema(metadata, function (schema) {
    ////            // The name should be the namespace qualified name in 'ns'.'type' format.
    ////            var nameOnly = removeNamespace(schema["namespace"], rel);
    ////            var associations = schema.association;
    ////            if (nameOnly && associations) {
    ////                var i, len;
    ////                for (i = 0, len = associations.length; i < len; i++) {
    ////                    if (associations[i].name === nameOnly) {
    ////                        return associations[i];
    ////                    }
    ////                }
    ////            }
    ////        });
    ////        var result = null;
    ////        if (association) {
    ////            var end = association.end[0];
    ////            if (end.role !== navigationProperty.toRole) {
    ////                end = association.end[1];
    ////                // For metadata to be valid, end.role === navigationProperty.toRole now.
    ////            }
    ////            result = lookupEntityType(end.type, metadata);
    ////        }
    ////        return result;
    ////    };

    var removeNamespace = function (ns, fullName) {
        /// <summary>Given an expected namespace prefix, removes it from a full name.</summary>
        /// <param name="ns" type="String">Expected namespace.</param>
        /// <param name="fullName" type="String">Full name in 'ns'.'name' form.</param>
        /// <returns type="String">The local name, null if it isn't found in the expected namespace.</returns>

        if (fullName.indexOf(ns) === 0 && fullName.charAt(ns.length) === ".") {
            return fullName.substr(ns.length + 1);
        }

        return null;
    };

    var lookupTypeInSchema = function (name, metadata, kind) {
        /// <summary>Looks up an entity type object by name.</summary>
        /// <param name="name" type="String">Name (assigned).</param>
        /// <param name="metadata">Metadata store; one of edmx, schema.</param>
        /// <param name="kind" type="String">Kind of type to look for; one of 'entityType' or 'complexType'.</param>
        /// <returns>An entity type description if the name is found; null otherwise.</returns>
        /// <remarks>
        /// metadata is considered an edmx object if it contains a dataServices object.
        /// </remarks>

        if (metadata) {
            // The name should be the namespace qualified name in 'ns'.'type' format.
            var nameOnly = removeNamespace(metadata["namespace"], name);
            var types = metadata[kind];
            if (nameOnly && types) {
                var i, len;
                for (i = 0, len = types.length; i < len; i++) {
                    if (types[i].name === nameOnly) {
                        return types[i];
                    }
                }
            }
        }

        return null;
    };

    var normalHeaders = {
        "accept": "Accept",
        "content-type": "Content-Type",
        "dataserviceversion": "DataServiceVersion",
        "maxdataserviceversion": "MaxDataServiceVersion"
    };

    var normalizeHeaders = function (headers) {
        /// <summary>Normalizes headers so they can be found with consistent casing.</summary>
        /// <param name="headers" type="Object">Dictionary of name/value pairs.</param>

        for (var name in headers) {
            var lowerName = name.toLowerCase();
            var normalName = normalHeaders[lowerName];
            if (normalName && name !== normalName) {
                var val = headers[name];
                delete headers[name];
                headers[normalName] = val;
            }
        }
    };

    var undefinedDefault = function (value, defaultValue) {
        /// <summary>Returns a default value in place of undefined.</summary>
        /// <param name="value" mayBeNull="true" optional="true">Value to check.</param>
        /// <param name="defaultValue">Value to return if value is undefined.</param>
        /// <returns>value if it's defined; defaultValue otherwise.</returns>
        /// <remarks>
        /// This should only be used for cases where falsy values are valid;
        /// otherwise the pattern should be 'x = (value) ? value : defaultValue;'.
        /// </remarks>
        return (value !== undefined) ? value : defaultValue;
    };

    var parseInt10 = function (value) {
        /// <summary>Parses a value in base 10.</summary>
        /// <param name="value" type="String">String value to parse.</param>
        /// <returns type="Number">The parsed value, NaN if not a valid value.</returns>

        return parseInt(value, 10);
    };


    // The captured indices for this expression are:
    // 0       - complete input
    // 1       - direction
    // 2,3,4   - years, months, days
    // 5,6,7,8 - hours, minutes, seconds, miliseconds

    var parseTimeRE = /^([+-])?P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)(?:\.(\d+))?S)?)?/;

    var parseDuration = function (duration) {
        /// <summary>Parses a string in xsd:duration format.</summary>
        /// <param name="duration" type="String">Duration value.</param>
        /// <remarks>
        /// This method will throw an exception if the input string has a year or a month component. 
        /// </remarks>
        /// <returns type="Object">Object representing the time</returns>

        var parts = parseTimeRE.exec(duration);

        if (parts === null) {
            throw { message: "Invalid duration value." };
        }

        var years = parts[2] || "0";
        var months = parts[3] || "0";
        var days = parseInt10(parts[4] || 0);
        var hours = parseInt10(parts[5] || 0);
        var minutes = parseInt10(parts[6] || 0);
        var seconds = parseFloat(parts[7] || 0);

        if (years !== "0" || months !== "0") {
            throw { message: "Unsupported duration value." };
        }

        var ms = parts[8];
        var ns = 0;
        if (!ms) {
            ms = 0;
        } else {
            if (ms.length > 7) {
                throw { message: "Cannot parse duration value to given precision." };
            }

            ns = formatNumberWidth(ms.substring(3), 4, true);
            ms = formatNumberWidth(ms.substring(0, 3), 3, true);

            ms = parseInt10(ms);
            ns = parseInt10(ns);
        }

        ms += seconds * 1000 + minutes * 60000 + hours * 3600000 + days * 86400000;

        if (parts[1] === "-") {
            ms = -ms;
        }

        var result = { ms: ms, __edmType: "Edm.Time" };

        if (ns) {
            result.ns = ns;
        }
        return result;
    };

    var parseTimezone = function (timezone) {
        /// <summary>Parses a timezone description in (+|-)nn:nn format.</summary>
        /// <param name="timezone" type="String">Timezone offset.</param>
        /// <returns type="Object">
        /// An object with a (d)irection property of 1 for + and -1 for -,
        /// offset (h)ours and offset (m)inutes.
        /// </returns>

        var direction = timezone.substring(0, 1);
        direction = (direction === "+") ? 1 : -1;

        var offsetHours = parseInt10(timezone.substring(1));
        var offsetMinutes = parseInt10(timezone.substring(timezone.indexOf(":") + 1));
        return { d: direction, h: offsetHours, m: offsetMinutes };
    };

    var payloadTypeOf = function (data) {
        /// <summary>Determines the kind of payload applicable for the specified value.</summary>
        /// <param name="data">Value to check.</param>
        /// <returns type="String">One of the values declared on the payloadType object.</returns>

        switch (typeof (data)) {
            case "object":
                if (!data) {
                    return PAYLOADTYPE_NONE;
                }
                if (isArray(data) || isArray(data.results)) {
                    return PAYLOADTYPE_FEEDORLINKS;
                }
                if (data.__metadata && data.__metadata.uri !== undefined) {
                    return PAYLOADTYPE_ENTRY;
                }
                if (isArray(data.EntitySets)) {
                    return PAYLOADTYPE_SVCDOC;
                }
                if (isArray(data.__batchRequests)) {
                    return PAYLOADTYPE_BATCH;
                }
                if (isDate(data)) {
                    return PAYLOADTYPE_PRIMITIVETYPE;
                }

                return PAYLOADTYPE_COMPLEXTYPE;

            case "string":
            case "number":
            case "boolean":
                return PAYLOADTYPE_PRIMITIVETYPE;
        }

        return PAYLOADTYPE_UNKNOWN;
    };

    var prepareRequest = function (request, handler, context) {
        /// <summary>Prepares a request object so that it can be sent through the network.</summary>
        /// <param name="request">Object that represents the request to be sent.</param>
        /// <param name="handler">Handler for data serialization</param>
        /// <param name="context">Context used for preparing the request</param>

        // Default to GET if no method has been specified.    
        if (!request.method) {
            request.method = "GET";
        }

        if (!request.headers) {
            request.headers = {};
        } else {
            normalizeHeaders(request.headers);
        }

        if (request.headers.Accept === undefined) {
            request.headers.Accept = handler.accept;
        }

        if (assigned(request.data) && request.body === undefined) {
            handler.write(request, context);
        }

        if (!assigned(request.headers.MaxDataServiceVersion)) {
            request.headers.MaxDataServiceVersion = handler.maxDataServiceVersion || "1.0";
        }
    };

    var propertyKindOf = function (value) {
        /// <summary>Determines the kind of property for the specified value.</summary>
        /// <param name="value">Value to check.</param>
        /// <returns type="String">One of the values declared on the propertyKind object.</returns>

        switch (payloadTypeOf(value)) {
            case PAYLOADTYPE_COMPLEXTYPE:
                if (value.__deferred && value.__deferred.uri) {
                    return PROPERTYKIND_DEFERRED;
                }

                return PROPERTYKIND_COMPLEX;

            case PAYLOADTYPE_FEEDORLINKS:
            case PAYLOADTYPE_ENTRY:
                return PROPERTYKIND_INLINE;

            case PAYLOADTYPE_PRIMITIVETYPE:
                return PROPERTYKIND_PRIMITIVE;
        }
        return PROPERTYKIND_NONE;
    };

    var throwErrorCallback = function (error) {
        /// <summary>Default error handler.</summary>
        /// <param name="error" type="Object">Error to handle.</param>
        throw error;
    };

    var trimString = function (str) {
        /// <summary>Removes leading and trailing whitespaces from a string.</summary>
        /// <param name="str" type="String" optional="false" mayBeNull="false">String to trim</param>
        /// <returns type="String">The string with no leading or trailing whitespace.</returns>

        if (str.trim) {
            return str.trim();
        }

        return str.replace(/^\s+|\s+$/g, '');
    };

    // Regular expression that splits a uri into its components:
    // 0 - is the matched string.
    // 1 - is the scheme.
    // 2 - is the authority.
    // 3 - is the path.
    // 4 - is the query.
    // 5 - is the fragment.
    var uriRegEx = /^([^:\/?#]+:)?(\/\/[^\/?#]*)?([^?#:]+)?(\?[^#]*)?(#.*)?/;
    var uriPartNames = ["scheme", "authority", "path", "query", "fragment"];

    var getURIInfo = function (uri) {
        /// <summary>Gets information about the components of the specified URI.</summary>
        /// <param name="uri" type="String">URI to get information from.</param>
        /// <returns type="Object">
        /// An object with an isAbsolute flag and part names (scheme, authority, etc.) if available.
        /// </returns>

        var result = { isAbsolute: false };

        if (uri) {
            var matches = uriRegEx.exec(uri);
            if (matches) {
                var i, len;
                for (i = 0, len = uriPartNames.length; i < len; i++) {
                    if (matches[i + 1]) {
                        result[uriPartNames[i]] = matches[i + 1];
                    }
                }
            }
            if (result.scheme) {
                result.isAbsolute = true;
            }
        }

        return result;
    };

    var getURIFromInfo = function (uriInfo) {
        /// <summary>Builds a URI string from its components.</summary>
        /// <param name="uriInfo" type="Object"> An object with uri parts (scheme, authority, etc.).</param>
        /// <returns type="String">URI string.</returns>

        return "".concat(
            uriInfo.scheme || "",
            uriInfo.authority || "",
            uriInfo.path || "",
            uriInfo.query || "",
            uriInfo.fragment || "");
    };

    // Regular expression that splits a uri authority into its subcomponents:
    // 0 - is the matched string.
    // 1 - is the userinfo subcomponent.
    // 2 - is the host subcomponent.
    // 3 - is the port component.
    var uriAuthorityRegEx = /^\/{0,2}(?:([^@]*)@)?([^:]+)(?::{1}(\d+))?/;

    // Regular expression that matches percentage enconded octects (i.e %20 or %3A);
    var pctEncodingRegEx = /%[0-9A-F]{2}/ig;

    var normalizeURICase = function (uri) {
        /// <summary>Normalizes the casing of a URI.</summary>
        /// <param name="uri" type="String">URI to normalize, absolute or relative.</param>
        /// <returns type="String">The URI normalized to lower case.</returns>

        var uriInfo = getURIInfo(uri);
        var scheme = uriInfo.scheme;
        var authority = uriInfo.authority;

        if (scheme) {
            uriInfo.scheme = scheme.toLowerCase();
            if (authority) {
                var matches = uriAuthorityRegEx.exec(authority);
                if (matches) {
                    uriInfo.authority = "//" +
                    (matches[1] ? matches[1] + "@" : "") +
                    (matches[2].toLowerCase()) +
                    (matches[3] ? ":" + matches[3] : "");
                }
            }
        }

        uri = getURIFromInfo(uriInfo);

        return uri.replace(pctEncodingRegEx, function (str) {
            return str.toLowerCase();
        });
    };

    var normalizeURI = function (uri, base) {
        /// <summary>Normalizes a possibly relative URI with a base URI.</summary>
        /// <param name="uri" type="String">URI to normalize, absolute or relative.</param>
        /// <param name="base" type="String" mayBeNull="true">Base URI to compose with.</param>
        /// <returns type="String">The composed URI if relative; the original one if absolute.</returns>

        if (!base) {
            return uri;
        }

        var uriInfo = getURIInfo(uri);
        if (uriInfo.isAbsolute) {
            return uri;
        }

        var baseInfo = getURIInfo(base);
        var normInfo = {};
        var path;

        if (uriInfo.authority) {
            normInfo.authority = uriInfo.authority;
            path = uriInfo.path;
            normInfo.query = uriInfo.query;
        } else {
            if (!uriInfo.path) {
                path = baseInfo.path;
                normInfo.query = uriInfo.query || baseInfo.query;
            } else {
                if (uriInfo.path.charAt(0) === '/') {
                    path = uriInfo.path;
                } else {
                    path = mergeUriPathWithBase(uriInfo.path, baseInfo.path);
                }
                normInfo.query = uriInfo.query;
            }
            normInfo.authority = baseInfo.authority;
        }

        normInfo.path = removeDotsFromPath(path);

        normInfo.scheme = baseInfo.scheme;
        normInfo.fragment = uriInfo.fragment;

        return getURIFromInfo(normInfo);
    };

    var mergeUriPathWithBase = function (uriPath, basePath) {
        /// <summary>Merges the path of a relative URI and a base URI.</summary>
        /// <param name="uriPath" type="String>Relative URI path.</param>
        /// <param name="basePath" type="String">Base URI path.</param>
        /// <returns type="String">A string with the merged path.</returns>

        var path = "/";
        var end;

        if (basePath) {
            end = basePath.lastIndexOf("/");
            path = basePath.substring(0, end);

            if (path.charAt(path.length - 1) !== "/") {
                path = path + "/";
            }
        }

        return path + uriPath;
    };

    var removeDotsFromPath = function (path) {
        /// <summary>Removes the special folders . and .. from a URI's path.</summary>
        /// <param name="path" type="string">URI path component.</param>
        /// <returns type="String">Path without any . and .. folders.</returns>

        var result = "";
        var segment = "";
        var end;

        while (path) {
            if (path.indexOf("..") === 0 || path.indexOf(".") === 0) {
                path = path.replace(/^\.\.?\/?/g, "");
            } else if (path.indexOf("/..") === 0) {
                path = path.replace(/^\/\..\/?/g, "/");
                end = result.lastIndexOf("/");
                if (end === -1) {
                    result = "";
                } else {
                    result = result.substring(0, end);
                }
            } else if (path.indexOf("/.") === 0) {
                path = path.replace(/^\/\.\/?/g, "/");
            } else {
                segment = path;
                end = path.indexOf("/", 1);
                if (end !== -1) {
                    segment = path.substring(0, end);
                }
                result = result + segment;
                path = path.replace(segment, "");
            }
        }
        return result;
    };


    var ticks = 0;

    var canUseJSONP = function (request) {
        /// <summary>
        /// Checks whether the specified request can be satisfied with a JSONP request.
        /// </summary>
        /// <param name="request">Request object to check.</param>
        /// <returns type="Boolean">true if the request can be satisfied; false otherwise.</returns>

        // Requests that 'degrade' without changing their meaning by going through JSONP
        // are considered usable.
        //
        // We allow data to come in a different format, as the servers SHOULD honor the Accept
        // request but may in practice return content with a different MIME type.
        if (request.method && request.method !== "GET") {
            return false;
        }

        return true;
    };

    var createIFrame = function (url) {
        /// <summary>Creates an IFRAME tag for loading the JSONP script</summary>
        /// <param name="url" type="String">The source URL of the script</param>
        /// <returns type="HTMLElement">The IFRAME tag</returns>
        var iframe = window.document.createElement("IFRAME");
        iframe.style.display = "none";

        var attributeEncodedUrl = url.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/\</g, "&lt;");
        var html = "<html><head><script type=\"text/javascript\" src=\"" + attributeEncodedUrl + "\"><\/script><\/head><body><\/body><\/html>";

        var body = window.document.getElementsByTagName("BODY")[0];
        body.appendChild(iframe);

        writeHtmlToIFrame(iframe, html);
        return iframe;
    };

    var createXmlHttpRequest = function () {
        /// <summary>Creates a XmlHttpRequest object.</summary>
        /// <returns type="XmlHttpRequest">XmlHttpRequest object.</returns>
        if (window.XMLHttpRequest) {
            return new window.XMLHttpRequest();
        }
        var exception;
        if (window.ActiveXObject) {
            try {
                return new window.ActiveXObject("Msxml2.XMLHTTP.6.0");
            } catch (_) {
                try {
                    return new window.ActiveXObject("Msxml2.XMLHTTP.3.0");
                } catch (e) {
                    exception = e;
                }
            }
        } else {
            exception = { message: "XMLHttpRequest not supported" };
        }
        throw exception;
    };

    var isAbsoluteUrl = function (url) {
        /// <summary>Checks whether the specified URL is an absolute URL.</summary>
        /// <param name="url" type="String">URL to check.</param>
        /// <returns type="Boolean">true if the url is an absolute URL; false otherwise.</returns>

        return url.indexOf("http://") === 0 ||
            url.indexOf("https://") === 0 ||
            url.indexOf("file://") === 0;
    };

    var isLocalUrl = function (url) {
        /// <summary>Checks whether the specified URL is local to the current context.</summary>
        /// <param name="url" type="String">URL to check.</param>
        /// <returns type="Boolean">true if the url is a local URL; false otherwise.</returns>

        if (!isAbsoluteUrl(url)) {
            return true;
        }

        // URL-embedded username and password will not be recognized as same-origin URLs.
        var location = window.location;
        var locationDomain = location.protocol + "//" + location.host + "/";
        return (url.indexOf(locationDomain) === 0);
    };

    var removeCallback = function (name, tick) {
        /// <summary>Removes a callback used for a JSONP request.</summary>
        /// <param name="name" type="String">Function name to remove.</param>
        /// <param name="tick" type="Number">Tick count used on the callback.</param>
        try {
            delete window[name];
        } catch (err) {
            window[name] = undefined;
            if (tick === ticks - 1) {
                ticks -= 1;
            }
        }
    };

    var removeIFrame = function (iframe) {
        /// <summary>Removes an iframe.</summary>
        /// <param name="iframe" type="Object">The iframe to remove.</param>
        /// <returns type="Object">Null value to be assigned to iframe reference.</returns>
        if (iframe) {
            writeHtmlToIFrame(iframe, "");
            iframe.parentNode.removeChild(iframe);
        }

        return null;
    };

    var readResponseHeaders = function (xhr, headers) {
        /// <summary>Reads response headers into array.</summary>
        /// <param name="xhr" type="XMLHttpRequest">HTTP request with response available.</param>
        /// <param name="headers" type="Array">Target array to fill with name/value pairs.</param>

        var responseHeaders = xhr.getAllResponseHeaders().split(/\r?\n/);
        var i, len;
        for (i = 0, len = responseHeaders.length; i < len; i++) {
            if (responseHeaders[i]) {
                var header = responseHeaders[i].split(": ");
                headers[header[0]] = header[1];
            }
        }
    };

    var writeHtmlToIFrame = function (iframe, html) {
        /// <summary>Writes HTML to an IFRAME document.</summary>
        /// <param name="iframe" type="HTMLElement">The IFRAME element to write to.</param>
        /// <param name="html" type="String">The HTML to write.</param>
        var frameDocument = (iframe.contentWindow) ? iframe.contentWindow.document : iframe.contentDocument.document;
        frameDocument.open();
        frameDocument.write(html);
        frameDocument.close();
    };

    odata.defaultHttpClient = {
        callbackParameterName: "$callback",

        formatQueryString: "$format=json",

        enableJsonpCallback: false,

        request: function (request, success, error) {
            /// <summary>Performs a network request.</summary>
            /// <param name="request" type="Object">Request description.</request>
            /// <param name="success" type="Function">Success callback with the response object.</param>
            /// <param name="error" type="Function">Error callback with an error object.</param>
            /// <returns type="Object">Object with an 'abort' method for the operation.</returns>

            var result = {};
            var xhr = null;
            var done = false;
            var iframe;

            result.abort = function () {
                iframe = removeIFrame(iframe);
                if (done) {
                    return;
                }

                done = true;
                if (xhr) {
                    xhr.abort();
                    xhr = null;
                }

                error({ message: "Request aborted" });
            };

            var handleTimeout = function () {
                iframe = removeIFrame(iframe);
                if (!done) {
                    done = true;
                    xhr = null;
                    error({ message: "Request timed out" });
                }
            };

            var name;
            var url = request.requestUri;
            var enableJsonpCallback = defined(request.enableJsonpCallback, this.enableJsonpCallback);
            var callbackParameterName = defined(request.callbackParameterName, this.callbackParameterName);
            var formatQueryString = defined(request.formatQueryString, this.formatQueryString);
            if (!enableJsonpCallback || isLocalUrl(url)) {

                xhr = createXmlHttpRequest();
                xhr.onreadystatechange = function () {
                    if (done || xhr === null || xhr.readyState !== 4) {
                        return;
                    }

                    // Workaround for XHR behavior on IE.
                    var statusText = xhr.statusText;
                    var statusCode = xhr.status;
                    if (statusCode === 1223) {
                        statusCode = 204;
                        statusText = "No Content";
                    }

                    var headers = [];
                    readResponseHeaders(xhr, headers);

                    var response = { requestUri: url, statusCode: statusCode, statusText: statusText, headers: headers, body: xhr.responseText };

                    done = true;
                    xhr = null;
                    if (statusCode >= 200 && statusCode <= 299) {
                        success(response);
                    } else {
                        error({ message: "HTTP request failed", request: request, response: response });
                    }
                };

                xhr.open(request.method || "GET", url, true, request.user, request.password);

                // Set the name/value pairs.
                if (request.headers) {
                    for (name in request.headers) {
                        xhr.setRequestHeader(name, request.headers[name]);
                    }
                }

                // Set the timeout if available.
                if (request.timeoutMS) {
                    xhr.timeout = request.timeoutMS;
                    xhr.ontimeout = handleTimeout;
                }

                xhr.send(request.body);
            } else {
                if (!canUseJSONP(request)) {
                    throw { message: "Request is not local and cannot be done through JSONP." };
                }

                var tick = ticks;
                ticks += 1;
                var tickText = tick.toString();
                var succeeded = false;
                var timeoutId;
                name = "handleJSONP_" + tickText;
                window[name] = function (data) {
                    iframe = removeIFrame(iframe);
                    if (!done) {
                        succeeded = true;
                        window.clearTimeout(timeoutId);
                        removeCallback(name, tick);

                        // Workaround for IE8 and below where trying to access data.constructor after the IFRAME has been removed
                        // throws an "unknown exception"
                        if (window.ActiveXObject && !window.DOMParser) {
                            data = window.JSON.parse(window.JSON.stringify(data));
                        }

                        // Call the success callback in the context of the parent window, instead of the IFRAME
                        delay(success, { body: data, statusCode: 200, headers: { "Content-Type": "application/json"} });
                    }
                };

                // Default to two minutes before timing out, 1000 ms * 60 * 2 = 120000.
                var timeoutMS = (request.timeoutMS) ? request.timeoutMS : 120000;
                timeoutId = window.setTimeout(handleTimeout, timeoutMS);

                var queryStringParams = callbackParameterName + "=parent." + name;
                if (this.formatQueryString) {
                    queryStringParams += "&" + formatQueryString;
                }

                var qIndex = url.indexOf("?");
                if (qIndex === -1) {
                    url = url + "?" + queryStringParams;
                } else if (qIndex === url.length - 1) {
                    url = url + queryStringParams;
                } else {
                    url = url + "&" + queryStringParams;
                }

                iframe = createIFrame(url);
            }

            return result;
        }
    };



    var MAX_DATA_SERVICE_VERSION = "2.0";

    var contentType = function (str) {
        /// <summary>Parses a string into an object with media type and properties.</summary>
        /// <param name="str" type="String">String with media type to parse.</param>
        /// <returns>null if the string is empty; an object with 'mediaType' and a 'properties' dictionary otherwise.</returns>

        if (!str) {
            return null;
        }

        var contentTypeParts = str.split(";");
        var properties = {};

        var i, len;
        for (i = 1, len = contentTypeParts.length; i < len; i++) {
            var contentTypeParams = contentTypeParts[i].split("=");
            properties[trimString(contentTypeParams[0])] = contentTypeParams[1];
        }

        return { mediaType: trimString(contentTypeParts[0]), properties: properties };
    };

    var contentTypeToString = function (contentType) {
        /// <summary>Serializes an object with media type and properties dictionary into a string.</summary>
        /// <param name="contentType">Object with media type and properties dictionary to serialize.</param>
        /// <returns>String representation of the media type object; undefined if contentType is null or undefined.</returns>

        if (!contentType) {
            return undefined;
        }

        var result = contentType.mediaType;
        var property;
        for (property in contentType.properties) {
            result += ";" + property + "=" + contentType.properties[property];
        }
        return result;
    };

    var createReadWriteContext = function (contentType, dataServiceVersion, context, handler) {
        /// <summary>Creates an object that is going to be used as the context for the handler's parser and serializer.</summary>
        /// <param name="contentType">Object with media type and properties dictionary.</param>
        /// <param name="dataServiceVersion" type="String">String indicating the version of the protocol to use.</param>
        /// <param name="context">Operation context.</param>
        /// <param name="handler">Handler object that is processing a resquest or response.</param>
        /// <returns>Context object.</returns>

        return {
            contentType: contentType,
            dataServiceVersion: dataServiceVersion,
            metadata: context ? context.metadata : null,
            context: context,
            handler: handler
        };
    };

    var fixRequestHeader = function (request, name, value) {
        /// <summary>Sets a request header's value. If the header has already a value other than undefined, null or empty string, then this method does nothing.</summary>
        /// <param name="request">Request object on which the header will be set.</param>
        /// <param name="name" type="String">Header name.</param>
        /// <param name="value" type="String">Header value.</param>
        if (!request) {
            return;
        }

        var headers = request.headers;
        if (!headers[name]) {
            headers[name] = value;
        }
    };

    var fixDataServiceVersion = function (context, version) {
        /// <summary>Sets the dataServiceVersion component of the context.</summary>
        /// <param name="context">Context object used for serialization.</param>
        /// <param name="version" type="String">Version value.</param>
        /// <remarks>
        /// If the component has already a value other than undefined, null or 
        /// empty string, then this method does nothing.
        /// </remarks>

        if (!context.dataServiceVersion) {
            context.dataServiceVersion = version;
        }
    };

    var getRequestOrResponseHeader = function (requestOrResponse, name) {
        /// <summary>Gets the value of a request or response header.</summary>
        /// <param name="requestOrResponse">Object representing a request or a response.</param>
        /// <param name="name" type="String">Name of the header to retrieve.</param>
        /// <returns type="String">String value of the header; undefined if the header cannot be found.</returns>

        var headers = requestOrResponse.headers;
        return (headers && headers[name]) || undefined;
    };

    var getContentType = function (requestOrResponse) {
        /// <summary>Gets the value of the Content-Type header from a request or response.</summary>
        /// <param name="requestOrResponse">Object representing a request or a response.</param>
        /// <returns type="Object">Object with 'mediaType' and a 'properties' dictionary; null in case that the header is not found or doesn't have a value.</returns>

        return contentType(getRequestOrResponseHeader(requestOrResponse, "Content-Type"));
    };

    var versionRE = /^\s?(\d+\.\d+);?.*$/;
    var getDataServiceVersion = function (requestOrResponse) {
        /// <summary>Gets the value of the DataServiceVersion header from a request or response.</summary>
        /// <param name="requestOrResponse">Object representing a request or a response.</param>
        /// <returns type="String">Data service version; undefined if the header cannot be found.</returns>

        var value = getRequestOrResponseHeader(requestOrResponse, "DataServiceVersion");
        if (value) {
            var matches = versionRE.exec(value);
            if (matches && matches.length) {
                return matches[1];
            }
        }

        // Fall through and return undefined.
    };

    var handlerAccepts = function (handler, cType) {
        /// <summary>Checks that a handler can process a particular mime type.</summary>
        /// <param name="handler">Handler object that is processing a resquest or response.</param>
        /// <param name="cType">Object with 'mediaType' and a 'properties' dictionary.</param>
        /// <returns type="Boolean">True if the handler can process the mime type; false otherwise.</returns>

        // The following check isn't as strict because if cType.mediaType = application/; it will match an accept value of "application/xml";
        // however in practice we don't not expect to see such "suffixed" mimeTypes for the handlers.
        return handler.accept.indexOf(cType.mediaType) >= 0;
    };

    var handlerRead = function (handler, parseCallback, response, context) {
        /// <summary>Invokes the parser associated with a handler for reading the payload of a HTTP response.</summary>
        /// <param name="handler">Handler object that is processing the response.</param>
        /// <param name="parseCallback" type="Function">Parser function that will process the response payload.</param>
        /// <param name="response">HTTP response whose payload is going to be processed.</param>
        /// <param name="context">Object used as the context for processing the response.</param>
        /// <returns type="Boolean">True if the handler processed the response payload and the response.data property was set; false otherwise.</returns>

        if (!response || !response.headers) {
            return false;
        }

        var cType = getContentType(response);
        var version = getDataServiceVersion(response) || "";
        var body = response.body;

        if (!assigned(body)) {
            return false;
        }

        if (handlerAccepts(handler, cType)) {
            var readContext = createReadWriteContext(cType, version, context, handler);
            readContext.response = response;
            response.data = parseCallback(handler, body, readContext);
            return response.data !== undefined;
        }

        return false;
    };

    var handlerWrite = function (handler, serializeCallback, request, context) {
        /// <summary>Invokes the serializer associated with a handler for generating the payload of a HTTP request.</summary>
        /// <param name="handler">Handler object that is processing the request.</param>
        /// <param name="serializeCallback" type="Function">Serializer function that will generate the request payload.</param>
        /// <param name="response">HTTP request whose payload is going to be generated.</param>
        /// <param name="context">Object used as the context for serializing the request.</param>
        /// <returns type="Boolean">True if the handler serialized the request payload and the request.body property was set; false otherwise.</returns>
        if (!request || !request.headers) {
            return false;
        }

        var cType = getContentType(request);
        var version = getDataServiceVersion(request);

        if (!cType || handlerAccepts(handler, cType)) {
            var writeContext = createReadWriteContext(cType, version, context, handler);
            writeContext.request = request;

            request.body = serializeCallback(handler, request.data, writeContext);

            if (request.body !== undefined) {
                fixRequestHeader(request, "DataServiceVersion", writeContext.dataServiceVersion || "1.0");
                fixRequestHeader(request, "Content-Type", contentTypeToString(writeContext.contentType));
                fixRequestHeader(request, "MaxDataServiceVersion", handler.maxDataServiceVersion);
                return true;
            }
        }

        return false;
    };

    var handler = function (parseCallback, serializeCallback, accept, maxDataServiceVersion) {
        /// <summary>Creates a handler object for processing HTTP requests and responses.</summary>
        /// <param name="parseCallback" type="Function">Parser function that will process the response payload.</param>
        /// <param name="serializeCallback" type="Function">Serializer function that will generate the request payload.</param>
        /// <param name="accept" type="String">String containing a comma separated list of the mime types that this handler can work with.</param>
        /// <param name="maxDataServiceVersion" type="String">String indicating the highest version of the protocol that this handler can work with.</param>
        /// <returns type="Object">Handler object.</returns>

        return {
            accept: accept,
            maxDataServiceVersion: maxDataServiceVersion,

            read: function (response, context) {
                return handlerRead(this, parseCallback, response, context);
            },

            write: function (request, context) {
                return handlerWrite(this, serializeCallback, request, context);
            }
        };
    };

    var textParse = function (handler, body /*, context */) {
        return body;
    };

    var textSerialize = function (handler, data /*, context */) {
        if (assigned(data)) {
            return data.toString();
        } else {
            return undefined;
        }
    };

    odata.textHandler = handler(textParse, textSerialize, "text/plain", MAX_DATA_SERVICE_VERSION);



    var xmlMediaType = "application/xml";

    // URI prefixes to generate smaller code.
    var http = "http://";
    var w3org = http + "www.w3.org/";               // http://www.w3.org/
    var ado = http + "schemas.microsoft.com/ado/";  // http://schemas.microsoft.com/ado/
    var adoDs = ado + "2007/08/dataservices";       // http://schemas.microsoft.com/ado/2007/08/dataservices

    var xmlnsNS = w3org + "2000/xmlns/";            // http://www.w3.org/2000/xmlns/
    var xmlNS = w3org + "XML/1998/namespace";       // http://www.w3.org/XML/1998/namespace
    var edmxNs = ado + "2007/06/edmx";              // http://schemas.microsoft.com/ado/2007/06/edmx
    var edmNs = ado + "2008/09/edm";                // http://schemas.microsoft.com/ado/2008/09/edm
    var edmNs2 = ado + "2006/04/edm";               // http://schemas.microsoft.com/ado/2006/04/edm
    var edmNs3 = ado + "2007/05/edm";               // http://schemas.microsoft.com/ado/2007/05/edm
    var edmNs4 = ado + "2009/11/edm";               // http://schemas.microsoft.com/ado/2009/11/edm
    var atomXmlNs = w3org + "2005/Atom";            // http://www.w3.org/2005/Atom
    var appXmlNs = w3org + "2007/app";              // http://www.w3.org/2007/app
    var odataXmlNs = adoDs;                         // http://schemas.microsoft.com/ado/2007/08/dataservices
    var odataMetaXmlNs = adoDs + "/metadata";       // http://schemas.microsoft.com/ado/2007/08/dataservices/metadata
    var odataRelatedPrefix = adoDs + "/related/";   // http://schemas.microsoft.com/ado/2007/08/dataservices/related
    var odataScheme = adoDs + "/scheme";            // http://schemas.microsoft.com/ado/2007/08/dataservices/scheme

    var hasLeadingOrTrailingWhitespace = function (text) {
        /// <summary>Checks whether the specified string has leading or trailing spaces.</summary>
        /// <param name="text" type="String">String to check.</param>
        /// <returns type="Boolean">true if text has any leading or trailing whitespace; false otherwise.</returns>

        var re = /(^\s)|(\s$)/;
        return re.test(text);
    };

    var appendAsXml = function (domNode, xmlAsText) {
        /// <summary>Appends an XML text fragment into the specified DOM element node.</summary>
        /// <param name="domNode">DOM node for the parent element.</param>
        /// <param name="xmlAsText" type="String" mayBeNull="false">XML to append as a child of element.</param>

        var value = "<c>" + xmlAsText + "</c>";
        var parsed = xmlParse(value, null);

        var doc = domNode.ownerDocument;
        var imported = parsed.domNode;
        if ("importNode" in doc) {
            imported = doc.importNode(parsed.domNode, true);
        }

        var importedChild = imported.firstChild;
        while (importedChild) {
            domNode.appendChild(importedChild);
            importedChild = importedChild.nextSibling;
        }
    };

    var safeSetProperty = function (obj, name, value) {
        /// <summary>Safely set as property in an object by invoking obj.setProperty.</summary>
        /// <param name="obj">Object that exposes a setProperty method.</param>
        /// <param name="name" type="String" mayBeNull="false">Property name.</param>
        /// <param name="value">Property value.</param>
        try {
            obj.setProperty(name, value);
        } catch (_) { }
    };

    var createDomParser = function () {
        /// <summary>Creates a DOM parser object.</summary>
        /// <returns type="DOMParser">DOMParser object.</returns>
        var exception;
        var result;
        if (window.ActiveXObject) {
            try {
                result = new ActiveXObject("Msxml2.DOMDocument.6.0");
                result.async = false;

                return result;
            } catch (_) {
                try {
                    result = new ActiveXObject("Msxml2.DOMDocument.3.0");

                    result.async = false;
                    safeSetProperty(result, "ProhibitDTD", true);
                    safeSetProperty(result, "MaxElementDepth", 256);
                    safeSetProperty(result, "AllowDocumentFunction", false);
                    safeSetProperty(result, "AllowXsltScript", false);

                    return result;
                } catch (e) {
                    exception = e;
                }
            }
        } else {
            if (window.DOMParser) {
                return new window.DOMParser();
            }
            exception = { message: "XML DOM parser not supported" };
        }
        throw exception;
    };

    var createAttributeExtension = function (wrappedNode) {
        /// <summary>Creates an extension object for the specified attribute.</summary>
        /// <param name="wrappedNode">Wrapped node for the attribute.</param>
        /// <returns type="Object">The new extension object.</returns>

        return {
            name: wrappedNode.localName,
            namespace: wrappedNode.nsURI,
            value: wrappedNode.domNode.value
        };
    };

    var createElementExtension = function (wrappedNode) {
        /// <summary>Creates an extension object for the specified element.</summary>
        /// <param name="wrappedNode">Wrapped node for the element.</param>
        /// <returns type="Object">The new extension object.</returns>

        var result = {
            name: wrappedNode.localName,
            namespace: wrappedNode.nsURI,
            value: getElementText(wrappedNode.domNode),
            attributes: [],
            children: []
        };

        xmlAttributes(wrappedNode, function (wrappedAttribute) {
            // Namespace declarations aren't processed, because every extension
            // is namespace-qualified.
            if (wrappedAttribute.nsURI !== xmlnsNS) {
                result.attributes.push(createAttributeExtension(wrappedAttribute));
            }
        });

        xmlChildElements(wrappedNode, function (wrappedElement) {
            result.children.push(createElementExtension(wrappedElement));
        });

        return result;
    };

    var isWhitespace = function (text) {
        /// <summary>Determines whether the specified text is empty or whitespace.</summary>
        /// <param name="text" type="String">Value to inspect.</param>
        /// <returns type="Boolean">true if the text value is empty or all whitespace; false otherwise.</returns>
        var ws = /^\s*$/;
        return text === null || ws.test(text);
    };

    var isWhitespacePreserveContext = function (domElement) {
        /// <summary>Determines whether the specified element has xml:space='preserve' applied.</summary>
        /// <param name="domElement">Element to inspect.</param>
        /// <returns type="Boolean">Whether xml:space='preserve' is in effect.</returns>
        while (domElement !== null && domElement.nodeType === 1) {
            var val = xml_attribute(domElement, "space", xmlNS);
            if (val === "preserve") {
                return true;
            } else if (val === "default") {
                break;
            } else {
                domElement = domElement.parentNode;
            }
        }

        return false;
    };

    var getElementText = function (domElement) {
        /// <summary>
        /// Gets the concatenated value of all immediate child text and CDATA nodes for the specified element.
        /// </summary>
        /// <param name="domElement">Element to get values for.</param>
        /// <returns type="String" mayBeNull="true">Text for all direct children.</returns>

        var result = null;
        var cursor = domElement.firstChild;
        var whitespaceAlreadyRemoved = domElement.ownerDocument.preserveWhiteSpace === false;
        var whitespacePreserveContext;
        while (cursor) {
            if (cursor.nodeType === 3 || cursor.nodeType === 4) {
                // isElementContentWhitespace indicates that this is 'ignorable whitespace',
                // but it's not defined by all browsers, and does not honor xml:space='preserve'
                // in some implementations.
                //
                // If we can't tell either way, we walk up the tree to figure out whether
                // xml:space is set to preserve; otherwise we discard pure-whitespace.
                //
                // For example <a>  <b>1</b></a>. The space between <a> and <b> is usually 'ignorable'.
                var text = cursor.nodeValue;
                var shouldInclude = whitespaceAlreadyRemoved || !isWhitespace(text);
                if (!shouldInclude) {
                    // Walk up the tree to figure out whether we are in xml:space='preserve' context
                    // for the cursor (needs to happen only once).
                    if (whitespacePreserveContext === undefined) {
                        whitespacePreserveContext = isWhitespacePreserveContext(domElement);
                    }

                    shouldInclude = whitespacePreserveContext;
                }

                if (shouldInclude) {
                    if (!result) {
                        result = text;
                    } else {
                        result += text;
                    }
                }
            }

            cursor = cursor.nextSibling;
        }

        return result;
    };

    var getSingleElementByTagNameNS = function (domNode, namespaceURI, localName) {
        /// <summary>Gets the first element under 'domNode' with the spacified name and namespace.</summary>
        /// <param name="domNode">DOM element node.</param>
        /// <param name="namespaceURI" type="String">The namespace URI of the element to match.</param>
        /// <param name="localName" type="String">The local name of the element to match.</param>
        /// <returns>The first element found, null if none.</returns>
        /// <remarks>namespaceURI should be a specific namespace, otherwise the behavior is unspecified.</remarks>

        var result;
        if (domNode.getElementsByTagNameNS) {
            result = domNode.getElementsByTagNameNS(namespaceURI, localName);
            if (result.length !== 0) {
                return result[0];
            }
        } else {
            var child = domNode.firstChild;
            while (child) {
                if (child.nodeType === 1 &&
                    xmlLocalName(child) === localName &&
                    child.namespaceURI === namespaceURI) {
                    return child;
                }

                child = child.nextSibling;
            }
        }

        return null;
    };

    var checkParserErrorElement = function (element, text) {
        /// <summary>Checks whether the specified element is a parser error element.</summary>
        /// <param name="element">Element to check.</param>
        /// <param name="text" type="String">Original text that was being parsed.</param>
        /// <remarks>
        /// DOMParser-based parsers don't throw an exception but instead return a
        /// specific document; this function checks this case and normalizes to
        /// an exception being thrown.
        /// </remarks>

        // Firefox reports errors with a specific element.
        var parserErrorNS = "http://www.mozilla.org/newlayout/xml/parsererror.xml";
        var wrappedElement = xml_wrapNode(element, "");
        if (wrappedElement.localName === "parsererror" && wrappedElement.nsURI === parserErrorNS) {
            var reason = getElementText(element);
            var sourceTextElement = getSingleElementByTagNameNS(wrappedElement, parserErrorNS, "sourcetext");
            var srcText = (sourceTextElement) ? sourceTextElement.nodeValue : "";
            throw { message: reason, errorXmlText: text, srcText: srcText };
        }

        // Chrome reports errors by injecting a header with an error message.
        // The error may be localized, so instead we simply check for a header as the
        // top element or first child of the document.
        var xhtmlNS = "http://www.w3.org/1999/xhtml";
        if (wrappedElement.localName === "h3" && wrappedElement.nsURI == xhtmlNS ||
            getSingleElementByTagNameNS(element, xhtmlNS, "h3")) {
            throw { message: xmlInnerText(element), errorXmlText: text, srcText: "" };
        }
    };

    var xmlAddNamespaceAttribute = function (domNode, name, attributeNamespace) {
        /// <summary>Adds a namespace declaration attribute to the specified element node.</summary>
        /// <param name="domNode">DOM node for the element.</param>
        /// <param name="domNode" type="String">Attribute name, eg: xmlns, xmlns:foo, xmlns:bar.</param>
        /// <param name="attributeNamespace" type="String">Namespace to associate.</param>

        var doc = domNode.ownerDocument;
        var attribute;
        if (doc.createAttributeNS) {
            attribute = doc.createAttributeNS(xmlnsNS, name);
        } else {
            attribute = doc.createNode(2, name, xmlnsNS);
        }

        attribute.nodeValue = attributeNamespace;
        domNode.setAttributeNode(attribute);
    };

    var xmlAppendPreserving = function (domNode, text) {
        /// <summary>Appends a text node into the specified DOM element node.</summary>
        /// <param name="domNode">DOM node for the element.</param>
        /// <param name="text" type="String" mayBeNull="false">Text to append as a child of element.</param>

        if (hasLeadingOrTrailingWhitespace(text)) {
            var attr = xmlNewDomAttribute(domNode, "space", xmlNS, "xml");
            attr.value = "preserve";
        }

        var textNode = domNode.ownerDocument.createTextNode(text);
        domNode.appendChild(textNode);
    };

    var xmlAttributes = function (element, onAttributeCallback) {
        /// <summary>Iterates through the XML element's attributes and invokes the callback function for each one.</summary>
        /// <param name="element">Wrapped element to iterate over.</param>
        /// <param name="onAttributeCallback" type="Function">Callback function to invoke with wrapped attribute nodes.</param>

        var attribute;
        var domNode = element.domNode;
        var i, len;
        for (i = 0, len = domNode.attributes.length; i < len; i++) {
            attribute = domNode.attributes.item(i);
            onAttributeCallback(xml_wrapNode(attribute));
        }
    };

    var xmlAttribute = function (element, localName, nsURI) {
        /// <summary>Returns the value of an xml element attribute.</summary>
        return xml_attribute(element.domNode, localName, nsURI);
    };

    var xmlAttributeNode = function (domNode, localName, nsURI) {
        /// <summary>Gets an attribute node from an element.</summary>
        /// <param name="domNode">DOM node for the parent element.</param>
        /// <param name="localName" type="String">Local name for the attribute.</param>
        /// <param name="nsURI" type="String">Namespace URI for the attribute.</param>
        /// <returns>The attribute node, null if not found.</returns>

        var attributes = domNode.attributes;
        if (attributes.getNamedItemNS) {
            return attributes.getNamedItemNS(nsURI, localName);
        }

        return attributes.getQualifiedItem(localName, nsURI);
    };

    var xmlChildElements = function (element, onElementCallback) {
        /// <summary>Iterates through the XML element's child elements and invokes the callback function for each one.</summary>
        /// <param name="element">Wrapped element to iterate over.</param>
        /// <param name="onElementCallback" type="Function">Callback function to invoke with wrapped element nodes.</param>

        var child = element.domNode.firstChild;
        var childBaseURI;
        while (child !== null) {
            if (child.nodeType === 1) {
                childBaseURI = normalizeURI(xml_baseURI(child), element.baseURI);
                onElementCallback(xml_wrapNode(child, childBaseURI));
            }

            child = child.nextSibling;
        }
    };

    var xmlFirstElement = function (element) {
        /// <summary>Returns the first child element (wrapped) of the specified element.</summary>
        /// <param name="element">Element to get first child for.</param>
        /// <returns>This first child element (wrapped), null if there is none.</returns>

        var child = element.domNode.firstChild;
        var childBaseURI;
        while (child !== null) {
            if (child.nodeType === 1) {
                childBaseURI = normalizeURI(xml_baseURI(child), element.baseURI);
                return xml_wrapNode(child, childBaseURI);
            }

            child = child.nextSibling;
        }

        return null;
    };

    var xmlInnerText = function (domNode) {
        /// <summary>Returns the text value of an XML element.</summary>
        /// <param name="domNode">DOM element</param>
        /// <returns type="String">
        /// The text content of the node or the concatenated text
        /// representing the node and its descendants; never null.
        /// </returns>

        var result = domNode.text;
        if (result !== undefined) {
            return result;
        }

        result = "";

        var cursor = domNode.firstChild;
        if (cursor) {
            do {
                // Process the node.
                if (cursor.nodeType === 3 || cursor.nodeType === 4) {
                    result += cursor.nodeValue;
                }

                // Advance the node.
                var next = cursor.firstChild;
                if (!next) {
                    while (cursor !== domNode) {
                        next = cursor.nextSibling;
                        if (next) {
                            cursor = next;
                            break;
                        } else {
                            cursor = cursor.parentNode;
                        }
                    }
                } else {
                    cursor = next;
                }
            } while (cursor !== domNode);
        }

        return result;
    };

    var xmlLocalName = function (node) {
        /// <summary>Returns the localName of a XML node.</summary>
        /// <param name="node">DOM node to get value for.</param>
        /// <returns type="String">localName of node.</returns>

        if (node.localName) {
            return node.localName;
        }

        return node.baseName;
    };

    var xmlNewDocument = function (name, nsURI) {
        /// <summary>Creates a new XML document.</summary>
        /// <param name="name" type="String">Local name of the root element.</param>
        /// <param name="nsURI" type="String">Namespace of the root element.</param>
        /// <returns>The wrapped root element of the document.</returns>

        var dom;

        if (window.ActiveXObject) {
            dom = createDomParser();
            dom.documentElement = dom.createNode(1, name, nsURI);
        }
        else if (window.document.implementation && window.document.implementation.createDocument) {
            dom = window.document.implementation.createDocument(nsURI, name, null);
        }

        return xml_wrapNode(dom.documentElement);
    };

    var xmlNewDomAttribute = function (domNode, localName, nsURI, nsPrefix) {
        /// <summary>Creates a new unwrapped DOM attribute.</summary>
        /// <param name="domNode">Parent element to which new node should be added.</param>
        /// <param name="localName" type="String">Local name for attribute.</param>
        /// <param name="nsURI" type="String">Namespace URI for the attribute.</param>
        /// <param name="nsPrefix" type="String">Namespace prefix for attribute to be created.</param>
        /// <returns>The created DOM attribute.</returns>

        var doc = domNode.ownerDocument;
        var attribute;
        localName = (nsPrefix) ? (nsPrefix + ":" + localName) : localName;
        if (doc.createAttributeNS) {
            attribute = doc.createAttributeNS(nsURI, localName);
            domNode.setAttributeNodeNS(attribute);
        } else {
            attribute = doc.createNode(2, localName, nsURI || undefined);
            domNode.setAttributeNode(attribute);
        }

        return attribute;
    };

    var xmlNewDomElement = function (domNode, localName, nsURI, nsPrefix) {
        /// <summary>Creates a new unwrapped DOM element.</summary>
        /// <param name="domNode">Parent element to which new node should be added.</param>
        /// <param name="localName" type="String">Local name for element.</param>
        /// <param name="nsURI" type="String">Namespace URI for the element.</param>
        /// <param name="nsPrefix" type="String">Namespace prefix for attribute to be created.</param>
        /// <returns>The created DOM element.</returns>

        var doc = domNode.ownerDocument;
        var element;
        localName = (nsPrefix) ? (nsPrefix + ":" + localName) : localName;
        if (doc.createElementNS) {
            element = doc.createElementNS(nsURI, localName);
        } else {
            element = doc.createNode(1, localName, nsURI || undefined);
        }

        domNode.appendChild(element);
        return element;
    };

    var xmlNewElement = function (parent, name, nsURI, value) {
        /// <summary>Creates a new wrapped element.</summary>
        /// <param name="parent">Wrapped parent element to which new node should be added.</param>
        /// <param name="name" type="String">Local name for element.</param>
        /// <param name="nsURI" type="String">Namespace URI for the element.</param>
        /// <param name="value" type="String" mayBeNull="true">Text value to append in element, if applicable.</param>
        /// <returns>The created wrapped element.</returns>

        var dom = parent.domNode.ownerDocument;

        var element;
        if (dom.createElementNS) {
            element = dom.createElementNS(nsURI, name);
        } else {
            element = dom.createNode(1, name, nsURI || undefined);
        }

        if (value) {
            xmlAppendPreserving(element, value);
        }

        parent.domNode.appendChild(element);
        return xml_wrapNode(element);
    };

    var xmlNewAttribute = function (element, name, nsURI, value) {
        /// <summary>Creates a new wrapped attribute.</summary>
        /// <param name="element">Wrapped parent element to which new node should be added.</param>
        /// <param name="name" type="String">Local name for element.</param>
        /// <param name="nsURI" type="String">Namespace URI for the element.</param>
        /// <param name="value" type="String">Node value for the attribute.</param>
        /// <returns>The created wrapped attribute.</returns>

        var dom = element.domNode.ownerDocument;

        var attribute;
        if (dom.createAttributeNS) {
            attribute = dom.createAttributeNS(nsURI, name);
            attribute.value = value;
            element.domNode.setAttributeNodeNS(attribute);
        } else {
            attribute = dom.createNode(2, name, nsURI || undefined);
            attribute.value = value;
            element.domNode.setAttributeNode(attribute);
        }

        return xml_wrapNode(attribute);
    };

    var xmlQualifyXmlTagName = function (name, prefix) {
        /// <summary>Qualifies an XML tag name with the specified prefix.</summary>
        /// <param name="name" type="String">Element name</param>
        /// <param name="prefix" type="String">Prefix to use, possibly null.</param>
        /// <returns type="String">The qualified name.</returns>
        /// <remarks>This operates at the lexical level - there is no awareness of in-scope prefixes.</remarks>

        if (prefix) {
            return prefix + ":" + name;
        }

        return name;
    };

    var xmlParse = function (text, baseURI) {
        /// <summary>Returns an XML document from the specified text.</summary>
        /// <param name="text" type="String">Document text.</param>
        /// <param name="baseURI" type="String">Base URI for the document.</param>
        /// <returns>The wrapped root element of the document.</returns>

        var root = xml_parse(text);
        var rootBaseURI = normalizeURI(xml_baseURI(root), baseURI);
        return xml_wrapNode(root, rootBaseURI);
    };

    var xmlSerialize = function (root) {
        /// <summary>
        /// Returns the text representation of the document to which the specified node belongs.
        /// </summary>
        /// <param name="root">Wrapped element in the document to serialize.</param>
        /// <returns type="String">Serialized document.</returns>

        var dom = root.domNode.ownerDocument;
        return xmlSerializeNode(dom);
    };

    var xmlSerializeChildren = function (domNode) {
        /// <summary>Returns the XML representation of the all the descendants of the node.</summary>
        /// <param name="domNode" optional="false" mayBeNull="false">Node to serialize.</param>
        /// <returns type="String">The XML representation of all the descendants of the node.</returns>

        var children = domNode.childNodes;
        var i, len = children.length;
        if (len === 0) {
            return "";
        }

        var fragment = domNode.ownerDocument.createDocumentFragment();
        for (i = 0; i < len; i++) {
            fragment.appendChild(children[i].cloneNode(true));
        }

        return xmlSerializeNode(fragment);
    };

    var xmlSerializeNode = function (domNode) {
        /// <summary>Returns the XML representation of the node and all its descendants.</summary>
        /// <param name="domNode" optional="false" mayBeNull="false">Node to serialize.</param>
        /// <returns type="String">The XML representation of the node and all its descendants.</returns>

        var xml = domNode.xml;
        if (xml !== undefined) {
            return xml;
        }

        if (window.XMLSerializer) {
            var serializer = new window.XMLSerializer();
            return serializer.serializeToString(domNode);
        }

        throw { message: "XML serialization unsupported" };
    };

    var xml_attribute = function (domNode, localName, nsURI) {
        /// <summary>Gets the value of a DOM attribute.</summary>
        /// <param name="domNode">DOM element to get attribute for.</param>
        /// <param name="localName" type="String">Name of the attribute to get.</param>
        /// <param name="nsURI" type="String">Namespace of the attribute to get.</param>
        /// <returns type="String">Value of the attribute if found; null otherwise.</returns>

        if (domNode.getAttributeNS) {
            return domNode.getAttributeNS(nsURI || null, localName);
        }

        // The method is not supported so we work with the attributes collection. 
        var node = domNode.attributes.getQualifiedItem(localName, nsURI);
        if (node) {
            return node.value;
        }

        return null;
    };

    var xml_baseURI = function (domNode) {
        /// <summary>Gets the value of the xml:base attribute on the specified element.</summary>
        /// <param name="domNode">Element to get attribute value from.</param>
        /// <returns type="String">Value of the xml:base attribute if found; null otherwise.</returns>

        return xml_attribute(domNode, "base", xmlNS);
    };

    var xml_parse = function (text) {
        /// <summary>Returns an XML document from the specified text.</summary>
        /// <param name="text" type="String">Document text.</param>
        /// <returns>The root element of the document.</returns>

        var dom = createDomParser();
        if (dom.parseFromString) {
            dom = dom.parseFromString(text, "text/xml");
            checkParserErrorElement(dom.documentElement, text);
        } else {
            dom.loadXML(text);
            if (dom.parseError.errorCode !== 0) {
                throw { message: dom.parseError.reason, errorXmlText: text, srcText: dom.parseError.srcText };
            }
        }

        return dom.documentElement;
    };

    var xml_wrapNode = function (domNode, baseURI) {
        /// <summary>Creates a wrapped DOM node.</summary>
        /// <param name="domNode">DOM node to wrap.</param>
        /// <param name="baseURI" type="String">Base URI in scope for the node.</param>
        /// <returns type="Object">
        /// An object with the wrapped domNode, information about its in-scope URI, and simple 
        /// access to name and namespace.
        /// </returns>

        var nsURI = domNode.namespaceURI;
        var nodeName = domNode.nodeName;

        // MSXML 3.0 doesn't return a namespaceURI for xmlns attributes.
        if (!nsURI) {
            if (domNode.nodeType === 2 && (nodeName === "xmlns" || nodeName.indexOf("xmlns:", 0) === 0)) {
                nsURI = xmlnsNS;
            } else {
                nsURI = null;
            }
        }

        return {
            baseURI: baseURI,
            domNode: domNode,
            localName: xmlLocalName(domNode),
            nsURI: nsURI
        };
    };

    var readODataXmlDocument = function (xmlRoot) {
        /// <summary>Reads an OData link(s) producing an object model in return.</summary>
        /// <param name="xmlRoot">Top-level element to read.</param>
        /// <returns type="Object">The object model representing the specified element.</returns>

        if (xmlRoot.nsURI === odataXmlNs) {
            switch (xmlRoot.localName) {
                case "links":
                    return readLinks(xmlRoot);
                case "uri":
                    return readUri(xmlRoot);
            }
        }
        return undefined;
    };

    var readLinks = function (linksElement) {
        /// <summary>Deserializes an OData XML links element.</summary>
        /// <param name="linksElement">XML links element.</param>
        /// <returns type="Object">A new object representing the links collection.</returns>

        var uris = [];

        xmlChildElements(linksElement, function (child) {
            if (child.localName === "uri" && child.nsURI === odataXmlNs) {
                var uri = readUri(child);
                uris.push(uri);
            }
        });

        return { results: uris };
    };

    var readUri = function (uriElement) {
        /// <summary>Deserializes an OData XML uri element.</summary>
        /// <param name="uriElement">XML uri element.</param>
        /// <returns type="Object">A new object representing the uri.</returns>

        return { uri: xmlInnerText(uriElement.domNode) };
    };

    var writeODataXmlDocument = function (data) {
        /// <summary>Writes the specified data into an OData XML document.</summary>
        /// <param name="data">Data to write.</param>
        /// <returns>The root of the DOM tree built.</returns>

        if (payloadTypeOf(data) === PAYLOADTYPE_COMPLEXTYPE &&
           !data.__metadata && data.hasOwnProperty("uri")) {
            return writeUri(data);
        }

        // Allow for undefined to be returned.
    };

    var writeUri = function (data) {
        /// <summary>Writes the specified uri data into an OData XML uri document.</summary>
        /// <param name="data">Uri data to write in intermediate format.</param>
        /// <returns>The feed element of the DOM tree built.</returns>

        var uri = writeODataXmlNode(null, "uri", odataXmlNs);
        if (data.uri) {
            xmlAppendPreserving(uri.domNode, data.uri);
        }

        return uri;
    };

    var writeODataXmlNode = function (parent, name, nsURI) {
        /// <summary>Writes the root of an OData XML document, possibly under an existing element.</summary>
        /// <param name="parent" mayBeNull="true">Element under which to create a new element.</param>
        /// <param name="name">Name for the new element.</param>
        /// <param name="nsURI" type="String">Namespace URI for the element.</param>
        /// <returns>The created element.</returns>

        if (parent) {
            return xmlNewElement(parent, name, nsURI);
        }
        return xmlNewDocument(name, nsURI);
    };

    var xmlParser = function (handler, text) {
        /// <summary>Parses an OData XML document.</summary>
        /// <param name="handler">This handler.</param>
        /// <param name="text" type="String">Document text.</param>
        /// <returns>An object representation of the document; undefined if not applicable.</returns>

        if (text) {
            var root = xmlParse(text);
            if (root) {
                return readODataXmlDocument(root);
            }
        }

        // Allow for undefined to be returned.
    };

    var xmlSerializer = function (handler, data, context) {
        /// <summary>Serializes an OData XML object into a document.</summary>
        /// <param name="handler">This handler.</param>
        /// <param name="data" type="Object">Representation of feed or entry.</param>
        /// <param name="context" type="Object">Object with parsing context.</param>
        /// <returns>A text representation of the data object; undefined if not applicable.</returns>

        var cType = context.contentType = context.contentType || contentType(xmlMediaType);
        var result = undefined;
        if (cType && cType.mediaType === xmlMediaType) {
            var xmlDoc = writeODataXmlDocument(data);
            if (xmlDoc) {
                result = xmlSerialize(xmlDoc);
            }
        }
        return result;
    };

    odata.xmlHandler = handler(xmlParser, xmlSerializer, xmlMediaType, MAX_DATA_SERVICE_VERSION);



    var atomAcceptTypes = ["application/atom+xml", "application/atomsvc+xml", "application/xml"];
    var atomMediaType = atomAcceptTypes[0];

    var inlineTag = xmlQualifyXmlTagName("inline", "m");
    var propertiesTag = xmlQualifyXmlTagName("properties", "m");
    var propertyTypeAttribute = xmlQualifyXmlTagName("type", "m");
    var propertyNullAttribute = xmlQualifyXmlTagName("null", "m");

    // These are the namespaces that are not considered ATOM extension namespaces.
    var nonExtensionNamepaces = [atomXmlNs, appXmlNs, xmlNS, xmlnsNS];

    // These are entity property mapping paths that have well-known paths.
    var knownCustomizationPaths = {
        SyndicationAuthorEmail: "author/email",
        SyndicationAuthorName: "author/name",
        SyndicationAuthorUri: "author/uri",
        SyndicationContributorEmail: "contributor/email",
        SyndicationContributorName: "contributor/name",
        SyndicationContributorUri: "contributor/uri",
        SyndicationPublished: "published",
        SyndicationRights: "rights",
        SyndicationSummary: "summary",
        SyndicationTitle: "title",
        SyndicationUpdated: "updated"
    };

    var isExtensionNs = function (nsURI) {
        /// <summary>Checks whether the specified namespace is an extension namespace to ATOM.</summary>
        /// <param type="String" name="nsURI">Namespace to check.</param>
        /// <returns type="Boolean">true if nsURI is an extension namespace to ATOM; false otherwise.</returns>

        return !(contains(nonExtensionNamepaces, nsURI));
    };

    var propertyTypeDefaultConverter = function (propertyValue) {
        /// <summary>Does a no-op conversion on the specified value.</summary>
        /// <param name="propertyValue">Value to convert.</param>
        /// <returns>Original property value.</returns>

        return propertyValue;
    };

    var parseBool = function (propertyValue) {
        /// <summary>Parses a string into a boolean value.</summary>
        /// <param name="propertyValue">Value to parse.</param>
        /// <returns type="Boolean">true if the property value is 'true'; false otherwise.</returns>

        return propertyValue === "true";
    };

    // The captured indices for this expression are:
    // 0     - complete input
    // 1,2,3 - year with optional minus sign, month, day
    // 4,5,6 - hours, minutes, seconds
    // 7     - optional milliseconds
    // 8     - everything else (presumably offset information)
    var parseDateTimeRE = /^(-?\d{4,})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(.*)$/;

    var parseDateTimeMaybeOffset = function (value, withOffset) {
        /// <summary>Parses a string into a DateTime value.</summary>
        /// <param name="value" type="String">Value to parse.</param>
        /// <param name="withOffset" type="Boolean">Whether offset is expected.</param>
        /// <returns type="Date">The parsed value.</returns>

        // We cannot parse this in cases of failure to match or if offset information is specified.
        var parts = parseDateTimeRE.exec(value);
        var offset = (parts) ? getCanonicalTimezone(parts[8]) : null;

        if (!parts || (!withOffset && offset !== "Z")) {
            throw { message: "Invalid date/time value" };
        }

        // Pre-parse years, account for year '0' being invalid in dateTime.
        var year = parseInt10(parts[1]);
        if (year <= 0) {
            year++;
        }

        // Pre-parse optional milliseconds, fill in default. Fail if value is too precise.
        var ms = parts[7];
        var ns = 0;
        if (!ms) {
            ms = 0;
        } else {
            if (ms.length > 7) {
                throw { message: "Cannot parse date/time value to given precision." };
            }

            ns = formatNumberWidth(ms.substring(3), 4, true);
            ms = formatNumberWidth(ms.substring(0, 3), 3, true);
            
            ms = parseInt10(ms);
            ns = parseInt10(ns);
        }

        // Pre-parse other time components and offset them if necessary.
        var hours = parseInt10(parts[4]);
        var minutes = parseInt10(parts[5]);
        var seconds = parseInt10(parts[6]);
        if (offset !== "Z") {
            // The offset is reversed to get back the UTC date, which is
            // what the API will eventually have.
            var timezone = parseTimezone(offset);
            var direction = -(timezone.d);
            hours += timezone.h * direction;
            minutes += timezone.m * direction;
        }

        // Set the date and time separately with setFullYear, so years 0-99 aren't biased like in Date.UTC.
        var result = new Date();
        result.setUTCFullYear(
            year,                       // Year.
            parseInt10(parts[2]) - 1,   // Month (zero-based for Date.UTC and setFullYear).
            parseInt10(parts[3])        // Date.
            );
        result.setUTCHours(hours, minutes, seconds, ms);

        if (isNaN(result.valueOf())) {
            throw { message: "Invalid date/time value" };
        }

        if (withOffset) {
            result.__edmType = "Edm.DateTimeOffset";
            result.__offset = offset;
        }

        if (ns) {
            result.__ns = ns;
        }

        return result;
    };

    var parseDateTime = function (propertyValue) {
        /// <summary>Parses a string into a DateTime value.</summary>
        /// <param name="propertyValue" type="String">Value to parse.</param>
        /// <returns type="Date">The parsed value.</returns>

        return parseDateTimeMaybeOffset(propertyValue, false);
    };

    var parseDateTimeOffset = function (propertyValue) {
        /// <summary>Parses a string into a DateTimeOffset value.</summary>
        /// <param name="propertyValue" type="String">Value to parse.</param>
        /// <returns type="Date">The parsed value.</returns>
        /// <remarks>
        /// The resulting object is annotated with an __edmType property and
        /// an __offset property reflecting the original intended offset of
        /// the value. The time is adjusted for UTC time, as the current
        /// timezone-aware Date APIs will only work with the local timezone.
        /// </remarks>

        return parseDateTimeMaybeOffset(propertyValue, true);
    };

    // Property type converters are parsers that convert strings into typed values.
    var propertyTypeConverters = {
        "Edm.Boolean": parseBool,
        "Edm.Binary": propertyTypeDefaultConverter,
        "Edm.DateTime": parseDateTime,
        "Edm.DateTimeOffset": parseDateTimeOffset,
        "Edm.Time": parseDuration,
        "Edm.Decimal": propertyTypeDefaultConverter,
        "Edm.Guid": propertyTypeDefaultConverter,
        "Edm.String": propertyTypeDefaultConverter,
        "Edm.Byte": parseInt10,
        "Edm.Double": parseFloat,
        "Edm.Single": parseFloat,
        "Edm.Int16": parseInt10,
        "Edm.Int32": parseInt10,
        "Edm.Int64": propertyTypeDefaultConverter,
        "Edm.SByte": parseInt10
    };

    var formatToString = function (value) {
        /// <summary>Formats a value by invoking .toString() on it.</summary>
        /// <param name="value" mayBeNull="false">Value to format.</param>
        /// <returns type="String">Formatted text.</returns>

        return value.toString();
    };

    // Property type formatters are serializers that convert typed values into strings.
    var propertyTypeFormatters = {
        "Edm.Binary": formatToString,
        "Edm.Boolean": formatToString,
        "Edm.Byte": formatToString,
        "Edm.DateTime": formatDateTimeOffset,
        "Edm.DateTimeOffset": formatDateTimeOffset,
        "Edm.Decimal": formatToString,
        "Edm.Double": formatToString,
        "Edm.Guid": formatToString,
        "Edm.Int16": formatToString,
        "Edm.Int32": formatToString,
        "Edm.Int64": formatToString,
        "Edm.SByte": formatToString,
        "Edm.Single": formatToString,
        "Edm.String": formatToString,
        "Edm.Time": formatDuration
    };

    var isPrimitiveType = function (typeName) {
        /// <summary>Checks whether the specified type name is a primitive type.</summary>
        /// <param name="typeName" type="String" mayBeNull="true">Name of type to check.</param>
        /// <returns type="Boolean">
        /// true if the type is the name of a primitive type; false otherwise.
        /// </returns>

        return typeName && (propertyTypeConverters[typeName] !== undefined);
    };

    var convertFromAtomPropertyText = function (value, targetType) {
        /// <summary>Converts a text value to the specified target type.</summary>
        /// <param name="value" type="String" mayBeNull="true">Text value to convert.</param>
        /// <param name="targetType" type="String" mayBeNull="true">Name of type to convert from.</param>
        /// <returns>The converted value.</returns>

        if (value !== null && targetType) {
            var converter = propertyTypeConverters[targetType];
            if (converter) {
                value = converter(value);
            }
        }

        return value;
    };

    var convertToAtomPropertyText = function (value, targetType) {
        /// <summary>Converts a typed value from the specified target type into a text value.</summary>
        /// <param name="value">Typed value to convert.</param>
        /// <param name="targetType" type="String" mayBeNull="true">Name of type to convert to.<param>
        /// <returns type="String">The converted value as text.</returns>

        if (value !== null && targetType) {
            if (isDate(value)) {
                targetType = (isDateTimeOffset(value)) ? "Edm.DateTimeOffset" : "Edm.DateTime";
            }

            var converter = propertyTypeFormatters[targetType];
            if (converter) {
                value = converter(value);
            }
        }

        return value;
    };

    var readAtomDocument = function (atomElement, metadata) {
        /// <summary>Reads an ATOM entry, feed or service document, producing an object model in return.</summary>
        /// <param name="atomElement">Top-level element to read.</param>
        /// <param name="metadata">Metadata that describes the conceptual schema.</param>
        /// <returns type="Object">The object model representing the specified element, undefined if the top-level element is not part of the ATOM specification.</returns>

        // Handle feed and entry elements.
        if (atomElement.nsURI === atomXmlNs) {
            switch (atomElement.localName) {
                case "feed":
                    return readAtomFeed(atomElement, metadata);
                case "entry":
                    return readAtomEntry(atomElement, metadata);
            }
        }

        // Handle service documents. 
        if (atomElement.nsURI === appXmlNs && atomElement.localName === "service") {
            return readAtomServiceDocument(atomElement);
        }

        // Allow undefined to be returned.
    };

    var readAtomFeed = function (atomFeed, metadata) {
        /// <summary>Deserializes an ATOM feed element.</summary>
        /// <param name="atomFeed">ATOM feed element.</param>
        /// <param name="metadata">Metadata that describes the conceptual schema.</param>
        /// <returns type="Object">A new object representing the feed.</returns>
        var feedMetadata = {};
        var feed = {
            results: [],
            __metadata: feedMetadata
        };

        feedMetadata.feed_extensions = readAtomExtensionAttributes(atomFeed);

        xmlChildElements(atomFeed, function (feedChild) {
            switch (feedChild.nsURI) {
                case atomXmlNs:
                    switch (feedChild.localName) {
                        case "id":
                            feedMetadata.uri = normalizeURI(xmlInnerText(feedChild.domNode), feedChild.baseURI);
                            feedMetadata.uri_extensions = readAtomExtensionAttributes(feedChild);
                            break;
                        case "title":
                            feedMetadata.title = xmlInnerText(feedChild.domNode);
                            feedMetadata.title_extensions = readAtomExtensionAttributes(feedChild);
                            break;
                        case "entry":
                            var entry = readAtomEntry(feedChild, metadata);
                            feed.results.push(entry);
                            break;
                        case "link":
                            readAtomFeedLink(feedChild, feed);
                            break;
                    }
                    return;
                case odataMetaXmlNs:
                    if (feedChild.localName === "count") {
                        feed.__count = parseInt10(xmlInnerText(feedChild.domNode));
                        return;
                    }
                    break;
            }

            var extension = readAtomExtensionElement(feedChild);
            feedMetadata.feed_extensions.push(extension);
        });

        return feed;
    };

    var readAtomFeedLink = function (feedLinkElement, feed) {
        /// <summary>Reads an ATOM link element for a feed.</summary>
        /// <param name="feedLinkElement">Link element to read.</param>
        /// <param name="feed">Feed object to be annotated with information.</param>

        var link = readAtomLink(feedLinkElement);
        var feedMetadata = feed.__metadata;
        switch (link.rel) {
            case "next":
                feed.__next = link.href;
                feedMetadata.next_extensions = link.extensions;
                break;
            case "self":
                feedMetadata.self = link.href;
                feedMetadata.self_extensions = link.extensions;
                break;
        }
    };

    var readAtomLink = function (linkElement) {
        /// <summary>Reads an ATOM link element.</summary>
        /// <param name="linkElement">Link element to read.</param>
        /// <returns type="Object">A link element representation.</returns>

        var link = { extensions: [] };
        var linkExtension;

        xmlAttributes(linkElement, function (attribute) {
            if (!attribute.nsURI) {
                switch (attribute.localName) {
                    case "href":
                        link.href = normalizeURI(attribute.domNode.nodeValue, linkElement.baseURI);
                        return;
                    case "type":
                    case "rel":
                        link[attribute.localName] = attribute.domNode.nodeValue;
                        return;
                }
            }

            if (isExtensionNs(attribute.nsURI)) {
                linkExtension = readAtomExtensionAttribute(attribute);
                link.extensions.push(linkExtension);
            }
        });

        if (!link.href) {
            throw { error: "href attribute missing on link element", element: linkElement };
        }

        return link;
    };

    var readAtomExtensionElement = function (atomExtension) {
        /// <summary>Reads an ATOM extension element (an element not in the ATOM namespaces).</summary>
        /// <param name="atomExtension">ATOM extension element.</param>
        /// <returns type="Object">An extension element representation.</returns>

        var extension = {
            name: atomExtension.localName,
            namespaceURI: atomExtension.nsURI,
            attributes: readAtomExtensionAttributes(atomExtension),
            children: []
        };

        xmlChildElements(atomExtension, function (child) {
            var childExtension = readAtomExtensionElement(child);
            extension.children.push(childExtension);
        });

        if (extension.children.length === 0) {
            var text = xmlInnerText(atomExtension.domNode);
            if (text) {
                extension.value = text;
            }
        }

        return extension;
    };

    var readAtomExtensionAttributes = function (xmlElement) {
        /// <summary>Reads ATOM extension attributes from an element.</summary>
        /// <param name="xmlElement">ATOM element with zero or more extension attributes.</param>
        /// <returns type="Array">An array of extension attribute representations.</returns>

        var extensions = [];
        xmlAttributes(xmlElement, function (attribute) {
            if (isExtensionNs(attribute.nsURI)) {
                var extension = readAtomExtensionAttribute(attribute);
                extensions.push(extension);
            }
        });

        return extensions;
    };

    var readAtomExtensionAttribute = function (attribute) {
        /// <summary>Reads an ATOM extension attribute into an object.</summary>
        /// <param name="attribute">ATOM extension attribute.</param>
        /// <returns type="Object">An object with the attribute information.</returns>

        return {
            name: attribute.localName,
            namespaceURI: attribute.nsURI,
            value: attribute.domNode.nodeValue
        };
    };

    var getObjectValueByPath = function (path, item) {
        /// <summary>Gets a slashed path value from the specified item.</summary>
        /// <param name="path" type="String">Property path to read ('/'-separated).</param>
        /// <param name="item" type="Object">Object to get value from.</param>
        /// <returns>The property value, possibly undefined if any path segment is missing.</returns>

        // Fast path.
        if (path.indexOf('/') === -1) {
            return item[path];
        } else {
            var parts = path.split('/');
            var i, len;
            for (i = 0, len = parts.length; i < len; i++) {
                // Avoid traversing a null object.
                if (item === null) {
                    return undefined;
                }

                item = item[parts[i]];
                if (item === undefined) {
                    return item;
                }
            }

            return item;
        }
    };

    var setObjectValueByPath = function (path, target, value, propertyType) {
        /// <summary>Sets a slashed path value on the specified target.</summary>
        /// <param name="path" type="String">Property path to set ('/'-separated).</param>
        /// <param name="target" type="Object">Object to set value on.</param>
        /// <param name="value">Value to set.</param>
        /// <param name="propertyType" type="String" optional="true">Property type to set in metadata.</param>

        // Fast path.
        var propertyName;
        if (path.indexOf('/') === -1) {
            target[path] = value;
            propertyName = path;
        } else {
            var parts = path.split('/');
            var i, len;
            for (i = 0, len = (parts.length - 1); i < len; i++) {
                // We construct each step of the way if the property is missing;
                // if it's already initialized to null, we stop further processing.
                var next = target[parts[i]];
                if (next === undefined) {
                    next = {};
                    target[parts[i]] = next;
                } else if (next === null) {
                    return;
                }

                target = next;
            }

            propertyName = parts[i];
            target[propertyName] = value;
        }

        if (propertyType) {
            var metadata = target.__metadata = target.__metadata || {};
            var properties = metadata.properties = metadata.properties || {};
            var property = properties[propertyName] = properties[propertyName] || {};
            property.type = propertyType;
        }
    };

    var expandCustomizationPath = function (path) {
        /// <summary>Expands a customization path if it's well-known.</summary>
        /// <param name="path" type="String">Path to expand.</param>
        /// <returns type="String">Expanded path or 'path' otherwise.</returns>

        return knownCustomizationPaths[path] || path;
    };

    var getXmlPathValue = function (ns, xmlPath, element, readAsXml) {
        /// <summary>Returns the text value of the element or attribute at xmlPath.</summary>
        /// <param name="ns" type="String">Namespace for elements to match.</param>
        /// <param name="xmlPath" type="String">
        /// '/'-separated list of element names, possibly ending with a '@'-prefixed attribute name.
        /// </param>
        /// <param name="element">Root element.</param>
        /// <param name="readAsXml">Whether the value should be read as XHTML.</param>
        /// <returns type="String">The text value of the node found, undefined if none.</returns>

        var parts = xmlPath.split('/');
        var i, len;
        for (i = 0, len = parts.length; i < len; i++) {
            if (parts[i].charAt(0) === "@") {
                return xml_attribute(element, parts[i].substring(1), ns);
            } else {
                element = getSingleElementByTagNameNS(element, ns, parts[i]);
                if (!element) {
                    return undefined;
                }
            }
        }

        if (readAsXml) {
            // Treat per XHTML in http://tools.ietf.org/html/rfc4287#section-3.1.1, including the DIV
            // in the content.
            return xmlSerializeChildren(element);
        } else {
            return xmlInnerText(element);
        }
    };

    var setXmlPathValue = function (ns, nsPrefix, xmlPath, element, writeAsKind, value) {
        /// <summary>Sets the text value of the element or attribute at xmlPath.</summary>
        /// <param name="ns" type="String">Namespace for elements to match.</param>
        /// <param name="nsPrefix" type="String">Namespace prefix for elements to be created.</param>
        /// <param name="xmlPath" type="String">
        /// '/'-separated list of element names, possibly ending with a '@'-prefixed attribute name.
        /// </param>
        /// <param name="element">Root element.</param>
        /// <param name="writeAsKind" type="String">Whether the value should be written as text, html or xhtml.</param>
        /// <param name="value" type="String">The text value of the node to write.</param>

        var target = element;
        var parts = xmlPath.split('/');
        var i, len;
        for (i = 0, len = parts.length; i < len; i++) {
            var next;
            if (parts[i].charAt(0) === "@") {
                next = xmlAttributeNode(target, parts[i].substring(1), ns);
                if (!next) {
                    next = xmlNewDomAttribute(target, parts[i].substring(1), ns, nsPrefix);
                }
            } else {
                next = getSingleElementByTagNameNS(target, ns, parts[i]);
                if (!next) {
                    next = xmlNewDomElement(target, parts[i], ns, nsPrefix);
                }
            }

            target = next;
        }

        // Target can be an attribute (2) or an element (1).
        if (target.nodeType === 2) {
            target.value = value;
        } else {
            // The element should be empty at this point; we won't erase its contents.
            if (writeAsKind) {
                target.setAttribute("type", writeAsKind);
            }

            if (writeAsKind === "xhtml") {
                appendAsXml(target, value);
            } else {
                xmlAppendPreserving(target, value);
            }
        }
    };

    var isElementEmpty = function (element) {
        /// <summary>Checks whether the specified XML element is empty.</summary>
        /// <param name="element">DOM element node to check.</param>
        /// <returns type="Boolean">true if the element is empty; false otherwise.</returns>
        /// <remarks>
        /// The element is considered empty if it doesn't have any attributes other than
        /// namespace declarations or type declarations and if it has no child nodes.
        /// </remarks>

        // If there are any child elements or text nodes, it's not empty.
        if (element.childNodes.length) {
            return false;
        }

        // If there are no attributes, then we know it's already empty.
        var attributes = element.attributes;
        var len = attributes.length;
        if (len === 0) {
            return true;
        }

        // Otherwise, we have to search for attributes that aren't namespace declarations.
        for (var i = 0; i < len; i++) {
            var attributeName = attributes[i].nodeName;
            if (attributeName !== "xmlns" && attributeName.indexOf("xmlns:") !== 0 && attributeName !== "m:type") {
                return false;
            }
        }

        return true;
    };
    var removeXmlProperty = function (entryElement, propertyPath) {
        /// <summary>Removes a property from an entry.</summary>
        /// <param name="entryElement">XML element for an ATOM OData entry.</param>
        /// <param name="propertyPath" type="String">Property path to an element.</param>

        // Get the 'properties' node from 'content' or 'properties'.
        var propertiesElement = getSingleElementByTagNameNS(entryElement.domNode, odataMetaXmlNs, "properties");
        if (!propertiesElement) {
            var contentElement = getSingleElementByTagNameNS(entryElement.domNode, atomXmlNs, "content");
            if (contentElement) {
                propertiesElement = getSingleElementByTagNameNS(contentElement, odataMetaXmlNs, "properties");
            }
        }

        if (propertiesElement) {
            // Traverse down to the parent of the property path.
            var propertyParentElement = propertiesElement;
            var parts = propertyPath.split("/");
            var i, len;
            for (i = 0, len = (parts.length - 1); i < len; i++) {
                propertyParentElement = getSingleElementByTagNameNS(propertyParentElement, odataXmlNs, parts[i]);
                if (!propertyParentElement) {
                    return;
                }
            }

            // Remove the child from its parent.
            var propertyElement = getSingleElementByTagNameNS(propertyParentElement, odataXmlNs, parts[i]);
            if (propertyElement) {
                propertyParentElement.removeChild(propertyElement);
            }

            // Remove empty elements up the parent chain.
            var candidate = propertyParentElement;
            while (candidate !== propertiesElement && isElementEmpty(candidate)) {
                var parent = candidate.parentNode;
                parent.removeChild(candidate);
                candidate = parent;
            }
        }
    };

    var applyEntryCustomizationToEntry = function (customization, sourcePath, entryElement, entryObject, propertyType, suffix, context) {
        /// <summary>Applies a specific feed customization item to an entry.</summary>
        /// <param name="customization">Object with customization description.</param>
        /// <param name="sourcePath">Property path to map ('source' in the description).</param>
        /// <param name="entryElement">XML element for the entry that corresponds to the object being written.</param>
        /// <param name="entryObject">Object being written.</param>
        /// <param name="propertyType" type="String">Name of property type to write.</param>
        /// <param name="suffix" type="String">Suffix to feed customization properties.</param>
        /// <param name="context">Context used for serialization.</param>

        var targetPath = customization["FC_TargetPath" + suffix];
        var xmlPath = expandCustomizationPath(targetPath);
        var xmlNamespace = (targetPath !== xmlPath) ? atomXmlNs : customization["FC_NsUri" + suffix];
        var keepInContent = (customization["FC_KeepInContent" + suffix] === "true") ? true : false;
        var writeAsKind = customization["FC_ContentKind" + suffix];
        var prefix = customization["FC_NsPrefix" + suffix] || null;

        // Get the value to be written.
        var value = getObjectValueByPath(sourcePath, entryObject);

        // Special case: for null values, the 'property' should be left as it was generated.
        // undefined values will appear when metadata describe a property the object doesn't have.
        if (!assigned(value)) {
            return;
        }

        // Remove the property if it should not be kept in content.
        if (!keepInContent) {
            context.dataServiceVersion = "2.0";
            removeXmlProperty(entryElement, sourcePath);
        }

        // Set/create the subtree for the property path with the appropriate value.
        value = convertToAtomPropertyText(value, propertyType);
        setXmlPathValue(xmlNamespace, prefix, xmlPath, entryElement.domNode, writeAsKind, value);
    };

    var applyEntryCustomizationToObject = function (customization, sourcePath, entryElement, entryObject, propertyType, suffix) {
        /// <summary>Applies a specific feed customization item to an object.</summary>
        /// <param name="customization">Object with customization description.</param>
        /// <param name="sourcePath">Property path to set ('source' in the description).</param>
        /// <param name="entryElement">XML element for the entry that corresponds to the object being read.</param>
        /// <param name="entryObject">Object being read.</param>
        /// <param name="propertyType" type="String">Name of property type to set.</param>
        /// <param name="suffix" type="String">Suffix to feed customization properties.</param>

        // If keepInConent equals true then we do nothing as the object has been deserialized at this point.
        if (customization["FC_KeepInContent" + suffix] === "true") {
            return;
        }
        // An existing 'null' means that the property was set to null in the properties,
        // which overrides other items.
        if (getObjectValueByPath(sourcePath, entryObject) === null) {
            return;
        }

        var targetPath = customization["FC_TargetPath" + suffix];
        var xmlPath = expandCustomizationPath(targetPath);
        var xmlNamespace = (targetPath !== xmlPath) ? atomXmlNs : customization["FC_NsUri" + suffix];
        var readAsXhtml = (customization["FC_ContentKind" + suffix] === "xhtml");
        var value = getXmlPathValue(xmlNamespace, xmlPath, entryElement.domNode, readAsXhtml);

        // If the XML tree does not contain the necessary elements to read the value,
        // then it shouldn't be considered null, but rather ignored at all. This prevents
        // the customization from generating the object path down to the property.
        if (value === undefined) {
            return;
        }

        value = convertFromAtomPropertyText(value, propertyType);

        // Set the value on the object.
        setObjectValueByPath(sourcePath, entryObject, value, propertyType);
    };

    var lookupPropertyType = function (metadata, entityType, path) {
        /// <summary>Looks up the type of a property given its path in an entity type.</summary>
        /// <param name="metadata">Metadata in which to search for base and complex types.</param>
        /// <param name="entityType">Entity type to which property belongs.</param>
        /// <param name="path" type="String" mayBeNull="false">Property path to look at.</param>
        /// <returns type="String">The name of the property type; possibly null.</returns>

        var parts = path.split("/");
        var i, len;
        while (entityType) {
            // Keep track of the type being traversed, necessary for complex types.
            var traversedType = entityType;

            for (i = 0, len = parts.length; i < len; i++) {
                // Traverse down the structure as necessary.
                var properties = traversedType.property;
                if (!properties) {
                    break;
                }

                // Find the property by scanning the property list (might be worth pre-processing).
                var propertyFound = lookupProperty(properties, parts[i]);
                if (!propertyFound) {
                    break;
                }

                var propertyType = propertyFound.type;

                // We could in theory still be missing types, but that would
                // be caused by a malformed path.
                if (!propertyType || isPrimitiveType(propertyType)) {
                    return propertyType || null;
                }

                traversedType = lookupComplexType(propertyType, metadata);
                if (!traversedType) {
                    return null;
                }
            }

            // Traverse up the inheritance chain.
            entityType = lookupEntityType(entityType.baseType, metadata);
        }

        return null;
    };

    var applyMetadataToObject = function (entryElement, entryObject, metadata) {
        /// <summary>Applies feed customization properties to an object being read.</summary>
        /// <param name="entryElement">XML element for the entry that corresponds to the object being read.</param>
        /// <param name="entryObject">Object being read.</param>
        /// <param name="metadata">Metadata that describes the conceptual schema.</param>

        if (!metadata || metadata.length === 0) {
            return;
        }

        var typeName = entryObject.__metadata.type;
        while (typeName) {
            var entityType = lookupEntityType(typeName, metadata);
            if (!entityType) {
                return;
            }

            // Apply all feed customizations from the entity and each of its properties.
            var propertyType;
            var source = entityType.FC_SourcePath;
            if (source) {
                propertyType = lookupPropertyType(metadata, entityType, source);
                applyEntryCustomizationToObject(entityType, source, entryElement, entryObject, propertyType, "");
            }

            var properties = entityType.property;
            if (properties) {
                var i, len;
                for (i = 0, len = properties.length; i < len; i++) {
                    var property = properties[i];
                    var suffixCounter = 0;
                    var suffix = "";
                    while (property["FC_TargetPath" + suffix]) {
                        source = property.name;
                        propertyType = property.type;

                        var sourcePath = property["FC_SourcePath" + suffix];
                        if (sourcePath) {
                            source += "/" + sourcePath;
                            propertyType = lookupPropertyType(metadata, entityType, source);
                        }

                        applyEntryCustomizationToObject(property, source, entryElement, entryObject, propertyType, suffix);
                        suffixCounter++;
                        suffix = "_" + suffixCounter;
                    }
                }
            }

            // Apply feed customizations from base types.
            typeName = entityType.baseType;
        }
    };

    var readAtomEntry = function (atomEntry, metadata) {
        /// <summary>Reads an ATOM entry in OData format.</summary>
        /// <param name="atomEntry">XML element for the entry.</param>
        /// <param name="metadata">Metadata that describes the conceptual schema.</param>
        /// <returns type="Object">An object in payload representation format.</returns>

        var entryMetadata = {};
        var entry = {
            __metadata: entryMetadata
        };

        var etag = xmlAttribute(atomEntry, "etag", odataMetaXmlNs);
        if (etag) {
            entryMetadata.etag = etag;
        }

        xmlChildElements(atomEntry, function (entryChild) {
            if (entryChild.nsURI === atomXmlNs) {
                switch (entryChild.localName) {
                    case "id":
                        entryMetadata.uri = normalizeURI(xmlInnerText(entryChild.domNode), entryChild.baseURI);
                        entryMetadata.uri_extensions = readAtomExtensionAttributes(entryChild);
                        break;
                    case "category":
                        readAtomEntryType(entryChild, entry, entryMetadata);
                        break;
                    case "content":
                        readAtomEntryContent(entryChild, entry);
                        break;
                    case "link":
                        readAtomEntryLink(entryChild, entry, metadata);
                        break;
                }
            }

            if (entryChild.nsURI === odataMetaXmlNs && entryChild.localName === "properties") {
                readAtomEntryStructuralObject(entryChild, entry, entryMetadata);
            }
        });

        // Apply feed customizations if applicable.
        applyMetadataToObject(atomEntry, entry, metadata);

        return entry;
    };

    var readAtomEntryType = function (atomCategory, entry, entryMetadata) {
        /// <summary>Reads type information from an ATOM category element.</summary>
        /// <param name="atomCategory">XML category element.</param>
        /// <param name="entry">Entry object to update with information.</param>
        /// <param name="entryMetadata">entry.__metadata, passed as an argument simply to help minify the code.</param>

        var scheme = xmlAttribute(atomCategory, "scheme");
        var term = xmlAttribute(atomCategory, "term");

        if (scheme === odataScheme) {
            if (entry.__metadata.type) {
                throw { message: "Invalid AtomPub document: multiple category elements defining the entry type were encounterd withing an entry", element: atomCategory };
            }

            entryMetadata.type = term;
            entryMetadata.type_extensions = [];

            var typeExtension;
            xmlAttributes(atomCategory, function (attribute) {
                if (!attribute.nsURI) {
                    if (attribute.localName !== "scheme" && attribute.localName !== "term") {
                        typeExtension = readAtomExtensionAttribute(attribute);
                        entryMetadata.type_extensions.push(typeExtension);
                    }
                } else if (isExtensionNs(attribute.nsURI)) {
                    typeExtension = readAtomExtensionAttribute(attribute);
                    entryMetadata.type_extensions.push(typeExtension);
                }
            });
        }
    };

    var readAtomEntryContent = function (atomEntryContent, entry) {
        /// <summary>Reads an ATOM content element.</summary>
        /// <param name="atomEntryContent">XML entry element.</param>
        /// <param name="entry">Entry object to update with information.</param>

        var src = xmlAttribute(atomEntryContent, "src");
        var type = xmlAttribute(atomEntryContent, "type");
        var entryMetadata = entry.__metadata;

        if (src) {
            if (!type) {
                throw { message: "Invalid AtomPub document: content element must specify the type attribute if the src attribute is also specified", element: atomEntryContent };
            }

            entryMetadata.media_src = normalizeURI(src, atomEntryContent.baseURI);
            entryMetadata.content_type = type;
        }

        xmlChildElements(atomEntryContent, function (contentChild) {
            if (src) {
                throw { message: "Invalid AtomPub document: content element must not have child elements if the src attribute is specified", element: atomEntryContent };
            }

            if (contentChild.nsURI === odataMetaXmlNs && contentChild.localName === "properties") {
                readAtomEntryStructuralObject(contentChild, entry, entryMetadata);
            }
        });
    };

    var readAtomEntryEditMediaLink = function (link, entry, entryMetadata) {
        /// <summary>Reads an ATOM media link element.</summary>
        /// <param name="link">Link representation (not the XML element).</param>
        /// <param name="entry">Entry object to update with information.</param>
        /// <param name="entryMetadata">entry.__metadata, passed as an argument simply to help minify the code.</param>

        entryMetadata.edit_media = link.href;
        entryMetadata.edit_media_extensions = [];

        // Read the link extensions.
        var i, len;
        for (i = 0, len = link.extensions.length; i < len; i++) {
            if (link.extensions[i].namespaceURI === odataMetaXmlNs && link.extensions[i].name === "etag") {
                entryMetadata.media_etag = link.extensions[i].value;
            } else {
                entryMetadata.edit_media_extensions.push(link.extensions[i]);
            }
        }
    };

    var readAtomEntryLink = function (atomEntryLink, entry, metadata) {
        /// <summary>Reads a link element on an entry.</summary>
        /// <param name="atomEntryLink">'link' element on the entry.</param>
        /// <param name="entry">An object in payload representation format.</param>
        /// <param name="metadata">Metadata that describes the conceptual schema.</param>

        var link = readAtomLink(atomEntryLink);
        var entryMetadata = entry.__metadata;
        switch (link.rel) {
            case "self":
                entryMetadata.self = link.href;
                entryMetadata.self_link_extensions = link.extensions;
                break;
            case "edit":
                entryMetadata.edit = link.href;
                entryMetadata.edit_link_extensions = link.extensions;
                break;
            case "edit-media":
                readAtomEntryEditMediaLink(link, entry, entryMetadata);
                break;
            default:
                if (link.rel.indexOf(odataRelatedPrefix) === 0) {
                    readAtomEntryDeferredProperty(atomEntryLink, link, entry, metadata);
                }
                break;
        }
    };

    var readAtomEntryDeferredProperty = function (atomEntryLink, link, entry, metadata) {
        /// <summary>Reads a potentially-deferred property on an entry.</summary>
        /// <param name="atomEntryLink">'link' element on the entry.</param>
        /// <param name="link">Parsed link object.</param>
        /// <param name="entry">An object in payload representation format.</param>
        /// <param name="metadata">Metadata that describes the conceptual schema.</param>

        var propertyName = link.rel.substring(odataRelatedPrefix.length);

        // undefined is used as a flag that inline data was not found (as opposed to
        // found with a value or with null).
        var inlineData = undefined;

        // Get any inline data.
        xmlChildElements(atomEntryLink, function (child) {
            if (child.nsURI === odataMetaXmlNs && child.localName === "inline") {
                var inlineRoot = xmlFirstElement(child);
                if (inlineRoot) {
                    inlineData = readAtomDocument(inlineRoot, metadata);
                } else {
                    inlineData = null;
                }
            }
        });

        // If the link has no inline content, we consider it deferred.
        if (inlineData === undefined) {
            inlineData = { __deferred: { uri: link.href} };
        }

        // Set the property value on the entry object.
        entry[propertyName] = inlineData;

        // Set the extra property information on the entry object metadata. 
        entry.__metadata.properties = entry.__metadata.properties || {};
        entry.__metadata.properties[propertyName] = {
            extensions: link.extensions
        };
    };

    var readAtomEntryStructuralObject = function (propertiesElement, parent, parentMetadata) {
        /// <summary>Reads an atom entry's property as a structural object and sets its value in the parent and the metadata in the parentMetadata objects.</summary>
        /// <param name="propertiesElement">XML element for the 'properties' node.</param>
        /// <param name="parent">
        /// Object that will contain the property value. It can be either an antom entry or 
        /// an atom complex property object.
        /// </param>
        /// <param name="parentMetadata">Object that will contain the property metadata. It can be either an atom entry metadata or a complex property metadata object</param>

        xmlChildElements(propertiesElement, function (property) {
            if (property.nsURI === odataXmlNs) {
                parentMetadata.properties = parentMetadata.properties || {};
                readAtomEntryProperty(property, parent, parentMetadata.properties);
            }
        });
    };

    var readAtomEntryProperty = function (property, parent, metadata) {
        /// <summary>Reads a property on an ATOM OData entry.</summary>
        /// <param name="property">XML element for the property.</param>
        /// <param name="parent">
        /// Object that will contain the property value. It can be either an antom entry or 
        /// an atom complex property object.
        /// </param>
        /// <param name="metadata">Metadata for the object that will contain the property value.</param>

        var propertyNullValue = null;
        var propertyTypeValue = "Edm.String";
        var propertyExtensions = [];

        xmlAttributes(property, function (attribute) {
            if (attribute.nsURI === odataMetaXmlNs) {
                switch (attribute.localName) {
                    case "null":
                        propertyNullValue = attribute.domNode.nodeValue;
                        return;
                    case "type":
                        propertyTypeValue = attribute.domNode.nodeValue;
                        return;
                };
            }

            if (isExtensionNs(attribute.nsURI)) {
                var extension = readAtomExtensionAttribute(attribute);
                propertyExtensions.push(extension);
            }
        });

        var propertyValue = null;
        var propertyMetadata = {
            type: propertyTypeValue,
            extensions: propertyExtensions
        };

        if (propertyNullValue !== "true") {
            propertyValue = xmlInnerText(property.domNode);
            if (isPrimitiveType(propertyTypeValue)) {
                propertyValue = convertFromAtomPropertyText(propertyValue, propertyTypeValue);
            } else {
                // Probe for a complex type and read it.
                if (xmlFirstElement(property)) {
                    propertyValue = { __metadata: { type: propertyTypeValue} };
                    readAtomEntryStructuralObject(property, propertyValue, propertyMetadata);
                }
            }
        }

        parent[property.localName] = propertyValue;
        metadata[property.localName] = propertyMetadata;
    };

    var readAtomServiceDocument = function (atomServiceDoc) {
        /// <summary>Reads an atom service document</summary>
        /// <param name="atomServiceDoc">An element node that represents the root service element of an AtomPub service document</param>
        /// <returns type="Object">An object that contains the properties of the service document</returns>

        // Consider handling Accept and Category elements.

        var serviceDoc = {
            workspaces: [],
            extensions: []
        };

        // Find all the workspace elements.
        xmlChildElements(atomServiceDoc, function (child) {
            if (child.nsURI === appXmlNs && child.localName === "workspace") {
                var workspace = readAtomServiceDocumentWorkspace(child);
                serviceDoc.workspaces.push(workspace);
            } else {
                var serviceExtension = readAtomExtensionElement(atomServiceDoc);
                serviceDoc.extensions.push(serviceExtension);
            }
        });

        // AtomPub (RFC 5023 Section 8.3.1) says a service document MUST contain one or 
        // more workspaces. Throw if we don't find any. 
        if (serviceDoc.workspaces.length === 0) {
            throw { message: "Invalid AtomPub service document: No workspace element found.", element: atomServiceDoc };
        }

        return serviceDoc;
    };

    var readAtomServiceDocumentWorkspace = function (atomWorkspace) {
        /// <summary>Reads a single workspace element from an atom service document</summary>
        /// <param name="atomWorkspace">An element node that represents a workspace element of an AtomPub service document</param>
        /// <returns type="Object">An object that contains the properties of the workspace</returns>

        var workspace = {
            collections: [],
            extensions: []
        };

        xmlChildElements(atomWorkspace, function (child) {
            if (child.nsURI === atomXmlNs) {
                if (child.localName === "title") {
                    if (atomWorkspace.title) {
                        throw { message: "Invalid AtomPub service document: workspace has more than one child title element", element: child };
                    }

                    workspace.title = xmlInnerText(child.domNode);
                }
            } else if (child.nsURI === appXmlNs) {
                if (child.localName === "collection") {
                    var collection = readAtomServiceDocumentCollection(child, workspace);
                    workspace.collections.push(collection);
                }
            } else {
                var extension = readAtomExtensionElement(atomWorkspace);
                workspace.extensions.push(extension);
            }
        });

        workspace.title = workspace.title || "";

        return workspace;
    };

    var readAtomServiceDocumentCollection = function (atomCollection) {
        /// <summary>Reads a service document collection element into an object.</summary>
        /// <param name="atomCollection">An element node that represents a collection element of an AtomPub service document.</param>
        /// <returns type="Object">An object that contains the properties of the collection.</returns>

        var collection = {
            href: xmlAttribute(atomCollection, "href"),
            extensions: []
        };

        if (!collection.href) {
            throw { message: "Invalid AtomPub service document: collection has no href attribute", element: atomCollection };
        }

        collection.href = normalizeURI(collection.href, atomCollection.baseURI);

        xmlChildElements(atomCollection, function (child) {
            if (child.nsURI === atomXmlNs) {
                if (child.localName === "title") {
                    if (collection.title) {
                        throw { message: "Invalid AtomPub service document: collection has more than one child title element", element: child };
                    }

                    collection.title = xmlInnerText(child.domNode);
                }
            } else if (child.nsURI !== appXmlNs) {
                var extension = readAtomExtensionElement(atomCollection);
                collection.extensions.push(extension);
            }
        });

        // AtomPub (RFC 5023 Section 8.3.3) says the collection element MUST contain 
        // a title element. It's likely to be problematic if the service doc doesn't 
        // have one so here we throw. 
        if (!collection.title) {
            throw { message: "Invalid AtomPub service document: collection has no title element", element: atomCollection };
        }

        return collection;
    };

    var writeAtomDocument = function (data, context) {
        /// <summary>Writes the specified data into an OData ATOM document.</summary>
        /// <param name="data">Data to write.</param>
        /// <param name="context">Context used for serialization.</param>
        /// <returns>The root of the DOM tree built.</returns>

        var docRoot;
        var type = payloadTypeOf(data);
        switch (type) {
            case PAYLOADTYPE_FEEDORLINKS:
                docRoot = writeAtomFeed(null, data, context);
                break;
            case PAYLOADTYPE_ENTRY:
                // FALLTHROUGH
            case PAYLOADTYPE_COMPLEXTYPE:
                docRoot = writeAtomEntry(null, data, context);
                break;
        }

        return docRoot;
    };

    var writeAtomRoot = function (parent, name) {
        /// <summary>Writes the root of an ATOM document, possibly under an existing element.</summary>
        /// <param name="parent" mayBeNull="true">Element under which to create a new element.</param>
        /// <param name="name">Name for the new element, to be created in the ATOM namespace.</param>
        /// <returns>The created element.</returns>

        if (parent) {
            return xmlNewElement(parent, name, atomXmlNs);
        }

        var result = xmlNewDocument(name, atomXmlNs);

        // Add commonly used namespaces.
        // ATOM is implied by the just-created element.
        // xmlAddNamespaceAttribute(result.domNode, "xmlns", atomXmlNs);
        xmlAddNamespaceAttribute(result.domNode, "xmlns:d", odataXmlNs);
        xmlAddNamespaceAttribute(result.domNode, "xmlns:m", odataMetaXmlNs);

        return result;
    };

    var writeAtomFeed = function (parent, data, context) {
        /// <summary>Writes the specified feed data into an OData ATOM feed.</summary>
        /// <param name="parent" mayBeNull="true">Parent to append feed tree to.</param>
        /// <param name="data">Feed data to write.</param>
        /// <param name="context">Context used for serialization.</param>
        /// <returns>The feed element of the DOM tree built.</returns>

        var feed = writeAtomRoot(parent, "feed");
        var entries = (isArray(data)) ? data : data.results;
        if (entries) {
            var i, len;
            for (i = 0, len = entries.length; i < len; i++) {
                writeAtomEntry(feed, entries[i], context);
            }
        }

        return feed;
    };

    var writeAtomEntry = function (parent, data, context) {
        /// <summary>Appends an ATOM entry XML payload to the parent node.</summary>
        /// <param name="parent">Parent element.</param>
        /// <param name="data">Data object to write in intermediate format.</param>
        /// <param name="context">Context used for serialization.</param>
        /// <returns>The new entry.</returns>

        var entry = writeAtomRoot(parent, "entry");

        // Set up a default empty author name as required by ATOM.
        var author = xmlNewElement(entry, "author", atomXmlNs);
        xmlNewElement(author, "name", atomXmlNs);

        // Set up a default empty title as required by ATOM.
        xmlNewElement(entry, "title", atomXmlNs);

        var content = xmlNewElement(entry, "content", atomXmlNs);
        xmlNewAttribute(content, "type", null, "application/xml");

        var properties = xmlNewElement(content, propertiesTag, odataMetaXmlNs);

        var propertiesMetadata = (data.__metadata) ? data.__metadata.properties : null;

        writeAtomEntryMetadata(entry, data.__metadata);
        writeAtomEntryProperties(entry, properties, data, propertiesMetadata, context);
        applyMetadataToEntry(entry, data, context);

        return entry;
    };

    var applyMetadataToEntry = function (entry, data, context) {
        /// <summary>Applies feed customizations to the specified entry element.</summary>
        /// <param name="entry">Entry to apply feed customizations to.</param>
        /// <param name="data">Data object associated with the entry.</param>
        /// <param name="context">Context used for serialization.</param>

        if (!data.__metadata) {
            return;
        }

        var metadata = context.metadata;
        var entityType = lookupEntityType(data.__metadata.type, metadata);
        while (entityType) {
            // Apply all feed customizations from the entity and each of its properties.
            var propertyType;
            var source = entityType.FC_SourcePath;
            if (source) {
                propertyType = lookupPropertyType(metadata, entityType, source);
                applyEntryCustomizationToEntry(entityType, source, entry, data, propertyType, "", context);
            }

            var properties = entityType.property;
            if (properties) {
                var i, len;
                for (i = 0, len = properties.length; i < len; i++) {
                    var property = properties[i];
                    var suffixCounter = 0;
                    var suffix = "";
                    while (property["FC_TargetPath" + suffix]) {
                        source = property.name;
                        if (property["FC_SourcePath" + suffix]) {
                            source += "/" + property["FC_SourcePath" + suffix];
                        }

                        applyEntryCustomizationToEntry(property, source, entry, data, property.type, suffix, context);
                        suffixCounter++;
                        suffix = "_" + suffixCounter;
                    }
                }
            }

            // Apply feed customizations from base types.
            entityType = lookupEntityType(entityType.baseType, metadata);
        }
    };

    var writeAtomEntryMetadata = function (entry, metadata) {
        /// <summary>Writes the content of metadata into the specified DOM entry element.</summary>
        /// <param name="entry">DOM entry element.</param>
        /// <param name="metadata" mayBeNull="true">Object __metadata to write.</param>

        if (metadata) {
            // Write the etag if present.
            if (metadata.etag) {
                xmlNewAttribute(entry, "etag", odataMetaXmlNs, metadata.etag);
            }

            // Write the ID if present.
            if (metadata.uri) {
                xmlNewElement(entry, "id", atomXmlNs, metadata.uri);
            }

            // Write the type name if present.
            if (metadata.type) {
                var category = xmlNewElement(entry, "category", atomXmlNs);
                xmlNewAttribute(category, "term", null, metadata.type);
                xmlNewAttribute(category, "scheme", null, odataScheme);
            }
        }
    };

    var writeAtomEntryLink = function (entry, href, rel) {
        /// <summary>Writes an ATOM link into an entry.</summary>
        /// <param name="entry">DOM entry element to add link to.</param>
        /// <param name="href" type="String">Value for href attribute in link element.</param>
        /// <param name="rel" type="String">Value for rel attribute in link element</param>
        /// <returns>The new link element.</returns>

        var link = xmlNewElement(entry, "link", atomXmlNs);
        xmlNewAttribute(link, "rel", null, rel);
        xmlNewAttribute(link, "href", null, href);
        return link;
    };

    var writeAtomEntryProperties = function (entry, parentElement, data, propertiesMetadata, context) {
        /// <summary>Writes the properties of an entry or complex type.</summary>
        /// <param name="entry" mayBeNull="true">Entry object being written out; null if this is a complex type.</param>
        /// <param name="parentElement">Parent DOM element under which the property should be added.</param>
        /// <param name="data">Data object to write in intermediate format.</param>
        /// <param name="propertiesMetadata" mayBeNull="true">Instance metadata about properties of the 'data' object.</param>
        /// <param name="context">Context used for serialization.</param>

        var name, value, kind, propertyMetadata;
        var contextMetadata = context.metadata;
        var dataMetadataType;
        for (name in data) {
            if (name !== "__metadata") {
                value = data[name];
                kind = propertyKindOf(value);
                propertyMetadata = (propertiesMetadata) ? propertiesMetadata[name] : null;
                if (!propertyMetadata) {
                    // Look up at-most-once.
                    if (dataMetadataType === undefined) {
                        if (data.__metadata) {
                            dataMetadataType = lookupEntityType(data.__metadata.type, contextMetadata);
                        }
                    }

                    if (dataMetadataType) {
                        propertyMetadata = lookupProperty(dataMetadataType.property, name);
                        if (!propertyMetadata) {
                            propertyMetadata = lookupProperty(dataMetadataType.navigationProperty, name);
                        }
                    }
                }

                if (kind === PROPERTYKIND_NONE) {
                    // This could be a null primitive property, complex type or link;
                    // look it up in metadata if available, otherwise assume primitive.
                    kind = PROPERTYKIND_PRIMITIVE;
                    if (propertyMetadata && !isPrimitiveType(propertyMetadata.type)) {
                        if (propertyMetadata.relationship) {
                            kind = PROPERTYKIND_INLINE;
                        } else if (lookupComplexType(propertyMetadata.type, context.metadata)) {
                            kind = PROPERTYKIND_COMPLEX;
                        }
                    }
                }

                if (kind === PROPERTYKIND_PRIMITIVE || kind === PROPERTYKIND_COMPLEX) {
                    writeAtomEntryProperty(parentElement, name, kind, value, propertyMetadata, context);
                } else {
                    writeAtomEntryDeferredProperty(entry, kind, name, value, context);
                }
            }
        }
    };

    var writeAtomEntryProperty = function (parentElement, name, kind, value, propertiesMetadata, context) {
        /// <summary>Writes a single property for an entry or complex type.</summary>
        /// <param name="parentElement">Parent DOM element under which the property should be added.</param>
        /// <param name="name" type="String">Property name.</param>
        /// <param name="kind" type="String">Property kind description (from propertyKind values).</param>
        /// <param name="value" mayBeNull="true">Property value.</param>
        /// <param name="propertiesMetadata" mayBeNull="true">Instance metadata about properties of the 'data' object.</param>
        /// <param name="context">Serialization context.</param>

        var propertyTagName = xmlQualifyXmlTagName(name, "d");
        var propertyType = propertiesMetadata && propertiesMetadata.type;
        var property;
        if (kind === PROPERTYKIND_COMPLEX) {
            property = xmlNewElement(parentElement, propertyTagName, odataXmlNs);
            var propertyMetadata;
            if (propertiesMetadata) {
                propertyMetadata = propertiesMetadata.properties;
            }

            // Null complex types require a V2 payload.
            if (value === null) {
                context.dataServiceVersion = "2.0";
            }

            writeAtomEntryProperties(null, property, value, propertyMetadata, context);
        } else {
            // Default the conversion to string if no property type has been defined.
            property = xmlNewElement(parentElement, propertyTagName, odataXmlNs, convertToAtomPropertyText(value, propertyType || "Edm.String"));
        }

        if (value === null) {
            xmlNewAttribute(property, propertyNullAttribute, odataMetaXmlNs, "true");
        }

        if (propertyType) {
            xmlNewAttribute(property, propertyTypeAttribute, odataMetaXmlNs, propertyType);
        }
    };

    var writeAtomEntryDeferredProperty = function (entry, kind, name, value, context) {
        /// <summary>Writes a single property for an entry or complex type.</summary>
        /// <param name="entry">Entry object being written out.</param>
        /// <param name="name" type="String">Property name.</param>
        /// <param name="kind" type="String">Property kind description (from propertyKind values).</param>
        /// <param name="value" mayBeNull="true">Property value.</param>
        /// <param name="context">Serialization context.</param>
        /// <remarks>entry cannot be null because that would indicate a complex type, which don't support links.</remarks>

        var href;
        var inlineWriter;
        var inlineType;
        var inlineContent = kind === PROPERTYKIND_INLINE;
        if (inlineContent) {
            href = (value && value.__metadata) ? value.__metadata.uri : "";
            inlineType = payloadTypeOf(value);
            switch (inlineType) {
                case PAYLOADTYPE_ENTRY:
                    inlineWriter = writeAtomEntry;
                    break;
                case PAYLOADTYPE_FEEDORLINKS:
                    inlineType = "feed";
                    inlineWriter = writeAtomFeed;
                    break;
                case PAYLOADTYPE_NONE:
                    // Only for a null entry, serialized as a link with an empty m:inline value.
                    inlineType = PAYLOADTYPE_ENTRY;
                    inlineWriter = null;
                    break;
                default:
                    throw { message: "Invalid payload for inline navigation property: " + inlineType };
            }
        } else {
            href = value.__deferred.uri;
        }

        var rel = normalizeURI(name, odataRelatedPrefix);
        var link = writeAtomEntryLink(entry, href, rel);
        if (inlineContent) {
            var inlineRoot = xmlNewElement(link, inlineTag, odataMetaXmlNs);
            xmlNewAttribute(link, "type", null, "application/atom+xml;type=" + inlineType);
            if (inlineWriter) {
                inlineWriter(inlineRoot, value, context);
            }
        }
    };

    var atomParser = function (handler, text, context) {
        /// <summary>Parses an ATOM document (feed, entry or service document).</summary>
        /// <param name="handler">This handler.</param>
        /// <param name="text" type="String">Document text.</param>
        /// <param name="context" type="Object">Object with parsing context.</param>
        /// <returns>An object representation of the document; undefined if not applicable.</returns>

        if (text) {
            var atomRoot = xmlParse(text);
            if (atomRoot) {
                return readAtomDocument(atomRoot, context.metadata);
            }
        }
    };

    var atomSerializer = function (handler, data, context) {
        /// <summary>Serializes an ATOM object into a document (feed or entry).</summary>
        /// <param name="handler">This handler.</param>
        /// <param name="data" type="Object">Representation of feed or entry.</param>
        /// <param name="context" type="Object">Object with parsing context.</param>
        /// <returns>An text representation of the data object; undefined if not applicable.</returns>

        var cType = context.contentType = context.contentType || contentType(atomMediaType);
        var result = undefined;
        if (cType && cType.mediaType === atomMediaType) {
            var atomDoc = writeAtomDocument(data, context);
            result = xmlSerialize(atomDoc);
        }

        return result;
    };

    odata.atomHandler = handler(atomParser, atomSerializer, atomAcceptTypes.join(","), MAX_DATA_SERVICE_VERSION);



    // It's assumed that all elements may have Documentation children and Annotation elements.
    // See http://msdn.microsoft.com/en-us/library/bb399292.aspx for a CSDL reference.
    var schema = {
        elements: {
            Association: {
                attributes: ["Name"],
                elements: ["End*", "ReferentialConstraint"]
            },
            AssociationSet: {
                attributes: ["Name", "Association"],
                elements: ["End*"]
            },
            CollectionType: {
                attributes: ["ElementType", "Nullable", "DefaultValue", "MaxLength", "FixedLength", "Precision", "Scale", "Unicode", "Collation"]
            },
            ComplexType: {
                attributes: ["Name", "BaseType", "Abstract"],
                elements: ["Property*"]
            },
            DefiningExpression: {
                text: true
            },
            Dependent: {
                attributes: ["Role"],
                elements: ["PropertyRef*"]
            },
            Documentation: {
                text: true
            },
            End: {
                attributes: ["Type", "Role", "Multiplicity", "EntitySet"],
                elements: ["OnDelete"]
            },
            EntityContainer: {
                attributes: ["Name", "Extends"],
                elements: ["EntitySet*", "AssociationSet*", "FunctionImport*"]
            },
            EntitySet: {
                attributes: ["Name", "EntityType"]
            },
            EntityType: {
                attributes: ["Name", "BaseType", "Abstract", "OpenType"],
                elements: ["Key", "Property*", "NavigationProperty*"]
            },
            Function: {
                attributes: ["Name", "ReturnType"],
                elements: ["Parameter*", "DefiningExpression", "ReturnType"]
            },
            FunctionImport: {
                attributes: ["Name", "ReturnType", "EntitySet"],
                elements: ["Parameter*"]
            },
            Key: {
                elements: ["PropertyRef*"]
            },
            NavigationProperty: {
                attributes: ["Name", "Relationship", "ToRole", "FromRole"]
            },
            OnDelete: {
                attributes: ["Action"]
            },
            Parameter: {
                attributes: ["Name", "Type", "Mode", "MaxLength", "Precision", "Scale"]
            },
            Principal: {
                attributes: ["Role"],
                elements: ["PropertyRef*"]
            },
            Property: {
                attributes: ["Name", "Type", "Nullable", "DefaultValue", "MaxLength", "FixedLength", "Precision", "Scale", "Unicode", "Collation", "ConcurrencyMode"]
            },
            PropertyRef: {
                attributes: ["Name"]
            },
            ReferenceType: {
                attributes: ["Type"]
            },
            ReferentialConstraint: {
                elements: ["Principal", "Dependent"]
            },
            ReturnType: {
                attributes: ["ReturnType"],
                elements: ["CollectionType", "ReferenceType", "RowType"]
            },
            RowType: {
                elements: ["Property*"]
            },
            Schema: {
                attributes: ["Namespace", "Alias"],
                elements: ["Using*", "EntityContainer*", "EntityType*", "Association*", "ComplexType*", "Function*"]
            },
            TypeRef: {
                attributes: ["Type", "Nullable", "DefaultValue", "MaxLength", "FixedLength", "Precision", "Scale", "Unicode", "Collation"]
            },
            Using: {
                attributes: ["Namespace", "Alias"]
            }
        }
    };

    // See http://msdn.microsoft.com/en-us/library/ee373839.aspx for a feed customization reference.
    var customizationAttributes = ["m:FC_ContentKind", "m:FC_KeepInContent", "m:FC_NsPrefix", "m:FC_NsUri", "m:FC_SourcePath", "m:FC_TargetPath"];
    schema.elements.Property.attributes = schema.elements.Property.attributes.concat(customizationAttributes);
    schema.elements.EntityType.attributes = schema.elements.EntityType.attributes.concat(customizationAttributes);

    // See http://msdn.microsoft.com/en-us/library/dd541284(PROT.10).aspx for an EDMX reference.
    schema.elements.Edmx = { attributes: ["Version"], elements: ["DataServices"], ns: edmxNs };
    schema.elements.DataServices = { elements: ["Schema*"], ns: edmxNs };

    // See http://msdn.microsoft.com/en-us/library/dd541233(v=PROT.10) for Conceptual Schema Definition Language Document for Data Services.
    schema.elements.EntityContainer.attributes.push("m:IsDefaultEntityContainer");
    schema.elements.Property.attributes.push("m:MimeType");
    schema.elements.FunctionImport.attributes.push("m:HttpMethod");
    schema.elements.EntityType.attributes.push("m:HasStream");
    schema.elements.DataServices.attributes = ["m:DataServiceVersion", "m:MaxDataServiceVersion"];

    var scriptCase = function (text) {
        /// <summary>Converts a Pascal-case identifier into a camel-case identifier.</summary>
        /// <param name="text" type="String">Text to convert.</param>
        /// <returns type="String">Converted text.</returns>
        /// <remarks>If the text starts with multiple uppercase characters, it is left as-is.</remarks>

        if (!text) {
            return text;
        }

        if (text.length > 1) {
            var firstTwo = text.substr(0, 2);
            if (firstTwo === firstTwo.toUpperCase()) {
                return text;
            }

            return text.charAt(0).toLowerCase() + text.substr(1);
        }

        return text.charAt(0).toLowerCase();
    };

    var getChildSchema = function (parentSchema, candidateName) {
        /// <summary>Gets the schema node for the specified element.</summary>
        /// <param name="parentSchema" type="Object">Schema of the parent XML node of 'element'.</param>
        /// <param name="candidateName">XML element name to consider.</param>
        /// <returns type="Object">The schema that describes the specified element; null if not found.</returns>

        if (candidateName === "Documentation") {
            return { isArray: true, propertyName: "documentation" };
        }

        var elements = parentSchema.elements;
        if (!elements) {
            return null;
        }

        var i, len;
        for (i = 0, len = elements.length; i < len; i++) {
            var elementName = elements[i];
            var multipleElements = false;
            if (elementName.charAt(elementName.length - 1) === "*") {
                multipleElements = true;
                elementName = elementName.substr(0, elementName.length - 1);
            }

            if (candidateName === elementName) {
                var propertyName = scriptCase(elementName);
                return { isArray: multipleElements, propertyName: propertyName };
            }
        }

        return null;
    };

    // This regular expression is used to detect a feed customization element
    // after we've normalized it into the 'm' prefix. It starts with m:FC_,
    // followed by other characters, and ends with _ and a number.
    // The captures are 0 - whole string, 1 - name as it appears in internal table.
    var isFeedCustomizationNameRE = /^(m:FC_.*)_[0-9]+$/;

    var isEdmNamespace = function (nsURI) {
        /// <summary>Checks whether the specifies namespace URI is one of the known CSDL namespace URIs.</summary>
        /// <param name="nsURI" type="String">Namespace URI to check.</param>
        /// <returns type="Boolean">true if nsURI is a known CSDL namespace; false otherwise.</returns>

        return nsURI === edmNs || nsURI === edmNs2 || nsURI === edmNs3 || nsURI === edmNs4; 
    };

    var parseConceptualModelElement = function (element) {
        /// <summary>Parses a CSDL document.</summary>
        /// <param name="element">DOM element to parse.</param>
        /// <returns type="Object">An object describing the parsed element.</returns>

        if (!element.domNode) {
            element = xml_wrapNode(element, "");
        }

        var localName = element.localName;
        var elementSchema = schema.elements[localName];
        if (!elementSchema) {
            return null;
        }

        if (elementSchema.ns) {
            if (element.nsURI !== elementSchema.ns) {
                return null;
            }
        } else if (!isEdmNamespace(element.nsURI)) {
            return null;
        }

        var item = {};
        var extensions = [];
        var attributes = elementSchema.attributes || [];
        xmlAttributes(element, function (wrappedAttribute) {
            var node = wrappedAttribute.domNode;
            var localName = wrappedAttribute.localName;
            var namespaceURI = wrappedAttribute.nsURI;
            var value = node.value;

            // Don't do anything with xmlns attributes.
            if (namespaceURI === xmlnsNS) {
                return;
            }

            // Currently, only m: for metadata is supported as a prefix in the internal schema table,
            // un-prefixed element names imply one a CSDL element.
            var schemaName = null;
            var handled = false;
            if (isEdmNamespace(namespaceURI) || namespaceURI === null) {
                schemaName = "";
            } else if (namespaceURI === odataMetaXmlNs) {
                schemaName = "m:";
            }

            if (schemaName !== null) {
                schemaName += localName;

                // Feed customizations for complex types have additional
                // attributes with a suffixed counter starting at '1', so
                // take that into account when doing the lookup.
                var match = isFeedCustomizationNameRE.exec(schemaName);
                if (match) {
                    schemaName = match[1];
                }

                if (contains(attributes, schemaName)) {
                    handled = true;
                    item[scriptCase(localName)] = value;
                }
            }

            if (!handled) {
                extensions.push(createAttributeExtension(wrappedAttribute));
            }
        });

        xmlChildElements(element, function (child) {
            var childSchema = getChildSchema(elementSchema, child.localName);
            if (childSchema) {
                if (childSchema.isArray) {
                    var arr = item[childSchema.propertyName];
                    if (!arr) {
                        arr = [];
                        item[childSchema.propertyName] = arr;
                    }
                    arr.push(parseConceptualModelElement(child));
                } else {
                    item[childSchema.propertyName] = parseConceptualModelElement(child);
                }
            } else {
                extensions.push(createElementExtension(child));
            }
        });

        if (elementSchema.text) {
            item.text = xmlInnerText(element);
        }

        if (extensions.length) {
            item.extensions = extensions;
        }

        return item;
    };

    var metadataParser = function (handler, text) {
        /// <summary>Parses a metadata document.</summary>
        /// <param name="handler">This handler.</param>
        /// <param name="text" type="String">Metadata text.</param>
        /// <returns>An object representation of the conceptual model.</returns>

        var doc = xmlParse(text);
        return parseConceptualModelElement(doc) || undefined;
    };

    odata.metadataHandler = handler(metadataParser, null, xmlMediaType, MAX_DATA_SERVICE_VERSION);



    var jsonAcceptTypes = ["application/json", "application/json;odata=verbose"];
    var jsonMediaType = contentType(jsonAcceptTypes[0]);
    var jsonVerboseMediaType = contentType(jsonAcceptTypes[1]);


    var normalizeServiceDocument = function (data, baseURI) {
        /// <summary>Normalizes a JSON service document to look like an ATOM service document.</summary>
        /// <param name="data" type="Object">Object representation of service documents as deserialized.</param>
        /// <param name="baseURI" type="String">Base URI to resolve relative URIs.</param>
        /// <returns type="Object">An object representation of the service document.</returns>
        var workspace = { collections: [] };

        var i, len;
        for (i = 0, len = data.EntitySets.length; i < len; i++) {
            var title = data.EntitySets[i];
            var collection = {
                title: title,
                href: normalizeURI(title, baseURI)
            };

            workspace.collections.push(collection);
        }

        return { workspaces: [workspace] };
    };

    // The regular expression corresponds to something like this:
    // /Date(123+60)/
    //
    // This first number is date ticks, the + may be a - and is optional,
    // with the second number indicating a timezone offset in minutes.
    // 
    // On the wire, the leading and trailing forward slashes are
    // escaped without being required to so the chance of collisions is reduced;
    // however, by the time we see the objects, the characters already
    // look like regular forward slashes.
    var jsonDateRE = /^\/Date\((-?\d+)(\+|-)?(\d+)?\)\/$/;

    var minutesToOffset = function (minutes) {
        /// <summary>Formats the given minutes into (+/-)hh:mm format.</summary>
        /// <param name="minutes" type="Number">Number of minutes to format.</param>
        /// <returns type="String">The minutes in (+/-)hh:mm format.</returns>

        var sign;
        if (minutes < 0) {
            sign = "-";
            minutes = -minutes;
        } else {
            sign = "+";
        }

        var hours = Math.floor(minutes / 60);
        minutes = minutes - (60 * hours);

        return sign + formatNumberWidth(hours, 2) + ":" + formatNumberWidth(minutes, 2);
    };

    var parseJsonDateString = function (value) {
        /// <summary>Parses the JSON Date representation into a Date object.</summary>
        /// <param name="value" type="String">String value.</param>
        /// <returns type="Date">A Date object if the value matches one; falsy otherwise.</returns>

        var arr = value && jsonDateRE.exec(value);
        if (arr) {
            // 0 - complete results; 1 - ticks; 2 - sign; 3 - minutes
            var result = new Date(parseInt10(arr[1]));
            if (arr[2]) {
                var mins = parseInt10(arr[3]);
                if (arr[2] === "-") {
                    mins = -mins;
                }

                // The offset is reversed to get back the UTC date, which is
                // what the API will eventually have.
                var current = result.getUTCMinutes();
                result.setUTCMinutes(current - mins);
                result.__edmType = "Edm.DateTimeOffset";
                result.__offset = minutesToOffset(mins);
            }
            if (!isNaN(result.valueOf())) {
                return result;
            }
        }

        // Allow undefined to be returned.
    };

    // Some JSON implementations cannot produce the character sequence \/
    // which is needed to format DateTime and DateTimeOffset into the 
    // JSON string representation defined by the OData protocol.
    // See the history of this file for a candidate implementation of
    // a 'formatJsonDateString' function.

    var traverseInternal = function (item, callback) {
        /// <summary>Traverses a tree of objects invoking callback for every value.</summary>
        /// <param name="item" type="Object">Object or array to traverse.</param>
        /// <param name="callback" type="Function">
        /// Callback function with key and value, similar to JSON.parse reviver.
        /// </param>
        /// <returns type="Object">The object with traversed properties.</returns>
        /// <remarks>Unlike the JSON reviver, this won't delete null members.</remarks>

        if (item && typeof item === "object") {
            for (var name in item) {
                var value = item[name];
                var result = traverseInternal(value, callback);
                result = callback(name, result);
                if (result !== value) {
                    if (value === undefined) {
                        delete item[name];
                    } else {
                        item[name] = result;
                    }
                }
            }
        }

        return item;
    };

    var traverse = function (item, callback) {
        /// <summary>Traverses a tree of objects invoking callback for every value.</summary>
        /// <param name="item" type="Object">Object or array to traverse.</param>
        /// <param name="callback" type="Function">
        /// Callback function with key and value, similar to JSON.parse reviver.
        /// </param>
        /// <returns type="Object">The traversed object.</returns>
        /// <remarks>Unlike the JSON reviver, this won't delete null members.</remarks>

        return callback("", traverseInternal(item, callback));
    };

    var jsonParser = function (handler, text, context) {
        /// <summary>Parses a JSON OData payload.</summary>
        /// <param name="handler">This handler.</param>
        /// <param name="text">Payload text (this parser also handles pre-parsed objects).</param>
        /// <param name="context" type="Object">Object with parsing context.</param>
        /// <returns>An object representation of the OData payload.</returns>

        var metadata = context.metadata;
        var recognizeDates = defined(context.context ? context.context.recognizeDates : undefined, handler.recognizeDates);

        var json = (typeof text === "string") ? window.JSON.parse(text) : text;
        json = traverse(json, function (_, value) {
            if (value && typeof value === "object") {
                var dataTypeName = value.__metadata && value.__metadata.type;
                var dataType = lookupEntityType(dataTypeName, metadata) || lookupComplexType(dataTypeName, metadata);

                if (dataType) {
                    var properties = dataType.property;
                    if (properties) {
                        var i, len;
                        for (i = 0, len = properties.length; i < len; i++) {
                            var property = properties[i];
                            var propertyName = property.name;
                            var propertyValue = value[propertyName];

                            if (property.type === "Edm.DateTime" || property.type === "Edm.DateTimeOffset") {
                                if (propertyValue) {
                                    propertyValue = parseJsonDateString(propertyValue);
                                    if (!propertyValue) {
                                        throw { message: "Invalid date/time value" };
                                    }
                                    value[propertyName] = propertyValue;
                                }
                            } else if (property.type === "Edm.Time") {
                                value[propertyName] = parseDuration(propertyValue);
                            }
                        }
                    }
                } else if (recognizeDates) {
                    for (var name in value) {
                        propertyValue = value[name];
                        if (typeof propertyValue === "string") {
                            value[name] = parseJsonDateString(propertyValue) || propertyValue;
                        }
                    }
                }
            }
            return value;
        }).d;

        json = jsonUpdateDataFromVersion(json, context.dataServiceVersion);
        json = jsonNormalizeData(json, context.response.requestUri);

        return json;
    };

    var jsonSerializer = function (handler, data, context) {
        /// <summary>Serializes the data by returning its string representation.</summary>
        /// <param name="handler">This handler.</param>
        /// <param name="data">Data to serialize.</param>
        /// <param name="context" type="Object">Object with serialization context.</param>
        /// <returns type="String">The string representation of data.</returns>

        var result = undefined;
        var cType = context.contentType = context.contentType || jsonVerboseMediaType;
        if (cType && cType.mediaType === jsonMediaType.mediaType) {
            var json = data;

            // Save the current date.toJSON function
            var dateToJSON = Date.prototype.toJSON;
            try {
                // Set our own date.toJSON function
                Date.prototype.toJSON = function () {
                    return formatDateTimeOffset(this);
                };
                result = window.JSON.stringify(json, jsonReplacer);
            } finally {
                // Restore the original toJSON function
                Date.prototype.toJSON = dateToJSON;
            }
        }
        return result;
    };

    var jsonReplacer = function (_, value) {
        /// <summary>JSON replacer function for converting a value to its JSON representation.</summary>
        /// <param value type="Object">Value to convert.</param>
        /// <returns type="String">JSON representation of the input value.</returns>
        /// <remarks>
        ///   This method is used during JSON serialization and invoked only by the JSON.stringify function. 
        ///   It should never be called directly.
        /// </remarks>

        if (value && value.__edmType === "Edm.Time") {
            return formatDuration(value);
        } else {
            return value;
        }
    };

    var jsonNormalizeData = function (data, baseURI) {
        /// <summary>
        /// Normalizes the specified data into an intermediate representation.
        /// like the latest supported version.
        /// </summary>
        /// <param name="data" optional="false">Data to update.</param>
        /// <param name="baseURI" optional="false">URI to use as the base for normalizing references.</param>

        if (payloadTypeOf(data) === PAYLOADTYPE_SVCDOC) {
            return normalizeServiceDocument(data, baseURI);
        } else {
            return data;
        }
    };

    var jsonUpdateDataFromVersion = function (data, dataVersion) {
        /// <summary>
        /// Updates the specified data in the specified version to look
        /// like the latest supported version.
        /// </summary>
        /// <param name="data" optional="false">Data to update.</param>
        /// <param name="dataVersion" optional="true" type="String">Version the data is in (possibly unknown).</param>

        // Strip the trailing comma if there.
        if (dataVersion && dataVersion.lastIndexOf(";") === dataVersion.length - 1) {
            dataVersion = dataVersion.substr(0, dataVersion.length - 1);
        }

        if (!dataVersion) {
            // Try to detect whether this is an array, in which case it
            // should probably be a feed structure - indicates V1 behavior.
            if (isArray(data)) {
                dataVersion = "1.0";
            }
        }

        if (dataVersion === "1.0") {
            if (isArray(data)) {
                data = { results: data };
            }
        }

        return data;
    };

    odata.jsonHandler = handler(jsonParser, jsonSerializer, jsonAcceptTypes.join(","), MAX_DATA_SERVICE_VERSION);
    odata.jsonHandler.recognizeDates = false;


    var batchMediaType = "multipart/mixed";
    var responseStatusRegex = /^HTTP\/1\.\d (\d{3}) (.*)$/i;
    var responseHeaderRegex = /^([^()<>@,;:\\"\/[\]?={} \t]+)\s?:\s?(.*)/;

    var hex16 = function () {
        /// <summary>
        /// Calculates a random 16 bit number and returns it in hexadecimal format.
        /// </summary>
        /// <returns type="String">A 16-bit number in hex format.</returns>

        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substr(1);
    };

    var createBoundary = function (prefix) {
        /// <summary>
        /// Creates a string that can be used as a multipart request boundary.
        /// </summary>
        /// <param name="prefix" type="String" optional="true">String to use as the start of the boundary string</param>
        /// <returns type="String">Boundary string of the format: <prefix><hex16>-<hex16>-<hex16></returns>

        return prefix + hex16() + "-" + hex16() + "-" + hex16();
    };

    var partHandler = function (context) {
        /// <summary>
        /// Gets the handler for data serialization of individual requests / responses in a batch.
        /// </summary>
        /// <param name="context">Context used for data serialization.</param>
        /// <returns>Handler object.</returns>

        return context.handler.partHandler;
    };

    var currentBoundary = function (context) {
        /// <summary>
        /// Gets the current boundary used for parsing the body of a multipart response.
        /// </summary>
        /// <param name="context">Context used for parsing a multipart response.</param>
        /// <returns type="String">Boundary string.</returns>

        var boundaries = context.boundaries;
        return boundaries[boundaries.length - 1];
    };

    var batchParser = function (handler, text, context) {
        /// <summary>Parses a batch response.</summary>
        /// <param name="handler">This handler.</param>
        /// <param name="text" type="String">Batch text.</param>
        /// <param name="context" type="Object">Object with parsing context.</param>
        /// <returns>An object representation of the batch.</returns>

        var boundary = context.contentType.properties["boundary"];
        return { __batchResponses: readBatch(text, { boundaries: [boundary], handlerContext: context }) };
    };

    var batchSerializer = function (handler, data, context) {
        /// <summary>Serializes a batch object representation into text.</summary>
        /// <param name="handler">This handler.</param>
        /// <param name="data" type="Object">Representation of a batch.</param>
        /// <param name="context" type="Object">Object with parsing context.</param>
        /// <returns>An text representation of the batch object; undefined if not applicable.</returns>

        var cType = context.contentType = context.contentType || contentType(batchMediaType);
        if (cType.mediaType === batchMediaType) {
            return writeBatch(data, context);
        }
    };

    var readBatch = function (text, context) {
        /// <summary>
        /// Parses a multipart/mixed response body from from the position defined by the context. 
        /// </summary>
        /// <param name="text" type="String" optional="false">Body of the multipart/mixed response.</param>
        /// <param name="context">Context used for parsing.</param>
        /// <returns>Array of objects representing the individual responses.</returns>

        var delimiter = "--" + currentBoundary(context);

        // Move beyond the delimiter and read the complete batch
        readTo(text, context, delimiter);

        // Ignore the incoming line
        readLine(text, context);

        // Read the batch parts
        var responses = [];
        var partEnd;

        while (partEnd !== "--" && context.position < text.length) {
            var partHeaders = readHeaders(text, context);
            var partContentType = contentType(partHeaders["Content-Type"]);

            if (partContentType && partContentType.mediaType === batchMediaType) {
                context.boundaries.push(partContentType.properties["boundary"]);
                try {
                    var changeResponses = readBatch(text, context);
                } catch (e) {
                    e.response = readResponse(text, context, delimiter);
                    changeResponses = [e];
                }
                responses.push({__changeResponses: changeResponses});
                context.boundaries.pop();
                readTo(text, context, "--" + currentBoundary(context));
            } else {
                if (!partContentType || partContentType.mediaType !== "application/http") {
                    throw { message: "invalid MIME part type " };
                }
                // Skip empty line
                readLine(text, context);
                // Read the response
                var response = readResponse(text, context, delimiter);
                try {
                    if (response.statusCode >= 200 && response.statusCode <= 299) {
                        partHandler(context.handlerContext).read(response, context.handlerContext);
                    } else {
                        // Keep track of failed responses and continue processing the batch.
                        response = { message: "HTTP request failed", response: response };
                    }
                } catch (e) {
                    response = e;
                }

                responses.push(response);
            }

            partEnd = text.substr(context.position, 2);

            // Ignore the incoming line.
            readLine(text, context);
        }
        return responses;
    };

    var readHeaders = function (text, context) {
        /// <summary>
        /// Parses the http headers in the text from the position defined by the context.  
        /// </summary>
        /// <param name="text" type="String" optional="false">Text containing an http response's headers</param>
        /// <param name="context">Context used for parsing.</param>
        /// <returns>Object containing the headers as key value pairs.</returns>
        /// <remarks>
        /// This function doesn't support split headers and it will stop reading when it hits two consecutive line breaks.
        /// </remarks>

        var headers = {};
        var parts;
        var line;
        var pos;
        
        do {
            pos = context.position;
            line = readLine(text, context);
            parts = responseHeaderRegex.exec(line);
            if (parts !== null) {
                headers[parts[1]] = parts[2];
            } else {
              // Whatever was found is not a header, so reset the context position.
              context.position = pos;
            }
        } while (line && parts);

        normalizeHeaders(headers);

        return headers;
    };

    var readResponse = function (text, context, delimiter) {
        /// <summary>
        /// Parses an HTTP response. 
        /// </summary>
        /// <param name="text" type="String" optional="false">Text representing the http response.</param>
        /// <param name="context" optional="false">Context used for parsing.</param>
        /// <param name="delimiter" type="String" optional="false">String used as delimiter of the multipart response parts.</param>
        /// <returns>Object representing the http response.</returns>

        // Read the status line. 
        var pos = context.position;
        var match = responseStatusRegex.exec(readLine(text, context));

        var statusCode;
        var statusText;
        var headers;

        if (match) {
            statusCode = match[1];
            statusText = match[2];
            headers = readHeaders(text, context);
            readLine(text, context);
        } else {
            context.position = pos;
        }

         return {
            statusCode: statusCode,
            statusText: statusText,
            headers: headers,
            body: readTo(text, context, "\r\n" + delimiter)
        };
    };

    var readLine = function (text, context) {
        /// <summary>
        /// Returns a substring from the position defined by the context up to the next line break (CRLF).
        /// </summary>
        /// <param name="text" type="String" optional="false">Input string.</param>
        /// <param name="context" optional="false">Context used for reading the input string.</param>
        /// <returns type="String">Substring to the first ocurrence of a line break or null if none can be found. </returns>

        return readTo(text, context, "\r\n");
    };

    var readTo = function (text, context, str) {
        /// <summary>
        /// Returns a substring from the position given by the context up to value defined by the str parameter and increments the position in the context.
        /// </summary>
        /// <param name="text" type="String" optional="false">Input string.</param>
        /// <param name="context" type="Object" optional="false">Context used for reading the input string.</param>
        /// <param name="str" type="String" optional="true">Substring to read up to.</param>
        /// <returns type="String">Substring to the first ocurrence of str or the end of the input string if str is not specified. Null if the marker is not found.</returns>

        var start = context.position || 0;
        var end = text.length;
        if (str) {
            end = text.indexOf(str, start);
            if (end === -1) {
                return null;
            }
            context.position = end + str.length;
        } else {
            context.position = end;
        }

        return text.substring(start, end);
    };

    var writeBatch = function (data, context) {
        /// <summary>
        /// Serializes a batch request object to a string.
        /// </summary>
        /// <param name="data" optional="false">Batch request object in payload representation format</param>
        /// <param name="context" optional="false">Context used for the serialization</param>
        /// <returns type="String">String representing the batch request</returns>

        var type = payloadTypeOf(data);
        if (type !== PAYLOADTYPE_BATCH) {
            throw { message: "Serialization of batches of type \"" + type + "\" is not supported" };
        }

        var batchBoundary = createBoundary("batch_");
        var batchParts = data.__batchRequests;
        var batch = "";
        var i, len;
        for (i = 0, len = batchParts.length; i < len; i++) {
            batch += writeBatchPartDelimiter(batchBoundary, false) +
                     writeBatchPart(batchParts[i], context);
        }
        batch += writeBatchPartDelimiter(batchBoundary, true);

        // Register the boundary with the request content type.
        var contentTypeProperties = context.contentType.properties;
        contentTypeProperties.boundary = batchBoundary;

        return batch;
    };

    var writeBatchPartDelimiter = function (boundary, close) {
        /// <summary>
        /// Creates the delimiter that indicates that start or end of an individual request.
        /// </summary>
        /// <param name="boundary" type="String" optional="false">Boundary string used to indicate the start of the request</param>
        /// <param name="close" type="Boolean">Flag indicating that a close delimiter string should be generated</param>
        /// <returns type="String">Delimiter string</returns>

        var result = "\r\n--" + boundary;
        if (close) {
            result += "--";
        }

        return result + "\r\n";
    };

    var writeBatchPart = function (part, context, nested) {
        /// <summary>
        /// Serializes a part of a batch request to a string. A part can be either a GET request or 
        /// a change set grouping several CUD (create, update, delete) requests.
        /// </summary>
        /// <param name="part" optional="false">Request or change set object in payload representation format</param>
        /// <param name="context" optional="false">Object containing context information used for the serialization</param>
        /// <param name="nested" type="boolean" optional="true">Flag indicating that the part is nested inside a change set</param>
        /// <returns type="String">String representing the serialized part</returns>
        /// <remarks>
        /// A change set is an array of request objects and they cannot be nested inside other change sets.
        /// </remarks>

        var changeSet = part.__changeRequests;
        var result;
        if (isArray(changeSet)) {
            if (nested) {
                throw { message: "Not Supported: change set nested in other change set" };
            }

            var changeSetBoundary = createBoundary("changeset_");
            result = "Content-Type: " + batchMediaType + "; boundary=" + changeSetBoundary + "\r\n";
            var i, len;
            for (i = 0, len = changeSet.length; i < len; i++) {
                result += writeBatchPartDelimiter(changeSetBoundary, false) +
                     writeBatchPart(changeSet[i], context, true);
            }

            result += writeBatchPartDelimiter(changeSetBoundary, true);
        } else {
            result = "Content-Type: application/http\r\nContent-Transfer-Encoding: binary\r\n\r\n";
            prepareRequest(part, partHandler(context), { metadata: context.metadata });
            result += writeRequest(part);
        }

        return result;
    };

    var writeRequest = function (request) {
        /// <summary>
        /// Serializes a request object to a string.
        /// </summary>
        /// <param name="request" optional="false">Request object to serialize</param>
        /// <returns type="String">String representing the serialized request</returns>

        var result = (request.method ? request.method : "GET") + " " + request.requestUri + " HTTP/1.1\r\n";
        for (var name in request.headers) {
            if (request.headers[name]) {
                result = result + name + ": " + request.headers[name] + "\r\n";
            }
        }

        result += "\r\n";

        if (request.body) {
            result += request.body;
        }

        return result;
    };

    odata.batchHandler = handler(batchParser, batchSerializer, batchMediaType, MAX_DATA_SERVICE_VERSION);



    var handlers = [odata.jsonHandler, odata.atomHandler, odata.xmlHandler, odata.textHandler];

    var dispatchHandler = function (handlerMethod, requestOrResponse, context) {
        /// <summary>Dispatches an operation to handlers.</summary>
        /// <param name="handlerMethod" type="String">Name of handler method to invoke.</param>
        /// <param name="requestOrResponse" type="Object">request/response argument for delegated call.</param>
        /// <param name="context" type="Object">context argument for delegated call.</param>

        var i, len;
        for (i = 0, len = handlers.length; i < len && !handlers[i][handlerMethod](requestOrResponse, context); i++) {
        }

        if (i === len) {
            throw { message: "no handler for data" };
        }
    };

    odata.defaultSuccess = function (data) {
        /// <summary>Default success handler for OData.</summary>
        /// <param name="data">Data to process.</param>

        window.alert(window.JSON.stringify(data));
    };

    odata.defaultError = throwErrorCallback;

    odata.defaultHandler = {
        read: function (response, context) {
            /// <summary>Reads the body of the specified response by delegating to JSON and ATOM handlers.</summary>
            /// <param name="response">Response object.</param>
            /// <param name="context">Operation context.</param>

            if (response && assigned(response.body) && response.headers["Content-Type"]) {
                dispatchHandler("read", response, context);
            }
        },

        write: function (request, context) {
            /// <summary>Write the body of the specified request by delegating to JSON and ATOM handlers.</summary>
            /// <param name="request">Reques tobject.</param>
            /// <param name="context">Operation context.</param>

            dispatchHandler("write", request, context);
        },

        maxDataServiceVersion: MAX_DATA_SERVICE_VERSION,
        accept: "application/atomsvc+xml;q=0.8, application/json;odata=verbose;q=0.5, */*;q=0.1"
    };

    odata.defaultMetadata = [];

    odata.read = function (urlOrRequest, success, error, handler, httpClient, metadata) {
        /// <summary>Reads data from the specified URL.</summary>
        /// <param name="urlOrRequest">URL to read data from.</param>
        /// <param name="success" type="Function" optional="true">Callback for a successful read operation.</param>
        /// <param name="error" type="Function" optional="true">Callback for handling errors.</param>
        /// <param name="handler" type="Object" optional="true">Handler for data serialization.</param>
        /// <param name="httpClient" type="Object" optional="true">HTTP client layer.</param>
        /// <param name="metadata" type="Object" optional="true">Conceptual metadata for this request.</param>

        var request;
        if (urlOrRequest instanceof String || typeof urlOrRequest === "string") {
            request = { requestUri: urlOrRequest };
        } else {
            request = urlOrRequest;
        }

        return odata.request(request, success, error, handler, httpClient, metadata);
    };

    odata.request = function (request, success, error, handler, httpClient, metadata) {
        /// <summary>Sends a request containing OData payload to a server.</summary>
        /// <param name="request" type="Object">Object that represents the request to be sent.</param>
        /// <param name="success" type="Function" optional="true">Callback for a successful read operation.</param>
        /// <param name="error" type="Function" optional="true">Callback for handling errors.</param>
        /// <param name="handler" type="Object" optional="true">Handler for data serialization.</param>
        /// <param name="httpClient" type="Object" optional="true">HTTP client layer.</param>
        /// <param name="metadata" type="Object" optional="true">Conceptual metadata for this request.</param>

        if (!success) {
            success = odata.defaultSuccess;
        }

        if (!error) {
            error = odata.defaultError;
        }

        if (!handler) {
            handler = odata.defaultHandler;
        }

        if (!httpClient) {
            httpClient = odata.defaultHttpClient;
        }

        if (!metadata) {
            metadata = odata.defaultMetadata;
        }

        // Augment the request with additional defaults.
        request.recognizeDates = defined(request.recognizeDates, odata.jsonHandler.recognizeDates);
        request.callbackParameterName = defined(request.callbackParameterName, odata.defaultHttpClient.callbackParameterName);
        request.formatQueryString = defined(request.formatQueryString, odata.defaultHttpClient.formatQueryString);
        request.enableJsonpCallback = defined(request.enableJsonpCallback, odata.defaultHttpClient.enableJsonpCallback);

        // Create the base context for read/write operations, also specifying complete settings.
        var context = {
            metadata: metadata,
            recognizeDates: request.recognizeDates,
            callbackParameterName: request.callbackParameterName,
            formatQueryString: request.formatQueryString,
            enableJsonpCallback: request.enableJsonpCallback
        };

        try {
            prepareRequest(request, handler, context);
            return invokeRequest(request, success, error, handler, httpClient, context);
        } catch (err) {
            error(err);
        }
    };

    // Configure the batch handler to use the default handler for the batch parts.
    odata.batchHandler.partHandler = odata.defaultHandler;



    var localStorage = window.localStorage;

    var domStoreDateToJSON = function () {
        /// <summary>Converts a Date object into an object representation friendly to JSON serialization.</summary>
        /// <returns type="Object">Object that represents the Date.</returns>
        /// <remarks>
        ///   This method is used to override the Date.toJSON method and is called only by
        ///   JSON.stringify.  It should never be called directly.
        /// </remarks>

        var newValue = { v: this.valueOf(), t: "[object Date]" };
        // Date objects might have extra properties on them so we save them.
        for (var name in this) {
            newValue[name] = this[name];
        }
        return newValue;
    };

    var domStoreJSONToDate = function (_, value) {
        /// <summary>JSON reviver function for converting an object representing a Date in a JSON stream to a Date object</summary>
        /// <param value="Object">Object to convert.</param>
        /// <returns type="Date">Date object.</returns>
        /// <remarks>
        ///   This method is used during JSON parsing and invoked only by the reviver function. 
        ///   It should never be called directly.
        /// </remarks>

        if (value && value.t === "[object Date]") {
            var newValue = new Date(value.v);
            for (var name in value) {
                if (name !== "t" && name !== "v") {
                    newValue[name] = value[name];
                }
            }
            value = newValue;
        }
        return value;
    };

    var qualifyDomStoreKey = function (store, key) {
        /// <summary>Qualifies the key with the name of the store.</summary>
        /// <param name="store" type="Object">Store object whose name will be used for qualifying the key.</param>
        /// <param name="key" type="String">Key string.</param>
        /// <returns type="String">Fully qualified key string.</returns>

        return store.name + "#!#" + key;
    };

    var unqualifyDomStoreKey = function (store, key) {
        /// <summary>Gets the key part of a fully qualified key string.</summary>
        /// <param name="store" type="Object">Store object whose name will be used for qualifying the key.</param>
        /// <param name="key" type="String">Fully qualified key string.</param>
        /// <returns type="String">Key part string</returns>

        return key.replace(store.name + "#!#", "");
    };

    var DomStore = function (name) {
        /// <summary>Constructor for store objects that use DOM storage as the underlying mechanism.</summary>
        /// <param name="name" type="String">Store name.</param>
        this.name = name;
    };

    DomStore.create = function (name) {
        /// <summary>Creates a store object that uses DOM Storage as its underlying mechanism.</summary>
        /// <param name="name" type="String">Store name.</param>
        /// <returns type="Object">Store object.</returns>

        if (DomStore.isSupported()) {
            return new DomStore(name);
        }

        throw { message: "Web Storage not supported by the browser" };
    };

    DomStore.isSupported = function () {
        /// <summary>Checks whether the underlying mechanism for this kind of store objects is supported by the browser.</summary>
        /// <returns type="Boolean">True if the mechanism is supported by the browser; otherwise false.</summary>
        return !!localStorage;
    };

    DomStore.prototype.add = function (key, value, success, error) {
        /// <summary>Adds a new value identified by a key to the store.</summary>
        /// <param name="key" type="String">Key string.</param>
        /// <param name="value">Value that is going to be added to the store.</param>
        /// <param name="success" type="Function" optional="no">Callback for a successful add operation.</param>
        /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>
        /// <remarks>
        ///    This method errors out if the store already contains the specified key.
        /// </remarks>

        error = error || this.defaultError;
        var store = this;
        this.contains(key, function (contained) {
            if (!contained) {
                store.addOrUpdate(key, value, success, error);
            } else {
                delay(error, { message: "key already exists", key: key });
            }
        }, error);
    };

    DomStore.prototype.addOrUpdate = function (key, value, success, error) {
        /// <summary>Adds or updates a value identified by a key to the store.</summary>
        /// <param name="key" type="String">Key string.</param>
        /// <param name="value">Value that is going to be added or updated to the store.</param>
        /// <param name="success" type="Function" optional="no">Callback for a successful add or update operation.</param>
        /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>
        /// <remarks>
        ///   This method will overwrite the key's current value if it already exists in the store; otherwise it simply adds the new key and value.
        /// </remarks>

        error = error || this.defaultError;

        if (key instanceof Array) {
            error({ message: "Array of keys not supported" });
        } else {
            var fullKey = qualifyDomStoreKey(this, key);
            var oldDateToJSON = Date.prototype.toJSON;
            try {
                var storedValue = value;
                if (storedValue !== undefined) {
                    // Dehydrate using json
                    Date.prototype.toJSON = domStoreDateToJSON;
                    storedValue = window.JSON.stringify(value);
                }
                // Save the json string.
                localStorage.setItem(fullKey, storedValue);
                delay(success, key, value);
            }
            catch (e) {
                if (e.code === 22 || e.number === 0x8007000E) {
                    delay(error, { name: "QUOTA_EXCEEDED_ERR", error: e });
                } else {
                    delay(error, e);
                }
            }
            finally {
                Date.prototype.toJSON = oldDateToJSON;
            }
        }
    };

    DomStore.prototype.clear = function (success, error) {
        /// <summary>Removes all the data associated with this store object.</summary>
        /// <param name="success" type="Function" optional="no">Callback for a successful clear operation.</param>
        /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>
        /// <remarks>
        ///    In case of an error, this method will not restore any keys that might have been deleted at that point.
        /// </remarks>

        error = error || this.defaultError;
        try {
            var i = 0, len = localStorage.length;
            while (len > 0 && i < len) {
                var fullKey = localStorage.key(i);
                var key = unqualifyDomStoreKey(this, fullKey);
                if (fullKey !== key) {
                    localStorage.removeItem(fullKey);
                    len = localStorage.length;
                } else {
                    i++;
                }
            };
            delay(success);
        }
        catch (e) {
            delay(error, e);
        }
    };

    DomStore.prototype.close = function () {
        /// <summary>This function does nothing in DomStore as it does not have a connection model</summary>
    };

    DomStore.prototype.contains = function (key, success, error) {
        /// <summary>Checks whether a key exists in the store.</summary>
        /// <param name="key" type="String">Key string.</param>
        /// <param name="success" type="Function" optional="no">Callback indicating whether the store contains the key or not.</param>
        /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>
        error = error || this.defaultError;
        try {
            var fullKey = qualifyDomStoreKey(this, key);
            var value = localStorage.getItem(fullKey);
            delay(success, value !== null);
        } catch (e) {
            delay(error, e);
        }
    };

    DomStore.prototype.defaultError = throwErrorCallback;

    DomStore.prototype.getAllKeys = function (success, error) {
        /// <summary>Gets all the keys that exist in the store.</summary>
        /// <param name="success" type="Function" optional="no">Callback for a successful get operation.</param>
        /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>

        error = error || this.defaultError;

        var results = [];
        var i, len;

        try {
            for (i = 0, len = localStorage.length; i < len; i++) {
                var fullKey = localStorage.key(i);
                var key = unqualifyDomStoreKey(this, fullKey);
                if (fullKey !== key) {
                    results.push(key);
                }
            }
            delay(success, results);
        }
        catch (e) {
            delay(error, e);
        }
    };

    /// <summary>Identifies the underlying mechanism used by the store.</summary>
    DomStore.prototype.mechanism = "dom";

    DomStore.prototype.read = function (key, success, error) {
        /// <summary>Reads the value associated to a key in the store.</summary>
        /// <param name="key" type="String">Key string.</param>
        /// <param name="success" type="Function" optional="no">Callback for a successful reads operation.</param>
        /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>
        error = error || this.defaultError;

        if (key instanceof Array) {
            error({ message: "Array of keys not supported" });
        } else {
            try {
                var fullKey = qualifyDomStoreKey(this, key);
                var value = localStorage.getItem(fullKey);
                if (value !== null && value !== "undefined") {
                    // Hydrate using json
                    value = window.JSON.parse(value, domStoreJSONToDate);
                }
                else {
                    value = undefined;
                }
                delay(success, key, value);
            } catch (e) {
                delay(error, e);
            }
        }
    };

    DomStore.prototype.remove = function (key, success, error) {
        /// <summary>Removes a key and its value from the store.</summary>
        /// <param name="key" type="String">Key string.</param>
        /// <param name="success" type="Function" optional="no">Callback for a successful remove operation.</param>
        /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>
        error = error || this.defaultError;

        if (key instanceof Array) {
            error({ message: "Batches not supported" });
        } else {
            try {
                var fullKey = qualifyDomStoreKey(this, key);
                localStorage.removeItem(fullKey);
                delay(success);
            } catch (e) {
                delay(error, e);
            }
        }
    };

    DomStore.prototype.update = function (key, value, success, error) {
        /// <summary>Updates the value associated to a key in the store.</summary>
        /// <param name="key" type="String">Key string.</param>
        /// <param name="value">New value.</param>
        /// <param name="success" type="Function" optional="no">Callback for a successful update operation.</param>
        /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>
        /// <remarks>
        ///    This method errors out if the specified key is not found in the store.
        /// </remarks>

        error = error || this.defaultError;
        var store = this;
        this.contains(key, function (contained) {
            if (contained) {
                store.addOrUpdate(key, value, success, error);
            } else {
                delay(error, { message: "key not found", key: key });
            }
        }, error);
    };



    var mozIndexedDB = window.mozIndexedDB;

    var IDBTransaction = window.IDBTransaction;
    var IDBKeyRange = window.IDBKeyRange;

    var getError = function (error, defaultError) {
        /// <summary>Returns either a specific error handler or the default error handler</summary>
        /// <param name="error" type="Function">The specific error handler</param>
        /// <param name="defaultError" type="Function">The default error handler</param>
        /// <returns type="Function">The error callback</returns>
        return function (e) {
            if (e.code === 11 /* IndexedDb disk quota exceeded */) {
                e = { name: "QUOTA_EXCEEDED_ERR", error: e };
            }

            if (error) {
                error(e);
            } else if (defaultError) {
                defaultError(e);
            }
        };
    };

    var openTransaction = function (store, mode, success, error) {
        /// <summary>Opens a new transaction to the store</summary>
        /// <param name="store" type="IndexedDBStore">The store object</param>
        /// <param name="mode" type="Short">The read/write mode of the transaction (constants from IDBTransaction)</param>
        /// <param name="success" type="Function">The success callback</param>
        /// <param name="error" type="Function">The error callback</param>
        var name = store.name;
        var db = store.db;
        var errorCallback = getError(error, store.defaultError);

        if (db) {
            success(db.transaction(name, mode));
        } else {
            var request = mozIndexedDB.open("_datajs_" + name);
            request.onsuccess = function (event) {
                db = store.db = event.target.result;
                if (!db.objectStoreNames.contains(name)) {
                    var versionRequest = db.setVersion("1.0");
                    versionRequest.onsuccess = function () {
                        db.createObjectStore(name, null, false);
                        success(db.transaction(name, mode));
                    };
                    versionRequest.onerror = errorCallback;
                    versionRequest.onblocked = errorCallback;
                } else {
                    success(db.transaction(name, mode));
                }
            };
            request.onerror = getError(error, this.defaultError);
        }
    };

    var IndexedDBStore = function (name) {
        /// <summary>Creates a new IndexedDBStore.</summary>
        /// <param name="name" type="String">The name of the store.</param>
        /// <returns type="Object">The new IndexedDBStore.</returns>
        this.name = name;
    };

    IndexedDBStore.create = function (name) {
        /// <summary>Creates a new IndexedDBStore.</summary>
        /// <param name="name" type="String">The name of the store.</param>
        /// <returns type="Object">The new IndexedDBStore.</returns>
        if (IndexedDBStore.isSupported()) {
            return new IndexedDBStore(name);
        }

        throw { message: "IndexedDB is not supported on this browser" };
    };

    IndexedDBStore.isSupported = function () {
        /// <summary>Returns whether IndexedDB is supported.</summary>
        /// <returns type="Boolean">True if IndexedDB is supported, false otherwise.</returns>
        return !!mozIndexedDB;
    };

    IndexedDBStore.prototype.add = function (key, value, success, error) {
        /// <summary>Adds a key/value pair to the store</summary>
        /// <param name="key" type="String">The key</param>
        /// <param name="value" type="Object">The value</param>
        /// <param name="success" type="Function">The success callback</param>
        /// <param name="error" type="Function">The error callback</param>
        var name = this.name;
        var defaultError = this.defaultError;
        var keys = [];
        var values = [];

        if (key instanceof Array) {
            keys = key;
            values = value;
        } else {
            keys = [key];
            values = [value];
        }

        openTransaction(this, IDBTransaction.READ_WRITE, function (transaction) {
            transaction.onabort = getError(error, defaultError);
            transaction.oncomplete = function () {
                if (key instanceof Array) {
                    success(keys, values);
                } else {
                    success(key, value);
                }
            };

            for (var i = 0; i < keys.length && i < values.length; i++) {
                transaction.objectStore(name).add(values[i], keys[i]);
            }
        }, error);
    };

    IndexedDBStore.prototype.addOrUpdate = function (key, value, success, error) {
        /// <summary>Adds or updates a key/value pair in the store</summary>
        /// <param name="key" type="String">The key</param>
        /// <param name="value" type="Object">The value</param>
        /// <param name="success" type="Function">The success callback</param>
        /// <param name="error" type="Function">The error callback</param>
        var name = this.name;
        var defaultError = this.defaultError;
        var keys = [];
        var values = [];

        if (key instanceof Array) {
            keys = key;
            values = value;
        } else {
            keys = [key];
            values = [value];
        }

        openTransaction(this, IDBTransaction.READ_WRITE, function (transaction) {
            transaction.onabort = getError(error, defaultError);
            transaction.oncomplete = function () {
                if (key instanceof Array) {
                    success(keys, values);
                } else {
                    success(key, value);
                }
            };

            for (var i = 0; i < keys.length && i < values.length; i++) {
                transaction.objectStore(name).put(values[i], keys[i]);
            }
        }, error);
    };

    IndexedDBStore.prototype.clear = function (success, error) {
        /// <summary>Clears the store</summary>
        /// <param name="success" type="Function">The success callback</param>
        /// <param name="error" type="Function">The error callback</param>
        var name = this.name;
        var defaultError = this.defaultError;
        openTransaction(this, IDBTransaction.READ_WRITE, function (transaction) {
            transaction.onerror = getError(error, defaultError);
            transaction.oncomplete = function () {
                success();
            };

            transaction.objectStore(name).clear();
        }, error);
    };

    IndexedDBStore.prototype.close = function () {
        /// <summary>Closes the connection to the database</summary>
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    };

    IndexedDBStore.prototype.contains = function (key, success, error) {
        /// <summary>Returns whether the store contains a key</summary>
        /// <param name="key" type="String">The key</param>
        /// <param name="success" type="Function">The success callback</param>
        /// <param name="error" type="Function">The error callback</param>
        var name = this.name;
        var defaultError = this.defaultError;
        openTransaction(this, IDBTransaction.READ_ONLY, function (transaction) {
            var request = transaction.objectStore(name).openCursor(IDBKeyRange.only(key));
            transaction.oncomplete = function () {
                success(request.result !== undefined);
            };
            transaction.onerror = getError(error, defaultError);
        }, error);
    };

    IndexedDBStore.prototype.defaultError = throwErrorCallback;

    IndexedDBStore.prototype.getAllKeys = function (success, error) {
        /// <summary>Gets all the keys from the store</summary>
        /// <param name="success" type="Function">The success callback</param>
        /// <param name="error" type="Function">The error callback</param>
        var name = this.name;
        var defaultError = this.defaultError;
        openTransaction(this, IDBTransaction.READ_ONLY, function (transaction) {
            var results = [];

            transaction.oncomplete = function () {
                success(results);
            };

            var request = transaction.objectStore(name).openCursor();

            request.onerror = getError(error, defaultError);
            request.onsuccess = function (event) {
                var cursor = event.target.result;
                if (cursor) {
                    results.push(cursor.key);
                    // Some tools have issues because continue is a javascript reserved word. 
                    cursor["continue"].call(cursor);
                }
            };
        }, error);
    };

    /// <summary>Identifies the underlying mechanism used by the store.</summary>
    IndexedDBStore.prototype.mechanism = "indexeddb";

    IndexedDBStore.prototype.read = function (key, success, error) {
        /// <summary>Reads the value for the specified key</summary>
        /// <param name="key" type="String">The key</param>
        /// <param name="success" type="Function">The success callback</param>
        /// <param name="error" type="Function">The error callback</param>
        /// <remarks>If the key does not exist, the success handler will be called with value = undefined</remarks>
        var name = this.name;
        var defaultError = this.defaultError;
        var keys = (key instanceof Array) ? key : [key];

        openTransaction(this, IDBTransaction.READ_WRITE, function (transaction) {
            var values = [];

            transaction.onerror = getError(error, defaultError);
            transaction.oncomplete = function () {
                if (key instanceof Array) {
                    success(keys, values);
                } else {
                    success(keys[0], values[0]);
                }
            };

            for (var i = 0; i < keys.length; i++) {
                // Some tools have issues because get is a javascript reserved word. 
                var objectStore = transaction.objectStore(name);
                var request = objectStore["get"].call(objectStore, keys[i]);
                request.onsuccess = function (event) {
                    values.push(event.target.result);
                };
            }
        }, error);
    };

    IndexedDBStore.prototype.remove = function (key, success, error) {
        /// <summary>Removes the specified from the store</summary>
        /// <param name="key" type="String">The key</param>
        /// <param name="success" type="Function">The success callback</param>
        /// <param name="error" type="Function">The error callback</param>
        var name = this.name;
        var defaultError = this.defaultError;
        var keys = (key instanceof Array) ? key : [key];

        openTransaction(this, IDBTransaction.READ_WRITE, function (transaction) {
            transaction.onerror = getError(error, defaultError);
            transaction.oncomplete = function () {
                success();
            };

            for (var i = 0; i < keys.length; i++) {
                // Some tools have issues because continue is a javascript reserved word. 
                var objectStore = transaction.objectStore(name);
                objectStore["delete"].call(objectStore, keys[i]);
            }
        }, error);
    };

    IndexedDBStore.prototype.update = function (key, value, success, error) {
        /// <summary>Updates a key/value pair in the store</summary>
        /// <param name="key" type="String">The key</param>
        /// <param name="value" type="Object">The value</param>
        /// <param name="success" type="Function">The success callback</param>
        /// <param name="error" type="Function">The error callback</param>
        var name = this.name;
        var defaultError = this.defaultError;
        var keys = [];
        var values = [];

        if (key instanceof Array) {
            keys = key;
            values = value;
        } else {
            keys = [key];
            values = [value];
        }

        openTransaction(this, IDBTransaction.READ_WRITE, function (transaction) {
            transaction.onabort = getError(error, defaultError);
            transaction.oncomplete = function () {
                if (key instanceof Array) {
                    success(keys, values);
                } else {
                    success(key, value);
                }
            };

            for (var i = 0; i < keys.length && i < values.length; i++) {
                var request = transaction.objectStore(name).openCursor(IDBKeyRange.only(keys[i]));
                request.pair = { key: keys[i], value: values[i] };
                request.onsuccess = function (event) {
                    var cursor = event.target.result;
                    if (cursor) {
                        cursor.update(event.target.pair.value);
                    } else {
                        transaction.abort();
                    }
                };
            }
        }, error);
    };



    var MemoryStore = function (name) {
        /// <summary>Constructor for store objects that use a sorted array as the underlying mechanism.</summary>
        /// <param name="name" type="String">Store name.</param>

        var holes = [];
        var items = [];
        var keys = {};

        this.name = name;

        var getErrorCallback = function (error) {
            return error || this.defaultError;
        };

        var validateKeyInput = function (key, error) {
            /// <summary>Validates that the specified key is not undefined, not null, and not an array</summary>
            /// <param name="key">Key value.</param>
            /// <param name="error" type="Function">Error callback.</param>
            /// <returns type="Boolean">True if the key is valid. False if the key is invalid and the error callback has been queued for execution.</returns>

            var messageString;

            if (key instanceof Array) {
                messageString = "Array of keys not supported";
            }

            if (key === undefined || key === null) {
                messageString = "Invalid key";
            }

            if (messageString) {
                delay(error, { message: messageString });
                return false;
            }
            return true;
        };

        this.add = function (key, value, success, error) {
            /// <summary>Adds a new value identified by a key to the store.</summary>
            /// <param name="key" type="String">Key string.</param>
            /// <param name="value">Value that is going to be added to the store.</param>
            /// <param name="success" type="Function" optional="no">Callback for a successful add operation.</param>
            /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>
            /// <remarks>
            ///    This method errors out if the store already contains the specified key.
            /// </remarks>

            error = getErrorCallback(error);

            if (validateKeyInput(key, error)) {
                if (!keys.hasOwnProperty(key)) {
                    this.addOrUpdate(key, value, success, error);
                } else {
                    error({ message: "key already exists", key: key });
                }
            }
        };

        this.addOrUpdate = function (key, value, success, error) {
            /// <summary>Adds or updates a value identified by a key to the store.</summary>
            /// <param name="key" type="String">Key string.</param>
            /// <param name="value">Value that is going to be added or updated to the store.</param>
            /// <param name="success" type="Function" optional="no">Callback for a successful add or update operation.</param>
            /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>
            /// <remarks>
            ///   This method will overwrite the key's current value if it already exists in the store; otherwise it simply adds the new key and value.
            /// </remarks>

            error = getErrorCallback(error);

            if (validateKeyInput(key, error)) {
                var index = keys[key];
                if (index === undefined) {
                    if (holes.length > 0) {
                        index = holes.splice(0, 1);
                    } else {
                        index = items.length;
                    }
                }
                items[index] = value;
                keys[key] = index;
                delay(success, key, value);
            }
        };

        this.clear = function (success) {
            /// <summary>Removes all the data associated with this store object.</summary>
            /// <param name="success" type="Function" optional="no">Callback for a successful clear operation.</param>

            items = [];
            keys = {};
            holes = [];

            delay(success);
        };

        this.contains = function (key, success) {
            /// <summary>Checks whether a key exists in the store.</summary>
            /// <param name="key" type="String">Key string.</param>
            /// <param name="success" type="Function" optional="no">Callback indicating whether the store contains the key or not.</param>

            var contained = keys.hasOwnProperty(key);
            delay(success, contained);
        };

        this.getAllKeys = function (success) {
            /// <summary>Gets all the keys that exist in the store.</summary>
            /// <param name="success" type="Function" optional="no">Callback for a successful get operation.</param>

            var results = [];
            for (var name in keys) {
                results.push(name);
            }
            delay(success, results);
        };

        this.read = function (key, success, error) {
            /// <summary>Reads the value associated to a key in the store.</summary>
            /// <param name="key" type="String">Key string.</param>
            /// <param name="success" type="Function" optional="no">Callback for a successful reads operation.</param>
            /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>
            error = getErrorCallback(error);

            if (validateKeyInput(key, error)) {
                var index = keys[key];
                delay(success, key, items[index]);
            }
        };

        this.remove = function (key, success, error) {
            /// <summary>Removes a key and its value from the store.</summary>
            /// <param name="key" type="String">Key string.</param>
            /// <param name="success" type="Function" optional="no">Callback for a successful remove operation.</param>
            /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>
            error = getErrorCallback(error);

            if (validateKeyInput(key, error)) {
                var index = keys[key];
                if (index !== undefined) {
                    if (index === items.length - 1) {
                        items.pop();
                    } else {
                        items[index] = undefined;
                        holes.push(index);
                    }
                    delete keys[key];

                    // The last item was removed, no need to keep track of any holes in the array.
                    if (items.length === 0) {
                        holes = [];
                    }
                }

                delay(success);
            }
        };

        this.update = function (key, value, success, error) {
            /// <summary>Updates the value associated to a key in the store.</summary>
            /// <param name="key" type="String">Key string.</param>
            /// <param name="value">New value.</param>
            /// <param name="success" type="Function" optional="no">Callback for a successful update operation.</param>
            /// <param name="error" type="Function" optional="yes">Callback for handling errors. If not specified then store.defaultError is invoked.</param>
            /// <remarks>
            ///    This method errors out if the specified key is not found in the store.
            /// </remarks>

            error = getErrorCallback(error);
            if (validateKeyInput(key, error)) {
                if (keys.hasOwnProperty(key)) {
                    this.addOrUpdate(key, value, success, error);
                } else {
                    error({ message: "key not found", key: key });
                }
            }
        };
    };

    MemoryStore.create = function (name) {
        /// <summary>Creates a store object that uses memory storage as its underlying mechanism.</summary>
        /// <param name="name" type="String">Store name.</param>
        /// <returns type="Object">Store object.</returns>
        return new MemoryStore(name);
    };

    MemoryStore.isSupported = function () {
        /// <summary>Checks whether the underlying mechanism for this kind of store objects is supported by the browser.</summary>
        /// <returns type="Boolean">True if the mechanism is supported by the browser; otherwise false.</returns>
        return true;
    };

    MemoryStore.prototype.close = function () {
        /// <summary>This function does nothing in MemoryStore as it does not have a connection model.</summary>
    };

    MemoryStore.prototype.defaultError = throwErrorCallback;

    /// <summary>Identifies the underlying mechanism used by the store.</summary>
    MemoryStore.prototype.mechanism = "memory";



    var mechanisms = {
        indexeddb: IndexedDBStore,
        dom: DomStore,
        memory: MemoryStore
    };

    datajs.defaultStoreMechanism = "best";

    datajs.createStore = function (name, mechanism) {
        /// <summary>Creates a new store object.</summary>
        /// <param name="name" type="String">Store name.</param>
        /// <param name="mechanism" type="String" optional="true">A specific mechanism to use (defaults to best, can be "best", "dom", "indexeddb", "webdb").</param>
        /// <returns type="Object">Store object.</returns>

        if (!mechanism) {
            mechanism = datajs.defaultStoreMechanism;
        }

        if (mechanism === "best") {
            mechanism = (DomStore.isSupported()) ? "dom" : "memory";
        }

        var factory = mechanisms[mechanism];
        if (factory) {
            return factory.create(name);
        }

        throw { message: "Failed to create store", name: name, mechanism: mechanism };
    };




    var forwardCall = function (thisValue, name, returnValue) {
        /// <summary>Creates a new function to forward a call.</summary>
        /// <param name="thisValue" type="Object">Value to use as the 'this' object.</param>
        /// <param name="name" type="String">Name of function to forward to.</param>
        /// <param name="returnValue" type="Object">Return value for the forward call (helps keep identity when chaining calls).</param>
        /// <returns type="Function">A new function that will forward a call.</returns>

        return function () {
            thisValue[name].apply(thisValue, arguments);
            return returnValue;
        };
    };

    var DjsDeferred = function () {
        /// <summary>Initializes a new DjsDeferred object.</summary>
        /// <remarks>
        /// Compability Note A - Ordering of callbacks through chained 'then' invocations
        ///
        /// The Wiki entry at http://wiki.commonjs.org/wiki/Promises/A
        /// implies that .then() returns a distinct object.
        ////
        /// For compatibility with http://api.jquery.com/category/deferred-object/
        /// we return this same object. This affects ordering, as
        /// the jQuery version will fire callbacks in registration
        /// order regardless of whether they occur on the result
        /// or the original object.
        ///
        /// Compability Note B - Fulfillment value
        /// 
        /// The Wiki entry at http://wiki.commonjs.org/wiki/Promises/A
        /// implies that the result of a success callback is the
        /// fulfillment value of the object and is received by
        /// other success callbacks that are chained.
        ///
        /// For compatibility with http://api.jquery.com/category/deferred-object/
        /// we disregard this value instead.
        /// </remarks>

        this._arguments = undefined;
        this._done = undefined;
        this._fail = undefined;
        this._resolved = false;
        this._rejected = false;
    };

    DjsDeferred.prototype = {
        then: function (fulfilledHandler, errorHandler /*, progressHandler */) {
            /// <summary>Adds success and error callbacks for this deferred object.</summary>
            /// <param name="fulfilledHandler" type="Function" mayBeNull="true" optional="true">Success callback.</param>
            /// <param name="errorHandler" type="Function" mayBeNull="true" optional="true">Error callback.</param>
            /// <remarks>See Compatibility Note A.</remarks>

            if (fulfilledHandler) {
                if (!this._done) {
                    this._done = [fulfilledHandler];
                } else {
                    this._done.push(fulfilledHandler);
                }
            }

            if (errorHandler) {
                if (!this._fail) {
                    this._fail = [errorHandler];
                } else {
                    this._fail.push(errorHandler);
                }
            }

            //// See Compatibility Note A in the DjsDeferred constructor.
            //// if (!this._next) {
            ////    this._next = createDeferred();
            //// } 
            //// return this._next.promise();

            if (this._resolved) {
                this.resolve.apply(this, this._arguments);
            } else if (this._rejected) {
                this.reject.apply(this, this._arguments);
            }

            return this;
        },

        resolve: function (/* args */) {
            /// <summary>Invokes success callbacks for this deferred object.</summary>
            /// <remarks>All arguments are forwarded to success callbacks.</remarks>


            if (this._done) {
                var i, len;
                for (i = 0, len = this._done.length; i < len; i++) {
                    //// See Compability Note B - Fulfillment value.
                    //// var nextValue = 
                    this._done[i].apply(null, arguments);
                }

                //// See Compatibility Note A in the DjsDeferred constructor.
                //// this._next.resolve(nextValue);
                //// delete this._next;

                this._done = undefined;
                this._resolved = false;
                this._arguments = undefined;
            } else {
                this._resolved = true;
                this._arguments = arguments;
            }
        },

        reject: function (/* args */) {
            /// <summary>Invokes error callbacks for this deferred object.</summary>
            /// <remarks>All arguments are forwarded to error callbacks.</remarks>
            if (this._fail) {
                var i, len;
                for (i = 0, len = this._fail.length; i < len; i++) {
                    this._fail[i].apply(null, arguments);
                }

                this._fail = undefined;
                this._rejected = false;
                this._arguments = undefined;
            } else {
                this._rejected = true;
                this._arguments = arguments;
            }
        },

        promise: function () {
            /// <summary>Returns a version of this object that has only the read-only methods available.</summary>
            /// <returns>An object with only the promise object.</returns>

            var result = {};
            result.then = forwardCall(this, "then", result);
            return result;
        }
    };

    var createDeferred = function () {
        /// <summary>Creates a deferred object.</summary>
        /// <returns type="DjsDeferred">
        /// A new deferred object. If jQuery is installed, then a jQuery
        /// Deferred object is returned, which provides a superset of features.
        /// </returns>

        if (window.jQuery && window.jQuery.Deferred) {
            return new window.jQuery.Deferred();
        } else {
            return new DjsDeferred();
        }
    };



    var appendQueryOption = function (uri, queryOption) {
        /// <summary>Appends the specified escaped query option to the specified URI.</summary>
        /// <param name="uri" type="String">URI to append option to.</param>
        /// <param name="queryOption" type="String">Escaped query option to append.</param>
        var separator = (uri.indexOf("?") >= 0) ? "&" : "?";
        return uri + separator + queryOption;
    };

    var appendSegment = function (uri, segment) {
        /// <summary>Appends the specified segment to the given URI.</summary>
        /// <param name="uri" type="String">URI to append a segment to.</param>
        /// <param name="segment" type="String">Segment to append.</param>
        /// <returns type="String">The original URI with a new segment appended.</returns>

        var index = uri.indexOf("?");
        var queryPortion = "";
        if (index >= 0) {
            queryPortion = uri.substr(index);
            uri = uri.substr(0, index);
        }

        if (uri[uri.length - 1] !== "/") {
            uri += "/";
        }
        return uri + segment + queryPortion;
    };

    var buildODataRequest = function (uri, options) {
        /// <summary>Builds a request object to GET the specified URI.</summary>
        /// <param name="uri" type="String">URI for request.</param>
        /// <param name="options" type="Object">Additional options.</param>

        return {
            method: "GET",
            requestUri: uri,
            user: options.user,
            password: options.password,
            enableJsonpCallback: options.enableJsonpCallback,
            callbackParameterName: options.callbackParameterName,
            formatQueryString: options.formatQueryString
        };
    };

    var findQueryOptionStart = function (uri, name) {
        /// <summary>Finds the index where the value of a query option starts.</summary>
        /// <param name="uri" type="String">URI to search in.</param>
        /// <param name="name" type="String">Name to look for.</param>
        /// <returns type="Number">The index where the query option starts.</returns>

        var result = -1;
        var queryIndex = uri.indexOf("?");
        if (queryIndex !== -1) {
            var start = uri.indexOf("?" + name + "=", queryIndex);
            if (start === -1) {
                start = uri.indexOf("&" + name + "=", queryIndex);
            }
            if (start !== -1) {
                result = start + name.length + 2;
            }
        }
        return result;
    };

    var queryForData = function (uri, options, success, error) {
        /// <summary>Gets data from an OData service.</summary>
        /// <param name="uri" type="String">URI to the OData service.</param>
        /// <param name="options" type="Object">Object with additional well-known request options.</param>
        /// <param name="success" type="Function">Success callback.</param>
        /// <param name="error" type="Function">Error callback.</param>
        /// <returns type="Object">Object with an abort method.</returns>

        var request = queryForDataInternal(uri, options, [], success, error);
        return request;
    };

    var queryForDataInternal = function (uri, options, data, success, error) {
        /// <summary>Gets data from an OData service taking into consideration server side paging.</summary>
        /// <param name="uri" type="String">URI to the OData service.</param>
        /// <param name="options" type="Object">Object with additional well-known request options.</param>
        /// <param name="data" type="Array">Array that stores the data provided by the OData service.</param>
        /// <param name="success" type="Function">Success callback.</param>
        /// <param name="error" type="Function">Error callback.</param>
        /// <returns type="Object">Object with an abort method.</returns>

        var request = buildODataRequest(uri, options);
        var currentRequest = odata.request(request, function (newData) {
            var next = newData.__next;
            var results = newData.results;

            data = data.concat(results);

            if (next) {
                currentRequest = queryForDataInternal(next, options, data, success, error);
            } else {
                success(data);
            }
        }, error, undefined, options.httpClient, options.metadata);

        return {
            abort: function () {
                currentRequest.abort();
            }
        };
    };

    var ODataCacheSource = function (options) {
        /// <summary>Creates a data cache source object for requesting data from an OData service.</summary>
        /// <param name="options">Options for the cache data source.</param>
        /// <returns type="ODataCacheSource">A new data cache source instance.</returns>

        var that = this;
        var uri = options.source;
        
        that.identifier = normalizeURICase(encodeURI(decodeURI(uri)));
        that.options = options;

        that.count = function (success, error) {
            /// <summary>Gets the number of items in the collection.</summary>
            /// <param name="success" type="Function">Success callback with the item count.</param>
            /// <param name="error" type="Function">Error callback.</param>
            /// <returns type="Object">Request object with an abort method./<param>

            var options = that.options;
            return odata.request(
                buildODataRequest(appendSegment(uri, "$count"), options),
                function (data) {
                    var count = parseInt10(data.toString());
                    if (isNaN(count)) {
                        error({ message: "Count is NaN", count: count });
                    } else {
                        success(count);
                    }
                }, error, undefined, options.httpClient, options.metadata);
        };

        that.read = function (index, count, success, error) {
            /// <summary>Gets a number of consecutive items from the collection.</summary>
            /// <param name="index" type="Number">Zero-based index of the items to retrieve.</param>
            /// <param name="count" type="Number">Number of items to retrieve.</param>
            /// <param name="success" type="Function">Success callback with the requested items.</param>
            /// <param name="error" type="Function">Error callback.</param>
            /// <returns type="Object">Request object with an abort method./<param>

            var queryOptions = "$skip=" + index + "&$top=" + count;
            return queryForData(appendQueryOption(uri, queryOptions), that.options, success, error);
        };

        return that;
    };



    var appendPage = function (operation, page) {
        /// <summary>Appends a page's data to the operation data.</summary>
        /// <param name="operation" type="Object">Operation with (i)ndex, (c)ount and (d)ata.</param>
        /// <param name="page" type="Object">Page with (i)ndex, (c)ount and (d)ata.</param>

        var intersection = intersectRanges(operation, page);
        if (intersection) {
            var start = intersection.i - page.i;
            var end = start + (operation.c - operation.d.length);
            operation.d = operation.d.concat(page.d.slice(start, end));
        }
    };

    var intersectRanges = function (x, y) {
        /// <summary>Returns the {(i)ndex, (c)ount} range for the intersection of x and y.</summary>
        /// <param name="x" type="Object">Range with (i)ndex and (c)ount members.</param>
        /// <param name="y" type="Object">Range with (i)ndex and (c)ount members.</param>
        /// <returns type="Object">The intersection (i)ndex and (c)ount; undefined if there is no intersection.</returns>

        var xLast = x.i + x.c;
        var yLast = y.i + y.c;
        var resultIndex = (x.i > y.i) ? x.i : y.i;
        var resultLast = (xLast < yLast) ? xLast : yLast;
        var result;
        if (resultLast >= resultIndex) {
            result = { i: resultIndex, c: resultLast - resultIndex };
        }

        return result;
    };

    var checkZeroGreater = function (val, name) {
        /// <summary>Checks whether val is a defined number with value zero or greater.</summary>
        /// <param name="val" type="Number">Value to check.</param>
        /// <param name="name" type="String">Parameter name to use in exception.</param>

        if (val === undefined || typeof val !== "number") {
            throw { message: "'" + name + "' must be a number." };
        }

        if (isNaN(val) || val < 0 || !isFinite(val)) {
            throw { message: "'" + name + "' must be greater than or equal to zero." };
        }
    };

    var checkUndefinedGreaterThanZero = function (val, name) {
        /// <summary>Checks whether val is undefined or a number with value greater than zero.</summary>
        /// <param name="val" type="Number">Value to check.</param>
        /// <param name="name" type="String">Parameter name to use in exception.</param>

        if (val !== undefined) {
            if (typeof val !== "number") {
                throw { message: "'" + name + "' must be a number." };
            }

            if (isNaN(val) || val <= 0 || !isFinite(val)) {
                throw { message: "'" + name + "' must be greater than zero." };
            }
        }
    };

    var checkUndefinedOrNumber = function (val, name) {
        /// <summary>Checks whether val is undefined or a number</summary>
        /// <param name="val" type="Number">Value to check.</param>
        /// <param name="name" type="String">Parameter name to use in exception.</param>
        if (val !== undefined && (typeof val !== "number" || isNaN(val) || !isFinite(val))) {
            throw { message: "'" + name + "' must be a number." };
        }
    };

    var removeFromArray = function (arr, item) {
        /// <summary>Performs a linear search on the specified array and removes the first instance of 'item'.</summary>
        /// <param name="arr" type="Array">Array to search.</param>
        /// <param name="item">Item being sought.</param>
        /// <returns type="Boolean">Whether the item was removed.</returns>

        var i, len;
        for (i = 0, len = arr.length; i < len; i++) {
            if (arr[i] === item) {
                arr.splice(i, 1);
                return true;
            }
        }

        return false;
    };

    var extend = function (target, values) {
        /// <summary>Extends the target with the specified values.</summary>
        /// <param name="target" type="Object">Object to add properties to.</param>
        /// <param name="values" type="Object">Object with properties to add into target.</param>
        /// <returns type="Object">The target object.</returns>

        for (var name in values) {
            target[name] = values[name];
        }

        return target;
    };

    var estimateSize = function (obj) {
        /// <summary>Estimates the size of an object in bytes.</summary>
        /// <param name="obj" type="Object">Object to determine the size of.</param>
        /// <returns type="Integer">Estimated size of the object in bytes.</returns>
        var size = 0;
        var type = typeof obj;

        if (type === "object" && obj) {
            for (var name in obj) {
                size += name.length * 2 + estimateSize(obj[name]);
            }
        } else if (type === "string") {
            size = obj.length * 2;
        } else {
            size = 8;
        }
        return size;
    };

    var snapToPageBoundaries = function (lowIndex, highIndex, pageSize) {
        /// <summary>Snaps low and high indices into page sizes and returns a range.</summary>
        /// <param name="lowIndex" type="Number">Low index to snap to a lower value.</param>
        /// <param name="highIndex" type="Number">High index to snap to a higher value.</param>
        /// <param name="pageSize" type="Number">Page size to snap to.</param>
        /// <returns type="Object">A range with (i)ndex and (c)ount of elements.</returns>

        lowIndex = Math.floor(lowIndex / pageSize) * pageSize;
        highIndex = Math.ceil((highIndex + 1) / pageSize) * pageSize;
        return { i: lowIndex, c: highIndex - lowIndex };
    };

    // The DataCache is implemented using state machines.  The following constants are used to properly 
    // identify and label the states that these machines transition to.

    // DataCache state constants

    var CACHE_STATE_DESTROY = "destroy";
    var CACHE_STATE_IDLE = "idle";
    var CACHE_STATE_INIT = "init";
    var CACHE_STATE_READ = "read";
    var CACHE_STATE_PREFETCH = "prefetch";
    var CACHE_STATE_WRITE = "write";

    // DataCacheOperation state machine states.  
    // Transitions on operations also depend on the cache current of the cache.

    var OPERATION_STATE_CANCEL = "cancel";
    var OPERATION_STATE_END = "end";
    var OPERATION_STATE_ERROR = "error";
    var OPERATION_STATE_START = "start";
    var OPERATION_STATE_WAIT = "wait";

    // Destroy state machine states

    var DESTROY_STATE_CLEAR = "clear";

    // Read / Prefetch state machine states 

    var READ_STATE_DONE = "done";
    var READ_STATE_LOCAL = "local";
    var READ_STATE_SAVE = "save";
    var READ_STATE_SOURCE = "source";

    var DataCacheOperation = function (stateMachine, promise, isCancelable, index, count, data, pending) {
        /// <summary>Creates a new operation object.</summary>
        /// <param name="stateMachine" type="Function">State machine that describes the specific behavior of the operation.</param>
        /// <param name="promise" type ="DjsDeferred">Promise for requested values.</param>
        /// <param name="isCancelable" type ="Boolean">Whether this operation can be canceled or not.</param>
        /// <param name="index" type="Number">Index of first item requested.</param>
        /// <param name="count" type="Number">Count of items requested.</param>
        /// <param name="data" type="Array">Array with the items requested by the operation.</param>
        /// <param name="pending" type="Number">Total number of pending prefetch records.</param>
        /// <returns type="DataCacheOperation">A new data cache operation instance.</returns>

        /// <field name="p" type="DjsDeferred">Promise for requested values.</field>
        /// <field name="i" type="Number">Index of first item requested.</field>
        /// <field name="c" type="Number">Count of items requested.</field>
        /// <field name="d" type="Array">Array with the items requested by the operation.</field>
        /// <field name="s" type="Array">Current state of the operation.</field>
        /// <field name="canceled" type="Boolean">Whether the operation has been canceled.</field>
        /// <field name="pending" type="Number">Total number of pending prefetch records.</field>
        /// <field name="oncomplete" type="Function">Callback executed when the operation reaches the end state.</field>

        var stateData;
        var cacheState;
        var that = this;

        that.p = promise;
        that.i = index;
        that.c = count;
        that.d = data;
        that.s = OPERATION_STATE_START;

        that.canceled = false;
        that.pending = pending;
        that.oncomplete = null;

        that.cancel = function () {
            /// <summary>Transitions this operation to the cancel state and sets the canceled flag to true.</summary>
            /// <remarks>The function is a no-op if the operation is non-cancelable.</summary>

            if (!isCancelable) {
                return;
            }

            var state = that.s;
            if (state !== OPERATION_STATE_ERROR && state !== OPERATION_STATE_END && state !== OPERATION_STATE_CANCEL) {
                that.canceled = true;
                transition(OPERATION_STATE_CANCEL, stateData);
            }
        };

        that.complete = function () {
            /// <summary>Transitions this operation to the end state.</summary>

            transition(OPERATION_STATE_END, stateData);
        };

        that.error = function (err) {
            /// <summary>Transitions this operation to the error state.</summary>
            if (!that.canceled) {
                transition(OPERATION_STATE_ERROR, err);
            }
        };

        that.run = function (state) {
            /// <summary>Executes the operation's current state in the context of a new cache state.</summary>
            /// <param name="state" type="Object">New cache state.</param> 

            cacheState = state;
            that.transition(that.s, stateData);
        };

        that.wait = function (data) {
            /// <summary>Transitions this operation to the wait state.</summary>

            transition(OPERATION_STATE_WAIT, data);
        };

        var operationStateMachine = function (opTargetState, cacheState, data) {
            /// <summary>State machine that describes all operations common behavior.</summary>
            /// <param name="opTargetState" type="Object">Operation state to transition to.</param>
            /// <param name="cacheState" type="Object">Current cache state.</param>
            /// <param name="data" type="Object" optional="true">Additional data passed to the state.</param> 

            switch (opTargetState) {
                case OPERATION_STATE_START:
                    // Initial state of the operation. The operation will remain in this state until the cache has been fully initialized.
                    if (cacheState !== CACHE_STATE_INIT) {
                        stateMachine(that, opTargetState, cacheState, data);
                    }
                    break;

                case OPERATION_STATE_WAIT:
                    // Wait state indicating that the operation is active but waiting for an asynchronous operation to complete. 
                    stateMachine(that, opTargetState, cacheState, data);
                    break;

                case OPERATION_STATE_CANCEL:
                    // Cancel state.
                    stateMachine(that, opTargetState, cacheState, data);
                    that.fireCanceled();
                    transition(OPERATION_STATE_END);
                    break;

                case OPERATION_STATE_ERROR:
                    // Error state. Data is expected to be an object detailing the error condition.  
                    stateMachine(that, opTargetState, cacheState, data);
                    that.canceled = true;
                    that.fireRejected(data);
                    transition(OPERATION_STATE_END);
                    break;

                case OPERATION_STATE_END:
                    // Final state of the operation.
                    if (that.oncomplete) {
                        that.oncomplete(that);
                    }
                    if (!that.canceled) {
                        that.fireResolved();
                    }
                    stateMachine(that, opTargetState, cacheState, data);
                    break;

                default:
                    // Any other state is passed down to the state machine describing the operation's specific behavior.
                        stateMachine(that, opTargetState, cacheState, data);
                    break;
            }
        };

        var transition = function (state, data) {
            /// <summary>Transitions this operation to a new state.</summary>
            /// <param name="state" type="Object">State to transition the operation to.</param>
            /// <param name="data" type="Object" optional="true">Additional data passed to the state.</param> 

            that.s = state;
            stateData = data;
            operationStateMachine(state, cacheState, data);
        };

        that.transition = transition;

        return that;
    };

    DataCacheOperation.prototype.fireResolved = function () {
        /// <summary>Fires a resolved notification as necessary.</summary>

        // Fire the resolve just once.
        var p = this.p;
        if (p) {
            this.p = null;
            p.resolve(this.d);
        }
    };

    DataCacheOperation.prototype.fireRejected = function (reason) {
        /// <summary>Fires a rejected notification as necessary.</summary>

        // Fire the rejection just once.
        var p = this.p;
        if (p) {
            this.p = null;
            p.reject(reason);
        }
    };

    DataCacheOperation.prototype.fireCanceled = function () {
        /// <summary>Fires a canceled notification as necessary.</summary>

        this.fireRejected({ canceled: true, message: "Operation canceled" });
    };


    var DataCache = function (options) {
        /// <summary>Creates a data cache for a collection that is efficiently loaded on-demand.</summary>
        /// <param name="options">
        /// Options for the data cache, including name, source, pageSize,
        /// prefetchSize, cacheSize, storage mechanism, and initial prefetch and local-data handler.
        /// </param>
        /// <returns type="DataCache">A new data cache instance.</returns>

        var state = CACHE_STATE_INIT;
        var stats = { counts: 0, netReads: 0, prefetches: 0, cacheReads: 0 };

        var clearOperations = [];
        var readOperations = [];
        var prefetchOperations = [];

        var actualCacheSize = 0;                                             // Actual cache size in bytes.
        var allDataLocal = false;                                            // Whether all data is local.
        var cacheSize = undefinedDefault(options.cacheSize, 1048576);        // Requested cache size in bytes, default 1 MB.
        var collectionCount = 0;                                             // Number of elements in the server collection.
        var highestSavedPage = 0;                                            // Highest index of all the saved pages.
        var highestSavedPageSize = 0;                                        // Item count of the saved page with the highest index.
        var overflowed = cacheSize === 0;                                    // If the cache has overflowed (actualCacheSize > cacheSize or cacheSize == 0);
        var pageSize = undefinedDefault(options.pageSize, 50);               // Number of elements to store per page.
        var prefetchSize = undefinedDefault(options.prefetchSize, pageSize); // Number of elements to prefetch from the source when the cache is idling.
        var version = "1.0";
        var cacheFailure;

        var pendingOperations = 0;

        var source = options.source;
        if (typeof source === "string") {
            // Create a new cache source.
            source = new ODataCacheSource(options);
        }
        source.options = options;

        // Create a cache local store.
        var store = datajs.createStore(options.name, options.mechanism);

        var that = this;

        that.onidle = options.idle;
        that.stats = stats;

        that.count = function () {
            /// <summary>Counts the number of items in the collection.</summary>
            /// <returns type="Object">A promise with the number of items.</returns>

            if (cacheFailure) {
                throw cacheFailure;
            }

            var deferred = createDeferred();
            var canceled = false;

            if (allDataLocal) {
                delay(function () {
                    deferred.resolve(collectionCount);
                });

                return deferred.promise();
            }

            // TODO: Consider returning the local data count instead once allDataLocal flag is set to true.
            var request = source.count(function (count) {
                request = null;
                stats.counts++;
                deferred.resolve(count);
            }, function (err) {
                request = null;
                deferred.reject(extend(err, { canceled: canceled }));
            });

            return extend(deferred.promise(), {
                cancel: function () {
                    /// <summary>Aborts the count operation.</summary>
                    if (request) {
                        canceled = true;
                        request.abort();
                        request = null;
                    }
                }
            });
        };

        that.clear = function () {
            /// <summary>Cancels all running operations and clears all local data associated with this cache.</summary>
            /// <remarks>
            /// New read requests made while a clear operation is in progress will not be canceled. 
            /// Instead they will be queued for execution once the operation is completed.
            /// </remarks>
            /// <returns type="Object">A promise that has no value and can't be canceled.</returns>

            if (cacheFailure) {
                throw cacheFailure;
            }

            if (clearOperations.length === 0) {
                var deferred = createDeferred();
                var op = new DataCacheOperation(destroyStateMachine, deferred, false);
                queueAndStart(op, clearOperations);
                return deferred.promise();
            }
            return clearOperations[0].p;
        };

        that.filterForward = function (index, count, predicate) {
            /// <summary>Filters the cache data based a predicate.</summary>
            /// <param name="index" type="Number">The index of the item to start filtering forward from.</param>
            /// <param name="count" type="Number">Maximum number of items to include in the result.</param>
            /// <param name="predicate" type="Function">Callback function returning a boolean that determines whether an item should be included in the result or not.</param>
            /// <remarks>
            /// Specifying a negative count value will yield all the items in the cache that satisfy the predicate.
            /// </remarks>
            /// <returns type="DjsDeferred">A promise for an array of results.</returns>
            return filter(index, count, predicate, false);
        };

        that.filterBack = function (index, count, predicate) {
            /// <summary>Filters the cache data based a predicate.</summary>
            /// <param name="index" type="Number">The index of the item to start filtering backward from.</param>
            /// <param name="count" type="Number">Maximum number of items to include in the result.</param>
            /// <param name="predicate" type="Function">Callback function returning a boolean that determines whether an item should be included in the result or not.</param>
            /// <remarks>
            /// Specifying a negative count value will yield all the items in the cache that satisfy the predicate.
            /// </remarks>
            /// <returns type="DjsDeferred">A promise for an array of results.</returns>
            return filter(index, count, predicate, true);
        };

        that.readRange = function (index, count) {
            /// <summary>Reads a range of adjacent records.</summary>
            /// <param name="index" type="Number">Zero-based index of record range to read.</param>
            /// <param name="count" type="Number">Number of records in the range.</param>
            /// <remarks>
            /// New read requests made while a clear operation is in progress will not be canceled. 
            /// Instead they will be queued for execution once the operation is completed.
            /// </remarks>
            /// <returns type="DjsDeferred">
            /// A promise for an array of records; less records may be returned if the
            /// end of the collection is found.
            /// </returns>

            checkZeroGreater(index, "index");
            checkZeroGreater(count, "count");

            if (cacheFailure) {
                throw cacheFailure;
            }

            var deferred = createDeferred();

            // Merging read operations would be a nice optimization here.
            var op = new DataCacheOperation(readStateMachine, deferred, true, index, count, [], 0);
            queueAndStart(op, readOperations);

            return extend(deferred.promise(), {
                cancel: function () {
                    /// <summary>Aborts the readRange operation.</summary>
                    op.cancel();
                }
            });
        };

        that.ToObservable = that.toObservable = function () {
            /// <summary>Creates an Observable object that enumerates all the cache contents.</summary>
            /// <returns>A new Observable object that enumerates all the cache contents.</returns>
            if (!window.Rx || !window.Rx.Observable) {
                throw { message: "Rx library not available - include rx.js" };
            }

            if (cacheFailure) {
                throw cacheFailure;
            }

            return window.Rx.Observable.CreateWithDisposable(function (obs) {
                var disposed = false;
                var index = 0;

                var errorCallback = function (error) {
                    if (!disposed) {
                        obs.OnError(error);
                    }
                };

                var successCallback = function (data) {
                    if (!disposed) {
                        var i, len;
                        for (i = 0, len = data.length; i < len; i++) {
                            // The wrapper automatically checks for Dispose
                            // on the observer, so we don't need to check it here.
                            obs.OnNext(data[i]);
                        }

                        if (data.length < pageSize) {
                            obs.OnCompleted();
                        } else {
                            index += pageSize;
                            that.readRange(index, pageSize).then(successCallback, errorCallback);
                        }
                    }
                };

                that.readRange(index, pageSize).then(successCallback, errorCallback);

                return { Dispose: function () { disposed = true; } };
            });
        };

        var cacheFailureCallback = function (message) {
            /// <summary>Creates a function that handles a callback by setting the cache into failure mode.</summary>
            /// <param name="message" type="String">Message text.</param>
            /// <returns type="Function">Function to use as error callback.</returns>
            /// <remarks>
            /// This function will specifically handle problems with critical store resources 
            /// during cache initialization.
            /// </remarks>

            return function (error) {
                cacheFailure = { message: message, error: error };

                // Destroy any pending clear or read operations.
                // At this point there should be no prefetch operations.
                // Count operations will go through but are benign because they
                // won't interact with the store.
                var i, len;
                for (i = 0, len = readOperations.length; i < len; i++) {
                    readOperations[i].fireRejected(cacheFailure);
                }
                for (i = 0, len = clearOperations.length; i < len; i++) {
                    clearOperations[i].fireRejected(cacheFailure);
                }

                // Null out the operation arrays.
                readOperations = clearOperations = null;
            };
        };

        var changeState = function (newState) {
            /// <summary>Updates the cache's state and signals all pending operations of the change.</summary>
            /// <param name="newState" type="Object">New cache state.</param>
            /// <remarks>This method is a no-op if the cache's current state and the new state are the same.</remarks>

            if (newState !== state) {
                state = newState;
                var operations = clearOperations.concat(readOperations, prefetchOperations);
                var i, len;
                for (i = 0, len = operations.length; i < len; i++) {
                    operations[i].run(state);
                }
            }
        };

        var clearStore = function () {
            /// <summary>Removes all the data stored in the cache.</summary>
            /// <returns type="DjsDeferred">A promise with no value.</returns>

            var deferred = new DjsDeferred();
            store.clear(function () {

                // Reset the cache settings.
                actualCacheSize = 0;
                allDataLocal = false;
                collectionCount = 0;
                highestSavedPage = 0;
                highestSavedPageSize = 0;
                overflowed = cacheSize === 0;

                // version is not reset, in case there is other state in eg V1.1 that is still around.

                // Reset the cache stats.
                stats = { counts: 0, netReads: 0, prefetches: 0, cacheReads: 0 };
                that.stats = stats;

                store.close();
                deferred.resolve();
            }, function (err) {
                deferred.reject(err);
            });
            return deferred;
        };

        var dequeueOperation = function (operation) {
            /// <summary>Removes an operation from the caches queues and changes the cache state to idle.</summary>
            /// <param name="operation" type="DataCacheOperation">Operation to dequeue.</param>
            /// <remarks>This method is used as a handler for the operation's oncomplete event.</remarks>

            var removed = removeFromArray(clearOperations, operation);
            if (!removed) {
                removed = removeFromArray(readOperations, operation);
                if (!removed) {
                    removeFromArray(prefetchOperations, operation);
                }
            }

            pendingOperations--;
            changeState(CACHE_STATE_IDLE);
        };

        var fetchPage = function (start) {
            /// <summary>Requests data from the cache source.</summary>
            /// <param name="start" type="Number">Zero-based index of items to request.</param>
            /// <returns type="DjsDeferred">A promise for a page object with (i)ndex, (c)ount, (d)ata.</returns>


            var deferred = new DjsDeferred();
            var canceled = false;

            var request = source.read(start, pageSize, function (data) {
                var page = { i: start, c: data.length, d: data };
                deferred.resolve(page);
            }, function (err) {
                deferred.reject(err);
            });

            return extend(deferred, {
                cancel: function () {
                    if (request) {
                        request.abort();
                        canceled = true;
                        request = null;
                    }
                }
            });
        };

        var filter = function (index, count, predicate, backwards) {
            /// <summary>Filters the cache data based a predicate.</summary>
            /// <param name="index" type="Number">The index of the item to start filtering from.</param>
            /// <param name="count" type="Number">Maximum number of items to include in the result.</param>
            /// <param name="predicate" type="Function">Callback function returning a boolean that determines whether an item should be included in the result or not.</param>
            /// <param name="backwards" type="Boolean">True if the filtering should move backward from the specified index, falsey otherwise.</param>
            /// <remarks>
            /// Specifying a negative count value will yield all the items in the cache that satisfy the predicate.
            /// </remarks>
            /// <returns type="DjsDeferred">A promise for an array of results.</returns>
            index = parseInt10(index);
            count = parseInt10(count);

            if (isNaN(index)) {
                throw { message: "'index' must be a valid number.", index: index };
            }
            if (isNaN(count)) {
                throw { message: "'count' must be a valid number.", count: count };
            }

            if (cacheFailure) {
                throw cacheFailure;
            }

            index = Math.max(index, 0);

            var deferred = createDeferred();
            var arr = [];
            var canceled = false;
            var pendingReadRange = null;

            var readMore = function (readIndex, readCount) {
                if (!canceled) {
                    if (count >= 0 && arr.length >= count) {
                        deferred.resolve(arr);
                    } else {
                        pendingReadRange = that.readRange(readIndex, readCount).then(function (data) {
                            for (var i = 0, length = data.length; i < length && (count < 0 || arr.length < count); i++) {
                                var dataIndex = backwards ? length - i - 1 : i;
                                var item = data[dataIndex];
                                if (predicate(item)) {
                                    var element = {
                                        index: readIndex + dataIndex,
                                        item: item
                                    };

                                    backwards ? arr.unshift(element) : arr.push(element);
                                }
                            }

                            // Have we reached the end of the collection?
                            if ((!backwards && data.length < readCount) || (backwards && readIndex <= 0)) {
                                deferred.resolve(arr);
                            } else {
                                var nextIndex = backwards ? Math.max(readIndex - pageSize, 0) : readIndex + readCount;
                                readMore(nextIndex, pageSize);
                            }
                        }, function (err) {
                            deferred.reject(err);
                        });
                    }
                }
            };

            // Initially, we read from the given starting index to the next/previous page boundary
            var initialPage = snapToPageBoundaries(index, index, pageSize);
            var initialIndex = backwards ? initialPage.i : index;
            var initialCount = backwards ? index - initialPage.i + 1 : initialPage.i + initialPage.c - index;
            readMore(initialIndex, initialCount);

            return extend(deferred.promise(), {
                cancel: function () {
                    /// <summary>Aborts the filter operation</summary>
                    if (pendingReadRange) {
                        pendingReadRange.cancel();
                    }
                    canceled = true;
                }
            });
        };

        var fireOnIdle = function () {
            /// <summary>Fires an onidle event if any functions are assigned.</summary>

            if (that.onidle && pendingOperations === 0) {
                that.onidle();
            }
        };

        var prefetch = function (start) {
            /// <summary>Creates and starts a new prefetch operation.</summary>
            /// <param name="start" type="Number">Zero-based index of the items to prefetch.</param>
            /// <remarks>
            /// This method is a no-op if any of the following conditions is true:
            ///     1.- prefetchSize is 0
            ///     2.- All data has been read and stored locally in the cache.
            ///     3.- There is already an all data prefetch operation queued. 
            ///     4.- The cache has run out of available space (overflowed).
            /// <remarks>

            if (allDataLocal || prefetchSize === 0 || overflowed) {
                return;
            }


            if (prefetchOperations.length === 0 || (prefetchOperations[0] && prefetchOperations[0].c !== -1)) {
                // Merging prefetch operations would be a nice optimization here. 
                var op = new DataCacheOperation(prefetchStateMachine, null, true, start, prefetchSize, null, prefetchSize);
                queueAndStart(op, prefetchOperations);
            }
        };

        var queueAndStart = function (op, queue) {
            /// <summary>Queues an operation and runs it.</summary>
            /// <param name="op" type="DataCacheOperation">Operation to queue.</param>
            /// <param name="queue" type="Array">Array that will store the operation.</param>

            op.oncomplete = dequeueOperation;
            queue.push(op);
            pendingOperations++;
            op.run(state);
        };

        var readPage = function (key) {
            /// <summary>Requests a page from the cache local store.</summary>
            /// <param name="key" type="Number">Zero-based index of the reuqested page.</param>
            /// <returns type="DjsDeferred">A promise for a found flag and page object with (i)ndex, (c)ount, (d)ata, and (t)icks.</returns>


            var canceled = false;
            var deferred = extend(new DjsDeferred(), {
                cancel: function () {
                    /// <summary>Aborts the readPage operation.</summary>
                    canceled = true;
                }
            });

            var error = storeFailureCallback(deferred, "Read page from store failure");

            store.contains(key, function (contained) {
                if (canceled) {
                    return;
                }
                if (contained) {
                    store.read(key, function (_, data) {
                        if (!canceled) {
                            deferred.resolve(data !== undefined, data);
                        }
                    }, error);
                    return;
                }
                deferred.resolve(false);
            }, error);
            return deferred;
        };

        var savePage = function (key, page) {
            /// <summary>Saves a page to the cache local store.</summary>
            /// <param name="key" type="Number">Zero-based index of the requested page.</param>
            /// <param name="page" type="Object">Object with (i)ndex, (c)ount, (d)ata, and (t)icks.</param>
            /// <returns type="DjsDeferred">A promise with no value.</returns>


            var canceled = false;

            var deferred = extend(new DjsDeferred(), {
                cancel: function () {
                    /// <summary>Aborts the readPage operation.</summary>
                    canceled = true;
                }
            });

            var error = storeFailureCallback(deferred, "Save page to store failure");

            var resolve = function () {
                deferred.resolve(true);
            };

            if (page.c > 0) {
                var pageBytes = estimateSize(page);
                overflowed = cacheSize >= 0 && cacheSize < actualCacheSize + pageBytes;

                if (!overflowed) {
                    store.addOrUpdate(key, page, function () {
                        updateSettings(page, pageBytes);
                        saveSettings(resolve, error);
                    }, error);
                } else {
                    resolve();
                }
            } else {
                updateSettings(page, 0);
                saveSettings(resolve, error);
            }
            return deferred;
        };

        var saveSettings = function (success, error) {
            /// <summary>Saves the cache's current settings to the local store.</summary>
            /// <param name="success" type="Function">Success callback.</param>
            /// <param name="error" type="Function">Errror callback.</param>

            var settings = {
                actualCacheSize: actualCacheSize,
                allDataLocal: allDataLocal,
                cacheSize: cacheSize,
                collectionCount: collectionCount,
                highestSavedPage: highestSavedPage,
                highestSavedPageSize: highestSavedPageSize,
                pageSize: pageSize,
                sourceId: source.identifier,
                version: version
            };

            store.addOrUpdate("__settings", settings, success, error);
        };

        var storeFailureCallback = function (deferred/*, message*/) {
            /// <summary>Creates a function that handles a store error.</summary>
            /// <param name="deferred" type="DjsDeferred">Deferred object to resolve.</param>
            /// <param name="message" type="String">Message text.</param>
            /// <returns type="Function">Function to use as error callback.</returns>
            /// <remarks>
            /// This function will specifically handle problems when interacting with the store. 
            /// </remarks>

            return function (/*error*/) {
                // var console = window.console;
                // if (console && console.log) {
                //    console.log(message);
                //    console.dir(error);
                // }
                deferred.resolve(false);
            };
        };

        var updateSettings = function (page, pageBytes) {
            /// <summary>Updates the cache's settings based on a page object.</summary>
            /// <param name="page" type="Object">Object with (i)ndex, (c)ount, (d)ata.</param>
            /// <param name="pageBytes" type="Number">Size of the page in bytes.</param>

            var pageCount = page.c;
            var pageIndex = page.i;

            // Detect the collection size.
            if (pageCount === 0) {
                if (highestSavedPage === pageIndex - pageSize) {
                    collectionCount = highestSavedPage + highestSavedPageSize;
                }
            } else {
                highestSavedPage = Math.max(highestSavedPage, pageIndex);
                if (highestSavedPage === pageIndex) {
                    highestSavedPageSize = pageCount;
                }
                actualCacheSize += pageBytes;
                if (pageCount < pageSize && !collectionCount) {
                    collectionCount = pageIndex + pageCount;
                }
            }

            // Detect the end of the collection.
            if (!allDataLocal && collectionCount === highestSavedPage + highestSavedPageSize) {
                allDataLocal = true;
            }
        };

        var cancelStateMachine = function (operation, opTargetState, cacheState, data) {
            /// <summary>State machine describing the behavior for cancelling a read or prefetch operation.</summary>
            /// <param name="operation" type="DataCacheOperation">Operation being run.</param>
            /// <param name="opTargetState" type="Object">Operation state to transition to.</param>
            /// <param name="cacheState" type="Object">Current cache state.</param>
            /// <param name="data" type="Object" optional="true">Additional data passed to the state.</param> 
            /// <remarks>
            /// This state machine contains behavior common to read and prefetch operations.
            /// </remarks>

            var canceled = operation.canceled && opTargetState !== OPERATION_STATE_END;
            if (canceled) {
                if (opTargetState === OPERATION_STATE_CANCEL) {
                    // Cancel state.
                    // Data is expected to be any pending request made to the cache.
                    if (data && data.cancel) {
                        data.cancel();
                    }
                }
            }
            return canceled;
        };

        var destroyStateMachine = function (operation, opTargetState, cacheState) {
            /// <summary>State machine describing the behavior of a clear operation.</summary>
            /// <param name="operation" type="DataCacheOperation">Operation being run.</param>
            /// <param name="opTargetState" type="Object">Operation state to transition to.</param>
            /// <param name="cacheState" type="Object">Current cache state.</param>
            /// <remarks>
            /// Clear operations have the highest priority and can't be interrupted by other operations; however, 
            /// they will preempt any other operation currently executing.
            /// </remarks>

            var transition = operation.transition;

            // Signal the cache that a clear operation is running.
            if (cacheState !== CACHE_STATE_DESTROY) {
                changeState(CACHE_STATE_DESTROY);
                return true;
            }

            switch (opTargetState) {
                case OPERATION_STATE_START:
                    // Initial state of the operation.
                    transition(DESTROY_STATE_CLEAR);
                    break;

                case OPERATION_STATE_END:
                    // State that signals the operation is done.
                    fireOnIdle();
                    break;

                case DESTROY_STATE_CLEAR:
                    // State that clears all the local data of the cache.
                    clearStore().then(function () {
                        // Terminate the operation once the local store has been cleared.
                        operation.complete();
                    });
                    // Wait until the clear request completes.
                    operation.wait();
                    break;

                default:
                    return false;
            }
            return true;
        };

        var prefetchStateMachine = function (operation, opTargetState, cacheState, data) {
            /// <summary>State machine describing the behavior of a prefetch operation.</summary>
            /// <param name="operation" type="DataCacheOperation">Operation being run.</param>
            /// <param name="opTargetState" type="Object">Operation state to transition to.</param>
            /// <param name="cacheState" type="Object">Current cache state.</param>
            /// <param name="data" type="Object" optional="true">Additional data passed to the state.</param> 
            /// <remarks>
            /// Prefetch operations have the lowest priority and will be interrupted by operations of 
            /// other kinds. A preempted prefetch operation will resume its execution only when the state 
            /// of the cache returns to idle.
            /// 
            /// If a clear operation starts executing then all the prefetch operations are canceled, 
            /// even if they haven't started executing yet.
            /// </remarks>

            // Handle cancelation
            if (!cancelStateMachine(operation, opTargetState, cacheState, data)) {

                var transition = operation.transition;

                // Handle preemption 
                if (cacheState !== CACHE_STATE_PREFETCH) {
                    if (cacheState === CACHE_STATE_DESTROY) {
                        if (opTargetState !== OPERATION_STATE_CANCEL) {
                            operation.cancel();
                        }
                    } else if (cacheState === CACHE_STATE_IDLE) {
                        // Signal the cache that a prefetch operation is running.
                        changeState(CACHE_STATE_PREFETCH);
                    }
                    return true;
                }

                switch (opTargetState) {
                    case OPERATION_STATE_START:
                        // Initial state of the operation.
                        if (prefetchOperations[0] === operation) {
                            transition(READ_STATE_LOCAL, operation.i);
                        }
                        break;

                    case READ_STATE_DONE:
                        // State that determines if the operation can be resolved or has to
                        // continue processing.
                        // Data is expected to be the read page.
                        var pending = operation.pending;

                        if (pending > 0) {
                            pending -= Math.min(pending, data.c);
                        }

                        // Are we done, or has all the data been stored?
                        if (allDataLocal || pending === 0 || data.c < pageSize || overflowed) {
                            operation.complete();
                        } else {
                            // Continue processing the operation.
                            operation.pending = pending;
                            transition(READ_STATE_LOCAL, data.i + pageSize);
                        }
                        break;

                    default:
                        return readSaveStateMachine(operation, opTargetState, cacheState, data, true);
                }
            }
            return true;
        };

        var readStateMachine = function (operation, opTargetState, cacheState, data) {
            /// <summary>State machine describing the behavior of a read operation.</summary>
            /// <param name="operation" type="DataCacheOperation">Operation being run.</param>
            /// <param name="opTargetState" type="Object">Operation state to transition to.</param>
            /// <param name="cacheState" type="Object">Current cache state.</param>
            /// <param name="data" type="Object" optional="true">Additional data passed to the state.</param> 
            /// <remarks>
            /// Read operations have a higher priority than prefetch operations, but lower than 
            /// clear operations. They will preempt any prefetch operation currently running 
            /// but will be interrupted by a clear operation.
            /// 
            /// If a clear operation starts executing then all the currently running 
            /// read operations are canceled. Read operations that haven't started yet will 
            /// wait in the start state until the destory operation finishes. 
            /// </remarks>

            // Handle cancelation
            if (!cancelStateMachine(operation, opTargetState, cacheState, data)) {

                var transition = operation.transition;

                // Handle preemption
                if (cacheState !== CACHE_STATE_READ && opTargetState !== OPERATION_STATE_START) {
                    if (cacheState === CACHE_STATE_DESTROY) {
                        if (opTargetState !== OPERATION_STATE_START) {
                            operation.cancel();
                        }
                    } else if (cacheState !== CACHE_STATE_WRITE) {
                        // Signal the cache that a read operation is running.
                        changeState(CACHE_STATE_READ);
                    }

                    return true;
                }

                switch (opTargetState) {
                    case OPERATION_STATE_START:
                        // Initial state of the operation.
                        // Wait until the cache is idle or prefetching.
                        if (cacheState === CACHE_STATE_IDLE || cacheState === CACHE_STATE_PREFETCH) {
                            // Signal the cache that a read operation is running.
                            changeState(CACHE_STATE_READ);
                            if (operation.c > 0) {
                                // Snap the requested range to a page boundary.
                                var range = snapToPageBoundaries(operation.i, operation.c, pageSize);
                                transition(READ_STATE_LOCAL, range.i);
                            } else {
                                transition(READ_STATE_DONE, operation);
                            }
                        }
                        break;

                    case READ_STATE_DONE:
                        // State that determines if the operation can be resolved or has to
                        // continue processing.
                        // Data is expected to be the read page.
                        appendPage(operation, data);
                        var len = operation.d.length;
                        // Are we done?
                        if (operation.c === len || data.c < pageSize) {
                            // Update the stats, request for a prefetch operation.
                            stats.cacheReads++;
                            prefetch(data.i + data.c);
                            // Terminate the operation.
                            operation.complete();
                        } else {
                            // Continue processing the operation.
                            transition(READ_STATE_LOCAL, data.i + pageSize);
                        }
                        break;

                    default:
                        return readSaveStateMachine(operation, opTargetState, cacheState, data, false);
                }
            }

            return true;
        };

        var readSaveStateMachine = function (operation, opTargetState, cacheState, data, isPrefetch) {
            /// <summary>State machine describing the behavior for reading and saving data into the cache.</summary>
            /// <param name="operation" type="DataCacheOperation">Operation being run.</param>
            /// <param name="opTargetState" type="Object">Operation state to transition to.</param>
            /// <param name="cacheState" type="Object">Current cache state.</param>
            /// <param name="data" type="Object" optional="true">Additional data passed to the state.</param> 
            /// <param name="isPrefetch" type="Boolean">Flag indicating whether a read (false) or prefetch (true) operation is running.
            /// <remarks>
            /// This state machine contains behavior common to read and prefetch operations.
            /// </remarks>

            var error = operation.error;
            var transition = operation.transition;
            var wait = operation.wait;
            var request;

            switch (opTargetState) {
                case OPERATION_STATE_END:
                    // State that signals the operation is done.
                    fireOnIdle();
                    break;

                case READ_STATE_LOCAL:
                    // State that requests for a page from the local store.
                    // Data is expected to be the index of the page to request.
                    request = readPage(data).then(function (found, page) {
                        // Signal the cache that a read operation is running.
                        if (!operation.canceled) {
                            if (found) {
                                // The page is in the local store, check if the operation can be resolved.
                                transition(READ_STATE_DONE, page);
                            } else {
                                // The page is not in the local store, request it from the source.
                                transition(READ_STATE_SOURCE, data);
                            }
                        }
                    });
                    break;

                case READ_STATE_SOURCE:
                    // State that requests for a page from the cache source.
                    // Data is expected to be the index of the page to request.
                    request = fetchPage(data).then(function (page) {
                        // Signal the cache that a read operation is running.
                        if (!operation.canceled) {
                            // Update the stats and save the page to the local store.
                            if (isPrefetch) {
                                stats.prefetches++;
                            } else {
                                stats.netReads++;
                            }
                            transition(READ_STATE_SAVE, page);
                        }
                    }, error);
                    break;

                case READ_STATE_SAVE:
                    // State that saves a  page to the local store.
                    // Data is expected to be the page to save.
                    // Write access to the store is exclusive.
                    if (cacheState !== CACHE_STATE_WRITE) {
                        changeState(CACHE_STATE_WRITE);
                        request = savePage(data.i, data).then(function (saved) {
                            if (!operation.canceled) {
                                if (!saved && isPrefetch) {
                                    operation.pending = 0;
                                }
                                // Check if the operation can be resolved.
                                transition(READ_STATE_DONE, data);
                            }
                            changeState(CACHE_STATE_IDLE);
                        });
                    }
                    break;

                default:
                    // Unknown state that can't be handled by this state machine.
                    return false;
            }

            if (request) {
                // The operation might have been canceled between stack frames do to the async calls.  
                if (operation.canceled) {
                    request.cancel();
                } else if (operation.s === opTargetState) {
                    // Wait for the request to complete.
                    wait(request);
                }
            }

            return true;
        };

        // Initialize the cache.
        store.read("__settings", function (_, settings) {
            if (assigned(settings)) {
                var settingsVersion = settings.version;
                if (!settingsVersion || settingsVersion.indexOf("1.") !== 0) {
                    cacheFailureCallback("Unsupported cache store version " + settingsVersion)();
                    return;
                }

                if (pageSize !== settings.pageSize || source.identifier !== settings.sourceId) {
                    // The shape or the source of the data was changed so invalidate the store.
                    clearStore().then(function () {
                        // Signal the cache is fully initialized.
                        changeState(CACHE_STATE_IDLE);
                    }, cacheFailureCallback("Unable to clear store during initialization"));
                } else {
                    // Restore the saved settings.
                    actualCacheSize = settings.actualCacheSize;
                    allDataLocal = settings.allDataLocal;
                    cacheSize = settings.cacheSize;
                    collectionCount = settings.collectionCount;
                    highestSavedPage = settings.highestSavedPage;
                    highestSavedPageSize = settings.highestSavedPageSize;
                    version = settingsVersion;

                    // Signal the cache is fully initialized.
                    changeState(CACHE_STATE_IDLE);
                }
            } else {
                // This is a brand new cache.
                saveSettings(function () {
                    // Signal the cache is fully initialized.
                    changeState(CACHE_STATE_IDLE);
                }, cacheFailureCallback("Unable to write settings during initialization."));
            }
        }, cacheFailureCallback("Unable to read settings from store."));

        return that;
    };

    datajs.createDataCache = function (options) {
        /// <summary>Creates a data cache for a collection that is efficiently loaded on-demand.</summary>
        /// <param name="options">
        /// Options for the data cache, including name, source, pageSize,
        /// prefetchSize, cacheSize, storage mechanism, and initial prefetch and local-data handler.
        /// </param>
        /// <returns type="DataCache">A new data cache instance.</returns>
        checkUndefinedGreaterThanZero(options.pageSize, "pageSize");
        checkUndefinedOrNumber(options.cacheSize, "cacheSize");
        checkUndefinedOrNumber(options.prefetchSize, "prefetchSize");

        if (!assigned(options.name)) {
            throw { message: "Undefined or null name", options: options };
        }

        if (!assigned(options.source)) {
            throw { message: "Undefined source", options: options };
        }

        return new DataCache(options);
    };

})(window);

define("datajs/datajs", [],function(){});
;define('datajs', ['datajs/datajs'], function (main) { return main; });
