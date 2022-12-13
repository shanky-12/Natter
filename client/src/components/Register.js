import { Link } from "react-router-dom";
import React, { useContext, useState, useCallback, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    updateProfile,
    updatePhoneNumber,
    PhoneAuthCredential,
  } from "firebase/auth";

// const auth = getAuth();

const Register = (props) => {
  return (
    <div>
      <form>
        <label>
          <p>Username</p>
          <input type="text" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
