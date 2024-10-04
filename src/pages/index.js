// src/pages/index.js
import {useState, useContext, useEffect} from 'react'; // useContext 추가
import { useRouter } from 'next/router'; // useRouter 추가
import { axiosClient } from '../axiosApi/axiosClient'; // axiosClient import
import axios from 'axios';
import Link from 'next/link';
import {GlobalStateContext, GlobalStateUpdateContext} from '../context/GlobalStateProvider';
import Logout from "../components/customer/Logout"; // 전역 상태 가져오기

export default function Home() {
  const { isLogin} = useContext(GlobalStateContext);
  const { setIsLogin, setErrorMessage } = useContext(GlobalStateUpdateContext)
  const router = useRouter();

  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  // 버튼 클릭 시 호출할 함수
  const fetchData1 = async () => {
    try {
      console.log(localStorage.getItem('token'));
      // axiosClient를 사용하여 API 호출
      const response = await axiosClient.get('/test/getAll');
      console.log('요청 완료')
      setData(response.data); // 응답 데이터 저장
      setError(''); // 에러 초기화
    } catch (err) {
      console.log('Error fetching data:', err);
      setError('Failed to fetch data.');
    }
  };

  const fetchData2 = async () => {
    try {
      console.log(localStorage.getItem('token'));
      // axios를 사용하여 API 호출
      const response = await axios.get('http://localhost:8080/api/test/getAll');
      setData(response.data); // 응답 데이터 저장
      setError(''); // 에러 초기화
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data.');
    }
  };

  const checkToken = () =>{
    console.log('엑세스' + localStorage.getItem('token'))
    console.log('리프레쉬' + localStorage.getItem('refresh'))
  }

  return (
      <div>
        <h1>Welcome to Next.js!</h1>



        {!isLogin ? (
            <div>
              <Link href={'/customer/login'}>로그인</Link>&nbsp;&nbsp;
              <Link href={'/customer/register'}>회원가입</Link>
            </div>
        ) : (
            <div>
              <Link href={'/mypage'}>마이페이지</Link>
              <Logout setIsLogin={setIsLogin} setErrorMessage={setErrorMessage} />
            </div>
        )}

        <button onClick={checkToken} >토큰 확인</button>

        {/* 버튼 클릭 시 fetchData 함수 호출 */}
        <button onClick={fetchData1}>Test 호출</button>
        <button onClick={fetchData2}>Test 호출 with not Token</button>

        {/* 데이터 표시 */}
        {data && (
            <div>
              <h2>Fetched Data:</h2>
              <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        )}

        {/* 에러 메시지 표시 */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
  );
}
