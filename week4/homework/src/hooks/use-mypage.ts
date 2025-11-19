import { useState, useEffect } from 'react';
import { fetchMemberInfo, updateMemberInfo, type UpdateRequest } from '../apis/mypage-api'; 

interface MyPageHookReturn {
  memberId: number | null;
  formData: UpdateRequest & { username: string };
  isDisabled: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof UpdateRequest | 'name' | 'email') => void;
  handleAgeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => Promise<void>;
}

export const useMyPage = (): MyPageHookReturn => {
  const [formData, setFormData] = useState<UpdateRequest & { username: string }>({
    username: '', 
    name: '',
    email: '',
    age: undefined,
  });
  const [memberId, setMemberId] = useState<number | null>(null);
  
  // 유효성 검사
  const isAnyFieldEmpty = () => {
    const nameInvalid = !formData.name || (typeof formData.name === 'string' && formData.name.trim() === '');
    const emailInvalid = !formData.email || (typeof formData.email === 'string' && formData.email.trim() === '');
    const ageInvalid = formData.age === undefined || formData.age === null;

    return nameInvalid || emailInvalid || ageInvalid;
  };
  
  // 로딩 중이거나 필드가 비어있으면 비활성화
  const isDisabled = isAnyFieldEmpty();

  // 초기 정보 조회
  useEffect(() => {
    const storedId = localStorage.getItem('user_id'); 
    const id = storedId ? Number(storedId) : null; 
    setMemberId(id);

    if (!id || isNaN(id)) {
      return;
    }

    (async () => {
      try {
        const data = await fetchMemberInfo(id);
        setFormData({
          username: data.username,
          name: data.name,
          email: data.email,
          age: data.age,
        });
      } catch (err) {
        window.alert(`정보 로딩 실패: ${(err as Error).message}`);
      } 
    })();
  }, []); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof UpdateRequest | 'name' | 'email') => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };
  
  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const ageValue = value === '' ? undefined : parseInt(value, 10);
    setFormData(prev => ({ ...prev, age: ageValue }));
  };

  // 저장 핸들러
  const handleSave = async () => {
    if (!memberId) {
        window.alert("저장할 수 없습니다.");
        return;
    }
    
    
    const payload: UpdateRequest = {
      name: formData.name,
      email: formData.email,
      age: formData.age,
    };

    try {
      const updatedData = await updateMemberInfo(memberId, payload);
      
      setFormData({
          username: updatedData.username,
          name: updatedData.name,
          email: updatedData.email,
          age: updatedData.age,
      });

      window.alert("정보가 성공적으로 수정되었습니다.");
    } catch (err) {
      window.alert("저장에 실패했습니다.");
    } 
  };
  
  return {
    memberId,
    formData,
    isDisabled,
    handleChange,
    handleAgeChange,
    handleSave,
  };
};