import './App.css';
import Layout from './components/Layout';
import Login from './components/pages/Login';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Regsiter from './components/pages/Regsiter';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Regsiter />} />
      </Route>
    </Routes>
  );
}

export default App;
