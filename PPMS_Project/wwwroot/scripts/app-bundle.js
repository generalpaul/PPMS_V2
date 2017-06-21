define('actual_cost',['exports', 'aurelia-framework', 'objBudget', './settings'], function (exports, _aureliaFramework, _objBudget, _settings) {
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

    var actual_cost = exports.actual_cost = (_dec = (0, _aureliaFramework.inject)(_objBudget.objBudget), _dec(_class = function actual_cost(objBudget) {
        _classCallCheck(this, actual_cost);

        this._objBudget = objBudget;
    }) || _class);
});
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
      config.map([{ route: ['', 'blankpage'], name: 'blankpage', moduleId: 'blankpage', nav: true, title: 'PPMS' }, { route: 'mainpage', name: 'mainpage', moduleId: 'mainpage', nav: true, title: 'Main Page' }, { route: 'mainview', name: 'mainview', moduleId: 'mainview', nav: true, title: 'Budget Template' }, { route: 'group_individual', name: 'group_individual', moduleId: 'group_individual', nav: true, title: 'Talent Groups' }, { route: 'actual_cost', name: 'actual_cost', moduleId: 'actual_cost', nav: true, title: 'Actual Cost' }, { route: 'buh', name: 'buh', moduleId: 'buh', nav: true, title: 'BUH' }]);

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
define('buh',['exports', './entity-manager-factory', './helpers', './masterfiles', 'toastr', 'aurelia-framework', 'helpers', 'typeahead', 'underscore', 'modals/buh-program-dialog', 'aurelia-dialog', 'modals/login', 'modals/buh-search', 'objBudget'], function (exports, _entityManagerFactory, _helpers, _masterfiles, _toastr, _aureliaFramework, _helpers2, _typeahead, _underscore, _buhProgramDialog, _aureliaDialog, _login, _buhSearch, _objBudget) {
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

	var buh = exports.buh = (_dec = (0, _aureliaFramework.inject)(_objBudget.objBudget, _aureliaDialog.DialogService), _dec(_class = function () {
		function buh(objBudget, DialogService) {
			_classCallCheck(this, buh);

			this._objBUH = { PROGRAMS: [] };
			this._objBudget = null;
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
			this._objBudget = objBudget;

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

      _breezeClient2.default.config.initializeAdapterInstance('dataService', 'webApiOData', true);
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
define('group_individual',['exports', './helpers', './entity-manager-factory', './masterfiles', 'toastr', 'aurelia-framework', 'helpers', 'typeahead', 'underscore', 'multi-observer', 'objBudget', 'aurelia-dialog', 'modals/login', 'modals/globalindivmstr', 'modals/talentmanagergroups', './settings'], function (exports, _helpers, _entityManagerFactory, _masterfiles, _toastr, _aureliaFramework, _helpers2, _typeahead, _underscore, _multiObserver, _objBudget, _aureliaDialog, _login, _globalindivmstr, _talentmanagergroups, _settings) {
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

	var group_individual = exports.group_individual = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _objBudget.objBudget, _aureliaDialog.DialogService), _dec(_class = function () {
		function group_individual(multiObserver, objBudget, dialogService) {
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


			this._objBudget = objBudget;
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
define('guest',['exports', 'aurelia-framework', 'objBudget', './entity-manager-factory', './masterfiles', 'helpers', 'typeahead', './settings', 'underscore', 'numeral', 'toastr', 'multi-observer', 'modals/paymentterm', 'aurelia-dialog'], function (exports, _aureliaFramework, _objBudget, _entityManagerFactory, _masterfiles, _helpers, _typeahead, _settings, _underscore, _numeral, _toastr, _multiObserver, _paymentterm, _aureliaDialog) {
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

  var GuestCustomElement = exports.GuestCustomElement = (_dec = (0, _aureliaFramework.inject)(_objBudget.objBudget, _multiObserver.MultiObserver, _aureliaDialog.DialogService), _dec(_class = (_class2 = function () {
    function GuestCustomElement(objBudget, multiObserver, dialogService) {
      var _this = this;

      _classCallCheck(this, GuestCustomElement);

      _initDefineProp(this, 'to', _descriptor, this);

      this._objBudget = null;
      this._enableAdd = false;
      this._enableRemove = false;
      this.dialogService = null;

      if ((0, _entityManagerFactory.EntityManager)() === undefined) {
        return;
      }

      this._objBudget = objBudget;
      this.dialogService = dialogService;


      this._objBudget.OBSERVERS.budget_dialog.push(function (val) {
        _this.fnCheckBudget(val);
      });

      this._objBudget.OBSERVERS.copy_template_guest.push(function () {
        _this.fnCallCopy();
      });

      this._objBudget.OBSERVERS.reset_all.push(function () {
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
      this._objBudget.GUEST[0].PAYMENT_TERM = term.REF_DESC;
      this._objBudget.GUEST[0].PYMNT_TERM_CD = term.REF_CD;
    };

    GuestCustomElement.prototype.fnCheckBudget = function fnCheckBudget(value) {
      var _this3 = this;

      var _query = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_GUEST_DTL').where('BDGT_TMPL_ID', '==', value);
      (0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (found) {

        _this3._objBudget.GUEST = found.results;

        var varRefCd = [];

        _underscore2.default.each(_this3._objBudget.GUEST, function (item) {

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

        if (_this3._objBudget.GUEST.length == 0) _this3._enableAdd = true;else _this3._enableRemove = true;

        _this3._objBudget.OBSERVERS.reset_summary.forEach(function (all) {
          all();
        });

        if (_this3._objBudget.GUEST.length > 0) _toastr2.default.success("GUEST PERSONNEL", "Loading Successful.");
      });
    };

    GuestCustomElement.prototype.fnCallCopy = function fnCallCopy() {
      this.saveGuest();
    };

    GuestCustomElement.prototype.fnAddGuest = function fnAddGuest() {
      if (this._objBudget.GUEST.length > 0) {
        this._objBudget.GUEST[0].visible = true;
      } else this._objBudget.GUEST.push({ INPUT_AMT_TMP: (0, _numeral2.default)(0).format('0,0.00'), PAY_RATE_FACTOR_TMP: (0, _numeral2.default)(1).format('0,0.00'),
        INPUT_AMT: 0, PAY_RATE_FACTOR: 1, visible: true });

      this._enableAdd = false;
      this._enableRemove = true;
      this._signal = (0, _entityManagerFactory.generateID)();
    };

    GuestCustomElement.prototype.resetView = function resetView() {
      this._signal = (0, _entityManagerFactory.generateID)();
    };

    GuestCustomElement.prototype.fnRemoveGuest = function fnRemoveGuest() {
      if (this._objBudget.GUEST.length > 0) {
        this._objBudget.GUEST[0].visible = false;
      }

      this._enableAdd = true;
      this._enableRemove = false;
      this._signal = (0, _entityManagerFactory.generateID)();
    };

    GuestCustomElement.prototype.saveGuest = function saveGuest() {
      var _this4 = this;

      if (this._objBudget.GUEST.length > 0) {
        if (this._objBudget.GUEST[0].PYMNT_TERM_CD == "" || this._objBudget.GUEST[0] == undefined || this._objBudget.GUEST[0] == null) {
          _toastr2.default.error("<strong>Payment Term not defined</strong><br /><br />Saving cancelled.", "Problem occured");
          return;
        }
      }

      var getMax = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_GUEST_DTL').orderByDesc('BDGT_TMPL_GUEST_DTL_ID').take(1);
      (0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (successMax) {
        var getMax = 1;

        if (successMax.results.length > 0) getMax = successMax.results[0].BDGT_TMPL_GUEST_DTL_ID + 1;

        var _query = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_GUEST_DTL').where('BDGT_TMPL_ID', '==', _this4._objBudget.HEADER.BDGT_TMPL_ID);
        (0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (found) {

          if (_this4._objBudget.GUEST.length > 0) if (_this4._objBudget.GUEST[0].visible) {

            if (found.results.length > 0) {

              found.results[0].BDGT_AMT = parseFloat(_this4._objBudget.GUEST[0].INPUT_AMT_TMP.replace(/,/g, ''));
              found.results[0].PYMNT_TERM_CD = _this4._objBudget.GUEST[0].PYMNT_TERM_CD;
              found.results[0].INPUT_AMT = parseFloat(_this4._objBudget.GUEST[0].INPUT_AMT_TMP.replace(/,/g, ''));
              found.results[0].PAY_RATE_FACTOR = parseFloat(_this4._objBudget.GUEST[0].PAY_RATE_FACTOR_TMP.replace(/,/g, ''));
              found.results[0].REMARKS = _this4._objBudget.GUEST[0].REMARKS;

              found.results[0].LAST_UPDATED_BY = _this4._objBudget.USER.USER_ID;
              found.results[0].LAST_UPDATED_DT = new Date();
            } else {

              var varInsert = (0, _entityManagerFactory.EntityManager)().createEntity('BDGT_TMPL_GUEST_DTL', {
                BDGT_TMPL_GUEST_DTL_ID: getMax,
                PYMNT_TERM_CD: _this4._objBudget.GUEST[0].PYMNT_TERM_CD,
                INPUT_AMT: parseFloat(_this4._objBudget.GUEST[0].INPUT_AMT_TMP.replace(/,/g, '')),
                BDGT_AMT: parseFloat(_this4._objBudget.GUEST[0].INPUT_AMT_TMP.replace(/,/g, '')),
                PAY_RATE_FACTOR: parseFloat(_this4._objBudget.GUEST[0].PAY_RATE_FACTOR_TMP.replace(/,/g, '')),
                REMARKS: _this4._objBudget.GUEST[0].REMARKS,
                BDGT_TMPL_ID: _this4._objBudget.HEADER.BDGT_TMPL_ID,
                CREATED_BY: _this4._objBudget.USER.USER_ID,
                CREATED_DT: new Date()
              });

              (0, _entityManagerFactory.EntityManager)().addEntity(varInsert);
            }
          } else {
            if (found.results.length > 0) found.results[0].entityAspect.setDeleted();
          }

          (0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {
            _this4.fnCheckBudget(_this4._objBudget.HEADER.BDGT_TMPL_ID);
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
define('helpers',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
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
            options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option;
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
define('main-header',['exports', 'aurelia-framework', 'objBudget', './entity-manager-factory', './masterfiles', './settings', 'modals/modal-wizard', 'toastr', 'moment', 'underscore', 'multi-observer', 'aurelia-dialog', 'modals/program', 'modals/budget', 'modals/confirm_dialog', 'breeze-client'], function (exports, _aureliaFramework, _objBudget, _entityManagerFactory, _masterfiles, _settings, _modalWizard, _toastr, _moment, _underscore, _multiObserver, _aureliaDialog, _program, _budget, _confirm_dialog, _breezeClient) {
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

  var MainHeaderCustomElement = exports.MainHeaderCustomElement = (_dec = (0, _aureliaFramework.inject)(_objBudget.objBudget, _modalWizard.ModalWizard, _toastr2.default, _multiObserver.MultiObserver, _aureliaDialog.DialogService), _dec(_class = (_class2 = function () {
    function MainHeaderCustomElement(objBudget, ModalWizard, toastr, multiObserver, DialogService) {
      var _this = this;

      _classCallCheck(this, MainHeaderCustomElement);

      _initDefineProp(this, 'to', _descriptor, this);

      this._objBudget = null;
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
      this._objBudget = objBudget;

      this.LoginPassed(this._objBudget.USER);


      this._objBudget.OBSERVERS.budget_dialog.push(function (val) {
        _this.CloseBudgetDialog(val);
      });

      this._objBudget.OBSERVERS.pass_program.push(function (val) {
        _this.PassedProgram(val);
      });

      this._objBudget.OBSERVERS.budget_refresh.push(function () {
        _this.fnBudgetRefreshHandle();
      });

      this._objBudget.OBSERVERS.budget_loaded.push(function () {
        if (_this._disableSaveBudget == true) {
          _this._disableSaveBudget = false;
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

          _this._objBudget.HEADER.BDGT_FROM = $('#refFrom').val();
          if (_this._objBudget.HEADER.BDGT_TO == "") {
            _this._objBudget.HEADER.BDGT_TO = _this._objBudget.HEADER.BDGT_FROM;
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

          _this._objBudget.HEADER.BDGT_TO = $('#refTo').val();
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

        this._objBudget.OBSERVERS.budget_dialog.forEach(function (all) {
          all(_this2._objBudget.HEADER.BDGT_TMPL_ID);
        });
      }
    };

    MainHeaderCustomElement.prototype.speak = function speak() {
      console.log(this._objBudget);
    };

    MainHeaderCustomElement.prototype.speak1 = function speak1() {
      alert('Hello ' + this.to + '!');
    };

    MainHeaderCustomElement.prototype.LoginPassed = function LoginPassed(user) {

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
      alert(44);
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
      this._objBudget.HEADER = {
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

      while (this._objBudget.REGULAR.length > 0) {
        this._objBudget.REGULAR.pop();
      }
      this._objBudget.REGULAR = [];

      while (this._objBudget.SEMI_REGULAR.length > 0) {
        this._objBudget.SEMI_REGULAR.pop();
      }
      this._objBudget.SEMI_REGULAR = [];

      while (this._objBudget.STAFF.length > 0) {
        this._objBudget.STAFF.pop();
      }
      this._objBudget.STAFF = [];

      while (this._objBudget.GUEST.length > 0) {
        this._objBudget.GUEST.pop();
      }

      this._objBudget.GUEST = [];

      this._objBudget.OBSERVERS.reset_summary.forEach(function (all) {
        all();
      });

      this._disableBudgetId = false;

      this._objBudget.OBSERVERS.reset_all.forEach(function (all) {
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

        _this3._objBudget.HEADER = found.results[0];

        _this3._objBudget.HEADER.BDGT_FROM = (0, _moment2.default)(new Date(_this3._objBudget.HEADER.BDGT_FROM)).format('MM-DD-YYYY');
        _this3._objBudget.HEADER.BDGT_TO = (0, _moment2.default)(new Date(_this3._objBudget.HEADER.BDGT_TO)).format('MM-DD-YYYY');

        _this3._disableBudgetId = true;

        _this3._disableCreateBudget = true;
        _this3._disableCancelBudget = false;
        _this3._disableRefreshBudget = false;

        _this3._objBudget._LOADING_BUDGET = 1;
        _this3._disableSaveBudget = true;

        _this3._disablePrintBudget = false;
        _this3._disableCopyBudget = false;

        _this3.budgetDisabled = true;


        if (_this3._objBudget.HEADER.APPR_STAT_CD == "APP-CLOSED") {
          _this3._STATUS = [{ REF_CD: "APP-CLOSED", REF_DESC: "APP-CLOSED" }];
          _this3._disableSaveBudget = true;
        } else if (_this3._objBudget.HEADER.APPR_STAT_CD == "APP-EXPIRED") {
          _this3._STATUS = [{ REF_CD: "APP-EXPIRED", REF_DESC: "APP-EXPIRED" }];
          _this3._disableSaveBudget = true;
          _this3._disablePrintBudget = true;
        } else if (_this3._objBudget.HEADER.APPR_STAT_CD == "APP-DRAFT") {

          _this3.programDisabled = false;


          _this3._objBudget.OBSERVERS.enable_approved.forEach(function (all) {
            all(true);
          });
        } else {

          _this3._objBudget.OBSERVERS.enable_approved.forEach(function (all) {
            all(false);
          });
        }

        if (_this3._objBudget.HEADER.APPR_STAT_CD == "APP-APPROVED") {

          _this3._objBudget.STATUS = "APPROVED";
          _this3._disableSaveBudget = true;

          _this3.programDisabled = true;
        } else _this3._objBudget.STATUS = "VIEW";

        _this3._objBudget.OBSERVERS.disable_search_personnel.forEach(function (all) {
          all(_this3._objBudget.HEADER.APPR_STAT_CD == "APP-DRAFT");
        });
      }, function (fail) {
        console.log(fail);
      });
    };

    MainHeaderCustomElement.prototype.PassedProgram = function PassedProgram(value) {
      this._objBudget.HEADER.PROGRAM_MSTR = value;
      this._objBudget.HEADER.CHARGE_CD = value.PROGRAM_CD;
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


            this._objBudget.STATUS = "CREATE";
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

            this._objBudget.STATUS = "NONE";
            break;
          }
        case "refresh":
          {

            this._disableCreateBudget = true;
            this._disableSaveBudget = false;
            this._disableCancelBudget = false;
            this._disableRefreshBudget = false;
            this._disablePrintBudget = true;

            this._objBudget.OBSERVERS.budget_dialog.forEach(function (all) {
              all(_this4._objBudget.HEADER.BDGT_TMPL_ID);
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
            if (this._objBudget.HEADER.APPR_STAT_CD == "APP-DRAFT") {
              varUseReport = "Draft";
            }
            if (this._objBudget.HEADER.APPR_STAT_CD == "APP-APPROVED") {
              varUseReport = "Approved";
            }

            if (varUseReport != "") {
              var popup = window.open(_settings2.default.ActualCostService + "/report/Budget_" + varUseReport + "_Report.aspx?BDID=" + this._objBudget.HEADER.BDGT_TMPL_ID + "&ConcealConfidentialBudgetAmt=" + this._objBudget.ALLOW_PASS_CONFIDENTIAL + "&USER_ACCOUNT=" + this._user + "&COMPANY_ID=" + this._COMPANY_ID, "popupWindow", "width=1280px,height=1024px,scrollbars=yes,directories=0,titlebar=0,toolbar=0,location=0,status=0,menubar=0,addressbar=0,fullscreen=false");
              popup.moveTo(0, 0);
            }

            break;
          }
        case "copy":
          {

            this.dialogService.open({ viewModel: _confirm_dialog.confirm_dialog, model: 'Copy Template?' }).whenClosed(function (response) {
              if (!response.wasCancelled) {

                var varGetHeader = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').where('BDGT_TMPL_ID', '==', _this4._objBudget.HEADER.BDGT_TMPL_ID);

                (0, _entityManagerFactory.EntityManager)().executeQuery(varGetHeader).then(function (found) {
                  found.results[0].APPR_STAT_CD = "APP-CLOSED";
                  (0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {

                    _this4._objBudget.HEADER.BDGT_TMPL_ID = "";
                    _this4._objBudget.HEADER.APPR_STAT_CD = "APP-DRAFT";
                    _this4._objBudget.STATUS = "DRAFT";
                    _this4._objBudget.IS_COPYING = true;

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

        var varAddMin = new Date(_this5._objBudget.HEADER.BDGT_TO);
        var varSubMin = new Date(_this5._objBudget.HEADER.BDGT_FROM);

        var p1 = _breezeClient2.default.Predicate.create('BDGT_FROM', '>=', new Date(varSubMin.getFullYear(), varSubMin.getMonth(), varSubMin.getDate() - 1));
        var p2 = _breezeClient2.default.Predicate.create('BDGT_TO', '<=', new Date(varAddMin.getFullYear(), varAddMin.getMonth(), varAddMin.getDate() + 1));
        var p3 = _breezeClient2.default.Predicate.create('BDGT_TMPL_ID', '!=', _this5._objBudget.HEADER.BDGT_TMPL_ID);
        var p4 = _breezeClient2.default.Predicate.create('EPISODE_TYPE_CD', '==', _this5._objBudget.HEADER.EPISODE_TYPE_CD);
        var pred = _breezeClient2.default.Predicate.and([p1, p2, p3, p4]);

        var _query = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').where(pred);
        (0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (found) {
          if (found.results !== undefined) {
            var countError = 0;
            found.results.forEach(function (all) {
              _toastr2.default.error("Budget can only be acceptable if date will be out of range of the last CLOSED/EXPIRED TEMPLATE");
              ++countError;
            });

            if (countError > 0) reject(false);else resolve(true);
          } else resolve(true);
        });
      });
    };

    MainHeaderCustomElement.prototype.fnBudgetValidation_2 = function fnBudgetValidation_2() {
      var _this6 = this;

      return new Promise(function (resolve, reject) {

        var varAddMin = new Date(_this6._objBudget.HEADER.BDGT_TO);
        var varSubMin = new Date(_this6._objBudget.HEADER.BDGT_FROM);

        var p3 = _breezeClient2.default.Predicate.create('BDGT_TMPL_ID', '!=', _this6._objBudget.HEADER.BDGT_TMPL_ID);
        var c1 = _breezeClient2.default.Predicate.create('BDGT_TMPL_HDR.PROGRAM_ID', '==', _this6._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_ID);

        var pred2 = _breezeClient2.default.Predicate.and([c1, p3]);
        var _queryCheckActual = (0, _entityManagerFactory.EntityQuery)().from('ACTUAL_COST_HDR').where(pred2).expand("BDGT_TMPL_HDR");
        (0, _entityManagerFactory.EntityManager)().executeQuery(_queryCheckActual).then(function (found) {

          if (found.results !== undefined) {

            var varPromises = [];
            found.results.forEach(function (all) {

              var newPromise = new Promise(function (resolve_2, reject_2) {

                var varTmpFrom = new Date(all.ACTUAL_FROM.getFullYear(), all.ACTUAL_FROM.getMonth(), all.ACTUAL_FROM.getDate());
                var varTmpTo = new Date(all.ACTUAL_TO.getFullYear(), all.ACTUAL_TO.getMonth(), all.ACTUAL_TO.getDate());

                if (varTmpFrom <= new Date(_this6._objBudget.HEADER.BDGT_FROM) && varTmpFrom >= new Date(_this6._objBudget.HEADER.BDGT_TO) || varTmpTo <= new Date(_this6._objBudget.HEADER.BDGT_FROM) && varTmpTo >= new Date(_this6._objBudget.HEADER.BDGT_TO) || varTmpFrom >= new Date(_this6._objBudget.HEADER.BDGT_TO) || varTmpFrom >= new Date(_this6._objBudget.HEADER.BDGT_FROM) && varTmpTo <= new Date(_this6._objBudget.HEADER.BDGT_TO)) {
                  _toastr2.default.error("Please enter range beyond the created budget (AC:" + all.ACTUAL_COST_ID + ")");
                  reject_2(false);
                }

                var _queryCheckVtr = (0, _entityManagerFactory.EntityQuery)().from('VTR_LIVE_DT_DTL').where('ACTUAL_COST_ID', '==', all.ACTUAL_COST_ID);
                (0, _entityManagerFactory.EntityManager)().executeQuery(_queryCheckVtr).then(function (foundVtr) {

                  if (foundVtr.results === undefined) {
                    resolve_2(true);
                  }

                  var varDataFromCompare = new Date(_this6._objBudget.HEADER.BDGT_FROM);
                  var varDataToCompare = new Date(_this6._objBudget.HEADER.BDGT_FROM);

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
        var p3 = _breezeClient2.default.Predicate.create('BDGT_TMPL_ID', '!=', _this7._objBudget.HEADER.BDGT_TMPL_ID);
        var c1 = _breezeClient2.default.Predicate.create('BDGT_TMPL_HDR.PROGRAM_ID', '==', _this7._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_ID);
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
                  foundVtr.results.forEach(function (allDate) {
                    var varVtr = (0, _moment2.default)(new Date(allDate.VTR_LIVE_DT)).format('MM-DD-YYYY');

                    if (_this7._objBudget.HEADER.BDGT_FROM <= varVtr && varVtr <= _this7._objBudget.HEADER.BDGT_TO) {
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

    MainHeaderCustomElement.prototype.fnSaveBudget = function fnSaveBudget(passed_status) {
      var _this8 = this;

      var strValidation = "";

      if (this._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_TITLE == "") {
        strValidation += "No Program specified. <br>";
      }

      if (!(0, _moment2.default)(this._objBudget.HEADER.BDGT_FROM).isValid() || !(0, _moment2.default)(this._objBudget.HEADER.BDGT_TO).isValid()) {
        strValidation += "Invalid Template Start/End Date validity. <br>";
      }

      if (this._objBudget.HEADER.PROGRAM_GENRE_CD == "") {
        strValidation += "No Program Genre. <br>";
      }

      if (this._objBudget.HEADER.EPISODE_TYPE_CD == "") {
        strValidation += "No Episode Type. <br>";
      }

      if (this._objBudget.HEADER.TELECAST_MODE_CD == "") {
        strValidation += "No Telecast Mode. <br>";
      }

      if (!parseInt(this._objBudget.HEADER.TAPING_DAYS) > 0) {
        strValidation += "Invalid Taping Day(s).<br>";
      }

      if (!parseInt(this._objBudget.HEADER.EPISODES) > 0) {
        strValidation += "Invalid Episode(s).<br>";
      }

      if (strValidation != "") {
        _toastr2.default.error("Exception occured. <br/><br/>" + strValidation, "Budget Template");
        return;
      }

      if (this._objBudget.TOTAL <= 0 && this._objBudget.HEADER.APPR_STAT_CD.includes('APPROVED')) {
        _toastr2.default.error("Cannot have Zero Total Budget.", "Budget Template");
        return;
      }

      if (passed_status.includes('EXPIRE') || passed_status.includes('CLOSE')) {
        Promise.all([this.fnBudgetValidation_1(), this.fnBudgetValidation_2()]).then(function (passed) {
          if (passed_status != '') _this8._objBudget.HEADER.APPR_STAT_CD = passed_status;
          _this8.fnExecuteSaveBudgetHeader();
        }, function (fail) {
          _toastr2.default.error("Saving Cancelled.", "Saving..");
        });
      } else if (this._objBudget.HEADER.APPR_STAT_CD.includes('APPROVED')) {

        this.fnValidation_Approved().then(function (passed) {

          var varToday = new Date(Date.now());

          if (new Date(varToday.getFullYear(), varToday.getMonth(), varToday.getDate()) >= new Date((0, _moment2.default)(_this8._objBudget.HEADER.BDGT_TO).subtract(8, 'hours').format('MM-DD-YYYY'))) {
            _this8._objBudget.HEADER.APPR_STAT_CD = "APP-EXPIRED";
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

      var varFrom = (0, _moment2.default)(new Date(this._objBudget.HEADER.BDGT_FROM)).add(8, 'hours');
      varFrom = new Date(varFrom);

      var varTo = (0, _moment2.default)(new Date(this._objBudget.HEADER.BDGT_TO)).add(8, 'hours');
      varTo = new Date(varTo);

      if (this._objBudget.HEADER.REMARKS === undefined) {
        this._objBudget.HEADER.REMARKS = "NONE";
      } else if (this._objBudget.HEADER.REMARKS.trim() == "") {
        this._objBudget.HEADER.REMARKS = "NONE";
      }

      if (this._objBudget.HEADER.BDGT_TMPL_ID == "") {
        var getMax = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').orderByDesc('BDGT_TMPL_ID').take(1);

        if (this._objBudget.HEADER.APPR_STAT_CD == null || this._objBudget.HEADER.APPR_STAT_CD == undefined || this._objBudget.HEADER.APPR_STAT_CD == 'undefined') {
          this._objBudget.HEADER.APPR_STAT_CD = this._STATUS[0].REF_CD;
        }

        (0, _entityManagerFactory.EntityManager)().executeQuery(getMax).then(function (successMax) {
          var getMax = 1;

          if (successMax.results.length > 0) getMax = successMax.results[0].BDGT_TMPL_ID + 1;

          varInsert = (0, _entityManagerFactory.EntityManager)().createEntity('BDGT_TMPL_HDR', {
            BDGT_TMPL_ID: getMax,
            COMPANY_ID: _this9._COMPANY_ID,
            BDGT_FROM: varFrom,
            BDGT_TO: varTo,

            EPISODE_TYPE_CD: _this9._objBudget.HEADER.EPISODE_TYPE_CD,
            BDGT_VIEW_FCTR: 1,
            TAPING_DAYS: _this9._objBudget.HEADER.TAPING_DAYS,
            PROGRAM_ID: _this9._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_ID,
            CHARGE_CD: _this9._objBudget.HEADER.CHARGE_CD,
            PROGRAM_GENRE_CD: _this9._objBudget.HEADER.PROGRAM_GENRE_CD,
            PARENT_PROGRAM_ID: _this9._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_ID,
            BDGT_VIEW_CD: 'EPISODIC',
            APPR_STAT_CD: _this9._objBudget.HEADER.APPR_STAT_CD,
            CHARGE_TYPE_CD: '',
            BDGT_TOTAL: 0,
            REMARKS: _this9._objBudget.HEADER.REMARKS,
            CREATED_BY: _this9._user,
            CREATED_DT: new Date(Date.now()),

            TELECAST_MODE_CD: _this9._objBudget.HEADER.TELECAST_MODE_CD,
            BDGT_STAT_CD: getMax,

            BDGT_FOR_CD: 'BDGT-EPISODIC',
            PROGRAM_NAME: _this9._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_TITLE,
            EPISODES: _this9._objBudget.HEADER.EPISODES,
            STATION_ID: _this9._objBudget.HEADER.STATION_ID,
            STATION_SENT_DATE: new Date(),
            STATION_SENT: 0
          });

          (0, _entityManagerFactory.EntityManager)().addEntity(varInsert);

          (0, _entityManagerFactory.EntityManager)().saveChanges().then(function (success) {

            _this9._objBudget.HEADER.BDGT_TMPL_ID = success.entities[0].BDGT_TMPL_ID;

            _this9._disableCreateBudget = true;
            _this9._disableCancelBudget = false;
            _this9._disableRefreshBudget = false;
            _this9._disableSaveBudget = false;

            if (_this9._objBudget.HEADER.APPR_STAT_CD == "APP-APPROVED") {
              _this9._objBudget.STATUS = "APPROVED";
              _this9._disableSaveBudget = true;

              _this9.budgetDisabled = true;
              _this9.programDisabled = true;
            } else {

              _this9.budgetDisabled = true;
              _this9.programDisabled = false;
            }

            _toastr2.default.success("Succesfully Saved", "Budget Template");

            if (_this9._objBudget.IS_COPYING) {

              _this9._objBudget.OBSERVERS.copy_template.forEach(function (all) {

                all('REGULAR');
              });

              _this9._objBudget.IS_COPYING = false;
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

        var getEntityQuery = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').where("BDGT_TMPL_ID", "==", this._objBudget.HEADER.BDGT_TMPL_ID);
        (0, _entityManagerFactory.EntityManager)().executeQuery(getEntityQuery).then(function (item) {

          item.results[0].BDGT_FROM = varFrom;
          item.results[0].BDGT_TO = varTo;
          item.results[0].EPISODE_TYPE_CD = _this9._objBudget.HEADER.EPISODE_TYPE_CD;
          item.results[0].TAPING_DAYS = _this9._objBudget.HEADER.TAPING_DAYS;
          item.results[0].PROGRAM_ID = _this9._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_ID;
          item.results[0].CHARGE_CD = _this9._objBudget.HEADER.CHARGE_CD;
          item.results[0].PROGRAM_GENRE_CD = _this9._objBudget.HEADER.PROGRAM_GENRE_CD;
          item.results[0].PARENT_PROGRAM_ID = _this9._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_ID;
          item.results[0].APPR_STAT_CD = _this9._objBudget.HEADER.APPR_STAT_CD;
          item.results[0].REMARKS = _this9._objBudget.HEADER.REMARKS;
          item.results[0].LAST_UPDATED_BY = _this9._user;
          item.results[0].LAST_UPDATED_DT = new Date(Date.now());
          item.results[0].TELECAST_MODE_CD = _this9._objBudget.HEADER.TELECAST_MODE_CD;
          item.results[0].PROGRAM_NAME = _this9._objBudget.HEADER.PROGRAM_MSTR.PROGRAM_TITLE;
          item.results[0].EPISODES = _this9._objBudget.HEADER.EPISODES;
          item.results[0].STATION_ID = _this9._objBudget.HEADER.STATION_ID;

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
        _settings2.default.isNavigating = true;
        if (!response.wasCancelled) {} else {}
      });
    };

    return MainHeaderCustomElement;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'to', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class);
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
define('mainpage',['exports', 'aurelia-framework', 'objBudget', './entity-manager-factory', './masterfiles', 'toastr', 'aurelia-dialog', './helpers', 'multi-observer', 'aurelia-router'], function (exports, _aureliaFramework, _objBudget, _entityManagerFactory, _masterfiles, _toastr, _aureliaDialog, _helpers, _multiObserver, _aureliaRouter) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.mainpage = undefined;

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

    var mainpage = exports.mainpage = (_dec = (0, _aureliaFramework.inject)(_toastr2.default, _objBudget.objBudget, _multiObserver.MultiObserver, _aureliaDialog.DialogService, _aureliaRouter.Router), _dec(_class = function () {
        function mainpage(toastr, objBudget, multiObserver, dialogService, Router) {
            var _this = this;

            _classCallCheck(this, mainpage);

            this._toastr = null;
            this.budgetAccess = false;
            this.actualAccess = false;
            this.talentgroupAccess = false;
            this.buhAccess = false;
            this.headerVisible = false;


            this._objBudget = objBudget;
            this.router = Router;

            setTimeout(function () {

                if (_this._objBudget.USER.ROLE_CD !== undefined) {
                    if (_this._objBudget.USER.ROLE_CD.includes('ACCESSALL')) {
                        _this.budgetAccess = true;
                        _this.talentgroupAccess = true;
                        _this.buhAccess = true;
                        _this.actualAccess = true;
                        _this.headerVisible = true;
                    } else if (_this._objBudget.USER.ROLE_CD.includes('HR')) {
                        _this.router.navigateToRoute('mainview');
                    } else if (_this._objBudget.USER.ROLE_CD.includes('PPFCS')) {
                        _this.router.navigateToRoute('actual_cost');return;

                        _this.headerVisible = true;
                    }
                }
            }, 1000);
        }

        mainpage.prototype.navigateTo = function navigateTo(title) {
            this.router.navigateToRoute(title);
        };

        return mainpage;
    }()) || _class);
});
define('mainview',['exports', 'aurelia-framework', 'objBudget', './entity-manager-factory', './masterfiles', 'toastr', 'aurelia-dialog', './helpers', 'multi-observer', 'modals/login', 'aurelia-router'], function (exports, _aureliaFramework, _objBudget, _entityManagerFactory, _masterfiles, _toastr, _aureliaDialog, _helpers, _multiObserver, _login, _aureliaRouter) {
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

    var mainview = exports.mainview = (_dec = (0, _aureliaFramework.inject)(_toastr2.default, _objBudget.objBudget, _multiObserver.MultiObserver, _aureliaDialog.DialogService, _aureliaRouter.Router), _dec(_class = function () {
        function mainview(toastr, objBudget, multiObserver, dialogService, Router) {
            _classCallCheck(this, mainview);

            this._toastr = null;
            this.showingLogout = "hidden";
            this.dialogService = null;
            this.loginDisabled = true;
            this.logoutDisabled = false;
            this.masterFilesLoaded = false;

            this._objBudget = objBudget;
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

                this._objBudget.OBSERVERS.refreshPersonnelTab.forEach(function (all) {
                    all('REGULAR');
                });
            } else if (index == 2) {

                this._objBudget.OBSERVERS.refreshPersonnelTab.forEach(function (all) {
                    all('SEMI_REGULAR');
                });
            } else if (index == 3) {

                this._objBudget.OBSERVERS.refreshPersonnelTab.forEach(function (all) {
                    all('STAFF');
                });
            }
        };

        mainview.prototype.LoginPassed = function LoginPassed(user) {

            this._user = user;

            (0, _helpers.setCookie)("PPMS_USER", user.USER_ID + "^" + user.COMPANY_ID + "^" + user.Is_HR + "^" + user.Is_Branch, 30);
            _toastr2.default.clear();
            _toastr2.default.success("Let's Start...", "Success");

            this.loginDisabled = true;
            this.logoutDisabled = false;


            this.showingLogout = "visible";
        };

        mainview.prototype.logout = function logout() {

            this.loginDisabled = false;
            this.logoutDisabled = true;


            this.fnLogin();


            this._objBudget.OBSERVERS.loggedout.forEach(function (all) {
                all();
            });

            this._objBudget.OBSERVERS.clear_log.forEach(function (all) {
                all();
            });

            this._objBudget.USER = {};
            (0, _helpers.removeCookie)();
            this.showingLogout = "hidden";
        };

        mainview.prototype.fnLogin = function fnLogin() {
            var _this = this;

            this.dialogService.open({
                viewModel: _login.login
            }).whenClosed(function (response) {

                if (!response.wasCancelled) {
                    _this.fnInitMasterfiles(1, response.output);
                } else {}
            });
        };

        return mainview;
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
      var varAlias = "";
      if (all.ALIAS != "" && all.ALIAS != null) {
        varAlias = "(" + all.ALIAS;
      }

      var varFoundAlias = varGlobalAlias.find(function (item) {
        return item.GLOBAL_ID == all.GLOBAL_INDIV_ID;
      });

      if (varFoundAlias !== undefined) if (varAlias == "") varAlias = "(" + varFoundAlias.ALIAS_NAME;else if (varAlias == "(") varAlias = varFoundAlias.ALIAS_NAME;else varAlias += "," + varFoundAlias.ALIAS_NAME;

      if (varAlias != "") {
        varAlias += ")";
      }

      varTmpObject.push({
        PERSONNEL_NAME: (all.LAST_NAME + ', ' + all.GIVEN_NAME + ' ' + all.MIDDLE_NAME + varAlias).toUpperCase(),
        GLOBAL_INDIV_ID: all.GLOBAL_INDIV_ID,
        PERSONNEL_INFO_SRC: 'INDIV'
      });
    });

    varTalentSuppIndiv.forEach(function (all) {

      var varAlias = "";
      if (all.ALIAS != "" && all.ALIAS != null) {
        varAlias = "(" + all.ALIAS;
      }

      var varFoundAlias = varGlobalAlias.find(function (item) {
        return item.GLOBAL_ID == all.SUPPLIER_INDIV_GLOBAL_ID;
      });

      if (varFoundAlias !== undefined) if (varAlias == "") varAlias = "(" + varFoundAlias.ALIAS_NAME;else if (varAlias == "(") varAlias = varFoundAlias.ALIAS_NAME;else varAlias += "," + varFoundAlias.ALIAS_NAME;

      if (varAlias != "") {
        varAlias += ")";
      }

      varTmpObject.push({
        PERSONNEL_NAME: (all.LAST_NAME + ', ' + all.GIVEN_NAME + ' ' + all.MIDDLE_NAME + varAlias).toUpperCase(),
        GLOBAL_INDIV_ID: all.SUPPLIER_INDIV_GLOBAL_ID,
        PERSONNEL_INFO_SRC: 'TSUPPLIER'
      });
    });

    varTalentComp.forEach(function (all) {
      varTmpObject.push({
        PERSONNEL_NAME: all.COMPANY_NAME.toUpperCase(),
        GLOBAL_INDIV_ID: all.SUPPLIER_COMP_GLOBAL_ID,
        PERSONNEL_INFO_SRC: 'TCOMP'
      });
    });

    varGlobalGrp.forEach(function (all) {
      varTmpObject.push({
        PERSONNEL_NAME: all.GROUP_NAME.toUpperCase(),
        GLOBAL_INDIV_ID: all.GLOBAL_GRP_ID,
        PERSONNEL_INFO_SRC: 'GLGRP'
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
      (0, _entityManagerFactory.EntityQuery)().from('TALENT_SUPPLIER_COMP_MSTR').select('COMPANY_NAME', 'SUPPLIER_COMP_GLOBAL_ID, COMPANY_NAME').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
        talentSuppComp = success.results;
        resolve(true);
      });
    });
  }

  function getTalentSupplierIndiv() {

    return new Promise(function (resolve) {
      (0, _entityManagerFactory.EntityQuery)().from('TALENT_SUPPLIER_INDIV_MSTR').select('LAST_NAME', 'TALENT_SUPPLIER_INDIV_ID, LAST_NAME, GIVEN_NAME, MIDDLE_NAME').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
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
      (0, _entityManagerFactory.EntityQuery)().from('GLOBAL_ALIAS_TRX').select('GLOBAL_ALIAS_ID', 'ALIAS_NAME', 'GLOBAL_ID').using((0, _entityManagerFactory.EntityManager)()).execute().then(function (success) {
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
define('nav-bar',['exports', 'aurelia-framework', 'objBudget', 'aurelia-router', './helpers', './entity-manager-factory', 'toastr', 'modals/login', 'modals/change_password', 'aurelia-dialog', './masterfiles', './settings'], function (exports, _aureliaFramework, _objBudget, _aureliaRouter, _helpers, _entityManagerFactory, _toastr, _login, _change_password, _aureliaDialog, _masterfiles, _settings) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NavBar = undefined;

    var _toastr2 = _interopRequireDefault(_toastr);

    var _settings2 = _interopRequireDefault(_settings);

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

    var NavBar = exports.NavBar = (_dec = (0, _aureliaFramework.inject)(_objBudget.objBudget, _aureliaRouter.Router, _aureliaDialog.DialogService), _dec(_class = (_class2 = function () {
        function NavBar(objBudget, Router, DialogService) {
            var _this = this;

            _classCallCheck(this, NavBar);

            _initDefineProp(this, 'router', _descriptor, this);

            this.masterFilesLoaded = false;

            this.router = Router;
            this._objBudget = objBudget;

            this.dialogService = DialogService;
            this.settings = _settings2.default;

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
                            EMAIL_ADDRESS: varSplitCookie[6]
                        };

                        _this._objBudget.USER = _user;
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
                    ROLE_CD: varSplitCookie[7]
                };

                this._objBudget.USER = this._user;

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

            (0, _helpers.setCookie)("PPMS_USER", user.USER_ID + "^" + user.COMPANY_ID + "^" + user.Is_HR + "^" + user.Is_Branch + "^" + user.EMPLOYEE_ID + "^" + user.HASH + "^" + user.EMAIL_ADDRESS + "^" + user.ROLE_CD, 30);
            _settings2.default.isNavigating = false;

            _toastr2.default.clear();
            _toastr2.default.success("Let's Start...", "Success");

            if (this.router.currentInstruction.config.name == "blankpage") {
                this.router.navigateToRoute('mainpage');
            }
        };

        NavBar.prototype.logout = function logout() {

            if (this.router.currentInstruction.config.name != "blankpage") this.router.navigateToRoute('blankpage');else this._objBudget.OBSERVERS.loggedout.forEach(function (all) {
                all();
            });

            this._objBudget.OBSERVERS.clear_log.forEach(function (all) {
                all();
            });

            this._objBudget.USER = {};
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
define('objBudget',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var objBudget = exports.objBudget = function objBudget() {
        _classCallCheck(this, objBudget);

        this.HEADER = {};
        this.REGULAR = [];
        this.SEMI_REGULAR = [];
        this.STAFF = [];
        this.GUEST = [];
        this.USER = {};
        this.TOTAL = 0;
        this.STATUS = "NONE";
        this.ALLOW_PASS_CONFIDENTIAL = false;
        this.IS_COPYING = false;
        this._INPUT_AMT_REGULAR = 0;
        this._INPUT_AMT_SEMI_REGULAR = 0;
        this._INPUT_AMT_STAFF = 0;
        this._INPUT_AMT_GUEST = 0;
        this._INPUT_AMT_TOTAL = 0;
        this.PROGRAM_USER = [];
        this._LOADING_BUDGET = 0;
        this.CALLER = { ACTION: null, ACTION_CALLER: null, VALUE1: null, VALUE2: null, VALUE3: null, VALUE4: null };
        this.OBSERVERS = {
            init_modal: [],
            close_modal: [],
            open_modal: [],
            enable_modal_button: [],
            clear_budget_modal: [],
            open_modal_message: [],
            clear_indiv_modal: [],
            clear_program_modal: [],
            clear_log: [],
            clear_login_modal: [],
            clear_talentmanager_modal: [],
            pass_value: [],
            login_passed: [],
            pass_group: [],
            copy_template: [],
            copy_template_guest: [],
            reset_all: [],
            loggedout: [],
            budget_dialog: [],
            pass_program: [],
            budget_refresh: [],
            confirm_dialog: [],
            enable_approved: [],
            pass_indiv: [],
            refreshPersonnelTab: [],
            reset_summary: [],
            pass_job: [],
            clear_job_modal: [],
            disable_search_personnel: [],
            budget_loaded: [],
            logoutPage: [],
            loginPage: []
        };
    };
});
define('personnel',['exports', 'aurelia-framework', 'objBudget', './entity-manager-factory', './masterfiles', 'helpers', 'typeahead', './settings', 'underscore', 'modals/modal-wizard', 'numeral', 'multi-observer', 'toastr', 'modals/globalindivmstr', 'modals/indivmstr', 'modals/job', 'modals/paymentterm', 'aurelia-dialog', 'breeze-client'], function (exports, _aureliaFramework, _objBudget, _entityManagerFactory, _masterfiles, _helpers, _typeahead, _settings, _underscore, _modalWizard, _numeral, _multiObserver, _toastr, _globalindivmstr, _indivmstr, _job, _paymentterm, _aureliaDialog, _breezeClient) {
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

  var PersonnelCustomElement = exports.PersonnelCustomElement = (_dec = (0, _aureliaFramework.inject)(_objBudget.objBudget, _modalWizard.ModalWizard, _multiObserver.MultiObserver, _aureliaDialog.DialogService), _dec(_class = (_class2 = function () {
    function PersonnelCustomElement(objBudget, ModalWizard, multiObserver, dialogService) {
      var _this = this;

      _classCallCheck(this, PersonnelCustomElement);

      _initDefineProp(this, 'toPerson', _descriptor, this);

      _initDefineProp(this, 'toPersonModel', _descriptor2, this);

      this._objBudget = null;
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

      this.dialogService = dialogService;
      this._objBudget = objBudget;

      this._ModalWizard = ModalWizard;
      this._ce_head = "+";

      multiObserver.observe([[this, '_personnelSearch']], function (newValue, oldValue) {
        return _this.onSpeculateProp(newValue, oldValue);
      });

      this._objBudget.OBSERVERS.disable_search_personnel.push(function (val) {
        _this.ButtonStatus(val);
      });

      this._objBudget.OBSERVERS.reset_all.push(function () {
        _this.resetView();
      });

      this._objBudget.OBSERVERS.budget_dialog.push(function (val) {
        _this.CloseBudgetDialog(val);
      });

      this._objBudget.OBSERVERS.enable_approved.push(function (val) {
        _this.ButtonStatus(val);
      });

      this._objBudget.OBSERVERS.copy_template.push(function (val) {
        _this.fnCallCopy(val);
      });

      this._objBudget.OBSERVERS.pass_indiv.push(function (val) {
        _this.PassedIndiv(val);
      });

      this._objBudget.OBSERVERS.pass_group.push(function (val) {
        _this.PassedGroup(val);
      });

      this._objBudget.OBSERVERS.refreshPersonnelTab.push(function (val) {
        _this.refreshOnSelect(val);
      });

      this._objBudget.OBSERVERS.pass_job.push(function (val) {
        _this.passJob(val);
      });

      this._PYMNTTERM = (0, _masterfiles.getLookups)().PAYMENT_TERM;

      this._JOBS = (0, _masterfiles.getLookups)().JOB_GRP_CATEGORY.filter(function (all) {
        return all.COMPANY_ID == _this._objBudget.USER.COMPANY_ID;
      });
    }

    PersonnelCustomElement.prototype.passJob = function passJob(job) {
      var _this2 = this;

      var index = this._Index;

      this._Personnel[index].JOB_ID = job.JOB_ID;
      this._Personnel[index].JOB_DESC = job.JOB_DESC;
      var varGrpCategory = (0, _masterfiles.getLookups)().JOB_GRP_CATEGORY.find(function (all) {
        return all.JOB_ID == _this2._Personnel[index].JOB_ID && all.COMPANY_ID == _this2._objBudget.USER.COMPANY_ID;
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

      this._objBudget.OBSERVERS.enable_modal_button.forEach(function (all) {
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

      this._objBudget.OBSERVERS.enable_modal_button.forEach(function (all) {
        _this6.isIndivMstrDisabled = false;
        _this6.isIndivMstrTalentsDisabled = false;
      });

      setTimeout(function () {

        _this6.scrollDiv();
      }, 5000);

      var varPsClType = "";
      if (this.toPersonModel.USE == "REGULAR") {

        varPsClType = "Regular";
        this._objBudget.REGULAR = [];
      } else if (this.toPersonModel.USE == "SEMI_REGULAR") {

        varPsClType = "Semi-Regular";
        this._objBudget.SEMI_REGULAR = [];
      } else if (this.toPersonModel.USE == "STAFF") {

        varPsClType = "Staff";
        this._objBudget.STAFF = [];
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
            BDGT_TMPL_ID: _this6._objBudget.HEADER.BDGT_TMPL_ID,
            JOB_ID: item.JOB_ID,
            GLOBAL_ID: item.GLOBAL_ID,
            CONTRACT_AMT: item.CONTRACT_AMT,
            CATEGORY_ID: item.CATEGORY_ID,
            STAFF_WORK: item.STAFF_WORK,
            PYMNT_TERM_CD: item.PYMNT_TERM_CD,
            PAY_TO_PERSON_FL: 'T',
            PAY_RATE_FACTOR: item.PAY_RATE_FACTOR,
            BUDGET_AMT: item.INPUT_AMT,
            TAPING_DAY_CNT: _this6._objBudget.HEADER.TAPING_DAYS,
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

          _this6._objBudget.REGULAR = _this6._Personnel;

          if (_this6._objBudget.REGULAR.length > 0) _toastr2.default.success("REGULAR PERSONNEL", "Loading Successful.");

          _this6.setPersonnelValues(_this6._objBudget.REGULAR, varJobLength, varCategoryLength);
        } else if (_this6.toPersonModel.USE == "SEMI_REGULAR") {

          varPsClType = "Semi-Regular";

          _this6._objBudget.SEMI_REGULAR = _this6._Personnel;

          if (_this6._objBudget.SEMI_REGULAR.length > 0) _toastr2.default.success("SEMI-REGULAR PERSONNEL", "Loading Successful.");

          _this6.setPersonnelValues(_this6._objBudget.SEMI_REGULAR, varJobLength, varCategoryLength);
        } else if (_this6.toPersonModel.USE == "STAFF") {

          varPsClType = "Staff";

          _this6._objBudget.STAFF = _this6._Personnel;

          if (_this6._objBudget.STAFF.length > 0) _toastr2.default.success("STAFF PERSONNEL", "Loading Successful.");

          _this6.setPersonnelValues(_this6._objBudget.STAFF, varJobLength, varCategoryLength);
        }

        _this6._signal = (0, _entityManagerFactory.generateID)();

        _this6._objBudget.OBSERVERS.reset_summary.forEach(function (all) {

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

      this._objBudget.OBSERVERS.open_modal.forEach(function (all) {
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

      this._objBudget.OBSERVERS.reset_summary.forEach(function (all) {
        all();
      });
    };

    PersonnelCustomElement.prototype.PassedIndiv = function PassedIndiv(value) {
      if (this._selectedItem !== undefined) if (value.GLOBAL_INDIV_ID == this._selectedItem.GLOBAL_ID) {
        _toastr2.default.error("<strong>Talent Manager cannot be same Personnel</strong>.", "Problem occured");
        return;
      }

      var varJobTManager = (0, _masterfiles.getJobByName)("TALENT MANAGER");
      if (parseInt(varJobTManager.COMPANY_ID) != parseInt(this._objBudget.USER.COMPANY_ID)) {
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

      this._objBudget.OBSERVERS.reset_summary.forEach(function (all) {
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

      console.log(value);
      this.getDefaultPymntTerm();

      value.forEach(function (val) {

        var varJob = (0, _masterfiles.getJobByGlobalCompany)(val.GLOBAL_INDIV_ID);

        if (parseInt(varJob.COMPANY_ID) !== parseInt(_this11._objBudget.USER.COMPANY_ID)) {
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

          if (parseInt(varJobTManager.COMPANY_ID) != parseInt(_this11._objBudget.USER.COMPANY_ID)) {
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

      this._objBudget.OBSERVERS.reset_summary.forEach(function (all) {
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

            if (parseInt(varJob.COMPANY_ID) != parseInt(_this12._objBudget.USER.COMPANY_ID)) {
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

        this._objBudget.OBSERVERS.reset_summary.forEach(function (all) {
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

        var getAllDtl = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_DTL').where("BDGT_TMPL_ID", '==', _this13._objBudget.HEADER.BDGT_TMPL_ID);
        (0, _entityManagerFactory.EntityManager)().executeQuery(getAllDtl).then(function (foundDtl) {

          _this13._Personnel.forEach(function (item) {
            if (item.BDGT_TMPL_DTL_ID === undefined) {
              item.BDGT_TMPL_DTL_ID_TMP = getMax;
              ++getMax;
            }
          });

          _this13._Personnel.forEach(function (item) {
            if (item.TALENT_MANAGER !== undefined) {

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
                BDGT_TMPL_ID: _this13._objBudget.HEADER.BDGT_TMPL_ID,
                JOB_ID: item.JOB_ID,
                GLOBAL_ID: item.GLOBAL_ID,
                CONTRACT_AMT: item.CONTRACT_AMT_TMP.replace(/,/g, ''),
                CATEGORY_ID: item.CATEGORY_ID,
                STAFF_WORK: item.STAFF_WORK_TMP === undefined ? 0 : item.STAFF_WORK_TMP == true ? 1 : 0,
                PYMNT_TERM_CD: item.PYMNT_TERM_CD,
                PAY_TO_PERSON_FL: 'T',
                PAY_RATE_FACTOR: item.PAY_RATE_FACTOR_TMP.replace(/,/g, ''),
                BUDGET_AMT: item.INPUT_AMT_TMP.replace(/,/g, ''),
                TAPING_DAY_CNT: _this13._objBudget.HEADER.TAPING_DAYS,
                PERSONNEL_CLASS_CD: _this13.toPersonModel.USE != "STAFF" ? "Mainstay" : "Staff",
                REMARKS: item.REMARKS,
                PERSONNEL_INFO_SRC: item.PERSONNEL_INFO_SRC,
                PERSONNEL_NAME: item.BLANK_PERSONNEL_NAME !== undefined ? item.BLANK_PERSONNEL_NAME : item.PERSONNEL_NAME,
                CREATED_BY: _this13._objBudget.USER.USER_ID,
                CREATED_DT: new Date(),
                INPUT_AMT: item.INPUT_AMT_TMP.replace(/,/g, ''),
                EPISODES: _this13._objBudget.HEADER.EPISODES,
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
                  BDGT_TMPL_ID: _this13._objBudget.HEADER.BDGT_TMPL_ID,
                  JOB_ID: item.TALENT_MANAGER.JOB_ID,
                  GLOBAL_ID: item.TALENT_MANAGER.GLOBAL_INDIV_ID,
                  CONTRACT_AMT: item.TALENT_MANAGER.CONTRACT_AMT_TMP.replace(/,/g, ''),
                  CATEGORY_ID: item.TALENT_MANAGER.CATEGORY_ID,
                  STAFF_WORK: 0,
                  PYMNT_TERM_CD: item.PYMNT_TERM_CD,
                  PAY_TO_PERSON_FL: 'T',
                  PAY_RATE_FACTOR: item.TALENT_MANAGER.PAY_RATE_FACTOR_TMP.replace(/,/g, ''),
                  BUDGET_AMT: item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''),
                  TAPING_DAY_CNT: _this13._objBudget.HEADER.TAPING_DAYS,
                  PERSONNEL_CLASS_CD: _this13.toPersonModel.USE != "STAFF" ? "Mainstay" : "Staff",
                  REMARKS: item.TALENT_MANAGER.REMARKS,
                  PERSONNEL_INFO_SRC: item.PERSONNEL_INFO_SRC,
                  PERSONNEL_NAME: item.TALENT_MANAGER.PERSONNEL_NAME,
                  CREATED_BY: _this13._objBudget.USER.USER_ID,
                  CREATED_DT: new Date(),
                  INPUT_AMT: item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''),
                  EPISODES: _this13._objBudget.HEADER.EPISODES,
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
                console.log(varTalentMngrToDelete);
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
              varTalentToEdit.TAPING_DAY_CNT = _this13._objBudget.HEADER.TAPING_DAYS;
              varTalentToEdit.REMARKS = item.REMARKS;
              varTalentToEdit.PERSONNEL_INFO_SRC = item.PERSONNEL_INFO_SRC;
              varTalentToEdit.PERSONNEL_NAME = item.BLANK_PERSONNEL_NAME !== undefined ? item.BLANK_PERSONNEL_NAME : item.PERSONNEL_NAME;
              varTalentToEdit.LAST_UPDATED_BY = _this13._objBudget.USER.USER_ID;
              varTalentToEdit.LAST_UPDATED_DT = new Date();
              varTalentToEdit.INPUT_AMT = item.INPUT_AMT_TMP.replace(/,/g, '');
              varTalentToEdit.EPISODES = _this13._objBudget.HEADER.EPISODES;
              varTalentToEdit.CONFIDENTIAL = item.CONFIDENTIAL_TMP === undefined ? 0 : item.CONFIDENTIAL_TMP == true ? 1 : 0;
              varTalentToEdit.POOL_RECORD = item.POOL_RECORD_TMP == null || item.POOL_RECORD_TMP == undefined ? 0 : item.POOL_RECORD_TMP == true ? 1 : 0;

              if (varTalentToEdit.GROUP_ORDER !== -1) varTalentToEdit.GROUP_ORDER = varIndex;

              varTalentToEdit.GLOBAL_ID_LINK = item.TALENT_MANAGER !== undefined && item.TALENT_MANAGER !== null ? item.TALENT_MANAGER.GLOBAL_INDIV_ID : "NONE";
              varTalentToEdit.BDGT_TMPL_DTL_ID_LINK = item.BDGT_TMPL_DTL_ID_LINK !== undefined && item.BDGT_TMPL_DTL_ID_LINK !== null ? item.BDGT_TMPL_DTL_ID_LINK : 0;
              varTalentToEdit.WITH_TALENT_MANAGER = item.TALENT_MANAGER !== undefined && item.TALENT_MANAGER !== null ? '1' : '0';

              if (item.TALENT_MANAGER !== undefined) {

                if (item.BDGT_TMPL_DTL_ID_LINK_TMP !== undefined) {
                  var varCheckTalent = _this13._PersonnelTM.find(function (allTalent) {
                    return allTalent.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP;
                  });

                  if (varCheckTalent !== undefined) {

                    if (varCheckTalent.BDGT_TMPL_DTL_ID !== item.BDGT_TMPL_DTL_ID_LINK) {

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
                    BDGT_TMPL_ID: _this13._objBudget.HEADER.BDGT_TMPL_ID,
                    JOB_ID: item.TALENT_MANAGER.JOB_ID,
                    GLOBAL_ID: item.TALENT_MANAGER.GLOBAL_INDIV_ID,
                    CONTRACT_AMT: item.TALENT_MANAGER.CONTRACT_AMT_TMP.replace(/,/g, ''),
                    CATEGORY_ID: item.TALENT_MANAGER.CATEGORY_ID,
                    STAFF_WORK: 0,
                    PYMNT_TERM_CD: item.PYMNT_TERM_CD,
                    PAY_TO_PERSON_FL: 'T',
                    PAY_RATE_FACTOR: item.TALENT_MANAGER.PAY_RATE_FACTOR_TMP.replace(/,/g, ''),
                    BUDGET_AMT: item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''),
                    TAPING_DAY_CNT: _this13._objBudget.HEADER.TAPING_DAYS,
                    PERSONNEL_CLASS_CD: _this13.toPersonModel.USE != "STAFF" ? "Mainstay" : "Staff",
                    REMARKS: item.TALENT_MANAGER.REMARKS,
                    PERSONNEL_INFO_SRC: item.PERSONNEL_INFO_SRC,
                    PERSONNEL_NAME: item.TALENT_MANAGER.PERSONNEL_NAME,
                    CREATED_BY: _this13._objBudget.USER.USER_ID,
                    CREATED_DT: new Date(),
                    INPUT_AMT: item.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''),
                    EPISODES: _this13._objBudget.HEADER.EPISODES,
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
              } else if (item.TALENT_MANAGER === undefined && item.BDGT_TMPL_DTL_ID_LINK_TMP !== undefined) {

                var varTalentMngrToDelete = foundDtl.results.find(function (allTm) {
                  return allTm.BDGT_TMPL_DTL_ID == item.BDGT_TMPL_DTL_ID_LINK_TMP;
                });

                if (varTalentMngrToDelete !== undefined) {
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
            _this13.fnCheckBudget(_this13._objBudget.HEADER.BDGT_TMPL_ID);
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

        this._objBudget.OBSERVERS.copy_template.forEach(function (all) {
          all('SEMI_REGULAR');
        });
      } else if (this.toPersonModel.USE == "SEMI_REGULAR") {

        this._objBudget.OBSERVERS.copy_template.forEach(function (all) {
          all('STAFF');
        });
      } else if (this.toPersonModel.USE == "STAFF") {

        this._objBudget.OBSERVERS.copy_template_guest.forEach(function (all) {
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

      this._objBudget.OBSERVERS.reset_summary.forEach(function (all) {
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

      this._objBudget.OBSERVERS.reset_summary.forEach(function (all) {
        all();
      });
    };

    PersonnelCustomElement.prototype.fnIndivMstrTalents = function fnIndivMstrTalents() {
      this.dialogService.open({
        viewModel: _globalindivmstr.globalindivmstr
      }).whenClosed(function (response) {

        if (!response.wasCancelled) {} else {}
      });
    };

    PersonnelCustomElement.prototype.fnIndivMstr = function fnIndivMstr() {
      var _this14 = this;

      this.dialogService.open({
        viewModel: _indivmstr.indivmstr
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
        viewModel: _globalindivmstr.globalindivmstr
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
    exports.default = {
        serviceName: "http://localhost:30313/odata",
        serviceNameBase: "http://localhost:30313",

        pageSize: 100,
        STATIONS: ["", "CEBU", "DAVAO"],

        ActualCostService: "http://absppms2:8084",
        serviceBase: "http://absppms2:8083",
        isNavigating: false
    };
});
define('summary',['exports', 'aurelia-framework', 'objBudget', './entity-manager-factory', './masterfiles', 'helpers', 'typeahead', './settings', 'underscore', 'numeral', 'toastr', 'multi-observer'], function (exports, _aureliaFramework, _objBudget, _entityManagerFactory, _masterfiles, _helpers, _typeahead, _settings, _underscore, _numeral, _toastr, _multiObserver) {
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

  var SummaryCustomElement = exports.SummaryCustomElement = (_dec = (0, _aureliaFramework.inject)(_objBudget.objBudget, _multiObserver.MultiObserver), _dec(_class = (_class2 = function () {
    function SummaryCustomElement(objBudget, multiObserver) {
      var _this = this;

      _classCallCheck(this, SummaryCustomElement);

      _initDefineProp(this, 'to', _descriptor, this);

      this._objBudget = null;
      this._enableAdd = false;
      this._enableRemove = false;
      this._INPUT_AMT_MAINSTAY = 0;
      this._INPUT_AMT_STAFF = 0;
      this._INPUT_AMT_GUEST = 0;
      this._INPUT_AMT_TOTAL = 0;
      this.varObserveSubscriptions = [];

      this._objBudget = objBudget;

      this._multiObserver = multiObserver;

      this._objBudget.OBSERVERS.budget_dialog.push(function (val) {
        _this.fnCheckSummary(val);
      });

      this._objBudget.OBSERVERS.reset_summary.push(function () {
        _this.fnResetSummarySubscription();
      });
    }

    SummaryCustomElement.prototype.fnCheckAll = function fnCheckAll() {
      var _this2 = this;

      this._INPUT_AMT_MAINSTAY = 0;
      this._INPUT_AMT_TOTAL = 0;
      this._objBudget._INPUT_AMT_REGULAR = 0;
      this._objBudget._INPUT_AMT_SEMI_REGULAR = 0;

      this._objBudget.REGULAR.forEach(function (all) {

        if (_this2._objBudget.ALLOW_PASS_CONFIDENTIAL || !all.CONFIDENTIAL_TMP) {
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

      this._objBudget._INPUT_AMT_REGULAR = (0, _numeral2.default)(this._INPUT_AMT_MAINSTAY).format('0,0.00');

      this._objBudget.SEMI_REGULAR.forEach(function (all) {

        if (all.INPUT_AMT_TMP != "" && all.INPUT_AMT_TMP != null && all.INPUT_AMT_TMP != undefined) {
          if (all.GROUP_ORDER !== -1) {
            if (_this2._objBudget.ALLOW_PASS_CONFIDENTIAL || !all.CONFIDENTIAL_TMP) _this2._INPUT_AMT_MAINSTAY += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, ''));
            _this2._objBudget._INPUT_AMT_SEMI_REGULAR += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, ''));
          }

          if (all.TALENT_MANAGER) {
            if (all.TALENT_MANAGER.INPUT_AMT_TMP != "" && all.TALENT_MANAGER.INPUT_AMT_TMP != null && all.TALENT_MANAGER.INPUT_AMT_TMP != undefined) {
              _this2._INPUT_AMT_MAINSTAY += parseFloat(all.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''));
              _this2._objBudget._INPUT_AMT_SEMI_REGULAR += parseFloat(all.TALENT_MANAGER.INPUT_AMT_TMP.replace(/,/g, ''));
            }
          }
        }
      });

      this._INPUT_AMT_TOTAL = this._INPUT_AMT_MAINSTAY;
      this._INPUT_AMT_MAINSTAY = (0, _numeral2.default)(this._INPUT_AMT_MAINSTAY).format('0,0.00');

      this._objBudget._INPUT_AMT_SEMI_REGULAR = (0, _numeral2.default)(this._objBudget._INPUT_AMT_SEMI_REGULAR).format('0,0.00');

      this._INPUT_AMT_STAFF = 0;
      this._objBudget._INPUT_AMT_STAFF = 0;

      this._objBudget.STAFF.forEach(function (all) {

        if (all.INPUT_AMT_TMP != "" && all.INPUT_AMT_TMP != null && all.INPUT_AMT_TMP != undefined) {

          if (all.GROUP_ORDER !== -1) {

            if (_this2._objBudget.ALLOW_PASS_CONFIDENTIAL || !all.CONFIDENTIAL_TMP) _this2._INPUT_AMT_STAFF += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, ''));
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
      this._objBudget._INPUT_AMT_STAFF = this._INPUT_AMT_STAFF;

      this._INPUT_AMT_GUEST = 0;
      this._objBudget.GUEST.forEach(function (all) {

        if (all.GROUP_ORDER !== -1) if (all.INPUT_AMT_TMP != "" && all.INPUT_AMT_TMP != null && all.INPUT_AMT_TMP != undefined) _this2._INPUT_AMT_GUEST += parseFloat(all.INPUT_AMT_TMP.replace(/,/g, '')) * all.PAY_RATE_FACTOR;
      });

      this._INPUT_AMT_TOTAL += this._INPUT_AMT_GUEST;
      this._INPUT_AMT_GUEST = (0, _numeral2.default)(this._INPUT_AMT_GUEST).format('0,0.00');
      this._objBudget._INPUT_AMT_GUEST = (0, _numeral2.default)(this._INPUT_AMT_GUEST).format('0,0.00');

      this._INPUT_AMT_TOTAL = (0, _numeral2.default)(this._INPUT_AMT_TOTAL).format('0,0.00');

      this._objBudget.TOTAL = this._INPUT_AMT_TOTAL;

      if (this._objBudget._LOADING_BUDGET == 1 && this._objBudget.TOTAL != 0) {
        this._objBudget_LOADING_BUDGET = 0;
        this._objBudget.OBSERVERS.budget_loaded.forEach(function (all) {
          all();
        });
      }
    };

    SummaryCustomElement.prototype.fnCheckSummary = function fnCheckSummary(value) {
      var _this3 = this;

      setTimeout(function () {
        for (var name in _this3._objBudget.REGULAR) {

          var varSubscription = _this3._multiObserver.observe([[_this3._objBudget.REGULAR[name], 'INPUT_AMT_TMP']], function (newValue, oldValue) {

            _this3.fnCheckAll();
          });

          _this3.varObserveSubscriptions.push(varSubscription);

          if (_this3._objBudget.REGULAR[name].TALENT_MANAGER !== undefined) {

            var varSubscriptionTM = _this3._multiObserver.observe([[_this3._objBudget.REGULAR[name].TALENT_MANAGER, 'INPUT_AMT_TMP']], function (newValue, oldValue) {

              _this3.fnCheckAll();
            });

            _this3.varObserveSubscriptions.push(varSubscriptionTM);
          }
        }

        for (var name in _this3._objBudget.SEMI_REGULAR) {

          var varSubscription = _this3._multiObserver.observe([[_this3._objBudget.SEMI_REGULAR[name], 'INPUT_AMT_TMP']], function (newValue, oldValue) {

            _this3.fnCheckAll();
          });

          _this3.varObserveSubscriptions.push(varSubscription);

          if (_this3._objBudget.SEMI_REGULAR[name].TALENT_MANAGER !== undefined) {

            var varSubscriptionTM = _this3._multiObserver.observe([[_this3._objBudget.SEMI_REGULAR[name].TALENT_MANAGER, 'INPUT_AMT_TMP']], function (newValue, oldValue) {

              _this3.fnCheckAll();
            });

            _this3.varObserveSubscriptions.push(varSubscriptionTM);
          }
        }

        for (var name in _this3._objBudget.STAFF) {

          var varSubscription = _this3._multiObserver.observe([[_this3._objBudget.STAFF[name], 'INPUT_AMT_TMP']], function (newValue, oldValue) {

            _this3.fnCheckAll();
          });

          _this3.varObserveSubscriptions.push(varSubscription);

          if (_this3._objBudget.STAFF[name].TALENT_MANAGER !== undefined) {

            var varSubscriptionTM = _this3._multiObserver.observe([[_this3._objBudget.STAFF[name].TALENT_MANAGER, 'INPUT_AMT_TMP']], function (newValue, oldValue) {

              _this3.fnCheckAll();
            });

            _this3.varObserveSubscriptions.push(varSubscriptionTM);
          }
        }

        for (var name in _this3._objBudget.GUEST) {

          var varSubscription = _this3._multiObserver.observe([[_this3._objBudget.GUEST[name], 'INPUT_AMT_TMP']], function (newValue, oldValue) {

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
define('modals/budget',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'objBudget', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _objBudget, _aureliaDialog, _breezeClient) {
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

	var budget = exports.budget = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _objBudget.objBudget, _aureliaDialog.DialogController), _dec(_class = function () {
		function budget(multiObserver, observerLocator, Element, objBudget, controller) {
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

			this._objBudget = objBudget;
			this.observerLocator = observerLocator;

			this.items = (0, _masterfiles.getLookups)().BDGT_TMPL_HDR;

			multiObserver.observe([[this, '_bBDGT_TMPL_ID'], [this, '_bPROGRAM_TITLE'], [this, '_bPROGRAM_IO'], [this, '_bAPPR_STAT_CD']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._objBudget.OBSERVERS.clear_budget_modal.push(function () {
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

			setTimeout(function (a) {

				if (a !== _this3.currPredicate) return;

				_this3.varFilterArray = [];

				var _query = (0, _entityManagerFactory.EntityQuery)().from('BDGT_TMPL_HDR').where(_breezeClient2.default.Predicate.and(_this3.currPredicate)).expand('PROGRAM_MSTR').orderBy("BDGT_TMPL_ID desc").select('BDGT_TMPL_ID,PROGRAM_MSTR.PROGRAM_TITLE,PROGRAM_MSTR.PROGRAM_IO, APPR_STAT_CD');
				(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {

					tmpVar = [];
					_underscore2.default.each(success.results, function (all) {
						tmpVar.push({
							PROGRAM_TITLE: all.PROGRAM_MSTR.PROGRAM_TITLE,
							BDGT_TMPL_ID: parseInt(all.BDGT_TMPL_ID),
							PROGRAM_IO: all.PROGRAM_MSTR.PROGRAM_IO,
							APPR_STAT_CD: all.APPR_STAT_CD.replace('APP-', '')
						});
					});

					_this3.varFilterArray = tmpVar;
					_this3.varFilterArrayLength = _this3.varFilterArray.length;
				}, function (failed) {
					_toastr2.default.error(failed, "Failed loading PROGRAM Names");
				});
			}, 500, this.currPredicate);
		};

		budget.prototype.selectedBudget = function selectedBudget(item) {

			this._objBudget.OBSERVERS.budget_dialog.forEach(function (all) {
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
define('modals/buh-program-dialog',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'modals/modal-wizard', 'objBudget', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _modalWizard, _objBudget, _aureliaDialog, _breezeClient) {
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

	var buhProgramDialog = exports.buhProgramDialog = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _modalWizard.ModalWizard, _objBudget.objBudget, _aureliaDialog.DialogController), _dec(_class = function () {
		function buhProgramDialog(multiObserver, observerLocator, Element, ModalWizard, objBudget, controller) {
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
			this._objBudget = objBudget;

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
define('modals/buh-search',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'objBudget', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _objBudget, _aureliaDialog, _breezeClient) {
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

	var buhSearch = exports.buhSearch = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _objBudget.objBudget, _aureliaDialog.DialogController), _dec(_class = function () {
		function buhSearch(multiObserver, observerLocator, Element, objBudget, controller) {
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

			this._objBudget = objBudget;

			var _query = (0, _entityManagerFactory.EntityQuery)().from('BUH_PERSONNEL').orderByDesc("BUH_PERSONNEL_ID");
			(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
				_this.items = success.results;
			}, function (failed) {
				_toastr2.default.error(failed, "Failed loading PROGRAM Names");
			});

			multiObserver.observe([[this, '_bOPTIONAL_GLOBAL_ID'], [this, '_bFIRST_NAME'], [this, '_bLAST_NAME'], [this, '_bMIDDLE_NAME'], [this, '_bEMAIL_ADDRESS']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._objBudget.OBSERVERS.clear_program_modal.push(function () {
				_this.ClearSearch();
			});
		}

		buhSearch.prototype.selectedTalent = function selectedTalent(item) {

			this._objBudget.OBSERVERS.pass_value.forEach(function (all) {
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
define('modals/change_password',['exports', 'multi-observer', 'aurelia-framework', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'objBudget', 'aurelia-dialog', '../settings'], function (exports, _multiObserver, _aureliaFramework, _underscore, _jquery, _entityManagerFactory, _toastr, _objBudget, _aureliaDialog, _settings) {
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

    var change_password = exports.change_password = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _objBudget.objBudget, _aureliaDialog.DialogController), _dec(_class = function () {
        function change_password(multiObserver, observerLocator, Element, objBudget, controller) {
            _classCallCheck(this, change_password);

            this.items = [];
            this.observerLocator = null;

            this.controller = controller;
            this._objBudget = objBudget;
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

            _jquery2.default.post(_settings2.default.ActualCostService + "/home/Set_Password", {
                "USER_ID": this._objBudget.USER.USER_ID,
                "COMPANY_ID": this._objBudget.USER.COMPANY_ID,
                "Password": this._NEW_PASSWORD,
                "HASH": this._objBudget.USER.HASH
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
define('modals/confirm_dialog',['exports', 'aurelia-framework', 'modals/modal-wizard', 'multi-observer', 'objBudget', 'aurelia-dialog'], function (exports, _aureliaFramework, _modalWizard, _multiObserver, _objBudget, _aureliaDialog) {
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

	var confirm_dialog = exports.confirm_dialog = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _modalWizard.ModalWizard, _objBudget.objBudget, _aureliaDialog.DialogController), _dec(_class = (_class2 = function () {
		function confirm_dialog(multiObserver, ModalWizard, objBudget, controller) {
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
			this._objBudget = objBudget;

			this._objBudget.OBSERVERS.close_modal.push(function (val) {
				_this.CloseModal(val);
			});

			this._objBudget.OBSERVERS.open_modal_message.push(function (val1, val2, val3) {
				_this.OpenModal(val1, val2, val3);
			});

			this._objBudget.OBSERVERS.enable_modal_button.push(function (val1, val2) {
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

				if (_this2.to.cleardispatch !== undefined) _this2._objBudget.OBSERVERS[_this2.to.cleardispatch].forEach(function (all) {
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
define('modals/globalindivmstr',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'modals/modal-wizard', 'objBudget', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _modalWizard, _objBudget, _aureliaDialog, _breezeClient) {
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

	var globalindivmstr = exports.globalindivmstr = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _modalWizard.ModalWizard, _objBudget.objBudget, _aureliaDialog.DialogController), _dec(_class = function () {
		function globalindivmstr(multiObserver, observerLocator, Element, ModalWizard, objBudget, controller) {
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
			this._objBudget = objBudget;

			_toastr2.default.info("Personnel Data...", "Loading..");
			this.varActiveFromCompanyMstr = _underscore2.default.filter((0, _masterfiles.getLookups)().GLOBAL_COMPANY_MSTR, function (all) {
				return all.STATUS_CD != 'ACTV';
			}).map(function (val) {
				return val.GLOBAL_ID;
			});

			_toastr2.default.success("Start Search...", "Loading Finish..");
			this.observerLocator = observerLocator;

			multiObserver.observe([[this, '_bGLOBAL_INDIV_ID'], [this, '_bPERSONNEL_NAME']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._objBudget.OBSERVERS.clear_indiv_modal.push(function () {
				_this.ClearSearch();
			});
		}

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
			var _this2 = this;

			var lstPredicates = [];
			_underscore2.default.each(this._rGROUP_TITLE.querySelectorAll('input'), function (all) {

				var varOb = _this2.observerLocator.getObserver(_this2, all.getAttribute('searchable').replace('_s', '_b'));

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
			var _this3 = this;

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

					var result_p = _underscore2.default.find(_this3.varActiveFromCompanyMstr, function (all_p) {
						return all_p == all.GLOBAL_INDIV_ID;
					});

					return result_p == undefined;
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
define('modals/indivmstr',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'modals/modal-wizard', 'objBudget', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _modalWizard, _objBudget, _aureliaDialog, _breezeClient) {
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

	var indivmstr = exports.indivmstr = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _modalWizard.ModalWizard, _objBudget.objBudget, _aureliaDialog.DialogController), _dec(_class = function () {
		function indivmstr(multiObserver, observerLocator, Element, ModalWizard, objBudget, controller) {
			var _this = this;

			_classCallCheck(this, indivmstr);

			this.items = [];
			this.observerLocator = null;
			this.pageindex = 0;
			this.varFilterArray = [];
			this.varFilterArrayLength = 0;
			this.controller = null;


			this.controller = controller;
			this._objBudget = objBudget;
			this._ModalWizard = ModalWizard;
			_toastr2.default.info("Personnel Data...", "Loading..");

			_toastr2.default.success("Start Search...", "Loading Finish..");

			this.observerLocator = observerLocator;

			multiObserver.observe([[this, '_bGLOBAL_INDIV_ID'], [this, '_bPERSONNEL_NAME']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._objBudget.OBSERVERS.clear_indiv_modal.push(function () {
				_this.ClearSearch();
			});
		}

		indivmstr.prototype.selectedIndiv = function selectedIndiv(item) {

			this.controller.ok(item);
		};

		indivmstr.prototype.fnManualFilter = function fnManualFilter(tmpVar) {
			var _this2 = this;

			var lstPredicates = [];

			_underscore2.default.each(this._rGROUP_TITLE.querySelectorAll('input'), function (all) {

				var varOb = _this2.observerLocator.getObserver(_this2, all.getAttribute('searchable').replace('_s', '_b'));

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

			if (this._rGROUP_TITLE === undefined || this._rGROUP_TITLE === null) return;
			var tmpVar = this.fnManualFilter(this.varFilterArray);

			if (tmpVar.length > 0) {
				var tmpVarNew = _underscore2.default.sortBy(tmpVar, 'PERSONNEL_NAME').reverse();
				this.varFilterArray = tmpVarNew;
				this.varFilterArrayLength = this.varFilterArray.length;
				return;
			} else {
				tmpVar = this.fnManualFilter((0, _masterfiles.getLookups)().GLOBAL_INDIV_WITH_ALIAS);
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
define('modals/job',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'objBudget', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _objBudget, _aureliaDialog, _breezeClient) {
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

	var job = exports.job = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _objBudget.objBudget, _aureliaDialog.DialogController), _dec(_class = function () {
		function job(multiObserver, observerLocator, Element, objBudget, controller) {
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

			this._objBudget = objBudget;

			multiObserver.observe([[this, '_bJOB_GRP'], [this, '_bJOB_DESC']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._objBudget.OBSERVERS.clear_job_modal.push(function () {
				_this.ClearSearch();
			});
		}

		job.prototype.selectedTalent = function selectedTalent(item) {

			this._objBudget.OBSERVERS.pass_job.forEach(function (all) {
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
					return all.COMPANY_ID == _this3._objBudget.USER.COMPANY_ID;
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

					this._objBudget.OBSERVERS.pass_job.forEach(function (all) {
						all(_this5.varFilterArray[0]);
					});
				}
			}
		};

		return job;
	}()) || _class);
});
define('modals/login',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'modals/modal-wizard', 'objBudget', 'aurelia-dialog', '../settings', 'moment', 'modals/confirm_dialog'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _underscore, _jquery, _entityManagerFactory, _toastr, _modalWizard, _objBudget, _aureliaDialog, _settings, _moment, _confirm_dialog) {
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

    var login = exports.login = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _modalWizard.ModalWizard, _objBudget.objBudget, _aureliaDialog.DialogController, _aureliaDialog.DialogService), _dec(_class = (_class2 = function () {
        function login(multiObserver, observerLocator, Element, ModalWizard, objBudget, controller, DialogService) {
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

            this._objBudget = objBudget;


            var varGetUserRole = (0, _entityManagerFactory.EntityQuery)().from('USER_ROLE_TRX').orderBy("USER_ID");

            (0, _entityManagerFactory.EntityManager)().executeQuery(varGetUserRole).then(function (found) {
                _this._user_content.push({});
                found.results.forEach(function (all) {

                    if (all.ROLE_CD == null || all.ROLE_CD == undefined) {
                        _this._user_content.push(all);
                    } else if (all.ROLE_CD.includes('ACCESSALL') || all.ROLE_CD.includes('PPFCS')) {
                        _this._user_content.push(all);
                    }
                });
            });

            (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('COMPANY_MSTR').orderBy("COMPANY_NAME")).then(function (found) {
                _this._companies.push({ COMPANY_ID: 0, COMPANY_NAME: "" });
                found.results.forEach(function (all) {
                    _this._companies.push({ COMPANY_ID: all.COMPANY_ID, COMPANY_NAME: all.COMPANY_NAME });
                });
            });

            this._objBudget.OBSERVERS.clear_log.push(function () {
                _this.ClearLogin();
            });

            this._objBudget.OBSERVERS.clear_login_modal.push(function () {
                _this.ClearSearch();
            });

            (0, _entityManagerFactory.EntityManager)().executeQuery((0, _entityManagerFactory.EntityQuery)().from('USER_PROFILE_MSTR')).then(function (found) {
                _this._USER_PROFILE_MSTR = found.results;
            });

            _jquery2.default.ajax({
                type: "GET",
                dataType: 'jsonp',
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                data: {
                    "USER_ID": "KARRENA",
                    "COMPANY_ID": 1,
                    "PASSWORD": "12345678",
                    "UPDATE_EXPIRED": false },
                url: _settings2.default.serviceNameBase + "/UserAccess/Check_User",
                success: function success(data) {
                    alert(9);
                }
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
                _jquery2.default.post(_settings2.default.ActualCostService + "/home/Set_Password", {
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
            _settings2.default.isNavigating = false;
            _toastr2.default.clear();
            _jquery2.default.ajax({
                dataType: "json",
                type: "GET",
                url: _settings2.default.serviceNameBase + "/UserAccess/Check_User",
                success: function success(result) {
                    console.log(result);
                }
            });
        };

        login.prototype.loginSuccess = function loginSuccess(response, CALLER) {
            var _this3 = this;

            if (response == "") {
                _toastr2.default.error("USER ID Not found", "Searching USER..");
                this.disableLogButton = false;
                return;
            } else {
                _toastr2.default.success("Welcome.. " + JSON.parse(response).USER_ID, "User Found");

                var varUserAtt = JSON.parse(response);
                varUserAtt.ROLE_CD = this._USER.ROLE_CD;

                this.controller.ok(varUserAtt);

                this._objBudget.USER = varUserAtt;

                this._objBudget.ALLOW_PASS_CONFIDENTIAL = false;

                var checkRole = (0, _entityManagerFactory.EntityQuery)().from('MODULE_ACCESS_TRX').where("ROLE_CD", "==", this._USER.ROLE_CD).select('ROLE_CD,MODULE_MSTR.MODULE_NAME,ACCESS_FL').expand('MODULE_MSTR');

                (0, _entityManagerFactory.EntityManager)().executeQuery(checkRole).then(function (success) {
                    success.results.forEach(function (all) {
                        if (all.ROLE_CD == _this3._USER.ROLE_CD) {

                            if (all.MODULE_MSTR.MODULE_NAME.includes("CONCEAL") && all.ACCESS_FL == "1") {
                                _this3._objBudget.ALLOW_PASS_CONFIDENTIAL = true;
                            }
                        }
                    });
                });

                _jquery2.default.get(_settings2.default.serviceNameBase + "/UserAccess/User_Access", {
                    "USER_ID": this._USER.USER_ID,
                    "HASH": this._USER.HASH
                }).done(function (response) {
                    console.log(response);
                });
            }
        };

        login.prototype.ClearLogin = function ClearLogin() {
            this._USER = "";
            this._COMPANY = "";
            this._PASSWORD = "";

            this._objBudget.USER = {};
        };

        login.prototype.ClearSearch = function ClearSearch() {
            this._USER = "";
            this._COMPANY = null;
            this._PASSWORD = "";
        };

        login.prototype.resetPassword = function resetPassword() {
            var _this4 = this;

            if (_underscore2.default.isUndefined(this._USER.USER_ID) || _underscore2.default.isNull(this._USER.USER_ID) || this._USER.USER_ID.trim().length === 0 || _underscore2.default.isUndefined(this._COMPANY.COMPANY_ID) || _underscore2.default.isNull(this._COMPANY.COMPANY_ID)) {
                _toastr2.default.error("Invalid USER/COMPANY", "Reset Password");
                return;
            }

            this.dialogService.open({ viewModel: _confirm_dialog.confirm_dialog, model: 'Reset Password?' }).whenClosed(function (response) {
                if (!response.wasCancelled) {

                    _toastr2.default.info("Please wait..", "Resetting Password");
                    _settings2.default.isNavigating = true;
                    _jquery2.default.post(_settings2.default.ActualCostService + "/home/Reset_Password", {
                        "USER_ID": _this4._USER.USER_ID,
                        "COMPANY_ID": _this4._COMPANY.COMPANY_ID
                    }).done(function (response) {
                        _settings2.default.isNavigating = false;
                        if (response == "false") {
                            _toastr2.default.error("Error saving new password.", "Reset Password");
                        } else {
                            _toastr2.default.success("Password has been reset and emailed to you.", "Reset Password");

                            if (_this4.user_expired) setTimeout(function () {
                                location.reload();
                            }, 3000);
                        }
                    });
                }
            });
        };

        login.prototype._USERChanged = function _USERChanged() {
            var _this5 = this;

            if (_underscore2.default.isUndefined(this._USER.USER_ID) || _underscore2.default.isNull(this._USER.USER_ID) || this._USER.USER_ID.trim().length === 0) {} else {
                var varFound = this._USER_PROFILE_MSTR.find(function (all) {
                    return all.USER_ID == _this5._USER.USER_ID;
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
define('modals/modalcontainer',['exports', 'aurelia-framework', 'modals/modal-wizard', 'multi-observer', 'objBudget'], function (exports, _aureliaFramework, _modalWizard, _multiObserver, _objBudget) {
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

	var modalcontainer = exports.modalcontainer = (_dec = (0, _aureliaFramework.inject)(_modalWizard.ModalWizard, _multiObserver.MultiObserver, _objBudget.objBudget), _dec(_class = (_class2 = function () {
		function modalcontainer(ModalWizard, multiObserver, objBudget) {
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
			this._objBudget = null;

			this._objBudget = objBudget;

			this._ModalWizard = ModalWizard;
			this.multiObserver = multiObserver;

			this._objBudget.OBSERVERS.init_modal.push(function () {
				_this.InitializeModal();
			});

			this._objBudget.OBSERVERS.close_modal.push(function (val) {
				_this.CloseModal(val);
			});

			this._objBudget.OBSERVERS.open_modal.push(function (val) {
				_this.OpenModal(val);
			});

			this._objBudget.OBSERVERS.enable_modal_button.push(function (val1, val2) {
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

				if (_this2.to.cleardispatch !== undefined) _this2._objBudget.OBSERVERS[_this2.to.cleardispatch].forEach(function (all) {
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
define('modals/program',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', '../entity-manager-factory', 'toastr', 'objBudget', 'aurelia-dialog', 'breeze-client'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _entityManagerFactory, _toastr, _objBudget, _aureliaDialog, _breezeClient) {
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

	var program = exports.program = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _objBudget.objBudget, _aureliaDialog.DialogController), _dec(_class = function () {
		function program(multiObserver, observerLocator, Element, objBudget, controller) {
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

			this._objBudget = objBudget;

			multiObserver.observe([[this, '_bPROGRAM_CD'], [this, '_bPROGRAM_TITLE']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._objBudget.OBSERVERS.clear_program_modal.push(function () {
				_this.ClearSearch();
			});
		}

		program.prototype.selectedTalent = function selectedTalent(item) {

			this._objBudget.OBSERVERS.pass_value.forEach(function (all) {
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

			if (this._objBudget.PROGRAM_USER.length == 0) {

				var _query = (0, _entityManagerFactory.EntityQuery)().from('PROGRAM_USER_TRX');
				(0, _entityManagerFactory.EntityManager)().executeQuery(_query).then(function (success) {
					success.results.forEach(function (all) {
						if (all.USER_ID == _this2._objBudget.USER.USER_ID) _this2._objBudget.PROGRAM_USER.push(all);
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

						var findProgramUser = _this2._objBudget.PROGRAM_USER.find(function (allP) {
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

			this._objBudget.OBSERVERS.pass_program.forEach(function (all) {
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
define('modals/talentmanagergroups',['exports', '../masterfiles', 'multi-observer', 'aurelia-framework', '../helpers', 'underscore', 'jquery', 'objBudget', 'aurelia-dialog'], function (exports, _masterfiles, _multiObserver, _aureliaFramework, _helpers, _underscore, _jquery, _objBudget, _aureliaDialog) {
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

	var talentmanagergroups = exports.talentmanagergroups = (_dec = (0, _aureliaFramework.inject)(_multiObserver.MultiObserver, _aureliaFramework.ObserverLocator, Element, _objBudget.objBudget, _aureliaDialog.DialogController), _dec(_class = function () {
		function talentmanagergroups(multiObserver, observerLocator, Element, objBudget, controller) {
			var _this = this;

			_classCallCheck(this, talentmanagergroups);

			this.items = [];
			this.observerLocator = null;
			this.varFilterArray = [];
			this.varFilterArrayLength = 0;
			this.pageindex = 0;
			this.controller = null;

			this.controller = controller;

			this._objBudget = objBudget;
			this.observerLocator = observerLocator;

			this.items = (0, _masterfiles.getLookups)().GLOBAL_GRP_MSTR;
			multiObserver.observe([[this, '_bGLOBAL_GRP_ID'], [this, '_bGROUP_NAME']], function (newValue, oldValue) {
				return _this.onSpeculateProp(newValue, oldValue);
			});

			this._objBudget.OBSERVERS.clear_talentmanager_modal.push(function () {
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
					this._objBudget.OBSERVERS.pass_value.forEach(function (all) {
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
define('tools/gridpaging',['exports', 'aurelia-framework', 'aurelia-binding', 'objBudget'], function (exports, _aureliaFramework, _aureliaBinding, _objBudget) {
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

	var gridpaging = exports.gridpaging = (_dec = (0, _aureliaFramework.inject)(_aureliaBinding.ObserverLocator, _objBudget.objBudget), _dec(_class = (_class2 = function () {
		function gridpaging(observerLocator, objBudget) {
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

			this._objBudget = objBudget;

			var subscription = observerLocator.getObserver(this, 'to').subscribe(function () {
				_this.onChange();
			});

			this._objBudget.OBSERVERS.enable_modal_button.push(function (id, val) {
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
define('text!actual_cost.html', ['module'], function(module) { module.exports = "<template>\n  <!--<iframe src=\"http://localhost:15253?USER_ID=${_objBudget.USER.USER_ID}&COMPANY_ID=${_objBudget.USER.COMPANY_ID}&HASH=${_objBudget.USER.HASH}&Is_HR=${_objBudget.USER.Is_HR}&Is_Branch=${_objBudget.USER.Is_Branch}&EMPLOYEE_ID=${_objBudget.USER.EMPLOYEE_ID}&EMAIL_ADDRESS=${_objBudget.USER.EMAIL_ADDRESS}&ROLE_CD=${_objBudget.USER.ROLE_CD}\" style=\"width:100%;height:100%;border:0px;margin-top:20px;\"></iframe>-->\n  <iframe src=\"http://absppms2:8084\" style=\"width:100%;height:100%;border:0px;margin-top:20px;\"></iframe>\n</template>"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <!--<link href=\"/styles/bootstrap.css\" rel=\"stylesheet\" />-->\r\n  <link rel=\"stylesheet\" href=\"/styles/styles.css\">\r\n  <link rel=\"stylesheet\" href=\"/styles/datepicker.css\">\n  <link rel=\"stylesheet\" href=\"/styles/toastr.css\">\n  <link href=\"/styles/font-awesome.min.css\" rel=\"stylesheet\" />\n  <require from='nav-bar'></require>\n  <require from=\"bootstrap/css/bootstrap.css\"></require>\n  \n  <nav-bar router.bind=\"router\"></nav-bar>\n\n  <div class=\"page-host\">\n    <router-view></router-view>\n  </div>\n\n  <!--<router-view></router-view>-->\n</template>\n"; });
define('text!blankpage.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"divBackgroundMainPage text-center\" style=\"width:100%;height:780px;\">\n      \n\n    </div>\n    \n\r\n</template>"; });
define('text!buh.html', ['module'], function(module) { module.exports = "<template>\n\t<div style=\"margin-left:10%!important;margin-right:10%!important;margin-top:3%;width:800px;text-align:center;\" class=\"divBackground\">\n\t\t<table>\n\t\t\t<tr>\n\t\t\t\t<td><label>GLOBAL ID:</label></td>\n\t\t\t\t<td><input value.bind=\"_objBUH.OPTIONAL_GLOBAL_ID\" disabled.bind=\"_disableCells\" id=\"txtGlobalID\"/></td>\n\t\t\t\t<td class=\"text-right\"><label>E-Mail:</label></td>\n\t\t\t\t<td colspan=\"2\" class=\"text-left\"><input id=\"txtEmail\" value.bind=\"_objBUH.EMAIL_ADDRESS\"  disabled.bind=\"_disableCells\" style=\"width:250px;\" /></td>\n\t\t\t</tr>\n\n\t\t\t<tr>\n\t\t\t\t<td><label>LAST NAME:</label></td>\n\t\t\t\t<td><input value.bind=\"_objBUH.LAST_NAME\" id=\"txtLastName\" disabled.bind=\"_disableCells\" /></td>\n\t\t\t\t<td class=\"text-right\"><label>FIRST NAME:</label></td>\n\t\t\t\t<td class=\"text-left\"><input value.bind=\"_objBUH.FIRST_NAME\" id=\"txtFirstName\" disabled.bind=\"_disableCells\" /></td>\n\t\t\t\t<td class=\"text-right\"><label>MIDDLE:</label></td>\n\t\t\t\t<td class=\"text-left\"><input value.bind=\"_objBUH.MIDDLE_NAME\"  id=\"txtMiddle\" disabled.bind=\"_disableCells\" /></td>\n\t\t\t</tr>\n\n\t\t\t<tr>\n\t\t\t\t<td colspan=\"7\" style=\"text-align:center;\"><br/>\n\t\t\t\t\t<input type=\"Button\" id=\"btnGlobalID\" value=\"Search\" click.delegate=\"fnCRUD('search')\" disabled.bind=\"_disableSearch\" class=\"btn btn-xs customButton\"/>\n\t\t\t\t\t<input type=\"button\" id=\"btnAdd\"  disabled.bind=\"_disableAdd\" value=\"Add\" click.delegate=\"fnCRUD('add')\" class=\"btn btn-xs customButton\"/>\n\t\t\t\t\t<input type=\"button\" id=\"btnDelete\" disabled.bind=\"_disableDelete\"  value=\"Delete\" click.delegate=\"fnCRUD('delete')\" class=\"btn btn-xs customButton\"/>\n\t\t\t\t\t<input type=\"button\" id=\"btnSave\" disabled.bind=\"_disableSave\" value=\"Save\" click.delegate=\"fnCRUD('save')\" class=\"btn btn-xs customButton\"/>\n\t\t\t\t\t<input type=\"button\" id=\"btnCancel\" value=\"Cancel/Clear\" click.delegate=\"fnCRUD('cancel')\" class=\"btn btn-xs customButton\"/>\n\t\t\t\t\t<br/><br/>\n\t\t\t\t</td>\n\t\t\t</tr>\t\n\t\t</table>\n\n\t\t<table class=\"table table-hover table-condensed table-bordered table-striped\" ref=\"tblData\" >\n\t\t\t<thead>\n\t\t\t\t<tr><td class=\"colorCell\">PROGRAM ID</td>\n\t\t\t\t\t<td class=\"colorCell\">PROGRAM TITLE</td>\n\t\t\t\t\t<td class=\"colorCell\"><input type=\"button\" value=\"+\" disabled.bind=\"_disableGrid\" click.delegate=\"searchPrograms()\"/> </td>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody>\n\t\t\t\t<tr repeat.for=\"item of _objBUH.PROGRAMS\">\n\t\t\t\t\t<td>${item.PROGRAM_CD}</td>\n\t\t\t\t\t<td>${item.PROGRAM_TITLE}</td>\n\t\t\t\t\t<td><input type=\"button\" value=\"-\" disabled.bind=\"_disableGrid\" click.delegate=\"$parent.deleteSelected($index)\"/>\n\t\t\t\t\t</td> \n\t\t\t\t</tr>\n\t\t\t</tbody>\n\t\t</table>  \n\n\n\t\t<!--<input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"loginDisabled\" value=\"LOG-IN\" style=\"padding-left:15px;padding-right:15px;\" click.trigger=\"fnLogin()\"/>\n\t\t<input type=\"button\" click.delegate=\"logout()\" value=\"LOG-OUT\"  disabled.bind=\"logoutDisabled\"  css=\"visibility: ${showingLogout}\" class=\"btn btn-xs customButton\">--> \n\n\n\n\t\t<br/>\n\t\t<br/>\n\t\t<table class= \"table-bordered\">\n\t\t\t<tr>\n\t\t\t\t<td>\n\t\t\t\t\tLOGGED AS:\n\t\t\t\t</td>\n\t\t\t\t<td>\n\t\t\t\t\t<strong>${_user.USER_ID}</strong> \n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t</table>\n\n\n\t</template>"; });
define('text!child-router.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"au-animate\">\n    <h2>${heading}</h2>\n    <div>\n      <div class=\"col-md-2\">\n        <ul class=\"well nav nav-pills nav-stacked\">\n          <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n            <a href.bind=\"row.href\">${row.title}</a>\n          </li>\n        </ul>\n      </div>\n      <div class=\"col-md-10\" style=\"padding: 0\">\n        <router-view></router-view>\n      </div>\n    </div>\n  </section>\n</template>\n"; });
define('text!group_individual.html', ['module'], function(module) { module.exports = "<template>\r\n  <!-- <require from=\"modals/modalcontainer\"></require> -->\r\n  <require from=\"converters/filtercustom\"></require>\r\n  <require from=\"converters/sorttext\"></require>\r\n  <div style=\"margin-left:10%!important;margin-right:10%!important;margin-top:3%;text-align:center\" class=\"text-center divBackground\" >\r\n  \t<table class=\"table table-hover table-condensed table-bordered table-striped\" style=\"width:80%;\">\r\n     <tr>\r\n        <td style=\"width:50%;text-align:center;\" colspan=3><strong>TALENT LIST</strong></td>\r\n      </tr>\r\n  \t\t<tr>\r\n        <!-- class=\"typeahead\" -->\r\n        <td style=\"width:20%;\" class=\"text-left\">Global ID: ${_GLOBAL_GRP_ID}</td>\r\n        <!-- class=\"typeahead\" -->\r\n        <td style=\"width:45%;\"class=\"text-left\">Name: ${_GROUP_NAME}\r\n          <!-- <input id=\"idTalentManager\" class=\"typeahead\"/> -->\r\n        </td>\r\n        <td style=\"width:30%;\">\r\n          <!-- <modalcontainer to.bind=\"modalTalentManager\"></modalcontainer> -->\r\n          <input type=\"button\" class=\"btn btn-xs customButton\" value=\"Find Talent Manager\" style=\"padding-left:15px;padding-right:15px;\" click.delegate=\"findTalentManager()\" disabled.bind=\"disabledfindTM\" />\r\n\r\n          <button class=\"btn btn-xs customButton\" click.trigger=\"clear()\">Clear</button>\r\n          <button class=\"btn btn-xs customButton\" click.trigger=\"saveGroupIndiv()\"  disabled.bind=\"isDisableSave\" >Save</button>\r\n\r\n        </td>\r\n      </tr>\r\n     \r\n      <tr>\r\n        <td colspan=3 style=\"text-align:right;\">\r\n          <!-- <modalcontainer style=\"text-align:left;\" to.bind=\"modalIndivMstr\"></modalcontainer> -->\r\n          <input type=\"button\" class=\"btn btn-xs customButton\" value=\"Search Talent\" style=\"padding-left:15px;padding-right:15px;\" disabled.bind=\"disabledfindTalent\" click.delegate=\"findTalent()\"/>\r\n        </td>\r\n      </tr>\r\n      <tr>\r\n       <td colspan=3>\r\n         <table class=\"table table-hover table-condensed table-bordered table-striped\" style=\"width:100%;\">\r\n          <thead>\r\n           <tr><td style=\"width:30%;\">GLOBAL ID</td><td style=\"width:60%;\">TALENTS</td><td></td></tr>\r\n         </thead>\r\n         <tbody>\r\n           <tr repeat.for=\"item of grpMembers | filtercustom:'STATUS_CD':'ACTV':_signal | sorttext:'PERSONNEL_NAME':'ascending'\">\r\n            <td style=\"width:20%;\">${item.GLOBAL_INDIV_ID}</td>\r\n            <td style=\"width:60%;\">${item.PERSONNEL_NAME}</td>\r\n            <td><button click.delegate=\"$parent.deleteItem(item)\">X</button>\r\n            </td>\r\n          </tr>\r\n\r\n        </tbody>\r\n      </table>\r\n    </td>\r\n  </tr>\r\n</table>\r\n\r\n<!-- <modalcontainer to.bind=\"modalLogin\"></modalcontainer> -->\r\n<!--<div style=\"margin-right:200px!important;\">\r\n    <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"loginDisabled\" value=\"LOG-IN\" style=\"padding-left:15px;padding-right:15px;\" click.delegate=\"fnLogin()\"/>\r\n    <input type=\"button\" click.delegate=\"logout()\" value=\"LOG-OUT\"  disabled.bind=\"logoutDisabled\"  css=\"visibility: ${showingLogout}\" class=\"btn btn-xs customButton\"> \r\n</div>-->\r\n<div>\r\n  <br/>\r\n  <br/>\r\n  <table class= \"table-bordered\">\r\n    <tr>\r\n      <td>\r\n        LOGGED AS:\r\n      </td>\r\n      <td>\r\n        <strong>${_objBudget.USER.USER_ID}</strong> \r\n      </td>\r\n    </tr>\r\n  </table>\r\n</div>\r\n</div>\r\n\r\n</template>"; });
define('text!guest.html', ['module'], function(module) { module.exports = "<template>\r\n            <require from=\"converters/filtercustom\"></require>\r\n            <require from=\"converters/signals\"></require>\r\n            <table class=\"table table-hover table-condensed table-bordered table-striped\" style=\"width:70%;\" ref=\"tblData\">\r\n                <thead>\r\n                    <tr><td class=\"colorCell\">PAY MODE</td>\r\n                        <td class=\"colorCell\">BUDGET</td>\r\n                        <td class=\"colorCell\">PAY MODE FACTOR</td>\r\n                        <td class=\"colorCell\">REMARKS</td>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr repeat.for=\"item of _objBudget.GUEST | filtercustom:'visible':true:_signal\">\r\n                      <td> <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" class=\"pymnttrmclass\" value.bind=\"item.PAYMENT_TERM\" style=\"width:auto !important;\" blur.trigger=\"$parent.fnRegularBlurEvt(item,$index)\"  focus.trigger=\"$parent.fnRegularFocus($index,'TERM')\"/></td>\r\n                      <td> <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.INPUT_AMT_TMP\" blur.trigger=\"$parent.AmountBlur(item,'INPUT_AMT_TMP')\" class=\"text-right\" style=\"width:auto !important;\"/></td>\r\n                      <td>  <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.PAY_RATE_FACTOR_TMP\"  blur.trigger=\"$parent.AmountBlur(item,'PAY_RATE_FACTOR_TMP')\" class=\"text-right\"  style=\"width:auto !important;\"/></td>\r\n                      <td> <textarea  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.REMARKS\" style=\"height:20px !important;\"></textarea></td>\r\n                </tr>\r\n                </tbody>\r\n            </table>  \r\n              <button class=\"btn btn-xs customButton\" if.bind=\"_enableAdd\" click.delegate=\"fnAddGuest()\" disabled.bind=\"_objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\">Add Guest</button>\r\n              <button class=\"btn btn-xs customButton\" if.bind=\"_enableRemove\"click.delegate=\"fnRemoveGuest()\" disabled.bind=\"_objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\">Remove Guest</button>\r\n              <button class=\"btn btn-xs customButton\" click.delegate=\"saveGuest()\" disabled.bind=\"_objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\">Save</button>\r\n</template>"; });
define('text!main-header.html', ['module'], function(module) { module.exports = "<template>\r\n    <!-- <require from=\"modals/modalcontainer\"></require> -->\r\n    <!-- <require from=\"modals/confirm_dialog\"></require> -->\r\n\r\n    <require from=\"converters/datepattern\"></require>\r\n   \r\n     <table style=\"margin-left: 25px; \" class=\"classIEnable\">\r\n            <tbody >\r\n                <tr>\r\n                    <td style=\"vertical-align: top;\">\r\n                        <table>\r\n                             <tr>\r\n                                <td style=\"width: 120px; vertical-align: middle;\" class=\"text-left\" >Budget ID</td>\r\n                                <td>\r\n                                 <input value.bind=\"_objBudget.HEADER.BDGT_TMPL_ID\" style=\"width: 80px;\" keyup.delegate=\"inputChanged($event,_objBudget.HEADER.BDGT_TMPL_ID)\" readonly.bind=\"_disableBudgetId\"/>\r\n                                 <!-- <modalcontainer to.bind=\"modalBudget\"></modalcontainer> -->\r\n                                 <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"budgetDisabled\" click.trigger=\"fnDialogBudget()\" value=\"SEARCH\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n                             </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td style=\"width: 120px;\">Program Name/CC</td>\r\n                                <td style=\"width: auto;\">\r\n                                    <input readonly=\"readonly\" value.bind=\"_objBudget.HEADER.PROGRAM_MSTR.PROGRAM_TITLE\"style=\"width: 250px;\"/>*\r\n                                    <!-- <modalcontainer to.bind=\"modalProgram\"></modalcontainer> -->\r\n                                    <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"programDisabled\" click.trigger=\"fnDialogProgram()\" value=\"..\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>Program IO/CC#</td>\r\n                                <td>\r\n                                    <input value.bind=\"_objBudget.HEADER.CHARGE_CD\" readonly=\"readonly\" /></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>Program Genre</td>\r\n                                <td>\r\n                                    <select value.bind=\"_objBudget.HEADER.PROGRAM_GENRE_CD\" disabled.bind=\"_objBudget.STATUS=='APPROVED'\">\r\n                                        <option repeat.for=\"item of _PROGRAM_GENRE_MSTR\" value.bind=\"item.PROGRAM_GENRE_CD\">\r\n                                            ${item.PROGRAM_GENRE_CD}\r\n                                        </option>\r\n                                    </select>*\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>Telecast Mode</td>\r\n                                <td>\r\n                                      <select value.bind=\"_objBudget.HEADER.TELECAST_MODE_CD\" disabled.bind=\"_objBudget.STATUS=='APPROVED'\">\r\n                                        <option repeat.for=\"item of _TELECAST_MODE_MSTR\" value.bind=\"item.TELECAST_MODE_CD\">\r\n                                            ${item.TELECAST_MODE_CD}\r\n                                        </option>\r\n                                    </select>*\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>Episode Type</td>\r\n                                <td>\r\n                                       <select value.bind=\"_objBudget.HEADER.EPISODE_TYPE_CD\" disabled.bind=\"_objBudget.STATUS=='APPROVED'\">\r\n                                        <option repeat.for=\"item of _EPISODE_TYPE_MSTR\" value.bind=\"item.EPISODE_TYPE_CD\">\r\n                                            ${item.EPISODE_TYPE_CD}\r\n                                        </option>\r\n                                    </select>*\r\n                                    </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>No. of Episodes</td>\r\n                                <td>\r\n                                    <input value.bind=\"_objBudget.HEADER.EPISODES\" class=\"col-md-3 text-right\" readonly.bind=\"_objBudget.STATUS=='APPROVED'\"/>*</td>\r\n                            </tr>\r\n                             <tr>\r\n                                <td>No. of Taping days</td>\r\n                                <td>\r\n                                    <input value.bind=\"_objBudget.HEADER.TAPING_DAYS\" readonly.bind=\"_objBudget.STATUS=='APPROVED'\" class=\"col-md-3 text-right\"/>*</td>\r\n                            </tr>\r\n                        </table>\r\n                    </td>\r\n                    <td style=\"vertical-align: top; text-align: left; margin: 0px 0px 0px 0px;\">\r\n                        <table style=\"padding: 0px 0px 0px 0px; margin: 0px 0px 0px 0px;\">\r\n                            <tr>\r\n                                <td class=\"text-center\" colspan=2><strong>Template Validity</strong></td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>Start Date</td>\r\n                                <td>\r\n                                    <input id=\"refFrom\"  readonly.bind=\"_objBudget.STATUS=='APPROVED'\" value.bind=\"_objBudget.HEADER.BDGT_FROM\" blur.trigger=\"checkDate('refFrom')\"/>*\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>End Date</td>\r\n                                <td>\r\n                                    <!-- trigger does not accept '', set the string id w/out '' -->\r\n                                   <input id=\"refTo\" readonly.bind=\"_objBudget.STATUS=='APPROVED'\" value.bind=\"_objBudget.HEADER.BDGT_TO\" blur.trigger=\"checkDate('refTo')\"/>*</td>\r\n                            </tr>\r\n                             <tr><td colspan=2 style=\"height:20px;\"></td></tr>\r\n                            <tr>\r\n                                <td>TV Station</td>\r\n                                <td>\r\n                                   <select disabled.bind=\"_objBudget.STATUS=='APPROVED'\" value.bind=\"_objBudget.HEADER.STATION_ID\">\r\n                                        <option repeat.for=\"item of _STATIONS\" value.bind=\"item\">\r\n                                            ${item}\r\n                                        </option>\r\n                                    </select>(For <strong>RNG</strong>*)\r\n                                </td>\r\n                            </tr>\r\n                            <tr>\r\n                                <td>Status</td>\r\n                                <td>\r\n                                     <select value.bind=\"_objBudget.HEADER.APPR_STAT_CD\" disabled.bind=\"_objBudget.STATUS=='APPROVED'\">\r\n                                        <option repeat.for=\"item of _STATUS\" value.bind=\"item.REF_CD\">\r\n                                            ${item.REF_DESC}\r\n                                        </option>\r\n                                    </select>*\r\n                                     <!-- value.bind=\"options: EPISODE_MODE_LIST, EPISODE_MODE_SELECTED, optionsText: 'text'\" -->\r\n                                </td>\r\n                            </tr>\r\n                             <tr>\r\n                                <td>Remarks</td>\r\n                                <td rowspan=3>\r\n                                    <textarea readonly.bind=\"_objBudget.STATUS=='APPROVED'\" value.bind=\"_objBudget.HEADER.REMARKS\" style=\"width:200px!important;\" >\r\n                                    </textarea>\r\n                                </td>\r\n                            </tr>\r\n                        </table>\r\n                    </td>\r\n\r\n                </tr>\r\n\r\n            </tbody>\r\n        </table>\r\n        <br/>\r\n        <br/>\r\n        <div style=\"margin-left:350px;\"><h5>( <strong>Note</strong> : * is required )</h2></div>\r\n        <br/>\r\n        <br/>\r\n        <br/>   \r\n        <br/>\r\n        <div style=\"margin-left:100px;\">\r\n            <button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnBudget('create')\" disabled.bind=\"_disableCreateBudget\" if.bind=\"!_disableCreateBudget\">CREATE BUDGET</button>&nbsp;&nbsp;\r\n        <button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnBudget('cancel')\" disabled.bind=\"_disableCancelBudget\">CLEAR/CANCEL</button>&nbsp;&nbsp;\r\n        <button class=\"btn btn-xs customButton\" if.bind=\"_objBudget.STATUS!='APPROVED'\" style=\"width:150px;\" click.delegate=\"fnBudget('refresh')\" disabled.bind=\"_disableRefreshBudget\">REFRESH</button>&nbsp;&nbsp;\r\n        <button class=\"btn btn-xs customButton\" if.bind=\"_objBudget.HEADER.APPR_STAT_CD!='APP-EXPIRED'\" style=\"width:150px;\" click.delegate=\"fnBudget('save')\" if.bind=\"!_disableSaveBudget\" disabled.bind=\"_disableSaveBudget\">SAVE BUDGET</button>\r\n        <button class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnBudget('print')\" disabled.bind=\"_disablePrintBudget\" disabled.bind=\"!_disablePrintBudget\">PRINT BUDGET</button>\r\n        <button if.bind=\"_objBudget.HEADER.APPR_STAT_CD=='APP-EXPIRED' || _objBudget.HEADER.APPR_STAT_CD=='APP-CLOSED'\" class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnBudget('copy')\" disabled.bind=\"_disableCopyBudget\">COPY TEMPLATE</button>\r\n        <button if.bind=\"_objBudget.STATUS=='APPROVED'\"  class=\"btn btn-xs customButton\" style=\"width:150px;\" click.delegate=\"fnBudget('close')\" disabled.bind=\"_disablePrintBudget\">SET AS CLOSED</button>\r\n         <!-- <confirm_dialog to.bind=\"modalConfirm\"></confirm_dialog> -->\r\n        </div>\r\n              <br/>\r\n        <br/>\r\n        <br/>   \r\n        <br/>\r\n\r\n        \r\n \r\n</template>"; });
define('text!mainpage.html', ['module'], function(module) { module.exports = "<template>\n  <div class=\"divBackgroundMainPage text-center\" style=\"width:100%;height:780px;\">\n    <!--<div class=\"panel panel-info\">...</div>-->\n      <div class=\"row\">\n        <div class=\"col-xs-0 col-md-4\"></div>  \n          <div class=\"list-group col-xs-12 col-md-4\" style=\"padding-top:10%;\">\n            <a href=\"#\" class=\"list-group-item active\" if.bind=\"headerVisible\" style=\"background-color: #d9edf7; color: #31708f;   border: 1px solid #a4d4e6;\">\r\n              <h3  style=\"margin-left:10px;margin-top:10px;margin-right:10px;\" class=\"list-group-item-heading\">Please Select..</h3>\r\n            </a>\r\n            <a href=\"#\" class=\"list-group-item\" click.delegate=\"navigateTo('mainview')\" if.bind=\"budgetAccess\" style=\" padding-top:15px;\">\r\n              <!--  active -->\r\n              <h3 style=\"margin:0px;color: #31708f;\">\r\n                BUDGET TEMPLATE\r\n              </h3>\r\n                <!-- .col-xs-2 .col-sm-2 .col-md-2 -->\r\n</a>\r\n            <a href=\"#\" class=\"list-group-item\" click.delegate=\"navigateTo('actual_cost')\"  if.bind=\"actualAccess\"><h3 style=\"margin:0px;color: #31708f;\">ACTUAL COST</h3></a>\r\n            <a href=\"#\" class=\"list-group-item\" click.delegate=\"navigateTo('group_individual')\" if.bind=\"talentgroupAccess\"><h3 style=\"margin:0px;color: #31708f;\">TALENT GROUP</h3></a>\r\n            <a href=\"#\" class=\"list-group-item\" click.delegate=\"navigateTo('buh')\"  if.bind=\"buhAccess\"><h3 style=\"margin:0px;color: #31708f;\">BUH</h3></a>\r\n            <!--<a href=\"#\" class=\"list-group-item\">IPS</a>-->\r\n          </div>\r\n       \n        <div class=\"col-xs-0 col-md-4\"></div>  \n      </div>\n      \n    </div>\n    \n\r\n</template>"; });
define('text!mainview.html', ['module'], function(module) { module.exports = " \r\n\r\n <template>\r\n\r\n <!-- <require from=\"modals/modalcontainer\"></require> -->\r\n <require from=\"main-header\"></require>\r\n <require from=\"personnel\"></require>\r\n <require from=\"guest\"></require>\r\n <require from=\"summary\"></require>\r\n    <br/>\r\n      \r\n <!--stylemainstayft:20px;margin-right:20px;margin-bottom:10px;margin-top:10px;\"-->\r\n     <div class=\"divBackground\" style=\"margin-left:10%;width:1035px;height: 686px;\">\r\n          <!-- Nav tabs -->\r\n          <ul class=\"nav nav-tabs backroundTab\" role=\"tablist\" style=\"width:1024px;height:38px;\">\r\n              <li role=\"presentation\" class=\"active\" ><a href=\"#main\" aria-controls=\"main\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab(0)\">Program Budget</a></li>\r\n              <li role=\"presentation\" style=\"\"><a href=\"#regular\" aria-controls=\"regular\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab(1)\" disabled.bind=\"_objBudget.STATUS=='NONE'\" >Regular</a>\r\n              </li>\r\n              <li role=\"presentation\" style=\"\"><a href=\"#semi_regular\" aria-controls=\"semi_regular\" role=\"tab\" data-toggle=\"tab\" style=\"margin-top:6px;\" click.trigger=\"clickTab(2)\" disabled.bind=\"_objBudget.STATUS=='NONE'\">Semi-Regular</a></li>\r\n              <li role=\"presentation\" style=\"\"><a href=\"#staff\" aria-controls=\"staff\" role=\"tab\" data-toggle=\"tab\" click.trigger=\"clickTab(3)\" style=\"margin-top:6px;\" disabled.bind=\"_objBudget.STATUS=='NONE'\">Staff</a></li>\r\n              <li role=\"presentation\" style=\"\"><a href=\"#guest\" aria-controls=\"guest\" role=\"tab\" data-toggle=\"tab\" click.trigger=\"clickTab(4)\" style=\"margin-top:6px;\" disabled.bind=\"_objBudget.STATUS=='NONE'\">Guest</a></li>\r\n              <li role=\"presentation\" style=\"\"><a href=\"#summary\" aria-controls=\"summary\" role=\"tab\" data-toggle=\"tab\"click.trigger=\"clickTab(5)\" style=\"margin-top:6px;\" disabled.bind=\"_objBudget.STATUS=='NONE'\">Budget Summary</a></li>\r\n          </ul>\r\n\r\n          <!-- Tab panes -->\r\n          <div class=\"tab-content\">\r\n              <div role=\"tabpanel\" class=\"tab-pane active color1\" id=\"main\"  style=\"width:1024px;height:620px;\"><br/><main-header></main-header>\r\n                <br/>\r\n                <br/>\r\n                <br/>\r\n          <!--<div style=\"margin-left:40%;\">\r\n             <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"loginDisabled\" value=\"LOG-IN\" style=\"padding-left:15px;padding-right:15px;\" click.trigger=\"fnLogin()\"/>\r\n                   <input type=\"button\" click.trigger=\"logout()\" value=\"LOG-OUT\"  disabled.bind=\"logoutDisabled\"  css=\"visibility: ${showingLogout}\" class=\"btn btn-xs customButton\"> \r\n          </div>-->\r\n\r\n              <div style=\"margin-left:25%;\">\r\n                <br/>\r\n                <br/>\r\n              <table class= \"table-bordered\">\r\n                <tr>\r\n                    <td>\r\n                        CREATED BY:\r\n                    </td>\r\n                    <td>\r\n                        ${_objBudget.HEADER.CREATED_BY}\r\n                    </td>\r\n                    <td>\r\n                        LAST UPDATED BY:\r\n                    </td>\r\n                    <td>\r\n                        ${_objBudget.HEADER.LAST_UPDATED_BY}\r\n                    </td>\r\n                    <td>\r\n                        LOGGED AS:\r\n                    </td>\r\n                    <td>\r\n                        <strong>${_objBudget.USER.USER_ID}</strong> \r\n                    </td>\r\n                    </tr>\r\n              </table>\r\n              </div>\r\n\r\n              </div>\r\n              <div role=\"tabpanel\" class=\"tab-pane color1\" id=\"regular\" style=\"width:1024px;\"><personnel to-person.bind=\"_objBudget.REGULAR\" to-person-model.bind=\"{USE:'REGULAR'}\" ></personnel></div>\r\n              <div role=\"tabpanel\" class=\"tab-pane color1\" id=\"semi_regular\" style=\"width:1024px;\"><personnel to-person.bind=\"_objBudget.SEMI_REGULAR\" to-person-model.bind=\"{USE:'SEMI_REGULAR'}\"></personnel></div>\r\n              <div role=\"tabpanel\" class=\"tab-pane color1\" id=\"staff\" style=\"width:1024px;\"><personnel to-person.bind=\"_objBudget.STAFF\"to-person-model.bind=\"{USE:'STAFF'}\"></personnel></div>\r\n              <div role=\"tabpanel\" class=\"tab-pane color1\" id=\"guest\"  style=\"width:1024px;\"><guest></guest></div>\r\n              <div role=\"tabpanel\" class=\"tab-pane color1\" id=\"summary\" style=\"width:1024px;\">\r\n                <summary></summary>\r\n              </div>\r\n          </div>\r\n            \r\n      </div>\r\n      \r\n    \r\n   <!-- <div class=\"well\">\r\n        <div class=\"input-append date\" id=\"dp3\" data-date=\"12-02-2012\" data-date-format=\"dd-mm-yyyy\">\r\n        <input class=\"span2\" size=\"16\" type=\"text\" value=\"12-02-2012\" readonly=\"\">\r\n        <span class=\"add-on\"><i class=\"icon-calendar\"></i></span>\r\n        </div>\r\n    </div> -->\r\n\r\n\r\n </template>\r\n"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template>\n  <nav class=\"navbar navbar-default navbar-fixed-top backroundTab\" role=\"navigation\" >\n    <div class=\"navbar-header\" style=\"background-color:#2191c0;margin-right:20px;margin-left:20px;\">\n      <button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n        <span class=\"sr-only\">Toggle Navigation</span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n        <span class=\"icon-bar\"></span>\n      </button>\n      <a class=\"navbar-brand\" href=\"#\" >\n        <i class=\"fa fa-home\" style=\"color:white;margin-top:0px;padding-top:0px;\"></i>\n        <span style=\"color:white\">${router.title}</span>\n      </a>\n    </div>\n\n    <div class=\"collapse navbar-collapse  .navbar-right\" id=\"bs-example-navbar-collapse-1\">\n      <!--<ul class=\"nav navbar-nav\">\n        <li repeat.for=\"row of router.navigation\" class=\"${row.isActive ? 'active' : ''}\">\n          <a if.bind=\"row.title!='PPMS'\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1.in\" href.bind=\"row.href\">${row.title}</a>\n        </li>\n      </ul>-->\n      \n      <ul class=\"nav navbar-nav\">\n        <li if.bind=\"_objBudget.USER.USER_ID!==undefined\">\r\n          <a data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1.in\" style=\"color:white;font-size:13px;\" click.trigger=\"home()\" href=\"#\">HOME</a>\n         \r\n        </li>\n          \n        <!--<li  if.bind=\"_objBudget.USER.USER_ID===undefined\">\r\n          <a data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1.in\" click.trigger=\"fnLogin()\" href=\"#\">LOG-IN</a>\r\n        </li>-->\n      </ul>\n      <ul class=\"nav navbar-nav\">\r\n        <li class=\"loader\" if.bind=\"router.isNavigating || settings.isNavigating\">\r\n          <i class=\"fa fa-spinner fa-spin fa-2x\" style=\"color:white;margin-top:0px;padding-top:0px;\"></i>\r\n        </li>\r\n      </ul>\n      <ul class=\"nav navbar-nav navbar-right\" style=\"background-color:#2191c0;height:50px;\"  if.bind=\"_objBudget.USER.USER_ID!==undefined\">\r\n        <li style=\"color:white;font-size:13px;margin-top:16px;margin-right:20px;margin-left:20px;\">\r\n          ${_objBudget.USER.USER_ID}\r\n        </li>\n        <li class=\"dropdown\">\r\n          <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-haspopup=\"true\" aria-expanded=\"false\"  style=\"color:white;font-size:13px;\">PASSWORD<span class=\"caret\"></span></a>\r\n          <ul class=\"dropdown-menu\">\r\n            <li><a href=\"#\" click.trigger=\"changePassword()\">CHANGE PASSWORD</a></li>\r\n            <!--<li role=\"separator\" class=\"divider\"></li>-->\r\n            <!--<li><a href=\"#\">EMAIL PASSWORD</a></li>-->\r\n          </ul>\r\n        </li>\n        <li if.bind=\"_objBudget.USER.USER_ID!==undefined\">\r\n          <a data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1.in\" style=\"color:white;font-size:13px;\" click.trigger=\"logout()\" href=\"#\">LOG-OUT</a>\r\n        </li>\r\n      </ul>\n    </div>\n  </nav>\n</template>\n"; });
define('text!personnel.html', ['module'], function(module) { module.exports = "<template>\r\n  <!-- <require from=\"modals/modalcontainer\"></require> -->\r\n  <require from=\"converters/number-format\"></require>\r\n  <require from=\"converters/filtercustom\"></require>\r\n  <require from=\"converters/signals\"></require>\r\n                <div style=\"overflow:scroll;height:600px !important; padding-left:10px;padding-top:10px;!important; \" scroll.trigger=\"scrollDiv()\" ref=\"divRegular\">\r\n                 <table class= \"table-hover table-condensed table-bordered table-striped\" style=\"position:absolute;z-index:1000;visibility:hidden;top:100px;\" ref=\"tblHeader\" scroll.trigger=\"scrollDiv()\" >\r\n                <thead>\r\n                    <tr>\r\n                      <td style=\"width:51px !important;background-color: white;\" class=\"text-center colorCell\">\r\n                        <div style=\"width:15px !important;cursor: pointer;\" class=\"glyphicon glyphicon-chevron-up\" click.trigger=\"moveTrigger('up')\"></div>\r\n                        <div style=\"width:15px !important;cursor: pointer;\" class=\"glyphicon glyphicon-chevron-down\" click.trigger=\"moveTrigger('down')\"></div>\r\n                         </td>\r\n                      <td style=\"width:30px !important;background-color: white;\" class=\"text-center colorCell\">\r\n                        <div style=\"width:20px !important;cursor: pointer;\"  click.trigger=\"collapse_expand_head()\"><strong>${_ce_head}</strong></div></td>\r\n                      <td style=\"width:200px !important;background-color: white;\" class=\"colorCell\"><input placeholder=\"PERSONNEL NAME\" value.bind=\"_personnelSearch\" style=\"border:0px !important;\"/></td>\r\n                      <td style=\"width:130px !important;background-color: white;\" class=\"colorCell\">Job</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"colorCell\">Pay Mode</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"colorCell\">Pay Factor</td>\r\n                      <td style=\"width:110px !important;background-color: white;\" class=\"colorCell\">Contract</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"colorCell\">Rate</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"text-center colorCell\">Delete</td>\r\n                    </tr>\r\n                </thead>\r\n              </table>\r\n              <table class= \"table-hover table-condensed table-bordered table-striped\" onload=\"myFunction()\"  ref=\"tblData\">\r\n                <thead>\r\n                    <tr>\r\n                        <td style=\"width:51px !important;background-color: white;\" class=\"text-center colorCell\">\r\n                        <div style=\"width:15px !important;cursor: pointer;\" class=\"glyphicon glyphicon-chevron-up\" click.trigger=\"moveTrigger('up')\"></div>\r\n                        <div style=\"width:15px !important;cursor: pointer;\" class=\"glyphicon glyphicon-chevron-down\" click.trigger=\"moveTrigger('down')\"></div>\r\n                         </td>\r\n                      <td style=\"width:30px !important;background-color: white;\" class=\"text-center colorCell\">\r\n                        <div style=\"width:20px !important;cursor: pointer;\"  click.trigger=\"collapse_expand_head()\"><strong>${_ce_head}</strong></div></td>\r\n                      <td style=\"width:200px !important;background-color: white;\" class=\"colorCell\"><input placeholder=\"PERSONNEL NAME\" value.bind=\"_personnelSearch\" style=\"border:0px !important;\"/></td>\r\n                      <td style=\"width:130px !important;background-color: white;\" class=\"colorCell\">Job</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"colorCell\" class=\"colorCell\">Pay Mode</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"colorCell\">Pay Factor</td>\r\n                      <td style=\"width:110px !important;background-color: white;\" class=\"colorCell\">Contract</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"colorCell\">Rate</td>\r\n                      <td style=\"width:100px !important;background-color: white;\" class=\"text-center colorCell\">Delete</td>\r\n                    </tr>\r\n                </thead>\r\n                <tbody repeat.for=\"item of _Personnel | filtercustom:'visible':true:_signal \">\r\n                    <tr>\r\n                      <td style=\"width:41px !important;\"> \r\n                        <input disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" class=\"text-center\" value.one-way=\"$index+1\" style=\"width:40px !important;color:gray;border:0px;\" click.trigger=\"$parent.focusTrigger($index)\"/>\r\n                        </td>\r\n                      <td style=\"width:5px !important;\">\r\n                        <button class=\"btn btn-xs \" click.trigger=\"$parent.collapse_expand(item)\">${item.ce_value}</button></td>\r\n                      <td style=\"width:5px !important;\" if.bind=\"item.GLOBAL_ID\">${item.PERSONNEL_NAME}</td>\r\n                      <td style=\"width:5px !important;\" if.bind=\"!item.GLOBAL_ID\"><input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.BLANK_PERSONNEL_NAME\"/></td>\r\n                      <td style=\"width:5px !important;\">\r\n                         <input readonly disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" class=\"jobclass\" value.bind=\"item.JOB_DESC\" style=\"width:120px !important;\" blur.trigger=\"$parent.fnRegularBlurEvt(item,'JOB', $index, item.BDGT_TMPL_DTL_ID)\" focus.trigger=\"$parent.fnRegularFocus($index,'JOB')\" />\r\n                      </td>   \r\n                      <td style=\"width:100px !important;\">\r\n                         <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" class=\"pymnttrmclass\" value.bind=\"item.PAYMENT_TERM\" style=\"width:90px !important;\" blur.trigger=\"$parent.fnRegularBlurEvt(item,'TERM', $index)\" focus.trigger=\"$parent.fnRegularFocus($index,'TERM')\"/>\r\n                      </td>\r\n                      <td style=\"width:50px !important;\" class=\"text-right  \">\r\n                                  <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.PAY_RATE_FACTOR_TMP\"  blur.trigger=\"$parent.AmountBlur(item,'PAY_RATE_FACTOR_TMP')\" class=\"text-right\"  style=\"width:90px !important;\"/>\r\n                        </td>\r\n\r\n                      <td class=\"text-right \" style=\"width:110px !important;\" >\r\n                        <!-- ${item.CONFIDENTIAL_TMP}\r\n                        ${$parent._objBudget.ALLOW_PASS_CONFIDENTIAL} -->\r\n                          <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.CONTRACT_AMT_TMP\"   blur.trigger=\"$parent.AmountBlur(item,'CONTRACT_AMT_TMP')\" class=\"text-right\" style=\"width:90px !important;\"/>\r\n                      </td>\r\n                      <td style=\"width:100px !important;\" class=\"text-right \">\r\n                        <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.INPUT_AMT_TMP\" blur.trigger=\"$parent.AmountBlur(item,'INPUT_AMT_TMP')\" class=\"text-right\" style=\"width:90px !important;\"/>\r\n                      </td>\r\n                      <!-- click.delegate=\"$parent.chkRemove(item)\" -->\r\n                      <td style=\"width:100px !important;\" class=\"text-center\" >\r\n                          <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\"type=\"checkbox\" checked.bind=\"item.REMOVE\" if.bind=\"item.BDGT_TMPL_DTL_ID && $parent.fnCheckExistingTalents(item.TALENTS,item)\"/>\r\n                          <button class=\"btn btn-xs\" click.trigger=\"$parent.removeRegular($index)\"  if.bind=\"!item.BDGT_TMPL_DTL_ID\">-</button>\r\n                      </td>\r\n                    </tr>\r\n                     <tr>\r\n                      <td colspan=9 style.bind=\"item.styleString\">\r\n                        <div>\r\n                         <table style=\"margin-left:10px !important;\" class=\"table-hover table-condensed table-bordered table-striped\">\r\n                          <tr>\r\n                            <td>CATEGORY</td>\r\n                            <td>CONFIDENTIAL</td>\r\n                            <td>STAFF WORK</td>\r\n                            <td>REMARKS</td>\r\n                            <td>TALENT MANAGER</td>\r\n                            <!-- <td>TALENTS</td> -->\r\n                            <td if.bind=\"!item.PERSONNEL_NAME\">IS POOL</td>\r\n                          </tr>\r\n                          <tr>\r\n                            <td>${item.CATEGORY_DESC}</td>\r\n                            <td class=\"text-center\">\r\n                               <!-- if.bind=\"$parent._objBudget.ALLOW_PASS_CONFIDENTIAL\" -->\r\n                               <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" type=\"checkbox\" checked.bind=\"item.CONFIDENTIAL_TMP\" />\r\n                            </td>\r\n                            <td>\r\n                              <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" type=\"checkbox\" checked.bind=\"item.STAFF_WORK_TMP\"/>\r\n                            </td>\r\n                            <td>\r\n                              <textarea  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.REMARKS\" style=\"height:20px !important;\"></textarea>\r\n                            </td>\r\n                            <td> \r\n                                <button  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" class=\"btn btn-xs\" if.bind=\"!item.TALENT_MANAGER.PERSONNEL_NAME\" click.trigger=\"$parent.showTalentMngr(item)\" >+</button>\r\n                                <button  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" class=\"btn btn-xs\" if.bind=\"item.TALENT_MANAGER.PERSONNEL_NAME\" click.trigger=\"$parent.removeTalentMngr(item)\">-</button>\r\n                            </td>\r\n                           <!--  <td>\r\n                                 <table class=\"table-hover table-condensed table-bordered table-striped\">\r\n                                    <thead>\r\n                                      <tr>\r\n                                        <td>NAME</td> \r\n                                        <td><button class=\"btn btn-xs\" click.trigger=\"$parent.showTalents(item)\" >+</button>\r\n                                            \r\n                                        </td>\r\n                                      </tr>\r\n                                    </thead>\r\n                                    <tbody>\r\n                                      <tr repeat.for=\"itemTalent of item.TALENTS\">\r\n                                        <td>${itemTalent.PERSONNEL_NAME}</td>\r\n                                        <td><button class=\"btn btn-xs\" click.trigger=\"$parent.$parent.removeTalent($parent,itemTalent,$index)\">-</button></td>\r\n                                      </tr>\r\n                                    </tbody>\r\n                                 </table>\r\n                            </td> -->\r\n                            <td if.bind=\"!item.PERSONNEL_NAME\"> <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" type=\"checkbox\" checked.bind=\"item.POOL_RECORD_TMP\"/></td>\r\n                          </tr>\r\n                        </table>\r\n                        </div>\r\n                         <div if.bind=\"item.TALENT_MANAGER.PERSONNEL_NAME\" style=\"margin-left:20%;margin-top:5px;\">\r\n                              <table style=\"margin-topin-left:10px !important;\" class=\"table-hover table-condensed table-bordered table-striped\">\r\n                              <tr>\r\n                              <td class=\"colorCell\">Talent Manager</td>\r\n                              <td class=\"colorCell\">Pay Factor</td>\r\n                              <td class=\"colorCell\">Contract</td>\r\n                              <td class=\"colorCell\">Rate</td>\r\n                              <td class=\"colorCell\">Remarks</td>\r\n                              </tr>\r\n                              <tr>\r\n                                   <td> ${item.TALENT_MANAGER.PERSONNEL_NAME}</td>\r\n                               <td style=\"width:50px !important;\" class=\"text-right  \">\r\n                                  <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.TALENT_MANAGER.PAY_RATE_FACTOR_TMP\"  blur.trigger=\"$parent.AmountBlur(item.TALENT_MANAGER,'PAY_RATE_FACTOR_TMP')\" class=\"text-right\"  style=\"width:90px !important;\"/>\r\n                        </td>\r\n\r\n                      <td class=\"text-right \" style=\"width:110px !important;\" >\r\n                          <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.TALENT_MANAGER.CONTRACT_AMT_TMP\"   blur.trigger=\"$parent.AmountBlur(item.TALENT_MANAGER,'CONTRACT_AMT_TMP')\" class=\"text-right\" style=\"width:90px !important;\"/>\r\n                      </td>\r\n                      <td style=\"width:100px !important;\" class=\"text-right \">\r\n                        <input   disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\"value.bind=\"item.TALENT_MANAGER.INPUT_AMT_TMP\" blur.trigger=\"$parent.AmountBlur(item.TALENT_MANAGER,'INPUT_AMT_TMP')\" class=\"text-right\" style=\"width:90px !important;\"/>\r\n                      </td>\r\n                    <td style=\"width:100px !important;\" class=\"text-right \">\r\n                        <input  disabled.bind=\"$parent._objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\" value.bind=\"item.TALENT_MANAGER.REMARKS\" style=\"width:90px !important;\"/>\r\n                      </td>\r\n                              </tr>\r\n\r\n                              </table>\r\n                          </div>  \r\n                      </td>\r\n                    </tr>\r\n               </tbody>\r\n            </table>\r\n            </div>\r\n           \r\n            <!-- ${_Personnel.length} -->\r\n            \r\n                \r\n               <div style=\"position:absolute;top:20px;left:0px;\">\r\n                <!-- <modalcontainer style=\"text-align:left;\" to.bind=\"modalIndivMstrTalents\" ></modalcontainer>\r\n                <modalcontainer style=\"text-align:left;\" to.bind=\"modalIndivMstrManager\" ></modalcontainer>\r\n                <modalcontainer to.bind=\"modalJob\"></modalcontainer> -->\r\n         <!--        <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"isIndivMstrTalentsDisabled\" click.trigger=\"fnIndivMstrTalents()\" value=\"+\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n                <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"isIndivMstrManagerDisabled\"  click.trigger=\"fnIndivMstrManager()\"  value=\"+\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n                <input type=\"button\" class=\"btn btn-xs customButton\" disabled.bind=\"isJobDisabled\"  click.trigger=\"fnModalJob()\" value=\"..\" style=\"padding-left:15px;padding-right:15px;\"/> -->\r\n\r\n               </div>   \r\n               <table>\r\n                <tr>\r\n                  <td>\r\n                    <!-- <modalcontainer style=\"text-align:left;\" to.bind=\"modalIndivMstr\"> --></modalcontainer>\r\n                     <input type=\"button\" class=\"btn btn-xs customButton\"  disabled.bind=\"isIndivMstrDisabled\"  click.trigger=\"fnIndivMstrManager()\" value=\"Search Personnel\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n                  </td>\r\n                <td><button class=\"btn btn-xs customButton\" click.delegate=\"fnBlankPersonnelRegular()\"  disabled.bind=\"_objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\">Blank Personnel</button></td>\r\n                <td><button class=\"btn btn-xs customButton\" click.delegate=\"savePersonnel(0)\"  disabled.bind=\"_objBudget.HEADER.APPR_STAT_CD!='APP-DRAFT'\">Save</button></td>\r\n               \r\n               \r\n                <td if.bind=\"toPersonModel.USE=='REGULAR'\" style=\"display:compact;text-align:right;width:525px;margin-left:100px;margin-right:0px !important;padding:0px !important;position: relative;\">(Regular) <strong>TOTAL</strong> : <input value.bind=\"_objBudget._INPUT_AMT_REGULAR\" class=\"text-right\" readonly style=\"width:110px;font-weight:bold;\"  /></td>\r\n\r\n                <td if.bind=\"toPersonModel.USE=='SEMI_REGULAR'\" style=\"display:compact;text-align:right;width:525px;margin-left:100px;margin-right:0px !important;padding:0px !important;position: relative;\">(Semi-Regular) <strong>TOTAL</strong> : <input value.bind=\"_objBudget._INPUT_AMT_SEMI_REGULAR\" class=\"text-right\" readonly style=\"width:110px;font-weight:bold;\"  /></td>\r\n\r\n               <td if.bind=\"toPersonModel.USE=='STAFF'\" style=\"display:compact;text-align:right;width:525px;margin-left:100px;margin-right:0px !important;padding:0px !important;position: relative;\">(Staff) <strong>TOTAL</strong> : <input value.bind=\"_objBudget._INPUT_AMT_STAFF\" class=\"text-right\" readonly style=\"width:110px;font-weight:bold;\"  /></td>\r\n\r\n                </tr>\r\n                </table>\r\n\r\n</template>\r\n"; });
define('text!summary.html', ['module'], function(module) { module.exports = "<template>\r\n\t\t\t<table class= \"table-hover table-condensed table-bordered table-striped\" style=\"margin-left:50px;margin-top:40px;margin-botton:20px;\">\r\n\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td style=\"width:150px;\">\r\n\t\t\t\t\t\t\t<strong>CLASSIFICATION</strong>\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t\t<td style=\"width:150px;text-align:center;\">\r\n\t\t\t\t\t\t\t<strong>TOTAL PROGRAM</strong>\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\tMAINSTAY\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t\t<td style=\"text-align:right;\">\r\n\t\t\t\t\t\t\t${_INPUT_AMT_MAINSTAY}\t\t\t\t\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\tSTAFF\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t\t<td style=\"text-align:right;\">\r\n\t\t\t\t\t\t\t${_INPUT_AMT_STAFF}\t\t\t\t\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t</tr>\r\n\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\tGUEST\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t\t<td style=\"text-align:right;\">\r\n\t\t\t\t\t\t\t${_INPUT_AMT_GUEST}\t\t\t\t\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t</tr>\r\n\t\t\t\t\t\t<tr>\r\n\t\t\t\t\t\t<td>\r\n\t\t\t\t\t\t\t<strong>TOTAL</strong>\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t\t<td style=\"text-align:right;border-top-width:3px;\">\r\n\t\t\t\t\t\t\t<strong>${_INPUT_AMT_TOTAL}</strong>\r\n\t\t\t\t\t\t</td>\t\r\n\t\t\t\t\t</tr>\t\t\t\t\t\r\n\t\t\t</table>\r\n            <br/>\r\n</template>"; });
define('text!users.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"blur-image\"></require>\n\n  <section class=\"au-animate\">\n      <h2>${heading}</h2>\n      <div class=\"row au-stagger\">\n        <div class=\"col-sm-6 col-md-3 card-container au-animate\" repeat.for=\"user of users\">\n            <div class=\"card\">\n                <canvas class=\"header-bg\" width=\"250\" height=\"70\" blur-image.bind=\"image\"></canvas>\n                <div class=\"avatar\">\n                    <img src.bind=\"user.avatar_url\" crossorigin ref=\"image\"/>\n                </div>\n                <div class=\"content\">\n                    <p class=\"name\">${user.login}</p>\n                    <p><a target=\"_blank\" class=\"btn btn-default\" href.bind=\"user.html_url\">Contact</a></p>\n                </div>\n            </div>\n        </div>\n      </div>\n  </section>\n</template>\n"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template>\n  <section class=\"au-animate\">\n    <h2>${heading}</h2>\n\n    <form role=\"form\" submit.delegate=\"submit()\">\n      <div class=\"form-group\">\n        <label for=\"fn\">First Name</label>\n        <input type=\"text\" value.bind=\"firstName\" class=\"form-control\" id=\"fn\" placeholder=\"first name\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"ln\">Last Name</label>\n        <input type=\"text\" value.bind=\"lastName\" class=\"form-control\" id=\"ln\" placeholder=\"last name\">\n      </div>\n      <div class=\"form-group\">\n        <label>Full Name</label>\n        <p class=\"help-block\">${fullName | upper}</p>\n      </div>\n      <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n    </form>\n  </section>\n</template>\n"; });
define('text!tools/gridpaging.html', ['module'], function(module) { module.exports = "<template>\r\n\t<nav>\r\n        <ul class=\"pagination\">\r\n            <li>\r\n                <a style=\"cursor:pointer\" aria-label=\"Previous\" click.delegate=\"endClick(0)\" if.bind=\"_currentIndex!=0 && _Pages[0].length>0\">\r\n                    <span aria-hidden=\"true\">&laquo;</span>\r\n                </a>\r\n            </li>\r\n            <li repeat.for=\"item of _PagesShow\">\r\n                    <a style=\"cursor:pointer\" click.delegate=\"$parent.selectedClick($index)\" >${item}</a>\r\n            </li>\r\n            <li>\r\n                <a style=\"cursor:pointer\" aria-label=\"Next\"  click.delegate=\"endClick(1)\" if.bind=\"_Pages.length-1>_currentIndex && _Pages[0].length>0\">\r\n                    <span aria-hidden=\"true\">&raquo;</span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </nav>\r\n</template>"; });
define('text!modals/budget.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <ux-dialog>\n    <!--    <button type=\"button\" click.trigger=\"controller.cancel()\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> -->\r\n    <!--<ux-dialog-header class=\"colorHeader\">\r\n     \r\n                    <h4 class=\"modal-title\">BUDGET TEMPLATES</h4>\r\n</ux-dialog-header>-->\n    <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>BUDGET TEMPLATE</b></span></ux-dialog-header>\r\n  <ux-dialog-body>\r\n  <require from=\"converters/take\"></require>\r\n  <require from=\"converters/sorttext\"></require>\r\n  <require from=\"tools/gridpaging\"></require>\r\n  <div style=\"height:350px;overflow: auto;\">\r\n    <table class=\"table table-hover table-condensed table-bordered\">\r\n        <thead class=\"table-default\">\r\n            <tr>\r\n                <td class=\"colorCell2\">\r\n                    BUDGET ID\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    PROGRAM NAME\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    PROGRAM IO\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    STATUS\r\n                </td>\r\n            </tr>\r\n            <tr ref=\"_rBUDGET_TITLE\">\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bBDGT_TMPL_ID\" searchable=\"_sBDGT_TMPL_ID\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bPROGRAM_TITLE\" searchable=\"_sPROGRAM_TITLE\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bPROGRAM_IO\" searchable=\"_sPROGRAM_IO\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bAPPR_STAT_CD\" searchable=\"_sAPPR_STAT_CD\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <!-- | sorttext:'PROGRAM_TITLE':'ascending'  -->\r\n            <tr repeat.for=\"item of varFilterArray | take:20:pageindex\" click.delegate=\"$parent.selectedBudget(item)\">\r\n                <td>\r\n                    ${item.BDGT_TMPL_ID}\r\n                </td>\r\n                <td>\r\n                    ${item.PROGRAM_TITLE}\r\n                </td>\r\n                <td>\r\n                    ${item.PROGRAM_IO}\r\n                </td>\r\n                <td>\r\n                    ${item.APPR_STAT_CD}\r\n                </td>\r\n\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>\r\n<gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\"  divby.bind=\"20\"></gridpaging>\r\n\r\n</ux-dialog-body>\r\n\r\n<ux-dialog-footer>\r\n<button text=\"Cancel\" click.trigger=\"controller.cancel()\">Close</button>\r\n</ux-dialog-footer>\r\n</ux-dialog>\r\n</template>"; });
define('text!modals/buh-program-dialog.html', ['module'], function(module) { module.exports = "<template>\n  <ux-dialog>\n  <!--<ux-dialog-header class=\"colorHeader\">\n        \n                    <h4 class=\"modal-title\">SELECT PROGRAMS</h4>\n</ux-dialog-header>-->\n    <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>SELECT PROGRAMS</b></span></ux-dialog-header>\n  <ux-dialog-body>\n  <require from=\"converters/take\"></require>\n  <require from=\"converters/sorttext\"></require>\n  <require from=\"tools/gridpaging\"></require>\n  <div style=\"height:420px; overflow: auto;\">\n  <table>\n    <tr>\n        <td><div style=\"height:300px; overflow: auto;width:550px;\">\n            <table class=\"table table-hover table-condensed table-bordered table-striped \">\n                <thead class=\"table-default\">\n                    <tr>\n                        <td class=\"colorCell2\" style=\"width:140px\">PROGRAM CODE</td>\n                        <td class=\"colorCell2\">PROGRAM TITLE</td>\n                    </tr>\n                    <tr ref=\"_rGROUP_TITLE\">\n                        <td class=\"colorCell2\" style=\"width:140px\">\n                            <input class=\"input-sm form-control\" value.bind=\"_bPROGRAM_CD\" searchable=\"_sPROGRAM_CD\" keyup.delegate=\"fnKeyup($event,'')\" style=\"width:140px\"/>\n                        </td>\n                        <td class=\"colorCell2\" >\n                            <input class=\"input-sm form-control\" value.bind=\"_bPROGRAM_TITLE\" searchable=\"_sPROGRAM_TITLE\" keyup.delegate=\"fnKeyup($event,'')\" />\n                        </td>\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr repeat.for=\"item of varFilterArray | sorttext:'PROGRAM_TITLE':'ascending' | take:10:pageindex\" click.delegate=\"$parent.selectedTalent(item)\">\n                        <td>${item.PROGRAM_CD}</td>\n                        <td>${item.PROGRAM_TITLE}</td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n        <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\" divby.bind=\"10\"></gridpaging>\n    </td>\n    <td style=\"vertical-align:top;\">\n\n\n        <div style=\"height:350px; overflow: auto;\">\n            <table class=\"table table-hover table-condensed table-bordered table-striped \">\n                <thead class=\"table-default\">\n                    <tr>\n                        <td colspan=3 class=\"colorCell2\" >\n                            SELECTED\n                        </td>\n                    </tr>\n                    <tr>\n                        <td class=\"colorCell2\"  style=\"width:140px\">\n                            PROGRAM CODE\n                        </td>\n                        <td colspan=2 class=\"colorCell2\" >\n                            PROGRAM TITLE\n                        </td>\n\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr repeat.for=\"item of varFilterArraySelected\">\n                        <td style=\"width:140px\">\n                            ${item.PROGRAM_CD}\n                        </td>\n                        <td>\n                            ${item.PROGRAM_TITLE}\n                        </td>\n                        <td>\n                            <button click.delegate=\"$parent.deleteSelected($index)\">X</button>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </div>\n\n    </td>\n</tr>\n<tr>\n    <td colspan=2>\n        <div style=\"width:100%;text-align:center;\">\n            <button style=\"width:20%;\" click.delegate=\"SelectingDone()\">DONE</button>\n            <button style=\"width:20%;\" click.delegate=\"ClearSearch()\">CLEAR SEARCH</button>\n        </div>\n    </td>\n</tr>\n</table>\n</div>\n</ux-dialog-body>\n\n<ux-dialog-footer>\n<button click.trigger=\"controller.cancel()\">Cancel</button>\n<!-- <button click.trigger=\"controller.ok(person)\">Ok</button> -->\n</ux-dialog-footer>    \n\n</ux-dialog>\n</template>\n\n"; });
define('text!modals/buh-search.html', ['module'], function(module) { module.exports = "<template>\n\n  <ux-dialog>\n    <ux-dialog-body>\n\n\n      <require from=\"converters/take\"></require>\n      <require from=\"converters/sorttext\"></require>\n      <require from=\"tools/gridpaging\"></require>\n      <div style=\"height:500px!important;overflow:auto;\">\n        <table class=\"table table-hover table-condensed table-bordered table-striped \">\n          <thead class=\"table-default\">\n            <tr>\n              <td class=\"colorCell2\">\n                GLOBAL ID (OPTIONAL)\n              </td>\n              <td class=\"colorCell2\">\n                FIRST NAME\n              </td>\n              <td class=\"colorCell2\">\n                MIDDLE NAME\n              </td>\n              <td class=\"colorCell2\">\n                LAST NAME\n              </td>\n              <td class=\"colorCell2\">\n               E-MAIL\n             </td>\n           </tr>\n           <tr ref=\"_rBUH_SEARCH\">\n            <td class=\"colorCell2\">\n              <input class=\"input-sm form-control\" value.bind=\"_bOPTIONAL_GLOBAL_ID\" searchable=\"_sOPTIONAL_GLOBAL_ID\" />\n            </td>\n            <td class=\"colorCell2\">\n              <input class=\"input-sm form-control\" value.bind=\"_bFIRST_NAME\" searchable=\"_sFIRST_NAME\" />\n            </td>\n            <td class=\"colorCell2\">\n              <input class=\"input-sm form-control\" value.bind=\"_bMIDDLE_NAME\" searchable=\"_sMIDDLE_NAME\" />\n            </td>\n            <td class=\"colorCell2\">\n              <input class=\"input-sm form-control\" value.bind=\"_bLAST_NAME\" searchable=\"_sLAST_NAME\" />\n            </td>\n            <td class=\"colorCell2\">\n              <input class=\"input-sm form-control\" value.bind=\"_bEMAIL_ADDRESS\" searchable=\"_sEMAIL_ADDRESS\" />\n            </td>\n          </tr>\n        </thead>\n        <tbody>\n          <tr repeat.for=\"item of varFilterArray | sorttext:'LAST_NAME':'ascending' | take:20:pageindex\" click.delegate=\"$parent.selectedBUH(item)\">\n            <td>\n              ${item.OPTIONAL_GLOBAL_ID}\n            </td>\n            <td>\n              ${item.FIRST_NAME}\n            </td>\n            <td>\n              ${item.MIDDLE_NAME}\n            </td>\n            <td>\n              ${item.LAST_NAME}\n            </td>\n            <td>\n              ${item.EMAIL_ADDRESS}\n            </td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n    <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\"  divby.bind=\"20\"></gridpaging>\n  </ux-dialog-body>\n  <ux-dialog-footer>\n    <button text=\"Cancel\" click.trigger=\"controller.cancel()\">Close</button>\n  </ux-dialog-footer>\n</ux-dialog>\n</template>"; });
define('text!modals/change_password.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n\t<ux-dialog>\r\n      <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-10px;font-size:15px;\">CHANGE PASSWORD</span></ux-dialog-header>\n\r\n<!-- \t    <button type=\"button\" click.trigger=\"controller.cancel()\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> -->\r\n                    <!--<h4 class=\"modal-title\">LOG-IN</h4>-->\n    \r\n\r\n\t<ux-dialog-body>\r\n\t<div style=\"width:450px;\">\r\n\t\t<table style=\"margin-left:70px;\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\tNew Password:\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n                  <input value.bind=\"_NEW_PASSWORD\"  type=\"password\" keyup.trigger=\"keyPressed($event)\"/>/>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=2 class=\"text-center\">\r\n\t\t\t\t\t<input type=\"button\" click.trigger=\"savePassword()\" value=\"SAVE\" class=\"btn customButton\"/>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t\t\r\n\t</div>\r\n</ux-dialog-body>\r\n\r\n<!--<ux-dialog-footer>\r\n<button text=\"Cancel\" class=\"btn\" style=\"background-color: #e6e6e6;margin-bottom:5px;\" click.trigger=\"controller.cancel()\">Cancel</button>\r\n</ux-dialog-footer>-->\r\n\r\n</ux-dialog>\r\n</template>"; });
define('text!modals/confirm_dialog.html', ['module'], function(module) { module.exports = "<template>   \r\n          <!-- <modal showing.two-way=\"showing\"  mwidth.bind=\"_width\">\r\n              <modal-header title.bind=\"_setTitle\" close.call=\"closeModal()\"></modal-header>\r\n              <modal-body><div class=\"text-center\"><h4>${_message}</h3></div></modal-body>\r\n              <modal-footer>\r\n                  <button class=\"btn\" click.trigger=\"closeModal()\">Save</button>\r\n                  <au-button text=\"Continue\" click.call=\"confirm()\">Continue</au-button>\r\n                  <au-button text=\"Cancel\" click.call=\"closeModal()\">Close</au-button>\r\n                  \r\n              </modal-footer>\r\n          </modal> -->\r\n\r\n          <ux-dialog>\r\n         <!--<ux-dialog-header class=\"colorHeader\">\r\n      <button type=\"button\" click.trigger=\"controller.cancel()\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> \r\n                    <h4 class=\"modal-title\">LOG-IN</h4>\r\n</ux-dialog-header>-->\n            <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-10px;font-size:15px;\">${_setTitle}</span></ux-dialog-header>\r\n\r\n          <ux-dialog-body>\r\n        <div class=\"text-center\"><h4>${_message}</h3></div>\r\n        </ux-dialog-body>\r\n\r\n        <ux-dialog-footer>\r\n                <button click.trigger=\"controller.cancel()\">Cancel</button>\r\n                <button click.trigger=\"confirm()\">Ok</button>\r\n      </ux-dialog-footer>\r\n       </ux-dialog>\r\n</template>"; });
define('text!modals/edit-person.html', ['module'], function(module) { module.exports = "<template>\r\n  <ux-dialog>\r\n    <ux-dialog-body>\r\n      <h2>Edit first name</h2>\r\n      <input value.bind=\"person.firstName\" />\r\n    </ux-dialog-body>\r\n\r\n    <ux-dialog-footer>\r\n      <button click.trigger=\"controller.cancel()\">Cancel</button>\r\n      <button click.trigger=\"controller.ok(person)\">Ok</button>\r\n    </ux-dialog-footer>\r\n  </ux-dialog>\r\n</template>"; });
define('text!modals/globalindivmstr.html', ['module'], function(module) { module.exports = "<template>\r\n  <ux-dialog>\r\n  <!--<ux-dialog-header class=\"colorHeader\">\r\n\r\n                    <h4 class=\"modal-title\">SELECT PERSONNEL(S)</h4>\r\n</ux-dialog-header>-->\n    <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>SELECT PERSONNEL(S)</b></span></ux-dialog-header>\r\n  <ux-dialog-body>\r\n  <require from=\"converters/take\"></require>\r\n  <require from=\"converters/sorttext\"></require>\r\n  <require from=\"tools/gridpaging\"></require>\r\n  <div style=\"height:420px; overflow: auto;\">\r\n  <table>\r\n    <tr>\r\n        <td><div style=\"height:300px; overflow: auto;width:550px;\">\r\n            <table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n                <thead class=\"table-default\">\r\n                    <tr>\r\n                        <td class=\"colorCell2\" style=\"width:140px\">GLOBAL ID</td>\r\n                        <td class=\"colorCell2\">PERSONNEL NAME</td>\r\n                    </tr>\r\n                    <tr ref=\"_rGROUP_TITLE\">\r\n                        <td class=\"colorCell2\" style=\"width:140px\">\r\n                            <input class=\"input-sm form-control\" value.bind=\"_bGLOBAL_INDIV_ID\" searchable=\"_sGLOBAL_INDIV_ID\" keyup.delegate=\"fnKeyup($event,'')\" style=\"width:140px\"/>\r\n                        </td>\r\n                        <td class=\"colorCell2\" >\r\n                            <input class=\"input-sm form-control\" value.bind=\"_bPERSONNEL_NAME\" searchable=\"_sPERSONNEL_NAME\" keyup.delegate=\"fnKeyup($event,'')\" />\r\n                        </td>\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr repeat.for=\"item of varFilterArray | sorttext:'PERSONNEL_NAME':'ascending' | take:10:pageindex\" click.delegate=\"$parent.selectedTalent(item)\">\r\n                        <td>${item.GLOBAL_INDIV_ID}</td>\r\n                        <td>${item.PERSONNEL_NAME}</td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n        <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\" divby.bind=\"10\"></gridpaging>\r\n    </td>\r\n    <td style=\"vertical-align:top;\">\r\n\r\n\r\n        <div style=\"height:350px; overflow: auto;\">\r\n            <table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n                <thead class=\"table-default\">\r\n                    <tr>\r\n                        <td colspan=3 class=\"colorCell2\" >\r\n                            SELECTED\r\n                        </td>\r\n                    </tr>\r\n                    <tr>\r\n                        <td class=\"colorCell2\"  style=\"width:140px\">\r\n                            GLOBAL ID\r\n                        </td>\r\n                        <td colspan=2 class=\"colorCell2\" >\r\n                            PERSONNEL NAME\r\n                        </td>\r\n\r\n                    </tr>\r\n                </thead>\r\n                <tbody>\r\n                    <tr repeat.for=\"item of varFilterArraySelected\">\r\n                        <td style=\"width:140px\">\r\n                            ${item.GLOBAL_INDIV_ID}\r\n                        </td>\r\n                        <td>\r\n                            ${item.PERSONNEL_NAME}\r\n                        </td>\r\n                        <td>\r\n                            <button click.delegate=\"$parent.deleteSelected($index)\">X</button>\r\n                        </td>\r\n                    </tr>\r\n                </tbody>\r\n            </table>\r\n        </div>\r\n\r\n    </td>\r\n</tr>\r\n<tr>\r\n    <td colspan=2>\r\n        <div style=\"width:100%;text-align:center;\">\r\n            <button style=\"width:20%;\" click.delegate=\"SelectingDone()\">DONE</button>\r\n            <button style=\"width:20%;\" click.delegate=\"ClearSearch()\">CLEAR SEARCH</button>\r\n        </div>\r\n    </td>\r\n</tr>\r\n</table>\r\n</div>\r\n</ux-dialog-body>\r\n\r\n<ux-dialog-footer>\r\n<button click.trigger=\"controller.cancel()\">Cancel</button>\r\n<!-- <button click.trigger=\"controller.ok(person)\">Ok</button> -->\r\n</ux-dialog-footer>    \r\n\r\n</ux-dialog>\r\n</template>\r\n\r\n"; });
define('text!modals/indivmstr.html', ['module'], function(module) { module.exports = "<template>\r\n <ux-dialog>\r\n   <!--<ux-dialog-header class=\"colorHeader\">\r\n        \r\n                    <h4 class=\"modal-title\">SELECT PERSONNEL(S)</h4>\r\n</ux-dialog-header>-->\n   <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>SELECT PERSONNEL(S)</b></span></ux-dialog-header>\r\n          <ux-dialog-body>\r\n          <require from=\"converters/take\"></require>\r\n<require from=\"converters/sorttext\"></require>\r\n<require from=\"tools/gridpaging\"></require>\r\n<div style=\"height:420px; overflow: auto;\">\r\n<table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n        <thead class=\"table-default\">\r\n            <tr>\r\n                <td class=\"colorCell2\">\r\n                    GLOBAL ID\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    PERSONNEL NAME\r\n                </td>\r\n            </tr>\r\n            <tr ref=\"_rGROUP_TITLE\">\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bGLOBAL_INDIV_ID\" searchable=\"_sGLOBAL_INDIV_ID\" keyup.delegate=\"fnKeyup($event,'')\" />\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bPERSONNEL_NAME\" searchable=\"_sPERSONNEL_NAME\" keyup.delegate=\"fnKeyup($event,'')\" />\r\n                </td>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n            <tr repeat.for=\"item of varFilterArray | sorttext:'PERSONNEL_NAME':'ascending' | take:10:pageindex\" click.delegate=\"$parent.selectedIndiv(item)\">\r\n                <td>\r\n                    ${item.GLOBAL_INDIV_ID}\r\n                </td>\r\n                <td>\r\n                    ${item.PERSONNEL_NAME}\r\n                </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n</div>\r\n    <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\" divby.bind=\"10\"></gridpaging>\r\n          </ux-dialog-body>\r\n\r\n  <ux-dialog-footer>\r\n      <button click.trigger=\"controller.cancel()\">Cancel</button>\r\n<!--       <button click.trigger=\"controller.ok(person)\">Ok</button> -->\r\n    </ux-dialog-footer>    \r\n     </ux-dialog>\r\n</template>\r\n\r\n"; });
define('text!modals/job.html', ['module'], function(module) { module.exports = "<template>\r\n          <ux-dialog><!--         <button type=\"button\" click.trigger=\"controller.cancel()\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> -->\r\n            <!--<ux-dialog-header class=\"colorHeader\">\r\n\r\n                    <h4 class=\"modal-title\">SELECT JOB</h4>\r\n</ux-dialog-header>-->\n            <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>SELECT PERSONNEL(S)</b></span></ux-dialog-header>\r\n          <ux-dialog-body>\r\n          <require from=\"converters/take\"></require>\r\n<require from=\"converters/sorttext\"></require>\r\n<require from=\"tools/gridpaging\"></require>\r\n<table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n        <thead class=\"table-default\">\r\n            <tr>\r\n                <td class=\"colorCell2\">\r\n                    JOB GROUP\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    JOB DESCRIPTION\r\n                </td>\r\n            </tr>\r\n            <tr ref=\"_rJOB_TITLE\">\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bJOB_GRP\" searchable=\"_sJOB_GRP\" />\r\n                </td>\r\n                <td class=\"colorCell2\">\r\n                    <input class=\"input-sm form-control\" value.bind=\"_bJOB_DESC\" searchable=\"_sJOB_DESC\" ref=\"refJobDesc\"  keyup.delegate=\"fnKeyup($event,'')\"/>\r\n                </td>\r\n            </tr>\r\n        </thead>\r\n        <tbody>\r\n             <!-- | sorttext:'JOB_DESC':'ascending' -->\r\n            <tr repeat.for=\"item of varFilterArray | take:20:pageindex\" click.delegate=\"$parent.selectedJob(item)\">\r\n                <td>\r\n                    ${item.JOB_GRP}\r\n                </td>\r\n                <td>\r\n                    ${item.JOB_DESC}\r\n                </td>\r\n            </tr>\r\n        </tbody>\r\n    </table>\r\n       <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\"  divby.bind=\"20\"></gridpaging>\r\n   </ux-dialog-body>\r\n         <ux-dialog-footer>\r\n         <button click.trigger=\"controller.cancel()\">Cancel</button>\r\n       </ux-dialog-footer>\r\n          </ux-dialog>\r\n          \r\n</template>"; });
define('text!modals/login.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n\t<ux-dialog>\r\n      <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-10px;font-size:15px;\">LOG-IN</span></ux-dialog-header>\n\r\n<!-- \t    <button type=\"button\" click.trigger=\"controller.cancel()\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button> -->\r\n                    <!--<h4 class=\"modal-title\">LOG-IN</h4>-->\n    \r\n\r\n\t<ux-dialog-body>\r\n\t<div style=\"width:450px;\">\r\n\t\t<table style=\"margin-left:70px;\">\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\tCOMPANY:\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<select value.bind=\"_COMPANY\" style=\"width:172px;\">\r\n\t\t\t\t\t\t<option repeat.for=\"company of _companies\"  model.bind=\"company\">${company.COMPANY_NAME}</option>\r\n\t\t\t\t\t</select>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\tUSER ID:\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<select  value.bind=\"_USER\" style=\"width:136px;\">\r\n\t\t\t\t\t\t<option repeat.for=\"user of _user_content\"  model.bind=\"user\">${user.USER_ID}</option>\r\n\t\t\t\t\t</select> \n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td>\r\n\t\t\t\t\tPASSWORD:\r\n\t\t\t\t</td>\r\n\t\t\t\t<td>\r\n\t\t\t\t\t<input value.bind=\"_PASSWORD\" type=\"password\" keyup.trigger=\"keyPressed($event)\"/> &nbsp;<a href=\"#\" click.trigger=\"resetPassword()\">Reset</a>\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\n          <tr if.bind=\"user_expired\">\r\n            <td>\r\n              NEW PASSWORD:\r\n            </td>\r\n            <td>\r\n              <input value.bind=\"_NEW_PASSWORD\" type=\"password\"/>\r\n            </td>\r\n          </tr>\r\n\t\t\t<tr>\r\n\t\t\t\t<td colspan=2 class=\"text-center\">\r\n\t\t\t\t\t<input type=\"button\"  disabled.bind=\"disableLogButton\" click.trigger=\"tryLogin()\" value=\"LOG-IN\" class=\"btn customButton\" />\r\n\t\t\t\t</td>\r\n\t\t\t</tr>\r\n\t\t</table>\r\n\t\t\r\n\t</div>\r\n</ux-dialog-body>\r\n\r\n<!--<ux-dialog-footer>\r\n<button text=\"Cancel\" class=\"btn\" style=\"background-color: #e6e6e6;margin-bottom:5px;\" click.trigger=\"controller.cancel()\">Cancel</button>\r\n</ux-dialog-footer>-->\r\n\r\n</ux-dialog>\r\n</template>"; });
define('text!modals/modalcontainer.html', ['module'], function(module) { module.exports = "<template>   \r\n          <modal showing.two-way=\"showing\"  mwidth.bind=\"_width\">\r\n              <modal-header title.bind=\"_setTitle\" close.call=\"closeModal()\"></modal-header>\r\n              <modal-body content-view.bind=\"_setContent\"></modal-body>\r\n              \r\n              <modal-footer>\r\n                  <!-- <button class=\"btn\" click.trigger=\"closeModal()\">Save</button> -->\r\n                  <au-button text=\"Cancel\" click.call=\"closeModal()\">Close</au-button>\r\n                  <!-- <button class=\"btn\" click.trigger=\"hotest()\">Talent 11</button> -->\r\n              </modal-footer>\r\n          </modal>\r\n\r\n       <input type=\"button\" ref=\"btnRef\" class=\"btn btn-xs customButton\" click.delegate=\"showDialog()\" value.bind=\"_buttonTitle\" disabled.bind=\"_isDisableElement\" style=\"padding-left:15px;padding-right:15px;\"/>\r\n</template>"; });
define('text!modals/paymentterm.html', ['module'], function(module) { module.exports = "<template>\n  <ux-dialog>\n    <!--<ux-dialog-header class=\"colorHeader\">\n      <h4 class=\"modal-title\">SELECT PAYMENT TERM</h4>\n    </ux-dialog-header>-->\n    <ux-dialog-header class=\"colorHeader\"><span style=\"position:relative;top:-8px;\"><b>SELECT PAYMENT TERM</b></span></ux-dialog-header>\n\n    <ux-dialog-body>\n      <table keyup.delegate=\"fnKeyup($event,'')\"  class=\"table table-hover table-condensed table-bordered table-striped \">\n        <tbody>\n          <tr repeat.for=\"item of varFilterArray\" click.delegate=\"$parent.selectedTerm(item)\">\n            <td>\n              ${item.REF_DESC}\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\"  divby.bind=\"20\"></gridpaging>\n    </ux-dialog-body>\n    <ux-dialog-footer>\n     <button click.trigger=\"controller.cancel()\">Cancel</button>\n   </ux-dialog-footer>\n </ux-dialog>\n</template>"; });
define('text!modals/program.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n  <ux-dialog>\r\n    <ux-dialog-body>\r\n\r\n      <require from=\"converters/take\"></require>\r\n      <require from=\"converters/sorttext\"></require>\r\n      <require from=\"tools/gridpaging\"></require>\r\n      <div style=\"height:500px!important;overflow:auto;\">\r\n        <table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n          <thead class=\"table-default\">\r\n            <tr>\r\n              <td class=\"colorCell2\">\r\n                PROGRAM CODE\r\n              </td>\r\n              <td class=\"colorCell2\">\r\n                PROGRAM NAME\r\n              </td>\r\n            </tr>\r\n            <tr ref=\"_rBUDGET_TITLE\">\r\n              <td class=\"colorCell2\">\r\n                <input class=\"input-sm form-control\" value.bind=\"_bPROGRAM_CD\" searchable=\"_sPROGRAM_CD\" />\r\n              </td>\r\n              <td class=\"colorCell2\">\r\n                <input class=\"input-sm form-control\" value.bind=\"_bPROGRAM_TITLE\" searchable=\"_sPROGRAM_TITLE\" />\r\n              </td>\r\n            </tr>\r\n          </thead>\r\n          <tbody>\r\n            <tr repeat.for=\"item of varFilterArray | sorttext:'PROGRAM_TITLE':'ascending' | take:20:pageindex\" click.delegate=\"$parent.selectedProgram(item)\">\r\n              <td>\r\n                ${item.PROGRAM_CD}\r\n              </td>\r\n              <td>\r\n                ${item.PROGRAM_TITLE}\r\n              </td>\r\n            </tr>\r\n          </tbody>\r\n        </table>\r\n      </div>\r\n      <gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\"  divby.bind=\"20\"></gridpaging>\r\n    </ux-dialog-body>\r\n    <ux-dialog-footer>\r\n      <button text=\"Cancel\" click.trigger=\"controller.cancel()\">Close</button>\r\n    </ux-dialog-footer>\r\n  </ux-dialog>\r\n</template>"; });
define('text!modals/talentmanagergroups.html', ['module'], function(module) { module.exports = "<template>\r\n    <ux-dialog>\r\n  <ux-dialog-body>\r\n  <require from=\"converters/take\"></require>\r\n  <require from=\"converters/sort\"></require>\r\n  <require from=\"tools/gridpaging\"></require>\r\n  <table class=\"table table-hover table-condensed table-bordered table-striped \">\r\n    <thead class=\"table-default\">\r\n        <tr>\r\n            <td class=\"colorCell2\">\r\n                GLOBAL ID\r\n            </td>\r\n            <td class=\"colorCell2\">\r\n                GROUP NAME\r\n            </td>\r\n        </tr>\r\n        <tr ref=\"_rGROUP_TITLE\">\r\n            <td class=\"colorCell2\">\r\n                <input class=\"input-sm form-control\" value.bind=\"_bGLOBAL_GRP_ID\" searchable=\"_sGLOBAL_GRP_ID\" keyup.delegate=\"fnKeyup($event,'')\"/>\r\n            </td>\r\n            <td class=\"colorCell2\">\r\n                <input class=\"input-sm form-control\" value.bind=\"_bGROUP_NAME\" searchable=\"_sGROUP_NAME\" keyup.delegate=\"fnKeyup($event,'')\"/>\r\n            </td>\r\n        </tr>\r\n    </thead>\r\n    <tbody>\r\n        <tr repeat.for=\"item of varFilterArray | sort:'GROUP_NAME':'ascending' | take:10:pageindex\" click.delegate=\"$parent.selectedTalent(item)\">\r\n            <td>\r\n                ${item.GLOBAL_GRP_ID}\r\n            </td>\r\n            <td>\r\n                ${item.GROUP_NAME}\r\n            </td>\r\n        </tr>\r\n    </tbody>\r\n</table>\r\n<gridpaging to.bind=\"varFilterArrayLength\" pageindex.two-way=\"pageindex\" divby.bind=\"10\"></gridpaging>\r\n</ux-dialog-body>\r\n\r\n<ux-dialog-footer>\r\n    <button text=\"Cancel\" click.trigger=\"controller.cancel()\">Close</button>\r\n  </ux-dialog-footer>\r\n</ux-dialog>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map