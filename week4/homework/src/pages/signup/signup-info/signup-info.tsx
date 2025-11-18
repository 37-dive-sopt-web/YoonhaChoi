import { Link } from "react-router";
import Button from "../../../components/button/button";
import Input from "../../../components/input/input";
import { useState } from "react";
import { useNavigate } from "react-router";
import * as styles from "./signup-info.css";

interface InfoData {
  name: string;
  email: string;
  age: string;
}

interface SignupInfoProps {
  handleSubmit: (data: InfoData) => void;
  prevStep: () => void;
}

const SignupInfo = ({ handleSubmit, prevStep }: SignupInfoProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const infoValid =
    name.length > 1 &&
    email.includes("@") &&
    email.includes(".") &&
    Number(age) > 0;
  const isDisabled = !infoValid || isLoading;

  const handleRegister = async () => {
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve));

    handleSubmit({ name, email, age });

    setIsLoading(false);
    navigate("/login");
  };

  const buttonText = isLoading ? "가입중..." : "회원가입";

  return (
    <div>
      <Link
        to="#"
        onClick={prevStep}
       className={styles.arrow}>
        ←
      </Link>
      <p className={styles.title}>회원가입</p>

      <Input
        label="이름"
        placeholder="이름을 입력해 주세요"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="이메일"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        label="나이"
        placeholder="숫자만 입력"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <Button
        children={buttonText}
        disabled={isDisabled}
        onClick={handleRegister}
      />

      <div className={styles.linkContainer}>
        이미 계정이 있나요? &nbsp;
        <Link to="/login" className={styles.link}>
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default SignupInfo;
