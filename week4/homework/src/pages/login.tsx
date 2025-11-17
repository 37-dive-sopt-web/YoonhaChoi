import Button from "../components/button/button";
import Input from "../components/input/input";

const LoginPage = () => {
  return (
    <div className="align-center flex h-screen flex-col justify-center">
      <p className="text-2xl font-bold">로그인</p>
      <Input label="이메일 주소" placeholder="이메일을 입력하게요" />

      <Button children="다음" disabled={true} onClick={() => {}} />
    </div>
  );
};

export default LoginPage;
