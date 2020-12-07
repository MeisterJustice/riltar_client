import React, { lazy, Suspense } from "react";
const SignupAsBusiness = lazy(() =>
  import("../../components/auth/SignupAsBusiness")
);

const SignupAsBusinessScreen = (props) => {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <SignupAsBusiness
        removeError={props.removeError}
        errors={props.errors}
        onAuth={props.authUser}
        {...props}
      />
    </Suspense>
  );
};

export default SignupAsBusinessScreen;
