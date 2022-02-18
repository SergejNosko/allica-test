import * as React from 'react';
import { useParams } from 'react-router-dom';

import { Character, Film, Planet } from '../../types';
import {
  getCharacterDetails,
  getCharacterFilms,
  getCharacterPlanet,
} from '../../api/character';
import './index.scss';

const { useEffect, useState } = React;

const CharacterDetails = () => {
  const { id } = useParams();
  const [characterToDisplay, setCharacter] = useState<Character | null>(null);
  const [filmsToDisplay, setFilms] = useState<Film[]>([]);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [isEditMode, setEditMode] = useState(false);
  const [newGender, setNewGender] = useState<Character['gender'] | null>();

  useEffect(() => {
    if (id) {
      getCharacterDetails(id)
        .then((character) => { setCharacter(character); });
    }
  }, []);

  useEffect(() => {
    if (characterToDisplay) {
      getCharacterFilms(characterToDisplay)
        .then((films) => { setFilms(films); });
    }
  }, [characterToDisplay]);

  useEffect(() => {
    if (characterToDisplay) {
      getCharacterPlanet(characterToDisplay.homeworld)
        .then((planetRes) => setPlanet(planetRes));
    }
  }, [characterToDisplay]);

  const handleEditCancel = () => {
    setEditMode(false);
    setNewGender(null);
  };

  const handleEditEnable = () => { setEditMode(true); };

  const handleSave = () => {
    if (newGender && characterToDisplay) {
      handleEditCancel();
      setCharacter({ ...characterToDisplay, gender: newGender });
    }
  };

  const handleGenderSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    if (value) {
      setNewGender(value as Character['gender']);
    }
  };

  return characterToDisplay && (
  <section className="character-details" data-testid="character-details">
    <h1>{ characterToDisplay.name }</h1>
    <h2>Info</h2>
    <ul className="character-details__list">
      <li><strong>Hair color: </strong><span>{ characterToDisplay.hair_color }</span></li>
      <li><strong>Eye color: </strong><span>{ characterToDisplay.eye_color }</span></li>
      <li>
        <strong>Gender: </strong>
        {isEditMode
          ? (
            <select
              value={newGender || characterToDisplay.gender}
              onChange={handleGenderSelectChange}
              data-testid="gender-select"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="n/a">N/A</option>
            </select>
          )
          : <span>{ characterToDisplay.gender }</span>}

      </li>
      {planet && <li><strong>Home planet: </strong><span>{ planet.name }</span></li>}
    </ul>
    <h2>Films</h2>
    <ul className="character-details__list" data-testid="character-films-list">
      { filmsToDisplay.map((film) => (
        <div key={film.title} data-testid="character-film">{ film.title }</div>
      )) }
    </ul>
    {isEditMode
      ? (
        <>
          <button
            className="character-details__button"
            onClick={handleEditCancel}
            type="button"
            data-testid="cancel-button"
          >
            Cancel
          </button>
          <button
            className="character-details__button"
            onClick={handleSave}
            type="button"
            data-testid="save-button"
          >
            Save
          </button>
        </>
      )
      : (
        <button
          className="character-details__button"
          onClick={handleEditEnable}
          type="button"
          data-testid="edit-button"
        >
          Edit
        </button>
      )}
  </section>
  );
};

export default CharacterDetails;
