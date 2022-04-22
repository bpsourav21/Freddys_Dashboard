import React from "react";
import { connect } from "react-redux";
import {
  getOrders,
  setCurrentPage,
} from "../actions/homeActions";
import { BaseProps, mapDispatchToProps, mapStateToProps } from "../hooks";
import { Table } from "react-bootstrap";
import { HomeState } from "../reducers/homeReducer";
import _ from "underscore";
import { OrderDto } from "../models/dashboard";
import LoadingOverlay from "./LoadingOverlay";
class Orders extends React.Component<BaseProps, {}> {
  constructor(props: BaseProps) {
    super(props);
    this.props.dispatch(getOrders());
  }

  private setCurrentPage(pageNumber: number) {
    this.props.dispatch(setCurrentPage(pageNumber));
    // this.props.dispatch(getOrders(pageNumber));
  }
  render(): React.ReactNode {
    const homeState: HomeState = this.props.rootState.home;
    const rowData = _.map(homeState.orders, (order: OrderDto, i: number) => {
      let textColor = "#000";
      if (order.status === "processing") {
        textColor = "#FF6347";
      } else if (order.status === "delivered") {
        textColor = "#0bb30b";
      }
      return (
        <tr key={"item_" + (i + 1)}>
          <td>{order.product.name}</td>
          <td>{new Date(order.created_at).toDateString()}</td>
          <td>{order.total}</td>
          <td style={{ color: textColor }}>{order.status}</td>
        </tr>
      );
    });

    const table = (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rowData}</tbody>
      </Table>
    );

    const currentPage = homeState.currentPage;
    const pageCount = 1000 / 50;
    let paginationSection = (
      <nav aria-label="Page navigation" style={{ marginTop: "50px" }}>
        <ul className="pagination justify-content-end">
          <li
            className={currentPage === 1 ? "page-item disabled" : "page-item "}
          >
            <button
              className="page-link"
              onClick={() => this.setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          <li className="page-item disabled">
            <button className="page-link">{currentPage}</button>
          </li>
          <li
            className={
              currentPage === pageCount ? "page-item disabled" : "page-item"
            }
          >
            <button
              className="page-link"
              onClick={() => this.setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );

    const loader = homeState.isLoading && <LoadingOverlay />;
    return (
      <div className="Orders">
        <h3 className="">Orders</h3>
        <div>{paginationSection}</div>
        <div>{table}</div>
        {loader}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
