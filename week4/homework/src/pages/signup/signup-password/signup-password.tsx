import { Link } from "react-router";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import { useState } from "react";
import * as styles from "./signup-password.css";
import { container as signupContainer } from "../../login/login.css"; // 경로는 프로젝트 구조에 맞게 수정했습니다.

interface SignupPasswordProps {
  nextStep: (data: { password: string }) => void;
  prevStep: () => void;
}

const SignupPassword = ({ nextStep, prevStep }: SignupPasswordProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordValid = password.length >= 8; 
  const isMatch = password === confirmPassword;

  const isDisabled = !(isPasswordValid && isMatch);

  const handleNext = () => {
    if (!isDisabled) {
      nextStep({ password });
    }
  };

  return (
    <div className={signupContainer}>
      <Link
        to="#"
        onClick={prevStep}
        className={styles.arrow}>
        ←
      </Link>
      <p className={styles.title}>회원가입</p>

      <Input
        label="비밀번호"
        placeholder="비밀번호를 입력해 주세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        label="비밀번호 확인"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {confirmPassword && !isMatch && (
        <p className={styles.errorText}>
          비밀번호가 일치하지 않습니다.
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

export default SignupPassword;
