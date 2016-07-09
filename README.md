# sound.js

```javascript
    init_player({
      volume: 0.5,
      url: "http://example.com/media/MGM5ZDB" },
    function(player) { // Init Callback
        player.play()
    }, function() { // End Callback
        console.log('Playback Ended')
    })
```

Uses AudioContext JS to provide an Audio Player

Compatible with Apple Safari