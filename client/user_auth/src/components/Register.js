import React, {useState} from "react";
import {NavLink} from "react-router-dom";

const Register = () => {
  const [passwordShow, setPasswordShow] = useState(false);
  const [cPasswordShow, setCPasswordShow] = useState(false);
  const [inputVal, setInputVal] = useState({
    fname: "",
    email: "",
    password: "",
    cPassword: "",
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

  // on form submit function
  const handleRegister = async () => {
    // object de-structuring
    const {fname, email, password, cPassword} = inputVal;

    if (fname === "") {
      alert("please enter name ");
    } else if (email === "") {
      alert("please enter email ");
    } else if (!email.includes("@")) {
      alert("enter valid email");
    } else if (password === "") {
      alert("enter password");
    } else if (password.length < 6) {
      alert("password length should not less than 6");
    } else if (cPassword === "") {
      alert("enter confirm password");
    } else if (cPassword.length < 6) {
      alert("confirm password length should not less than 6");
    } else if (cPassword !== password) {
      alert("password doesn't match");
    } else {
      const data = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({fname, email, password, cPassword}),
      });

      const response = await data.json();
      console.log(response);
      if (response) {
        setInputVal({
          fname: "",
          email: "",
          password: "",
          cPassword: "",
        });
      }
    }
  };
  return (
    <>
      <section>
        <div className="heading">
          <h1> Signup </h1>
        </div>
        <div className="form">
          <div>
            <label htmlFor="name">Name</label> <br />
            <input
              onChange={onChangeHandler}
              name="fname"
              type="text"
              value={inputVal.fname}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label> <br />
            <input
              onChange={onChangeHandler}
              name="email"
              type="email"
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
            <label htmlFor="cPassword">Confirm password</label> <br />
            <div style={{position: "relative"}}>
              <input
                onChange={onChangeHandler}
                name="cPassword"
                type={cPasswordShow ? "text" : "password"}
                value={inputVal.cPassword}
              />
              <br />
              <span
                onClick={() => setCPasswordShow(!cPasswordShow)}
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
                {cPasswordShow ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <div>
            <input type="submit" onClick={handleRegister} value="Register" />
          </div>
        </div>

        <div>
          <p>
            Allready have an account ?
            <NavLink to="/">
              <button>Signin</button>
            </NavLink>
          </p>
        </div>
      </section>
    </>
  );
};

export default Register;
