import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { USER_SIGN_UP } from "../../mutations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const SignUp = (props) => {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [SignUp] = useMutation(USER_SIGN_UP);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.confirm === state.password) {
      try {
        const user = await SignUp({
          variables: {
            username: state.username,
            email: state.email,
            password: state.password,
          },
        });

        const { token } = user.data;
        localStorage.setItem("token", token);
        toast("Please check your email to veriy your address", {
          type: "success",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        props.refetch();
        props.history.push("/");
      } catch (err) {
        toast(err.message, {
          type: "error",
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } else {
      toast("Passwords are not matching", {
        type: "error",
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="signIn">
      <div className="left">
        <h1>
          Signin to <span className="orange">Discover</span> uderrated <br />
          <span className="orange">songs treasure</span>
        </h1>
      </div>
      <div className="right">
        <form onSubmit={handleSubmit}>
          <div className="form-input">
            <label htmlFor="username">Username: </label>
            <input
              required
              type="text"
              value={state.username}
              onChange={(e) =>
                setState({
                  ...state,
                  [e.target.name]: e.target.value,
                })
              }
              name="username"
              id="username"
            />
          </div>
          <div className="form-input">
            <label htmlFor="email">Email: </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              value={state.email}
              onChange={(e) =>
                setState({
                  ...state,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-input">
            <label htmlFor="password">Password: </label>
            <input
              required
              type="password"
              name="password"
              id="password"
              minLength="6"
              value={state.password}
              onChange={(e) =>
                setState({
                  ...state,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <div className="form-input">
            <label htmlFor="confirm">Confirm Password: </label>
            <input
              required
              type="password"
              minLength="6"
              onChange={(e) =>
                setState({
                  ...state,
                  [e.target.name]: e.target.value,
                })
              }
              name="confirm"
              id="confirm"
              value={state.confirm}
            />
          </div>
          <button>Register</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
