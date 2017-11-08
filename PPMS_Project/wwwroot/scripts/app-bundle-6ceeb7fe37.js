define('app',['exports', 'aurelia-framework', 'toastr', 'bootstrap'], function (exports, _aureliaFramework, _toastr) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  var _toastr2 = _interopRequireDefault(_toastr);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_toastr2.default), _dec(_class = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'PPMS';
      config.map([{ route: ['', 'blankpage'], name: 'blankpage', moduleId: 'blankpage', nav: true, title: 'PPMS' }, { route: 'mainpage', name: 'mainpage', moduleId: 'mainpage', nav: true, title: 'Main Page' }, { route: 'mainview', name: 'mainview', moduleId: 'ppfcs/budget/mainview', nav: true, title: 'Budget Template' }, { route: 'group_individual', name: 'group_individual', moduleId: 'group_individual', nav: true, title: 'Talent Groups' }, { route: 'actual_cost', name: 'actual_cost', moduleId: 'ppfcs/actual_cost/actual_cost', nav: true, title: 'Actual Cost' }, { route: 'buh', name: 'buh', moduleId: 'buh', nav: true, title: 'BUH' }, { route: 'ppid', name: 'ppid', moduleId: 'ppid/ppid', nav: true, title: 'Program Personnel Information Database' }, { route: 'contract_form', name: 'contract_form', moduleId: 'ppid/contract/contract_form', nav: true, title: 'Utilization' }]);

      this.router = router;

      _toastr2.default.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",

        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
    };

    return App;
  }()) || _class);
});
define('blankpage',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var blankpage = exports.blankpage = function blankpage() {
        _classCallCheck(this, blankpage);
    };
});
define('blur-image',["exports", "aurelia-framework"], function (exports, _aureliaFramework) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.BlurImageCustomAttribute = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var BlurImageCustomAttribute = exports.BlurImageCustomAttribute = (_dec = (0, _aureliaFramework.inject)(Element), _dec(_class = function () {
		function BlurImageCustomAttribute(element) {
			_classCallCheck(this, BlurImageCustomAttribute);

			this.element = element;
		}

		BlurImageCustomAttribute.prototype.valueChanged = function valueChanged(newImage) {
			var _this = this;

			if (newImage.complete) {
				drawBlur(this.element, newImage);
			} else {
				newImage.onload = function () {
					return drawBlur(_this.element, newImage);
				};
			}
		};

		return BlurImageCustomAttribute;
	}()) || _class);


	var mul_table = [512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292, 512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292, 273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259, 496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292, 282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373, 364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259, 507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381, 374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292, 287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461, 454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373, 368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309, 305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259, 257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442, 437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381, 377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332, 329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292, 289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259];

	var shg_table = [9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24];

	var BLUR_RADIUS = 40;

	function stackBlurCanvasRGBA(canvas, top_x, top_y, width, height, radius) {
		if (isNaN(radius) || radius < 1) return;
		radius |= 0;

		var context = canvas.getContext("2d");
		var imageData;

		try {
			imageData = context.getImageData(top_x, top_y, width, height);
		} catch (e) {
			throw new Error("unable to access image data: " + e);
		}

		var pixels = imageData.data;

		var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum, r_out_sum, g_out_sum, b_out_sum, a_out_sum, r_in_sum, g_in_sum, b_in_sum, a_in_sum, pr, pg, pb, pa, rbs;

		var div = radius + radius + 1;
		var w4 = width << 2;
		var widthMinus1 = width - 1;
		var heightMinus1 = height - 1;
		var radiusPlus1 = radius + 1;
		var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

		var stackStart = new BlurStack();
		var stack = stackStart;
		for (i = 1; i < div; i++) {
			stack = stack.next = new BlurStack();
			if (i == radiusPlus1) var stackEnd = stack;
		}
		stack.next = stackStart;
		var stackIn = null;
		var stackOut = null;

		yw = yi = 0;

		var mul_sum = mul_table[radius];
		var shg_sum = shg_table[radius];

		for (y = 0; y < height; y++) {
			r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;

			stack = stackStart;

			for (i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}

			for (i = 1; i < radiusPlus1; i++) {
				p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
				r_sum += (stack.r = pr = pixels[p]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[p + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[p + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[p + 3]) * rbs;

				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;

				stack = stack.next;
			}

			stackIn = stackStart;
			stackOut = stackEnd;
			for (x = 0; x < width; x++) {
				pixels[yi + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa != 0) {
					pa = 255 / pa;
					pixels[yi] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[yi + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else {
					pixels[yi] = pixels[yi + 1] = pixels[yi + 2] = 0;
				}

				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;

				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;

				p = yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1) << 2;

				r_in_sum += stackIn.r = pixels[p];
				g_in_sum += stackIn.g = pixels[p + 1];
				b_in_sum += stackIn.b = pixels[p + 2];
				a_in_sum += stackIn.a = pixels[p + 3];

				r_sum += r_in_sum;
				g_sum += g_in_sum;
				b_sum += b_in_sum;
				a_sum += a_in_sum;

				stackIn = stackIn.next;

				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;

				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;

				stackOut = stackOut.next;

				yi += 4;
			}
			yw += width;
		}

		for (x = 0; x < width; x++) {
			g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

			yi = x << 2;
			r_out_sum = radiusPlus1 * (pr = pixels[yi]);
			g_out_sum = radiusPlus1 * (pg = pixels[yi + 1]);
			b_out_sum = radiusPlus1 * (pb = pixels[yi + 2]);
			a_out_sum = radiusPlus1 * (pa = pixels[yi + 3]);

			r_sum += sumFactor * pr;
			g_sum += sumFactor * pg;
			b_sum += sumFactor * pb;
			a_sum += sumFactor * pa;

			stack = stackStart;

			for (i = 0; i < radiusPlus1; i++) {
				stack.r = pr;
				stack.g = pg;
				stack.b = pb;
				stack.a = pa;
				stack = stack.next;
			}

			yp = width;

			for (i = 1; i <= radius; i++) {
				yi = yp + x << 2;

				r_sum += (stack.r = pr = pixels[yi]) * (rbs = radiusPlus1 - i);
				g_sum += (stack.g = pg = pixels[yi + 1]) * rbs;
				b_sum += (stack.b = pb = pixels[yi + 2]) * rbs;
				a_sum += (stack.a = pa = pixels[yi + 3]) * rbs;

				r_in_sum += pr;
				g_in_sum += pg;
				b_in_sum += pb;
				a_in_sum += pa;

				stack = stack.next;

				if (i < heightMinus1) {
					yp += width;
				}
			}

			yi = x;
			stackIn = stackStart;
			stackOut = stackEnd;
			for (y = 0; y < height; y++) {
				p = yi << 2;
				pixels[p + 3] = pa = a_sum * mul_sum >> shg_sum;
				if (pa > 0) {
					pa = 255 / pa;
					pixels[p] = (r_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 1] = (g_sum * mul_sum >> shg_sum) * pa;
					pixels[p + 2] = (b_sum * mul_sum >> shg_sum) * pa;
				} else {
					pixels[p] = pixels[p + 1] = pixels[p + 2] = 0;
				}

				r_sum -= r_out_sum;
				g_sum -= g_out_sum;
				b_sum -= b_out_sum;
				a_sum -= a_out_sum;

				r_out_sum -= stackIn.r;
				g_out_sum -= stackIn.g;
				b_out_sum -= stackIn.b;
				a_out_sum -= stackIn.a;

				p = x + ((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width << 2;

				r_sum += r_in_sum += stackIn.r = pixels[p];
				g_sum += g_in_sum += stackIn.g = pixels[p + 1];
				b_sum += b_in_sum += stackIn.b = pixels[p + 2];
				a_sum += a_in_sum += stackIn.a = pixels[p + 3];

				stackIn = stackIn.next;

				r_out_sum += pr = stackOut.r;
				g_out_sum += pg = stackOut.g;
				b_out_sum += pb = stackOut.b;
				a_out_sum += pa = stackOut.a;

				r_in_sum -= pr;
				g_in_sum -= pg;
				b_in_sum -= pb;
				a_in_sum -= pa;

				stackOut = stackOut.next;

				yi += width;
			}
		}

		context.putImageData(imageData, top_x, top_y);
	}

	function BlurStack() {
		this.r = 0;
		this.g = 0;
		this.b = 0;
		this.a = 0;
		this.next = null;
	}

	function drawBlur(canvas, image) {
		var w = canvas.width;
		var h = canvas.height;
		var canvasContext = canvas.getContext('2d');
		canvasContext.drawImage(image, 0, 0, w, h);
		stackBlurCanvasRGBA(canvas, 0, 0, w, h, BLUR_RADIUS);
	};
});
define('cache_obj',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var cache_obj = exports.cache_obj = function cache_obj() {
        _classCallCheck(this, cache_obj);

        this.ALLOW_PASS_CONFIDENTIAL = false;
        this.PROGRAM_USER = [];
        this._ACCESS = {};
        this.CALLER = { ACTION: null, ACTION_CALLER: null, VALUE1: null, VALUE2: null, VALUE3: null, VALUE4: null };
        this.OBSERVERS = {
            init_modal: [],
            close_modal: [],
            open_modal: [],
            enable_modal_button: [],
            open_modal_message: [],
            clear_indiv_modal: [],
            clear_program_modal: [],
            clear_log: [],
            clear_login_modal: [],
            clear_talentmanager_modal: [],
            pass_value: [],
            login_passed: [],
            loggedout: [],
            confirm_dialog: [],
            clear_job_modal: [],
            budget_loaded: [],
            logoutPage: [],
            loginPage: [],
            clear_budget_modal: [],
            budget_dialog: [],
            pass_program: [],
            contract_dialog: []

        };
    };
});
define('child-router',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ChildRouter = exports.ChildRouter = function () {
    function ChildRouter() {
      _classCallCheck(this, ChildRouter);

      this.heading = 'Child Router';
    }

    ChildRouter.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'welcome'], name: 'welcome', moduleId: 'welcome', nav: true, title: 'Welcome' }, { route: 'users', name: 'users', moduleId: 'users', nav: true, title: 'Github Users' }, { route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title: 'Child Router' }]);

      this.router = router;
    };

    return ChildRouter;
  }();
});
define('entity-manager-factory',['exports', './settings', 'breeze-client'], function (exports, _settings, _breezeClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initializeBreeze = initializeBreeze;
  exports.EntityManager = EntityManager;
  exports.EntityQuery = EntityQuery;
  exports.generateID = generateID;

  var _settings2 = _interopRequireDefault(_settings);

  var _breezeClient2 = _interopRequireDefault(_breezeClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var entityManager;
  function initializeBreeze() {
    try {

      var dataService = _breezeClient2.default.config.initializeAdapterInstance('dataService', 'webApiOData', true);


      entityManager = new _breezeClient2.default.EntityManager(_settings2.default.serviceName);

      entityManager.saveOptions = new _breezeClient2.default.SaveOptions({ allowConcurrentSaves: true });

      return entityManager.fetchMetadata();
    } catch (e) {
      console.log(e);
      return Promise.resolve(false);
    }
  }
  function EntityManager() {
    return entityManager;
  }

  function EntityQuery() {
    return _breezeClient2.default.EntityQuery;
  }

  function generateID() {
    return _breezeClient2.default.core.getUuid();
  }

  function copyEntityManager() {
    var copy = entityManager.createEmptyCopy();
    copy.entityChanged.subscribe(logChanges);
    return copy;
  }

  function logChanges(data) {
    var message = 'Entity Changed.  Entity: ' + (data.entity ? data.entity.entityType.name + '/' + data.entity.entityAspect.getKey().toString() : '?') + ';  EntityAction: ' + data.entityAction.getName() + '; ';
    if (data.entityAction === _breezeClient2.default.EntityAction.PropertyChange) {
      var pcArgs = data.args;
      message += 'PropertyName: ' + (pcArgs.propertyName || 'null') + '; Old Value: ' + (pcArgs.oldValue ? pcArgs.oldValue.toString() : 'null') + '; New Value: ' + (pcArgs.newValue ? pcArgs.newValue.toString() : 'null') + ';';
    }
    if (data.entityAction === _breezeClient2.default.EntityAction.EntityStateChange) {
      message += 'New State: ' + data.entity.entityAspect.entityState.getName() + ';';
    }
  }
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('group_individual',['exports', './helpers', './entity-manager-factory', './masterfiles', 'toastr', 'aurelia-framework', 'helpers', 'typeahead', 'underscore', 'multi-observer', 'aurelia-dialog', 'modals/login', 'modals/globalindivmstr', 'modals/talentmanagergroups', './settings'], function (exports, _helpers, _entityManagerFactory, _masterfiles, _toastr, _aureliaFramework, _helpers2, _typeahead, _underscore, _multiObserver, _aureliaDialog, _login, _globalindivmstr, _talentmanagergroups, _settings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.group_individual = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	var _typeahead2 = _interopRequireDefault(_typeahead);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _settings2 = _interopRequireDefault(_settings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var group_individual = exports.group_individual = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaDialog.DialogService), _dec(_class = function () {
		function group_individual(multiObserver, dialogService) {
			_classCallCheck(this, group_individual);

			this.masterFilesLoaded = false;
			this.grpMembers = [];
			this._signal = null;
			this._GLOBAL_GRP_ID = "";
			this._GROUP_NAME = "";
			this.isDisableSave = true;
			this.showingLogout = "hidden";
			this._user = "";
			this.disabledfindTalent = true;
			this.disabledfindTM = false;


			this.dialogService = dialogService;
			if (this.dialogService.controllers.length > 0) {
				for (var i = this.dialogService.controllers.length - 1; i >= 0; i--) {
					this.dialogService.controllers[i].close();
				}
			}
		}

		group_individual.prototype.findTalent = function findTalent() {
			var _this = this;

			this.dialogService.open({
				viewModel: _globalindivmstr.globalindivmstr
			}).whenClosed(function (response) {

				if (!response.wasCancelled) {

					var tmpgrpMembers = _this.grpMembers;
					var varExists = false;
					response.output.forEach(function (val) {

						varExists = false;

						tmpgrpMembers.forEach(function (indiv) {
							if (val.GLOBAL_INDIV_ID == indiv.GLOBAL_INDIV_ID) {
								indiv.STATUS_CD = "ACTV";
								varExists = true;
							}
						});

						if (!varExists) {
							tmpgrpMembers.push({
								GLOBAL_INDIV_ID: val.GLOBAL_INDIV_ID,
								GLOBAL_GRP_ID: _this._GLOBAL_GRP_ID,
								PERSONNEL_NAME: val.PERSONNEL_NAME,
								STATUS_CD: "ACTV"
							});
						}
					});

					tmpgrpMembers.forEach(function (all) {
						if (all.STATUS_CD == "" || all.STATUS_CD === undefined) {
							all.STATUS_CD = "";
						}
					});

					_this.grpMembers = tmpgrpMembers;

					_this._signal = (0, _entityManagerFactory.generateID)();
				} else {}
			});
		};

		group_individual.prototype.findTalentManager = function findTalentManager() {
			var _this2 = this;

			this.dialogService.open({
				viewModel: _talentmanagergroups.talentmanagergroups
			}).whenClosed(function (response) {

				if (!response.wasCancelled) {

					_this2._GLOBAL_GRP_ID = response.output.GLOBAL_GRP_ID;
					_this2._GROUP_NAME = response.output.GROUP_NAME;

					_this2.getGlobalIndivsFromGrpIndiv();

					_this2.disabledfindTalent = false;
					_this2.isDisableSave = false;
				} else {}
			});
		};

		group_individual.prototype.LoginReady = function LoginReady(user) {
			this._user = user;
			(0, _helpers.setCookie)("PPMS_USER", user.USER_ID + "^" + user.COMPANY_ID + "^" + user.Is_HR + "^" + user.Is_Branch, 30);
			_toastr2.default.clear();
			_toastr2.default.success("Let's Start...", "Success");
			this.disabledfindTM = false;

			this.showingLogout = "visible";
		};

		group_individual.prototype.fnInitMasterfiles = function fnInitMasterfiles(initType, output) {
			var _this3 = this;

			if (this.masterFilesLoaded == false) {
				_settings2.default.isNavigating = true;
				this._toastr = _toastr2.default;
				_toastr2.default.info("Masterfiles...", "Loading please wait..", { timeOut: 15000 });
				this.loginDisabled = true;
				(0, _masterfiles.loadMasterfiles)().then(function () {
					(0, _masterfiles.loadLookups)().then(function () {

						_this3.masterFilesLoaded = true;

						_this3.fnPassUserObject(initType, output);
						_settings2.default.isNavigating = false;
					});
				});
			} else {
				this.fnPassUserObject(initType, output);
			}
		};

		group_individual.prototype.fnLogin = function fnLogin() {
			var _this4 = this;

			this.dialogService.open({
				viewModel: _login.login
			}).whenClosed(function (response) {

				if (!response.wasCancelled) {
					_this4.fnInitMasterfiles(1, response.output);
				} else {}
			});
		};

		group_individual.prototype.fnPassUserObject = function fnPassUserObject(initType, output) {

			if (initType == 1) {} else {
				var varCookie = (0, _helpers.checkCookie)("PPMS_USER");
				var varSplitCookie = varCookie.split('^');
				this._user = {
					USER_ID: varSplitCookie[0],
					COMPANY_ID: varSplitCookie[1],
					Is_HR: varSplitCookie[2],
					Is_Branch: varSplitCookie[0]
				};

				this.loginDisabled = true;
				this.logoutDisabled = false;
				this.showingLogout = "visible";
				_toastr2.default.clear();
				_toastr2.default.success("Let's Start...", "Success");
				this.disabledfindTM = false;
				return;
			}

			this.LoginPassed(output);
		};

		group_individual.prototype.LoginPassed = function LoginPassed(user) {

			this._user = user;

			(0, _helpers.setCookie)("PPMS_USER", user.USER_ID + "^" + user.COMPANY_ID + "^" + user.Is_HR + "^" + user.Is_Branch, 30);
			_toastr2.default.clear();
			_toastr2.default.success("Let's Start...", "Success");

			this.logoutDisabled = false;
			this.loginDisabled = true;

			this.showingLogout = "visible";

			this.disabledfindTM = false;
		};

		group_individual.prototype.logout = function logout() {
			this.disabledfindTM = true;
			this.isDisableSave = true;
			this.clear();
			this.loginDisabled = false;
			this.logoutDisabled = true;
			this._user = {};
			(0, _helpers.removeCookie)();
			this.showingLogout = "hidden";
			this.fnLogin();
		};

		group_individual.prototype.getGlobalIndivsFromGrpIndiv = function getGlobalIndivsFromGrpIndiv() {
			var _this5 = this;

			this.grpMembers = [];
			var tmpIndivs = [];
			var _query = (0, _entityManagerFactory.EntityQuery)().from('GRP_INDIV_MSTR').where("GLOBAL_GRP_ID", "==", this._GLOBAL_GRP_ID);
			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				success.results.forEach(function (all) {

					(0, _masterfiles.getLookups)().GLOBAL_INDIV_WITH_ALIAS.forEach(function (item) {

						if (item.GLOBAL_INDIV_ID == all.GLOBAL_INDIV_ID) {
							tmpIndivs.push({
								GLOBAL_INDIV_ID: all.GLOBAL_INDIV_ID,
								GLOBAL_GRP_ID: all.GLOBAL_GRP_ID,
								PERSONNEL_NAME: item.PERSONNEL_NAME,
								GRP_INDIV_ID: all.GRP_INDIV_ID,
								STATUS_CD: all.STATUS_CD
							});
						}
					});

					if (success.results.length == tmpIndivs.length) {
						_this5.grpMembers = tmpIndivs;
						_this5._signal = (0, _entityManagerFactory.generateID)();
						_toastr2.default.success("Refreshed..", "Data Reloaded..");
					}
				});
			});
		};

		group_individual.prototype.PassedGroup = function PassedGroup(value) {};

		group_individual.prototype.saveGroupIndiv = function saveGroupIndiv() {
			var _this6 = this;

			var getQueryEntities = (0, _entityManagerFactory.EntityQuery)().from('GRP_INDIV_MSTR').where("GLOBAL_GRP_ID", "==", this._GLOBAL_GRP_ID);
			(0, _entityManagerFactory.EntityManager)().executeQuery(getQueryEntities).then(function (successEnties) {
				var getMax = (0, _entityManagerFactory.EntityQuery)().from('GRP_INDIV_MSTR').orderByDesc('GRP_INDIV_ID').take(1);
				(0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (successMax) {
					var getMax = 1;

					if (successMax.results.length > 0) getMax = successMax.results[0].GRP_INDIV_ID + 1;

					_this6.grpMembers.forEach(function (indiv) {

						if (indiv.GRP_INDIV_ID === undefined) {

							var varInsert = (0, _entityManagerFactory.EntityManager)().createEntity('GRP_INDIV_MSTR', {
								GLOBAL_INDIV_ID: indiv.GLOBAL_INDIV_ID,
								GLOBAL_GRP_ID: indiv.GLOBAL_GRP_ID,
								CREATED_BY: _this6._user.USER_ID,
								STATUS_CD: "ACTV",
								CREATED_DT: new Date(Date.now()),
								GRP_INDIV_ID: getMax
							});

							++getMax;

							(0, _entityManagerFactory.EntityManager)().addEntity(varInsert);
						} else {

							successEnties.results.forEach(function (existingIndiv) {
								if (existingIndiv.GLOBAL_INDIV_ID == indiv.GLOBAL_INDIV_ID) {
									if (indiv.STATUS_CD == "INACTV" && existingIndiv.STATUS_CD != "INACTV") {
										existingIndiv.STATUS_CD = "INACTV";
										existingIndiv.LAST_UPDATED_DT = Date.now();
										existingIndiv.LAST_UPDATED_BY = _this6._user.USER_ID;
									} else if (indiv.STATUS_CD != existingIndiv.STATUS_CD) {
										existingIndiv.STATUS_CD = indiv.STATUS_CD;
										existingIndiv.LAST_UPDATED_DT = Date.now();
										existingIndiv.LAST_UPDATED_BY = _this6._user.USER_ID;
									}
								}
							});
						}
					});

					(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {
						_toastr2.default.success("Succesfully Saved", "Talent Manager Group");

						setTimeout(function () {
							_this6.getGlobalIndivsFromGrpIndiv();
						}, 1000);
					}, function (fail) {
						console.log(fail);
						_toastr2.default.error("Error Occured", fail);
					});
				});
			});
		};

		group_individual.prototype.addIndividual = function addIndividual() {
			this.grpMembers.push({});
		};

		group_individual.prototype.deleteItem = function deleteItem(item) {
			var isFound = this.grpMembers.find(function (_item) {
				if (_item.GLOBAL_INDIV_ID == item.GLOBAL_INDIV_ID) {
					item.STATUS_CD = "INACTV";
					return true;
				}
			});
			this._signal = (0, _entityManagerFactory.generateID)();
		};

		group_individual.prototype.clear = function clear() {
			this.grpMembers = [];
			this._GLOBAL_GRP_ID = "";
			this._GROUP_NAME = "";

			this.isDisableSave = true;
			this.disabledfindTalent = true;
		};

		return group_individual;
	}()) || _class);
});
define('helpers',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isDigit = isDigit;
  exports.input_mask = input_mask;
  exports.formatDate = formatDate;
  exports.fnSerializeCode = fnSerializeCode;
  exports.substringMatcher = substringMatcher;
  exports.getFilter = getFilter;
  exports.checkCookie = checkCookie;
  exports.setCookie = setCookie;
  exports.removeCookie = removeCookie;
  exports.getCookie = getCookie;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function isDigit(event) {
    if (event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 9 || event.keyCode == 10 || event.keyCode == 13 || event.keyCode == 8 || event.keyCode == 116 || event.keyCode == 46 || event.keyCode <= 40 && event.keyCode >= 37) {
      return true;
    } else {
      return false;
    }
  }

  function input_mask(id, mask) {
    var myMask = mask;
    var myCaja = document.getElementById(id);
    var myText = "";
    var myNumbers = [];
    var myOutPut = "";
    var theLastPos = 1;
    myText = myCaja.value;

    for (var i = 0; i < myText.length; i++) {
      if (!isNaN(myText.charAt(i)) && myText.charAt(i) != " ") {
        myNumbers.push(myText.charAt(i));
      }
    }

    for (var j = 0; j < myMask.length; j++) {
      if (myMask.charAt(j) == "_") {
        if (myNumbers.length == 0) myOutPut = myOutPut + myMask.charAt(j);else {
          myOutPut = myOutPut + myNumbers.shift();
          theLastPos = j + 1;
        }
      } else {
        myOutPut = myOutPut + myMask.charAt(j);
      }
    }

    document.getElementById(id).value = myOutPut;
    document.getElementById(id).setSelectionRange(theLastPos, theLastPos);
  }

  function formatDate(strDate) {
    if (strDate == null || strDate.length == 0) return "";
    var dt = new Date(strDate);
    var month = dt.getMonth() + 1;
    var day = dt.getDate();
    var year = dt.getFullYear();
    return ('0' + month).slice(-2) + '/' + ('0' + day).slice(-2) + '/' + ("000" + year).slice(-4);
  }

  function fnSerializeCode(value) {
    return btoa(value);
  }

  function substringMatcher(strs) {

    return function findMatches(q, cb) {
      var matches;

      matches = [];

      var substrRegex = new RegExp(q, 'i');

      $.each(strs, function (i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  }

  function getFilter(varFilterArray, propertyName, propertyText) {
    if (varFilterArray === undefined || varFilterArray === null || propertyName === undefined || propertyName === null || propertyName === '') {
      return varFilterArray;
    }

    return varFilterArray.filter(function (x) {
      return (x[propertyText] === undefined ? "" : x[propertyText].toString()).indexOf((propertyName === undefined ? "" : propertyName).toUpperCase()) !== -1;
    });
  }

  function checkCookie(value) {
    var user = getCookie(value);
    if (user != "") {
      return user;
    } else {
      return "";
    }
  }

  function setCookie(cname, cvalue, mins) {
    var d = new Date();

    d.setTime(d.getTime() + 60 * 60 * mins * 200);
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function removeCookie() {

    var expireAt = new Date();
    expireAt.setMonth(expireAt.getMonth() - 1);

    if (document.cookie != "") {
      var crumbs = document.cookie.split(";");
      for (var i = 0; i < crumbs.length; i++) {
        var crumbName = crumbs[i].split("=")[0];
        document.cookie = crumbName + "=;expires=" + expireAt.toGMTString();
      }
    }
  }

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
  }

  !function ($) {

    var Datepicker = function Datepicker(element, options) {
      this.element = $(element);
      this.format = DPGlobal.parseFormat(options.format || this.element.data('date-format') || 'mm/dd/yyyy');
      this.picker = $(DPGlobal.template).appendTo('body').on({
        click: $.proxy(this.click, this) });
      this.isInput = this.element.is('input');
      this.component = this.element.is('.date') ? this.element.find('.add-on') : false;

      if (this.isInput) {
        this.element.on({
          focus: $.proxy(this.show, this),

          keyup: $.proxy(this.update, this)
        });
      } else {
        if (this.component) {
          this.component.on('click', $.proxy(this.show, this));
        } else {
          this.element.on('click', $.proxy(this.show, this));
        }
      }

      this.minViewMode = options.minViewMode || this.element.data('date-minviewmode') || 0;
      if (typeof this.minViewMode === 'string') {
        switch (this.minViewMode) {
          case 'months':
            this.minViewMode = 1;
            break;
          case 'years':
            this.minViewMode = 2;
            break;
          default:
            this.minViewMode = 0;
            break;
        }
      }
      this.viewMode = options.viewMode || this.element.data('date-viewmode') || 0;
      if (typeof this.viewMode === 'string') {
        switch (this.viewMode) {
          case 'months':
            this.viewMode = 1;
            break;
          case 'years':
            this.viewMode = 2;
            break;
          default:
            this.viewMode = 0;
            break;
        }
      }
      this.startViewMode = this.viewMode;
      this.weekStart = options.weekStart || this.element.data('date-weekstart') || 0;
      this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1;
      this.onRender = options.onRender;
      this.fillDow();
      this.fillMonths();
      this.update();
      this.showMode();
    };

    Datepicker.prototype = {
      constructor: Datepicker,

      show: function show(e) {
        this.picker.show();
        this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
        this.place();
        $(window).on('resize', $.proxy(this.place, this));
        if (e) {
          e.stopPropagation();
          e.preventDefault();
        }
        if (!this.isInput) {}
        var that = this;
        $(document).on('mousedown', function (ev) {
          if ($(ev.target).closest('.datepicker').length == 0) {
            that.hide();
          }
        });
        this.element.trigger({
          type: 'show',
          date: this.date
        });
      },

      hide: function hide() {
        this.picker.hide();
        $(window).off('resize', this.place);
        this.viewMode = this.startViewMode;
        this.showMode();
        if (!this.isInput) {
          $(document).off('mousedown', this.hide);
        }

        this.element.trigger({
          type: 'hide',
          date: this.date
        });
      },

      set: function set() {
        var formated = DPGlobal.formatDate(this.date, this.format);
        if (!this.isInput) {
          if (this.component) {
            this.element.find('input').prop('value', formated);
          }
          this.element.data('date', formated);
        } else {
          this.element.prop('value', formated);
        }
      },

      setValue: function setValue(newDate) {
        if (typeof newDate === 'string') {
          this.date = DPGlobal.parseDate(newDate, this.format);
        } else {
          this.date = new Date(newDate);
        }
        this.set();
        this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
        this.fill();
      },

      place: function place() {
        var offset = this.component ? this.component.offset() : this.element.offset();
        this.picker.css({
          top: offset.top + this.height,
          left: offset.left
        });
      },

      update: function update(newDate) {
        this.date = DPGlobal.parseDate(typeof newDate === 'string' ? newDate : this.isInput ? this.element.prop('value') : this.element.data('date'), this.format);
        this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0);
        this.fill();
      },

      fillDow: function fillDow() {
        var dowCnt = this.weekStart;
        var html = '<tr>';
        while (dowCnt < this.weekStart + 7) {
          html += '<th class="dow">' + DPGlobal.dates.daysMin[dowCnt++ % 7] + '</th>';
        }
        html += '</tr>';
        this.picker.find('.datepicker-days thead').append(html);
      },

      fillMonths: function fillMonths() {
        var html = '';
        var i = 0;
        while (i < 12) {
          html += '<span class="month">' + DPGlobal.dates.monthsShort[i++] + '</span>';
        }
        this.picker.find('.datepicker-months td').append(html);
      },

      fill: function fill() {
        var d = new Date(this.viewDate),
            year = d.getFullYear(),
            month = d.getMonth(),
            currentDate = this.date.valueOf();
        this.picker.find('.datepicker-days th:eq(1)').text(DPGlobal.dates.months[month] + ' ' + year);
        var prevMonth = new Date(year, month - 1, 28, 0, 0, 0, 0),
            day = DPGlobal.getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
        prevMonth.setDate(day);
        prevMonth.setDate(day - (prevMonth.getDay() - this.weekStart + 7) % 7);
        var nextMonth = new Date(prevMonth);
        nextMonth.setDate(nextMonth.getDate() + 42);
        nextMonth = nextMonth.valueOf();
        var html = [];
        var clsName, prevY, prevM;
        while (prevMonth.valueOf() < nextMonth) {
          if (prevMonth.getDay() === this.weekStart) {
            html.push('<tr>');
          }
          clsName = this.onRender(prevMonth);
          prevY = prevMonth.getFullYear();
          prevM = prevMonth.getMonth();
          if (prevM < month && prevY === year || prevY < year) {
            clsName += ' old';
          } else if (prevM > month && prevY === year || prevY > year) {
            clsName += ' new';
          }
          if (prevMonth.valueOf() === currentDate) {
            clsName += ' active';
          }
          html.push('<td class="day ' + clsName + '">' + prevMonth.getDate() + '</td>');
          if (prevMonth.getDay() === this.weekEnd) {
            html.push('</tr>');
          }
          prevMonth.setDate(prevMonth.getDate() + 1);
        }
        this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
        var currentYear = this.date.getFullYear();

        var months = this.picker.find('.datepicker-months').find('th:eq(1)').text(year).end().find('span').removeClass('active');
        if (currentYear === year) {
          months.eq(this.date.getMonth()).addClass('active');
        }

        html = '';
        year = parseInt(year / 10, 10) * 10;
        var yearCont = this.picker.find('.datepicker-years').find('th:eq(1)').text(year + '-' + (year + 9)).end().find('td');
        year -= 1;
        for (var i = -1; i < 11; i++) {
          html += '<span class="year' + (i === -1 || i === 10 ? ' old' : '') + (currentYear === year ? ' active' : '') + '">' + year + '</span>';
          year += 1;
        }
        yearCont.html(html);
      },

      click: function click(e) {
        e.stopPropagation();
        e.preventDefault();
        var target = $(e.target).closest('span, td, th');
        if (target.length === 1) {
          switch (target[0].nodeName.toLowerCase()) {
            case 'th':
              switch (target[0].className) {
                case 'switch':
                  this.showMode(1);
                  break;
                case 'prev':
                case 'next':
                  this.viewDate['set' + DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate, this.viewDate['get' + DPGlobal.modes[this.viewMode].navFnc].call(this.viewDate) + DPGlobal.modes[this.viewMode].navStep * (target[0].className === 'prev' ? -1 : 1));
                  this.fill();
                  this.set();
                  break;
              }
              break;
            case 'span':
              if (target.is('.month')) {
                var month = target.parent().find('span').index(target);
                this.viewDate.setMonth(month);
              } else {
                var year = parseInt(target.text(), 10) || 0;
                this.viewDate.setFullYear(year);
              }
              if (this.viewMode !== 0) {
                this.date = new Date(this.viewDate);
                this.element.trigger({
                  type: 'changeDate',
                  date: this.date,
                  viewMode: DPGlobal.modes[this.viewMode].clsName
                });
              }
              this.showMode(-1);
              this.fill();
              this.set();
              break;
            case 'td':
              if (target.is('.day') && !target.is('.disabled')) {
                var day = parseInt(target.text(), 10) || 1;
                var month = this.viewDate.getMonth();
                if (target.is('.old')) {
                  month -= 1;
                } else if (target.is('.new')) {
                  month += 1;
                }
                var year = this.viewDate.getFullYear();
                this.date = new Date(year, month, day, 0, 0, 0, 0);
                this.viewDate = new Date(year, month, Math.min(28, day), 0, 0, 0, 0);
                this.fill();
                this.set();
                this.element.trigger({
                  type: 'changeDate',
                  date: this.date,
                  viewMode: DPGlobal.modes[this.viewMode].clsName
                });
              }
              break;
          }
        }
      },

      mousedown: function mousedown(e) {
        e.stopPropagation();
        e.preventDefault();
      },

      showMode: function showMode(dir) {
        if (dir) {
          this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + dir));
        }
        this.picker.find('>div').hide().filter('.datepicker-' + DPGlobal.modes[this.viewMode].clsName).show();
      }
    };

    $.fn.datepicker = function (option, val) {
      return this.each(function () {
        var $this = $(this),
            data = $this.data('datepicker'),
            options = (typeof option === "undefined" ? "undefined" : _typeof(option)) === 'object' && option;
        if (!data) {
          $this.data('datepicker', data = new Datepicker(this, $.extend({}, $.fn.datepicker.defaults, options)));
        }
        if (typeof option === 'string') data[option](val);
      });
    };

    $.fn.datepicker.defaults = {
      onRender: function onRender(date) {
        return '';
      }
    };
    $.fn.datepicker.Constructor = Datepicker;

    var DPGlobal = {
      modes: [{
        clsName: 'days',
        navFnc: 'Month',
        navStep: 1
      }, {
        clsName: 'months',
        navFnc: 'FullYear',
        navStep: 1
      }, {
        clsName: 'years',
        navFnc: 'FullYear',
        navStep: 10
      }],
      dates: {
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      },
      isLeapYear: function isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      },
      getDaysInMonth: function getDaysInMonth(year, month) {
        return [31, DPGlobal.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      },
      parseFormat: function parseFormat(format) {
        var separator = format.match(/[.\/\-\s].*?/),
            parts = format.split(/\W+/);
        if (!separator || !parts || parts.length === 0) {
          throw new Error("Invalid date format.");
        }
        return { separator: separator, parts: parts };
      },
      parseDate: function parseDate(date, format) {
        var parts = date.split(format.separator),
            date = new Date(),
            val;
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        if (parts.length === format.parts.length) {
          var year = date.getFullYear(),
              day = date.getDate(),
              month = date.getMonth();
          for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
            val = parseInt(parts[i], 10) || 1;
            switch (format.parts[i]) {
              case 'dd':
              case 'd':
                day = val;
                date.setDate(val);
                break;
              case 'mm':
              case 'm':
                month = val - 1;
                date.setMonth(val - 1);
                break;
              case 'yy':
                year = 2000 + val;
                date.setFullYear(2000 + val);
                break;
              case 'yyyy':
                year = val;
                date.setFullYear(val);
                break;
            }
          }
          date = new Date(year, month, day, 0, 0, 0);
        }
        return date;
      },
      formatDate: function formatDate(date, format) {
        var val = {
          d: date.getDate(),
          m: date.getMonth() + 1,
          yy: date.getFullYear().toString().substring(2),
          yyyy: date.getFullYear()
        };
        val.dd = (val.d < 10 ? '0' : '') + val.d;
        val.mm = (val.m < 10 ? '0' : '') + val.m;
        var date = [];
        for (var i = 0, cnt = format.parts.length; i < cnt; i++) {
          date.push(val[format.parts[i]]);
        }
        return date.join(format.separator);
      },
      headTemplate: '<thead>' + '<tr>' + '<th class="prev">&lsaquo;</th>' + '<th colspan="5" class="switch"></th>' + '<th class="next">&rsaquo;</th>' + '</tr>' + '</thead>',
      contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
    };
    DPGlobal.template = '<div class="datepicker dropdown-menu">' + '<div class="datepicker-days">' + '<table class=" table-condensed">' + DPGlobal.headTemplate + '<tbody></tbody>' + '</table>' + '</div>' + '<div class="datepicker-months">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + '</table>' + '</div>' + '<div class="datepicker-years">' + '<table class="table-condensed">' + DPGlobal.headTemplate + DPGlobal.contTemplate + '</table>' + '</div>' + '</div>';
  }(window.jQuery);
});
define('main',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(aurelia) {
    aurelia.use.standardConfiguration().developmentLogging().plugin('aurelia-animator-css').plugin('aurelia-breeze').plugin('aurelia-dialog', function (config) {
      config.useDefaults();
      config.settings.lock = false;
      config.settings.centerHorizontalOnly = false;
      config.settings.startingZIndex = 500;
    });

    ;
    aurelia.start().then(function (a) {
      return a.setRoot();
    });
  }
});
define('mainpage',['exports', 'aurelia-framework', 'cache_obj', './entity-manager-factory', './masterfiles', 'toastr', 'aurelia-dialog', './helpers', './settings', 'aurelia-router', 'underscore'], function (exports, _aureliaFramework, _cache_obj, _entityManagerFactory, _masterfiles, _toastr, _aureliaDialog, _helpers, _settings, _aureliaRouter, _underscore) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.mainpage = undefined;

    var _toastr2 = _interopRequireDefault(_toastr);

    var _settings2 = _interopRequireDefault(_settings);

    var _underscore2 = _interopRequireDefault(_underscore);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var mainpage = exports.mainpage = (_dec = (0, _aureliaFramework.inject)(_toastr2.default, _cache_obj.cache_obj, _aureliaDialog.DialogService, _aureliaRouter.Router), _dec(_class = function () {
        function mainpage(toastr, cache_obj, dialogService, Router) {
            var _this = this;

            _classCallCheck(this, mainpage);

            this._toastr = null;
            this.budgetAccess = false;
            this.actualAccess = false;
            this.talentgroupAccess = false;
            this.buhAccess = false;
            this.headerVisible = false;
            this._application = [];
            this._application_desc = [{ ref: 'PPID', desc: 'PROGRAM PERSONNEL INFORMATION DATABASE' }, { ref: 'PPCD', desc: 'PROGRAM PERSONNEL CONTRACT DATABASE' }, { ref: 'TSDB', desc: 'TALENT SUPPLIER INFORMATION DATABASE' }, { ref: 'TDB', desc: 'PART-TIMER INFORMATION DATABASE' }, { ref: 'PPFCS MAINTENANCE', desc: 'PROGRAM PERSONNEL FREE CAPTURE SYSTEM' }, { ref: 'UTILIZATION', desc: 'UTILIZATION' }];
            this._remove = ['PROGRAM BUDGET TEMPLATE', 'ACTUALS COST PROCESSING'];
            this._ppfcs_modules = [];
            this._roles = [];
            this._application_on = true;


            this._cache_obj = cache_obj;
            this.router = Router;

            setTimeout(function () {

                if (_this._cache_obj.USER !== undefined) if (_this._cache_obj.USER.ROLE_CD !== undefined) {
                    if (_this._cache_obj.USER.ROLE_CD.includes('ACCESSALL')) {
                        _this.budgetAccess = true;
                        _this.talentgroupAccess = true;
                        _this.buhAccess = true;
                        _this.actualAccess = true;
                        _this.headerVisible = true;
                    }

                    if (_underscore2.default.isEmpty(_this._cache_obj._ACCESS)) {
                        $.post(_settings2.default.serviceNameBase + "/UserAccess/User_Access", {
                            "USER_ID": _this._cache_obj.USER.USER_ID,
                            "HASH": _this._cache_obj.USER.HASH
                        }).done(function (response) {

                            _this._cache_obj._ACCESS = response;

                            _this._application = _this._cache_obj._ACCESS.APPLICATION;

                            for (var i = 0; i < _this._application.length; i++) {
                                for (var j = 0; j < _this._application_desc.length; j++) {
                                    if (_this._application_desc[j].ref == _this._application[i].APPLICATION_DESC) {
                                        _this._application[i].APPLICATION_DESC = _this._application_desc[j].desc;
                                    }
                                }

                                if (_this._remove.includes(_this._application[i].APPLICATION_DESC)) {
                                    _this._ppfcs_modules.push(_this._application[i]);
                                }
                            }

                            _this.fnCheckAccess();
                        });
                    } else {
                        _this._application = _this._cache_obj._ACCESS.APPLICATION;

                        for (var i = 0; i < _this._application.length; i++) {
                            for (var j = 0; j < _this._application_desc.length; j++) {
                                if (_this._application_desc[j].ref == _this._application[i].APPLICATION_DESC) {
                                    _this._application[i].APPLICATION_DESC = _this._application_desc[j].desc;
                                }
                            }

                            if (_this._remove.includes(_this._application[i].APPLICATION_DESC)) {
                                _this._ppfcs_modules.push(_this._application[i]);
                            }
                        }

                        _this.fnCheckAccess();
                    }
                }
            }, 1000);
        }

        mainpage.prototype.applicationClick = function applicationClick(item) {
            if (item.APPLICATION_DESC == 'PROGRAM PERSONNEL FREE CAPTURE SYSTEM') {
                this._roles = this._cache_obj._ACCESS.ROLES.filter(function (all) {
                    return all.APPLICATION_ID == item.APPLICATION_ID;
                });
                this._application_on = false;
            } else {
                this.router.navigateToRoute(item.APPLICATION_URL.replace('.ASPX', '').toLowerCase());
            }
        };

        mainpage.prototype.rolesClick = function rolesClick(item) {
            if (item.APPLICATION_URL == "PROGRAMBUDGETTEMPLATE.ASPX") {
                this.router.navigateToRoute('mainview');
            } else if (item.APPLICATION_URL == "ACTUALSCOSTPROCESSING.ASPX") {
                this.router.navigateToRoute('actual_cost');
            }
        };

        mainpage.prototype.applicationOn = function applicationOn() {
            this._application_on = true;
        };

        mainpage.prototype.fnCheckAccess = function fnCheckAccess() {

            if (this._cache_obj._ACCESS.APPLICATION === undefined) return;

            var filterMenu = ['PROGRAM BUDGET TEMPLATE', 'ACTUALS COST PROCESSING', 'PROGRAM PERSONNEL INFORMATION DATABASE'];

            var varFound = this._cache_obj._ACCESS.APPLICATION.filter(function (all) {
                return filterMenu.includes(all.APPLICATION_DESC);
            });
            if (varFound.length == 1) {
                if (varFound == 'PROGRAM BUDGET TEMPLATE') this.router.navigateToRoute('mainview');else if (varFound == 'PROGRAM PERSONNEL INFORMATION DATABASE') this.router.navigateToRoute('ppid');else this.router.navigateToRoute('actual_cost');
            } else {
                this.budgetAccess = true;
                this.talentgroupAccess = true;
                this.buhAccess = true;
                this.actualAccess = true;
                this.headerVisible = true;
            }
        };

        mainpage.prototype.navigateTo = function navigateTo(title) {
            this.router.navigateToRoute(title);
        };

        return mainpage;
    }()) || _class);
});
define('masterfiles',['exports', './entity-manager-factory', 'toastr', 'breeze-client'], function (exports, _entityManagerFactory, _toastr, _breezeClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.loadMasterfiles = loadMasterfiles;
  exports.fnLoadIndiv = fnLoadIndiv;
  exports.loadLookups = loadLookups;
  exports.getJobByGlobalCompany = getJobByGlobalCompany;
  exports.getJobByName = getJobByName;
  exports.getLookups = getLookups;
  exports.getPaymentTerm = getPaymentTerm;
  exports.getGLOBALINDIVandALIAS = getGLOBALINDIVandALIAS;
  exports.getJOB_GRP_CATEGORY = getJOB_GRP_CATEGORY;
  exports.getProgramGenre = getProgramGenre;
  exports.getTelecastMode = getTelecastMode;
  exports.getEpisodeMode = getEpisodeMode;
  exports.getEpisodeType = getEpisodeType;
  exports.getTalentSupplierComp = getTalentSupplierComp;
  exports.getTalentSupplierIndiv = getTalentSupplierIndiv;
  exports.getGlobalGrp = getGlobalGrp;
  exports.getGrpIndiv = getGrpIndiv;
  exports.getBdgtHdr = getBdgtHdr;
  exports.getIOCC = getIOCC;
  exports.getGlobalIndiv = getGlobalIndiv;
  exports.getAliasTrx = getAliasTrx;
  exports.getGlobalCompany = getGlobalCompany;
  exports.getCompany = getCompany;
  exports.getCategory = getCategory;
  exports.getDivision = getDivision;
  exports.getReference = getReference;
  exports.getJobGroup = getJobGroup;
  exports.getJob = getJob;
  exports.getLocation = getLocation;
  exports.getUsers = getUsers;
  exports.getUserTrx = getUserTrx;

  var _toastr2 = _interopRequireDefault(_toastr);

  var _breezeClient2 = _interopRequireDefault(_breezeClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var globalIndiv = null;
  var talentSuppComp = null;
  var talentSuppIndiv = null;
  var globalAlias = null;
  var globalCompany = [];
  var globalGrp = null;
  var jobMstr;
  var jobGrp;
  var category;
  var lookups = null;
  var reference;
  var entityNames = {
    IO_CC_MSTR: "IO_CC_MSTR",
    GLOBAL_INDIV_MSTR: "GLOBAL_INDIV_MSTR",

    GLOBAL_ALIAS_TRX: "GLOBAL_ALIAS_TRX",
    GLOBAL_COMPANY_MSTR: "GLOBAL_COMPANY_MSTR",
    COMPANY_MSTR: "COMPANY_MSTR",
    DIVISION_MSTR: "DIVISION_MSTR",
    JOB_GRP_MSTR: "JOB_GRP_MSTR",
    JOB_MSTR: "JOB_MSTR",
    LOCATION_MSTR: "LOCATION_MSTR",
    CATEGORY_MSTR: "CATEGORY_MSTR",
    REFERENCE_CD_MSTR: "REFERENCE_CD_MSTR",
    USER_PROFILE_MSTR: "USER_PROFILE_MSTR",
    USER_ROLE_TRX: "USER_ROLE_TRX",
    BDGT_TMPL_HDR: "BDGT_TMPL_HDR",
    GRP_INDIV_MSTR: "GRP_INDIV_MSTR",
    GLOBAL_GRP_MSTR: "GLOBAL_GRP_MSTR",
    TALENT_SUPPLIER_COMP_MSTR: "TALENT_SUPPLIER_COMP_MSTR",
    TALENT_SUPPLIER_INDIV_MSTR: "TALENT_SUPPLIER_INDIV_MSTR",
    PROGRAM_GENRE_MSTR: "PROGRAM_GENRE_MSTR",
    TELECAST_MODE_MSTR: "TELECAST_MODE_MSTR",
    EPISODE_MODE_MSTR: "EPISODE_MODE_MSTR",
    EPISODE_TYPE_MSTR: "EPISODE_TYPE_MSTR",
    MODULE_ACCESS_TRX: "MODULE_ACCESS_TRX"
  };

  function loadMasterfiles() {
    try {
      if (lookups != null) {
        return new Promise(function (resolve) {
          return resolve(true);
        });
      }

      return Promise.all([getGlobalIndiv(), getTalentSupplierComp(), getTalentSupplierIndiv(), getAliasTrx(), getGlobalGrp(), getGlobalCompany(), getCompany(), getCategory(), getDivision(), getReference(), getJobGroup(), getJob(), getLocation(), getUsers(), getUserTrx(), getBdgtHdr(), getGrpIndiv(), getProgramGenre(), getTelecastMode(), getEpisodeMode(), getEpisodeType()]);
    } catch (e) {
      Promise.resolve(false);
    }
  }

  function fnLoadIndiv() {}

  function loadLookups() {

    if (lookups != null) {
      return new Promise(function (resolve) {
        return resolve(true);
      });
    }

    fnLoadIndiv();

    return new Promise(function (resolve, reject) {

      lookups = {
        GLOBAL_INDIV_MSTR: globalIndiv,
        TALENT_SUPPLIER_COMP_MSTR: talentSuppComp,
        TALENT_SUPPLIER_INDIV_MSTR: talentSuppIndiv,

        GLOBAL_ALIAS_TRX: globalAlias,
        GLOBAL_INDIV_WITH_ALIAS: getGLOBALINDIVandALIAS(),
        JOB_GRP_CATEGORY: getJOB_GRP_CATEGORY(),
        GLOBAL_COMPANY_MSTR: globalCompany,
        COMPANY_MSTR: getLocal('COMPANY_MSTR', 'COMPANY_ID', true),
        DIVISION_MSTR: getLocal('DIVISION_MSTR', 'DIVISION_NAME', true),
        JOB_GRP_MSTR: jobGrp,
        JOB_MSTR: jobMstr,
        LOCATION_MSTR: getLocal('LOCATION_MSTR', 'LOCATION_DESC', true),
        CATEGORY_MSTR: category,
        REFERENCE_CD_MSTR: reference,
        USER_PROFILE_MSTR: getLocal('USER_PROFILE_MSTR', 'USER_ID', true),
        USER_ROLE_TRX: getLocal('USER_ROLE_TRX', 'USER_ID', true),
        BDGT_TMPL_HDR: getLocal('BDGT_TMPL_HDR', 'BDGT_TMPL_ID', true),
        GRP_INDIV_MSTR: getLocal('GRP_INDIV_MSTR', 'GRP_INDIV_ID', true),
        GLOBAL_GRP_MSTR: globalGrp,
        PROGRAM_GENRE_MSTR: getLocal('PROGRAM_GENRE_MSTR', 'PROGRAM_GENRE_CD', true),
        TELECAST_MODE_MSTR: getLocal('TELECAST_MODE_MSTR', 'TELECAST_MODE_CD', true),
        EPISODE_MODE_MSTR: getLocal('EPISODE_MODE_MSTR', 'EPISODE_MODE_CD', true),
        EPISODE_TYPE_MSTR: getLocal('EPISODE_TYPE_MSTR', 'EPISODE_TYPE_CD', true),

        PAYMENT_TERM: getPaymentTerm()

      };

      var unchanged = _breezeClient2.default.EntityState.Unchanged;
      var initialValues = {
        'BDGT_TMPL_ID': 0
      };
      (0, _entityManagerFactory.EntityManager)().createEntity("BDGT_TMPL_HDR", initialValues, unchanged);

      resolve(true);
    });
  }

  function getJobByGlobalCompany(val) {

    var varCheck = globalCompany.find(function (all) {
      return all.GLOBAL_ID == val;
    });
    var varJob = {
      JOB_ID: "",
      JOB_DESC: ""
    };

    if (varCheck !== undefined) {

      varJob.JOB_ID = varCheck.JOB_ID;

      var varJOB_p = jobMstr.find(function (all) {
        return all.JOB_ID == varJob.JOB_ID;
      });

      varJob.JOB_DESC = varJOB_p.JOB_DESC;

      var varGrpCategory = getJOB_GRP_CATEGORY().find(function (all) {
        return all.JOB_GRP_ID == varJOB_p.JOB_GRP_ID;
      });
      varJob.CATEGORY_ID = varGrpCategory.CATEGORY_ID;
      varJob.CATEGORY_DESC = varGrpCategory.CATEGORY_DESC;
      varJob.COMPANY_ID = varGrpCategory.COMPANY_ID;
    }

    return varJob;
  }

  function getJobByName(val) {

    var varJOB_p = jobMstr.find(function (all) {
      return all.JOB_DESC == val;
    });

    var varJob = {
      JOB_ID: "",
      JOB_DESC: ""
    };

    if (varJOB_p !== undefined) {

      varJob.JOB_ID = varJOB_p.JOB_ID;

      varJob.JOB_DESC = varJOB_p.JOB_DESC;

      var varGrpCategory = getJOB_GRP_CATEGORY().find(function (all) {
        return all.JOB_GRP_ID == varJOB_p.JOB_GRP_ID;
      });
      varJob.CATEGORY_ID = varGrpCategory.CATEGORY_ID;
      varJob.CATEGORY_DESC = varGrpCategory.CATEGORY_DESC;
      varJob.COMPANY_ID = varGrpCategory.COMPANY_ID;
    }

    return varJob;
  }

  function getLookups() {
    return lookups;
  }

  function getPaymentTerm() {
    var paymentterm = [];
    reference.forEach(function (ref) {
      if (ref.REF_GRP_CD == 'PYMNT_TERM_CD') {
        paymentterm.push(ref);
      }
    });
    return paymentterm;
  }

  function getGLOBALINDIVandALIAS() {

    var varTmpObject = [];
    var varGlobalAlias = globalAlias;
    var varGlobalIndiv = globalIndiv;
    var varTalentComp = talentSuppComp;
    var varTalentSuppIndiv = talentSuppIndiv;
    var varGlobalGrp = globalGrp;

    varGlobalIndiv.forEach(function (all) {

      var varAliases = [];
      var varAlias = "";

      if (all.ALIAS != "" && all.ALIAS != null) {
        varAlias = " (" + all.ALIAS;
        varAliases.push(all.ALIAS.toUpperCase());
      }

      var varFoundAlias = varGlobalAlias.filter(function (item) {
        return item.GLOBAL_ID == all.GLOBAL_INDIV_ID;
      });

      if (varFoundAlias.length > 0) varFoundAlias.forEach(function (alias) {

        if (varAlias == "") varAlias = " (" + alias.ALIAS_NAME;else if (varAlias == "(") varAlias = alias.ALIAS_NAME;else varAlias += "," + alias.ALIAS_NAME;

        varAliases.push(alias.ALIAS_NAME.toUpperCase());
      });

      if (varAlias != "") {
        varAlias += ")";
      }

      varTmpObject.push({
        PERSONNEL_NAME: (all.LAST_NAME + ', ' + all.GIVEN_NAME + ' ' + all.MIDDLE_NAME).trim().toUpperCase(),
        GLOBAL_INDIV_ID: all.GLOBAL_INDIV_ID,
        PERSONNEL_INFO_SRC: 'INDIV',
        ALIASES: varAliases,
        LAST_NAME: all.LAST_NAME,
        GIVEN_NAME: all.GIVEN_NAME,
        MIDDLE_NAME: all.MIDDLE_NAME
      });
    });

    varTalentSuppIndiv.forEach(function (all) {

      var varAlias = "";
      var varAliases = [];
      if (all.ALIAS != "" && all.ALIAS != null) {
        varAlias = " (" + all.ALIAS;
        varAliases.push(all.ALIAS.toUpperCase());
      }

      var varFoundAlias = varGlobalAlias.filter(function (item) {
        return item.GLOBAL_ID == all.SUPPLIER_INDIV_GLOBAL_ID;
      });

      if (varFoundAlias.length > 0) varFoundAlias.forEach(function (alias) {
        if (varAlias == "") varAlias = " (" + alias.ALIAS_NAME;else if (varAlias == "(") varAlias = alias.ALIAS_NAME;else varAlias += "," + alias.ALIAS_NAME;

        varAliases.push(alias.ALIAS_NAME.toUpperCase());
      });

      if (varAlias != "") {
        varAlias += ")";
      }

      varTmpObject.push({
        PERSONNEL_NAME: (all.LAST_NAME + ', ' + all.GIVEN_NAME + ' ' + all.MIDDLE_NAME).trim().toUpperCase(),
        GLOBAL_INDIV_ID: all.SUPPLIER_INDIV_GLOBAL_ID,
        PERSONNEL_INFO_SRC: 'TSUPPLIER',
        ALIASES: varAliases,
        LAST_NAME: all.LAST_NAME,
        GIVEN_NAME: all.GIVEN_NAME,
        MIDDLE_NAME: all.GIVEN_NAME
      });
    });

    varTalentComp.forEach(function (all) {
      varTmpObject.push({
        PERSONNEL_NAME: all.COMPANY_NAME.toUpperCase(),
        GLOBAL_INDIV_ID: all.SUPPLIER_COMP_GLOBAL_ID,
        PERSONNEL_INFO_SRC: 'TCOMP',
        ALIASES: [],
        LAST_NAME: '',
        GIVEN_NAME: '',
        MIDDLE_NAME: ''
      });
    });

    varGlobalGrp.forEach(function (all) {
      varTmpObject.push({
        PERSONNEL_NAME: all.GROUP_NAME.toUpperCase(),
        GLOBAL_INDIV_ID: all.GLOBAL_GRP_ID,
        PERSONNEL_INFO_SRC: 'GLGRP',
        ALIASES: [],
        LAST_NAME: '',
        GIVEN_NAME: '',
        MIDDLE_NAME: ''
      });
    });

    return varTmpObject;
  }

  function getJOB_GRP_CATEGORY() {

    var varTmpObject = [];
    var p_jobMstr = jobMstr;
    var p_jobGrp = jobGrp;
    var p_category = category;

    p_jobMstr.forEach(function (all) {
      var varFindGrp = p_jobGrp.find(function (allGrp) {
        return allGrp.JOB_GRP_ID == all.JOB_GRP_ID;
      });

      varTmpObject.push({
        JOB_ID: all.JOB_ID,
        JOB_GRP_ID: varFindGrp.JOB_GRP_ID,
        JOB_GRP_CD: varFindGrp.JOB_GRP_CD,
        JOB_GRP_DESC: varFindGrp !== undefined ? varFindGrp.JOB_GRP_DESC : "",
        CATEGORY_ID: "",
        CATEGORY_CD: "",
        CATEGORY_DESC: "",
        COMPANY_ID: varFindGrp.COMPANY_ID,
        JOB_DESC: all.JOB_DESC
      });
    });

    varTmpObject.forEach(function (all) {

      var varFindCategory = p_category.find(function (allCategory) {
        return allCategory.CATEGORY_CD == all.JOB_GRP_CD && allCategory.COMPANY_ID == all.COMPANY_ID;
      });

      if (varFindCategory !== undefined) {
        all.CATEGORY_CD = varFindCategory.CATEGORY_CD;
        all.CATEGORY_ID = varFindCategory.CATEGORY_ID;
        all.CATEGORY_DESC = varFindCategory.CATEGORY_DESC;
      }
    });

    return varTmpObject;
  }

  function getProgramGenre() {
    return (0, _entityManagerFactory.EntityQuery)().from('PROGRAM_GENRE_MSTR').using((0, _entityManagerFactory.EntityManager)()).execute().then(function () {}, queryFailed);
  }

  function getTelecastMode() {
    return (0, _entityManagerFactory.EntityQuery)().from('TELECAST_MODE_MSTR').using((0, _entityManagerFactory.EntityManager)()).execute().then(function () {}, queryFailed);
  }

  function getEpisodeMode() {
    return (0, _entityManagerFactory.EntityQuery)().from('EPISODE_MODE_MSTR').using((0, _entityManagerFactory.EntityManager)()).execute().then(function () {}, queryFailed);
  }

  function getEpisodeType() {
    return (0, _entityManagerFactory.EntityQuery)().from('EPISODE_TYPE_MSTR').using((0, _entityManagerFactory.EntityManager)()).execute().then(function () {}, queryFailed);
  }

  function getTalentSupplierComp() {

    return new Promise(function (resolve) {
      (0, _entityManagerFactory.EntityQuery)().from('TALENT_SUPPLIER_COMP_MSTR').select('COMPANY_NAME, SUPPLIER_COMP_GLOBAL_ID, COMPANY_NAME').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
        talentSuppComp = success.results;
        resolve(true);
      });
    });
  }

  function getTalentSupplierIndiv() {

    return new Promise(function (resolve) {
      (0, _entityManagerFactory.EntityQuery)().from('TALENT_SUPPLIER_INDIV_MSTR').select('LAST_NAME, TALENT_SUPPLIER_INDIV_ID, LAST_NAME, GIVEN_NAME, MIDDLE_NAME').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
        talentSuppIndiv = success.results;
        resolve(true);
      });
    });
  }

  function getGlobalGrp() {
    return new Promise(function (resolve) {
      (0, _entityManagerFactory.EntityQuery)().from('GLOBAL_GRP_MSTR').select('GLOBAL_GRP_ID, GROUP_NAME').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
        globalGrp = success.results;
        resolve(true);
      });
    });
  }

  function getGrpIndiv() {
    return (0, _entityManagerFactory.EntityQuery)().from('GRP_INDIV_MSTR').using((0, _entityManagerFactory.EntityManager)()).execute().then(function () {}, queryFailed);
  }

  function getBdgtHdr() {
    return (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').take(1).using((0, _entityManagerFactory.EntityManager)()).execute().then(function () {}, queryFailed);
  }

  function getIOCC() {
    return (0, _entityManagerFactory.EntityQuery)().from('IO_CC_MSTR').using((0, _entityManagerFactory.EntityManager)()).execute().then(function () {
      processLookups(entityNames.IO_CC_MSTR, {
        'CHARGE_CD': _breezeClient2.default.core.getUuid(),
        'IO_DESC': '[SELECT A VALUE]'
      });
    }, queryFailed);
  }

  function getGlobalIndiv() {
    return new Promise(function (resolve) {
      (0, _entityManagerFactory.EntityQuery)().from('GLOBAL_INDIV_MSTR').select('GLOBAL_INDIV_ID,GIVEN_NAME,MIDDLE_NAME,LAST_NAME').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
        globalIndiv = success.results;
        resolve(true);
      });
    });
  }

  function getAliasTrx() {

    return new Promise(function (resolve) {
      (0, _entityManagerFactory.EntityQuery)().from('GLOBAL_ALIAS_TRX').select('GLOBAL_ALIAS_ID,ALIAS_NAME,GLOBAL_ID').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
        globalAlias = success.results;
        resolve(true);
      });
    });
  }
  function getGlobalCompany() {

    return new Promise(function (resolve) {
      (0, _entityManagerFactory.EntityQuery)().from('GLOBAL_COMPANY_MSTR').select('GLOBAL_COMPANY_ID, GLOBAL_ID, JOB_ID, COMPANY_ID, STATUS_CD').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
        globalCompany = success.results;
        resolve(true);
      });
    });
  }
  function getCompany() {
    var query = (0, _entityManagerFactory.EntityQuery)().from('COMPANY_MSTR');
    return (0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function () {
      processLookups(entityNames.COMPANY_MSTR, {
        'COMPANY_ID': 0,
        'COMPANY_NAME': ' [SELECT A VALUE]'
      });
    }, queryFailed);
  }
  function getCategory() {

    return new Promise(function (resolve) {
      (0, _entityManagerFactory.EntityQuery)().from('CATEGORY_MSTR').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
        category = success.results;
        category.push({ 'CATEGORY_ID': 0,
          'CATEGORY_DESC': ' [SELECT A VALUE]' });
        resolve(true);
      });
    });
  }
  function getDivision() {
    var query = (0, _entityManagerFactory.EntityQuery)().from('DIVISION_MSTR');
    return (0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function () {
      processLookups(entityNames.DIVISION_MSTR, {
        'DIVISION_ID': 0,
        'DIVISION_NAME': ' [SELECT A VALUE]'
      });
    }, queryFailed);
  }
  function getReference() {

    return new Promise(function (resolve) {
      (0, _entityManagerFactory.EntityQuery)().from('REFERENCE_CD_MSTR').select('REF_CD,REF_GRP_CD,REF_DESC').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
        reference = success.results;

        resolve(true);
      });
    });
  }
  function getJobGroup() {

    return new Promise(function (resolve) {
      (0, _entityManagerFactory.EntityQuery)().from('JOB_GRP_MSTR').select('JOB_GRP_ID, JOB_GRP_CD, JOB_GRP_DESC, COMPANY_ID').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
        jobGrp = success.results;

        resolve(true);
      });
    });
  }

  function getJob() {

    return new Promise(function (resolve) {
      (0, _entityManagerFactory.EntityQuery)().from('JOB_MSTR').select('JOB_ID, JOB_GRP_ID, JOB_DESC').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
        jobMstr = success.results;

        resolve(true);
      });
    });
  }
  function getLocation() {
    var query = (0, _entityManagerFactory.EntityQuery)().from('LOCATION_MSTR');
    return (0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function () {
      processLookups(entityNames.LOCATION_MSTR, {
        'LOCATION_CD': _breezeClient2.default.core.getUuid(),
        'LOCATION_DESC': ' [SELECT A VALUE]'
      });
    }, queryFailed);
  }

  function getUsers() {
    var query = (0, _entityManagerFactory.EntityQuery)().from('USER_PROFILE_MSTR');
    return (0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function () {
      processLookups(entityNames.USER_PROFILE_MSTR, {
        'USER_ID': '[SELECT A USER]'
      });
    }, queryFailed);
  }

  function getUserTrx() {
    var query = (0, _entityManagerFactory.EntityQuery)().from('USER_ROLE_TRX');
    return (0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function () {
      processLookups(entityNames.USER_ROLE_TRX, {
        'USER_ID': ''
      });
    }, queryFailed);
  }

  function getLocalSelect(resource, ordering, select, includeNullos) {

    var query = (0, _entityManagerFactory.EntityQuery)().from(resource).select(select).orderBy(ordering);

    return (0, _entityManagerFactory.EntityManager)().executeQueryLocally(query);
  }

  function getLocal(resource, ordering, includeNullos) {

    var query = (0, _entityManagerFactory.EntityQuery)().from(resource).orderBy(ordering);

    return (0, _entityManagerFactory.EntityManager)().executeQueryLocally(query);
  }

  function processLookups(objName, blankValue) {
    createNullos((0, _entityManagerFactory.EntityManager)(), objName, blankValue);
  }

  function createNullos(manager, objName, blankValue) {

    var unchanged = _breezeClient2.default.EntityState.Unchanged;

    createNullo(manager, objName, blankValue, unchanged);
  }

  function createNullo(manager, entityName, values, unchanged) {
    var initialValues = values || {};
    return manager.createEntity(entityName, initialValues, unchanged);
  }

  function queryFailed(jqXHR, textStatus) {
    var msg = 'Error retrieving data ' + textStatus;
    _toastr2.default.error(msg, "Exception occured..");
  }
});
define('multi-observer',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.MultiObserver = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var MultiObserver = exports.MultiObserver = function () {
        MultiObserver.inject = function inject() {
            return [_aureliaFramework.ObserverLocator];
        };

        function MultiObserver(observerLocator) {
            _classCallCheck(this, MultiObserver);

            this.observerLocator = observerLocator;
        }

        MultiObserver.prototype.observe = function observe(properties, callback) {
            var subscriptions = [],
                i = properties.length,
                object,
                propertyName;

            while (i--) {
                object = properties[i][0];
                propertyName = properties[i][1];

                subscriptions.push(this.observerLocator.getObserver(object, propertyName).subscribe(callback));
            }

            return function () {
                while (subscriptions.length) {
                    subscriptions.pop();
                }
            };
        };

        return MultiObserver;
    }();
});
define('nav-bar',['exports', 'aurelia-framework', 'cache_obj', 'aurelia-router', './helpers', './entity-manager-factory', 'toastr', 'modals/login', 'modals/change_password', 'aurelia-dialog', './masterfiles', './settings', 'breeze-client'], function (exports, _aureliaFramework, _cache_obj, _aureliaRouter, _helpers, _entityManagerFactory, _toastr, _login, _change_password, _aureliaDialog, _masterfiles, _settings, _breezeClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NavBar = undefined;

    var _toastr2 = _interopRequireDefault(_toastr);

    var _settings2 = _interopRequireDefault(_settings);

    var _breezeClient2 = _interopRequireDefault(_breezeClient);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var NavBar = exports.NavBar = (_dec = (0, _aureliaFramework.inject)(_cache_obj.cache_obj, _aureliaRouter.Router, _aureliaDialog.DialogService), _dec(_class = (_class2 = function () {
        function NavBar(cache_obj, Router, DialogService) {
            var _this = this;

            _classCallCheck(this, NavBar);

            _initDefineProp(this, 'router', _descriptor, this);

            this.masterFilesLoaded = false;

            this.router = Router;
            this._cache_obj = cache_obj;

            this.dialogService = DialogService;
            this.settings = _settings2.default;

            var oldClient = OData.defaultHttpClient;

            var myClient = {
                request: function request(_request, success, error) {

                    if (_this._cache_obj != undefined) if (_this._cache_obj.USER != undefined) _request.headers.Authorization = "Basic " + btoa(_this._cache_obj.USER.USER_ID + ':' + _this._cache_obj.USER.HASH);
                    return oldClient.request(_request, success, error);
                }
            };

            OData.defaultHttpClient = myClient;

            (0, _entityManagerFactory.initializeBreeze)().then(function () {
                setTimeout(function () {
                    _this.router.navigateToRoute('blankpage');
                    var varCheckUser = (0, _helpers.checkCookie)("PPMS_USER");

                    if (varCheckUser == "" || varCheckUser == undefined || varCheckUser.indexOf('undefined') >= 0 || varCheckUser.split('^')[0] == "") {
                        _this.fnLogin();
                        return;
                    } else {
                        var varCookie = (0, _helpers.checkCookie)("PPMS_USER");
                        var varSplitCookie = varCookie.split('^');
                        var _user = {
                            USER_ID: varSplitCookie[0],
                            COMPANY_ID: varSplitCookie[1],
                            Is_HR: varSplitCookie[2],
                            Is_Branch: varSplitCookie[3],
                            EMPLOYEE_ID: varSplitCookie[4],
                            HASH: varSplitCookie[5],
                            EMAIL_ADDRESS: varSplitCookie[6],
                            LEVEL_NO: varSplitCookie[7]
                        };

                        _this._cache_obj.USER = _user;
                    }

                    _this.fnInitMasterfiles(0, "");
                }, 2000);
            });
        }

        NavBar.prototype.fnInitMasterfiles = function fnInitMasterfiles(initType, output) {
            var _this2 = this;

            if (this.masterFilesLoaded == false) {
                _settings2.default.isNavigating = true;
                this._toastr = _toastr2.default;
                _toastr2.default.clear();
                _toastr2.default.info("Masterfiles...", "Loading please wait..", { timeOut: 15000 });

                (0, _masterfiles.loadMasterfiles)().then(function () {
                    (0, _masterfiles.loadLookups)().then(function () {

                        _this2.masterFilesLoaded = true;

                        _this2.fnPassUserObject(initType, output);
                    });
                });
            } else {
                this.fnPassUserObject(initType, output);
            }
        };

        NavBar.prototype.fnPassUserObject = function fnPassUserObject(initType, output) {

            if (initType == 1) {} else {
                var varCookie = (0, _helpers.checkCookie)("PPMS_USER");

                var varSplitCookie = varCookie.split('^');
                this._user = {
                    USER_ID: varSplitCookie[0],
                    COMPANY_ID: varSplitCookie[1],
                    Is_HR: varSplitCookie[2],
                    Is_Branch: varSplitCookie[3],
                    EMPLOYEE_ID: varSplitCookie[4],
                    HASH: varSplitCookie[5],
                    EMAIL_ADDRESS: varSplitCookie[6],
                    ROLE_CD: varSplitCookie[7],
                    LEVEL_NO: varSplitCookie[8]
                };

                this._cache_obj.USER = this._user;

                _toastr2.default.clear();
                _toastr2.default.success("Let's Start...", "Success");
                _settings2.default.isNavigating = false;
                if (this.router.currentInstruction.config.name == "blankpage") {
                    this.router.navigateToRoute('mainpage');
                }

                return;
            }

            this.LoginPassed(output);
        };

        NavBar.prototype.LoginPassed = function LoginPassed(user) {

            this._user = user;

            (0, _helpers.setCookie)("PPMS_USER", user.USER_ID + "^" + user.COMPANY_ID + "^" + user.Is_HR + "^" + user.Is_Branch + "^" + user.EMPLOYEE_ID + "^" + user.HASH + "^" + user.EMAIL_ADDRESS + "^" + user.ROLE_CD + "^" + user.LEVEL_NO, 30);

            _settings2.default.isNavigating = false;

            _toastr2.default.clear();
            _toastr2.default.success("Let's Start...", "Success");

            if (this.router.currentInstruction.config.name == "blankpage") {
                this.router.navigateToRoute('mainpage');
            }
        };

        NavBar.prototype.logout = function logout() {

            if (this.router.currentInstruction.config.name != "blankpage") this.router.navigateToRoute('blankpage');else this._cache_obj.OBSERVERS.loggedout.forEach(function (all) {
                all();
            });

            this._cache_obj.OBSERVERS.clear_log.forEach(function (all) {
                all();
            });

            this._cache_obj.USER = {};
            this._cache_obj._ACCESS = {};

            (0, _helpers.removeCookie)();

            this.fnLogin();
        };

        NavBar.prototype.home = function home() {
            this.router.navigateToRoute('mainpage');
        };

        NavBar.prototype.fnLogin = function fnLogin() {
            var _this3 = this;

            if (this.dialogService.controllers.length > 0) {
                for (var i = this.dialogService.controllers.length - 1; i >= 0; i--) {
                    this.dialogService.controllers[i].close();
                }
            }

            this.dialogService.open({
                viewModel: _login.login, keyboard: false, overlayDismiss: false, lock: true
            }).whenClosed(function (response) {

                if (!response.wasCancelled) {
                    _this3.fnInitMasterfiles(1, response.output);
                } else {
                    _toastr2.default.clear();
                    _toastr2.default.info("Please Login...", "You cannot continue ..", { timeOut: 15000 });
                    _this3.fnLogin();
                }
            });
        };

        NavBar.prototype.changePassword = function changePassword() {
            this.dialogService.open({
                viewModel: _change_password.change_password
            }).whenClosed(function (response) {

                if (!response.wasCancelled) {} else {}
            });
        };

        return NavBar;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'router', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: function initializer() {
            return null;
        }
    })), _class2)) || _class);
});
define('service',['exports', './settings'], function (exports, _settings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.service = undefined;

	var _settings2 = _interopRequireDefault(_settings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var service = exports.service = function () {
		function service() {
			_classCallCheck(this, service);

			this.serviceBase = _settings2.default.serviceBase + '/WcfDataService.svc/';
			this.serviceBaseUpdate = 'home/';
		}

		service.prototype.getSvcUrl = function getSvcUrl(method) {
			return serviceBase + method;
		};

		service.prototype.getSvcUrlUpdate = function getSvcUrlUpdate(method) {
			return serviceBaseUpdate + method;
		};

		service.prototype.GetJson = function GetJson(method, jsonIn, callback) {
			$.ajax({
				url: getSvcUrl(method),
				type: "GET",
				dataType: "jsonp",
				success: function success(json) {
					callback(json);
				}
			});
		};

		service.prototype.PostJson = function PostJson(method, jsonIn, callback) {

			$.ajax({
				url: getSvcUrl(method),
				type: "POST",
				data: jsonIn,
				dataType: "jsonp",
				contentType: "application/json",
				success: function success(json) {
					callback(json);
				}
			});
		};

		service.prototype.PostUpdateJson = function PostUpdateJson(method, jsonIn, callback) {
			$.ajax({
				url: getSvcUrlUpdate(method),
				type: "POST",
				data: jsonIn,
				dataType: "jsonp",
				contentType: "application/json",
				success: function success(json) {
					callback(json);
				}
			});
		};

		return service;
	}();
});
define('settings',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _serviceName$serviceN;

    exports.default = (_serviceName$serviceN = {

        serviceName: "http://absppms01.corp.abscbn.com:8085/odata",
        serviceNameBase: "http://absppms01.corp.abscbn.com:8085/"

    }, _serviceName$serviceN["serviceName"] = "http://absppms01:8085/odata", _serviceName$serviceN["serviceNameBase"] = "http://absppms01:8085", _serviceName$serviceN.pageSize = 100, _serviceName$serviceN.STATIONS = ["", "CEBU", "DAVAO"], _serviceName$serviceN.actualCostWebUrl = "http://localhost:15253", _serviceName$serviceN.actualCostServiceBase = "http://absppms2.corp.abscbn.com:8083", _serviceName$serviceN["actualCostWebUrl"] = "http://absppms2:8084", _serviceName$serviceN["actualCostServiceBase"] = "http://absppms2:8083", _serviceName$serviceN.isNavigating = false, _serviceName$serviceN);
});
define('users',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Users = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
    function Users(http) {
      _classCallCheck(this, Users);

      this.heading = 'Github Users';
      this.users = [];

      http.configure(function (config) {
        config.useStandardConfiguration().withBaseUrl('https://api.github.com/');
      });

      this.http = http;
    }

    Users.prototype.activate = function activate() {
      var _this = this;

      return this.http.fetch('users').then(function (response) {
        return response.json();
      }).then(function (users) {
        return _this.users = users;
      });
    };

    return Users;
  }()) || _class);
});
define('welcome',['exports', 'aurelia-framework', './entity-manager-factory', './masterfiles', 'toastr'], function (exports, _aureliaFramework, _entityManagerFactory, _masterfiles, _toastr) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UpperValueConverter = exports.Welcome = undefined;

  var _toastr2 = _interopRequireDefault(_toastr);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  var _dec, _class;

  var Welcome = exports.Welcome = (_dec = (0, _aureliaFramework.inject)(_toastr2.default), _dec(_class = function () {
    function Welcome(toastr) {
      _classCallCheck(this, Welcome);

      this.heading = 'Welcome to the Aurelia Navigation App!';
      this.firstName = 'John';
      this.lastName = 'Doe';
      this.previousValue = this.fullName;
      this._toastr = null;

      toastr.options = {
        "closeButton": true,
        "debug": false,
        "positionClass": "toast-bottom-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",

        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
    }

    Welcome.prototype.submit = function submit() {
      console.log((0, _masterfiles.getLookups)().PROGRAMS);

      this.previousValue = this.fullName;
      alert('Welcome, ' + this.fullName + '!');
    };

    Welcome.prototype.canDeactivate = function canDeactivate() {
      if (this.fullName !== this.previousValue) {
        return confirm('Are you sure you want to leave?');
      }
    };

    _createClass(Welcome, [{
      key: 'fullName',
      get: function get() {
        return this.firstName + ' ' + this.lastName;
      }
    }]);

    return Welcome;
  }()) || _class);

  var UpperValueConverter = exports.UpperValueConverter = function () {
    function UpperValueConverter() {
      _classCallCheck(this, UpperValueConverter);
    }

    UpperValueConverter.prototype.toView = function toView(value) {
      return value && value.toUpperCase();
    };

    return UpperValueConverter;
  }();
});
define('converters/datepattern',['exports', 'moment'], function (exports, _moment) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DatepatternValueConverter = undefined;

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var DatepatternValueConverter = exports.DatepatternValueConverter = function () {
        function DatepatternValueConverter() {
            _classCallCheck(this, DatepatternValueConverter);
        }

        DatepatternValueConverter.prototype.toView = function toView(value) {
            if (value === undefined || value == null) return (0, _moment2.default)(new Date(), 'MM-DD-YYYY').format('MM-DD-YYYY');else {
                if ((0, _moment2.default)(value, 'MM-DD-YYYY', true).isValid()) {
                    return (0, _moment2.default)(value, 'MM-DD-YYYY').format('MM-DD-YYYY');
                } else return (0, _moment2.default)(new Date(), 'MM-DD-YYYY').format('MM-DD-YYYY');
            }
        };

        return DatepatternValueConverter;
    }();
});
define('converters/filtercustom',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var FiltercustomValueConverter = exports.FiltercustomValueConverter = function () {
        function FiltercustomValueConverter() {
            _classCallCheck(this, FiltercustomValueConverter);
        }

        FiltercustomValueConverter.prototype.toView = function toView(array, propertyName, value, signal) {
            var varResult = [];
            array.forEach(function (all) {

                if (propertyName.indexOf(',') > 0) {
                    var varCheck = propertyName.split(',').find(function (allFilter) {
                        return all[allFilter] != value;
                    });

                    if (varCheck == undefined) {
                        varResult.push(all);
                    }
                } else if (all[propertyName] == value) varResult.push(all);
            });

            array = varResult;
            return array;
        };

        return FiltercustomValueConverter;
    }();
});
define('converters/number-format',['exports', 'numeral'], function (exports, _numeral) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NumberFormatValueConverter = undefined;

  var _numeral2 = _interopRequireDefault(_numeral);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var NumberFormatValueConverter = exports.NumberFormatValueConverter = function () {
    function NumberFormatValueConverter() {
      _classCallCheck(this, NumberFormatValueConverter);
    }

    NumberFormatValueConverter.prototype.toView = function toView(value, format) {
      return (0, _numeral2.default)(value).format(format);
    };

    return NumberFormatValueConverter;
  }();
});
define('converters/signals',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var SignalsValueConverter = exports.SignalsValueConverter = function () {
        function SignalsValueConverter() {
            _classCallCheck(this, SignalsValueConverter);
        }

        SignalsValueConverter.prototype.toView = function toView(value, signal) {
            return value;
        };

        return SignalsValueConverter;
    }();
});
define('converters/sort',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var SortValueConverter = exports.SortValueConverter = function () {
        function SortValueConverter() {
            _classCallCheck(this, SortValueConverter);
        }

        SortValueConverter.prototype.toView = function toView(array, propertyName, direction) {
            var factor = direction === 'ascending' ? 1 : -1;
            return array.slice(0).sort(function (a, b) {
                return (a[propertyName] - b[propertyName]) * factor;
            });
        };

        return SortValueConverter;
    }();
});
define('converters/sorttext',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var SorttextValueConverter = exports.SorttextValueConverter = function () {
		function SorttextValueConverter() {
			_classCallCheck(this, SorttextValueConverter);
		}

		SorttextValueConverter.prototype.toView = function toView(array, propertyName, direction) {
			if (direction == "ascending") {

				return array.sort(function (a, b) {
					if (a[propertyName] > b[propertyName]) {
						return 1;
					}
					if (a[propertyName] < b[propertyName]) {
						return -1;
					}

					return 0;
				});
			} else {
				return array.sort(function (a, b) {
					if (a[propertyName] > b[propertyName]) {
						return -1;
					}
					if (a[propertyName] < b[propertyName]) {
						return 1;
					}

					return 0;
				});
			}
		};

		return SorttextValueConverter;
	}();
});
define('converters/take',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var TakeValueConverter = exports.TakeValueConverter = function () {
        function TakeValueConverter() {
            _classCallCheck(this, TakeValueConverter);
        }

        TakeValueConverter.prototype.toView = function toView(array, count, index) {
            return array.slice(index * count, index * count + count);
        };

        return TakeValueConverter;
    }();
});
define('modals/budget',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'cache_obj', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _cache_obj, _aureliaDialog, _breezeClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.budget = undefined;

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var budget = exports.budget = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _cache_obj.cache_obj, _aureliaDialog.DialogController), _dec(_class = function () {
		function budget(multiObserver, observerLocator, Element, cache_obj, controller) {
			var _this = this;

			_classCallCheck(this, budget);

			this.items = [];
			this.observerLocator = null;
			this.pageindex = 0;
			this.varFilterArrayLength = 0;
			this.varFilterArray = [];
			this.currPredicate = null;
			this.lstPredicates = [];
			this.controller = null;

			this.controller = controller;

			this._cache_obj = cache_obj;
			this.observerLocator = observerLocator;

			this.items = (0, _masterfiles.getLookups)().BDGT_TMPL_HDR;

			multiObserver.observe([[this, '_bBDGT_TMPL_ID'], [this, '_bPROGRAM_TITLE'], [this, '_bPROGRAM_IO'], [this, '_bAPPR_STAT_CD']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._cache_obj.OBSERVERS.clear_budget_modal.push(function () {
				_this.ClearSearch();
			});
		}

		budget.prototype.fnManualFilter = function fnManualFilter(tmpVar) {
			var _this2 = this;

			this.lstPredicates = [];

			_underscore2.default.each(this._rBUDGET_TITLE.querySelectorAll('input'), function (all) {

				var varOb = _this2.observerLocator.getObserver(_this2, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != undefined && varOb.getValue() != null && varOb.getValue() != "" && varOb.getValue() != "undefined") if (varOb.propertyName.indexOf("BDGT_TMPL_ID") > -1) {
					_this2.lstPredicates.push(_breezeClient2.default.Predicate.create(varOb.propertyName.replace('_b', ''), "==", varOb.getValue()));
				} else {
					_this2.lstPredicates.push(_breezeClient2.default.Predicate.create(varOb.propertyName.replace('_b', '').replace('PROGRAM_TITLE', 'PROGRAM_MSTR.PROGRAM_TITLE').replace('PROGRAM_IO', 'PROGRAM_MSTR.PROGRAM_IO'), _breezeClient2.default.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
				}

				if (tmpVar.length > 0) {
					tmpVar = (0, _helpers.getFilter)(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
				}
			});

			return tmpVar;
		};

		budget.prototype.onSpeculateProp = function onSpeculateProp(newValue, oldValue) {
			var _this3 = this;

			var varValuesHasChanged = false;

			_underscore2.default.each(this._rBUDGET_TITLE.querySelectorAll('input'), function (all) {
				var varOb = _this3.observerLocator.getObserver(_this3, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != '' && varOb.getValue() !== undefined) {
					varValuesHasChanged = true;
				}
			});

			if (!varValuesHasChanged) return;

			var tmpVar = this.fnManualFilter(this.varFilterArray);

			if (tmpVar.length > 0) {
				var tmpVarNew = _underscore2.default.sortBy(tmpVar, 'BDGT_TMPL_ID').reverse();
				this.varFilterArray = tmpVarNew;
				this.varFilterArrayLength = this.varFilterArray.length;
				return;
			}

			this.currPredicate = this.lstPredicates;
			if (this._cache_obj.PROGRAM_USER.length == 0) {

				var _query = (0, _entityManagerFactory.EntityQuery)().from('PROGRAM_USER_TRX').where("USER_ID", "==", this._cache_obj.USER.USER_ID);
				(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
					success.results.forEach(function (all) {
						if (all.USER_ID == _this3._cache_obj.USER.USER_ID) _this3._cache_obj.PROGRAM_USER.push(all);
					});
				});
			}
			setTimeout(function (a) {

				if (a !== _this3.currPredicate) return;

				_this3.varFilterArray = [];

				var _query = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').where(_breezeClient2.default.Predicate.and(_this3.currPredicate)).expand('PROGRAM_MSTR').orderBy("BDGT_TMPL_ID desc").select('BDGT_TMPL_ID,PROGRAM_MSTR.PROGRAM_TITLE,PROGRAM_MSTR.PROGRAM_IO,PROGRAM_MSTR.PROGRAM_ID, APPR_STAT_CD');
				(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {

					tmpVar = [];
					_underscore2.default.each(success.results, function (all) {
						if (all.APPR_STAT_CD != null) {
							var findProgramUser = _this3._cache_obj.PROGRAM_USER.find(function (allP) {
								return allP.PROGRAM_ID == all.PROGRAM_MSTR.PROGRAM_ID;
							});
							if (findProgramUser !== undefined) {
								tmpVar.push({
									PROGRAM_TITLE: all.PROGRAM_MSTR.PROGRAM_TITLE,
									BDGT_TMPL_ID: parseInt(all.BDGT_TMPL_ID),
									PROGRAM_IO: all.PROGRAM_MSTR.PROGRAM_IO,
									APPR_STAT_CD: all.APPR_STAT_CD.replace('APP-', '')
								});
							}
						}
					});

					_this3.varFilterArray = tmpVar;
					_this3.varFilterArrayLength = _this3.varFilterArray.length;
				}, function (failed) {
					_toastr2.default.error(failed, "Failed loading PROGRAM Names");
				});
			}, 500, this.currPredicate);
		};

		budget.prototype.selectedBudget = function selectedBudget(item) {

			this._cache_obj.OBSERVERS.budget_dialog.forEach(function (all) {
				all(item.BDGT_TMPL_ID);
			});

			this.controller.ok();
		};

		budget.prototype.fnKeyup = function fnKeyup(evt, item) {
			if (evt.keyCode == 13) {
				if (this.varFilterArray.length == 1) {
					this.selectedBudget(this.varFilterArray[0]);
				}
			}
		};

		budget.prototype.ClearSearch = function ClearSearch() {
			this._bBDGT_TMPL_ID = "";
			this._bPROGRAM_TITLE = "";
			this._bPROGRAM_IO = "";
			this._bAPPR_STAT_CD = "";

			this.varFilterArray = [];
			this.varFilterArrayLength = 0;
		};

		return budget;
	}()) || _class);
});
define('modals/buh-program-dialog',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'modals/modal-wizard', 'cache_obj', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _modalWizard, _cache_obj, _aureliaDialog, _breezeClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.buhProgramDialog = undefined;

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var buhProgramDialog = exports.buhProgramDialog = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _modalWizard.ModalWizard, _cache_obj.cache_obj, _aureliaDialog.DialogController), _dec(_class = function () {
		function buhProgramDialog(multiObserver, observerLocator, Element, ModalWizard, cache_obj, controller) {
			var _this = this;

			_classCallCheck(this, buhProgramDialog);

			this.items = [];
			this.observerLocator = null;
			this.pageindex = 0;
			this.varFilterArray = [];
			this.varFilterArraySelected = [];
			this.varFilterArrayLength = 0;
			this.controller = null;
			this._programs = [];

			this.controller = controller;

			this._ModalWizard = ModalWizard;
			this._cache_obj = cache_obj;

			_toastr2.default.info("Program Data...", "Loading..");

			_toastr2.default.success("Start Search...", "Loading Finish..");

			this.observerLocator = observerLocator;

			multiObserver.observe([[this, '_bPROGRAM_CD'], [this, '_bPROGRAM_TITLE']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			var _query = (0, _entityManagerFactory.EntityQuery)().from('PROGRAM_MSTR').where(_breezeClient2.default.Predicate.and(this.currPredicate)).select('PROGRAM_CD,PROGRAM_TITLE,PROGRAM_ID,BUH_PERSONNEL_ID');
			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				_this._programs = success.results;
			}, function (failed) {
				_toastr2.default.error(failed, "Failed loading Programs");
			});
		}

		buhProgramDialog.prototype.attached = function attached() {};

		buhProgramDialog.prototype.selectedTalent = function selectedTalent(item) {
			var isFound = this.varFilterArraySelected.find(function (_item) {
				if (_item.PROGRAM_CD == item.PROGRAM_CD) {
					return true;
				}
			});

			if (isFound === undefined) {
				this.varFilterArraySelected.push(item);
			}
		};

		buhProgramDialog.prototype.fnKeyup = function fnKeyup(evt, item) {
			if (evt.keyCode == 13) {
				if (this.varFilterArray.length == 1) {
					this.varFilterArraySelected.push(this.varFilterArray[0]);
				}
			}
		};

		buhProgramDialog.prototype.fnManualFilter = function fnManualFilter(tmpVar) {
			var _this2 = this;

			var lstPredicates = [];
			_underscore2.default.each(this._rGROUP_TITLE.querySelectorAll('input'), function (all) {

				var varOb = _this2.observerLocator.getObserver(_this2, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != undefined && varOb.getValue() != null && varOb.getValue() != "" && varOb.getValue() != "undefined") {

					if (varOb.propertyName.indexOf("PROGRAM_TITLE") > -1) {
						lstPredicates.push(_breezeClient2.default.Predicate.create("PROGRAM_TITLE", _breezeClient2.default.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
					} else {
						lstPredicates.push(_breezeClient2.default.Predicate.create(varOb.propertyName.replace('_b', ''), _breezeClient2.default.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
					}
				}
				tmpVar = (0, _helpers.getFilter)(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
			});

			return tmpVar;
		};

		buhProgramDialog.prototype.onSpeculateProp = function onSpeculateProp(newValue, oldValue) {

			if (this._rGROUP_TITLE === undefined || this._rGROUP_TITLE === null || this._rGROUP_TITLE === '') return;

			var tmpVar = this.fnManualFilter(this.varFilterArray);

			if (tmpVar.length > 0) {
				var tmpVarNew = _underscore2.default.sortBy(tmpVar, 'PROGRAM_TITLE').reverse();
				this.varFilterArray = tmpVarNew;
				this.varFilterArrayLength = this.varFilterArray.length;
				return;
			} else {
				tmpVar = this.fnManualFilter(this._programs.filter(function (all) {
					return all.PROGRAM_TITLE.indexOf('[') <= 0;
				}));
			}

			this.varFilterArray = tmpVar;
			this.varFilterArrayLength = this.varFilterArray.length;
		};

		buhProgramDialog.prototype.deleteSelected = function deleteSelected(index) {
			this.varFilterArraySelected.splice(index, 1);
		};

		buhProgramDialog.prototype.SelectingDone = function SelectingDone() {

			this.controller.ok(this.varFilterArraySelected);
		};

		buhProgramDialog.prototype.ClearSearch = function ClearSearch() {
			this.varFilterArraySelected = [];
			this._bPROGRAM_CD = "";
			this._bPROGRAM_TITLE = "";
			this.varFilterArray = [];
			this.varFilterArrayLength = 0;
		};

		return buhProgramDialog;
	}()) || _class);
});
define('modals/buh-search',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'cache_obj', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _cache_obj, _aureliaDialog, _breezeClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.buhSearch = undefined;

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var buhSearch = exports.buhSearch = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _cache_obj.cache_obj, _aureliaDialog.DialogController), _dec(_class = function () {
		function buhSearch(multiObserver, observerLocator, Element, cache_obj, controller) {
			var _this = this;

			_classCallCheck(this, buhSearch);

			this.items = [];
			this.observerLocator = null;
			this.pageindex = 0;
			this.varFilterArrayLength = 0;
			this.varFilterArray = [];
			this.currPredicate = null;
			this.controller = null;

			this.controller = controller;

			this.observerLocator = observerLocator;

			this._cache_obj = cache_obj;

			var _query = (0, _entityManagerFactory.EntityQuery)().from('BUH_PERSONNEL').orderByDesc("BUH_PERSONNEL_ID");
			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				_this.items = success.results;
			}, function (failed) {
				_toastr2.default.error(failed, "Failed loading PROGRAM Names");
			});

			multiObserver.observe([[this, '_bOPTIONAL_GLOBAL_ID'], [this, '_bFIRST_NAME'], [this, '_bLAST_NAME'], [this, '_bMIDDLE_NAME'], [this, '_bEMAIL_ADDRESS']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._cache_obj.OBSERVERS.clear_program_modal.push(function () {
				_this.ClearSearch();
			});
		}

		buhSearch.prototype.selectedTalent = function selectedTalent(item) {

			this._cache_obj.OBSERVERS.pass_value.forEach(function (all) {
				all(item);
			});
		};

		buhSearch.prototype.onSpeculateProp = function onSpeculateProp(newValue, oldValue) {
			var _this2 = this;

			var varValuesHasChanged = false;

			_underscore2.default.each(this._rBUH_SEARCH.querySelectorAll('input'), function (all) {
				var varOb = _this2.observerLocator.getObserver(_this2, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != '' && varOb.getValue() !== undefined) {
					varValuesHasChanged = true;
				}
			});

			if (!varValuesHasChanged) return;

			var tmpVar = [];
			if (this.varFilterArray.length > 0) tmpVar = this.varFilterArray;

			var lstPredicates = [];
			_underscore2.default.each(this._rBUH_SEARCH.querySelectorAll('input'), function (all) {

				var varOb = _this2.observerLocator.getObserver(_this2, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != undefined && varOb.getValue() != null && varOb.getValue() != "" && varOb.getValue() != "undefined") lstPredicates.push(_breezeClient2.default.Predicate.create(varOb.propertyName.replace('_b', ''), _breezeClient2.default.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));


				if (tmpVar.length > 0) {
					tmpVar = (0, _helpers.getFilter)(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
				}
			});

			this.currPredicate = lstPredicates;

			if (tmpVar.length > 0) {
				this.varFilterArray = tmpVar;
				this.varFilterArrayLength = this.varFilterArray.length;
				return;
			}

			setTimeout(function (a) {

				if (a !== _this2.currPredicate) return;

				_this2.varFilterArray = [];

				var _query = (0, _entityManagerFactory.EntityQuery)().from('BUH_PERSONNEL').where(_breezeClient2.default.Predicate.and(_this2.currPredicate)).select('BUH_PERSONNEL_ID,OPTIONAL_GLOBAL_ID,FIRST_NAME,MIDDLE_NAME,LAST_NAME, EMAIL_ADDRESS');
				(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
					tmpVar = [];

					_underscore2.default.each(success.results, function (all) {
						tmpVar.push(all);
					});

					_this2.varFilterArray = tmpVar;
					_this2.varFilterArrayLength = _this2.varFilterArray.length;
				}, function (failed) {
					_toastr2.default.error(failed, "Failed loading BUH Names");
				});
			}, 500, this.currPredicate);
		};

		buhSearch.prototype.selectedBUH = function selectedBUH(item) {
			this.controller.ok(item);
		};

		buhSearch.prototype.ClearSearch = function ClearSearch() {
			this._bOPTIONAL_GLOBAL_ID = "";
			this._bFIRST_NAME = "";
			this.varFilterArray = [];
			this.varFilterArrayLength = 0;
		};

		return buhSearch;
	}()) || _class);
});
define('modals/change_password',['exports', 'multi-observer', 'aurelia-framework', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'cache_obj', 'aurelia-dialog', '../settings'], function (exports, _multiObserver, _aureliaFramework, _underscore, _jquery, _entityManagerFactory, _toastr, _cache_obj, _aureliaDialog, _settings) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.change_password = undefined;

    var _underscore2 = _interopRequireDefault(_underscore);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _toastr2 = _interopRequireDefault(_toastr);

    var _settings2 = _interopRequireDefault(_settings);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var change_password = exports.change_password = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _cache_obj.cache_obj, _aureliaDialog.DialogController), _dec(_class = function () {
        function change_password(multiObserver, observerLocator, Element, cache_obj, controller) {
            _classCallCheck(this, change_password);

            this.items = [];
            this.observerLocator = null;

            this.controller = controller;
            this._cache_obj = cache_obj;
        }

        change_password.prototype.keyPressed = function keyPressed($event) {
            if ($event.which === 13) {
                this.savePassword();
            }
        };

        change_password.prototype.savePassword = function savePassword() {
            var _this = this;

            if (this._NEW_PASSWORD === undefined || _underscore2.default.isEmpty(this._NEW_PASSWORD) || this._NEW_PASSWORD.length != 8) {
                _toastr2.default.error("Invalid Password, must be 8 characters long.", "Change Password");
                return;
            }
            _settings2.default.isNavigating = true;
            _toastr2.default.info("Please wait..", "Saving Password");

            _jquery2.default.post(_settings2.default.serviceNameBase + "/useraccess/Set_Password", {
                "USER_ID": this._cache_obj.USER.USER_ID,
                "COMPANY_ID": this._cache_obj.USER.COMPANY_ID,
                "Password": this._NEW_PASSWORD,
                "HASH": this._cache_obj.USER.HASH
            }).done(function (response) {
                _settings2.default.isNavigating = false;
                _toastr2.default.clear();
                if (response == "" || response == "false") {
                    _toastr2.default.error("Problem Occured", "Change Password");
                } else if (response == "duplicate") {
                    _toastr2.default.error("Password cannot be same as your current.", "Change Password");
                } else {
                    _toastr2.default.success("Password successfully saved and e-mailed to you.", "Change Password");
                    _this.controller.ok("");
                }
            });
        };

        return change_password;
    }()) || _class);
});
define('modals/confirm_dialog',['exports', 'aurelia-framework', 'modals/modal-wizard', 'multi-observer', 'cache_obj', 'aurelia-dialog'], function (exports, _aureliaFramework, _modalWizard, _multiObserver, _cache_obj, _aureliaDialog) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.confirm_dialog = undefined;

	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;

		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}

		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);

		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}

		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}

		return desc;
	}

	function _initializerWarningHelper(descriptor, context) {
		throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}

	var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

	var confirm_dialog = exports.confirm_dialog = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _modalWizard.ModalWizard, _cache_obj.cache_obj, _aureliaDialog.DialogController), _dec(_class = (_class2 = function () {
		function confirm_dialog(multiObserver, ModalWizard, cache_obj, controller) {
			var _this = this;

			_classCallCheck(this, confirm_dialog);

			_initDefineProp(this, '_setContent', _descriptor, this);

			_initDefineProp(this, '_setTitle', _descriptor2, this);

			_initDefineProp(this, 'to', _descriptor3, this);

			_initDefineProp(this, '_id', _descriptor4, this);

			this.showing = false;
			this._buttonTitle = 'Search';
			this._isDisableElement = true;
			this._width = "500";
			this._message = "";
			this.controller = null;


			this.controller = controller;

			this._ModalWizard = ModalWizard;
			this._cache_obj = cache_obj;

			this._cache_obj.OBSERVERS.close_modal.push(function (val) {
				_this.CloseModal(val);
			});

			this._cache_obj.OBSERVERS.open_modal_message.push(function (val1, val2, val3) {
				_this.OpenModal(val1, val2, val3);
			});

			this._cache_obj.OBSERVERS.enable_modal_button.push(function (val1, val2) {
				_this.OpenModal(val1, val2);
			});
		}

		confirm_dialog.prototype.activate = function activate(message) {
			this._message = message;
		};

		confirm_dialog.prototype.InitializeModal = function InitializeModal() {};

		confirm_dialog.prototype.CloseModal = function CloseModal(id) {
			if (this._id == id) this.showing = false;

			this._ModalWizard.ids.pop();
		};

		confirm_dialog.prototype.OpenModal = function OpenModal(id, title, message) {
			if (this._id == id) {
				this._setTitle = title;
				this._message = message;
				this.showDialog();
				this._ModalWizard.ids.push(this._id);
			}
		};

		confirm_dialog.prototype.confirm = function confirm() {
			this.controller.ok();
		};

		confirm_dialog.prototype.showDialog = function showDialog() {
			var _this2 = this;

			this._setContent = this.to.content;

			this.showing = false;
			setTimeout(function () {
				_this2.showing = true;
				_this2._ModalWizard.ids.push(_this2._id);

				if (_this2.to.cleardispatch !== undefined) _this2._cache_obj.OBSERVERS[_this2.to.cleardispatch].forEach(function (all) {
					all();
				});
			}, 10);
		};

		confirm_dialog.prototype.continue = function _continue() {};

		confirm_dialog.prototype.closeModal = function closeModal() {
			this.showing = false;
		};

		confirm_dialog.prototype.enableButton = function enableButton(id, isEnabled) {
			if (this._id == id) this._isDisableElement = !isEnabled;
		};

		return confirm_dialog;
	}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, '_setContent', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, '_setTitle', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'to', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, '_id', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	})), _class2)) || _class);
});
define('modals/edit-person',['exports', 'aurelia-dialog'], function (exports, _aureliaDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.EditPerson = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _class, _temp;

  var EditPerson = exports.EditPerson = (_temp = _class = function () {
    function EditPerson(controller) {
      _classCallCheck(this, EditPerson);

      this.person = { firstName: '' };

      this.controller = controller;
    }

    EditPerson.prototype.activate = function activate(person) {
      this.person = person;
    };

    return EditPerson;
  }(), _class.inject = [_aureliaDialog.DialogController], _temp);
});
define('modals/globalindivmstr',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'modals/modal-wizard', 'cache_obj', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _modalWizard, _cache_obj, _aureliaDialog, _breezeClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.globalindivmstr = undefined;

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var globalindivmstr = exports.globalindivmstr = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _modalWizard.ModalWizard, _cache_obj.cache_obj, _aureliaDialog.DialogController), _dec(_class = function () {
		function globalindivmstr(multiObserver, observerLocator, Element, ModalWizard, cache_obj, controller) {
			var _this = this;

			_classCallCheck(this, globalindivmstr);

			this.items = [];
			this.observerLocator = null;
			this.pageindex = 0;
			this.varFilterArray = [];
			this.varFilterArraySelected = [];
			this.varFilterArrayLength = 0;
			this.controller = null;
			this.varActiveFromCompanyMstr = [];

			this.controller = controller;

			this._ModalWizard = ModalWizard;
			this._cache_obj = cache_obj;

			_toastr2.default.info("Personnel Data...", "Loading..");
			this.varActiveFromCompanyMstr = _underscore2.default.filter((0, _masterfiles.getLookups)().GLOBAL_COMPANY_MSTR, function (all) {
				return all.STATUS_CD == 'ACTV' && all.COMPANY_ID == _this._cache_obj.USER.COMPANY_ID;
			}).map(function (val) {
				return val.GLOBAL_ID;
			});

			_toastr2.default.success("Start Search...", "Loading Finish..");
			this.observerLocator = observerLocator;

			multiObserver.observe([[this, '_bGLOBAL_INDIV_ID'], [this, '_bPERSONNEL_NAME']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._cache_obj.OBSERVERS.clear_indiv_modal.push(function () {
				_this.ClearSearch();
			});
		}

		globalindivmstr.prototype.activate = function activate(model) {
			var _this2 = this;

			if (model.allPersonnel) this.varActiveFromCompanyMstr = _underscore2.default.filter((0, _masterfiles.getLookups)().GLOBAL_COMPANY_MSTR, function (all) {
				return all.STATUS_CD == 'ACTV';
			}).map(function (val) {
				return val.GLOBAL_ID;
			});else this.varActiveFromCompanyMstr = _underscore2.default.filter((0, _masterfiles.getLookups)().GLOBAL_COMPANY_MSTR, function (all) {
				return all.STATUS_CD == 'ACTV' && all.COMPANY_ID == _this2._cache_obj.USER.COMPANY_ID;
			}).map(function (val) {
				return val.GLOBAL_ID;
			});
		};

		globalindivmstr.prototype.attached = function attached() {};

		globalindivmstr.prototype.selectedTalent = function selectedTalent(item) {

			var isFound = this.varFilterArraySelected.find(function (_item) {
				if (_item.GLOBAL_INDIV_ID == item.GLOBAL_INDIV_ID) {
					return true;
				}
			});

			if (isFound === undefined) {
				this.varFilterArraySelected.push(item);
			}
		};

		globalindivmstr.prototype.fnKeyup = function fnKeyup(evt, item) {
			if (evt.keyCode == 13) {
				if (this.varFilterArray.length == 1) {
					this.varFilterArraySelected.push(this.varFilterArray[0]);
				}
			}
		};

		globalindivmstr.prototype.fnManualFilter = function fnManualFilter(tmpVar) {
			var _this3 = this;

			var lstPredicates = [];
			_underscore2.default.each(this._rGROUP_TITLE.querySelectorAll('input'), function (all) {

				var varOb = _this3.observerLocator.getObserver(_this3, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != undefined && varOb.getValue() != null && varOb.getValue() != "" && varOb.getValue() != "undefined") {

					if (varOb.propertyName.indexOf("PERSONNEL_NAME") > -1) {
						lstPredicates.push(_breezeClient2.default.Predicate.create("concat(concat(concat(LAST_NAME,', '), GIVEN_NAME), MIDDLE_NAME)", _breezeClient2.default.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
					} else {
						lstPredicates.push(_breezeClient2.default.Predicate.create(varOb.propertyName.replace('_b', ''), _breezeClient2.default.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
					}
				}

				tmpVar = (0, _helpers.getFilter)(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
			});

			return tmpVar;
		};

		globalindivmstr.prototype.onSpeculateProp = function onSpeculateProp(newValue, oldValue) {
			var _this4 = this;

			if (this._rGROUP_TITLE === undefined || this._rGROUP_TITLE === null || this._rGROUP_TITLE === '') return;

			var tmpVar = this.fnManualFilter(this.varFilterArray);

			if (tmpVar.length > 0) {

				var tmpVarNew = _underscore2.default.sortBy(tmpVar, 'PERSONNEL_NAME').reverse();
				this.varFilterArray = tmpVarNew;
				this.varFilterArrayLength = this.varFilterArray.length;
				return;
			} else {
				tmpVar = this.fnManualFilter((0, _masterfiles.getLookups)().GLOBAL_INDIV_WITH_ALIAS);

				var varFound = _underscore2.default.filter(tmpVar, function (all) {

					var result_p = _underscore2.default.find(_this4.varActiveFromCompanyMstr, function (all_p) {
						return all_p == all.GLOBAL_INDIV_ID;
					});

					return result_p != undefined;
				});

				tmpVar = varFound;
			}

			this.varFilterArray = tmpVar;
			this.varFilterArrayLength = this.varFilterArray.length;
		};

		globalindivmstr.prototype.deleteSelected = function deleteSelected(index) {
			this.varFilterArraySelected.splice(index, 1);
		};

		globalindivmstr.prototype.SelectingDone = function SelectingDone() {

			this.controller.ok(this.varFilterArraySelected);
		};

		globalindivmstr.prototype.ClearSearch = function ClearSearch() {

			this.varFilterArraySelected = [];
			this._bGLOBAL_INDIV_ID = "";
			this._bPERSONNEL_NAME = "";
			this.varFilterArray = [];
			this.varFilterArrayLength = 0;
		};

		return globalindivmstr;
	}()) || _class);
});
define('modals/indivmstr',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'modals/modal-wizard', 'cache_obj', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _modalWizard, _cache_obj, _aureliaDialog, _breezeClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.indivmstr = undefined;

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var indivmstr = exports.indivmstr = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _modalWizard.ModalWizard, _cache_obj.cache_obj, _aureliaDialog.DialogController), _dec(_class = function () {
		function indivmstr(multiObserver, observerLocator, Element, ModalWizard, cache_obj, controller) {
			var _this = this;

			_classCallCheck(this, indivmstr);

			this.items = [];
			this.observerLocator = null;
			this.pageindex = 0;
			this.varFilterArray = [];
			this.varFilterArrayLength = 0;
			this.controller = null;
			this.varActiveFromCompanyMstr = [];


			this.controller = controller;
			this._cache_obj = cache_obj;
			this._ModalWizard = ModalWizard;
			_toastr2.default.info("Personnel Data...", "Loading..");

			_toastr2.default.success("Start Search...", "Loading Finish..");

			this.observerLocator = observerLocator;

			multiObserver.observe([[this, '_bGLOBAL_INDIV_ID'], [this, '_bPERSONNEL_NAME']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._cache_obj.OBSERVERS.clear_indiv_modal.push(function () {
				_this.ClearSearch();
			});
		}

		indivmstr.prototype.activate = function activate(model) {
			var _this2 = this;

			if (model.allPersonnel) this.varActiveFromCompanyMstr = _underscore2.default.filter((0, _masterfiles.getLookups)().GLOBAL_COMPANY_MSTR, function (all) {
				return all.STATUS_CD == 'ACTV';
			}).map(function (val) {
				return val.GLOBAL_ID;
			});else this.varActiveFromCompanyMstr = _underscore2.default.filter((0, _masterfiles.getLookups)().GLOBAL_COMPANY_MSTR, function (all) {
				return all.STATUS_CD == 'ACTV' && all.COMPANY_ID == _this2._cache_obj.USER.COMPANY_ID;
			}).map(function (val) {
				return val.GLOBAL_ID;
			});
		};

		indivmstr.prototype.selectedIndiv = function selectedIndiv(item) {

			this.controller.ok(item);
		};

		indivmstr.prototype.fnManualFilter = function fnManualFilter(tmpVar) {
			var _this3 = this;

			var lstPredicates = [];

			_underscore2.default.each(this._rGROUP_TITLE.querySelectorAll('input'), function (all) {

				var varOb = _this3.observerLocator.getObserver(_this3, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != undefined && varOb.getValue() != null && varOb.getValue() != "" && varOb.getValue() != "undefined") {

					if (varOb.propertyName.indexOf("PERSONNEL_NAME") > -1) {
						lstPredicates.push(_breezeClient2.default.Predicate.create("concat(concat(concat(LAST_NAME,', '), GIVEN_NAME), MIDDLE_NAME)", _breezeClient2.default.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
					} else {
						lstPredicates.push(_breezeClient2.default.Predicate.create(varOb.propertyName.replace('_b', ''), _breezeClient2.default.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
					}
				}

				tmpVar = (0, _helpers.getFilter)(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
			});

			return tmpVar;
		};

		indivmstr.prototype.onSpeculateProp = function onSpeculateProp(newValue, oldValue) {
			var _this4 = this;

			if (this._rGROUP_TITLE === undefined || this._rGROUP_TITLE === null) return;
			var tmpVar = this.fnManualFilter(this.varFilterArray);

			if (tmpVar.length > 0) {
				var tmpVarNew = _underscore2.default.sortBy(tmpVar, 'PERSONNEL_NAME').reverse();
				this.varFilterArray = tmpVarNew;
				this.varFilterArrayLength = this.varFilterArray.length;
				return;
			} else {
				tmpVar = this.fnManualFilter((0, _masterfiles.getLookups)().GLOBAL_INDIV_WITH_ALIAS);

				var varFound = _underscore2.default.filter(tmpVar, function (all) {

					var result_p = _underscore2.default.find(_this4.varActiveFromCompanyMstr, function (all_p) {
						return all_p == all.GLOBAL_INDIV_ID;
					});

					return result_p != undefined;
				});

				tmpVar = varFound;
			}

			this.varFilterArray = tmpVar;
			this.varFilterArrayLength = this.varFilterArray.length;
		};

		indivmstr.prototype.fnKeyup = function fnKeyup(evt, item) {
			if (evt.keyCode == 13) {
				if (this.varFilterArray.length == 1) {
					this.selectedIndiv(this.varFilterArray[0]);
				}
			}
		};

		indivmstr.prototype.ClearSearch = function ClearSearch() {
			this._bGLOBAL_INDIV_ID = "";
			this._bPERSONNEL_NAME = "";
			this.varFilterArray = [];
			this.varFilterArrayLength = 0;
		};

		return indivmstr;
	}()) || _class);
});
define('modals/job',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'cache_obj', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _cache_obj, _aureliaDialog, _breezeClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.job = undefined;

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var job = exports.job = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _cache_obj.cache_obj, _aureliaDialog.DialogController), _dec(_class = function () {
		function job(multiObserver, observerLocator, Element, cache_obj, controller) {
			var _this = this;

			_classCallCheck(this, job);

			this.observerLocator = null;
			this.pageindex = 0;
			this.varFilterArrayLength = 0;
			this.varFilterArray = [];
			this.currPredicate = null;
			this.intTest = 0;
			this.hasFocus = true;
			this.controller = null;


			this.controller = controller;

			this.observerLocator = observerLocator;

			this._cache_obj = cache_obj;

			multiObserver.observe([[this, '_bJOB_GRP'], [this, '_bJOB_DESC']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._cache_obj.OBSERVERS.clear_job_modal.push(function () {
				_this.ClearSearch();
			});
		}

		job.prototype.selectedTalent = function selectedTalent(item) {

			this._cache_obj.OBSERVERS.pass_job.forEach(function (all) {
				all(item);
			});
		};

		job.prototype.fnManualFilter = function fnManualFilter(tmpVar) {
			var _this2 = this;

			this.currPredicate = [];
			_underscore2.default.each(this._rJOB_TITLE.querySelectorAll('input'), function (all) {

				var varOb = _this2.observerLocator.getObserver(_this2, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != undefined && varOb.getValue() != null && varOb.getValue() != "" && varOb.getValue() != "undefined") _this2.currPredicate.push(_breezeClient2.default.Predicate.create(varOb.propertyName.replace('_b', ''), _breezeClient2.default.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));

				if (tmpVar.length > 0) tmpVar = (0, _helpers.getFilter)(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
			});

			return tmpVar;
		};

		job.prototype.onSpeculateProp = function onSpeculateProp(newValue, oldValue) {
			var _this3 = this;

			var varValuesHasChanged = false;

			_underscore2.default.each(this._rJOB_TITLE.querySelectorAll('input'), function (all) {
				var varOb = _this3.observerLocator.getObserver(_this3, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != '' && varOb.getValue() !== undefined) {
					varValuesHasChanged = true;
				}
			});

			if (!varValuesHasChanged) return;

			var tmpVar = this.fnManualFilter(this.varFilterArray);

			if (tmpVar.length > 0) {
				var tmpVarNew = _underscore2.default.sortBy(tmpVar, 'JOB_DESC').reverse();
				this.varFilterArray = tmpVarNew;
				this.varFilterArrayLength = this.varFilterArray.length;
				return;
			}

			setTimeout(function (a) {

				if (a !== _this3.currPredicate) return;

				var varJobs = (0, _masterfiles.getLookups)().JOB_GRP_CATEGORY.filter(function (all) {
					return all.COMPANY_ID == _this3._cache_obj.USER.COMPANY_ID;
				});

				_this3.varFilterArray = [];

				_underscore2.default.each(varJobs, function (all) {
					if (all.JOB_DESC.indexOf("[SELECT") == -1) tmpVar.push({
						JOB_DESC: all.JOB_DESC,
						JOB_GRP: all.CATEGORY_DESC,
						JOB_ID: all.JOB_ID
					});
				});

				tmpVar = _this3.fnManualFilter(tmpVar);

				_this3.varFilterArray = tmpVar;
				_this3.varFilterArrayLength = _this3.varFilterArray.length;
			}, 500, this.currPredicate);
		};

		job.prototype.selectedJob = function selectedJob(item) {

			this.controller.ok(item);
		};

		job.prototype.ClearSearch = function ClearSearch() {
			var _this4 = this;

			this._bJOB_GRP = "";
			this._bJOB_DESC = "";
			this.varFilterArray = [];
			this.varFilterArrayLength = 0;

			setTimeout(function () {
				(0, _jquery2.default)(_this4.refJobDesc).focus();
			}, 500);
		};

		job.prototype.fnKeyup = function fnKeyup(evt, item) {
			var _this5 = this;

			if (evt.keyCode == 13) {
				if (this.varFilterArray.length == 1) {

					this._cache_obj.OBSERVERS.pass_job.forEach(function (all) {
						all(_this5.varFilterArray[0]);
					});
				}
			}
		};

		return job;
	}()) || _class);
});
define('modals/login',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'modals/modal-wizard', 'cache_obj', 'aurelia-dialog', '../settings', 'moment', 'modals/confirm_dialog', '../helpers'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _underscore, _jquery, _entityManagerFactory, _toastr, _modalWizard, _cache_obj, _aureliaDialog, _settings, _moment, _confirm_dialog, _helpers) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.login = undefined;

    var _underscore2 = _interopRequireDefault(_underscore);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _toastr2 = _interopRequireDefault(_toastr);

    var _settings2 = _interopRequireDefault(_settings);

    var _moment2 = _interopRequireDefault(_moment);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _class, _desc, _value, _class2, _descriptor;

    var login = exports.login = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _modalWizard.ModalWizard, _cache_obj.cache_obj, _aureliaDialog.DialogController, _aureliaDialog.DialogService), _dec(_class = (_class2 = function () {
        function login(multiObserver, observerLocator, Element, ModalWizard, cache_obj, controller, DialogService) {
            var _this = this;

            _classCallCheck(this, login);

            this.items = [];
            this.observerLocator = null;
            this.varFilterArray = [];
            this.varFilterArraySelected = [];
            this._user_content = [];
            this._content = [];

            _initDefineProp(this, '_USER', _descriptor, this);

            this._companies = [];
            this._users = [];
            this._USER_PROFILE_MSTR = [];
            this.user_expired = false;
            this.disableLogButton = false;


            this.dialogService = DialogService;
            this.controller = controller;

            this._ModalWizard = ModalWizard;

            this._cache_obj = cache_obj;


            var varGetUserRole = (0, _entityManagerFactory.EntityQuery)().from('USER_ROLE_TRX').orderBy("USER_ID");

            (0, _entityManagerFactory.EntityManager)().executeQuery(varGetUserRole).then(function (found) {
                _this._user_content.push({});

                found.results.forEach(function (all) {
                    _this._user_content.push(all);

                    var found = _this._user_content.find(function (all2) {
                        return all2.USER_ID == all.USER_ID;
                    });
                    if (found == undefined) _this._user_content.push(all);
                });
            });

            (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('COMPANY_MSTR').orderBy("COMPANY_NAME")).then(function (found) {
                _this._companies.push({ COMPANY_ID: 0, COMPANY_NAME: "" });
                found.results.forEach(function (all) {
                    _this._companies.push({ COMPANY_ID: all.COMPANY_ID, COMPANY_NAME: all.COMPANY_NAME });
                });
            });

            this._cache_obj.OBSERVERS.clear_log.push(function () {
                _this.ClearLogin();
            });

            this._cache_obj.OBSERVERS.clear_login_modal.push(function () {
                _this.ClearSearch();
            });

            (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('USER_PROFILE_MSTR')).then(function (found) {
                _this._USER_PROFILE_MSTR = found.results;
            });
        }

        login.prototype.keyPressed = function keyPressed($event) {
            if ($event.which === 13) {
                this.tryLogin();
            }
        };

        login.prototype.tryLogin = function tryLogin() {
            var _this2 = this;

            this.disableLogButton = true;

            if (this._PASSWORD === undefined || _underscore2.default.isEmpty(this._PASSWORD) || this._USER.USER_ID === undefined || _underscore2.default.isEmpty(this._USER.USER_ID)) {
                _toastr2.default.error("USER ID/PASSWORD cannot be empty.", "Change Password");
                this.disableLogButton = false;
                return;
            } else if (this._PASSWORD.length != 8) {
                _toastr2.default.error("Invalid Password, must be 8 characters long.", "Change Password");
                this.disableLogButton = false;
                return;
            }

            if (this.user_expired) {
                if (this._PASSWORD == this._NEW_PASSWORD) {
                    _toastr2.default.error("New password cannot be similar with current.", "Password");
                    this.disableLogButton = false;
                    return;
                } else if (this._NEW_PASSWORD === undefined || _underscore2.default.isEmpty(this._NEW_PASSWORD) || this._NEW_PASSWORD.length != 8) {
                    _toastr2.default.error("Invalid Password, must be 8 characters long.", "Change Password");
                    this.disableLogButton = false;
                    return;
                }
            }

            _settings2.default.isNavigating = true;
            _toastr2.default.info("Please wait..", "Authentication", { timeOut: 30000 });

            if (this.user_expired) {
                _jquery2.default.post(_settings2.default.serviceNameBase + "/useraccess/Set_Password", {
                    "USER_ID": this._USER.USER_ID,
                    "COMPANY_ID": this._COMPANY.COMPANY_ID,
                    "PASSWORD": this._PASSWORD,
                    "NEWPASSWORD": this._NEW_PASSWORD,
                    "HASH": ""
                }).done(function (response) {
                    _toastr2.default.clear();
                    if (response == "" || response == "false") {
                        _toastr2.default.error("Problem Occured", "Change Password");
                        _this2.disableLogButton = false;
                    } else if (response == "duplicate") {
                        _toastr2.default.error("Password cannot be same as your current.", "Change Password");
                        _this2.disableLogButton = false;
                    } else {

                        _toastr2.default.success("Password successfully saved and e-mailed to you.", "Change Password");
                        _this2._PASSWORD = _this2._NEW_PASSWORD;
                        _this2.fnCheckUser();
                    }
                    _settings2.default.isNavigating = false;
                });
            } else {

                this.fnCheckUser();
            }
        };

        login.prototype.fnCheckUser = function fnCheckUser() {
            var _this3 = this;

            _settings2.default.isNavigating = false;
            _toastr2.default.clear();


            _jquery2.default.post(_settings2.default.serviceNameBase + "/UserAccess/Check_User", {
                "USER_ID": this._USER.USER_ID,
                "COMPANY_ID": this._COMPANY.COMPANY_ID,
                "PASSWORD": this._PASSWORD,
                "UPDATE_EXPIRED": false
            }).done(function (response) {
                _this3.loginSuccess(response);
                _this3._ModalWizard.ids.pop();
            });
        };

        login.prototype.loginSuccess = function loginSuccess(response, CALLER) {
            var _this4 = this;

            if (response == "") {
                _toastr2.default.error("USER ID Not found", "Searching USER..");
                this.disableLogButton = false;
                return;
            } else {
                _toastr2.default.success("Welcome.. " + response.USER_ID, "User Found");

                var varUserAtt = response;
                varUserAtt.ROLE_CD = this._USER.ROLE_CD;

                this.controller.ok(varUserAtt);

                this._cache_obj.USER = varUserAtt;

                this._cache_obj.ALLOW_PASS_CONFIDENTIAL = false;

                var checkRole = (0, _entityManagerFactory.EntityQuery)().from('MODULE_ACCESS_TRX').where("ROLE_CD", "==", this._USER.ROLE_CD).select('ROLE_CD,MODULE_MSTR.MODULE_NAME,ACCESS_FL').expand('MODULE_MSTR');

                (0, _entityManagerFactory.EntityManager)().executeQuery(checkRole).then(function (success) {
                    success.results.forEach(function (all) {
                        if (all.ROLE_CD == _this4._USER.ROLE_CD) {

                            if (all.MODULE_MSTR.MODULE_NAME.includes("CONCEAL") && all.ACCESS_FL == "1") {
                                _this4._cache_obj.ALLOW_PASS_CONFIDENTIAL = true;
                            }
                        }
                    });
                });

                _jquery2.default.post(_settings2.default.serviceNameBase + "/UserAccess/User_Access", {
                    "USER_ID": this._USER.USER_ID,
                    "HASH": this._USER.HASH
                }).done(function (response) {
                    _this4._cache_obj._ACCESS = response;
                });
            }
        };

        login.prototype.ClearLogin = function ClearLogin() {
            this._USER = "";
            this._COMPANY = "";
            this._PASSWORD = "";

            this._cache_obj.USER = {};
            this._cache_obj._ACCESS = {};
        };

        login.prototype.ClearSearch = function ClearSearch() {
            this._USER = "";
            this._COMPANY = null;
            this._PASSWORD = "";
        };

        login.prototype.resetPassword = function resetPassword() {
            var _this5 = this;

            if (_underscore2.default.isUndefined(this._USER.USER_ID) || _underscore2.default.isNull(this._USER.USER_ID) || this._USER.USER_ID.trim().length === 0 || _underscore2.default.isUndefined(this._COMPANY.COMPANY_ID) || _underscore2.default.isNull(this._COMPANY.COMPANY_ID)) {
                _toastr2.default.error("Invalid USER/COMPANY", "Reset Password");
                return;
            }

            this.dialogService.open({ viewModel: _confirm_dialog.confirm_dialog, model: 'Reset Password?' }).whenClosed(function (response) {
                if (!response.wasCancelled) {

                    _toastr2.default.info("Please wait..", "Resetting Password");
                    _settings2.default.isNavigating = true;
                    _jquery2.default.post(_settings2.default.serviceNameBase + "/UserAccess/Reset_Password", {
                        "USER_ID": _this5._USER.USER_ID,
                        "COMPANY_ID": _this5._COMPANY.COMPANY_ID
                    }).done(function (response) {
                        _settings2.default.isNavigating = false;
                        if (response == "false") {
                            _toastr2.default.error("Error saving new password.", "Reset Password");
                        } else {
                            _toastr2.default.success("Password has been reset and emailed to you.", "Reset Password");

                            if (_this5.user_expired) setTimeout(function () {
                                location.reload();
                            }, 3000);
                        }
                    });
                }
            });
        };

        login.prototype._USERChanged = function _USERChanged() {
            var _this6 = this;

            if (_underscore2.default.isUndefined(this._USER.USER_ID) || _underscore2.default.isNull(this._USER.USER_ID) || this._USER.USER_ID.trim().length === 0) {} else {
                var varFound = this._USER_PROFILE_MSTR.find(function (all) {
                    return all.USER_ID == _this6._USER.USER_ID;
                });
                if (!_underscore2.default.isUndefined(varFound.EXPIRE_DT) && !_underscore2.default.isNull(varFound.EXPIRE_DT)) {

                    var varDateCompare = new Date((0, _moment2.default)(new Date(varFound.EXPIRE_DT)));
                    if (varDateCompare < new Date()) {
                        if (!this.user_expired) this.user_expired = true;
                    } else this.user_expired = false;
                } else {
                    _toastr2.default.error("Please call administrator.", "ACCOUNT EXPIRY PROBLEM.");
                }
            }
        };

        return login;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, '_USER', [_aureliaFramework.bindable], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('modals/modal-wizard',["exports"], function (exports) {
   "use strict";

   Object.defineProperty(exports, "__esModule", {
      value: true
   });

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   var ModalWizard = exports.ModalWizard = function ModalWizard() {
      _classCallCheck(this, ModalWizard);

      this.ids = [];
   };
});
define('modals/modalcontainer',['exports', 'aurelia-framework', 'modals/modal-wizard', 'multi-observer', 'cache_obj'], function (exports, _aureliaFramework, _modalWizard, _multiObserver, _cache_obj) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.modalcontainer = undefined;

	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;

		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}

		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);

		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}

		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}

		return desc;
	}

	function _initializerWarningHelper(descriptor, context) {
		throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}

	var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4;

	var modalcontainer = exports.modalcontainer = (_dec = (0, _aureliaFramework.inject)(_modalWizard.ModalWizard, _multiObserver.MultiObserver, _cache_obj.cache_obj), _dec(_class = (_class2 = function () {
		function modalcontainer(ModalWizard, multiObserver, cache_obj) {
			var _this = this;

			_classCallCheck(this, modalcontainer);

			_initDefineProp(this, '_setContent', _descriptor, this);

			_initDefineProp(this, '_setTitle', _descriptor2, this);

			_initDefineProp(this, 'to', _descriptor3, this);

			_initDefineProp(this, '_id', _descriptor4, this);

			this.showing = false;
			this._buttonTitle = 'Search';
			this._isDisableElement = true;
			this._width = "900";
			this._cache_obj = null;

			this._cache_obj = cache_obj;

			this._ModalWizard = ModalWizard;
			this.multiObserver = multiObserver;

			this._cache_obj.OBSERVERS.init_modal.push(function () {
				_this.InitializeModal();
			});

			this._cache_obj.OBSERVERS.close_modal.push(function (val) {
				_this.CloseModal(val);
			});

			this._cache_obj.OBSERVERS.open_modal.push(function (val) {
				_this.OpenModal(val);
			});

			this._cache_obj.OBSERVERS.enable_modal_button.push(function (val1, val2) {
				_this.enableButton(val1, val2);
			});
		}

		modalcontainer.prototype.InitializeModal = function InitializeModal() {
			this._buttonTitle = this.to.buttonTitle;
			this._setTitle = this.to.title;
			this._id = this.to.id;
			this._width = this.to.width;

			if (this.to.display == "none") {
				$(this.btnRef).css("visibility", "hidden");
				this._buttonTitle = "";
			}
		};

		modalcontainer.prototype.CloseModal = function CloseModal(id) {
			if (this._id == id) this.showing = false;

			this._ModalWizard.ids.pop();
		};

		modalcontainer.prototype.OpenModal = function OpenModal(id) {
			if (this._id == id) {
				this.showDialog();
				this._ModalWizard.ids.push(this._id);
			}
		};

		modalcontainer.prototype.showDialog = function showDialog() {
			var _this2 = this;

			this._setContent = this.to.content;

			this.showing = false;

			setTimeout(function () {
				_this2.showing = true;
				_this2._ModalWizard.ids.push(_this2._id);

				if (_this2.to.cleardispatch !== undefined) _this2._cache_obj.OBSERVERS[_this2.to.cleardispatch].forEach(function (all) {
					all();
				});
			}, 500);
		};

		modalcontainer.prototype.closeModal = function closeModal() {
			this.showing = false;
		};

		modalcontainer.prototype.enableButton = function enableButton(id, isEnabled) {
			if (this._id == id) this._isDisableElement = !isEnabled;
		};

		return modalcontainer;
	}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, '_setContent', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, '_setTitle', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'to', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, '_id', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	})), _class2)) || _class);
});
define('modals/paymentterm',['exports', '../masterfiles', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'aurelia-dialog'], function (exports, _masterfiles, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _aureliaDialog) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.paymentterm = undefined;

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _toastr2 = _interopRequireDefault(_toastr);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var paymentterm = exports.paymentterm = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaDialog.DialogController), _dec(_class = function () {
		function paymentterm(Element, controller) {
			_classCallCheck(this, paymentterm);

			this.varFilterArray = [];
			this.controller = null;


			this.controller = controller;

			this.varFilterArray = (0, _masterfiles.getLookups)().PAYMENT_TERM;
		}

		paymentterm.prototype.selectedTerm = function selectedTerm(item) {

			this.controller.ok(item);
		};

		paymentterm.prototype.fnKeyup = function fnKeyup(evt, item) {
			console.log(evt.keyCode);
			if (evt.keyCode == 13) {
				if (this.varFilterArray.length == 1) {
					this.selectedIndiv(this.varFilterArray[0]);
				}
			}
		};

		return paymentterm;
	}()) || _class);
});
define('modals/program',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'cache_obj', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _cache_obj, _aureliaDialog, _breezeClient) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.program = undefined;

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var program = exports.program = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _cache_obj.cache_obj, _aureliaDialog.DialogController), _dec(_class = function () {
		function program(multiObserver, observerLocator, Element, cache_obj, controller) {
			var _this = this;

			_classCallCheck(this, program);

			this.items = [];
			this.observerLocator = null;
			this.pageindex = 0;
			this.varFilterArrayLength = 0;
			this.varFilterArray = [];
			this.currPredicate = null;
			this.controller = null;

			this.controller = controller;

			this.observerLocator = observerLocator;

			this.items = (0, _masterfiles.getLookups)().BDGT_TMPL_HDR;

			this._cache_obj = cache_obj;

			multiObserver.observe([[this, '_bPROGRAM_CD'], [this, '_bPROGRAM_TITLE']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._cache_obj.OBSERVERS.clear_program_modal.push(function () {
				_this.ClearSearch();
			});
		}

		program.prototype.selectedTalent = function selectedTalent(item) {

			this._cache_obj.OBSERVERS.pass_value.forEach(function (all) {
				all(item);
			});
		};

		program.prototype.onSpeculateProp = function onSpeculateProp(newValue, oldValue) {
			var _this2 = this;

			var varValuesHasChanged = false;

			_underscore2.default.each(this._rBUDGET_TITLE.querySelectorAll('input'), function (all) {
				var varOb = _this2.observerLocator.getObserver(_this2, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != '' && varOb.getValue() !== undefined) {
					varValuesHasChanged = true;
				}
			});

			if (!varValuesHasChanged) return;

			var tmpVar = [];
			if (this.varFilterArray.length > 0) tmpVar = this.varFilterArray;

			var lstPredicates = [];
			_underscore2.default.each(this._rBUDGET_TITLE.querySelectorAll('input'), function (all) {

				var varOb = _this2.observerLocator.getObserver(_this2, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != undefined && varOb.getValue() != null && varOb.getValue() != "" && varOb.getValue() != "undefined") lstPredicates.push(_breezeClient2.default.Predicate.create(varOb.propertyName.replace('_b', ''), _breezeClient2.default.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));

				if (tmpVar.length > 0) {
					tmpVar = (0, _helpers.getFilter)(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
				}
			});

			this.currPredicate = lstPredicates;

			if (tmpVar.length > 0) {
				this.varFilterArray = tmpVar;
				this.varFilterArrayLength = this.varFilterArray.length;
				return;
			}

			if (this._cache_obj.PROGRAM_USER.length == 0) {

				var _query = (0, _entityManagerFactory.EntityQuery)().from('PROGRAM_USER_TRX').where("USER_ID", "==", this._cache_obj.USER.USER_ID);
				(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
					success.results.forEach(function (all) {
						if (all.USER_ID == _this2._cache_obj.USER.USER_ID) _this2._cache_obj.PROGRAM_USER.push(all);
					});
				});
			}
			setTimeout(function (a) {

				if (a !== _this2.currPredicate) return;

				_this2.varFilterArray = [];

				var _query = (0, _entityManagerFactory.EntityQuery)().from('PROGRAM_MSTR').where(_breezeClient2.default.Predicate.and(_this2.currPredicate)).select('PROGRAM_CD,PROGRAM_TITLE,PROGRAM_ID,BUH_PERSONNEL_ID');
				(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
					tmpVar = [];

					_underscore2.default.each(success.results, function (all) {

						var findProgramUser = _this2._cache_obj.PROGRAM_USER.find(function (allP) {
							return allP.PROGRAM_ID == all.PROGRAM_ID;
						});
						if (findProgramUser !== undefined) {

							tmpVar.push({
								PROGRAM_TITLE: all.PROGRAM_TITLE,
								PROGRAM_CD: all.PROGRAM_CD,
								PROGRAM_ID: all.PROGRAM_ID
							});
						}
					});

					_this2.varFilterArray = tmpVar;
					_this2.varFilterArrayLength = _this2.varFilterArray.length;
				}, function (failed) {
					_toastr2.default.error(failed, "Failed loading PROGRAM Names");
				});
			}, 500, this.currPredicate);
		};

		program.prototype.selectedProgram = function selectedProgram(item) {

			this._cache_obj.OBSERVERS.pass_program.forEach(function (all) {
				all(item);
			});

			this.controller.ok();
		};

		program.prototype.ClearSearch = function ClearSearch() {
			this._bPROGRAM_CD = "";
			this._bPROGRAM_TITLE = "";
			this.varFilterArray = [];
			this.varFilterArrayLength = 0;
		};

		return program;
	}()) || _class);
});
define('modals/talentmanagergroups',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', 'cache_obj', 'aurelia-dialog'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _cache_obj, _aureliaDialog) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.talentmanagergroups = undefined;

	var _underscore2 = _interopRequireDefault(_underscore);

	var _jquery2 = _interopRequireDefault(_jquery);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var talentmanagergroups = exports.talentmanagergroups = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _cache_obj.cache_obj, _aureliaDialog.DialogController), _dec(_class = function () {
		function talentmanagergroups(multiObserver, observerLocator, Element, cache_obj, controller) {
			var _this = this;

			_classCallCheck(this, talentmanagergroups);

			this.items = [];
			this.observerLocator = null;
			this.varFilterArray = [];
			this.varFilterArrayLength = 0;
			this.pageindex = 0;
			this.controller = null;

			this.controller = controller;

			this._cache_obj = cache_obj;
			this.observerLocator = observerLocator;

			this.items = (0, _masterfiles.getLookups)().GLOBAL_GRP_MSTR;
			multiObserver.observe([[this, '_bGLOBAL_GRP_ID'], [this, '_bGROUP_NAME']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._cache_obj.OBSERVERS.clear_talentmanager_modal.push(function () {
				_this.ClearSearch();
			});
		}

		talentmanagergroups.prototype.selectedTalent = function selectedTalent(item) {

			this.controller.ok(item);
		};

		talentmanagergroups.prototype.fnKeyup = function fnKeyup(evt, item) {
			var _this2 = this;

			if (evt.keyCode == 13) {
				if (this.varFilterArray.length == 1) {
					this._cache_obj.OBSERVERS.pass_value.forEach(function (all) {
						all(_this2.varFilterArray[0]);
					});
				}
			}
		};

		talentmanagergroups.prototype.onSpeculateProp = function onSpeculateProp(newValue, oldValue) {
			var _this3 = this;

			var varValuesHasChanged = false;

			_underscore2.default.each(this._rGROUP_TITLE.querySelectorAll('input'), function (all) {
				var varOb = _this3.observerLocator.getObserver(_this3, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != '' && varOb.getValue() !== undefined) {
					varValuesHasChanged = true;
				}
			});

			if (!varValuesHasChanged) return;

			var tmpVar = this.items;
			_underscore2.default.each(this._rGROUP_TITLE.querySelectorAll('input'), function (all) {

				var varOb = _this3.observerLocator.getObserver(_this3, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != undefined && varOb.getValue() != null && varOb.getValue() != "" && varOb.getValue() != "undefined") tmpVar = (0, _helpers.getFilter)(tmpVar, varOb.getValue().toUpperCase(), all.getAttribute('searchable').replace('_s', ''));
			});

			this.varFilterArray = tmpVar;
			this.varFilterArrayLength = this.varFilterArray.length;
		};

		talentmanagergroups.prototype.ClearSearch = function ClearSearch() {
			this.varFilterArray = [];
			this.varFilterArrayLength = 0;
			this._bGLOBAL_GRP_ID = "";
			this._bGROUP_NAME = "";
			this.varFilterArray = [];
			this.varFilterArrayLength = 0;
		};

		return talentmanagergroups;
	}()) || _class);
});
define('ppfcs/buh',['exports', '../entity-manager-factory', '../helpers', '../masterfiles', 'toastr', 'aurelia-framework', 'typeahead', 'underscore', '../modals/buh-program-dialog', 'aurelia-dialog', '../modals/login', '../modals/buh-search'], function (exports, _entityManagerFactory, _helpers, _masterfiles, _toastr, _aureliaFramework, _typeahead, _underscore, _buhProgramDialog, _aureliaDialog, _login, _buhSearch) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.buh = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	var _typeahead2 = _interopRequireDefault(_typeahead);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var buh = exports.buh = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService), _dec(_class = function () {
		function buh(DialogService) {
			_classCallCheck(this, buh);

			this._objBUH = { PROGRAMS: [] };
			this.dialogService = null;
			this.loginDisabled = true;
			this.logoutDisabled = false;
			this.masterFilesLoaded = false;
			this._disableCells = true;
			this._disableAdd = false;
			this._disableDelete = true;
			this._disableSave = true;
			this._disableSearch = false;
			this._disableGrid = true;
			this._status = "";
			this._user = {};
			this._programs = [];


			this.dialogService = DialogService;

			if (this.dialogService.controllers.length > 0) {
				for (var i = this.dialogService.controllers.length - 1; i >= 0; i--) {
					this.dialogService.controllers[i].close();
				}
			}
		}

		buh.prototype.addBUH = function addBUH() {
			this.fnCRUD("add");
		};

		buh.prototype.fnCRUD = function fnCRUD(value) {
			var _this = this;

			this._disableCells = true;
			this._disableSave = true;
			this._disableDelete = true;
			this._disableAdd = true;
			this._disableGrid = true;
			this._disableSearch = true;
			switch (value) {
				case "cancel":
					{
						this._disableSearch = false;
						this._disableAdd = false;
						this._objBUH = {
							BUH_PERSONNEL_ID: 0,
							OPTIONAL_GLOBAL_ID: "",
							FIRST_NAME: "",
							MIDDLE_NAME: "",
							LAST_NAME: "",
							EMAIL_ADDRESS: "", PROGRAMS: [] };
						this._status = "";
					}
					break;
				case "search":
					{
						this.searchExistingBuh();
					}
					break;
				case "add":
					{
						this._status = "add";
						this._disableCells = false;
						this._disableSave = false;
						this._objBUH = {
							BUH_PERSONNEL_ID: "",
							OPTIONAL_GLOBAL_ID: "",
							FIRST_NAME: "",
							MIDDLE_NAME: "",
							LAST_NAME: "",
							EMAIL_ADDRESS: "", PROGRAMS: [] };
					}
					break;
				case "delete":
					{

						var varDelete = confirm("Delete BUH?");

						if (varDelete) {

							for (var i = this._objBUH.PROGRAMS.length - 1; i >= 0; i--) {
								var found = this._programs.find(function (all) {
									return all.PROGRAM_CD == _this._objBUH.PROGRAMS[i].PROGRAM_CD;
								});
								found.BUH_PERSONNEL_ID = 0;
							}

							var getBUHForEdit = (0, _entityManagerFactory.EntityQuery)().from('BUH_PERSONNEL').where("BUH_PERSONNEL_ID", "==", this._objBUH.BUH_PERSONNEL_ID);
							(0, _entityManagerFactory.EntityManager)().executeQuery(getBUHForEdit).then(function (success) {
								success.results[0].entityAspect.setDeleted();
								(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {

									_toastr2.default.success("Succesfully Saved", "Program");
								}, function (fail) {

									(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
										var errors = entity.entityAspect.getValidationErrors();
										if (errors.length > 0) console.log(errors);
									});
									_toastr2.default.error("Error Occured", fail);
								});

								_this.fnCRUD("cancel");
							});

							return;
						}
						this._disableCells = false;
						this._disableSave = false;
						this._disableDelete = false;
						this._disableAdd = false;
						this._disableGrid = false;
						this._disableSearch = false;
					}
					break;
				case "save":
					{
						this.saveBUH();
					}
					break;
			}
		};

		buh.prototype.saveBUH = function saveBUH() {
			var _this2 = this;

			if (this._status == "view") {
				var getBUHForEdit = (0, _entityManagerFactory.EntityQuery)().from('BUH_PERSONNEL').where("BUH_PERSONNEL_ID", "==", this._objBUH.BUH_PERSONNEL_ID);
				(0, _entityManagerFactory.EntityManager)().executeQuery(getBUHForEdit).then(function (success) {

					success.results[0].OPTIONAL_GLOBAL_ID = _this2._objBUH.OPTIONAL_GLOBAL_ID.toUpperCase();
					success.results[0].FIRST_NAME = _this2._objBUH.FIRST_NAME.toUpperCase();
					success.results[0].MIDDLE_NAME = _this2._objBUH.MIDDLE_NAME.toUpperCase();
					success.results[0].LAST_NAME = _this2._objBUH.LAST_NAME.toUpperCase();
					success.results[0].EMAIL_ADDRESS = _this2._objBUH.EMAIL_ADDRESS.toUpperCase();

					(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {

						_toastr2.default.success("Succesfully Saved", "New Business Unit Head");

						_this2._disableDelete = false;
						_this2._disableGrid = false;
						_this2._disableAdd = false;
						_this2._disableSearch = false;
						_this2._disableCells = false;
						_this2._disableSave = false;
					}, function (fail) {

						if (varInsert != null) {
							varInsert.entityAspect.setDeleted();
						}

						(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
							var errors = entity.entityAspect.getValidationErrors();
							if (errors.length > 0) console.log(errors);
						});
						console.log(fail);
						_toastr2.default.error("Error Occured", fail);
					});
				});
				return;
			}

			var getMax = (0, _entityManagerFactory.EntityQuery)().from('BUH_PERSONNEL').orderByDesc('BUH_PERSONNEL_ID').take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (successMax) {
				var getMax = 1;

				if (successMax.results.length > 0) getMax = successMax.results[0].BUH_PERSONNEL_ID + 1;

				var varInsert = (0, _entityManagerFactory.EntityManager)().createEntity('BUH_PERSONNEL', {
					BUH_PERSONNEL_ID: getMax,
					OPTIONAL_GLOBAL_ID: _this2._objBUH.OPTIONAL_GLOBAL_ID.toUpperCase(),
					FIRST_NAME: _this2._objBUH.FIRST_NAME.toUpperCase(),
					MIDDLE_NAME: _this2._objBUH.MIDDLE_NAME.toUpperCase(),
					LAST_NAME: _this2._objBUH.LAST_NAME.toUpperCase(),
					EMAIL_ADDRESS: _this2._objBUH.EMAIL_ADDRESS.toUpperCase(),
					CREATED_BY: "PAULV",
					CREATED_DT: new Date(Date.now())
				});

				(0, _entityManagerFactory.EntityManager)().addEntity(varInsert);

				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {

					_this2._objBUH.BUH_PERSONNEL_ID = getMax;

					_toastr2.default.success("Succesfully Saved", "New Business Unit Head");

					_this2._disableDelete = false;
					_this2._disableGrid = false;
					_this2._disableAdd = false;
					_this2._disableSearch = false;
					_this2._disableDelete = false;
					_this2._disableCells = false;
					_this2._disableSave = false;
					_this2._status = "view";
				}, function (fail) {

					if (varInsert != null) {
						varInsert.entityAspect.setDeleted();
					}

					(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
						var errors = entity.entityAspect.getValidationErrors();
						if (errors.length > 0) console.log(errors);
					});
					console.log(fail);
					_toastr2.default.error("Error Occured", fail);
				});
			});
		};

		buh.prototype.deleteSelected = function deleteSelected(index) {
			var _this3 = this;

			var varDelete = confirm("Delete record?");
			if (varDelete) {

				var found = this._programs.find(function (all) {
					return all.PROGRAM_CD == _this3._objBUH.PROGRAMS[index].PROGRAM_CD;
				});
				found.BUH_PERSONNEL_ID = 0;

				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {

					_toastr2.default.success("Succesfully Saved", "Program");
				}, function (fail) {

					(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
						var errors = entity.entityAspect.getValidationErrors();
						if (errors.length > 0) console.log(errors);
					});
					_toastr2.default.error("Error Occured", fail);
				});

				this._objBUH.PROGRAMS.splice(index, 1);
			}
		};

		buh.prototype.searchExistingBuh = function searchExistingBuh() {
			var _this4 = this;

			this.dialogService.open({
				viewModel: _buhSearch.buhSearch
			}).whenClosed(function (response) {

				if (!response.wasCancelled) {
					_this4.searchBUH(response.output);
					_this4._disableGrid = false;
					_this4._disableDelete = false;
					_this4._disableSave = false;
					_this4._disableCells = false;
				} else {
					_this4._disableSearch = false;
					_this4._disableAdd = false;
				}
			});
		};

		buh.prototype.searchBUH = function searchBUH(item) {
			var _this5 = this;

			this._status = "view";

			this._objBUH.BUH_PERSONNEL_ID = item.BUH_PERSONNEL_ID;
			this._objBUH.OPTIONAL_GLOBAL_ID = item.OPTIONAL_GLOBAL_ID;
			this._objBUH.FIRST_NAME = item.FIRST_NAME;
			this._objBUH.MIDDLE_NAME = item.MIDDLE_NAME;
			this._objBUH.LAST_NAME = item.LAST_NAME;
			this._objBUH.EMAIL_ADDRESS = item.EMAIL_ADDRESS;

			this._disableAdd = false;
			this._disableSearch = false;

			this._objBUH.PROGRAMS = [];

			var found = this._programs.filter(function (all) {
				return all.BUH_PERSONNEL_ID == item.BUH_PERSONNEL_ID;
			});

			if (found !== undefined) found.forEach(function (foundItems) {
				_this5._objBUH.PROGRAMS.push(foundItems);
			});
		};

		buh.prototype.searchPrograms = function searchPrograms() {
			var _this6 = this;

			this.dialogService.open({
				viewModel: _buhProgramDialog.buhProgramDialog
			}).whenClosed(function (response) {

				if (!response.wasCancelled) {

					for (var a = response.output.length - 1; a >= 0; --a) {
						var found = _this6._programs.find(function (all) {
							return all.PROGRAM_CD == response.output[a].PROGRAM_CD;
						});
						console.log(found.BUH_PERSONNEL_ID);
						if (found.BUH_PERSONNEL_ID == 0) {
							_this6._objBUH.PROGRAMS.push(response.output[a]);
							found.BUH_PERSONNEL_ID = _this6._objBUH.BUH_PERSONNEL_ID;
						} else {
							_toastr2.default.error("<strong>" + found.PROGRAM_TITLE + "</strong> cannot be added, it is assigned to other BUH Personnel.", "Problem occured");
						}
					}

					(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {

						_toastr2.default.success("Succesfully Saved", "Program");
					}, function (fail) {

						(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
							var errors = entity.entityAspect.getValidationErrors();
							if (errors.length > 0) console.log(errors);
						});
						_toastr2.default.error("Error Occured", fail);
					});
				}
			});
		};

		buh.prototype.fnInitMasterfiles = function fnInitMasterfiles(initType, output) {
			var _this7 = this;

			if (this.masterFilesLoaded == false) {
				this._toastr = _toastr2.default;
				_toastr2.default.info("Masterfiles...", "Loading please wait..", { timeOut: 15000 });
				this.loginDisabled = true;
				(0, _masterfiles.loadMasterfiles)().then(function () {
					(0, _masterfiles.loadLookups)().then(function () {

						_this7.masterFilesLoaded = true;

						_this7.fnPassUserObject(initType, output);
					});
				});
			} else {
				this.fnPassUserObject(initType, output);
			}
		};

		buh.prototype.fnLogin = function fnLogin() {
			var _this8 = this;

			this.dialogService.open({
				viewModel: _login.login
			}).whenClosed(function (response) {

				if (!response.wasCancelled) {
					_this8.fnInitMasterfiles(1, response.output);
				} else {}
			});
		};

		buh.prototype.fnPassUserObject = function fnPassUserObject(initType, output) {

			if (initType == 1) {} else {
				var varCookie = (0, _helpers.checkCookie)("PPMS_USER");
				var varSplitCookie = varCookie.split('^');
				this._user = {
					USER_ID: varSplitCookie[0],
					COMPANY_ID: varSplitCookie[1],
					Is_HR: varSplitCookie[2],
					Is_Branch: varSplitCookie[0]
				};

				this.loginDisabled = true;
				this.logoutDisabled = false;
				this.showingLogout = "visible";
				_toastr2.default.clear();
				_toastr2.default.success("Let's Start...", "Success");
				this._disableAdd = false;
				this._disableSearch = false;
				return;
			}

			this.LoginPassed(output);
		};

		buh.prototype.LoginPassed = function LoginPassed(user) {

			this._user = user;

			(0, _helpers.setCookie)("PPMS_USER", user.USER_ID + "^" + user.COMPANY_ID + "^" + user.Is_HR + "^" + user.Is_Branch, 30);
			_toastr2.default.clear();
			_toastr2.default.success("Let's Start...", "Success");

			this.logoutDisabled = false;
			this.loginDisabled = true;

			this.showingLogout = "visible";
			this._disableAdd = false;
			this._disableSearch = false;
		};

		buh.prototype.logout = function logout() {
			this.fnCRUD("cancel");
			this._disableAdd = true;
			this._disableSearch = true;
			this.loginDisabled = false;
			this.logoutDisabled = true;

			this._user = {};
			(0, _helpers.removeCookie)();
			this.showingLogout = "hidden";
			this.fnLogin();
		};

		return buh;
	}()) || _class);
});
define('ppfcs/cache_budget',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var cache_budget = exports.cache_budget = function cache_budget() {
        _classCallCheck(this, cache_budget);

        this.HEADER = {};
        this.REGULAR = [];
        this.SEMI_REGULAR = [];
        this.STAFF = [];
        this.GUEST = [];
        this.USER = {};
        this.TOTAL = 0;
        this.STATUS = "NONE";
        this.IS_COPYING = false;
        this._INPUT_AMT_REGULAR = 0;
        this._INPUT_AMT_SEMI_REGULAR = 0;
        this._INPUT_AMT_STAFF = 0;
        this._INPUT_AMT_GUEST = 0;
        this._INPUT_AMT_TOTAL = 0;
        this.IS_COPYING = false;
        this._LOADING_BUDGET = 0;
        this.CALLER = { ACTION: null, ACTION_CALLER: null, VALUE1: null, VALUE2: null, VALUE3: null, VALUE4: null };
        this.OBSERVERS = {
            pass_group: [],
            pass_indiv: [],
            enable_approved: [],
            copy_template_guest: [],
            copy_template: [],
            budget_refresh: [],
            reset_all: [],
            refreshPersonnelTab: [],
            reset_summary: [],
            budget_loaded: [],
            disable_search_personnel: [],
            pass_job: []
        };
    };
});
define('ppid/obj_personnel',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var obj_personnel = exports.obj_personnel = function obj_personnel() {
		_classCallCheck(this, obj_personnel);

		this.global_indiv_id = "";
		this.editing_status = "";
		this.HEADER = {
			citizenship: [],
			group: []
		};
		this.CONTACT = {
			status: "",
			modelAddress: {},
			statusContact: "Add",
			modelContact: {},
			modelInternet: {},
			address: [],
			contact: [],
			email: [],
			website: []
		};
		this.EDUCATIONAL_ACHIEVEMENT = {
			status: "",
			model: {},
			list: []
		};
		this.CHARACTERISTIC = [];
		this.SKILLS = [];
		this.LANGUAGE_DIALECT = [];
		this.MEDICAL_RECORD = [];
		this.RELATIVE = {
			parents: {
				mother: {},
				father: {}
			}
		};
		this.WORK_EXPERIENCE = {
			model: {},
			list: []
		};
		this.AWARDS = [];
		this.SEMINARS = [];
		this.GOVERNMENT_INFO = {
			modelTaxAffidavit: {},
			modelPermit: {},
			tax_affidavit: [],
			permits: []
		};
		this.GOVERNMENT_EXAM = [];
		this.CRIMINAL_RECORD = [];
		this.COMPANY_SPECIFIC = {
			model: {
				personnel_bank: {}
			},
			list: []
		};
		this.ENDORSEMENT = [];
		this.IMAGE_BRANDING = [];
		this.QUESTION_ANSWER = [];
		this.USER = {};
		this.OBSERVERS = {
			ppid_dialog: [],
			tab_changed: [],
			clear_ppid: [],
			clear_log: [],
			clear_login_modal: [],
			maintab_contact_clicked: [],
			maintab_education_clicked: [],
			company_main_clicked: [],
			company_work_exp_clicked: [],
			govinfo_main_clicked: [],
			relative_parents_clicked: []

		};
		this.STATUS = [];
		this.CIVIL_STATUS = [];
		this.CITIZENSHIP = [];
		this.RELIGION = [];
		this.COUNTRY = [];
		this.REGION = [];
		this.GROUP = [];
		this.LOCATIONS = [];
		this.CONTACT_TYPE = [];
		this.LEVEL = [];
		this.YEAR = [];
		this.SCHOOLS = [];
		this.LANGUAGE = [];
		this.POSITION = [];
		this.AWARD = [];
		this.TRAINING = [];
		this.TAX_EXEMPT = [];
		this.INPUT_TAX = [];
		this.PERMIT = [];
		this.VAT_STAT = [];
		this.EXAM = [];
		this.CASE_STAT = [];
		this.VIOLATION = [];
		this.PROFESSIONAL_TYPE = [];
		this.CESSATION = [];
		this.TARGET_MARKET = [];
		this.COMPANY = [];
		this.DIVISION = [];
		this.LOCATIONS_RNG = [];
		this.CATEGORY = [];
		this.JOB_GROUP = [];
		this.JOB = [];
		this.PAYROLL_GROUP = [];
		this.BANK = [];
		this.PROVINCE = [];
	};
});
define('ppid/ppid',['exports', '.././helpers', 'toastr', 'aurelia-framework', './obj_personnel', 'aurelia-dialog', './modals/ppid_search', '../entity-manager-factory', '../masterfiles', 'settings'], function (exports, _helpers, _toastr, _aureliaFramework, _obj_personnel, _aureliaDialog, _ppid_search, _entityManagerFactory, _masterfiles, _settings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ppid = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	var _settings2 = _interopRequireDefault(_settings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var ppid = exports.ppid = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService, _obj_personnel.obj_personnel), _dec(_class = function () {
		function ppid(dialogService, obj_personnel) {
			_classCallCheck(this, ppid);

			this.obj_personnel = null;
			this.global_indiv_id = "";

			this.dialogService = dialogService;
			this.obj_personnel = obj_personnel;

			this.obj_personnel.OBSERVERS.ppid_dialog.length = 0;
			this.obj_personnel.OBSERVERS.tab_changed.length = 0;
			this.obj_personnel.OBSERVERS.maintab_contact_clicked.length = 0;
			this.obj_personnel.OBSERVERS.maintab_education_clicked.length = 0;
			this.obj_personnel.OBSERVERS.relative_parents_clicked.length = 0;
			this.obj_personnel.OBSERVERS.govinfo_main_clicked.length = 0;
			this.obj_personnel.OBSERVERS.company_main_clicked.length = 0;
			this.obj_personnel.OBSERVERS.company_work_exp_clicked.length = 0;
			this.obj_personnel.OBSERVERS.clear_ppid.length = 0;
			this.obj_personnel.global_indiv_id = "";
			this.obj_personnel.HEADER = {
				citizenship: [],
				group: []
			};
			this.LoadDropdown();

			this.LoginPassed(this.obj_personnel.USER);
		}

		ppid.prototype.LoadDropdown = function LoadDropdown() {
			var _this = this;

			_settings2.default.isNavigating = true;

			var maxYear = new Date().getFullYear();
			var leastYear = 1960;
			var tmpYear = [];
			do {
				tmpYear.push({
					value: leastYear,
					text: leastYear
				});
				leastYear++;
			} while (leastYear <= maxYear);
			this.obj_personnel.YEAR = tmpYear;

			if ((0, _masterfiles.getLookups)() != null) {
				this.obj_personnel.LOCATIONS = (0, _masterfiles.getLookups)().LOCATION_MSTR;
				this.obj_personnel.LOCATIONS.shift();

				this.obj_personnel.CIVIL_STATUS.length = 0;
				this.obj_personnel.RELIGION.length = 0;
				this.obj_personnel.CITIZENSHIP.length = 0;
				this.obj_personnel.CONTACT_TYPE.length = 0;
				this.obj_personnel.LEVEL.length = 0;
				this.obj_personnel.LANGUAGE.length = 0;
				this.obj_personnel.STATUS.length = 0;
				this.obj_personnel.POSITION.length = 0;
				this.obj_personnel.AWARD.length = 0;
				this.obj_personnel.TRAINING.length = 0;
				this.obj_personnel.TAX_EXEMPT.length = 0;
				this.obj_personnel.INPUT_TAX.length = 0;
				this.obj_personnel.PERMIT.length = 0;
				this.obj_personnel.VAT_STAT.length = 0;
				this.obj_personnel.EXAM.length = 0;
				this.obj_personnel.CASE_STAT.length = 0;
				this.obj_personnel.VIOLATION.length = 0;
				this.obj_personnel.PROFESSIONAL_TYPE.length = 0;
				this.obj_personnel.CESSATION.length = 0;
				this.obj_personnel.TARGET_MARKET.length = 0;

				(0, _masterfiles.getLookups)().REFERENCE_CD_MSTR.forEach(function (item) {
					switch (item.REF_GRP_CD) {
						case "CIVIL_STATUS":
							_this.obj_personnel.CIVIL_STATUS.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "RELIGION_CD":
							_this.obj_personnel.RELIGION.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "CITIZENSHIP_CD":
							_this.obj_personnel.CITIZENSHIP.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "CONTACT_TYPE_CD":
							_this.obj_personnel.CONTACT_TYPE.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "LEVEL_CD":
							_this.obj_personnel.LEVEL.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "LANG_DIALECT_CD":
							_this.obj_personnel.LANGUAGE.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "STATUS_CD":
							_this.obj_personnel.STATUS.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "POSITION_CD":
							_this.obj_personnel.POSITION.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "AWARD_CD":
							_this.obj_personnel.AWARD.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "TRNG_CD":
							_this.obj_personnel.TRAINING.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "TAX_EXEMPT_CD":
							_this.obj_personnel.TAX_EXEMPT.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "INPUT_TAX_CD":
							_this.obj_personnel.INPUT_TAX.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "PERMIT_CD":
							_this.obj_personnel.PERMIT.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "VAT_STAT_CD":
							_this.obj_personnel.VAT_STAT.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "EXAM_CD":
							_this.obj_personnel.EXAM.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "CASE_STAT_CD":
							_this.obj_personnel.CASE_STAT.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "VIOLATION_CD":
							_this.obj_personnel.VIOLATION.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "PROFESSIONAL_TYPE_CD":
							_this.obj_personnel.PROFESSIONAL_TYPE.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "CESSATION_CODE":
							_this.obj_personnel.CESSATION.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;
						case "TARGET_MARKET_CD":
							_this.obj_personnel.TARGET_MARKET.push({
								value: item.REF_CD,
								text: item.REF_DESC
							});
							break;

					}
				});

				this.obj_personnel.GROUP.length = 0;
				(0, _masterfiles.getLookups)().GLOBAL_GRP_MSTR.forEach(function (item) {
					_this.obj_personnel.GROUP.push({
						value: item.GLOBAL_GRP_ID,
						text: item.GROUP_NAME
					});
				});

				this.obj_personnel.COMPANY.length = 0;
				(0, _masterfiles.getLookups)().COMPANY_MSTR.forEach(function (item) {
					_this.obj_personnel.COMPANY.push({
						id: item.COMPANY_ID,
						value: item.COMPANY_CD,
						text: item.COMPANY_NAME
					});
				});
				this.obj_personnel.COMPANY.shift();

				this.obj_personnel.GROUP.sort(this.OrderByText);
				this.obj_personnel.CIVIL_STATUS.sort(this.OrderByText);
				this.obj_personnel.RELIGION.sort(this.OrderByText);
				this.obj_personnel.CITIZENSHIP.sort(this.OrderByText);
				this.obj_personnel.CONTACT_TYPE.sort(this.OrderByText);
				this.obj_personnel.LEVEL.sort(this.OrderByText);
				this.obj_personnel.LANGUAGE.sort(this.OrderByText);
				this.obj_personnel.STATUS.sort(this.OrderByText);
				this.obj_personnel.POSITION.sort(this.OrderByText);
				this.obj_personnel.AWARD.sort(this.OrderByText);
				this.obj_personnel.TRAINING.sort(this.OrderByText);
				this.obj_personnel.PERMIT.sort(this.OrderByText);
				this.obj_personnel.TAX_EXEMPT.sort(this.OrderByText);
				this.obj_personnel.INPUT_TAX.sort(this.OrderByText);
				this.obj_personnel.EXAM.sort(this.OrderByText);
				this.obj_personnel.VIOLATION.sort(this.OrderByText);
				this.obj_personnel.PROFESSIONAL_TYPE.sort(this.OrderByText);
				this.obj_personnel.CESSATION.sort(this.OrderByText);
				this.obj_personnel.TARGET_MARKET.sort(this.OrderByText);
				this.obj_personnel.COMPANY.sort(this.OrderByText);
			}

			var _query = (0, _entityManagerFactory.EntityQuery)().from('COUNTRY_MSTR').orderBy('COUNTRY_NAME').select('COUNTRY_CD, COUNTRY_NAME');
			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				var tmp = [];
				_.each(success.results, function (result) {
					tmp.push({
						value: result.COUNTRY_CD,
						text: result.COUNTRY_NAME
					});
				});
				_this.obj_personnel.COUNTRY = tmp;
			}, function (failed) {
				_toastr2.default.error(failed, 'Error in loading country dropdown.');
			});

			_query = (0, _entityManagerFactory.EntityQuery)().from('REGION_MSTR').orderBy('REGION_DESC').select('REGION_CD, REGION_DESC, COUNTRY_CD');
			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				var tmp = [];
				_.each(success.results, function (result) {
					tmp.push({
						value: result.REGION_CD,
						text: result.REGION_DESC,
						group: result.COUNTRY_CD
					});
				});
				_this.obj_personnel.REGION = tmp;
			}, function (failed) {
				_toastr2.default.error(failed, 'Error in loading region dropdown.');
			});

			_query = (0, _entityManagerFactory.EntityQuery)().from("SCHOOL_MSTR").orderBy("SCHOOL_NAME").select("SCHOOL_CD, SCHOOL_NAME, SCHOOL_ADDR");
			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				var tmp = [];
				_.each(success.results, function (result) {
					tmp.push({
						school_cd: result.SCHOOL_CD,
						school_name: result.SCHOOL_NAME,
						school_addr: result.SCHOOL_ADDR
					});
				});
				_this.obj_personnel.SCHOOLS = tmp;
			}, function (failed) {
				_toastr2.default.error(failed, "Error in loading schools dropdown.");
				console.log(failed);
			});

			_query = (0, _entityManagerFactory.EntityQuery)().from("RNG_LOCATION_MSTR").orderBy("LOCATION_NAME");
			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				var tmp = [];
				_.each(success.results, function (result) {
					tmp.push({
						value: result.LOCATION_CD,
						text: result.LOCATION_NAME
					});
				});
				_this.obj_personnel.LOCATIONS_RNG = tmp;
			}, function (failed) {
				_toastr2.default.error(failed, "Error in loading RNG Locations dropdown");
			});

			_query = (0, _entityManagerFactory.EntityQuery)().from("PAYROLL_GRP_MSTR").orderBy("PAYROLL_GRP_DESC");
			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				var tmp = [];
				_.each(success.results, function (result) {
					tmp.push({
						id: result.PAYROLL_GRP_ID,
						value: result.PAYROLL_GRP_CD,
						text: result.PAYROLL_GRP_DESC
					});
				});
				_this.obj_personnel.PAYROLL_GROUP = tmp;
			}, function (failed) {
				_toastr2.default.error(failed, "Error in loading Payroll Group dropdown.");
			});

			_query = (0, _entityManagerFactory.EntityQuery)().from("BANK_MSTR").orderBy("BANK_SHORT_NAME");
			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				var tmp = [];
				_.each(success.results, function (result) {
					tmp.push({
						id: result.BANK_ID,
						short_nm: result.BANK_SHORT_NAME,
						bank_cd: result.BANK_CD,
						long_nm: result.BANK_LONG_NAME
					});
				});
				_this.obj_personnel.BANK = tmp;
			}, function (failed) {
				_toastr2.default.error(failed, "Error in loading Bank dropdown");
			});

			_query = (0, _entityManagerFactory.EntityQuery)().from("PROVINCE_MSTR").orderBy("PROVINCE_DESC");
			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				var tmp = [];
				_.each(success.results, function (r) {
					tmp.push({
						text: r.PROVINCE_DESC,
						value: r.PROVINCE_CD,
						group: r.REGION_CD
					});
				});
				_this.obj_personnel.PROVINCE = tmp;
			}, function (error) {
				_toastr2.default.error(error, "Error in loading Province dropdown.");
			});

			_settings2.default.isNavigating = false;
		};

		ppid.prototype.OrderByText = function OrderByText(a, b) {
			if (a.text.toUpperCase() < b.text.toUpperCase()) return -1;
			if (a.text.toUpperCase() > b.text.toUpperCase()) return 1;
			return 0;
		};

		ppid.prototype.changeTab = function changeTab(tabNumber) {
			var _this2 = this;

			if (this.obj_personnel.global_indiv_id == undefined || this.obj_personnel.global_indiv_id == null || this.obj_personnel.global_indiv_id.length == 0) return;

			this.obj_personnel.OBSERVERS.tab_changed.forEach(function (all) {
				all(tabNumber, _this2.obj_personnel.global_indiv_id);
			});
		};

		ppid.prototype.FindUsers = function FindUsers() {
			this.dialogService.open({
				viewModel: _ppid_search.ppid_search
			}).whenClosed(function (response) {
				if (!response.wasCancelled) {} else {}
			});
		};

		ppid.prototype.AddUsers = function AddUsers() {
			alert('AddUsers function under maintenance.');
		};

		ppid.prototype.LoginPassed = function LoginPassed(user) {};

		return ppid;
	}()) || _class);
});
define('tools/gridpaging',['exports', 'aurelia-framework', 'aurelia-binding', 'cache_obj'], function (exports, _aureliaFramework, _aureliaBinding, _cache_obj) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.gridpaging = undefined;

	function _initDefineProp(target, property, descriptor, context) {
		if (!descriptor) return;
		Object.defineProperty(target, property, {
			enumerable: descriptor.enumerable,
			configurable: descriptor.configurable,
			writable: descriptor.writable,
			value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
		});
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
		var desc = {};
		Object['ke' + 'ys'](descriptor).forEach(function (key) {
			desc[key] = descriptor[key];
		});
		desc.enumerable = !!desc.enumerable;
		desc.configurable = !!desc.configurable;

		if ('value' in desc || desc.initializer) {
			desc.writable = true;
		}

		desc = decorators.slice().reverse().reduce(function (desc, decorator) {
			return decorator(target, property, desc) || desc;
		}, desc);

		if (context && desc.initializer !== void 0) {
			desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
			desc.initializer = undefined;
		}

		if (desc.initializer === void 0) {
			Object['define' + 'Property'](target, property, desc);
			desc = null;
		}

		return desc;
	}

	function _initializerWarningHelper(descriptor, context) {
		throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
	}

	var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2, _descriptor3;

	var gridpaging = exports.gridpaging = (_dec = (0, _aureliaFramework.inject)(_aureliaBinding.ObserverLocator, _cache_obj.cache_obj), _dec(_class = (_class2 = function () {
		function gridpaging(observerLocator, cache_obj) {
			var _this = this;

			_classCallCheck(this, gridpaging);

			_initDefineProp(this, 'to', _descriptor, this);

			_initDefineProp(this, 'pageindex', _descriptor2, this);

			_initDefineProp(this, 'divby', _descriptor3, this);

			this.showing = false;
			this._buttonTitle = 'Search';
			this._isDisableElement = true;
			this._Pages = [[]];
			this._PagesShow = [];
			this._currentIndex = 0;

			this._cache_obj = cache_obj;

			var subscription = observerLocator.getObserver(this, 'to').subscribe(function () {
				_this.onChange();
			});

			this._cache_obj.OBSERVERS.enable_modal_button.push(function (id, val) {
				_this.enableButton(id, val);
			});
		}

		gridpaging.prototype.onChange = function onChange() {
			try {
				this._Pages = [];
				this._PagesShow = [];
				if (this.to != undefined && this.to != null) {

					var intByTmp = 0;
					var intDivTmp = 0;
					this._Pages.push([]);

					for (var i = 0; i <= Math.ceil(this.to / this.divby) - 1; ++i) {

						if (intDivTmp >= 10) {

							this._Pages.push([]);
							++intByTmp;
							intDivTmp = 1;
						} else ++intDivTmp;

						this._Pages[intByTmp].push(i + 1);
					}

					this._PagesShow = this._Pages[0];
					this._currentIndex = 0;
					this.pageindex = 0;
				}
			} catch (e) {
				console.log(e);
			}
		};

		gridpaging.prototype.endClick = function endClick(endValue) {

			if (endValue == 0 && this._currentIndex > 0) {
				--this._currentIndex;
			} else if (endValue == 1 && this._currentIndex < this._Pages.length - 1) {
				++this._currentIndex;
			} else {
				return;
			}

			this._PagesShow = this._Pages[this._currentIndex];

			this.pageindex = this._Pages[this._currentIndex][0] - 1;
		};

		gridpaging.prototype.selectedClick = function selectedClick(endValue) {
			this.pageindex = this._Pages[this._currentIndex][endValue] - 1;
		};

		gridpaging.prototype.InitializeModal = function InitializeModal() {};

		gridpaging.prototype.enableButton = function enableButton(id, isEnabled) {
			if (this._id == id) this._isDisableElement = !isEnabled;
		};

		return gridpaging;
	}(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'to', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'pageindex', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, 'divby', [_aureliaFramework.bindable], {
		enumerable: true,
		initializer: null
	})), _class2)) || _class);
});
define('ppfcs/actual_cost/actual_cost',['exports', 'aurelia-framework', 'cache_obj', 'settings'], function (exports, _aureliaFramework, _cache_obj, _settings) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.actual_cost = undefined;

    var _settings2 = _interopRequireDefault(_settings);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var actual_cost = exports.actual_cost = (_dec = (0, _aureliaFramework.inject)(_cache_obj.cache_obj), _dec(_class = function actual_cost(cache_obj) {
        _classCallCheck(this, actual_cost);

        this._cache_obj = cache_obj;
    }) || _class);
});
define('ppfcs/budget/guest',['exports', 'aurelia-framework', 'ppfcs/cache_budget', 'entity-manager-factory', 'masterfiles', 'helpers', 'typeahead', 'settings', 'underscore', 'numeral', 'toastr', 'multi-observer', '../../modals/paymentterm', 'aurelia-dialog', 'cache_obj'], function (exports, _aureliaFramework, _cache_budget, _entityManagerFactory, _masterfiles, _helpers, _typeahead, _settings, _underscore, _numeral, _toastr, _multiObserver, _paymentterm, _aureliaDialog, _cache_obj) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.GuestCustomElement = undefined;

  var _typeahead2 = _interopRequireDefault(_typeahead);

  var _settings2 = _interopRequireDefault(_settings);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _numeral2 = _interopRequireDefault(_numeral);

  var _toastr2 = _interopRequireDefault(_toastr);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var GuestCustomElement = exports.GuestCustomElement = (_dec = (0, _aureliaFramework.inject)(_cache_obj.cache_obj, _cache_budget.cache_budget, _multiObserver.MultiObserver, _aureliaDialog.DialogService), _dec(_class = (_class2 = function () {
    function GuestCustomElement(cache_obj, cache_budget, multiObserver, dialogService) {
      var _this = this;

      _classCallCheck(this, GuestCustomElement);

      _initDefineProp(this, 'to', _descriptor, this);

      this._cache_budget = null;
      this._enableAdd = false;
      this._enableRemove = false;
      this.dialogService = null;
      this._cache_obj = null;

      if ((0, _entityManagerFactory.EntityManager)() === undefined) {
        return;
      }

      this._cache_budget = cache_budget;
      this.dialogService = dialogService;
      this._cache_obj = cache_obj;

      this._cache_obj.OBSERVERS.budget_dialog.push(function (val) {
        _this.fnCheckBudget(val);
      });

      this._cache_budget.OBSERVERS.copy_template_guest.push(function () {
        _this.fnCallCopy();
      });

      this._cache_budget.OBSERVERS.reset_all.push(function () {
        _this.resetView();
      });

      this._PYMNTTERM = (0, _masterfiles.getLookups)().PAYMENT_TERM;
    }

    GuestCustomElement.prototype.fnModalPaymentTerm = function fnModalPaymentTerm() {
      var _this2 = this;

      this.dialogService.open({
        viewModel: _paymentterm.paymentterm
      }).whenClosed(function (response) {

        if (!response.wasCancelled) {
          _this2.passTerm(response.output);
        } else {}
      });
    };

    GuestCustomElement.prototype.passTerm = function passTerm(term) {
      this._cache_budget.GUEST[0].PAYMENT_TERM = term.REF_DESC;
      this._cache_budget.GUEST[0].PYMNT_TERM_CD = term.REF_CD;
    };

    GuestCustomElement.prototype.fnCheckBudget = function fnCheckBudget(value) {
      var _this3 = this;

      var _query = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_GUEST_DTL').where('BDGT_TMPL_ID', '==', value);
      (0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (found) {

        _this3._cache_budget.GUEST = found.results;

        var varRefCd = [];

        _underscore2.default.each(_this3._cache_budget.GUEST, function (item) {

          for (var i = 0; i <= _this3._PYMNTTERM.length - 1; ++i) {
            if (_this3._PYMNTTERM[i].REF_CD == item.PYMNT_TERM_CD) {
              item.PAYMENT_TERM = _this3._PYMNTTERM[i].REF_DESC;
              break;
            }
          };

          item.PAY_RATE_FACTOR_TMP = (0, _numeral2.default)(item.PAY_RATE_FACTOR).format('0,0.00');
          item.INPUT_AMT_TMP = (0, _numeral2.default)(item.INPUT_AMT).format('0,0.00');
          item.visible = true;
        });

        _this3._enableAdd = false;
        _this3._enableRemove = false;

        if (_this3._cache_budget.GUEST.length == 0) _this3._enableAdd = true;else _this3._enableRemove = true;

        _this3._cache_budget.OBSERVERS.reset_summary.forEach(function (all) {
          all();
        });

        if (_this3._cache_budget.GUEST.length > 0) _toastr2.default.success("GUEST PERSONNEL", "Loading Successful.");
      });
    };

    GuestCustomElement.prototype.fnCallCopy = function fnCallCopy() {
      this.saveGuest();
    };

    GuestCustomElement.prototype.fnAddGuest = function fnAddGuest() {
      if (this._cache_budget.GUEST.length > 0) {
        this._cache_budget.GUEST[0].visible = true;
      } else this._cache_budget.GUEST.push({ INPUT_AMT_TMP: (0, _numeral2.default)(0).format('0,0.00'), PAY_RATE_FACTOR_TMP: (0, _numeral2.default)(1).format('0,0.00'),
        INPUT_AMT: 0, PAY_RATE_FACTOR: 1, visible: true });

      this._enableAdd = false;
      this._enableRemove = true;
      this._signal = (0, _entityManagerFactory.generateID)();
    };

    GuestCustomElement.prototype.resetView = function resetView() {
      this._signal = (0, _entityManagerFactory.generateID)();
    };

    GuestCustomElement.prototype.fnRemoveGuest = function fnRemoveGuest() {
      if (this._cache_budget.GUEST.length > 0) {
        this._cache_budget.GUEST[0].visible = false;
      }

      this._enableAdd = true;
      this._enableRemove = false;
      this._signal = (0, _entityManagerFactory.generateID)();
    };

    GuestCustomElement.prototype.saveGuest = function saveGuest() {
      var _this4 = this;

      if (this._cache_budget.GUEST.length > 0) {
        if (this._cache_budget.GUEST[0].PYMNT_TERM_CD == "" || this._cache_budget.GUEST[0] == undefined || this._cache_budget.GUEST[0] == null) {
          _toastr2.default.error("<strong>Payment Term not defined</strong><br /><br />Saving cancelled.", "Problem occured");
          return;
        }
      }

      var getMax = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_GUEST_DTL').orderByDesc('BDGT_TMPL_GUEST_DTL_ID').take(1);
      (0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (successMax) {
        var getMax = 1;

        if (successMax.results.length > 0) getMax = successMax.results[0].BDGT_TMPL_GUEST_DTL_ID + 1;

        var _query = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_GUEST_DTL').where('BDGT_TMPL_ID', '==', _this4._cache_budget.HEADER.BDGT_TMPL_ID);
        (0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (found) {

          if (_this4._cache_budget.GUEST.length > 0) if (_this4._cache_budget.GUEST[0].visible) {

            if (found.results.length > 0) {

              found.results[0].BDGT_AMT = parseFloat(_this4._cache_budget.GUEST[0].INPUT_AMT_TMP.replace(/,/g, ''));
              found.results[0].PYMNT_TERM_CD = _this4._cache_budget.GUEST[0].PYMNT_TERM_CD;
              found.results[0].INPUT_AMT = parseFloat(_this4._cache_budget.GUEST[0].INPUT_AMT_TMP.replace(/,/g, ''));
              found.results[0].PAY_RATE_FACTOR = parseFloat(_this4._cache_budget.GUEST[0].PAY_RATE_FACTOR_TMP.replace(/,/g, ''));
              found.results[0].REMARKS = _this4._cache_budget.GUEST[0].REMARKS;

              found.results[0].LAST_UPDATED_BY = _this4._cache_obj.USER.USER_ID;
              found.results[0].LAST_UPDATED_DT = new Date();
            } else {

              var varInsert = (0, _entityManagerFactory.EntityManager)().createEntity('BDGT_TMPL_GUEST_DTL', {
                BDGT_TMPL_GUEST_DTL_ID: getMax,
                PYMNT_TERM_CD: _this4._cache_budget.GUEST[0].PYMNT_TERM_CD,
                INPUT_AMT: parseFloat(_this4._cache_budget.GUEST[0].INPUT_AMT_TMP.replace(/,/g, '')),
                BDGT_AMT: parseFloat(_this4._cache_budget.GUEST[0].INPUT_AMT_TMP.replace(/,/g, '')),
                PAY_RATE_FACTOR: parseFloat(_this4._cache_budget.GUEST[0].PAY_RATE_FACTOR_TMP.replace(/,/g, '')),
                REMARKS: _this4._cache_budget.GUEST[0].REMARKS,
                BDGT_TMPL_ID: _this4._cache_budget.HEADER.BDGT_TMPL_ID,
                CREATED_BY: _this4._cache_obj.USER.USER_ID,
                CREATED_DT: new Date(),
                LAST_UPDATED_BY: _this4._cache_obj.USER.USER_ID,
                LAST_UPDATED_DT: new Date()
              });

              (0, _entityManagerFactory.EntityManager)().addEntity(varInsert);
            }
          } else {
            if (found.results.length > 0) found.results[0].entityAspect.setDeleted();
          }

          (0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {
            _this4.fnCheckBudget(_this4._cache_budget.HEADER.BDGT_TMPL_ID);
            _toastr2.default.success("Succesfully Saved", "GUEST");
          }, function (fail) {

            (0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
              var errors = entity.entityAspect.getValidationErrors();
              if (errors.length > 0) console.log(errors);
            });
            console.log(fail);
            _toastr2.default.error("Error Occured", fail);
          });
        });
      });
    };

    GuestCustomElement.prototype.fnRegularBlurEvt = function fnRegularBlurEvt(item, index) {};

    GuestCustomElement.prototype.fnRegularFocus = function fnRegularFocus(index, prop) {

      this.fnModalPaymentTerm();
    };

    GuestCustomElement.prototype.AmountBlur = function AmountBlur(item, property) {
      var varConverted = (0, _numeral2.default)(item[property]).format('0,0.00');
      item[property] = varConverted;
    };

    return GuestCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'to', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('ppfcs/budget/main-header',['exports', 'aurelia-framework', 'cache_obj', 'ppfcs/cache_budget', 'entity-manager-factory', 'masterfiles', 'settings', 'modals/modal-wizard', 'toastr', 'moment', 'underscore', 'multi-observer', 'aurelia-dialog', '../../modals/program', '../../modals/budget', '../../modals/confirm_dialog', 'breeze-client'], function (exports, _aureliaFramework, _cache_obj, _cache_budget, _entityManagerFactory, _masterfiles, _settings, _modalWizard, _toastr, _moment, _underscore, _multiObserver, _aureliaDialog, _program, _budget, _confirm_dialog, _breezeClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MainHeaderCustomElement = undefined;

  var _settings2 = _interopRequireDefault(_settings);

  var _toastr2 = _interopRequireDefault(_toastr);

  var _moment2 = _interopRequireDefault(_moment);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _breezeClient2 = _interopRequireDefault(_breezeClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var MainHeaderCustomElement = exports.MainHeaderCustomElement = (_dec = (0, _aureliaFramework.inject)(_cache_obj.cache_obj, _cache_budget.cache_budget, _modalWizard.ModalWizard, _toastr2.default, _multiObserver.MultiObserver, _aureliaDialog.DialogService), _dec(_class = (_class2 = function () {
    function MainHeaderCustomElement(cache_obj, cache_budget, ModalWizard, toastr, multiObserver, DialogService) {
      var _this = this;

      _classCallCheck(this, MainHeaderCustomElement);

      _initDefineProp(this, 'to', _descriptor, this);

      this._cache_obj = null;
      this._PROGRAM_GENRE_MSTR = [];
      this._TELECAST_MODE_MSTR = [];
      this._EPISODE_TYPE_MSTR = [];
      this._STATIONS = [];
      this._disableCreateBudget = false;
      this._disableCancelBudget = true;
      this._disableRefreshBudget = true;
      this._disableSaveBudget = true;
      this._disableBudgetId = false;
      this._disablePrintBudget = true;
      this._disableCopyBudget = true;
      this.dialogService = null;
      this.programDisabled = true;
      this.budgetDisabled = false;

      if ((0, _entityManagerFactory.EntityManager)() === undefined) {

        return;
      }

      this.dialogService = DialogService;
      this._cache_obj = cache_obj;
      this._cache_budget = cache_budget;

      this.LoginPassed(this._cache_obj.USER);

      this._cache_obj.OBSERVERS.budget_dialog.push(function (val) {
        _this.CloseBudgetDialog(val);
      });

      this._cache_obj.OBSERVERS.pass_program.push(function (val) {
        _this.PassedProgram(val);
      });

      this._cache_budget.OBSERVERS.budget_refresh.push(function () {
        _this.fnBudgetRefreshHandle();
      });

      this._cache_budget.OBSERVERS.budget_loaded.push(function () {
        if (_this._disableSaveBudget == true) {
          _this._disableSaveBudget = false;
          _this._disableCopyBudget = false;
          _settings2.default.isNavigating = false;
          toastr.success("Budget has been successfully loaded.", "Budget Template");
        }
      });

      this._toastr = toastr;

      this.fnClearHeader();

      this._disableCreateBudget = false;
      this._disableCancelBudget = true;
      this._disableRefreshBudget = true;
      this._disableSaveBudget = true;
      this._disableBudgetId = false;
      this._disablePrintBudget = true;
      this._disableCopyBudget = true;
      this._ModalWizard = ModalWizard;

      setTimeout(function () {

        $('.datepicker').datepicker();

        $('#refFrom').datepicker({
          format: "mm/dd/yyyy"
        }).on("changeDate", function () {

          if (new Date($('#refFrom').val()) > new Date($('#refTo').val())) {
            toastr.error("Invalid date range.", "Date Change..");
            $('#refTo').datepicker("setValue", new Date($('#refFrom').val()));
            return;
          }

          _this._cache_budget.HEADER.BDGT_FROM = $('#refFrom').val();
          if (_this._cache_budget.HEADER.BDGT_TO == "") {
            _this._cache_budget.HEADER.BDGT_TO = _this._cache_budget.HEADER.BDGT_FROM;
          }

          $('#refFrom').datepicker('hide');
        });

        $('#refTo').datepicker({
          format: "mm/dd/yyyy"
        }).on("changeDate", function () {

          if (new Date($('#refTo').val()) < new Date($('#refFrom').val())) {
            toastr.error("Invalid date range.", "Date Change..");
            $('#refFrom').datepicker("setValue", new Date($('#refTo').val()));
            return;
          }

          _this._cache_budget.HEADER.BDGT_TO = $('#refTo').val();
          $('#refTo').datepicker('hide');
        });
      }, 1000);

      var varToday = new Date(Date.now());
      var p1 = _breezeClient2.default.Predicate.create('BDGT_TO', '<=', new Date(varToday.getFullYear(), varToday.getMonth(), varToday.getDate()));
      var p2 = _breezeClient2.default.Predicate.create('APPR_STAT_CD', '==', "APP-APPROVED");
      var pred = _breezeClient2.default.Predicate.and([p1, p2]);

      var checkExpired = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').where(pred);

      (0, _entityManagerFactory.EntityManager)().executeQuery(checkExpired).then(function (success) {
        success.results.forEach(function (all) {
          all.APPR_STAT_CD = "APP-EXPIRED";
          all.LAST_UPDATED_BY = "ADMIN";
          all.LAST_UPDATED_DT = new Date(Date.now());
        });

        (0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {}, function (fail) {
          console.log(fail);
        });
      });
    }

    MainHeaderCustomElement.prototype.checkDate = function checkDate(id) {

      setTimeout(function () {
        if (!Date.parse($("#" + id).val())) {
          _toastr2.default.error("Invalid starting date ", "Date Change..");
        } else {
          $("#" + id).datepicker("setValue", new Date($("#" + id).val()));
        }
      }, 1000);
    };

    MainHeaderCustomElement.prototype.validate = function validate() {};

    MainHeaderCustomElement.prototype.inputChanged = function inputChanged(evt, value) {
      var _this2 = this;

      if (evt.keyCode == 13) {

        this._cache_obj.OBSERVERS.budget_dialog.forEach(function (all) {
          all(_this2._cache_budget.HEADER.BDGT_TMPL_ID);
        });
      }
    };

    MainHeaderCustomElement.prototype.LoginPassed = function LoginPassed(user) {

      if (user.USER_ID == undefined) return;
      this._user = user.USER_ID;
      this._COMPANY_ID = user.COMPANY_ID;

      this.budgetDisabled = false;

      this.programDisabled = true;


      this.fnClearBudget();

      this._disableCreateBudget = false;
      this._disableCancelBudget = true;
      this._disableRefreshBudget = true;
      this._disableSaveBudget = true;
      this._disablePrintBudget = true;
      this._disableCopyBudget = true;
    };

    MainHeaderCustomElement.prototype.LoggedOut = function LoggedOut() {

      this._disableCreateBudget = true;
      this._disableCancelBudget = true;
      this._disableRefreshBudget = true;
      this._disableSaveBudget = true;
      this._disablePrintBudget = true;
      this._disableCopyBudget = true;

      this.budgetDisabled = false;


      this.programDisabled = true;


      this.fnClearHeader();
    };

    MainHeaderCustomElement.prototype.fnClearHeader = function fnClearHeader() {
      this._cache_budget.HEADER = {
        BDGT_TMPL_ID: "",

        CHARGE_CD: "",
        PROGRAM_GENRE_CD: "",
        TELECAST_MODE_CD: "",
        EPISODE_TYPE_CD: "",
        EPISODES: "",
        TAPING_DAYS: "",
        BDGT_FROM: "",
        BDGT_TO: "",
        STATION_ID: "",
        APPR_STAT_CD: "",
        REMARKS: ""
      };

      while (this._cache_budget.REGULAR.length > 0) {
        this._cache_budget.REGULAR.pop();
      }
      this._cache_budget.REGULAR = [];

      while (this._cache_budget.SEMI_REGULAR.length > 0) {
        this._cache_budget.SEMI_REGULAR.pop();
      }
      this._cache_budget.SEMI_REGULAR = [];

      while (this._cache_budget.STAFF.length > 0) {
        this._cache_budget.STAFF.pop();
      }
      this._cache_budget.STAFF = [];

      while (this._cache_budget.GUEST.length > 0) {
        this._cache_budget.GUEST.pop();
      }

      this._cache_budget.GUEST = [];

      this._cache_budget.OBSERVERS.reset_summary.forEach(function (all) {
        all();
      });

      this._disableBudgetId = false;

      this._cache_budget.OBSERVERS.reset_all.forEach(function (all) {
        all();
      });
    };

    MainHeaderCustomElement.prototype.fnClearBudget = function fnClearBudget() {
      this.fnClearHeader();

      this._PROGRAM_GENRE_MSTR = (0, _masterfiles.getLookups)().PROGRAM_GENRE_MSTR;
      this._PROGRAM_GENRE_MSTR.unshift({});
      this._TELECAST_MODE_MSTR = (0, _masterfiles.getLookups)().TELECAST_MODE_MSTR;
      this._TELECAST_MODE_MSTR.unshift({});
      this._EPISODE_TYPE_MSTR = (0, _masterfiles.getLookups)().EPISODE_TYPE_MSTR;
      this._EPISODE_TYPE_MSTR.unshift({});
      this._STATIONS = _settings2.default.STATIONS;

      this._STATUS = [{}];
    };

    MainHeaderCustomElement.prototype.CloseBudgetDialog = function CloseBudgetDialog(value) {
      var _this3 = this;

      var _query = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').where('BDGT_TMPL_ID', '==', value).expand('PROGRAM_MSTR').select('BDGT_TMPL_ID, PROGRAM_MSTR, CHARGE_CD, PROGRAM_GENRE_CD,  TELECAST_MODE_CD,  EPISODE_TYPE_CD,   EPISODES,  TAPING_DAYS, BDGT_FROM, BDGT_TO, STATION_ID, APPR_STAT_CD, REMARKS, CREATED_BY, LAST_UPDATED_BY ');

      (0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (found) {

        _this3._STATUS = [{ REF_CD: "APP-DRAFT", REF_DESC: "APP-DRAFT" }, { REF_CD: "APP-APPROVED", REF_DESC: "APP-APPROVED" }];

        if (found.results.length == 0) return;

        _this3._cache_budget.HEADER = found.results[0];

        _this3._cache_budget.HEADER.BDGT_FROM = (0, _moment2.default)(new Date(_this3._cache_budget.HEADER.BDGT_FROM)).format('MM-DD-YYYY');
        _this3._cache_budget.HEADER.BDGT_TO = (0, _moment2.default)(new Date(_this3._cache_budget.HEADER.BDGT_TO)).format('MM-DD-YYYY');

        _this3._disableBudgetId = true;

        _this3._disableCreateBudget = true;
        _this3._disableCancelBudget = false;
        _this3._disableRefreshBudget = false;

        _this3._cache_budget._LOADING_BUDGET = 1;
        _this3._disableSaveBudget = true;

        _this3._disablePrintBudget = false;
        _this3._disableCopyBudget = true;

        _this3.budgetDisabled = true;


        if (_this3._cache_budget.HEADER.APPR_STAT_CD == "APP-CLOSED") {
          _this3._STATUS = [{ REF_CD: "APP-CLOSED", REF_DESC: "APP-CLOSED" }];
          _this3._disableSaveBudget = true;
        } else if (_this3._cache_budget.HEADER.APPR_STAT_CD == "APP-EXPIRED") {
          _this3._STATUS = [{ REF_CD: "APP-EXPIRED", REF_DESC: "APP-EXPIRED" }];
          _this3._disableSaveBudget = true;
          _this3._disablePrintBudget = true;
        } else if (_this3._cache_budget.HEADER.APPR_STAT_CD == "APP-DRAFT") {

          _this3.programDisabled = false;


          _this3._cache_budget.OBSERVERS.enable_approved.forEach(function (all) {
            all(true);
          });
        } else {

          _this3._cache_budget.OBSERVERS.enable_approved.forEach(function (all) {
            all(false);
          });
        }

        if (_this3._cache_budget.HEADER.APPR_STAT_CD == "APP-APPROVED") {

          _this3._cache_budget.STATUS = "APPROVED";
          _this3._disableSaveBudget = true;

          _this3.programDisabled = true;
        } else _this3._cache_budget.STATUS = "VIEW";

        _this3._cache_budget.OBSERVERS.disable_search_personnel.forEach(function (all) {
          all(_this3._cache_budget.HEADER.APPR_STAT_CD == "APP-DRAFT");
        });
      }, function (fail) {
        console.log(fail);
      });
    };

    MainHeaderCustomElement.prototype.PassedProgram = function PassedProgram(value) {
      this._cache_budget.HEADER.PROGRAM_MSTR = value;
      this._cache_budget.HEADER.CHARGE_CD = value.PROGRAM_CD;
    };

    MainHeaderCustomElement.prototype.fnBudgetRefreshHandle = function fnBudgetRefreshHandle() {
      this.fnBudget("refresh");
    };

    MainHeaderCustomElement.prototype.fnBudget = function fnBudget(call) {
      var _this4 = this;

      switch (call) {
        case "create":
          {
            this._disableCreateBudget = true;
            this._disableCancelBudget = false;
            this._disableRefreshBudget = true;
            this._disableSaveBudget = false;
            this._disableBudgetId = true;
            this._disablePrintBudget = true;

            this.budgetDisabled = true;
            this.programDisabled = false;


            this._cache_budget.STATUS = "CREATE";
            this._STATUS = [{ REF_CD: "APP-DRAFT", REF_DESC: "APP-DRAFT" }];

            this.fnDialogProgram();

            break;
          }
        case "cancel":
          {
            this.fnClearHeader();
            this._disableCreateBudget = false;
            this._disableCancelBudget = false;
            this._disableRefreshBudget = true;
            this._disableSaveBudget = true;
            this._disablePrintBudget = true;

            this.budgetDisabled = false;
            this.programDisabled = true;

            this._cache_budget.STATUS = "NONE";
            break;
          }
        case "refresh":
          {

            this._disableCreateBudget = true;
            this._disableSaveBudget = false;
            this._disableCancelBudget = false;
            this._disableRefreshBudget = false;
            this._disablePrintBudget = true;

            this._cache_obj.OBSERVERS.budget_dialog.forEach(function (all) {
              all(_this4._cache_budget.HEADER.BDGT_TMPL_ID);
            });

            this.budgetDisabled = true;
            this.programDisabled = false;


            break;
          }
        case "save":
          {

            this.fnSaveBudget("");

            break;
          }
        case "print":
          {

            var varUseReport = "";
            if (this._cache_budget.HEADER.APPR_STAT_CD == "APP-DRAFT") {
              varUseReport = "Draft";
            }
            if (this._cache_budget.HEADER.APPR_STAT_CD == "APP-APPROVED") {
              varUseReport = "Approved";
            }

            if (varUseReport != "") {
              var popup = window.open(_settings2.default.actualCostWebUrl + "/report/Budget_" + varUseReport + "_Report.aspx?BDID=" + this._cache_obj.HEADER.BDGT_TMPL_ID + "&ConcealConfidentialBudgetAmt=" + this._cache_obj.ALLOW_PASS_CONFIDENTIAL + "&USER_ACCOUNT=" + this._user + "&COMPANY_ID=" + this._COMPANY_ID, "popupWindow", "width=1280px,height=1024px,scrollbars=yes,directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,addressbar=0,fullscreen=false");
              popup.moveTo(0, 0);
            }

            break;
          }
        case "copy":
          {

            this.dialogService.open({ viewModel: _confirm_dialog.confirm_dialog, model: 'Copy Template?' }).whenClosed(function (response) {
              if (!response.wasCancelled) {

                var varGetHeader = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').where('BDGT_TMPL_ID', '==', _this4._cache_budget.HEADER.BDGT_TMPL_ID);

                (0, _entityManagerFactory.EntityManager)().executeQuery(varGetHeader).then(function (found) {
                  found.results[0].APPR_STAT_CD = "APP-CLOSED";
                  (0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {

                    _this4._cache_budget.HEADER.BDGT_TMPL_ID = "";
                    _this4._cache_budget.HEADER.APPR_STAT_CD = "APP-DRAFT";
                    _this4._cache_budget.STATUS = "DRAFT";
                    _this4._cache_budget.IS_COPYING = true;

                    _this4.fnSaveBudget("");
                  });
                });
              } else {}
            });
          }
          break;
        case "close":
          {

            this.dialogService.open({ viewModel: _confirm_dialog.confirm_dialog, model: 'Close Template?' }).whenClosed(function (response) {
              if (!response.wasCancelled) {
                _this4.fnSaveBudget('APP-CLOSED');
              } else {}
            });
          }
          break;

      }
    };

    MainHeaderCustomElement.prototype.fnBudgetValidation_1 = function fnBudgetValidation_1() {
      var _this5 = this;

      return new Promise(function (resolve, reject) {

        var varSubMin = new Date(_this5._cache_budget.HEADER.BDGT_FROM);
        var varAddMin = new Date(_this5._cache_budget.HEADER.BDGT_TO);

        console.log(new Date(varSubMin.getFullYear(), varSubMin.getMonth(), varSubMin.getDate() - 1));
        console.log(new Date(varAddMin.getFullYear(), varAddMin.getMonth(), varAddMin.getDate() + 1));

        var p1 = _breezeClient2.default.Predicate.create('BDGT_FROM', '>=', new Date(varSubMin.getFullYear(), varSubMin.getMonth(), varSubMin.getDate() - 1));
        var p2 = _breezeClient2.default.Predicate.create('BDGT_TO', '<=', new Date(varAddMin.getFullYear(), varAddMin.getMonth(), varAddMin.getDate() + 1));
        var p3 = _breezeClient2.default.Predicate.create('BDGT_TMPL_ID', '!=', _this5._cache_budget.HEADER.BDGT_TMPL_ID);
        var p4 = _breezeClient2.default.Predicate.create('EPISODE_TYPE_CD', '==', _this5._cache_budget.HEADER.EPISODE_TYPE_CD);
        var pred = _breezeClient2.default.Predicate.and([p1, p2, p3, p4]);

        var strException = "";
        var varFromMax = null;
        var varToMax = null;
        var _query = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').where(pred);
        (0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (found) {
          if (found.results !== undefined) {
            var countError = 0;
            found.results.forEach(function (all) {
              if (all.APPR_STAT_CD != null) if (all.APPR_STAT_CD.includes('EXPIRE') || all.APPR_STAT_CD.includes('CLOSE')) {
                console.log(all);

                if (varFromMax == null || varFromMax > all.BDGT_FROM) {
                  varFromMax = all.BDGT_FROM;
                }

                if (varToMax == null || varToMax < all.BDGT_TO) {
                  varToMax = all.BDGT_TO;
                }

                ++countError;
              }
            });

            if (countError > 0) {
              _toastr2.default.error("Budget can only be acceptable if date will be out of range of the last CLOSED/EXPIRED TEMPLATE");
              _toastr2.default.error("Not in between " + varFromMax.getMonth() + "-" + varFromMax.getDate() + "-" + varFromMax.getFullYear() + " and " + varToMax.getMonth() + "-" + varToMax.getDate() + "-" + varToMax.getFullYear());
              reject(false);
            } else resolve(true);
          } else resolve(true);
        });
      });
    };

    MainHeaderCustomElement.prototype.fnBudgetValidation_2 = function fnBudgetValidation_2() {
      var _this6 = this;

      return new Promise(function (resolve, reject) {

        var varAddMin = new Date(_this6._cache_budget.HEADER.BDGT_TO);
        var varSubMin = new Date(_this6._cache_budget.HEADER.BDGT_FROM);

        var p3 = _breezeClient2.default.Predicate.create('BDGT_TMPL_ID', '!=', _this6._cache_budget.HEADER.BDGT_TMPL_ID);
        var c1 = _breezeClient2.default.Predicate.create('BDGT_TMPL_HDR.PROGRAM_ID', '==', _this6._cache_budget.HEADER.PROGRAM_MSTR.PROGRAM_ID);

        var pred2 = _breezeClient2.default.Predicate.and([c1, p3]);
        var _queryCheckActual = (0, _entityManagerFactory.EntityQuery)().from('ACTUAL_COST_HDR').where(pred2).expand("BDGT_TMPL_HDR");
        (0, _entityManagerFactory.EntityManager)().executeQuery(_queryCheckActual).then(function (found) {

          if (found.results !== undefined) {

            var varPromises = [];
            found.results.forEach(function (all) {

              var newPromise = new Promise(function (resolve_2, reject_2) {

                var varTmpFrom = new Date(all.ACTUAL_FROM.getFullYear(), all.ACTUAL_FROM.getMonth(), all.ACTUAL_FROM.getDate());
                var varTmpTo = new Date(all.ACTUAL_TO.getFullYear(), all.ACTUAL_TO.getMonth(), all.ACTUAL_TO.getDate());

                if (varTmpFrom <= new Date(_this6._cache_budget.HEADER.BDGT_FROM) && varTmpFrom >= new Date(_this6._cache_budget.HEADER.BDGT_TO) || varTmpTo <= new Date(_this6._cache_budget.HEADER.BDGT_FROM) && varTmpTo >= new Date(_this6._cache_budget.HEADER.BDGT_TO) || varTmpFrom >= new Date(_this6._cache_budget.HEADER.BDGT_TO) || varTmpFrom >= new Date(_this6._cache_budget.HEADER.BDGT_FROM) && varTmpTo <= new Date(_this6._cache_budget.HEADER.BDGT_TO)) {
                  _toastr2.default.error("Please enter range beyond the created budget (AC:" + all.ACTUAL_COST_ID + ")");
                  reject_2(false);
                }

                var _queryCheckVtr = (0, _entityManagerFactory.EntityQuery)().from('VTR_LIVE_DT_DTL').where('ACTUAL_COST_ID', '==', all.ACTUAL_COST_ID);
                (0, _entityManagerFactory.EntityManager)().executeQuery(_queryCheckVtr).then(function (foundVtr) {

                  if (foundVtr.results === undefined) {
                    resolve_2(true);
                  }

                  var varDataFromCompare = new Date(_this6._cache_budget.HEADER.BDGT_FROM);
                  var varDataToCompare = new Date(_this6._cache_budget.HEADER.BDGT_FROM);

                  var varMaxDate = null;
                  foundVtr.results.forEach(function (allDate) {
                    var varVtr = (0, _moment2.default)(new Date(allDate.VTR_LIVE_DT)).format('MM-DD-YYYY');
                    var varDateCompare = new Date(varVtr);

                    if (varDataFromCompare <= varDateCompare && varDateCompare <= varDataToCompare) {
                      if (varMaxDate == null) varMaxDate = varVtr;else if (varMaxDate < varVtr) varMaxDate = varVtr;
                    }
                  });

                  if (varMaxDate == null) {
                    resolve_2(true);
                  } else {
                    var new_date = (0, _moment2.default)(varMaxDate, "MM-DD-YYYY");
                    new_date.add(1, 'days');
                    new_date = (0, _moment2.default)(new Date(new_date)).format('MM-DD-YYYY');
                    _toastr2.default.error("An existing ActualCost with Id (" + all.ACTUAL_COST_ID + ") is using this budget template. <br>BudgetId (" + all.BDGT_TMPL_ID + ") with status (" + all.BDGT_TMPL_HDR.APPR_STAT_CD.replace("APP-", "") + ")." + " Either open the existing Budget Template and create a Copy, or start the validity on " + new_date);

                    reject_2(false);
                  }
                });
              });

              varPromises.push(newPromise);
            });

            Promise.all(varPromises).then(function (passed) {
              resolve(true);
            }, function (fail) {
              reject(false);
            });
          } else resolve(true);
        });
      });
    };

    MainHeaderCustomElement.prototype.fnValidation_Approved = function fnValidation_Approved() {
      var _this7 = this;

      return new Promise(function (resolve, reject) {
        var p3 = _breezeClient2.default.Predicate.create('BDGT_TMPL_ID', '!=', _this7._cache_budget.HEADER.BDGT_TMPL_ID);
        var c1 = _breezeClient2.default.Predicate.create('BDGT_TMPL_HDR.PROGRAM_ID', '==', _this7._cache_budget.HEADER.PROGRAM_MSTR.PROGRAM_ID);
        var c2 = _breezeClient2.default.Predicate.create('APPR_STAT_CD', '==', "APP-APPROVED");
        var pred2 = _breezeClient2.default.Predicate.and([c1, c2, p3]);
        var _queryCheckActual = (0, _entityManagerFactory.EntityQuery)().from('ACTUAL_COST_HDR').where(pred2).expand("BDGT_TMPL_HDR");
        (0, _entityManagerFactory.EntityManager)().executeQuery(_queryCheckActual).then(function (found) {

          if (found.results !== undefined) {

            var varPromises = [];
            found.results.forEach(function (all) {

              var newPromise = new Promise(function (resolve_2, reject_2) {

                var varTmpFrom = new Date(all.ACTUAL_FROM.getFullYear(), all.ACTUAL_FROM.getMonth(), all.ACTUAL_FROM.getDate());
                var varTmpTo = new Date(all.ACTUAL_TO.getFullYear(), all.ACTUAL_TO.getMonth(), all.ACTUAL_TO.getDate());

                var _queryCheckVtr = (0, _entityManagerFactory.EntityQuery)().from('VTR_LIVE_DT_DTL').where('ACTUAL_COST_ID', '==', all.ACTUAL_COST_ID);
                (0, _entityManagerFactory.EntityManager)().executeQuery(_queryCheckVtr).then(function (foundVtr) {

                  if (foundVtr.results === undefined) {
                    resolve_2(true);
                  }

                  var varMaxDate = null;
                  var varDataFromCompare = new Date(_this7._cache_budget.HEADER.BDGT_FROM);
                  var varDataToCompare = new Date(_this7._cache_budget.HEADER.BDGT_FROM);

                  foundVtr.results.forEach(function (allDate) {
                    var varVtr = (0, _moment2.default)(new Date(allDate.VTR_LIVE_DT)).format('MM-DD-YYYY');

                    if (varTmpFrom <= new Date(_this7._cache_budget.HEADER.BDGT_FROM) && varTmpFrom >= new Date(_this7._cache_budget.HEADER.BDGT_TO) || varTmpTo <= new Date(_this7._cache_budget.HEADER.BDGT_FROM) && varTmpTo >= new Date(_this7._cache_budget.HEADER.BDGT_TO) || varTmpFrom >= new Date(_this7._cache_budget.HEADER.BDGT_TO) || varTmpFrom >= new Date(_this7._cache_budget.HEADER.BDGT_FROM) && varTmpTo <= new Date(_this7._cache_budget.HEADER.BDGT_TO)) {

                      var varVtr = (0, _moment2.default)(new Date(allDate.VTR_LIVE_DT)).format('MM-DD-YYYY');
                      var varDateCompare = new Date(varVtr);

                      if (varDataFromCompare <= varDateCompare && varDateCompare <= varDataToCompare) {
                        if (varMaxDate == null) varMaxDate = varVtr;else if (varMaxDate < varVtr) varMaxDate = varVtr;
                      }
                    }
                  });

                  if (varMaxDate == null) {
                    resolve_2(true);
                  } else {
                    var new_date = (0, _moment2.default)(varMaxDate, "MM-DD-YYYY");

                    new_date.add(1, 'days');
                    new_date = (0, _moment2.default)(new Date(new_date)).format('MM-DD-YYYY');
                    _toastr2.default.error("An existing ActualCost with Id (" + all.ACTUAL_COST_ID + ") is using this budget template. <br>BudgetId (" + all.BDGT_TMPL_ID + ") with status (" + all.BDGT_TMPL_HDR.APPR_STAT_CD.replace("APP-", "") + ")." + " Either open the existing Budget Template and create a Copy, or start the validity on " + new_date);

                    reject_2(false);
                  }
                });
              });

              varPromises.push(newPromise);
            });

            Promise.all(varPromises).then(function (passed) {
              resolve(true);
            }, function (fail) {
              reject(false);
            });
          } else resolve(true);
        });
      });
    };

    MainHeaderCustomElement.prototype.fnSaveBudget = function fnSaveBudget(passed_status) {
      var _this8 = this;

      var strValidation = "";

      if (this._cache_budget.HEADER.PROGRAM_MSTR.PROGRAM_TITLE == "") {
        strValidation += "No Program specified. <br>";
      }

      if (!(0, _moment2.default)(this._cache_budget.HEADER.BDGT_FROM).isValid() || !(0, _moment2.default)(this._cache_budget.HEADER.BDGT_TO).isValid()) {
        strValidation += "Invalid Template Start/End Date validity. <br>";
      }

      if (this._cache_budget.HEADER.PROGRAM_GENRE_CD == "") {
        strValidation += "No Program Genre. <br>";
      }

      if (this._cache_budget.HEADER.EPISODE_TYPE_CD == "") {
        strValidation += "No Episode Type. <br>";
      }

      if (this._cache_budget.HEADER.TELECAST_MODE_CD == "") {
        strValidation += "No Telecast Mode. <br>";
      }

      if (!parseInt(this._cache_budget.HEADER.TAPING_DAYS) > 0) {
        strValidation += "Invalid Taping Day(s).<br>";
      }

      if (!parseInt(this._cache_budget.HEADER.EPISODES) > 0) {
        strValidation += "Invalid Episode(s).<br>";
      }

      if (strValidation != "") {
        _toastr2.default.error("Exception occured. <br/><br/>" + strValidation, "Budget Template");
        return;
      }

      if (this._cache_budget.TOTAL <= 0 && this._cache_budget.HEADER.APPR_STAT_CD.includes('APPROVED')) {
        _toastr2.default.error("Cannot have Zero Total Budget.", "Budget Template");
        return;
      }

      if (passed_status.includes('EXPIRE') || passed_status.includes('CLOSE')) {
        Promise.all([this.fnBudgetValidation_2()]).then(function (passed) {
          if (passed_status != '') _this8._cache_budget.HEADER.APPR_STAT_CD = passed_status;
          _this8.fnExecuteSaveBudgetHeader();
        }, function (fail) {
          _toastr2.default.error("Saving Cancelled.", "Saving..");
        });
      } else if (this._cache_budget.HEADER.APPR_STAT_CD.includes('APPROVED')) {

        this.fnValidation_Approved().then(function (passed) {

          var varToday = new Date(Date.now());

          if (new Date(varToday.getFullYear(), varToday.getMonth(), varToday.getDate()) >= new Date((0, _moment2.default)(_this8._cache_budget.HEADER.BDGT_TO).subtract(8, 'hours').format('MM-DD-YYYY'))) {
            _this8._cache_budget.HEADER.APPR_STAT_CD = "APP-EXPIRED";
          }

          _this8.fnExecuteSaveBudgetHeader();
        }, function (fail) {
          _toastr2.default.error("Saving Cancelled.", "Saving..");
        });
      } else {
        this.fnExecuteSaveBudgetHeader();
      }

      return;
    };

    MainHeaderCustomElement.prototype.fnExecuteSaveBudgetHeader = function fnExecuteSaveBudgetHeader() {
      var _this9 = this;

      var varInsert = null;

      var varFrom = (0, _moment2.default)(new Date(this._cache_budget.HEADER.BDGT_FROM)).add(8, 'hours');
      varFrom = new Date(varFrom);

      var varTo = (0, _moment2.default)(new Date(this._cache_budget.HEADER.BDGT_TO)).add(8, 'hours');
      varTo = new Date(varTo);

      if (this._cache_budget.HEADER.REMARKS === undefined || this._cache_budget.HEADER.REMARKS === null) {
        this._cache_budget.HEADER.REMARKS = "NONE";
      } else if (this._cache_budget.HEADER.REMARKS.trim() == "") {
        this._cache_budget.HEADER.REMARKS = "NONE";
      }

      if (this._cache_budget.HEADER.BDGT_TMPL_ID == "") {
        var getMax = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').orderByDesc('BDGT_TMPL_ID').take(1);

        if (this._cache_budget.HEADER.APPR_STAT_CD == null || this._cache_budget.HEADER.APPR_STAT_CD == undefined || this._cache_budget.HEADER.APPR_STAT_CD == 'undefined') {
          this._cache_budget.HEADER.APPR_STAT_CD = this._STATUS[0].REF_CD;
        }

        (0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (successMax) {
          var getMax = 1;

          if (successMax.results.length > 0) getMax = successMax.results[0].BDGT_TMPL_ID + 1;

          varInsert = (0, _entityManagerFactory.EntityManager)().createEntity('BDGT_TMPL_HDR', {
            BDGT_TMPL_ID: getMax,
            COMPANY_ID: _this9._COMPANY_ID,
            BDGT_FROM: varFrom,
            BDGT_TO: varTo,

            EPISODE_TYPE_CD: _this9._cache_budget.HEADER.EPISODE_TYPE_CD,
            BDGT_VIEW_FCTR: 1,
            TAPING_DAYS: _this9._cache_budget.HEADER.TAPING_DAYS,
            PROGRAM_ID: _this9._cache_budget.HEADER.PROGRAM_MSTR.PROGRAM_ID,
            CHARGE_CD: _this9._cache_budget.HEADER.CHARGE_CD,
            PROGRAM_GENRE_CD: _this9._cache_budget.HEADER.PROGRAM_GENRE_CD,
            PARENT_PROGRAM_ID: _this9._cache_budget.HEADER.PROGRAM_MSTR.PROGRAM_ID,
            BDGT_VIEW_CD: 'EPISODIC',
            APPR_STAT_CD: _this9._cache_budget.HEADER.APPR_STAT_CD,
            CHARGE_TYPE_CD: '',
            BDGT_TOTAL: 0,
            REMARKS: _this9._cache_budget.HEADER.REMARKS,
            CREATED_BY: _this9._user,
            CREATED_DT: new Date(Date.now()),
            LAST_UPDATED_BY: _this9._user,
            LAST_UPDATED_DT: new Date(Date.now()),
            TELECAST_MODE_CD: _this9._cache_budget.HEADER.TELECAST_MODE_CD,
            BDGT_STAT_CD: getMax,

            BDGT_FOR_CD: 'BDGT-EPISODIC',
            PROGRAM_NAME: _this9._cache_budget.HEADER.PROGRAM_MSTR.PROGRAM_TITLE,
            EPISODES: _this9._cache_budget.HEADER.EPISODES,
            STATION_ID: _this9._cache_budget.HEADER.STATION_ID,
            STATION_SENT_DATE: new Date(),
            STATION_SENT: 0
          });

          (0, _entityManagerFactory.EntityManager)().addEntity(varInsert);

          (0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {

            _this9._cache_budget.HEADER.BDGT_TMPL_ID = success.entities[0].BDGT_TMPL_ID;

            _this9._disableCreateBudget = true;
            _this9._disableCancelBudget = false;
            _this9._disableRefreshBudget = false;
            _this9._disableSaveBudget = false;

            if (_this9._cache_budget.HEADER.APPR_STAT_CD == "APP-APPROVED") {
              _this9._cache_budget.STATUS = "APPROVED";
              _this9._disableSaveBudget = true;

              _this9.budgetDisabled = true;
              _this9.programDisabled = true;
            } else {

              _this9.budgetDisabled = true;
              _this9.programDisabled = false;
            }

            _toastr2.default.success("Succesfully Saved", "Budget Template");

            if (_this9._cache_budget.IS_COPYING) {

              _this9._cache_budget.OBSERVERS.copy_template.forEach(function (all) {

                all('REGULAR');
              });

              _this9._cache_budget.IS_COPYING = false;
            } else {
              _this9.fnBudget("refresh");
            }

            _this9._disableCreateBudget = true;
            _this9._disableSaveBudget = false;
            _this9._disableCancelBudget = false;
            _this9._disableRefreshBudget = false;
            _this9._disablePrintBudget = true;

            _this9.budgetDisabled = false;
            _this9.programDisabled = false;
          }, function (fail) {

            if (varInsert != null) {
              varInsert.entityAspect.setDeleted();
            }

            (0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
              var errors = entity.entityAspect.getValidationErrors();
              if (errors.length > 0) console.log(errors);
            });
            console.log(fail);
            _toastr2.default.error("Error Occured", fail);
          });
        });
      } else {

        var getEntityQuery = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').where("BDGT_TMPL_ID", "==", this._cache_budget.HEADER.BDGT_TMPL_ID);
        (0, _entityManagerFactory.EntityManager)().executeQuery(getEntityQuery).then(function (item) {

          item.results[0].BDGT_FROM = varFrom;
          item.results[0].BDGT_TO = varTo;
          item.results[0].EPISODE_TYPE_CD = _this9._cache_budget.HEADER.EPISODE_TYPE_CD;
          item.results[0].TAPING_DAYS = _this9._cache_budget.HEADER.TAPING_DAYS;
          item.results[0].PROGRAM_ID = _this9._cache_budget.HEADER.PROGRAM_MSTR.PROGRAM_ID;
          item.results[0].CHARGE_CD = _this9._cache_budget.HEADER.CHARGE_CD;
          item.results[0].PROGRAM_GENRE_CD = _this9._cache_budget.HEADER.PROGRAM_GENRE_CD;
          item.results[0].PARENT_PROGRAM_ID = _this9._cache_budget.HEADER.PROGRAM_MSTR.PROGRAM_ID;
          item.results[0].APPR_STAT_CD = _this9._cache_budget.HEADER.APPR_STAT_CD;
          item.results[0].REMARKS = _this9._cache_budget.HEADER.REMARKS;
          item.results[0].LAST_UPDATED_BY = _this9._user;
          item.results[0].LAST_UPDATED_DT = new Date(Date.now());
          item.results[0].TELECAST_MODE_CD = _this9._cache_budget.HEADER.TELECAST_MODE_CD;
          item.results[0].PROGRAM_NAME = _this9._cache_budget.HEADER.PROGRAM_MSTR.PROGRAM_TITLE;
          item.results[0].EPISODES = _this9._cache_budget.HEADER.EPISODES;
          item.results[0].STATION_ID = _this9._cache_budget.HEADER.STATION_ID;

          (0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {

            _this9._disableCreateBudget = true;
            _this9._disableCancelBudget = false;
            _this9._disableRefreshBudget = false;
            _this9._disableSaveBudget = false;

            _this9.budgetDisabled = true;
            _this9.programDisabled = false;


            _toastr2.default.success("Succesfully Saved", "Budget Template");
            _this9.fnBudget("refresh");
          }, function (fail) {

            (0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
              var errors = entity.entityAspect.getValidationErrors();
              if (errors.length > 0) console.log(errors);
            });
            console.log(fail);
            _toastr2.default.error("Error Occured", fail);
          });
        });

        this._disableBudgetId = true;

        this.budgetDisabled = true;

        this._disablePrintBudget = false;
      }
    };

    MainHeaderCustomElement.prototype.fnDialogProgram = function fnDialogProgram() {
      this.dialogService.open({
        viewModel: _program.program
      }).whenClosed(function (response) {

        if (!response.wasCancelled) {} else {}
      });
    };

    MainHeaderCustomElement.prototype.fnDialogBudget = function fnDialogBudget() {
      this.dialogService.open({
        viewModel: _budget.budget
      }).whenClosed(function (response) {

        if (!response.wasCancelled) {
          _settings2.default.isNavigating = true;
        } else {}
      });
    };

    return MainHeaderCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'to', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('ppfcs/budget/mainview',['exports', 'aurelia-framework', 'ppfcs/cache_budget', 'entity-manager-factory', 'masterfiles', 'toastr', 'aurelia-dialog', '../../helpers', 'multi-observer', 'modals/login', 'aurelia-router'], function (exports, _aureliaFramework, _cache_budget, _entityManagerFactory, _masterfiles, _toastr, _aureliaDialog, _helpers, _multiObserver, _login, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.mainview = undefined;

  var _toastr2 = _interopRequireDefault(_toastr);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var mainview = exports.mainview = (_dec = (0, _aureliaFramework.inject)(_toastr2.default, _cache_budget.cache_budget, _multiObserver.MultiObserver, _aureliaDialog.DialogService, _aureliaRouter.Router), _dec(_class = function () {
    function mainview(toastr, cache_budget, multiObserver, dialogService, Router) {
      _classCallCheck(this, mainview);

      this._toastr = null;
      this.showingLogout = "hidden";
      this.dialogService = null;
      this.loginDisabled = true;
      this.logoutDisabled = false;
      this.masterFilesLoaded = false;

      this._cache_budget = cache_budget;
      this.router = Router;

      if ((0, _entityManagerFactory.EntityManager)() === undefined) {
        this.router.navigateToRoute('mainpage');
        return;
      }

      this.dialogService = dialogService;

      if (this.dialogService.controllers.length > 0) {
        for (var i = this.dialogService.controllers.length - 1; i >= 0; i--) {
          this.dialogService.controllers[i].close();
        }
      }
    }

    mainview.prototype.clickTab = function clickTab(index) {
      if (index == 0) {} else if (index == 1) {

        this._cache_budget.OBSERVERS.refreshPersonnelTab.forEach(function (all) {
          all('REGULAR');
        });
      } else if (index == 2) {

        this._cache_budget.OBSERVERS.refreshPersonnelTab.forEach(function (all) {
          all('SEMI_REGULAR');
        });
      } else if (index == 3) {

        this._cache_budget.OBSERVERS.refreshPersonnelTab.forEach(function (all) {
          all('STAFF');
        });
      }
    };

    return mainview;
  }()) || _class);
});
define('ppfcs/budget/personnel',['exports', 'aurelia-framework', 'ppfcs/cache_budget', 'cache_obj', 'entity-manager-factory', 'masterfiles', 'helpers', 'typeahead', 'settings', 'underscore', 'modals/modal-wizard', 'numeral', 'multi-observer', 'toastr', '../../modals/globalindivmstr', '../../modals/indivmstr', '../../modals/job', '../../modals/paymentterm', 'aurelia-dialog', 'breeze-client'], function (exports, _aureliaFramework, _cache_budget, _cache_obj, _entityManagerFactory, _masterfiles, _helpers, _typeahead, _settings, _underscore, _modalWizard, _numeral, _multiObserver, _toastr, _globalindivmstr, _indivmstr, _job, _paymentterm, _aureliaDialog, _breezeClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.PersonnelCustomElement = undefined;

  var _typeahead2 = _interopRequireDefault(_typeahead);

  var _settings2 = _interopRequireDefault(_settings);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _numeral2 = _interopRequireDefault(_numeral);

  var _toastr2 = _interopRequireDefault(_toastr);

  var _breezeClient2 = _interopRequireDefault(_breezeClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor, _descriptor2;

  var PersonnelCustomElement = exports.PersonnelCustomElement = (_dec = (0, _aureliaFramework.inject)(_cache_obj.cache_obj, _cache_budget.cache_budget, _modalWizard.ModalWizard, _multiObserver.MultiObserver, _aureliaDialog.DialogService), _dec(_class = (_class2 = function () {
    function PersonnelCustomElement(cache_obj, cache_budget, ModalWizard, multiObserver, dialogService) {
      var _this = this;

      _classCallCheck(this, PersonnelCustomElement);

      _initDefineProp(this, 'toPerson', _descriptor, this);

      _initDefineProp(this, 'toPersonModel', _descriptor2, this);

      this._cache_obj = null;
      this._cache_budget = null;
      this.styleStringHidden = 'visibility: hidden;display:none;';
      this.styleStringVisible = 'visibility: visible;';
      this._JOBS = null;
      this._PYMNTTERM = [];
      this._Personnel = [];
      this._PersonnelTM = [];
      this._Index = 0;
      this.varPymnt = null;
      this.isIndivMstrTalentsDisabled = false;
      this.isIndivMstrManagerDisabled = false;
      this.isJobDisabled = false;
      this.isIndivMstrDisabled = false;
      this.dialogService = null;


      if ((0, _entityManagerFactory.EntityManager)() === undefined) {
        return;
      }

      this.cache_budget = cache_budget;
      this.dialogService = dialogService;

      this._cache_obj = cache_obj;
      this._cache_budget = cache_budget;

      this._ModalWizard = ModalWizard;
      this._ce_head = "+";

      multiObserver.observe([[this, '_personnelSearch']], function (newValue, oldValue) {
        return _this.onSpeculateProp(newValue, oldValue);
      });

      this._cache_budget.OBSERVERS.disable_search_personnel.push(function (val) {
        _this.ButtonStatus(val);
      });

      this._cache_budget.OBSERVERS.reset_all.push(function () {
        _this.resetView();
      });

      this._cache_obj.OBSERVERS.budget_dialog.push(function (val) {
        _this.CloseBudgetDialog(val);
      });

      this._cache_budget.OBSERVERS.enable_approved.push(function (val) {
        _this.ButtonStatus(val);
      });

      this._cache_budget.OBSERVERS.copy_template.push(function (val) {
        _this.fnCallCopy(val);
      });

      this._cache_budget.OBSERVERS.pass_indiv.push(function (val) {
        _this.PassedIndiv(val);
      });

      this._cache_budget.OBSERVERS.pass_group.push(function (val) {
        _this.PassedGroup(val);
      });

      this._cache_budget.OBSERVERS.refreshPersonnelTab.push(function (val) {
        _this.refreshOnSelect(val);
      });

      this._cache_budget.OBSERVERS.pass_job.push(function (val) {
        _this.passJob(val);
      });

      this._PYMNTTERM = (0, _masterfiles.getLookups)().PAYMENT_TERM;

      this._JOBS = (0, _masterfiles.getLookups)().JOB_GRP_CATEGORY.filter(function (all) {
        return all.COMPANY_ID == _this._cache_obj.USER.COMPANY_ID;
      });
    }

    PersonnelCustomElement.prototype.passJob = function passJob(job) {
      var _this2 = this;

      var index = this._Index;

      this._Personnel[index].JOB_ID = job.JOB_ID;
      this._Personnel[index].JOB_DESC = job.JOB_DESC;
      var varGrpCategory = (0, _masterfiles.getLookups)().JOB_GRP_CATEGORY.find(function (all) {
        return all.JOB_ID == _this2._Personnel[index].JOB_ID && all.COMPANY_ID == _this2._cache_obj.USER.COMPANY_ID;
      });

      if (varGrpCategory !== undefined) {
        this._Personnel[index].CATEGORY_ID = varGrpCategory.CATEGORY_ID;
        this._Personnel[index].CATEGORY_DESC = varGrpCategory.CATEGORY_DESC;
      }
    };

    PersonnelCustomElement.prototype.onSpeculateProp = function onSpeculateProp(newValue, oldValue) {
      var _this3 = this;

      var varResult = [];

      this._Personnel.forEach(function (all) {
        all.visible = true;

        if (_this3._personnelSearch.toUpperCase() !== "") {
          if (all['PERSONNEL_NAME'] !== undefined && all['PERSONNEL_NAME'] != null) if (!all['PERSONNEL_NAME'].toUpperCase().includes(_this3._personnelSearch.toUpperCase())) {
            all.visible = false;
          }

          if (all['BLANK_PERSONNEL_NAME'] !== undefined && all['PERSONNEL_NAME'] != null) if (!all['BLANK_PERSONNEL_NAME'].toUpperCase().includes(_this3._personnelSearch.toUpperCase())) {
            all.visible = false;
          }
        }
      });

      this._signal = (0, _entityManagerFactory.generateID)();
    };

    PersonnelCustomElement.prototype.resetView = function resetView() {

      this._signal = (0, _entityManagerFactory.generateID)();
    };

    PersonnelCustomElement.prototype.collapse_expand_head = function collapse_expand_head() {
      var _this4 = this;

      if (this._ce_head == "+") {
        this._ce_head = "-";
        this._Personnel.forEach(function (item) {
          item.ce_value = "-";
          item.styleString = _this4.styleStringVisible;
        });
      } else {
        this._ce_head = "+";
        this._Personnel.forEach(function (item) {
          item.ce_value = "+";
          item.styleString = _this4.styleStringHidden;
        });
      }
    };

    PersonnelCustomElement.prototype.collapse_expand = function collapse_expand(item) {

      if (item.ce_value == "+") {

        item.ce_value = "-";
        item.styleString = this.styleStringVisible;
      } else {

        item.ce_value = "+";
        item.styleString = this.styleStringHidden;
      }
    };

    PersonnelCustomElement.prototype.CloseBudgetDialog = function CloseBudgetDialog(value) {

      this.fnCheckBudget(value);
    };

    PersonnelCustomElement.prototype.fnCheckExistingTalents = function fnCheckExistingTalents(TALENTS, item) {

      if (TALENTS == undefined || TALENTS == null || TALENTS == "") {

        return true;
      } else if (TALENTS.length > 0) {
        if (item) item.REMOVE = false;

        return false;
      }

      return true;
    };

    PersonnelCustomElement.prototype.myFunction = function myFunction() {

      alert('loaded');
    };

    PersonnelCustomElement.prototype.ButtonStatus = function ButtonStatus(value) {
      var _this5 = this;

      this._cache_obj.OBSERVERS.enable_modal_button.forEach(function (all) {
        _this5.isIndivMstrDisabled = !value;
        _this5.isIndivMstrTalentsDisabled = !value;
      });
    };

    PersonnelCustomElement.prototype.fnCallCopy = function fnCallCopy(usr) {

      this._Personnel.forEach(function (item) {
        if (item.TALENT_MANAGER !== undefined) {
          item.TALENT_MANAGER.BDGT_TMPL_DTL_ID_TMP = undefined;
          item.TALENT_MANAGER.BDGT_TMPL_DTL_ID = undefined;
        };
        item.BDGT_TMPL_DTL_ID = undefined;

        item.BDGT_TMPL_DTL_ID_LINK = undefined;
        item.BDGT_TMPL_DTL_ID_LINK_TMP = undefined;
      });

      if (this.toPersonModel.USE == usr) this.savePersonnel(1);
    };

    PersonnelCustomElement.prototype.fnCheckBudget = function fnCheckBudget(BDGT_TMPL_ID) {
      var _this6 = this;

      this._cache_obj.OBSERVERS.enable_modal_button.forEach(function (all) {
        _this6.isIndivMstrDisabled = false;
        _this6.isIndivMstrTalentsDisabled = false;
      });

      setTimeout(function () {

        _this6.scrollDiv();
      }, 5000);

      var varPsClType = "";
      if (this.toPersonModel.USE == "REGULAR") {

        varPsClType = "Regular";
        this._cache_budget.REGULAR = [];
      } else if (this.toPersonModel.USE == "SEMI_REGULAR") {

        varPsClType = "Semi-Regular";
        this._cache_budget.SEMI_REGULAR = [];
      } else if (this.toPersonModel.USE == "STAFF") {

        varPsClType = "Staff";
        this._cache_budget.STAFF = [];
      }

      var p1 = _breezeClient2.default.Predicate.create('BDGT_TMPL_ID', '==', BDGT_TMPL_ID);
      var p2 = _breezeClient2.default.Predicate.create('PERSONNEL_CLASS_TYPE', '==', varPsClType);
      var pred = _breezeClient2.default.Predicate.and([p1, p2]);

      var _query = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_DTL').where(pred).orderBy("GROUP_ORDER");
      (0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (found) {

        var varJobLength = (0, _masterfiles.getLookups)().JOB_MSTR.length - 1;
        var varCategoryLength = (0, _masterfiles.getLookups)().CATEGORY_MSTR.length - 1;

        _this6._Personnel.splice(0, _this6._Personnel.length);
        _this6._PersonnelTM.splice(0, _this6._PersonnelTM.length);

        found.results.forEach(function (item) {

          _this6._Personnel.push({
            BDGT_TMPL_DTL_ID: item.BDGT_TMPL_DTL_ID,
            BDGT_TMPL_ID: _this6._cache_budget.HEADER.BDGT_TMPL_ID,
            JOB_ID: item.JOB_ID,
            GLOBAL_ID: item.GLOBAL_ID,
            CONTRACT_AMT: item.CONTRACT_AMT,
            CATEGORY_ID: item.CATEGORY_ID,
            STAFF_WORK: item.STAFF_WORK,
            PYMNT_TERM_CD: item.PYMNT_TERM_CD,
            PAY_TO_PERSON_FL: 'T',
            PAY_RATE_FACTOR: item.PAY_RATE_FACTOR,
            BUDGET_AMT: item.INPUT_AMT,
            TAPING_DAY_CNT: _this6._cache_budget.HEADER.TAPING_DAYS,
            PERSONNEL_CLASS_CD: item.PERSONNEL_CLASS_CD,
            REMARKS: item.REMARKS,
            PERSONNEL_INFO_SRC: item.PERSONNEL_INFO_SRC,
            PERSONNEL_NAME: item.PERSONNEL_NAME,
            INPUT_AMT: item.INPUT_AMT,
            CONFIDENTIAL: item.CONFIDENTIAL,
            POOL_RECORD: item.POOL_RECORD,
            GROUP_ORDER: item.GROUP_ORDER,
            GLOBAL_ID_LINK: item.GLOBAL_ID_LINK,
            BDGT_TMPL_DTL_ID_LINK: item.BDGT_TMPL_DTL_ID_LINK
          });
        });

        if (_this6.toPersonModel.USE == "REGULAR") {

          _this6._cache_budget.REGULAR = _this6._Personnel;

          if (_this6._cache_budget.REGULAR.length > 0) _toastr2.default.success("REGULAR PERSONNEL", "Loading Successful.");

          _this6.setPersonnelValues(_this6._cache_budget.REGULAR, varJobLength, varCategoryLength);
        } else if (_this6.toPersonModel.USE == "SEMI_REGULAR") {

          varPsClType = "Semi-Regular";

          _this6._cache_budget.SEMI_REGULAR = _this6._Personnel;

          if (_this6._cache_budget.SEMI_REGULAR.length > 0) _toastr2.default.success("SEMI-REGULAR PERSONNEL", "Loading Successful.");

          _this6.setPersonnelValues(_this6._cache_budget.SEMI_REGULAR, varJobLength, varCategoryLength);
        } else if (_this6.toPersonModel.USE == "STAFF") {

          varPsClType = "Staff";

          _this6._cache_budget.STAFF = _this6._Personnel;

          if (_this6._cache_budget.STAFF.length > 0) _toastr2.default.success("STAFF PERSONNEL", "Loading Successful.");

          _this6.setPersonnelValues(_this6._cache_budget.STAFF, varJobLength, varCategoryLength);
        }

        _this6._signal = (0, _entityManagerFactory.generateID)();

        _this6._cache_budget.OBSERVERS.reset_summary.forEach(function (all) {

          all();
        });
      });
    };

    PersonnelCustomElement.prototype.setPersonnelValues = function setPersonnelValues(obj, varJobLength, varCategoryLength) {
      var _this7 = this;

      _underscore2.default.each(obj, function (item) {
        item.TALENTS = undefined;
      });

      _underscore2.default.each(obj, function (item) {

        for (var i = 0; i <= varJobLength; ++i) {
          if ((0, _masterfiles.getLookups)().JOB_MSTR[i].JOB_ID == item.JOB_ID) {
            item.JOB_DESC = (0, _masterfiles.getLookups)().JOB_MSTR[i].JOB_DESC;
            break;
          }
        };

        for (var i = 0; i <= varCategoryLength; ++i) {
          if ((0, _masterfiles.getLookups)().CATEGORY_MSTR[i].CATEGORY_ID == item.CATEGORY_ID) {
            item.CATEGORY_DESC = (0, _masterfiles.getLookups)().CATEGORY_MSTR[i].CATEGORY_DESC;
            break;
          }
        };

        for (var i = 0; i <= _this7._PYMNTTERM.length - 1; ++i) {
          if (_this7._PYMNTTERM[i].REF_CD == item.PYMNT_TERM_CD) {
            item.PAYMENT_TERM = _this7._PYMNTTERM[i].REF_DESC;
            break;
          }
        };

        if (item.BDGT_TMPL_DTL_ID_LINK !== 0) {
          var varTM = obj.find(function (all) {
            return all.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK;
          });
          item.TALENT_MANAGER = {
            BDGT_TMPL_DTL_ID_TMP: varTM.BDGT_TMPL_DTL_ID,
            GLOBAL_INDIV_ID: varTM.GLOBAL_ID,
            PERSONNEL_NAME: varTM.PERSONNEL_NAME,
            CONTRACT_AMT_TMP: (0, _numeral2.default)(varTM.CONTRACT_AMT).format('0,0.00'),
            INPUT_AMT_TMP: (0, _numeral2.default)(varTM.INPUT_AMT).format('0,0.00'),
            PAY_RATE_FACTOR_TMP: (0, _numeral2.default)(varTM.PAY_RATE_FACTOR).format('0,0.00'),
            REMARKS: varTM.REMARKS,
            JOB_ID: varTM.JOB_ID,
            CATEGORY_ID: varTM.CATEGORY_ID,
            GROUP_ORDER: -1
          };

          _this7._PersonnelTM.push({
            BDGT_TMPL_DTL_ID: varTM.BDGT_TMPL_DTL_ID,
            BDGT_TMPL_DTL_ID_TMP: varTM.BDGT_TMPL_DTL_ID,
            GLOBAL_INDIV_ID: varTM.GLOBAL_ID,
            PERSONNEL_NAME: varTM.PERSONNEL_NAME,
            CONTRACT_AMT_TMP: (0, _numeral2.default)(varTM.CONTRACT_AMT).format('0,0.00'),
            INPUT_AMT_TMP: (0, _numeral2.default)(varTM.INPUT_AMT).format('0,0.00'),
            PAY_RATE_FACTOR_TMP: (0, _numeral2.default)(varTM.PAY_RATE_FACTOR).format('0,0.00'),
            REMARKS: varTM.REMARKS,
            JOB_ID: varTM.JOB_ID,
            CATEGORY_ID: varTM.CATEGORY_ID,
            GROUP_ORDER: -1
          });
        }

        item.BLANK_PERSONNEL_NAME = item.PERSONNEL_NAME;
        item.CONTRACT_AMT_TMP = (0, _numeral2.default)(item.CONTRACT_AMT).format('0,0.00');
        item.INPUT_AMT_TMP = (0, _numeral2.default)(item.INPUT_AMT).format('0,0.00');
        item.PAY_RATE_FACTOR_TMP = (0, _numeral2.default)(item.PAY_RATE_FACTOR).format('0,0.00');
        item.CONFIDENTIAL_TMP = item.CONFIDENTIAL == 1 ? true : false;
        item.STAFF_WORK_TMP = item.STAFF_WORK == 1 ? true : false;
        item.POOL_RECORD_TMP = item.POOL_RECORD == 1 ? true : false;

        item.BDGT_TMPL_DTL_ID_LINK_TMP = item.BDGT_TMPL_DTL_ID_LINK;

        item.styleString = _this7.styleStringHidden;
        item.ce_value = "+";
        item.visible = true;
      });

      for (var i = obj.length - 1; i >= 0; i--) {
        var varToDelete = this._PersonnelTM.find(function (all) {
          return all.BDGT_TMPL_DTL_ID_TMP == obj[i].BDGT_TMPL_DTL_ID;
        });

        if (varToDelete !== undefined) {
          obj.splice(i, 1);
        }
      }
    };

    PersonnelCustomElement.prototype.removeTalent = function removeTalent(parent, item, index) {
      var _this8 = this;

      this._Personnel.forEach(function (all) {
        if (all.GLOBAL_ID == item.GLOBAL_INDIV_ID) {
          var varToSplice = parent.item.TALENTS.splice(index, 1);

          delete item.TALENT_MANAGER.CONTRACT_AMT_TMP;
          delete item.TALENT_MANAGER.INPUT_AMT_TMP;
          delete item.TALENT_MANAGER.PAY_RATE_FACTOR_TMP;
          delete item.TALENT_MANAGER.REMARKS;
          delete item.TALENT_MANAGER;

          _this8._signal = (0, _entityManagerFactory.generateID)();
        }
      });
    };

    PersonnelCustomElement.prototype.fnRegularFocus = function fnRegularFocus(index, prop) {

      this._Index = index;
      if (prop == "JOB") {

        this.fnModalJob();

        return;
      }

      this.fnModalPaymentTerm();
    };

    PersonnelCustomElement.prototype.scrollDiv = function scrollDiv() {
      var _this9 = this;

      $(this.tblHeader).css("visibility", "visible");

      $(this.tblHeader).css("top", $(this.divRegular).scrollTop() + $(this.tblData).position().top);

      var varCol = 0;
      _underscore2.default.each($(this.tblData).find('td'), function (item) {
        if (varCol > $(_this9.tblHeader).find('td').length - 2) return;

        $($(_this9.tblHeader).find('td')[varCol]).css("width", $(_this9.tblData).find('td')[varCol].clientWidth + 1);
        ++varCol;
      });
    };

    PersonnelCustomElement.prototype.AmountBlur = function AmountBlur(item, property) {

      var varConverted = (0, _numeral2.default)(item[property]).format('0,0.00');
      item[property] = varConverted;
    };

    PersonnelCustomElement.prototype.showTalents = function showTalents(item) {
      var _this10 = this;

      this._selectedItem = item;

      this._cache_budget.OBSERVERS.open_modal.forEach(function (all) {
        _this10.isIndivMstrTalentsDisabled = false;
      });
    };

    PersonnelCustomElement.prototype.showTalentMngr = function showTalentMngr(item) {

      this._selectedItem = item;

      this.fnIndivMstr();
    };

    PersonnelCustomElement.prototype.removeTalentMngr = function removeTalentMngr(item) {
      item.TALENT_MANAGER = undefined;

      this._signal = (0, _entityManagerFactory.generateID)();

      this._cache_budget.OBSERVERS.reset_summary.forEach(function (all) {
        all();
      });
    };

    PersonnelCustomElement.prototype.PassedIndiv = function PassedIndiv(value) {
      if (this._selectedItem !== undefined) if (value.GLOBAL_INDIV_ID == this._selectedItem.GLOBAL_ID) {
        _toastr2.default.error("<strong>Talent Manager cannot be same Personnel</strong>.", "Problem occured");
        return;
      }

      var varJobTManager = (0, _masterfiles.getJobByName)("TALENT MANAGER");
      if (parseInt(varJobTManager.COMPANY_ID) != parseInt(this._cache_obj.USER.COMPANY_ID)) {
        _toastr2.default.error(varJobTManager.JOB_DESC + " Job is not included on jobs from users company.", "Problem occured");
        varJobTManager.JOB_ID = "";
        varJobTManager.JOB_DESC = "";
      }

      this.getDefaultPymntTerm();

      this._selectedItem.TALENT_MANAGER = { GLOBAL_INDIV_ID: value.GLOBAL_INDIV_ID, PERSONNEL_NAME: value.PERSONNEL_NAME,
        PERSONNEL_INFO_SRC: value.PERSONNEL_INFO_SRC,
        JOB_ID: varJobTManager.JOB_ID,
        JOB_DESC: varJobTManager.JOB_DESC,
        PYMNT_TERM_CD: this.varPymnt.REF_CD,
        PAYMENT_TERM: this.varPymnt.REF_DESC,
        CATEGORY_ID: varJobTManager.CATEGORY_ID,
        CATEGORY_DESC: varJobTManager.CATEGORY_DESC,
        PAY_RATE_FACTOR_TMP: (0, _numeral2.default)(1).format('0,0.00'),
        CONTRACT_AMT_TMP: (0, _numeral2.default)(0).format('0,0.00'),
        INPUT_AMT_TMP: (0, _numeral2.default)(0).format('0,0.00')
      };

      this._cache_budget.OBSERVERS.reset_summary.forEach(function (all) {
        all();
      });
    };

    PersonnelCustomElement.prototype.getDefaultPymntTerm = function getDefaultPymntTerm() {

      if (this.varPymnt == null) this.varPymnt = this._PYMNTTERM.find(function (all) {
        return all.REF_GRP_CD == 'PYMNT_TERM_CD' && all.REF_CD == 'DAILY';
      });
    };

    PersonnelCustomElement.prototype.fnPassedPersonnels = function fnPassedPersonnels(value) {
      var _this11 = this;

      this.getDefaultPymntTerm();

      value.forEach(function (val) {

        var varJob = (0, _masterfiles.getJobByGlobalCompany)(val.GLOBAL_INDIV_ID);

        if (parseInt(varJob.COMPANY_ID) !== parseInt(_this11._cache_obj.USER.COMPANY_ID)) {
          _toastr2.default.error(varJob.JOB_DESC + " Job is not included on jobs from users company.", "Problem occured");
          varJob.JOB_ID = "";
          varJob.JOB_DESC = "";
        }

        _this11._Personnel.push({
          GLOBAL_ID: val.GLOBAL_INDIV_ID,
          PERSONNEL_NAME: val.PERSONNEL_NAME,
          PERSONNEL_INFO_SRC: val.PERSONNEL_INFO_SRC,
          JOB_ID: varJob.JOB_ID,
          JOB_DESC: varJob.JOB_DESC,
          PYMNT_TERM_CD: _this11.varPymnt.REF_CD,
          PAYMENT_TERM: _this11.varPymnt.REF_DESC,
          CATEGORY_ID: varJob.CATEGORY_ID,
          CATEGORY_DESC: varJob.CATEGORY_DESC,
          PAY_RATE_FACTOR_TMP: (0, _numeral2.default)(1).format('0,0.00'),
          CONTRACT_AMT_TMP: (0, _numeral2.default)(0).format('0,0.00'),
          INPUT_AMT_TMP: (0, _numeral2.default)(0).format('0,0.00'),
          STAFF_WORK_TMP: false,
          CONFIDENTIAL_TMP: false,
          visible: true
        });
      });

      this._Personnel.forEach(function (all) {
        if (all.STATUS_CD == "" || all.STATUS_CD === undefined) {
          all.STATUS_CD = "";
        }
        all.ce_value = "+";
        all.styleString = _this11.styleStringHidden;
      });

      this._Personnel.forEach(function (all) {
        var varIndiv = (0, _masterfiles.getLookups)().GRP_INDIV_MSTR.find(function (allIndiv) {
          return allIndiv.GLOBAL_INDIV_ID == all.GLOBAL_ID;
        });

        if (varIndiv !== undefined) {
          var varJobTManager = (0, _masterfiles.getJobByName)("TALENT MANAGER");

          if (parseInt(varJobTManager.COMPANY_ID) != parseInt(_this11._cache_obj.USER.COMPANY_ID)) {
            _toastr2.default.error(varJobTManager.JOB_DESC + "Job is not included on jobs from users company.", "Problem occured");
            varJobTManager.JOB_ID = "";
            varJobTManager.JOB_DESC = "";
          }

          var varTalent = (0, _masterfiles.getLookups)().GLOBAL_GRP_MSTR.find(function (allIndiv) {
            return allIndiv.GLOBAL_GRP_ID == varIndiv.GLOBAL_GRP_ID;
          });
          all.TALENT_MANAGER = { GLOBAL_INDIV_ID: varTalent.GLOBAL_GRP_ID, PERSONNEL_NAME: varTalent.GROUP_NAME,
            PERSONNEL_INFO_SRC: varJobTManager.PERSONNEL_INFO_SRC,
            JOB_ID: varJobTManager.JOB_ID,
            JOB_DESC: varJobTManager.JOB_DESC,
            PYMNT_TERM_CD: _this11.varPymnt.REF_CD,
            PAYMENT_TERM: _this11.varPymnt.REF_DESC,
            CATEGORY_ID: varJobTManager.CATEGORY_ID,
            CATEGORY_DESC: varJobTManager.CATEGORY_DESC,
            PAY_RATE_FACTOR_TMP: (0, _numeral2.default)(1).format('0,0.00'),
            CONTRACT_AMT_TMP: (0, _numeral2.default)(0).format('0,0.00'),
            INPUT_AMT_TMP: (0, _numeral2.default)(0).format('0,0.00'),
            STAFF_WORK_TMP: false,
            CONFIDENTIAL_TMP: false
          };
        }
      });

      this._cache_budget.OBSERVERS.reset_summary.forEach(function (all) {
        all();
      });
    };

    PersonnelCustomElement.prototype.PassedGroup = function PassedGroup(value) {
      var _this12 = this;

      if (this.modalIndivMstrTalents.id == this._ModalWizard.ids[this._ModalWizard.ids.length - 1]) {

        this.getDefaultPymntTerm();

        this._selectedItem.TALENTS = value;

        this._selectedItem.TALENTS.forEach(function (all) {
          if (_this12._Personnel.find(function (allReg) {
            return allReg.GLOBAL_ID == all.GLOBAL_INDIV_ID;
          }) === undefined) {

            var varJob = (0, _masterfiles.getJobByGlobalCompany)(all.GLOBAL_INDIV_ID);

            if (parseInt(varJob.COMPANY_ID) != parseInt(_this12._cache_obj.USER.COMPANY_ID)) {
              _toastr2.default.error(varJob.JOB_DESC + " Job is not included on jobs from users company.", "Problem occured");
              varJob.JOB_ID = "";
              varJob.JOB_DESC = "";
            }

            var varTalent = (0, _masterfiles.getLookups)().GLOBAL_INDIV_WITH_ALIAS.find(function (allIndiv) {
              return allIndiv.GLOBAL_INDIV_ID == all.GLOBAL_INDIV_ID;
            });

            _this12._Personnel.push({
              GLOBAL_ID: all.GLOBAL_INDIV_ID,
              PERSONNEL_NAME: all.PERSONNEL_NAME,
              PERSONNEL_INFO_SRC: varTalent.PERSONNEL_INFO_SRC,
              JOB_ID: varJob.JOB_ID,
              JOB_DESC: varJob.JOB_DESC,
              PYMNT_TERM_CD: _this12.varPymnt.REF_CD,
              PAYMENT_TERM: _this12.varPymnt.REF_DESC,
              CATEGORY_ID: varJob.CATEGORY_ID,
              CATEGORY_DESC: varJob.CATEGORY_DESC,
              PAY_RATE_FACTOR_TMP: (0, _numeral2.default)(1).format('0,0.00'),
              CONTRACT_AMT_TMP: (0, _numeral2.default)(0).format('0,0.00'),
              INPUT_AMT_TMP: (0, _numeral2.default)(0).format('0,0.00'),
              STAFF_WORK_TMP: false,
              CONFIDENTIAL_TMP: false,
              GLOBAL_ID_LINK: _this12._selectedItem.GLOBAL_ID,
              TALENT_MANAGER: {
                GLOBAL_INDIV_ID: _this12._selectedItem.GLOBAL_ID,
                PERSONNEL_NAME: _this12._selectedItem.PERSONNEL_NAME
              }
            });
          }
        });

        this._ModalWizard.ids.pop();

        this._cache_budget.OBSERVERS.reset_summary.forEach(function (all) {
          all();
        });
      }

      this._signal = (0, _entityManagerFactory.generateID)();
    };

    PersonnelCustomElement.prototype.refreshOnSelect = function refreshOnSelect(personnel) {
      $(this.tblHeader).css("visibility", "hidden");
    };

    PersonnelCustomElement.prototype.moveTrigger = function moveTrigger(value) {

      if (value == "up") {
        if (this._currentIndex > 0) {

          this._Personnel.splice(this._currentIndex - 1, 0, this._Personnel[this._currentIndex]);
          var varCopy = this._Personnel.splice(this._currentIndex + 1, 1);
          this._currentIndex = this._currentIndex - 1;
        }
      } else {

        if (this._currentIndex < this._Personnel.length - 1) {

          this._Personnel.splice(this._currentIndex + 2, 0, this._Personnel[this._currentIndex]);
          var varCopy = this._Personnel.splice(this._currentIndex, 1);
          this._currentIndex = this._currentIndex + 1;
        }
      }

      this._signal = (0, _entityManagerFactory.generateID)();
    };

    PersonnelCustomElement.prototype.focusTrigger = function focusTrigger(index) {

      this._currentIndex = index;
    };

    PersonnelCustomElement.prototype.savePersonnel = function savePersonnel(tag) {
      var _this13 = this;

      var varErrorDuplicate = "";
      var varErrorJobTerms = "";
      var varErrorCheckTalentManager = "";

      var varDuplicateValidation = [];

      var varI = 0;
      var varJ = 0;

      for (var i = 0; i <= this._Personnel.length - 1; ++i) {

        for (var j = 0; j <= this._Personnel.length - 1; ++j) {

          if (this._Personnel[j].GROUP_ORDER !== -1 && this._Personnel[i].GROUP_ORDER !== -1) {
            if (this._Personnel[j].PERSONNEL_NAME == this._Personnel[i].PERSONNEL_NAME && this._Personnel[j].JOB_ID == this._Personnel[i].JOB_ID && i != j && varDuplicateValidation.find(function (all) {
              return all == _this13._Personnel[j].PERSONNEL_NAME;
            }) == undefined && (this._Personnel[i].PERSONNEL_NAME == null ? "" : this._Personnel[i].PERSONNEL_NAME.trim()) != "") {

              varErrorDuplicate += "<br /><br />" + this._Personnel[j].PERSONNEL_NAME + "-" + this._Personnel[j].JOB_DESC + " Row(" + (varJ + 1) + ").";

              varDuplicateValidation.push(this._Personnel[j].PERSONNEL_NAME);
            }
          }

          if (this._Personnel[j].GROUP_ORDER !== -1) {
            ++varJ;
          }
        }

        if (this._Personnel[i].GROUP_ORDER !== -1) {
          ++varI;
        }
      }

      varI = 0;
      varJ = 0;

      for (var j = 0; j <= this._Personnel.length - 1; ++j) {

        if (this._Personnel[j].GROUP_ORDER !== -1) if (this._Personnel[j].JOB_ID === undefined || this._Personnel[j].JOB_ID == "" || this._Personnel[j].PYMNT_TERM_CD == "" || this._Personnel[j].PYMNT_TERM_CD === undefined || this._Personnel[j].JOB_ID === null || this._Personnel[j].PYMNT_TERM_CD === null) {
          varErrorJobTerms += "<br /><br />" + "Row (" + (varJ + 1) + ").";
        }

        if (this._Personnel[j].GROUP_ORDER !== -1) {
          ++varJ;
        }
      }

      if (varErrorDuplicate != "") {
        _toastr2.default.error("<strong>Duplicate Personnel and Job</strong>" + varErrorDuplicate + "<br /><br />Saving cancelled.", "Problem occured");
      }

      if (varErrorJobTerms != "") {
        _toastr2.default.error("<strong>JOB/PAYMENT TERM not set</strong>" + varErrorJobTerms + "<br /><br />Saving cancelled.", "Problem occured");
      }

      if (varErrorDuplicate != "" || varErrorJobTerms != "" || varErrorCheckTalentManager != "") {
        return;
      }

      var getMax = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_DTL').orderByDesc('BDGT_TMPL_DTL_ID').take(1);
      (0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (successMax) {
        var getMax = 1;

        if (successMax.results.length > 0) getMax = successMax.results[0].BDGT_TMPL_DTL_ID + 1;

        var varIndex = 1;

        var getAllDtl = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_DTL').where("BDGT_TMPL_ID", '==', _this13._cache_budget.HEADER.BDGT_TMPL_ID);
        (0, _entityManagerFactory.EntityManager)().executeQuery(getAllDtl).then(function (foundDtl) {

          _this13._Personnel.forEach(function (item) {
            if (item.BDGT_TMPL_DTL_ID === undefined) {
              item.BDGT_TMPL_DTL_ID_TMP = getMax;
              ++getMax;
            }
          });

          _this13._Personnel.forEach(function (item) {
            if (item.TALENT_MANAGER !== undefined && item.BDGT_TMPL_DTL_ID_LINK_TMP !== undefined && item.BDGT_TMPL_DTL_ID_LINK_TMP !== 0) {

              if (item.TALENT_MANAGER.BDGT_TMPL_DTL_ID_TMP == undefined) {
                item.TALENT_MANAGER.BDGT_TMPL_DTL_ID_TMP = getMax;
                item.BDGT_TMPL_DTL_ID_LINK = getMax;
                item.TALENT_MANAGER.IsNewTalent = true;
                ++getMax;
              }
            }
          });

          _this13._Personnel.forEach(function (item) {

            if (item.BDGT_TMPL_DTL_ID === undefined && item.GROUP_ORDER !== -1) {

              var varInsert = (0, _entityManagerFactory.EntityManager)().createEntity('BDGT_TMPL_DTL', {
                BDGT_TMPL_DTL_ID: item.BDGT_TMPL_DTL_ID_TMP,
                BDGT_TMPL_ID: _this13._cache_budget.HEADER.BDGT_TMPL_ID,
                JOB_ID: item.JOB_ID,
                GLOBAL_ID: item.GLOBAL_ID,
                CONTRACT_AMT: item.CONTRACT_AMT_TMP.replace(/,/g, ''),
                CATEGORY_ID: item.CATEGORY_ID,
                STAFF_WORK: item.STAFF_WORK_TMP === undefined ? 0 : item.STAFF_WORK_TMP == true ? 1 : 0,
                PYMNT_TERM_CD: item.PYMNT_TERM_CD,
                PAY_TO_PERSON_FL: 'T',
                PAY_RATE_FACTOR: item.PAY_RATE_FACTOR_TMP.replace(/,/g, ''),
                BUDGET_AMT: item.INPUT_AMT_TMP.replace(/,/g, ''),
                TAPING_DAY_CNT: _this13._cache_budget.HEADER.TAPING_DAYS,
                PERSONNEL_CLASS_CD: _this13.toPersonModel.USE != "STAFF" ? "Mainstay" : "Staff",
                REMARKS: item.REMARKS,
                PERSONNEL_INFO_SRC: item.PERSONNEL_INFO_SRC,
                PERSONNEL_NAME: item.BLANK_PERSONNEL_NAME !== undefined ? item.BLANK_PERSONNEL_NAME : item.PERSONNEL_NAME,
                CREATED_BY: _this13._cache_obj.USER.USER_ID,
                CREATED_DT: new Date(),
                LAST_UPDATED_BY: _this13._cache_obj.USER.USER_ID,
                LAST_UPDATED_DT: new Date(),
                INPUT_AMT: item.INPUT_AMT_TMP.replace(/,/g, ''),
                EPISODES: _this13._cache_budget.HEADER.EPISODES,
                CONFIDENTIAL: item.CONFIDENTIAL_TMP === undefined ? 0 : item.CONFIDENTIAL_TMP == true ? 1 : 0,
                PER_TAPING_DAY_RATE: 0,
                PERSONNEL_CLASS_TYPE: _this13.getPersonnelClassType(),
                POOL_RECORD: item.POOL_RECORD_TMP == null || item.POOL_RECORD_TMP == undefined ? 0 : item.POOL_RECORD_TMP == true ? 1 : 0,
                GROUP_ORDER: varIndex,
                GLOBAL_ID_LINK: item.TALENT_MANAGER !== undefined && item.TALENT_MANAGER !== null ? item.TALENT_MANAGER.GLOBAL_INDIV_ID : "NONE",
                BDGT_TMPL_DTL_ID_LINK: item.BDGT_TMPL_DTL_ID_LINK !== undefined && item.BDGT_TMPL_DTL_ID_LINK !== null ? item.BDGT_TMPL_DTL_ID_LINK : 0,
                WITH_TALENT_MANAGER: item.TALENT_MANAGER !== undefined && item.TALENT_MANAGER !== null ? '1' : '0'
              });

              (0, _entityManagerFactory.EntityManager)().addEntity(varInsert);

              if (item.TALENT_MANAGER !== undefined) {

                var varInsertTM = (0, _entityManagerFactory.EntityManager)().createEntity('BDGT_TMPL_DTL', {
                  BDGT_TMPL_DTL_ID: item.TALENT_MANAGER.BDGT_TMPL_DTL_ID_TMP,
                  BDGT_TMPL_ID: _this13._cache_budget.HEADER.BDGT_TMPL_ID,
                  JOB_ID: item.TALENT_MANAGER.JOB_ID,
                  GLOBAL_ID: item.TALENT_MANAGER.GLOBAL_INDIV_ID,
                  CONTRACT_AMT: item.TALENT_MANAGER.CONTRACT_AMT_TMP.replace(/,/g, ''),
                  CATEGORY_ID: item.TALENT_MANAGER.CATEGORY_ID,
                  STAFF_WORK: 0,
                  PYMNT_TERM_CD: item.PYMNT_TERM_CD,
                  PAY_TO_PERSON_FL: 'T',
                  PAY_RATE_FACTOR: item.TALENT_MANAGER.PAY_RATE_FACTOR_TMP.replace(/,/g, ''),
                  BUDGET_AMT: item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''),
                  TAPING_DAY_CNT: _this13._cache_budget.HEADER.TAPING_DAYS,
                  PERSONNEL_CLASS_CD: _this13.toPersonModel.USE != "STAFF" ? "Mainstay" : "Staff",
                  REMARKS: item.TALENT_MANAGER.REMARKS,
                  PERSONNEL_INFO_SRC: item.PERSONNEL_INFO_SRC,
                  PERSONNEL_NAME: item.TALENT_MANAGER.PERSONNEL_NAME,
                  CREATED_BY: _this13._cache_obj.USER.USER_ID,
                  CREATED_DT: new Date(),
                  LAST_UPDATED_BY: _this13._cache_obj.USER.USER_ID,
                  LAST_UPDATED_DT: new Date(),
                  INPUT_AMT: item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''),
                  EPISODES: _this13._cache_budget.HEADER.EPISODES,
                  CONFIDENTIAL: 0,
                  PER_TAPING_DAY_RATE: 0,
                  PERSONNEL_CLASS_TYPE: _this13.getPersonnelClassType(),
                  POOL_RECORD: 0,
                  GROUP_ORDER: -1,
                  WITH_TALENT_MANAGER: '0',
                  GLOBAL_ID_LINK: 'NONE',
                  BDGT_TMPL_DTL_ID_LINK: 0
                });

                (0, _entityManagerFactory.EntityManager)().addEntity(varInsertTM);
              }
            } else if (item.REMOVE == true) {

              if (item.TALENT_MANAGER !== undefined) {
                var varTalentMngrToDelete = foundDtl.results.find(function (allTm) {
                  return allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP;
                });

                varTalentMngrToDelete.entityAspect.setDeleted();
              }

              var varTalentToDelete = foundDtl.results.find(function (allTm) {
                return allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID;
              });

              varTalentToDelete.entityAspect.setDeleted();
            } else {

              var varTalentToEdit = foundDtl.results.find(function (allTm) {
                return allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID;
              });

              varTalentToEdit.JOB_ID = item.JOB_ID;

              varTalentToEdit.GLOBAL_ID = item.GLOBAL_ID;
              varTalentToEdit.CONTRACT_AMT = item.CONTRACT_AMT_TMP.replace(/,/g, '');
              varTalentToEdit.CATEGORY_ID = item.CATEGORY_ID;
              varTalentToEdit.STAFF_WORK = item.STAFF_WORK_TMP === undefined ? 0 : item.STAFF_WORK_TMP == true ? 1 : 0;
              varTalentToEdit.PYMNT_TERM_CD = item.PYMNT_TERM_CD;
              varTalentToEdit.PAY_RATE_FACTOR = item.PAY_RATE_FACTOR_TMP.replace(/,/g, '');
              varTalentToEdit.BUDGET_AMT = item.INPUT_AMT_TMP.replace(/,/g, '');
              varTalentToEdit.TAPING_DAY_CNT = _this13._cache_budget.HEADER.TAPING_DAYS;
              varTalentToEdit.REMARKS = item.REMARKS;
              varTalentToEdit.PERSONNEL_INFO_SRC = item.PERSONNEL_INFO_SRC;
              varTalentToEdit.PERSONNEL_NAME = item.BLANK_PERSONNEL_NAME !== undefined ? item.BLANK_PERSONNEL_NAME : item.PERSONNEL_NAME;
              varTalentToEdit.LAST_UPDATED_BY = _this13._cache_obj.USER.USER_ID;
              varTalentToEdit.LAST_UPDATED_DT = new Date();
              varTalentToEdit.INPUT_AMT = item.INPUT_AMT_TMP.replace(/,/g, '');
              varTalentToEdit.EPISODES = _this13._cache_budget.HEADER.EPISODES;
              varTalentToEdit.CONFIDENTIAL = item.CONFIDENTIAL_TMP === undefined ? 0 : item.CONFIDENTIAL_TMP == true ? 1 : 0;
              varTalentToEdit.POOL_RECORD = item.POOL_RECORD_TMP == null || item.POOL_RECORD_TMP == undefined ? 0 : item.POOL_RECORD_TMP == true ? 1 : 0;

              if (varTalentToEdit.GROUP_ORDER !== -1) varTalentToEdit.GROUP_ORDER = varIndex;

              varTalentToEdit.GLOBAL_ID_LINK = item.TALENT_MANAGER !== undefined && item.TALENT_MANAGER !== null ? item.TALENT_MANAGER.GLOBAL_INDIV_ID : "NONE";
              varTalentToEdit.BDGT_TMPL_DTL_ID_LINK = item.BDGT_TMPL_DTL_ID_LINK !== undefined && item.BDGT_TMPL_DTL_ID_LINK !== null ? item.BDGT_TMPL_DTL_ID_LINK : 0;
              varTalentToEdit.WITH_TALENT_MANAGER = item.TALENT_MANAGER !== undefined && item.TALENT_MANAGER !== null ? '1' : '0';

              if (item.TALENT_MANAGER !== undefined) {

                if (item.BDGT_TMPL_DTL_ID_LINK_TMP !== undefined && item.BDGT_TMPL_DTL_ID_LINK_TMP !== 0) {
                  var varCheckTalent = _this13._PersonnelTM.find(function (allTalent) {
                    return allTalent.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP;
                  });
                  save;
                  if (varCheckTalent !== undefined) {

                    if (varCheckTalent.BDGT_TMPL_DTL_ID !== item.BDGT_TMPL_DTL_ID_LINK && item.BDGT_TMPL_DTL_ID_LINK != 0) {

                      var varTalentMngrToEdit = foundDtl.results.find(function (allTm) {
                        return allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP;
                      });

                      varTalentMngrToEdit.entityAspect.setDeleted();
                    } else {
                      var varTalentMngrToEdit = foundDtl.results.find(function (allTm) {
                        return allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP;
                      });
                      varTalentMngrToEdit.CONTRACT_AMT = item.TALENT_MANAGER.CONTRACT_AMT_TMP.replace(/,/g, '');
                      varTalentMngrToEdit.PAY_RATE_FACTOR = item.TALENT_MANAGER.PAY_RATE_FACTOR_TMP.replace(/,/g, '');
                      varTalentMngrToEdit.INPUT_AMT = item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, '');
                      varTalentMngrToEdit.BUDGET_AMT = item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, '');
                      varTalentMngrToEdit.REMARKS = item.TALENT_MANAGER.REMARKS;
                    }
                  }
                }

                if (item.TALENT_MANAGER.IsNewTalent) {
                  var varInsertTM = (0, _entityManagerFactory.EntityManager)().createEntity('BDGT_TMPL_DTL', {
                    BDGT_TMPL_DTL_ID: item.TALENT_MANAGER.BDGT_TMPL_DTL_ID_TMP,
                    BDGT_TMPL_ID: _this13._cache_budget.HEADER.BDGT_TMPL_ID,
                    JOB_ID: item.TALENT_MANAGER.JOB_ID,
                    GLOBAL_ID: item.TALENT_MANAGER.GLOBAL_INDIV_ID,
                    CONTRACT_AMT: item.TALENT_MANAGER.CONTRACT_AMT_TMP.replace(/,/g, ''),
                    CATEGORY_ID: item.TALENT_MANAGER.CATEGORY_ID,
                    STAFF_WORK: 0,
                    PYMNT_TERM_CD: item.PYMNT_TERM_CD,
                    PAY_TO_PERSON_FL: 'T',
                    PAY_RATE_FACTOR: item.TALENT_MANAGER.PAY_RATE_FACTOR_TMP.replace(/,/g, ''),
                    BUDGET_AMT: item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''),
                    TAPING_DAY_CNT: _this13._cache_budget.HEADER.TAPING_DAYS,
                    PERSONNEL_CLASS_CD: _this13.toPersonModel.USE != "STAFF" ? "Mainstay" : "Staff",
                    REMARKS: item.TALENT_MANAGER.REMARKS,
                    PERSONNEL_INFO_SRC: item.PERSONNEL_INFO_SRC,
                    PERSONNEL_NAME: item.TALENT_MANAGER.PERSONNEL_NAME,
                    CREATED_BY: _this13._cache_obj.USER.USER_ID,
                    CREATED_DT: new Date(),
                    LAST_UPDATED_BY: _this13._cache_obj.USER.USER_ID,
                    LAST_UPDATED_DT: new Date(),
                    INPUT_AMT: item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''),
                    EPISODES: _this13._cache_budget.HEADER.EPISODES,
                    CONFIDENTIAL: 0,
                    PER_TAPING_DAY_RATE: 0,
                    PERSONNEL_CLASS_TYPE: _this13.getPersonnelClassType(),
                    POOL_RECORD: 0,
                    GROUP_ORDER: -1,
                    WITH_TALENT_MANAGER: '0',
                    GLOBAL_ID_LINK: 'NONE',
                    BDGT_TMPL_DTL_ID_LINK: 0
                  });
                  (0, _entityManagerFactory.EntityManager)().addEntity(varInsertTM);
                }
              } else if (item.TALENT_MANAGER === undefined && item.BDGT_TMPL_DTL_ID_LINK_TMP !== undefined && item.BDGT_TMPL_DTL_ID_LINK_TMP !== 0) {

                var varTalentMngrToDelete = foundDtl.results.find(function (allTm) {
                  return allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP;
                });

                if (varTalentMngrToDelete !== undefined) {
                  consoole.log(item.BDGT_TMPL_DTL_ID);
                  var varTalentToEdit = foundDtl.results.find(function (allTm) {
                    return allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID;
                  });
                  varTalentMngrToDelete.entityAspect.setDeleted();

                  varTalentToEdit.GLOBAL_ID_LINK = 'NONE';
                  varTalentToEdit.BDGT_TMPL_DTL_ID_LINK = 0;
                  varTalentToEdit.WITH_TALENT_MANAGER = '0';
                }
              }
            }

            ++varIndex;
          });

          (0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {
            _this13.fnCheckBudget(_this13._cache_budget.HEADER.BDGT_TMPL_ID);
            _toastr2.default.success("Succesfully Saved", _this13.toPersonModel.USE);

            if (tag == 1) _this13.fnSequenceDispatch();
          }, function (fail) {

            (0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
              var errors = entity.entityAspect.getValidationErrors();
              if (errors.length > 0) console.log(errors);
            });
            console.log(fail);
            _toastr2.default.error("Error Occured", fail);

            if (tag == 1) _this13.fnSequenceDispatch();
          });
        });
      });
    };

    PersonnelCustomElement.prototype.fnSequenceDispatch = function fnSequenceDispatch() {

      if (this.toPersonModel.USE == "REGULAR") {

        this._cache_budget.OBSERVERS.copy_template.forEach(function (all) {
          all('SEMI_REGULAR');
        });
      } else if (this.toPersonModel.USE == "SEMI_REGULAR") {

        this._cache_budget.OBSERVERS.copy_template.forEach(function (all) {
          all('STAFF');
        });
      } else if (this.toPersonModel.USE == "STAFF") {

        this._cache_budget.OBSERVERS.copy_template_guest.forEach(function (all) {
          all();
        });
      }
    };

    PersonnelCustomElement.prototype.getPersonnelClassType = function getPersonnelClassType() {
      if (this.toPersonModel.USE == 'REGULAR') {
        return 'Regular';
      } else if (this.toPersonModel.USE == 'SEMI_REGULAR') {
        return 'Semi-Regular';
      } else return 'Staff';
    };

    PersonnelCustomElement.prototype.fnRegularBlurEvt = function fnRegularBlurEvt(item, property, index, BDGT_TMPL_DTL_ID) {

      if (property == "TERM") {
        if ($("input[tableTermIndex*='" + index + "']").val() === undefined) return;
        this._Personnel[index].PAYMENT_TERM = $("input[tableTermIndex*='" + index + "']").val().toUpperCase();

        var varPaymentTerm = this._Personnel[index].PAYMENT_TERM.trim();
        var varFound = this._PYMNTTERM.find(function (all) {
          return varPaymentTerm == all.REF_DESC.trim();
        });

        if (varFound !== undefined) {
          this._Personnel[index].PYMNT_TERM_CD = varFound.REF_CD;
        } else this._Personnel[index].PYMNT_TERM_CD = "";
      }
    };

    PersonnelCustomElement.prototype.fnBlankPersonnelRegular = function fnBlankPersonnelRegular() {

      this.getDefaultPymntTerm();

      this._Personnel.push({ visible: true, PAY_RATE_FACTOR_TMP: (0, _numeral2.default)(1).format('0,0.00'),
        CONTRACT_AMT_TMP: (0, _numeral2.default)(0).format('0,0.00'),
        INPUT_AMT_TMP: (0, _numeral2.default)(0).format('0,0.00'),
        PYMNT_TERM_CD: this.varPymnt.REF_CD,
        PAYMENT_TERM: this.varPymnt.REF_DESC
      });

      var varBudgetLast = this._Personnel[this._Personnel.length - 1];
      varBudgetLast.ce_value = "+";
      varBudgetLast.styleString = this.styleStringHidden;

      this._signal = (0, _entityManagerFactory.generateID)();

      this._cache_budget.OBSERVERS.reset_summary.forEach(function (all) {
        all();
      });
    };

    PersonnelCustomElement.prototype.chkRemove = function chkRemove(item) {
      if (item.REMOVE) {
        item.REMOVE = false;
      } else {
        item.REMOVE = true;
      }
    };

    PersonnelCustomElement.prototype.removeRegular = function removeRegular(index) {

      var varRemoved = this._Personnel.splice(index, 1);
      this._signal = (0, _entityManagerFactory.generateID)();

      this._cache_budget.OBSERVERS.reset_summary.forEach(function (all) {
        all();
      });
    };

    PersonnelCustomElement.prototype.fnIndivMstrTalents = function fnIndivMstrTalents() {
      this.dialogService.open({
        viewModel: _globalindivmstr.globalindivmstr, model: { allPersonnel: false }
      }).whenClosed(function (response) {

        if (!response.wasCancelled) {} else {}
      });
    };

    PersonnelCustomElement.prototype.fnIndivMstr = function fnIndivMstr() {
      var _this14 = this;

      this.dialogService.open({
        viewModel: _indivmstr.indivmstr, model: { allPersonnel: false }
      }).whenClosed(function (response) {

        if (!response.wasCancelled) {
          _this14.PassedIndiv(response.output);
        } else {}
      });
    };

    PersonnelCustomElement.prototype.fnModalJob = function fnModalJob() {
      var _this15 = this;

      this.dialogService.open({
        viewModel: _job.job
      }).whenClosed(function (response) {

        if (!response.wasCancelled) {
          _this15.passJob(response.output);
        } else {}
      });
    };

    PersonnelCustomElement.prototype.fnModalPaymentTerm = function fnModalPaymentTerm() {
      var _this16 = this;

      this.dialogService.open({
        viewModel: _paymentterm.paymentterm
      }).whenClosed(function (response) {

        if (!response.wasCancelled) {
          _this16.passTerm(response.output);
        } else {}
      });
    };

    PersonnelCustomElement.prototype.passTerm = function passTerm(term) {

      var index = this._Index;

      this._Personnel[index].PYMNT_TERM_CD = term.REF_CD;
      this._Personnel[index].PAYMENT_TERM = term.REF_DESC;
    };

    PersonnelCustomElement.prototype.fnIndivMstrManager = function fnIndivMstrManager() {
      var _this17 = this;

      this.dialogService.open({
        viewModel: _globalindivmstr.globalindivmstr, model: { allPersonnel: false }
      }).whenClosed(function (response) {

        if (!response.wasCancelled) {
          _this17.fnPassedPersonnels(response.output);
        } else {}
      });
    };

    return PersonnelCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'toPerson', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'toPersonModel', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('ppfcs/budget/summary',['exports', 'aurelia-framework', 'cache_obj', 'ppfcs/cache_budget', 'entity-manager-factory', 'masterfiles', 'helpers', 'typeahead', 'settings', 'underscore', 'numeral', 'toastr', 'multi-observer'], function (exports, _aureliaFramework, _cache_obj, _cache_budget, _entityManagerFactory, _masterfiles, _helpers, _typeahead, _settings, _underscore, _numeral, _toastr, _multiObserver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SummaryCustomElement = undefined;

  var _typeahead2 = _interopRequireDefault(_typeahead);

  var _settings2 = _interopRequireDefault(_settings);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _numeral2 = _interopRequireDefault(_numeral);

  var _toastr2 = _interopRequireDefault(_toastr);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var SummaryCustomElement = exports.SummaryCustomElement = (_dec = (0, _aureliaFramework.inject)(_cache_obj.cache_obj, _cache_budget.cache_budget, _multiObserver.MultiObserver), _dec(_class = (_class2 = function () {
    function SummaryCustomElement(cache_obj, cache_budget, multiObserver) {
      var _this = this;

      _classCallCheck(this, SummaryCustomElement);

      _initDefineProp(this, 'to', _descriptor, this);

      this._cache_obj = null;
      this._enableAdd = false;
      this._enableRemove = false;
      this._INPUT_AMT_MAINSTAY = 0;
      this._INPUT_AMT_STAFF = 0;
      this._INPUT_AMT_GUEST = 0;
      this._INPUT_AMT_TOTAL = 0;
      this.varObserveSubscriptions = [];
      this._cache_budget = null;

      this._cache_obj = cache_obj;
      this._cache_budget = cache_budget;
      this._multiObserver = multiObserver;

      this._cache_obj.OBSERVERS.budget_dialog.push(function (val) {
        _this.fnCheckSummary(val);
      });

      this._cache_budget.OBSERVERS.reset_summary.push(function () {
        _this.fnResetSummarySubscription();
      });
    }

    SummaryCustomElement.prototype.fnCheckAll = function fnCheckAll() {
      var _this2 = this;

      this._INPUT_AMT_MAINSTAY = 0;
      this._INPUT_AMT_TOTAL = 0;
      this._cache_budget._INPUT_AMT_REGULAR = 0;
      this._cache_budget._INPUT_AMT_SEMI_REGULAR = 0;

      this._cache_budget.REGULAR.forEach(function (all) {

        if (_this2._cache_obj.ALLOW_PASS_CONFIDENTIAL || !all.CONFIDENTIAL_TMP) {
          if (all.GROUP_ORDER !== -1) if (all.INPUT_AMT_TMP != "" && all.INPUT_AMT_TMP != null && all.INPUT_AMT_TMP != undefined) {
            _this2._INPUT_AMT_MAINSTAY += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, ''));
          }

          if (all.TALENT_MANAGER) {
            if (all.TALENT_MANAGER.INPUT_AMT_TMP != "" && all.TALENT_MANAGER.INPUT_AMT_TMP != null && all.TALENT_MANAGER.INPUT_AMT_TMP != undefined) {
              _this2._INPUT_AMT_MAINSTAY += parseFloat(all.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''));
            }
          }
        }
      });

      this._cache_budget._INPUT_AMT_REGULAR = (0, _numeral2.default)(this._INPUT_AMT_MAINSTAY).format('0,0.00');

      this._cache_budget.SEMI_REGULAR.forEach(function (all) {

        if (all.INPUT_AMT_TMP != "" && all.INPUT_AMT_TMP != null && all.INPUT_AMT_TMP != undefined) {
          if (all.GROUP_ORDER !== -1) {
            if (_this2._cache_obj.ALLOW_PASS_CONFIDENTIAL || !all.CONFIDENTIAL_TMP) _this2._INPUT_AMT_MAINSTAY += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, ''));
            _this2._cache_budget._INPUT_AMT_SEMI_REGULAR += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, ''));
          }

          if (all.TALENT_MANAGER) {
            if (all.TALENT_MANAGER.INPUT_AMT_TMP != "" && all.TALENT_MANAGER.INPUT_AMT_TMP != null && all.TALENT_MANAGER.INPUT_AMT_TMP != undefined) {
              _this2._INPUT_AMT_MAINSTAY += parseFloat(all.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''));
              _this2._cache_budget._INPUT_AMT_SEMI_REGULAR += parseFloat(all.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''));
            }
          }
        }
      });

      this._INPUT_AMT_TOTAL = this._INPUT_AMT_MAINSTAY;
      this._INPUT_AMT_MAINSTAY = (0, _numeral2.default)(this._INPUT_AMT_MAINSTAY).format('0,0.00');

      this._cache_budget._INPUT_AMT_SEMI_REGULAR = (0, _numeral2.default)(this._cache_budget._INPUT_AMT_SEMI_REGULAR).format('0,0.00');

      this._INPUT_AMT_STAFF = 0;
      this._cache_budget._INPUT_AMT_STAFF = 0;

      this._cache_budget.STAFF.forEach(function (all) {

        if (all.INPUT_AMT_TMP != "" && all.INPUT_AMT_TMP != null && all.INPUT_AMT_TMP != undefined) {

          if (all.GROUP_ORDER !== -1) {

            if (_this2._cache_obj.ALLOW_PASS_CONFIDENTIAL || !all.CONFIDENTIAL_TMP) _this2._INPUT_AMT_STAFF += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, ''));
          }

          if (all.TALENT_MANAGER) {

            if (all.TALENT_MANAGER.INPUT_AMT_TMP != "" && all.TALENT_MANAGER.INPUT_AMT_TMP != null && all.TALENT_MANAGER.INPUT_AMT_TMP != undefined) {
              _this2._INPUT_AMT_STAFF += parseFloat(all.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''));
            }
          }
        }
      });

      this._INPUT_AMT_TOTAL += this._INPUT_AMT_STAFF;
      this._INPUT_AMT_STAFF = (0, _numeral2.default)(this._INPUT_AMT_STAFF).format('0,0.00');
      this._cache_budget._INPUT_AMT_STAFF = this._INPUT_AMT_STAFF;

      this._INPUT_AMT_GUEST = 0;
      this._cache_budget.GUEST.forEach(function (all) {

        if (all.GROUP_ORDER !== -1) if (all.INPUT_AMT_TMP != "" && all.INPUT_AMT_TMP != null && all.INPUT_AMT_TMP != undefined) _this2._INPUT_AMT_GUEST += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, '')) * all.PAY_RATE_FACTOR;
      });

      this._INPUT_AMT_TOTAL += this._INPUT_AMT_GUEST;
      this._INPUT_AMT_GUEST = (0, _numeral2.default)(this._INPUT_AMT_GUEST).format('0,0.00');
      this._cache_budget._INPUT_AMT_GUEST = (0, _numeral2.default)(this._INPUT_AMT_GUEST).format('0,0.00');

      this._INPUT_AMT_TOTAL = (0, _numeral2.default)(this._INPUT_AMT_TOTAL).format('0,0.00');

      this._cache_budget.TOTAL = this._INPUT_AMT_TOTAL;

      if (this._cache_budget._LOADING_BUDGET == 1 && this._cache_budget.TOTAL != 0) {
        this._cache_budget_LOADING_BUDGET = 0;
        this._cache_budget.OBSERVERS.budget_loaded.forEach(function (all) {
          all();
        });
      }
    };

    SummaryCustomElement.prototype.fnCheckSummary = function fnCheckSummary(value) {
      var _this3 = this;

      setTimeout(function () {
        for (var name in _this3._cache_budget.REGULAR) {

          var varSubscription = _this3._multiObserver.observe([[_this3._cache_budget.REGULAR[name], 'INPUT_AMT_TMP']], function (newValue, oldValue) {

            _this3.fnCheckAll();
          });

          _this3.varObserveSubscriptions.push(varSubscription);

          if (_this3._cache_budget.REGULAR[name].TALENT_MANAGER !== undefined) {

            var varSubscriptionTM = _this3._multiObserver.observe([[_this3._cache_budget.REGULAR[name].TALENT_MANAGER, 'INPUT_AMT_TMP']], function (newValue, oldValue) {

              _this3.fnCheckAll();
            });

            _this3.varObserveSubscriptions.push(varSubscriptionTM);
          }
        }

        for (var name in _this3._cache_budget.SEMI_REGULAR) {

          var varSubscription = _this3._multiObserver.observe([[_this3._cache_budget.SEMI_REGULAR[name], 'INPUT_AMT_TMP']], function (newValue, oldValue) {

            _this3.fnCheckAll();
          });

          _this3.varObserveSubscriptions.push(varSubscription);

          if (_this3._cache_budget.SEMI_REGULAR[name].TALENT_MANAGER !== undefined) {

            var varSubscriptionTM = _this3._multiObserver.observe([[_this3._cache_budget.SEMI_REGULAR[name].TALENT_MANAGER, 'INPUT_AMT_TMP']], function (newValue, oldValue) {

              _this3.fnCheckAll();
            });

            _this3.varObserveSubscriptions.push(varSubscriptionTM);
          }
        }

        for (var name in _this3._cache_budget.STAFF) {

          var varSubscription = _this3._multiObserver.observe([[_this3._cache_budget.STAFF[name], 'INPUT_AMT_TMP']], function (newValue, oldValue) {

            _this3.fnCheckAll();
          });

          _this3.varObserveSubscriptions.push(varSubscription);

          if (_this3._cache_budget.STAFF[name].TALENT_MANAGER !== undefined) {

            var varSubscriptionTM = _this3._multiObserver.observe([[_this3._cache_budget.STAFF[name].TALENT_MANAGER, 'INPUT_AMT_TMP']], function (newValue, oldValue) {

              _this3.fnCheckAll();
            });

            _this3.varObserveSubscriptions.push(varSubscriptionTM);
          }
        }

        for (var name in _this3._cache_budget.GUEST) {

          var varSubscription = _this3._multiObserver.observe([[_this3._cache_budget.GUEST[name], 'INPUT_AMT_TMP']], function (newValue, oldValue) {

            _this3.fnCheckAll();
          });

          _this3.varObserveSubscriptions.push(varSubscription);
        }

        _this3.fnCheckAll();
      }, 6000);
    };

    SummaryCustomElement.prototype.fnResetSummarySubscription = function fnResetSummarySubscription() {

      this.varObserveSubscriptions.forEach(function (toDispose) {
        toDispose();
      });

      while (this.varObserveSubscriptions.length > 0) {
        this.varObserveSubscriptions.pop();
      }

      this.fnCheckSummary();
    };

    return SummaryCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'to', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('ppid/forms/awards_training',['exports', 'toastr', 'aurelia-framework', '../obj_personnel', 'aurelia-dialog', '../../entity-manager-factory'], function (exports, _toastr, _aureliaFramework, _obj_personnel, _aureliaDialog, _entityManagerFactory) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.awards_training = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var awards_training = exports.awards_training = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService, _obj_personnel.obj_personnel, _toastr2.default), _dec(_class = function () {
		function awards_training(dialogService, obj_personnel, toastr) {
			var _this = this;

			_classCallCheck(this, awards_training);

			this.obj_personnel = null;
			this._404_img = "/images/404.png";

			this.dialogService = dialogService;
			this.obj_personnel = obj_personnel;
			this.obj_personnel.OBSERVERS.ppid_dialog.push(function (all) {
				_this.CloseSearch(all);
			});
		}

		awards_training.prototype.CloseSearch = function CloseSearch(global_id) {};

		return awards_training;
	}()) || _class);
});
define('ppid/forms/company_info',['exports', 'toastr', 'aurelia-framework', '../obj_personnel', '../../entity-manager-factory', 'breeze-client', 'aurelia-dialog', '../modals/DialogBox', 'moment'], function (exports, _toastr, _aureliaFramework, _obj_personnel, _entityManagerFactory, _breezeClient, _aureliaDialog, _DialogBox, _moment) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.company_info = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var company_info = exports.company_info = (_dec = (0, _aureliaFramework.inject)(_obj_personnel.obj_personnel, _toastr2.default, _aureliaDialog.DialogService), _dec(_class = function () {
		function company_info(obj_personnel, toastr, DialogService) {
			_classCallCheck(this, company_info);

			this.obj_personnel = null;
			this._404_img = "/images/404.png";

			this.obj_personnel = obj_personnel;
			this.DialogService = DialogService;
		}

		company_info.prototype.clickTab_Company = function clickTab_Company(tab_num) {
			var _this = this;

			if (this.obj_personnel.global_indiv_id.length == 0) return;
			switch (tab_num) {
				case 0:
					this.obj_personnel.OBSERVERS.company_main_clicked.forEach(function (delegate) {
						delegate(_this.obj_personnel.global_indiv_id);
					});
					break;
				case 1:
					this.obj_personnel.OBSERVERS.company_work_exp_clicked.forEach(function (delegate) {
						delegate(_this.obj_personnel.global_indiv_id);
					});
					break;
			}
		};

		return company_info;
	}()) || _class);
});
define('ppid/forms/company_info_main',['exports', 'toastr', 'aurelia-framework', '../obj_personnel', '../../entity-manager-factory', 'breeze-client', 'aurelia-dialog', '../modals/DialogBox', 'moment', '../../masterfiles', '../../helpers', 'settings'], function (exports, _toastr, _aureliaFramework, _obj_personnel, _entityManagerFactory, _breezeClient, _aureliaDialog, _DialogBox, _moment, _masterfiles, _helpers, _settings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.company_info_main = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	var _moment2 = _interopRequireDefault(_moment);

	var _settings2 = _interopRequireDefault(_settings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var company_info_main = exports.company_info_main = (_dec = (0, _aureliaFramework.inject)(_obj_personnel.obj_personnel, _toastr2.default, _aureliaDialog.DialogService), _dec(_class = function () {
		function company_info_main(obj_personnel, toastr, DialogService) {
			var _this = this;

			_classCallCheck(this, company_info_main);

			this.obj_personnel = null;
			this._disableLocations = true;
			this._disableIDNo = false;
			this._disableStatus = true;
			this._disableTabsInput = true;
			this._hideSuspendField = true;
			this._hideInactiveField = true;
			this._hideCessationDate = true;
			this.lblCreatedBy = null;
			this.lblUpdatedBy = null;
			this.alreadyLoaded = false;
			this.accreditation_status = "";
			this.accreditation_joblist = [];

			this.obj_personnel = obj_personnel;
			this.DialogService = DialogService;
			this.obj_personnel.OBSERVERS.tab_changed.push(function (tab_num, global_id) {
				if (tab_num == 4) {
					if (!_this.alreadyLoaded) {
						_this.alreadyLoaded = true;
						$("#_start_dt").datepicker();
						$("#_end_dt").datepicker();
						$("#kapamilya_dt").datepicker();
						$("#membership_dt").datepicker();
						$("#suspended_start_dt").datepicker();
						$("#suspended_end_dt").datepicker();
						$("#cessation_end_dt").datepicker();
						$("#a_start_dt").datepicker();
						$("#a_end_dt").datepicker();
						toastr.clear();
						toastr.info("", "Loading company info...");

						if (_this.obj_personnel.COMPANY.length > 0) {
							_this.obj_personnel.COMPANY_SPECIFIC.model.company_id = _this.obj_personnel.COMPANY[0].id;
						}
						_this.loadGlobalCompany(global_id);
					}
				}
			});

			this.obj_personnel.OBSERVERS.company_main_clicked.push(function (global_id) {
				toastr.clear();
				toastr.info("", "Loading company info...");
				_this.loadGlobalCompany(global_id);
			});

			this.obj_personnel.OBSERVERS.clear_ppid.push(function () {
				_this.obj_personnel.COMPANY_SPECIFIC = {
					model: {},
					list: []
				};
				_this.alreadyLoaded = false;
			});
		}

		company_info_main.prototype.loadGlobalCompany = function loadGlobalCompany(global_id) {
			var _this2 = this;

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from("GLOBAL_COMPANY_MSTR").where("GLOBAL_ID", "==", global_id).orderBy("COMPANY_ID");
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (success) {
				var tmp = [];
				_.each(success.results, function (r) {
					tmp.push({
						global_company_id: r.GLOBAL_COMPANY_ID,
						global_id: r.GLOBAL_ID,
						id_no: r.ID_NO,
						company_id: r.COMPANY_ID,
						start_dt: r.START_DT,
						end_dt: r.END_DT,
						kapamilya_dt: r.KAPAMILYA_DT,
						membership_dt: r.MEMBERSHIP_DT,
						exclusive_fl: r.EXCLUSIVE_FL,
						status_cd: r.STATUS_CD,
						cessation_reason_cd: r.CESSATION_REASON_CD,
						remarks: r.REMARKS,
						division_id: r.DIVISION_ID,
						location_cd: r.LOCATION_CD,
						category_id: r.CATEGORY_ID,
						job_id: r.JOB_ID,
						payroll_grp_id: r.PAYROLL_GRP_ID,
						professional_type_cd: r.PROFESSIONAL_TYPE_CD,
						cessation_end_dt: r.CESSATION_END_DATE
					});
				});
				_this2.obj_personnel.COMPANY_SPECIFIC.list = tmp;
				_toastr2.default.clear();
				_toastr2.default.success("", "Company info has been loaded...");
				if (_this2.obj_personnel.COMPANY.length > 0) {
					_this2.dd_companyChanged();
				}
				_settings2.default.isNavigating = false;
			}, function (failed) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(failed, "error in fetching company specific data.");
			});
		};

		company_info_main.prototype.loadAccreditation = function loadAccreditation(global_company_id) {
			var _this3 = this;

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from("ACCREDITATION_TRX").where("GLOBAL_COMPANY_ID", "==", global_company_id);
			var accreditation = [];
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (success) {
				_.each(success.results, function (r) {

					var job_group = _this3.obj_personnel.JOB_GROUP.find(function (x) {
						return x.id == r.JOB_GRP_ID;
					});
					var job = _this3.obj_personnel.JOB.find(function (x) {
						return x.value == r.JOB_ID;
					});
					var division = _this3.obj_personnel.DIVISION.find(function (x) {
						return x.id == r.DIVISION_ID;
					});
					var _eff_start_dt = (0, _helpers.formatDate)(r.EFF_START_DT);
					var _eff_end_dt = (0, _helpers.formatDate)(r.EFF_END_DT);

					accreditation.push({
						accreditation_id: r.ACCREDITATION_ID,
						global_company_id: r.GLOBAL_COMPANY_ID,

						eff_start_dt: _eff_start_dt,
						eff_end_dt: _eff_end_dt,
						division_id: r.DIVISION_ID,
						division_text: division.text,
						category_id: r.CATEGORY_ID,
						job_grp_id: r.JOB_GRP_ID,
						job_grp_text: job_group.text,
						job_id: r.JOB_ID,
						job_text: job.text,
						competency: r.COMPETENCY,
						home_fl: r.HOME_FL,
						entry_fl: r.ENTRY_FL,
						accreditation_memo: r.ACCREDITATION_MEMO
					});
				});
				_this3.obj_personnel.COMPANY_SPECIFIC.model.accreditation_list = accreditation;
				_settings2.default.isNavigating = false;
			}, function (failed) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(failed, "Error in fetching company specific data.");
			});
		};

		company_info_main.prototype.loadSuspend = function loadSuspend(global_id, company_id) {
			var _this4 = this;

			_settings2.default.isNavigating = true;
			var pred1 = _breezeClient2.default.Predicate.create('GLOBAL_ID', '==', global_id);
			var pred2 = _breezeClient2.default.Predicate.create('SUSPEND_LEVEL', '==', 2);
			var pred3 = _breezeClient2.default.Predicate.create("COMPANY_ID", "==", company_id);
			var finalPred = _breezeClient2.default.Predicate.and([pred1, pred2]);
			var query = (0, _entityManagerFactory.EntityQuery)().from("SUSPEND_TRX").where(finalPred).orderByDesc("SUSPEND_ID").take(1);
			var suspend = [];
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (success) {

				if (success.results.length > 0) {
					_.each(success.results, function (result) {
						suspend.push({
							suspend_id: result.SUSPEND_ID,
							start_dt: result.START_DT,
							end_dt: result.END_DT,
							company_id: result.COMPANY_ID
						});
					});

					_this4.obj_personnel.COMPANY_SPECIFIC.model.suspend_id = suspend[0].suspend_id;

					var suspended_start_dt = (0, _helpers.formatDate)(suspend[0].start_dt);
					_this4.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt = suspended_start_dt;
					if (suspended_start_dt.length > 0) {
						$("#suspended_start_dt").datepicker("setValue", suspended_start_dt);
					}

					var suspended_end_dt = (0, _helpers.formatDate)(suspend[0].end_dt);
					_this4.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt = suspended_end_dt;
					if (suspended_start_dt.length > 0) {
						$("#suspended_end_dt").datepicker("setValue", suspended_end_dt);
					}
				}
				_settings2.default.isNavigating = false;
			}, function (error) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(error, "Error in fetching company specific data.");
			});
		};

		company_info_main.prototype.loadPersonnelBank = function loadPersonnelBank(global_company_id) {
			var _this5 = this;

			_settings2.default.isNavigating = true;
			var pred1 = _breezeClient2.default.Predicate.create("GLOBAL_COMPANY_ID", "==", global_company_id);
			var pred2 = _breezeClient2.default.Predicate.create("ACCOUNT_NO", "!=", "CHECK");
			var finalPred = _breezeClient2.default.Predicate.and([pred1, pred2]);
			var query = (0, _entityManagerFactory.EntityQuery)().from("PERSONNEL_BANK_TRX").where(finalPred).take(1);

			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {
				if (s1.results.length > 0) {
					_this5.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.personnel_bank_id = s1.results[0].PERSONNEL_BANK_ID;
					_this5.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.global_company_id = s1.results[0].GLOBAL_COMPANY_ID;
					_this5.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id = s1.results[0].BANK_ID + "";
					_this5.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name = s1.results[0].ACCT_NAME;
					_this5.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no = s1.results[0].ACCOUNT_NO;
				} else {
					_this5.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.personnel_bank_id = "";
					_this5.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.global_company_id = "";
					_this5.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id = "";
					_this5.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name = "";
					_this5.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no = "";
				}
				_this5.dd_bankChanged();
				_settings2.default.isNavigating = false;
			}, function (e1) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(e1, "Error in querying personnel bank info.");
			});
		};

		company_info_main.prototype.loadLog = function loadLog(global_company_id) {
			var _this6 = this;

			var tmpList = [];
			var query = (0, _entityManagerFactory.EntityQuery)().from("GLOBAL_COMPANY_MSTR").where("GLOBAL_COMPANY_ID", "==", global_company_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {

				if (s1.results.length > 0) {
					if (s1.results[0].CREATED_BY != null) {
						var user = s1.results[0].CREATED_BY;
						var date = new Date(s1.results[0].CREATED_DT);
						_this6.lblCreatedBy = user + ' ' + _moment2.default.utc(date).format("MM/DD/YYYY hh:mm A");
					}

					if (s1.results[0].LAST_UPDATED_BY != null) {
						var user = s1.results[0].LAST_UPDATED_BY;
						var date = new Date(s1.results[0].LAST_UPDATED_DT);
						_this6.lblUpdatedBy = user + ' ' + _moment2.default.utc(date).format("MM/DD/YYYY hh:mm A");
					} else {
						_this6.lblUpdatedBy = "";
					}
				}
			});
		};

		company_info_main.prototype.OrderByDate = function OrderByDate(a, b) {
			if (a.date > b.date) return 1;
			if (a.date < b.date) return -1;
			return 0;
		};

		company_info_main.prototype.loadJobDropdown = function loadJobDropdown() {
			var _this7 = this;

			this.obj_personnel.JOB = [];
			_.each(this.obj_personnel.JOB_GROUP, function (jc) {
				(0, _masterfiles.getLookups)().JOB_MSTR.forEach(function (j) {
					if (j.JOB_GRP_ID == jc.id) {
						_this7.obj_personnel.JOB.push({
							value: j.JOB_ID,
							text: j.JOB_DESC,
							group: j.JOB_GRP_ID
						});
					}
				});
			});
			this.obj_personnel.JOB.sort(this.OrderByText);
		};

		company_info_main.prototype.dd_companyChanged = function dd_companyChanged() {
			var _this8 = this;

			var company_id = this.obj_personnel.COMPANY_SPECIFIC.model.company_id;

			if (company_id == 2 || company_id == 3 || company_id == 4 || company_id == 7 || company_id == 8) {
				this._disableIDNo = false;
				this.obj_personnel.COMPANY_SPECIFIC.model.id_no = "";
			} else {
				this._disableIDNo = true;
				this.obj_personnel.COMPANY_SPECIFIC.model.id_no = "000000";
			}

			var global_company = this.obj_personnel.COMPANY_SPECIFIC.list.find(function (gc) {
				return gc.company_id == company_id;
			});

			if ((0, _masterfiles.getLookups)() != null) {

				this.obj_personnel.DIVISION = [];
				this.obj_personnel.CATEGORY = [];
				this.obj_personnel.JOB_GROUP = [];


				(0, _masterfiles.getLookups)().DIVISION_MSTR.forEach(function (d) {
					if (d.COMPANY_ID == company_id) {
						_this8.obj_personnel.DIVISION.push({
							id: d.DIVISION_ID,
							level: d.DIVISION_LEVEL,
							value: d.DIVISION_CD,
							text: d.DIVISION_NAME
						});
					}
				});

				(0, _masterfiles.getLookups)().CATEGORY_MSTR.forEach(function (c) {
					if (c.COMPANY_ID == company_id) {
						_this8.obj_personnel.CATEGORY.push({
							id: c.CATEGORY_ID,
							value: c.CATEGORY_CD,
							text: c.CATEGORY_DESC
						});
					}
				});

				(0, _masterfiles.getLookups)().JOB_GRP_MSTR.forEach(function (j) {
					if (j.COMPANY_ID == company_id) {
						_this8.obj_personnel.JOB_GROUP.push({
							id: j.JOB_GRP_ID,
							value: j.JOB_GRP_CD,
							text: j.JOB_GRP_DESC
						});
					}
				});

				this.obj_personnel.JOB_GROUP.sort(this.OrderByText);
				this.obj_personnel.CATEGORY.sort(this.OrderByText);

				if (global_company != null && global_company != undefined) {
					this._disableStatus = false;
					this._disableTabsInput = false;
					this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id = global_company.global_company_id;
					this.obj_personnel.COMPANY_SPECIFIC.model.id_no = global_company.id_no;
					var startDt = (0, _helpers.formatDate)(global_company.start_dt);
					if (startDt.length > 0 && startDt != "01/01/0001") {
						this.obj_personnel.COMPANY_SPECIFIC.model.start_dt = startDt;
						$("#_start_dt").datepicker("setValue", new Date(startDt));
					} else {
						this.obj_personnel.COMPANY_SPECIFIC.model.start_dt = "";
					}
					var endDt = (0, _helpers.formatDate)(global_company.end_dt);

					if (endDt.length > 0 && endDt != "01/01/0001") {
						this.obj_personnel.COMPANY_SPECIFIC.model.end_dt = endDt;
						$("#_end_dt").datepicker("setValue", new Date(endDt));
					} else {
						this.obj_personnel.COMPANY_SPECIFIC.model.end_dt = "";
					}

					var kapamilya_dt = (0, _helpers.formatDate)(global_company.kapamilya_dt);
					if (kapamilya_dt.length > 0 && kapamilya_dt != "01/01/0001") {
						this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt = kapamilya_dt;
						$("#kapamilya_dt").datepicker("setValue", new Date(kapamilya_dt));
					} else {
						this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt = "";
					}

					var membership_dt = (0, _helpers.formatDate)(global_company.membership_dt);
					if (membership_dt.length > 0 && membership_dt != "01/01/0001") {
						this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt = membership_dt;
						$("#membership_dt").datepicker("setValue", new Date(membership_dt));
					} else {
						this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt = "";
					}

					var cessation_dt = (0, _helpers.formatDate)(global_company.cessation_end_dt);
					this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt = cessation_dt;
					if (cessation_dt.length > 0) {
						$("#cessation_end_dt").datepicker("setValue", new Date(cessation_dt));
					}

					this.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl = global_company.exclusive_fl == "1" ? true : false;
					this.obj_personnel.COMPANY_SPECIFIC.model.status_cd = global_company.status_cd;
					this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd = global_company.cessation_reason_cd;
					this.obj_personnel.COMPANY_SPECIFIC.model.remarks = global_company.remarks;
					this.obj_personnel.COMPANY_SPECIFIC.model.division_id = global_company.division_id + "";

					this.obj_personnel.COMPANY_SPECIFIC.model.location_cd = global_company.location_cd;
					this.obj_personnel.COMPANY_SPECIFIC.model.category_id = global_company.category_id + "";

					this.obj_personnel.COMPANY_SPECIFIC.model.payroll_grp_id = global_company.payroll_grp_id + "";
					this.obj_personnel.COMPANY_SPECIFIC.model.professional_type_cd = global_company.professional_type_cd;
					if (global_company.status_cd == "SUSPEND") {
						this.loadSuspend(global_company.global_id, global_company.company_id);
					}

					this.obj_personnel.COMPANY_SPECIFIC.model.accreditation = global_company.accreditation;
					this.loadJobDropdown();
					this.obj_personnel.COMPANY_SPECIFIC.model.job_id = global_company.job_id + "";
					this.loadAccreditation(global_company.global_company_id);
					this.loadPersonnelBank(global_company.global_company_id);
					this.loadLog(global_company.global_company_id);
				} else {
					this._disableStatus = true;
					this._disableTabsInput = true;

					this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id = "";
					this.obj_personnel.COMPANY_SPECIFIC.model.status_cd = "ACTV";
					this.obj_personnel.COMPANY_SPECIFIC.model.start_dt = "";
					this.obj_personnel.COMPANY_SPECIFIC.model.end_dt = "";
					this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt = "";
					this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt = "";
					this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt = "";
					this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt = "";
					this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd = "";
					this.obj_personnel.COMPANY_SPECIFIC.model.remarks = "";
					this.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl = false;
					this.lblCreatedBy = "";
					this.lblUpdatedBy = "";
					if (this.obj_personnel.DIVISION.length > 0) this.obj_personnel.COMPANY_SPECIFIC.model.division_id = this.obj_personnel.DIVISION[0].id;
					if (this.obj_personnel.CATEGORY.length > 0) this.obj_personnel.COMPANY_SPECIFIC.model.category_id = this.obj_personnel.CATEGORY[0].id;

					this.loadJobDropdown();

					if (this.obj_personnel.JOB.length > 0) this.obj_personnel.COMPANY_SPECIFIC.model.job_id = this.obj_personnel.JOB[0].value;

					if (this.obj_personnel.PAYROLL_GROUP.length > 0) this.obj_personnel.COMPANY_SPECIFIC.model.payroll_grp_id = this.obj_personnel.PAYROLL_GROUP[0].id;
					if (this.obj_personnel.PROFESSIONAL_TYPE.length > 0) this.obj_personnel.COMPANY_SPECIFIC.model.professional_type_cd = this.obj_personnel.PROFESSIONAL_TYPE[0].value;

					this.obj_personnel.COMPANY_SPECIFIC.model.suspend_id = 0;
					this.obj_personnel.COMPANY_SPECIFIC.model.accreditation_list = [];

					if (this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank != undefined && this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank != null) {
						this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.personnel_bank_id = "";
						this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.global_company_id = "";
						this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id = "";
						this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name = "";
						this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no = "";
					}
				}

				if (this.obj_personnel.JOB_GROUP.length > 0) {
					this.obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id = this.obj_personnel.JOB_GROUP[0].id;
				}

				this.dd_jobGroupChange();
				this.dd_divisionChanged();
				this.dd_statusChanged();
			}
		};

		company_info_main.prototype.dd_divisionChanged = function dd_divisionChanged() {
			var division_id = this.obj_personnel.COMPANY_SPECIFIC.model.division_id;
			var division = this.obj_personnel.DIVISION.find(function (d) {
				return d.id == division_id;
			});

			if (division != undefined && division != null && division.text.indexOf("REGIONAL DIVISION") != -1) {
				this._disableLocations = false;
			} else {
				this._disableLocations = true;
				this.obj_personnel.COMPANY_SPECIFIC.model.location_cd = "--NONE--";
			}
		};

		company_info_main.prototype.dd_statusChanged = function dd_statusChanged() {
			var stat = this.obj_personnel.COMPANY_SPECIFIC.model.status_cd;
			if (stat == "ACTV") {
				this._hideInactiveField = true;
				this._hideSuspendField = true;
				this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.remarks = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt = "";
				$("#suspended_start_dt").val("");
				this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt = "";
				$("#suspended_end_dt").val("");
			} else if (stat == "INACTV") {
				this._hideInactiveField = false;
				this._hideSuspendField = true;
				this.dd_cessationStatusChanged();
				this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt = "";
				$("#suspended_start_dt").val("");
				this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt = "";
				$("#suspended_end_dt").val("");
			} else if (stat == "SUSPEND") {
				this._hideInactiveField = true;
				this._hideSuspendField = false;
				this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.remarks = "";
			}
		};

		company_info_main.prototype.dd_cessationStatusChanged = function dd_cessationStatusChanged() {
			var cess_cd = this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd;
			switch (cess_cd) {
				case "DECEASED":
				case "RETIRED":
				case "RESIGNED":
				case "END_CONTRACT":
				case "TERMINATION":
					this._hideCessationDate = false;
					break;
				default:
					this._hideCessationDate = true;
					this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt = "";
					break;
			}
		};

		company_info_main.prototype.validate = function validate() {

			this.obj_personnel.COMPANY_SPECIFIC.model.start_dt = $("#_start_dt").val();
			this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt = $("#cessation_end_dt").val();
			var strValidation = "";

			if (this.obj_personnel.COMPANY_SPECIFIC.model.id_no == undefined || this.obj_personnel.COMPANY_SPECIFIC.model.id_no == null || this.obj_personnel.COMPANY_SPECIFIC.model.id_no.length == 0) {
				strValidation += "No id number specified. <br/>";
			}

			if (this.obj_personnel.COMPANY_SPECIFIC.model.status_cd == "SUSPEND") {

				var sus_start = null;
				var sus_end = null;
				this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt = $("#suspended_start_dt").val();
				this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt = $("#suspended_end_dt").val();
				if (this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt != undefined && this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt != null && this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt.length > 0) {
					if (!(0, _moment2.default)(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt).isValid()) {
						strValidation += "Invalid suspension start date.<br/>";
					} else {
						sus_start = new Date(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt);
					}
				} else {
					strValidation += "No start date of suspension specified.<br/>";
				}

				if (this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt != undefined && this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt != null && this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt.length > 0) {
					if (!(0, _moment2.default)(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt).isValid()) {
						strValidation += "Invalid suspension end date.<br/>";
					} else {
						sus_end = new Date(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt);
					}
				} else {
					strValidation += "No end date of suspension specified.<br/>";
				}

				if (sus_start != null && sus_end != null) {
					if (sus_end < sus_start) {
						strValidation += "end date of suspension cannot be greater than the start date.<br/>";
					}
				}
			} else if (this.obj_personnel.COMPANY_SPECIFIC.model.status_cd == "INACTV") {
				if (this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd == undefined || this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd == null || this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd.length == 0) {
					strValidation += "No Reason of cessation specified.<br/>";
				}

				if (!this._hideCessationDate) {
					if (this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt != undefined && this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt != null && this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt.length > 0) {
						if (!(0, _moment2.default)(this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt).isValid()) {
							strValidation += "Invalid cessation date.<br/>";
						} else {
							var cess_cd = this.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd;
							if (cess_cd == "DECEASED") {
								var cessation_dt = new Date(this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt);
								var today = new Date();
								if (cessation_dt > today) {
									strValidation += "Are you planning to kill the user?<br/>";
								}
							}
						}
					} else {
						strValidation += "No cessation date specified.<br/>";
					}
				}
			}

			var selectedBank = this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id;
			if (selectedBank != undefined && selectedBank.length > 0) {
				var account_no = this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no;
				if (account_no == undefined || account_no.length == 0) {
					strValidation += "No account number specified.<br/>";
				} else if (account_no.length != 10) {
					strValidation += "Account number must be 10 digit.<br/>";
				}
			}

			if (strValidation.length > 0) {
				_toastr2.default.clear();
				_toastr2.default.error("", strValidation);
			} else {
				this.obj_personnel.COMPANY_SPECIFIC.model.end_dt = $("#_end_dt").val();
				this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt = $("#kapamilya_dt").val();
				this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt = $("#membership_dt").val();
				if (this.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl == undefined) this.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl = false;

				var cid = this.obj_personnel.COMPANY_SPECIFIC.model.company_id;
				var gcid = this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id;
				if (gcid.length == 0) {
					this.saveCompany(cid);
				} else {
					this.updateCompany(gcid);
				}
			}
		};

		company_info_main.prototype.convertToGMT8 = function convertToGMT8(date) {
			if (date == undefined || date == null || date.length == 0) return null;
			var tempDt = (0, _moment2.default)(date).add(8, 'hours');
			return new Date(tempDt);
		};

		company_info_main.prototype.saveCompany = function saveCompany(company_id) {
			var _this9 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);

			var lstart_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.start_dt);
			var lend_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.end_dt);
			var lkapmilya_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt);
			var lmembership_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt);
			var lcessation_end_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt);

			var LastID = "000000";
			var currentYear = new Date().getFullYear().toString().substring(2, 4);
			var query = (0, _entityManagerFactory.EntityQuery)().from("COMPANY_SPECIFIC_INDEX").where("COMPANY_SPECIFIC_ID", "==", company_id).take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s) {
				LastID = s.results[0].COMPANY_INDEX;
				var lastYear = LastID.toString().substring(0, 2);
				if (lastYear != currentYear) {
					LastID = currentYear + "0001";
				}

				query = (0, _entityManagerFactory.EntityQuery)().from("GLOBAL_COMPANY_MSTR").orderByDesc("GLOBAL_COMPANY_ID").take(1);
				(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s2) {
					var maxID = 1;
					if (s2.results.length > 0) {
						maxID = s2.results[0].GLOBAL_COMPANY_ID + 1;
					}

					var global_company_mstr = {
						GLOBAL_ID: _this9.obj_personnel.global_indiv_id,
						START_DT: lstart_dt.length == 0 ? null : lstart_dt,
						END_DT: lend_dt.length == 0 ? null : lend_dt,
						COMPANY_ID: company_id,
						GLOBAL_COMPANY_ID: maxID,
						ID_NO: LastID,
						CESSATION_REASON_CD: _this9.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd,
						CATEGORY_ID: _this9.obj_personnel.COMPANY_SPECIFIC.model.category_id,
						DIVISION_ID: _this9.obj_personnel.COMPANY_SPECIFIC.model.division_id,
						PAYROLL_GRP_ID: _this9.obj_personnel.COMPANY_SPECIFIC.model.payroll_grp_id,
						JOB_ID: _this9.obj_personnel.COMPANY_SPECIFIC.model.job_id,
						PROFESSIONAL_TYPE_CD: _this9.obj_personnel.COMPANY_SPECIFIC.model.professional_type_cd,
						STATUS_CD: _this9.obj_personnel.COMPANY_SPECIFIC.model.status_cd,
						EXCLUSIVE_FL: _this9.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl ? "1" : "0",
						REMARKS: _this9.obj_personnel.COMPANY_SPECIFIC.model.remarks,
						KAPAMILYA_DT: lkapmilya_dt.length == 0 ? null : lkapmilya_dt,
						MEMBERSHIP_DT: lmembership_dt.length == 0 ? null : lmembership_dt,
						LOCATION_CD: _this9.obj_personnel.COMPANY_SPECIFIC.model.location_cd,
						CESSATION_END_DATE: lcessation_end_dt.length == 0 ? null : lcessation_end_dt,
						CREATED_BY: _this9.obj_personnel.USER.USER_ID,
						CREATED_DT: dateToday
					};

					var entity = (0, _entityManagerFactory.EntityManager)().createEntity("GLOBAL_COMPANY_MSTR", global_company_mstr);
					(0, _entityManagerFactory.EntityManager)().addEntity(entity);
					(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s3) {
						_settings2.default.isNavigating = false;
						_toastr2.default.success("", "Record saved.");
						_this9.updateCompanyIndex(company_id, LastID);
						_this9.loadGlobalCompany(_this9.obj_personnel.global_indiv_id);
					}, function (e3) {
						_settings2.default.isNavigating = false;
						if (entity != null) {
							entity.entityAspect.setDeleted();
						}
						(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
							var errors = entity.entityAspect.getValidationErrors();
							if (errors.length > 0) console.log(errors);
						});

						_toastr2.default.error(e3, "Error in saving global company mstr.");
					});
				}, function (e2) {
					_settings2.default.isNavigating = false;

					_toastr2.default.clear(e2, "Error in getting global company id.");
				});
			}, function (e) {
				_settings2.default.isNavigating = false;

				_toastr2.default.error(e, "Error in generating ID.");
			});
		};

		company_info_main.prototype.updateCompany = function updateCompany(global_company_id) {
			var _this10 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);

			var lstart_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.start_dt);
			var lend_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.end_dt);
			var lkapamilya_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt);
			var lmembership_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.membership_dt);
			var lcessation_end_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt);
			var lsuspend_start_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt);
			var lsuspend_end_dt = this.convertToGMT8(this.obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt);

			var query = (0, _entityManagerFactory.EntityQuery)().from("GLOBAL_COMPANY_MSTR").where("GLOBAL_COMPANY_ID", "==", global_company_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s) {

				s.results[0].START_DT = lstart_dt;
				s.results[0].END_DT = lend_dt;
				s.results[0].KAPAMILYA_DT = lkapamilya_dt;
				s.results[0].MEMBERSHIP_DT = lmembership_dt;
				s.results[0].EXCLUSIVE_FL = _this10.obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl ? "1" : "0";
				s.results[0].DIVISION_ID = _this10.obj_personnel.COMPANY_SPECIFIC.model.division_id;
				s.results[0].LOCATION_CD = _this10.obj_personnel.COMPANY_SPECIFIC.model.location_cd;
				s.results[0].CATEGORY_ID = _this10.obj_personnel.COMPANY_SPECIFIC.model.category_id;
				s.results[0].JOB_ID = _this10.obj_personnel.COMPANY_SPECIFIC.model.job_id;
				s.results[0].PAYROLL_GRP_ID = _this10.obj_personnel.COMPANY_SPECIFIC.model.payroll_grp_id;
				s.results[0].PROFESSIONAL_TYPE_CD = _this10.obj_personnel.COMPANY_SPECIFIC.model.professional_type_cd;
				s.results[0].STATUS_CD = _this10.obj_personnel.COMPANY_SPECIFIC.model.status_cd;
				switch (_this10.obj_personnel.COMPANY_SPECIFIC.model.status_cd) {
					case "INACTV":
						s.results[0].CESSATION_REASON_CD = _this10.obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd;
						s.results[0].CESSATION_END_DATE = lcessation_end_dt.length == 0 ? null : lcessation_end_dt;
						s.results[0].REMARKS = _this10.obj_personnel.COMPANY_SPECIFIC.model.remarks;
						break;
					case "SUSPEND":
					case "ACTV":
						s.results[0].CESSATION_REASON_CD = null;
						s.results[0].CESSATION_END_DATE = null;
						s.results[0].REMARKS = null;
						break;
				}
				s.results[0].LAST_UPDATED_BY = _this10.obj_personnel.USER.USER_ID;
				s.results[0].LAST_UPDATED_DT = dateToday;

				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s1) {

					if (_this10.obj_personnel.COMPANY_SPECIFIC.model.status_cd == "SUSPEND") {
						var suspend_id = _this10.obj_personnel.COMPANY_SPECIFIC.model.suspend_id;
						if (suspend_id == undefined || suspend_id == null || suspend_id == 0) {
							_this10.saveSuspend(suspend_id, lsuspend_start_dt, lsuspend_end_dt);
						} else {
							_this10.updateSuspend(suspend_id, lsuspend_start_dt, lsuspend_end_dt);
						}
					}

					var pbi = _this10.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.personnel_bank_id;
					var bank_id = _this10.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id;
					var account_name = _this10.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name;
					var account_no = _this10.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no;
					if (pbi == undefined || pbi.toString().length == 0) {
						if (bank_id != undefined && bank_id.toString().length > 0) {
							_this10.savePersonnelBank(global_company_id, bank_id, account_name, account_no);
						}
					} else if (pbi != undefined && pbi.toString().length > 0) {
						if (bank_id == undefined || bank_id.toString().length == 0) {
							_this10.updatePersonnelBank(pbi, bank_id, account_name, "CHECK");
						} else {
							_this10.updatePersonnelBank(pbi, bank_id, account_name, account_no);
						}
					}

					_this10.loadGlobalCompany(_this10.obj_personnel.global_indiv_id);
					_settings2.default.isNavigating = false;
					_toastr2.default.success("", "Record saved.");
				}, function (e1) {
					_settings2.default.isNavigating = false;
					_toastr2.default.error(e1, "Error in updating global company info.");
				});
			}, function (e) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(e, "Error in updating global company.");
			});
		};

		company_info_main.prototype.saveSuspend = function saveSuspend(company_id, start_dt, end_dt) {
			var _this11 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = (0, _moment2.default)(new Date()).add(8, "hours");
			dateToday = new Date(dateToday);

			var query = (0, _entityManagerFactory.EntityQuery)().from("SUSPEND_TRX").orderByDesc("SUSPEND_ID").take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s2) {
				var maxID = 1;
				if (s2.results.length > 0) {
					maxID = s2.results[0].SUSPEND_ID + 1;
				}
				var suspend_trx = {
					SUSPEND_ID: maxID,
					GLOBAL_ID: _this11.obj_personnel.global_indiv_id,
					COMPANY_ID: company_id,
					SUSPEND_LEVEL: 2,
					START_DT: start_dt,
					END_DT: end_dt,
					CREATED_BY: _this11.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};

				var entity = (0, _entityManagerFactory.EntityManager)().createEntity("SUSPEND_TRX", suspend_trx);
				(0, _entityManagerFactory.EntityManager)().addEntity(entity);
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s3) {
					_settings2.default.isNavigating = false;
				}, function (e3) {
					_settings2.default.isNavigating = false;
					if (entity != null) {
						entity.entityAspect.setDeleted();
					}
					_toastr2.default.error(e3, "Error in saving suspend info.");
				});
			}, function (e2) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(e2, "Error in quering suspend id.");
			});
		};

		company_info_main.prototype.updateSuspend = function updateSuspend(suspend_id, start_dt, end_dt) {
			var _this12 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = (0, _moment2.default)(new Date()).add(8, "hours");
			dateToday = new Date(dateToday);
			var query = (0, _entityManagerFactory.EntityQuery)().from("SUSPEND_TRX").where("SUSPEND_ID", "==", suspend_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s4) {
				s4.results[0].START_DT = start_dt;
				s4.results[0].END_DT = end_dt;
				s4.results[0].LAST_UPDATED_BY = _this12.obj_personnel.USER.USER_ID;
				s4.results[0].LAST_UPDATED_DT = dateToday;
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s5) {
					console.log("Suspend record has been updated.");
					_settings2.default.isNavigating = false;
				}, function (e5) {
					_settings2.default.isNavigating = false;
					_toastr2.default.error(e5, "Error in updating suspend info.");
				});
			}, function (e4) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(e4, "Error in querying suspend info.");
			});
		};

		company_info_main.prototype.savePersonnelBank = function savePersonnelBank(global_company_id, bank_id, acct_name, account_no) {
			var _this13 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = (0, _moment2.default)(new Date()).add(8, "hours");
			dateToday = new Date(dateToday);
			var query = (0, _entityManagerFactory.EntityQuery)().from("PERSONNEL_BANK_TRX").orderByDesc("PERSONNEL_BANK_ID").take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (q1) {
				var maxID = 1;
				if (q1.results.length > 0) {
					maxID = q1.results[0].PERSONNEL_BANK_ID + 1;
				}

				var personnel_bank_trx = {
					PERSONNEL_BANK_ID: maxID,
					GLOBAL_COMPANY_ID: global_company_id,
					BANK_ID: bank_id,
					ACCT_NAME: acct_name,
					ACCOUNT_NO: account_no,
					CREATED_BY: _this13.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};

				var entity = (0, _entityManagerFactory.EntityManager)().createEntity("PERSONNEL_BANK_TRX", personnel_bank_trx);
				(0, _entityManagerFactory.EntityManager)().addEntity(entity);
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s2) {
					_this13.loadPersonnelBank(global_company_id);
				}, function (e2) {
					_settings2.default.isNavigating = false;
					if (entity != null) {
						entity.entityAspect.setDeleted();
					}
					_toastr2.default.error(e2, "Error in saving personnel bank info.");
				});
			}, function (e1) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(e1, "Error in querying personnel bank id.");
			});
		};

		company_info_main.prototype.updatePersonnelBank = function updatePersonnelBank(personnel_bank_id, bank_id, acct_name, account_no) {
			var _this14 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = (0, _moment2.default)(new Date()).add(8, "hours");
			dateToday = new Date(dateToday);
			var query = (0, _entityManagerFactory.EntityQuery)().from("PERSONNEL_BANK_TRX").where("PERSONNEL_BANK_ID", "==", personnel_bank_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (q1) {

				if (q1.results.length == 0) {
					_toastr2.default.error("", "No personnel bank with an ID of " + personnel_bank_id + " found.");
					return;
				}

				if (account_no != "CHECK") {
					q1.results[0].BANK_ID = bank_id;
				}

				q1.results[0].ACCOUNT_NO = account_no;
				q1.results[0].LAST_UPDATED_BY = _this14.obj_personnel.USER.USER_ID;
				q1.results[0].LAST_UPDATED_DT = dateToday;

				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s2) {
					_this14.loadPersonnelBank(_this14.obj_personnel.COMPANY_SPECIFIC.model.global_company_id);
					console.log("", "bank info has been updated.");
				}, function (e2) {
					_settings2.default.isNavigating = false;
					_toastr2.default.error(e2, "Error in updating personnel bank.");
				});
			}, function (e1) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error("", "Error in querying personnel bank.");
			});
		};

		company_info_main.prototype.dd_bankChanged = function dd_bankChanged() {
			var bank_id = this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id;
			if (bank_id != undefined && bank_id != null && bank_id.length > 0) {
				var bank = this.obj_personnel.BANK.find(function (b) {
					return b.id == bank_id;
				});
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_nm = bank.long_nm;
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name = this.obj_personnel.HEADER.last_name + ", " + this.obj_personnel.HEADER.given_name + " " + this.obj_personnel.HEADER.middle_name;
			} else {

				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_nm = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name = "";
				this.obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no = "";
			}
		};

		company_info_main.prototype.updateCompanyIndex = function updateCompanyIndex(company_id, lastIndex) {

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from("COMPANY_SPECIFIC_INDEX").where("COMPANY_SPECIFIC_ID", "==", company_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s) {
				s.results[0].COMPANY_INDEX = lastIndex + 1;
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s1) {
					console.log("index was updated.");
					_settings2.default.isNavigating = false;
				}, function (e1) {
					_settings2.default.isNavigating = false;
					_toastr2.default.error(e1, "Error in updating company specific index.");
				});
			}, function (e) {
				_settings2.default.isNavigating = false;
				_toastr2.default.clear();
				_toastr2.default.error(e, "Error in querying company specific index.");
			});
		};

		company_info_main.prototype.btnAdd_accreditation = function btnAdd_accreditation() {
			this.accreditation_status = "ADD";
		};

		company_info_main.prototype.btnEdit_accreditation = function btnEdit_accreditation(item) {
			console.log(item);
			this.accreditation_status = "EDIT";
			this.obj_personnel.COMPANY_SPECIFIC.model.a_id = item.accreditation_id;
			this.obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id = item.job_grp_id;
			this.obj_personnel.COMPANY_SPECIFIC.model.a_job_id = item.job_id;
			var start_dt = (0, _helpers.formatDate)(item.eff_start_dt);
			this.obj_personnel.COMPANY_SPECIFIC.model.a_start_dt = start_dt;
			var end_dt = (0, _helpers.formatDate)(item.eff_end_dt);
			this.obj_personnel.COMPANY_SPECIFIC.model.a_end_dt = end_dt;
			this.obj_personnel.COMPANY_SPECIFIC.model.a_competency = item.competency;
		};

		company_info_main.prototype.btnRemove_accreditation = function btnRemove_accreditation(item) {
			var _this15 = this;

			this.DialogService.open({ viewModel: _DialogBox.DialogBox, model: { title: "Confirm remove.", message: "Are you sure you want to remove this accreditation record?" } }).whenClosed(function (response) {
				if (!response.wasCancelled) {
					_settings2.default.isNavigating = true;

					var query = (0, _entityManagerFactory.EntityQuery)().from('ACCREDITATION_TRX').where('ACCREDITATION_ID', '==', item.accreditation_id);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (success) {

						success.results[0].entityAspect.setDeleted();

						(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (saveSuccess) {
							_toastr2.default.success("", "The accreditation info was successfully removed.");
							_this15.loadAccreditation(_this15.obj_personnel.COMPANY_SPECIFIC.model.global_company_id);
						}, function (error) {
							_settings2.default.isNavigating = false;
							_toastr2.default.clear();
							_toastr2.default.error("", "Error in removing accreditation info.");
						});
					});
				}
			});
		};

		company_info_main.prototype.clearAccreditationField = function clearAccreditationField() {
			this.accreditation_status = "";
			this.obj_personnel.COMPANY_SPECIFIC.model.a_id = "";
			if (this.obj_personnel.JOB_GROUP.length > 0) {
				this.obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id = this.obj_personnel.JOB_GROUP[0].id;
				this.dd_jobGroupChange();

				if (this.obj_personnel.JOB.length > 0) {
					this.obj_personnel.COMPANY_SPECIFIC.model.a_job_id = this.obj_personnel.JOB[0].id;
				}
			}

			this.obj_personnel.COMPANY_SPECIFIC.model.a_competency = "";
			this.obj_personnel.COMPANY_SPECIFIC.model.a_start_dt = "";
			this.obj_personnel.COMPANY_SPECIFIC.model.a_end_dt = "";
			$("#a_start_dt").val("");
			$("#a_end_dt").val("");
		};

		company_info_main.prototype.Digit = function Digit(event) {
			return (0, _helpers.isDigit)(event);
		};

		company_info_main.prototype.validateAccreditation = function validateAccreditation() {
			var strValidation = "";
			var _competency = this.obj_personnel.COMPANY_SPECIFIC.model.a_competency;
			var _start_dt = $("#a_start_dt").val();
			var _end_dt = $("#a_end_dt").val();
			if (_competency == undefined || _competency == null || _competency.length == 0) {
				strValidation += "No competency level specified.<br/>";
			}

			if (_start_dt == undefined || _start_dt == null || _start_dt.length == 0) {
				strValidation += "No start date specified. <br/>";
			} else {
				if (_end_dt == undefined || _end_dt == null || _end_dt.length == 0) {
					strValidation += "No end date specified. <br/>";
				} else {
					if (!(0, _moment2.default)(_start_dt).isValid()) {
						strValidation += "Invalid start date. <br/>";
					} else {
						if (!(0, _moment2.default)(_end_dt).isValid()) {
							strValidation += "Invalid end date. <br/>";
						} else {
							var d1 = new Date(_start_dt);
							var d2 = new Date(_end_dt);
							if (d2 < d1) {
								strValidation += "end date cannot be greater than start date. <br/>";
							} else {
								this.obj_personnel.COMPANY_SPECIFIC.model.a_start_dt = _start_dt;
								this.obj_personnel.COMPANY_SPECIFIC.model.a_end_dt = _end_dt;
							}
						}
					}
				}
			}

			if (strValidation.length > 0) {
				_toastr2.default.clear();
				_toastr2.default.error("", strValidation);
			} else {
				if (this.accreditation_status == "ADD") {
					this.saveAccreditation(this.obj_personnel.COMPANY_SPECIFIC.model.global_company_id);
				} else if (this.accreditation_status == "EDIT") {
					var accreditation_id = this.obj_personnel.COMPANY_SPECIFIC.model.a_id;
					this.updateAccreditation(accreditation_id);
				}
			}
		};

		company_info_main.prototype.saveAccreditation = function saveAccreditation(global_company_id) {
			var _this16 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);

			var query = (0, _entityManagerFactory.EntityQuery)().from("ACCREDITATION_TRX").orderByDesc("ACCREDITATION_ID").take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {
				var maxID = 1;
				if (s1.results.length > 0) {
					maxID = s1.results[0].ACCREDITATION_ID + 1;
				}

				var accreditation_trx = {
					ACCREDITATION_ID: maxID,
					GLOBAL_COMPANY_ID: global_company_id,
					EFF_START_DT: _this16.convertToGMT8(_this16.obj_personnel.COMPANY_SPECIFIC.model.a_start_dt),
					EFF_END_DT: _this16.convertToGMT8(_this16.obj_personnel.COMPANY_SPECIFIC.model.a_end_dt),
					DIVISION_ID: _this16.obj_personnel.COMPANY_SPECIFIC.model.division_id,
					CATEGORY_ID: _this16.obj_personnel.COMPANY_SPECIFIC.model.category_id,
					JOB_GRP_ID: _this16.obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id,
					JOB_ID: _this16.obj_personnel.COMPANY_SPECIFIC.model.a_job_id,
					COMPETENCY: _this16.obj_personnel.COMPANY_SPECIFIC.model.a_competency,
					HOME_FL: '0',
					ENTRY_FL: '0',
					CREATED_BY: _this16.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};
				var entity = (0, _entityManagerFactory.EntityManager)().createEntity("ACCREDITATION_TRX", accreditation_trx);
				(0, _entityManagerFactory.EntityManager)().addEntity(entity);
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s2) {
					_toastr2.default.success("", "Record saved.");
					_this16.clearAccreditationField();
					_this16.loadAccreditation(global_company_id);
				}, function (e2) {
					_settings2.default.isNavigating = false;
					if (entity != null) {
						entity.entityAspect.setDeleted();
					}
					_toastr2.default.error(e2, "Error in saving accreditation.");
				});
			}, function (e1) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(e1, "Error in querying accreditation id.");
			});
		};

		company_info_main.prototype.updateAccreditation = function updateAccreditation(accreditation_id) {
			var _this17 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = (0, _moment2.default)(new Date()).add(8, "hours");
			dateToday = new Date(dateToday);
			var query = (0, _entityManagerFactory.EntityQuery)().from("ACCREDITATION_TRX").where("ACCREDITATION_ID", "==", accreditation_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {
				if (s1.results.length == 0) {
					_toastr2.default.error("", "Error in querying accreditation info.");
					return;
				}

				s1.results[0].JOB_GRP_ID = _this17.obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id;
				s1.results[0].JOB_ID = _this17.obj_personnel.COMPANY_SPECIFIC.model.a_job_id;
				s1.results[0].COMPETENCY = _this17.obj_personnel.COMPANY_SPECIFIC.model.a_competency;
				s1.results[0].EFF_START_DT = _this17.convertToGMT8(_this17.obj_personnel.COMPANY_SPECIFIC.model.a_start_dt);
				s1.results[0].EFF_END_DT = _this17.convertToGMT8(_this17.obj_personnel.COMPANY_SPECIFIC.model.a_end_dt);
				s1.results[0].LAST_UPDATED_BY = _this17.obj_personnel.USER.USER_ID;
				s1.results[0].LAST_UPDATED_DT = dateToday;
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s2) {
					_toastr2.default.success(s2, "Accreditation has been updated.");
					_this17.clearAccreditationField();
					_this17.loadAccreditation(_this17.obj_personnel.COMPANY_SPECIFIC.model.global_company_id);
				}, function (e2) {
					_settings2.default.isNavigating = false;
					_toastr2.default.error(e2, "Error in updating accreditation info.");
				});
			}, function (e1) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(e1, "Error in querying accreditation info.");
			});
		};

		company_info_main.prototype.dd_jobGroupChange = function dd_jobGroupChange() {
			var tmp = [];
			var selectedJobGrp = this.obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id;
			_.each(this.obj_personnel.JOB, function (j) {
				if (selectedJobGrp == j.group) {
					tmp.push({
						value: j.value,
						text: j.text
					});
				}
			});
			this.accreditation_joblist = tmp;
		};

		company_info_main.prototype.OrderByText = function OrderByText(a, b) {
			if (a.text.toUpperCase() < b.text.toUpperCase()) return -1;
			if (a.text.toUpperCase() > b.text.toUpperCase()) return 1;
			return 0;
		};

		return company_info_main;
	}()) || _class);
});
define('ppid/forms/company_info_work_exp',['exports', 'toastr', 'aurelia-framework', '../obj_personnel', 'aurelia-dialog', '../../entity-manager-factory', 'breeze-client', '../modals/ppid_search', '../modals/DialogBox', 'moment', '../../helpers', 'settings'], function (exports, _toastr, _aureliaFramework, _obj_personnel, _aureliaDialog, _entityManagerFactory, _breezeClient, _ppid_search, _DialogBox, _moment, _helpers, _settings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.company_info_work_exp = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	var _moment2 = _interopRequireDefault(_moment);

	var _settings2 = _interopRequireDefault(_settings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var company_info_work_exp = exports.company_info_work_exp = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService, _obj_personnel.obj_personnel, _toastr2.default), _dec(_class = function () {
		function company_info_work_exp(DialogService, obj_personnel, toastr) {
			var _this = this;

			_classCallCheck(this, company_info_work_exp);

			this._disableBtnAdd = false;
			this._disableBtnSave = true;
			this._disableBtnEdit = false;
			this._disableBtnRemove = false;
			this._disableForm = true;
			this._formStatus = "";
			this.obj_personnel = null;
			this.alreadyLoaded = false;
			this.lblCreatedBy = null;
			this.lblUpdatedBy = null;

			this.obj_personnel = obj_personnel;
			this.DialogService = DialogService;

			this.obj_personnel.OBSERVERS.company_work_exp_clicked.push(function (global_indiv_id) {
				if (!_this.alreadyLoaded) {
					_this.alreadyLoaded = false;
					$("#startDt").datepicker();
					$("#endDt").datepicker();
				}
				toastr.clear();
				toastr.info("", "Loading work experience list...");
				_this.loadWorkExperience(global_indiv_id);
				_this.clearField();
			});
		}

		company_info_work_exp.prototype.loadWorkExperience = function loadWorkExperience(global_indiv_id) {
			var _this2 = this;

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from("WORK_EXPERIENCE_TRX").where("GLOBAL_INDIV_ID", "==", global_indiv_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {

				var tmp = [];
				var tmpLog = [];
				_.each(s1.results, function (r) {
					var from = (0, _helpers.formatDate)(r.START_DT);
					var to = (0, _helpers.formatDate)(r.END_DT);
					var position = _this2.obj_personnel.POSITION.find(function (x) {
						if (x.value == r.POSITION_CD) return x;
					});

					tmp.push({
						work_experience_id: r.WORK_EXPERIENCE_ID,
						employer: r.EMPLOYER,
						start_dt: from,
						end_dt: to,
						present_fl: r.PRESENT_FL,
						salary: r.SALARY,
						position_cd: r.POSITION_CD,
						position: position.text,
						freelance_fl: r.FREELANCE_FL,
						reason_for_leaving: r.REASON_FOR_LEAVING
					});

					if (r.CREATED_BY != null) {
						tmpLog.push({
							user: r.CREATED_BY,
							date: new Date(r.CREATED_DT)
						});
					}

					if (r.LAST_UPDATED_BY != null) {
						tmpLog.push({
							user: r.LAST_UPDATED_BY,
							date: new Date(r.LAST_UPDATED_DT)
						});
					}
				});

				_this2.obj_personnel.WORK_EXPERIENCE.list = tmp;

				tmpLog.sort(_this2.OrderByDate);
				var LastIndex = tmpLog.length - 1;
				if (tmpLog.length > 0) {

					_this2.lblCreatedBy = tmpLog[0].user + ' ' + _moment2.default.utc(tmpLog[0].date).format("MM/DD/YYYY hh:mm A");
					if (tmpLog.length > 1) {
						_this2.lblUpdatedBy = tmpLog[LastIndex].user + ' ' + _moment2.default.utc(tmpLog[LastIndex].date).format("MM/DD/YYYY hh:mm A");
					} else {
						_this2.lblUpdatedBy = "";
					}
				} else {
					_this2.lblCreatedBy = "";
					_this2.lblUpdatedBy = "";
				}

				_settings2.default.isNavigating = false;
				_toastr2.default.clear();
				_toastr2.default.success("", "Work experience list has been loaded...");
			}, function (e1) {
				_settings2.default.isNavigating = false;
				_toastr2.default.clear();
				_toastr2.default.error(e1, "Error in loading work experience list.");
			});
		};

		company_info_work_exp.prototype.OrderByDate = function OrderByDate(a, b) {
			if (a.date > b.date) return 1;
			if (a.date < b.date) return -1;
			return 0;
		};

		company_info_work_exp.prototype.clearField = function clearField() {
			_toastr2.default.clear();
			this.obj_personnel.WORK_EXPERIENCE.model = {};
			this._disableBtnAdd = false;
			this._disableBtnSave = true;
			this._disableForm = true;
			this._formStatus = "";
			this._disableBtnEdit = false;
			this._disableBtnRemove = false;
		};

		company_info_work_exp.prototype.btnAdd = function btnAdd() {
			this._disableBtnAdd = true;
			this._disableBtnSave = false;
			this._disableForm = false;
			this._formStatus = "ADD";
			this._disableBtnEdit = true;
			this._disableBtnRemove = true;
		};

		company_info_work_exp.prototype.btnEdit = function btnEdit(item) {

			this._disableBtnAdd = true;
			this._disableBtnSave = false;
			this._disableForm = false;
			this._disableBtnEdit = true;
			this._disableBtnRemove = true;

			this.obj_personnel.WORK_EXPERIENCE.model.work_experience_id = item.work_experience_id;
			this.obj_personnel.WORK_EXPERIENCE.model.employer = item.employer;
			this.obj_personnel.WORK_EXPERIENCE.model.start_dt = item.start_dt;
			this.obj_personnel.WORK_EXPERIENCE.model.end_dt = item.end_dt;
			this.obj_personnel.WORK_EXPERIENCE.model.present_fl = item.present_fl == 1 ? true : false;
			this.obj_personnel.WORK_EXPERIENCE.model.salary = item.salary;
			this.obj_personnel.WORK_EXPERIENCE.model.position_cd = item.position_cd;
			this.obj_personnel.WORK_EXPERIENCE.model.freelance_fl = item.freelance_fl == 1 ? true : false;
			this.obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving = item.reason_for_leaving;
			this._formStatus = "EDIT";
		};

		company_info_work_exp.prototype.btnRemove = function btnRemove(item) {
			var _this3 = this;

			this.DialogService.open({ viewModel: _DialogBox.DialogBox, model: { title: "Confirm remove.", message: "Are you sure you want to remove the work experience?" } }).whenClosed(function (response) {
				if (!response.wasCancelled) {
					_settings2.default.isNavigating = true;
					var query = (0, _entityManagerFactory.EntityQuery)().from('WORK_EXPERIENCE_TRX').where('WORK_EXPERIENCE_ID', '==', item.work_experience_id);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (success) {

						success.results[0].entityAspect.setDeleted();

						(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (saveSuccess) {
							_toastr2.default.success("", "The work experience was successfully removed.");
							_this3.loadWorkExperience(_this3.obj_personnel.global_indiv_id);
						}, function (error) {
							_toastr2.default.clear();
							_toastr2.default.error("", "Error in removing work experience.");
							_settings2.default.isNavigating = false;
						});
					});
				}
			});
		};

		company_info_work_exp.prototype.validate = function validate() {

			var strValidation = "";
			this.obj_personnel.WORK_EXPERIENCE.model.start_dt = $("#startDt").val();
			this.obj_personnel.WORK_EXPERIENCE.model.end_dt = $("#endDt").val();

			if (this.obj_personnel.WORK_EXPERIENCE.model.employer == undefined || this.obj_personnel.WORK_EXPERIENCE.model.employer == null || this.obj_personnel.WORK_EXPERIENCE.model.employer.length == 0) {
				strValidation += "No employer specified.<br/>";
			}

			if (this.obj_personnel.WORK_EXPERIENCE.model.start_dt == undefined || this.obj_personnel.WORK_EXPERIENCE.model.start_dt == null || this.obj_personnel.WORK_EXPERIENCE.model.start_dt.length == 0) {
				strValidation += "No start date specified.<br/>";
			} else {
				if (!(0, _moment2.default)(new Date(this.obj_personnel.WORK_EXPERIENCE.model.start_dt)).isValid()) {
					strValidation += "Invalid start date.<br/>";
				}
			}

			if (this.obj_personnel.WORK_EXPERIENCE.model.end_dt == undefined || this.obj_personnel.WORK_EXPERIENCE.model.end_dt == null || this.obj_personnel.WORK_EXPERIENCE.model.end_dt.length == 0) {
				strValidation += "No end date specified.<br/>";
			} else {
				if (!(0, _moment2.default)(new Date(this.obj_personnel.WORK_EXPERIENCE.model.end_dt)).isValid()) {
					strValidation += "Invalid end date.<br/>";
				}
			}

			if (this.obj_personnel.WORK_EXPERIENCE.model.position_cd == undefined || this.obj_personnel.WORK_EXPERIENCE.model.position_cd.length == 0) {
				strValidation += "No position specified. <br/>";
			}

			if (this.obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving == undefined || this.obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving == null || this.obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving.length == 0) {
				strValidation += "No reason for leaving specified.<br/>";
			}

			if (strValidation.length > 0) {
				_toastr2.default.clear();
				_toastr2.default.error("", strValidation);
			} else {
				if (this._formStatus == "ADD") {
					this.saveWorkExp(this.obj_personnel.global_indiv_id);
				} else if (this._formStatus == "EDIT") {
					this.updateWorkExp(this.obj_personnel.WORK_EXPERIENCE.model.work_experience_id);
				}
			}
		};

		company_info_work_exp.prototype.saveWorkExp = function saveWorkExp(global_indiv_id) {
			var _this4 = this;

			var dateToday = null;
			dateToday = (0, _moment2.default)(new Date()).add(8, "hours");
			dateToday = new Date(dateToday);

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from("WORK_EXPERIENCE_TRX").orderByDesc("WORK_EXPERIENCE_ID").take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {
				var MaxId = 1;
				if (s1.results.length > 0) {
					MaxId = s1.results[0].WORK_EXPERIENCE_ID + 1;
				}

				var work_exp_trx = {
					WORK_EXPERIENCE_ID: MaxId,
					GLOBAL_INDIV_ID: global_indiv_id,
					EMPLOYER: _this4.obj_personnel.WORK_EXPERIENCE.model.employer,
					START_DT: _this4.obj_personnel.WORK_EXPERIENCE.model.start_dt,
					END_DT: _this4.obj_personnel.WORK_EXPERIENCE.model.end_dt,
					SALARY: _this4.obj_personnel.WORK_EXPERIENCE.model.salary,
					POSITION_CD: _this4.obj_personnel.WORK_EXPERIENCE.model.position_cd,
					REASON_FOR_LEAVING: _this4.obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving,
					PRESENT_FL: _this4.obj_personnel.WORK_EXPERIENCE.model.present_fl == true ? 1 : 0,
					FREELANCE_FL: _this4.obj_personnel.WORK_EXPERIENCE.model.freelance_fl == true ? 1 : 0,
					CREATED_BY: _this4.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};

				var entity = (0, _entityManagerFactory.EntityManager)().createEntity("WORK_EXPERIENCE_TRX", work_exp_trx);
				(0, _entityManagerFactory.EntityManager)().addEntity(entity);
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s2) {

					_toastr2.default.success("", "Record saved.");
					_this4.clearField();
					_this4.loadWorkExperience(_this4.obj_personnel.global_indiv_id);
				}, function (e2) {
					if (entity != null) {
						entity.entityAspect.setDeleted();
					}

					(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
						var errors = entity.entityAspect.getValidationErrors();
						if (errors.length > 0) console.log(errors);
					});
					_settings2.default.isNavigating = false;
					_toastr2.default.error(e2, "Error in saving work experience.");
				});
			}, function (e1) {

				_settings2.default.isNavigating = false;
				_toastr2.default.error(e1, "Error in querying max id.");
			});
		};

		company_info_work_exp.prototype.updateWorkExp = function updateWorkExp(work_exp_id) {
			var _this5 = this;

			var dateToday = null;
			dateToday = (0, _moment2.default)(new Date()).add(8, "hours");
			dateToday = new Date(dateToday);

			var query = (0, _entityManagerFactory.EntityQuery)().from("WORK_EXPERIENCE_TRX").where("WORK_EXPERIENCE_ID", "==", work_exp_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {

				s1.results[0].EMPLOYER = _this5.obj_personnel.WORK_EXPERIENCE.model.employer;
				s1.results[0].START_DT = _this5.obj_personnel.WORK_EXPERIENCE.model.start_dt;
				s1.results[0].END_DT = _this5.obj_personnel.WORK_EXPERIENCE.model.end_dt;
				s1.results[0].PRESENT_FL = _this5.obj_personnel.WORK_EXPERIENCE.model.present_fl ? 1 : 0;
				s1.results[0].SALARY = _this5.obj_personnel.WORK_EXPERIENCE.model.salary;
				s1.results[0].POSITION_CD = _this5.obj_personnel.WORK_EXPERIENCE.model.position_cd;
				s1.results[0].FREELANCE_FL = _this5.obj_personnel.WORK_EXPERIENCE.model.freelance_fl ? 1 : 0;
				s1.results[0].REASON_FOR_LEAVING = _this5.obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving;
				s1.results[0].LAST_UPDATED_BY = _this5.obj_personnel.USER.USER_ID;
				s1.results[0].LAST_UPDATED_DT = dateToday;

				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s2) {
					_toastr2.default.success("", "Record saved.");
					_this5.clearField();
					_this5.loadWorkExperience(_this5.obj_personnel.global_indiv_id);
				}, function (e2) {
					_toastr2.default.error(e2, "Error in updating work experience.");
				});
			}, function (e1) {
				_toastr2.default.error(e1, "Error in querying work experience.");
			});
		};

		return company_info_work_exp;
	}()) || _class);
});
define('ppid/forms/gov_info',['exports', 'toastr', 'aurelia-framework', '../obj_personnel', 'aurelia-dialog', '../../entity-manager-factory'], function (exports, _toastr, _aureliaFramework, _obj_personnel, _aureliaDialog, _entityManagerFactory) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.gov_info = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var gov_info = exports.gov_info = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService, _obj_personnel.obj_personnel, _toastr2.default), _dec(_class = function () {
		function gov_info(dialogService, obj_personnel, toastr) {
			_classCallCheck(this, gov_info);

			this.obj_personnel = null;
			this._activeTab = 0;
			this._404_img = "/images/404.png";

			this.dialogService = dialogService;
			this.obj_personnel = obj_personnel;
		}

		gov_info.prototype.clickTab_GovInfo = function clickTab_GovInfo(tab_num) {
			var _this = this;

			if (this.obj_personnel.global_indiv_id.length === 0) return;
			switch (tab_num) {
				case 0:
					this.obj_personnel.OBSERVERS.govinfo_main_clicked.forEach(function (delegate) {
						_toastr2.default.clear();
						_toastr2.default.info("", "Loading government info...");
						delegate(_this.obj_personnel.global_indiv_id);
					});
					break;
			}
		};

		return gov_info;
	}()) || _class);
});
define('ppid/forms/gov_info_main',['exports', 'toastr', 'aurelia-framework', '../obj_personnel', '../../entity-manager-factory', 'breeze-client', 'aurelia-dialog', '../modals/DialogBox', 'moment', 'settings'], function (exports, _toastr, _aureliaFramework, _obj_personnel, _entityManagerFactory, _breezeClient, _aureliaDialog, _DialogBox, _moment, _settings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.gov_info_main = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	var _moment2 = _interopRequireDefault(_moment);

	var _settings2 = _interopRequireDefault(_settings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var gov_info_main = exports.gov_info_main = (_dec = (0, _aureliaFramework.inject)(_obj_personnel.obj_personnel, _toastr2.default, _aureliaDialog.DialogService), _dec(_class = function () {
		function gov_info_main(obj_personnel, toastr, DialogService) {
			var _this = this;

			_classCallCheck(this, gov_info_main);

			this.obj_personnel = null;
			this.alreadyLoaded = false;
			this._disableOtherGovernmentInfo = true;
			this.lblCreatedBy = null;
			this.lblUpdatedBy = null;


			$("#affidavit_dt").datepicker();
			this.obj_personnel = obj_personnel;
			this.DialogService = DialogService;
			this.obj_personnel.OBSERVERS.tab_changed.push(function (tab_num, global_id) {
				if (tab_num == 3) {
					if (!_this.alreadyLoaded) {
						_this.alreadyLoaded = true;
						$("#affidavit_dt").datepicker();
						$("#expiry_dt").datepicker();
						$("#vat_reg_dt").datepicker();
						toastr.clear();
						toastr.info("", "Loading data...");
						_this.load_TaxInformation(global_id);
						_this.load_TaxAffidavit(global_id);
						_this.load_Permit(global_id);
						_this.clearTaxAffidavitField();
					}
				}

				if (_this.obj_personnel.USER.COMPANY_ID == 1) {
					_this._disableOtherGovernmentInfo = false;
				}
			});

			this.obj_personnel.OBSERVERS.govinfo_main_clicked.push(function (global_id) {
				_this.load_TaxInformation(global_id);
				_this.load_TaxAffidavit(global_id);
				_this.load_Permit(global_id);
				_this.clearTaxAffidavitField();
			});

			this.obj_personnel.OBSERVERS.clear_ppid.push(function () {
				_this.obj_personnel.GOVERNMENT_INFO = {
					modelTaxAffidavit: {},
					modelPermit: {},
					tax_affidavit: [],
					permits: []
				};
				_this.alreadyLoaded = false;
			});
		}

		gov_info_main.prototype.formatDate = function formatDate(strDate) {
			if (strDate == null || strDate.length == 0) return "";
			var dt = new Date(strDate);
			var month = dt.getMonth() + 1;
			var day = dt.getDate();
			var year = dt.getFullYear();
			return ('0' + month).slice(-2) + '/' + ('0' + day).slice(-2) + '/' + ("000" + year).slice(-4);
		};

		gov_info_main.prototype.convertToGMT8 = function convertToGMT8(date) {
			if (date == undefined || date == null || date.length == 0) return null;
			var tempDt = (0, _moment2.default)(date).add(8, 'hours');
			return new Date(tempDt);
		};

		gov_info_main.prototype.validate_input = function validate_input(input, type) {
			switch (type) {
				case "PAGIBIG":
					var pagibig = /^(?:\d{4}-\d{4}-\d{4})$/;
					return pagibig.test(input);
				case "SSS":
					var sss = /^(?:\d{2}-\d{7}-\d{1})$/;
					return sss.test(input);
				case "PHILHEALTH":
					var philhealth = /^(?:\d{2}-\d{9}-\d{1})$/;
					return philhealth.test(input);
				default:
					return false;
			}
		};

		gov_info_main.prototype.load_TaxInformation = function load_TaxInformation(global_id) {
			var _this2 = this;

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from("GLOBAL_INDIV_MSTR").where("GLOBAL_INDIV_ID", "==", global_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
				_this2.obj_personnel.GOVERNMENT_INFO.tax_exempt_cd = querySuccess.results[0].TAX_EXEMPT_CD;
				_this2.obj_personnel.GOVERNMENT_INFO.sss_no = querySuccess.results[0].SSS_NO;
				_this2.obj_personnel.GOVERNMENT_INFO.pagibig_no = querySuccess.results[0].PAGIBIG_NO;
				_this2.obj_personnel.GOVERNMENT_INFO.philhealth_no = querySuccess.results[0].PHILHEALTH_NO;
				_this2.obj_personnel.GOVERNMENT_INFO.national_id = querySuccess.results[0].NATIONAL_ID;
				_this2.obj_personnel.GOVERNMENT_INFO.voters_id = querySuccess.results[0].VOTERS_ID;
				if (querySuccess.results[0].CREATED_BY != null) {
					var _user = querySuccess.results[0].CREATED_BY;
					var _date = _moment2.default.utc(querySuccess.results[0].CREATED_DT).format("MM/DD/YYYY hh:mm A");
					_this2.lblCreatedBy = _user + ' ' + _date;
				} else {
					_this2.lblCreatedBy = "";
				}

				if (querySuccess.results[0].LAST_UPDATED_BY != null) {
					var _user = querySuccess.results[0].LAST_UPDATED_BY;
					var _date = _moment2.default.utc(querySuccess.results[0].LAST_UPDATED_DT).format("MM/DD/YYYY hh:mm A");
					_this2.lblUpdatedBy = _user + ' ' + _date;
				} else {
					_this2.lblUpdatedBy = "";
				}

				_toastr2.default.clear();
				_settings2.default.isNavigating = false;
			}, function (errorQuery) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(errorQuery, "Error in loading Government information.");
			});

			query = (0, _entityManagerFactory.EntityQuery)().from("GLOBAL_MSTR").where("GLOBAL_ID", "==", global_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
				_this2.obj_personnel.GOVERNMENT_INFO.input_tax_cd = querySuccess.results[0].INPUT_TAX_CD;
				_this2.obj_personnel.GOVERNMENT_INFO.tin = querySuccess.results[0].TIN;
				_this2.obj_personnel.GOVERNMENT_INFO.vat_reg_dt = _this2.formatDate(querySuccess.results[0].VAT_REG_DT);
				_this2.obj_personnel.GOVERNMENT_INFO.vat_stat_cd = querySuccess.results[0].VAT_STAT_CD;
				_toastr2.default.success("", "Tax Information has been loaded.");
				_settings2.default.isNavigating = false;
			}, function (errorQuery) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(errorQuery, "Error in loading Government information.");
			});
		};

		gov_info_main.prototype.load_TaxAffidavit = function load_TaxAffidavit(global_id) {
			var _this3 = this;

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from("TAX_AFFIDAVIT_TRX").where("GLOBAL_ID", "==", global_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
				_this3.obj_personnel.GOVERNMENT_INFO.tax_affidavit = [];
				var tmpList = [];
				_.each(querySuccess.results, function (result) {
					tmpList.push({
						tax_affidavit_id: result.TAX_AFFIDAVIT_ID,
						affidavit_no: result.AFFIDAVIT_NO,
						affidavit_dt: _this3.formatDate(result.AFFIDAVIT_DT)
					});
				});
				_this3.obj_personnel.GOVERNMENT_INFO.tax_affidavit = tmpList;
				_settings2.default.isNavigating = false;
			}, function (errorQuery) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(errorQuery, "Error in loading tax affidavit");
			});
		};

		gov_info_main.prototype.load_Permit = function load_Permit(global_id) {
			var _this4 = this;

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from("PERMIT_TRX").where("GLOBAL_ID", "==", global_id);

			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (successQuery) {
				var tmpList = [];
				_.each(successQuery.results, function (result) {
					var place = _this4.obj_personnel.LOCATIONS.find(function (x) {
						return x.LOCATION_CD == result.PLACE_OF_ISSUE;
					});

					var permit = _this4.obj_personnel.PERMIT.find(function (x) {
						return x.value == result.PERMIT_CD;
					});

					tmpList.push({
						global_id: result.GLOBAL_ID,
						permit_no: result.PERMIT_NO,
						expiry_dt: _this4.formatDate(result.EXPIRY_DT),
						permit_cd: result.PERMIT_CD,
						agency_cd: result.AGENCY_CD,
						permit_id: result.PERMIT_ID,
						grant_dt: result.GRANT_DT,
						place_of_issue: result.PLACE_OF_ISSUE,
						poi: place.LOCATION_DESC,
						permit_name: permit.text
					});
				});
				_this4.obj_personnel.GOVERNMENT_INFO.permits = tmpList;
				_settings2.default.isNavigating = false;
			}, function (errorQuery) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(errorQuery, "Error in loading permits.");
			});
		};

		gov_info_main.prototype.clearTaxAffidavitField = function clearTaxAffidavitField() {
			_settings2.default.isNavigating = false;
			this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_no = "";
			this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt = "";
		};

		gov_info_main.prototype.btnAdd_TaxAffidavit = function btnAdd_TaxAffidavit() {
			var strValidation = "";

			if (this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_no == undefined || this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_no == null || this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_no.length == 0) {
				strValidation += "Affidavit no is required.<br/>";
			}

			this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt = $("#affidavit_dt").val();
			if (this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt == undefined || this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt == null || this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt.length == 0) {
				strValidation += "Affidavit date is required.<br/>";
			} else {
				if (!(0, _moment2.default)(this.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt).isValid()) {
					strValidation += "Invalid affidavit dt.<br/>";
				}
			}

			if (strValidation.length > 0) {
				_toastr2.default.clear();
				_toastr2.default.error("", strValidation);
			} else {
				this.insertTaxAffidavit();
			}
		};

		gov_info_main.prototype.btnRemove_TaxAffidavit = function btnRemove_TaxAffidavit(item) {
			var _this5 = this;

			this.DialogService.open({ viewModel: _DialogBox.DialogBox, model: { title: "Confirm remove.", message: "Are you sure you want to remove the tax affidavit?" } }).whenClosed(function (response) {
				if (!response.wasCancelled) {
					_settings2.default.isNavigating = true;

					var query = (0, _entityManagerFactory.EntityQuery)().from('TAX_AFFIDAVIT_TRX').where('TAX_AFFIDAVIT_ID', '==', item.tax_affidavit_id);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (success) {

						success.results[0].entityAspect.setDeleted();

						(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (saveSuccess) {
							_toastr2.default.success("", "The tax affidavit was successfully removed.");
							_this5.load_TaxAffidavit(_this5.obj_personnel.global_indiv_id);
						}, function (error) {
							_settings2.default.isNavigating = false;
							_toastr2.default.clear();
							_toastr2.default.error("", "Error in removing tax affidavit.");
						});
					});
				}
			});
		};

		gov_info_main.prototype.insertTaxAffidavit = function insertTaxAffidavit() {
			var _this6 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);
			var query = (0, _entityManagerFactory.EntityQuery)().from("TAX_AFFIDAVIT_TRX").orderByDesc("TAX_AFFIDAVIT_ID").take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
				var Max = 1;
				if (querySuccess.results.length > 0) {
					Max = querySuccess.results[0].TAX_AFFIDAVIT_ID + 1;
				}

				var tax_affidavit = {
					GLOBAL_ID: _this6.obj_personnel.global_indiv_id,
					AFFIDAVIT_NO: _this6.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_no,
					TAX_AFFIDAVIT_ID: Max,
					AFFIDAVIT_DT: _this6.obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt,
					RELEASE_DT: dateToday,
					RETURN_DT: dateToday,
					CREATED_BY: _this6.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};
				var entity = (0, _entityManagerFactory.EntityManager)().createEntity("TAX_AFFIDAVIT_TRX", tax_affidavit);
				(0, _entityManagerFactory.EntityManager)().addEntity(entity);
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (saveSuccess) {
					_toastr2.default.clear();
					_toastr2.default.success(saveSuccess, "Record saved.");
					_this6.load_TaxAffidavit(_this6.obj_personnel.global_indiv_id);
					_this6.clearTaxAffidavitField();
				}, function (errorSave) {
					_settings2.default.isNavigating = false;
					if (entity != null) {
						entity.entityAspect.setDeleted();
					}
					_toastr2.default.error(errorQuery, "Error in saving Tax affidavit.");
				});
			}, function (errorQuery) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(errorQuery, "Error in querying Tax affidavit id.");
			});
		};

		gov_info_main.prototype.clearPermitField = function clearPermitField() {
			_settings2.default.isNavigating = false;
			this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd = "";
			this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_no = "";
			this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt = "";
			this.obj_personnel.GOVERNMENT_INFO.modelPermit.place_of_issue = "";
		};

		gov_info_main.prototype.btnAdd_Permit = function btnAdd_Permit() {
			var strValidation = "";

			if (this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd == undefined || this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd == null || this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd.length == 0) {
				strValidation += "No Permit type specified.<br/>";
			}

			if (this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_no == undefined || this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_no == null || this.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_no.length == 0) {
				strValidation += "No Permit number specified.<br/>";
			}

			this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt = $("#expiry_dt").val();
			if (this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt == undefined || this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt == null || this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt.length == 0) {
				strValidation += "No expiry date specified.<br/>";
			} else {
				if (!(0, _moment2.default)(this.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt).isValid()) {
					strValidation += "Invalid expiry date.<br/>";
				}
			}

			if (this.obj_personnel.GOVERNMENT_INFO.modelPermit.place_of_issue == undefined || this.obj_personnel.GOVERNMENT_INFO.modelPermit.place_of_issue == null || this.obj_personnel.GOVERNMENT_INFO.modelPermit.place_of_issue.length == 0) {
				strValidation += "No place of issuance specified.<br/>";
			}

			if (strValidation.length > 0) {
				_toastr2.default.clear();
				_toastr2.default.error("", strValidation);
			} else {
				this.insertPermit();
			}
		};

		gov_info_main.prototype.btnUpdate_Permit = function btnUpdate_Permit(item) {};

		gov_info_main.prototype.btnRemove_Permit = function btnRemove_Permit(item) {
			var _this7 = this;

			this.DialogService.open({ viewModel: _DialogBox.DialogBox, model: { title: "Confirm remove.", message: "Are you sure you want to remove the permit?" } }).whenClosed(function (response) {
				if (!response.wasCancelled) {
					_settings2.default.isNavigating = true;
					var query = (0, _entityManagerFactory.EntityQuery)().from('PERMIT_TRX').where('PERMIT_ID', '==', item.permit_id);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (success) {

						success.results[0].entityAspect.setDeleted();

						(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (saveSuccess) {
							_toastr2.default.success("", "The permit was successfully removed.");
							_this7.load_Permit(_this7.obj_personnel.global_indiv_id);
						}, function (error) {
							_settings2.default.isNavigating = false;
							_toastr2.default.clear();
							_toastr2.default.error("", "Error in removing permit.");
						});
					});
				}
			});
		};

		gov_info_main.prototype.insertPermit = function insertPermit() {
			var _this8 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);
			var query = (0, _entityManagerFactory.EntityQuery)().from("PERMIT_TRX").orderByDesc("PERMIT_ID").take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
				var Max = 1;
				if (querySuccess.results.length > 0) {
					Max = querySuccess.results[0].PERMIT_ID + 1;
				}

				var permit = {
					GLOBAL_ID: _this8.obj_personnel.global_indiv_id,
					PERMIT_NO: _this8.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_no,
					EXPIRY_DT: _this8.obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt,
					PERMIT_CD: _this8.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd,
					AGENCY_CD: _this8.obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd,
					PERMIT_ID: Max,
					PLACE_OF_ISSUE: _this8.obj_personnel.GOVERNMENT_INFO.modelPermit.place_of_issue,
					CREATED_BY: _this8.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};

				var entity = (0, _entityManagerFactory.EntityManager)().createEntity("PERMIT_TRX", permit);
				(0, _entityManagerFactory.EntityManager)().addEntity(entity);
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (saveSuccess) {
					_toastr2.default.clear();
					_toastr2.default.success("", "Record saved.");
					_this8.load_Permit(_this8.obj_personnel.global_indiv_id);
					_this8.clearPermitField();
				}, function (errorSave) {
					_settings2.default.isNavigating = false;
					if (entity != null) {
						entity.entityAspect.setDeleted();
					}
					_toastr2.default.clear();
					_toastr2.default.error("", errorSave);
				});
			});
		};

		gov_info_main.prototype.validate = function validate() {

			this.obj_personnel.GOVERNMENT_INFO.pagibig_no = $("#_pagibig").val();
			this.obj_personnel.GOVERNMENT_INFO.philhealth_no = $("#_philhealth").val();
			this.obj_personnel.GOVERNMENT_INFO.sss_no = $("#_sss").val();
			var strValidation = "";

			if (this.obj_personnel.GOVERNMENT_INFO.pagibig_no.length > 0) {
				if (this.obj_personnel.GOVERNMENT_INFO.pagibig_no != "____-____-____" && !this.validate_input(this.obj_personnel.GOVERNMENT_INFO.pagibig_no, "PAGIBIG")) {
					strValidation += "Invalid Pag-ibig No.<br/>";
				}
			} else {}

			if (this.obj_personnel.GOVERNMENT_INFO.sss_no.length > 0) {
				if (this.obj_personnel.GOVERNMENT_INFO.sss_no != "__-_______-_" && !this.validate_input(this.obj_personnel.GOVERNMENT_INFO.sss_no, "SSS")) {
					strValidation += "Invalid SSS No.<br/>";
					console.log(this.obj_personnel.GOVERNMENT_INFO.sss_no);
				}
			} else {}

			if (this.obj_personnel.GOVERNMENT_INFO.philhealth_no.length > 0) {
				if (this.obj_personnel.GOVERNMENT_INFO.philhealth_no != "__-_________-_" && !this.validate_input(this.obj_personnel.GOVERNMENT_INFO.philhealth_no, "PHILHEALTH")) {
					strValidation += "Invalid Philhealth No.<br/>";
				}
			} else {}

			this.obj_personnel.GOVERNMENT_INFO.vat_reg_dt = $("#vat_reg_dt").val();

			if (strValidation.length > 0) {
				_toastr2.default.clear();
				_toastr2.default.error("", strValidation);
			} else {
				this.update();
			}
		};

		gov_info_main.prototype.update = function update() {
			var _this9 = this;

			_settings2.default.isNavigating = true;

			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);

			var philhealth = null;
			var pagibig = null;
			var sss = null;
			if (this.obj_personnel.GOVERNMENT_INFO.philhealth_no != "__-_________-_") {
				philhealth = this.obj_personnel.GOVERNMENT_INFO.philhealth_no;
			}

			if (this.obj_personnel.GOVERNMENT_INFO.pagibig_no != "____-____-____") {
				pagibig = this.obj_personnel.GOVERNMENT_INFO.pagibig_no;
			}

			if (this.obj_personnel.GOVERNMENT_INFO.sss_no != "__-_______-_") {
				sss = this.obj_personnel.GOVERNMENT_INFO.sss_no;
			}

			var query = (0, _entityManagerFactory.EntityQuery)().from("GLOBAL_INDIV_MSTR").where("GLOBAL_INDIV_ID", "==", this.obj_personnel.global_indiv_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess1) {
				querySuccess1.results[0].TAX_EXEMPT_CD = _this9.obj_personnel.GOVERNMENT_INFO.tax_exempt_cd;

				querySuccess1.results[0].SSS_NO = sss;
				querySuccess1.results[0].PAGIBIG_NO = pagibig;
				querySuccess1.results[0].PHILHEALTH_NO = philhealth;
				querySuccess1.results[0].NATIONAL_ID = _this9.obj_personnel.GOVERNMENT_INFO.national_id;
				querySuccess1.results[0].VOTERS_ID = _this9.obj_personnel.GOVERNMENT_INFO.voters_id;
				querySuccess1.results[0].LAST_UPDATED_BY = _this9.obj_personnel.USER.USER_ID;
				querySuccess1.results[0].LAST_UPDATED_DT = dateToday;
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (save1) {

					query = (0, _entityManagerFactory.EntityQuery)().from("GLOBAL_MSTR").where("GLOBAL_ID", "==", _this9.obj_personnel.global_indiv_id);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess2) {
						querySuccess2.results[0].INPUT_TAX_CD = _this9.obj_personnel.GOVERNMENT_INFO.input_tax_cd;
						querySuccess2.results[0].VAT_REG_DT = _this9.convertToGMT8(_this9.obj_personnel.GOVERNMENT_INFO.vat_reg_dt);
						querySuccess2.results[0].VAT_STAT_CD = _this9.obj_personnel.GOVERNMENT_INFO.vat_stat_cd;
						querySuccess2.results[0].LAST_UPDATED_BY = _this9.obj_personnel.USER.USER_ID;
						querySuccess2.results[0].LAST_UPDATED_DT = dateToday;

						(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (save2) {
							_toastr2.default.clear();
							_toastr2.default.success("", "Record saved.");
							_settings2.default.isNavigating = false;
						}, function (error2) {
							_settings2.default.isNavigating = false;
							_toastr2.default.clear();
							_toastr2.default.error("", error2);
						});
					});
				}, function (error1) {
					_settings2.default.isNavigating = false;
					_toastr2.default.clear();
					_toastr2.default.error("", error1);
				});
			}, function (queryError1) {
				_settings2.default.isNavigating = false;
				_toastr2.default.clear();
				_toastr2.default.error(queryError1, "Error in querying other government info.");
			});
		};

		gov_info_main.prototype.isDigit = function isDigit(event) {
			if (event.charCode >= 48 && event.charCode <= 57 || event.keyCode == 9 || event.keyCode == 10 || event.keyCode == 13 || event.keyCode == 8 || event.keyCode == 116 || event.keyCode == 46 || event.keyCode <= 40 && event.keyCode >= 37) {
				return true;
			} else {
				return false;
			}
		};

		gov_info_main.prototype.input_mask = function input_mask(id, mask) {
			var myMask = mask;
			var myCaja = document.getElementById(id);
			var myText = "";
			var myNumbers = [];
			var myOutPut = "";
			var theLastPos = 1;
			myText = myCaja.value;

			for (var i = 0; i < myText.length; i++) {
				if (!isNaN(myText.charAt(i)) && myText.charAt(i) != " ") {
					myNumbers.push(myText.charAt(i));
				}
			}

			for (var j = 0; j < myMask.length; j++) {
				if (myMask.charAt(j) == "_") {
					if (myNumbers.length == 0) myOutPut = myOutPut + myMask.charAt(j);else {
						myOutPut = myOutPut + myNumbers.shift();
						theLastPos = j + 1;
					}
				} else {
					myOutPut = myOutPut + myMask.charAt(j);
				}
			}

			document.getElementById(id).value = myOutPut;
			document.getElementById(id).setSelectionRange(theLastPos, theLastPos);
		};

		return gov_info_main;
	}()) || _class);
});
define('ppid/forms/main',['exports', 'toastr', 'aurelia-framework', '../obj_personnel', 'aurelia-dialog', '../../entity-manager-factory', 'breeze-client', '../modals/ppid_search', 'moment', '../../helpers', '../../cache_obj', 'settings'], function (exports, _toastr, _aureliaFramework, _obj_personnel, _aureliaDialog, _entityManagerFactory, _breezeClient, _ppid_search, _moment, _helpers, _cache_obj, _settings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.main = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	var _moment2 = _interopRequireDefault(_moment);

	var _settings2 = _interopRequireDefault(_settings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var main = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService, _obj_personnel.obj_personnel, _toastr2.default, _cache_obj.cache_obj), _dec(_class = function () {
		function main(dialogService, obj_personnel, toastr, cache_obj) {
			var _this = this;

			_classCallCheck(this, main);

			this._disableSearchPersonnel = false;
			this._disableCreatePersonnel = false;
			this._disableSavePersonnel = true;
			this._disableClearData = true;
			this._disableResetData = true;
			this._disableForm = true;
			this._isActiveTab = true;
			this.gender = ["Male", "Female"];
			this.selectedGender = "";
			this.selected_citizenship = "";
			this.selected_group = "";
			this.obj_personnel = null;
			this.cache_obj = null;
			this._404_img = "/images/404.png";
			this.primary_img = "/styles/images/abslogo_BIG.png";

			this.obj_personnel = obj_personnel;
			this.dialogService = dialogService;
			this.cache_obj = cache_obj;
			this.obj_personnel.USER = this.cache_obj.USER;
			this.obj_personnel.OBSERVERS.tab_changed.push(function (tab_num, global_id) {});

			this.obj_personnel.OBSERVERS.ppid_dialog.push(function (val) {
				_this.loadData(val);
			});
		}

		main.prototype.getAge = function getAge(dateString) {
			if (dateString == null || dateString.length == 0) return;
			var today = new Date();
			var birthDate = new Date(dateString);
			var age = today.getFullYear() - birthDate.getFullYear();
			var m = today.getMonth() - birthDate.getMonth();
			if (m < 0 || m === 0 && today.getDate() < birthDate.getDate()) {
				age--;
			}
			return age;
		};

		main.prototype.loadData = function loadData(global_id) {
			var _this2 = this;

			_settings2.default.isNavigating = true;

			this.obj_personnel.global_indiv_id = global_id;
			var _query = (0, _entityManagerFactory.EntityQuery)().from('GLOBAL_INDIV_MSTR').where('GLOBAL_INDIV_ID', '==', global_id);

			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {

				_.each(success.results, function (result) {
					_this2.obj_personnel.HEADER.global_indiv_id = result.GLOBAL_INDIV_ID;
					_this2.obj_personnel.HEADER.given_name = result.GIVEN_NAME;
					_this2.obj_personnel.HEADER.last_name = result.LAST_NAME;
					_this2.obj_personnel.HEADER.middle_name = result.MIDDLE_NAME;
					_this2.obj_personnel.HEADER.religion_cd = result.RELIGION_CD;
					if ((0, _moment2.default)(result.BIRTH_DT).isValid()) {
						var birthdt = _moment2.default.utc(result.BIRTH_DT).format("MM/DD/YYYY");
						birthdt = new Date(birthdt);
						if (birthdt.length == 0) {} else {
							$("#birthDate").datepicker("setValue", new Date(birthdt));
						}
						_this2.obj_personnel.HEADER.birth_dt = birthdt;
					}
					_this2.obj_personnel.HEADER.age = _this2.getAge(result.BIRTH_DT);
					_this2.obj_personnel.HEADER.civil_status = result.CIVIL_STATUS;
					_this2.obj_personnel.HEADER.mother_maiden_name = result.MOTHER_MAIDEN_NAME;
					_this2.obj_personnel.HEADER.alias = result.ALIAS;
					_this2.obj_personnel.HEADER.birth_place = result.BIRTH_PLACE;
					_this2.obj_personnel.HEADER.gender = result.GENDER;
					switch (result.GENDER) {
						case "M":
							_this2.selectedGender = "Male";
							break;
						case "F":
							_this2.selectedGender = "Female";
							break;
					}
					_this2.obj_personnel.HEADER.acr_no = result.ACR_NO;
				});
				_toastr2.default.clear();
				_toastr2.default.success("", "Success");
				_settings2.default.isNavigating = false;
			}, function (failed) {
				_toastr2.default.error(failed, "Error in retrieving data[1].");
			});

			_query = (0, _entityManagerFactory.EntityQuery)().from('GLOBAL_MSTR').where('GLOBAL_ID', '==', global_id);

			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {

				_.each(success.results, function (result) {
					_this2.obj_personnel.HEADER.tin = result.TIN;
					_this2.obj_personnel.HEADER.country_cd = result.COUNTRY_CD;
					_this2.obj_personnel.HEADER.country_base_cd = result.COUNTRY_BASE_CD;
					_this2.obj_personnel.HEADER.location_base_cd = result.LOCATION_BASE_CD;
					_this2.obj_personnel.HEADER.status_cd = result.STATUS_CD;
					_this2.obj_personnel.HEADER.created_by = result.CREATED_BY;
					_this2.obj_personnel.HEADER.created_dt = _moment2.default.utc(result.CREATED_DT).format("MM/DD/YYYY hh:mm A");
					_this2.obj_personnel.HEADER.last_updated_by = result.LAST_UPDATED_BY;
					_this2.obj_personnel.HEADER.last_updated_dt = _moment2.default.utc(result.LAST_UPDATED_DT).format("MM/DD/YYYY hh:mm A");

					if (_this2.obj_personnel.HEADER.status_cd == "SUSPEND") {
						var _pred1 = _breezeClient2.default.Predicate.create("GLOBAL_ID", "==", global_id);
						var _pred2 = _breezeClient2.default.Predicate.create("SUSPEND_LEVEL", "==", 1);
						var _finalPred = _breezeClient2.default.Predicate.and([_pred1, _pred2]);
						_query = (0, _entityManagerFactory.EntityQuery)().from('SUSPEND_TRX').where(_finalPred).orderByDesc("SUSPEND_ID").take(1);
						(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
							if (success.results.length > 0) {
								_this2.obj_personnel.HEADER.suspend_id = success.results[0].SUSPEND_ID;

								var start_dt = (0, _helpers.formatDate)(success.results[0].START_DT);
								_this2.obj_personnel.HEADER.suspension_start = start_dt;
								$("#suspensionFrom").datepicker("setValue", new Date(start_dt));

								var end_dt = (0, _helpers.formatDate)(success.results[0].END_DT);
								_this2.obj_personnel.HEADER.suspension_end = end_dt;
								$("#suspensionTo").datepicker("setValue", new Date(end_dt));
							}
						}, function (error) {
							_toastr2.default.error("", error);
						});
					} else {
						_this2.obj_personnel.HEADER.suspension_start = "";
						_this2.obj_personnel.HEADER.suspension_end = "";
					}
				});
			}, function (failed) {
				_toastr2.default.error(failed, "Error in retrieving data[2].");
			});

			_query = (0, _entityManagerFactory.EntityQuery)().from('CITIZENSHIP_TRX').where('GLOBAL_INDIV_ID', '==', global_id).orderBy('CITIZENSHIP_CD');

			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				var tmpArr = [];

				_.each(success.results, function (result) {
					var tmp = _this2.obj_personnel.CITIZENSHIP.find(function (x) {
						if (x.value === result.CITIZENSHIP_CD) {
							return x;
						}
					});

					if (tmp != null) {
						tmpArr.push(tmp);
					}
				});

				_this2.obj_personnel.HEADER.citizenship = tmpArr;
			}, function (failed) {
				_toastr2.default.error(failed, 'Error in Retrieving Citizenship list.');
			});

			var pred1 = _breezeClient2.default.Predicate.create('GLOBAL_INDIV_ID', '==', global_id);
			var pred2 = _breezeClient2.default.Predicate.create('STATUS_CD', '==', 'ACTV');
			var finalPred = _breezeClient2.default.Predicate.and([pred1, pred2]);
			_query = (0, _entityManagerFactory.EntityQuery)().from('GRP_INDIV_MSTR').where(finalPred);

			this.obj_personnel.HEADER.group.length = 0;
			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				var tmpArr = [];

				_.each(success.results, function (result) {
					var tmp = _this2.obj_personnel.GROUP.find(function (x) {
						if (x.value === result.GLOBAL_GRP_ID) {
							return x;
						}
					});
					if (tmp != null) {
						tmpArr.push(tmp);
					}
				});

				_this2.obj_personnel.HEADER.group = tmpArr;
			}, function (failed) {
				_toastr2.default.error(failed, 'Error in Retrieving Group list.');
			});
		};

		main.prototype.btnAdd_Citizenship = function btnAdd_Citizenship() {
			var _this3 = this;

			if (this.selected_citizenship.length > 0) {

				var checkIfExist = this.obj_personnel.HEADER.citizenship.find(function (c) {
					if (c.value === _this3.selected_citizenship) {
						return true;
					}
				});

				if (checkIfExist) {
					_toastr2.default.error('The selected citizenship is already in the list.', 'Citizenship function');
					$('.ddCitizenship').val('');
					return;
				}

				var tmp = this.obj_personnel.CITIZENSHIP.find(function (c) {
					if (c.value === _this3.selected_citizenship) {
						return c;
					}
				});

				if (tmp != null) {
					this.obj_personnel.HEADER.citizenship.push(tmp);

					this.selected_citizenship = '';
				}
			}
		};

		main.prototype.removeCitizenship = function removeCitizenship(item) {
			var index = this.obj_personnel.HEADER.citizenship.indexOf(item);
			this.obj_personnel.HEADER.citizenship.splice(index, 1);
		};

		main.prototype.removeAllCitizenship = function removeAllCitizenship() {
			this.obj_personnel.HEADER.citizenship = [];
		};

		main.prototype.btnAdd_Group = function btnAdd_Group() {
			var _this4 = this;

			if (this.selected_group.length > 0) {
				var checkIfExist = this.obj_personnel.HEADER.group.find(function (c) {
					if (c.value === _this4.selected_group) {
						return true;
					}
				});

				if (checkIfExist) {
					_toastr2.default.error('The selected group is already added in the list.', 'Group function');
					$('.ddGroup').val('');
					return;
				}

				var tmp = this.obj_personnel.GROUP.find(function (c) {
					if (c.value === _this4.selected_group) {
						return c;
					}
				});

				if (tmp != null) {
					this.obj_personnel.HEADER.group.push(tmp);

					this.selected_group = '';
				}
			}
		};

		main.prototype.removeGroup = function removeGroup(item) {
			var index = this.obj_personnel.HEADER.group.indexOf(item);
			this.obj_personnel.HEADER.group.splice(index, 1);
		};

		main.prototype.removeAllGroup = function removeAllGroup() {
			this.obj_personnel.HEADER.group = [];
		};

		main.prototype.fnPersonnel = function fnPersonnel(call) {
			var _this5 = this;

			$("#birthDate").datepicker({
				endDate: "now"
			});
			$("#suspensionFrom").datepicker();
			$("#suspensionTo").datepicker();
			switch (call) {
				case "EDIT":
					this.dialogService.open({ viewModel: _ppid_search.ppid_search }).whenClosed(function (response) {
						if (!response.wasCancelled) {
							_this5._disableSearchPersonnel = true;
							_this5._disableCreatePersonnel = true;
							_this5._disableResetData = false;
							_this5._disableClearData = false;
							_this5._disableSavePersonnel = false;
							_this5._disableForm = false;
							_this5.obj_personnel.editing_status = 'EDIT';
						} else {
							console.log('search was cancelled.');
						}
					});
					break;
				case "CREATE":
					this._disableSearchPersonnel = true;
					this._disableCreatePersonnel = true;
					this._disableResetData = false;
					this._disableClearData = false;
					this._disableSavePersonnel = false;
					this._disableForm = false;
					this.obj_personnel.editing_status = 'CREATE';
					this.selected_citizenship = "FIL";
					this.btnAdd_Citizenship();
					break;
				case "CLEAR":
					this.clearData();
					break;
				case "SAVE":
					if (this.obj_personnel.editing_status == 'CREATE') {
						this.validateHeader('INSERT');
					} else if (this.obj_personnel.editing_status == 'EDIT') {
						this.validateHeader('UPDATE');
					}
					break;
			}
		};

		main.prototype.validateHeader = function validateHeader(passed_status) {
			var _this6 = this;

			console.log(this.obj_personnel.HEADER.tin);
			var strValidation = "";
			if (this.obj_personnel.HEADER.country_cd == undefined || this.obj_personnel.HEADER.country_cd == null || this.obj_personnel.HEADER.country_cd.length == 0) {
				strValidation += "No Country specified.<br/>";
			}

			if (this.obj_personnel.HEADER.tin == undefined || this.obj_personnel.HEADER.tin == null || this.obj_personnel.HEADER.tin.length === 0) {
				strValidation += "No TIN specified.<br/>";
			} else {
				var TinRegex = /^(?:\d{3}-\d{3}-\d{3}-\d{3})$/;
				var TinRegex2 = /^(?:\d{12})$/;
				if (!TinRegex.test(this.obj_personnel.HEADER.tin) && !TinRegex2.test(this.obj_personnel.HEADER.tin)) {
					strValidation += "TIN is invalid.<br/>";
				} else if (TinRegex2.test(this.obj_personnel.HEADER.tin)) {
					var set_1 = this.obj_personnel.HEADER.tin.substring(0, 3);
					var set_2 = this.obj_personnel.HEADER.tin.substring(3, 6);
					var set_3 = this.obj_personnel.HEADER.tin.substring(6, 9);
					var set_4 = this.obj_personnel.HEADER.tin.substring(9, 12);
					this.obj_personnel.HEADER.tin = set_1 + '-' + set_2 + '-' + set_3 + '-' + set_4;
				}
			}

			if (this.obj_personnel.HEADER.last_name == undefined || this.obj_personnel.HEADER.last_name == null || this.obj_personnel.HEADER.last_name.length == 0) {
				strValidation += "No Last Name specified.<br/>";
			}

			if (this.obj_personnel.HEADER.given_name == undefined || this.obj_personnel.HEADER.given_name == null || this.obj_personnel.HEADER.given_name.length == 0) {
				strValidation += "No First Name specified.<br/>";
			}

			if (this.obj_personnel.HEADER.middle_name == undefined || this.obj_personnel.HEADER.middle_name == null || this.obj_personnel.HEADER.middle_name.length == 0) {
				strValidation += "No Middle Name specified.<br/>";
			}

			if (this.selectedGender.length == 0) {
				strValidation += "No Gender specified.<br/>";
			}

			if (this.obj_personnel.HEADER.birth_dt != undefined && this.obj_personnel.HEADER.birth_dt != null && this.obj_personnel.HEADER.birth_dt.trim().length > 0) {
				if (!(0, _moment2.default)(this.obj_personnel.HEADER.birth_dt).isValid()) {
					strValidation += "Invalid date of birth.<br/>";
				} else {
					var bdt = new Date(this.obj_personnel.HEADER.birth_dt);
					var today = new Date();
					if (today < bdt) {
						strValidation += "Date of birth cannot be greater than today.<br/>";
					}
				}
			}

			if (this.obj_personnel.HEADER.status_cd == "SUSPEND") {

				var sus_start = null;
				var sus_end = null;
				this.obj_personnel.HEADER.suspension_start = $("#suspensionFrom").val();
				this.obj_personnel.HEADER.suspension_end = $("#suspensionTo").val();
				if (this.obj_personnel.HEADER.suspension_start != undefined && this.obj_personnel.HEADER.suspension_start != null && this.obj_personnel.HEADER.suspension_start.length > 0) {
					if (!(0, _moment2.default)(this.obj_personnel.HEADER.suspension_start).isValid()) {
						strValidation += "Invalid suspension start date.<br/>";
					} else {
						sus_start = new Date(this.obj_personnel.HEADER.suspension_start);
					}
				} else {
					strValidation += "No start date of suspension specified.<br/>";
				}

				if (this.obj_personnel.HEADER.suspension_end != undefined && this.obj_personnel.HEADER.suspension_end != null && this.obj_personnel.HEADER.suspension_end.length > 0) {
					if (!(0, _moment2.default)(this.obj_personnel.HEADER.suspension_end).isValid()) {
						strValidation += "Invalid suspension end date.<br/>";
					} else {
						sus_end = new Date(this.obj_personnel.HEADER.suspension_end);
					}
				} else {
					strValidation += "No end date of suspension specified.<br/>";
				}

				if (sus_start != null && sus_end != null) {
					if (sus_end < sus_start) {
						strValidation += "end date of suspension cannot be greater than the start date.<br/>";
					}
				}
			}

			if (strValidation.length > 0) {
				_toastr2.default.clear();
				_toastr2.default.error(strValidation, 'Personnel info');
				return;
			} else {
				var mother_maiden_nm = this.obj_personnel.HEADER.mother_maiden_name;
				var alias_nick = this.obj_personnel.HEADER.alias;
				var first_nm = this.obj_personnel.HEADER.given_name;
				var middle_nm = this.obj_personnel.HEADER.middle_name;
				var last_nm = this.obj_personnel.HEADER.last_name;
				if (mother_maiden_nm != null) this.obj_personnel.HEADER.mother_maiden_name = mother_maiden_nm.toUpperCase();
				if (alias_nick != null) this.obj_personnel.HEADER.alias = alias_nick.toUpperCase();
				if (first_nm != null) this.obj_personnel.HEADER.given_name = first_nm.toUpperCase();
				if (middle_nm != null) this.obj_personnel.HEADER.middle_name = middle_nm.toUpperCase();
				if (last_nm != null) this.obj_personnel.HEADER.last_name = last_nm.toUpperCase();
			}

			if (passed_status.includes("INSERT")) {
				var query = (0, _entityManagerFactory.EntityQuery)().from("GLOBAL_MSTR").where("GLOBAL_ID", "==", this.obj_personnel.HEADER.tin + this.obj_personnel.HEADER.country_cd);
				(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {

					if (s1.results.length > 0) {
						_toastr2.default.clear();
						_toastr2.default.error("Tin already exist.", "Personnel info");
					} else {
						_this6.saveHeader();
					}
				}, function (e1) {
					_toastr2.default.error(e1, "Personnel info");
				});
			} else if (passed_status.includes('UPDATE')) {
				this.updateHeader();
			}
		};

		main.prototype.saveHeader = function saveHeader() {
			var _this7 = this;

			_settings2.default.isNavigating = true;
			_toastr2.default.clear();
			var varInsert = null;
			var bdate = null;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);

			this.obj_personnel.HEADER.birth_dt = $("#birthDate").val();

			if (this.obj_personnel.HEADER.birth_dt != undefined && this.obj_personnel.HEADER.birth_dt != null && this.obj_personnel.HEADER.birth_dt.length > 0) {
				bdate = new _moment2.default(new Date(this.obj_personnel.HEADER.birth_dt)).add(8, 'hours');
				bdate = new Date(bdate);
			}

			var varInsert_2 = (0, _entityManagerFactory.EntityManager)().createEntity('GLOBAL_MSTR', {
				GLOBAL_ID: this.obj_personnel.HEADER.tin + this.obj_personnel.HEADER.country_cd,
				COUNTRY_CD: this.obj_personnel.HEADER.country_cd,
				TIN: this.obj_personnel.HEADER.tin,
				COUNTRY_BASE_CD: this.obj_personnel.HEADER.country_base_cd,
				LOCATION_BASE_CD: this.obj_personnel.HEADER.location_base_cd,
				STATUS_CD: this.obj_personnel.HEADER.status_cd,
				CREATED_BY: this.obj_personnel.USER.USER_ID,
				CREATED_DT: dateToday,
				ACTIVE_FL: '1',
				PARK_FL: '0',
				INDIV_FL: 1
			});

			console.log(varInsert_2);

			(0, _entityManagerFactory.EntityManager)().addEntity(varInsert_2);
			(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {

				varInsert = (0, _entityManagerFactory.EntityManager)().createEntity('GLOBAL_INDIV_MSTR', {
					GLOBAL_INDIV_ID: _this7.obj_personnel.HEADER.tin + _this7.obj_personnel.HEADER.country_cd,

					EMERGENCY_RELATION_CD: null,
					INDIV_ID: 0,
					GIVEN_NAME: _this7.obj_personnel.HEADER.given_name,
					MIDDLE_NAME: _this7.obj_personnel.HEADER.middle_name,
					LAST_NAME: _this7.obj_personnel.HEADER.last_name,
					BIRTH_DT: bdate,
					BIRTH_PLACE: _this7.obj_personnel.HEADER.birth_place,
					GENDER: _this7.selectedGender == 'Male' ? 'M' : 'F',
					CIVIL_STATUS: _this7.obj_personnel.HEADER.civil_status,
					MOTHER_MAIDEN_NAME: _this7.obj_personnel.HEADER.mother_maiden_name,
					ACR_NO: _this7.obj_personnel.HEADER.acr_no,
					RELIGION_CD: _this7.obj_personnel.HEADER.religion_cd,
					ALIAS: _this7.obj_personnel.HEADER.alias,
					CREATED_BY: _this7.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				});

				(0, _entityManagerFactory.EntityManager)().addEntity(varInsert);
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success_2) {

					_this7.obj_personnel.HEADER.global_indiv_id = _this7.obj_personnel.HEADER.tin + _this7.obj_personnel.HEADER.country_cd;
					_this7.obj_personnel.global_indiv_id = _this7.obj_personnel.HEADER.global_indiv_id;
					_this7.obj_personnel.editing_status = 'EDIT';
					_toastr2.default.success(success_2, "Record saved.");
					_settings2.default.isNavigating = false;

					var getMax = (0, _entityManagerFactory.EntityQuery)().from('CITIZENSHIP_TRX').orderByDesc('CITIZENSHIP_ID').take(1);

					(0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (successMax) {
						var Max = 1;
						if (successMax.results.length > 0) {
							Max = successMax.results[0].CITIZENSHIP_ID;

							_.each(_this7.obj_personnel.HEADER.citizenship, function (c) {
								Max += 1;

								var tempCiti = (0, _entityManagerFactory.EntityManager)().createEntity('CITIZENSHIP_TRX', {
									CITIZENSHIP_CD: c.value,
									GLOBAL_INDIV_ID: _this7.obj_personnel.HEADER.global_indiv_id,
									CITIZENSHIP_ID: Max,
									CREATED_BY: _this7.obj_personnel.USER.USER_ID,
									CREATED_DT: dateToday
								});

								(0, _entityManagerFactory.EntityManager)().addEntity(tempCiti);
							});

							if (_this7.obj_personnel.HEADER.citizenship.length > 0) {
								(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success_3) {
									console.log(success_3);
								}, function (failed_3) {
									_toastr2.default.error(failed_3, 'Error');
								});
							}
						}
					}, function (failedMax) {
						_toastr2.default.error(failedMax, "Error in saving citizenship.");
					});

					getMax = (0, _entityManagerFactory.EntityQuery)().from('GRP_INDIV_MSTR').orderByDesc('GRP_INDIV_ID').take(1);

					(0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (successMax) {
						var Max = 1;
						if (successMax.results.length > 0) {
							Max = successMax.results[0].GRP_INDIV_ID;

							_.each(_this7.obj_personnel.HEADER.group, function (g) {
								Max += 1;
								var tempGroup = (0, _entityManagerFactory.EntityManager)().createEntity('GRP_INDIV_MSTR', {
									GLOBAL_INDIV_ID: _this7.obj_personnel.HEADER.global_indiv_id,
									GLOBAL_GRP_ID: g.value,
									GRP_INDIV_ID: Max,
									STATUS_CD: 'ACTV',
									CREATED_BY: _this7.obj_personnel.USER.USER_ID,
									CREATED_DT: dateToday
								});
								(0, _entityManagerFactory.EntityManager)().addEntity(tempGroup);
							});

							if (_this7.obj_personnel.HEADER.group.length > 0) {
								(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success_3) {
									console.log(success_3);
								}, function (failed_3) {
									_toastr2.default.error(failed_3, 'Error');
								});
							}
						}
					}, function (failedMax) {
						_toastr2.default.error(failedMax, "Error in saving citizenship.");
					});

					if (_this7.obj_personnel.HEADER.status_cd == "SUSPEND") {
						var getMax = (0, _entityManagerFactory.EntityQuery)().from("SUSPEND_TRX").orderByDesc("SUSPEND_ID").take(1);
						(0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (success_suspend) {

							var maxId = 1;
							if (success_suspend.results.length > 0) {
								maxId = success_suspend.results[0].SUSPEND_ID + 1;
							}

							var suspend_trx = (0, _entityManagerFactory.EntityManager)().createEntity("SUSPEND_TRX", {
								SUSPEND_ID: maxId,
								GLOBAL_ID: _this7.obj_personnel.HEADER.tin + _this7.obj_personnel.HEADER.country_cd,
								SUSPEND_LEVEL: 1,
								START_DT: _this7.obj_personnel.HEADER.suspension_start,
								END_DT: _this7.obj_personnel.HEADER.suspension_end,
								COMPANY_ID: 0,
								CREATED_BY: _this7.obj_personnel.USER.USER_ID,
								CREATED_DT: dateToday
							});
							(0, _entityManagerFactory.EntityManager)().addEntity(suspend_trx);
							(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (suspend_saved) {
								_toastr2.default.success("", "Suspension details saved.");
							}, function (suspend_error) {
								_toastr2.default.error(suspend_error, "error in saving suspension details.");
							});
						});
					} else {
						_this7.obj_personnel.HEADER.suspension_start = "";
						_this7.obj_personnel.HEADER.suspension_end = "";
						$("#suspensionFrom").datepicker("setValue", new Date());
						$("#suspensionTo").datepicker("setValue", new Date());
					}
				}, function (failed_2) {
					if (varInsert != null) {
						varInsert.entityAspect().setDeleted();
					}

					if (varInsert_2 != null) {
						varInsert_2.entityAspect.setDeleted();
					}

					(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
						var errors = entity.entityAspect.getValidationErrors();
						if (errors.length > 0) console.log(errors);
					});

					console.log(failed_2);
					_toastr2.default.error(failed_2, "Error occured.");
				});
			}, function (failed) {
				if (varInsert_2 != null) {
					varInsert_2.entityAspect.setDeleted();
				}

				(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
					var errors = entity.entityAspect.getValidationErrors();
					if (errors.length > 0) console.log(errors);
				});
				console.log(failed);
				_toastr2.default.error(failed, "Error occured.");
			});
		};

		main.prototype.updateHeader = function updateHeader() {
			var _this8 = this;

			_settings2.default.isNavigating = true;
			_toastr2.default.clear();
			var dateToday = null;
			var bdate = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);

			this.obj_personnel.HEADER.birth_dt = $("#birthDate").val();

			if (this.obj_personnel.HEADER.birth_dt != undefined && this.obj_personnel.HEADER.birth_dt != null && this.obj_personnel.HEADER.birth_dt.length > 0) {
				bdate = new _moment2.default(new Date(this.obj_personnel.HEADER.birth_dt)).add(8, 'hours');
				bdate = new Date(bdate);
			}

			var getEntity = (0, _entityManagerFactory.EntityQuery)().from('GLOBAL_MSTR').where('GLOBAL_ID', '==', this.obj_personnel.HEADER.global_indiv_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(getEntity).then(function (item) {

				if (item.results.length == 0) {
					_toastr2.default.clear();
					_toastr2.default.error('No data for editing retrieved.', 'Error in updating record.');
					return;
				}

				item.results[0].COUNTRY_BASE_CD = _this8.obj_personnel.HEADER.country_base_cd;
				item.results[0].LOCATION_BASE_CD = _this8.obj_personnel.HEADER.location_base_cd;
				item.results[0].LAST_UPDATED_BY = _this8.obj_personnel.USER.USER_ID;
				item.results[0].LAST_UPDATED_DT = dateToday;
				item.results[0].STATUS_CD = _this8.obj_personnel.HEADER.status_cd;

				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {

					var getEntity = (0, _entityManagerFactory.EntityQuery)().from('GLOBAL_INDIV_MSTR').where('GLOBAL_INDIV_ID', '==', _this8.obj_personnel.HEADER.global_indiv_id);
					(0, _entityManagerFactory.EntityManager)().executeQuery(getEntity).then(function (item_2) {
						if (item_2.results.length == 0) {
							_toastr2.default.clear();
							_toastr2.default.error('No data for editing retrieved.', 'Error in updating record.');
							return;
						}

						item_2.results[0].GIVEN_NAME = _this8.obj_personnel.HEADER.given_name.toUpperCase();
						item_2.results[0].MIDDLE_NAME = _this8.obj_personnel.HEADER.middle_name.toUpperCase();
						item_2.results[0].LAST_NAME = _this8.obj_personnel.HEADER.last_name.toUpperCase();
						item_2.results[0].BIRTH_DT = bdate;
						item_2.results[0].BIRTH_PLACE = _this8.obj_personnel.HEADER.birth_place;
						item_2.results[0].GENDER = _this8.selectedGender == 'Male' ? 'M' : 'F';
						item_2.results[0].CIVIL_STATUS = _this8.obj_personnel.HEADER.civil_status;
						item_2.results[0].MOTHER_MAIDEN_NAME = _this8.obj_personnel.HEADER.mother_maiden_name;
						item_2.results[0].ACR_NO = _this8.obj_personnel.HEADER.acr_no;
						item_2.results[0].RELIGION_CD = _this8.obj_personnel.HEADER.religion_cd;
						item_2.results[0].ALIAS = _this8.obj_personnel.HEADER.alias;
						item_2.results[0].LAST_UPDATED_BY = _this8.obj_personnel.USER.USER_ID;
						item_2.results[0].LAST_UPDATED_DT = dateToday;

						(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success_2) {
							_toastr2.default.success('', 'Record updated.');
							_settings2.default.isNavigating = false;

							var getCitizenshipList = (0, _entityManagerFactory.EntityQuery)().from('CITIZENSHIP_TRX').where('GLOBAL_INDIV_ID', '==', _this8.obj_personnel.HEADER.global_indiv_id);
							(0, _entityManagerFactory.EntityManager)().executeQuery(getCitizenshipList).then(function (query) {

								_.each(query.results, function (result) {
									var doesExist = _this8.obj_personnel.HEADER.citizenship.some(function (x) {
										return x.value == result.CITIZENSHIP_CD;
									});

									if (!doesExist) {
										result.entityAspect.setDeleted();
									}
								});

								var getMax = (0, _entityManagerFactory.EntityQuery)().from('CITIZENSHIP_TRX').orderByDesc('CITIZENSHIP_ID').take(1);
								(0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (getMaxSuccess) {
									var Max = 1;
									var newCount = 0;
									if (getMaxSuccess.results.length > 0) {

										Max = getMaxSuccess.results[0].CITIZENSHIP_ID;

										_.each(_this8.obj_personnel.HEADER.citizenship, function (citi) {
											var doesExist = query.results.some(function (x) {
												return x.CITIZENSHIP_CD == citi.value;
											});
											if (!doesExist) {
												Max += 1;
												newCount++;
												var tempEnt = (0, _entityManagerFactory.EntityManager)().createEntity('CITIZENSHIP_TRX', {
													CITIZENSHIP_CD: citi.value,
													GLOBAL_INDIV_ID: _this8.obj_personnel.HEADER.global_indiv_id,
													CITIZENSHIP_ID: Max,
													CREATED_BY: _this8.obj_personnel.USER.USER_ID,
													CREATED_DT: dateToday
												});
												(0, _entityManagerFactory.EntityManager)().addEntity(tempEnt);
											}
										});

										(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success_3) {
											_toastr2.default.success(success_3, 'Citizenship list was updated.');
										}, function (error) {
											(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
												var errors = entity.entityAspect.getValidationErrors();
												if (errors.length > 0) console.log(errors);
											});
											console.log(error);
											_toastr2.default.error("Error Occured_3", error);
										});
									}
								});
							});

							var getGroup = (0, _entityManagerFactory.EntityQuery)().from('GRP_INDIV_MSTR').where('GLOBAL_INDIV_ID', '==', _this8.obj_personnel.HEADER.global_indiv_id);
							(0, _entityManagerFactory.EntityManager)().executeQuery(getGroup).then(function (queryGroup) {

								_.each(queryGroup.results, function (result) {
									var doesExist = _this8.obj_personnel.HEADER.group.some(function (x) {
										return x.value == result.GLOBAL_GRP_ID;
									});
									if (!doesExist) {
										result.entityAspect.setDeleted();
									}
								});

								var getMax = (0, _entityManagerFactory.EntityQuery)().from('GRP_INDIV_MSTR').orderByDesc('GRP_INDIV_ID').take(1);
								(0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (queryMax) {
									var Max = 1;

									if (queryMax.results.length > 0) {
										Max = queryMax.results[0].GRP_INDIV_ID;
										_.each(_this8.obj_personnel.HEADER.group, function (g) {
											var doesExist = queryGroup.results.some(function (x) {
												return x.GLOBAL_GRP_ID == g.value;
											});

											if (!doesExist) {
												Max += 1;
												var tempEnt = (0, _entityManagerFactory.EntityManager)().createEntity('GRP_INDIV_MSTR', {
													GLOBAL_INDIV_ID: _this8.obj_personnel.HEADER.global_indiv_id,
													GLOBAL_GRP_ID: g.value,
													GRP_INDIV_ID: Max,
													STATUS_CD: 'ACTV',
													CREATED_BY: _this8.obj_personnel.USER.USER_ID,
													CREATED_DT: dateToday
												});
												(0, _entityManagerFactory.EntityManager)().addEntity(tempEnt);
											} else {

												var index = _.findIndex(queryGroup.results, function (o) {
													return o.GLOBAL_GRP_ID == g.value;
												});
												if (index != -1 && queryGroup.results[index].STATUS_CD == 'INACTV') {
													queryGroup.results[index].STATUS_CD = 'ACTV';
													queryGroup.results[index].LAST_UPDATED_BY = _this8.obj_personnel.USER.USER_ID;
													queryGroup.results[index].LAST_UPDATED_DT = dateToday;
												}
											}
										});

										(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success_710) {
											_toastr2.default.success(success_710, 'Group list was updated.');
										}, function (error_712) {
											(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
												var errors = entity.entityAspect.getValidationErrors();
												if (errors.length > 0) console.log(errors);
											});
											console.log(error_712);
											_toastr2.default.error("Error Occured_4", error_712);
										});
									}
								});
							});

							if (_this8.obj_personnel.HEADER.status_cd == "SUSPEND") {
								var suspend_start = null;
								var suspend_end = null;
								if ((0, _moment2.default)(_this8.obj_personnel.HEADER.suspension_start).isValid()) {
									suspend_start = new Date((0, _moment2.default)(_this8.obj_personnel.HEADER.suspension_start).add(8, "hours"));
								}
								if ((0, _moment2.default)(_this8.obj_personnel.HEADER.suspension_end).isValid()) {
									suspend_end = new Date((0, _moment2.default)(_this8.obj_personnel.HEADER.suspension_end).add(8, "hours"));
								}

								if (_this8.obj_personnel.HEADER.suspend_id != undefined && _this8.obj_personnel.HEADER.suspend_id != null && _this8.obj_personnel.HEADER.suspend_id.toString().length > 0) {
									var getSuspend = (0, _entityManagerFactory.EntityQuery)().from("SUSPEND_TRX").where("SUSPEND_ID", "==", _this8.obj_personnel.HEADER.suspend_id);
									(0, _entityManagerFactory.EntityManager)().executeQuery(getSuspend).then(function (success_getSuspend) {
										success_getSuspend.results[0].START_DT = suspend_start;
										success_getSuspend.results[0].END_DT = suspend_end;
										success_getSuspend.results[0].LAST_UPDATED_BY = _this8.obj_personnel.USER.USER_ID;
										success_getSuspend.results[0].LAST_UPDATED_DT = dateToday;
										(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (save_success) {
											_toastr2.default.success("", "Suspension date updated.");
										}, function (save_error) {
											_toastr2.default.error(save_error, "error in updating suspension date.");
										});
									}, function (error_getSuspend) {
										_toastr2.default.error(error_getSuspend, "error in updating suspension date.");
									});
								} else {
									var getMax = (0, _entityManagerFactory.EntityQuery)().from("SUSPEND_TRX").orderByDesc("SUSPEND_ID").take(1);
									(0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (success_suspend) {
										var maxId = 1;
										if (success_suspend.results.length > 0) {
											maxId = success_suspend.results[0].SUSPEND_ID + 1;
										}
										var suspend_trx = (0, _entityManagerFactory.EntityManager)().createEntity("SUSPEND_TRX", {
											SUSPEND_ID: maxId + "",
											GLOBAL_ID: _this8.obj_personnel.HEADER.tin + _this8.obj_personnel.HEADER.country_cd,
											SUSPEND_LEVEL: 1,
											START_DT: suspend_start,
											END_DT: suspend_end,
											COMPANY_ID: 0,
											CREATED_BY: _this8.obj_personnel.USER.USER_ID,
											CREATED_DT: dateToday
										});
										(0, _entityManagerFactory.EntityManager)().addEntity(suspend_trx);
										(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (suspend_saved) {
											_toastr2.default.success("", "Suspension details saved.");
										}, function (suspend_error) {
											_toastr2.default.error(suspend_error, "error in saving suspension details.");
										});
									});
								}
							} else {
								_this8.obj_personnel.HEADER.suspension_start = "";
								_this8.obj_personnel.HEADER.suspension_end = "";
								$("#suspensionFrom").datepicker("setValue", new Date());
								$("#suspensionTo").datepicker("setValue", new Date());
							}
						}, function (error) {
							(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
								var errors = entity.entityAspect.getValidationErrors();
								if (errors.length > 0) console.log(errors);
							});
							console.log(error);
							_toastr2.default.error("Error Occured_2", error);
						});
					});
				}, function (error) {
					(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
						var errors = entity.entityAspect.getValidationErrors();
						if (errors.length > 0) console.log(errors);
					});
					console.log(error);
					_toastr2.default.error("Error Occured_1", error);
				});
			});
		};

		main.prototype.btnUpload = function btnUpload() {
			_toastr2.default.clear();
			_toastr2.default.info("Image Upload under maintenance.", "");
		};

		main.prototype.clickTab_main = function clickTab_main(index) {
			var _this9 = this;

			if (this.obj_personnel.global_indiv_id.length === 0) return;
			switch (index) {
				case 0:
					_toastr2.default.clear();
					_toastr2.default.info("Loading employee info...", "");
					this.loadData(this.obj_personnel.global_indiv_id);
					break;
				case 1:
					_toastr2.default.clear();
					_toastr2.default.info("Loading contact list...", "");
					this.obj_personnel.OBSERVERS.maintab_contact_clicked.forEach(function (delegate) {
						delegate(_this9.obj_personnel.global_indiv_id);
					});
					break;
				case 2:
					_toastr2.default.clear();
					_toastr2.default.info("Loading Educational Achievement...", "");
					this.obj_personnel.OBSERVERS.maintab_education_clicked.forEach(function (delegate) {
						delegate(_this9.obj_personnel.global_indiv_id);
					});
					break;
				case 3:
					_toastr2.default.clear();

					break;
				case 4:
					_toastr2.default.clear();

					break;
				case 5:
					_toastr2.default.clear();

					break;
			}
		};

		main.prototype.clearData = function clearData() {
			this._disableSavePersonnel = true;
			this._disableClearData = true;
			this._disableCreatePersonnel = false;
			this._disableSearchPersonnel = false;
			this.obj_personnel.global_indiv_id = "";
			this.obj_personnel.HEADER = {
				citizenship: [],
				group: []
			};
			this.selectedGender = "";
			this.selected_citizenship = "";
			this.selected_group = "";
			this._disableForm = true;
			this.obj_personnel.editing_status = "";
			_toastr2.default.clear();
			this.obj_personnel.OBSERVERS.clear_ppid.forEach(function (delegate) {
				delegate();
			});
		};

		main.prototype.DigitOnly = function DigitOnly(event) {
			return (0, _helpers.isDigit)(event);
		};

		main.prototype.mask = function mask(id, _mask) {
			(0, _helpers.input_mask)(id, _mask);
		};

		return main;
	}()) || _class);
	exports.main = main;
});
define('ppid/forms/main_contact',['exports', 'toastr', 'aurelia-framework', '../obj_personnel', '../../entity-manager-factory', 'breeze-client', 'aurelia-dialog', '../modals/DialogBox', 'moment', 'settings', '../../helpers'], function (exports, _toastr, _aureliaFramework, _obj_personnel, _entityManagerFactory, _breezeClient, _aureliaDialog, _DialogBox, _moment, _settings, _helpers) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.main_contact = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	var _moment2 = _interopRequireDefault(_moment);

	var _settings2 = _interopRequireDefault(_settings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var main_contact = exports.main_contact = (_dec = (0, _aureliaFramework.inject)(_obj_personnel.obj_personnel, _toastr2.default, _aureliaDialog.DialogService), _dec(_class = function () {
		function main_contact(obj_personnel, toastr, DialogService) {
			var _this = this;

			_classCallCheck(this, main_contact);

			this._disableForm = true;
			this._disableBtnAdd = false;
			this._disableBtnSave = true;
			this._disableAddressTable = false;
			this._disableContactTable = false;
			this.lblCreatedBy = "";
			this.lblUpdatedBy = "";
			this.obj_personnel = null;

			this.DialogService = DialogService;
			this.obj_personnel = obj_personnel;
			this.obj_personnel.OBSERVERS.maintab_contact_clicked.push(function (val) {
				_this.loadMain_Address(val);
				_this.loadMain_Contact(val);
				_this.loadMain_EmailWeb(val);
				_this.clearAddressData();
				_this.clearContactData();

				_this.loadLog_V2(val);
			});

			this.obj_personnel.OBSERVERS.clear_ppid.push(function (val) {
				_this.obj_personnel.CONTACT = {
					status: "",
					modelAddress: {},
					statusContact: "Add",
					modelContact: {},
					modelInternet: {},
					address: [],
					contact: [],
					email: [],
					website: []
				};
				_this.clearAddressData();
				_this.clearContactData();
				_this.clearEmailWebData();
			});
		}

		main_contact.prototype.loadMain_Address = function loadMain_Address(global_id) {
			var _this2 = this;

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from('ADDR_TRX').where('GLOBAL_ID', '==', global_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (success) {
				var tmp = [];
				var tmpFullAddress = [];
				_.each(success.results, function (result) {
					var strFullAddress = "";
					if (result.UNIT_NO != null && result.UNIT_NO.length > 0) tmpFullAddress.push(result.UNIT_NO);
					if (result.HOUSE_NO != null && result.HOUSE_NO.length > 0) tmpFullAddress.push(result.HOUSE_NO);
					if (result.BLOCK_LOT != null && result.BLOCK_LOT.length > 0) tmpFullAddress.push(result.BLOCK_LOT);
					if (result.BLDG_NAME != null && result.BLDG_NAME.length > 0) tmpFullAddress.push(result.BLDG_NAME);
					if (result.STREET_NAME != null && result.STREET_NAME.length > 0) tmpFullAddress.push(result.STREET_NAME);
					if (result.SUB_VILLAGE != null && result.SUB_VILLAGE.length > 0) tmpFullAddress.push(result.SUB_VILLAGE);
					if (result.BARANGAY != null && result.BARANGAY.length > 0) tmpFullAddress.push(result.BARANGAY);
					if (result.DISTRICT != null && result.DISTRICT.length > 0) tmpFullAddress.push(result.DISTRICT);
					if (result.CITY_TOWN != null && result.CITY_TOWN.length > 0) tmpFullAddress.push(result.CITY_TOWN);
					if (result.STATE_PROVINCE != null && result.STATE_PROVINCE.length > 0) {
						var text = _this2.obj_personnel.LOCATIONS.find(function (l) {
							if (l.value == result.STATE_PROVINCE) return l.text;
						});
						tmpFullAddress.push(text);
					}
					if (result.REGION != null && result.REGION.length > 0) tmpFullAddress.push(result.REGION);
					if (result.ZIPCODE != null && result.ZIPCODE.length > 0) tmpFullAddress.push(result.ZIPCODE);
					if (result.COUNTRY_CD != null && result.COUNTRY_CD.length > 0) tmpFullAddress.push(result.COUNTRY_CD);

					if (tmpFullAddress.length > 0) {
						strFullAddress = tmpFullAddress.join(' ');
						tmpFullAddress = [];
					}

					tmp.push({
						global_id: result.GLOBAL_ID,
						addr_id: result.ADDR_ID,
						country_cd: result.COUNTRY_CD,
						region: result.REGION,
						state_province: result.STATE_PROVINCE,
						city_town: result.CITY_TOWN,
						district: result.DISTRICT,
						barangay: result.BARANGAY,
						sub_village: result.SUB_VILLAGE,
						phase: result.PHASE,
						permanent_fl: result.PERMANENT_FL,
						present_fl: result.PRESENT_FL,
						block_lot: result.BLOCK_LOT,
						street_name: result.STREET_NAME,
						house_no: result.HOUSE_NO,
						bldg_name: result.BLDG_NAME,
						unit_no: result.UNIT_NO,
						zipcode: result.ZIPCODE,
						residential_type: result.RESIDENTIAL_TYPE,
						house_ownership: result.HOUSE_OWNERSHIP,
						mailing_fl: result.MAILING_FL,
						postal_box: result.POSTAL_BOX,
						remarks: result.REMARKS,
						sketch_path: result.SKETCH_PATH,
						full_address: strFullAddress
					});
				});

				_this2.obj_personnel.CONTACT.address = tmp;
				_settings2.default.isNavigating = false;
				_toastr2.default.clear();
				_toastr2.default.success("", "Contact info has been loaded.");
			});
		};

		main_contact.prototype.loadMain_Contact = function loadMain_Contact(global_id) {
			var _this3 = this;

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from('CONTACT_INFO_TRX').where('GLOBAL_ID', '==', global_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (success) {

				var tmp = [];
				_.each(success.results, function (result) {
					var type = _this3.obj_personnel.CONTACT_TYPE.find(function (x) {
						return x.value == result.PHONE_TYPE;
					});
					var contact = {
						contact_no_id: result.CONTACT_NO_ID,
						global_id: result.GLOBAL_ID,
						phone_type_text: type.text,
						phone_type: result.PHONE_TYPE,
						area_cd: result.AREA_CD,
						phone_no: result.PHONE_NO,
						local_no: result.LOCAL_NO
					};
					tmp.push(contact);
				});
				_this3.obj_personnel.CONTACT.contact = tmp;
				_settings2.default.isNavigating = false;
			}, function (error) {
				_toastr2.default.error(error, "Error in loading contact details.");
			});
		};

		main_contact.prototype.loadMain_EmailWeb = function loadMain_EmailWeb(global_id) {
			var _this4 = this;

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from("INTERNET_TRX").where("GLOBAL_ID", "==", global_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {

				var tmpEmail = [];
				var tmpWeb = [];
				_.each(querySuccess.results, function (result) {

					if (result.EMAIL_FL == 1) {
						var email = {
							internet_id: result.INTERNET_ID,
							web_addr: result.WEB_ADDR
						};
						tmpEmail.push(email);
					} else if (result.REC_STAT_FL == 1) {
						var web = {
							internet_id: result.INTERNET_ID,
							web_addr: result.WEB_ADDR
						};
						tmpWeb.push(web);
					}
				});

				_this4.obj_personnel.CONTACT.email = tmpEmail;
				_this4.obj_personnel.CONTACT.website = tmpWeb;
			}, function (queryError) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(queryError, "Error in loading email data.");
			});
		};

		main_contact.prototype.loadLog = function loadLog(global_id) {
			var _this5 = this;

			var createdBy = null;
			var dtCreated = null;
			var updatedBy = null;
			var dtUpdated = null;
			var query = (0, _entityManagerFactory.EntityQuery)().from("ADDR_TRX").where("GLOBAL_ID", "==", global_id).orderBy("CREATED_DT").take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {
				if (s1.results.length == 1) {
					dtCreated = new Date(s1.results[0].CREATED_DT);
					createdBy = s1.results[0].CREATED_BY;
				}

				query = (0, _entityManagerFactory.EntityQuery)().from("CONTACT_INFO_TRX").where("GLOBAL_ID", "==", global_id).orderBy("CREATED_DT").take(1);
				(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s2) {
					if (s2.results.length == 1) {
						var tmpDt = new Date(s2.results[0].CREATED_DT);
						if (dtCreated == null || dtCreated > tmpDt) {
							dtCreated = tmpDt;
							createdBy = s2.results[0].CREATED_BY;
						}
					}

					query = (0, _entityManagerFactory.EntityQuery)().from("INTERNET_TRX").where("GLOBAL_ID", "==", global_id).orderBy("CREATED_DT").take(1);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s3) {
						if (s3.results.length == 1) {
							var tmpDt = new Date(s3.results[0].CREATED_DT);
							if (dtCreated == null || dtCreated > tmpDt) {
								dtCreated = tmpDt;
								createdBy = s3.results[0].CREATED_BY;
							}
						}
						if (createdBy != null) {
							_this5.lblCreatedBy = createdBy + ' ' + _moment2.default.utc(dtCreated).format("MM/DD/YYYY hh:mm A");
						} else {
							_this5.lblCreatedBy = "";
						}
					});
				});
			});

			var query2 = (0, _entityManagerFactory.EntityQuery)().from("ADDR_TRX").where("GLOBAL_ID", "==", global_id).orderByDesc("LAST_UPDATED_DT").take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query2).then(function (ss1) {
				if (ss1.results.length == 1) {
					if (ss1.results[0].LAST_UPDATED_BY != null) {
						updatedBy = ss1.results[0].LAST_UPDATED_BY;
						dtUpdated = new Date(ss1.results[0].LAST_UPDATED_DT);
					}
				}
				query2 = (0, _entityManagerFactory.EntityQuery)().from("CONTACT_INFO_TRX").where("GLOBAL_ID", "==", global_id).orderByDesc("LAST_UPDATED_DT").take(1);
				(0, _entityManagerFactory.EntityManager)().executeQuery(query2).then(function (ss2) {
					if (ss2.results.length == 1) {
						if (ss2.results[0].LAST_UPDATED_BY != null) {
							var tmpDt = new Date(ss2.results[0].LAST_UPDATED_DT);
							if (dtUpdated == null || dtUpdated < tmpDt) {
								updatedBy = ss2.results[0].LAST_UPDATED_BY;
								dtUpdated = tmpDt;
							}
						}
					}

					query2 = (0, _entityManagerFactory.EntityQuery)().from("INTERNET_TRX").where("GLOBAL_ID", "==", global_id).orderByDesc("LAST_UPDATED_DT").take(1);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query2).then(function (ss3) {
						if (ss3.results.length == 1) {
							if (ss3.results[0].LAST_UPDATED_BY != null) {
								var tmpDt = new Date(ss3.results[0].LAST_UPDATED_DT);
								if (dtUpdated == null || dtUpdated < tmpDt) {
									updatedBy = ss3.results[0].LAST_UPDATED_BY;
									dtUpdated = tmpDt;
								}
							}
						}
						if (updatedBy != null) {
							_this5.lblUpdatedBy = updatedBy + ' ' + _moment2.default.utc(dtUpdated).format("MM/DD/YYYY hh:mm A");
						} else {
							_this5.lblUpdatedBy = "";
						}
					});
				});
			});
		};

		main_contact.prototype.loadLog_V2 = function loadLog_V2(global_id) {
			var _this6 = this;

			var tmpList = [];
			var query = (0, _entityManagerFactory.EntityQuery)().from("ADDR_TRX").where("GLOBAL_ID", "==", global_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {
				_.each(s1.results, function (r) {
					if (r.CREATED_BY != null) {
						var _user = r.CREATED_BY;
						var _date = new Date(r.CREATED_DT);
						tmpList.push({
							user: _user,
							date: _date
						});
					}

					if (r.LAST_UPDATED_BY != null) {
						var _user = r.LAST_UPDATED_BY;
						var _date = new Date(r.LAST_UPDATED_DT);
						tmpList.push({
							user: _user,
							date: _date
						});
					}
				});

				query = (0, _entityManagerFactory.EntityQuery)().from("CONTACT_INFO_TRX").where("GLOBAL_ID", "==", global_id);
				(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s2) {
					_.each(s2.results, function (r2) {
						if (r2.CREATED_BY != null) {
							var _user = r2.CREATED_BY;
							var _date = new Date(r2.CREATED_DT);
							tmpList.push({
								user: _user,
								date: _date
							});
						}

						if (r2.LAST_UPDATED_BY != null) {
							var _user = r2.LAST_UPDATED_BY;
							var _date = new Date(r2.LAST_UPDATED_DT);
							tmpList.push({
								user: _user,
								date: _date
							});
						}
					});

					query = (0, _entityManagerFactory.EntityQuery)().from("INTERNET_TRX").where("GLOBAL_ID", "==", global_id);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s3) {

						_.each(s3.results, function (r3) {
							if (r3.CREATED_BY != null) {
								var _user = r3.CREATED_BY;
								var _date = new Date(r3.CREATED_DT);
								tmpList.push({
									user: _user,
									date: _date
								});
							}

							if (r3.LAST_UPDATED_BY != null) {
								var _user = r3.LAST_UPDATED_BY;
								var _date = new Date(r3.LAST_UPDATED_DT);
								tmpList.push({
									user: _user,
									date: _date
								});
							}
						});

						tmpList.sort(_this6.OrderByDate);
						var LastIndex = tmpList.length - 1;
						if (tmpList.length > 0) {
							_this6.lblCreatedBy = tmpList[0].user + ' ' + _moment2.default.utc(tmpList[0].date).format("MM/DD/YYYY hh:mm A");
							if (tmpList.length > 1) {
								_this6.lblUpdatedBy = tmpList[LastIndex].user + ' ' + _moment2.default.utc(tmpList[LastIndex].date).format("MM/DD/YYYY hh:mm A");
							}
						} else {
							_this6.lblCreatedBy = "";
							_this6.lblUpdatedBy = "";
						}
					});
				});
			});
		};

		main_contact.prototype.OrderByDate = function OrderByDate(a, b) {
			if (a.date > b.date) return 1;
			if (a.date < b.date) return -1;
			return 0;
		};

		main_contact.prototype.clearAddressData = function clearAddressData() {

			_settings2.default.isNavigating = false;
			this.obj_personnel.CONTACT.modelAddress = {};
			this.obj_personnel.CONTACT.status = "";
			this._disableBtnAdd = false;
			this._disableBtnSave = true;
			this._disableForm = true;
			this._disableAddressTable = false;
		};

		main_contact.prototype.clearContactData = function clearContactData() {

			_settings2.default.isNavigating = false;
			this._disableContactTable = false;
			this.obj_personnel.CONTACT.statusContact = "Add";
			this.obj_personnel.CONTACT.modelContact = {};
		};

		main_contact.prototype.clearEmailWebData = function clearEmailWebData() {

			_settings2.default.isNavigating = false;
			this.obj_personnel.CONTACT.modelInternet = {};
		};

		main_contact.prototype.isNumberKey = function isNumberKey(evt) {
			var charCode = evt.which ? evt.which : event.keyCode;
			if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
			return true;
		};

		main_contact.prototype.dd_provinceChanged = function dd_provinceChanged() {
			var prov = this.obj_personnel.CONTACT.modelAddress.state_province;
			if (prov != undefined && prov != null && prov.length != 0) {
				var selectedProv = this.obj_personnel.PROVINCE.find(function (p) {
					if (p.value == prov) {
						return p;
					}
				});

				if (selectedProv != null) {
					this.obj_personnel.CONTACT.modelAddress.region = selectedProv.group;
					this.dd_regionChanged();
				}
			}
		};

		main_contact.prototype.dd_regionChanged = function dd_regionChanged() {
			var reg = this.obj_personnel.CONTACT.modelAddress.region;
			if (reg != undefined && reg != null && reg.length != 0) {
				var selectedRegion = this.obj_personnel.REGION.find(function (r) {
					if (r.value == reg) return r;
				});

				if (selectedRegion != null) {
					this.obj_personnel.CONTACT.modelAddress.country_cd = selectedRegion.group;
				}
			}
		};

		main_contact.prototype.btnAdd_Address = function btnAdd_Address() {
			this.obj_personnel.CONTACT.status = "ADD";
			this._disableBtnAdd = true;
			this._disableBtnSave = false;
			this._disableForm = false;
			this._disableAddressTable = true;
		};

		main_contact.prototype.btnEdit_Address = function btnEdit_Address(address) {
			this._disableBtnAdd = true;
			this._disableBtnSave = false;
			this._disableForm = false;
			this._disableAddressTable = true;
			this.obj_personnel.CONTACT.status = "EDIT";
			this.obj_personnel.CONTACT.modelAddress = address;
			this.obj_personnel.CONTACT.modelAddress.present_fl = this.obj_personnel.CONTACT.modelAddress.present_fl == '1' ? true : false;
			this.obj_personnel.CONTACT.modelAddress.permanent_fl = this.obj_personnel.CONTACT.modelAddress.permanent_fl == '1' ? true : false;
		};

		main_contact.prototype.btnRemoveAddress = function btnRemoveAddress(item) {
			var _this7 = this;

			this.DialogService.open({ viewModel: _DialogBox.DialogBox, model: { title: "Confirm remove.", message: "Are you sure you want to remove the address?" } }).whenClosed(function (response) {
				if (!response.wasCancelled) {
					_settings2.default.isNavigating = true;
					var query = (0, _entityManagerFactory.EntityQuery)().from('ADDR_TRX').where('ADDR_ID', '==', item.addr_id);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (success) {

						success.results[0].entityAspect.setDeleted();

						(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (saveSuccess) {
							_toastr2.default.success("", "The address was successfully removed.");
							_this7.loadMain_Address(_this7.obj_personnel.global_indiv_id);

							_this7.loadLog_V2(_this7.obj_personnel.global_indiv_id);
						}, function (error) {
							_toastr2.default.clear();
							_toastr2.default.error("", "Error in removing address.");
							_settings2.default.isNavigating = false;
						});
					});
				}
			});
		};

		main_contact.prototype.validateAddress = function validateAddress() {
			var strValidation = "";
			if (this.obj_personnel.CONTACT.modelAddress.country_cd == undefined || this.obj_personnel.CONTACT.modelAddress.country_cd == null || this.obj_personnel.CONTACT.modelAddress.country_cd.length == 0) {
				strValidation += "No country specified.<br/>";
			}

			if (strValidation.length > 0) {
				_toastr2.default.clear();
				_toastr2.default.error(strValidation, "");
				return;
			} else {
				if (this.obj_personnel.CONTACT.status == 'ADD') {
					this.insertAddress();
				} else if (this.obj_personnel.CONTACT.status == 'EDIT') {
					this.updateAddress();
				}
			}
		};

		main_contact.prototype.insertAddress = function insertAddress() {
			var _this8 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);

			var query = (0, _entityManagerFactory.EntityQuery)().from('ADDR_TRX').orderByDesc('ADDR_ID').take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (success) {

				var Max = 1;
				if (success.results.length > 0) {
					Max = success.results[0].ADDR_ID + 1;
				}


				var _address = {
					ADDR_ID: Max,
					BARANGAY: _this8.obj_personnel.CONTACT.modelAddress.barangay,
					BLDG_NAME: _this8.obj_personnel.CONTACT.modelAddress.bldg_name,
					BLOCK_LOT: _this8.obj_personnel.CONTACT.modelAddress.block_lot,
					CITY_TOWN: _this8.obj_personnel.CONTACT.modelAddress.city_town,
					COUNTRY_CD: _this8.obj_personnel.CONTACT.modelAddress.country_cd,
					DISTRICT: _this8.obj_personnel.CONTACT.modelAddress.district,
					GLOBAL_ID: _this8.obj_personnel.HEADER.global_indiv_id,
					HOUSE_NO: _this8.obj_personnel.CONTACT.modelAddress.house_no,

					MAILING_FL: 0,
					PERMANENT_FL: _this8.obj_personnel.CONTACT.modelAddress.permanent_fl ? 1 : 0,

					PRESENT_FL: _this8.obj_personnel.CONTACT.modelAddress.present_fl ? 1 : 0,

					REGION: _this8.obj_personnel.CONTACT.modelAddress.region,
					REMARKS: _this8.obj_personnel.CONTACT.modelAddress.remarks,

					STATE_PROVINCE: _this8.obj_personnel.CONTACT.modelAddress.state_province,
					STREET_NAME: _this8.obj_personnel.CONTACT.modelAddress.street_name,
					SUB_VILLAGE: _this8.obj_personnel.CONTACT.modelAddress.sub_village,
					UNIT_NO: _this8.obj_personnel.CONTACT.modelAddress.unit_no,
					ZIPCODE: _this8.obj_personnel.CONTACT.modelAddress.zipcode,
					CREATED_BY: _this8.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};

				var address = (0, _entityManagerFactory.EntityManager)().createEntity('ADDR_TRX', _address);

				(0, _entityManagerFactory.EntityManager)().addEntity(address);
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {
					_toastr2.default.clear();
					_toastr2.default.success("", "Record saved.");
					_this8.loadMain_Address(_this8.obj_personnel.global_indiv_id);

					_this8.loadLog_V2(_this8.obj_personnel.global_indiv_id);
					_this8.clearAddressData();
				}, function (error) {
					if (address != null) {
						address.entityAspect.setDeleted();
					}
					(0, _entityManagerFactory.EntityManager)().getEntities().forEach(function (entity) {
						var errors = entity.entityAspect.getValidationErrors();
						if (errors.length > 0) console.log(errors);
					});
					_toastr2.default.clear();
					_toastr2.default.error(error, "Error in saving address.");

					_settings2.default.isNavigating = false;
				});
			});
		};

		main_contact.prototype.updateAddress = function updateAddress() {
			var _this9 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);
			var query = (0, _entityManagerFactory.EntityQuery)().from('ADDR_TRX').where('ADDR_ID', '==', this.obj_personnel.CONTACT.modelAddress.addr_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (success) {
				success.results[0].BARANGAY = _this9.obj_personnel.CONTACT.modelAddress.barangay;
				success.results[0].BLDG_NAME = _this9.obj_personnel.CONTACT.modelAddress.bldg_name;
				success.results[0].BLOCK_LOT = _this9.obj_personnel.CONTACT.modelAddress.block_lot;
				success.results[0].CITY_TOWN = _this9.obj_personnel.CONTACT.modelAddress.city_town;
				success.results[0].COUNTRY_CD = _this9.obj_personnel.CONTACT.modelAddress.country_cd;
				success.results[0].DISTRICT = _this9.obj_personnel.CONTACT.modelAddress.district;
				success.results[0].HOUSE_NO = _this9.obj_personnel.CONTACT.modelAddress.house_no;
				success.results[0].PERMANENT_FL = _this9.obj_personnel.CONTACT.modelAddress.permanent_fl ? '1' : '0';
				success.results[0].PRESENT_FL = _this9.obj_personnel.CONTACT.modelAddress.present_fl ? '1' : '0';
				success.results[0].REGION = _this9.obj_personnel.CONTACT.modelAddress.region;
				success.results[0].REMARKS = _this9.obj_personnel.CONTACT.modelAddress.remarks;
				success.results[0].STATE_PROVINCE = _this9.obj_personnel.CONTACT.modelAddress.state_province;
				success.results[0].STREET_NAME = _this9.obj_personnel.CONTACT.modelAddress.street_name;
				success.results[0].SUB_VILLAGE = _this9.obj_personnel.CONTACT.modelAddress.sub_village;
				success.results[0].UNIT_NO = _this9.obj_personnel.CONTACT.modelAddress.unit_no;
				success.results[0].ZIPCODE = _this9.obj_personnel.CONTACT.modelAddress.zipcode;
				success.results[0].LAST_UPDATED_BY = _this9.obj_personnel.USER.USER_ID;
				success.results[0].LAST_UPDATED_DT = dateToday;

				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {
					_toastr2.default.clear();
					_toastr2.default.success("", "Record updated sucessfully.");
					_this9.loadMain_Address(_this9.obj_personnel.global_indiv_id);
					_this9.clearAddressData();

					_this9.loadLog_V2(_this9.obj_personnel.global_indiv_id);
				}, function (error) {
					_settings2.default.isNavigating = false;
					_toastr2.default.clear();
					console.log(error);
					_toastr2.default.error(error, 'Error in updating address.');
				});
			});
		};

		main_contact.prototype.btnEdit_Contact = function btnEdit_Contact(contact) {
			this._disableContactTable = true;
			this.obj_personnel.CONTACT.statusContact = "Edit";
			this.obj_personnel.CONTACT.modelContact.contact_no_id = contact.contact_no_id;
			this.obj_personnel.CONTACT.modelContact.phone_type = contact.phone_type;
			this.obj_personnel.CONTACT.modelContact.area_cd = contact.area_cd;
			this.obj_personnel.CONTACT.modelContact.phone_no = contact.phone_no;
			this.obj_personnel.CONTACT.modelContact.local_no = contact.local_no;
		};

		main_contact.prototype.btnRemove_Contact = function btnRemove_Contact(contact) {
			var _this10 = this;

			this.DialogService.open({ viewModel: _DialogBox.DialogBox, model: { title: "Confirm remove.", message: "Are you sure you want to remove the contact?" } }).whenClosed(function (response) {
				if (!response.wasCancelled) {
					_settings2.default.isNavigating = true;
					var query = (0, _entityManagerFactory.EntityQuery)().from("CONTACT_INFO_TRX").where("CONTACT_NO_ID", "==", contact.contact_no_id);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
						if (querySuccess.results.length == 0) {
							_toastr2.default.clear();
							_toastr2.default.error("", "No to-be-remove record found.");
						}
						querySuccess.results[0].entityAspect.setDeleted();

						(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (removeSuccess) {
							_toastr2.default.clear();
							_toastr2.default.success("", "The contact was successfully removed.");
							_this10.loadMain_Contact(_this10.obj_personnel.global_indiv_id);
							_this10.clearContactData();

							_this10.loadLog_V2(_this10.obj_personnel.global_indiv_id);
						}, function (removeError) {
							_settings2.default.isNavigating = false;
							_toastr2.default.clear();
							_toastr2.default.error(removeError, "Error in removing contact.");
						});
					});
				}
			});
		};

		main_contact.prototype.validateContact = function validateContact() {
			var strValidation = "";

			if (this.obj_personnel.CONTACT.modelContact.phone_type == undefined || this.obj_personnel.CONTACT.modelContact.phone_type == null || this.obj_personnel.CONTACT.modelContact.phone_type.length == 0) {
				strValidation += "Phone type is required.<br/>";
			}

			if (this.obj_personnel.CONTACT.modelContact.area_cd == undefined || this.obj_personnel.CONTACT.modelContact.area_cd == null || this.obj_personnel.CONTACT.modelContact.area_cd.length == 0) {
				strValidation += "Area Code is required.<br/>";
			}

			if (this.obj_personnel.CONTACT.modelContact.phone_no == undefined || this.obj_personnel.CONTACT.modelContact.phone_no == null || this.obj_personnel.CONTACT.modelContact.phone_no.length == 0) {
				strValidation += "Phone number is required.<br/>";
			}

			if (strValidation.length > 0) {
				_toastr2.default.clear();
				_toastr2.default.error("", strValidation);
			} else {
				if (this.obj_personnel.CONTACT.statusContact == "Add") {
					this.insertContact();
				} else if (this.obj_personnel.CONTACT.statusContact == "Edit") {
					this.updateContact();
				}
			}
		};

		main_contact.prototype.insertContact = function insertContact() {
			var _this11 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);
			var query = (0, _entityManagerFactory.EntityQuery)().from("CONTACT_INFO_TRX").orderByDesc("CONTACT_NO_ID").take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (Success) {
				var Max = 1;
				if (Success.results.length > 0) {
					Max = Success.results[0].CONTACT_NO_ID + 1;
				}
				var Contact = (0, _entityManagerFactory.EntityManager)().createEntity("CONTACT_INFO_TRX", {
					AREA_CD: _this11.obj_personnel.CONTACT.modelContact.area_cd,
					CONTACT_NO_ID: Max,
					COUNTRY_CD: "PH",
					GLOBAL_ID: _this11.obj_personnel.global_indiv_id,
					LOCAL_NO: _this11.obj_personnel.CONTACT.modelContact.local_no,
					PHONE_NO: _this11.obj_personnel.CONTACT.modelContact.phone_no,
					PHONE_TYPE: _this11.obj_personnel.CONTACT.modelContact.phone_type,
					CREATED_BY: _this11.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday

				});
				(0, _entityManagerFactory.EntityManager)().addEntity(Contact);
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (saveSuccess) {
					_toastr2.default.clear();
					_toastr2.default.success("", "Contact successfully added.");
					_this11.loadMain_Contact(_this11.obj_personnel.global_indiv_id);
					_this11.clearContactData();

					_this11.loadLog_V2(_this11.obj_personnel.global_indiv_id);
				}, function (error) {
					_settings2.default.isNavigating = false;
					if (Contact != null) {
						Contact.entityAspect.setDeleted();
					}
					_toastr2.default.clear();
					_toastr2.default.error(error, "Error in adding contact.");
				});
			});
		};

		main_contact.prototype.updateContact = function updateContact() {
			var _this12 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);
			var query = (0, _entityManagerFactory.EntityQuery)().from('CONTACT_INFO_TRX').where("CONTACT_NO_ID", "==", this.obj_personnel.CONTACT.modelContact.contact_no_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (Success) {

				if (Success.results.length == 0) {
					_toastr2.default.clear();
					_toastr2.default.error("", "No record to be updated found.");
					return;
				}
				Success.results[0].AREA_CD = _this12.obj_personnel.CONTACT.modelContact.area_cd;
				Success.results[0].LOCAL_NO = _this12.obj_personnel.CONTACT.modelContact.local_no;
				Success.results[0].PHONE_NO = _this12.obj_personnel.CONTACT.modelContact.phone_no;
				Success.results[0].PHONE_TYPE = _this12.obj_personnel.CONTACT.modelContact.phone_type;
				Success.results[0].LAST_UPDATED_BY = _this12.obj_personnel.USER.USER_ID;
				Success.results[0].LAST_UPDATED_DT = dateToday;

				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (saveSuccess) {
					_toastr2.default.clear();
					_toastr2.default.success("", "The contact was successfully updated.");
					_this12.loadMain_Contact(_this12.obj_personnel.global_indiv_id);
					_this12.clearContactData();

					_this12.loadLog_V2(_this12.obj_personnel.global_indiv_id);
				}, function (errorSave) {
					_settings2.default.isNavigating = false;
					_toastr2.default.clear();
					_toastr2.default.error(errorSave, "Error in updating contact.");
					console.log(errorSave);
				});
			});
		};

		main_contact.prototype.validateEmail = function validateEmail(email) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		};

		main_contact.prototype.validateWeb = function validateWeb(URL) {
			var regEx = /^\s*[a-z](?:[-a-z0-9\+\.])*:(?:\/\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:])*@)?(?:\[(?:(?:(?:[0-9a-f]{1,4}:){6}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|::(?:[0-9a-f]{1,4}:){5}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:[0-9a-f]{1,4}:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3})|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|v[0-9a-f]+[-a-z0-9\._~!\$&\'\(\)\*\+,;=:]+)\]|(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(?:\.(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}|(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=@])*)(?::[0-9]*)?(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*|\/(?:(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*)?|(?:(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))+)(?:\/(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@]))*)*|(?!(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])))(?:\?(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])|[\uE000-\uF8FF\uF0000-\uFFFFD|\u100000-\u10FFFD\/\?])*)?(?:\#(?:(?:%[0-9a-f][0-9a-f]|[-a-z0-9\._~\uA0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\u10000-\u1FFFD\u20000-\u2FFFD\u30000-\u3FFFD\u40000-\u4FFFD\u50000-\u5FFFD\u60000-\u6FFFD\u70000-\u7FFFD\u80000-\u8FFFD\u90000-\u9FFFD\uA0000-\uAFFFD\uB0000-\uBFFFD\uC0000-\uCFFFD\uD0000-\uDFFFD\uE1000-\uEFFFD!\$&\'\(\)\*\+,;=:@])|[\/\?])*)?\s*$/i;
			return regEx.test(URL);
		};

		main_contact.prototype.btnAdd_EmailWeb = function btnAdd_EmailWeb(isEmail) {

			if (isEmail) {
				if (this.obj_personnel.CONTACT.modelInternet.email_addr == undefined || this.obj_personnel.CONTACT.modelInternet.email_addr.length == 0) {
					_toastr2.default.clear();
					_toastr2.default.error("", "No email specified.");
					return;
				}

				if (this.validateEmail(this.obj_personnel.CONTACT.modelInternet.email_addr)) {
					this.insertEmailWeb(isEmail);
				} else {
					_toastr2.default.error("Invalid email.");
				}
			} else {
				if (this.obj_personnel.CONTACT.modelInternet.url == undefined || this.obj_personnel.CONTACT.modelInternet.url.length == 0) {
					_toastr2.default.clear();
					_toastr2.default.error("", "No URL specified.");
					return;
				}

				this.insertEmailWeb(isEmail);
			}
		};

		main_contact.prototype.btnRemove_EmailWeb = function btnRemove_EmailWeb(internet_id, isEmail) {
			var _this13 = this;

			this.DialogService.open({ viewModel: _DialogBox.DialogBox, model: { title: "Confirm remove.", message: "Are you sure you want to remove the " + (isEmail ? "Email address" : "website url") + "?" } }).whenClosed(function (response) {
				if (!response.wasCancelled) {
					_settings2.default.isNavigating = true;
					var query = (0, _entityManagerFactory.EntityQuery)().from("INTERNET_TRX").where("INTERNET_ID", "==", internet_id);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
						if (querySuccess.results.length == 0) {
							_toastr2.default.clear();
							_toastr2.default.error("", "No to-be-remove record found.");
						}
						querySuccess.results[0].entityAspect.setDeleted();

						(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (removeSuccess) {
							_toastr2.default.clear();
							_toastr2.default.success("", "The " + (isEmail ? "Email address" : "website url") + " was successfully removed.");
							_this13.loadMain_EmailWeb(_this13.obj_personnel.global_indiv_id);
							_this13.clearEmailWebData();
						}, function (removeError) {
							_settings2.default.isNavigating = false;
							_toastr2.default.clear();
							_toastr2.default.error(removeError, "Error in removing " + (isEmail ? "Email address" : "website url") + " .");
						});
					});
				}
			});
		};

		main_contact.prototype.btnRemove_AllEmailWeb = function btnRemove_AllEmailWeb(isEmail) {
			var _this14 = this;

			this.DialogService.open({ viewModel: _DialogBox.DialogBox, model: { title: "Confirm remove all.", message: "Are you sure you want to remove all the " + (isEmail ? "Email address" : "website url") + "?" } }).whenClosed(function (response) {
				if (!response.wasCancelled) {
					_settings2.default.isNavigating = true;
					var pred1 = _breezeClient2.default.Predicate.create("GLOBAL_ID", "==", _this14.obj_personnel.global_indiv_id);
					var pred2 = _breezeClient2.default.Predicate.create("EMAIL_FL", "==", isEmail ? 1 : 0);
					var finalPred = _breezeClient2.default.Predicate.and([pred1, pred2]);
					var query = (0, _entityManagerFactory.EntityQuery)().from("INTERNET_TRX").where(finalPred);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
						if (querySuccess.results.length == 0) {
							_toastr2.default.clear();
							_toastr2.default.error("", "No to-be-remove record found.");
						}

						_.each(querySuccess.results, function (result) {
							result.entityAspect.setDeleted();
						});

						(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (removeSuccess) {
							_toastr2.default.clear();
							_toastr2.default.success("", "The " + (isEmail ? "Email address" : "website url") + " was successfully removed.");
							_this14.loadMain_EmailWeb(_this14.obj_personnel.global_indiv_id);
							_this14.clearEmailWebData();
						}, function (removeError) {
							_settings2.default.isNavigating = false;
							_toastr2.default.clear();
							_toastr2.default.error(removeError, "Error in removing " + (isEmail ? "Email address" : "website url") + " .");
						});
					});
				}
			});
		};

		main_contact.prototype.insertEmailWeb = function insertEmailWeb(isEmail) {
			var _this15 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);
			var query = (0, _entityManagerFactory.EntityQuery)().from('INTERNET_TRX').orderByDesc('INTERNET_ID').take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
				var Max = 1;
				if (querySuccess.results.length > 0) {
					Max = querySuccess.results[0].INTERNET_ID + 1;
				}

				var internet_trx = {
					GLOBAL_ID: _this15.obj_personnel.global_indiv_id,
					WEB_ADDR: isEmail ? _this15.obj_personnel.CONTACT.modelInternet.email_addr : _this15.obj_personnel.CONTACT.modelInternet.url,
					INTERNET_ID: Max,
					EMAIL_FL: isEmail ? 1 : 0,
					REC_STAT_FL: 1,
					CREATED_BY: _this15.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};
				var entity = (0, _entityManagerFactory.EntityManager)().createEntity("INTERNET_TRX", internet_trx);
				(0, _entityManagerFactory.EntityManager)().addEntity(entity);
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (saveSuccess) {
					_toastr2.default.clear();
					_toastr2.default.success("", "The " + (isEmail ? "Email" : "Website") + " successfully added.");
					_this15.loadMain_EmailWeb(_this15.obj_personnel.global_indiv_id);
					_this15.clearEmailWebData();

					_this15.loadLog_V2(_this15.obj_personnel.global_indiv_id);
				}, function (errorSave) {

					_settings2.default.isNavigating = false;
					if (entity != null) {
						entity.entityAspect.setDeleted();
					}

					_toastr2.default.clear();
					_toastr2.default.success(errorSave, "Error in saving " + (isEmail ? "Email." : "Website."));
				});
			});
		};

		return main_contact;
	}()) || _class);
});
define('ppid/forms/main_educational',['exports', 'toastr', 'aurelia-framework', '../obj_personnel', '../../entity-manager-factory', 'breeze-client', 'aurelia-dialog', '../modals/DialogBox', 'moment', 'settings'], function (exports, _toastr, _aureliaFramework, _obj_personnel, _entityManagerFactory, _breezeClient, _aureliaDialog, _DialogBox, _moment, _settings) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.main_educational = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	var _moment2 = _interopRequireDefault(_moment);

	var _settings2 = _interopRequireDefault(_settings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var main_educational = exports.main_educational = (_dec = (0, _aureliaFramework.inject)(_obj_personnel.obj_personnel, _toastr2.default, _aureliaDialog.DialogService), _dec(_class = function () {
		function main_educational(obj_personnel, toastr, DialogService) {
			var _this = this;

			_classCallCheck(this, main_educational);

			this.obj_personnel = null;
			this._disableForm = true;
			this._disableTable = false;
			this._disableBtnAdd = false;
			this._disableBtnSave = true;
			this.lblCreatedBy = "";
			this.lblUpdatedBy = "";

			this.obj_personnel = obj_personnel;
			this.DialogService = DialogService;
			this.obj_personnel.OBSERVERS.maintab_education_clicked.push(function (val) {
				_this.loadMain_Educational(val);
				_this.loadLog(val);
				_this.clearData();
			});

			this.obj_personnel.OBSERVERS.clear_ppid.push(function () {
				_this.obj_personnel.EDUCATIONAL_ACHIEVEMENT = {
					status: "",
					model: {},
					list: []
				};
			});
		}

		main_educational.prototype.loadMain_Educational = function loadMain_Educational(global_id) {
			var _this2 = this;

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from("EDUCATION_TRX").where("GLOBAL_INDIV_ID", "==", global_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
				var tmpList = [];
				_.each(querySuccess.results, function (result) {
					var school = _this2.obj_personnel.SCHOOLS.find(function (x) {
						return x.school_cd == result.SCHOOL_CD;
					});
					var level = _this2.obj_personnel.LEVEL.find(function (x) {
						return x.value == result.EDUCATION_LEVEL;
					});
					var education = {
						start_yr: result.START_YR,
						course: result.COURSE,
						education_id: result.EDUCATION_ID,
						education_level: result.EDUCATION_LEVEL,
						end_yr: result.END_YR,
						school_cd: result.SCHOOL_CD,
						honor_awards: result.HONOR_AWARDS,
						completed_fl: result.COMPLETED_FL,
						school_name: school.school_name,
						level_name: level.text
					};
					tmpList.push(education);
				});
				_this2.obj_personnel.EDUCATIONAL_ACHIEVEMENT.list = tmpList;
				_toastr2.default.clear();
				_toastr2.default.success("", "Success");
				_settings2.default.isNavigating = false;
			}, function (error) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(error, "Error in loading educational details.");
			});
		};

		main_educational.prototype.loadLog = function loadLog(global_id) {
			var _this3 = this;

			var tmpList = [];
			var query = (0, _entityManagerFactory.EntityQuery)().from("EDUCATION_TRX").where("GLOBAL_INDIV_ID", "==", global_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {
				_.each(s1.results, function (r) {
					if (r.CREATED_BY != null) {
						var _user = r.CREATED_BY;
						var _date = new Date(r.CREATED_DT);
						tmpList.push({
							user: _user,
							date: _date
						});
					}

					if (r.LAST_UPDATED_DT != null) {
						var _user = r.LAST_UPDATED_BY;
						var _date = r.LAST_UPDATED_DT;
						tmpList.push({
							user: _user,
							date: _date
						});
					}
				});

				tmpList.sort(_this3.OrderByDate);
				var LastIndex = tmpList.length - 1;
				if (tmpList.length > 0) {
					_this3.lblCreatedBy = tmpList[0].user + ' ' + _moment2.default.utc(tmpList[0].date).format("MM/DD/YYYY hh:mm A");
					if (tmpList.length > 1) {
						_this3.lblUpdatedBy = tmpList[LastIndex].user + ' ' + _moment2.default.utc(tmpList[LastIndex].date).format("MM/DD/YYYY hh:mm A");
					}
				} else {
					_this3.lblCreatedBy = "";
					_this3.lblUpdatedBy = "";
				}
			});
		};

		main_educational.prototype.OrderByDate = function OrderByDate(a, b) {
			if (a.date > b.date) return 1;
			if (a.date < b.date) return -1;
			return 0;
		};

		main_educational.prototype.btnAdd = function btnAdd() {
			this._disableForm = false;
			this._disableTable = true;
			this._disableBtnAdd = true;
			this._disableBtnSave = false;
			this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.status = "ADD";
		};

		main_educational.prototype.btnEdit = function btnEdit(education) {
			this._disableForm = false;
			this._disableTable = true;
			this._disableBtnAdd = true;
			this._disableBtnSave = false;
			this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model = {
				education_id: education.education_id,
				education_level: education.education_level,
				start_yr: education.start_yr + "",
				end_yr: education.end_yr + "",
				school_cd: education.school_cd,
				course: education.course,
				honor_awards: education.honor_awards,
				completed_fl: education.completed_fl == "1"
			};
			this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.status = "EDIT";
		};

		main_educational.prototype.clearData = function clearData() {
			_settings2.default.isNavigating = false;
			this._disableForm = true;
			this._disableTable = false;
			this._disableBtnAdd = false;
			this._disableBtnSave = true;
			this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model = {};
			this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.status = "";
		};

		main_educational.prototype.validate = function validate() {
			var strValidation = "";
			if (this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_level == undefined || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_level == null || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_level.length == 0) {
				strValidation += "No level specified.<br/>";
			}

			if (this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr == undefined || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr == null || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr.length == 0) {
				strValidation += "No start year specified.<br/>";
			}

			if (this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr == undefined || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr == null || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr.length == 0) {
				strValidation += "No end year specified.<br/>";
			}

			if (this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.school_cd == undefined || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.school_cd == null || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.school_cd.length == 0) {
				strValidation += "No school specified.<br/>";
			}

			if (this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.course == undefined || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.course == null || this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.course.length == 0) {
				strValidation += "No degree/major specified.<br/>";
			}

			if (this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr != undefined && this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr != null && this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr.length > 0) {
				if (this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr != undefined && this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr != null && this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr.length > 0) {
					if (this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr > this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr) {
						strValidation += "Start year cannot be greater than end year.<br/>";
					}
				}
			}

			if (strValidation.length > 0) {
				_toastr2.default.clear();
				_toastr2.default.error("", strValidation);
			} else {
				if (this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.status == "ADD") {
					this.insert();
				} else if (this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.status == "EDIT") {
					this.update();
				}
			}
		};

		main_educational.prototype.insert = function insert() {
			var _this4 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);
			var query = (0, _entityManagerFactory.EntityQuery)().from("EDUCATION_TRX").orderByDesc("EDUCATION_ID").take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
				var Max = 1;
				if (querySuccess.results.length > 0) {
					Max = querySuccess.results[0].EDUCATION_ID + 1;
				}

				var education_trx = {
					GLOBAL_INDIV_ID: _this4.obj_personnel.global_indiv_id,
					START_YR: _this4.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr,
					COURSE: _this4.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.course,
					EDUCATION_ID: Max,
					EDUCATION_LEVEL: _this4.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_level,
					END_YR: _this4.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr,
					SCHOOL_CD: _this4.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.school_cd,
					YR_GRADUATED: 0,
					HONOR_AWARDS: _this4.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.honor_awards,
					COMPLETED_FL: _this4.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.completed_fl ? 1 : 0,
					CREATED_BY: _this4.obj_personnel.USER.USER_ID,
					CREATED_DT: dateToday
				};

				var entity = (0, _entityManagerFactory.EntityManager)().createEntity("EDUCATION_TRX", education_trx);
				(0, _entityManagerFactory.EntityManager)().addEntity(entity);
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (saveSuccess) {
					_toastr2.default.clear();
					_toastr2.default.success("", "Record saved.");
					_this4.loadMain_Educational(_this4.obj_personnel.global_indiv_id);
					_this4.clearData();
				}, function (saveError) {

					_settings2.default.isNavigating = false;
					if (entity != null) {
						entity.entityAspect.setDeleted();
					}
					_toastr2.default.clear();
					_toastr2.default.error("", saveError);
				});
			});
		};

		main_educational.prototype.update = function update() {
			var _this5 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = new _moment2.default(new Date()).add(8, 'hours');
			dateToday = new Date(dateToday);
			var query = (0, _entityManagerFactory.EntityQuery)().from("EDUCATION_TRX").where("EDUCATION_ID", "==", this.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
				if (querySuccess.results.length == 0) {
					_toastr2.default.clear();
					_toastr2.default.error("", "Error in query data to be updated");
				}
				querySuccess.results[0].START_YR = _this5.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr;
				querySuccess.results[0].COURSE = _this5.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.course;
				querySuccess.results[0].EDUCATION_LEVEL = _this5.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_level;
				querySuccess.results[0].END_YR = _this5.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr;
				querySuccess.results[0].SCHOOL_CD = _this5.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.school_cd;
				querySuccess.results[0].HONOR_AWARDS = _this5.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.honor_awards;
				querySuccess.results[0].COMPLETED_FL = _this5.obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.completed_fl ? 1 : 0;
				querySuccess.results[0].LAST_UPDATED_BY = _this5.obj_personnel.USER.USER_ID;
				querySuccess.results[0].LAST_UPDATED_DT = dateToday;

				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (updateSuccess) {
					_toastr2.default.clear();
					_toastr2.default.success("", "Record updated.");
					_this5.loadMain_Educational(_this5.obj_personnel.global_indiv_id);
					_this5.clearData();
				}, function (updateError) {

					_settings2.default.isNavigating = false;
					_toastr2.default.clear();
					_toastr2.default.error("", updateError);
				});
			});
		};

		main_educational.prototype.btnRemove = function btnRemove(educ) {
			var _this6 = this;

			this.DialogService.open({ viewModel: _DialogBox.DialogBox, model: { title: "Confirm remove.", message: "Are you sure you want to remove the educational achievement" } }).whenClosed(function (response) {
				if (!response.wasCancelled) {
					_settings2.default.isNavigating = true;
					var query = (0, _entityManagerFactory.EntityQuery)().from("EDUCATION_TRX").where("EDUCATION_ID", "==", educ.education_id);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (querySuccess) {
						if (querySuccess.results.length == 0) {
							_toastr2.default.clear();
							_toastr2.default.error("", "No to-be-remove record found.");
						}
						querySuccess.results[0].entityAspect.setDeleted();

						(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (removeSuccess) {
							_toastr2.default.clear();
							_toastr2.default.success("", "The educational achievement was successfully removed.");
							_this6.loadMain_Educational(_this6.obj_personnel.global_indiv_id);
							_this6.clearData();
						}, function (removeError) {
							_settings2.default.isNavigating = false;
							_toastr2.default.clear();
							_toastr2.default.error(removeError, "Error in removing educational achievement.");
						});
					});
				}
			});
		};

		return main_educational;
	}()) || _class);
});
define('ppid/forms/miscellaneous',['exports', 'toastr', 'aurelia-framework', '../obj_personnel', 'aurelia-dialog', '../../entity-manager-factory'], function (exports, _toastr, _aureliaFramework, _obj_personnel, _aureliaDialog, _entityManagerFactory) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.miscellaneous = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var miscellaneous = exports.miscellaneous = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService, _obj_personnel.obj_personnel, _toastr2.default), _dec(_class = function () {
		function miscellaneous(dialogService, obj_personnel, toastr) {
			var _this = this;

			_classCallCheck(this, miscellaneous);

			this.obj_personnel = null;

			this.dialogService = dialogService;
			this.obj_personnel = obj_personnel;
			this.obj_personnel.OBSERVERS.ppid_dialog.push(function (all) {
				_this.CloseSearch(all);
			});
		}

		miscellaneous.prototype.CloseSearch = function CloseSearch(global_id) {};

		return miscellaneous;
	}()) || _class);
});
define('ppid/forms/relative',['exports', 'toastr', 'aurelia-framework', '../obj_personnel', 'aurelia-dialog', '../../entity-manager-factory'], function (exports, _toastr, _aureliaFramework, _obj_personnel, _aureliaDialog, _entityManagerFactory) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.relative = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var relative = exports.relative = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService, _obj_personnel.obj_personnel, _toastr2.default), _dec(_class = function () {
		function relative(dialogService, obj_personnel, toastr) {
			_classCallCheck(this, relative);

			this.obj_personnel = null;
			this._tab0_loaded = false;
			this._404_img = "/images/404.png";

			this.dialogService = dialogService;
			this.obj_personnel = obj_personnel;
		}

		relative.prototype.clickTab_relative = function clickTab_relative(tab_num) {
			var _this = this;

			if (this.obj_personnel.global_indiv_id == undefined || this.obj_personnel.global_indiv_id == null || this.obj_personnel.global_indiv_id.length == 0) return;

			switch (tab_num) {
				case 0:
					_toastr2.default.clear();
					_toastr2.default.info("", "Loading parents' info...");
					this.obj_personnel.OBSERVERS.relative_parents_clicked.forEach(function (delegate) {
						delegate(_this.obj_personnel.global_indiv_id);
					});
			}
		};

		return relative;
	}()) || _class);
});
define('ppid/forms/relative_parent',['exports', 'toastr', 'aurelia-framework', '../obj_personnel', '../../entity-manager-factory', 'breeze-client', 'aurelia-dialog', '../modals/DialogBox', 'moment', 'settings', '../../helpers'], function (exports, _toastr, _aureliaFramework, _obj_personnel, _entityManagerFactory, _breezeClient, _aureliaDialog, _DialogBox, _moment, _settings, _helpers) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.relative_parent = undefined;

	var _toastr2 = _interopRequireDefault(_toastr);

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	var _moment2 = _interopRequireDefault(_moment);

	var _settings2 = _interopRequireDefault(_settings);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var relative_parent = exports.relative_parent = (_dec = (0, _aureliaFramework.inject)(_obj_personnel.obj_personnel, _toastr2.default, _aureliaDialog.DialogService), _dec(_class = function () {
		function relative_parent(obj_personnel, toastr, DialogService) {
			var _this = this;

			_classCallCheck(this, relative_parent);

			this.obj_personnel = null;
			this.alreadyLoaded = false;
			this.status = ["Dependent", "Deceased"];
			this.selectedStatus = null;
			this.lblCreatedBy = null;
			this.lblUpdatedBy = null;

			this.obj_personnel = obj_personnel;
			this.DialogService = DialogService;

			this.obj_personnel.OBSERVERS.tab_changed.push(function (tab_num, global_indiv_id) {
				if (tab_num == 1) {
					if (!_this.alreadyLoaded) {
						_this.alreadyLoaded = true;
						$("#fBirthDate").datepicker();
						$("#fDeceasedDate").datepicker();
						$("#mBirthDate").datepicker();
						$("#mDeceasedDate").datepicker();
						toastr.clear();
						toastr.info("", "Loading parents data...");
						_this.loadParent(global_indiv_id);
					}
				}
			});

			this.obj_personnel.OBSERVERS.relative_parents_clicked.push(function (global_indiv_id) {
				_this.loadParent(global_indiv_id);
			});
		}

		relative_parent.prototype.loadParent = function loadParent(global_indiv_id) {
			var _this2 = this;

			_settings2.default.isNavigating = true;
			var tmpLog = [];
			var pred1 = _breezeClient2.default.Predicate.create("GLOBAL_INDIV_ID", "==", global_indiv_id);
			var pred2 = _breezeClient2.default.Predicate.create("RELATIVE_CD", "==", "FATHER");
			var pred3 = _breezeClient2.default.Predicate.create("RELATIVE_CD", "==", "MOTHER");
			var _pred1 = _breezeClient2.default.Predicate.or([pred2, pred3]);
			var finalPred = _breezeClient2.default.Predicate.and([pred1, _pred1]);

			var query = (0, _entityManagerFactory.EntityQuery)().from("RELATIVE_TRX").where(finalPred);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {

				_.each(s1.results, function (result) {
					var birthDt = (0, _helpers.formatDate)(result.BIRTH_DT);
					var deceasedDt = (0, _helpers.formatDate)(result.DECEASED_DT);
					if (result.RELATIVE_CD == "FATHER") {
						var father = {
							relative_id: result.RELATIVE_ID,
							global_indiv_id: result.GLOBAL_INDIV_ID,
							given_name: result.GIVEN_NAME,
							middle_name: result.MIDDLE_NAME,
							last_name: result.LAST_NAME,
							birth_dt: birthDt,
							phone_no: result.PHONE_NO,
							occupation: result.OCCUPATION,
							employer: result.EMPLOYER,
							status: result.DEPENDENT_FL,
							dependent_fl: result.DEPENDENT_FL,
							deceased_dt: deceasedDt,
							in_case_of_emergency_fl: result.IN_CASE_OF_EMERGENCY_FL,
							relative_cd: result.RELATIVE_CD
						};

						if (father.dependent_fl == 0) {
							_this2.obj_personnel.RELATIVE.parents.father.status = "Dependent";
							$("#fstatus_dependent").prop("checked", true);
							$("#fstatus_deceased").prop("checked", false);
						} else if (father.dependent_fl == 1) {
							_this2.obj_personnel.RELATIVE.parents.father.status = "Deceased";
							$("#fstatus_dependent").prop("checked", false);
							$("#fstatus_deceased").prop("checked", true);
						}

						_this2.obj_personnel.RELATIVE.parents.father = father;
					}
					if (result.RELATIVE_CD == "MOTHER") {
						var mother = {
							relative_id: result.RELATIVE_ID,
							global_indiv_id: result.GLOBAL_INDIV_ID,
							given_name: result.GIVEN_NAME,
							middle_name: result.MIDDLE_NAME,
							last_name: result.LAST_NAME,
							birth_dt: birthDt,
							phone_no: result.PHONE_NO,
							occupation: result.OCCUPATION,
							employer: result.EMPLOYER,
							status: result.DEPENDENT_FL == 0 ? "Dependent" : "Deceased",
							dependent_fl: result.DEPENDENT_FL,
							deceased_dt: deceasedDt,
							in_case_of_emergency_fl: result.IN_CASE_OF_EMERGENCY_FL,
							relative_cd: result.RELATIVE_CD
						};
						_this2.obj_personnel.RELATIVE.parents.mother = mother;
						console.log(mother.dependent_fl);
						if (mother.dependent_fl == 0) {
							_this2.obj_personnel.RELATIVE.parents.mother.status = "Dependent";
							$("#mstatus_dependent").prop("checked", true);
							$("#mstatus_deceased").prop("checked", false);
						} else if (mother.dependent_fl == 1) {
							_this2.obj_personnel.RELATIVE.parents.mother.status = "Deceased";
							$("#mstatus_dependent").prop("checked", false);
							$("#mstatus_deceased").prop("checked", true);
						} else {
							$("#mstatus_dependent").prop("checked", false);
							$("#mstatus_deceased").prop("checked", false);
							_this2.obj_personnel.RELATIVE.parents.mother.status = "";
						}
					}

					_this2.loadParentAddress(result.RELATIVE_ID, result.RELATIVE_CD == "MOTHER" ? true : false);

					if (result.CREATED_BY != null) {
						tmpLog.push({
							user: result.CREATED_BY,
							date: new Date(result.CREATED_DT)
						});
					}

					if (result.LAST_UPDATED_BY != null) {
						tmpLog.push({
							user: result.LAST_UPDATED_BY,
							date: new Date(result.LAST_UPDATED_DT)
						});
					}
				});

				tmpLog.sort(_this2.OrderByDate);
				var LastIndex = tmpLog.length - 1;
				if (tmpLog.length > 0) {

					_this2.lblCreatedBy = tmpLog[0].user + ' ' + _moment2.default.utc(tmpLog[0].date).format("MM/DD/YYYY hh:mm A");
					if (tmpLog.length > 1) {
						_this2.lblUpdatedBy = tmpLog[LastIndex].user + ' ' + _moment2.default.utc(tmpLog[LastIndex].date).format("MM/DD/YYYY hh:mm A");
					} else {
						_this2.lblUpdatedBy = "";
					}
				} else {
					_this2.lblCreatedBy = "";
					_this2.lblUpdatedBy = "";
				}

				_toastr2.default.clear();
				_toastr2.default.success("", "Relative info has been loaded...");
				_settings2.default.isNavigating = false;
			}, function (e1) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(e1, "Error in loading parents data.");
			});
		};

		relative_parent.prototype.loadParentAddress = function loadParentAddress(relative_id, isMother) {
			var _this3 = this;

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from("RELATIVE_ADDR_TRX").where("RELATIVE_ID", "==", relative_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {

				if (s1.results.length == 0) return;

				if (isMother) {
					_this3.obj_personnel.RELATIVE.parents.mother.unit_no = s1.results[0].UNIT_NO;
					_this3.obj_personnel.RELATIVE.parents.mother.house_no = s1.results[0].HOUSE_NO;
					_this3.obj_personnel.RELATIVE.parents.mother.block_lot = s1.results[0].BLOCK_LOT;
					_this3.obj_personnel.RELATIVE.parents.mother.bldg_name = s1.results[0].BLDG_NAME;
					_this3.obj_personnel.RELATIVE.parents.mother.street_name = s1.results[0].STREET_NAME;
					_this3.obj_personnel.RELATIVE.parents.mother.sub_village = s1.results[0].SUB_VILLAGE;
					_this3.obj_personnel.RELATIVE.parents.mother.barangay = s1.results[0].BARANGAY;
					_this3.obj_personnel.RELATIVE.parents.mother.district = s1.results[0].DISTRICT;
					_this3.obj_personnel.RELATIVE.parents.mother.city_town = s1.results[0].CITY_TOWN;
					_this3.obj_personnel.RELATIVE.parents.mother.state_province = s1.results[0].STATE_PROVINCE;
					_this3.obj_personnel.RELATIVE.parents.mother.region = s1.results[0].REGION;
					_this3.obj_personnel.RELATIVE.parents.mother.zipcode = s1.results[0].ZIPCODE;
					_this3.obj_personnel.RELATIVE.parents.mother.country_cd = s1.results[0].COUNTRY_CD;
				} else {
					_this3.obj_personnel.RELATIVE.parents.father.unit_no = s1.results[0].UNIT_NO;
					_this3.obj_personnel.RELATIVE.parents.father.house_no = s1.results[0].HOUSE_NO;
					_this3.obj_personnel.RELATIVE.parents.father.block_lot = s1.results[0].BLOCK_LOT;
					_this3.obj_personnel.RELATIVE.parents.father.bldg_name = s1.results[0].BLDG_NAME;
					_this3.obj_personnel.RELATIVE.parents.father.street_name = s1.results[0].STREET_NAME;
					_this3.obj_personnel.RELATIVE.parents.father.sub_village = s1.results[0].SUB_VILLAGE;
					_this3.obj_personnel.RELATIVE.parents.father.barangay = s1.results[0].BARANGAY;
					_this3.obj_personnel.RELATIVE.parents.father.district = s1.results[0].DISTRICT;
					_this3.obj_personnel.RELATIVE.parents.father.city_town = s1.results[0].CITY_TOWN;
					_this3.obj_personnel.RELATIVE.parents.father.state_province = s1.results[0].STATE_PROVINCE;
					_this3.obj_personnel.RELATIVE.parents.father.region = s1.results[0].REGION;
					_this3.obj_personnel.RELATIVE.parents.father.zipcode = s1.results[0].ZIPCODE;
					_this3.obj_personnel.RELATIVE.parents.father.country_cd = s1.results[0].COUNTRY_CD;
				}

				_settings2.default.isNavigating = false;
			}, function (e1) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(e1, "Error in parent's address.");
			});
		};

		relative_parent.prototype.OrderByDate = function OrderByDate(a, b) {
			if (a.date > b.date) return 1;
			if (a.date < b.date) return -1;
			return 0;
		};

		relative_parent.prototype.checkChange = function checkChange(isMother, status) {
			if (isMother) {

				if (status == "Dependent") {
					$("#mstatus_deceased").prop("checked", false);
				} else if (status = "Deceased") {
					$("#mstatus_dependent").prop("checked", false);
				}

				var isChecked_dependent = $('#mstatus_dependent').is(":checked");
				var isChecked_deceased = $("#mstatus_deceased").is(":checked");
				if (isChecked_dependent) {
					this.obj_personnel.RELATIVE.parents.mother.status = "Dependent";
					this.obj_personnel.RELATIVE.parents.mother.deceased_dt = "";
					$("#mDeceasedDate").val("");
				} else if (isChecked_deceased) {
					this.obj_personnel.RELATIVE.parents.mother.status = "Deceased";
				} else if (isChecked_dependent == false && isChecked_deceased == false) {
					this.obj_personnel.RELATIVE.parents.mother.status = "";
					this.obj_personnel.RELATIVE.parents.mother.deceased_dt = "";
					$("#mDeceasedDate").val("");
				}
			} else {

				if (status == "Dependent") {
					$("#fstatus_deceased").prop("checked", false);
				} else if (status = "Deceased") {
					$("#fstatus_dependent").prop("checked", false);
				}

				var isChecked_dependent = $('#fstatus_dependent').is(":checked");
				var isChecked_deceased = $("#fstatus_deceased").is(":checked");
				if (isChecked_dependent) {
					this.obj_personnel.RELATIVE.parents.father.status = "Dependent";
					this.obj_personnel.RELATIVE.parents.father.deceased_dt = "";
					$("#fDeceasedDate").val("");
				} else if (isChecked_deceased) {
					this.obj_personnel.RELATIVE.parents.father.status = "Deceased";
				} else if (isChecked_dependent == false && isChecked_deceased == false) {
					this.obj_personnel.RELATIVE.parents.father.status = "";
					this.obj_personnel.RELATIVE.parents.father.deceased_dt = "";
					$("#fDeceasedDate").val("");
				}
			}
		};

		relative_parent.prototype.dd_provinceChanged = function dd_provinceChanged(isMother) {
			var prov = null;
			if (isMother) {
				prov = this.obj_personnel.RELATIVE.parents.mother.state_province;
			} else {
				prov = this.obj_personnel.RELATIVE.parents.father.state_province;
			}
			if (prov != undefined && prov != null && prov.length != 0) {
				var selectedProv = this.obj_personnel.PROVINCE.find(function (p) {
					if (p.value == prov) {
						return p;
					}
				});

				if (selectedProv != null) {
					if (isMother) {
						this.obj_personnel.RELATIVE.parents.mother.region = selectedProv.group;
					} else {
						this.obj_personnel.RELATIVE.parents.father.region = selectedProv.group;
					}
					this.dd_regionChanged(isMother);
				}
			}
		};

		relative_parent.prototype.dd_regionChanged = function dd_regionChanged(isMother) {
			var reg = null;
			if (isMother) {
				reg = this.obj_personnel.RELATIVE.parents.mother.region;
			} else {
				reg = this.obj_personnel.RELATIVE.parents.father.region;
			}
			if (reg != undefined && reg != null && reg.length != 0) {
				var selectedRegion = this.obj_personnel.REGION.find(function (r) {
					if (r.value == reg) return r;
				});

				if (selectedRegion != null) {
					if (isMother) {
						reg = this.obj_personnel.RELATIVE.parents.mother.country_cd = selectedRegion.group;
					} else {
						reg = this.obj_personnel.RELATIVE.parents.father.country_cd = selectedRegion.group;
					}
				}
			}
		};

		relative_parent.prototype.validate = function validate() {

			var strValidation = "";

			this.obj_personnel.RELATIVE.parents.mother.birth_dt = $("#mBirthDate").val();
			this.obj_personnel.RELATIVE.parents.mother.deceased_dt = $("#mDeceasedDate").val();
			switch (this.obj_personnel.RELATIVE.parents.mother.status) {
				case "Dependent":
					this.obj_personnel.RELATIVE.parents.mother.dependent_fl = 0;
					break;
				case "Deceased":
					this.obj_personnel.RELATIVE.parents.mother.dependent_fl = 1;
					break;
				default:
					this.obj_personnel.RELATIVE.parents.mother.dependent_fl = null;
					break;
			}
			this.obj_personnel.RELATIVE.parents.father.birth_dt = $("#fBirthDate").val();
			this.obj_personnel.RELATIVE.parents.father.deceased_dt = $("#fDeceasedDate").val();
			switch (this.obj_personnel.RELATIVE.parents.father.status) {
				case "Dependent":
					this.obj_personnel.RELATIVE.parents.father.dependent_fl = 0;
					break;
				case "Deceased":
					this.obj_personnel.RELATIVE.parents.father.dependent_fl = 1;
					break;
				default:
					this.obj_personnel.RELATIVE.parents.father.dependent_fl = null;
					break;
			}

			if (this.obj_personnel.RELATIVE.parents.mother.relative_id != undefined && this.obj_personnel.RELATIVE.parents.mother.relative_id.toString().length > 0) {

				if (this.obj_personnel.RELATIVE.parents.mother.last_name == null || this.obj_personnel.RELATIVE.parents.mother.last_name.length == 0) {
					strValidation += "[Mother] No Last Name specified.<br/>";
				}

				if (this.obj_personnel.RELATIVE.parents.mother.given_name == null || this.obj_personnel.RELATIVE.parents.mother.given_name.length == 0) {
					strValidation += "[Mother] No Given Name specified.<br/>";
				}

				if (this.obj_personnel.RELATIVE.parents.mother.birth_dt.length > 0) {
					if (!(0, _moment2.default)(new Date(this.obj_personnel.RELATIVE.parents.mother.birth_dt)).isValid()) {
						strValidation += "Invalid birth date.<br/>";
					}
				} else {
					strValidation += "[Mother] No Birth date specified. <br/>";
				}

				if (this.obj_personnel.RELATIVE.parents.mother.dependent_fl == 1) {
					if (this.obj_personnel.RELATIVE.parents.mother.deceased_dt.length > 0) {
						if (!(0, _moment2.default)(new Date(this.obj_personnel.RELATIVE.parents.mother.deceased_dt)).isValid()) {
							strValidation += "[Mother] Invalid deceased date. <br/>";
						}
					} else {
						strValidation += "[Mother] No deceased date specified.<br/>";
					}
				}

				if (this.obj_personnel.RELATIVE.parents.mother.country_cd == undefined || this.obj_personnel.RELATIVE.parents.mother.country_cd.length == 0) {
					strValidation += "[Mother] No country specified.<br/>";
				}
			} else {

				if (this.obj_personnel.RELATIVE.parents.mother.last_name != null && this.obj_personnel.RELATIVE.parents.mother.last_name.length > 0) {
					if (this.obj_personnel.RELATIVE.parents.mother.given_name == null || this.obj_personnel.RELATIVE.parents.mother.given_name.length == 0) {
						strValidation += "[Mother] No given name specified.<br/>";
					}
				}

				if (this.obj_personnel.RELATIVE.parents.mother.given_name != null && this.obj_personnel.RELATIVE.parents.mother.given_name.length > 0) {
					if (this.obj_personnel.RELATIVE.parents.mother.last_name == null || this.obj_personnel.RELATIVE.parents.mother.last_name.length == 0) {
						strValidation += "[Mother] No last name specified.<br/>";
					}
				}

				if (this.obj_personnel.RELATIVE.parents.mother.last_name != null && this.obj_personnel.RELATIVE.parents.mother.last_name.length > 0) {
					if (this.obj_personnel.RELATIVE.parents.mother.given_name != null && this.obj_personnel.RELATIVE.parents.mother.given_name.length > 0) {

						if (this.obj_personnel.RELATIVE.parents.mother.country_cd.length == 0) {
							strValidation += "[Mother] No country specified.<br/>";
						}

						if (this.obj_personnel.RELATIVE.parents.mother.dependent_fl == 1) {
							if (this.obj_personnel.RELATIVE.parents.mother.deceased_dt.length > 0) {
								if (!(0, _moment2.default)(new Date(this.obj_personnel.RELATIVE.parents.mother.deceased_dt)).isValid()) {
									strValidation += "[Mother] Invalid deceased date.<br/>";
								}
							} else {
								strValidation += "[Mother] No deceased date specified.<br/>";
							}
						} else if (this.obj_personnel.RELATIVE.parents.mother.dependent_fl == -1) {
							strValidation += "[Mother] No status specified.<br/>";
						}
					}
				}
			}

			if (this.obj_personnel.RELATIVE.parents.father.relative_id != undefined && this.obj_personnel.RELATIVE.parents.father.relative_id.toString().length > 0) {
				if (this.obj_personnel.RELATIVE.parents.father.last_name == null || this.obj_personnel.RELATIVE.parents.father.last_name.length == 0) {
					strValidation += "[Father] No Last Name specified.<br/>";
				}

				if (this.obj_personnel.RELATIVE.parents.father.given_name == null || this.obj_personnel.RELATIVE.parents.father.given_name.length == 0) {
					strValidation += "[Father] No Given Name specified.<br/>";
				}

				if (this.obj_personnel.RELATIVE.parents.father.birth_dt.length > 0) {
					if (!(0, _moment2.default)(new Date(this.obj_personnel.RELATIVE.parents.father.birth_dt)).isValid()) {
						strValidation += "[Father] Invalid birth date.<br/>";
					}
				} else {
					strValidation += "[Father] No Birth date specified. <br/>";
				}

				if (this.obj_personnel.RELATIVE.parents.father.dependent_fl == 1) {
					if (this.obj_personnel.RELATIVE.parents.father.deceased_dt.length > 0) {
						if (!(0, _moment2.default)(new Date(this.obj_personnel.RELATIVE.parents.father.deceased_dt)).isValid()) {
							strValidation += "[Father] Invalid deceased date. <br/>";
						}
					} else {
						strValidation += "[Father] No deceased date specified.<br/>";
					}
				}

				if (this.obj_personnel.RELATIVE.parents.father.country_cd.length == 0) {
					strValidation += "[Father] No country specified.<br/>";
				}
			} else {

				if (this.obj_personnel.RELATIVE.parents.father.last_name != null && this.obj_personnel.RELATIVE.parents.father.last_name.length > 0) {
					if (this.obj_personnel.RELATIVE.parents.father.given_name == null || this.obj_personnel.RELATIVE.parents.father.given_name.length == 0) {
						strValidation += "[Father] No given name specified.<br/>";
					}
				}

				if (this.obj_personnel.RELATIVE.parents.father.given_name != null && this.obj_personnel.RELATIVE.parents.father.given_name.length > 0) {
					if (this.obj_personnel.RELATIVE.parents.father.last_name == null || this.obj_personnel.RELATIVE.parents.father.last_name.length == 0) {
						strValidation += "[Father] No last name specified.<br/>";
					}
				}

				if (this.obj_personnel.RELATIVE.parents.father.last_name != null && this.obj_personnel.RELATIVE.parents.father.last_name.length > 0) {
					if (this.obj_personnel.RELATIVE.parents.father.given_name != null && this.obj_personnel.RELATIVE.parents.father.given_name.length > 0) {

						if (this.obj_personnel.RELATIVE.parents.father.country_cd.length == 0) {
							strValidation += "[Father] No country specified.<br/>";
						}

						if (this.obj_personnel.RELATIVE.parents.father.dependent_fl == 1) {
							if (this.obj_personnel.RELATIVE.parents.father.deceased_dt.length > 0) {
								if (!(0, _moment2.default)(new Date(this.obj_personnel.RELATIVE.parents.father.deceased_dt)).isValid()) {
									strValidation += "[Father] Invalid deceased date.<br/>";
								}
							} else {
								strValidation += "[Father] No deceased date specified.<br/>";
							}
						} else if (this.obj_personnel.RELATIVE.parents.father.dependent_fl == -1) {
							strValidation += "[Father] No status specified.<br/>";
						}
					}
				}
			}

			if (strValidation.length > 0) {
				_toastr2.default.clear();
				_toastr2.default.error("", strValidation);
			} else {

				if (this.obj_personnel.RELATIVE.parents.mother.relative_id > 0) {
					this.updateRelative(this.obj_personnel.RELATIVE.parents.mother.relative_id, true);
				} else if (this.obj_personnel.RELATIVE.parents.mother.last_name != null && this.obj_personnel.RELATIVE.parents.mother.last_name.length > 0) {
					if (this.obj_personnel.RELATIVE.parents.mother.given_name != null && this.obj_personnel.RELATIVE.parents.mother.given_name.length > 0) {
						this.saveRelative(this.obj_personnel.global_indiv_id, true);
					}
				}

				if (this.obj_personnel.RELATIVE.parents.father.relative_id > 0) {
					this.updateRelative(this.obj_personnel.RELATIVE.parents.father.relative_id, false);
				} else if (this.obj_personnel.RELATIVE.parents.father.last_name != null && this.obj_personnel.RELATIVE.parents.father.last_name.length > 0) {
					if (this.obj_personnel.RELATIVE.parents.father.given_name != null && this.obj_personnel.RELATIVE.parents.father.given_name.length > 0) {
						this.saveRelative(this.obj_personnel.global_indiv_id, false);
					}
				}
			}
		};

		relative_parent.prototype.convertToGMT8 = function convertToGMT8(date) {
			if (date == undefined || date == null || date.length == 0) return null;
			var tempDt = (0, _moment2.default)(date).add(8, 'hours');
			return new Date(tempDt);
		};

		relative_parent.prototype.saveRelative = function saveRelative(global_indiv_id, isMother) {
			var _this4 = this;

			_settings2.default.isNavigating = true;
			var dateToday = null;
			dateToday = (0, _moment2.default)(new Date()).add(8, "hours");
			dateToday = new Date(dateToday);

			var query = (0, _entityManagerFactory.EntityQuery)().from("RELATIVE_TRX").orderByDesc("RELATIVE_ID").take(1);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {
				var MaxId = 1;
				if (s1.results.length > 0) {
					MaxId = s1.results[0].RELATIVE_ID + 1;
				}

				var entity = null;
				if (isMother) {
					var birthdate = _this4.convertToGMT8(_this4.obj_personnel.RELATIVE.parents.mother.birth_dt);
					var deceased_dt = _this4.obj_personnel.RELATIVE.parents.mother.deceased_dt;
					var mother = {
						RELATIVE_ID: MaxId,
						GLOBAL_INDIV_ID: global_indiv_id,
						LAST_NAME: _this4.obj_personnel.RELATIVE.parents.mother.last_name,
						GIVEN_NAME: _this4.obj_personnel.RELATIVE.parents.mother.given_name,
						MIDDLE_NAME: _this4.obj_personnel.RELATIVE.parents.mother.middle_name,
						BIRTH_DT: birthdate,
						PHONE_NO: _this4.obj_personnel.RELATIVE.parents.mother.phone_no,
						OCCUPATION: _this4.obj_personnel.RELATIVE.parents.mother.occupation,
						EMPLOYER: _this4.obj_personnel.RELATIVE.parents.mother.employer,
						DEPENDENT_FL: _this4.obj_personnel.RELATIVE.parents.mother.dependent_fl,
						DECEASED_DT: deceased_dt,
						IN_CASE_OF_EMERGENCY_FL: 0,
						RELATIVE_CD: "MOTHER",
						CREATED_BY: _this4.obj_personnel.USER.USER_ID,
						CREATED_DT: dateToday
					};
					entity = (0, _entityManagerFactory.EntityManager)().createEntity("RELATIVE_TRX", mother);
				} else {
					var birthdate = _this4.convertToGMT8(_this4.obj_personnel.RELATIVE.parents.father.birth_dt);
					var deceased_dt = _this4.convertToGMT8(_this4.obj_personnel.RELATIVE.parents.father.deceased_dt);
					var father = {
						RELATIVE_ID: MaxId,
						GLOBAL_INDIV_ID: global_indiv_id,
						LAST_NAME: _this4.obj_personnel.RELATIVE.parents.father.last_name,
						GIVEN_NAME: _this4.obj_personnel.RELATIVE.parents.father.given_name,
						MIDDLE_NAME: _this4.obj_personnel.RELATIVE.parents.father.middle_name,
						BIRTH_DT: birthdate,
						PHONE_NO: _this4.obj_personnel.RELATIVE.parents.father.phone_no,
						OCCUPATION: _this4.obj_personnel.RELATIVE.parents.father.occupation,
						EMPLOYER: _this4.obj_personnel.RELATIVE.parents.father.employer,
						DEPENDENT_FL: _this4.obj_personnel.RELATIVE.parents.father.dependent_fl,
						DECEASED_DT: deceased_dt,
						IN_CASE_OF_EMERGENCY_FL: 0,
						RELATIVE_CD: "FATHER",
						CREATED_BY: _this4.obj_personnel.USER.USER_ID,
						CREATED_DT: dateToday
					};
					entity = (0, _entityManagerFactory.EntityManager)().createEntity("RELATIVE_TRX", father);
				}

				(0, _entityManagerFactory.EntityManager)().addEntity(entity);
				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s2) {
					query = (0, _entityManagerFactory.EntityQuery)().from("RELATIVE_ADDR_TRX").orderByDesc("RELATIVE_ADDR_ID").take(1);
					(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s3) {
						var MaxAddrId = 1;
						if (s3.results.length > 0) {
							MaxAddrId = s3.results[0].RELATIVE_ADDR_ID + 1;
						}

						var entity2 = null;
						if (isMother) {
							var addr_trx = {
								RELATIVE_ID: MaxId,
								RELATIVE_ADDR_ID: MaxAddrId,
								COUNTRY_CD: _this4.obj_personnel.RELATIVE.parents.mother.country_cd,
								REGION: _this4.obj_personnel.RELATIVE.parents.mother.region,
								STATE_PROVINCE: _this4.obj_personnel.RELATIVE.parents.mother.state_province,
								CITY_TOWN: _this4.obj_personnel.RELATIVE.parents.mother.city_town,
								DISTRICT: _this4.obj_personnel.RELATIVE.parents.mother.district,
								BARANGAY: _this4.obj_personnel.RELATIVE.parents.mother.barangay,
								SUB_VILLAGE: _this4.obj_personnel.RELATIVE.parents.mother.sub_village,
								PHASE: _this4.obj_personnel.RELATIVE.parents.mother.phase,
								BLOCK_LOT: _this4.obj_personnel.RELATIVE.parents.mother.block_lot,
								STREET_NAME: _this4.obj_personnel.RELATIVE.parents.mother.street_name,
								HOUSE_NO: _this4.obj_personnel.RELATIVE.parents.mother.house_no,
								BLDG_NAME: _this4.obj_personnel.RELATIVE.parents.mother.bldg_name,
								UNIT_NO: _this4.obj_personnel.RELATIVE.parents.mother.unit_no,
								ZIPCODE: _this4.obj_personnel.RELATIVE.parents.mother.zipcode,

								PERMANENT_FL: 0,
								MAILING_FL: 0,
								PRESENT_FL: 0,
								CREATED_BY: _this4.obj_personnel.USER.USER_ID,
								CREATED_DT: dateToday
							};
							entity2 = (0, _entityManagerFactory.EntityManager)().createEntity("RELATIVE_ADDR_TRX", addr_trx);
						} else {
							var addr_trx = {
								RELATIVE_ID: MaxId,
								RELATIVE_ADDR_ID: MaxAddrId,
								COUNTRY_CD: _this4.obj_personnel.RELATIVE.parents.father.country_cd,
								REGION: _this4.obj_personnel.RELATIVE.parents.father.region,
								STATE_PROVINCE: _this4.obj_personnel.RELATIVE.parents.father.state_province,
								CITY_TOWN: _this4.obj_personnel.RELATIVE.parents.father.city_town,
								DISTRICT: _this4.obj_personnel.RELATIVE.parents.father.district,
								BARANGAY: _this4.obj_personnel.RELATIVE.parents.father.barangay,
								SUB_VILLAGE: _this4.obj_personnel.RELATIVE.parents.father.sub_village,
								PHASE: _this4.obj_personnel.RELATIVE.parents.father.phase,
								BLOCK_LOT: _this4.obj_personnel.RELATIVE.parents.father.block_lot,
								STREET_NAME: _this4.obj_personnel.RELATIVE.parents.father.street_name,
								HOUSE_NO: _this4.obj_personnel.RELATIVE.parents.father.house_no,
								BLDG_NAME: _this4.obj_personnel.RELATIVE.parents.father.bldg_name,
								UNIT_NO: _this4.obj_personnel.RELATIVE.parents.father.unit_no,
								ZIPCODE: _this4.obj_personnel.RELATIVE.parents.father.zipcode,

								PERMANENT_FL: 0,
								MAILING_FL: 0,
								PRESENT_FL: 0,
								CREATED_BY: _this4.obj_personnel.USER.USER_ID,
								CREATED_DT: dateToday
							};
							entity2 = (0, _entityManagerFactory.EntityManager)().createEntity("RELATIVE_ADDR_TRX", addr_trx);
						}

						(0, _entityManagerFactory.EntityManager)().addEntity(entity2);
						(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s4) {
							_toastr2.default.clear();
							_toastr2.default.success("", "Record saved.");
							_this4.loadParent(global_indiv_id);
						}, function (e4) {
							if (entity2 != null) {
								entity2.entityAspect.setDeleted();
							}
							_settings2.default.isNavigating = false;
							_toastr2.default.error(e4, "Error in saving relative address.");
						});
					}, function (e3) {
						_settings2.default.isNavigating = false;
						_toastr2.default.error(e3, "Error in querying relative address id.");
					});
				}, function (e2) {
					if (entity != null) {
						entity.entityAspect.setDeleted();
					}
					_settings2.default.isNavigating = false;
					_toastr2.default.error(e2, "Error in saving relative info.");
				});
			}, function (e1) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(e1, "Error in querying relative id.");
			});
		};

		relative_parent.prototype.updateRelative = function updateRelative(relative_id, isMother) {
			var _this5 = this;

			var dateToday = null;
			dateToday = new Date((0, _moment2.default)(new Date()).add(8, hours));

			_settings2.default.isNavigating = true;
			var query = (0, _entityManagerFactory.EntityQuery)().from("RELATIVE_TRX").where("RELATIVE_ID", "==", relative_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query).then(function (s1) {

				if (isMother) {
					s1.results[0].LAST_NAME = _this5.obj_personnel.RELATIVE.parents.mother.last_name;
					s1.results[0].GIVEN_NAME = _this5.obj_personnel.RELATIVE.parents.mother.given_name;
					s1.results[0].MIDDLE_NAME = _this5.obj_personnel.RELATIVE.parents.mother.middle_name;
					s1.results[0].BIRTH_DT = _this5.convertToGMT8(_this5.obj_personnel.RELATIVE.parents.mother.birth_dt);
					s1.results[0].PHONE_NO = _this5.obj_personnel.RELATIVE.parents.mother.phone_no;
					s1.results[0].OCCUPATION = _this5.obj_personnel.RELATIVE.parents.mother.occupation;
					s1.results[0].EMPLOYER = _this5.obj_personnel.RELATIVE.parents.mother.employer;
					s1.results[0].DEPENDENT_FL = _this5.obj_personnel.RELATIVE.parents.mother.dependent_fl;
					if (_this5.obj_personnel.RELATIVE.parents.mother.dependent_fl == 1) {
						s1.results[0].DECEASED_DT = _this5.convertToGMT8(_this5.obj_personnel.RELATIVE.parents.mother.deceased_dt);
					} else {
						s1.results[0].DECEASED_DT = null;
					}
					s1.results[0].LAST_UPDATED_BY = _this5.obj_personnel.USER.USER_ID;
					s1.results[0].LAST_UPDATED_DT = dateToday;
				} else {
					s1.results[0].LAST_NAME = _this5.obj_personnel.RELATIVE.parents.father.last_name;
					s1.results[0].GIVEN_NAME = _this5.obj_personnel.RELATIVE.parents.father.given_name;
					s1.results[0].MIDDLE_NAME = _this5.obj_personnel.RELATIVE.parents.father.middle_name;
					s1.results[0].BIRTH_DT = _this5.convertToGMT8(_this5.obj_personnel.RELATIVE.parents.father.birth_dt);
					s1.results[0].PHONE_NO = _this5.obj_personnel.RELATIVE.parents.father.phone_no;
					s1.results[0].OCCUPATION = _this5.obj_personnel.RELATIVE.parents.father.occupation;
					s1.results[0].EMPLOYER = _this5.obj_personnel.RELATIVE.parents.father.employer;
					s1.results[0].DEPENDENT_FL = _this5.obj_personnel.RELATIVE.parents.father.dependent_fl;
					if (_this5.obj_personnel.RELATIVE.parents.father.dependent_fl == 1) {
						s1.results[0].DECEASED_DT = _this5.convertToGMT8(_this5.obj_personnel.RELATIVE.parents.father.deceased_dt);
					} else {
						s1.results[0].DECEASED_DT = null;
					}
					s1.results[0].LAST_UPDATED_BY = _this5.obj_personnel.USER.USER_ID;
					s1.results[0].LAST_UPDATED_DT = dateToday;
				}

				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s3) {
					_settings2.default.isNavigating = false;
					_toastr2.default.success("", "Record saved.");
				}, function (e3) {
					_settings2.default.isNavigating = false;
					_toastr2.default.error(e3, "Error in updating personnel info.");
				});
			}, function (e1) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(e1, "Error in querying mother's info.");
			});

			var query2 = (0, _entityManagerFactory.EntityQuery)().from("RELATIVE_ADDR_TRX").where("RELATIVE_ID", "==", relative_id);
			(0, _entityManagerFactory.EntityManager)().executeQuery(query2).then(function (s2) {

				if (isMother) {
					s2.results[0].COUNTRY_CD = _this5.obj_personnel.RELATIVE.parents.mother.country_cd;
					s2.results[0].REGION = _this5.obj_personnel.RELATIVE.parents.mother.region;
					s2.results[0].STATE_PROVINCE = _this5.obj_personnel.RELATIVE.parents.mother.state_province;
					s2.results[0].CITY_TOWN = _this5.obj_personnel.RELATIVE.parents.mother.city_town;
					s2.results[0].DISTRICT = _this5.obj_personnel.RELATIVE.parents.mother.district;
					s2.results[0].BARANGAY = _this5.obj_personnel.RELATIVE.parents.mother.barangay;
					s2.results[0].SUB_VILLAGE = _this5.obj_personnel.RELATIVE.parents.mother.sub_village;
					s2.results[0].PHASE = _this5.obj_personnel.RELATIVE.parents.mother.phase;
					s2.results[0].BLOCK_LOT = _this5.obj_personnel.RELATIVE.parents.mother.block_lot;
					s2.results[0].STREET_NAME = _this5.obj_personnel.RELATIVE.parents.mother.street_name;
					s2.results[0].HOUSE_NO = _this5.obj_personnel.RELATIVE.parents.mother.house_no;
					s2.results[0].BLDG_NAME = _this5.obj_personnel.RELATIVE.parents.mother.bldg_name;
					s2.results[0].UNIT_NO = _this5.obj_personnel.RELATIVE.parents.mother.unit_no;
					s2.results[0].ZIPCODE = _this5.obj_personnel.RELATIVE.parents.mother.zipcode;
					s2.results[0].LAST_UPDATED_BY = _this5.obj_personnel.USER.USER_ID;
					s2.results[0].LAST_UPDATED_DT = dateToday;
				} else {
					s2.results[0].COUNTRY_CD = _this5.obj_personnel.RELATIVE.parents.father.country_cd;
					s2.results[0].REGION = _this5.obj_personnel.RELATIVE.parents.father.region;
					s2.results[0].STATE_PROVINCE = _this5.obj_personnel.RELATIVE.parents.father.state_province;
					s2.results[0].CITY_TOWN = _this5.obj_personnel.RELATIVE.parents.father.city_town;
					s2.results[0].DISTRICT = _this5.obj_personnel.RELATIVE.parents.father.district;
					s2.results[0].BARANGAY = _this5.obj_personnel.RELATIVE.parents.father.barangay;
					s2.results[0].SUB_VILLAGE = _this5.obj_personnel.RELATIVE.parents.father.sub_village;
					s2.results[0].PHASE = _this5.obj_personnel.RELATIVE.parents.father.phase;
					s2.results[0].BLOCK_LOT = _this5.obj_personnel.RELATIVE.parents.father.block_lot;
					s2.results[0].STREET_NAME = _this5.obj_personnel.RELATIVE.parents.father.street_name;
					s2.results[0].HOUSE_NO = _this5.obj_personnel.RELATIVE.parents.father.house_no;
					s2.results[0].BLDG_NAME = _this5.obj_personnel.RELATIVE.parents.father.bldg_name;
					s2.results[0].UNIT_NO = _this5.obj_personnel.RELATIVE.parents.father.unit_no;
					s2.results[0].ZIPCODE = _this5.obj_personnel.RELATIVE.parents.father.zipcode;
					s2.results[0].LAST_UPDATED_BY = _this5.obj_personnel.USER.USER_ID;
					s2.results[0].LAST_UPDATED_DT = dateToday;
				}

				(0, _entityManagerFactory.EntityManager)().saveChanges().then(function (s4) {
					_settings2.default.isNavigating = false;
				}, function (e4) {
					_settings2.default.isNavigating = false;
					_toastr2.default.error(e4, "Error in updating personnel address.");
				});
			}, function (e2) {
				_settings2.default.isNavigating = false;
				_toastr2.default.error(e2, "Error in querying Mother's info.");
			});
		};

		return relative_parent;
	}()) || _class);
});
define('ppid/forms/relative_siblings',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var relative_siblings = exports.relative_siblings = function relative_siblings() {
		_classCallCheck(this, relative_siblings);
	};
});
define('ppid/modals/DialogBox',['exports', 'aurelia-framework', 'aurelia-dialog'], function (exports, _aureliaFramework, _aureliaDialog) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.DialogBox = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var DialogBox = exports.DialogBox = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
		function DialogBox(controller) {
			_classCallCheck(this, DialogBox);

			this.message = "Sample Message";
			this.title = "Sample Title";

			this.controller = controller;
		}

		DialogBox.prototype.activate = function activate(info) {
			this.message = info.message;
			this.title = info.title;
		};

		return DialogBox;
	}()) || _class);
});
define('ppid/modals/photo_list',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var photo_list = exports.photo_list = function photo_list() {
		_classCallCheck(this, photo_list);
	};
});
define('ppid/modals/ppid_search',['exports', 'aurelia-framework', 'aurelia-dialog', 'multi-observer', '../.././masterfiles', 'breeze-client', '../../entity-manager-factory', '../../helpers', '../obj_personnel', 'toastr'], function (exports, _aureliaFramework, _aureliaDialog, _multiObserver, _masterfiles, _breezeClient, _entityManagerFactory, _helpers, _obj_personnel, _toastr) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.ppid_search = undefined;

	var _breezeClient2 = _interopRequireDefault(_breezeClient);

	var _toastr2 = _interopRequireDefault(_toastr);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var ppid_search = exports.ppid_search = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaDialog.DialogController, _aureliaFramework.ObserverLocator, _obj_personnel.obj_personnel, _toastr2.default), _dec(_class = function () {
		function ppid_search(multiObserver, controller, observerLocator, obj_personnel, toastr) {
			var _this = this;

			_classCallCheck(this, ppid_search);

			this.obj_personnel = null;
			this.varFilterArrayLength = 0;
			this.varFilterArray = [];
			this.lstPredicates = [];
			this.currPredicate = null;
			this.observerLocator = null;

			this.controller = controller;
			this.observerLocator = observerLocator;
			this.obj_personnel = obj_personnel;

			multiObserver.observe([[this, "_bglobal_indiv_id"], [this, "_blast_name"], [this, "_bfirst_name"], [this, "_bnickname"]], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});
		}

		ppid_search.prototype.fnManualFilter = function fnManualFilter(tmpVar) {
			var _this2 = this;

			this.lstPredicates = [];

			_.each(this._rppid_queries.querySelectorAll('input'), function (all) {
				var varOb = _this2.observerLocator.getObserver(_this2, all.getAttribute('searchable').replace('_s', '_b'));
				if (varOb.getValue() != undefined && varOb.getValue() != null && varOb.getValue() != "" && varOb.getValue() != "undefined") {
					if (varOb.propertyName.indexOf('global_indiv_id') > -1) {
							if (varOb.getValue().length >= 17) _this2.lstPredicates.push(_breezeClient2.default.Predicate.create(varOb.propertyName.replace('_b', '').toUpperCase(), "==", varOb.getValue().toUpperCase()));
						} else if (!(varOb.propertyName.indexOf('global_indiv_id') > -1)) {
						_this2.lstPredicates.push(_breezeClient2.default.Predicate.create(varOb.propertyName.replace('_b', '').toUpperCase().replace('FIRST_NAME', 'GIVEN_NAME').replace('NICKNAME', 'ALIAS'), _breezeClient2.default.FilterQueryOp.Contains, varOb.getValue().toUpperCase()));
					}

					if (tmpVar.length > 0) {
						tmpVar = (0, _helpers.getFilter)(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
					}
				}
			});
			return tmpVar;
		};

		ppid_search.prototype.onSpeculateProp = function onSpeculateProp(newValue, oldValue) {
			var _this3 = this;

			var varValuesHasChanged = false;

			_.each(this._rppid_queries.querySelectorAll('input'), function (all) {
				var varOb = _this3.observerLocator.getObserver(_this3, all.getAttribute('searchable').replace('_s', '_b'));

				if (varOb.getValue() != '' && varOb.getValue() !== undefined) {
					varValuesHasChanged = true;
				}
			});

			if (!varValuesHasChanged) return;

			var tmpVar = this.fnManualFilter(this.varFilterArray);

			if (tmpVar.length > 0) {
				var tmpVarNew = _.sortBy(tmpVar, 'GLOBAL_INDIV_ID').reverse();
				this.varFilterArray = tmpVarNew;
				this.varFilterArrayLength = this.varFilterArray.length;
				return;
			}

			if (this.lstPredicates.length == 0) return;

			this.currPredicate = this.lstPredicates;
			setTimeout(function (a) {
				if (a !== _this3.currPredicate) return;

				var _query = (0, _entityManagerFactory.EntityQuery)().from('GLOBAL_INDIV_MSTR').where(_breezeClient2.default.Predicate.and(_this3.currPredicate)).orderBy('GIVEN_NAME').select('GLOBAL_INDIV_ID,GIVEN_NAME,LAST_NAME,ALIAS');
				(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
					tmpVar = [];
					_.each(success.results, function (all) {
						tmpVar.push({
							GLOBAL_INDIV_ID: all.GLOBAL_INDIV_ID,

							LAST_NAME: all.LAST_NAME,
							FIRST_NAME: all.GIVEN_NAME,
							NICK_NAME: all.ALIAS
						});
					});

					_this3.varFilterArray = tmpVar;
					_this3.varFilterArrayLength = _this3.varFilterArray.length;
				}, function (failed) {
					_toastr2.default.error(failed, "Failed loading Personnel Info");
				});
			}, 500, this.currPredicate);
		};

		ppid_search.prototype.selectedPersonnel = function selectedPersonnel(item) {
			this.obj_personnel.OBSERVERS.ppid_dialog.forEach(function (all) {
				all(item.GLOBAL_INDIV_ID);
			});
			this.controller.ok();
		};

		ppid_search.prototype.fnKeyup = function fnKeyup(evt, item) {
			if (evt.keyCode == 13) {
				if (this.varFilterArray.length == 1) {
					this.selectedPersonnel(this.varFilterArray[0]);
				}
			}
		};

		return ppid_search;
	}()) || _class);
});
define('ppid/talent_search/results_output',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var results_output = exports.results_output = function results_output() {
    _classCallCheck(this, results_output);
  };
});
define('ppid/talent_search/talent_search',['exports', 'aurelia-framework', 'cache_obj', 'entity-manager-factory', 'masterfiles', 'settings', 'modals/modal-wizard', 'toastr', 'moment', 'underscore', 'multi-observer', 'aurelia-dialog', 'breeze-client'], function (exports, _aureliaFramework, _cache_obj, _entityManagerFactory, _masterfiles, _settings, _modalWizard, _toastr, _moment, _underscore, _multiObserver, _aureliaDialog, _breezeClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.talent_search = undefined;

  var _settings2 = _interopRequireDefault(_settings);

  var _toastr2 = _interopRequireDefault(_toastr);

  var _moment2 = _interopRequireDefault(_moment);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _breezeClient2 = _interopRequireDefault(_breezeClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var talent_search = exports.talent_search = (_dec = (0, _aureliaFramework.inject)(_cache_obj.cache_obj, _modalWizard.ModalWizard, _toastr2.default, _multiObserver.MultiObserver, _aureliaDialog.DialogService), _dec(_class = function () {
    function talent_search(cache_obj, cache_budget, ModalWizard, toastr, multiObserver, DialogService) {
      _classCallCheck(this, talent_search);

      this._CITIZENSHIP_ARR = [{ ref: '', desc: '' }];
      this._RELIGION_ARR = [{ ref: '', desc: '' }];
      this._CIVIL_STATUS_ARR = [{ ref: '', desc: '' }];
      this._GENDER_ARR = [{ ref: '', desc: '' }, { ref: 'M', desc: 'MALE' }, { ref: 'F', desc: 'FEMALE' }];
      this._COUNTRY_ARR = [{ ref: '', desc: '' }];
      this._LOCATION_ARR = [{ ref: '', desc: '' }];
      this._INTEREST_ARR = [{ ref: '', desc: '' }];
      this._SKILL_TALENT_ARR = [{ ref: '', desc: '' }];

      if ((0, _entityManagerFactory.EntityManager)() === undefined) {
        return;
      }
      this.initialize();
    }

    talent_search.prototype.initialize = function initialize() {
      var _this = this;

      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('REFERENCE_CD_MSTR').where('REF_GRP_CD', '==', 'CITIZENSHIP_CD').orderBy('REF_DESC')).then(function (found) {
        found.results.forEach(function (all) {
          _this._CITIZENSHIP_ARR.push({ ref: all.REF_CD, desc: all.REF_DESC });
        });
      });

      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('REFERENCE_CD_MSTR').where('REF_GRP_CD', '==', 'RELIGION_CD').orderBy('REF_DESC')).then(function (found) {
        found.results.forEach(function (all) {
          _this._RELIGION_ARR.push({ ref: all.REF_CD, desc: all.REF_DESC });
        });
      });

      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('REFERENCE_CD_MSTR').where('REF_GRP_CD', '==', 'CIVIL_STATUS').orderBy('REF_DESC')).then(function (found) {
        found.results.forEach(function (all) {
          _this._CIVIL_STATUS_ARR.push({ ref: all.REF_CD, desc: all.REF_DESC });
        });
      });

      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('COUNTRY_MSTR').orderBy('COUNTRY_NAME')).then(function (found) {
        found.results.forEach(function (all) {
          _this._COUNTRY_ARR.push({ ref: all.COUNTRY_CD, desc: all.COUNTRY_NAME });
        });
      });

      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('LOCATION_MSTR').orderBy('LOCATION_DESC')).then(function (found) {
        found.results.forEach(function (all) {
          _this._LOCATION_ARR.push({ ref: all.LOCATION_CD, desc: all.LOCATION_DESC });
        });
      });

      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('INTEREST_MSTR').orderBy('INTEREST_DESC')).then(function (found) {
        found.results.forEach(function (all) {
          _this._INTEREST_ARR.push({ ref: all.INTEREST_CD, desc: all.INTEREST_DESC });
        });
      });

      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('SKILL_TALENT_MSTR').orderBy('SKILL_TALENT_DESC')).then(function (found) {
        found.results.forEach(function (all) {
          _this._SKILL_TALENT_ARR.push({ ref: all.SKILL_TALENT_CD, desc: all.SKILL_TALENT_DESC });
        });
      });
    };

    talent_search.prototype.search_on = function search_on() {
      var _this2 = this;

      this._QUERY_VAL = [];
      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('PT_INDIV_MSTR')).then(function (found) {
        found.results.forEach(function (all) {
          _this2._QUERY_VAL.push({ PT_INDIV_ID: all.PT_INDIV_ID, GIVEN_NAME: all.GIVEN_NAME, MIDDLE_NAME: all.MIDDLE_NAME, LAST_NAME: all.LAST_NAME });
        });
      });

      console.log(this._QUERY_VAL);
    };

    return talent_search;
  }()) || _class);
});
define('ppid/contract/cache_contract',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var cache_contract = exports.cache_contract = function cache_contract() {
    _classCallCheck(this, cache_contract);

    this.LAST_UPDATED_DT = new Date(Date.now());
    this.CREATED_DT = new Date(Date.now());
    this.ISNEWCONTRACT = true;
    this.ISSAVE = true;
    this.CONTRACT_HDR_ID = '';
  };
});
define('ppid/contract/contract_form',['exports', 'aurelia-framework', 'cache_obj', 'ppid/contract/cache_contract', 'entity-manager-factory', 'masterfiles', 'settings', 'modals/modal-wizard', 'toastr', 'moment', 'underscore', 'multi-observer', 'aurelia-dialog', 'breeze-client', 'ppid/contract/contract_search'], function (exports, _aureliaFramework, _cache_obj, _cache_contract, _entityManagerFactory, _masterfiles, _settings, _modalWizard, _toastr, _moment, _underscore, _multiObserver, _aureliaDialog, _breezeClient, _contract_search) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.contract_form = undefined;

  var _settings2 = _interopRequireDefault(_settings);

  var _toastr2 = _interopRequireDefault(_toastr);

  var _moment2 = _interopRequireDefault(_moment);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _breezeClient2 = _interopRequireDefault(_breezeClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  var contract_form = exports.contract_form = (_dec = (0, _aureliaFramework.inject)(_cache_obj.cache_obj, _cache_contract.cache_contract, _modalWizard.ModalWizard, _toastr2.default, _multiObserver.MultiObserver, _aureliaDialog.DialogService), _dec(_class = (_class2 = function () {
    function contract_form(cache_obj, cache_contract, ModalWizard, toastr, multiObserver, DialogService) {
      var _this = this;

      _classCallCheck(this, contract_form);

      _initDefineProp(this, 'EMPLOYEE_NAME', _descriptor, this);

      this._disableCreateContract = false;
      this._disableEditContract = true;
      this._disableCancelContract = true;
      this._disableRefreshContract = true;
      this._disableSaveContract = true;
      this._disablePrintContract = true;
      this.MSTR_LIST = [];
      this.NAME_ARRAY = [];
      this.ALIAS_ARRAY = [];
      this.COMPANY = [{ ref: '', desc: '' }];
      this.DIVISION = [];
      this.JOB_GRP_ARRAY = [];
      this.JOB = [];
      this.ALIAS = [];
      this.CONTRACT_STATUS = [];
      this.menuNameShow = false;
      this.menuAliasShow = false;
      this.dialogService = null;

      if ((0, _entityManagerFactory.EntityManager)() === undefined) {
        return;
      }

      this.dialogService = DialogService;
      this._cache_obj = cache_obj;
      this._cache_contract = cache_contract;
      this.COMPANY1 = this._cache_obj.USER.COMPANY_ID;

      this.LEVEL_NO1 = this._cache_obj.USER.LEVEL_NO;
      console.log(this._cache_obj.USER);

      this._cache_obj.OBSERVERS.contract_dialog.push(function (val) {
        _this.fnCheckContract(val);
      });

      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('COMPANY_MSTR').where('COMPANY_ID', '==', this.COMPANY1)).then(function (found) {
        _this.COMPANY_NAME1 = found.results[0].COMPANY_NAME;
        _this.COMPANY_CD1 = found.results[0].COMPANY_CD;
      });

      if (this.LEVEL_NO1 == 3) {
        var personnel = (0, _masterfiles.getLookups)().GLOBAL_INDIV_WITH_ALIAS;
        var newPersonnel = _underscore2.default.sortBy(personnel, 'PERSONNEL_NAME');
        newPersonnel.forEach(function (item) {
          if (item.PERSONNEL_INFO_SRC == 'INDIV') _this.MSTR_LIST.push({ ref: item.GLOBAL_INDIV_ID, desc: item.PERSONNEL_NAME });
        });
      } else {
        var personnel = (0, _masterfiles.getLookups)().GLOBAL_INDIV_MSTR;
        var newPersonnel = _underscore2.default.sortBy(personnel, 'LAST_NAME', 'GIVEN_NAME', 'MIDDLE_NAME');

        newPersonnel.forEach(function (item) {
          _this.MSTR_LIST.push({ ref: item.GLOBAL_INDIV_ID, desc: item.LAST_NAME + ', ' + item.GIVEN_NAME + ' ' + item.MIDDLE_NAME });
        });
      }

      this.CONTRACT_STATUS.push({ ref: 'ACTIVE', desc: 'ACTIVE' });
      this.CONTRACT_STATUS.push({ ref: 'EXPIRED', desc: 'EXPIRED' });

      this.DIVISION = [{ ref: '', desc: '' }];
      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('DIVISION_MSTR').where('COMPANY_ID', '==', this.COMPANY1).orderBy('DIVISION_NAME')).then(function (found) {
        found.results.forEach(function (all) {
          _this.DIVISION.push({ ref: all.DIVISION_ID, desc: all.DIVISION_NAME });
        });
      });

      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('JOB_GRP_MSTR').where('COMPANY_ID', '==', this.COMPANY1).orderBy('JOB_GRP_DESC')).then(function (found) {
        found.results.forEach(function (all) {
          _this.JOB_GRP_ARRAY.push(all.JOB_GRP_ID);
        });
      });

      this.JOB = [{ ref: '', desc: '' }];
      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('JOB_MSTR').orderBy('JOB_DESC')).then(function (found) {
        found.results.forEach(function (all) {
          if (_this.JOB_GRP_ARRAY.indexOf(all.JOB_GRP_ID) > -1) {
            _this.JOB.push({ ref: all.JOB_ID, desc: all.JOB_DESC });
          }
        });
      });

      setTimeout(function () {
        $('#dtPicker1').datepicker({
          format: "mm/dd/yyyy"
        }).on("changeDate", function () {
          _this.CONTRACT_START_DT1 = (0, _moment2.default)(new Date($('#dtPicker1').val())).format('MM/DD/YYYY');
          if (new Date($('#dtPicker1').val()) > new Date($('#dtPicker2').val())) {
            toastr.error("Invalid date range.", "Date Change..");

            return;
          }
          if (!Date(_this.CONTRACT_START_DT1) || !Date(_this.CONTRACT_END_DT1) || _this.CONTRACT_START_DT1 == undefined || _this.CONTRACT_END_DT1 == undefined || _this.CONTRACT_START_DT1 == '' || _this.CONTRACT_END_DT1 == '') {
            _this.DURATION_MONTHS1 = 0;
          } else {
            _this.DURATION_MONTHS1 = _this.monthDiff(_this.CONTRACT_START_DT1, _this.CONTRACT_END_DT1);
          }
          $('#dtPicker1').datepicker('hide');
        });

        $('#dtPicker2').datepicker({
          format: "mm/dd/yyyy"
        }).on("changeDate", function () {
          _this.CONTRACT_END_DT1 = (0, _moment2.default)(new Date($('#dtPicker2').val())).format('MM/DD/YYYY');
          if (new Date($('#dtPicker2').val()) < new Date($('#dtPicker1').val())) {
            toastr.error("Invalid date range.", "Date Change..");

            return;
          }
          if (!Date(_this.CONTRACT_START_DT1) || !Date(_this.CONTRACT_END_DT1) || _this.CONTRACT_START_DT1 == undefined || _this.CONTRACT_END_DT1 == undefined || _this.CONTRACT_START_DT1 == '' || _this.CONTRACT_END_DT1 == '') {
            _this.DURATION_MONTHS1 = 0;
          } else {
            _this.DURATION_MONTHS1 = _this.monthDiff(_this.CONTRACT_START_DT1, _this.CONTRACT_END_DT1);
          }
          $('#dtPicker2').datepicker('hide');
        });
      }, 1000);
    }

    contract_form.prototype.pad = function pad(str, max) {
      str = str.toString();
      return str.length < max ? this.pad("0" + str, max) : str;
    };

    contract_form.prototype.EMPLOYEE_NAMEChanged = function EMPLOYEE_NAMEChanged() {
      var _this2 = this;

      this.NAME_ARRAY = this.MSTR_LIST.filter(function (all) {
        return all.desc.substring(0, _this2.EMPLOYEE_NAME.length) == _this2.EMPLOYEE_NAME.toUpperCase();
      });
    };

    contract_form.prototype.division_change = function division_change() {
      var _this3 = this;

      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('DIVISION_MSTR').where("DIVISION_ID", "==", this.DIVISION1)).then(function (success) {
        _this3.DIVISION_CD1 = success.results[0].DIVISION_CD;
        _this3._cache_contract.ISSAVE = false;
      }, function (fail) {
        _toastr2.default.error("Error Division", "Division CD not found");
        return;
      });
    };

    contract_form.prototype.job_change = function job_change() {
      var _this4 = this;

      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('JOB_MSTR').where('JOB_ID', '==', this.JOB1)).then(function (found) {
        (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('JOB_GRP_MSTR').where('JOB_GRP_ID', '==', found.results[0].JOB_GRP_ID)).then(function (found1) {
          _this4.JOB_GRP_NAME1 = found1.results[0].JOB_GRP_DESC;
          _this4._cache_contract.ISSAVE = false;
        });
      });
    };

    contract_form.prototype.name_change = function name_change() {
      var _this5 = this;

      this.ALIAS = [];

      this.GLOBAL_ID1 = this.MSTR_LIST1;
      if (this.LEVEL_NO1 == 3) {
        var personnel = (0, _masterfiles.getLookups)().GLOBAL_INDIV_WITH_ALIAS.find(function (found) {
          return found.GLOBAL_INDIV_ID == _this5.MSTR_LIST1;
        });
        personnel.ALIASES.forEach(function (all) {
          _this5.ALIAS.push(all);
        });
        this.ALIAS.push(personnel.PERSONNEL_NAME);
      } else {
        var personnel = (0, _masterfiles.getLookups)().GLOBAL_INDIV_MSTR.find(function (found) {
          return found.GLOBAL_INDIV_ID == _this5.MSTR_LIST1;
        });
        this.ALIAS.push(personnel.LAST_NAME + ', ' + personnel.GIVEN_NAME + ' ' + personnel.MIDDLE_NAME);
      }
      this._cache_contract.ISSAVE = false;
    };

    contract_form.prototype.name_change = function name_change(item, name) {
      var _this6 = this;

      this.ALIAS = [];
      this.EMPLOYEE_NAME = name;
      this.EMPLOYEE_ALIAS = '';
      this.MSTR_LIST1 = item;
      this.GLOBAL_ID1 = this.MSTR_LIST1;
      if (this.LEVEL_NO1 == 3) {
        var personnel = (0, _masterfiles.getLookups)().GLOBAL_INDIV_WITH_ALIAS.find(function (found) {
          return found.GLOBAL_INDIV_ID == _this6.MSTR_LIST1;
        });

        personnel.ALIASES.forEach(function (all) {
          _this6.ALIAS.push(all);
        });
        this.ALIAS.push(personnel.PERSONNEL_NAME);
      } else {
        var personnel = (0, _masterfiles.getLookups)().GLOBAL_INDIV_MSTR.find(function (found) {
          return found.GLOBAL_INDIV_ID == _this6.MSTR_LIST1;
        });
        this.ALIAS.push(personnel.LAST_NAME + ', ' + personnel.GIVEN_NAME + ' ' + personnel.MIDDLE_NAME);
      }
      this.ALIAS_ARRAY = this.ALIAS;
      this._cache_contract.ISSAVE = false;
    };

    contract_form.prototype.alias_change = function alias_change(item) {
      this.EMPLOYEE_ALIAS = item;
      this._cache_contract.ISSAVE = false;
    };

    contract_form.prototype.onfocusName = function onfocusName() {
      if (!(this._disableEditContract || !this._cache_contract.ISNEWCONTRACT)) this.menuNameShow = true;
    };

    contract_form.prototype.lostfocusName = function lostfocusName() {
      var _this7 = this;

      setTimeout(function () {
        _this7.menuNameShow = false;
      }, 200);
    };

    contract_form.prototype.onfocusAlias = function onfocusAlias() {
      if (!this._disableEditContract) this.menuAliasShow = true;
    };

    contract_form.prototype.lostfocusAlias = function lostfocusAlias() {
      var _this8 = this;

      setTimeout(function () {
        _this8.menuAliasShow = false;
      }, 200);
    };

    contract_form.prototype.onchangeName = function onchangeName() {
      this._cache_contract.ISSAVE = false;
    };

    contract_form.prototype.onchangeAlias = function onchangeAlias() {
      this._cache_contract.ISSAVE = false;
    };

    contract_form.prototype.checkDate = function checkDate() {
      var _this9 = this;

      setTimeout(function () {
        if (!Date(_this9.CONTRACT_START_DT1) || !Date(_this9.CONTRACT_END_DT1) || _this9.CONTRACT_START_DT1 == undefined || _this9.CONTRACT_END_DT1 == undefined || _this9.CONTRACT_START_DT1 == '' || _this9.CONTRACT_END_DT1 == '') {
          _this9.DURATION_MONTHS1 = 0;
        } else {
          _this9.DURATION_MONTHS1 = _this9.monthDiff(_this9.CONTRACT_START_DT1, _this9.CONTRACT_END_DT1);
        }
      }, 1000);
      this._cache_contract.ISSAVE = false;
    };

    contract_form.prototype.monthDiff = function monthDiff(d1, d2) {
      var date1 = new Date(d1);
      var date2 = new Date(d2);

      var months = (date2.getDate() - date1.getDate()) / 30 + date2.getMonth() - date1.getMonth() + 12 * (date2.getFullYear() - date1.getFullYear());
      return Math.round(months);
    };

    contract_form.prototype.keyStroke = function keyStroke(evt) {
      return true;
      if (evt.keyCode == 8 || evt.keyCode >= 48 && evt.keyCode <= 57 || evt.keyCode == 190 || evt.keyCode == 9) {}
      return false;
    };

    contract_form.prototype.fnContract = function fnContract(eventName) {
      switch (eventName) {
        case 'create':
          this._disableCreateContract = true;
          this._disableEditContract = false;
          this._disableCancelContract = false;
          this._disableRefreshContract = false;
          this._disableSaveContract = false;
          this._disablePrintContract = false;
          this.initializeEntry();
          break;

        case 'save':
          this.saveEntry();

          break;

        case 'cancel':
          if (!this._cache_contract.ISSAVE) {
            if (!confirm('You made changes. Are you sure you want to cancel it?')) return;
          }
          this._disableCreateContract = false;
          this._disableEditContract = true;
          this._disableCancelContract = true;
          this._disableRefreshContract = true;
          this._disableSaveContract = true;
          this._disablePrintContract = true;
          this._cache_contract.ISSAVE = true;

          this.initializeEntry();

          this.menuNameShow = false;
          this.menuAliasShow = false;

        default:

      }
    };

    contract_form.prototype.initializeEntry = function initializeEntry() {
      this.LEVEL_NO1 = this._cache_obj.USER.LEVEL_NO;
      this.MSTR_LIST1 = '';
      this.DIVISION1 = '';
      this.JOB1 = '';
      this.ALIAS_NAME1 = '';

      this.CONTRACT_HDR_ID1 = '';
      this.GLOBAL_ID1 = '';
      this.CONTRACT_NO1 = '';
      this.COMPENTENCY_LEVEL1 = '';
      this.JOB_ID1 = '';
      this.JOB_GRP_NAME1 = '';
      this.CONTRACT_END_DT1 = '';
      this.CONTRACT_START_DT1 = '';
      this.DURATION_MONTHS1 = '';
      this.CONTRACT_FEE1 = 0.00;
      this.CONTRACT_TYPE1 = '';
      this.MONTHLY_FEE1 = 0.00;
      this.CONTRACT_STATUS1 = 'ACTIVE';
      this.MAIN_CONTRACT_NO1 = '';
      this.TERMINATE_REASON1 = '';
      this.TERMINATE_DT1 = '';
      this.CREATED_BY1 = '';
      this.LAST_UPDATED_BY1 = '';
      this.CREATED_DT1 = '';
      this.LAST_UPDATED_DT1 = '';
      this.BATCH1 = '';
      this.ALIAS1 = '';


      this.EMPLOYEE_NAME = '';
      this.EMPLOYEE_ALIAS = '';

      $('#dtPicker1').val('');
      $('#dtPicker2').val('');

      this._cache_contract = {
        ISNEWCONTRACT: true,
        CONTRACT_STATUS: 'ACTIVE',
        ISSAVE: false
      };
    };

    contract_form.prototype.saveEntry = function saveEntry() {
      var _this10 = this;

      if (this.MSTR_LIST1 == null || this.MSTR_LIST1 == '') {
        _toastr2.default.error("Error Saving", "Empty MASTER LIST");
        return;
      }

      if (this.DIVISION1 == null || this.DIVISION1 == '') {
        _toastr2.default.error("Error Saving", "Empty DIVISION NAME");
        return;
      }

      if (this.JOB1 == null || this.JOB1 == '') {
        _toastr2.default.error("Error Saving", "Empty JOB NAME");
        return;
      }

      if (this.CONTRACT_START_DT1 == null || this.CONTRACT_START_DT1 == '') {
        _toastr2.default.error("Error Saving", "Empty Contract Start");
        return;
      }

      if (this.CONTRACT_STATUS1 == null || this.CONTRACT_STATUS1 == '') {
        _toastr2.default.error("Error Saving", "Empty Contract Stutus");
        return;
      }

      this.CONTRACT_START_DT1 = (0, _moment2.default)(new Date(this.CONTRACT_START_DT1)).format('MM/DD/YYYY');
      this.CONTRACT_END_DT1 = (0, _moment2.default)(new Date(this.CONTRACT_END_DT1)).format('MM/DD/YYYY');

      if (this.CONTRACT_START_DT1 > this.CONTRACT_END_DT1) {
        _toastr2.default.error("Error Saving", "Contract range is invalid");
        return;
      }

      this.DURATION_MONTHS1 = this.monthDiff(this.CONTRACT_START_DT1, this.CONTRACT_END_DT1);

      this.JOB_ID1 = this.JOB1;
      this.ALIAS1 = this.EMPLOYEE_ALIAS.toUpperCase();
      this.GLOBAL_ID1 = this.MSTR_LIST1;

      if (!this._cache_contract.ISNEWCONTRACT) {

        if (this._cache_contract.CONTRACT_STATUS == 'EXPIRED') {
          _toastr2.default.error("Unsuccesfully Saved", "NPS Contract Transaction");
          return;
        }

        var getContractForEdit = (0, _entityManagerFactory.EntityQuery)().from('NPS_CONTRACT_HDR_TRX').where("CONTRACT_HDR_ID", "==", this.CONTRACT_HDR_ID1);
        (0, _entityManagerFactory.EntityManager)().executeQuery(getContractForEdit).then(function (success) {
          _this10.LAST_UPDATED_BY1 = _this10._cache_obj.USER.USER_ID;

          success.results[0].DIVISION_CD = _this10.DIVISION_CD1;

          success.results[0].JOB_ID = _this10.JOB_ID1;

          success.results[0].CONTRACT_START_DT = _this10.CONTRACT_START_DT1;
          success.results[0].CONTRACT_END_DT = _this10.CONTRACT_END_DT1;
          success.results[0].DURATION_MONTHS = _this10.DURATION_MONTHS1;

          success.results[0].CONTRACT_STATUS = _this10.CONTRACT_STATUS1;

          success.results[0].LAST_UPDATED_BY = _this10.LAST_UPDATED_BY1;
          success.results[0].LAST_UPDATED_DT = new Date(Date.now());

          success.results[0].ALIAS = _this10.ALIAS1;

          (0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {
            console.log(success);
            _toastr2.default.success("Succesfully Saved", "NPS Contract Transaction");
          }, function (fail) {
            _toastr2.default.error("Error Occured", fail);
          });
        });

        this._cache_contract = {
          ISNEWCONTRACT: false,
          ISSAVE: true,
          CONTRACT_STATUS: this.CONTRACT_STATUS1
        };
        return;
      }

      this.CREATED_BY1 = this._cache_obj.USER.USER_ID;

      var getMax = (0, _entityManagerFactory.EntityQuery)().from('NPS_CONTRACT_HDR_TRX').orderByDesc('CONTRACT_HDR_ID').take(1);
      (0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (successMax) {

        var getMax = 1;

        if (successMax.results.length > 0) getMax = parseInt(successMax.results[0].CONTRACT_HDR_ID) + 1;

        var varInsert = (0, _entityManagerFactory.EntityManager)().createEntity('NPS_CONTRACT_HDR_TRX', {
          CONTRACT_HDR_ID: _this10.pad(getMax, 20),
          GLOBAL_ID: _this10.GLOBAL_ID1,
          COMPANY_CD: _this10.COMPANY_CD1,
          DIVISION_CD: _this10.DIVISION_CD1,

          JOB_ID: _this10.JOB_ID1,

          CONTRACT_START_DT: _this10.CONTRACT_START_DT1,
          CONTRACT_END_DT: _this10.CONTRACT_END_DT1,
          DURATION_MONTHS: _this10.DURATION_MONTHS1,

          CONTRACT_STATUS: _this10.CONTRACT_STATUS1,

          CREATED_BY: _this10.CREATED_BY1,
          CREATED_DT: new Date(Date.now()),
          LEVEL_NO: _this10.LEVEL_NO1,

          ALIAS: _this10.ALIAS1
        });

        (0, _entityManagerFactory.EntityManager)().addEntity(varInsert);

        (0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {
          console.log(success);
          _toastr2.default.success("Succesfully Saved", "NPS Contract Transaction");

          _this10.CONTRACT_HDR_ID1 = varInsert.CONTRACT_HDR_ID;
          _this10._cache_contract = {
            ISNEWCONTRACT: false,
            CONTRACT_STATUS: _this10.CONTRACT_STATUS1,
            ISSAVE: true
          };
        }, function (fail) {
          console.log(fail);
          _toastr2.default.error("Error Occured", fail);
        });
      }, function (fail2) {
        console.log(fail2);
        _toastr2.default.error("Error Occured", fail2);
      });
    };

    contract_form.prototype.searchContract = function searchContract() {
      this.dialogService.open({
        viewModel: _contract_search.contract_search
      }).whenClosed(function (response) {
        if (!response.wasCancelled) {} else {}
      });
    };

    contract_form.prototype.fnCheckContract = function fnCheckContract(val) {
      var _this11 = this;

      this._cache_contract.CONTRACT_HDR_ID = val;

      (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('NPS_CONTRACT_HDR_TRX').where('CONTRACT_HDR_ID', '==', this._cache_contract.CONTRACT_HDR_ID)).then(function (success) {

        var result = success.results[0];

        _this11.MSTR_LIST1 = result.GLOBAL_ID;

        _this11.DIVISION_CD1 = result.DIVISION_CD;
        (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('DIVISION_MSTR').where("DIVISION_CD", "==", result.DIVISION_CD)).then(function (success_div) {
          _this11.DIVISION1 = success_div.results[0].DIVISION_ID.toString();
          _this11.DIVISION_NAME1 = success_div.results[0].DIVISION_NAME;
        });

        _this11.JOB1 = result.JOB_ID.toString();

        (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('JOB_MSTR').where('JOB_ID', '==', _this11.JOB1)).then(function (success_job) {
          (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('JOB_GRP_MSTR').where('JOB_GRP_ID', '==', success_job.results[0].JOB_GRP_ID)).then(function (success_job_grp) {
            _this11.JOB_GRP_NAME1 = success_job_grp.results[0].JOB_GRP_DESC;
            _this11.JOB_NAME1 = success_job.results[0].JOB_DESC;
          });
        });

        var nameofemployee = _this11.MSTR_LIST.find(function (all) {
          return all.ref == _this11.MSTR_LIST1;
        });

        _this11.EMPLOYEE_NAME = nameofemployee.desc;

        _this11.ALIAS = [];

        if (_this11.LEVEL_NO1 == 3) {

          var personnel = (0, _masterfiles.getLookups)().GLOBAL_INDIV_WITH_ALIAS.find(function (sucess_alias) {
            return sucess_alias.GLOBAL_INDIV_ID == _this11.MSTR_LIST1;
          });
          personnel.ALIASES.forEach(function (all_alias) {
            _this11.ALIAS.push(all_alias);
          });
          _this11.ALIAS.push(personnel.PERSONNEL_NAME);
        } else {
          var personnel = (0, _masterfiles.getLookups)().GLOBAL_INDIV_MSTR.find(function (success_alias) {
            return success_alias.GLOBAL_INDIV_ID == _this11.MSTR_LIST1;
          });
          _this11.ALIAS.push(personnel.LAST_NAME + ', ' + personnel.GIVEN_NAME + ' ' + personnel.MIDDLE_NAME);
        }

        if (result.ALIAS != null && result.ALIAS != '' && _this11.ALIAS.filter(function (all) {
          return all == result.ALIAS;
        }).length == 0) {
          _this11.ALIAS.push(result.ALIAS);
        }

        _this11.ALIAS_ARRAY = _this11.ALIAS;
        _this11.ALIAS_NAME1 = result.ALIAS;
        _this11.EMPLOYEE_ALIAS = result.ALIAS;

        _this11.CONTRACT_HDR_ID1 = result.CONTRACT_HDR_ID;
        _this11.GLOBAL_ID1 = result.GLOBAL_ID;
        _this11.CONTRACT_NO1 = result.CONTRACT_NO;
        _this11.COMPENTENCY_LEVEL1 = result.COMPENTENCY_LEVEL;
        _this11.JOB_ID1 = result.JOB_ID;
        _this11.CONTRACT_END_DT1 = (0, _moment2.default)(new Date(result.CONTRACT_END_DT)).format('MM/DD/YYYY');
        _this11.CONTRACT_START_DT1 = (0, _moment2.default)(new Date(result.CONTRACT_START_DT)).format('MM/DD/YYYY');
        _this11.DURATION_MONTHS1 = result.DURATION_MONTHS;
        _this11.CONTRACT_FEE1 = result.CONTRACT_FEE;
        _this11.CONTRACT_TYPE1 = result.CONTRACT_TYPE;
        _this11.MONTHLY_FEE1 = result.MONTHLY_FEE;
        _this11.CONTRACT_STATUS1 = result.CONTRACT_STATUS;
        _this11.MAIN_CONTRACT_NO1 = result.MAIN_CONTRACT_NO;
        _this11.TERMINATE_REASON1 = result.TERMINATE_REASON;
        _this11.TERMINATE_DT1 = result.TERMINATE_DT;
        _this11.CREATED_BY1 = result.CREATED_BY;
        _this11.LAST_UPDATED_BY1 = result.LAST_UPDATED_BY;
        _this11.CREATED_DT1 = result.CREATED_DT;
        _this11.LAST_UPDATED_DT1 = result.LAST_UPDATED_DT;
        _this11.BATCH1 = result.BATCH;
        _this11.ALIAS1 = result.ALIAS;
        _this11.LEVEL_NO1 = result.LEVEL_NO;

        _this11._cache_contract = {
          ISNEWCONTRACT: false,
          CONTRACT_STATUS: result.CONTRACT_STATUS,
          ISSAVE: true
        };

        $('#dtPicker1').val(_this11.CONTRACT_START_DT1);
        $('#dtPicker2').val(_this11.CONTRACT_END_DT1);

        _this11._disableCreateContract = false;
        _this11._disableEditContract = _this11.CONTRACT_STATUS1 != "ACTIVE";
        _this11._disableCancelContract = false;
        _this11._disableRefreshContract = false;
        _this11._disableSaveContract = false;
        _this11._disablePrintContract = false;
        _this11.menuNameShow = false;
        _this11.menuAliasShow = false;
      });
    };

    return contract_form;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'EMPLOYEE_NAME', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
});
define('ppid/contract/contract_search',['exports', 'masterfiles', 'multi-observer', 'aurelia-framework', 'helpers', 'underscore', 'jquery', 'entity-manager-factory', 'toastr', 'cache_obj', 'aurelia-dialog', 'breeze-client', 'ppid/contract/cache_contract'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _cache_obj, _aureliaDialog, _breezeClient, _cache_contract) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.contract_search = undefined;

  var _underscore2 = _interopRequireDefault(_underscore);

  var _jquery2 = _interopRequireDefault(_jquery);

  var _toastr2 = _interopRequireDefault(_toastr);

  var _breezeClient2 = _interopRequireDefault(_breezeClient);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var contract_search = exports.contract_search = (_dec = (0, _aureliaFramework.inject)(_cache_contract.cache_contract, _multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _cache_obj.cache_obj, _aureliaDialog.DialogController), _dec(_class = function () {
    function contract_search(cache_contract, multiObserver, observerLocator, Element, cache_obj, controller) {
      var _this = this;

      _classCallCheck(this, contract_search);

      this.observerLocator = null;
      this.pageindex = 0;
      this.varFilterArrayLength = 0;
      this.varFilterArray = [];
      this.currPredicate = null;
      this.lstPredicates = [];
      this.controller = null;
      this.varGlobaIndivWithNps = [];

      this.controller = controller;

      this._cache_obj = cache_obj;
      this.observerLocator = observerLocator;
      this._cache_contract = cache_contract;

      var personnel;

      if (this._cache_obj.USER.LEVEL_NO == 3) {
        personnel = (0, _masterfiles.getLookups)().GLOBAL_INDIV_WITH_ALIAS;
      } else {
        personnel = (0, _masterfiles.getLookups)().GLOBAL_INDIV_MSTR;
      }

      var getContractList = (0, _entityManagerFactory.EntityQuery)().from('NPS_CONTRACT_HDR_TRX').where('LEVEL_NO', '==', this._cache_obj.USER.LEVEL_NO);
      (0, _entityManagerFactory.EntityManager)().executeQuery(getContractList).then(function (success) {
        success.results.forEach(function (result) {
          var varCheck = personnel.find(function (all) {
            return all.GLOBAL_INDIV_ID == result.GLOBAL_ID;
          });
          if (varCheck !== undefined) {
            var contract = result;
            _this.varGlobaIndivWithNps.push({
              CONTRACT_HDR_ID: contract.CONTRACT_HDR_ID,
              GLOBAL_ID: contract.GLOBAL_ID,
              LAST_NAME: varCheck.LAST_NAME,
              GIVEN_NAME: varCheck.GIVEN_NAME,
              MIDDLE_NAME: varCheck.MIDDLE_NAME,
              CONTRACT_STATUS: contract.CONTRACT_STATUS
            });
          }
        });
      });

      multiObserver.observe([[this, '_bGLOBAL_ID'], [this, '_bLAST_NAME'], [this, '_bGIVEN_NAME'], [this, '_bMIDDLE_NAME'], [this, '_bCONTRACT_STATUS']], function (newValue, oldValue) {
        return _this.onSpeculateProp(newValue, oldValue);
      });
    }

    contract_search.prototype.fnManualFilter = function fnManualFilter(tmpVar) {
      var _this2 = this;

      this.lstPredicates = [];

      _underscore2.default.each(this._rCONTRACT_TITLE.querySelectorAll('input'), function (all) {
        var varOb = _this2.observerLocator.getObserver(_this2, all.getAttribute('searchable').replace('_s', '_b'));

        if (varOb.getValue() != undefined && varOb.getValue() != null && varOb.getValue() != "" && varOb.getValue() != "undefined") if (tmpVar.length > 0) {
          tmpVar = (0, _helpers.getFilter)(tmpVar, varOb.getValue(), all.getAttribute('searchable').replace('_s', ''));
        }
      });

      return tmpVar;
    };

    contract_search.prototype.onSpeculateProp = function onSpeculateProp(newValue, oldValue) {
      var _this3 = this;

      var varValuesHasChanged = false;

      _underscore2.default.each(this._rCONTRACT_TITLE.querySelectorAll('input'), function (all) {
        var varOb = _this3.observerLocator.getObserver(_this3, all.getAttribute('searchable').replace('_s', '_b'));

        if (varOb.getValue() != '' && varOb.getValue() !== undefined) {
          varValuesHasChanged = true;
        }
      });

      if (!varValuesHasChanged) return;

      if (this.varFilterArray.length == 0) {
        _underscore2.default.each(this.varGlobaIndivWithNps, function (all) {
          _this3.varFilterArray.push({
            CONTRACT_HDR_ID: all.CONTRACT_HDR_ID,
            GLOBAL_ID: all.GLOBAL_ID,
            LAST_NAME: all.LAST_NAME,
            GIVEN_NAME: all.GIVEN_NAME,
            MIDDLE_NAME: all.MIDDLE_NAME,
            CONTRACT_STATUS: all.CONTRACT_STATUS
          });
        });
      }
      var tmpVar = this.fnManualFilter(this.varFilterArray);

      if (tmpVar.length > 0) {
        var tmpVarNew = _underscore2.default.sortBy(tmpVar, 'LAST_NAME', 'GIVEN_NAME', 'MIDDLE_NAME');
        this.varFilterArray = tmpVarNew;
        this.varFilterArrayLength = this.varFilterArray.length;
        return;
      } else {
        this.varFilterArray = [];
      }
    };

    contract_search.prototype.selectedContract = function selectedContract(item) {
      this._cache_obj.OBSERVERS.contract_dialog.forEach(function (all) {
        all(item.CONTRACT_HDR_ID);
      });

      this.controller.ok();
    };

    contract_search.prototype.fnKeyup = function fnKeyup(evt, item) {
      if (evt.keyCode == 13) {
        if (this.varFilterArray.length == 1) {
          this.selectedContract(this.varFilterArray[0]);
        }
      }
    };

    return contract_search;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <!--<link href=\"/styles/bootstrap.css\" rel=\"stylesheet\" />-->\r\n  <link rel=\"stylesheet\" href=\"/styles/styles.css\">\r\n  <link rel=\"stylesheet\" href=\"/styles/datepicker.css\">\r\n  <link rel=\"stylesheet\" href=\"/styles/toastr.css\">\r\n  <link href=\"/styles/font-awesome.min.css\" rel=\"stylesheet\" />\r\n  <require from='nav-bar'></require>\r\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\r\n  <!--<require from=\"bootstrap/fonts/glyphicons-halflings-regular.woff\"></require>\r\n  <require from=\"bootstrap/fonts/glyphicons-halflings-regular.woff2\"></require>-->\r\n  \r\n  <nav-bar router.bind=\"router\"></nav-bar>\r\n\r\n  <div class=\"page-host\">\r\n    <router-view></router-view>\r\n  </div>\r\n\r\n  <!--<router-view></router-view>-->\r\n</template>\r\n"; });
define('text!blankpage.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"divBackgroundMainPage text-center\" style=\"width:100%;height:780px;\">\r\n      \r\n\r\n    </div>\r\n    \r\n\r\n</template>"; });
define('text!child-router.html', ['module'], function(module) { module.exports = "<template>\r\n  <section class=\"au-animate\">\r\n    <h2>${heading}</h2>\r\n    <div>\r\n      <div class=\"col-md-2\">\r\n        <ul class=\"well nav nav-pills nav-stacked\">\r\n          <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\r\n            <a href.bind=\"row.href\">${row.title}</a>\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"col-md-10\" style=\"padding: 0\">\r\n        <router-view></router-view>\r\n      </div>\r\n    </div>\r\n  </section>\r\n</template>\r\n"; });
define('text!group_individual.html', ['module'], function(module) { module.exports = "<template>\r\n  <!-- <require from=\"modals/modalcontainer\"></require> -->\r\n  <require from=\"converters/filtercustom\"></require>\r\n  <require from=\"converters/sorttext\"></require>\r\n  <div style=\"margin-left:10%!important;margin-right:10%!important;margin-top:3%;text-align:center\" class=\"text-center divBackground\" >\r\n  \t<table class=\"table table-hover table-condensed table-bordered table-striped\" style=\"width:80%;\">\r\n     <tr>\r\n        <td style=\"width:50%;text-align:center;\" colspan=3><strong>TALENT LIST</strong></td>\r\n      </tr>\r\n  \t\t<tr>\r\n        <!-- class=\"typeahead\" -->\r\n        <td style=\"width:20%;\" class=\"text-left\">Global ID: ${_GLOBAL_GRP_ID}</td>\r\n        <!-- class=\"typeahead\" -->\r\n        <td style=\"width:45%;\"class=\"text-left\">Name: ${_GROUP_NAME}\r\n          <!-- <input id=\"idTalentManager\" class=\"typeahead\"/> -->\r\n        </td>\r\n        <td style=\"width:30%;\">\r\n          <!-- <modalcontainer to.bind=\"modalTalentManager\"></modalcontainer> -->\r\n          <input type=\"button\" class=\"btn btn-xs customButton\" value=\"Find Talent Manager\" style=\"padding-left:15px;padding-right:15px;\" click.delegate=\"findTalentManager()\" disabled.bind=\"disabledfindTM\" />\r\n\r\n          <button class=\"btn btn-xs customButton\" click.trigger=\"clear()\">Clear</button>\r\n          <button class=\"btn btn-xs customButton\" click.trigger=\"saveGroupIndiv()\"  disabled.bind=\"isDisableSave\" >Save</button>\r\n\r\n        </td>\r\n      </tr>\r\n     \r\n      <tr>\r\n        <td colspan=3 style=\"text-align:right;\">\r\n          <!-- <modalcontainer style=\"text-align:left;\" to.bind=\"modalIndivMstr\"></modalcontainer> -->\r\n          <input type=\"button\" class=\"btn btn-xs customButton\" value=\"Search Talent\" style=\"padding-left:15px;padding-right:15px;\" disabled.bind=\"disabledfindTalent\" click.delegate=\"findTalent()\"/>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n       <td colspan=3>\r\n         <table class=\"table table-hover table-condensed table-bordered table-striped\" style=\"width:100%;\">\r\n          <thead>\r\n           <tr><td style=\"width:30%;\">GLOBAL ID</td><td style=\"width:60%;\">TALENTS</td><td></td></tr>\r\n         </thead>\r\n         <tbody>\r\n           <tr repeat.for=\"item of grpMembers | filtercustom:'STATUS_CD':'ACTV':_signal | sorttext:'PERSONNEL_NAME':'ascending'\">\r\n            <td style=\"width:20%;\">${item.GLOBAL_INDIV_ID}</td>\r\n            <td style=\"width:60%;\">${item.PERSONNEL_NAME}</td>\r\n            <td><button click.delegate=\"$parent.deleteItem(item)\">X</button>\r\n            </td>\r\n          </tr>\r\n\r\n        </tbody>\r\n      </table>\r\n    </td>\r\n  </tr>\r\n</table>\r\n\r\n<!-- <modalcontainer to.bind=\"modalLogin\"></modalcontainer> -->\r\n<!--<div style=\"margin-right:200px!important;\">\r\n    <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"loginDisabled\" value=\"LOG-IN\" style=\"padding-left:15px;padding-right:15px;\" click.delegate=\"fnLogin()\"/>\r\n    <input type=\"button\" click.delegate=\"logout()\" value=\"LOG-OUT\"  disabled.bind=\"logoutDisabled\"  css=\"visibility: ${showingLogout}\" class=\"btn btn-xs customButton\"> \r\n</div>-->\r\n<div>\r\n  <br/>\r\n  <br/>\r\n  <table class= \"table-bordered\">\r\n    <tr>\r\n      <td>\r\n        LOGGED AS:\r\n      </td>\r\n      <td>\r\n        <strong>${_cache_obj.USER.USER_ID}</strong> \r\n      </td>\r\n    </tr>\r\n  </table>\r\n</div>\r\n</div>\r\n\r\n</template>"; });
define('text!mainpage.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"divBackgroundMainPage text-center\" style=\"width:100%;height:780px;\">\r\n    <!--<div class=\"panel panel-info\">...</div>-->\r\n    <center>\r\n      <div class=\"row\">\r\n        <div class=\"list-group\" style=\"padding-top:2%;margin-left:4%;margin-right:4%;\">\r\n          <a href=\"#\" class=\"list-group-item active\" if.bind=\"headerVisible\" style=\"background-color: #d9edf7; color: #31708f;   border: 1px solid #a4d4e6;\">\r\n            <h3 style=\"margin-left:10px;margin-top:10px;margin-right:10px;\" class=\"list-group-item-heading\">PLEASE SELECT..</h3>\r\n          </a>\r\n          <!--<a href=\"#\" class=\"list-group-item\" click.delegate=\"navigateTo('mainview')\" if.bind=\"budgetAccess\" style=\" padding-top:15px;\">\r\n\r\n                      <h3 style=\"margin:0px;color: #31708f;\">\r\n                        BUDGET TEMPLATE\r\n                      </h3>\r\n\r\n        </a>\r\n                    <a href=\"#\" class=\"list-group-item\" click.delegate=\"navigateTo('actual_cost')\"  if.bind=\"actualAccess\"><h3 style=\"margin:0px;color: #31708f;\">ACTUAL COST</h3></a>\r\n                    <a href=\"#\" class=\"list-group-item\" click.delegate=\"navigateTo('group_individual')\" if.bind=\"talentgroupAccess\"><h3 style=\"margin:0px;color: #31708f;\">TALENT GROUP</h3></a>\r\n                    <a href=\"#\" class=\"list-group-item\" click.delegate=\"navigateTo('buh')\"  if.bind=\"buhAccess\"><h3 style=\"margin:0px;color: #31708f;\">BUH</h3></a>-->\r\n\r\n          <a href=\"#\" class=\"list-group-item\" repeat.for=\"item of _application\" click.trigger=\"applicationClick(item)\" if.bind=\"!_remove.includes(item.APPLICATION_DESC) && _application_on\"><h3 style=\"margin:0px;color: #31708f;\">${item.APPLICATION_DESC}</h3></a>\r\n\r\n          <a href=\"#\" class=\"list-group-item\" repeat.for=\"item of _ppfcs_modules\" click.trigger=\"rolesClick(item)\" if.bind=\"!_application_on\"><h3 style=\"margin:0px;color: #31708f;\">${item.APPLICATION_DESC.toUpperCase()}</h3></a>\r\n          <!--<a href=\"#\" class=\"list-group-item\" repeat.for=\"item of _roles\" click.trigger=\"rolesClick(item)\" if.bind=\"!_application_on\"><h3 style=\"margin:0px;color: #31708f;\">${item.MODULE_NAME.toUpperCase()}</h3></a>-->\r\n          <a href=\"#\" class=\"list-group-item\" if.bind=\"!_application_on\" click.trigger=\"applicationOn()\"><h3 style=\"margin:0px;color: #31708f;background-color:#d9edf7;\">BACK..</h3></a>\r\n\r\n          <!--<a href=\"#\" class=\"list-group-item\">IPS</a>-->\r\n\r\n\r\n        </div>\r\n\r\n        <div class=\"col-xs-0 col-md-4\"></div>\r\n      </div>\r\n    </center>\r\n    </div>\r\n    \r\n\r\n</template>"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template>\r\n  <nav class=\"navbar navbar-default navbar-fixed-top backroundTab\" role=\"navigation\" >\r\n    <div class=\"navbar-header\" style=\"background-color:#2191c0;margin-right:20px;margin-left:20px;\">\r\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\r\n        <span class=\"sr-only\">Toggle Navigation</span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n        <span class=\"icon-bar\"></span>\r\n      </button>\r\n      <a class=\"navbar-brand\" href=\"#\" >\r\n        <i class=\"fa fa-home\" style=\"color:white;margin-top:0px;padding-top:0px;\"></i>\r\n        <span style=\"color:white\">${router.title}</span>\r\n      </a>\r\n\r\n    </div>\r\n\r\n    <div class=\"collapse navbar-collapse  .navbar-right\" id=\"bs-example-navbar-collapse-1\">\r\n      <!--<ul class=\"nav navbar-nav\">\r\n        <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\r\n          <a if.bind=\"row.title!='PPMS'\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1.in\" href.bind=\"row.href\">${row.title}</a>\r\n        </li>\r\n      </ul>-->\r\n    <!--   <img if.bind=\"_cache_obj.USER.USER_ID!==undefined\" src=\"/ViewFile/GetFile?fileName=hdpi.png&token=${fnSerializeCode(_cache_obj.USER.USER_ID+':'+_cache_obj.USER.HASH)}\"/> -->\r\n<!-- \r\n      <form method=\"post\" enctype=\"multipart/form-data\" action=\"/ViewFile/Upload\">\r\n          <div>\r\n              <p>Upload one or more files using this form:</p>\r\n              <input type=\"file\" name=\"files\" />\r\n          </div>\r\n          <div>\r\n               <input type=\"submit\" value=\"Upload\" />\r\n          </div>\r\n      </form> -->\r\n      <ul class=\"nav navbar-nav\">\r\n        <li if.bind=\"_cache_obj.USER.USER_ID!==undefined\">\r\n          <a data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1.in\" style=\"color:white;font-size:13px;\" click.trigger=\"home()\" href=\"#\">HOME</a>\r\n         \r\n        </li>\r\n          \r\n        <!--<li  if.bind=\"_cache_obj.USER.USER_ID===undefined\">\r\n          <a data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1.in\" click.trigger=\"fnLogin()\" href=\"#\">LOG-IN</a>\r\n        </li>-->\r\n      </ul>\r\n      <ul class=\"nav navbar-nav\">\r\n        <li class=\"loader\" if.bind=\"router.isNavigating || settings.isNavigating\">\r\n          <i class=\"fa fa-spinner fa-spin fa-2x\" style=\"color:white;margin-top:0px;padding-top:0px;\"></i>\r\n        </li>\r\n      </ul>\r\n      <ul class=\"nav navbar-nav navbar-right\" style=\"background-color:#2191c0;height:50px;\"  if.bind=\"_cache_obj.USER.USER_ID!==undefined\">\r\n        <li style=\"color:white;font-size:13px;margin-top:16px;margin-right:20px;margin-left:20px;\">\r\n          ${_cache_obj.USER.USER_ID}\r\n        </li>\r\n        <li class=\"dropdown\">\r\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"  style=\"color:white;font-size:13px;\">PASSWORD<span class=\"caret\"></span></a>\r\n          <ul class=\"dropdown-menu\">\r\n            <li><a href=\"#\" click.trigger=\"changePassword()\">CHANGE PASSWORD</a></li>\r\n            <!--<li role=\"separator\" class=\"divider\"></li>-->\r\n            <!--<li><a href=\"#\">EMAIL PASSWORD</a></li>-->\r\n          </ul>\r\n        </li>\r\n        <li if.bind=\"_cache_obj.USER.USER_ID!==undefined\">\r\n          <a data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1.in\" style=\"color:white;font-size:13px;\" click.trigger=\"logout()\" href=\"#\">LOG-OUT</a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </nav>\r\n</template>\r\n"; });
define('text!users.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"blur-image\"></require>\r\n\r\n  <section class=\"au-animate\">\r\n      <h2>${heading}</h2>\r\n      <div class=\"row au-stagger\">\r\n        <div class=\"col-sm-6 col-md-3 card-container au-animate\" repeat.for=\"user of users\">\r\n            <div class=\"card\">\r\n                <canvas class=\"header-bg\" width=\"250\" height=\"70\" blur-image.bind=\"image\"></canvas>\r\n                <div class=\"avatar\">\r\n                    <img src.bind=\"user.avatar_url\" crossorigin ref=\"image\"/>\r\n                </div>\r\n                <div class=\"content\">\r\n                    <p class=\"name\">${user.login}</p>\r\n                    <p><a target=\"_blank\" class=\"btn btn-default\" href.bind=\"user.html_url\">Contact</a></p>\r\n                </div>\r\n            </div>\r\n        </div>\r\n      </div>\r\n  </section>\r\n</template>\r\n"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template>\r\n  <section class=\"au-animate\">\r\n    <h2>${heading}</h2>\r\n\r\n    <form role=\"form\" submit.delegate=\"submit()\">\r\n      <div class=\"form-group\">\r\n        <label for=\"fn\">First Name</label>\r\n        <input type=\"text\" value.bind=\"firstName\" class=\"form-control\" id=\"fn\" placeholder=\"first name\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label for=\"ln\">Last Name</label>\r\n        <input type=\"text\" value.bind=\"lastName\" class=\"form-control\" id=\"ln\" placeholder=\"last name\">\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label>Full Name</label>\r\n        <p class=\"help-block\">${fullName | upper}</p>\r\n      </div>\r\n      <button type=\"submit\" class=\"btn btn-default\">Submit</button>\r\n    </form>\r\n  </section>\r\n</template>\r\n"; });
define('text!modals/budget.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <ux-dialog>\r\n    <!--    <button type=\"button\" click.trigger=\"controller.cancel()\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> -->\r\n    <!--<ux-dialog-header class=\"colorHeader\">\r\n     \r\n                    <h4 class=\"modal-title\">BUDGET TEMPLATES</h4>\r\n</ux-dialog-header>-->\r\n    <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>BUDGET TEMPLATE</b></span></ux-dialog-header>\r\n  <ux-dialog-body>\r\n  <require from=\"converters/take\"></require>\r\n  <require from=\"converters/sorttext\"></require>\r\n  <require from=\"tools/gridpaging\"></require>\r\n  <div style=\"height:350px;overflow: auto;\">\r\n    <table class=\"table table-hover table-condensed table-bordered\">\r\n        <thead class=\"table-default\">\r\n            <tr>\r\n                <td class=\"colorCell2\">\r\n                    BUDGET ID\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    PROGRAM NAME\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    PROGRAM IO\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    STATUS\r\n                </td>\r\n            </tr>\r\n            <tr ref=\"_rBUDGET_TITLE\">\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bBDGT_TMPL_ID\" searchable=\"_sBDGT_TMPL_ID\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bPROGRAM_TITLE\" searchable=\"_sPROGRAM_TITLE\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bPROGRAM_IO\" searchable=\"_sPROGRAM_IO\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bAPPR_STAT_CD\" searchable=\"_sAPPR_STAT_CD\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <!-- | sorttext:'PROGRAM_TITLE':'ascending'  -->\r\n            <tr repeat.for=\"item of varFilterArray | take:20:pageindex\" click.delegate=\"$parent.selectedBudget(item)\">\r\n                <td>\r\n                    ${item.BDGT_TMPL_ID}\r\n                </td>\r\n                <td>\r\n                    ${item.PROGRAM_TITLE}\r\n                </td>\r\n                <td>\r\n                    ${item.PROGRAM_IO}\r\n                </td>\r\n                <td>\r\n                    ${item.APPR_STAT_CD}\r\n                </td>\r\n\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>\r\n<gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\"  divby.bind=\"20\"></gridpaging>\r\n\r\n</ux-dialog-body>\r\n\r\n<ux-dialog-footer>\r\n<button text=\"Cancel\" click.trigger=\"controller.cancel()\">Close</button>\r\n</ux-dialog-footer>\r\n</ux-dialog>\r\n</template>"; });
define('text!modals/buh-program-dialog.html', ['module'], function(module) { module.exports = "<template>\r\n  <ux-dialog>\r\n  <!--<ux-dialog-header class=\"colorHeader\">\r\n        \r\n                    <h4 class=\"modal-title\">SELECT PROGRAMS</h4>\r\n</ux-dialog-header>-->\r\n    <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>SELECT PROGRAMS</b></span></ux-dialog-header>\r\n  <ux-dialog-body>\r\n  <require from=\"converters/take\"></require>\r\n  <require from=\"converters/sorttext\"></require>\r\n  <require from=\"tools/gridpaging\"></require>\r\n  <div style=\"height:420px; overflow: auto;\">\r\n  <table>\r\n    <tr>\r\n        <td><div style=\"height:300px; overflow: auto;width:550px;\">\r\n            <table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n                <thead class=\"table-default\">\r\n                    <tr>\r\n                        <td class=\"colorCell2\" style=\"width:140px\">PROGRAM CODE</td>\r\n                        <td class=\"colorCell2\">PROGRAM TITLE</td>\r\n                    </tr>\r\n                    <tr ref=\"_rGROUP_TITLE\">\r\n                        <td class=\"colorCell2\" style=\"width:140px\">\r\n                            <input class=\"input-sm form-control\" value.bind=\"_bPROGRAM_CD\" searchable=\"_sPROGRAM_CD\" keyup.delegate=\"fnKeyup($event,'')\" style=\"width:140px\"/>\r\n                        </td>\r\n                        <td class=\"colorCell2\" >\r\n                            <input class=\"input-sm form-control\" value.bind=\"_bPROGRAM_TITLE\" searchable=\"_sPROGRAM_TITLE\" keyup.delegate=\"fnKeyup($event,'')\" />\r\n                        </td>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr repeat.for=\"item of varFilterArray | sorttext:'PROGRAM_TITLE':'ascending' | take:10:pageindex\" click.delegate=\"$parent.selectedTalent(item)\">\r\n                        <td>${item.PROGRAM_CD}</td>\r\n                        <td>${item.PROGRAM_TITLE}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\" divby.bind=\"10\"></gridpaging>\r\n    </td>\r\n    <td style=\"vertical-align:top;\">\r\n\r\n\r\n        <div style=\"height:350px; overflow: auto;\">\r\n            <table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n                <thead class=\"table-default\">\r\n                    <tr>\r\n                        <td colspan=3 class=\"colorCell2\" >\r\n                            SELECTED\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"colorCell2\"  style=\"width:140px\">\r\n                            PROGRAM CODE\r\n                        </td>\r\n                        <td colspan=2 class=\"colorCell2\" >\r\n                            PROGRAM TITLE\r\n                        </td>\r\n\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr repeat.for=\"item of varFilterArraySelected\">\r\n                        <td style=\"width:140px\">\r\n                            ${item.PROGRAM_CD}\r\n                        </td>\r\n                        <td>\r\n                            ${item.PROGRAM_TITLE}\r\n                        </td>\r\n                        <td>\r\n                            <button click.delegate=\"$parent.deleteSelected($index)\">X</button>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n    </td>\r\n</tr>\r\n<tr>\r\n    <td colspan=2>\r\n        <div style=\"width:100%;text-align:center;\">\r\n            <button style=\"width:20%;\" click.delegate=\"SelectingDone()\">DONE</button>\r\n            <button style=\"width:20%;\" click.delegate=\"ClearSearch()\">CLEAR SEARCH</button>\r\n        </div>\r\n    </td>\r\n</tr>\r\n</table>\r\n</div>\r\n</ux-dialog-body>\r\n\r\n<ux-dialog-footer>\r\n<button click.trigger=\"controller.cancel()\">Cancel</button>\r\n<!-- <button click.trigger=\"controller.ok(person)\">Ok</button> -->\r\n</ux-dialog-footer>    \r\n\r\n</ux-dialog>\r\n</template>\r\n\r\n"; });
define('text!modals/buh-search.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <ux-dialog>\r\n    <ux-dialog-body>\r\n\r\n\r\n      <require from=\"converters/take\"></require>\r\n      <require from=\"converters/sorttext\"></require>\r\n      <require from=\"tools/gridpaging\"></require>\r\n      <div style=\"height:500px!important;overflow:auto;\">\r\n        <table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n          <thead class=\"table-default\">\r\n            <tr>\r\n              <td class=\"colorCell2\">\r\n                GLOBAL ID (OPTIONAL)\r\n              </td>\r\n              <td class=\"colorCell2\">\r\n                FIRST NAME\r\n              </td>\r\n              <td class=\"colorCell2\">\r\n                MIDDLE NAME\r\n              </td>\r\n              <td class=\"colorCell2\">\r\n                LAST NAME\r\n              </td>\r\n              <td class=\"colorCell2\">\r\n               E-MAIL\r\n             </td>\r\n           </tr>\r\n           <tr ref=\"_rBUH_SEARCH\">\r\n            <td class=\"colorCell2\">\r\n              <input class=\"input-sm form-control\" value.bind=\"_bOPTIONAL_GLOBAL_ID\" searchable=\"_sOPTIONAL_GLOBAL_ID\" />\r\n            </td>\r\n            <td class=\"colorCell2\">\r\n              <input class=\"input-sm form-control\" value.bind=\"_bFIRST_NAME\" searchable=\"_sFIRST_NAME\" />\r\n            </td>\r\n            <td class=\"colorCell2\">\r\n              <input class=\"input-sm form-control\" value.bind=\"_bMIDDLE_NAME\" searchable=\"_sMIDDLE_NAME\" />\r\n            </td>\r\n            <td class=\"colorCell2\">\r\n              <input class=\"input-sm form-control\" value.bind=\"_bLAST_NAME\" searchable=\"_sLAST_NAME\" />\r\n            </td>\r\n            <td class=\"colorCell2\">\r\n              <input class=\"input-sm form-control\" value.bind=\"_bEMAIL_ADDRESS\" searchable=\"_sEMAIL_ADDRESS\" />\r\n            </td>\r\n          </tr>\r\n        </thead>\r\n        <tbody>\r\n          <tr repeat.for=\"item of varFilterArray | sorttext:'LAST_NAME':'ascending' | take:20:pageindex\" click.delegate=\"$parent.selectedBUH(item)\">\r\n            <td>\r\n              ${item.OPTIONAL_GLOBAL_ID}\r\n            </td>\r\n            <td>\r\n              ${item.FIRST_NAME}\r\n            </td>\r\n            <td>\r\n              ${item.MIDDLE_NAME}\r\n            </td>\r\n            <td>\r\n              ${item.LAST_NAME}\r\n            </td>\r\n            <td>\r\n              ${item.EMAIL_ADDRESS}\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n    </div>\r\n    <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\"  divby.bind=\"20\"></gridpaging>\r\n  </ux-dialog-body>\r\n  <ux-dialog-footer>\r\n    <button text=\"Cancel\" click.trigger=\"controller.cancel()\">Close</button>\r\n  </ux-dialog-footer>\r\n</ux-dialog>\r\n</template>"; });
define('text!modals/change_password.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n\t<ux-dialog>\r\n      <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-10px;font-size:15px;\">CHANGE PASSWORD</span></ux-dialog-header>\r\n\r\n<!-- \t    <button type=\"button\" click.trigger=\"controller.cancel()\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> -->\r\n                    <!--<h4 class=\"modal-title\">LOG-IN</h4>-->\r\n    \r\n\r\n\t<ux-dialog-body>\r\n\t<div style=\"width:450px;\">\r\n\t\t<table style=\"margin-left:70px;\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\tNew Password:\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n                  <input value.bind=\"_NEW_PASSWORD\"  type=\"password\" keyup.trigger=\"keyPressed($event)\"/>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=2 class=\"text-center\">\r\n\t\t\t\t\t<input type=\"button\" click.trigger=\"savePassword()\" value=\"SAVE\" class=\"btn customButton\"/>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t\t\r\n\t</div>\r\n</ux-dialog-body>\r\n\r\n<!--<ux-dialog-footer>\r\n<button text=\"Cancel\" class=\"btn\" style=\"background-color: #e6e6e6;margin-bottom:5px;\" click.trigger=\"controller.cancel()\">Cancel</button>\r\n</ux-dialog-footer>-->\r\n\r\n</ux-dialog>\r\n</template>"; });
define('text!modals/confirm_dialog.html', ['module'], function(module) { module.exports = "<template>   \r\n          <!-- <modal showing.two-way=\"showing\"  mwidth.bind=\"_width\">\r\n              <modal-header title.bind=\"_setTitle\" close.call=\"closeModal()\"></modal-header>\r\n              <modal-body><div class=\"text-center\"><h4>${_message}</h3></div></modal-body>\r\n              <modal-footer>\r\n                  <button class=\"btn\" click.trigger=\"closeModal()\">Save</button>\r\n                  <au-button text=\"Continue\" click.call=\"confirm()\">Continue</au-button>\r\n                  <au-button text=\"Cancel\" click.call=\"closeModal()\">Close</au-button>\r\n                  \r\n              </modal-footer>\r\n          </modal> -->\r\n\r\n          <ux-dialog>\r\n         <!--<ux-dialog-header class=\"colorHeader\">\r\n      <button type=\"button\" click.trigger=\"controller.cancel()\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> \r\n                    <h4 class=\"modal-title\">LOG-IN</h4>\r\n</ux-dialog-header>-->\r\n            <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-10px;font-size:15px;\">${_setTitle}</span></ux-dialog-header>\r\n\r\n          <ux-dialog-body>\r\n        <div class=\"text-center\"><h4>${_message}</h3></div>\r\n        </ux-dialog-body>\r\n\r\n        <ux-dialog-footer>\r\n                <button click.trigger=\"controller.cancel()\">Cancel</button>\r\n                <button click.trigger=\"confirm()\">Ok</button>\r\n      </ux-dialog-footer>\r\n       </ux-dialog>\r\n</template>"; });
define('text!modals/edit-person.html', ['module'], function(module) { module.exports = "<template>\r\n  <ux-dialog>\r\n    <ux-dialog-body>\r\n      <h2>Edit first name</h2>\r\n      <input value.bind=\"person.firstName\" />\r\n    </ux-dialog-body>\r\n\r\n    <ux-dialog-footer>\r\n      <button click.trigger=\"controller.cancel()\">Cancel</button>\r\n      <button click.trigger=\"controller.ok(person)\">Ok</button>\r\n    </ux-dialog-footer>\r\n  </ux-dialog>\r\n</template>"; });
define('text!modals/globalindivmstr.html', ['module'], function(module) { module.exports = "<template>\r\n  <ux-dialog>\r\n  <!--<ux-dialog-header class=\"colorHeader\">\r\n\r\n                    <h4 class=\"modal-title\">SELECT PERSONNEL(S)</h4>\r\n</ux-dialog-header>-->\r\n    <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>SELECT PERSONNEL(S)</b></span></ux-dialog-header>\r\n  <ux-dialog-body>\r\n  <require from=\"converters/take\"></require>\r\n  <require from=\"converters/sorttext\"></require>\r\n  <require from=\"tools/gridpaging\"></require>\r\n  <div style=\"height:420px; overflow: auto;\">\r\n  <table>\r\n    <tr>\r\n        <td><div style=\"height:300px; overflow: auto;width:550px;\">\r\n            <table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n                <thead class=\"table-default\">\r\n                    <tr>\r\n                        <td class=\"colorCell2\" style=\"width:140px\">GLOBAL ID</td>\r\n                        <td class=\"colorCell2\">PERSONNEL NAME</td>\r\n                    </tr>\r\n                    <tr ref=\"_rGROUP_TITLE\">\r\n                        <td class=\"colorCell2\" style=\"width:140px\">\r\n                            <input class=\"input-sm form-control\" value.bind=\"_bGLOBAL_INDIV_ID\" searchable=\"_sGLOBAL_INDIV_ID\" keyup.delegate=\"fnKeyup($event,'')\" style=\"width:140px\"/>\r\n                        </td>\r\n                        <td class=\"colorCell2\" >\r\n                            <input class=\"input-sm form-control\" value.bind=\"_bPERSONNEL_NAME\" searchable=\"_sPERSONNEL_NAME\" keyup.delegate=\"fnKeyup($event,'')\" />\r\n                        </td>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr repeat.for=\"item of varFilterArray | sorttext:'PERSONNEL_NAME':'ascending' | take:10:pageindex\" click.delegate=\"$parent.selectedTalent(item)\">\r\n                        <td>${item.GLOBAL_INDIV_ID}</td>\r\n                        <td>${item.PERSONNEL_NAME}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\" divby.bind=\"10\"></gridpaging>\r\n    </td>\r\n    <td style=\"vertical-align:top;\">\r\n\r\n\r\n        <div style=\"height:350px; overflow: auto;\">\r\n            <table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n                <thead class=\"table-default\">\r\n                    <tr>\r\n                        <td colspan=3 class=\"colorCell2\" >\r\n                            SELECTED\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"colorCell2\"  style=\"width:140px\">\r\n                            GLOBAL ID\r\n                        </td>\r\n                        <td colspan=2 class=\"colorCell2\" >\r\n                            PERSONNEL NAME\r\n                        </td>\r\n\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr repeat.for=\"item of varFilterArraySelected\">\r\n                        <td style=\"width:140px\">\r\n                            ${item.GLOBAL_INDIV_ID}\r\n                        </td>\r\n                        <td>\r\n                            ${item.PERSONNEL_NAME}\r\n                        </td>\r\n                        <td>\r\n                            <button click.delegate=\"$parent.deleteSelected($index)\">X</button>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n    </td>\r\n</tr>\r\n<tr>\r\n    <td colspan=2>\r\n        <div style=\"width:100%;text-align:center;\">\r\n            <button style=\"width:20%;\" click.delegate=\"SelectingDone()\">DONE</button>\r\n            <button style=\"width:20%;\" click.delegate=\"ClearSearch()\">CLEAR SEARCH</button>\r\n        </div>\r\n    </td>\r\n</tr>\r\n</table>\r\n</div>\r\n</ux-dialog-body>\r\n\r\n<ux-dialog-footer>\r\n<button click.trigger=\"controller.cancel()\">Cancel</button>\r\n<!-- <button click.trigger=\"controller.ok(person)\">Ok</button> -->\r\n</ux-dialog-footer>    \r\n\r\n</ux-dialog>\r\n</template>\r\n\r\n"; });
define('text!modals/indivmstr.html', ['module'], function(module) { module.exports = "<template>\r\n <ux-dialog>\r\n   <!--<ux-dialog-header class=\"colorHeader\">\r\n        \r\n                    <h4 class=\"modal-title\">SELECT PERSONNEL(S)</h4>\r\n</ux-dialog-header>-->\r\n   <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>SELECT PERSONNEL(S)</b></span></ux-dialog-header>\r\n          <ux-dialog-body>\r\n          <require from=\"converters/take\"></require>\r\n<require from=\"converters/sorttext\"></require>\r\n<require from=\"tools/gridpaging\"></require>\r\n<div style=\"height:420px; overflow: auto;\">\r\n<table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n        <thead class=\"table-default\">\r\n            <tr>\r\n                <td class=\"colorCell2\">\r\n                    GLOBAL ID\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    PERSONNEL NAME\r\n                </td>\r\n            </tr>\r\n            <tr ref=\"_rGROUP_TITLE\">\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bGLOBAL_INDIV_ID\" searchable=\"_sGLOBAL_INDIV_ID\" keyup.delegate=\"fnKeyup($event,'')\" />\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bPERSONNEL_NAME\" searchable=\"_sPERSONNEL_NAME\" keyup.delegate=\"fnKeyup($event,'')\" />\r\n                </td>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr repeat.for=\"item of varFilterArray | sorttext:'PERSONNEL_NAME':'ascending' | take:10:pageindex\" click.delegate=\"$parent.selectedIndiv(item)\">\r\n                <td>\r\n                    ${item.GLOBAL_INDIV_ID}\r\n                </td>\r\n                <td>\r\n                    ${item.PERSONNEL_NAME}\r\n                </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>\r\n    <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\" divby.bind=\"10\"></gridpaging>\r\n          </ux-dialog-body>\r\n\r\n  <ux-dialog-footer>\r\n      <button click.trigger=\"controller.cancel()\">Cancel</button>\r\n<!--       <button click.trigger=\"controller.ok(person)\">Ok</button> -->\r\n    </ux-dialog-footer>    \r\n     </ux-dialog>\r\n</template>\r\n\r\n"; });
define('text!modals/job.html', ['module'], function(module) { module.exports = "<template>\r\n          <ux-dialog><!--         <button type=\"button\" click.trigger=\"controller.cancel()\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> -->\r\n            <!--<ux-dialog-header class=\"colorHeader\">\r\n\r\n                    <h4 class=\"modal-title\">SELECT JOB</h4>\r\n</ux-dialog-header>-->\r\n            <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>SELECT PERSONNEL(S)</b></span></ux-dialog-header>\r\n          <ux-dialog-body>\r\n          <require from=\"converters/take\"></require>\r\n<require from=\"converters/sorttext\"></require>\r\n<require from=\"tools/gridpaging\"></require>\r\n<table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n        <thead class=\"table-default\">\r\n            <tr>\r\n                <td class=\"colorCell2\">\r\n                    JOB GROUP\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    JOB DESCRIPTION\r\n                </td>\r\n            </tr>\r\n            <tr ref=\"_rJOB_TITLE\">\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bJOB_GRP\" searchable=\"_sJOB_GRP\" />\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bJOB_DESC\" searchable=\"_sJOB_DESC\" ref=\"refJobDesc\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n             <!-- | sorttext:'JOB_DESC':'ascending' -->\r\n            <tr repeat.for=\"item of varFilterArray | take:20:pageindex\" click.delegate=\"$parent.selectedJob(item)\">\r\n                <td>\r\n                    ${item.JOB_GRP}\r\n                </td>\r\n                <td>\r\n                    ${item.JOB_DESC}\r\n                </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n       <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\"  divby.bind=\"20\"></gridpaging>\r\n   </ux-dialog-body>\r\n         <ux-dialog-footer>\r\n         <button click.trigger=\"controller.cancel()\">Cancel</button>\r\n       </ux-dialog-footer>\r\n          </ux-dialog>\r\n          \r\n</template>"; });
define('text!modals/login.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n\t<ux-dialog>\r\n      <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-10px;font-size:15px;\">LOG-IN</span></ux-dialog-header>\r\n\r\n<!-- \t    <button type=\"button\" click.trigger=\"controller.cancel()\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> -->\r\n                    <!--<h4 class=\"modal-title\">LOG-IN</h4>-->\r\n    \r\n\r\n\t<ux-dialog-body>\r\n\t<div style=\"width:450px;\">\r\n\t\t<table style=\"margin-left:70px;\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\tCOMPANY:\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<select value.bind=\"_COMPANY\" style=\"width:172px;\">\r\n\t\t\t\t\t\t<option repeat.for=\"company of _companies\"  model.bind=\"company\">${company.COMPANY_NAME}</option>\r\n\t\t\t\t\t</select>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\tUSER ID:\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<select  value.bind=\"_USER\" style=\"width:136px;\">\r\n\t\t\t\t\t\t<option repeat.for=\"user of _user_content\"  model.bind=\"user\">${user.USER_ID}</option>\r\n\t\t\t\t\t</select> \r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\tPASSWORD:\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<input value.bind=\"_PASSWORD\" type=\"password\" keyup.trigger=\"keyPressed($event)\"/> &nbsp;<a href=\"#\" click.trigger=\"resetPassword()\">Reset</a>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n          <tr if.bind=\"user_expired\">\r\n            <td>\r\n              NEW PASSWORD:\r\n            </td>\r\n            <td>\r\n              <input value.bind=\"_NEW_PASSWORD\" type=\"password\"/>\r\n            </td>\r\n          </tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=2 class=\"text-center\">\r\n\t\t\t\t\t<input type=\"button\"  disabled.bind=\"disableLogButton\" click.trigger=\"tryLogin()\" value=\"LOG-IN\" class=\"btn customButton\" />\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t\t\r\n\t</div>\r\n</ux-dialog-body>\r\n\r\n<!--<ux-dialog-footer>\r\n<button text=\"Cancel\" class=\"btn\" style=\"background-color: #e6e6e6;margin-bottom:5px;\" click.trigger=\"controller.cancel()\">Cancel</button>\r\n</ux-dialog-footer>-->\r\n\r\n</ux-dialog>\r\n</template>"; });
define('text!modals/modalcontainer.html', ['module'], function(module) { module.exports = "<template>   \r\n          <modal showing.two-way=\"showing\"  mwidth.bind=\"_width\">\r\n              <modal-header title.bind=\"_setTitle\" close.call=\"closeModal()\"></modal-header>\r\n              <modal-body content-view.bind=\"_setContent\"></modal-body>\r\n              \r\n              <modal-footer>\r\n                  <!-- <button class=\"btn\" click.trigger=\"closeModal()\">Save</button> -->\r\n                  <au-button text=\"Cancel\" click.call=\"closeModal()\">Close</au-button>\r\n                  <!-- <button class=\"btn\" click.trigger=\"hotest()\">Talent 11</button> -->\r\n              </modal-footer>\r\n          </modal>\r\n\r\n       <input type=\"button\" ref=\"btnRef\" class=\"btn btn-xs customButton\" click.delegate=\"showDialog()\" value.bind=\"_buttonTitle\" disabled.bind=\"_isDisableElement\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n</template>"; });
define('text!modals/paymentterm.html', ['module'], function(module) { module.exports = "<template>\r\n  <ux-dialog>\r\n    <!--<ux-dialog-header class=\"colorHeader\">\r\n      <h4 class=\"modal-title\">SELECT PAYMENT TERM</h4>\r\n    </ux-dialog-header>-->\r\n    <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>SELECT PAYMENT TERM</b></span></ux-dialog-header>\r\n\r\n    <ux-dialog-body>\r\n      <table keyup.delegate=\"fnKeyup($event,'')\"  class=\"table table-hover table-condensed table-bordered table-striped \">\r\n        <tbody>\r\n          <tr repeat.for=\"item of varFilterArray\" click.delegate=\"$parent.selectedTerm(item)\">\r\n            <td>\r\n              ${item.REF_DESC}\r\n            </td>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\"  divby.bind=\"20\"></gridpaging>\r\n    </ux-dialog-body>\r\n    <ux-dialog-footer>\r\n     <button click.trigger=\"controller.cancel()\">Cancel</button>\r\n   </ux-dialog-footer>\r\n </ux-dialog>\r\n</template>"; });
define('text!modals/program.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <ux-dialog>\r\n    <ux-dialog-body>\r\n\r\n      <require from=\"converters/take\"></require>\r\n      <require from=\"converters/sorttext\"></require>\r\n      <require from=\"tools/gridpaging\"></require>\r\n      <div style=\"height:500px!important;overflow:auto;\">\r\n        <table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n          <thead class=\"table-default\">\r\n            <tr>\r\n              <td class=\"colorCell2\">\r\n                PROGRAM CODE\r\n              </td>\r\n              <td class=\"colorCell2\">\r\n                PROGRAM NAME\r\n              </td>\r\n            </tr>\r\n            <tr ref=\"_rBUDGET_TITLE\">\r\n              <td class=\"colorCell2\">\r\n                <input class=\"input-sm form-control\" value.bind=\"_bPROGRAM_CD\" searchable=\"_sPROGRAM_CD\" />\r\n              </td>\r\n              <td class=\"colorCell2\">\r\n                <input class=\"input-sm form-control\" value.bind=\"_bPROGRAM_TITLE\" searchable=\"_sPROGRAM_TITLE\" />\r\n              </td>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr repeat.for=\"item of varFilterArray | sorttext:'PROGRAM_TITLE':'ascending' | take:20:pageindex\" click.delegate=\"$parent.selectedProgram(item)\">\r\n              <td>\r\n                ${item.PROGRAM_CD}\r\n              </td>\r\n              <td>\r\n                ${item.PROGRAM_TITLE}\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n      <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\"  divby.bind=\"20\"></gridpaging>\r\n    </ux-dialog-body>\r\n    <ux-dialog-footer>\r\n      <button text=\"Cancel\" click.trigger=\"controller.cancel()\">Close</button>\r\n    </ux-dialog-footer>\r\n  </ux-dialog>\r\n</template>"; });
define('text!modals/talentmanagergroups.html', ['module'], function(module) { module.exports = "<template>\r\n    <ux-dialog>\r\n  <ux-dialog-body>\r\n  <require from=\"converters/take\"></require>\r\n  <require from=\"converters/sort\"></require>\r\n  <require from=\"tools/gridpaging\"></require>\r\n  <table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n    <thead class=\"table-default\">\r\n        <tr>\r\n            <td class=\"colorCell2\">\r\n                GLOBAL ID\r\n            </td>\r\n            <td class=\"colorCell2\">\r\n                GROUP NAME\r\n            </td>\r\n        </tr>\r\n        <tr ref=\"_rGROUP_TITLE\">\r\n            <td class=\"colorCell2\">\r\n                <input class=\"input-sm form-control\" value.bind=\"_bGLOBAL_GRP_ID\" searchable=\"_sGLOBAL_GRP_ID\" keyup.delegate=\"fnKeyup($event,'')\"/>\r\n            </td>\r\n            <td class=\"colorCell2\">\r\n                <input class=\"input-sm form-control\" value.bind=\"_bGROUP_NAME\" searchable=\"_sGROUP_NAME\" keyup.delegate=\"fnKeyup($event,'')\"/>\r\n            </td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr repeat.for=\"item of varFilterArray | sort:'GROUP_NAME':'ascending' | take:10:pageindex\" click.delegate=\"$parent.selectedTalent(item)\">\r\n            <td>\r\n                ${item.GLOBAL_GRP_ID}\r\n            </td>\r\n            <td>\r\n                ${item.GROUP_NAME}\r\n            </td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\" divby.bind=\"10\"></gridpaging>\r\n</ux-dialog-body>\r\n\r\n<ux-dialog-footer>\r\n    <button text=\"Cancel\" click.trigger=\"controller.cancel()\">Close</button>\r\n  </ux-dialog-footer>\r\n</ux-dialog>\r\n</template>"; });
define('text!ppid/ppid.html', ['module'], function(module) { module.exports = "<template>\r\n\t<h3>Program Personal Information Database</h3>\r\n\t<!-- <div style=\"background:#A2A2D0; width:100%; height:38px; padding:5px;\">\r\n\t\t<input type=\"button\" class=\"btn btn-xs customButton\" click.trigger=\"FindUsers()\" value=\"SEARCH\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n\t\t<input type=\"button\" class=\"btn btn-xs customButton\" click.trigger=\"\" value=\"ADD NEW PROGRAM PERSONNEL\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n\t\t<label hidden.bind=\"obj_personnel.global_indiv_id.length==0\">Global Id: ${obj_personnel.global_indiv_id}</label>\r\n\t</div> -->\r\n\t<require from=\"./forms/main\"></require>\r\n\t<require from=\"./forms/relative\"></require>\r\n\t<require from=\"./forms/awards_training\"></require>\r\n\t<require from=\"./forms/gov_info\"></require>\r\n\t<require from=\"./forms/company_info\"></require>\t\r\n\t<!--<require from=\"converters/filtercustom\"></require>\r\n\t<require from=\"converters/sorttext\"></require>-->\r\n\t<div style=\"margin-left:0%!important;margin-right:0%!important;margin-top:0%;text-align:center\" class=\"text-center divBackground\" >\r\n\t\t<ul class=\"nav nav-tabs backroundTab\" role=\"tablist\" style=\"width:100%;height:38px;\">\r\n\t\t\t<li role=\"presentation\" class=\"active\" ><a href=\"#main\" aria-controls=\"main\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"changeTab(0)\">Personnel Info</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#company_info\" aria-controls=\"company_info\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" disabled.bind=\"obj_personnel.global_indiv_id.length==0\" click.trigger=\"changeTab(4)\">Company</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#gov_info\" aria-controls=\"gov_info\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" disabled.bind=\"obj_personnel.global_indiv_id.length==0\" click.trigger=\"changeTab(3)\">Gov. Related Info.</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#relative_character_ref\" aria-controls=\"relative_character_ref\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" disabled.bind=\"obj_personnel.global_indiv_id.length==0\" click.trigger=\"changeTab(1)\">Relative</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#awards_training\" aria-controls=\"awards_training\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" disabled.bind=\"obj_personnel.global_indiv_id.length==0\" click.trigger=\"changeTab(2)\">Awards, Seminars / Training and Workshops</a></li>\r\n        </ul>\r\n\r\n        <div class=\"tab-content\">\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane active color1\" id=\"main\"  style=\"width:1200px;height:620px; margin-left:auto; margin-right:auto;\"><br/>\r\n\t\t\t\t<main></main>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"relative_character_ref\"  style=\"width:1024px;height:620px; margin-left:auto; margin-right:auto;\"><br/>\r\n\t\t\t\t<relative></relative>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"awards_training\"  style=\"width:1024px;height:620px; margin-left:auto; margin-right:auto;\"><br/>\r\n\t\t\t\t<awards_training></awards_training>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"gov_info\"  style=\"width:1024px;height:620px; margin-left:auto; margin-right:auto;\"><br/>\r\n\t\t\t\t<gov_info></gov_info>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"company_info\"  style=\"width:1024px;height:620px; margin-left:auto; margin-right:auto;\"><br/>\r\n\t\t\t\t<company_info></company_info>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n</template>"; });
define('text!ppfcs/buh.html', ['module'], function(module) { module.exports = "<template>\r\n\t<div style=\"margin-left:10%!important;margin-right:10%!important;margin-top:3%;width:800px;text-align:center;\" class=\"divBackground\">\r\n\t\t<table>\r\n\t\t\t<tr>\r\n\t\t\t\t<td><label>GLOBAL ID:</label></td>\r\n\t\t\t\t<td><input value.bind=\"_objBUH.OPTIONAL_GLOBAL_ID\" disabled.bind=\"_disableCells\" id=\"txtGlobalID\"/></td>\r\n\t\t\t\t<td class=\"text-right\"><label>E-Mail:</label></td>\r\n\t\t\t\t<td colspan=\"2\" class=\"text-left\"><input id=\"txtEmail\" value.bind=\"_objBUH.EMAIL_ADDRESS\"  disabled.bind=\"_disableCells\" style=\"width:250px;\" /></td>\r\n\t\t\t</tr>\r\n\r\n\t\t\t<tr>\r\n\t\t\t\t<td><label>LAST NAME:</label></td>\r\n\t\t\t\t<td><input value.bind=\"_objBUH.LAST_NAME\" id=\"txtLastName\" disabled.bind=\"_disableCells\" /></td>\r\n\t\t\t\t<td class=\"text-right\"><label>FIRST NAME:</label></td>\r\n\t\t\t\t<td class=\"text-left\"><input value.bind=\"_objBUH.FIRST_NAME\" id=\"txtFirstName\" disabled.bind=\"_disableCells\" /></td>\r\n\t\t\t\t<td class=\"text-right\"><label>MIDDLE:</label></td>\r\n\t\t\t\t<td class=\"text-left\"><input value.bind=\"_objBUH.MIDDLE_NAME\"  id=\"txtMiddle\" disabled.bind=\"_disableCells\" /></td>\r\n\t\t\t</tr>\r\n\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"7\" style=\"text-align:center;\"><br/>\r\n\t\t\t\t\t<input type=\"Button\" id=\"btnGlobalID\" value=\"Search\" click.delegate=\"fnCRUD('search')\" disabled.bind=\"_disableSearch\" class=\"btn btn-xs customButton\"/>\r\n\t\t\t\t\t<input type=\"button\" id=\"btnAdd\"  disabled.bind=\"_disableAdd\" value=\"Add\" click.delegate=\"fnCRUD('add')\" class=\"btn btn-xs customButton\"/>\r\n\t\t\t\t\t<input type=\"button\" id=\"btnDelete\" disabled.bind=\"_disableDelete\"  value=\"Delete\" click.delegate=\"fnCRUD('delete')\" class=\"btn btn-xs customButton\"/>\r\n\t\t\t\t\t<input type=\"button\" id=\"btnSave\" disabled.bind=\"_disableSave\" value=\"Save\" click.delegate=\"fnCRUD('save')\" class=\"btn btn-xs customButton\"/>\r\n\t\t\t\t\t<input type=\"button\" id=\"btnCancel\" value=\"Cancel/Clear\" click.delegate=\"fnCRUD('cancel')\" class=\"btn btn-xs customButton\"/>\r\n\t\t\t\t\t<br/><br/>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\t\r\n\t\t</table>\r\n\r\n\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\" >\r\n\t\t\t<thead>\r\n\t\t\t\t<tr><td class=\"colorCell\">PROGRAM ID</td>\r\n\t\t\t\t\t<td class=\"colorCell\">PROGRAM TITLE</td>\r\n\t\t\t\t\t<td class=\"colorCell\"><input type=\"button\" value=\"+\" disabled.bind=\"_disableGrid\" click.delegate=\"searchPrograms()\"/> </td>\r\n\t\t\t\t</tr>\r\n\t\t\t</thead>\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr repeat.for=\"item of _objBUH.PROGRAMS\">\r\n\t\t\t\t\t<td>${item.PROGRAM_CD}</td>\r\n\t\t\t\t\t<td>${item.PROGRAM_TITLE}</td>\r\n\t\t\t\t\t<td><input type=\"button\" value=\"-\" disabled.bind=\"_disableGrid\" click.delegate=\"$parent.deleteSelected($index)\"/>\r\n\t\t\t\t\t</td> \r\n\t\t\t\t</tr>\r\n\t\t\t</tbody>\r\n\t\t</table>  \r\n\r\n\r\n\t\t<!--<input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"loginDisabled\" value=\"LOG-IN\" style=\"padding-left:15px;padding-right:15px;\" click.trigger=\"fnLogin()\"/>\r\n\t\t<input type=\"button\" click.delegate=\"logout()\" value=\"LOG-OUT\"  disabled.bind=\"logoutDisabled\"  css=\"visibility: ${showingLogout}\" class=\"btn btn-xs customButton\">--> \r\n\r\n\r\n\r\n\t\t<br/>\r\n\t\t<br/>\r\n\t\t<table class= \"table-bordered\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\tLOGGED AS:\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<strong>${_user.USER_ID}</strong> \r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\r\n\r\n\t</template>"; });
define('text!tools/gridpaging.html', ['module'], function(module) { module.exports = "<template>\r\n\t<nav>\r\n        <ul class=\"pagination\">\r\n            <li>\r\n                <a style=\"cursor:pointer\" aria-label=\"Previous\" click.delegate=\"endClick(0)\" if.bind=\"_currentIndex!=0 && _Pages[0].length>0\">\r\n                    <span aria-hidden=\"true\">&laquo;</span>\r\n                </a>\r\n            </li>\r\n            <li repeat.for=\"item of _PagesShow\">\r\n                    <a style=\"cursor:pointer\" click.delegate=\"$parent.selectedClick($index)\" >${item}</a>\r\n            </li>\r\n            <li>\r\n                <a style=\"cursor:pointer\" aria-label=\"Next\"  click.delegate=\"endClick(1)\" if.bind=\"_Pages.length-1>_currentIndex && _Pages[0].length>0\">\r\n                    <span aria-hidden=\"true\">&raquo;</span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </nav>\r\n</template>"; });
define('text!ppid/contract/contract_form.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"converters/datepattern\"></require>\r\n  <br/>\r\n  <div class=\"divBackground\" style=\"margin-left:10%;width:900px;height: 300px;\">\r\n      <ul class=\"nav nav-tabs backroundTab\" role=\"tablist\" style=\"width:880px;height:38px;\">\r\n        <strong class=\"colorHeader\" style=\"vertical-align:middle;position:relative;top:8px;\">UTILIZATION</strong>\r\n      </ul>\r\n      <table style=\"margin-left: 25px; \" class=\"classIEnable\">\r\n        <tbody >\r\n          <tr>\r\n            <table>\r\n              <tbody>\r\n                <tr>\r\n                  <td>\r\n                    <td class=\"text-left\" style=\"width:140px;\">Global ID</td>\r\n                    <td>\r\n                      <input value.bind=\"GLOBAL_ID1\" style=\"width: 160px;text-align:center\" readonly.bind=\"!_disableEditContract || _cache_contract. CONTRACT_STATUS!='ACTIVE'\"/>\r\n                      <input type=\"button\" class=\"btn btn-xs customButton\" value=\"SEARCH\" style=\"padding-left:15px;padding-right:15px;\" disabled.bind='!_disableCancelContract' click.trigger=\"searchContract()\"/>\r\n                    </td>\r\n                  </td>\r\n                  <td style=\"width:55px;\">\r\n                  </td>\r\n                  <td>\r\n                    <td class=\"text-left\" style=\"width:140px;\">Contract Status</td>\r\n                    <td>\r\n                      <select value.bind=\"CONTRACT_STATUS1\" style=\"width:260px;\" disabled.bind=\"_disableEditContract || _cache_contract.ISNEWCONTRACT\" show.bind=\"_cache_contract.CONTRACT_STATUS!='EXPIRED'\">\r\n                        <option repeat.for=\"item of CONTRACT_STATUS\" value.bind=\"item.ref\">\r\n                          ${item.desc}\r\n                        </option>\r\n                      </select>\r\n                      <input value=\"EXPIRED\" style=\"width:260px; padding-left: 3px;\" readonly.bind=\"true\" show.bind=\"_cache_contract.CONTRACT_STATUS=='EXPIRED'\" />\r\n                    </td>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </tr>\r\n          <tr>\r\n            <table>\r\n              <tbody>\r\n                <tr>\r\n                  <td>\r\n                    <td class=\"text-left\" style=\"width:140px;\">Personnel Name</td>\r\n                    <td>\r\n                      <div>\r\n                        <input value.bind=\"EMPLOYEE_NAME\" style=\"width:300px;padding-left: 3px;\"  readonly.bind=\"_disableEditContract || !_cache_contract.ISNEWCONTRACT\" focus.trigger=\"onfocusName()\" blur.trigger=\"lostfocusName()\" change.delegate=\"onchangeName()\"/>\r\n                        <div style=\"position: absolute;z-index: 999;\" show.bind=\"menuNameShow\">\r\n                          <a repeat.for=\"item of NAME_ARRAY\" style=\"width:300px;\" value.bind=\"item.ref\" class=\"list-group-item\" click.trigger=\"name_change(item.ref, item.desc)\" >${item.desc}</a>\r\n                        </div>\r\n                      </div>\r\n                      <!--<auto-complete items.bind=\"languages\"></auto-complete>-->\r\n                      <!--<select value.bind=\"MSTR_LIST1\" style=\"width:300px;\" change.delegate=\"name_change()\" disabled.bind=\"_disableEditContract || !_cache_contract.ISNEWCONTRACT\">\r\n                        <option repeat.for=\"item of MSTR_LIST\" value.bind=\"item.ref\">\r\n                          ${item.desc}\r\n                        </option>\r\n                      </select>-->\r\n                    </td>\r\n                  </td>\r\n                  <td>\r\n                    <td class=\"text-left\" style=\"width:140px;\">Alias</td>\r\n                    <td>\r\n                      <div>\r\n                        <input value.bind=\"EMPLOYEE_ALIAS\" style=\"width:260px;padding-left: 3px; text-transform:uppercase; \"  readonly.bind=\"_disableEditContract\" focus.trigger=\"onfocusAlias()\" blur.trigger=\"lostfocusAlias()\" change.delegate=\"onchangeAlias()\"/>\r\n                        <div style=\"position: absolute;z-index: 999;\" show.bind=\"menuAliasShow\">\r\n                          <a repeat.for=\"item of ALIAS_ARRAY\" style=\"width:260px;\" value.bind=\"item\" class=\"list-group-item\" click.trigger=\"alias_change(item)\" >${item}</a>\r\n                        </div>\r\n                      </div>\r\n\r\n                      <!--<select value.bind=\"ALIAS_NAME1\" style=\"width:260px;\" disabled.bind=\"_disableEditContract\">\r\n                        <option repeat.for=\"item of ALIAS\" value.bind=\"item\">\r\n                          ${item}\r\n                        </option>\r\n                      </select>-->\r\n                    </td>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </tr>\r\n          <tr>\r\n            <table>\r\n              <tbody>\r\n                <tr>\r\n                  <td>\r\n                    <td class=\"text-left\" style=\"width:140px;\">Company Name</td>\r\n                    <td>\r\n                      <input value.bind=\"COMPANY_NAME1\" style=\"width: 260px;padding-left: 3px;\" readonly.bind=\"true\"/>\r\n                    </td>\r\n                  </td>\r\n                  <td style=\"width:40px\">\r\n                  </td>\r\n                  <td>\r\n                    <td class=\"text-left\" style=\"width:140px;\">Division</td>\r\n                    <td>\r\n                      <select value.bind=\"DIVISION1\" style=\"width:260px;\" change.delegate=\"division_change()\" disabled.bind=\"_disableEditContract\" show.bind=\"_cache_contract.CONTRACT_STATUS!='EXPIRED'\">\r\n                        <option repeat.for=\"item of DIVISION\" value.bind=\"item.ref\">\r\n                          ${item.desc}\r\n                        </option>\r\n                      </select>\r\n                      <input value.bind=\"DIVISION_NAME1\" style=\"width:260px; padding-left:3px;\" readonly.bind=\"true\" show.bind=\"_cache_contract.CONTRACT_STATUS=='EXPIRED'\" />\r\n                    </td>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </tr>\r\n          <tr>\r\n            <table>\r\n              <tbody>\r\n                <tr>\r\n                  <td>\r\n                    <td class=\"text-left\" style=\"width:140px;\">Job</td>\r\n                    <td>\r\n                      <select value.bind=\"JOB1\" style=\"width:260px;\"  change.delegate=\"job_change()\"  disabled.bind=\"_disableEditContract\" show.bind=\"_cache_contract.CONTRACT_STATUS!='EXPIRED'\">\r\n                        <option repeat.for=\"item of JOB\" value.bind=\"item.ref\">\r\n                          ${item.desc}\r\n                        </option>\r\n                      </select>\r\n                      <input value.bind=\"JOB_NAME1\" style=\"width:260px; padding-left: 3px;\" readonly.bind=\"true\" show.bind=\"_cache_contract.CONTRACT_STATUS=='EXPIRED'\" />\r\n                    </td>\r\n                  </td>\r\n                  <td style=\"width:40px;\">\r\n                  </td>\r\n                  <td>\r\n                    <td class=\"text-left\" style=\"width:140px;\">Job Group</td>\r\n                    <td>\r\n                      <input value.bind=\"JOB_GRP_NAME1\" style=\"width: 260px; padding-left: 3px;\" readonly.bind=\"true\"/>\r\n                    </td>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </tr>\r\n          <tr>\r\n            <table>\r\n              <tbody>\r\n                <tr>\r\n                  <td>\r\n                    <td class=\"text-left\" style=\"width:140px;\">Contract Start Date</td>\r\n                    <td>\r\n                      <input id=\"dtPicker1\" value.bind=\"CONTRACT_START_DT1\"  style=\"width: 80px; text-align:center;\" readonly.bind=\"_disableEditContract\"  change.delegate=\"checkDate()\" show.bind=\"_cache_contract.CONTRACT_STATUS!='EXPIRED'\"/>\r\n                      <input value.bind=\"CONTRACT_START_DT1\"  style=\"width: 80px; text-align:center;\" readonly.bind=\"true\" show.bind=\"_cache_contract.CONTRACT_STATUS=='EXPIRED'\"/>\r\n                    </td>\r\n                  </td>\r\n                  <td style=\"width:95px;\">\r\n                  </td>\r\n                  <td>\r\n                    <td class=\"text-left\" style=\"width:140px;\">Contract End Date</td>\r\n                    <td>\r\n                      <input id=\"dtPicker2\" value.bind=\"CONTRACT_END_DT1\" style=\"width: 80px; text-align:center;\"  readonly.bind=\"_disableEditContract\" change.delegate=\"checkDate()\" show.bind=\"_cache_contract.CONTRACT_STATUS!='EXPIRED'\"/>\r\n                      <input value.bind=\"CONTRACT_END_DT1\" style=\"width: 80px; text-align:center;\"   readonly.bind=\"true\" show.bind=\"_cache_contract.CONTRACT_STATUS=='EXPIRED'\"/>\r\n                    </td>\r\n                  </td>\r\n                  <td style=\"width:100px;\">\r\n                  </td>\r\n                  <td>\r\n                    <td class=\"text-left\" style=\"width:140px;\">Duration Months</td>\r\n                    <td>\r\n                      <input readonly.bind=\"true\" value.bind=\"DURATION_MONTHS1\" style=\"width: 50px; text-align: center;\" />\r\n                    </td>\r\n                  </td>\r\n                </tr>\r\n              </tbody>\r\n            </table>\r\n          </tr>\r\n        </tbody>\r\n      </table>\r\n      <br/>\r\n      <br/>\r\n      <div style=\"margin-left:100px;\">\r\n        <button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnContract('create')\" disabled.bind=\"_disableCreateContract || !_disableCancelContract\">NEW RECORD</button>&nbsp;&nbsp;\r\n        <button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnContract('save')\" disabled.bind=\"_disableCancelContract || _cache_contract.CONTRACT_STATUS!='ACTIVE'\">SAVE</button>&nbsp;&nbsp;\r\n        <button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnContract('cancel')\" disabled.bind=\"_disableRefreshContract\">CANCEL</button>&nbsp;&nbsp;\r\n      </div>\r\n      <div style=\"margin-left:25%;\">\r\n      <br/>\r\n      <table class= \"table-bordered\">\r\n        <tr>\r\n            <td>\r\n                CREATED BY:\r\n            </td>\r\n            <td>\r\n                ${CREATED_BY1}\r\n            </td>\r\n            <td>\r\n                LAST UPDATED BY:\r\n            </td>\r\n            <td>\r\n                ${LAST_UPDATED_BY1}\r\n            </td>\r\n        </tr>\r\n      </table>\r\n      </div>\r\n</div>\r\n\r\n</template>\r\n"; });
define('text!ppid/contract/contract_search.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <ux-dialog>\r\n    <!--    <button type=\"button\" click.trigger=\"controller.cancel()\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> -->\r\n    <!--<ux-dialog-header class=\"colorHeader\">\r\n\r\n                    <h4 class=\"modal-title\">BUDGET TEMPLATES</h4>\r\n</ux-dialog-header>-->\r\n    <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>CONTRACT TEMPLATE</b></span></ux-dialog-header>\r\n  <ux-dialog-body>\r\n  <require from=\"converters/take\"></require>\r\n  <require from=\"converters/sorttext\"></require>\r\n  <require from=\"tools/gridpaging\"></require>\r\n  <div style=\"height:350px;overflow: auto;\">\r\n    <table class=\"table table-hover table-condensed table-bordered\">\r\n        <thead class=\"table-default\">\r\n            <tr>\r\n                <td class=\"colorCell2\">\r\n                    GLOBAL ID\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    LAST NAME\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    GIVEN NAME\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    MIDDLE NAME\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    STATUS\r\n                </td>\r\n            </tr>\r\n            <tr ref=\"_rCONTRACT_TITLE\">\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bGLOBAL_ID\" searchable=\"_sGLOBAL_ID\"   keyup.delegate=\"fnKeyup($event,'')\" />\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bLAST_NAME\" searchable=\"_sLAST_NAME\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bGIVEN_NAME\" searchable=\"_sGIVEN_NAME\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bMIDDLE_NAME\" searchable=\"_sMIDDLE_NAME\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                  <input class=\"input-sm form-control\" value.bind=\"_bCONTRACT_STATUS\" searchable=\"_sCONTRACT_STATUS\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr repeat.for=\"item of varFilterArray | take:20:pageindex\"  click.delegate=\"$parent.selectedContract(item)\">\r\n                <td>\r\n                    ${item.GLOBAL_ID}\r\n                </td>\r\n                <td>\r\n                    ${item.LAST_NAME}\r\n                </td>\r\n                <td>\r\n                    ${item.GIVEN_NAME}\r\n                </td>\r\n                <td>\r\n                    ${item.MIDDLE_NAME}\r\n                </td>\r\n                <td>\r\n                    ${item.CONTRACT_STATUS}\r\n                </td>\r\n\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>\r\n<gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\"  divby.bind=\"20\"></gridpaging>\r\n\r\n</ux-dialog-body>\r\n\r\n<ux-dialog-footer>\r\n<button text=\"Cancel\" click.trigger=\"controller.cancel()\">Close</button>\r\n</ux-dialog-footer>\r\n</ux-dialog>\r\n</template>\r\n"; });
define('text!ppid/forms/awards_training.html', ['module'], function(module) { module.exports = "<template>\r\n\t<require from=\"converters/datepattern\"></require>\r\n\t<div style=\"margin-left:0%!important;margin-right:0%!important;margin-top:0%;text-align:center\" class=\"text-center divBackground\" >\r\n\t\t<ul class=\"nav nav-tabs backroundTab\" role=\"tablist\" style=\"width:100%;height:38px;\">\r\n\t\t\t\r\n\t\t\t<li role=\"presentation\" class=\"active\"><a href=\"#e_a_s_t_awards\" aria-controls=\"e_a_s_t_awards\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\">Awards</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#e_a_s_t_seminar_training\" aria-controls=\"e_a_s_t_seminar_training\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" >Seminars / Training and Workshops</a></li>\r\n        </ul>\r\n\t\t\r\n\t\t<div class='tab-content'>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane active color1\" id=\"e_a_s_t_awards\"  style=\"height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"e_a_s_t_seminar_training\"  style=\"height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\r\n\t\t\t</div>\t\t\t\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n</template>"; });
define('text!ppid/forms/company_info.html', ['module'], function(module) { module.exports = "<template>\r\n\t<require from=\"converters/datepattern\"></require>\t\r\n\t<require from=\"./company_info_main\"></require>\r\n\t<require from=\"./company_info_work_exp\"></require>\r\n\t<div style=\"margin-left:0%!important;margin-right:0%!important;margin-top:0%;text-align:center\" class=\"text-center divBackground\" >\r\n\t\t<ul class=\"nav nav-tabs backroundTab\" role=\"tablist\" style=\"width:100%;height:38px;\">\r\n\t\t\t<li role=\"presentation\" class=\"active\" ><a href=\"#company_specific\" aria-controls=\"company_specific\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_Company(0)\" >Company Specific</a></li>\r\n\t\t\t<li role=\"presentation\" ><a href=\"#company_work_exp\" aria-controls=\"company_work_exp\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_Company(1)\" >Work Experience</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#company_char_ref\" aria-controls=\"company_char_ref\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_Company(2)\">Character reference</a></li>\r\n\t\t\t<li role=\"presentation\" ><a href=\"#company_medical_rec\" aria-controls=\"company_medical_rec\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_Company(3)\" >Medical Record</a></li>\r\n\t\t\t<li role=\"presentation\" ><a href=\"#company_endorsement\" aria-controls=\"company_endorsement\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_Company(4)\" >Endorsement</a></li>\r\n\t\t\t<li role=\"presentation\" ><a href=\"#company_branding\" aria-controls=\"company_branding\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_Company(5)\" >Image Branding / Target Market</a></li>\r\n\t\t</ul>\r\n\t\t\r\n\t\t<div class='tab-content'>\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane active color1\" id=\"company_specific\"  style=\"height:550px; overflow-y: scroll;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<company_info_main></company_info_main>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"company_endorsement\"  style=\"height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"company_branding\"  style=\"height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\r\n\t\t\t</div>\r\n\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"company_medical_rec\"  style=\"height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\r\n\t\t\t</div> \r\n\r\n\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"company_work_exp\"  style=\"height:550px; margin-left:auto; margin-right:auto; overflow-y: scroll;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<!-- <img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\"> -->\t\t\t\t\r\n\t\t\t\t<company_info_work_exp></company_info_work_exp>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"company_char_ref\"  style=\"height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\t\t\t\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\r\n\t\t\t</div>\t\r\n\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n</template>"; });
define('text!ppid/forms/company_info_main.html', ['module'], function(module) { module.exports = "<template>\t\r\n\t<div style=\"height: 600px; width: 913px; margin: 5px auto;\">\r\n\t\t<table style=\"width: 100%;\">\r\n\t\t\t<tr style=\"vertical-align: top;\">\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<table>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">ID #</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.id_no\" disabled.bind=\"_disableIDNo\" />\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Start Date</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" tabindex=\"1\" id=\"_start_dt\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.start_dt\" />\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Kapamilya Date</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" id=\"kapamilya_dt\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.kapamilya_dt\" />\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">is Exclusive?</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<input type=\"checkbox\" tabindex=\"1\" checked.bind=\"obj_personnel.COMPANY_SPECIFIC.model.exclusive_fl\">\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<table>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Company</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" change.delegate=\"dd_companyChanged()\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.company_id\" >\r\n\t\t\t\t\t\t\t\t\t<!-- <option value=\"\"></option> -->\r\n\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.COMPANY\" value.bind=\"item.id\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">End Date</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" id=\"_end_dt\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.end_dt\" />\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Membership Date</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" id=\"membership_dt\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.membership_dt\" />\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<table>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Status</td>\r\n\t\t\t\t\t\t\t<td>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.status_cd\" disabled.bind=\"_disableStatus\" change.delegate=\"dd_statusChanged()\">\r\n\t\t\t\t\t\t\t\t\t<!-- <option value=\"\"></option> -->\r\n\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.STATUS\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr hidden.bind=\"_hideInactiveField\">\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\" >Reason for Cessation</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.cessation_reason_cd\" change.delegate=\"dd_cessationStatusChanged()\" >\r\n\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.CESSATION\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr hidden.bind=\"_hideInactiveField || _hideCessationDate\">\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\" >Cessation date</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" id=\"cessation_end_dt\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.cessation_end_dt\" />\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr hidden.bind=\"_hideInactiveField\">\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: top;\" class=\"text-left\">Remarks</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<textarea style=\"overflow-y: scroll; resize: none;\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.remarks\" > </textarea>\r\n\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" /> -->\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr hidden.bind=\"_hideSuspendField\">\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\" >Suspension Start Date</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" id=\"suspended_start_dt\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.suspended_start_dt\" />\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr hidden.bind=\"_hideSuspendField\">\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\" >Suspension End Date</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" id=\"suspended_end_dt\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.suspended_end_dt\" />\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t<div style=\"margin-left:20px; margin-right: 20px;\">\r\n\t\t\t\t\t\t<b>Note: The Start Date refers to the commencement date of the FIRST contract executed by Talent with Company while the End Date refers to the expiration date of the LAST contract executed by Talent with Company. Unless expressly stated, the dates do not imply or indicate continuous tenure or engagement during the period between the Start Date and End Date.</b>\r\n\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"3\" style=\"vertical-align: left;\">\r\n\t\t\t\t\t<table style=\"width: 500px;\">\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Home Division</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" change.delegate=\"dd_divisionChanged()\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.division_id\">\r\n\t\t\t\t\t\t\t\t\t<!-- <option value=\"\"></option> -->\r\n\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.DIVISION\" value.bind=\"item.id\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Location(RNG only)</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" disabled.bind=\"_disableLocations\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.location_cd\" >\r\n\t\t\t\t\t\t\t\t\t<option value=\"--NONE--\">--NONE--</option>\r\n\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.LOCATIONS_RNG\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Home Category</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" /> -->\r\n\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.category_id\">\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.CATEGORY\" value.bind=\"item.id\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Home Job</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" /> -->\r\n\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.job_id\">\r\n\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.JOB\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Payroll Group</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.payroll_grp_id\">\r\n\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.PAYROLL_GROUP\" value.bind=\"item.id\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Professional Type</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.professional_type_cd\">\r\n\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.PROFESSIONAL_TYPE\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t<div style=\"margin-left:0%!important;margin-right:0%!important;margin-top:0%;text-align:center\" class=\"text-center divBackground\" >\r\n\t\t\t\t\t\t<ul class=\"nav nav-tabs backroundTab\" role=\"tablist\" style=\"width:100%;height:38px;\">\r\n\t\t\t\t\t\t\t<li role=\"presentation\" class=\"active\" ><a href=\"#contracts\" aria-controls=\"contracts\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" >Contracts</a></li>\r\n\t\t\t\t\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#accreditation\" aria-controls=\"accreditation\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\">Accreditation</a></li>\r\n\t\t\t\t\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#bank_info\" aria-controls=\"bank_info\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" >Bank Information</a></li>\r\n        \t\t\t\t</ul>\r\n        \t\t\t\t<div class='tab-content'>\r\n        \t\t\t\t\t<div role=\"tabpanel\" class=\"tab-pane active color1\" id=\"contracts\"  style=\"width:850px;height:100px; margin-left:auto; margin-right:auto;\">\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<br/>\r\n\t\t\t\t\t\t\t\t<table style=\"width: 100%;\" class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t\t\t<thead style=\"display: table-header-group;\">\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Project Name</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Start Date</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">End Date</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Status</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\"> </td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t<tr repeat.for=\"item of contracts\">\r\n\t\t\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr if.bind=\"contracts == null || contracts.length==0\">\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"5\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<b>No current entry.</b>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"accreditation\"  style=\"width:850px;height:250px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t\t\t\t\t<!-- <br/> -->\r\n\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Job Group</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" disabled.bind=\"_disableTabsInput\" /> --> \r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 155px;\" disabled.bind=\"_disableTabsInput || accreditation_status.length==0\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.a_job_grp_id\" change.delegate=\"dd_jobGroupChange()\" >\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.JOB_GROUP\" value.bind=\"item.id\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Start date</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" id=\"a_start_dt\" disabled.bind=\"_disableTabsInput || accreditation_status.length==0\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.a_start_dt\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Memo</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"file\" name=\"memo\" class=\"custom-file-input\" >\r\n\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tr> -->\r\n\t\t\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Job</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" disabled.bind=\"_disableTabsInput\" /> -->\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 155px;\" disabled.bind=\"_disableTabsInput || accreditation_status.length==0\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.a_job_id\" >\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of accreditation_joblist\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">End date</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" id=\"a_end_dt\" disabled.bind=\"_disableTabsInput || accreditation_status.length==0\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.a_end_dt\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width: 100%;\" tabindex=\"18\" disabled.bind=\"_disableTabsInput\" >Attach</button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width: 100%;\" tabindex=\"18\" disabled.bind=\"_disableTabsInput\" >Attach Memo</button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tr> -->\r\n\t\t\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<tr >\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px;\" class=\"text-left\">Competency Level</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" disabled.bind=\"_disableTabsInput || accreditation_status.length==0\" keypress.trigger=\"Digit($event)\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.a_competency\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" tabindex=\"18\" disabled.bind=\"_disableTabsInput || accreditation_status.length>0\" click.delegate=\"btnAdd_accreditation()\">Add</button>&nbsp;\r\n\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" tabindex=\"18\" disabled.bind=\"_disableTabsInput || accreditation_status.length==0\" click.delegate=\"validateAccreditation()\">Save</button>&nbsp;\r\n\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" tabindex=\"18\" disabled.bind=\"_disableTabsInput\" click.delegate=\"clearAccreditationField()\" >Clear</button>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<div style=\"height: 120px; overflow-y: scroll;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<table style=\"width: 100%;\" class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<thead style=\"display: table-header-group;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Job group</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Job</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Level</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Start</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">End</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Division</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Home</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Entry</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Memo</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\"></td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\"></td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr repeat.for=\"item of obj_personnel.COMPANY_SPECIFIC.model.accreditation_list\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.job_grp_text}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.job_text}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.competency}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.eff_start_dt}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.eff_end_dt}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.division_text}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" tabindex=\"1\" checked.bind=\"item.home_fl=='1'\" disabled>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" tabindex=\"1\" checked.bind=\"item.entry_fl=='1'\" disabled>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.accreditation_memo}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" tabindex=\"18\" disabled.bind=\"_disableTabsInput || accreditation_status.length>0\" click.delegate=\"btnEdit_accreditation(item)\">-</button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" tabindex=\"18\" disabled.bind=\"_disableTabsInput || accreditation_status.length>0\" click.delegate=\"btnRemove_accreditation(item)\">X</button>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr if.bind=\"obj_personnel.COMPANY_SPECIFIC.model.accreditation_list == null || obj_personnel.COMPANY_SPECIFIC.model.accreditation_list.length==0\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"11\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>No current entry.</b>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</div>\r\n\r\n\t\t\t\t\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"bank_info\"  style=\"width:850px;height:100px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t\t\t\t\t<!-- <br/> -->\r\n\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Bank Information</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" disabled.bind=\"_disableTabsInput\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_id\" change.delegate=\"dd_bankChanged()\" >\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.BANK\" value.bind=\"item.id\">${item.bank_cd}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Account Name</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" readonly value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.acct_name\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<table style=\"width: 500px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Bank Branch</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" readonly value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.bank_nm\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Account Number</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" disabled.bind=\"_disableTabsInput\" keypress.trigger=\"Digit($event)\" value.bind=\"obj_personnel.COMPANY_SPECIFIC.model.personnel_bank.account_no\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t</div>\r\n        \t\t\t\t</div>\r\n        \t\t\t</div>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" tabindex=\"18\" click.trigger=\"validate()\">Save</button>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t<table class= \"table-bordered\" style=\" width: 500px; margin-left: auto; margin-right: auto;\">\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\tCREATED BY:\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<b>${lblCreatedBy}</b>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\tLAST UPDATED BY:\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<b>${lblUpdatedBy}</b>\r\n\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t</div>\r\n</template>"; });
define('text!ppid/forms/company_info_work_exp.html', ['module'], function(module) { module.exports = "<template>\t\r\n\t<div style=\"height: 600px; width: 913px; margin: 5px auto;\">\r\n\t\t<table>\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr colspan=\"3\" style=\"border: 1px solid #4d9cd5; width: 100%;\" class=\"backroundTab\">\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t<h5 style=\"margin: 10px; text-align: left; color: white;\">Work Experience</h5>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<table style=\"width: 100%;\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Employer</td>\r\n\t\t\t\t\t\t\t\t<td colspan=\"5\">\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.WORK_EXPERIENCE.model.employer\" tabindex=\"1\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\t\t\t\t\t\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">From</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" id=\"startDt\" value.bind=\"obj_personnel.WORK_EXPERIENCE.model.start_dt\" tabindex=\"2\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Salary</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.WORK_EXPERIENCE.model.salary\" tabindex=\"5\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">To</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" id=\"endDt\" value.bind=\"obj_personnel.WORK_EXPERIENCE.model.end_dt\" tabindex=\"3\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Position</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.WORK_EXPERIENCE.model.position_cd\" tabindex=\"6\" disabled.bind=\"_disableForm\" >\r\n\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.POSITION\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Present</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 155px;\" type=\"checkbox\" checked.bind=\"obj_personnel.WORK_EXPERIENCE.model.present_fl\" tabindex=\"4\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Free Lance</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 155px;\" type=\"checkbox\" checked.bind=\"obj_personnel.WORK_EXPERIENCE.model.freelance_fl\" tabindex=\"7\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<table style=\"width: 100%;\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: top;\" class=\"text-left\">Reason for leaving</td>\r\n\t\t\t\t\t\t\t\t<td colspan=\"5\">\r\n\t\t\t\t\t\t\t\t\t<textarea style=\"overflow-y: scroll; resize: none; width: 100%;\" value.bind=\"obj_personnel.WORK_EXPERIENCE.model.reason_for_leaving\" tabindex=\"8\" disabled.bind=\"_disableForm\" ></textarea>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\"  disabled.bind=\"_disableBtnAdd\" click.delegate=\"btnAdd()\">Add</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" disabled.bind=\"_disableBtnSave\" click.delegate=\"validate()\">Save</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"clearField()\" >Clear/Reset</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<div style=\"height: 220px; overflow-y: scroll;\">\r\n\t\t\t\t\t\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t\t<thead style=\"display: table-header-group;\">\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Employer</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">From</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">To</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Position</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Salary</td>\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">is Present</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Free Lancer</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Reason for leaving</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\"></td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\"></td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t<tr repeat.for=\"item of obj_personnel.WORK_EXPERIENCE.list\">\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.employer}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.start_dt}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.end_dt}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.position}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.salary}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" checked.bind=\"item.present_fl==1\" disabled />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" checked.bind=\"item.freelance_fl==1\" disabled />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.reason_for_leaving}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" click.delegate=\"btnEdit(item)\" disabled.bind=\"_disableBtnEdit\" >-</button>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" click.delegate=\"btnRemove(item)\" disabled.bind=\"_disableBtnRemove\" >X</button>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr if.bind=\"obj_personnel.WORK_EXPERIENCE.list == null || obj_personnel.WORK_EXPERIENCE.list.length==0\">\r\n\t\t\t\t\t\t\t\t\t\t<td colspan=\"9\">\r\n\t\t\t\t\t\t\t\t\t\t\t<b>No current entry.</b>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<table class= \"table-bordered\" style=\" width: 500px; margin-left: auto; margin-right: auto;\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\tCREATED BY:\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<b>${lblCreatedBy}</b>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\tLAST UPDATED BY:\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<b>${lblUpdatedBy}</b>\r\n\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</tbody>\r\n\t\t</table>\r\n\t</div>\r\n</template>"; });
define('text!ppid/forms/gov_info.html', ['module'], function(module) { module.exports = "<template>\r\n\t<require from=\"converters/datepattern\"></require>\r\n\t<require from=\"./gov_info_main\"></require>\r\n\t<div style=\"margin-left:0%!important;margin-right:0%!important;margin-top:0%;text-align:center\" class=\"text-center divBackground\" >\r\n\t\t<ul class=\"nav nav-tabs backroundTab\" role=\"tablist\" style=\"width:100%;height:38px;\">\r\n\t\t\t<li role=\"presentation\" style=\"\" class=\"active\"><a href=\"#gov_info_main\" aria-controls=\"gov_info_main\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_GovInfo(0)\">Government Information</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#gov_exam_passed\" aria-controls=\"gov_exam_passed\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\">Government Exam Passed</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#gov_criminal_rec\" aria-controls=\"gov_criminal_rec\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" >Criminal / Civil / Labor and administrative case</a></li>\r\n        </ul>\r\n\t\t\r\n\t\t<div class='tab-content'>\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane active color1\" id=\"gov_info_main\"  style=\"height:550px; margin-left:auto; margin-right:auto; overflow-y: scroll;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<gov_info_main></gov_info_main>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"gov_exam_passed\"  style=\"height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"gov_criminal_rec\"  style=\"height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\r\n\t\t\t</div>\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n</template>"; });
define('text!ppid/forms/gov_info_main.html', ['module'], function(module) { module.exports = "<template>\r\n\t<div style=\"height: 500px; width: 913px; margin: 5px auto;\">\r\n\t\t<table style=\"width: 100%;\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<table style=\"width: 100%\">\r\n\t\t\t\t\t\t<tr class=\"backroundTab\">\r\n\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t<h5 style=\"margin: 10px; text-align: left; color: white;\">Tax Information</h5>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"vertical-align: top;\">\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Tax ID Number(TIN)</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" disabled value.bind=\"obj_personnel.GOVERNMENT_INFO.tin\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Tax Exemption</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff; padding: 5px; width: 167px;\" value.bind=\"obj_personnel.GOVERNMENT_INFO.tax_exempt_cd\" tabindex=\"1\"  >\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.TAX_EXEMPT\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Tax Type</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff; padding: 5px; width: 167px;\" value.bind=\"obj_personnel.GOVERNMENT_INFO.input_tax_cd\" tabindex=\"2\" >\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.INPUT_TAX\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Tax Affidavit</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"3\" value.bind=\"obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_no\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t<!--</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>-->\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Date</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"4\" id=\"affidavit_dt\" value.bind=\"obj_personnel.GOVERNMENT_INFO.modelTaxAffidavit.affidavit_dt\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t<!--</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>-->\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"+\" class=\"btn btn-xs customButton\" click.trigger=\"btnAdd_TaxAffidavit()\" tabindex=\"5\"  />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td colspan=\"5\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div style=\"height: 120px; overflow: scroll;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<thead style=\"display: table-header-group;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Tax Affidavit</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Date</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Remove</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr repeat.for=\"item of obj_personnel.GOVERNMENT_INFO.tax_affidavit\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.affidavit_no}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.affidavit_dt}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"x\" class=\"btn btn-xs customButton\" click.trigger=\"btnRemove_TaxAffidavit(item)\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr if.bind=\"obj_personnel.GOVERNMENT_INFO.tax_affidavit == null || obj_personnel.GOVERNMENT_INFO.tax_affidavit.length==0\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>No current entry.</b>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<br/>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr class=\"backroundTab\">\r\n\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t<h5 style=\"margin: 10px; text-align: left; color: white;\">Government permits</h5>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t \t<table>\r\n\t\t\t\t\t\t\t \t\t<tr>\r\n\t\t\t\t\t\t\t \t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Gov't Permit</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.GOVERNMENT_INFO.modelPermit.permit_cd\" disabled.bind=\"_disableForm\" tabindex=\"6\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.PERMIT\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"6\" /> -->\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Permit Number</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"7\" value.bind=\"obj_personnel.GOVERNMENT_INFO.modelPermit.permit_no\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Expiry Date</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"8\" id=\"expiry_dt\" value.bind=\"obj_personnel.GOVERNMENT_INFO.modelPermit.expiry_dt\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t \t\t</tr>\r\n\t\t\t\t\t\t\t \t\t<tr>\t\t\t\t\t\t\t \t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Place Issued</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.GOVERNMENT_INFO.modelPermit.place_of_issue\" disabled.bind=\"_disableForm\" tabindex=\"9\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.LOCATIONS\" value.bind=\"item.LOCATION_CD\">${item.LOCATION_DESC}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"9\" /> -->\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<!-- <input type=\"button\" value=\"-\" class=\"btn btn-xs customButton\" click.trigger=\"\" tabindex=\"10\" />&nbsp;&nbsp; -->\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"+\" class=\"btn btn-xs customButton\" click.trigger=\"btnAdd_Permit()\" tabindex=\"10\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t \t\t</tr>\r\n\t\t\t\t\t\t\t \t\t<tr>\r\n\t\t\t\t\t\t\t \t\t\t<td colspan=\"6\">\r\n\t\t\t\t\t\t\t \t\t\t\t<div style=\"height:120px; overflow-y: scroll;\">\r\n\t\t\t\t\t\t\t \t\t\t\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<thead style=\"display: table-header-group;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Gov't Permit</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Permit Number</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Expiry Date</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Place Issued</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <td class=\"colorCell\">Edit</td> -->\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Remove</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr repeat.for=\"item of obj_personnel.GOVERNMENT_INFO.permits\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.permit_name}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.permit_no}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.expiry_dt}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.poi}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!-- <td>-</td> -->\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"X\" class=\"btn btn-xs customButton\" click.trigger=\"btnRemove_Permit(item)\" tabindex=\"10\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr if.bind=\"obj_personnel.GOVERNMENT_INFO.permits == null || obj_personnel.GOVERNMENT_INFO.permits.length==0\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"5\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>No current entry.</b>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\t\t\t\t\t\t\t \t\t\t\t\t\t\r\n\t\t\t\t\t\t\t \t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t \t\t\t\t</div>\r\n\t\t\t\t\t\t\t \t\t\t</td>\r\n\t\t\t\t\t\t\t \t\t</tr>\r\n\t\t\t\t\t\t\t \t</table>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td><br/></td>\r\n\t\t\t\t\t\t</tr>\r\n\r\n\t\t\t\t\t\t<tr class=\"backroundTab\">\r\n\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t<h5 style=\"margin: 10px; text-align: left; color: white;\">Other Government Info</h5>\r\n\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t \t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">VAT Classification</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff; padding: 5px; width: 167px;\" value.bind=\"obj_personnel.GOVERNMENT_INFO.vat_stat_cd\" tabindex=\"11\" disabled.bind=\"_disableOtherGovernmentInfo\" >\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.VAT_STAT\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t \t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">VAT Registration Date</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"12\" value.bind=\"obj_personnel.GOVERNMENT_INFO.vat_reg_dt\" id=\"vat_reg_dt\" disabled.bind=\"_disableOtherGovernmentInfo\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">SSS Number</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"13\" value.bind=\"obj_personnel.GOVERNMENT_INFO.sss_no\" id=\"_sss\" keypress.trigger=\"isDigit($event)\" keyup.trigger=\"input_mask('_sss', '__-_______-_')\" placeholder=\"00-0000000-00\" disabled.bind=\"_disableOtherGovernmentInfo\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t \t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">PAG-IBIG Number</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"14\" value.bind=\"obj_personnel.GOVERNMENT_INFO.pagibig_no\" id=\"_pagibig\" keypress.trigger=\"isDigit($event)\" keyup.trigger=\"input_mask('_pagibig', '____-____-____')\" placeholder=\"0000-0000-0000\" disabled.bind=\"_disableOtherGovernmentInfo\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t \t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Philhealth</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"15\" value.bind=\"obj_personnel.GOVERNMENT_INFO.philhealth_no\" id=\"_philhealth\" keypress.trigger=\"isDigit($event)\" keyup.trigger=\"input_mask('_philhealth', '__-_________-_')\" placeholder=\"00-000000000-0\" disabled.bind=\"_disableOtherGovernmentInfo\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t \t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">National ID</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"16\" value.bind=\"obj_personnel.GOVERNMENT_INFO.national_id\" disabled.bind=\"_disableOtherGovernmentInfo\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t \t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Voter's ID</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"17\" value.bind=\"obj_personnel.GOVERNMENT_INFO.voters_id\" disabled.bind=\"_disableOtherGovernmentInfo\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr hidden.bind=\"!_disableOtherGovernmentInfo\">\r\n\t\t\t\t\t\t\t\t\t\t<td colspan=\"6\">\r\n\t\t\t\t\t\t\t\t\t\t\t<b>\r\n\t\t\t\t\t\t\t\t\t\t\t\tNOTE:FORM WAS DISABLED, CALL HR ADMIN [ROMEL PALCES LOC. 4594 OR TRISH CRUZ LOC. 4356] IF YOU WISH TO CHANGE YOUR INFO.\r\n\t\t\t\t\t\t\t\t\t\t\t</b>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.trigger=\"validate()\" tabindex=\"18\">Save</button>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\t\t\t\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<table class= \"table-bordered\" style=\" width: 500px; margin-left: auto; margin-right: auto;\">\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\tCREATED BY:\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<b>${lblCreatedBy}</b>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\tLAST UPDATED BY:\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<b>${lblUpdatedBy}</b>\r\n\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t</div>\r\n</template>"; });
define('text!ppid/forms/main.html', ['module'], function(module) { module.exports = "<template>\r\n\t<require from=\"converters/datepattern\"></require>\r\n\t<require from=\"./main_contact\"></require>\r\n\t<require from=\"./main_educational\"></require>\r\n\t<div style=\"margin-left:0%!important;margin-right:0%!important;margin-top:0%;text-align:center;\" class=\"text-center divBackground\" >\r\n\t\t<ul class=\"nav nav-tabs backroundTab\" role=\"tablist\" style=\"width:100%;height:38px;\">\r\n\t\t\t<li role=\"presentation\" class=\"active\" ><a href=\"#main_main\" aria-controls=\"main_main\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_main(0)\">Employee Personal Info</a></li>\r\n\t\t\t<li role=\"presentation\" ><a href=\"#main_contact\" aria-controls=\"main_contact\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_main(1)\" disabled.bind=\"obj_personnel.global_indiv_id.length==0\">Contact</a></li>\r\n\t\t\t<li role=\"presentation\" ><a href=\"#main_educ_achievement\" aria-controls=\"main_educ_achievement\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_main(2)\" disabled.bind=\"obj_personnel.global_indiv_id.length==0\">Educational Achievement</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#main_char_interest\" aria-controls=\"main_char_interest\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_main(3)\" disabled.bind=\"obj_personnel.global_indiv_id.length==0\" >Characteristic/Interest</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#main_skills_talent\" aria-controls=\"main_skills_talent\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_main(4)\" disabled.bind=\"obj_personnel.global_indiv_id.length==0\" >Skills/Talent</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#main_lang_dialect\" aria-controls=\"main_lang_dialect\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_main(5)\" disabled.bind=\"obj_personnel.global_indiv_id.length==0\" >Language/Dialect</a></li>\r\n\t\t\t\r\n\t\t</ul>\r\n\t\t\r\n\t\t<div class='tab-content'>\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane active color1\" id=\"main_main\"  style=\"height:550px; margin-left:auto; margin-right:auto;\" >\r\n\t\t\t\t<br/>\r\n\r\n\t\t\t\t<table style=\"margin-left: 25px;\">\r\n\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Country*</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.HEADER.country_cd\" disabled.bind=\"obj_personnel.editing_status=='EDIT' || _disableForm\" tabindex=\"1\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.COUNTRY\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\" >Surname*</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\"  value.bind=\"obj_personnel.HEADER.last_name\" disabled.bind=\"_disableForm\" tabindex=\"3\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr style=\"height:35px;\">\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Gender*</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<label repeat.for=\"g of gender\" style=\"margin-left: 10px; margin-right: 10px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"_gender\" value.bind=\"g\" checked.bind=\"selectedGender\" disabled.bind=\"_disableForm\" tabindex=\"6\" />${g}\r\n\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t<!--<span style=\"margin: 20px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"gender\" value.bind=\"M\" checked.bind=\"selectedGender\" />Male \r\n\t\t\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t\t\t\t<span>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"gender\" value.bind=\"F\" checked.bind=\"selectedGender\" />Female\r\n\t\t\t\t\t\t\t\t\t\t\t</span>-->\r\n\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Birth place</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.HEADER.birth_place\" disabled.bind=\"_disableForm\" tabindex=\"9\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.LOCATIONS\" value.bind=\"item.LOCATION_CD\">${item.LOCATION_DESC}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Civil Status</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.HEADER.civil_status\" disabled.bind=\"_disableForm\" tabindex=\"12\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.CIVIL_STATUS\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Country Base</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.HEADER.country_base_cd\" disabled.bind=\"_disableForm\" tabindex=\"15\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.COUNTRY\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Citizenship</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 143px;\" value.bind=\"selected_citizenship\" class='ddCitizenship' disabled.bind=\"_disableForm\" tabindex=\"18\" id=\"citizenship\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.CITIZENSHIP\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"+\" class=\"btn btn-xs customButton\" click.trigger=\"btnAdd_Citizenship()\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td colspan=\"2\">\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t<div style=\"height: 150px; overflow-y: scroll;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<thead>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Citizenship Code</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Citizenship</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"x\" class=\"btn btn-xs customButton\" click.trigger=\"removeAllCitizenship()\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr repeat.for=\"citi of obj_personnel.HEADER.citizenship\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${citi.value}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${citi.text}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"x\" class=\"btn btn-xs customButton\" click.trigger=\"removeCitizenship(citi)\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td style=\"vertical-align: top; text-align: left; margin: 0px 0px 0px 0px;\">\r\n\t\t\t\t\t\t\t\t<table style=\"padding: 0px; margin: 0px;\">\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\" >Global ID</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\"  value.bind=\"obj_personnel.HEADER.global_indiv_id\" readonly />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Given Name*</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\"  value.bind=\"obj_personnel.HEADER.given_name\" disabled.bind=\"_disableForm\" tabindex=\"4\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Alias/NickName</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\"  value.bind=\"obj_personnel.HEADER.alias\" disabled.bind=\"_disableForm\" tabindex=\"7\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Birth date</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" id=\"birthDate\" value.bind=\"obj_personnel.HEADER.birth_dt\" disabled.bind=\"_disableForm\" tabindex=\"10\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Religion</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.HEADER.religion_cd\" disabled.bind=\"_disableForm\" tabindex=\"13\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.RELIGION\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">If Alien, ACR No.</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\"  value.bind=\"obj_personnel.HEADER.acr_no\" disabled.bind=\"_disableForm\" tabindex=\"16\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Group Name(s)</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 143px;\" value.bind=\"selected_group\" class=\"ddGroup\" disabled.bind=\"_disableForm\" tabindex=\"19\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.GROUP\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"+\" class=\"btn btn-xs customButton\" click.trigger=\"btnAdd_Group()\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t\t\t\t<!--<table>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr></tr>\r\n\t\t\t\t\t\t\t\t\t\t\t</table>-->\r\n\t\t\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t\t\t\t\t<div style=\"height: 150px; overflow-y: scroll;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" style=\"width: 300px;\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<thead style=\"display: table-header-group;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Group Code</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Group Name</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"x\" class=\"btn btn-xs customButton\" click.trigger=\"removeAllGroup()\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<tr repeat.for=\"grp of obj_personnel.HEADER.group\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${grp.value}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${grp.text}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"x\" class=\"btn btn-xs customButton\" click.trigger=\"removeGroup(grp)\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td style=\"vertical-align: top; text-align: left; margin: 0px 0px 0px 0px;\" >\r\n\t\t\t\t\t\t\t\t<table style=\"margin: 0px; padding: 0px;\">\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">TIN*</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\"  value.bind=\"obj_personnel.HEADER.tin\" disabled.bind=\"obj_personnel.editing_status=='EDIT' || _disableForm\" tabindex=\"2\" id=\"_tin\" keypress.trigger=\"DigitOnly($event)\" keyup.trigger=\"mask('_tin', '___-___-___-___')\" />\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\" >Middle Name*</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\"  value.bind=\"obj_personnel.HEADER.middle_name\" disabled.bind=\"_disableForm\" tabindex=\"5\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle; padding: 0px;\" class=\"text-left\">Mother's Maiden Name</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\"  value.bind=\"obj_personnel.HEADER.mother_maiden_name\" disabled.bind=\"_disableForm\" tabindex=\"8\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Age</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\"  readonly value.bind=\"obj_personnel.HEADER.age\" disabled.bind=\"_disableForm\" tabindex=\"11\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Location Base</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.HEADER.location_base_cd\" disabled.bind=\"_disableForm\" tabindex=\"14\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.LOCATIONS\" value.bind=\"item.LOCATION_CD\">${item.LOCATION_DESC}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">STATUS</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.HEADER.status_cd\" disabled.bind=\"_disableForm\" tabindex=\"17\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"status of obj_personnel.STATUS\" value.bind=\"status.value\">${status.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr hidden.bind=\"obj_personnel.HEADER.status_cd!='SUSPEND'\">\r\n\t\t\t\t\t\t\t\t\t\t<td colspan=\"2\" class=\"text-center\"><strong>Suspension Date</strong></td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr hidden.bind=\"obj_personnel.HEADER.status_cd!='SUSPEND'\">\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">From</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" id=\"suspensionFrom\" value.bind=\"obj_personnel.HEADER.suspension_start\"/>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<tr hidden.bind=\"obj_personnel.HEADER.status_cd!='SUSPEND'\">\r\n\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">To</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" id=\"suspensionTo\" value.bind=\"obj_personnel.HEADER.suspension_end\"/>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\t\r\n\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td style=\"vertical-align: top; text-align: left; margin: 0px 0px 0px 0px;\" >\r\n\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t<!-- -   <img if.bind=\"cache_obj.USER.USER_ID!==undefined\" src=\"/ViewFile/GetFile?fileName=abslogo_BIG.png&token=${fnSerializeCode(_cache_obj.USER.USER_ID+':'+_cache_obj.USER.HASH)}\"/>  -->\r\n\t\t\t\t\t\t\t\t\t\t\t<div style=\"width: 150px; height: 150px; border: dashed 2px black;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<img src.bind=\"primary_img\" style=\"height: 100%; width: 100%;\">\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" disabled.bind=\"_disableSavePersonnel\" click.trigger=\"btnUpload()\">Add/Edit Photo</button>\r\n\t\t\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</tbody>\r\n\t\t\t\t</table>\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<h5>\r\n\t\t\t\t\t\t( <strong>Note</strong> : * is required )\r\n\t\t\t\t\t</h5>\r\n\t\t\t\t</div>\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" disabled.bind=\"_disableSearchPersonnel\" click.trigger=\"fnPersonnel('EDIT')\">EDIT PERSONNEL</button>&nbsp;&nbsp;\r\n\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" disabled.bind=\"_disableCreatePersonnel\" click.trigger=\"fnPersonnel('CREATE')\" >CREATE PERSONNEL</button>&nbsp;&nbsp;\r\n\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" disabled.bind=\"_disableClearData\" click.trigger=\"fnPersonnel('CLEAR')\" >CLEAR/CANCEL</button>&nbsp;&nbsp;\r\n\t\t\t\t\t<!--<button class=\"btn btn-xs customButton\" style=\"width:150px;\" disabled.bind=\"_disableResetData\" click.trigger=\"fnPersonnel('RESET')\">RESET/REFRESH</button>&nbsp;&nbsp;-->\r\n\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" disabled.bind=\"_disableSavePersonnel\" click.trigger=\"fnPersonnel('SAVE')\">SAVE PERSONNEL</button>&nbsp;&nbsp;\r\n\r\n\t\t\t\t</div>\r\n\r\n\t\t\t\t<br/>\r\n\t\t\t\t<div>\r\n\t\t\t\t\t<table class= \"table-bordered\" style=\" width: 500px; margin-left: auto; margin-right: auto;\">\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\tCREATED BY:\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<b>${obj_personnel.HEADER.created_by +' '+ obj_personnel.HEADER.created_dt}</b>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\tLAST UPDATED BY:\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<b>${obj_personnel.HEADER.last_updated_by +' '+ obj_personnel.HEADER.last_updated_dt }</b>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<!-- <td>\r\n\t\t\t\t\t\t\t\tLOGGED AS:\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t<strong>${obj_personnel.USER.USER_ID}</strong> \r\n\t\t\t\t\t\t\t</td> -->\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</table>\r\n\t\t\t\t</div>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"main_contact\"  style=\"height:550px; margin-left:auto; margin-right:auto;  overflow-y: scroll;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<main_contact></main_contact>\r\n\t\t\t</div>\r\n\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"main_educ_achievement\"  style=\"height:550px; margin-left:auto; margin-right:auto; overflow-y: scroll; \">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<main_educational></main_educational>\r\n\t\t\t</div>\r\n\r\n\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"main_char_interest\"  style=\"width:980px;height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\r\n\t\t\t</div>\r\n\r\n\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"main_skills_talent\"  style=\"width:980px;height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\r\n\t\t\t</div>\r\n\r\n\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"main_lang_dialect\"  style=\"width:980px;height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\r\n\t\t\t</div>\r\n\r\n\r\n\r\n\t\t</div>\r\n\r\n\t</div>\r\n</template>"; });
define('text!ppid/forms/main_contact.html', ['module'], function(module) { module.exports = "<template>\r\n\t<div style=\"height: 600px; width: 913px; margin: 5px auto;\">\r\n\t\t<table>\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr colspan=\"3\" style=\"border: 1px solid #4d9cd5; width: 100%;\" class=\"backroundTab\">\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<div >\r\n\t\t\t\t\t\t\t<h5 style=\"margin: 10px; text-align: left; color: white;\">Address</h5>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr style=\"border-left: 1px solid #4d9cd5; border-right: 1px solid #4d9cd5;\">\r\n\t\t\t\t\t<td style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Unit No.</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelAddress.unit_no\" tabindex=\"1\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Bldg Name</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelAddress.bldg_name\" tabindex=\"4\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Barangay</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelAddress.barangay\" tabindex=\"7\" disabled.bind=\"_disableForm\"/>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Province/State</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.CONTACT.modelAddress.state_province\" tabindex=\"10\" disabled.bind=\"_disableForm\" change.delegate=\"dd_provinceChanged()\">\r\n\t\t\t\t\t\t\t\t\t\t<option></option>\r\n\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.PROVINCE\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t</select>\t\t\r\n\t\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.address.state_province\" /> -->\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Country*</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.CONTACT.modelAddress.country_cd\" tabindex=\"13\" disabled.bind=\"_disableForm\">\r\n\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.COUNTRY\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.address.country_cd\" /> -->\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t<table>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">House No.</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelAddress.house_no\" tabindex=\"2\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Street/Phase</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelAddress.street_name\" tabindex=\"5\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Distict</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelAddress.district\" tabindex=\"8\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Region</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.CONTACT.modelAddress.region\" change.delegate=\"dd_regionChanged()\" tabindex=\"11\" disabled.bind=\"_disableForm\" >\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t<optgroup label=\"Philippines\">\r\n\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.REGION\" if.bind=\"item.group=='PH'\" value.bind=\"item.value\" >${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t<!-- <option repeat.for=\"item of obj_personnel.REGION\" if.bind=\"item.group=='PH'\" value.bind=\"item.value\" disabled.bind=\"obj_personnel.CONTACT.modelAddress.country_cd!='PH' && obj_personnel.CONTACT.modelAddress.country_cd.length>0\">${item.text}</option> -->\r\n\t\t\t\t\t\t\t\t\t\t</optgroup>\r\n\t\t\t\t\t\t\t\t\t\t<optgroup label=\"United States of America\" hidden.bind=\"item.group=='US'\">\r\n\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.REGION\" if.bind=\"item.group=='US'\" value.bind=\"item.value\" >${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t<!-- <option repeat.for=\"item of obj_personnel.REGION\" if.bind=\"item.group=='US'\" value.bind=\"item.value\" disabled.bind=\"obj_personnel.CONTACT.modelAddress.country_cd!='US' && obj_personnel.CONTACT.modelAddress.country_cd.length>0\" >${item.text}</option> -->\r\n\t\t\t\t\t\t\t\t\t\t</optgroup>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Present Address</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"checkbox\" checked.bind=\"obj_personnel.CONTACT.modelAddress.present_fl\" tabindex=\"14\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t<table>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Blk Lot</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelAddress.block_lot\" tabindex=\"3\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Subd/Vill</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelAddress.sub_village\" tabindex=\"6\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">City/Town</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelAddress.city_town\" tabindex=\"9\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Zip Code</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelAddress.zipcode\" tabindex=\"12\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Permanent Address</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"checkbox\" checked.bind=\"obj_personnel.CONTACT.modelAddress.permanent_fl\" tabindex=\"15\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\t\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr style=\"border-left: 1px solid #4d9cd5; border-right: 1px solid #4d9cd5;\">\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<table style=\"width: 100%;\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\" colspan=\"1\">Remarks</td>\r\n\t\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelAddress.remarks\" tabindex=\"18\" disabled.bind=\"_disableForm\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Upload Sketch</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" disabled.bind=\"_disableForm\"/>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" disabled.bind=\"_disableForm\" click.trigger=\"\">Upload</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" disabled.bind=\"_disableForm\" click.trigger=\"\">Attach</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr style=\"border-left: 1px solid #4d9cd5; border-right: 1px solid #4d9cd5;\">\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.trigger=\"btnAdd_Address()\" disabled.bind=\"_disableBtnAdd\">Add</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" disabled.bind=\"_disableBtnSave\" click.trigger=\"validateAddress()\">Save</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.trigger=\"clearAddressData()\">Clear/Reset</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr style=\"border-left: 1px solid #4d9cd5; border-bottom: 1px solid #4d9cd5; border-right: 1px solid #4d9cd5;\">\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<div style=\"height: 100px; overflow-y: scroll;\">\r\n\t\t\t\t\t\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t\t<thead style=\"display: table-header-group;\">\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Address</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Present</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Permanent</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Sketch</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Remarks</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Edit</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Remove</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t<tr repeat.for=\"item of obj_personnel.CONTACT.address\">\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.full_address}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"checkbox\" disabled checked.bind=\"item.present_fl=='1'\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"checkbox\" disabled checked.bind=\"item.permanent_fl=='1'\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td >\r\n\t\t\t\t\t\t\t\t\t\t\t<a href=\"\" hidden.bind=\"item.sketch_path!=0\">Link</a>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.remarks}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"-\" class=\"btn btn-xs customButton\" disabled.bind=\"_disableAddressTable\" click.trigger=\"btnEdit_Address(item)\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"x\" class=\"btn btn-xs customButton\" disabled.bind=\"_disableAddressTable\" click.trigger=\"btnRemoveAddress(item)\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr if.bind=\"obj_personnel.CONTACT.address == null || obj_personnel.CONTACT.address.length==0\">\r\n\t\t\t\t\t\t\t\t\t\t<td colspan=\"7\">\r\n\t\t\t\t\t\t\t\t\t\t\t<b>No current entry.</b>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</tbody>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\r\n\t\t\t\t<tr colspan=\"3\">\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<br />\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr colspan=\"3\" style=\"border: 1px solid #4d9cd5; margin-left: 10px; margin-right: 0px; margin-top: 10px; width: 100%;\" class=\"backroundTab\">\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t<h5 style=\"margin: 10px; text-align: left; color: white;\">Contact</h5>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr style=\"border-left: 1px solid #4d9cd5; border-right: 1px solid #4d9cd5; border-bottom: 1px solid #4d9cd5;\">\r\n\t\t\t\t\t<td colspan=\"2\" style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t<table style=\"width: 100%;\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 100px; vertical-align: middle;\" class=\"text-left\">Contact</td>\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<td style=\"float:left;\">\r\n\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100px;\" value.bind=\"obj_personnel.CONTACT.modelContact.phone_type\" >\r\n\t\t\t\t\t\t\t\t\t\t<option></option>\r\n\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.CONTACT_TYPE\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 80px; \" type=\"text\" placeholder=\"Area Code\" value.bind=\"obj_personnel.CONTACT.modelContact.area_cd\" keypress.trigger=\"isNumberKey($event)\" />\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100px; \" type=\"text\" placeholder=\"Phone No.\" value.bind=\"obj_personnel.CONTACT.modelContact.phone_no\" keypress.trigger=\"isNumberKey($event)\" />\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 80px; \" type=\"text\" placeholder=\"Ext.\" value.bind=\"obj_personnel.CONTACT.modelContact.local_no\" keypress.trigger=\"isNumberKey($event)\" />\r\n\t\t\t\t\t\t\t\t\t<input type=\"button\" value.bind=\"obj_personnel.CONTACT.statusContact\" class=\"btn btn-xs customButton\" click.trigger=\"validateContact()\" style=\"width: 45px;\" />\r\n\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"Clear\" class=\"btn btn-xs customButton\" click.trigger=\"clearContactData()\" style=\"width: 60px;\" />\r\n\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t\t\t<div style=\"height: 240px; overflow-y: scroll;\">\r\n\t\t\t\t\t\t\t\t\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t\t\t\t\t<thead style=\"display: table-header-group;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Contact Type</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Area Code</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Phone No.</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Ext.</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Edit</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Remove\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<!--<input type=\"button\" value=\"X\" class=\"btn btn-xs customButton\" click.trigger=\"\" />-->\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr repeat.for=\"item of obj_personnel.CONTACT.contact\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.phone_type_text}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.area_cd}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.phone_no}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.local_no}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"-\" class=\"btn btn-xs customButton\" click.trigger=\"btnEdit_Contact(item)\" disabled.bind=\"_disableContactTable\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"X\" class=\"btn btn-xs customButton\" click.trigger=\"btnRemove_Contact(item)\" disabled.bind=\"_disableContactTable\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr if.bind=\"obj_personnel.CONTACT.contact == null || obj_personnel.CONTACT.contact.length==0\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"6\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>No current entry.</b>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td colspan=\"1\" style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Email</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 143px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelInternet.email_addr\" />\r\n\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"+\" class=\"btn btn-xs customButton\" click.trigger=\"btnAdd_EmailWeb(true)\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t\t\t<div style=\"height: 100px; overflow-y: scroll;\">\r\n\t\t\t\t\t\t\t\t\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t\t\t\t\t<thead style=\"display: table-header-group;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Email</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"X\" class=\"btn btn-xs customButton\" click.trigger=\"btnRemove_AllEmailWeb(true)\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr repeat.for=\"item of obj_personnel.CONTACT.email\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.web_addr}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"X\" class=\"btn btn-xs customButton\" click.trigger=\"btnRemove_EmailWeb(item.internet_id, true)\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr if.bind=\"obj_personnel.CONTACT.email == null || obj_personnel.CONTACT.email.length==0\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>No current entry.</b>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Website</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 143px;\" type=\"text\" value.bind=\"obj_personnel.CONTACT.modelInternet.url\" />\r\n\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"+\" class=\"btn btn-xs customButton\" click.trigger=\"btnAdd_EmailWeb(false)\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t\t\t<div style=\"height: 100px; overflow-y: scroll;\">\r\n\t\t\t\t\t\t\t\t\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t\t\t\t\t<thead style=\"display: table-header-group;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Website</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"X\" class=\"btn btn-xs customButton\" click.trigger=\"btnRemove_AllEmailWeb(false)\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr repeat.for=\"item of obj_personnel.CONTACT.website\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>${item.web_addr}</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"X\" class=\"btn btn-xs customButton\" click.trigger=\"btnRemove_EmailWeb(item.internet_id, false)\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<tr if.bind=\"obj_personnel.CONTACT.website == null || obj_personnel.CONTACT.website.length==0\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<b>No current entry.</b>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<table class= \"table-bordered\" style=\" width: 500px; margin-left: auto; margin-right: auto;\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\tCREATED BY:\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<b>${lblCreatedBy}</b>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\tLAST UPDATED BY:\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<b>${lblUpdatedBy}</b>\r\n\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</tbody>\r\n\t\t</table>\r\n\t</div>\r\n</template>"; });
define('text!ppid/forms/main_educational.html', ['module'], function(module) { module.exports = "<template>\r\n\t<div style=\" height: 550px; width: 913px; margin: 5px auto;\">\r\n\t\t<table>\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr style=\"border: 1px solid #4d9cd5; width: 100%;\" class=\"backroundTab\">\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t<h5 style=\"margin: 10px; text-align: left; color: white;\">Educational Achievement</h5>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr style=\"border-left: 1px solid #4d9cd5; border-right: 1px solid #4d9cd5; width: 100%;\">\r\n\t\t\t\t\t<td style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Level</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff; padding: 5px; width: 167px;\" disabled.bind=\"_disableForm\" value.bind=\"obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.education_level\" >\r\n\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.LEVEL\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr> \t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Year Start</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff; padding: 5px; width: 167px;\" disabled.bind=\"_disableForm\" value.bind=\"obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.start_yr\" >\r\n\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.YEAR\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Year End</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff; padding: 5px; width: 167px;\" disabled.bind=\"_disableForm\" value.bind=\"obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.end_yr\" >\r\n\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.YEAR\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr style=\"border-left: 1px solid #4d9cd5; border-right: 1px solid #4d9cd5;\">\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<table style=\"width: 100%;\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">School</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff; padding: 5px; width: 100%;\" disabled.bind=\"_disableForm\" value.bind=\"obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.school_cd\" >\r\n\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.SCHOOLS\" value.bind=\"item.school_cd\">${item.school_name}</option>\r\n\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr style=\"border-left: 1px solid #4d9cd5; border-right: 1px solid #4d9cd5;\">\r\n\t\t\t\t\t<td style=\"vertical-align: left;\">\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Degree / Major</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" disabled.bind=\"_disableForm\" value.bind=\"obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.course\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td style=\"vertical-align: left;\">\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Awards / Achievement</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" disabled.bind=\"_disableForm\" value.bind=\"obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.honor_awards\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td style=\"vertical-align: left;\">\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Completed</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"checkbox\" tabindex=\"15\" disabled.bind=\"_disableForm\" checked.bind=\"obj_personnel.EDUCATIONAL_ACHIEVEMENT.model.completed_fl\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr style=\"border-left: 1px solid #4d9cd5; border-right: 1px solid #4d9cd5;\">\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.trigger=\"btnAdd()\" disabled.bind=\"_disableBtnAdd\" >Add</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.trigger=\"validate()\" disabled.bind=\"_disableBtnSave\" >Save</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.trigger=\"clearData()\">Clear/Reset</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr style=\"border-left: 1px solid #4d9cd5; border-right: 1px solid #4d9cd5; border-bottom: 1px solid #4d9cd5;\">\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<div style=\"height: 280px; overflow: scroll;\">\r\n\t\t\t\t\t\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t\t<thead style=\"display: table-header-group;\">\r\n\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Level</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">School</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Degree/Major</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Awards</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Date From</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Date To</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Completed</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Edit</td>\r\n\t\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Remove</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t\t<tr repeat.for=\"item of obj_personnel.EDUCATIONAL_ACHIEVEMENT.list\">\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.level_name}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.school_name}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.course}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.honor_awards}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.start_yr}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>${item.end_yr}</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" type=\"checkbox\" disabled checked.bind=\"item.completed_fl=='1'\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"-\" class=\"btn btn-xs customButton\" click.trigger=\"btnEdit(item)\" disabled.bind=\"_disableTable\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t<input type=\"button\" value=\"x\" class=\"btn btn-xs customButton\" click.trigger=\"btnRemove(item)\" disabled.bind=\"_disableTable\" />\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t<tr if.bind=\"obj_personnel.EDUCATIONAL_ACHIEVEMENT.list == null || obj_personnel.EDUCATIONAL_ACHIEVEMENT.list.length==0\">\r\n\t\t\t\t\t\t\t\t\t\t<td colspan=\"9\">\r\n\t\t\t\t\t\t\t\t\t\t\t<b>No current entry.</b>\r\n\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<table class= \"table-bordered\" style=\" width: 500px; margin-left: auto; margin-right: auto;\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\tCREATED BY:\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<b>${lblCreatedBy}</b>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\tLAST UPDATED BY:\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<b>${lblUpdatedBy}</b>\r\n\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</tbody>\r\n\t\t</table>\r\n\t</div>\r\n</template>"; });
define('text!ppid/forms/miscellaneous.html', ['module'], function(module) { module.exports = "<template>\r\n\t<h3>Hello from Miscellaneous.</h3>\t\r\n\t<div style=\"background:orange; width:100px; height:100px;\">\r\n\t</div>\r\n</template>"; });
define('text!ppid/forms/relative.html', ['module'], function(module) { module.exports = "<template>\r\n\t<require from=\"converters/datepattern\"></require>\r\n\t<require from=\"./relative_parent\"></require>\r\n\t<require from=\"./relative_siblings\"></require>\r\n\t<div style=\"margin-left:0%!important;margin-right:0%!important;margin-top:0%;text-align:center\" class=\"text-center divBackground\" >\r\n\t\t<ul class=\"nav nav-tabs backroundTab\" role=\"tablist\" style=\"width:100%;height:38px;\">\r\n\t\t\t<li role=\"presentation\" class=\"active\" ><a href=\"#relative_parent\" aria-controls=\"relative_parent\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_relative(0)\">Parent</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#relative_siblings\" aria-controls=\"relative_siblings\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_relative(1)\" >Siblings</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#relative_spouse\" aria-controls=\"relative_spouse\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_relative(2)\" >Spouse</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#relative_children\" aria-controls=\"relative_children\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_relative(3)\" >Children</a></li>\r\n\t\t\t<li role=\"presentation\" style=\"\"><a href=\"#relative_in_case\" aria-controls=\"relative_in_case\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab_relative(4)\" >In Case of Emergency</a></li>\r\n\t\t\t\r\n        </ul>\r\n\t\t\r\n\t\t<div class='tab-content'>\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane active color1\" id=\"relative_parent\"  style=\"height:550px; margin-left:auto; margin-right:auto; overflow-y: scroll; \">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<relative_parent></relative_parent>\r\n\t\t\t\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"relative_siblings\"  style=\"height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<relative_siblings></relative_siblings>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"relative_spouse\"  style=\"height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\t\t\t\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"relative_children\"  style=\"height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\t\t\t\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t\r\n\t\t\t<div role=\"tabpanel\" class=\"tab-pane color1\" id=\"relative_in_case\"  style=\"height:550px; margin-left:auto; margin-right:auto;\">\r\n\t\t\t\t<br/>\r\n\t\t\t\t<img src.bind=\"_404_img\" style=\"width: 100%; height: 100%;\">\t\t\t\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t\t\t\r\n\t\t</div>\r\n\t\t\r\n\t</div>\r\n</template>"; });
define('text!ppid/forms/relative_parent.html', ['module'], function(module) { module.exports = "<template>\r\n\t<div style=\"height: 600px; width: 900px; margin: 5px auto;\">\r\n\t\t<table>\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<table style=\"width: 100%;\">\r\n\t\t\t\t\t\t\t<tr class=\"backroundTab\">\r\n\t\t\t\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t\t<h5 style=\"margin: 10px; text-align: left; color: white;\">Mother</h5>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Last Name*</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.last_name\" tabindex=\"1\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Birth date*</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" id=\"mBirthDate\" disabled.bind=\"_disableForm\" value.bind=\"obj_personnel.RELATIVE.parents.mother.birth_dt\" tabindex=\"4\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" /> -->\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Unit No.</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.unit_no\" tabindex=\"7\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Bldg name</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.bldg_name\" tabindex=\"10\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Barangay</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.barangay\" tabindex=\"13\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Province/State</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" change.delegate=\"dd_provinceChanged(true)\" value.bind=\"obj_personnel.RELATIVE.parents.mother.state_province\" tabindex=\"16\" >\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.PROVINCE\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Country*</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.RELATIVE.parents.mother.country_cd\" tabindex=\"19\" >\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.COUNTRY\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<table>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Given Name*</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.given_name\" tabindex=\"2\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Occupation</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.occupation\" tabindex=\"5\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">House No.</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.house_no\" tabindex=\"8\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Street / Phase</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.street_name\" tabindex=\"11\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">District</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.district\" tabindex=\"14\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Region</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" change.delegate=\"dd_regionChanged(true)\" value.bind=\"obj_personnel.RELATIVE.parents.mother.region\" tabindex=\"17\" >\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<optgroup label=\"Philippines\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.REGION\" if.bind=\"item.group=='PH'\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</optgroup>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<optgroup label=\"United States of America\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.REGION\" if.bind=\"item.group=='US'\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</optgroup>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<!-- <td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Status</td> -->\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label style=\"margin-left: 10px; margin-right: 10px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"mstatus_dependent\" change.delegate=\"checkChange(true, 'Dependent')\" />Dependent\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label style=\"margin-left: 10px; margin-right: 10px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"mstatus_deceased\" change.delegate=\"checkChange(true, 'Deceased')\" />Deceased\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" /> -->\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<table>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Middle Name</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.middle_name\" tabindex=\"3\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Employer</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.employer\" tabindex=\"6\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Blk lot</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.block_lot\" tabindex=\"9\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Subd / Village</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.sub_village\" tabindex=\"12\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">City/Town</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.city_town\" tabindex=\"15\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Zip code</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.mother.zipcode\" tabindex=\"18\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Deceased Date</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" id=\"mDeceasedDate\" disabled.bind=\"obj_personnel.RELATIVE.parents.mother.status!='Deceased'\" value.bind=\"obj_personnel.RELATIVE.parents.mother.deceased_dt\" tabindex=\"21\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" /> -->\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td><br/></td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<table style=\"width: 100%;\">\r\n\t\t\t\t\t\t\t<tr class=\"backroundTab\">\r\n\t\t\t\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t\t\t\t<h5 style=\"margin: 10px; text-align: left; color: white;\">Father</h5>\r\n\t\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr style=\"vertical-align: top;\">\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Last Name*</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.last_name\" tabindex=\"22\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Birth date*</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" id=\"fBirthDate\" disabled.bind=\"_disableForm\" value.bind=\"obj_personnel.RELATIVE.parents.father.birth_dt\" tabindex=\"25\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" /> -->\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Unit No.</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.unit_no\" tabindex=\"28\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Bldg name</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.bldg_name\" tabindex=\"31\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Barangay</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.barangay\" tabindex=\"34\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Province/State</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" change.delegate=\"dd_provinceChanged(false)\" value.bind=\"obj_personnel.RELATIVE.parents.father.state_province\" tabindex=\"37\" >\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.PROVINCE\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Country*</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" value.bind=\"obj_personnel.RELATIVE.parents.father.country_cd\" tabindex=\"40\" >\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.COUNTRY\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<table>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Given Name*</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.given_name\" tabindex=\"23\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Occupation</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.occupation\" tabindex=\"26\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">House No.</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.house_no\" tabindex=\"29\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Street / Phase</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.street_name\" tabindex=\"32\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">District</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.district\" tabindex=\"35\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Region</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<select style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 167px;\" change.delegate=\"dd_regionChanged(false)\" value.bind=\"obj_personnel.RELATIVE.parents.father.region\" tabindex=\"38\" >\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<option value=\"\"></option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<optgroup label=\"Philippines\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.REGION\" if.bind=\"item.group=='PH'\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</optgroup>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<optgroup label=\"United States of America\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option repeat.for=\"item of obj_personnel.REGION\" if.bind=\"item.group=='US'\" value.bind=\"item.value\">${item.text}</option>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t</optgroup>\r\n\t\t\t\t\t\t\t\t\t\t\t\t</select>\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<!-- <td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Status</td> -->\r\n\t\t\t\t\t\t\t\t\t\t\t<td colspan=\"2\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <label repeat.for=\"s of status\" style=\"margin-left: 10px; margin-right: 10px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"radio\" name=\"fstatus\" value.bind=\"s\" checked.bind=\"obj_personnel.RELATIVE.parents.father.status\" change.delegate=\"checkChange(false, s)\" />${s}\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label> -->\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label style=\"margin-left: 10px; margin-right: 10px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"fstatus_dependent\" change.delegate=\"checkChange(false, 'Dependent')\" />Dependent\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t<label style=\"margin-left: 10px; margin-right: 10px;\">\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t<input type=\"checkbox\" id=\"fstatus_deceased\" change.delegate=\"checkChange(false, 'Deceased')\" />Deceased\r\n\t\t\t\t\t\t\t\t\t\t\t\t</label>\r\n\t\t\t\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<table>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Middle Name</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.middle_name\" tabindex=\"24\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Employer</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.employer\" tabindex=\"27\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Blk lot</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.block_lot\" tabindex=\"30\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Subd / Village</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.sub_village\" tabindex=\"33\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">City/Town</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.city_town\" tabindex=\"36\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Zip code</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" value.bind=\"obj_personnel.RELATIVE.parents.father.zipcode\" tabindex=\"39\" />\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Deceased Date</td>\r\n\t\t\t\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px;\" id=\"fDeceasedDate\" disabled.bind=\"obj_personnel.RELATIVE.parents.father.status!='Deceased'\" value.bind=\"obj_personnel.RELATIVE.parents.father.deceased_dt\" tabindex=\"42\" />\r\n\t\t\t\t\t\t\t\t\t\t\t\t<!-- <input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" /> -->\r\n\t\t\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t\t\t</table>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.trigger=\"validate()\">Save</button>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<table class= \"table-bordered\" style=\" width: 500px; margin-left: auto; margin-right: auto;\">\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\tCREATED BY:\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<b>${lblCreatedBy}</b>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\tLAST UPDATED BY:\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<b>${lblUpdatedBy}</b>\r\n\t\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</tbody>\t\t\t\t\r\n\t\t</table>\r\n\t</div>\r\n</template>"; });
define('text!ppid/forms/relative_siblings.html', ['module'], function(module) { module.exports = "<template>\r\n\t<div style=\"background: white; height: 500px; width: 913px; margin: 5px auto; \">\r\n\t\t<table style=\"width: 100%;\">\r\n\t\t\t<tbody>\r\n\t\t\t\t<tr class=\"backroundTab\">\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<div>\r\n\t\t\t\t\t\t\t<h5 style=\"margin: 10px; text-align: left; color: white;\">Siblings</h5>\r\n\t\t\t\t\t\t</div>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr style=\"vertical-align: top;\">\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Last Name</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Birth Date</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Given Name</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Age</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Status</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t\t<td>\r\n\t\t\t\t\t\t<table>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Middle Name</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Relationship</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t\t<td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Deceased Date</td>\r\n\t\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t\t<input style=\"border: 1px solid #e2e2e2; background: #fff;padding: 5px; width: 100%;\" type=\"text\" tabindex=\"1\" />\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.trigger=\"\">Add</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.trigger=\"\">Save</button>&nbsp;&nbsp;\r\n\t\t\t\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.trigger=\"\">Clear/Reset</button>&nbsp;&nbsp;\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t\t<tr>\r\n\t\t\t\t\t<td colspan=\"3\">\r\n\t\t\t\t\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\">\r\n\t\t\t\t\t\t\t<thead style=\"display: table-header-group;\">\r\n\t\t\t\t\t\t\t\t<tr>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Last Name</td>\r\n\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">First Name</td>\r\n\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Middle Name</td>\r\n\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Birth Date</td>\r\n\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Age</td>\r\n\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Dependent/Deceased</td>\r\n\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Deceased Date</td>\r\n\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Edit</td>\r\n\t\t\t\t\t\t\t\t\t<td class=\"colorCell\">Remove</td>\r\n\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t</thead>\r\n\t\t\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t\t\t<tr repeat.for=\"item of x\">\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t<td>${item}</td>\r\n\t\t\t\t\t\t\t\t\t<td>${item}</td>\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t</tr>\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t<tr if.bind=\"x == null || x.length==0\">\r\n\t\t\t\t\t\t\t\t\t<td colspan=\"9\">\r\n\t\t\t\t\t\t\t\t\t\t<b>No current entry.</b>\r\n\t\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t\t</tbody>\r\n\t\t\t\t\t\t</table>\r\n\t\t\t\t\t</td>\r\n\t\t\t\t</tr>\r\n\t\t\t</tbody>\r\n\t\t</table>\r\n\t</div>\r\n</template>"; });
define('text!ppid/modals/DialogBox.html', ['module'], function(module) { module.exports = "<template>\r\n\t<ux-dialog>\r\n\t\t<ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>${title}</b></span></ux-dialog-header>\r\n\t\t<ux-dialog-body style=\"border-radius: 0px;\" class=\"divBackground\">\r\n\t\t\t<div style=\"white-space: pre;\">${message}</div>\r\n\t\t</ux-dialog-body>\r\n\t\t<ux-dialog-footer>\r\n\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\"  click.trigger=\"controller.ok()\">Yes</button>&nbsp;&nbsp;\r\n\t\t\t<button class=\"btn btn-xs customButton\" style=\"width:150px;\"  click.trigger=\"controller.cancel()\">No</button>&nbsp;&nbsp;\r\n\t\t</ux-dialog-footer>\r\n\t</ux-dialog>\r\n</template>"; });
define('text!ppid/modals/photo_list.html', ['module'], function(module) { module.exports = "<template>\r\n\t<ux-dialog>\r\n\t\t<ux-dialog-header>class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>${title}</b></span></ux-dialog-header>\r\n\t\t<ux-dialog-body>\r\n\t\t\t<div>\r\n\t\t\t\t<table>\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td></td>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t</ux-dialog-body>\r\n\t</ux-dialog>\r\n</template>"; });
define('text!ppid/modals/ppid_search.html', ['module'], function(module) { module.exports = "<template>\r\n\t<ux-dialog>\r\n\t\t<ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>SEARCH PERSONNEL(S)</b></span></ux-dialog-header>\r\n\t\t\r\n\t\t<ux-dialog-body style=\"background:#E3E3E3;\" class=\".divBackground\">\r\n\t\t\t<require from=\"converters/take\"></require>\r\n\t\t\t<require from=\"converters/sorttext\"></require>\r\n\t\t\t<require from=\"tools/gridpaging\"></require>\t\t\t\r\n\t\t\t<div style=\"height:350px;overflow: auto;\">\r\n\t\t\t\t<table class=\"table table-hover table-condensed table-bordered\">\r\n\t\t\t\t\t<thead class=\"table-default\">\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t\t<td class=\"colorCell2\">GLOBAL ID</td>\r\n\t\t\t\t\t\t\t<!--<td class=\"colorCell2\">TIN</td>\r\n\t\t\t\t\t\t\t<td class=\"colorCell2\">GROUP</td>-->\r\n\t\t\t\t\t\t\t<td class=\"colorCell2\">LAST NAME</td>\r\n\t\t\t\t\t\t\t<td class=\"colorCell2\">FIRST NAME</td>\r\n\t\t\t\t\t\t\t<td class=\"colorCell2\">NICKNAME / ALIAS</td>\r\n\t\t\t\t\t\t\t<!--<td class=\"colorCell2\">PROJECT NAME</td>\r\n\t\t\t\t\t\t\t<td class=\"colorCell2\">COUNTRY</td>-->\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr ref=\"_rppid_queries\">\r\n\t\t\t\t\t\t\t<td class=\"colorCell2\">\r\n\t\t\t\t\t\t\t\t<input class=\"input-sm form-control\" value.bind=\"_bglobal_indiv_id\" searchable=\"_bglobal_indiv_id\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<!--<td class=\"colorCell2\">\r\n\t\t\t\t\t\t\t\t<input class=\"input-sm form-control\" value.bind=\"_btin\" searchable=\"_stin\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td class=\"colorCell2\">\r\n\t\t\t\t\t\t\t\t<input class=\"input-sm form-control\" value.bind=\"_bgroup\" searchable=\"_sgroup\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n\t\t\t\t\t\t\t</td>-->\r\n\t\t\t\t\t\t\t<td class=\"colorCell2\">\r\n\t\t\t\t\t\t\t\t<input class=\"input-sm form-control\" value.bind=\"_blast_name\" searchable=\"_slast_name\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td class=\"colorCell2\">\r\n\t\t\t\t\t\t\t\t<input class=\"input-sm form-control\" value.bind=\"_bfirst_name\" searchable=\"_sfirst_name\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n\t\t\t\t\t\t\t</td>\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t<td class=\"colorCell2\">\r\n\t\t\t\t\t\t\t\t<input class=\"input-sm form-control\" value.bind=\"_bnickname\" searchable=\"_snickname\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<!--<td class=\"colorCell2\">\r\n\t\t\t\t\t\t\t\t<input class=\"input-sm form-control\" value.bind=\"_bproject_name\" searchable=\"_sproject_name\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td class=\"colorCell2\">\r\n\t\t\t\t\t\t\t\t<input class=\"input-sm form-control\" value.bind=\"_bcountry\" searchable=\"_scountry\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n\t\t\t\t\t\t\t</td>-->\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</thead>\r\n\t\t\t\t\t<tbody>\r\n\t\t\t\t\t\t<tr repeat.for=\"item of varFilterArray | take:20:pageindex\" click.delegate=\"$parent.selectedPersonnel(item)\">\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t${item.GLOBAL_INDIV_ID}\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<!--<td>\r\n\t\t\t\t\t\t\t\t${item.TIN}\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t${item.GROUP}\r\n\t\t\t\t\t\t\t</td>-->\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t${item.LAST_NAME}\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t${item.FIRST_NAME}\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t${item.NICK_NAME}\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<!--<td>\r\n\t\t\t\t\t\t\t\t${item.PROJECT_NAME}\r\n\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t\t${item.COUNTRY}\r\n\t\t\t\t\t\t\t</td>-->\r\n\t\t\t\t\t\t</tr>\r\n\t\t\t\t\t</tbody>\r\n\t\t\t\t</table>\r\n\t\t\t</div>\r\n\t\t\t\r\n\t\t\t<gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\"  divby.bind=\"10\"></gridpaging>\r\n\t\t</ux-dialog-body>\r\n\t\t<!--<ux-dialog-footer>\t\r\n\t\t\t<button class=\"btn btn-xs customButton\" click.trigger=\"Submit()\">Search</button>\r\n\t\t\t<button class=\"btn btn-xs customButton\" click.trigger=\"controller.cancel()\">Close</button>\r\n\t\t</ux-dialog-footer>-->\r\n\t</ux-dialog>\r\n</template>"; });
define('text!ppid/talent_search/results_output.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"tab-content\">\r\n      <div role=\"tabpanel\" class=\"tab-pane active color1\" id=\"main\"  style=\"width:1024px;height:120px;\"><br/>\r\n        <br/>\r\n        <br/>\r\n        <br/>\r\n\r\n      <div style=\"margin-left:25%;\">\r\n        <br/>\r\n        <br/>\r\n      <table class= \"table-bordered\">\r\n        <tr>\r\n            <td>\r\n                CREATED BY:\r\n            </td>\r\n            <td>\r\n            </td>\r\n            <td>\r\n                LAST UPDATED BY:\r\n            </td>\r\n            <td>\r\n            </td>\r\n            </tr>\r\n      </table>\r\n      </div>\r\n\r\n      </div>\r\n    </div>\r\n</template>\r\n"; });
define('text!ppid/talent_search/talent_search.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"ppid/talent_search/results_output\"></require>  \r\n  <br/>\r\n  <div class=\"divBackground\" style=\"margin-left:10%;width:1035px;height: 400px;\">\r\n      <ul class=\"nav nav-tabs backroundTab\" role=\"tablist\" style=\"width:1024px;height:38px;\">\r\n        <strong class=\"colorHeader\" style=\"vertical-align:middle;position:relative;top:8px;\">SEARCH</strong>\r\n      </ul>\r\n      <div class=\"col-md-6\">\r\n        <strong>General Info</strong>\r\n        <table style=\"margin-left: 25px; \" class=\"classIEnable\">\r\n          <tbody >\r\n              <tr>\r\n                <td style=\"vertical-align: top;\">\r\n                  <table>\r\n                       <tr>\r\n                          <td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\">Name (Group, Individual)</td>\r\n                          <td>\r\n                           <input value.bind=\"_NAME\" style=\"width: 260px;\" />\r\n                         </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td>Age</td>\r\n                        <td>\r\n                            <input value.bind=\"_AGE\" style=\"width: 90px;\" />\r\n                        </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td>Citizenship</td>\r\n                        <td>\r\n                          <select value.bind=\"_CITIZENSHIP\" style=\"width:260px;\">\r\n                            <option repeat.for=\"item of _CITIZENSHIP_ARR\" value.bind=\"item.ref\">\r\n                                ${item.desc}\r\n                            </option>\r\n                        </select>\r\n                        </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td>Religion</td>\r\n                        <td>\r\n                          <select value.bind=\"_RELIGION\" style=\"width:260px;\">\r\n                            <option repeat.for=\"item of _RELIGION_ARR\" value.bind=\"item.ref\">\r\n                                ${item.desc}\r\n                            </option>\r\n                        </select>\r\n                        </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td>Gender</td>\r\n                        <td>\r\n                          <select value.bind=\"_GENDER\" style=\"width:260px;\">\r\n                            <option repeat.for=\"item of _GENDER_ARR\" value.bind=\"item.ref\">\r\n                                ${item.desc}\r\n                            </option>\r\n                        </select>\r\n                        </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td>Country</td>\r\n                        <td>\r\n                          <select value.bind=\"_COUNTRY\" style=\"width:260px;\">\r\n                            <option repeat.for=\"item of _COUNTRY_ARR\" value.bind=\"item.ref\">\r\n                                ${item.desc}\r\n                            </option>\r\n                        </select>\r\n                        </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td>Location</td>\r\n                        <td>\r\n                          <select value.bind=\"_LOCATION\" style=\"width:260px;\">\r\n                            <option repeat.for=\"item of _LOCATION_ARR\" value.bind=\"item.ref\">\r\n                                ${item.desc}\r\n                            </option>\r\n                        </select>\r\n                        </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td>Talent Supplier</td>\r\n                        <td>\r\n                            <input value.bind=\"_TALENT_SUPPLIER\" style=\"width: 260px;\" />\r\n                        </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td>Talent Handler</td>\r\n                        <td>\r\n                            <input value.bind=\"_TALENT_HANDLER\" style=\"width: 260px;\" />\r\n                        </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td>Interest</td>\r\n                        <td>\r\n                          <select value.bind=\"_INTEREST\" style=\"width:260px;\">\r\n                            <option repeat.for=\"item of _INTEREST_ARR\" value.bind=\"item.ref\">\r\n                                ${item.desc}\r\n                            </option>\r\n                        </select>\r\n                        </td>\r\n                      </tr>\r\n                      <tr>\r\n                        <td>Skill Talent</td>\r\n                        <td>\r\n                          <select value.bind=\"_SKILL_TALENT\" style=\"width:260px;\">\r\n                            <option repeat.for=\"item of _SKILL_TALENT_ARR\" value.bind=\"item.ref\">\r\n                                ${item.desc}\r\n                            </option>\r\n                        </select>\r\n                        </td>\r\n                      </tr>\r\n                    </table>\r\n                </td>\r\n              </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n      <div class=\"col-md-6\">\r\n        <strong>Characteristics</strong>\r\n        <table style=\"margin-left: 25px; \" class=\"classIEnable\">\r\n          <tbody>\r\n              <tr>\r\n                <td style=\"vertical-align: top;\">\r\n                  <table>\r\n                    <tr>\r\n                      <td>Height</td>\r\n                      <td>\r\n                          <input value.bind=\"_HEIGHT\" style=\"width: 260px;\" />\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td>Weight</td>\r\n                      <td>\r\n                          <input value.bind=\"_WEIGHT\" style=\"width: 260px;\" />\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td>Built</td>\r\n                      <td>\r\n                          <input value.bind=\"_BUILT\" style=\"width: 260px;\" />\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td>Eye Color</td>\r\n                      <td>\r\n                          <input value.bind=\"_EYE_COLOR\" style=\"width: 260px;\" />\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td>Hair Color</td>\r\n                      <td>\r\n                          <input value.bind=\"_HAIR_COLOR\" style=\"width: 260px;\" />\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td>Skintone</td>\r\n                      <td>\r\n                          <input value.bind=\"_SKINTONE\" style=\"width: 260px;\" />\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td>Vital Statistics</td>\r\n                      <td>\r\n                          <input value.bind=\"_VITAL_STATISTICS\" style=\"width: 260px;\" />\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td>Specific Characteristics Keyword</td>\r\n                      <td>\r\n                          <input value.bind=\"_SPECIFIC_CHAR\" style=\"width: 260px;\" />\r\n                      </td>\r\n                    </tr>\r\n                    <tr>\r\n                      <td>Talent Type</td>\r\n                      <td>\r\n                          <input value.bind=\"_TALENT_TYPE\" style=\"width: 260px;\" />\r\n                      </td>\r\n                    </tr>\r\n                  </table>\r\n                </td>\r\n              </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n      <input type=\"button\" class=\"btn btn-xs customButton\" click.trigger=\"search_on()\" value=\"SEARCH\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n  </div>\r\n</template>\r\n"; });
define('text!ppfcs/budget/guest.html', ['module'], function(module) { module.exports = "<template>\r\n            <require from=\"converters/filtercustom\"></require>\r\n            <require from=\"converters/signals\"></require>\r\n            <table class=\"table table-hover table-condensed table-bordered table-striped\" style=\"width:70%;\" ref=\"tblData\">\r\n                <thead>\r\n                    <tr><td class=\"colorCell\">PAY MODE</td>\r\n                        <td class=\"colorCell\">BUDGET</td>\r\n                        <td class=\"colorCell\">PAY MODE FACTOR</td>\r\n                        <td class=\"colorCell\">REMARKS</td>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr repeat.for=\"item of _cache_budget.GUEST | filtercustom:'visible':true:_signal\">\r\n                      <td> <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" class=\"pymnttrmclass\" value.bind=\"item.PAYMENT_TERM\" style=\"width:auto !important;\" blur.trigger=\"$parent.fnRegularBlurEvt(item,$index)\"  focus.trigger=\"$parent.fnRegularFocus($index,'TERM')\"/></td>\r\n                      <td> <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.INPUT_AMT_TMP\" blur.trigger=\"$parent.AmountBlur(item,'INPUT_AMT_TMP')\" class=\"text-right\" style=\"width:auto !important;\"/></td>\r\n                      <td>  <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.PAY_RATE_FACTOR_TMP\"  blur.trigger=\"$parent.AmountBlur(item,'PAY_RATE_FACTOR_TMP')\" class=\"text-right\"  style=\"width:auto !important;\"/></td>\r\n                      <td> <textarea  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.REMARKS\" style=\"height:20px !important;\"></textarea></td>\r\n                </tr>\r\n                </tbody>\r\n            </table>  \r\n              <button class=\"btn btn-xs customButton\" if.bind=\"_enableAdd\" click.delegate=\"fnAddGuest()\" disabled.bind=\"_cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\">Add Guest</button>\r\n              <button class=\"btn btn-xs customButton\" if.bind=\"_enableRemove\"click.delegate=\"fnRemoveGuest()\" disabled.bind=\"_cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\">Remove Guest</button>\r\n              <button class=\"btn btn-xs customButton\" click.delegate=\"saveGuest()\" disabled.bind=\"_cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\">Save</button>\r\n</template>"; });
define('text!ppfcs/budget/main-header.html', ['module'], function(module) { module.exports = "<template>\r\n    <!-- <require from=\"modals/modalcontainer\"></require> -->\r\n    <!-- <require from=\"modals/confirm_dialog\"></require> -->\r\n\r\n    <require from=\"converters/datepattern\"></require>\r\n   \r\n     <table style=\"margin-left: 25px; \" class=\"classIEnable\">\r\n            <tbody >\r\n                <tr>\r\n                    <td style=\"vertical-align: top;\">\r\n                        <table>\r\n                             <tr>\r\n                                <td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\" >Budget ID</td>\r\n                                <td>\r\n                                 <input value.bind=\"_cache_budget.HEADER.BDGT_TMPL_ID\" style=\"width: 80px;\" keyup.delegate=\"inputChanged($event,_cache_budget.HEADER.BDGT_TMPL_ID)\" readonly.bind=\"_disableBudgetId\"/>\r\n                                 <!-- <modalcontainer to.bind=\"modalBudget\"></modalcontainer> -->\r\n                                 <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"budgetDisabled\" click.trigger=\"fnDialogBudget()\" value=\"SEARCH\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n                             </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td style=\"width: 120px;\">Program Name/CC</td>\r\n                                <td style=\"width: auto;\">\r\n                                    <input readonly=\"readonly\" value.bind=\"_cache_budget.HEADER.PROGRAM_MSTR.PROGRAM_TITLE\"style=\"width: 250px;\"/>*\r\n                                    <!-- <modalcontainer to.bind=\"modalProgram\"></modalcontainer> -->\r\n                                    <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"programDisabled\" click.trigger=\"fnDialogProgram()\" value=\"..\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>Program IO/CC#</td>\r\n                                <td>\r\n                                    <input value.bind=\"_cache_budget.HEADER.CHARGE_CD\" readonly=\"readonly\" /></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>Program Genre</td>\r\n                                <td>\r\n                                    <select value.bind=\"_cache_budget.HEADER.PROGRAM_GENRE_CD\" disabled.bind=\"_cache_budget.STATUS=='APPROVED'\">\r\n                                        <option repeat.for=\"item of _PROGRAM_GENRE_MSTR\" value.bind=\"item.PROGRAM_GENRE_CD\">\r\n                                            ${item.PROGRAM_GENRE_CD}\r\n                                        </option>\r\n                                    </select>*\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>Telecast Mode</td>\r\n                                <td>\r\n                                      <select value.bind=\"_cache_budget.HEADER.TELECAST_MODE_CD\" disabled.bind=\"_cache_budget.STATUS=='APPROVED'\">\r\n                                        <option repeat.for=\"item of _TELECAST_MODE_MSTR\" value.bind=\"item.TELECAST_MODE_CD\">\r\n                                            ${item.TELECAST_MODE_CD}\r\n                                        </option>\r\n                                    </select>*\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>Episode Type</td>\r\n                                <td>\r\n                                       <select value.bind=\"_cache_budget.HEADER.EPISODE_TYPE_CD\" disabled.bind=\"_cache_budget.STATUS=='APPROVED'\">\r\n                                        <option repeat.for=\"item of _EPISODE_TYPE_MSTR\" value.bind=\"item.EPISODE_TYPE_CD\">\r\n                                            ${item.EPISODE_TYPE_CD}\r\n                                        </option>\r\n                                    </select>*\r\n                                    </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>No. of Episodes</td>\r\n                                <td>\r\n                                    <input value.bind=\"_cache_budget.HEADER.EPISODES\" class=\"col-md-3 text-right\" readonly.bind=\"_cache_budget.STATUS=='APPROVED'\"/>*</td>\r\n                            </tr>\r\n                             <tr>\r\n                                <td>No. of Taping days</td>\r\n                                <td>\r\n                                    <input value.bind=\"_cache_budget.HEADER.TAPING_DAYS\" readonly.bind=\"_cache_budget.STATUS=='APPROVED'\" class=\"col-md-3 text-right\"/>*</td>\r\n                            </tr>\r\n                        </table>\r\n                    </td>\r\n                    <td style=\"vertical-align: top; text-align: left; margin: 0px 0px 0px 0px;\">\r\n                        <table style=\"padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px;\">\r\n                            <tr>\r\n                                <td class=\"text-center\" colspan=2><strong>Template Validity</strong></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>Start Date</td>\r\n                                <td>\r\n                                    <input id=\"refFrom\"  readonly.bind=\"_cache_budget.STATUS=='APPROVED'\" value.bind=\"_cache_budget.HEADER.BDGT_FROM\" blur.trigger=\"checkDate('refFrom')\"/>*\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>End Date</td>\r\n                                <td>\r\n                                    <!-- trigger does not accept '', set the string id w/out '' -->\r\n                                   <input id=\"refTo\" readonly.bind=\"_cache_budget.STATUS=='APPROVED'\" value.bind=\"_cache_budget.HEADER.BDGT_TO\" blur.trigger=\"checkDate('refTo')\"/>*</td>\r\n                            </tr>\r\n                             <tr><td colspan=2 style=\"height:20px;\"></td></tr>\r\n                            <tr>\r\n                                <td>TV Station</td>\r\n                                <td>\r\n                                   <select disabled.bind=\"_cache_budget.STATUS=='APPROVED'\" value.bind=\"_cache_budget.HEADER.STATION_ID\">\r\n                                        <option repeat.for=\"item of _STATIONS\" value.bind=\"item\">\r\n                                            ${item}\r\n                                        </option>\r\n                                    </select>(For <strong>RNG</strong>*)\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>Status</td>\r\n                                <td>\r\n                                     <select value.bind=\"_cache_budget.HEADER.APPR_STAT_CD\" disabled.bind=\"_cache_budget.STATUS=='APPROVED'\">\r\n                                        <option repeat.for=\"item of _STATUS\" value.bind=\"item.REF_CD\">\r\n                                            ${item.REF_DESC}\r\n                                        </option>\r\n                                    </select>*\r\n                                     <!-- value.bind=\"options: EPISODE_MODE_LIST, EPISODE_MODE_SELECTED, optionsText: 'text'\" -->\r\n                                </td>\r\n                            </tr>\r\n                             <tr>\r\n                                <td>Remarks</td>\r\n                                <td rowspan=3>\r\n                                    <textarea readonly.bind=\"_cache_budget.STATUS=='APPROVED'\" value.bind=\"_cache_budget.HEADER.REMARKS\" style=\"width:200px!important;\" >\r\n                                    </textarea>\r\n                                </td>\r\n                            </tr>\r\n                        </table>\r\n                    </td>\r\n\r\n                </tr>\r\n\r\n            </tbody>\r\n        </table>\r\n        <br/>\r\n        <br/>\r\n        <div style=\"margin-left:350px;\"><h5>( <strong>Note</strong> : * is required )</h2></div>\r\n        <br/>\r\n        <br/>\r\n        <br/>   \r\n        <br/>\r\n        <div style=\"margin-left:100px;\">\r\n            <button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnBudget('create')\" disabled.bind=\"_disableCreateBudget\" if.bind=\"!_disableCreateBudget\">CREATE BUDGET</button>&nbsp;&nbsp;\r\n        <button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnBudget('cancel')\" disabled.bind=\"_disableCancelBudget\">CLEAR/CANCEL</button>&nbsp;&nbsp;\r\n        <button class=\"btn btn-xs customButton\" if.bind=\"_cache_budget.STATUS!='APPROVED'\" style=\"width:150px;\" click.delegate=\"fnBudget('refresh')\" disabled.bind=\"_disableRefreshBudget\">REFRESH</button>&nbsp;&nbsp;\r\n        <button class=\"btn btn-xs customButton\" if.bind=\"_cache_budget.HEADER.APPR_STAT_CD!='APP-EXPIRED'\" style=\"width:150px;\" click.delegate=\"fnBudget('save')\" if.bind=\"!_disableSaveBudget\" disabled.bind=\"_disableSaveBudget\">SAVE BUDGET</button>\r\n        <button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnBudget('print')\" disabled.bind=\"_disablePrintBudget\" disabled.bind=\"!_disablePrintBudget\">PRINT BUDGET</button>\r\n        <button if.bind=\"_cache_budget.HEADER.APPR_STAT_CD=='APP-EXPIRED' || _cache_budget.HEADER.APPR_STAT_CD=='APP-CLOSED'\" class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnBudget('copy')\" disabled.bind=\"_disableCopyBudget\">COPY TEMPLATE</button>\r\n        <button if.bind=\"_cache_budget.STATUS=='APPROVED'\"  class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnBudget('close')\" disabled.bind=\"_disablePrintBudget\">SET AS CLOSED</button>\r\n         <!-- <confirm_dialog to.bind=\"modalConfirm\"></confirm_dialog> -->\r\n        </div>\r\n              <br/>\r\n        <br/>\r\n        <br/>   \r\n        <br/>\r\n\r\n        \r\n \r\n</template>"; });
define('text!ppfcs/budget/mainview.html', ['module'], function(module) { module.exports = " \r\n\r\n <template>\r\n\r\n <!-- <require from=\"modals/modalcontainer\"></require> -->\r\n <require from=\"ppfcs/budget/main-header\"></require>\r\n <require from=\"ppfcs/budget/personnel\"></require>\r\n <require from=\"ppfcs/budget/guest\"></require>\r\n <require from=\"ppfcs/budget/summary\"></require>\r\n    <br/>\r\n      \r\n <!--stylemainstayft:20px;margin-right:20px;margin-bottom:10px;margin-top:10px;\"-->\r\n     <div class=\"divBackground\" style=\"margin-left:10%;width:1035px;height: 686px;\">\r\n          <!-- Nav tabs -->\r\n          <ul class=\"nav nav-tabs backroundTab\" role=\"tablist\" style=\"width:1024px;height:38px;\">\r\n              <li role=\"presentation\" class=\"active\" ><a href=\"#main\" aria-controls=\"main\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab(0)\">Program Budget</a></li>\r\n              <li role=\"presentation\" style=\"\"><a href=\"#regular\" aria-controls=\"regular\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab(1)\" disabled.bind=\"_cache_budget.STATUS=='NONE'\" >Regular</a>\r\n              </li>\r\n              <li role=\"presentation\" style=\"\"><a href=\"#semi_regular\" aria-controls=\"semi_regular\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab(2)\" disabled.bind=\"_cache_budget.STATUS=='NONE'\">Semi-Regular</a></li>\r\n              <li role=\"presentation\" style=\"\"><a href=\"#staff\" aria-controls=\"staff\" role=\"tab\" data-toggle=\"tab\" click.trigger=\"clickTab(3)\" style=\"margin-top:6px;\" disabled.bind=\"_cache_budget.STATUS=='NONE'\">Staff</a></li>\r\n              <li role=\"presentation\" style=\"\"><a href=\"#guest\" aria-controls=\"guest\" role=\"tab\" data-toggle=\"tab\" click.trigger=\"clickTab(4)\" style=\"margin-top:6px;\" disabled.bind=\"_cache_budget.STATUS=='NONE'\">Guest</a></li>\r\n              <li role=\"presentation\" style=\"\"><a href=\"#summary\" aria-controls=\"summary\" role=\"tab\" data-toggle=\"tab\"click.trigger=\"clickTab(5)\" style=\"margin-top:6px;\" disabled.bind=\"_cache_budget.STATUS=='NONE'\">Budget Summary</a></li>\r\n          </ul>\r\n\r\n          <!-- Tab panes -->\r\n          <div class=\"tab-content\">\r\n              <div role=\"tabpanel\" class=\"tab-pane active color1\" id=\"main\"  style=\"width:1024px;height:620px;\"><br/><main-header></main-header>\r\n                <br/>\r\n                <br/>\r\n                <br/>\r\n          <!--<div style=\"margin-left:40%;\">\r\n             <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"loginDisabled\" value=\"LOG-IN\" style=\"padding-left:15px;padding-right:15px;\" click.trigger=\"fnLogin()\"/>\r\n                   <input type=\"button\" click.trigger=\"logout()\" value=\"LOG-OUT\"  disabled.bind=\"logoutDisabled\"  css=\"visibility: ${showingLogout}\" class=\"btn btn-xs customButton\"> \r\n          </div>-->\r\n\r\n              <div style=\"margin-left:25%;\">\r\n                <br/>\r\n                <br/>\r\n              <table class= \"table-bordered\">\r\n                <tr>\r\n                    <td>\r\n                        CREATED BY:\r\n                    </td>\r\n                    <td>\r\n                        ${_cache_budget.HEADER.CREATED_BY}\r\n                    </td>\r\n                    <td>\r\n                        LAST UPDATED BY:\r\n                    </td>\r\n                    <td>\r\n                        ${_cache_budget.HEADER.LAST_UPDATED_BY}\r\n                    </td>\r\n                    <!--<td>\r\n                        LOGGED AS:\r\n                    </td>\r\n                    <td>\r\n                        <strong>${_cache_budget.USER.USER_ID}</strong> \r\n                    </td>-->\r\n                    </tr>\r\n              </table>\r\n              </div>\r\n\r\n              </div>\r\n              <div role=\"tabpanel\" class=\"tab-pane color1\" id=\"regular\" style=\"width:1024px;\"><personnel to-person.bind=\"_cache_budget.REGULAR\" to-person-model.bind=\"{USE:'REGULAR'}\" ></personnel></div>\r\n              <div role=\"tabpanel\" class=\"tab-pane color1\" id=\"semi_regular\" style=\"width:1024px;\"><personnel to-person.bind=\"_cache_budget.SEMI_REGULAR\" to-person-model.bind=\"{USE:'SEMI_REGULAR'}\"></personnel></div>\r\n              <div role=\"tabpanel\" class=\"tab-pane color1\" id=\"staff\" style=\"width:1024px;\"><personnel to-person.bind=\"_cache_budget.STAFF\"to-person-model.bind=\"{USE:'STAFF'}\"></personnel></div>\r\n              <div role=\"tabpanel\" class=\"tab-pane color1\" id=\"guest\"  style=\"width:1024px;\"><guest></guest></div>\r\n              <div role=\"tabpanel\" class=\"tab-pane color1\" id=\"summary\" style=\"width:1024px;\">\r\n                <summary></summary>\r\n              </div>\r\n          </div>\r\n            \r\n      </div>\r\n      \r\n    \r\n   <!-- <div class=\"well\">\r\n        <div class=\"input-append date\" id=\"dp3\" data-date=\"12-02-2012\" data-date-format=\"dd-mm-yyyy\">\r\n        <input class=\"span2\" size=\"16\" type=\"text\" value=\"12-02-2012\" readonly=\"\">\r\n        <span class=\"add-on\"><i class=\"icon-calendar\"></i></span>\r\n        </div>\r\n    </div> -->\r\n\r\n\r\n </template>\r\n"; });
define('text!ppfcs/budget/personnel.html', ['module'], function(module) { module.exports = "<template>\r\n  <!-- <require from=\"modals/modalcontainer\"></require> -->\r\n  <require from=\"converters/number-format\"></require>\r\n  <require from=\"converters/filtercustom\"></require>\r\n  <require from=\"converters/signals\"></require>\r\n                <div style=\"overflow:scroll;height:600px !important; padding-left:10px;padding-top:10px;!important; \" scroll.trigger=\"scrollDiv()\" ref=\"divRegular\">\r\n                 <table class= \"table-hover table-condensed table-bordered table-striped\" style=\"position:absolute;z-index:1000;visibility:hidden;top:100px;\" ref=\"tblHeader\" scroll.trigger=\"scrollDiv()\" >\r\n                <thead>\r\n                    <tr>\r\n                      <td style=\"width:51px !important;background-color: white;\" class=\"text-center colorCell\">\r\n                        <div style=\"width:15px !important;cursor: pointer;\" class=\"fa fa-sort-up\" click.trigger=\"moveTrigger('up')\"></div>\r\n                        <div style=\"width:15px !important;cursor: pointer;\" class=\"fa fa-sort-desc\" click.trigger=\"moveTrigger('down')\"></div>\r\n                         </td>\r\n                      <td style=\"width:30px !important;background-color: white;\" class=\"text-center colorCell\">\r\n                        <div style=\"width:20px !important;cursor: pointer;\"  click.trigger=\"collapse_expand_head()\"><strong>${_ce_head}</strong></div></td>\r\n                      <td style=\"width:200px !important;background-color: white;\" class=\"colorCell\"><input placeholder=\"PERSONNEL NAME\" value.bind=\"_personnelSearch\" style=\"border:0px !important;\"/></td>\r\n                      <td style=\"width:130px !important;background-color: white;\" class=\"colorCell\">Job</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"colorCell\">Pay Mode</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"colorCell\">Pay Factor</td>\r\n                      <td style=\"width:110px !important;background-color: white;\" class=\"colorCell\">Contract</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"colorCell\">Rate</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"text-center colorCell\">Delete</td>\r\n                    </tr>\r\n                </thead>\r\n              </table>\r\n              <table class= \"table-hover table-condensed table-bordered table-striped\" onload=\"myFunction()\"  ref=\"tblData\">\r\n                <thead>\r\n                    <tr>\r\n                        <td style=\"width:51px !important;background-color: white;\" class=\"text-center colorCell\">\r\n                        <div style=\"width:15px !important;cursor: pointer;\" class=\"fa fa-sort-up\" click.trigger=\"moveTrigger('up')\"></div>\r\n                        <div style=\"width:15px !important;cursor: pointer;\" class=\"fa fa-sort-desc\"\" click.trigger=\"moveTrigger('down')\"></div>\r\n                         </td>\r\n                      <td style=\"width:30px !important;background-color: white;\" class=\"text-center colorCell\">\r\n                        <div style=\"width:20px !important;cursor: pointer;\"  click.trigger=\"collapse_expand_head()\"><strong>${_ce_head}</strong></div></td>\r\n                      <td style=\"width:200px !important;background-color: white;\" class=\"colorCell\"><input placeholder=\"PERSONNEL NAME\" value.bind=\"_personnelSearch\" style=\"border:0px !important;\"/></td>\r\n                      <td style=\"width:130px !important;background-color: white;\" class=\"colorCell\">Job</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"colorCell\" class=\"colorCell\">Pay Mode</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"colorCell\">Pay Factor</td>\r\n                      <td style=\"width:110px !important;background-color: white;\" class=\"colorCell\">Contract</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"colorCell\">Rate</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"text-center colorCell\">Delete</td>\r\n                    </tr>\r\n                </thead>\r\n                <tbody repeat.for=\"item of _Personnel | filtercustom:'visible':true:_signal \">\r\n                    <tr>\r\n                      <td style=\"width:41px !important;\"> \r\n                        <input disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" class=\"text-center\" value.one-way=\"$index+1\" style=\"width:40px !important;color:gray;border:0px;\" click.trigger=\"$parent.focusTrigger($index)\"/>\r\n                        </td>\r\n                      <td style=\"width:5px !important;\">\r\n                        <button class=\"btn btn-xs \" click.trigger=\"$parent.collapse_expand(item)\">${item.ce_value}</button></td>\r\n                      <td style=\"width:5px !important;\" if.bind=\"item.GLOBAL_ID\">${item.PERSONNEL_NAME}</td>\r\n                      <td style=\"width:5px !important;\" if.bind=\"!item.GLOBAL_ID\"><input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.BLANK_PERSONNEL_NAME\"/></td>\r\n                      <td style=\"width:5px !important;\">\r\n                         <input readonly disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" class=\"jobclass\" value.bind=\"item.JOB_DESC\" style=\"width:120px !important;\" blur.trigger=\"$parent.fnRegularBlurEvt(item,'JOB', $index, item.BDGT_TMPL_DTL_ID)\" focus.trigger=\"$parent.fnRegularFocus($index,'JOB')\" />\r\n                      </td>   \r\n                      <td style=\"width:100px !important;\">\r\n                         <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" class=\"pymnttrmclass\" value.bind=\"item.PAYMENT_TERM\" style=\"width:90px !important;\" blur.trigger=\"$parent.fnRegularBlurEvt(item,'TERM', $index)\" focus.trigger=\"$parent.fnRegularFocus($index,'TERM')\"/>\r\n                      </td>\r\n                      <td style=\"width:50px !important;\" class=\"text-right  \">\r\n                                  <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.PAY_RATE_FACTOR_TMP\"  blur.trigger=\"$parent.AmountBlur(item,'PAY_RATE_FACTOR_TMP')\" class=\"text-right\"  style=\"width:90px !important;\"/>\r\n                        </td>\r\n\r\n                      <td class=\"text-right \" style=\"width:110px !important;\" >\r\n                        <!-- ${item.CONFIDENTIAL_TMP}\r\n                        ${$parent._cache_budget.ALLOW_PASS_CONFIDENTIAL} -->\r\n                          <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.CONTRACT_AMT_TMP\"   blur.trigger=\"$parent.AmountBlur(item,'CONTRACT_AMT_TMP')\" class=\"text-right\" style=\"width:90px !important;\"/>\r\n                      </td>\r\n                      <td style=\"width:100px !important;\" class=\"text-right \">\r\n                        <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.INPUT_AMT_TMP\" blur.trigger=\"$parent.AmountBlur(item,'INPUT_AMT_TMP')\" class=\"text-right\" style=\"width:90px !important;\"/>\r\n                      </td>\r\n                      <!-- click.delegate=\"$parent.chkRemove(item)\" -->\r\n                      <td style=\"width:100px !important;\" class=\"text-center\" >\r\n                          <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\"type=\"checkbox\" checked.bind=\"item.REMOVE\" if.bind=\"item.BDGT_TMPL_DTL_ID && $parent.fnCheckExistingTalents(item.TALENTS,item)\"/>\r\n                          <button class=\"btn btn-xs\" click.trigger=\"$parent.removeRegular($index)\"  if.bind=\"!item.BDGT_TMPL_DTL_ID\">-</button>\r\n                      </td>\r\n                    </tr>\r\n                     <tr>\r\n                      <td colspan=9 style.bind=\"item.styleString\">\r\n                        <div>\r\n                         <table style=\"margin-left:10px !important;\" class=\"table-hover table-condensed table-bordered table-striped\">\r\n                          <tr>\r\n                            <td>CATEGORY</td>\r\n                            <td>CONFIDENTIAL</td>\r\n                            <td>STAFF WORK</td>\r\n                            <td>REMARKS</td>\r\n                            <td>TALENT MANAGER</td>\r\n                            <!-- <td>TALENTS</td> -->\r\n                            <td if.bind=\"!item.PERSONNEL_NAME\">IS POOL</td>\r\n                          </tr>\r\n                          <tr>\r\n                            <td>${item.CATEGORY_DESC}</td>\r\n                            <td class=\"text-center\">\r\n                               <!-- if.bind=\"$parent._cache_budget.ALLOW_PASS_CONFIDENTIAL\" -->\r\n                               <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" type=\"checkbox\" checked.bind=\"item.CONFIDENTIAL_TMP\" />\r\n                            </td>\r\n                            <td>\r\n                              <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" type=\"checkbox\" checked.bind=\"item.STAFF_WORK_TMP\"/>\r\n                            </td>\r\n                            <td>\r\n                              <textarea  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.REMARKS\" style=\"height:20px !important;\"></textarea>\r\n                            </td>\r\n                            <td> \r\n                                <button  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" class=\"btn btn-xs\" if.bind=\"!item.TALENT_MANAGER.PERSONNEL_NAME\" click.trigger=\"$parent.showTalentMngr(item)\" >+</button>\r\n                                <button  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" class=\"btn btn-xs\" if.bind=\"item.TALENT_MANAGER.PERSONNEL_NAME\" click.trigger=\"$parent.removeTalentMngr(item)\">-</button>\r\n                            </td>\r\n                           <!--  <td>\r\n                                 <table class=\"table-hover table-condensed table-bordered table-striped\">\r\n                                    <thead>\r\n                                      <tr>\r\n                                        <td>NAME</td> \r\n                                        <td><button class=\"btn btn-xs\" click.trigger=\"$parent.showTalents(item)\" >+</button>\r\n                                            \r\n                                        </td>\r\n                                      </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                      <tr repeat.for=\"itemTalent of item.TALENTS\">\r\n                                        <td>${itemTalent.PERSONNEL_NAME}</td>\r\n                                        <td><button class=\"btn btn-xs\" click.trigger=\"$parent.$parent.removeTalent($parent,itemTalent,$index)\">-</button></td>\r\n                                      </tr>\r\n                                    </tbody>\r\n                                 </table>\r\n                            </td> -->\r\n                            <td if.bind=\"!item.PERSONNEL_NAME\"> <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" type=\"checkbox\" checked.bind=\"item.POOL_RECORD_TMP\"/></td>\r\n                          </tr>\r\n                        </table>\r\n                        </div>\r\n                         <div if.bind=\"item.TALENT_MANAGER.PERSONNEL_NAME\" style=\"margin-left:20%;margin-top:5px;\">\r\n                              <table style=\"margin-topin-left:10px !important;\" class=\"table-hover table-condensed table-bordered table-striped\">\r\n                              <tr>\r\n                              <td class=\"colorCell\">Talent Manager</td>\r\n                              <td class=\"colorCell\">Pay Factor</td>\r\n                              <td class=\"colorCell\">Contract</td>\r\n                              <td class=\"colorCell\">Rate</td>\r\n                              <td class=\"colorCell\">Remarks</td>\r\n                              </tr>\r\n                              <tr>\r\n                                   <td> ${item.TALENT_MANAGER.PERSONNEL_NAME}</td>\r\n                               <td style=\"width:50px !important;\" class=\"text-right  \">\r\n                                  <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.TALENT_MANAGER.PAY_RATE_FACTOR_TMP\"  blur.trigger=\"$parent.AmountBlur(item.TALENT_MANAGER,'PAY_RATE_FACTOR_TMP')\" class=\"text-right\"  style=\"width:90px !important;\"/>\r\n                        </td>\r\n\r\n                      <td class=\"text-right \" style=\"width:110px !important;\" >\r\n                          <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.TALENT_MANAGER.CONTRACT_AMT_TMP\"   blur.trigger=\"$parent.AmountBlur(item.TALENT_MANAGER,'CONTRACT_AMT_TMP')\" class=\"text-right\" style=\"width:90px !important;\"/>\r\n                      </td>\r\n                      <td style=\"width:100px !important;\" class=\"text-right \">\r\n                        <input   disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\"value.bind=\"item.TALENT_MANAGER.INPUT_AMT_TMP\" blur.trigger=\"$parent.AmountBlur(item.TALENT_MANAGER,'INPUT_AMT_TMP')\" class=\"text-right\" style=\"width:90px !important;\"/>\r\n                      </td>\r\n                    <td style=\"width:100px !important;\" class=\"text-right \">\r\n                        <input  disabled.bind=\"$parent._cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.TALENT_MANAGER.REMARKS\" style=\"width:90px !important;\"/>\r\n                      </td>\r\n                              </tr>\r\n\r\n                              </table>\r\n                          </div>  \r\n                      </td>\r\n                    </tr>\r\n               </tbody>\r\n            </table>\r\n            </div>\r\n           \r\n            <!-- ${_Personnel.length} -->\r\n            \r\n                \r\n               <div style=\"position:absolute;top:20px;left:0px;\">\r\n                <!-- <modalcontainer style=\"text-align:left;\" to.bind=\"modalIndivMstrTalents\" ></modalcontainer>\r\n                <modalcontainer style=\"text-align:left;\" to.bind=\"modalIndivMstrManager\" ></modalcontainer>\r\n                <modalcontainer to.bind=\"modalJob\"></modalcontainer> -->\r\n         <!--        <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"isIndivMstrTalentsDisabled\" click.trigger=\"fnIndivMstrTalents()\" value=\"+\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n                <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"isIndivMstrManagerDisabled\"  click.trigger=\"fnIndivMstrManager()\"  value=\"+\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n                <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"isJobDisabled\"  click.trigger=\"fnModalJob()\" value=\"..\" style=\"padding-left:15px;padding-right:15px;\"/> -->\r\n\r\n               </div>   \r\n               <table>\r\n                <tr>\r\n                  <td>\r\n                    <!-- <modalcontainer style=\"text-align:left;\" to.bind=\"modalIndivMstr\"> --></modalcontainer>\r\n                     <input type=\"button\" class=\"btn btn-xs customButton\"  disabled.bind=\"isIndivMstrDisabled\"  click.trigger=\"fnIndivMstrManager()\" value=\"Search Personnel\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n                  </td>\r\n                <td><button class=\"btn btn-xs customButton\" click.delegate=\"fnBlankPersonnelRegular()\"  disabled.bind=\"_cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\">Blank Personnel</button></td>\r\n                <td><button class=\"btn btn-xs customButton\" click.delegate=\"savePersonnel(0)\"  disabled.bind=\"_cache_budget.HEADER.APPR_STAT_CD!='APP-DRAFT'\">Save</button></td>\r\n               \r\n               \r\n                <td if.bind=\"toPersonModel.USE=='REGULAR'\" style=\"display:compact;text-align:right;width:525px;margin-left:100px;margin-right:0px !important;padding:0px !important;position: relative;\">(Regular) <strong>TOTAL</strong> : <input value.bind=\"_cache_budget._INPUT_AMT_REGULAR\" class=\"text-right\" readonly style=\"width:110px;font-weight:bold;\"  /></td>\r\n\r\n                <td if.bind=\"toPersonModel.USE=='SEMI_REGULAR'\" style=\"display:compact;text-align:right;width:525px;margin-left:100px;margin-right:0px !important;padding:0px !important;position: relative;\">(Semi-Regular) <strong>TOTAL</strong> : <input value.bind=\"_cache_budget._INPUT_AMT_SEMI_REGULAR\" class=\"text-right\" readonly style=\"width:110px;font-weight:bold;\"  /></td>\r\n\r\n               <td if.bind=\"toPersonModel.USE=='STAFF'\" style=\"display:compact;text-align:right;width:525px;margin-left:100px;margin-right:0px !important;padding:0px !important;position: relative;\">(Staff) <strong>TOTAL</strong> : <input value.bind=\"_cache_budget._INPUT_AMT_STAFF\" class=\"text-right\" readonly style=\"width:110px;font-weight:bold;\"  /></td>\r\n\r\n                </tr>\r\n                </table>\r\n\r\n</template>\r\n"; });
define('text!ppfcs/budget/summary.html', ['module'], function(module) { module.exports = "<template>\r\n\t\t\t<table class= \"table-hover table-condensed table-bordered table-striped\" style=\"margin-left:50px;margin-top:40px;margin-botton:20px;\">\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td style=\"width:150px;\">\r\n\t\t\t\t\t\t\t<strong>CLASSIFICATION</strong>\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t\t<td style=\"width:150px;text-align:center;\">\r\n\t\t\t\t\t\t\t<strong>TOTAL PROGRAM</strong>\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\tMAINSTAY\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t\t<td style=\"text-align:right;\">\r\n\t\t\t\t\t\t\t${_INPUT_AMT_MAINSTAY}\t\t\t\t\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\tSTAFF\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t\t<td style=\"text-align:right;\">\r\n\t\t\t\t\t\t\t${_INPUT_AMT_STAFF}\t\t\t\t\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t</tr>\r\n\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\tGUEST\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t\t<td style=\"text-align:right;\">\r\n\t\t\t\t\t\t\t${_INPUT_AMT_GUEST}\t\t\t\t\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<strong>TOTAL</strong>\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t\t<td style=\"text-align:right;border-top-width:3px;\">\r\n\t\t\t\t\t\t\t<strong>${_INPUT_AMT_TOTAL}</strong>\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t</tr>\t\t\t\t\t\r\n\t\t\t</table>\r\n            <br/>\r\n</template>"; });
define('text!ppfcs/actual_cost/actual_cost.html', ['module'], function(module) { module.exports = "<template>\r\n    <iframe src=\"http://localhost:15253\" style=\"width:100%;height:100%;border:0px;margin-top:20px;\"></iframe>\r\n  <!-- <iframe src=\"http://absppms2:8084\" style=\"width:100%;height:100%;border:0px;margin-top:20px;\"></iframe> -->\r\n  </template>"; });
//# sourceMappingURL=app-bundle-6ceeb7fe37.js.map