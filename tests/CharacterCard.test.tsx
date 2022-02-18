/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import type { Planet, CharacterCardProps } from '../src/types';
import CharacterCard from '../src/components/character-card';

const mockPlanet: Planet = {
  name: 'planet',
};

const props: CharacterCardProps = {
  name: 'name',
  gender: 'male',
  homeworld: 'homeworld',
  url: '/1/',
};

jest.mock('../src/api/character', () => ({
  getCharacterPlanet: () => Promise.resolve(mockPlanet),
}));

describe('CharacterCard', () => {
  it('should render name, gender and not render planet if not presented', () => {
    const wrapper = render(
      <BrowserRouter>
        <CharacterCard {...props} />
      </BrowserRouter>,
    );

    expect(wrapper.getByText(props.name)).toBeInTheDocument();
    expect(wrapper.getByText(props.gender)).toBeInTheDocument();
    expect(wrapper.queryByText(mockPlanet.name)).not.toBeInTheDocument();
  });

  it('should render name, gender and not render planet if not presented', async () => {
    const wrapper = render(
      <BrowserRouter>
        <CharacterCard {...props} />
      </BrowserRouter>,
    );

    await waitFor(() => wrapper.getByText(mockPlanet.name));

    expect(wrapper.getByText(props.name)).toBeInTheDocument();
    expect(wrapper.getByText(props.gender)).toBeInTheDocument();
    expect(wrapper.getByText(mockPlanet.name)).toBeInTheDocument();
  });
});
