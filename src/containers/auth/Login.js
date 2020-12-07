import React, { lazy, Suspense } from "react";
const Login = lazy(() => import("../../components/auth/Login"));

const LoginScreen = (props) => {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <Login
        removeError={props.removeError}
        errors={props.errors}
        onAuth={props.authUser}
        {...props}
      />
    </Suspense>
  );
};

export default LoginScreen;
