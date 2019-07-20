// Initial Arrays for Page Two

var ingredients = {
    proteinsArray: ['Bacon', 'Beef', 'Chicken', 'Fish', 'Lamb', 'Pork', 'Shrimp', 'Turkey'],
    grainsArray: ['Almonds', 'Brown Rice', 'Oat', 'Pasta', 'Quinoa', 'Rice', 'Walnuts', 'Wheat'],
    fruitAndVegArray: ['Apple', 'Banana', 'Blueberries', 'Lemons', 'Tomato', 'Celery', 'Leek', 'Onion', 'Potato', 'Strawberries', 'Grapes',  'Cabbage', 'Mushrooms', 'Carrots', 'Bell Peppers', 'Broccoli', 'Cucumber'],
    dairyArray: ['Milk', 'Cheese', 'Yogurt', 'Cream', 'Butter', 'Eggs'],
    condimentsArray: ['Mustard', 'Mayo', 'Ketchup', 'Olive-Oil', 'Vinegar', 'Balsamic', 'Honey', 'Soy-Sauce', 'Sesame-Oil']
}

var selectedIngredients = [];

var proteinClicked = 0;
var dairyClicked = 0;
var grainClicked = 0;
var condimentClicked = 0;
var fruitVegClicked = 0;
var ingredientFoodGroup;

localStorage.clear();


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
    //    var indexOfIngredient = selectedIngredients.indexOf(selectedText);

    // Filter ! This goes through the array, comparing each ingredient against the selectedText.
    // if it returns TRUE, it keeps going
    // if it returns FALSE, it removes it and keeps going
       selectedIngredients = selectedIngredients.filter(ingredient => ingredient !== selectedText)

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

    // SCOTT: Empties out the image div so only one shows at a time.
    $("#foodGroupImage").empty();

    //changes text in the h4 element
    $("#foodGroupTitle").text("Proteins");

    // SCOTT: Prepends a little icon image above the ingredient category.
    $("<img/>").prependTo("#foodGroupImage").attr({
        src: 'assets/images/meaticon.png',
        alt: '',
        height: '60px'
    });
    //Clears the form to remove any previous checkboxes
    $("#ingredientSection").empty();
    
    showArray(ingredients.proteinsArray); // SCOTT: Here we are running the showArray function, but inserting the EXACT ARRAY that we want to run it on. We're already precisely defining what we want showArray to apply to, at the time that we're running the function.
});

//Grains click function
$("#grains").on("click", function() {
    // SCOTT: When the Grain button is clicked, we trip our Clicked 
    // flag to 1, and reset all other ingredient flags to 0
    proteinClicked = 0;
    dairyClicked = 0;
    grainClicked = 1;
    condimentClicked = 0;
    fruitVegClicked = 0;

    // SCOTT: Empties out the image div so only one shows at a time.
    $("#foodGroupImage").empty();

    //Changes text in the h4 element
    $("#foodGroupTitle").text("Grains");
    
    $("<img/>").prependTo("#foodGroupImage").attr({
        src: 'assets/images/grains.png',
        alt: '',
        height: '60px'
    });
    //Clears the form to remove any previous checkboxes
    $("#ingredientSection").empty();
    showArray(ingredients.grainsArray); // SCOTT: Here we are running the showArray function, but inserting the EXACT ARRAY that we want to run it on. We're already precisely defining what we want showArray to apply to, at the time that we're running the function.
});

//Fruit and Veg click function
$("#fruitAndVeg").on("click", function() {
    // SCOTT: When the FruitVeg button is clicked, we trip our Clicked 
    // flag to 1, and reset all other ingredient flags to 0
    proteinClicked = 0;
    dairyClicked = 0;
    grainClicked = 0;
    condimentClicked = 0;
    fruitVegClicked = 1;

    // SCOTT: Empties out the image div so only one shows at a time.
    $("#foodGroupImage").empty();

    //changes text in the h4 element
    $("#foodGroupTitle").text("Fruit and Veg");

    $("<img/>").prependTo("#foodGroupImage").attr({
        src: 'assets/images/fruitvegpic.png',
        alt: '',
        height: '60px'
    });
    //Clears the form to remove any previous checkboxes
    $("#ingredientSection").empty();
    showArray(ingredients.fruitAndVegArray); // SCOTT: Here we are running the showArray function, but inserting the EXACT ARRAY that we want to run it on. We're already precisely defining what we want showArray to apply to, at the time that we're running the function.
});

//Dairy click function
$("#dairy").on("click", function() {
    // SCOTT: When the Dairy button is clicked, we trip our Clicked 
    // flag to 1, and reset all other ingredient flags to 0
    proteinClicked = 0;
    dairyClicked = 1;
    grainClicked = 0;
    condimentClicked = 0;
    fruitVegClicked = 0;

    // SCOTT: Empties out the image div so only one shows at a time.
    $("#foodGroupImage").empty();

    //changes text in the h4 element
    $("#foodGroupTitle").text("Dairy");

    $("<img/>").prependTo("#foodGroupImage").attr({
        src: 'assets/images/dairyicon.png',
        alt: '',
        height: '60px'
    });
    //Clears the form to remove any previous checkboxes
    $("#ingredientSection").empty();
    showArray(ingredients.dairyArray); // SCOTT: Here we are running the showArray function, but inserting the EXACT ARRAY that we want to run it on. We're already precisely defining what we want showArray to apply to, at the time that we're running the function.
});

//Condiments click function
$("#condiments").on("click", function() {
    // SCOTT: When the Condiments button is clicked, we trip our Clicked 
    // flag to 1, and reset all other ingredient flags to 0
    proteinClicked = 0;
    dairyClicked = 0;
    grainClicked = 0;
    condimentClicked = 1;
    fruitVegClicked = 0;
    
    // SCOTT: Empties out the image div so only one shows at a time.
    $("#foodGroupImage").empty();
    
    //changes text in the h4 element
    $("#foodGroupTitle").text("Condiments");

    $("<img/>").prependTo("#foodGroupImage").attr({
        src: 'assets/images/condiments.png',
        alt: '',
        height: '60px'
    });

    //Clears the form to remove any previous checkboxes
    $("#ingredientSection").empty();
    showArray(ingredients.condimentsArray); // SCOTT: Here we are running the showArray function, but inserting the EXACT ARRAY that we want to run it on. We're already precisely defining what we want showArray to apply to, at the time that we're running the function.
});




$("#submit").on("click", function(event) {
    // Check if SelectedIngredients is empty.
    // IF EMPTY:

        if (selectedIngredients.length === 0) {
            // Toast: "Hey! Go add some ingredients!"
            M.toast({html: 'Hey! Go add some ingredients!'});
            // Stop user from navigating away.
            event.preventDefault();
        } 
        // OTHERWISE:
        else {
            // Take selectedIngredients and put it into LocalStorage
            localStorage.setItem("ingredients", selectedIngredients);
            console.log(selectedIngredients);
        }

});