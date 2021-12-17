import Recipe from './recipe.js';

import {recipesData, parseDataFromJson, /*ingredientsInDropdown*/} from './api.js';
import { openDropdownIngredients, openDropdownAppliances, openDropdownUstensiles,
     closeDropdownIngredients, closeDropdownAppareils, closeDropdownUstensiles} from './dropdown.js';


/**
 * recuperate and display  recipes  from json
 * @param {html} create element html to recipes
 */


const recipes = await recipesData(parseDataFromJson());

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
let recipes2 = [];
const dataRecipes = recipesData(parseDataFromJson());

let hide = document.getElementById('hide');
let recipes3 = [];
let ingredientsFiltered = [];//array to recuperate ingredients of recipes matched by algorithm
let appliancesFiltered = []; //array to recuperate appliances of recipes matched by algorithm
let ustensilesFiltered = []; //array to recuperate ustensiles of recipes matched by algorithm
function search() {
  let item = searchInput.value; //pivot of algorithm is value of principal input(search)
    if (regexInput.exec(item) === null) {
        hide.style.display = "block";
    } else {
        hide.style.display = "none";
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
                displayAppliances(appliancesFiltered);
                displayIngredients(ingredientsFiltered);
                displayUstensiles(ustensilesFiltered);  
                return {ingredientsFiltered, ustensilesFiltered, appliancesFiltered};
                
                //display ustensiles filtered in dropdown ustensiles
                function displayUstensiles(ustensilesFiltered) {
                    ustensilesFiltered.forEach(ustensileFiltered =>{
                        const ul = document.getElementById('ustensilesList');
                        ul.innerHTML +=` <li role="option" onclick="tagUstensilesDisplay(this), closeDropdownUstensiles(this)"  class="menu__option-ustensile" tabindex="0" style="cursor:pointer" >${ustensileFiltered}</li> ` ;
                    });      
                };
                //display ingredients filtered in dropdown ingredients
                function displayIngredients(ingredientsFiltered) {
                    ingredientsFiltered.forEach(ingredientFiltered =>{
                        const ul = document.getElementById('ingredientsList');
                        ul.innerHTML +=` <li role="option" onclick="tagIngredientsDisplay(this), closeDropdownIngredients(this), specifiedSearch(this)"  class="menu__option-ingredient" tabindex="0" style="cursor:pointer">${ingredientFiltered}</li> ` ;
                    });     
                };
                //display appliances filtered in dropdown appliances
                function displayAppliances(appliancesFiltered) {
                    appliancesFiltered.forEach(applianceFiltered =>  {
                        const ul = document.getElementById('appareilsList');
                        ul.innerHTML +=` <li role="option"  class="menu__option-appareil" onclick="tagAppareilsDisplay(this),closeDropdownAppareils(this)" tabindex="0" style="cursor:pointer">${applianceFiltered}</li> ` ;
                    });   
                }; 
                
            };
            
        }); 
    }
    
    return recipes3;
};
//display ingredient selected of dropdown in active(html element)
const active = document.querySelector('.active');
function tagIngredientsDisplay(el) {
    active.innerHTML += `<p class="ingredientTag">${el.innerText}<span class="closeIngredientTag mt-1" onclick="closeTagIngredient(this)"></span></p>`;
};
//display appliance selected of dropdown in active(html element)

function tagAppareilsDisplay(el) {
    active.innerHTML += `<p class="appareilTag ">${el.innerText}<span class="closeAppareilTag mt-1 " onclick="closeTagAppareil(this)" ></span></p>`;
};
//display ustensile selected of dropdown in active (html element) 
function tagUstensilesDisplay(el) {
    active.innerHTML += `<p class="ustensileTag">${el.innerText}<span class="closeUstensileTag mt-1" onclick="closeTagUstensile(this)"></span></p>`;
};
// function to remove dropdown's tag in active(html element)
function closeTagIngredient() {
    document.querySelector('.ingredientTag').style.display = 'none';
    
}
function closeTagAppareil() {
    document.querySelector('.appareilTag').style.display = 'none';
};
function closeTagUstensile() {
    document.querySelector('.ustensileTag').style.display = 'none';
};

//display no result message when this is not recipe
function noResult() {
    let item = searchInput.value; 
    if (!allIngredients.toString().match(item) && !allAppliances.toString().match(item) && !allUstensiles.toString().match(item)) {
        hide.style.display = 'block';
    }else{
        hide.style.display = 'none';
    }
}

     
    


/**
 * events to click on search glass => algorithm of search
 */

document.querySelector('.search__glass').addEventListener('click' , () => {
    document.querySelector('.recipesList').innerHTML = "";
    document.querySelector('#ingredientsList').innerHTML = "";
    document.querySelector('#appareilsList').innerHTML = "";
    document.querySelector('#ustensilesList').innerHTML = "";
    search();
    noResult();
    active.innerHTML = "";
    
});
//When input search(principal) is clicked ,it value become empty
//and the page come back to load
document.querySelector('.searchInput').addEventListener('click' , () =>{
    displayUstensiles(allUstensiles);
    displayAppliances(allAppliances);
    displayIngredients(allIngredients);
    displayRecipes(recipes);
    hide.style.display = 'none';
    document.querySelector('.searchInput').value = "";
    active .innerHTML = "";
})
 //when input of dropdown is clicked => input value is empty

    
//Event to open dropdown
document.querySelector('#ingredients').addEventListener('click' , () => {
    openDropdownIngredients();
    document.querySelector('#ingredientsSearch').value = "";
});
document.querySelector('#appareils').addEventListener('click' , () => {
    openDropdownAppliances();
    document.querySelector('#appareilsSearch').value = "";
});
document.querySelector('#ustensiles').addEventListener('click' , () => {
    openDropdownUstensiles();
    document.querySelector('#ustensilesSearch').value = "";
});
//Event to close dropdown 
document.querySelector('.return-arrow').addEventListener('click' , () =>{
    
    closeDropdownIngredients();
});
document.querySelector('.return-arrow2').addEventListener('click' , () =>{
    closeDropdownAppareils();
});
document.querySelector('.return-arrow3').addEventListener('click' , () =>{
    closeDropdownUstensiles();
});



// if Escape touch is keyup => close dropdown
window.addEventListener('keyup' , function (e){
    if (e.key === 'Escape') {
        e.preventDefault();
        closeDropdownUstensiles();
        closeDropdownIngredients();
        closeDropdownAppareils();

    }
});


//displaying recipes according to secondary filter (dropdown)
function specifiedSearch(e) {
    document.querySelector('.recipesList').innerHTML = "";
    for (const recipe3 of recipes3) {
        
        let item2 = e.innerText;
        if (recipe3.name.match(item2) || recipe3.description.match(item2) || recipe3.appliance.match(item2) || recipe3.ingredients.toString().match(item2) ||
        recipe3.ustensiles.toString().match(item2)) {
            const div = document.createElement('div');
            div.className="col-md-8 col-lg-6 col-xl-4 recipe";
            let recipeCard = recipe3.recipeCard();
            div.innerHTML = recipeCard;
            document.getElementById("recipesList").appendChild(div);  
        }
    }
}




  
    




// if ingredient of dropdown'list don't corresponded to input's value of dropdown => remove it

function specifiedIngredientSearch(el) {
    let optionIngredients = document.getElementsByClassName('menu__option-ingredient');
    console.log(optionIngredients[0].innerText);
    for (let optionIngredient of optionIngredients) {
       if (!optionIngredient.innerText.match(el.value)) {
           optionIngredient.style.display = 'none';
       }else{
        optionIngredient.style.display = 'block';
       }
    };        
}       
// if appliance of dropdown'list don't corresponded to input's value of dropdown => remove it

function specifiedAppareilSearch(el) {
    let optionAppareils = document.getElementsByClassName('menu__option-appareil');
    console.log(optionAppareils[0].innerText);
    for (let optionAppareil of optionAppareils) {
       if (!optionAppareil.innerText.match(el.value)) {
           optionAppareil.style.display = 'none';
       }else{
        optionAppareil.style.display = 'block';
       }
    };        
};
// if ustensile of dropdown'list don't corresponded to input's value of dropdown => remove it
function specifiedUstensileSearch(el) {
    let optionUstensiles = document.getElementsByClassName('menu__option-ustensile');
    
    for (let optionUstensile of optionUstensiles) {
       if (!optionUstensile.innerText.match(el.value)) {
           optionUstensile.style.display = 'none';
       }else{
        optionUstensile.style.display = 'block';
       }
    };        
}
    

window.tagIngredientsDisplay = tagIngredientsDisplay;
window.specifiedIngredientSearch = specifiedIngredientSearch;
window.specifiedUstensileSearch = specifiedUstensileSearch;
window.specifiedAppareilSearch = specifiedAppareilSearch;
window.tagAppareilsDisplay = tagAppareilsDisplay;
window.tagUstensilesDisplay = tagUstensilesDisplay;
window.closeDropdownIngredients = closeDropdownIngredients;
window.closeDropdownUstensiles = closeDropdownUstensiles;
window.closeDropdownAppareils = closeDropdownAppareils;
window.closeTagIngredient = closeTagIngredient;
window.closeTagAppareil = closeTagAppareil;
window.closeTagUstensile = closeTagUstensile;
window.specifiedSearch = specifiedSearch;
