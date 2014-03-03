window.log = -> console.log.apply console, Array::slice.call(arguments) if @console and @console.log

$ ->
    $('body').removeClass('dragenter dragover')
    $('.page-scroll').scroll -> $('body').scroll()

    sections = [
        value: '<p>Content...</p>'
    ]

    createView = (sections) ->
      appView = new app.AppView
          collection: new app.SectionsCollection(sections)

    if localStorage.mock or window.location.search.indexOf('mock') >= 0
      $.getJSON 'mockData.json', (data) ->
        createView(data)

    else if localStorage['presenterSections']
        data = JSON.parse(localStorage.presenterSections)
        createView(data)
    else
      createView()
