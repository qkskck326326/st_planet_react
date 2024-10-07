import React, {useContext, useEffect, useState} from 'react';
import {GlobalStateContext, GlobalStateUpdateContext} from "../../context/GlobalStateProvider";
import {axiosClient} from "../../axiosApi/axiosClient";
import {useRouter} from "next/router";

const LoginManager = () => {
    const [remainingTime, setRemainingTime] = useState(null);
    const [intervalId, setIntervalId] = useState(null); // intervalId 상태 추가
    const { setErrorMessage } = useContext(GlobalStateUpdateContext);
    const { isLogin} = useContext(GlobalStateContext);
    const router = useRouter();

    useEffect(() => {
        const refreshToken = localStorage.getItem('refresh');

        if (refreshToken) {
            const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
            const expirationTime = tokenParts.exp;
            const currentTime = Math.floor(Date.now() / 1000);
            const timeRemaining = expirationTime - currentTime;

            setRemainingTime(timeRemaining);

            const intervalId = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(intervalId);
                        setErrorMessage('로그인 시간이 만료되어 로그아웃 되었습니다');
                        logout();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            setIntervalId(intervalId); // intervalId 저장

            return () => clearInterval(intervalId);
        }
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}분 ${secs}초`;
    };

    const logout = async () => {
        localStorage.removeItem('refresh');
        localStorage.removeItem('token');
        await router.push('/customer/login');
    };

    const refresh = async() => {
        try {
            const response = await axiosClient.post('/auth/refresh');
            const newRefreshToken = response.data.newRefreshToken;
            localStorage.setItem('refresh', newRefreshToken);

            const tokenParts = JSON.parse(atob(newRefreshToken.split('.')[1]));
            const expirationTime = tokenParts.exp;
            const currentTime = Math.floor(Date.now() / 1000);
            const timeRemaining = expirationTime - currentTime;

            if (intervalId) {
                clearInterval(intervalId); // 기존 타이머 정리
            }

            setRemainingTime(timeRemaining);

            const newIntervalId = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(newIntervalId);
                        setErrorMessage('로그인 시간이 만료되어 로그아웃 되었습니다');
                        logout();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);

            setIntervalId(newIntervalId); // 새로운 타이머 ID 저장
        } catch (error) {
            console.error('토큰 갱신 중 오류 발생:', error);
            setErrorMessage('시간 연장 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div>
            {isLogin ? (
                <div>
                    <p>남은 로그인 시간: {formatTime(remainingTime)}</p>
                    <button onClick={ refresh }>시간 연장</button>
                </div>
            ) : (
                <div/>
            )}
        </div>
    );
};

export default LoginManager;
