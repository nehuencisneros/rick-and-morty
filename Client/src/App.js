import Cards from './components/Cards.jsx';
import Nav from './components/Nav';
import Form from './components/Form';
import About from './components/About';
import Detail from './components/Detail';
import Favorites from './components/Favorites.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

// const email = 'nehue@gmail.com'
// const password = '123asd'

const URL = 'http://localhost:3001/rickandmorty/login';

function App() {

   const location = useLocation();
   const [characters, setCharacters] = useState([]);
   const navigate = useNavigate();
   const [access, setAccess] = useState(false);

   const login = async (userData) => {
      try {
         const { email, password } = userData;
         const { data } = await axios(URL + `?email=${email}&password=${password}`)
         const { access } = data;

         setAccess(access);
         access && navigate('/home');

      } catch (error) {
         console.log(error.message);
      }
   }
   
   useEffect(() => {
      !access && navigate('/')
      
   }, [access, navigate]);

   const onSearch = async (id) => {
      try {
         const { data } = await axios(`http://localhost:3001/rickandmorty/character/${id}`);
         if(data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         };
      } catch (error) {
         alert('¡No hay personajes con este ID!');
      }
   };

   const onClose = (id) => {
      const charactersFiltered = characters.filter(character => character.id !== id)
         setCharacters(charactersFiltered)
   }

   
   return (
      <div className='App'>
         {  location.pathname !== '/' && <Nav onSearch={onSearch} setAccess={setAccess}/>   } 
         <Routes>
            <Route path='/' element={ <Form login={login}/>} />
            <Route path='/home' element={ <Cards characters={characters} onClose={onClose} /> }/>
            <Route path='/about' element={<About/>}/>
            <Route path='/detail/:id' element={<Detail/>}/>
            <Route path='/favorites/:id' element={<Favorites/>}/>
         </Routes>
      </div>
   );
}

export default App;