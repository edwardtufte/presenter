(function() {
  window.app = {};

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  app.AppView = (function(_super) {
    var onDrag;

    __extends(AppView, _super);

    function AppView() {
      this.onDrop = __bind(this.onDrop, this);
      _ref = AppView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AppView.prototype.el = 'body';

    AppView.prototype.events = {
      'click .add-section': 'addSection',
      'drop': 'onDrop',
      'mouseup': 'onMouseUp',
      'dragleave': 'onMouseUp',
      'dragenter': 'onDrag',
      'dragover': 'onDrag'
    };

    AppView.prototype.initialize = function() {
      var sections;
      return sections = new app.Sections({
        collection: this.collection
      }).render();
    };

    AppView.prototype.onDrop = function(e) {
      var file, files, onload, reader, _i, _len, _ref1, _ref2,
        _this = this;
      e = e.originalEvent;
      if ((e != null ? (_ref1 = e.dataTransfer) != null ? (_ref2 = _ref1.files) != null ? _ref2.length : void 0 : void 0 : void 0) > 0) {
        onload = function(file) {
          return function(e) {
            var b64Data, data, _ref3, _ref4, _ref5;
            if ((_ref3 = file.type) === 'text/csv' || _ref3 === 'text/plain') {
              b64Data = e.target.result.split('base64,');
              if (b64Data.length === 2) {
                data = atob(b64Data[1]);
                if (__indexOf.call(file.name, '.csv') >= 0 || file.type === 'text/csv') {
                  data = d3.csv.parseRows(data);
                  _this.makeTable(data);
                } else {
                  _this.collection.add({
                    value: data
                  });
                }
              }
            } else if (((_ref4 = file.type) != null ? (_ref5 = _ref4.split('\/')) != null ? _ref5[0].toLowerCase() : void 0 : void 0) === 'image') {
              _this.collection.add({
                type: 'image',
                value: e.target.result
              });
            }
            return _this.$el.removeClass('dragenter dragover');
          };
        };
        files = e.dataTransfer.files;
        for (_i = 0, _len = files.length; _i < _len; _i++) {
          file = files[_i];
          reader = new FileReader();
          reader.onload = onload(file);
          reader.readAsDataURL(file);
        }
      }
      e.preventDefault();
      return false;
    };

    AppView.prototype.onMouseUp = function(e) {
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

    AppView.prototype.addSection = function() {
      return this.collection.add({
        value: '<p>Content...</p>'
      });
    };

    AppView.prototype.makeGraph = function(columns, data) {
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

    AppView.prototype.makeTable = function(data) {
      var column, columns, html, row, rows, text, _i, _j, _k, _len, _len1, _len2;
      columns = data.shift();
      rows = data;
      html = "<table><thead><tr>";
      text = false;
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
          if (!text) {
            text = isNaN(parseInt(column, 10));
          }
        }
        html += "</tr>";
      }
      html += '</tbody></table>';
      if (!text) {
        html = html + this.makeGraph(columns, rows);
      }
      return this.collection.add({
        type: 'graph',
        value: "<div class='chart'>" + html + "</div>"
      });
    };

    return AppView;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.SectionModel = (function(_super) {
    __extends(SectionModel, _super);

    function SectionModel() {
      _ref = SectionModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SectionModel.prototype.defaults = {
      type: 'text',
      caption: '',
      value: ''
    };

    return SectionModel;

  })(Backbone.Model);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.SectionsCollection = (function(_super) {
    __extends(SectionsCollection, _super);

    function SectionsCollection() {
      _ref = SectionsCollection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SectionsCollection.prototype.model = app.SectionModel;

    SectionsCollection.prototype.save = function() {
      return localStorage.presenterSections = JSON.stringify(this.toJSON());
    };

    SectionsCollection.prototype.comparator = function(model) {
      return model.get('order');
    };

    return SectionsCollection;

  })(Backbone.Collection);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.Section = (function(_super) {
    __extends(Section, _super);

    function Section() {
      _ref = Section.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Section.prototype.className = 'section';

    Section.prototype.events = {
      'focus .section-content, .section-caption': 'addFocus',
      'blur .section-content, .section-caption': 'removeFocus',
      'click .section-delete': 'handleDelete',
      'input': 'input'
    };

    Section.prototype.input = function(e) {
      var caption, value;
      value = this.$('.section-content').html();
      caption = this.$('.section-caption').html();
      this.model.set({
        value: value,
        caption: caption
      });
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
      var caption, type, value, _ref1;
      _ref1 = this.model.toJSON(), value = _ref1.value, type = _ref1.type, caption = _ref1.caption;
      if (type === 'image') {
        if (value.indexOf("<img src=") === -1) {
          value = "<img src=\"" + value + "\">";
        }
      }
      this.$el.attr('data-type', type).attr('data-cid', this.model.cid).html("<div class=\"section-inner\">\n    <div class=\"section-helpers section-helpers-left\">\n        <div class=\"section-drag-handle\"></div>\n    </div>\n    <div class=\"section-helpers section-helpers-right\">\n        <div class=\"section-delete\"></div>\n    </div>\n    <div class=\"section-content\" contenteditable=\"true\">\n        " + value + "\n    </div>\n    <div class=\"section-caption\">\n        " + caption + "\n    </div>\n</div>");
      return this;
    };

    Section.prototype.handleDelete = function(e) {
      this.model.destroy();
      this.remove();
      return e.preventDefault();
    };

    return Section;

  })(Backbone.View);

}).call(this);

(function() {
  var _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  app.Sections = (function(_super) {
    __extends(Sections, _super);

    function Sections() {
      this.changeOrder = __bind(this.changeOrder, this);
      _ref = Sections.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Sections.prototype.el = '.sections';

    Sections.prototype.events = {
      'sortupdate': 'changeOrder'
    };

    Sections.prototype.changeOrder = function(e) {
      var _this = this;
      this.$('.section').each(function(i, section) {
        var $section, cid, model;
        $section = $(section);
        cid = $section.attr('data-cid');
        model = _this.collection.get(cid);
        if (model) {
          return model.set('order', i);
        }
      });
      return this.collection.sort();
    };

    Sections.prototype.initialize = function() {
      var _this = this;
      this.listenTo(this.collection, 'add', function(section) {
        this.collection.save();
        this.addChild(section);
        return this.postRender();
      });
      return this.listenTo(this.collection, 'change remove sort', function(section) {
        return _this.collection.save();
      });
    };

    Sections.prototype.addChild = function(section) {
      var sectionView;
      sectionView = new app.Section({
        model: section
      });
      return this.$el.append(sectionView.render().el);
    };

    Sections.prototype.render = function() {
      var _this = this;
      this.collection.each(function(section) {
        return _this.addChild(section);
      });
      this.postRender();
      return this;
    };

    Sections.prototype.postRender = function() {
      var mediumOptions;
      mediumOptions = {
        buttons: ['header1', 'header2', 'bold', 'italic', 'unorderedlist'],
        firstHeader: 'h1',
        secondHeader: 'h2',
        targetBlank: true
      };
      new MediumEditor('.section[data-type="text"] .section-content, .section[data-type="header"] .section-content', $.extend({}, mediumOptions, {
        placeholder: 'Add text...'
      }));
      new MediumEditor('.section .section-caption', $.extend({}, mediumOptions, {
        placeholder: 'Add a caption...'
      }));
      $('[contenteditable]').each(function() {
        this.spellcheck = false;
        return true;
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

}).call(this);

(function() {
  window.log = function() {
    if (this.console && this.console.log) {
      return console.log.apply(console, Array.prototype.slice.call(arguments));
    }
  };

  $(function() {
    var createView, data, sections;
    $('body').removeClass('dragenter dragover');
    $('.page-scroll').scroll(function() {
      return $('body').scroll();
    });
    sections = [
      {
        value: '<p>Content...</p>'
      }
    ];
    createView = function(sections) {
      var appView;
      return appView = new app.AppView({
        collection: new app.SectionsCollection(sections)
      });
    };
    if (localStorage.mock || window.location.search.indexOf('mock') >= 0) {
      return $.getJSON('mockData.json', function(data) {
        return createView(data);
      });
    } else if (localStorage['presenterSections']) {
      data = JSON.parse(localStorage.presenterSections);
      return createView(data);
    } else {
      return createView();
    }
  });

}).call(this);