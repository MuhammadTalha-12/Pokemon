import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Axios from 'axios';

function App() {
  const [pokemonName,setpokemonName]=useState("");
  const [pokemonChosen,setpokemonChosen]=useState(false);
  const [pokemon,setpokemon]=useState({
    name: "",
    species: "",
    img: "",
    hp:  "",
    attack:  "",
    defense:  "",
    type :  "",
  });


  const searchPokemon=()=>{
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=>{
       setpokemon({
        name:pokemonName,
        species:response.data.species.name,
        img: response.data.sprites.front_default,
        hp: response.data.stats[0].base_stat,
        attack: response.data.stats[1].base_stat,
        defense: response.data.stats[2].base_stat,
        type : response.data.types[0].type.name,
       });
       setpokemonChosen(true);
    }
    );

  };
  

  return (
    <>
    <div className='App'>
      <div className='TitleSection'> 
        <h1>Pokemon Stat</h1>
        <input type='text' onChange={(event)=>{setpokemonName(event.target.value);
        }}
        />
        <button onClick={searchPokemon}>Search</button>
      </div>
      <div className='DisplaySection'>
        {!pokemonChosen ? (
          <h1>Please Choose a Pokemon</h1>
        ):(
          <>
           <h1>{pokemon.name}</h1>
           <img src={pokemon.img}/>
           <h3>Species : {pokemon.species}</h3>
           <h3>Type    : {pokemon.type}</h3>
           <h4>Hp      : {pokemon.hp}</h4>
           <h4>Defense      : {pokemon.defense}</h4>
           <h4>Attack      : {pokemon.attack}</h4>
          </>
        )
        }
      </div>
    </div>
    </>
     
  )
}

export default App
