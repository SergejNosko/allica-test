import { Character } from '../types';

const getCharacterDetails = (id: string) => fetch(`https://swapi.dev/api/people/${id}`)
  .then((res) => res.json());

const getCharacterFilms = (character: Character) => Promise.all(
  character.films.map((film) => fetch(film)),
).then((responses) => Promise.all(responses.map((res) => res.json())));

const getCharacterPlanet = (homeworld: Character['homeworld']) => fetch(homeworld)
  .then((res) => res.json());

const getCharactersList = () => fetch('https://swapi.dev/api/people?page=1')
  .then((peopleRes) => peopleRes.json());

export {
  getCharacterDetails,
  getCharacterFilms,
  getCharacterPlanet,
  getCharactersList,
};
