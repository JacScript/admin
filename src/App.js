import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login.jsx";
import { useSelector } from "react-redux";
import NotFound from "./pages/NotFound.jsx";
import Profile from "./pages/profile/Profile.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const admin = useSelector((state) => state.user.currentUser?.isAdmin);

  return (
    <>
      <ToastContainer className="" />

      <Router>
        <Switch>
          {/* Catch-all Route for undefined paths */}

          <Route exact path="/">
            <Login />
          </Route>

          {admin && (
            <>
              <Topbar />
              <div className="container">
                <Sidebar />

                <Route path="/home">
                  <Home />
                </Route>
                <Route path="/users">
                  <UserList />
                </Route>
                <Route path="/user/:userId">
                  <User />
                </Route>
                <Route path="/newUser">
                  <NewUser />
                </Route>
                <Route path="/products">
                  <ProductList />
                </Route>
                <Route path="/product/:productId">
                  <Product />
                </Route>
                <Route path="/newproduct">
                  <NewProduct />
                </Route>
                <Route path="/profile">
                  <Profile />
                </Route>
              </div>
            </>
          )}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
