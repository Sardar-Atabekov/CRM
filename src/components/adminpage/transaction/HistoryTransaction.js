import React, { useState, useEffect } from "react";
import { getData, API } from "../../requests";
import Navigation from "../../block/navigation.js";
import Search from "../../block/search.js";
import Footer from "../../block/footer.js";
import NamePage from "./../blocks/namePage";
import Calendar from "./../calendar/calendar";
import { TimeDate } from "./../calendar/time";
import Loading from "../../loading/loading";
import MoreModal from "./../../modalWindow/moreInfoModal";
import "./transaction.css";

const HistoryTransaction = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState({});
  const [count, setCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalOrder, setModalOrder] = useState({});

  useEffect(() => {
    // document.title = "Истории транзакции";
    getData(
      `${API}/Statistic/transactionHistory?&pageNumber=${page}&pageSize=${count}`
    ).then(data => {
      console.log(data);
      setLoading(false);
      setData(data);
    });
  }, [count, page]);

  const checkStatus = status => {
    let res =
      status === 0
        ? "Активный"
        : status === 1
        ? "Неактивный"
        : status === 2
        ? "Кухня готова"
        : "Бар готова";
    return res;
  };

  const createPage = () => {
    let buttons = [];
    for (let i = 1; i <= data.totalPages; i++) {
      buttons.push(
        <button
          className={`paginationButton${
            page === i ? " paginationActiveButton" : ""
          }`}
          onClick={() => {
            setPage(i);
            setLoading(true);
          }}
          key={i}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

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
        {loading ? (
          <Loading />
        ) : (
          <main className="waiterContent transaction">
            <div className="functionPage">
              <NamePage name="История транзакции" />
              <Calendar />
            </div>
            <div className="transactionDisplay">
              <label htmlFor="show">Показать по</label>
              <select
                id="show"
                onChange={e => {
                  setLoading(true);
                  setPage(1);
                  setCount(e.target.value);
                }}
                defaultValue={count}
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <table>
              <tbody>
                <tr>
                  <th className="sortingNumber">№</th>
                  <th>Время</th>
                  <th>Официант</th>
                  <th>Блюда</th>
                  <th>Статус</th>
                  <th>Итого</th>
                </tr>
                {data.items &&
                  data.items.map(order => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>
                        <time dateTime={order.orderDate}>
                          {TimeDate(order.orderDate)}
                        </time>
                      </td>

                      <td>{order.waiterName}</td>
                      <td>
                        {modalStatus ? (
                          <MoreModal
                            id={modalOrder.id}
                            meals={modalOrder.meals}
                            setStatus={() => setModalStatus(false)}
                          />
                        ) : (
                          <span
                            onClick={() => {
                              setModalStatus(true);
                              setModalOrder({
                                id: order.id,
                                meals: order.mealOrders
                              });
                            }}
                            className="moreMeals"
                          >
                            Посмотреть
                          </span>
                        )}
                      </td>
                      <td>{checkStatus(order.status)}</td>
                      <td>{order.totalPrice} сом</td>
                      {/* <td className="operationBlock">
                       <div className="operation">
                        <Link to={{ pathname: `/order/${order.id}/` }}>
                          Изменить{" "}
                        </Link>
                        <button
                          onClick={event => {
                            deleteData(`/orders/${order.id}`);
                            event.target.parentNode.parentNode.parentNode.remove();
                          }}
                        >
                          Удалить{" "}
                        </button>
                      </div>
                    </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="paginationBlock">
              {data.totalPages > 1 ? createPage() : null}
            </div>
          </main>
        )}

        <footer className="main-footer">
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default HistoryTransaction;
