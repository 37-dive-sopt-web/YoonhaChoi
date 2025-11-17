import Input from "../../components/input/input";
import Button from "../../components/button/button";

const MemberPage = () => {
  return (
    <div>
     <p>회원 조회</p>
     
     <Input label="회원 이름" placeholder="회원 이름을 입력해주세요." />

     <Button children="확인" disabled onClick={()=>{}}/>
    </div>
  );
};

export default MemberPage;