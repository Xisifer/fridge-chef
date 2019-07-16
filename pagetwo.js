// Initial Arrays for Page Two

var ingredients = {
    proteinsArray: ['Bacon', 'Beef', 'Chicken', 'Fish', 'Pork',  'Lamb',  'Shrimp', 'Turkey'],
    grainsArray: ['Almonds', 'Brown Rice', 'Oat', 'Pasta', 'Quinoa', 'Rice', 'Walnuts', 'Wheat'],
    fruitAndVegArray: ['Lemons', 'Limes', 'Apple', 'Tomato', 'Celery', 'Leek', 'Onion', 'Potato', 'Blueberries', 'Strawberries', 'Grapes', 'Banana', 'Cabbage', 'Lettuce', 'Mushrooms', 'Avocado', 'Carrots', 'Bell Peppers', 'Broccoli', 'Cucumber', 'Jalapeño', 'Garlic'],
    dairyArray: ['Milk', 'Cheese', 'Yogurt', 'Cream', 'Butter', 'Eggs'],
    condimentsArray: ['Mustard', 'Mayo', 'Ketchup', 'Olive Oil', 'Vinegar', 'Balsamic', 'Honey', 'Soy Sauce', 'Sesame Oil']
}

var selectedIngredients = [];

var proteinClicked = 0;
var dairyClicked = 0;
var grainClicked = 0;
var condimentClicked = 0;
var fruitVegClicked = 0;
var ingredientFoodGroup;




//Global function to be placed in each food group click event
function showArray(ingredientsList) {



    //For loop that runs through the array corresponding with the food group.
    for (var i = 0; i < ingredientsList.length; i++) { 
        
        // SCOTT: This creates our checkboxes, as clickable morphing things, for each item.
        var checkbox = $("<label>");
        checkbox.attr("for", ingredientsList[i]);
        var input = $("<input>").attr("type", "checkbox");
        input.addClass("checkBox");
        input.attr("id", ingredientsList[i].replace(" ", "-"));
        input.attr("name", ingredientsList[i].replace(" ", "-"));
        //SEAN: checking to see if the ingredient is on the ingredients list, meaning it's already checked.
        var ingredientText = $("<span>");
        ingredientText.text(ingredientsList[i]); // SCOTT: Setting the text equal to each item in the ingredientsList variable. The ingredientsList variable now contains the contents of the precise ingredient array that we want (which we defined at the time that the showArray function was run)

        if (selectedIngredients.indexOf(ingredientsList[i]) !== -1) {
            console.log("hello");
            input.prop('checked', true);
            //need to check that the checkbox has already had it's state changed to "checked"
        } 
        checkbox.append(input);
        checkbox.append(ingredientText); // SCOTT: Appending the text onto the checkbox.

        // SCOTT: Getting things to display vertically! This inserts both a Line Break, and the entire Checkbox+Text object we created, onto the webpage.
        // SCOTT: This repeats for each item in the array.
        $("#ingredientSection").append("<br>");
        $("#ingredientSection").append(checkbox);



    }
}





//SCOTT: Next, we need to create on-click events for each Checkbox that is created. Ideally, we need something that checks, IF this checkbox is checked, THEN we put the contents of that checkbox onto the "Your Selected Stuff" div. Then if the checkbox is UNchecked, we REMOVE that checkbox from the "Your Selected Stuff" div.

// SCOTT: This should be a click sensor, and it should spit the text of its checkbox, into the SELECTED section of the webpage.


// $('#Milk').prop("checked")
// selected.prop("checked")


$(document).on("click", ".checkBox", function() { 
    var selectedText = $(this).attr("name");    
    // SCOTT: If the checkbox is UNchecked at the time the user clicks it, then DO_THIS_STUFF
    if ($(this).prop("checked") === true) {

        // console.log("We clicked a checkbox!");
        // console.log($(this).attr("name"));
        // SEAN: Storing the ingredient (milk/ cheese etc) into a variable
        

        console.log($(this).attr("name"));

        //SEAN: pushing it to the empty array
        selectedIngredients.push(selectedText);
        //SEAN: Console log to check
        console.log(selectedIngredients);



        selectedIngredientsRefresh();

    } else {
       console.log("box should be unchecked");

       //stores the index position of the selected text into a variable
       var indexOfIngredient = selectedIngredients.indexOf(selectedText);
       
            if (indexOfIngredient === 0) {
                //uses pop because you're only getting rid of the first element
                selectedIngredients.pop(selectedText);
            } else {
                console.log("index Of selected" + selectedText)
                var backHalf = selectedIngredients.slice(indexOfIngredient + 1);

                console.log("backhalf:" + backHalf);
                console.log("selectedIng:" + selectedIngredients);
                var frontHalf = selectedIngredients.slice(0, indexOfIngredient);
                //SEAN: Merges the array
                
                console.log("backhalf:" + backHalf);
                console.log("selectedIng:" + selectedIngredients);
                selectedIngredients = frontHalf.concat(backHalf);
            }

        selectedIngredientsRefresh();
    }
});




function selectedIngredientsRefresh() {
    //SEAN: Clear the ingredients list first
    $("#selectedIngredientsList").empty();
    //SEAN: Display array in selectedIngredients div
    $("#selectedIngredientsList").append("<ul>");
    //SEAN: Need to display vertically - currently displaying horizontally
    for (var j = 0; j < selectedIngredients.length; j++) {
        $("#selectedIngredientsList").append("<li>" + selectedIngredients[j] + "</li>");
    }
};








//Protein click function
$("#protein").on("click", function() {
    // SCOTT: When the Protein button is clicked, we trip our Clicked 
    // flag to 1, and reset all other ingredient flags to 0
    proteinClicked = 1;
    dairyClicked = 0;
    grainClicked = 0;
    condimentClicked = 0;
    fruitVegClicked = 0;

    //changes text in the h4 element
    $("#foodGroupTitle").text("Proteins");
    //Clears the form to remove any previous checkboxes
    $("#ingredientSection").empty();
    showArray(ingredients.proteinsArray); // SCOTT: Here we are running the showArray function, but inserting the EXACT ARRAY that we want to run it on. We're already precisely defining what we want showArray to apply to, at the time that we're running the function.
})

//Grains click function
$("#grains").on("click", function() {
    // SCOTT: When the Grain button is clicked, we trip our Clicked 
    // flag to 1, and reset all other ingredient flags to 0
    proteinClicked = 0;
    dairyClicked = 0;
    grainClicked = 1;
    condimentClicked = 0;
    fruitVegClicked = 0;

    //Changes text in the h4 element
    $("#foodGroupTitle").text("Grains");
    //Clears the form to remove any previous checkboxes
    $("#ingredientSection").empty();
    showArray(ingredients.grainsArray); // SCOTT: Here we are running the showArray function, but inserting the EXACT ARRAY that we want to run it on. We're already precisely defining what we want showArray to apply to, at the time that we're running the function.
})

//Fruit and Veg click function
$("#fruitAndVeg").on("click", function() {
    // SCOTT: When the FruitVeg button is clicked, we trip our Clicked 
    // flag to 1, and reset all other ingredient flags to 0
    proteinClicked = 0;
    dairyClicked = 0;
    grainClicked = 0;
    condimentClicked = 0;
    fruitVegClicked = 1;

    //changes text in the h4 element
    $("#foodGroupTitle").text("Fruit and Veg");
    //Clears the form to remove any previous checkboxes
    $("#ingredientSection").empty();
    showArray(ingredients.fruitAndVegArray); // SCOTT: Here we are running the showArray function, but inserting the EXACT ARRAY that we want to run it on. We're already precisely defining what we want showArray to apply to, at the time that we're running the function.
})

//Dairy click function
$("#dairy").on("click", function() {
    // SCOTT: When the Dairy button is clicked, we trip our Clicked 
    // flag to 1, and reset all other ingredient flags to 0
    proteinClicked = 0;
    dairyClicked = 1;
    grainClicked = 0;
    condimentClicked = 0;
    fruitVegClicked = 0;

    //changes text in the h4 element
    $("#foodGroupTitle").text("Dairy");
    //Clears the form to remove any previous checkboxes
    $("#ingredientSection").empty();
    showArray(ingredients.dairyArray); // SCOTT: Here we are running the showArray function, but inserting the EXACT ARRAY that we want to run it on. We're already precisely defining what we want showArray to apply to, at the time that we're running the function.
})

//Condiments click function
$("#condiments").on("click", function() {
    // SCOTT: When the Condiments button is clicked, we trip our Clicked 
    // flag to 1, and reset all other ingredient flags to 0
    proteinClicked = 0;
    dairyClicked = 0;
    grainClicked = 0;
    condimentClicked = 1;
    fruitVegClicked = 0;
    
    //changes text in the h4 element
    $("#foodGroupTitle").text("Condiments");
    //Clears the form to remove any previous checkboxes
    $("#ingredientSection").empty();
    showArray(ingredients.condimentsArray); // SCOTT: Here we are running the showArray function, but inserting the EXACT ARRAY that we want to run it on. We're already precisely defining what we want showArray to apply to, at the time that we're running the function.
})



$(document).on("click", ".submit", function() {
    var recipeArray = [];

    function recipeInfo() {
        var recipeInfo = $(this).attr("data-recipe");

        var queryURL = "https://api.edamam.com/search?q=" + recipeInfo + "&api_key=4e0c932fa1b0050f9146464e54d8f042" + "&api_id=f18cd003";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

        .then(function(response) {

            var results = response.data;

            $("#recipe-images-here").empty();

            for (var i = 0; i < results.length; i++) {
                console.log(results[i]);

                var imageDiv = $("<div>");
                var recipeImage = $("<img>");

                imageDiv.append(recipeImage);
                recipeArray.push(results);

                $("#recipe-images-here").append(imageDiv);
            };

        });
    };

})