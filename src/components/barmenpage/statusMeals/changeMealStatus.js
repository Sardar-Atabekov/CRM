import React, { Component } from "react";
import { Link } from "react-router-dom";
import { putData, getData, API } from "../../requests";
import Loading from "./../../loading/loading";

class MealsBarmenPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      error: null,
      categoryData: []
    };

    this.handleSelectCategory = this.handleSelectCategory.bind(this);
  }

  async componentDidMount() {
    getData(`${API}/Categories`).then(categoryData => {
      categoryData = categoryData.filter(meal => meal.departmentName === "Bar");
      this.setState({ categoryData });
    });
    getData(`${API}/Barman/getMeals`).then(data => {
      let body = data && data.filter(meal => meal.department === "Bar");
      this.setState({ body, isLoading: false });
    });
  }

  handleSelectCategory(event) {
    let select = event.target.value;
    console.log(select);
    let arr = this.state.body;

    if (select === "all") {
      this.setState({ data: arr });
    } else {
      arr = arr && arr.filter(category => category.category === select);
      arr = arr.length > 0 ? arr : "Нету блюд";
      this.setState({
        data: arr
      });
    }
  }

  render() {
    let { isLoading, error, categoryData } = this.state;
    let data = this.state.data.length > 0 ? this.state.data : this.state.body;

    if (error) {
      return <p>{error.message}</p>;
    }

    console.log(data);
    console.log(categoryData);

    return (
      <div className="cookPage">
        {!isLoading ? (
          <div>
            <h1 className="titleCook">Меню</h1>
            <div className="funcCook">
              <Link to={"/barmen"} className="menuBtn">
                Активные заказы
              </Link>

              <div className="selectDepartment">
                <label htmlFor="department">По категориям: </label>
                <select
                  id="categoryId"
                  className="select"
                  onChange={this.handleSelectCategory}
                  name="categoryId"
                >
                  <option value="all">Все</option>
                  {categoryData.length > 0 &&
                    categoryData.map(category => (
                      <option value={category.category} key={category.id}>
                        {category.category}
                      </option>
                    ))}
                </select>
              </div>
            </div>
            <div className="wrapperCook statusCook mealsContent">
              <table>
                <tbody>
                  <tr>
                    <th>Названия</th>

                    <th>Категория</th>
                    <th>Статус</th>
                    <th>Ед. изм.</th>
                    <th>Цена</th>
                    <th colSpan="2">Описания</th>
                  </tr>
                  {typeof data === "object" ? (
                    data.map(meal => (
                      <tr key={meal.id}>
                        <td>
                          <Link to={{ pathname: `/meal/${meal.id}/` }}>
                            {meal.name}
                          </Link>
                        </td>

                        <td>{meal.category}</td>
                        <td>
                          <label className="switch">
                            <input
                              type="checkbox"
                              onChange={() => {
                                putData(`/barman/changeMealStatus/${meal.id}`);
                              }}
                              defaultChecked={
                                meal.status === "Have" ? true : false
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </td>
                        <td>{meal.weight}</td>
                        <td>{meal.price} сом</td>
                        <td colSpan="2">{meal.description}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">Нету блюд</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default MealsBarmenPage;
