var text = '';
var mealsData; // Global variable to store meals data


function searchMeal() {
    text = document.getElementById('search_input').value;
    document.getElementById('search_input').value = '';
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`)
        .then(res => res.json())
        .then(data => {
            mealsData = data.meals; // Store meals data globally
            display_meal(mealsData);
        });
}

function display_meal(meals) {
    var meal_result_div = document.getElementById('meal_result');
    meal_result_div.innerHTML = '';

    for (var i = 0; i < Math.min(5, meals.length); i++) {
        var new_div = document.createElement("div");
        new_div.innerHTML = `<div class="col-md-4 mb-4">
                                        <div class="card">
                                            <img src="${meals[i].strMealThumb}" class="card-img-top" alt="${meals[i].strMeal}">
                                            <div class="card-body">
                                                <h5 class="card-title">${meals[i].strMeal}</h5>
                                                <p class="card-text">Recipe ID: ${meals[i].idMeal}</p>
                                                <p class="card-text">Category: ${meals[i].strCategory}</p>
                                                <p class="card-text" id="instructions_${i}">Instructions: ${truncateText(meals[i].strInstructions, 200)}</p>
                                                <a href="#" id="show_link_${i}" onclick="toggleInstructions(${i}); return false;" data-toggle="hidden">Show Full Instructions</a>
                                            </div>
                                        </div>
                                    </div>`;
        meal_result_div.appendChild(new_div.firstChild);
    }

    if (meals.length > 5) {
        document.getElementById('show_all_container').classList.remove('d-none');
    }
}

function show_all() {
    var meal_result_div = document.getElementById('meal_result');
    meal_result_div.innerHTML = ''; // Clear previous results
    document.getElementById('show_all_container').classList.add('d-none');

    for (var i = 5; i < mealsData.length; i++) {
        var new_div = document.createElement("div");
        new_div.innerHTML = `<div class="col-md-4 mb-4">
                                        <div class="card">
                                            <img src="${mealsData[i].strMealThumb}" class="card-img-top img-fluid" alt="${mealsData[i].strMeal}">
                                            <div class="card-body">
                                                <h3 class="card-title"><b>${mealsData[i].strMeal}</b></h3>
                                                <p class="card-text">Category: ${mealsData[i].strCategory}</p>
                                                <p class="card-text" id="instructions_${i}"><b>Instructions: </b>${truncateText(mealsData[i].strInstructions,200)}</p>
                                                <a href="#" id="show_link_${i}" onclick="toggleInstructions(${i}); return false;" data-toggle="hidden">Show Full Instructions</a>
                                            </div>
                                        </div>
                                    </div>`;
        meal_result_div.appendChild(new_div.firstChild);
    }
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}

function toggleInstructions(index) {
    var instructions = document.getElementById(`instructions_${index}`);
    var showLink = document.getElementById(`show_link_${index}`);

    if (showLink.dataset.toggle === 'hidden') {
        // Instructions are currently hidden, show them
        instructions.innerText = mealsData[index].strInstructions;
        showLink.innerText = 'Hide Full Instructions';
        showLink.dataset.toggle = 'shown';
    } else {
        // Instructions are currently shown, hide them
        instructions.innerText = truncateText(mealsData[index].strInstructions, 200);
        showLink.innerText = 'Show Full Instructions';
        showLink.dataset.toggle = 'hidden';
    }
}