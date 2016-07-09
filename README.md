# sound.js

```javascript
    init_player({
      volume: 0.5,
      url: "http://example.com/media/MGM5ZDB" },
    function(player) { // Init Callback
        trigger_ios_callbacks()
        player.play()
    }, function() { // End Callback
        console.log('Playback Ended')
    })
```

Uses [Web Audio API](http://www.w3.org/TR/webaudio/) AudioContext
to provide a JavaScript Audio Player,
compatible with Apple Safari / Google Chrome.

```javascript
  player._playback_time()
  // -> 83.314

  player.buffer.duration
  // -> 271.2799987792969

  player.pause()
  player.paused
  // -> true
  player.stop()
```
