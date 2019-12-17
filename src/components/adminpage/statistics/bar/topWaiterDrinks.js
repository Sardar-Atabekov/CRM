import React, { Component } from "react";
import { getData, API } from "../../../requests";
import "./../blocks/styles.css";

class TopWaiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  async componentDidMount() {
    getData(`${API}/Admin/topWaitersBarMeals`).then(body => {
      this.setState({ data: body });
    });
  }
  render() {
    let { data } = this.state;
    data = data && data.sort((a, b) => b.meals - a.meals);
    console.log(data);
    return (
      <div className="topMeals">
        <div className="header">
          <h4>{this.props.name}</h4>
        </div>
        <ul className="meals">
          {data &&
            data.map((user, index) =>
              index < 8 ? (
                <li key={user.userId}>
                  {console.log(user)}
                  <span>{user.userName}</span>{" "}
                  <span className="sums">{user.meals}</span>
                </li>
              ) : (
                false
              )
            )}
        </ul>
        <div className="totalSelect">
          <select className="select">
            <option value="0">Общий </option>
            {/* <option value="1">Last Month</option>
            <option value="2">Last Week</option>
            <option value="3">Today</option> */}
          </select>
        </div>
      </div>
    );
  }
}

export default TopWaiter;
