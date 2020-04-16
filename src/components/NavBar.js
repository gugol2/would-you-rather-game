import React from 'react';
import '../styles/NavBar.scss';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <NavLink to='/' exact activeClassName='active'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/add' activeClassName='active'>
                        New Question
                    </NavLink>
                </li>
                <li>
                    <NavLink to='/leaderboard' activeClassName='active'>
                        LeaderBoard
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
