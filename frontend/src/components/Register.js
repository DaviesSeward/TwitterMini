import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';

import AppContext from '../AppContext/AppContext';

const Register = () => {

    const { dispatch } = useContext(AppContext);
    const [userInput, setUserInput] = useState({ email: "", password: "" });
    const [errorMessage, setErrorMessage] = useState(null);
    const history = useHistory();

    const onChangeHandle = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    }

    const onSubmitHandle = async (e) => {
        try {
            e.preventDefault();
            const option = { method: "post", url: "https://mighty-dusk-05196.herokuapp.com/api/auth/register", data: userInput }
            const response = await axios(option);
            const { token, userName } = response.data.data;
            localStorage.setItem("token", token);
            dispatch({ type: "CURRENT_USER", payload: { userName } })
            history.push('/');
        } catch (error) {
            setErrorMessage(error.response.data.message)
        }
    }

    return (
        <div>
            <section className="auth-container">
                <form className="auth-form" onSubmit={onSubmitHandle}>
                    <h2>Register New Account</h2>
                    {
                        errorMessage && (
                            Array.isArray(errorMessage)
                                ? errorMessage.map((error) => <div className="error-message">Error: {error}</div>)
                                : <div className="error-message">Error: {errorMessage}</div>
                        )
                    }
                    <input type="text" name="name" placeholder="Name" onChange={onChangeHandle} />
                    <input type="email" name="email" placeholder="Email" onChange={onChangeHandle} />
                    <input type="password" name="password" placeholder="Password" onChange={onChangeHandle} />
                    <button className="btn" type="submit">Register</button>
                </form>
            </section>
        </div>
    );
};

export default Register;