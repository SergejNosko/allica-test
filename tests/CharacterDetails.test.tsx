/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import CharacterDetails from '../src/pages/character-details';
import type { Character, Planet, Film } from '../src/types';

const mockCharacter: Character = {
  name: 'name',
  gender: 'male',
  homeworld: 'homeworld',
  url: 'url',
  hair_color: 'hair_color',
  eye_color: 'eye_color',
  films: ['films'],
};

const mockPlanet: Planet = {
  name: 'planet',
};

const mockFilms: Film[] = [{
  title: 'title',
}];

jest.mock('../src/api/character', () => ({
  getCharacterDetails: () => Promise.resolve(mockCharacter),
  getCharacterFilms: () => Promise.resolve(mockFilms),
  getCharacterPlanet: () => Promise.resolve(mockPlanet),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: 1 }),
}));

describe('CharactersList', () => {
  it('should render character info with planet and films', async () => {
    const wrapper = render(<BrowserRouter><CharacterDetails /></BrowserRouter>);

    await waitFor(() => wrapper.getByTestId('character-details'));

    expect(wrapper.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(wrapper.getByText(mockCharacter.eye_color)).toBeInTheDocument();
    expect(wrapper.getByText(mockCharacter.hair_color)).toBeInTheDocument();
    expect(wrapper.getByText(mockCharacter.gender)).toBeInTheDocument();
    expect(wrapper.getByText(mockPlanet.name)).toBeInTheDocument();
    expect(wrapper.getByTestId('character-films-list')).toBeInTheDocument();
    expect(wrapper.getAllByTestId('character-film').length).toBe(mockFilms.length);
  });

  it('should be able to enable edit mode by clicking on edit button', async () => {
    const wrapper = render(<BrowserRouter><CharacterDetails /></BrowserRouter>);

    await waitFor(() => wrapper.getByTestId('character-details'));

    fireEvent.click(wrapper.getByTestId('edit-button'));

    expect(wrapper.getByTestId('gender-select')).toBeInTheDocument();
    expect(wrapper.getByTestId('save-button')).toBeInTheDocument();
    expect(wrapper.getByTestId('cancel-button')).toBeInTheDocument();
  });

  it('should be able to change the gender from edit mode', async () => {
    const wrapper = render(<BrowserRouter><CharacterDetails /></BrowserRouter>);

    await waitFor(() => wrapper.getByTestId('character-details'));

    fireEvent.click(wrapper.getByTestId('edit-button'));

    fireEvent.change(wrapper.getByTestId('gender-select'), {
      target: { value: 'female' },
    });

    fireEvent.click(wrapper.getByTestId('save-button'));

    expect(wrapper.getByText('female')).toBeInTheDocument();
    expect(wrapper.queryByTestId('gender-select')).not.toBeInTheDocument();
    expect(wrapper.queryByTestId('save-button')).not.toBeInTheDocument();
    expect(wrapper.queryByTestId('cancel-button')).not.toBeInTheDocument();
  });

  it('should be able to enable edit mode by clicking on edit button', async () => {
    const wrapper = render(<BrowserRouter><CharacterDetails /></BrowserRouter>);

    await waitFor(() => wrapper.getByTestId('character-details'));

    fireEvent.click(wrapper.getByTestId('edit-button'));
    fireEvent.click(wrapper.getByTestId('cancel-button'));

    expect(wrapper.queryByTestId('gender-select')).not.toBeInTheDocument();
    expect(wrapper.queryByTestId('save-button')).not.toBeInTheDocument();
    expect(wrapper.queryByTestId('cancel-button')).not.toBeInTheDocument();
  });
});
