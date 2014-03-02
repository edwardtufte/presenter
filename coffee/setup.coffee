window.app = {}

app.loadMockData = ->
    localStorage.presenterSections = JSON.stringify(window.mockData)
    location.reload()

setTimeout ->
    $('.load-mock-data').click -> app.loadMockData()