import { useSignup } from "../../hooks/use-signup"; 
import SignupId from "./signup-id/signup-id";
import SignupPassword from "./signup-password/signup-password";
import SignupInfo from "./signup-info/signup-info";


const SignupPage = () => {
  // 커스텀 훅에서 모든 상태와 함수를 가져옵니다.
  const { 
    step, 
    signupMessage, 
    nextStep, 
    prevStep, 
    handleSubmit 
  } = useSignup(); 

  const renderStep = () => {
    switch (step) {
      case 0: // 아이디 입력
        return <SignupId nextStep={nextStep} prevStep={prevStep} />;
      case 1: // 비밀번호 입력
        return <SignupPassword nextStep={nextStep} prevStep={prevStep} />;
      case 2: // 정보 입력
        return (
          <>
            <SignupInfo handleSubmit={handleSubmit} prevStep={prevStep} />
            {signupMessage && !signupMessage.includes("처리 중") && (
              <div
                style={{ color: "red", textAlign: "center", marginTop: "10px" }}
              >
                {signupMessage}
              </div>
            )}
          </>
        );
      default:
        return <div>가입 처리 중...</div>;
    }
  };

  return <div>{renderStep()}</div>;
};

export default SignupPage;