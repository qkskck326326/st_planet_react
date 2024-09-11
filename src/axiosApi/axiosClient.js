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

//** acces 토큰을 refresh 토큰을 이용하여 새로 발급받는 메소드  **//
// 헤더에 Authorization 라는 이름으로 refreshToken을 /reissue 엔드포인트로 반환,
// 서버로부터 새로운 access토큰을 헤더로, refresh토큰을 data로 반환받는다
const getNewAccessToken = async () => {
    console.log('accessToken 재발급 절차 진행');
    try {
        const refreshToken = localStorage.getItem('refresh');
        console.log('Reissue request sent with refresh token:', refreshToken);
        const response = await axiosClient.post('/auth/reissue', null, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });
        console.log('Reissue response received:', response);

        // 응답 바디에서 액세스 토큰을 추출합니다.
        const newAccessToken = response.data.accessToken; // 서버가 액세스 토큰을 응답 바디에 포함하도록 해야 함
        if (!newAccessToken) {
            throw new Error('Access token missing in reissue response');
        }

        localStorage.setItem('token', newAccessToken);

        // 서버에서 반환한 새로운 리프레시 토큰이 있는 경우 저장
        const newRefreshToken = response.data.refresh; // 서버가 리프레시 토큰을 응답 바디에 포함하도록 해야 함
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
axiosClient.interceptors.response.use(
    response => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const newAccessToken = await getNewAccessToken();
                if (newAccessToken) {
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosClient(originalRequest);
                }
            }

            if (error.response.status === 403) {
                logout();
                return new Promise(() => {}); // 새로운 빈 Promise 반환하여 후속 처리가 되지 않게 함
            }
        }
        
        return Promise.reject(error);
    }
);

export { axiosClient };