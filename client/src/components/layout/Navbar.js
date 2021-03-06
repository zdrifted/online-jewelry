import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/account'>Account</Link>
            </li>
            <li>
                <Link to='/cart'></Link>
            </li>
            <li>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt' />{' '}
                    <span className='hide-sm'>Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/about'>About</Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    GiftsFromEternity
          </Link>
            </h1>
            {!loading && (
                <>{isAuthenticated ? authLinks : guestLinks}</>
            )}
        </nav>
    );
};
Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

// we're creating an auth prop and setting it equal to our redux store's auth object aka the values we defined as initialState in our reducers/auth.js file
// we also have initialState defined in our store.js file but we defined default values in the reducer file
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);