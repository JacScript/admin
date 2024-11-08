import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import "./login.css";
import { toast } from "react-toastify";


const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const response = await login(dispatch, { email, password });
  
      // Check if login was unsuccessful
      if (!response || !response.success) {
        // Handle unsuccessful login attempts if `response.success` is false or undefined
        toast.error("Login failed. Please try again.");
        return;  // Exit the function to avoid proceeding to success actions
      }
  
      // If login was successful
      toast.success("Logged in Successfully");
      history.push("/");
    } catch (err) {
      // Display error message using `react-toastify`
      toast.error(err?.data?.message || err.message || "An error occurred");
    }
  };

  return (
    <div className="loginContainer"
      // style={{
      //   height: "100vh",
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      //   justifyContent: "center",
      // }}
    >

      <div id="wrapper">

    <h1 className="title">LOGIN</h1>

    <form className="formContainer">


      <input
        // style={{ padding: 10, marginBottom: 20 }}
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        style={{ padding: 10, marginBottom: 20 }}
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      { isFetching ? (<button onClick={handleClick} style={{ padding: 10, width:100 }} >
            LOADING...
          </button>) : (<button onClick={handleClick} style={{ padding: 10, width:100 }} disabled={isFetching} >
            LOGIN
          </button>) }

      { error && ( <span>Something went wrong...</span>)}
    </form>
      </div>
    </div>
  );
};

export default Login;