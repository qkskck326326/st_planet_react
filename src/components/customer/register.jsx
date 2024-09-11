import { useState } from 'react';
import { useRouter } from 'next/router';
import { axiosClient } from '../../axiosApi/axiosClient';

const RegisterForm = (onSubmit) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    birth: '',
    phoneNumber: '',
    address: '',
    nickname: '',
    profileImageUrl: ''
  });

  const [error, setError] = useState('');
  const router = useRouter();

  // 입력 필드 변경 핸들러
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 회원가입 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 회원가입 API 호출
      const response = await axiosClient.put('customer/register', formData);
      
      if (response.status === 200) {
        // 회원가입 성공 시 로그인 페이지로 리디렉션
        router.push('/customer/login');
      }
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
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

        <div>
          <label>이름:</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>생년월일:</label>
          <input 
            type="date" 
            name="birth" 
            value={formData.birth} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>휴대폰 번호:</label>
          <input 
            type="tel" 
            name="phoneNumber"
            value={formData.phone_number} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>주소:</label>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>닉네임:</label>
          <input 
            type="text" 
            name="nickname" 
            value={formData.nickname} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>프로필 이미지 URL:</label>
          <input 
            type="url" 
            name="profileImageUrl" 
            value={formData.profile_image_url} 
            onChange={handleChange} 
          />
        </div>

        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterForm;
