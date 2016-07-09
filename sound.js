﻿(function() {
  var Stream;

  (function(AudioContext) {
    var audio;
    audio = new AudioContext();
    return window.init_player = function(options, init, complete) {
      return $.getNative(options.url).then(function(data) {
        return audio.decodeAudioData(data, function(buffer) {
          return new Stream(audio, buffer, options, init, complete);
        });
      });
    };
  })(window.AudioContext || window.webkitAudioContext);

  Stream = (function() {
    function Stream(audio1, buffer1, options1, init1, complete1) {
      this.audio = audio1;
      this.buffer = buffer1;
      this.options = options1;
      this.init = init1;
      this.complete = complete1;
      this.time = 0;
      this.paused = false;
      this.init(this);
    }

    Stream.prototype.play = function() {
      this.playing = true;
      return this._play();
    };

    Stream.prototype.stop = function() {
      if (this.playing) {
        return this.source.stop();
      }
    };

    Stream.prototype.pause = function() {
      this.paused = true;
      this.time += this._playback_time();
      return this.source.stop(0);
    };

    Stream.prototype.volume = function(value) {
      return this._volume(value);
    };

    Stream.prototype._playback_time = function() {
      if (!this.started_at) {
        return this.time;
      }
      return (Date.now() - this.started_at) / 1000;
    };

    Stream.prototype._play = function() {
      this.gain = this.audio.createGain();
      this.gain.connect(this.audio.destination);
      this.source = this.audio.createBufferSource();
      this.source.buffer = this.buffer;
      this.source.connect(this.gain);
      this.source.onended = (function(_this) {
        return function(event) {
          return _this._ended();
        };
      })(this);
      this._volume(this.options.volume || 1);
      this.paused = false;
      this.started_at = Date.now();
      return this.source.start(0, this.time, this.buffer.duration);
    };

    Stream.prototype._volume = function(value) {
      return this.gain.gain.value = value;
    };

    Stream.prototype._ended = function() {
      if (this.paused) {
        return;
      }
      delete this.playing;
      if (this.complete) {
        this.complete();
      }
      this.gain.disconnect();
      return this.source.disconnect();
    };

    return Stream;

  })();

}).call(this);