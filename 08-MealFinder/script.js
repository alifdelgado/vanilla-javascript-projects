const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    meals = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    singleMealElement = document.getElementById('single-meal');

const searchMeal = (e) => {
    e.preventDefault();
    singleMealElement.innerHTML = '';
    const term = search.value;
    if(!term.trim()) {
        alert('Please enter a search term');
        return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(response => response.json())
        .then(data => {
            resultHeading.innerHTML = `<h2>Searching results for '<em>${term}</em>'</h2>`;
            if(data.meals===null) {
                resultHeading.innerHTML += 'There are no search results. Please try again.';
            } else {
                meals.innerHTML = data.meals.map(meal => `
                    <div class="meal">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        <div class="meal-info" data-meal-id="${meal.idMeal}">
                            <h3>${meal.strMeal}</h3>
                        </div>
                    </div>`).join('');
            }
        }).catch(error => console.log(error));
    search.value = '';
};

const addMealToDOM = (meal) => {
    const ingredients = [];
    for(let i = 0; i < 20; i++) {
        if(meal[`strIngredient${i}`]) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            ingredients.push(`${ingredient} - ${measure}`);
        }
    }

    singleMealElement.innerHTML = `
        <div class="single-meal">
            <h1>${meal.strMeal}</h1>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="single-meal-info">
                ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
                ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                    ${ingredients.map( ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
};

const getMealById = (id) => {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(response => response.json())
        .then(data => { 
            const meal = data.meals[0];
            addMealToDOM(meal);
        }).catch(error => console.log(error));
};

const getRandomMeal = () => {
    meals.innerHTML = '';
    resultHeading.innerHTML = '';
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            addMealToDOM(data.meals[0]);
        }).catch(error => console.log(error));
};

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', getRandomMeal);
meals.addEventListener('click', (e) => {
    const mealInfo = e.path.find(item => {
        if(item.classList) {
            return item.classList.contains('meal-info');
        }
    });

    if(mealInfo) {
        const mealId = mealInfo.getAttribute('data-meal-id');
        getMealById(mealId);
    }
});