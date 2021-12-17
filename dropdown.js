function openDropdownIngredients() {
    const arrowReturn = document.querySelector('.return-arrow');
    const option = document.querySelector('#dropdown-menuIng');
    const arrow = document.querySelector('.arrow', 'before');
    option.style.display = 'block';
    arrow.style.display = 'none';
    arrowReturn.style.display = 'block';
    
};

function openDropdownAppliances() {
    const arrowReturn2 = document.querySelector('.return-arrow2');
    const option = document.querySelector('#dropdown-menuApp');
    const arrow2 = document.querySelector('.arrow2');
    option.style.display = 'block';
    arrow2.style.display = 'none';
    arrowReturn2.style.display = 'block';
};

function openDropdownUstensiles() {
    const arrowReturn3 = document.querySelector('.return-arrow3');
    const option = document.querySelector('#dropdown-menuUst');
    const arrow3 = document.querySelector('.arrow3', 'before');
    option.style.display = 'block';
    arrow3.style.display = 'none';
    arrowReturn3.style.display = 'block';
};


function closeDropdownIngredients() {
    const option = document.querySelector('#dropdown-menuIng');
    const arrow = document.querySelector('.arrow');
    const arrowReturn = document.querySelector('.return-arrow');
    
    option.style.display = 'none';
    arrow.style.display = 'block';
    arrowReturn.style.display = 'none';
};     

function closeDropdownAppareils() {
    const option = document.querySelector('#dropdown-menuApp');
    const arrow2 = document.querySelector('.arrow2', 'before');
    const arrowReturn2 = document.querySelector('.return-arrow2');
    
    option.style.display = 'none';
    arrow2.style.display = 'block';
    arrowReturn2.style.display = 'none';
};    

function closeDropdownUstensiles() {
    const option = document.querySelector('#dropdown-menuUst');
    const arrow3 = document.querySelector('.arrow3', 'before');
    const arrowReturn3 = document.querySelector('.return-arrow3');
    
    option.style.display = 'none';
    arrow3.style.display = 'block';
    arrowReturn3.style.display = 'none';
};








export{openDropdownIngredients, openDropdownAppliances, openDropdownUstensiles, 
    closeDropdownAppareils, closeDropdownIngredients, closeDropdownUstensiles};