const loadMeal = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealData(data.meals));
};

const displayMealData = (meals) => {
  const mealContainer = document.getElementById("meal-container");
  mealContainer.innerHTML = ``;
  // console.log(meals);
  meals.forEach((meal) => {
    // console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.innerHTML = `
    
      <div onclick ="displayMealDetails(${
        meal.idMeal
      })" class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="rounded-t-lg" src="${meal.strMealThumb}" alt="">
            </a>
            <div class="p-5">
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${
                      meal.strMeal
                    }</h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${meal.strInstructions.slice(
                  0,
                  150
                )}</p>
                
            </div>
      </div>

    `;
    mealContainer.appendChild(mealDiv);
  });
};

const searchFood = () => {
  const searchField = document.getElementById("searche-field");
  const searchText = searchField.value;
  loadMeal(searchText);
  searchField.value = ``;
};

const displayMealDetails = (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  // console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((data) => selectedMeal(data.meals[0]));
};

const selectedMeal = (meal) => {
  const mealDetails = document.getElementById("meal-details");
  mealDetails.innerHTML = ``;
  const detailDiv = document.createElement("div");
  detailDiv.innerHTML = `
  <div>
  
        <a href="#" class=" p-2 flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img class="object-cover w-full h-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src="${
          meal.strMealThumb
        }" alt="">
        <div class="flex flex-col justify-between p-4 leading-normal">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${
              meal.strMeal
            }</h5>
            <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${meal.strInstructions.slice(
              0,
              250
            )}</p>
        </div>
        </a>

  </div>
  `;
  mealDetails.appendChild(detailDiv);
};

loadMeal("");
