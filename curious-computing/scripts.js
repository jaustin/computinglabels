function trim (str) {
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function gravatar_url(email, size) {
  var size_query = '?';
  if(size) {
    size_query += 's=' + parseInt(size)+'&';
  }
  
  var d = new Date();
  var cacheBuster = 'date='+d.getTime().toString()

  email = hex_md5(trim(email).toLowerCase());
  
  return '<img src="https://www.gravatar.com/avatar/' + email + size_query + cacheBuster + '">';
}

function getTinyURL(longURL, success)
{
    var API = 'http://json-tinyurl.appspot.com/?url=',
        URL = API + encodeURIComponent(longURL) + '&callback=?';
    $.getJSON(URL, function(data){
        success && success(data);
    });                  
}

$(document).ready(function() {
  $('.avatar .caption').editable(
    function(value, settings) { return value; },
    {
      onblur: 'submit',
      submit: 'OK',
      height: 20,
    }
  );

  var gravatar_size = 256;
  var gravatar_email = 'name@example.com';
  $('.avatar-image').html(gravatar_url(gravatar_email, gravatar_size));

  var md_contents = $('.description').text();
  var qr_link = $('.qrcodelink').text();
  var title_contents = $('.gamefont').text();
  var date_data = $('.datediv').text();
  
  if (qr_link.match("^http")) {
     $('.description').addClass("qr_with_desc");
     $('.qrcodelink').addClass("linkalign");
     $('.qrcodelink').removeClass("noprint");
     $('#qrcode').html("");
     $('#qrcode').qrcode(qr_link);
  } else {
    $('.qrcodelink').addClass("noprint");
  }

  $('.description').html(markdown.toHTML(md_contents));

  $('.description').editable(
    function(value, settings) {
      settings.data = value;
      return markdown.toHTML(value);
    },
    {
      type: 'textarea',
      onblur: 'submit',
      submit: 'OK',
      data: md_contents,
      width: 560,
      height: 220,
    }
  );
  $('.gamefont').editable(
    function(value, settings) {
      settings.data = value;
      if (true) {
        qr_link = "monkey";
        console.log("i tried!" + qr_link);
      }
      return (value);
    },
    {
      type: 'text',
      onblur: 'submit',
      submit: 'OK',
      data: title_contents,
      select : true,
    }
  );

  $('.qrcodelink').editable(
    function(value, settings) {
      settings.data = value;
      if (value) {
        $('.description').addClass("qr_with_desc");
        $('.qrcodelink').addClass("linkalign");
        $('.qrcodelink').removeClass("noprint");
        $('#qrcode').html("");
        $('#qrcode').qrcode(value);
      } else {
        $('.description').removeClass("qr_with_desc");
        $('.qrcodelink').removeClass("linkalign");
        $('.qrcodelink').addClass("noprint");
        $('#qrcode').html("");
      }
    return value;
    },
    {
      type: 'text',
      onblur: 'submit',
      submit: 'OK',
      data: "en.wikipedia.org/wiki/" + $('.gamefont').text(),
    }
  );

  $('.datediv').editable(
    function(value, settings) {
      settings.data = value;
      return value;
    },
    {
      submit: 'OK',
      onblur: 'submit',
      data: date_data,
      select : true,
      height: 20,
    }
  );
});
