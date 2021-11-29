/**
 * creation of a class Recipe
 */
export default class Recipe{
    /**
       * @param {string} name Recipes's name
       * @param {number} time recipes's time
       * @param {string} description recipes's description
       * @param {string[]} ingredients recipes's ingredient in an array 
       * @param {string} appliance recipe's appliance
       * @param {number} serving number of recipes's serving
       * @param {string} ustensiles recipes's ustensiles
       * @param {string} id Recipe's id
       */
    
    constructor(name, id, servings, ingredients, time ,description, appliance,  ustensiles){
        this.name = name;
        this.id = id;
        this.servings = servings;
        this.ingredients = ingredients;
        this.time = time;
        this.description = description;
        this.appliance = appliance;
        this.ustensiles = ustensiles;
        
    }
    recipeCard(){
        return `
        <div class="illustration ">
        <img src="" alt="">
        </div>
        <div class="col recipe__card" id="recipe__card">
        <div class="row col recipe__header">
          <h6 class="col-8 ">${this.name}</h6>
          <div class="col-4 time">
              <img src="images/horloge.svg" alt="">
               <p>${this.time} min</p>
          </div>    
        </div><br>
        <div class="row recipe__content">
          <ul class="col-5 ml-3 recipe__ingredients list-unstyled">
            ${ this.ingredientsInRecipes() } 
          </ul>    
          <div class="col-6  recipe__process">
            <p class="recipe__textCut ">${this.description}</p>
          </div>       
        </div>       
      </div> 
              `;
    }
    ingredientsInRecipes(){
      //let ing = "";
      let html = "";
      for (let i = 0; i < this.ingredients.length; i++) {
        /*ing += `<li class="col-12"><strong>${this.ingredients[i]} :</strong> ${this.quantity} ${this.unit}</li> `;
      } return ing;
    }*/
   
      let ing = this.ingredients[i];
	    

		//for(let ing of r.ingredients){
		  let quantity = "";
			let unit     = "";
			let space    = " ";
     

			if( typeof ing.quantity !== "undefined" ) quantity += ": " + ing.quantity;

			     if ( ing.unit        === "grammes"   ) unit = "g";
			else if ( typeof ing.unit !== "undefined" ) unit = ing.unit;


			if(
			
				   ["g", "ml", "cl"].includes(unit)
				|| quantity === ""
			)

				space = ""
			;


			html += `<li class="ingredient"><span class="ingredient--name"><strong>${ ing.ingredient }</strong></span>${ quantity }${ space }${ unit }</li>`;
		}

		

		return html;
	  }
    
}