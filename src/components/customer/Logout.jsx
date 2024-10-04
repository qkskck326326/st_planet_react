import { useRouter } from 'next/router';
import { axiosClient } from '../../axiosApi/axiosClient';

const Logout = ({setIsLogin, setErrorMessage}) => {
    const router = useRouter();

    const handleOnClick = async () => {
        const token = localStorage.getItem("refresh");
        try {
            const response = await axiosClient.post("/auth/logout", token)
            if(response.status===200){
                localStorage.removeItem('token');
                localStorage.removeItem('refresh');
                setIsLogin(false);
                router.push('/');
            }
        }catch (e) {
            setErrorMessage("오류가 발생하였습니다." + e.message);
        }

    }

    return (
        <button onClick={handleOnClick}>로그아웃</button>
    );
}
export default Logout;