import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomBotton from '../custom-button/custom-button.component';
import { signInWithGoogle } from '../../firebase/firebas.utils';

import './sign-in.styles.scss';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    this.setState({ email: '', password: '' });
  };

  handleChange = e => {
    e.preventDefault();
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };
  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            label="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            required
          />
          <FormInput
            name="password"
            label="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            required
          />
          <div className="buttons">
            <CustomBotton type="submit">Sign in</CustomBotton>
            <CustomBotton isGoogleSignIn onClick={signInWithGoogle}>
              Sign in with Google
            </CustomBotton>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
