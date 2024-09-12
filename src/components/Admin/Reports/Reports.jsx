import React from "react";
import SoldVsNotSoldPieChart from "./SoldVsNotSoldPieChart";
import UserActivityLineChart from "./UserActivityLineChart";

const Reports = () => {
  return (
    <>
      <div className="row vh-100 mt-5">
        <div className="col-md-4 offset-md-1">
          <SoldVsNotSoldPieChart />
        </div>
        <div className="col-md-5 m-2">
          <UserActivityLineChart />
        </div>
      </div>
    </>
  );
};

export default Reports;
