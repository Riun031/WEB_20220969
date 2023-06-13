function addJavascript(jsname) { // 자바스크립트 외부 연동
var th = document.getElementsByTagName('head')[0];
var s = document.createElement('script');
s.setAttribute('type','text/javascript');
s.setAttribute('src',jsname);
th.appendChild(s);
}
addJavascript('/js/security.js'); // 암복호화 함수
addJavascript('/js/session.js'); // 세션 함수
addJavascript('/js/cookie.js'); // 쿠키 함수

function login_count() {
var count = parseInt(getCookie("login_cnt")) || 0;
setCookie("login_cnt", count + 1, 1);
}

function logout_count() {
var count = parseInt(getCookie("logout_cnt")) || 0;
setCookie("logout_cnt", count + 1, 1);
}

function login() { // 로그인
var form = document.querySelector("#form_main");
var id = document.querySelector("#floatingInput");
var password = document.querySelector("#floatingPassword");
var check = document.querySelector("#idSaveCheck");

form.action = "../index_login.html";
form.method = "get";

if (check.checked == true) { // 아이디 체크 O
    alert("아이디를 저장합니다.");
    setCookie("id", id.value, 1); // 1일 저장
    login_count();
    alert("아이디 값: " + id.value);
} else { // 아이디 체크 X
    setCookie("id", id.value, 0); // 날짜를 0으로 설정하여 쿠키 삭제
}

if (id.value.length === 0 || password.value.length === 0) {
    alert("아이디와 비밀번호를 모두 입력해주세요.");
} else {
    session_set(); // 세션 생성
    form.submit();
}
}

function logout() {
    session_del(); // 세션 삭제
    setTimeout(function() { location.href = "../index.html"; }, 100);
}

function get_id() {
var getParameters = function (paramName) {
var returnValue;
var url = location.href;
var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
for (var i = 0; i < parameters.length; i++) {
var varName = parameters[i].split('=')[0];
if (varName.toUpperCase() == paramName.toUpperCase()) {
returnValue = parameters[i].split('=')[1];
return decodeURIComponent(returnValue);
}
}
};


alert(getParameters('id') + '님 반갑습니다!');
}

function init() { // 로그인 폼에 쿠키에서 가져온 아이디 입력
var id = document.querySelector("#floatingInput");
var check = document.querySelector("#idSaveCheck");
var get_id = getCookie("id");


if (get_id) {
    id.value = get_id;
    check.checked = true;
}

session_check(); // 세션 유무 검사
}

function login_failed_limit() {
var count = parseInt(getCookie("login_failed_cnt")) || 0;
count++;
setCookie("login_failed_cnt", count, 365);


if (count >= 3) {
    alert("로그인이 제한되었습니다.");
    document.querySelector("#loginBtn").disabled = true;
}
}

function clear_login_failed_count() {
setCookie("login_failed_cnt", 0, 365);
}