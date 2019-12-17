import React, { Component } from "react";
import { getData, API } from "../../../requests";
import TopWaiterGraphics from "../graphics/topWaiterSumGraphics";
import "./styles.css";

class TopWaiter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  async componentDidMount() {
    getData(`${API}/Admin/waiterSumTop`).then(body => {
      this.setState({ data: body });
    });
  }
  render() {
    let { data } = this.state;
    data = data && data.sort((a, b) => b.sum - a.sum);
    return (
      <div className="topMeals">
        <div className="header">
          <h4>{this.props.name}</h4>
        </div>
        <ul className="meals">
          {data.map((user, index) =>
            index < 8 ? (
              <li key={user.id}>
                <span>{user.userName}</span>{" "}
                <span className="sums">{user.sum} сом</span>
              </li>
            ) : (
              false
            )
          )}
        </ul>
        <div className="totalSelect">
          <select className="select">
            <option value="0">Общая </option>
            {/* <option value="1">Last Month</option>
            <option value="2">Last Week</option>
            <option value="3">Today</option> */}
          </select>
        </div>
        {data && data.length > 0 ? <TopWaiterGraphics data={data} /> : null}
      </div>
    );
  }
}

export default TopWaiter;
