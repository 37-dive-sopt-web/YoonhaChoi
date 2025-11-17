import { Link } from "react-router";
import Button from "../components/button/button";
import Input from "../components/input/input";

const LoginPage = () => {
  return (
    <div className="align-center flex h-screen flex-col justify-center">
      <p className="pb-5 text-2xl font-bold">로그인</p>
      <Input label="아이디" placeholder="아이디를 입력해 주세요" />
      <Input label="비밀번호" placeholder="비밀번호를 입력해 주세요" />

      <Button children="다음" disabled={true} onClick={() => {}} />

      <div className="flex justify-center pt-3 font-bold text-teal-400">
        <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default LoginPage;
