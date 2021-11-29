export default class Ingredient{
    /**
     * @param {string} ingredient name of ingredient;
     * @param {number} quantity quantity of ingredient
     * @param {string} unit unit of ingredient's quantity
     */

    constructor(ingredient, quantity, unit){
        this.ingredientName= ingredient;
        this.quantity = quantity;
        this.unit = unit;
    }
    ingredientsInDropdown(){
      return  `${this.ingredientName}`
    }
}