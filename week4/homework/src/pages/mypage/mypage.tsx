import Button from "../../components/button/button";
import Input from "../../components/input/input";

const MyPage = () => {
  return (
    <div>
     <p>내 정보</p>
     <p>아이디</p>
     <p>ㅁㄴㅇㄴ</p>
     <Input label="이름" placeholder="이름을 입력해주세요." />
     <Input label="이메일" placeholder="이메일을 입력해주세요." />
     <Input label="나이" placeholder="나이를 입력해주세요." />

     <Button children="수정하기" disabled onClick={()=>{}}/>
    </div>
  );
};

export default MyPage;
