window.log = -> console.log.apply console, Array::slice.call(arguments) if @console and @console.log

app = {}

app.sections = [{
    type: 'text'
    value: '''
        <h1>Presenter Title</h1>
    '''
},{
    type: 'text'
    value: '''
        <p>Dolore gastropub vinyl, laboris 3 wolf moon meggings post-ironic proident. Ennui cred pour-over Wes Anderson. Selfies occaecat excepteur, disrupt four loko wayfarers pop-up +1 enim small batch XOXO laboris artisan cliche. Keffiyeh duis ex cliche meggings roof party. Ea blog direct trade, Banksy Intelligentsia disrupt tousled Blue Bottle ad Bushwick bespoke master cleanse cray sint single-origin coffee. Tattooed disrupt aliqua Vice Echo Park church-key, minim cornhole eu officia High Life. Etsy laborum Portland biodiesel, scenester eiusmod four loko.</p>
    '''
},{
    type: 'image'
    value: 'http://imagequilts.com/images/quilts/muybridge.png'
},{
    type: 'text'
    value: '''
        <p>Excepteur wayfarers aliqua Thundercats. Shabby chic wayfarers American Apparel, gluten-free aliquip 90's cornhole. Ennui selvage nihil kale chips occaecat, swag cray chambray bespoke. Cliche photo booth gentrify keffiyeh keytar tofu typewriter, Banksy sustainable pug Helvetica actually fashion axe sint. Williamsburg blog retro typewriter, slow-carb Intelligentsia hella brunch laboris you probably haven't heard of them gentrify church-key sint master cleanse. Mlkshk Austin hoodie pop-up pork belly organic. Selvage kitsch vinyl, photo booth YOLO mollit mixtape.</p>
    '''
}]

app.init = ->
    # app.setupImageListener()
    app.setupDragAndDropListener()
    app.render()

app.setupImageListener = ->
    chrome.extension.onRequest.addListener (request, sender, sendResponse) ->
        # app.addImages(request.urls)
        log request.urls

app.setupDragAndDropListener = ->
    document.body.ondrop = (e) ->
        log 'asd'
        if e.dataTransfer and e.dataTransfer.files and e.dataTransfer.files.length
            files = e.dataTransfer.files
            for file in files
                if file.type?.split('\/')?[0].toLowerCase() is 'image'
                    reader = new FileReader()
                    reader.onload = (e) ->
                        log e.target.result

                    reader.readAsDataURL(file)
        e.preventDefault()
        return false

        document.body.mouseup = (e) ->
            log 'asdasdas'
            $('body').removeClass('dragenter dragover')

        document.body.ondragleave = (e) ->
            log 'asdasdasasdasd'
            $('body').removeClass('dragenter dragover')

        document.body.ondragenter = (e) ->
            log 'asda'
            $('body').addClass('dragenter')
            e.dataTransfer.dropEffect = 'move'
            e.preventDefault()
            return false

        document.body.ondragover = (e) ->
            log 'asdaasdasdasdasdasdasdsd'
            $('body').addClass('dragover')
            e.dataTransfer.dropEffect = 'move'
            e.preventDefault()
            return false

app.render = ->
    $('body').removeClass('dragenter dragover')

    for section in app.sections
        html = section.value
        if section.type is 'image'
            html = """<img src="#{ section.value }">"""

        $('.sections').append """
            <div class="section">
                #{ html }
            </div>
        """

    editor = new MediumEditor '.section',
        buttons: ['bold', 'italic', 'quote']
        firstHeader: 'h1'
        secondHeader: 'h2'
        targetBlank: true

app.saveExport = ->
    document.body.classList.add('capturing')

    setTimeout ->
        chrome.runtime.sendMessage({type: 'screenshot'})

        setTimeout ->
            document.body.classList.remove('capturing')
        , 0
    , 300

setTimeout ->
    app.init()
, 0