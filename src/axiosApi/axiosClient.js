import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
        'Content-Type': 'application/json'
    },
});


// 요청 인터셉터
// /reissue 요청 외의 모든 요청의 헤더에 Authorization 라는 이름으로 token을 넣어서 전송한다.
axiosClient.interceptors.request.use(
    config => {
        if (config.url !== '/auth/reissue') {    //////////////////////// 고처야댐
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
                console.log("token was added")
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    window.location.href = '/customer/login'; // 로그아웃 후 로그인 페이지로 리다이렉트
};

//** acces 토큰을 refresh 토큰을 이용하여 새로 발급받는 메소드  **//
// 헤더에 Authorization 라는 이름으로 refreshToken을 /reissue 엔드포인트로 반환,
// 서버로부터 새로운 access토큰을 헤더로, refresh토큰을 data로 반환받는다
const getNewAccessToken = async () => {
    console.log('accessToken 재발급 절차 진행');
    const refreshToken = localStorage.getItem('refresh');
    try {

        console.log('refresh 토큰으로 Reissue요청:', refreshToken);
        const response = await axiosClient.post('/auth/reissue', null, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        console.log('Reissue 요청 완료:', response);

        // 응답 바디에서 액세스 토큰을 추출합니다.
        const newAccessToken = response.data.accessToken; // 서버가 액세스 토큰을 응답 바디에 포함하도록 해야 함
        if (!newAccessToken) {
            throw new Error('Access token missing in reissue response');
        }

        localStorage.setItem('token', newAccessToken);

        // 서버에서 반환한 새로운 리프레시 토큰 저장
        const newRefreshToken = response.data.refresh; // 서버에서 요청 바디에 포함한 리프레시 토큰 추충
        if (newRefreshToken) {
            localStorage.setItem('refresh', newRefreshToken);
        }

        return newAccessToken;
    } catch (error) {
        if (error.response && error.response.data.error === 'Refresh token is invalid or expired') {
            logout();
        } else {
            console.error('An error occurred:', error);
        }
        return null;
    }
};


// 응답 인터셉터
// 서버로부터 돌아온 응답을 가로채어 정상적인 response라면 그대로 반환, 
// 에러가 발생하면 에러발생시 error.config 로 돌아오는 요청 객체를 originalRequest에 저장, 
// 만약 엑세스 토큰이 만료되었다는 에러인 401 에러가 발생하면 getNewAccessToken() 메소드를 실행, access토큰을 재발급 요청하고,
// 해당 요청에서 401 에러 발생시(refreshToken 또한 expired) 무한 루프로 들어가기 떄문에 
// originalRequest._retry 라는 설정되지 않은(false or undefined 반환)속성을 새로 flag로 사용하여, 무한루프를 방지하며,  
// 새롭게 발급받은 access토큰을 헤더에 넣어 실패한 요청을 다시 요청하고, access토큰을 로컬 스토리지에 저장한다.
const setAxiosInterceptors = (setErrorMessage) => {
    axiosClient.interceptors.response.use(
        response => response,
        async (error) => {
            const originalRequest = error.config;
            const errorMessage = error.response.data.error;
            console.log('에러 객체 : ', error)
            console.log("에러메세지 : " + errorMessage);
            console.log('요청 원문 : ', originalRequest);

            // 본 if문 아래의 요청이 진행 된 적이 있어 _retry 속성이 존재한다면 로그아웃 처리
            if(originalRequest._retry){
                setErrorMessage('로그인이 만료되어 로그아웃됩니다.');
                logout();
            }

            if (error.response) {
                // 에러 status 401  && 본 함수 내부 첫번째 요청 일 것 && 에러 메세지 InvalidRefreshToken(리프레쉬도 만료))
                if (error.response.status === 401 && !(originalRequest._retry === true)) {
                    originalRequest._retry = true;
                    const newAccessToken = await getNewAccessToken();
                    if (newAccessToken) {
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        return axiosClient(originalRequest);
                    }
                }

                if (error.response.status === 403) {
                    if (errorMessage === "ip_error") {
                        // 여기서 setErrorMessage 사용
                        setErrorMessage("다른 곳에서 로그인 중이며 로그아웃 처리됩니다.");
                        logout();
                        return new Promise(() => {}); // 빈 Promise로 후속 처리 방지
                    }
                    logout();
                    return new Promise(() => {}); // 후속 처리가 되지 않도록 함
                }
                setErrorMessage(errorMessage);
            }

            return Promise.reject(error);
        }
    );
};

export { axiosClient, setAxiosInterceptors };