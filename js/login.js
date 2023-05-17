/*function login() {
    /*let id_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let password_pattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{10,}$/;
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let check = document.querySelector("#idSaveCheck");


    if (!id_pattern.test(id_input)) {
        alert("이메일 형식이 올바르지 않습니다.");
        return false;
    }

    if (!password_pattern.test(password_input)) {
        alert("비밀번호는 최소 10자 이상이며, 영문, 숫자, 특수문자가 모두 포함되어야 합니다.");
        return false;
    }

    return true;
}*/
function setCookie(name, value, expiredays) {
    var date = new Date();
    date.setDate(date.getDate() + expiredays);
    document.cookie = escape(name) + "=" + escape(value) + "; expires=" + date.toUTCString() + "; SameSite=None; Secure";        
}

function getCookie(name) {
    var cookie = document.cookie;
    if (cookie != "") {
        var cookie_array = cookie.split("; ");
        for ( var index in cookie_array) {
            var cookie_name = cookie_array[index].split("=");
            if (cookie_name[0] == name) {
                return cookie_name[1];
            }
        }
    }
    return ;
}
function session_set() { //세션 저장
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    if (sessionStorage) {
        let en_text = encrypt_text(password.value);
        sessionStorage.setItem("Session_Storage_test", en_text);


    } else {
        alert("로컬 스토리지 지원 x");
    }
}
function session_get() { //세션 읽기
    if(true){
        decrypt_text();
    }
    else{

        alert("세션 스토리지 지원 x");
    }
}


function login_count() {
    var count = parseInt(getCookie("login_cnt")) || 0;
    setCookie("login_cnt", count + 1, 1);
}

function logout_count() {
    var count = parseInt(getCookie("logout_cnt")) || 0;
    setCookie("logout_cnt", count + 1, 1);
}
function encodeByAES256(key, data){
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decodeByAES256(key, data){
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
};
function encrypt_text(password){
    const k = "key"; // 클라이언트 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const b = password;
    const eb = this.encodeByAES256(rk, b);
    return eb;
    console.log(eb);
}

function decrypt_text(){
    const k = "key"; // 서버의 키
    const rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    const eb = session_get();
    const b = this.decodeByAES256(rk, eb);
    console.log(b); 
}


function login(){ // 로그인
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let check = document.querySelector("#idSaveCheck");
    
    form.action = "../index_login.html";
    form.method = "get";
    
	function session_check() { //세션 검사
    if (sessionStorage.getItem("Session_Storage_test")) {
        alert("이미 로그인 되었습니다.");
        location.href='index_login.html'; // 로그인된 페이지로 이동
    }
}

    if(check.checked == true) { // 아이디 체크 o
            alert("아이디를 저장합니다.");
            setCookie("id", id.value, 1); // 1일 저장
            login_count();
            alert("아이디 값 :" + id.value);
        } 
    else { // 아이디 체크 x
            setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
    }
    
    if(id.value.length === 0 || password.value.length === 0){
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    }else{
		session_set(); // 세션 생성
        form.submit();
    }
}



function logout() {
    session_del(); // 세션 삭제
    location.href = "../index.html";
}

function get_id() {
    var getParameters = function (paramName) { // 변수 = 함수(이름)
        var returnValue; // 리턴값을 위한 변수 선언
        var url = location.href; // 현재 접속 중인 주소 정보 저장
        var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&'); // ?기준 slice 한 후 split 으로 나눔
        for (var i = 0; i < parameters.length; i++) {
            var varName = parameters[i].split('=')[0];
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
                // 나누어진 값의 비교를 통해 paramName 으로 요청된 데이터의 값만 return
            }
        } // 2중 for문 끝
    }; // 함수 끝
    alert(getParameters('id') + '님 반갑습니다!'); // 메시지 창 출력
}
function session_del() {//세션 삭제
    // Check if the sessionStorage object exists
    if (sessionStorage) {
        // Retrieve data
        sessionStorage.removeItem("Session_Storage_test");
        alert('로그아웃 버튼 클릭 확인 : 세션 스토리지를 삭제합니다.');
    } else {
        alert("세션 스토리지 지원 x");
    }
}

function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id");
    
    if(get_id) { 
    id.value = get_id; 
    check.checked = true; 
    }
	session_check(); // 세션 유무 검사
}