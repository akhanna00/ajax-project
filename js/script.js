
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var street = $('#street').val();
    var city = $('#city').val();

    $greeting.text('So you want to live at ' + street + ', ' + city+ '?');

    var streetViewURL = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + street + ', ' + city;
    $body.append('<img class="bgimg" src=' + streetViewURL + '>');

    var nytimesURL = "http://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + city + "&sort=newest&api-key="+ 'd4dd219e58084ac18f67ab56390a83fb';

    $.getJSON(nytimesURL, function(data){
        $nytHeaderElem.text("New York Times articles about " + city);

        var articles = data.response.docs;
        articles.forEach(function(article){
            console.log(link);
            var link = article.web_url;
            var snippet = article.snippet;
            var headline = article.headline.main;

            $nytElem.append(
                "<li class='article'>" +
                "<a href='" + link + "'>" + headline + "</a>" +
                "<p>" + snippet + "</p>" + "</li>"
                )
        });

    }).fail(function(){
            $nytHeaderElem.text("New York Times Could Not Be Loaded")
    });

    return false;
};

$('#form-container').submit(loadData);
