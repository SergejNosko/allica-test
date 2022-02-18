/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import CharactersList from '../src/pages/characters-list';
import type { CharacterCardProps } from '../src/types';

const mockCharacters: CharacterCardProps[] = [
  {
    name: 'name',
    gender: 'male',
    homeworld: 'homeworld',
    url: 'url',
  },
];

jest.mock('../src/api/character', () => ({
  getCharactersList: () => Promise.resolve({ results: mockCharacters }),
}));

jest.mock('../src/components/character-card', () => () => <li data-testid="character-card" />);

describe('CharactersList', () => {
  it('should render a list with characters', async () => {
    const wrapper = render(<BrowserRouter><CharactersList /></BrowserRouter>);

    await waitFor(() => wrapper.getByTestId('character-card'));

    expect(wrapper.getByTestId('characters-list')).toBeInTheDocument();
    expect(wrapper.getAllByTestId('character-card').length).toBe(mockCharacters.length);
  });
});
