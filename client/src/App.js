import './App.css';
import Layout from './components/Layout';
import Login from './components/pages/Login';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Regsiter from './components/pages/Regsiter';
import { UserContextProvider } from './UserContext';
import CreatePost from './components/pages/CreatePost';
import PostPage from './components/pages/PostPage';
import EditPost from './components/pages/EditPost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Regsiter />} />
          <Route path='/create' element={<CreatePost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='/edit/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
