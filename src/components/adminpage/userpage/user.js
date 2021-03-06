import React, { Component } from "react";
import Navigation from "../../block/navigation.js";
import Search from "../../block/search.js";
import Footer from "../../block/footer.js";
import ModalWindow from "./../../modalWindow/modalWindow";
import { getData, API, putData } from "../../requests.js";
import "./users.css";
import "./adduser.css";
import Loading from "../../loading/loading";
class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      error: null,
      message: "Подождите...",
      status: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    let formData = new FormData(event.target),
      data = {};
    data.id = event.target.getAttribute("userid");

    formData.forEach(function(value, key) {
      data[key] = value;
    });

    putData(`/users/${data.id}`, data).then(res => {
      console.log(res);
      if (res.status !== "error") {
        this.setState({
          message: "Данные успешно добавлены!",
          status: true
        });
      } else {
        this.setState({
          message: res.message,
          status: true
        });
      }
    });
  }

  async componentDidMount() {
    getData(`${API}/users/${this.props.match.params.id}/`).then(body => {
      this.setState({ data: body, isLoading: false });
      console.log(body);
    });
  }

  render() {
    let { data } = this.state;
    console.log(data);

    return (
      <div className="wrapper">
        <aside className="navBlock">
          <Navigation />
        </aside>
        <div className="container">
          <header className="main-search">
            <Search />
          </header>
          {this.state.isLoading ? <Loading/> : (
            <main className="addUserContent">
              <div className="card-header p-0">
                <div className="edit-user-details__bg">
                  <img
                    src="https://www.texasheart.org/wp-content/uploads/2018/08/thi-christmas-lights-defocused-background-Bokeh-Gold-Blue.jpg"
                    alt="BackgroundImage"
                  />
                </div>
              </div>
              <div className="formBlock">
                <div className="title-block">
                  <div className="form-title">
                    <h6 className="form-text">User profile</h6>
                    <p className="form-text">
                      Configure general user profile information
                    </p>
                  </div>
                </div>

                <form
                  className="form"
                  userid={data.id}
                  key={data.id}
                  onSubmit={this.handleSubmit}
                >
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        id="firstName"
                        defaultValue={data.firstName}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        className="form-control"
                        required
                        id="lastName"
                        defaultValue={data.lastName}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dateBorn">Date Born</label>
                      <input
                        type="text"
                        name="dateBorn"
                        required
                        className="form-control"
                        id="dateBorn"
                        defaultValue={data.dateBorn}
                        // pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))"
                      />
                      {/* pattern="(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))" */}
                    </div>

                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        className="select"
                        defaultValue={data.gender}
                        onChange={this.handleInputChange}
                      >
                        <option value="Мужчина">Мужчина</option>
                        <option value="Женщина">Женщина</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="phoneNumber">Phone Number</label>
                      <input
                        type="tel"
                        name="phoneNumber"
                        pattern="^\(?\+([9]{2}?[6])\)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{3})$"
                        required
                        className="form-control"
                        id="phoneNumber"
                        defaultValue={data.phoneNumber}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        required
                        name="email"
                        className="form-control"
                        id="email"
                        defaultValue={data.email}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="login">Login</label>
                      <input
                        type="login"
                        required
                        name="login"
                        className="form-control"
                        id="login"
                        defaultValue={data.login}
                        onChange={this.handleInputChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        required
                        name="password"
                        className="form-control"
                        id="password"
                        defaultValue={data.password}
                        onChange={this.handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="startWorkDay">Start Work Day</label>
                      <input
                        type="text"
                        required
                        className="form-control"
                        name="startWorkDay"
                        id="startWorkDay"
                        defaultValue={data.startWorkDay}
                        onChange={this.handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="role">Role</label>
                      <select
                        id="role"
                        className="select"
                        name="role"
                        defaultValue={data.role}
                      >
                        <option value="3">Официант</option>
                        <option value="2">Повар</option>
                        <option value="4">Бармен</option>
                        <option value="1">Админ</option>
                      </select>
                    </div>
                  </div>
                  <div className="userProfilePicture">
                    <label htmlFor="userProfilePicture" className="text-center">
                      Profile Picture
                    </label>
                    <div className="user__avatar">
                      <img
                        src="http://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
                        alt="User Avatar"
                      />
                      <label className="user__avatar__change">
                        <input
                          type="file"
                          id="userProfilePicture"
                          className="d-none"
                        />
                      </label>
                    </div>
                  </div>
                  <div className="commentBlock">
                    <label htmlFor="comment">Comment</label>
                    <br />
                    <textarea
                      id="comment"
                      name="comment"
                      defaultValue={data.comment}
                      className="form-control"
                    ></textarea>
                  </div>
                  <input
                    type="submit"
                    className="btn btnSumbit"
                    value="Изменить"
                  />
                </form>
              </div>
            </main>
          )}
          <footer className="main-footer">
            <Footer />
          </footer>
        </div>
        {this.state.status ? (
          <ModalWindow
            message={this.state.message}
            statusModal={() => this.setState({ status: false })}
            status={this.state.status}
          />
        ) : null}
      </div>
    );
  }
}

export default UserPage;
