import React, { useContext, useRef } from "react";
import AuthContext from "../../store/auth-context";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredNewPassowrd = newPasswordInputRef.current.value;
    // add validation
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyATSgSMpr3jfW-XkIVGxfuOTAzHiqS9J6I`,
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredNewPassowrd,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err)
    }
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          minLength="7"
          type="password"
          id="new-password"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
