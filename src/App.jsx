import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Gomoku from './pages/Gomoku';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gomoku" element={<Gomoku />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
