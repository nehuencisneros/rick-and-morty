import Cards from './components/Cards.jsx';
import Nav from './components/Nav';
import Form from './components/Form';
import About from './components/About';
import Detail from './components/Detail';
import Favorites from './components/Favorites.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const URL_BASE = 'https://be-a-rym.up.railway.app/api/character';
const API_KEY = 'c291b8e2fce4.a3d3a4d28d3522cc7205';

const email = 'nehue@gmail.com'
const password = '123asd'

function App() {

   const location = useLocation();
   const [characters, setCharacters] = useState([]);
   const navigate = useNavigate();
   const [access, setAccess] = useState(false);

   const login = (userData) => {
         if(userData.email === email && userData.password === password ){
            setAccess(true)
            navigate('/home');
         }
   }
   
   useEffect(() => {
      !access && navigate('/');  
      
   }, [access]);

   const onSearch = (id) => {
      axios(`${URL_BASE}/${id}?key=${API_KEY}`).then(response => response.data).then((data) => {
         if (data.name) {
            setCharacters((oldChars) => [...oldChars, data]);
         } else {
            window.alert('¡No hay personajes con este ID!');
         }
      });
   }

   const onClose = (id) => {
      const charactersFiltered = characters.filter(character => character.id !== id)
         setCharacters(charactersFiltered)
   }

   
   return (
      <div className='App'>
         {  location.pathname !== '/' && <Nav onSearch={onSearch}/>   } {/* setAccess={setAccess} */}
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