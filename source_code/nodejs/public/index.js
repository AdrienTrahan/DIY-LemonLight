window.onload = function(){
  
  const socket = io.connect(window.location.href);
  socket.on('image', (data) => {
      const image = document.getElementById('image');
      image.src = 'data:image/jpeg;base64,' + data;
  })
  socket.on('width', (data) => {
      $('.width').get(0).innerHTML = "width: " + (data) + "px";
  })
  socket.on('height', (data) => {
      $('.height').get(0).innerHTML = "height: " + (data) + "px";
  })
  socket.on('x', (data) => {
      $('.x').get(0).innerHTML = "x: " + (data) + "px";
  })
  socket.on('y', (data) => {
      $('.y').get(0).innerHTML = "y: " + (data) + "px";
  })

  refresh();



  $('.modRange').change(function(){
    console.log($('.ui-slider-handle').position().left / $('.ui-slider').width());
    if (this.id == "huemin" || this.id == "huemax"){
      if ((parseInt(this.value) != 'NaN') && (parseInt(this.value) >= 0) && (parseInt(this.value) <= 360)){
        can = false;
        if (this.id == "huemin"){
          if (parseInt(this.value) <= parseInt($('#huemax').val())){
            can = true;
            $($('.ui-slider-handle')[0]).css('left', parseInt(this.value) / 360 *  $('.ui-slider').width());
          }
        }else{
          if (parseInt(this.value) >= parseInt($('#huemin').val())){
            can = true;
            $($('.ui-slider-handle')[1]).css('left', parseInt(this.value) / 360 *  $('.ui-slider').width());
          }
        }
        if (can){
          $(this).val(parseInt(this.value) + "°");
          $.get(window.location.href + "sendHue?max=" + (Math.floor(($($('.ui-slider-handle')[1]).position().left) / $('.ui-slider').width() * 179)) + "&min=" + Math.floor($($('.ui-slider-handle')[0]).position().left / $('.ui-slider').width() * 179), function( data ) {
          });
        }else{
          if (this.id == "huemin"){
            this.value = "0°";
          }else{
            this.value = "360°"
          }
        }
      }else{
        if (this.id == "huemin"){
          this.value = "0°";
        }else{
          this.value = "360°"
        }
      }
    }else if (this.id == "satmax" || this.id == "satmin"){
      if ((parseInt(this.value) != 'NaN') && (parseInt(this.value) >= 0) && (parseInt(this.value) <= 255)){
        can = false;
        if (this.id == "satmin"){
          if (parseInt(this.value) <= parseInt($('#satmax').val())){
            can = true;
            $($('.ui-slider-handle')[2]).css('left', parseInt(this.value) / 255 *  $('.ui-slider').width());
          }
        }else{
          if (parseInt(this.value) >= parseInt($('#satmin').val())){
            can = true;
            $($('.ui-slider-handle')[3]).css('left', parseInt(this.value) / 255 *  $('.ui-slider').width());
          }
        }
        if (can){
          $(this).val(parseInt(this.value));
          $.get(window.location.href + "sendSat?max=" + Math.floor(($($('.ui-slider-handle')[3]).position().left) / $('.ui-slider').width() * 255) + "&min=" + Math.floor($($('.ui-slider-handle')[2]).position().left / $('.ui-slider').width() * 255), function( data ) {
          });
        }else{
          if (this.id == "satmin"){
            this.value = "0";
          }else{
            this.value = "255"
          }
        }

      }else{
        if (this.id == "satmin"){
          this.value = "0";
        }else{
          this.value = "255"
        }
      }
    }else if (this.id == "valmax" || this.id == "valmin"){
      if ((parseInt(this.value) != 'NaN') && (parseInt(this.value) >= 0) && (parseInt(this.value) <= 255)){
        can = false;
        if (this.id == "valmin"){
          if (parseInt(this.value) <= parseInt($('#valmax').val())){
            can = true;
            $($('.ui-slider-handle')[4]).css('left', parseInt(this.value) / 255 *  $('.ui-slider').width());
          }
        }else{
          if (parseInt(this.value) >= parseInt($('#valmin').val())){
            can = true;
            $($('.ui-slider-handle')[5]).css('left', parseInt(this.value) / 255 *  $('.ui-slider').width());
          }
        }
        if (can){
          $(this).val(parseInt(this.value));
          $.get(window.location.href + "sendVal?max=" + Math.floor(($($('.ui-slider-handle')[5]).position().left) / $('.ui-slider').width() * 255) + "&min=" + Math.floor($($('.ui-slider-handle')[4]).position().left / $('.ui-slider').width() * 255), function( data ) {
          });
        }else{
          if (this.id == "valmin"){
            this.value = "0";
          }else{
            this.value = "255"
          }
        }

      }else{
        if (this.id == "valmin"){
          this.value = "0";
        }else{
          this.value = "255"
        }
      }
    }

  })

  setInterval(function(){
    if ($('#image')[0].src == ""){
      $('.imageContainer')[0].style.backgroundColor = "#505050";
    }else{
      $('.imageContainer')[0].style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
  }, 100);

  
  $("#pipelineSelect").selectmenu();
  $("#pipelineSelect").on('selectmenuchange', function(x, j) {
    $.get(window.location.href + "changePipeline?pipeline=" + j.item.value, function( data ) {
    });
  });

  $(".imageSelect").selectmenu();
  $(".imageSelect").on('selectmenuchange', function(x, j) {
    $.get(window.location.href + "changeType?type=" + j.item.label, function( data ) {
    });
  });

  $( "#hue" ).slider({
          range: true,
          min: 0,
          max: 360,
          values: [ 0, 360 ],
          slide: function( event, ui ) {
            $('#huemin').val(ui.values[0]+"°");
            $('#huemax').val(ui.values[1]+"°");
            $.get(window.location.href + "sendHue?max=" + parseInt(ui.values[ 1 ] / 360 * 179) + "&min=" + parseInt(ui.values[ 0 ] / 360 * 179), function( data ) {
            });
          }
  });
  $( "#saturation" ).slider({
          range: true,
          min: 0,
          max: 255,
          values: [ 0, 255 ],
          slide: function( event, ui ) {
            $('#satmin').val(ui.values[0]);
            $('#satmax').val(ui.values[1]);
            $.get(window.location.href + "sendSaturation?max=" + (ui.values[ 1 ]) + "&min=" + ui.values[ 0 ], function( data ) {
            });
          }
  });
  $( "#value" ).slider({
          range: true,
          min: 0,
          max: 255,
          values: [ 0, 255 ],
          slide: function( event, ui ) {
            $('#valmin').val(ui.values[0]);
            $('#valmax').val(ui.values[1]);
            $.get(window.location.href + "sendValue?max=" + (ui.values[ 1 ]) + "&min=" + ui.values[ 0 ], function( data ) {
            });
          }
  });

}


function refresh(){
  $.get(window.location.href + "retrievePipelines?", function( data ) {
    console.log(data);
    var count = (data.match(/{/g) || []).length;
    var options = "";
    for (var i = 1; i <= count; i++){
      options += '<option class="pipeline" value="' + i + '">pipeline ' + i + '</option>';
    }
    document.getElementById('pipelineSelect').innerHTML = options;
    $('#pipelineSelect').selectmenu('refresh');
  });
}