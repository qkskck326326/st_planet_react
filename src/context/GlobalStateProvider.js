// context/GlobalStateContext.js
import React, { createContext, useState, useEffect } from 'react';
import {axiosClient, setAxiosInterceptors} from '../axiosApi/axiosClient';
import OutputModal from '../components/common/OutputModal';

// 로그인 상태와 에러 메시지를 저장할 Context 생성
export const GlobalStateContext = createContext();
export const GlobalStateUpdateContext = createContext();

// Provider 컴포넌트
export const GlobalStateProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지 상태
  const [isModalVisible, setModalVisible] = useState(false); // 모달 가시성 상태

  useEffect(() => {
    const token = localStorage.getItem('refresh');

    if (token && token !== 'null' && token !== null) {
      const decodeToken = (token) => {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          return payload;
        } catch (error) {
          console.error('토큰 디코딩 오류', error);
          return null;
        }
      };

      const isTokenValid = (token) => {
        const payload = decodeToken(token);
        if (!payload) return false;

        const currentTime = Date.now() / 1000; // 현재 시간 (초 단위)
        return payload.exp > currentTime;
      };

      if (isTokenValid(token)) {
        setIsLogin(true);
      } else {
        localStorage.removeItem('refresh');
        setIsLogin(false);
      }
    } else {
      setIsLogin(false);
    }
  }, []);

  // axiosClient에 setErrorMessage를 전달, 인터셉터에서 사용 가능하도록 설정
  // 1번만 실행되게 하기 위해 의존성배열에 해당 setter 추가
  useEffect(() => {
    setAxiosInterceptors(setErrorMessage);
  }, [setErrorMessage]);

  // 에러 메시지가 업데이트될 때 모달 자동으로 표시
  useEffect(() => {
    if (errorMessage) {
      setModalVisible(true); // 에러 메시지 유무 다시 확인
    }
  }, [errorMessage]);
  
  // 모달 확인 버튼 클릭 시 호출
  const handleConfirm = () => {
    setModalVisible(false); // 모달을 닫기
    setErrorMessage(""); // 에러 메시지 초기화
  };

  const handleCancel = () => {
    setModalVisible(false); // 모달을 닫음
  };

  return (
      <GlobalStateContext.Provider value={{ isLogin, errorMessage }}>
        <GlobalStateUpdateContext.Provider value={{ setIsLogin, setErrorMessage }}>
          {children}

          {/* 모달 전역으로 관리 */}
          <OutputModal
              show={isModalVisible}
              text={errorMessage}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
          />
        </GlobalStateUpdateContext.Provider>
      </GlobalStateContext.Provider>
  );
};
