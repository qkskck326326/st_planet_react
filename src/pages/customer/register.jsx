import RegisterForm from '../../components/customer/RegisterForm';
import { axiosClient } from '../../axiosApi/axiosClient';
import { useRouter } from 'next/router';

const SignupPage = () => {
  const router = useRouter();

  const handleSignup = async (formData) => {
    try {
      const response = await axiosClient.post('/customer/register', formData);
      if (response.status === 200) {
        router.push('/customer/login');
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <RegisterForm onSubmit={handleSignup} />
    </div>
  );
};

export default SignupPage;