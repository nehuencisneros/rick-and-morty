import axios from "axios"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"

const Detail = () => {
    const {id} = useParams()
    const [character, setCharacter] = useState({});

    useEffect(()=>{
        axios(`http://localhost:3001/rickandmorty/character${id}`)
        .then( response => response.data)
        .then((data) => {
            if(data.name) {
                setCharacter(data);
            } else {
                window.alert('No hay personajes con ese ID');
            }
        });
        return setCharacter({});
    }, [id]);

    return(
        <div>
            <button>
                <Link to='/home'>Home</Link>
            </button>

            <div>
                <h1>{character?.name}</h1>
                <label htmlFor="status">Status: </label>
                <p>{character?.status}</p>
                <label htmlFor="specie">Specie: </label>
                <p>{character?.species}</p>
                <label htmlFor="gender">Gender: </label>
                <p>{character?.gender}</p>
                <label htmlFor="origin">Origin: </label>
                <p>{character?.origin?.name}</p>
                <div>
                    <img src={character?.image} alt={character?.name} />
                </div>
            </div>
        </div>
    )
}

export default Detail