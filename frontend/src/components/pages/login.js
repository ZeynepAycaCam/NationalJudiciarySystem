import React from 'react';
import { login } from '@/api/data';
import { Button, Card, Input, Link, Title } from '@/components/ui';
import PublicLayout from '@/components/layouts/publicLayout';

import store from '@/store';
import { authUser } from '@/actions';

import { LOGIN_TYPES } from '@/constants';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      type: "",
      username: "",
      password: "",
      error: ""
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    let search = this.props.location.search;
    let type = search.replace('?type=', '');
    this.setState({ type: type });
  }

  async login() {
    const { type, username, password } = this.state;

    if (!LOGIN_TYPES.includes(type)) {
      const error = "Empty type!";
      this.setState({ error });
      return;
    }

    if (username === "" || password === "") {
      const error = "Username or Password field is empty!";
      this.setState({ error });
      return;
    }

    const result = await login(type, username, password);


    if (result.response && result.response.status === 400) {
      const error = result.response.data.err;
      this.setState({ error });
      return;
    }

    if (result.config || result.request || result.response) {
      console.log("Error: ", result.request.status, result.request.statusText);
      const error = result.request.statusText;
      this.setState({ error });
      return;
    }

    store.dispatch(authUser(result, type));
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { type, error } = this.state;
    return (
      <div className="flex flex-col items-center mt-20 text-center h-full">
        <div className="w-3/12">
          <Card applyPadding={false} shadow="md" extraClassName="px-6 py-4">
            <Title type="h5">Login as {type}</Title>
            <hr />
            {!LOGIN_TYPES.includes(type) ?
              <select name="type" onChange={this.onChange}>
                <option value="">Please select a user type</option>
                <option value="citizen">Citizen</option>
                <option value="lawyer">Lawyer</option>
                <option value="judge">Judge</option>
                <option value="conciliator">Conciliator</option>
              </select> : null}
            <hr />
            <div className="flex flex-col my-2">
              <Input type="text" size="large" placeholder="TCK No" onChange={(e) => this.setState({ username: e.target.value })} />
              <hr />
              <Input type="password" size="large" placeholder="Password" onChange={(e) => this.setState({ password: e.target.value })} />
              <hr />
              <div className="flex items-center">
                <div className="flex items-center w-6/12">
                  <Input type="checkbox" />
                  <p className="mx-2">Remember me</p>
                </div>
                <div className="flex justify-end items-center w-6/12">
                  <Link url="/register">Create an account!</Link>
                </div>
              </div>
              <hr />
              <p className="p-2 text-red">{error}</p>
              <hr />
              <Button onClick={this.login} size="large" label="Login" />
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

export default PublicLayout(Login);