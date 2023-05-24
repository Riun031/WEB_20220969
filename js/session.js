/*
function session_del() {
    if (sessionStorage) {
        sessionStorage.removeItem("Session_Storage_test");
        alert("로그아웃 버튼 클릭 확인: 세션 스토리지를 삭제합니다.");
    } else {
        alert("세션 스토리지를 지원하지 않습니다.");
    }
}
function session_set() { // 세션 저장
    var id = document.querySelector("#floatingInput");
    var password = document.querySelector("#floatingPassword");
    if (sessionStorage) {
        var en_text = encrypt_text(password.value);
        sessionStorage.setItem("Session_Storage_test", en_text);
    } else {
        alert("로컬 스토리지를 지원하지 않습니다.");
    }
}
*/
function session_get() { // 세션 읽기
    if (sessionStorage.getItem("Session_Storage_test")) {
        decrypt_text();
    } else {
        alert("세션 스토리지를 지원하지 않습니다.");
    }
}
function session_check() {
    if (sessionStorage.getItem("Session_Storage_test")) {
        alert("이미 로그인되었습니다.");
        location.href = 'index_login.html'; // 로그인된 페이지로 이동
    }
}
function session_timeout() {
    setTimeout(function () {
        session_del(); // 세션 삭제
        location.href = "../index.html"; // 메인 페이지로 이동
    }, 100000); // 5분 (300,000밀리초)
}
function session_set(){ //세션 저장(객체)    
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    let random = new Date(); // 랜덤 타임스탬프
    
    const obj = { // 객체 선언
    id : id.value,
    otp : random
    }
    
    if (sessionStorage) {
        const objString = JSON.stringify(obj); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encrypted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }   
}
function session_join_set(){ //세션 저장(객체)    
    let f_name = document.querySelector("#firstName").value;
    let l_name = document.querySelector("#lastName").value;
    let b_day = document.querySelector("#birthdayDate").value;
    let gender = document.querySelector("#inlineRadioOptions");
    let email = document.querySelector("#emailAddress").value;
    let p_number = document.querySelector("#phoneNumber").value;
    let class_check = document.querySelector(".select form-control-lg");
    let random = new Date(); // 랜덤 타임스탬프
    
    const newSignUp = new SignUp(f_name, l_name, b_day, gender, email, p_number, class_check, random);
    console.log(newSignUp.fullName); // John Doe
    console.log(newSignUp.contactInfo); // johndoe@email.com 123-456-7890
    
    if (sessionStorage) {
        const objString = JSON.stringify(newSignUp); // 객체 -> JSON 문자열 변환
        let en_text = encrypt_text(objString); // 암호화
        sessionStorage.setItem("Session_Storage_object", objString);
        sessionStorage.setItem("Session_Storage_encryted", en_text);
    } else {
        alert("세션 스토리지 지원 x");
    }   
}
