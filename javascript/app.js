//Establish variables

var topics = ["spiderman", "wolverine","hulk","thor","captain america","venom","iron man","doctor strange",
                "thanos","ultron","loki","doctor doom"];

//Create a function that will render buttons for all strings in your array
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

//function to display gifs

function displayCharacterGif() {
    $("#gifsView").empty();
    var character = $(this).attr("data-name");
    var queryUrl = "https://api.giphy.com/v1/gifs/search?api_key=9PvFmXs9RQRBa1JEiwAibZTSYDSCmhZD&q=" + character + "&limit=10";

    $.ajax({ url: queryUrl, method: "GET" }).then(function(response) {
        console.log(response);

        for (i = 0; i < response.data.length; i++){

        var gifDiv = $("<div class='gifStore'>")

        var gifs = response.data[i].images.fixed_height_still.url;
        var animateGifs = response.data[i].images.fixed_height_downsampled.url;
        var displayGifs = $("<img>").attr("src", gifs);
        displayGifs.attr("still-image", gifs);
        displayGifs.attr("looping-image", animateGifs);
        displayGifs.attr("state", "still");
        gifDiv.append(displayGifs);

        var rating = response.data[i].rating;
        var displayRating = $("<p>").text("Rating: " + rating);
        gifDiv.append(displayRating);

        $("#gifsView").prepend(gifDiv);

        }

    });
};

// Add button for new character upon click

$("#add-character").on("click", function(event) {
        event.preventDefault();
        var addChar = $("#character-input").val().trim();
        topics.push(addChar);

        makeButtons();
      

});

$(document).on("click", ".character", displayCharacterGif);

$(document).on("click", "img", function(){
    var state = $(this).attr("state");

    if(state === "still"){
         var animatedUrl = $(this).attr("looping-image");
        $(this).attr("src", animatedUrl);
        $(this).attr("state", "animate");
    } else {
        var stillUrl = $(this).attr("still-image");
        $(this).attr("src", stillUrl);
        $(this).attr("state", "still");
    }
   
});