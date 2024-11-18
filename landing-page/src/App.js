import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './styles/App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Menu from './pages/Menu';
import Upload from './pages/Upload';
import Book from './pages/Book';
import Generation from './pages/Generation';

function App() {
  return (
    <Router>
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/upload" element={<Upload />} />
          <Route path="/menu/book/:name" element={<Book />} />
          <Route path="/menu/book/:name/:title" element={<Generation />} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
