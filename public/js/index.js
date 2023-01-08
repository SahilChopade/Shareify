console.log('Done1');
$(function() {
  
    $('#dropzone').on('dragover', function() {
      $(this).addClass('hover');
      console.log("dragover")
    });
    
    $('#dropzone').on('dragleave', function() {
      $(this).removeClass('hover');
      console.log("dragleave")
    });
    
    $('#dropzone input').on('change', function(e) {
      var file = this.files[0];
      const {name} = file;
      $('#dropzone').removeClass('hover');
      $('#dropzone').addClass('dropped');
      $('#dropzone img').remove();
    var reader = new FileReader(file);
    const div = document.querySelector("#text");
    div.innerText = `Choosen successfully`
    console.log(reader);
    reader.readAsDataURL(file);
    console.log("reached")
    reader.onload = function(e) {
        //   var data = e.target.result,
        //       $img = $('<img />').attr('src', data).fadeIn();
          console.log("reached")
        };
    //   } else {
    //     var ext = file.name.split('.').pop();
        
    //     $('#dropzone div').html(ext);
    //   }
    });
  });
  console.log('Done2');
