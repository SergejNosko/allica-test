import * as React from 'react';
import { Link } from 'react-router-dom';

import type { CharacterCardProps, Planet } from '../../types';
import { getCharacterPlanet } from '../../api/character';
import './index.scss';

const { useState, useEffect } = React;

const CharacterCard: React.FC<CharacterCardProps> = ({
  name, gender, homeworld, url,
}) => {
  const [planet, setPlanet] = useState<Planet | null>(null);

  useEffect(() => {
    getCharacterPlanet(homeworld)
      .then((planetRes: Planet) => setPlanet(planetRes));
  }, []);

  const id = url.split('/').at(-2);

  return (
    <li className="character-card" data-testid="character-card">
      <Link to={`/details/${id}`} className="character-card__link">
        <div>
          <strong>Name: </strong>
          { name }
        </div>
        <div>
          <strong>Gender: </strong>
          { gender }
        </div>
        {planet && (
        <div>
          <strong>Planet: </strong>
          { planet.name }
        </div>
        )}
      </Link>
    </li>
  );
};

export default CharacterCard;
