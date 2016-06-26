
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // YOUR CODE GOES HERE!
    var street = $('#street').val();
    var city = $('#city').val();

    // Update Heading with Street and City names
    $greeting.text('So you want to live at ' + street + ', ' + city+ '?');

    // Use google maps url to add a background image using street and city names
    var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + street + ', ' + city;
    $body.append('<img class="bgimg" src=' + streetViewURL + '>');

    // Store NYTimes API URL
    var nytimesURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + city + "&sort=newest&api-key="+ 'd4dd219e58084ac18f67ab56390a83fb';

    // Use .getJson() to search through NYTimes API and display link, headline and snippet of city
    $.getJSON(nytimesURL, function(data){
        $nytHeaderElem.text("New York Times articles about " + city);

        var articles = data.response.docs;
        articles.forEach(function(article){
            var link = article.web_url;
            var snippet = article.snippet;
            var headline = article.headline.main;

            $nytElem.append(
                "<li class='article'>" +
                "<a target='_blank' href='" + link + "'>" + headline + "</a>" +
                "<p>" + snippet + "</p>" + "</li>"
                )
        });

    }).fail(function(){
            // Set an error handler
            $nytHeaderElem.text("New York Times Could Not Be Loaded");
    });

    // Store Wikipedia API url
    var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' +
                    city + ' &format=json&callback=wikiCallback';

    // Set an error handler if wikipedia does not load in less than 8 seconds
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("Failed to get wikipedia resources");
    }, 8000);

    // Use ajax to search through Wikipedia API (using jsonP) and display links corresponding to city
    $.ajax({
        url: wikiURL,
        dataType: "jsonP"
    }).done(function(response) {
        var articleList = response[1]
        articleList.forEach(function(articleStr){
            var wikiLink = "http:/en.wikipedia.org/wiki/" + articleStr;
            $wikiElem.append("<li><a target='_blank' href='" + wikiLink + "'>" + articleStr + "</li>")
        });
        // if Wikipedia API works correctly turn off the timer for the error handler
        clearTimeout(wikiRequestTimeout);
    });

    return false;
};

$('#form-container').submit(loadData);
