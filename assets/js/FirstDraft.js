var terminateDC = ['batman', 'wonder woman', 'green lantern', 'green arrow', 'aquaman', 'cat woman'];
var characterID = '';

// displayComicsMovies(event) re-renders the HTML to display the appropriate content
function displayComicsMovies(event) {
    event.preventDefault();

    //Clears previous hero information
    $('#carousel-comic').empty();
    $('#carousel-movie').empty();
    $('#table').empty();
    $('#bio').empty();

    //Displays page elements for API Information
    function showDiv() {
        document.getElementById('magic').style.display = "block";
    }
    showDiv()

    //Hero evaluated for common invalid user inputs
    var heroName = $("#hero-input").val().trim();
    console.log(heroName)
    if (terminateDC.indexOf(heroName.toLowerCase()) === -1) {

        //Marvel Character searched in Marvel API
        var pubComicKey = "dba1c4ca26b084dd52bd9bb090fa19d8";
        var queryComicURL = "https://gateway.marvel.com/v1/public/characters?name=" + encodeURI(heroName) + "&apikey=" + pubComicKey

        //Creating an AJAX call for the specific hero
        $.ajax({
            url: queryComicURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            var results = response.data.results[0];

            //valid character name from Marvel API
            characterID = results.id;

            // Storing the release year
            var desc = results.description;

            // Creating an element to hold the release year
            var pTwo = $("<p>").text("Description: " + desc);

            // Displaying the release year
            $('#bio').append(pTwo);

            // Retrieving the URL for the image
            var thumbnail = results.thumbnail
            var extension = "." + thumbnail.extension
            var imgURL = thumbnail.path + extension;

            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);

            // Appending the image
            $('#bio').append(image);

            var queryURL2 = "https://gateway.marvel.com:443/v1/public/characters/" + characterID + "/comics?orderBy=-focDate&format=comic&formatType=comic&limit=3&apikey=dba1c4ca26b084dd52bd9bb090fa19d8";
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                results2 = response.data.results

                //making the carousel
                var $newDiv = $("<div></div>");
                var idUpd = 0;

                // Populating child div for carousel
                for (let i = 0; i < results2.length; i++) {
                    comicTitle = results2[i].title;
                    comicThumb = results2[i].thumbnail;
                    comicExt = "." + comicThumb.extension;
                    comicURL = comicThumb.path + comicExt;

                    $('<div></div>').appendTo('#carousel-comic')
                        .attr("id", "img-" + String(idUpd));
                    $("#img-" + String(idUpd)).attr("class", "carousel-item");

                    var comicIMG = $('<img>').attr('src', comicURL);

                    $("#img-" + String(idUpd)).append(comicIMG);

                    var pThree = $("<p>").text("Comic: " + comicTitle);
                    $("#img-" + String(idUpd)).append(pThree);
                    idUpd++;

                }

                //calling Materialize library
                $('#carousel-comic').carousel();

            });
        });//End of Comic Information

        //Hero Name searched in OMDB
        var movieQueryURL = "https://www.omdbapi.com/?s=" + encodeURI(heroName) + "&apikey=trilogy";

        //Creating an AJAX call for the specific hero
        $.ajax({
            url: movieQueryURL,
            method: "GET"
        }).then(function (allMovies) {

            // Create a copy of the movies array
            var newMovieArray = allMovies.Search.slice();

            // Sort the copy
            newMovieArray.sort(function (a, b) {
                a.Year = parseInt(a.Year);
                b.Year = parseInt(b.Year);
                if (a.Year > b.Year) {
                    return -1;
                } else if (b.Year > a.Year) {
                    return 1;
                } else {
                    return 0;
                }
            });

            // Sorted array          
            subMovies = newMovieArray;

            //Movie carousel div
            var $newDivMovie = $("<div></div>");

            //carousel index
            var idUpdMovie = 0;

            //Rating array
            var infoRating = [];

            //For every title related on the omdbapi
            for (var i = 0; i < subMovies.length; i++) {

                var queryURL2 = "https://www.omdbapi.com/?t=" + encodeURIComponent(String(subMovies[i].Title)) + "&apikey=trilogy";

                // Creating an AJAX call for the specific movie button being clicked
                $.ajax({
                    url: queryURL2,
                    method: "GET"
                }).then(function (eachMovieInfo) {

                    if (eachMovieInfo.Rated === "G" || eachMovieInfo.Rated === "PG" || eachMovieInfo.Rated === "PG-13") {

                        // Creating a div to hold the movie
                        var OMDBmovieDiv = $("<div class='movie'>");
                        var row$ = $('<tr>');
                        var title = eachMovieInfo.Title;

                        // Creating an element to hold the title
                        var TitleTD = $("<td>").text(title);

                        // Appending the title
                        row$.append(TitleTD);

                        // Storing the rating data
                        var rating = eachMovieInfo.Rated;

                        infoRating.push(rating)

                        // Creating an element to have the rating displayed
                        var RatingTD = $("<td>").text(rating);
                        row$.append(RatingTD);

                        // Storing the release year
                        var released = eachMovieInfo.Released;

                        // Creating an element to hold the release year
                        var ReleaseTD = $("<td>").text(released);

                        // Displaying the release year
                        row$.append(ReleaseTD);

                        // Retrieving the URL for the image
                        var OMDBimgURL = eachMovieInfo.Poster;
                        // Creating an element to hold the image
                        var OMDBimage = $("<img>").attr("src", OMDBimgURL);
                        // Appending the image
                        OMDBmovieDiv.append(OMDBimage);
                        // Putting the entire movie above the previous movies
                        $("#OMDBmovies-view").append(OMDBmovieDiv);

                        $('#table').append(row$);

                        //Making the carousel elements
                        $('<div></div>').appendTo('#carousel-movie')
                            .attr("id", "imgMov-" + String(idUpdMovie));
                        $("#imgMov-" + String(idUpdMovie)).attr("class", "carousel-item");

                        var movieIMG = $('<img>').attr('src', OMDBimgURL);

                        $("#imgMov-" + String(idUpdMovie)).append(movieIMG);

                        var pThreeMovie = $("<p>").text("Comic: " + released);
                        $("#imgMov-" + String(idUpdMovie)).append(pThreeMovie);
                        idUpdMovie++;

                    }

                    //call the carousel materialize function
                    $('#carousel-movie').carousel();

                });
            }

        });

        //clear the user input field
        $("#hero-input").val("");


        //the condition that the input was a common D.C hero
    } else {

        $("#hero-input").val("Wrong Universe!!! Try Again!!!");

        document.getElementById('magic').style.display = "none";

    }
}

// Adding a click event listener to the submission button
$(document).on("click", "#download-button", displayComicsMovies);
var input = document.getElementById("hero-input");

// Execute a function when the user uses enter as the submission
$(document).ready(function () {
    $('#hero-input').keypress(function (e) {
        if (e.keyCode == 13)
            $('#download-button').click();
    });
});