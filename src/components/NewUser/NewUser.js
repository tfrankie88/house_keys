import React, { Component } from 'react';
import update from 'react-addons-update';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class NewUser extends Component {
    constructor(props) {
      super(props);

      this.state = {
        user: {
          first_name: '',
          last_name: '',
          email: '',
          username: '',
          password_digest: ''
        }
      };
    }

  handleChange(event) {
    let newState = update(this.state, {
      user: {
        $merge: {
          [event.target.name]: event.target.value
        }
      }
    })

    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();

    fetch(`http://localhost:8000/users/new`, {
      method: "POST",
      body: JSON.stringify({user: this.state.user}),
      headers: {
        "Content-Type": 'application/json'
      }
    })
    .then((results) => {
      results.json().then((jwt) => {
        let authUser = jwt.user;
        window.localStorage.setItem('token', jwt.token);
        window.localStorage.setItem('user', JSON.stringify(authUser));
        browserHistory.push('/dashboard');
        console.log(jwt.token)
        console.log(jwt.user)
      });
    })
    .catch((err) => {
        alert('Not authenticated!');
    });
  }

    render(){
      return(
        <div>
          <nav>
            <h1>Sign Up</h1>
            <form onSubmit={this.handleSubmit.bind(this)} className="">
              <div className="">
                First Name
              </div>
              <div className="">
                <input name="first_name" placeholder="first name" onChange={this.handleChange.bind(this)}></input>
              </div>
              <div className="">
                Last Name
              </div>
              <div className="">
                <input  name="last_name" placeholder="last name" onChange={this.handleChange.bind(this)}></input>
              </div>
              <div className="">
                Email
              </div>
              <div className="">
                <input name="email" placeholder="email" onChange={this.handleChange.bind(this)}></input>
              </div>
              <div className="">
                Username
              </div>
              <div className="">
                <input name="username" placeholder="username" onChange={this.handleChange.bind(this)}></input>
              </div>
              <div className="">
                Password
              </div>
              <div className="">
                <input onChange={this.handleChange.bind(this)} name="password_digest" placeholder="password"></input>
              </div>
              <button href="/dashboard" type="submit">Submit</button>
            </form>
          </nav>
        </div>
      )
    }
}

export default NewUser;
