(function() {
  "use strict";

  // VanillaToast class
  var VanillaToast = (function() {
    function VanillaToast() {
      this.queue = new TaskQueue();
      this.cancellationTokens = [];
      this.element = null;
    }

    var constants = {
      default: {
        className: 'default',
        fadeDuration: 400,
        fadeInterval: 16,
        duration: 2000,
        closeButton: false,
        immediately: false
      },
      success: {
        className: 'success'
      },
      info: {
        className: 'info'
      },
      warning: {
        className: 'warning'
      },
      error: {
        className: 'error',
        duration: 3000,
        closeButton: true
      }
    };

    // create elements.
    VanillaToast.prototype.initElement = function(selector) {
      var container = document.createElement('div');
      var toastBox = document.createElement('div');
      var text = document.createElement('div');
      var closeButton = document.createElement('span');

      container.setAttribute("id", "vanilla-toast-container");

      toastBox.setAttribute("id", "vanilla-toast");

      text.setAttribute("id", "vanilla-toast-text");

      closeButton.setAttribute("id", "vanilla-toast-close-button");
      closeButton.innerHTML = '&#10006;';

      toastBox.appendChild(text);
      toastBox.appendChild(closeButton);
      container.appendChild(toastBox);

      if (selector) {
        document.getElementById(seletor).appendChild(containter);
      } else {
        document.body.appendChild(container);
      }

      this.element = {
        container: container,
        toastBox: toastBox,
        text: text,
        closeButton: closeButton
      };

      _setStyle(this, constants.default);
    };

    // cancel current showing toast.
    VanillaToast.prototype.cancel = function() {
      if (this.cancellationTokens.length) this.cancellationTokens[0].cancel();
    };

    // cancel all enqueued toasts.
    VanillaToast.prototype.cancelAll = function() {
      var length = this.cancellationTokens.length;
      for (var i = 0; i < length; ++i) {
        (function(token) {
          token.cancel();
        })(this.cancellationTokens[length - i - 1]);
      }
    };

    // show toast
    VanillaToast.prototype.show = function(text, option, callback) {
      var self = this;
      if (!self.element) self.initElement();
      if (!option) option = {};
      // if immediately show option is on, cancel all previous toasts.
      if (option.immediately) self.cancelAll();

      var cancellationToken = new CancellationToken();
      // enqueue
      self.queue.enqueue(function(next) {
        // time setting
        var fadeDuration = option.fadeDuration || constants.default.fadeDuration;
        var fadeInterval = option.fadeInterval || constants.default.fadeInterval;
        var fadeStep = Math.min(fadeInterval / fadeDuration, 1);
        var duration = option.duration || constants.default.duration;

        // close button setting
        self.element.closeButton.style.display =
          option.closeButton ? 'inline' : 'none';

        // set text
        self.element.text.innerHTML = text;

        // set visible
        var s = self.element.toastBox.style;
        s.opacity = 0;
        s.display = 'inline-block';

        // set styles
        _setStyle(self, option);

        // timeoutId
        var timeoutId = null;

        // duration timeout callback.
        var timeoutCallback = function() {
          timeoutId = null;
          // release click clickHandler
          self.element.toastBox.removeEventListener('click', cancelHandler);
          _hide(self, option, cancellationToken, function() {
            if (callback) callback();
            self.cancellationTokens.shift().dispose();
            next();
          });
        };

        // click for close handler
        var cancelHandler = function() {
          if (!timeoutId) return;
          clearTimeout(timeoutId);
          timeoutCallback();
        };

        // start fade in.
        _fade(s, fadeStep, fadeInterval, cancellationToken, function() {
          // show while duration time and hide.
          self.element.toastBox.addEventListener('click', cancelHandler);
          if (cancellationToken.isCancellationRequested) {
            timeoutCallback();
          } else {
            timeoutId = setTimeout(timeoutCallback, duration);
            cancellationToken.register(function() {
              cancelHandler();
            });
          }
        });
      });

      self.cancellationTokens.push(cancellationToken);

      return self;
    };

    // create preset methods
    for (var item in constants) {
      (function(preset) {
        VanillaToast.prototype[preset] = function(text, option, callback) {
          if (!option) option = {};

          // copy preset options
          for (var propertyName in constants[preset]) {
            if (option[propertyName] === undefined)
              option[propertyName] = constants[preset][propertyName];
          }

          return this.show(text, option, callback);
        };
      })(item);
    }

    // private methods.

    // set style
    function _setStyle(self, option) {
      self.element.toastBox.className = option.className || constants.default.className;
    };

    // hide toast
    function _hide(self, option, cancellationToken, callback) {
      if (!option) option = {};

      // time setting
      var fadeDuration = option.fadeDuration || constants.default.fadeDuration;
      var fadeInterval = option.fadeInterval || constants.default.fadeInterval;
      var fadeStep = Math.min(fadeInterval / fadeDuration, 1);

      // set visible
      var s = self.element.toastBox.style;
      s.opacity = 1;

      // start fade out and call callback function.
      _fade(s, -fadeStep, fadeInterval, cancellationToken, function() {
        s.display = 'none';
        if (callback) callback();
      });

      return self;
    };

    // run fade animation
    function _fade(style, step, interval, cancellationToken, callback) {
      (function fade() {
        if (cancellationToken.isCancellationRequested) {
          style.opacity = step < 0 ? 0 : 1;
          if (callback) callback();
          return;
        }
        style.opacity = Number(style.opacity) + step;
        if (step < 0 && style.opacity < 0) {
          if (callback) callback();
        } else if (step > 0 && style.opacity >= 1) {
          if (callback) callback();
        } else {
          var timeoutId = setTimeout(function() {
            timeoutId = null;
            fade();
          }, interval);
          cancellationToken.register(function() {
            if (!timeoutId) return;
            clearTimeout(timeoutId);
            timeoutId = null;
            if (callback) callback();
          });
        }
      })();
    };

    return VanillaToast;
  })();

  // CancellationToken class
  var CancellationToken = (function() {
    function CancellationToken() {
      this.isCancellationRequested = false;
      this.cancelCallbacks = [];
    }

    CancellationToken.prototype.cancel = function() {
      this.isCancellationRequested = true;
      var copiedCallbacks = this.cancelCallbacks.slice();
      while (copiedCallbacks.length) copiedCallbacks.shift()();
    };

    CancellationToken.prototype.register = function(callback) {
      this.cancelCallbacks.push(callback);
    };

    CancellationToken.prototype.dispose = function() {
      while (this.cancelCallbacks.length) this.cancelCallbacks.shift();
    };

    return CancellationToken;
  })();

  // TaskQueue class from https://github.com/talsu/async-task-queue
  var TaskQueue = (function() {
    function TaskQueue() {
      this.queue = [];
      this.isExecuting = false;
    }

    // enqueue job. run immediately.
    TaskQueue.prototype.enqueue = function(job) {
      // enqueue.
      this.queue.push(job);
      // call execute.
      dequeueAndExecute(this);
    };

    // Dequeue and execute job.
    function dequeueAndExecute(self) {
      if (self.isExecuting) return;

      // Dequeue Job.
      var job = self.queue.shift();
      if (!job) return;

      //Execute Job.
      self.isExecuting = true;

      // Pass next job execute callback.
      job(function() {
        self.isExecuting = false;
        dequeueAndExecute(self);
      });
    }

    return TaskQueue;
  })();

  // export
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = new VanillaToast();
    }
    exports.vanillaToast = new VanillaToast();
  } else {
    this.vanillaToast = new VanillaToast();
  }
}.call(this));
