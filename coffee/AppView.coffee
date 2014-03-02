class app.AppView extends Backbone.View
    el: 'body'
    events:
        'click .add-section': 'addSection'
        'drop': 'onDrop'
        'mouseup': 'onMouseUp'
        'dragleave': 'onMouseUp'
        'dragenter': 'onDrag'
        'dragover': 'onDrag'

    initialize: ->
        sections = new app.Sections(
            collection: @collection
        ).render()

    onDrop: (e) =>
        e = e.originalEvent
        if e?.dataTransfer?.files?.length > 0
            onload = (file) =>
                return (e) =>
                    if file.type in ['text/csv', 'text/plain']
                        b64Data = e.target.result.split('base64,')
                        if b64Data.length is 2
                            data = atob(b64Data[1])
                            if '.csv' in file.name or file.type is 'text/csv'
                                data = d3.csv.parseRows(data)
                                @makeTable(data)
                            else
                                @collection.add
                                    value: data


                    else if file.type?.split('\/')?[0].toLowerCase() is 'image'
                        @collection.add
                            type: 'image'
                            value: e.target.result

                    @$el.removeClass('dragenter dragover')

            files = e.dataTransfer.files

            for file in files
                reader = new FileReader()
                reader.onload = onload(file)
                reader.readAsDataURL(file)

        e.preventDefault()
        return false

    onMouseUp: (e) ->
        @$el.removeClass('dragenter dragover')

    onDrag = (e) ->
        e = e.originalEvent
        $('body').addClass('dragenter')
        e.dataTransfer.dropEffect = 'move'
        e.preventDefault()
        return false

    document.body.ondragover = (e) ->
        $('body').addClass('dragover')
        e.dataTransfer.dropEffect = 'move'
        e.preventDefault()
        return false

    addSection: ->
        @collection.add
            value: '<p>Content...</p>'

    makeGraph: (columns, data) ->
        margin =
            top: 20
            right: 20
            bottom: 30
            left: 50

        width = 600 - margin.left - margin.right
        height = 300 - margin.top - margin.bottom

        yDomain = d3.extent(data, (d) -> d[1])
        if yDomain[0] < 0
            yDomain[1] = 0
        else
            yDomain[0] = 0

        x = d3.scale.linear()
            .domain(d3.extent(data, (d) -> return d[0] ))
            .range([0, width])

        y = d3.scale.linear()
            .domain(yDomain)
            .range([height, 0])

        xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        line = d3.svg.line()
            .x( (d) -> return x(d[0]) )
            .y( (d) -> return y(d[1]) )

        svg = d3.select(document.createElement("svg"))
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(#{margin.left},#{margin.top})")

        svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0,#{height})")
          .call(xAxis)

        svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)

        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text(columns[1]);

        svg.append("path")
          .datum(data)
          .attr("class", "line")
          .attr("d", line)

        return "<svg width=#{width + margin.left + margin.right} height=#{height + margin.top + margin.bottom}>#{svg.html()}</svg>"

    makeTable: (data) ->
        columns = data.shift()
        rows = data
        html = "<table><thead><tr>"

        for column in columns
            html += "<th>" + column + "</th>"

        html += '</tr></thead><tbody>'

        for row in rows
            html += "<tr>";

            for column in row
                html += "<td>" + column + "</td>"

            html += "</tr>"

        html += '</tbody></table>'

        graphHtml = @makeGraph(columns, rows)

        @collection.add
            type: 'graph'
            value: "<div class='chart'>#{html + graphHtml}</div>"
