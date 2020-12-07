import React, { lazy, Suspense } from "react";
const SignupQuestion = lazy(() =>
  import("../../components/auth/SignupQuestion")
);

const SignupQuestionScreen = (props) => {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <SignupQuestion {...props} />
    </Suspense>
  );
};

export default SignupQuestionScreen;
