// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.js":[function(require,module,exports) {
function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var imgs = document.getElementById("webcam");
var canvas = document.getElementById("canvas");
canvas.width = imgs.width;
canvas.height = imgs.height;
var draw = canvas.getContext("2d"); // const webcam = new Webcam(img, 'user', canvasElement);

var bgs = document.getElementById("webcam");
var effect_blur = document.getElementById("blurrer");
var effect_gray = document.getElementById("grayer");
var blurEffect = false;
var grayEffect = false;
video = document.getElementById("webcam");

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(function (stream) {
    video.srcObject = stream;
  });
}

main();

function main() {
  if (video.readyState == 4) {
    console.log("video is ready for processing");
    body_segment();
  } else {
    console.log("nope it is not ready yet");
    setTimeout(main, 1000 / 30);
  }
}

function body_segment() {
  return _body_segment.apply(this, arguments);
} // async function loadAndPredict() {
//     // draw.globalAlpha = 1;
//     draw.drawImage(img,0,0,img.width,img.height);
//     const net = await bodyPix.load({
//         architecture: 'MobileNetV1',
//         outputStride: 16,
//         multiplier: 0.75,
//         quantBytes: 2
//       });
//       console.log('model loaded')
//       console.log(img.height)
//     const segmentation = await net.segmentPerson(img, {
//         flipHorizontal: true,
//         internalResolution: 'medium',
//         segmentationThreshold: 0.75
//     });
//     console.log('segmentation loaded')
//     const foregroundColor = { r: 0, g: 0, b: 0, a: 255 };
//     const backgroundColor = { r: 0, g: 0, b: 0, a: 0 };
//     const backgroundDarkeningMask = bodyPix.toMask(segmentation, foregroundColor, backgroundColor, false);
//     console.log(backgroundDarkeningMask)
//     // draw.putImageData(backgroundDarkeningMask,0,0);
//     if (!(blurEffect && grayEffect)){
//       frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
//     }
//     effect_blur.addEventListener('change', function () {
//       if (effect_blur.checked) {
//         blurEffect=true;
//         frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
//       } else {
//         blurEffect=false;
//         frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
//       }
//     })
//     effect_gray.addEventListener('change', function () {
//       if (effect_gray.checked) {
//         grayEffect=true;
//         frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
//       } else {
//         grayEffect=false;
//         frameMerger(backgroundDarkeningMask,blurEffect,grayEffect);
//       }
//     })
//     backImages=document.getElementsByClassName("backgrounds")
//     for (backgroundImages of backImages){
//       backgroundImages.addEventListener('click',function(){
//       bgs = document.getElementById(this.id);
//       bgs.style.opacity="1";
//       frameMerger(backgroundDarkeningMask,blurEffect,grayEffect)
//       })
//     }
//     }


function _body_segment() {
  _body_segment = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var frame, canvas, draw, model, result, foregroundColor, backgroundColor, backgroundDarkeningMask, _iterator, _step;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            frame = document.getElementById("webcam"); // load HTML canvas

            canvas = document.getElementById("canvas");
            canvas.width = frame.width;
            canvas, height = frame.height;
            draw = canvas.getContext("2d"); // draw.globalAlpha = 0.3;

            console.log(frame.width); // load body segmentation model

            _context.next = 8;
            return bodyPix.load({
              architecture: "ResNet50",
              outputStride: 16,
              multiplier: 1,
              quantBytes: 4
            });

          case 8:
            model = _context.sent;

          case 9:
            if (!1) {
              _context.next = 31;
              break;
            }

            _context.next = 12;
            return model.segmentPerson(frame, {
              flipHorizontal: false,
              internalResolution: "medium",
              segmentationThreshold: 0.75
            });

          case 12:
            result = _context.sent;
            foregroundColor = {
              r: 0,
              g: 0,
              b: 0,
              a: 255
            };
            backgroundColor = {
              r: 0,
              g: 0,
              b: 0,
              a: 0
            };
            backgroundDarkeningMask = bodyPix.toMask(result, foregroundColor, backgroundColor, false);
            backImages = document.getElementsByClassName("backgrounds");
            _iterator = _createForOfIteratorHelper(backImages);

            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                backgroundImages = _step.value;
                backgroundImages.addEventListener("click", function () {
                  bgs = document.getElementById(this.id);
                  bgs.style.opacity = "1"; // frameMerger(backgroundDarkeningMask,blurEffect,grayEffect,frame)
                });
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }

            effect_blur.addEventListener("change", function () {
              if (effect_blur.checked) {
                blurEffect = true;
              } else {
                blurEffect = false;
              }
            }); // frameMerger(backgroundDarkeningMask,false,false,frame)
            // console.log(result.width)
            // console.log(backgroundDarkeningMask)
            // draw.putImageData(backgroundDarkeningMask,0,0);
            // loop to process the next frame
            // console.log('next frame')

            draw.globalCompositeOperation = "destination-over";
            draw.putImageData(backgroundDarkeningMask, 0, 0);
            draw.globalCompositeOperation = "source-in";
            draw.drawImage(frame, 0, 0, frame.width, frame.height);
            draw.globalCompositeOperation = "destination-atop";

            if (blurEffect) {
              draw.filter = "blur(3px)";
              blurEffect = false;
            } // if (grayEffect) {
            //   draw.filter = "grayscale(1)";
            // }
            // if (blurEffect && grayEffect) {
            //   draw.filter = "blur(3px) grayscale(1)";
            // }


            draw.drawImage(bgs, 0, 0, frame.width, frame.height);
            _context.next = 29;
            return tf.nextFrame();

          case 29:
            _context.next = 9;
            break;

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _body_segment.apply(this, arguments);
}

function frameMerger(background_rm, blurr, grayy, img) {
  if (!background_rm) {
    return;
  } // console.log(bgs);
  //   canvas = document.getElementById('canvas');
  //   canvas.width = img.width;
  //   canvas.height = img.height;


  var draw = canvas.getContext("2d");
  draw.globalCompositeOperation = "destination-over";
  draw.putImageData(background_rm, 0, 0);
  draw.globalCompositeOperation = "source-in"; //   // // ctx.putImageData(img, 0, 0);

  draw.drawImage(img, 0, 0, img.width, img.height);
  draw.globalCompositeOperation = "destination-atop"; //   if (blurr){
  //     draw.filter='blur(3px)';
  //   }
  //   if (grayy){
  //     draw.filter='grayscale(1)';
  //   }
  //   if (blurr && grayy){
  //     draw.filter='blur(3px) grayscale(1)';
  //   }

  draw.drawImage(bgs, 0, 0, img.width, img.height);
}
},{}],"../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57001" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/Webcam.e31bb0bc.js.map