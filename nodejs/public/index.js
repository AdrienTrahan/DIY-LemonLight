window.onload = function(){

    const socket = io.connect('http://192.168.0.168:3000');
    socket.on('image', (data) => {
      const image = document.getElementById('clean');
      image.src = 'data:image/jpeg;base64,' + data;
    })
    socket.on('image2', (data) => {
      const image = document.getElementById('modified');
      image.src = 'data:image/jpeg;base64,' + data;
    })
    socket.on('width', (data) => {
      document.getElementById('width').innerHTML = "width: " + data;
    })
    socket.on('height', (data) => {
      document.getElementById('height').innerHTML = "height: " + data;
    })
    socket.on('x', (data) => {
      document.getElementById('x').innerHTML = "x: " + data;
    })
    socket.on('y', (data) => {
      document.getElementById('y').innerHTML = "y: " + data;
    })

    $( function() {
        $( "#hue" ).slider({
          range: true,
          min: 0,
          max: 179,
          values: [ 0, 179 ],
          slide: function( event, ui ) {
            $.get( "sendHue?max=" + ui.values[ 1 ] + "&min=" + ui.values[ 0 ], function( data ) {
            });
          }
        });
        $( "#saturation" ).slider({
          range: true,
          min: 0,
          max: 255,
          values: [ 0, 255 ],
          slide: function( event, ui ) {
            $.get( "sendSaturation?max=" + ui.values[ 1 ] + "&min=" + ui.values[ 0 ], function( data ) {
            });
          }
        });
        $( "#value" ).slider({
          range: true,
          min: 0,
          max: 255,
          values: [ 0, 255 ],
          slide: function( event, ui ) {
            $.get( "sendValue?max=" + ui.values[ 1 ] + "&min=" + ui.values[ 0 ], function( data ) {
            });
          }
        });
      });

}