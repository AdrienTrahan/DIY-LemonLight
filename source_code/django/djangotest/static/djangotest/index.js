window.onload = function(){
      console.log("asd");ht: ' + JSON.parse(e.currentTarget.response)['height'];
          const x = document.getElementById('x');
          x.innerHTML = 'x: ' + JSON.parse(e.currentTarget.response)['x'];
          const y = document.getElementById('y');
          y.innerHTML = 'y: ' + JSON.parse(e.currentTarget.response)['y'];
        }
      }, 100);
      
    $( function() {
        $( "#hue" ).slider({
          range: true,
          min: 0,
          max: 179,
          values: [ 0, 179 ],
          slide: function( event, ui ) {
            const Http = new XMLHttpRequest();
            const url='http://localhost:8000/sendHue?max=' + ui.values[ 1 ] + '&min=' + ui.values[ 0 ];
            Http.open("GET", url);
            Http.send();
          }
        });
        $( "#saturation" ).slider({
          range: true,
          min: 0,
          max: 255,
          values: [ 0, 255 ],
          slide: function( event, ui ) {
            const Http = new XMLHttpRequest();
            const url='http://localhost:8000/sendSaturation?max=' + ui.values[ 1 ] + '&min=' + ui.values[ 0 ];
            Http.open("GET", url);
            Http.send();
          }
        });
        $( "#value" ).slider({
          range: true,
          min: 0,
          max: 255,
          values: [ 0, 255 ],
          slide: function( event, ui ) {
            const Http = new XMLHttpRequest();
            const url='http://localhost:8000/sendValue?max=' + ui.values[ 1 ] + '&min=' + ui.values[ 0 ];
            Http.open("GET", url);
            Http.send();
          }
        });
      });

}