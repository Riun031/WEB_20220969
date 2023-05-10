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
function deleteCookie(cookieName){
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
}
function init(){ // 로그인 폼에 쿠키에서 가져온 아이디 입력
    let id = document.querySelector("#floatingInput");
    let check = document.querySelector("#idSaveCheck");
    let get_id = getCookie("id");
    
    if(get_id) { 
    id.value = get_id; 
    check.checked = true; 
    }
}

function login() {
    const form = document.querySelector("#form_main");
    const id = document.querySelector("#floatingInput").value.trim();
    const password = document.querySelector("#floatingPassword").value.trim();

    form.action = "../index_login.html";
    form.method = "get";
	
	    if(check.checked == true) { // 아이디 체크 o
            alert("쿠키를 저장합니다.");
            setCookie("id", id.value, 1); // 1일 저장
            alert("쿠키 값 :" + id.value);
        } 
    else { // 아이디 체크 x
            setCookie("id", id.value, 0); //날짜를 0 - 쿠키 삭제
    }


    if (id.length === 0 || password.length === 0) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    } else if (login_check()) {
        form.submit();
    }
}

function logout() {
    location.href = "../index.html";
}

function get_id() {
    const getParameters = function (paramName) {
        const url = location.href;
        const parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
        for (let i = 0; i < parameters.length; i++) {
            const varName = parameters[i].split('=')[0];
            if (varName.toUpperCase() == paramName.toUpperCase()) {
                const returnValue = parameters[i].split('=')[1];
                return decodeURIComponent(returnValue);
            }
        }
    };

    const id = getParameters('id');
    const nickname = id ? id.split("@")[0] : "";
    alert(nickname + '님 반갑습니다!');
}