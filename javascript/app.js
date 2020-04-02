//Establish variables

var topics = ["spiderman", "wolverine","hulk","thor","captain america","venom","iron man","doctor strange",
                "thanos","ultron","loki","doctor doom"];


function makeButtons(){
    $("#buttons-view").empty();
        
    for (var i = 0; i < topics.length; i++){
        var newButton = $("<button>");
        newButton.addClass("character");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#buttons-view").append(newButton);

    }  
}

makeButtons();

function displayCharacterGif() {
    var character = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=9PvFmXs9RQRBa1JEiwAibZTSYDSCmhZD&q=" + character + "&limit=10";

    $.ajax({ url: queryUrl, method: "GET" }).then(function(response) {
        console.log(response);

        var gifDiv = $("<div class='gifStore'>")

        var rating = response.data[0].rating;
        var displayRating = $("<p>").text("Rating: " + rating);
        gifDiv.append(displayRating);

        var gifs = response.data[0].images.downsized.url;
        var displayGifs = $("<img>").attr("src", gifs);
        gifDiv.append(displayGifs);

        $("#gifsView").prepend(gifDiv);

        console.log(gifs);
    });
}

$(document).on("click", ".character", displayCharacterGif);
