import React, { useEffect, useState } from "react";
import "./Orders.css";
import { useAuth } from "../../../context/Auth";
import axios from "axios";

const Orders = () => {
  const [auth] = useAuth();
  const [orderData, setOrderData] = useState([]);
  const url = import.meta.env.VITE_AGRO_GENIUS_URL;

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(`${url}/order/getAll`, {
          headers: {
            Authorization: auth?.token,
          },
        });
        const data = await response.data;
        console.log(data);
        setOrderData(data);
      };

      fetchData();
    } catch (error) {
      setOrderData([]);
      console.log(error);
    }
  }, []);

  return (
    <div className="vh-100">
      <div className="tm-block tm-block-taller tm-block-scroll mt-5 mx-5">
        <h2 className="tm-block-title">Orders List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ORDER NO.</th>
              <th scope="col">USER NAME</th>
              <th scope="col">STATUS</th>
              <th scope="col">AMOUNT</th>
              <th scope="col">LOCATION</th>
              <th scope="col">DISTANCE</th>
              <th scope="col">START DATE</th>
              <th scope="col">EST DELIVERY DUE</th>
            </tr>
          </thead>
          <tbody>
            {orderData &&
              orderData.map((order, index) => (
                <tr key={index}>
                  <th scope="row">
                    <b>{order?.id}</b>
                  </th>
                  <td>
                    <div
                      className={`tm-status-circle ${order.status.toLowerCase()}`}
                    ></div>
                    {order?.orderStatus}
                  </td>
                  <td>
                    <b>{order?.userName}</b>
                  </td>
                  <td>
                    <b>{order?.amount}</b>
                  </td>
                  <td>
                    <b>{order?.city}</b>
                  </td>
                  <td>{order?.startDate}</td>
                  <td>{order?.estimatedDelivery}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
