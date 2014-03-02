(function() {
  var App, Section, SectionModel, Sections, SectionsCollection, app;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  window.log = function() {
    if (this.console && this.console.log) {
      return console.log.apply(console, Array.prototype.slice.call(arguments));
    }
  };
  App = (function() {
    var onDrag;
    __extends(App, Backbone.View);
    function App() {
      this.onDrop = __bind(this.onDrop, this);
      App.__super__.constructor.apply(this, arguments);
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
      var file, files, onload, reader, _i, _len, _ref, _ref2;
      e = e.originalEvent;
      if ((e != null ? (_ref = e.dataTransfer) != null ? (_ref2 = _ref.files) != null ? _ref2.length : void 0 : void 0 : void 0) > 0) {
        onload = __bind(function(file) {
          return __bind(function(e) {
            var data, _ref3, _ref4;
            if (file.type === 'text/csv') {
              data = d3.csv.parseRows(atob(e.target.result.slice(21)));
              this.makeTable(data);
            } else if (((_ref3 = file.type) != null ? (_ref4 = _ref3.split('\/')) != null ? _ref4[0].toLowerCase() : void 0 : void 0) === 'image') {
              this.collection.add({
                type: 'image',
                value: e.target.result
              });
            }
            return this.$el.removeClass('dragenter dragover');
          }, this);
        }, this);
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
    App.prototype.addSection = function(e) {
      var sectionType;
      sectionType = $(e.target).data('type');
      if (sectionType === 'text') {
        this.collection.add({
          value: '<p>New paragraph...</p>'
        });
      }
      if (sectionType === 'header') {
        return this.collection.add({
          type: 'header',
          value: '<h1>Headline</h1>'
        });
      }
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
      var column, columns, graphHtml, html, row, rows, _i, _j, _k, _len, _len2, _len3;
      columns = data.shift();
      rows = data;
      html = "<table><thead><tr>";
      for (_i = 0, _len = columns.length; _i < _len; _i++) {
        column = columns[_i];
        html += "<th>" + column + "</th>";
      }
      html += '</tr></thead><tbody>';
      for (_j = 0, _len2 = rows.length; _j < _len2; _j++) {
        row = rows[_j];
        html += "<tr>";
        for (_k = 0, _len3 = row.length; _k < _len3; _k++) {
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
  })();
  SectionModel = (function() {
    __extends(SectionModel, Backbone.Model);
    function SectionModel() {
      SectionModel.__super__.constructor.apply(this, arguments);
    }
    SectionModel.prototype.defaults = {
      type: 'text',
      caption: '',
      value: ''
    };
    return SectionModel;
  })();
  SectionsCollection = (function() {
    __extends(SectionsCollection, Backbone.Collection);
    function SectionsCollection() {
      SectionsCollection.__super__.constructor.apply(this, arguments);
    }
    SectionsCollection.prototype.model = SectionModel;
    SectionsCollection.prototype.save = function() {
      return localStorage.presenterSections = JSON.stringify(this.toJSON());
    };
    SectionsCollection.prototype.comparator = function(model) {
      return model.get('order');
    };
    return SectionsCollection;
  })();
  Section = (function() {
    __extends(Section, Backbone.View);
    function Section() {
      Section.__super__.constructor.apply(this, arguments);
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
      caption = this.$('section-caption').html();
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
      var caption, type, value, _ref;
      _ref = this.model.toJSON(), value = _ref.value, type = _ref.type, caption = _ref.caption;
      if (type === 'image') {
        value = "<img src=\"" + value + "\">";
      }
      this.$el.attr('data-type', type).attr('data-cid', this.model.cid).html("<div class=\"section-inner\">\n    <div class=\"section-helpers\">\n        <div class=\"section-drag-handle button\"></div>\n        <div class=\"section-delete button\"></div>\n    </div>\n    <div class=\"section-content\">\n        " + value + "\n    </div>\n    <div class=\"section-caption\">\n        " + caption + "\n    </div>\n</div>");
      return this;
    };
    Section.prototype.handleDelete = function(e) {
      this.model.destroy();
      this.remove();
      return e.preventDefault();
    };
    return Section;
  })();
  Sections = (function() {
    __extends(Sections, Backbone.View);
    function Sections() {
      this.changeOrder = __bind(this.changeOrder, this);
      Sections.__super__.constructor.apply(this, arguments);
    }
    Sections.prototype.el = '.sections';
    Sections.prototype.events = {
      'sortupdate': 'changeOrder'
    };
    Sections.prototype.changeOrder = function(e) {
      this.$('.section').each(__bind(function(i, section) {
        var $section, cid, model;
        $section = $(section);
        cid = $section.attr('data-cid');
        model = this.collection.get(cid);
        if (model) {
          return model.set('order', i);
        }
      }, this));
      return this.collection.sort();
    };
    Sections.prototype.initialize = function() {
      this.listenTo(this.collection, 'add', function(section) {
        this.collection.save();
        this.addChild(section);
        return this.postRender();
      });
      return this.listenTo(this.collection, 'change remove sort', __bind(function(section) {
        return this.collection.save();
      }, this));
    };
    Sections.prototype.addChild = function(section) {
      var sectionView;
      sectionView = new Section({
        model: section
      });
      return this.$el.append(sectionView.render().el);
    };
    Sections.prototype.render = function() {
      this.collection.each(__bind(function(section) {
        return this.addChild(section);
      }, this));
      this.postRender();
      return this;
    };
    Sections.prototype.postRender = function() {
      var mediumOptions;
      mediumOptions = {
        buttons: ['bold', 'italic', 'quote'],
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
  })();
  app = {};
  app.init = function() {
    var appView, sections;
    $('body').removeClass('dragenter dragover');
    $('.page-scroll').scroll(function() {
      return $('body').scroll();
    });
    sections = [];
    if (localStorage['presenterSections']) {
      sections = JSON.parse(localStorage.presenterSections);
    }
    return appView = new App({
      collection: new SectionsCollection(sections)
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
