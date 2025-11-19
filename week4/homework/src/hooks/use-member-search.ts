import { useState, useCallback } from 'react';
import { fetchMemberInfo, type MemberData } from "../apis/user-api";

interface MemberSearchResult {
  memberId: string;
  memberInfo: MemberData | null;
  error: string | null;
  isDisabled: boolean;
  handleIdChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => Promise<void>;
}

export const useMemberSearch = (): MemberSearchResult => {
  const [memberId, setMemberId] = useState('');
  const [memberInfo, setMemberInfo] = useState<MemberData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isValidId = memberId.length > 0 && !isNaN(Number(memberId)) && Number(memberId) > 0;
  const isDisabled = !isValidId;

  const handleIdChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const numericValue = value.replace(/[^0-9]/g, '');
    setMemberId(numericValue);
    setMemberInfo(null);
    setError(null);
  }, []);

  const handleSearch = useCallback(async () => {
    if (isDisabled) return;

    setMemberInfo(null);
    setError(null);

    const userIdNumber = Number(memberId);
    
    try {
      const data = await fetchMemberInfo(userIdNumber);
      setMemberInfo(data);
    } catch (err) {
      setError((err as Error).message);
    }
  }, [memberId, isDisabled]);

  return {
    memberId,
    memberInfo,
    error,
    isDisabled,
    handleIdChange,
    handleSearch,
  };
};