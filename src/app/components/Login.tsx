import React from "react";
import { connect } from "react-redux";
import { login } from "../actions/authActions";
import { ReactComponent as FreddysLogo } from "../helpers/svg/Freddys_Logo.svg";
import { BaseProps, mapDispatchToProps, mapStateToProps } from "../hooks";
import { HomeState } from "../reducers/homeReducer";
import LoadingOverlay from "./LoadingOverlay";

class Login extends React.Component<BaseProps, {}> {
  private onSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    //@ts-ignore
    const username = e.target.username.value;
    //@ts-ignore
    const password = e.target.password.value;
    this.props.dispatch(
      login(username, password, () => {
        // TO DO need to navigate to Dashboard
        window.location.href = "/dashboard";
      })
    );
  }
  render(): React.ReactNode {
    const homeState: HomeState = this.props.rootState.home;
    const loader = homeState.isLoading && <LoadingOverlay />;
    return (
      <section className="vh-100" style={{ backgroundColor: "#fff" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div className="card shadow-2-strong" style={{ borderRadius: 1 }}>
                <div className="card-body p-5">
                  <form onSubmit={(e) => this.onSubmitLogin(e)}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h3>Freddys Artisanal Halloween Candy Shop</h3>
                      <FreddysLogo width={120} height={120} />
                    </div>
                    <div className="form-group mb-2">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter username"
                        name="username"
                      />
                    </div>
                    <div className="form-group mb-2">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        name="password"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block mt-2 mb-2"
                    >
                      Login
                    </button>
                    <p style={{ color: "red", height: "10px" }}>
                      {homeState.loginErrorMsg}
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {loader}
      </section>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
