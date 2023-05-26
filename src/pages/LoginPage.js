import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const six = 6;

function LoginPage() {
  const history = useHistory();
  const [user, setUser] = useState({ email: '', password: '' });
  const [isDisabeld, setIsDisabeld] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });

    const VALIDATE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (user.password.length >= six
      && (VALIDATE_EMAIL.test(user.email))
    ) return setIsDisabeld(false);

    if (user.password.length < six
      || !(VALIDATE_EMAIL.test(user.email))
    ) return setIsDisabeld(true);
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email: user.email }));

    history.push('/foods');
  };

  return (
    <div>
      <div>
        <label htmlFor="email">
          <input
            id="email"
            type="text"
            name="email"
            value={ user.email }
            data-testid="email-input"
            placeholder="Username"
            onChange={ handleChange }
          />
          <label htmlFor="senha">
            <input
              id="senha"
              type="password"
              name="password"
              value={ user.password }
              data-testid="password-input"
              placeholder="Password"
              onChange={ handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ isDisabeld }
            onClick={ handleClick }
          >
            Login
          </button>
        </label>
      </div>
    </div>
  );
}

export default LoginPage;
