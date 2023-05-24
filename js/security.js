function encodeByAES256(key, data) {
    var cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString();
}

function decodeByAES256(key, data) {
    var cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(""),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    });
    return cipher.toString(CryptoJS.enc.Utf8);
}

function encrypt_text(password) {
    var k = "key"; // 클라이언트 키
    var rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    var b = password;
    var eb = encodeByAES256(rk, b);
    return eb;
}

function decrypt_text() {
    var k = "key"; // 서버의 키
    var rk = k.padEnd(32, " "); // AES256은 key 길이가 32
    var eb = session_get();
    var b = decodeByAES256(rk, eb);
    console.log(b);
}