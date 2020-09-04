import React, { useState, useEffect } from 'react';
import PokemonApi from '../../services/pokemon.service';
import axios from 'axios';
import { UpperFirstLetter } from '../../utils';
import { isNullOrUndefined } from 'util';

function Card (props){
    
    const [pokemonInfo, setPokemonInfo] = useState({});

    useEffect(() => {
        async function loadPokemonInfo() {
            const responseInfo = await PokemonApi.get(`/pokemon/${props.pokemonName}`);
            setPokemonInfo(responseInfo.data);
        }
        
        loadPokemonInfo();
    }, [props.pokemonName]);

    if(pokemonInfo && pokemonInfo.sprites){
        return(
           <li className="media border border-dark mb-1">
               <img 
               className="mr-3"
               src={pokemonInfo.sprites.front_default}
               alt={props.pokemonName} 
               />
               <div className="media-body">
                    <h5 className="mt-0 mb-1">{UpperFirstLetter(props.pokemonName)}</h5>
                    {pokemonInfo.types.map((type, index) => (<span key={index} className="badge badge-dark mr-1">{UpperFirstLetter(type.type.name)}</span>))}
               </div>
           </li>
        );
    }
    else{
        return null;
    }
};

export default function List() {
    const [pokemons, setPokemons] = useState([]);
    const [next, setNext] = useState(null);
    const [previous, setPrevious] = useState(null);

    useEffect(() => {
        async function loadPokemons() {
            const { data } = await PokemonApi.get('/pokemon');
            setPokemons(data.results);
            setNext(data.next);
            setPrevious(data.previous);
        }

        loadPokemons();
    }, []);


    async function handleOnClick(url) {
        const { data } = await axios.get(url);
        setPokemons(data.results);
        setNext(data.next);
        setPrevious(data.previous);
    }

    return (
        <>
        <div className="mt-5" style={{ height: '500px', overflow: 'auto' }}>
            <ul className="list-unstyled">  
            {pokemons.map((pokemon, index) => (
                <Card key={index} pokemonName={pokemon.name} pokemonUrl={pokemon.url} />
            ))}
            </ul>
        </div>
        <div className="row mt-5">
            <div className="col-12">
                <button disabled={isNullOrUndefined(previous)} onClick={() => handleOnClick(previous)} className="btn btn-light" type="button">Anterior</button>
                <button disabled={isNullOrUndefined(next)} onClick={() => handleOnClick(next)} className="btn btn-light" type="button">Próximo</button>
            </div>
        </div>
        </>
    );
}