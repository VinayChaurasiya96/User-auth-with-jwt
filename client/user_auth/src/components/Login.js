import React, {useState} from "react";
import {NavLink} from "react-router-dom";

const Login = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [inputVal, setInputVal] = useState({
    email: "",
    password: "",
  });

  // on input change function
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    //set new object with name and value
    setInputVal(() => {
      return {
        ...inputVal,
        [name]: value,
      };
    });
  };

  const handleLogin = () => {
    // object de-structuring
    const {email, password} = inputVal;

    if (email === "") {
      alert("please enter email ");
    } else if (!email.includes("@")) {
      alert("enter valid email");
    } else if (password === "") {
      alert("enter password");
    } else if (password.length < 6) {
      alert("password length should not less than 6");
    } else {
      console.log(" user login successfull done");
    }
  };
  return (
    <>
      <section>
        <div className="heading">
          <h1>Welcome back , Login in </h1>
          <p>Hi, we are glad you are back . Please login </p>
        </div>
        <div className="form">
          <div>
            <label htmlFor="email">Email</label> <br />
            <input
              onChange={onChangeHandler}
              name="email"
              type="text"
              value={inputVal.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label> <br />
            <div style={{position: "relative"}}>
              <input
                onChange={onChangeHandler}
                name="password"
                type={passwordShow ? "text" : "password"}
                value={inputVal.password}
              />
              <br />
              <span
                onClick={() => setPasswordShow(!passwordShow)}
                style={{
                  color: "white",
                  cursor: "pointer",
                  background: "grey",
                  padding: "1px 5px",
                  position: "absolute",
                  left: "10%",
                  top: "0",
                  borderRadius: "2px",
                }}
              >
                {passwordShow ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <div>
            {/* <input type="submit" value="Login" /> */}
            <input type="submit" onClick={handleLogin} value="Login" />
          </div>
        </div>

        <div>
          <p>
            you dont have an account ?
            <NavLink to="/register">
              <button>Signup</button>
            </NavLink>
          </p>
        </div>
      </section>
    </>
  );
};

export default Login;
