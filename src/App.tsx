import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import CharacterList from './pages/characters-list';
import CharacterDetails from './pages/character-details';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<CharacterList />} />
      <Route path="/details/:id" element={<CharacterDetails />} />
    </Routes>
  </BrowserRouter>
);

export default App;
