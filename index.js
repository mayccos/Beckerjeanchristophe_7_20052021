import Recipe from './recipe.js';
import Ingredient from './ingredients.js';
import {recipesData, parseDataFromJson} from './api.js';




/*let recettes = "";
fetch('recipes.json')
.then(function(response) {
  if(response.ok) {
    response.json().then(function(result){
      let resultat = result;
      recettes= resultat.recipes;
console.log(recettes);
let search = 'coco';
      for (let recette of recettes) {
        if (recette.description == search) {
          console.log(recette);
        }else{
          console.log('not found');
        }

        
      }
    });
  }
});*/ 
let recipes = '';
const recs = recipesData(parseDataFromJson());
let recipes2 = [];


displayRecipes(recs);
function displayRecipes(recs) {
    recs.then(result =>{
        recipes = result;
        recipes.forEach(recipe => {
          let rec = new Recipe(
              recipe.name ,
              recipe.id,
              recipe.servings ,
              recipe.ingredients ,
              recipe.time ,
              recipe.description, 
              recipe.appliance ,
              recipe.ustensiles
              
          );
          const div = document.createElement('div');
          div.className="col-md-8 col-lg-6 col-xl-4 recipe";
          let recipeCard = rec.recipeCard();
          div.innerHTML = recipeCard;
          document.getElementById("recipesList").appendChild(div);
            
          
      });
  })
      .catch(error => {
          console.log(error);
      });
}
let recipes3 = [];
let ings = [];
displayIngredientsIndropdown(recs)
function displayIngredientsIndropdown(recs) {
    recs.then(result => {
        recipes3= result;
        //console.log(recipes3);
        recipes3.forEach(recipe =>{
            let rec = new Recipe(
              recipe.name ,
              recipe.id,
              recipe.servings ,
              recipe.ingredients ,
              recipe.time ,
              recipe.description, 
              recipe.appliance ,
              recipe.ustensiles
            );
            ings += recipe.ingredients;
            console.log(ings.flat());
            
            //let app = [recipe.appliance];
            
            /*var tableauSansDoublon = app.reduce(function (acc, valCourante) {
              if(acc.indexOf(valCourante) === -1) {
                acc.push(valCourante);
              }
              return acc
            }, []);*/  
            
            
          })  
          
    });
};
function flatStack(input) {
  const stack = [...input];
  const res = [];
  while (stack.length) {
    // On sort une valeur de la pile
    const next = stack.pop();
    if (Array.isArray(next)) {
      // On place les éléments qui sont des tableaux dans
      // la pile sans modifier l'entrée
      stack.push(...next);
    } else {
      res.push(next);
    }
  }
  // On inverse le résultat pour revenir
  // à l 'ordre de l'entrée
  return res.reverse();
}


/**let ingredients = "";
const ings = ingredientsData(parseDataFromJson());
displayIngredients(ings);
function displayIngredients(ings) {
    ings.then(result => {
      ingredients = result;console.log(Ingredient);
      ingredients.forEach(ingredient => {
        let ing = new Ingredient(
          ingredient.ingredient, 
          ingredient.quantity, 
          ingredient.unit
        );console.log(ing);
        const li = document.createElement('li');
        li.className = "menu__option";
        li.ariaRoleDescription = "option";
        li.tabIndex= 0;
        let ingredientsDropdown = ing.ingredientsInDropdown();
        li.innerHTML = ingredientsDropdown;
        document.getElementById("ingredientsList").appendChild(li);
    });
    
          
  })
      .catch(error => {
          console.log(error);
      });
}*/


/*const paragraph = searchInput.value;
const regex = /paragraph/gi;
const found = paragraph.match(regex);
console.log(found);*/
const hide = document.querySelector(".noResult");
function search() {
  let item = "/"+ searchInput.value +"/i"; 
  console.log(item);
  recs.then(result => {
    recipes2 = result;
    
    for (const recipe of recipes2) {
      if (recipe.name.match(item) || recipe.description.match(item) || recipe.appliance.match(item) || recipe.ingredients.toString().match(item) ||
        recipe.ustensiles.toString().match(item)) {
          const div = document.createElement('div');
          div.className="col-md-8 col-lg-6 col-xl-4 recipe";
          let recipeCard = recipe.recipeCard();
          div.innerHTML = recipeCard;
          document.getElementById("recipesList").appendChild(div);
    
      }
    }
  })
     .catch(error => {
      console.log(error);
  });
}
document.querySelector('.search__glass').addEventListener('click' , () => {
  document.querySelector('.recipesList').innerHTML = "";
  search();
  if(document.querySelector('.recipesList').innerHTML = ""){
    hide.style.display = 'block';
  }
});
//search();

  

  //displayPhotographers(recipes);
/*let ings = "";
fetch('recipes.json')
.then(function(response) {
  if(response.ok) {
    response.json().then(function(result){
      let resultat = result;
      ings=resultat.ingredients;
      console.log(ings);
    })  
  }   
})    
    for (let recipe of recipes) {
       let  creation = document.createElement("div");
        creation.className = "col-md-8 col-lg-6 col-xl-4 recipe";
        let affichage = "";
        affichage +=
                    `
                    <div class="illustration ">
                      <img src="" alt="">
                    </div>
                    <div class="col recipe__card" id="recipe__card">
                      <div class="row col recipe__header">
                        <h6 class="col-8">${recipe.name}</h6>
                        <div class="col-4 time">
                            <img src="images/horloge.svg" alt="">
                             <p>${recipe.time} min</p>
                        </div>    
                      </div><br>
                      <div class="row recipe__content">
                        <ul "class="col-lg-8 col-xl-6 recipe__ingredients list-unstyled">
                          `+ this.recipeIngredients () +`
                        </ul>    
                        <div class="col-lg-4 col-xl-6 recipe__process">
                          <p>${recipe.description}</p>
                        </div>       
                      </div>       
                    </div> 
                  </div>       
                 `;
        
        
        creation.innerHTML = affichage;
        document.getElementById("recipesList").appendChild(creation);
        /*let div = document.createElement("div");
        div.className="row recipe__content";*/
              /*let ingredients = recipe.ingredients;
        let ul = document.createElement("ul");            
        ul.className="col-lg-8 col-xl-6 recipe__ingredients list-unstyled";
        //div.appendChild(ul); 
        //let div2 = document.getElementById("recipe__card")
        //div2.appendChild(div);
        
        for (ingredient of ingredients) {
          let li = document.createElement("li");
          li.classList.add("col-12");
          if ("unit" == null) {
            li.innerHTML = `<strong>${ingredient.ingredient} :</strong> ${ingredient.quantity}`;
 
          } else {
            li.innerHTML = `<strong>${ingredient.ingredient} :</strong> ${ingredient.quantity}${ingredient.unit}`;
          };
          
          ul.appendChild(li);
          
        }
        document.querySelector(".recipe__content").appendChild(ul);
        
        
      }
      
    });
} else {
  console.log('Mauvaise réponse du réseau');
}
})
.catch(function(error) {
    console.log('Il y a eu un problème avec l\'opération fetch: ' + error.message);
})
/*<li class="col-12"><strong>Lait de coco :</strong> 400ml</li>
<ul "class="col-lg-8 col-xl-6 recipe__ingredients list-unstyled"">
                        </ul>    
                        <div class="row recipe__content">
                          <div class="col-lg-4 col-xl-6 recipe__process">
                            <p>${recipe.description}</p>
                          </div>       
                        </div>*/   
/*function recipeIngredients (){
  let ingredients = recipe.ingredients;
  let ul = document.createElement("ul");
  for (ingredient of ingredients) {
    let li = document.createElement("li");
    li.classList.add("col-12");
    if ("unit" == null) {
      li.innerHTML = `<strong>${ingredient.ingredient} :</strong> ${ingredient.quantity}`;

    } else {
      li.innerHTML = `<strong>${ingredient.ingredient} :</strong> ${ingredient.quantity}${ingredient.unit}`;
    };
    
    ul.appendChild(li);
    
  }
 
} 

/**
 * function to display the option of selector
 */
/*function displaySelectOptions  ()  {
  const select = document.querySelector('.btn');
  select.addEventListener('click', () => {
      const option = document.querySelector('.dropdown__menu');
      const arrow = document.querySelector('.arrow', 'before');
      // if the class is not present in the HTML Element then we add it
      
          option.style.display= "block";
          arrow.style.transform = 'rotate(180deg)';
      
      // else we remove it 
      
  });
  select.addEventListener('keypress', () => {
      const option = document.querySelectorAll('.dropdown__menu');
      const arrow = document.querySelectorAll('.arrow', 'before');
      // if the class is not present in the HTML Element then we add it
      if (!option.classList.contains('filter__show')) {
          option.classList.add('filter__show');
          arrow.style.transform = 'rotate(180deg)';
      }
      // else we remove it 
      else {
          arrow.style.transform = 'rotate(0deg)';
          option.classList.remove('filter__show');
      }
  });
};  */
