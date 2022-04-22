import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import NotFound from "./components/NotFound";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import { ProtectedRoute } from "./helpers/ProtectedRoute";
import { getCookie } from "./helpers/cookieHelpers";
import _ from "underscore";

const App = () => {
  let isAuthenticated = !_.isEmpty(getCookie("accessToken"));
  return (
    <div className="mainWrapper">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  isAuthenticated={isAuthenticated}
                  redirectPath="/login"
                >
                  <Home />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="orders" element={<Orders />} />
            </Route>
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
