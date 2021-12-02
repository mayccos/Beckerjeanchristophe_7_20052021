function openDropdownIngredients() {
    const option = document.querySelector('#dropdown-menuIng');
    const arrow = document.querySelector('.arrow', 'before');
    option.style.display = 'block';
    arrow.style.transform = 'rotate(180deg)';
    
};

function openDropdownAppliances() {
    const option = document.querySelector('#dropdown-menuApp');
    const arrow = document.querySelector('.arrow2', 'before');
    option.style.display = 'block';
    arrow.style.transform = 'rotate(180deg)';
    
};

function openDropdownUstensiles() {
    const option = document.querySelector('#dropdown-menuUst');
    const arrow = document.querySelector('.arrow3', 'before');
    option.style.display = 'block';
    arrow.style.transform = 'rotate(180deg)';
    
};


function closeDropdownIngredients() {
    const option = document.querySelector('#dropdown-menuIng');
    const arrow = document.querySelector('.arrow', 'before');
    
    option.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
    
};     

function closeDropdownAppareils() {
    const option = document.querySelector('#dropdown-menuApp');
    const arrow = document.querySelector('.arrow2', 'before');
    
    option.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
    
};    

function closeDropdownUstensiles() {
    const option = document.querySelector('#dropdown-menuUst');
    const arrow = document.querySelector('.arrow3', 'before');
    
    option.style.display = 'none';
    arrow.style.transform = 'rotate(0deg)';
    
};    






export{openDropdownIngredients, openDropdownAppliances, openDropdownUstensiles, 
    closeDropdownAppareils, closeDropdownIngredients, closeDropdownUstensiles};