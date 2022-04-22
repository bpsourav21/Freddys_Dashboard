import { useEffect } from "react";
import { getDashboard } from "../actions/homeActions";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Table } from "react-bootstrap";
import { HomeState } from "../reducers/homeReducer";
import { SellItemDto } from "../models/dashboard";
import _ from "underscore";
const Dashboard = () => {
  const homeState: HomeState = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDashboard());
  }, []);

  const bestSellers =
    homeState.dashboardData &&
    homeState.dashboardData.dashboard &&
    homeState.dashboardData.dashboard.bestsellers
      ? homeState.dashboardData.dashboard.bestsellers
      : [];
  const rowData = _.map(bestSellers, (sellItem: SellItemDto, i: number) => {
    return (
      <tr key={"item_" + (i + 1)}>
        <td>{sellItem.product.name}</td>
        <td>{sellItem.units}</td>
        <td>{sellItem.revenue}</td>
      </tr>
    );
  });

  const table = (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Unit</th>
          <th>Revenue</th>
        </tr>
      </thead>
      <tbody>{rowData}</tbody>
    </Table>
  );

  const statusRevenueBlock = _.map(
    [
      { title: "Today", revenue: "1456", orders: 9 },
      { title: "Last Week", revenue: "34k", orders: 120 },
      { title: "Last Month", revenue: "95k", orders: 876 },
    ],
    (statusRev, i) => (
      <div key={"rev_" + (i + 1)} className="status">
        <h5>{statusRev.title}</h5>
        <h6>{"$" + statusRev.revenue + "/" + statusRev.orders + "orders"}</h6>
      </div>
    )
  );

  return (
    <div className="Dashboard">
      <h3 className="">Dashboard</h3>
      <div className="status-section">{statusRevenueBlock}</div>
      <h5>Best Sellers</h5>
      <div>{table}</div>
    </div>
  );
};

export default Dashboard;
