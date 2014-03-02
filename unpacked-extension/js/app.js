(function() {
  var app;
  window.log = function() {
    if (this.console && this.console.log) {
      return console.log.apply(console, Array.prototype.slice.call(arguments));
    }
  };
  app = {};
  app.sections = [
    {
      type: 'text',
      value: '<h1>Presenter Title</h1>'
    }, {
      type: 'text',
      value: '<p>Dolore gastropub vinyl, laboris 3 wolf moon meggings post-ironic proident. Ennui cred pour-over Wes Anderson. Selfies occaecat excepteur, disrupt four loko wayfarers pop-up +1 enim small batch XOXO laboris artisan cliche. Keffiyeh duis ex cliche meggings roof party. Ea blog direct trade, Banksy Intelligentsia disrupt tousled Blue Bottle ad Bushwick bespoke master cleanse cray sint single-origin coffee. Tattooed disrupt aliqua Vice Echo Park church-key, minim cornhole eu officia High Life. Etsy laborum Portland biodiesel, scenester eiusmod four loko.</p>'
    }, {
      type: 'image',
      value: 'http://imagequilts.com/images/quilts/muybridge.png'
    }, {
      type: 'text',
      value: '<p>Excepteur wayfarers aliqua Thundercats. Shabby chic wayfarers American Apparel, gluten-free aliquip 90\'s cornhole. Ennui selvage nihil kale chips occaecat, swag cray chambray bespoke. Cliche photo booth gentrify keffiyeh keytar tofu typewriter, Banksy sustainable pug Helvetica actually fashion axe sint. Williamsburg blog retro typewriter, slow-carb Intelligentsia hella brunch laboris you probably haven\'t heard of them gentrify church-key sint master cleanse. Mlkshk Austin hoodie pop-up pork belly organic. Selvage kitsch vinyl, photo booth YOLO mollit mixtape.</p>'
    }
  ];
  app.init = function() {
    app.setupDragAndDropListener();
    return app.render();
  };
  app.setupImageListener = function() {
    return chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
      return log(request.urls);
    });
  };
  app.setupDragAndDropListener = function() {
    return document.body.ondrop = function(e) {
      var file, files, reader, _i, _len, _ref, _ref2;
      log('asd');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
        files = e.dataTransfer.files;
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          if (((_ref = file.type) != null ? (_ref2 = _ref.split('\/')) != null ? _ref2[0].toLowerCase() : void 0 : void 0) === 'image') {
            reader = new FileReader();
            reader.onload = function(e) {
              return log(e.target.result);
            };
            reader.readAsDataURL(file);
          }
        }
      }
      e.preventDefault();
      return false;
      document.body.mouseup = function(e) {
        log('asdasdas');
        return $('body').removeClass('dragenter dragover');
      };
      document.body.ondragleave = function(e) {
        log('asdasdasasdasd');
        return $('body').removeClass('dragenter dragover');
      };
      document.body.ondragenter = function(e) {
        log('asda');
        $('body').addClass('dragenter');
        e.dataTransfer.dropEffect = 'move';
        e.preventDefault();
        return false;
      };
      return document.body.ondragover = function(e) {
        log('asdaasdasdasdasdasdasdsd');
        $('body').addClass('dragover');
        e.dataTransfer.dropEffect = 'move';
        e.preventDefault();
        return false;
      };
    };
  };
  app.render = function() {
    var editor, html, section, _i, _len, _ref;
    $('body').removeClass('dragenter dragover');
    _ref = app.sections;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      section = _ref[_i];
      html = section.value;
      if (section.type === 'image') {
        html = "<img src=\"" + section.value + "\">";
      }
      $('.sections').append("<div class=\"section\">\n    " + html + "\n</div>");
    }
    return editor = new MediumEditor('.section', {
      buttons: ['bold', 'italic', 'quote'],
      firstHeader: 'h1',
      secondHeader: 'h2',
      targetBlank: true
    });
  };
  app.saveExport = function() {
    document.body.classList.add('capturing');
    return setTimeout(function() {
      chrome.runtime.sendMessage({
        type: 'screenshot'
      });
      return setTimeout(function() {
        return document.body.classList.remove('capturing');
      }, 0);
    }, 300);
  };
  setTimeout(function() {
    return app.init();
  }, 0);
}).call(this);
