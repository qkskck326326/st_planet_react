import {useContext, useState} from "react";
import { useRouter } from 'next/router';
import { axiosClient } from '../../axiosApi/axiosClient';
import {GlobalStateUpdateContext } from "../../context/GlobalStateProvider";

const LoginPage = () => {
  const { setIsLogin, setErrorMessage } = useContext(GlobalStateUpdateContext);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();

  // 입력 값 변경 처리
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 로그인 요청 처리
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // 에러 메시지 초기화

    try {
      // Spring Boot 서버로 로그인 요청
      const response = await axiosClient.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // 서버로부터 받은 accessToken과 refreshToken을 추출하여 로컬 스토리지에 저장
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('token', accessToken.split(' ')[1]);
      localStorage.setItem('refresh', refreshToken.split(' ')[1]);
    
      // 로그인 후 대시보드로 리디렉션 & 로그이 상태 변경
      setIsLogin(true);
      await router.push('/');
      
    } catch (err) {
      // 401 상태 코드일 경우 사용자에게 메시지 표시
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Login failed. Please try again.');
      }
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      <h2>로그인</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label>이메일:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
