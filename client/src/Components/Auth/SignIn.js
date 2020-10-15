import React, { useState } from "react";
import { USER_SIGN_IN } from "../../mutations";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const SignIn = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [SignIn] = useMutation(USER_SIGN_IN);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = await SignIn({
        variables: {
          email: state.email,
          password: state.password,
        },
      });

      const { signInUser } = user.data;

      localStorage.setItem("token", signInUser.token);
      props.history.push("/");
      props.refetch();
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
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
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
              type="password"
              minLength="6"
              name="password"
              id="password"
              onChange={(e) =>
                setState({
                  ...state,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>
          <button>Login</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
