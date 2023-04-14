import { useState } from "react";
import validation  from "./Validation";

const Form = ( {login}) => {
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    
    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value 
        })

        setErrors(validation({
            ...userData,
            [event.target.name]: event.target.value 
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        login(userData);
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input type="text" name="email" value={userData.email} onChange={handleChange}></input>
            { errors.email && <p>{errors.email}</p> }
            <hr></hr>
            <label htmlFor="password">Password:</label>
            <input type="text" name="password" value={userData.password} onChange={handleChange}></input>
            { errors.password && <p>{errors.password}</p> }
            <hr></hr>
            <button >Submit</button>
        </form>
    )
}

export default Form;