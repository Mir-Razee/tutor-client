import React, { Component } from "react";
import axios from "axios";
import "./createroom.css";

class CreateRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentuser_id:"",
        user_id: "",
        room_name: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const l=[];
			axios.get(`https://online-tutor-portal.herokuapp.com/users/${this.state.currentuser_id}`)
			.then((res)=>{
				l.push(res.data._id);
			})
			.catch(error=>console.error(error));
      axios.get(`https://online-tutor-portal.herokuapp.com/users/${this.state.user_id}`)
			.then((res)=>{
				l.push(res.data._id);
			})
			.catch(error=>console.error(error));
    const req={name:this.state.room_name,userIds:l,type:"consumer-to-support"};
    axios.post(`https://online-tutor-portal.herokuapp.com/room/initiate`, req)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  render() {
    const { room_name,user_id,currentuser_id } =
      this.state;
    return (
      <div>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-body">
            <div>
              <label className="form__label">Room Name: </label>
              <input
                className="form__input"
                type="text"
                name="room_name"
                value={room_name}
                onChange={this.handleChange}
              ></input>
            </div>
            <div>
              <label className="form__label">User id: </label>
              <input
                className="form__input"
                type="text"
                name="user_id"
                value={user_id}
                onChange={this.handleChange}
              ></input>
            </div>
            <div>
              <label className="form__label">Your User id: </label>
              <input
                className="form__input"
                type="text"
                name="currentuser_id"
                value={currentuser_id}
                onChange={this.handleChange}
              ></input>
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateRoom;