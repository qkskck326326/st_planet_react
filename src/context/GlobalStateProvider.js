// context/GlobalStateContext.js
import React, { createContext, useState, useEffect } from 'react';

// 로그인 상태를 저장할 Context 생성
export const GlobalStateContext = createContext();
export const GlobalStateUpdateContext = createContext();

// Provider 컴포넌트
export const GlobalStateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 토큰을 확인하여 로그인 상태 설정
    const token = localStorage.getItem('token');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  return (
    <GlobalStateContext.Provider value={isLogin}>
      <GlobalStateUpdateContext.Provider value={setIsLogin}>
        {children}
      </GlobalStateUpdateContext.Provider>
    </GlobalStateContext.Provider>
  );
};
