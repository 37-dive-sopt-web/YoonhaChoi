import { Link } from "react-router";
import Button from "../components/button/button";
import Input from "../components/input/input";

const SignupPage = () => {
  return (
    <div>
      <Link to="/" className="inline-block pb-2 font-bold text-teal-400">
        ←
      </Link>
      <p className="pb-5 text-2xl font-bold">회원가입</p>

      <Input label="아이디" placeholder="아이디를 입력해 주세요" />

      <Button children="다음" disabled={true} onClick={() => {}} />

      <div className="flex pt-3 text-gray-400">
        이미 계정이 있나요? &nbsp;
        <Link to="/login" className="text-teal-400">
          로그인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
