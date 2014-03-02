(function() {
  var App, Section, Sections, app, _sections,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  window.log = function() {
    if (this.console && this.console.log) {
      return console.log.apply(console, Array.prototype.slice.call(arguments));
    }
  };

  App = (function(_super) {
    var onDrag;

    __extends(App, _super);

    function App() {
      this.onDrop = __bind(this.onDrop, this);
      return App.__super__.constructor.apply(this, arguments);
    }

    App.prototype.el = 'body';

    App.prototype.events = {
      'click .add-section': 'addSection',
      'drop': 'onDrop',
      'mouseup': 'onMouseUp',
      'dragleave': 'onMouseUp',
      'dragenter': 'onDrag',
      'dragover': 'onDrag'
    };

    App.prototype.initialize = function() {
      var sections;
      return sections = new Sections({
        collection: this.collection
      }).render();
    };

    App.prototype.onDrop = function(e) {
      var file, files, onload, reader, _i, _len, _ref, _ref1;
      e = e.originalEvent;
      if ((e != null ? (_ref = e.dataTransfer) != null ? (_ref1 = _ref.files) != null ? _ref1.length : void 0 : void 0 : void 0) > 0) {
        onload = (function(_this) {
          return function(e) {
            var data, _ref2, _ref3;
            if (file.type === 'text/csv') {
              data = d3.csv.parseRows(atob(e.target.result.slice(21)));
              _this.makeTable(data);
            } else if (((_ref2 = file.type) != null ? (_ref3 = _ref2.split('\/')) != null ? _ref3[0].toLowerCase() : void 0 : void 0) === 'image') {
              _this.collection.add({
                type: 'image',
                value: e.target.result
              });
            }
            return _this.$el.removeClass('dragenter dragover');
          };
        })(this);
        files = e.dataTransfer.files;
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          reader = new FileReader();
          reader.onload = onload;
          reader.readAsDataURL(file);
        }
      }
      e.preventDefault();
      return false;
    };

    App.prototype.onMouseUp = function(e) {
      return this.$el.removeClass('dragenter dragover');
    };

    onDrag = function(e) {
      e = e.originalEvent;
      $('body').addClass('dragenter');
      e.dataTransfer.dropEffect = 'move';
      e.preventDefault();
      return false;
    };

    document.body.ondragover = function(e) {
      $('body').addClass('dragover');
      e.dataTransfer.dropEffect = 'move';
      e.preventDefault();
      return false;
    };

    App.prototype.addSection = function() {
      return this.collection.add({
        type: 'text',
        value: '<p>New paragraph...</p>'
      });
    };

    App.prototype.makeGraph = function(columns, data) {
      var height, line, margin, svg, width, x, xAxis, y, yAxis, yDomain;
      margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
      };
      width = 600 - margin.left - margin.right;
      height = 300 - margin.top - margin.bottom;
      yDomain = d3.extent(data, function(d) {
        return d[1];
      });
      if (yDomain[0] < 0) {
        yDomain[1] = 0;
      } else {
        yDomain[0] = 0;
      }
      x = d3.scale.linear().domain(d3.extent(data, function(d) {
        return d[0];
      })).range([0, width]);
      y = d3.scale.linear().domain(yDomain).range([height, 0]);
      xAxis = d3.svg.axis().scale(x).orient("bottom");
      yAxis = d3.svg.axis().scale(y).orient("left");
      line = d3.svg.line().x(function(d) {
        return x(d[0]);
      }).y(function(d) {
        return y(d[1]);
      });
      svg = d3.select(document.createElement("svg")).attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
      svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr("transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style("text-anchor", "end").text(columns[1]);
      svg.append("path").datum(data).attr("class", "line").attr("d", line);
      return "<svg width=" + (width + margin.left + margin.right) + " height=" + (height + margin.top + margin.bottom) + ">" + (svg.html()) + "</svg>";
    };

    App.prototype.makeTable = function(data) {
      var column, columns, graphHtml, html, row, rows, _i, _j, _k, _len, _len1, _len2;
      columns = data.shift();
      rows = data;
      html = "<table><thead><tr>";
      for (_i = 0, _len = columns.length; _i < _len; _i++) {
        column = columns[_i];
        html += "<th>" + column + "</th>";
      }
      html += '</tr></thead><tbody>';
      for (_j = 0, _len1 = rows.length; _j < _len1; _j++) {
        row = rows[_j];
        html += "<tr>";
        for (_k = 0, _len2 = row.length; _k < _len2; _k++) {
          column = row[_k];
          html += "<td>" + column + "</td>";
        }
        html += "</tr>";
      }
      html += '</tbody></table>';
      graphHtml = this.makeGraph(columns, rows);
      return this.collection.add({
        type: 'graph',
        value: "<div class='chart'>" + (html + graphHtml) + "</div>"
      });
    };

    return App;

  })(Backbone.View);

  Section = (function(_super) {
    __extends(Section, _super);

    function Section() {
      return Section.__super__.constructor.apply(this, arguments);
    }

    Section.prototype.className = 'section';

    Section.prototype.events = {
      'focus .section-content': 'addFocus',
      'focus .section-caption': 'addFocus',
      'blur .section-content': 'removeFocus',
      'blur .section-caption': 'removeFocus',
      'click .section-delete': 'handleDelete'
    };

    Section.prototype.addFocus = function() {
      $('body').addClass('section-focused');
      return this.$el.addClass('section-focused');
    };

    Section.prototype.removeFocus = function() {
      $('body').removeClass('section-focused');
      return this.$el.removeClass('section-focused');
    };

    Section.prototype.render = function() {
      var caption, type, value, _ref;
      _ref = this.model.toJSON(), value = _ref.value, type = _ref.type, caption = _ref.caption;
      if (type === 'image') {
        value = "<img src=\"" + value + "\">";
      }
      this.$el.attr('data-type', type).html("<div class=\"section-helpers\">\n    <div class=\"section-drag-handle\"></div>\n    <div class=\"section-delete\"></div>\n</div>\n<div class=\"section-content\">\n    " + value + "\n</div>\n" + (caption ? "<div class='section-caption'>" + caption + "</div>" : ''));
      return this;
    };

    Section.prototype.handleDelete = function(e) {
      this.model.destroy();
      this.remove();
      return e.preventDefault();
    };

    return Section;

  })(Backbone.View);

  Sections = (function(_super) {
    __extends(Sections, _super);

    function Sections() {
      return Sections.__super__.constructor.apply(this, arguments);
    }

    Sections.prototype.el = '.sections';

    Sections.prototype.initialize = function() {
      return this.listenTo(this.collection, 'add', function(section) {
        this.addChild(section);
        return this.postRender();
      });
    };

    Sections.prototype.addChild = function(section) {
      var sectionView;
      sectionView = new Section({
        model: section
      });
      return this.$el.append(sectionView.render().el);
    };

    Sections.prototype.render = function() {
      this.collection.each((function(_this) {
        return function(section) {
          return _this.addChild(section);
        };
      })(this));
      this.postRender();
      return this;
    };

    Sections.prototype.postRender = function() {
      new MediumEditor('.section[data-type="text"] .section-content, .section[data-type="header"] .section-content, .section .section-caption', {
        buttons: ['bold', 'italic', 'quote'],
        firstHeader: 'h1',
        secondHeader: 'h2',
        targetBlank: true
      });
      $('.sections').sortable({
        handle: '.section-drag-handle',
        axis: 'y',
        start: function(e, ui) {
          return ui.placeholder.height(ui.helper.height());
        }
      });
      return this;
    };

    return Sections;

  })(Backbone.View);

  _sections = [
    {
      type: 'header',
      value: '<h1>Sparkline theory and practice Edward Tufte</h1>'
    }, {
      type: 'text',
      value: '<p>A sparkline is a small intense, simple, word-sized graphic with typographic resolution. Sparklines mean that graphics are no longer cartoonish special occasions with captions and boxes, but rather sparkline graphic can be everywhere a word or number can be: embedded in a sentence, table, headline, map, spreadsheet, graphic. From Edward Tufte\'s book <i>Beautiful Evidence</i>.</p>\n<p><i>New developments in sparklines: November 2013.</i></p>\n<p><font size="+1"><b><i>Diluting Perceptual Cluster/Streak Bias:\nInformal, Inline, Interocular Trauma Tests</i></b></font>\n</p>'
    }, {
      type: 'text',
      value: '<p>When people look at random number tables, they sees all kinds of clusters\nand streaks (in a completely random set of data). Similarly, when people are\nasked generate a random series of bits, they generate too few long streaks\n(such as 6 identical bits a row), because their model of what is random\ngreatly underestimates the amount of streakiness in truly random data.\n</p><p>Sports and election reporters are notorious for their\nstreak/cluster/momentum/turning-point/trendspotting\nnarrative over-reach. xkcd did this wonderful critique:</p>',
      caption: '<p>\n    To dilute streak-guessing, randomize on time over the same data,\n    and compare random streaks with the observed data.\n    Below, the top sparkline shows the season\'s win-loss sequence\n    (the little horizontal line = home games, no line = road games).\n    Weighting by overall record of wins/losses and home/road effects\n    yields ten random sparklines. Hard to see the difference between\n    real and random.\n    </p>'
    }, {
      type: 'image',
      value: 'http://imgs.xkcd.com/comics/sports.png'
    }, {
      type: 'text',
      value: '<p>\nTo dilute streak-guessing, randomize on time over the same data,\nand compare random streaks with the observed data.\nBelow, the top sparkline shows the season\'s win-loss sequence\n(the little horizontal line = home games, no line = road games).\nWeighting by overall record of wins/losses and home/road effects\nyields ten random sparklines. Hard to see the difference between\nreal and random.</p>\n\n<p>\nThe 10 random sparkline sequences can be regenerated again and\nagain by, oddly enough, clicking on "Regenerate random seasons."\nThis is looking a bit like bootstrap calculation. For the real and amazing\nbootstrap, applied to data graphics and contour lines, see Persi Diaconis\nand Bradley Efron, <a target="_blank" href="http://statistics.stanford.edu/~ckirby/techreports/BIO/BIO%2083.pdf">"Computer Intensive Methods in Statistics."</a>\n</p><p>The test of the 10 randomized sparklines vs. the actual data is an\n"Interocular Trauma Test" because the comparison hits the analyst right\nbetween the eyes. This little randomization check-up, which can be repeated\nagain and again, is seen by the analyst at the very moment of making\ninferences based on a statistical graphic of observed data.\n</p>'
    }, {
      type: 'text',
      value: '&nbsp;&shy;\n    <iframe style="border: 0; height: 800px; width: 800px" scrolling="no" src="http://adamschwartz.co/et-notebooks/sparklines-randomized/"></iframe>'
    }, {
      type: 'text',
      value: '<p>\nConsuming a horizontal length of only 14 letterspaces, each sparkline\nin the big table above provides a look at the price and the changes in\nprice for every day for years, and the overall time pattern. <i>This financial\ntable reports 24 numbers accurate to 5 significant digits; the accompanying\nsparklines show about 14,000 numbers readable from 1 to 2 significant digits.\nThe idea is to be approximately right rather than exactly wrong.</i>&nbsp;<font size="-1">1</font>\n</p>\n\n<p>By showing recent change in relation to many past changes, sparklines\nprovide a context for nuanced analysis—and, one hopes, better decisions.\nMoreover, the year-long daily history reduces <i>recency bias,</i> the persistent\nand widespread over-weighting of recent events in making decisions.\nTables sometimes reinforce recency bias by showing only current levels\nor recent changes; sparklines improve the attention span of tables.\n</p>\n\n<p>Tables of numbers attain maximum densities of only 300 characters per\nsquare inch or 50 characters per square centimeter. In contrast, graphical\ndisplays have far greater resolutions; a cartographer notes "the resolving\npower of the eye enables it to differentiate to 0.1 mm where provoked to\ndo so."&nbsp;<font size="-1">2</font> &nbsp;Distinctions at 0.1 mm mean 250 per linear inch, which implies\n60,000 per square inch or 10,000 per square centimeter, which is plenty.</p>'
    }
  ];

  app = {};

  app.init = function() {
    var appView;
    $('body').removeClass('dragenter dragover');
    $('.page-scroll').scroll(function() {
      return $('body').scroll();
    });
    return appView = new App({
      collection: new Backbone.Collection(_sections)
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

  $(function() {
    return app.init();
  });

}).call(this);
