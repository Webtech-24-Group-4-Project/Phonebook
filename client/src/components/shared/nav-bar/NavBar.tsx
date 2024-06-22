import React from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { logout, selectUser } from '../../../store/features/userSlice';


const NavBar: React.FC = () => {
    const dispatch = useAppDispatch();
    const username = useAppSelector(selectUser)?.username;
    const isLoggedIn = !!username;
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {isLoggedIn && (
                    <li>
                        <Link to="/contacts">Contacts</Link>
                    </li>
                )}
                {!isLoggedIn && (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                )}
            </ul>

            {isLoggedIn && (
                <div>
                    <span>Logged in as: {username}   </span>
                    <span><a onClick={handleLogout}>Logout</a></span>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
