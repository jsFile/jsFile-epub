(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("JsFile"));
	else if(typeof define === 'function' && define.amd)
		define(["JsFile"], factory);
	else if(typeof exports === 'object')
		exports["JsFileEpub"] = factory(require("JsFile"));
	else
		root["JsFileEpub"] = factory(root["JsFile"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _JsFile = __webpack_require__(1);

	var _readerCreateDocument = __webpack_require__(2);

	var _readerCreateDocument2 = _interopRequireDefault(_readerCreateDocument);

	/**
	 * @description Supported files by engine
	 * @type {{extension: Array, mime: Array}}
	 */
	var files = {
	    extension: ['epub'],
	    mime: ['application/epub+zip']
	};

	var EpubEngine = (function (_Engine) {
	    _inherits(EpubEngine, _Engine);

	    function EpubEngine() {
	        _classCallCheck(this, EpubEngine);

	        _get(Object.getPrototypeOf(EpubEngine.prototype), 'constructor', this).apply(this, arguments);

	        this.createDocument = _readerCreateDocument2['default'];
	        this.parser = 'readArchive';
	        this.files = files;
	    }

	    _createClass(EpubEngine, null, [{
	        key: 'test',
	        value: function test(file) {
	            return Boolean(file && _JsFile.Engine.validateFile(file, files));
	        }
	    }, {
	        key: 'mimeTypes',
	        value: files.mime.slice(0),
	        enumerable: true
	    }]);

	    return EpubEngine;
	})(_JsFile.Engine);

	(0, _JsFile.defineEngine)(EpubEngine);

	exports['default'] = EpubEngine;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _parsePackageInfo = __webpack_require__(3);

	var _parsePackageInfo2 = _interopRequireDefault(_parsePackageInfo);

	var _parseStyles = __webpack_require__(7);

	var _parseStyles2 = _interopRequireDefault(_parseStyles);

	var _buildHtml = __webpack_require__(8);

	var _buildHtml2 = _interopRequireDefault(_buildHtml);

	var _Document = __webpack_require__(9);

	var _Document2 = _interopRequireDefault(_Document);

	var normalizeDataUri = _JsFile2['default'].Engine.normalizeDataUri;

	exports['default'] = function (entries) {
	    return new Promise((function (resolve, reject) {
	        var queue = [];
	        var fileName = this.fileName;

	        var documentData = {
	            styles: {}, //TODO: remove and use parseStyles method
	            media: {}
	        };
	        var pages = {};
	        var domParser = new DOMParser();

	        entries.forEach(function (fileEntry) {
	            if (!fileEntry.file) {
	                return;
	            }

	            var method = undefined;
	            var filename = fileEntry.entry.filename;
	            var isImage = Boolean(filename && filename.indexOf('/images/') >= 0);
	            var isFont = Boolean(!isImage && filename && filename.indexOf('/fonts/') >= 0);
	            var isMediaResource = isFont || isImage;
	            if (isMediaResource) {
	                method = 'readAsDataURL';
	            }

	            queue.push(this.readFileEntry({
	                file: fileEntry.file,
	                method: method
	            }).then(function (result) {
	                var path = filename.replace(/\/?[^\/]+\//, '');

	                if (isMediaResource) {
	                    documentData.media[path] = {
	                        data: normalizeDataUri(result, filename)
	                    };
	                } else if (filename.indexOf('package.opf') >= 0) {
	                    (0, _parsePackageInfo2['default'])(documentData, domParser.parseFromString(result, 'application/xml'));
	                } else if (filename.indexOf('.xhtml') >= 0) {
	                    pages[path] = domParser.parseFromString(result, 'application/xml');
	                } else if (filename.indexOf('css/') >= 0) {
	                    documentData.styles[path] = result;

	                    //documentData.styles = parseStyles(result);
	                }
	            }));
	        }, this);

	        /**
	         * TODO: parse pages to JsFile structure and remove Epub HTML
	         */
	        Promise.all(queue).then(function () {
	            var doc = new _Document2['default']({
	                meta: {
	                    name: fileName
	                },
	                content: [],
	                styles: []
	            });
	            doc._rawHtml = (0, _buildHtml2['default'])(pages, documentData);
	            resolve(doc);
	        }, reject);
	    }).bind(this));
	};

	;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _parsePackageMetaData = __webpack_require__(4);

	var _parsePackageMetaData2 = _interopRequireDefault(_parsePackageMetaData);

	var _parsePackageManifest = __webpack_require__(5);

	var _parsePackageManifest2 = _interopRequireDefault(_parsePackageManifest);

	var _parsePackageSpine = __webpack_require__(6);

	var _parsePackageSpine2 = _interopRequireDefault(_parsePackageSpine);

	exports['default'] = function (documentData, xml) {
	    [].forEach.call(xml && xml.childNodes && xml.childNodes[0] && xml.childNodes[0].childNodes || [], function (node) {
	        switch (node.localName) {
	            case 'metadata':
	                documentData.documentInfo = (0, _parsePackageMetaData2['default'])(node);
	                break;
	            case 'manifest':
	                documentData.manifest = (0, _parsePackageManifest2['default'])(node);
	                break;
	            case 'spine':
	                documentData.spine = (0, _parsePackageSpine2['default'])(node);
	                break;
	        }
	    });

	    return documentData;
	};

	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var _bind = Function.prototype.bind;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

	exports['default'] = function (node) {
	    var dest = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    [].forEach.call(node && node.childNodes || [], function (node) {
	        var localName = node.localName;
	        var _node$textContent = node.textContent;
	        var textContent = _node$textContent === undefined ? '' : _node$textContent;

	        if (localName === 'date') {
	            var date = textContent.split('-');
	            date[1] = (date[1] || 1) - 1; //month
	            dest[localName] = new (_bind.apply(Date, [null].concat(_toConsumableArray(date))))();
	        } else if (localName === 'identifier') {
	            dest.id = textContent;
	        } else if (localName) {
	            dest[localName] = textContent;
	        }
	    });

	    return dest;
	};

	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var formatPropertyName = _JsFile2['default'].Engine.formatPropertyName;

	exports['default'] = function (node) {
	    var dest = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var forEach = [].forEach;

	    forEach.call(node && node.childNodes || [], function (node) {
	        var _node$attributes = node.attributes;
	        var attributes = _node$attributes === undefined ? {} : _node$attributes;

	        var id = attributes.id && attributes.id.value;

	        if (id) {
	            dest[id] = {};

	            forEach.call(attributes, function (_ref) {
	                var name = _ref.name;
	                var value = _ref.value;

	                if (name !== 'id') {
	                    dest[id][formatPropertyName(name)] = value;
	                }
	            });
	        }
	    });

	    return dest;
	};

	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _JsFile = __webpack_require__(1);

	var _JsFile2 = _interopRequireDefault(_JsFile);

	var _JsFile$Engine = _JsFile2['default'].Engine;
	var formatPropertyName = _JsFile$Engine.formatPropertyName;
	var attributeToBoolean = _JsFile$Engine.attributeToBoolean;

	exports['default'] = function (node) {
	    var dest = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    dest.items = [];
	    dest.indices = {};
	    var forEach = [].forEach;

	    forEach.call(node && node.childNodes || [], function (node) {
	        var _node$attributes = node.attributes;
	        var attributes = _node$attributes === undefined ? {} : _node$attributes;

	        var id = attributes.idref && attributes.idref.value;

	        if (id) {
	            (function () {
	                var item = {
	                    id: id
	                };

	                forEach.call(attributes, function (_ref) {
	                    var name = _ref.name;
	                    var value = _ref.value;

	                    if (name !== 'idref') {
	                        if (name === 'linear') {
	                            item.linear = attributeToBoolean(value);
	                        } else {
	                            item[formatPropertyName(name)] = value;
	                        }
	                    }
	                });

	                //save index by id
	                dest.indices[id] = dest.items.push(item) - 1;
	            })();
	        }
	    });

	    return dest;
	};

	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	exports["default"] = function (src) {
	    var result = [];

	    return result;
	};

	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _JsFile = __webpack_require__(1);

	var page = _JsFile.Document.elementPrototype;
	var tagName = page.properties.tagName;
	var pageClassName = 'jf-page';

	exports['default'] = function (pages, documentData) {
	    var result = document.createDocumentFragment();
	    var spine = documentData.spine;
	    var manifest = documentData.manifest;
	    var media = documentData.media;
	    var styles = documentData.styles;

	    var forEach = [].forEach;
	    var styleData = {};

	    spine.items.forEach(function (_ref) {
	        var id = _ref.id;

	        var item = manifest[id];
	        var page = item && pages[item.href];
	        if (page) {
	            var el = document.createElement(tagName);
	            var body = page.querySelector('body');
	            el.setAttribute('class', pageClassName);

	            if (body) {
	                forEach.call(page.querySelectorAll('head > link'), function (_ref2) {
	                    var attributes = _ref2.attributes;

	                    var _ref3 = attributes.href && /[\.\/]*css\/[^"]+/.exec(attributes.href.value) || [];

	                    var _ref32 = _slicedToArray(_ref3, 1);

	                    var path = _ref32[0];

	                    var style = path && styles[path];

	                    if (style) {
	                        if (!styleData[path]) {
	                            styleData[path] = {
	                                selectors: ['.' + pageClassName],
	                                src: style.replace(/[\.\/]*(images|fonts)\/[^"]+/g, function (path) {
	                                    path = path.replace(/^[\.\/]+/, '');
	                                    var obj = media[path];
	                                    return obj && obj.data || '';
	                                })
	                            };
	                        }
	                    }
	                });

	                el.innerHTML += body.innerHTML;
	                el.innerHTML = el.innerHTML.replace(/[\.\/]*(images|fonts)\/[^"]+/g, function (path) {
	                    var obj = media[path];
	                    return obj && obj.data || '';
	                });
	            }

	            result.appendChild(el);
	        }
	    });

	    if (styleData) {
	        var style = '';
	        var elMaxWidth = 0;

	        for (var p in styleData) {
	            if (styleData.hasOwnProperty(p)) {
	                (function () {
	                    var widthPattern = /width\s*\:\s*([0-9]+)px/g;
	                    var obj = styleData[p];
	                    var src = obj.src;
	                    var widthData = widthPattern.exec(src);

	                    while (widthData) {
	                        if (widthData[1] > elMaxWidth) {
	                            elMaxWidth = Number(widthData[1]);
	                        }

	                        widthData = widthPattern.exec(src);
	                    }

	                    src = src.replace(/\s*[^\{}\/]+\{/g, function (input) {
	                        input = input.trim();

	                        //@keyframes, @font-face, etc.
	                        if (input[0] === '@') {
	                            return input;
	                        }

	                        return input.split(/\s*,\s*/).map(function (selector) {
	                            return obj.selectors.map(function (parent) {
	                                return ' ' + parent + ' ' + selector;
	                            }).join(',');
	                        }).join(',');
	                    });

	                    style += src + '\n';
	                })();
	            }
	        }

	        if (style) {
	            style += '\n.' + pageClassName + ' {';
	            if (elMaxWidth) {
	                style += 'width:' + elMaxWidth + 'px;';
	            }

	            style += 'position:relative;}';
	            var el = document.createElement('style');
	            el.appendChild(document.createTextNode(style));
	            result.appendChild(el);
	        }
	    }

	    return result;
	};

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _JsFile = __webpack_require__(1);

	var EpubDocument = (function (_Document) {
	    _inherits(EpubDocument, _Document);

	    function EpubDocument() {
	        _classCallCheck(this, EpubDocument);

	        _get(Object.getPrototypeOf(EpubDocument.prototype), 'constructor', this).apply(this, arguments);
	    }

	    _createClass(EpubDocument, [{
	        key: 'html',
	        value: function html() {
	            return this._rawHtml;
	        }
	    }]);

	    return EpubDocument;
	})(_JsFile.Document);

	exports['default'] = EpubDocument;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;