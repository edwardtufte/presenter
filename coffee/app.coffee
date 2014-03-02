window.log = -> console.log.apply console, Array::slice.call(arguments) if @console and @console.log

$ ->
    $('body').removeClass('dragenter dragover')
    $('.page-scroll').scroll -> $('body').scroll()

    sections = [
        value: '<p>Content...</p>'
    ]

    if localStorage['presenterSections']
        sections = JSON.parse(localStorage.presenterSections)

    appView = new app.AppView
        collection: new app.SectionsCollection(sections)
