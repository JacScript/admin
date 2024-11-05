import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { login } from "../../redux/apiCalls";
import "./login.css";


const Login = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password }).then(() => {
      history.push("/home");
    });
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

      <div className="wrapper">

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