import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import AppContext from '../AppContext/AppContext';

const Header = () => {

    const { state, dispatch } = useContext(AppContext);
    const { user } = state;

    const signOut = () => {
        localStorage.removeItem("token");
        dispatch({ type: "CURRENT_USER", payload: null });
    }

    return (
        <div>
            <header className="header">
                <h1 className="logo"><Link to="/">Twiter</Link></h1>
                <nav>
                    <ul className="main-nav">
                        {user ? <>
                            <li><span className="user-name">Hello {user.userName}</span></li>
                            <li onClick={signOut}><Link to="/">Sign out</Link></li>
                        </> : <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                        }
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default Header;