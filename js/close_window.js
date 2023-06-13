var close_time;
var close_time2 = 10;

clearTimeout(close_time);
close_time = setTimeout(close_window, 10000);
show_time();

function show_time() {
  var divClock = document.getElementById('Time');
  var remaining_time = close_time2 > 0 ? close_time2 : 0;
  divClock.innerText = "남은 시간은 " + remaining_time + "초 입니다."; // "남은 시간은 n초 입니다." 형식으로 변경
  close_time2--;
  setTimeout(show_time, 1000);
}

function close_window() {
  window.close();
}
//window.onload=showWindow;
