// var movies = ['thor', 'iron man', 'captain america'];
var characterID = '';
// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo(event) {
    event.preventDefault();
    $('#carousel-comic').empty();
    $('#carousel-movie').empty();
    $('#table').empty();
    $('#bio').empty();

    function showDiv() {
        document.getElementById('magic').style.display = "block";
    }
    showDiv()
    var movie = $("#movie-input").val().trim(); //trim()
    console.log(movie)


    var pubKey = "dba1c4ca26b084dd52bd9bb090fa19d8";
    var queryURL = "https://gateway.marvel.com/v1/public/characters?name=" + encodeURI(movie) + "&apikey=" + pubKey
        // Creating an AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var results = response.data.results[0]
            // Creating a div to hold the movie
        var movieDiv = $("<div class='movie'>");
        characterID = results.id
            // Storing the rating data
        var name = results.name;

        // Creating an element to have the rating displayed
        var pOne = $("<p>").text("Name: " + name);

        // Displaying the rating
        movieDiv.append(pOne);

        // Storing the release year
        var desc = results.description;

        // Creating an element to hold the release year
        var pTwo = $("<p>").text("Description: " + desc);

        // Displaying the release year
        $('#bio').append(pTwo);

        // Appending the plot


        // Retrieving the URL for the image
        var thumbnail = results.thumbnail
        var extension = "." + thumbnail.extension
        var imgURL = thumbnail.path + extension;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Appending the image
        $('#bio').append(image);

        // Putting the entire movie above the previous movies
        $("#movies-view").prepend(movieDiv);

        var queryURL2 = "https://gateway.marvel.com:443/v1/public/characters/" + characterID + "/comics?orderBy=-focDate&format=comic&formatType=comic&limit=3&apikey=dba1c4ca26b084dd52bd9bb090fa19d8";
        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            results2 = response.data.results

            var $newDiv = $("<div></div>");
            var idUpd = 0;

            // comicIMG = $('<img>').attr('src', "assets/images/portrait_incredible.jpg");

            // Makes child div
            for (let i = 0; i < results2.length; i++) {
                comicTitle = results2[i].title;
                comicThumb = results2[i].thumbnail;
                comicExt = "." + comicThumb.extension;
                comicURL = comicThumb.path + comicExt;

                //child div  id/class
                $('<div></div>').appendTo('#carousel-comic')
                    .attr("id", "img-" + String(idUpd));
                $("#img-" + String(idUpd)).attr("class", "carousel-item");

                var comicIMG = $('<img>').attr('src', comicURL);

                $("#img-" + String(idUpd)).append(comicIMG);

                var pThree = $("<p>").text("Comic: " + comicTitle);
                $("#img-" + String(idUpd)).append(pThree);
                idUpd++;

                //
            }
            $('#carousel-comic').carousel();

            // for (let i = 0; i < results2.length; i++) {


            //     comicTitle = results2[i].title;
            //     comicThumb = results2[i].thumbnail;
            //     comicExt = "." + comicThumb.extension;
            //     comicURL = comicThumb.path + comicExt;


            //     comicIMG = $('<img>').attr('src', comicURL);
            //     $("#img-" + String(i)).append(comicIMG);
            //     // var pThree = $("<p>").text("Comic: " + comicTitle);
            //     // $("#img-" + String(i)).append(pThree);

            // }



        });
    });

    var movieQueryURL = "https://www.omdbapi.com/?s=" + encodeURI(movie) + "&apikey=trilogy";


    $.ajax({
        url: movieQueryURL,
        method: "GET"
    }).then(function(respon) {
        // debugger
        console.log(respon);
        //               // Create a copy of the movies array
        var newMovieArray = respon.Search.slice();
        //               // Sort the copy
        newMovieArray.sort(function(a, b) {
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

        // console.log(newMovieArray[0])
        subMovies = newMovieArray;

        var $newDivMovie = $("<div></div>");
        var idUpdMovie = 0;
        var infoTitle = [];
        var infoRelease = [];
        var infoRating = [];

        for (var i = 0; i < subMovies.length; i++) {

            var queryURL2 = "https://www.omdbapi.com/?t=" + encodeURIComponent(String(subMovies[i].Title)) + "&apikey=trilogy";

            //                   // Creating an AJAX call for the specific movie button being clicked
            $.ajax({
                url: queryURL2,
                method: "GET"
            }).then(function(respon2) {

                if (respon2.Rated === "G" || respon2.Rated === "PG" || respon2.Rated === "PG-13") {
                    console.log(respon2)




                    // comicIMG = $('<img>').attr('src', "assets/images/portrait_incredible.jpg");

                    // Makes child div
                    // for (let i = 0; i < respon2.length; i++) {



                    // }








                    //                       // Creating a div to hold the movie
                    var OMDBmovieDiv = $("<div class='movie'>");
                    var row$ = $('<tr>');
                    var title = respon2.Title;

                    //                       // Creating an element to hold the plot
                    var TitleTD = $("<td>").text(title);

                    //                       // Appending the plot
                    row$.append(TitleTD);

                    //                       // Storing the rating data
                    var rating = respon2.Rated;

                    infoRating.push(rating)

                    //                       // Creating an element to have the rating displayed
                    var RatingTD = $("<td>").text(rating);
                    row$.append(RatingTD);
                    //                       // Displaying the rating




                    //                       // Storing the release year
                    var released = respon2.Released;

                    //                       // Creating an element to hold the release year
                    var ReleaseTD = $("<td>").text(released);

                    //                       // Displaying the release year
                    row$.append(ReleaseTD);

                    //                       // Storing the plot


                    //                       // Retrieving the URL for the image
                    var OMDBimgURL = respon2.Poster;
                    //                       console.log(imgURL)
                    //                       // Creating an element to hold the image
                    var OMDBimage = $("<img>").attr("src", OMDBimgURL);

                    //                       // Appending the image
                    OMDBmovieDiv.append(OMDBimage);

                    //                       // Putting the entire movie above the previous movies
                    $("#OMDBmovies-view").append(OMDBmovieDiv);


                    $('#table').append(row$);


                    //child div  id/class
                    $('<div></div>').appendTo('#carousel-movie')
                        .attr("id", "imgMov-" + String(idUpdMovie));
                    $("#imgMov-" + String(idUpdMovie)).attr("class", "carousel-item");

                    var movieIMG = $('<img>').attr('src', OMDBimgURL);

                    $("#imgMov-" + String(idUpdMovie)).append(movieIMG);

                    var pThreeMovie = $("<p>").text("Comic: " + released);
                    $("#imgMov-" + String(idUpdMovie)).append(pThreeMovie);
                    idUpdMovie++;


                }
                console.log(infoRating);

                // if (subMovies[i] == subMovies[(subMovies.length-1)]){
                $('#carousel-movie').carousel();
                // }
            });
        }



    });




    $("#movie-input").val("");

}

// Adding a click event listener to all elements with a class of "movie-btn"
$(document).on("click", "#download-button", displayMovieInfo);
var input = document.getElementById("movie-input");

// // Execute a function when the user releases a key on the keyboard
input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("download-button").click();
    }
});