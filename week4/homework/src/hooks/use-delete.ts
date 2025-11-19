import { useState, useEffect } from "react";
import { useNavigate } from "react-router"; 
import { deactivateMember, logoutUser } from "../apis/delete-api"; 
import { fetchMemberInfo, type MemberData } from "../apis/mypage-api"; 


interface TabAction {
    name: string;
    path: string | null;
    action: 'logout' | 'show_deactivate_modal' | null;
}

export const useHeaderLogic = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userName, setUserName] = useState("로딩 중...");

    const tabs: TabAction[] = [
        { name: "내 정보", path: "/mypage", action: null },
        { name: "회원 조회", path: "/mypage/members", action: null },
        { name: "로그아웃", path: null, action: 'logout' },
        { name: "회원탈퇴", path: null, action: 'show_deactivate_modal' },
    ];

    useEffect(() => {
        const storedId = localStorage.getItem('user_id');
        const userId = storedId ? Number(storedId) : null;

        if (!userId || isNaN(userId)) {
            setUserName("로그인 필요");
            return;
        }

        const loadUserName = async () => {
            try {
                const data: MemberData = await fetchMemberInfo(userId);
                setUserName(data.name || "사용자");
            } catch (err) {
                setUserName("이름 없음");
            } 
        };
        loadUserName();
    }, []); 

    // 로그아웃 처리 함수
    const handleLogout = () => {
        logoutUser();
        alert("로그아웃되었습니다.");
        navigate("/login");
    };

    // 회원 탈퇴 확인 함수
    const confirmDeactivate = async () => {
        setIsModalOpen(false); 
        
        const storedId = localStorage.getItem('user_id');
        const userId = storedId ? Number(storedId) : null;
        
        if (!userId) {
            alert("사용자 ID를 찾을 수 없습니다.");
            handleLogout(); 
            return;
        }

        try {
            await deactivateMember(userId);
            
            logoutUser();
            alert("회원 탈퇴 완료되었어요");
            navigate("/login");
        } catch (err) {
            alert("회원 탈퇴에 실패했습니다.");
        }
    };

    const handleTabClick = (tab: TabAction) => {
        if (tab.path) {
            navigate(tab.path);
        } else if (tab.action === 'logout') {
            handleLogout();
        } else if (tab.action === 'show_deactivate_modal') {
            setIsModalOpen(true);
        }
    };

    return {
        isModalOpen,
        tabs,
        userName,
        handleTabClick,
        confirmDeactivate,
        setIsModalOpen,
    };
};