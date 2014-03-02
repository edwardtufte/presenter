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
      value: '<h1>Sparkline theory and practice Edward Tufte</h1>'
    }, {
      type: 'text',
      value: '<p>A sparkline is a small intense, simple, word-sized graphic with typographic resolution. Sparklines mean that graphics are no longer cartoonish special occasions with captions and boxes, but rather sparkline graphic can be everywhere a word or number can be: embedded in a sentence, table, headline, map, spreadsheet, graphic. From Edward Tufte\'s book <i>Beautiful Evidence</i>.</p>\n<p><i>New developments in sparklines: November 2013.</i></p>\n<p><font size="+1"><b><i>Diluting Perceptual Cluster/Streak Bias:\nInformal, Inline, Interocular Trauma Tests</i></b></font>\n</p>\n<p>\nWhen people look at random number tables, they sees all kinds of clusters\nand streaks (in a completely random set of data). Similarly, when people are\nasked generate a random series of bits, they generate too few long streaks\n(such as 6 identical bits a row), because their model of what is random\ngreatly underestimates the amount of streakiness in truly random data.\n</p><p>Sports and election reporters are notorious for their\nstreak/cluster/momentum/turning-point/trendspotting\nnarrative over-reach. xkcd did this wonderful critique:</p>'
    }, {
      type: 'image',
      value: 'http://imgs.xkcd.com/comics/sports.png'
    }, {
      type: 'text',
      value: '<p>\nTo dilute streak-guessing, randomize on time over the same data,\nand compare random streaks with the observed data.\nBelow, the top sparkline shows the season\'s win-loss sequence\n(the little horizontal line = home games, no line = road games).\nWeighting by overall record of wins/losses and home/road effects\nyields ten random sparklines. Hard to see the difference between\nreal and random.</p><p>\n\nThe 10 random sparkline sequences can be regenerated again and\nagain by, oddly enough, clicking on "Regenerate random seasons."\nThis is looking a bit like bootstrap calculation. For the real and amazing\nbootstrap, applied to data graphics and contour lines, see Persi Diaconis\nand Bradley Efron, <a target="_blank" href="http://statistics.stanford.edu/~ckirby/techreports/BIO/BIO%2083.pdf">"Computer Intensive Methods in Statistics."</a>\n</p><p>The test of the 10 randomized sparklines vs. the actual data is an\n"Interocular Trauma Test" because the comparison hits the analyst right\nbetween the eyes. This little randomization check-up, which can be repeated\nagain and again, is seen by the analyst at the very moment of making\ninferences based on a statistical graphic of observed data.\n</p>'
    }, {
      type: 'text',
      value: '<iframe style="border: 0; height: 800px; width: 800px" scrolling="no" src="http://adamschwartz.co/et-notebooks/sparklines-randomized/"></iframe>'
    }, {
      type: 'text',
      value: '<p> <font size="+2"><b><i>Sparklines: Intense, Simple, Word-Sized Graphics</i></b></font>\n</p><p>\n\n\nThe most common data display is a noun accompanied by a number.\nFor example, a medical patient\'s current level of glucose is reported\nin a clinical record as a word and number:\n\n\n    <table border="0" align="center">\n      <tbody><tr>\n        <td><img border="0" height="54" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-1073.gif"></td>\n      </tr>\n    </tbody></table>\n\n<p>\nPlaced in the relevant context, a single number gains meaning. Thus\nthe most recent measurement of glucose should be compared with\nearlier measurements for the patient. This data-line shows the path\nof the last 80 readings of glucose:\n</p>\n\n    <table border="0" align="center">\n      <tbody><tr>\n        <td><img border="0" height="57" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-1075.gif"></td>\n      </tr>\n    </tbody></table>\n<p>\nLacking a scale of measurement, this free-floating line is dequantified.\nAt least we do know the value of the line\'s right-most data point,\nwhich corresponds to the most recent value of glucose, the number\nrecorded at far right. Both representations of the most recent reading\nare tied together with a color accent:\n</p>\n\n    <table border="0" align="center">\n      <tbody><tr>\n        <td><img border="0" height="57" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-1077.gif"></td>\n      </tr>\n    </tbody></table>\n<p>\nSome useful context is provided by showing the <i>normal range</i> of\nglucose, here as a gray band. Compared to normal limits, readings\nabove the band horizon are elevated, those below reduced:\n</p>\n\n    <table border="0" align="center">\n      <tbody><tr>\n        <td><img border="0" height="59" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-1080.gif"></td>\n      </tr>\n    </tbody></table>\n<p>\nFor clinical analysis, the task is to detect quickly and assess wayward\ndeviations from normal limits, shown here by visual deviations outside\nthe gray band. Multiplying this format brings in additional data from\nthe medical record; a stack, which can show hundreds of variables and\nthousands of measurements, allows fast effective parallel comparisons:\n</p>\n\n    <table border="0" align="center">\n      <tbody><tr>\n        <td><img border="0" height="104" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-1065.gif"></td>\n      </tr>\n    </tbody></table>\n<p>\nThese little data lines, because of their active quality over time, are\nnamed <i>sparklines</i>—small, high-resolution graphics usually embedded\nin a full context of words, numbers, images. Sparklines are <i>datawords:</i>\ndata-intense, design-simple, word-sized graphics.\n&nbsp;&nbsp;&nbsp;Sparklines and sparkline-like graphs can also move within complex\nmultivariate spaces, as in these 9-step sequential results (reading down\nthe columns) in merge-sorting 5 different types of input files. Four\nvariables and 18,000 numbers are depicted in these small multiples.\n</p>\n\n<font size="-1">Below, Robert Sedgewick, <i>Algorithms in C</i> (Reading, Massachusetts, 1998), 353.</font>\n</p><p>\n\n    <table border="0" align="left">\n      <tbody><tr>\n        <td><img border="0" height="362" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-1067.gif"></td>\n      </tr>\n    </tbody></table>\n</p><p>\n\n\nSparklines have obvious applications for financial and economic data—\nby tracking and comparing changes over time, by showing overall trend\nalong with local detail. Embedded in a data table, this sparkline depicts\nan exchange rate (dollar cost of one euro) for every day for one year:\n\n\n    <table border="0" align="left">\n      <tbody><tr>\n        <td><img border="0" height="75" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-15655.gif"></td>\n      </tr>\n    </tbody></table>\n<p>\nColors help link the sparkline with the numbers: <font color="red">red</font> = the oldest and\nnewest rates in the series; <font color="blue">blue</font> = yearly low and high for daily exchange\nrates. Extending this graphic table is straightforward; here, the price of\nthe euro versus 3 other currencies for 65 months and for 12 months:\n</p>\n\n    <table border="0" align="left">\n      <tbody><tr>\n        <td><img border="0" height="119" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-15656.gif"></td>\n      </tr>\n    </tbody></table>\n\n<p>\nDaily sparkline data can be standardized and scaled in all sorts of ways\ndepending on the content: by the range of the price, inflation-adjusted\nprice, percent change, percent change off of a market baseline. Thus\n<i>multiple sparklines</i> can describe the same noun, just as multiple columns\nof numbers report various measures of performance. These sparklines\nreveal the details of the most recent 12 months in the context of a\n65-month daily sequence (shown in the fractal-like structure below).\n</p>\n\n    <table border="0" align="left">\n      <tbody><tr>\n        <td><img border="0" height="122" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-15658.gif"></td>\n      </tr>\n    </tbody></table>\n\n<p>\nConsuming a horizontal length of only 14 letterspaces, each sparkline\nin the big table above provides a look at the price and the changes in\nprice for every day for years, and the overall time pattern. <i>This financial\ntable reports 24 numbers accurate to 5 significant digits; the accompanying\nsparklines show about 14,000 numbers readable from 1 to 2 significant digits.\nThe idea is to be approximately right rather than exactly wrong.</i>&nbsp;<font size="-1">1</font>\n</p>\n\n<p>By showing recent change in relation to many past changes, sparklines\nprovide a context for nuanced analysis—and, one hopes, better decisions.\nMoreover, the year-long daily history reduces <i>recency bias,</i> the persistent\nand widespread over-weighting of recent events in making decisions.\nTables sometimes reinforce recency bias by showing only current levels\nor recent changes; sparklines improve the attention span of tables.\n</p>\n\n<p>Tables of numbers attain maximum densities of only 300 characters per\nsquare inch or 50 characters per square centimeter. In contrast, graphical\ndisplays have far greater resolutions; a cartographer notes "the resolving\npower of the eye enables it to differentiate to 0.1 mm where provoked to\ndo so."&nbsp;<font size="-1">2</font> &nbsp;Distinctions at 0.1 mm mean 250 per linear inch, which implies\n60,000 per square inch or 10,000 per square centimeter, which is plenty.</p>\n\n\n<p><font size="-1">1&nbsp;&nbsp;On being "approximately right rather than exactly wrong,"\nsee John W. Tukey, "The Technical Tools of Statistics,"\n<i>American Statistician,</i> 19 (1965), 23-28.\n</font></p><p><font size="-1">\n2&nbsp;&nbsp;D. P. Bickmore, "The Relevance of Cartography," in J. C. Davis\nand M. J. McCullagh, eds., <i>Display and Analysis of Spatial Data</i>\n(London, 1975), 331.</font>\n</p>'
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
      $('.sections').append("<div class=\"section\" data-type=\"" + section.type + "\">\n    " + html + "\n</div>");
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
