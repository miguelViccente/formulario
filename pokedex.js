
const NomePokemon = document.querySelector('.pokenome');
const NumPokemon = document.querySelector('.pokenum');
const ImgPokemon = document.querySelector('#pokemon');
 
const form = document.querySelector('#formulario');
const input = document.querySelector('#pesquisarpokemon');
 
const buttonprev = document.querySelector('.btn-prev');
const buttonnext = document.querySelector('.bnt-next');
 
 
 
 
 
let searchpokemon = 1;
 
const fetchPokemon = async (pokemon) => {
 
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
   
   
    if(APIResponse.status == 200){
        const data = await APIResponse.json();
        return data;
    }
    else{
        NomePokemon.innerHTML = 'Não encontrado!';
        NumPokemon.innerHTML = '';
    }
 
}
 
const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);
    if (data){
    NomePokemon.innerHTML = data.name;
    NumPokemon.innerHTML = data.id;
   
    ImgPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchpokemon = data.id;
}
    }
   
 
form.addEventListener('submit', (event) => {
 
    event.preventDefault();
 
    renderPokemon (input.value);
 
});
 
buttonprev.addEventListener('click', () => {
 
   searchpokemon -= 1;
    renderPokemon(searchpokemon);
 
});
 
buttonnext.addEventListener('click', () => {
 
    searchpokemon += 1;
    renderPokemon(searchpokemon);
 
});
 
renderPokemon(searchpokemon);
 
 