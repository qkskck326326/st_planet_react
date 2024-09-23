// context/GlobalStateContext.js
import React, { createContext, useState, useEffect } from 'react';

// 로그인 상태를 저장할 Context 생성
export const GlobalStateContext = createContext();
export const GlobalStateUpdateContext = createContext();

// Provider 컴포넌트
export const GlobalStateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 토큰을 확인
    const token = localStorage.getItem('token');

    if (token) {
      // JWT 토큰의 페이로드 디코딩 함수
      const decodeToken = (token) => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload;
        } catch (error) {
          console.error('토큰 디코딩 오류', error);
          return null;
        }
      };

      // 토큰 유효성 검사 함수
      const isTokenValid = (token) => {
        const payload = decodeToken(token);
        if (!payload) return false;

        // 만료 시간(exp) 확인 (exp는 초 단위로 저장됨)
        const currentTime = Date.now() / 1000; // 현재 시간 (초 단위)
        return payload.exp > currentTime;
      };

      // 토큰이 유효한지 검사
      if (isTokenValid(token)) {
        setIsLogin(true); // 유효하면 로그인 상태로 설정
      } else {
        localStorage.removeItem('token'); // 만료된 토큰 삭제
        setIsLogin(false);
      }
    } else {
      setIsLogin(false);
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
