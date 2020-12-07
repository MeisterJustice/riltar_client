import React, { lazy, Suspense } from "react";
const SignupAsBuyer = lazy(() => import("../../components/auth/SignupAsBuyer"));

const SignupAsBuyerScreen = (props) => {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <SignupAsBuyer
        removeError={props.removeError}
        errors={props.errors}
        onAuth={props.authUser}
        {...props}
      />
    </Suspense>
  );
};

export default SignupAsBuyerScreen;
