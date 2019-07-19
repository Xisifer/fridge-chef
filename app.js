//grabs the local storage info and stores it into a variable
// var recipeArray = localStorage.getItem("ingredients");
//turns the local storage array into a string and lowercases it
// var jsonArray = JSON.stringify(recipeArray).toLowerCase();
// //replaces the commas with plus symbol to assist in the search
// var correctedArray = jsonArray.replace(/,/g, ', ');
// the above code that has been commented out isnt required as the documentation states that ingredients need to be separated by commas.
// console.log(jsonArray);




$(document).ready(function() {

var localIngredients = localStorage.getItem("ingredients");
var recipeArray = localIngredients.replace(/,/g, '+');
console.log(recipeArray);

    function recipeInfo() {

        var queryURL = "https://www.food2fork.com/api/search?q=" + recipeArray + "&key=41a415b9f58abaf64da0f2072369f676";
        console.log(queryURL);

        // my api key: 431843444431d180b6a297feea29edde
        // Jacob's api key: 41a415b9f58abaf64da0f2072369f676
        // Scott's api key: f4516eb74b92e1200c2a1de2939ba5da
        // KH's api key: 569763e780e654df8c9268b64763d32f

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {
            var results = JSON.parse(response);

            $("#recipe-images-here").empty();
            console.log(response);

            for (var i = 0; i < results.recipes.length; i++) {
                console.log(results.recipes[i]);

                function repeatCard() {

                // FOR NEW CARDS ----------------------
                    // creates the new card for the recipe
                    var newCard = $("<div>")

                    // Giving newCard a class
                        // 1. card = materialize card format (MUST HAVE)
                        // 2. recipe-card = for style.css
                        // 3. col s12 m6 l4 = for responsiveness with materialize 

                    newCard = newCard.attr("class","card recipe-card col s12 m6 l4");


                // FOR IMAGES -------------------------
                    // adds a div for the image
                    var cardImg = $("<div>")

                    // adds class and id to the image div
                        // 1. card-image = materialize card format (MUST HAVE)
                        // 2. image-size = for style.css to make all images' size from API equal to look organized
                        // 3. recipe-images-here = where images from API get appended
                    cardImg = cardImg.attr("class", "card-image image-size");
                    cardImg = cardImg.attr("id", "recipe-images-here");

                    // creates the image tag for the recipe image
                    var image = $("<img>");

                    //adds images from API to the image tag
                    image = image.attr("src", results.recipes[i].image_url);


                // FOR TITLES -------------------------
                    // var cardTitle = $("<span></span>");
                    // adds a div for the title
                    var cardTitle = $("<div>");

                    // adds class and id to the title div
                        // 1. card-title = materialize card format (MUST HAVE)
                        // 2. recipe-titles-here  = where recipe titles to append                  
                    cardTitle = cardTitle.attr("class", "card-title");
                    cardTitle = cardTitle.attr("id", "recipe-titles-here");
                    caradTitle = cardTitle.text(results.recipes[i].title);


                // FOR CONTENTS -------------------------
                    // adds a div for the content
                    var cardContent = $("<div>");

                    // adds class and id to the title div
                        // 1. card-content = materialize card format (MUST HAVE)   
                    cardContent = cardContent.attr("class", "card-content");
                    cardContent = cardContent.text("Recipe Title: " + results.recipes[i].title);


                // FOR LINKS -------------------------
                    // adds a div for the links
                    var link = $("<div>");
                    // adds class and id to the title div
                        // 1. card-action = materialize card format (MUST HAVE)
                        link = link.attr("class", "card-action");

                    // adds a clickable link
                    var linksrc = $("<a>Recipe Link</a>");

                    var pickThisRecipe = $("<a>This is the recipe I want!</a>");
                        pickThisRecipe = pickThisRecipe.attr("href", "");
                        // pickThisRecipe = pickThisRecipe.attr("onclick", "saveData()");
                        pickThisRecipe = pickThisRecipe.attr("class", "recipeGimme");
                        pickThisRecipe = pickThisRecipe.attr("name", results.recipes[i].title);
                    link.append(pickThisRecipe);

                    console.log("pickThisRecipe=" + pickThisRecipe);
                    console.log("Recipe Title: " + results.recipes[i].title)


                    $(".recipeGimme").on("click", function() {
                  
                        // Take the Recipe Title and put it into LocalStorage
                        localStorage.setItem("recipePicked", results.recipes[i].title);
                        console.log("I WAS CLICKED!!");
                    
                    });



                
                    
                    // link source from JSON format
                    linksrc = linksrc.attr("href", results.recipes[i].source_url);
                    





                    
                // Appends the image and the title to the image div
                    cardImg.append(image);
                    cardImg.append(cardTitle);

                // Appends the link source to the link div
                    link.append(linksrc);
                    
                // Appends the image div, the content div, and the link div to the new card div
                    newCard.append(cardImg)
                    newCard.append(cardContent);
                    newCard.append(link);

                // Appends the new card to the larger container
                    $("#cards").append(newCard);
                }
                
                repeatCard();

            };
        });
    };

    recipeInfo();

    


})  
