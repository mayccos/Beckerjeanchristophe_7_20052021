import Recipe from './recipe.js';
import Ingredient from './ingredients.js';

/**
 * function to recover data from a URL and parsed as Json Format
 * @returns parsed data as Json format
 */
let parseDataFromJson = async () => {
    const url = './recipes.json';
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }else{ console.error(response.status);}
};

/**
 * function pending  parsed Data as Json Format from url
 * and  creation of new Recipe class for each photographer with a loop
 * @param {object} jsonData parsed data as json format
 * @returns   Recipe class created in an array
 */
  let recipesData = async(jsonData) => {
    const data = await jsonData;
    const recipes = data.recipes;
    let recipesArray = [];
    recipes.map(data => {
        recipesArray.push( new Recipe(data.name, data.id, data.servings, data.ingredients, data.time, data.description, data.appliance, data.ustensiles));
    });
    //const recipesText = recipes.map(recipeToText);console.log(recipesText);
    return recipesArray;
    
  };
  
  
  
function recipeToText(r) {
    let out = r.name;
    out += " " + r.description;
    
    
    for (let ingredient of r.ingredients) {
      out += " " + ingredient.ingredient;
      
    } 
    
    
    
    return out;
    
}

/*let ingredientsData = async(jsonData) =>{
  const data = await jsonData;
  const ingredients = data.ingredients;
  
  let ingredientsArray = [];
  ingredients.map(data =>{
    ingredientsArray.push(new Ingredient(data.ingredient, data.quantity, data.unit))
  });console.log(ingredientsArray);
  return ingredientsArray;
}*/

    






export {recipesData, parseDataFromJson};