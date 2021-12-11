import Recipe from './recipe.js';

import {recipesData, parseDataFromJson, /*ingredientsInDropdown*/} from './api.js';
import { openDropdownIngredients, openDropdownAppliances, openDropdownUstensiles,
     closeDropdownIngredients, closeDropdownAppareils, closeDropdownUstensiles} from './dropdown.js';


/**
 * recuperate and display  recipes  from json
 * @param {html} create element html to recipes
 */


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


/**
 * @param {array} array of recipes
 * recuperation ingredients, ustensiles, appliance of recipes
 * @return array to ingredients and ustensiles and appliances(concat and any doubles )
 */
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
/**
 * display ingredients,appliances,ustensiles in dropdown
 * @return  element html
 */
displayIngredients(allIngredients);
function displayIngredients(allIngredients) {
    allIngredients.forEach(allIngredient =>{
        const ul = document.getElementById('ingredientsList');
        ul.innerHTML +=` <li role="option"  class="menu__option-ingredient" tabindex="0" style="cursor:pointer">${allIngredient}</li> ` ;
    });      
};
displayAppliances(allAppliances);
function displayAppliances(allAppliances) {
  allAppliances.forEach(allAppliance =>{
      const ul = document.getElementById('appareilsList');
      ul.innerHTML +=` <li role="option" class="menu__option-appareil" tabindex="0" style="cursor:pointer">${allAppliance}</li> ` ;
  });      
};
displayUstensiles(allUstensiles);
function displayUstensiles(allUstensiles) {
  allUstensiles.forEach(allUstensile =>{
      const ul = document.getElementById('ustensilesList');
      ul.innerHTML +=` <li role="option"  class="menu__option-ustensile" tabindex="0" style="cursor:pointer" >${allUstensile}</li> ` ;
  });      
};
//regex
const regexInput = /^[a-zA-Z]{3,}$/;

const dataRecipes = recipesData(parseDataFromJson());

let recipes3 = [];
let ingredientsFiltered = [];//array to recuperate ingredients of recipes matched by algorithm
let appliancesFiltered = []; //array to recuperate appliances of recipes matched by algorithm
let ustensilesFiltered = []; //array to recuperate ustensiles of recipes matched by algorithm
function search() {
  let item = searchInput.value; //pivot of algorithm is value of principal input(search)
    if (regexInput.exec(item) === null  ) {
        document.querySelector('#hide').style.display = "block";
    } else {
        document.querySelector('#hide').style.display = "none";
        dataRecipes.then(result =>{
            recipes2 = result;
            //algorithm in forof's method functionality normal
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
            }recuperationItemsFilteredInDropdown(recipes3);
            return recipes3;
            //recuperation of ingredients, appliances, ustensiles filtered by algorithm in arrays 
            function recuperationItemsFilteredInDropdown(recipes3) {
    
                recipes3.forEach(recipe => {
                    ingredientsFiltered= [...new Set(ingredientsFiltered.concat(recipe.ingredients.map(ingredient => ingredient.ingredient.toLowerCase())))];
                    ustensilesFiltered= [...new Set(ustensilesFiltered.concat(recipe.ustensiles))];
                    appliancesFiltered= [...new Set(appliancesFiltered.concat(recipe.appliance))];
                
                });
                displayAppliances(allAppliances);
                displayIngredients(ingredientsFiltered);
                displayUstensiles(ustensilesFiltered);  
                return {ingredientsFiltered, ustensilesFiltered, appliancesFiltered};

                //display ustensiles filtered in dropdown ustensiles
                function displayUstensiles(ustensilesFiltered) {
                    ustensilesFiltered.forEach(ustensileFiltered =>{
                        const ul = document.getElementById('ustensilesList');
                        ul.innerHTML +=` <li role="option"  class="menu__option-ustensile" tabindex="0" style="cursor:pointer" >${ustensileFiltered}</li> ` ;
                    });      
                };
                //display ingredients filtered in dropdown ingredients
                function displayIngredients(ingredientsFiltered) {
                    ingredientsFiltered.forEach(ingredientFiltered =>{console.log(ingredientFiltered  );
                        const ul = document.getElementById('ingredientsList');
                        ul.innerHTML +=` <li role="option"  class="menu__option-ingredient" tabindex="0" style="cursor:pointer">${ingredientFiltered}</li> ` ;
                    });    
                };
                //display appliances filtered in dropdown appliances
                function displayAppliances(appliancesFiltered) {
                    appliancesFiltered.forEach(applianceFiltered =>  {
                        const ul = document.getElementById('appareilsList');
                        ul.innerHTML +=` <li role="option"  class="menu__option-appareil" tabindex="0" style="cursor:pointer">${applianceFiltered}</li> ` ;
                    });    
                }; 
            };

        }); 
    }return recipes3;
  
        
};


/**
 * events to click on search glass => algorithm of search
 */

document.querySelector('.search__glass').addEventListener('click' , () => {
  document.querySelector('.recipesList').innerHTML = "";

  document.querySelector('#ingredientsList').innerHTML = "";
  document.querySelector('#appareilsList').innerHTML = "";
  document.querySelector('#ustensilesList').innerHTML = "";
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
});
document.querySelector('.arrow2').addEventListener('click' , () =>{
    closeDropdownAppareils();
});
document.querySelector('.arrow3').addEventListener('click' , () =>{
    
    closeDropdownUstensiles();
});
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
});

document.querySelector('#ustensilesSearch').addEventListener('click' , () => {
    document.querySelector('#ustensilesList ').innerHTML = "";
});
let ingredientOption= document.getElementsByClassName('menu__option-ingredient');
function specifiedSearch(recipes) {
    let item2 = ingredientOption.innerText;
    
    dataRecipes.then(result =>{
        recipes = result;
    
        for (const recipe of recipes) {
            if (recipe.name.match(item2) || recipe.description.match(item2) || recipe.appliance.match(item2) || recipe.ingredients.toString().match(item2) ||
                recipe.ustensiles.toString().match(item2)) {
                    
                    const div = document.createElement('div');
                    div.className="col-md-8 col-lg-6 col-xl-4 recipe";
                    let recipeCard = recipe.recipeCard();
                    div.innerHTML = recipeCard;
                    document.getElementById("recipesList").appendChild(div);
            }
        }
    })
}

//display ingredient selected of dropdown in active(html element)
const active = document.querySelector('.active');
let optionIngredients = document.getElementsByClassName('menu__option-ingredient');
for (let optionIngredient of optionIngredients) {
     optionIngredient.addEventListener('click' , () =>{
        specifiedSearch();
        active.innerHTML += `<p class="ingredientTag">${optionIngredient.innerText}<span class="closeIngredientTag mt-1"></span></p>`;
    })
};
//display appliance selected of dropdown in active(html element)
let optionAppliances = document.getElementsByClassName('menu__option-appareil');
for (let optionAppliance of optionAppliances) {
     optionAppliance.addEventListener('click' , () =>{
        active.innerHTML += `<p class="appareilTag ">${optionAppliance.innerText}<span class="closeAppareilTag mt-1"></span></p>`;
    })
};

//display ustensile selected of dropdown in active (html element) 
let optionUstensiles = document.getElementsByClassName('menu__option-ustensile');
for (let optionUstensile of optionUstensiles) {
     optionUstensile.addEventListener('click' , () =>{
        active.innerHTML += `<p class="ustensileTag">${optionUstensile.innerText}<span class="closeUstensileTag mt-1"></span></p>`;
    })
};

//remove ingredient'tag in active(html element)
let closeIngredientTags = document.getElementsByClassName('closeIngredientTag','before');
for (let closeIngredientTag of closeIngredientTags) {
    closeIngredientTag.addEventListener('click' , () =>{
        document.getElementsByClassName('ingredientTag').style.display = 'none';
    });
};