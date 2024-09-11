"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./src/axiosApi/axiosClient.js":
/*!*************************************!*\
  !*** ./src/axiosApi/axiosClient.js ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   axiosClient: function() { return /* binding */ axiosClient; }\n/* harmony export */ });\n/* harmony import */ var _swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @swc/helpers/_/_async_to_generator */ \"./node_modules/@swc/helpers/esm/_async_to_generator.js\");\n/* harmony import */ var _swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @swc/helpers/_/_ts_generator */ \"./node_modules/@swc/helpers/esm/_ts_generator.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n\n\n\nvar axiosClient = axios__WEBPACK_IMPORTED_MODULE_0__[\"default\"].create({\n    baseURL: \"http://localhost:8080/api\",\n    headers: {\n        \"Content-Type\": \"application/json\"\n    }\n});\n// 요청 인터셉터\n// /reissue 요청 외의 모든 요청의 헤더에 Authorization 라는 이름으로 token을 넣어서 전송한다.\naxiosClient.interceptors.request.use(function(config) {\n    if (config.url !== \"/auth/reissue\") {\n        var token = localStorage.getItem(\"token\");\n        if (token) {\n            config.headers[\"Authorization\"] = \"Bearer \".concat(token);\n            console.log(\"token was added\");\n        }\n    }\n    return config;\n}, function(error) {\n    return Promise.reject(error);\n});\n//** acces 토큰을 refresh 토큰을 이용하여 새로 발급받는 메소드  **//\n// 헤더에 Authorization 라는 이름으로 refreshToken을 /reissue 엔드포인트로 반환,\n// 서버로부터 새로운 access토큰을 헤더로, refresh토큰을 data로 반환받는다\nvar getNewAccessToken = function() {\n    var _ref = (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_1__._)(function() {\n        var refreshToken, response, newAccessToken, newRefreshToken, error;\n        return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_2__._)(this, function(_state) {\n            switch(_state.label){\n                case 0:\n                    console.log(\"accessToken 재발급 절차 진행\");\n                    _state.label = 1;\n                case 1:\n                    _state.trys.push([\n                        1,\n                        3,\n                        ,\n                        4\n                    ]);\n                    refreshToken = localStorage.getItem(\"refresh\");\n                    console.log(\"Reissue request sent with refresh token:\", refreshToken);\n                    return [\n                        4,\n                        axiosClient.post(\"/auth/reissue\", null, {\n                            headers: {\n                                Authorization: \"Bearer \".concat(refreshToken)\n                            }\n                        })\n                    ];\n                case 2:\n                    response = _state.sent();\n                    console.log(\"Reissue response received:\", response);\n                    // 응답 바디에서 액세스 토큰을 추출합니다.\n                    newAccessToken = response.data.accessToken; // 서버가 액세스 토큰을 응답 바디에 포함하도록 해야 함\n                    if (!newAccessToken) {\n                        throw new Error(\"Access token missing in reissue response\");\n                    }\n                    localStorage.setItem(\"token\", newAccessToken);\n                    // 서버에서 반환한 새로운 리프레시 토큰이 있는 경우 저장\n                    newRefreshToken = response.data.refresh; // 서버가 리프레시 토큰을 응답 바디에 포함하도록 해야 함\n                    if (newRefreshToken) {\n                        localStorage.setItem(\"refresh\", newRefreshToken);\n                    }\n                    return [\n                        2,\n                        newAccessToken\n                    ];\n                case 3:\n                    error = _state.sent();\n                    if (error.response && error.response.data.error === \"Refresh token is invalid or expired\") {\n                        logout();\n                    } else {\n                        console.error(\"An error occurred:\", error);\n                    }\n                    return [\n                        2,\n                        null\n                    ];\n                case 4:\n                    return [\n                        2\n                    ];\n            }\n        });\n    });\n    return function getNewAccessToken() {\n        return _ref.apply(this, arguments);\n    };\n}();\n// 응답 인터셉터\n// 서버로부터 돌아온 응답을 가로채어 정상적인 response라면 그대로 반환, \n// 에러가 발생하면 에러발생시 error.config 로 돌아오는 요청 객체를 originalRequest에 저장, \n// 만약 엑세스 토큰이 만료되었다는 에러인 401 에러가 발생하면 getNewAccessToken() 메소드를 실행, access토큰을 재발급 요청하고,\n// 해당 요청에서 401 에러 발생시(refreshToken 또한 expired) 무한 루프로 들어가기 떄문에 \n// originalRequest._retry 라는 설정되지 않은(false or undefined 반환)속성을 새로 flag로 사용하여, 무한루프를 방지하며,  \n// 새롭게 발급받은 access토큰을 헤더에 넣어 실패한 요청을 다시 요청하고, access토큰을 로컬 스토리지에 저장한다.\naxiosClient.interceptors.response.use(function(response) {\n    return response;\n}, function() {\n    var _ref = (0,_swc_helpers_async_to_generator__WEBPACK_IMPORTED_MODULE_1__._)(function(error) {\n        var originalRequest, newAccessToken;\n        return (0,_swc_helpers_ts_generator__WEBPACK_IMPORTED_MODULE_2__._)(this, function(_state) {\n            switch(_state.label){\n                case 0:\n                    originalRequest = error.config;\n                    if (!error.response) return [\n                        3,\n                        3\n                    ];\n                    if (!(error.response.status === 401 && !originalRequest._retry)) return [\n                        3,\n                        2\n                    ];\n                    originalRequest._retry = true;\n                    return [\n                        4,\n                        getNewAccessToken()\n                    ];\n                case 1:\n                    newAccessToken = _state.sent();\n                    if (newAccessToken) {\n                        originalRequest.headers[\"Authorization\"] = \"Bearer \".concat(newAccessToken);\n                        return [\n                            2,\n                            axiosClient(originalRequest)\n                        ];\n                    }\n                    _state.label = 2;\n                case 2:\n                    if (error.response.status === 403) {\n                        logout();\n                        return [\n                            2,\n                            new Promise(function() {})\n                        ]; // 새로운 빈 Promise 반환하여 후속 처리가 되지 않게 함\n                    }\n                    _state.label = 3;\n                case 3:\n                    return [\n                        2,\n                        Promise.reject(error)\n                    ];\n            }\n        });\n    });\n    return function(error) {\n        return _ref.apply(this, arguments);\n    };\n}());\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dEU7OztvQkFHSjs7d0JBQU9BLFFBQVFDLE1BQU0sQ0FBQ0Y7Ozs7SUFDMUI7b0JBcEJPQTs7OztBQXVCWSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXhpb3NBcGkvYXhpb3NDbGllbnQuanM/ZDRjNyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCI7XHJcblxyXG5jb25zdCBheGlvc0NsaWVudCA9IGF4aW9zLmNyZWF0ZSh7XHJcbiAgICBiYXNlVVJMOiBcImh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9hcGlcIixcclxuICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXHJcbiAgICB9LFxyXG59KTtcclxuXHJcblxyXG4vLyDsmpTssq0g7J247YSw7IWJ7YSwXHJcbi8vIC9yZWlzc3VlIOyalOyyrSDsmbjsnZgg66qo65OgIOyalOyyreydmCDtl6TrjZTsl5AgQXV0aG9yaXphdGlvbiDrnbzripQg7J2066aE7Jy866GcIHRva2Vu7J2EIOuEo+yWtOyEnCDsoITshqHtlZzri6QuXHJcbmF4aW9zQ2xpZW50LmludGVyY2VwdG9ycy5yZXF1ZXN0LnVzZShcclxuICAgIGNvbmZpZyA9PiB7XHJcbiAgICAgICAgaWYgKGNvbmZpZy51cmwgIT09ICcvYXV0aC9yZWlzc3VlJykgeyAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8g6rOg7LKY7JW864yQXHJcbiAgICAgICAgICAgIGNvbnN0IHRva2VuID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rva2VuJyk7XHJcbiAgICAgICAgICAgIGlmICh0b2tlbikge1xyXG4gICAgICAgICAgICAgICAgY29uZmlnLmhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHt0b2tlbn1gO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0b2tlbiB3YXMgYWRkZWRcIilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29uZmlnO1xyXG4gICAgfSxcclxuICAgIGVycm9yID0+IFByb21pc2UucmVqZWN0KGVycm9yKVxyXG4pO1xyXG5cclxuLy8qKiBhY2NlcyDthqDtgbDsnYQgcmVmcmVzaCDthqDtgbDsnYQg7J207Jqp7ZWY7JesIOyDiOuhnCDrsJzquInrsJvripQg66mU7IaM65OcICAqKi8vXHJcbi8vIO2XpOuNlOyXkCBBdXRob3JpemF0aW9uIOudvOuKlCDsnbTrpoTsnLzroZwgcmVmcmVzaFRva2Vu7J2EIC9yZWlzc3VlIOyXlOuTnO2PrOyduO2KuOuhnCDrsJjtmZgsXHJcbi8vIOyEnOuyhOuhnOu2gO2EsCDsg4jroZzsmrQgYWNjZXNz7Yag7YGw7J2EIO2XpOuNlOuhnCwgcmVmcmVzaO2GoO2BsOydhCBkYXRh66GcIOuwmO2ZmOuwm+uKlOuLpFxyXG5jb25zdCBnZXROZXdBY2Nlc3NUb2tlbiA9IGFzeW5jICgpID0+IHtcclxuICAgIGNvbnNvbGUubG9nKCdhY2Nlc3NUb2tlbiDsnqzrsJzquIkg7KCI7LCoIOynhO2WiScpO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZWZyZXNoVG9rZW4gPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncmVmcmVzaCcpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdSZWlzc3VlIHJlcXVlc3Qgc2VudCB3aXRoIHJlZnJlc2ggdG9rZW46JywgcmVmcmVzaFRva2VuKTtcclxuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zQ2xpZW50LnBvc3QoJy9hdXRoL3JlaXNzdWUnLCBudWxsLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogYEJlYXJlciAke3JlZnJlc2hUb2tlbn1gXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnUmVpc3N1ZSByZXNwb25zZSByZWNlaXZlZDonLCByZXNwb25zZSk7XHJcblxyXG4gICAgICAgIC8vIOydkeuLtSDrsJTrlJTsl5DshJwg7JWh7IS47IqkIO2GoO2BsOydhCDstpTstpztlanri4jri6QuXHJcbiAgICAgICAgY29uc3QgbmV3QWNjZXNzVG9rZW4gPSByZXNwb25zZS5kYXRhLmFjY2Vzc1Rva2VuOyAvLyDshJzrsoTqsIAg7JWh7IS47IqkIO2GoO2BsOydhCDsnZHri7Ug67CU65SU7JeQIO2PrO2VqO2VmOuPhOuhnSDtlbTslbwg7ZWoXHJcbiAgICAgICAgaWYgKCFuZXdBY2Nlc3NUb2tlbikge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjY2VzcyB0b2tlbiBtaXNzaW5nIGluIHJlaXNzdWUgcmVzcG9uc2UnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2tlbicsIG5ld0FjY2Vzc1Rva2VuKTtcclxuXHJcbiAgICAgICAgLy8g7ISc67KE7JeQ7IScIOuwmO2ZmO2VnCDsg4jroZzsmrQg66as7ZSE66CI7IucIO2GoO2BsOydtCDsnojripQg6rK97JqwIOyggOyepVxyXG4gICAgICAgIGNvbnN0IG5ld1JlZnJlc2hUb2tlbiA9IHJlc3BvbnNlLmRhdGEucmVmcmVzaDsgLy8g7ISc67KE6rCAIOumrO2UhOugiOyLnCDthqDtgbDsnYQg7J2R64u1IOuwlOuUlOyXkCDtj6ztlajtlZjrj4TroZ0g7ZW07JW8IO2VqFxyXG4gICAgICAgIGlmIChuZXdSZWZyZXNoVG9rZW4pIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3JlZnJlc2gnLCBuZXdSZWZyZXNoVG9rZW4pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ld0FjY2Vzc1Rva2VuO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2UgJiYgZXJyb3IucmVzcG9uc2UuZGF0YS5lcnJvciA9PT0gJ1JlZnJlc2ggdG9rZW4gaXMgaW52YWxpZCBvciBleHBpcmVkJykge1xyXG4gICAgICAgICAgICBsb2dvdXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdBbiBlcnJvciBvY2N1cnJlZDonLCBlcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbi8vIOydkeuLtSDsnbjthLDshYnthLBcclxuLy8g7ISc67KE66Gc67aA7YSwIOuPjOyVhOyYqCDsnZHri7XsnYQg6rCA66Gc7LGE7Ja0IOygleyDgeyggeyduCByZXNwb25zZeudvOuptCDqt7jrjIDroZwg67CY7ZmYLCBcclxuLy8g7JeQ65+s6rCAIOuwnOyDne2VmOuptCDsl5Drn6zrsJzsg53si5wgZXJyb3IuY29uZmlnIOuhnCDrj4zslYTsmKTripQg7JqU7LKtIOqwneyytOulvCBvcmlnaW5hbFJlcXVlc3Tsl5Ag7KCA7J6lLCBcclxuLy8g66eM7JW9IOyXkeyEuOyKpCDthqDtgbDsnbQg66eM66OM65CY7JeI64uk64qUIOyXkOufrOyduCA0MDEg7JeQ65+s6rCAIOuwnOyDne2VmOuptCBnZXROZXdBY2Nlc3NUb2tlbigpIOuplOyGjOuTnOulvCDsi6TtloksIGFjY2Vzc+2GoO2BsOydhCDsnqzrsJzquIkg7JqU7LKt7ZWY6rOgLFxyXG4vLyDtlbTri7kg7JqU7LKt7JeQ7IScIDQwMSDsl5Drn6wg67Cc7IOd7IucKHJlZnJlc2hUb2tlbiDrmJDtlZwgZXhwaXJlZCkg66y07ZWcIOujqO2UhOuhnCDrk6TslrTqsIDquLAg65aE66y47JeQIFxyXG4vLyBvcmlnaW5hbFJlcXVlc3QuX3JldHJ5IOudvOuKlCDshKTsoJXrkJjsp4Ag7JWK7J2AKGZhbHNlIG9yIHVuZGVmaW5lZCDrsJjtmZgp7IaN7ISx7J2EIOyDiOuhnCBmbGFn66GcIOyCrOyaqe2VmOyXrCwg66y07ZWc66Oo7ZSE66W8IOuwqeyngO2VmOupsCwgIFxyXG4vLyDsg4jroa3qsowg67Cc6riJ67Cb7J2AIGFjY2Vzc+2GoO2BsOydhCDtl6TrjZTsl5Ag64Sj7Ja0IOyLpO2MqO2VnCDsmpTssq3snYQg64uk7IucIOyalOyyre2VmOqzoCwgYWNjZXNz7Yag7YGw7J2EIOuhnOy7rCDsiqTthqDrpqzsp4Dsl5Ag7KCA7J6l7ZWc64ukLlxyXG5heGlvc0NsaWVudC5pbnRlcmNlcHRvcnMucmVzcG9uc2UudXNlKFxyXG4gICAgcmVzcG9uc2UgPT4gcmVzcG9uc2UsXHJcbiAgICBhc3luYyAoZXJyb3IpID0+IHtcclxuICAgICAgICBjb25zdCBvcmlnaW5hbFJlcXVlc3QgPSBlcnJvci5jb25maWc7XHJcblxyXG4gICAgICAgIGlmIChlcnJvci5yZXNwb25zZSkge1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDEgJiYgIW9yaWdpbmFsUmVxdWVzdC5fcmV0cnkpIHtcclxuICAgICAgICAgICAgICAgIG9yaWdpbmFsUmVxdWVzdC5fcmV0cnkgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3QWNjZXNzVG9rZW4gPSBhd2FpdCBnZXROZXdBY2Nlc3NUb2tlbigpO1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld0FjY2Vzc1Rva2VuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSZXF1ZXN0LmhlYWRlcnNbJ0F1dGhvcml6YXRpb24nXSA9IGBCZWFyZXIgJHtuZXdBY2Nlc3NUb2tlbn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBheGlvc0NsaWVudChvcmlnaW5hbFJlcXVlc3QpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZXJyb3IucmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcclxuICAgICAgICAgICAgICAgIGxvZ291dCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKCgpID0+IHt9KTsgLy8g7IOI66Gc7Jq0IOu5iCBQcm9taXNlIOuwmO2ZmO2VmOyXrCDtm4Tsho0g7LKY66as6rCAIOuQmOyngCDslYrqsowg7ZWoXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcclxuICAgIH1cclxuKTtcclxuXHJcbmV4cG9ydCB7IGF4aW9zQ2xpZW50IH07Il0sIm5hbWVzIjpbImF4aW9zIiwiYXhpb3NDbGllbnQiLCJjcmVhdGUiLCJiYXNlVVJMIiwiaGVhZGVycyIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJ1c2UiLCJjb25maWciLCJ1cmwiLCJ0b2tlbiIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJjb25zb2xlIiwibG9nIiwiZXJyb3IiLCJQcm9taXNlIiwicmVqZWN0IiwiZ2V0TmV3QWNjZXNzVG9rZW4iLCJyZWZyZXNoVG9rZW4iLCJyZXNwb25zZSIsIm5ld0FjY2Vzc1Rva2VuIiwibmV3UmVmcmVzaFRva2VuIiwicG9zdCIsImRhdGEiLCJhY2Nlc3NUb2tlbiIsIkVycm9yIiwic2V0SXRlbSIsInJlZnJlc2giLCJsb2dvdXQiLCJvcmlnaW5hbFJlcXVlc3QiLCJzdGF0dXMiLCJfcmV0cnkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/axiosApi/axiosClient.js\n"));

/***/ })

});