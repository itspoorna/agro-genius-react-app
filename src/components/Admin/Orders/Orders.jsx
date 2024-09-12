import React from "react";
import './Orders.css'
const Orders = () => {
  return (
    <div className="vh-100">
      <div className="tm-block tm-block-taller tm-block-scroll mt-5 mx-5">
        <h2 className="tm-block-title">Orders List</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ORDER NO.</th>
              <th scope="col">STATUS</th>
              <th scope="col">OPERATORS</th>
              <th scope="col">LOCATION</th>
              <th scope="col">DISTANCE</th>
              <th scope="col">START DATE</th>
              <th scope="col">EST DELIVERY DUE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <b>#122349</b>
              </th>
              <td>
                <div className="tm-status-circle moving"></div>Moving
              </td>
              <td>
                <b>Oliver Trag</b>
              </td>
              <td>
                <b>London, UK</b>
              </td>
              <td>
                <b>485 km</b>
              </td>
              <td>16:00, 12 NOV 2018</td>
              <td>08:00, 18 NOV 2018</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
