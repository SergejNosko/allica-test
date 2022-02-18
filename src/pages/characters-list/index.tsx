import * as React from 'react';

import CharacterCard from '../../components/character-card';
import type { Character } from '../../types';
import { getCharactersList } from '../../api/character';
import './index.scss';

const { useEffect, useState } = React;

const CharactersList = () => {
  const [charactersList, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    getCharactersList()
      .then(({ results }: { results: Character[] }) => setCharacters(results));
  }, []);

  return (
    <ul className="characters-list" data-testid="characters-list">
      {charactersList.map((character) => (
        <CharacterCard key={character.name} {...character} />
      ))}
    </ul>
  );
};

export default CharactersList;
