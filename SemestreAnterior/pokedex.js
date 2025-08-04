var NomePokemon = document.querySelector('.pokenome');
var NumPokemon = document.querySelector('.pokenum');
var ImgPokemon = document.querySelector('#pokemon');

var form = document.querySelector('#formulario');
var input = document.querySelector('#pesquisarpokemon');

var buttonprev = document.querySelector('.btn-prev');
var buttonnext = document.querySelector('.bnt-next');

var habilidade0 = document.querySelector('.habilidade0');
var habilidade1 = document.querySelector('.habilidade1');
var tipopokemon = document.querySelector('#tipo');

var pesopokemon = document.querySelector('#peso');
var alturapokemon = document.querySelector('#altura');

var nao = document.querySelector('#nao');


var fetchPokemon = async (pokemon) => {
    var APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    } else {
        NomePokemon.innerHTML = 'Não encontrado!';
        NumPokemon.innerHTML = '';
        return null;
    }
};


const buscarEvolucao = async (pokemon) => {
    const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const speciesData = await speciesResponse.json();

    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();

    let evolucaoNome = null;
    let cadeia = evolutionData.chain;

    if (cadeia.species.name === pokemon.toLowerCase()) {
        if (cadeia.evolves_to.length > 0) {
            evolucaoNome = cadeia.evolves_to[0].species.name;
        }
    } else if (
        cadeia.evolves_to.length > 0 &&
        cadeia.evolves_to[0].species.name === pokemon.toLowerCase()
    ) {
        if (cadeia.evolves_to[0].evolves_to.length > 0) {
            evolucaoNome = cadeia.evolves_to[0].evolves_to[0].species.name;
        }
    }

    if (!evolucaoNome) return null;

    const evoResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${evolucaoNome}`);
    const evoData = await evoResponse.json();

    return {
        nome: evolucaoNome,
        id: evoData.id
    };
};


var renderPokemon = async (pokemon) => {
    var data = await fetchPokemon(pokemon);
    if (data) {
        NomePokemon.innerHTML = data.name;
        NumPokemon.innerHTML = data.id;

        ImgPokemon.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        habilidade0.innerHTML = data.abilities[0].ability.name;
        habilidade1.innerHTML = data.abilities.length > 1 ? data.abilities[1].ability.name : 'N/A';

        tipopokemon.innerHTML = data.types[0].type.name;


        const altura = data.height / 10;
        const peso = data.weight / 10;
        alturapokemon.innerHTML = `Altura: ${altura} m`;
        pesopokemon.innerHTML = `Peso: ${peso} kg`;


        const evolucao = await buscarEvolucao(data.name);

        if (evolucao) {
            document.querySelector('#evolucao').innerHTML = `Evolução: ${evolucao.nome}`;
            document.querySelector('#img-evolucao').src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${evolucao.id}.gif`;
        } else {
            document.querySelector('#evolucao').innerHTML = 'Evolução: Ele não evolui ╯︿╰';
            document.querySelector('#img-evolucao').src = '#';
        }

        searchpokemon = data.id;
    }
};

var searchpokemon = 1;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

buttonprev.addEventListener('click', () => {
    if (searchpokemon > 1) {
        searchpokemon -= 1;
        renderPokemon(searchpokemon);
    }
});

buttonnext.addEventListener('click', () => {
    searchpokemon += 1;
    renderPokemon(searchpokemon);
});

renderPokemon(searchpokemon);