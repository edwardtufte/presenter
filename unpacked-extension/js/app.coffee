window.log = -> console.log.apply console, Array::slice.call(arguments) if @console and @console.log

app = {}

app.sections = [{
    type: 'text'
    value: '''
        <h1>Sparkline theory and practice Edward Tufte</h1>
    '''
},{
    type: 'text'
    value: '''
        <p>A sparkline is a small intense, simple, word-sized graphic with typographic resolution. Sparklines mean that graphics are no longer cartoonish special occasions with captions and boxes, but rather sparkline graphic can be everywhere a word or number can be: embedded in a sentence, table, headline, map, spreadsheet, graphic. From Edward Tufte's book <i>Beautiful Evidence</i>.</p>
        <p><i>New developments in sparklines: November 2013.</i></p>
        <p><font size="+1"><b><i>Diluting Perceptual Cluster/Streak Bias:
        Informal, Inline, Interocular Trauma Tests</i></b></font>
        </p>
        <p>
        When people look at random number tables, they sees all kinds of clusters
        and streaks (in a completely random set of data). Similarly, when people are
        asked generate a random series of bits, they generate too few long streaks
        (such as 6 identical bits a row), because their model of what is random
        greatly underestimates the amount of streakiness in truly random data.
        </p><p>Sports and election reporters are notorious for their
        streak/cluster/momentum/turning-point/trendspotting
        narrative over-reach. xkcd did this wonderful critique:</p>
    '''
},{
    type: 'image'
    value: 'http://imgs.xkcd.com/comics/sports.png'
},{
    type: 'text'
    value: '''
    <p>
To dilute streak-guessing, randomize on time over the same data,
and compare random streaks with the observed data.
Below, the top sparkline shows the season's win-loss sequence
(the little horizontal line = home games, no line = road games).
Weighting by overall record of wins/losses and home/road effects
yields ten random sparklines. Hard to see the difference between
real and random.</p><p>

The 10 random sparkline sequences can be regenerated again and
again by, oddly enough, clicking on "Regenerate random seasons."
This is looking a bit like bootstrap calculation. For the real and amazing
bootstrap, applied to data graphics and contour lines, see Persi Diaconis
and Bradley Efron, <a target="_blank" href="http://statistics.stanford.edu/~ckirby/techreports/BIO/BIO%2083.pdf">"Computer Intensive Methods in Statistics."</a>
</p><p>The test of the 10 randomized sparklines vs. the actual data is an
"Interocular Trauma Test" because the comparison hits the analyst right
between the eyes. This little randomization check-up, which can be repeated
again and again, is seen by the analyst at the very moment of making
inferences based on a statistical graphic of observed data.
</p>
    '''
},{
    type: 'text'
    value: '''
        <iframe style="border: 0; height: 800px; width: 800px" scrolling="no" src="http://adamschwartz.co/et-notebooks/sparklines-randomized/"></iframe>
    '''
},{
    type: 'text'
    value: '''
<p> <font size="+2"><b><i>Sparklines: Intense, Simple, Word-Sized Graphics</i></b></font>
</p><p>


The most common data display is a noun accompanied by a number.
For example, a medical patient's current level of glucose is reported
in a clinical record as a word and number:


    <table border="0" align="center">
      <tbody><tr>
        <td><img border="0" height="54" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-1073.gif"></td>
      </tr>
    </tbody></table>

<p>
Placed in the relevant context, a single number gains meaning. Thus
the most recent measurement of glucose should be compared with
earlier measurements for the patient. This data-line shows the path
of the last 80 readings of glucose:
</p>

    <table border="0" align="center">
      <tbody><tr>
        <td><img border="0" height="57" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-1075.gif"></td>
      </tr>
    </tbody></table>
<p>
Lacking a scale of measurement, this free-floating line is dequantified.
At least we do know the value of the line's right-most data point,
which corresponds to the most recent value of glucose, the number
recorded at far right. Both representations of the most recent reading
are tied together with a color accent:
</p>

    <table border="0" align="center">
      <tbody><tr>
        <td><img border="0" height="57" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-1077.gif"></td>
      </tr>
    </tbody></table>
<p>
Some useful context is provided by showing the <i>normal range</i> of
glucose, here as a gray band. Compared to normal limits, readings
above the band horizon are elevated, those below reduced:
</p>

    <table border="0" align="center">
      <tbody><tr>
        <td><img border="0" height="59" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-1080.gif"></td>
      </tr>
    </tbody></table>
<p>
For clinical analysis, the task is to detect quickly and assess wayward
deviations from normal limits, shown here by visual deviations outside
the gray band. Multiplying this format brings in additional data from
the medical record; a stack, which can show hundreds of variables and
thousands of measurements, allows fast effective parallel comparisons:
</p>

    <table border="0" align="center">
      <tbody><tr>
        <td><img border="0" height="104" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-1065.gif"></td>
      </tr>
    </tbody></table>
<p>
These little data lines, because of their active quality over time, are
named <i>sparklines</i>—small, high-resolution graphics usually embedded
in a full context of words, numbers, images. Sparklines are <i>datawords:</i>
data-intense, design-simple, word-sized graphics.
&nbsp;&nbsp;&nbsp;Sparklines and sparkline-like graphs can also move within complex
multivariate spaces, as in these 9-step sequential results (reading down
the columns) in merge-sorting 5 different types of input files. Four
variables and 18,000 numbers are depicted in these small multiples.
</p>

<font size="-1">Below, Robert Sedgewick, <i>Algorithms in C</i> (Reading, Massachusetts, 1998), 353.</font>
</p><p>

    <table border="0" align="left">
      <tbody><tr>
        <td><img border="0" height="362" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-1067.gif"></td>
      </tr>
    </tbody></table>
</p><p>


Sparklines have obvious applications for financial and economic data—
by tracking and comparing changes over time, by showing overall trend
along with local detail. Embedded in a data table, this sparkline depicts
an exchange rate (dollar cost of one euro) for every day for one year:


    <table border="0" align="left">
      <tbody><tr>
        <td><img border="0" height="75" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-15655.gif"></td>
      </tr>
    </tbody></table>
<p>
Colors help link the sparkline with the numbers: <font color="red">red</font> = the oldest and
newest rates in the series; <font color="blue">blue</font> = yearly low and high for daily exchange
rates. Extending this graphic table is straightforward; here, the price of
the euro versus 3 other currencies for 65 months and for 12 months:
</p>

    <table border="0" align="left">
      <tbody><tr>
        <td><img border="0" height="119" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-15656.gif"></td>
      </tr>
    </tbody></table>

<p>
Daily sparkline data can be standardized and scaled in all sorts of ways
depending on the content: by the range of the price, inflation-adjusted
price, percent change, percent change off of a market baseline. Thus
<i>multiple sparklines</i> can describe the same noun, just as multiple columns
of numbers report various measures of performance. These sparklines
reveal the details of the most recent 12 months in the context of a
65-month daily sequence (shown in the fractal-like structure below).
</p>

    <table border="0" align="left">
      <tbody><tr>
        <td><img border="0" height="122" width="950" src="http://www.edwardtufte.com/bboard/images/0001OS-15658.gif"></td>
      </tr>
    </tbody></table>

<p>
Consuming a horizontal length of only 14 letterspaces, each sparkline
in the big table above provides a look at the price and the changes in
price for every day for years, and the overall time pattern. <i>This financial
table reports 24 numbers accurate to 5 significant digits; the accompanying
sparklines show about 14,000 numbers readable from 1 to 2 significant digits.
The idea is to be approximately right rather than exactly wrong.</i>&nbsp;<font size="-1">1</font>
</p>

<p>By showing recent change in relation to many past changes, sparklines
provide a context for nuanced analysis—and, one hopes, better decisions.
Moreover, the year-long daily history reduces <i>recency bias,</i> the persistent
and widespread over-weighting of recent events in making decisions.
Tables sometimes reinforce recency bias by showing only current levels
or recent changes; sparklines improve the attention span of tables.
</p>

<p>Tables of numbers attain maximum densities of only 300 characters per
square inch or 50 characters per square centimeter. In contrast, graphical
displays have far greater resolutions; a cartographer notes "the resolving
power of the eye enables it to differentiate to 0.1 mm where provoked to
do so."&nbsp;<font size="-1">2</font> &nbsp;Distinctions at 0.1 mm mean 250 per linear inch, which implies
60,000 per square inch or 10,000 per square centimeter, which is plenty.</p>


<p><font size="-1">1&nbsp;&nbsp;On being "approximately right rather than exactly wrong,"
see John W. Tukey, "The Technical Tools of Statistics,"
<i>American Statistician,</i> 19 (1965), 23-28.
</font></p><p><font size="-1">
2&nbsp;&nbsp;D. P. Bickmore, "The Relevance of Cartography," in J. C. Davis
and M. J. McCullagh, eds., <i>Display and Analysis of Spatial Data</i>
(London, 1975), 331.</font>
</p>
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
            <div class="section" data-type="#{ section.type }">
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