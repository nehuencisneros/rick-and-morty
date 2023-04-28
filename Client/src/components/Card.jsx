import { Link } from "react-router-dom";
import { addFav, removeFav } from "../redux/actions";
import { connect } from "react-redux";
import { useState, useEffect } from "react";


function Card({id, name, status, species, gender, origin, image, onClose, addFav, removeFav, myFavorites}) {
   
   const[isFav, setIsFav] = useState(false);

   const handleFavorite = () => {
      if(isFav){
         setIsFav(false);
         removeFav(id);
      } 
      else {
         setIsFav(false);
         addFav({id, name, status, species, gender, image, onClose})
      }
   }

   useEffect(() => {
      myFavorites.forEach((fav) => {
         if (fav.id === id) {
            setIsFav(true);
         }
      });
   }, [myFavorites]);

   return (
      <div>
         
            <Link to={`/detail/${id}`}>
               <h2>Name: {name}</h2>
            </Link>   
            <h2>Status: {status}</h2>
            <h2>Specie: {species}</h2>
            <h2>Gender: {gender}</h2>

            <div style={{
               width: '15px',
            }}>
               <img src={image} alt='' />
            </div>

            <button onClick={() => onClose(id)}>X</button>

            <button onClick={handleFavorite}>{isFav ? '❤️' : '🤍'}</button>
            
      </div>
   );
}
const mapStateToProps = (state) => {
   return{
      myFavorites: state.myFavorites
   }
}

const mapDispatchToProps = (dispatch) => {
   return {
      addFav: (character) => { dispatch(addFav(character)) },
      removeFav: (id) => { dispatch(removeFav(id))}
   }
}

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Card);