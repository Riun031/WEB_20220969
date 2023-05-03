function login(){
    let form = document.querySelector("#form_main");
    let id = document.querySelector("#floatingInput");
    let password = document.querySelector("#floatingPassword");
    
    form.action = "../index_login.html";
    form.method = "get";
    
    if(id.value.length === 0 || password.value.length === 0){
        alert("아이디와 비밀번호를 모두 입력해주세요.");
    }else{
        form.submit();
    }
}
function logout(){
    location.href='../index.html';
}
