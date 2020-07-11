import React, { Component } from 'react';
import AddExercise from './components/AddExercise';
import EditExercise from './components/EditExercise';
import './App.css';

class App extends Component {

  state = {
    users:[],
    formInputs: {
      name: '',
      calories: 0,
      time: 0,
      weight: ''
    }
  }



  componentDidMount () {
    this.getData()
  }

 getData = () =>{
    fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(json => this.setState({users:json}))
    .catch(err => console.log(err))
  }

  deleteExercise(id, index) {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE"
    })
    .then (data => {
      this.setState({
        users: [
          ...this.state.users.slice(0, index),
          ...this.state.users.slice(index+1)
        ]
      })
    })
  }
  

  render(){
    return (
      <div className="App">
        <h1>Hello World</h1>
      <AddExercise />
        <div>
          {this.state.users.map ((user, i) =>{
            return (
              <div key={user.id}>
                <h3>{user.name}</h3>
                <p>{user.calories}</p>
                <p>{user.weight}</p>
                <p>{user.time}</p>
                <button key={user.id} onClick={()=> {this.deleteExercise(user.id, i)}}>Delete</button>
                <button key={user.id} onClick={<EditExercise user={this.state.user}/>}>Edit</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default App;
