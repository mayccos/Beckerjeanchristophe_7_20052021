import Recipe from './recipe.js';

import {recipesData, parseDataFromJson, /*ingredientsInDropdown*/} from './api.js';
import { openDropdownIngredients, openDropdownAppliances, openDropdownUstensiles,
     closeDropdownIngredients, closeDropdownAppareils, closeDropdownUstensiles} from './dropdown.js';





const recipes = await recipesData(parseDataFromJson());
let recipes2 = [];
displayRecipes(recipes);
function displayRecipes(recipes) {
    recipes.forEach(recipe => {
          
          const div = document.createElement('div');
          div.className="col-md-8 col-lg-6 col-xl-4 recipe";
          let recipeCard = recipe.recipeCard();
          div.innerHTML = recipeCard;
          document.getElementById("recipesList").appendChild(div);
            
          
    })
}

let allIngredients = [];
let allUstensiles = [];
let allAppliances= [];
recuperationItemsInDropdown(recipes);
function recuperationItemsInDropdown(recipes) {
        recipes.forEach(recipe =>{
            allIngredients= [...new Set(allIngredients.concat(recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];
            allUstensiles= [...new Set(allUstensiles.concat(recipe.ustensiles))];
            allAppliances= [...new Set(allAppliances.concat(recipe.appliance))];
           
        })  
          return {allIngredients, allUstensiles, allAppliances};
};

displayIngredients(allIngredients)
function displayIngredients(allIngredients) {
    allIngredients.forEach(allIngredient =>{
        const ul = document.getElementById('ingredientsList');
        ul.innerHTML +=` <li role="option" class="menu__option" tabindex="0" ><a href="">${allIngredient}</a></li> ` ;
    });      
};
displayAppliances(allAppliances);
function displayAppliances(allAppliances) {
  allAppliances.forEach(allAppliance =>{
      const ul = document.getElementById('appareilsList');
      ul.innerHTML +=` <li role="option" class="menu__option" tabindex="0" ><a href="">${allAppliance}</a></li> ` ;
  });      
};
displayUstensiles(allUstensiles);
function displayUstensiles(allUstensiles) {
  allUstensiles.forEach(allUstensile =>{
      const ul = document.getElementById('ustensilesList');
      ul.innerHTML +=` <li role="option" class="menu__option" tabindex="0" ><a href="">${allUstensile}</a></li> ` ;
  });      
};

const dataRecipes = recipesData(parseDataFromJson());
//const hide = document.querySelector(".noResult");
let recipes3 = [];

function search() {
  let item = searchInput.value; 
  
  console.log(item);
  dataRecipes.then(result =>{
      recipes2 = result;
    
      for (let recipe of recipes2) {

          if (recipe.name.match(item) || recipe.description.match(item) || recipe.appliance.match(item) || recipe.ingredients.toString().match(item) ||
          recipe.ustensiles.toString().match(item)) {
                recipes3.push(recipe);
                const div = document.createElement('div');
                div.className="col-md-8 col-lg-6 col-xl-4 recipe";
                let recipeCard = recipe.recipeCard();
                div.innerHTML = recipeCard;
                document.getElementById("recipesList").appendChild(div);

                
          }
      }return recipes3;
      
  })
  
  
}
console.log(recipes3);
let ingredientsFiltered = [];
let appliancesFiltered = [];
let ustensilesFiltered = [];
recuperationItemsFilteredInDropdown(recipes3);
function recuperationItemsFilteredInDropdown(recipes3) {
    
        recipes3.forEach(recipe => {
            ingredientsFiltered= [...new Set(ingredientsFiltered.concat(recipe.ingredients.map(ingredient => ingredient.ingredients.toLowerCase())))];
            ustensilesFiltered= [...new Set(ustensilesFiltered.concat(recipe.ustensiles))];
            appliancesFiltered= [...new Set(appliancesFiltered.concat(recipe.appliance))];
           
        });  
        return ingredientsFiltered;//, ustensilesFiltered, appliancesFiltered;
};
console.log(ingredientsFiltered);
document.querySelector('.search__glass').addEventListener('click' , () => {
  document.querySelector('.recipesList').innerHTML = "";
  search();
  
});

document.querySelector('#ingredients').addEventListener('click' , () => {
    openDropdownIngredients();
});
document.querySelector('#appareils').addEventListener('click' , () => {
    openDropdownAppliances();
});
document.querySelector('#ustensiles').addEventListener('click' , () => {
    openDropdownUstensiles();
});
document.querySelector('.arrow').addEventListener('click' , () =>{
    closeDropdownIngredients();
})
window.addEventListener('keyup' , function (e){
    if (e.key === 'Escape') {
        e.preventDefault();
        closeDropdownUstensiles();
        closeDropdownIngredients();
        closeDropdownAppareils();
    }
});
document.querySelector('#ingredientsSearch').addEventListener('click' , () => {
    document.querySelector('#ingredientsList ').innerHTML = "";
});

document.querySelector('#appareilsSearch').addEventListener('click' , () => {
    document.querySelector('#appareilsList ').innerHTML = "";
})

document.querySelector('#ustensilesSearch').addEventListener('click' , () => {
    document.querySelector('#ustensilesList ').innerHTML = "";
})


