/** @format
 * Short instructions
 * ------------------
 * Use the given template with props to create a AuthUser component. Instead of using a template, use JSX.
 *
 * isLoggedIn is a prop boolean that indicates if the user is logged in or not.
 * onLogin is a prop function that will be called when the form is submitted and user is in "login" view. It should be called with the username and password as arguments.
 * onRegister is a prop function that will be called when the form is submitted and user is in the "register" view. It should be called with the username and password as arguments.
 * onLogout is a prop function that will be called when the logout link is clicked. It should be called with no arguments.
 * 
  The functionality of this component is two fold: 
  1. Display a link that toggles between "Go to login", "Go to register", and "Logout" depending on the value of the isLoggedIn prop: By default, it is "Go to register", when the user is not logged in.  
  - User logged in: display "Logout". The link should emit a logout event when clicked.
  - User not logged in and in login: display "Go to register". 
  - User not logged in and in register: display "Go to login".
  
  2. When user is trying to log in or register, the component should display a form with two input fields and a submit button. The form should have an id of "auth-form". It should submit the username and password to the submit function when submitted. The input fields should be required.

  - One input field for username with an id of "username", name of "auth-username" and type of "text".
  - One input field for password with an id of "password", name of "auth-password" and type of "password".
  - A submit button with a class of "btn-auth" with the text "login" or "register" depending on the current state of the component. If the user is trying to login, the button should say "login" and emit a "login" event with the username and password. If the user is trying to register, the button should say "register" and emit a "register" event with the username and password.

  Once user is logged in or registered, the form should be hidden and the link should change to "Logout". 

 *
 * REMEMBER: use the correct ids, classes and attributes in the correct places to pass the tests.
 */

import React, { useState } from 'react';

export const AuthUser = ({ isLoggedIn, onLogin, onRegister, onLogout }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      onLogin(username, password);
    } else {
      onRegister(username, password);
    }
  };

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  if (isLoggedIn) {
    return <a href="#" onClick={onLogout}>Logout</a>;
  }

  return (
    <div>
      <a href="#" onClick={toggleView}>
        {isLoginView ? "Go to register" : "Go to login"}
      </a>
      <form id="auth-form" onSubmit={handleSubmit}>
        <input
          id="username"
          name="auth-username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          id="password"
          name="auth-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-auth">
          {isLoginView ? "login" : "register"}
        </button>
      </form>
    </div>
  );
};
