var search_array = [];
var filter_words = ['씨발', '병신', '개새끼'];
var max_search_count = 10;

function search_message() {
  var search_str = document.querySelector("#search_txt").value;
  if (search_str.length === 0) {
    alert("검색어가 비었습니다. 입력해주세요");
  } else if (search_str.length > 10) {
    alert("검색어는 10자 이내로 입력해주세요.");
  } else {
    // 검색어 필터링 기능 추가!
    for (var i = 0; i < filter_words.length; i++) {
      if (search_str.indexOf(filter_words[i]) !== -1) {
        alert("검색어에 비속어가 포함되어 있습니다.");
        return;
      }
    }
    alert("검색을 수행합니다!");
    search_array.push(search_str);
    if (search_array.length > max_search_count) {
      search_array.shift(); // 맨 앞의 검색어 삭제
    }
    document.getElementById("search_message").innerHTML = search_array.toString();
    document.querySelector("#form_main").submit();
  }
}

document.getElementById("search_btn").addEventListener("click", search_message);