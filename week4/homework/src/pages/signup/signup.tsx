import { useState } from "react";
import SignupId from "./signup-id/signup-id";
import SignupPassword from "./signup-password/signup-password";
import SignupInfo from "./signup-info/signup-info";

interface SignupData {
  id?: string;
  password?: string;
  name?: string;
  email?: string;
  age?: string;
}

const SignupPage = () => {
  // 0: 아이디, 1: 비밀번호, 2: 정보
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({}); // 폼 데이터 저장을 위한 상태

  // 다음 단계로 이동하는 함수
  const nextStep = (data: SignupData) => {
    // 이전 단계의 데이터를 formData에 병합
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  // 이전 단계로 돌아가는 함수 (선택 사항)
  const prevStep = () => {
    setStep((prev) => prev - 1);
  };

  // 최종 제출 함수 (마지막 단계에서 실행)
  const handleSubmit = (data: SignupData) => {
    const finalData = { ...formData, ...data };
    console.log("Final Signup Data:", finalData);
    // 여기에 실제 회원가입 API 호출 로직을 넣습니다.
  };

  const renderStep = () => {
    switch (step) {
      case 0: // 아이디 입력
        return <SignupId nextStep={nextStep} />;
      case 1: // 비밀번호 입력
        return <SignupPassword nextStep={nextStep} prevStep={prevStep} />;
      case 2: // 정보 입력 (마지막 단계)
        return <SignupInfo handleSubmit={handleSubmit} prevStep={prevStep} />;
      default:
        // 선택적으로 가입 완료 화면 등을 표시할 수 있습니다.
        return <div>가입 완료!</div>;
    }
  };

  return <div>{renderStep()}</div>;
};

export default SignupPage;
