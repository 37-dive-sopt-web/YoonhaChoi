import { Link } from "react-router";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import { useState } from "react";
import  * as styles from "./signup-id.css";
import { container as signupContainer } from "../../login/login.css"; // 경로는 프로젝트 구조에 맞게 수정했습니다.

const MAX_LENGTH = 50;
const MIN_LENGTH = 6;

interface SignupIdProps {
  nextStep: (data: { id: string }) => void;
  prevStep: () => void;
}

const SignupId = ({ nextStep, prevStep }: SignupIdProps) => {
  const [id, setId] = useState("");
  const isTooShort = id.length > 0 && id.length < MIN_LENGTH;
  const isTooLong = id.length > MAX_LENGTH; 

  const isDisabled = id.length === 0 || isTooShort || isTooLong;
  const handleNext = () => {
   if (!isDisabled) {
        nextStep({ id });
    }
  };

  const errorMessage = isTooLong 
    ? `아이디는 ${MAX_LENGTH}자를 초과할 수 없습니다.`
    : isTooShort
    ? `아이디는 최소 ${MIN_LENGTH}자 이상이어야 합니다.`
    : "";

  return (
    <div className={signupContainer}>
      <Link to="/login" onClick={prevStep} className={styles.arrow}>
        ←
      </Link>
      <p className={styles.title}>회원가입</p>

      <Input
        label="아이디"
        placeholder="아이디를 입력해 주세요"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />

      {errorMessage && (
        <p className={styles.errorText}>
          {errorMessage}
        </p>
      )}

      <Button children="다음" disabled={isDisabled} onClick={handleNext} />

      <div className={styles.linkContainer}>
        이미 계정이 있나요? &nbsp;
        <Link to="/login" className={styles.link}>
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default SignupId;
