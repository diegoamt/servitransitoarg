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
var main = function main() {
  var credentials = {
    space: 'dob35lpczg27',
    accessToken: 'QcaN8-S79TzQtt8PFcj97bVRrOYXf_jdQFcllX2Wv-4'
  };
  var selectors = {
    navbar: {
      title: '.navbar__title',
      description: '.navbar__description',
      brand: '.navbar__brand',
      logo: '.navbar__logo',
      menu: '.navbar__menu'
    },
    backgroundHeader: {
      container: '.background-header__container',
      title: '.background-header__title',
      whatsapp: '.background-header__whatsapp',
      phone: '.background-header__phone'
    },
    services: {
      title: '.services__title',
      content: '.services__content'
    },
    footer: {
      title: '.footer__title',
      socialMedia: '.footer__social-media',
      phone: '.footer__phone',
      address: '.footer__address',
      facebook: '.footer__facebook',
      instagram: '.footer__instagram'
    }
  };

  function getClient() {
    var space = credentials.space,
        accessToken = credentials.accessToken;
    return contentful.createClient({
      space: space,
      accessToken: accessToken
    });
  }

  function renderNavbar(content) {
    var menu = document.querySelector(selectors.navbar.menu);
    ['navigationLink1', 'navigationLink2', 'navigationLink3'].forEach(function (field, i) {
      item = document.createElement('li');
      item.classList.add('navbar__item');
      item.appendChild(document.createTextNode(content[field]));
      item.addEventListener('click', function () {
        var target = "#section".concat(i + 1);
        var el = document.querySelector(target);
        window.scroll({
          top: el.offsetTop - 70,
          left: 0,
          behavior: 'smooth'
        });
      });
      menu.appendChild(item);
    });
  }

  function renderContent(content) {
    var backgroundContainer = document.querySelector(selectors.backgroundHeader.container);
    var backgroundHeaderTitle = document.querySelector(selectors.backgroundHeader.title);
    var footerTitle = document.querySelector(selectors.footer.title);
    var servicesTitle = document.querySelector(selectors.services.title);
    var sectionHeader1 = content.sectionHeader1,
        sectionHeader2 = content.sectionHeader2,
        sectionHeader3 = content.sectionHeader3,
        backgroundImage = content.backgroundImage;
    backgroundHeaderTitle.appendChild(document.createTextNode(sectionHeader1));
    servicesTitle.appendChild(document.createTextNode(sectionHeader2));
    footerTitle.appendChild(document.createTextNode(sectionHeader3));
    var imgUrl = "https:".concat(backgroundImage.fields.file.url);
    backgroundContainer.style.backgroundImage = "url('".concat(imgUrl, "')");
  }

  function renderBrand(contact) {
    var logo = contact.logo,
        companyName = contact.companyName,
        companyDescription = contact.companyDescription;
    var brand = document.querySelector(selectors.navbar.brand);
    var title = document.querySelector('title');
    var navbarTitle = document.querySelector(selectors.navbar.title);
    var navbarDescription = document.querySelector(selectors.navbar.description);
    var logoImg = document.createElement('img');
    logoImg.classList.add('navbar__logo');
    logoImg.src = "https:".concat(logo.fields.file.url);
    logoImg.alt = companyName;
    brand.insertBefore(logoImg, brand.firstChild);
    title.appendChild(document.createTextNode(companyName));
    navbarTitle.appendChild(document.createTextNode(companyName));
    navbarDescription.appendChild(document.createTextNode(companyDescription));
  }

  function sortServices(a, b) {
    if (a.fields.name < b.fields.name) {
      return -1;
    }

    if (a.fields.name > b.fields.name) {
      return 1;
    }

    return 0;
  }

  function getServiceItemMarkup(name, imgUrl) {
    return "\n        <div class=\"services__item\">\n            <img class=\"services__item-img\" src=\"".concat(imgUrl, "\" alt=\"").concat(name, "\">\n            <div class=\"services__item-title\">\n                <span>").concat(name, "</span> <span class=\"services__item-icon icon-angle-right\"></span>\n            </div>\n        </div>");
  }

  function renderServices(services) {
    var servicesContent = document.querySelector(selectors.services.content);
    services.sort(sortServices).forEach(function (service) {
      var _service$fields = service.fields,
          name = _service$fields.name,
          image = _service$fields.image;
      var item = getServiceItemMarkup(name, "https:".concat(image.fields.file.url));
      servicesContent.insertAdjacentHTML('beforeend', item);
    });
  }

  function renderFooter(contact) {
    var address = contact.address,
        phone1 = contact.phone1,
        phone2 = contact.phone2,
        isWhatsappPhone1 = contact.isWhatsappPhone1,
        facebook = contact.facebook,
        instagram = contact.instagram;
    var backgroundHeaderPhone = document.querySelector(selectors.backgroundHeader.phone);
    var backgroundHeaderWhatsapp = document.querySelector(selectors.backgroundHeader.whatsapp);
    var footerPhone = document.querySelector(selectors.footer.phone);
    var footerAddress = document.querySelector(selectors.footer.address);
    var footerFacebook = document.querySelector(selectors.footer.facebook);
    var footerInstagram = document.querySelector(selectors.footer.instagram);

    if (isWhatsappPhone1) {
      var whatsappUrl = "https://wa.me/32".concat([phone1], "?text=Hola,%20estoy%20interesado");
      backgroundHeaderPhone.appendChild(document.createTextNode(phone1));
      backgroundHeaderWhatsapp.href = whatsappUrl;
    } else {
      backgroundHeaderPhone.style.display = 'none';
    }

    var phoneStr = phone2 ? "".concat(phone1, " - ").concat(phone2) : phone1;
    footerPhone.appendChild(document.createTextNode(phoneStr));
    footerAddress.appendChild(document.createTextNode(address));

    if (facebook) {
      footerFacebook.href = facebook;
    } else {
      footerFacebook.display = 'none';
    }

    if (instagram) {
      footerInstagram.href = instagram;
    } else {
      footerInstagram.display = 'none';
    }
  }

  function init() {
    var client = getClient(); // content

    client.getEntries({
      'content_type': 'content'
    }).then(function (entries) {
      var fields = entries.items[0].fields;
      renderNavbar(fields);
      renderContent(fields);
    }); // contact

    client.getEntries({
      'content_type': 'contact'
    }).then(function (entries) {
      var fields = entries.items[0].fields;
      renderBrand(fields);
      renderFooter(fields);
    }); // services

    client.getEntries({
      'content_type': 'service'
    }).then(function (entries) {
      renderServices(entries.items);
    });
  }

  init();
};

main();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51478" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/argtramites.e31bb0bc.js.map