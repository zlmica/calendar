var icon = document.querySelector('.app')
var box = document.querySelector('.calendar')

icon.onclick = function (e) {
    icon.style.display = 'none'
    box.style.display = "block"
    var event = e || window.event;
    if(event && event.stopPropagation)
    {
        event.stopPropagation();
    }
}
box.onclick = function (e) {
    var event = e || window.event;
    if(event && event.stopPropagation)
    {
        event.stopPropagation();
    }
}
document.onclick = function (e) {
    box.style.display = 'none'
    icon.style.display = 'block'
}

var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var month_name = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
var holder = document.querySelector("#days");
var prev = document.querySelector("#prev");
var next = document.querySelector("#next");
var ctitle = document.querySelector("#calendar-title");
var cyear = document.querySelector("#calendar-year");
var my_date = new Date();
var my_year = my_date.getFullYear();
var my_month = my_date.getMonth();
var my_day = my_date.getDate();
document.querySelector('.month').innerHTML = my_month + 1 +'月'
document.querySelector('.day').innerHTML = my_day
prev.onclick = function(e) {
    e.preventDefault();
    my_month--;
    if (my_month < 0) {
        my_year--;
        my_month = 11;
    }
    refreshDate();
}
next.onclick = function(e) {
    e.preventDefault();
    my_month++;
    if (my_month > 11) {
        my_year++;
        my_month = 0;
    }
    refreshDate();
}

function refreshDate() {
    var str = "";
    var totalDay = daysMonth(my_month, my_year); //获取该月总天数
    var firstDay = dayStart(my_month, my_year); //获取该月第一天是星期几
    var myclass;
    for (var i = 0; i < firstDay; i++) {
        str += "<li></li>"; //为起始日之前的日期创建空白节点
    }
    for (var i = 1; i <= totalDay; i++) {
        if ((i < my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) || my_year < my_date.getFullYear() || (my_year == my_date.getFullYear() && my_month < my_date.getMonth())) {
            myclass = " class='lightgrey'"; //当该日期在今天之前时，以浅灰色字体显示
        } else if (i == my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) {
            myclass = " class='theme themebox'"; //当该日期是当天时，以主题色背景突出显示
        } else {
            myclass = " class='darkgrey'"; //当该日期在今后之后时，以深灰字体显示
        }
        str += "<li" + myclass + ">" + i + "</li>"; //创建日期节点
    }
    holder.innerHTML = str; //设置日期显示
    ctitle.innerHTML = month_name[my_month]; //设置月份显示
    cyear.innerHTML = my_year; //设置年份显示
}
//获取某年某月第一天是星期几
function dayStart(month, year) {
    var tmpDate = new Date(year, month, 1);
    return (tmpDate.getDay());
}

//计算某年是不是闰年，通过求年份除以4的余数即可
function daysMonth(month, year) {
    var tmp = year % 4;
    if (tmp == 0) {
        return (month_olympic[month]);
    } else {
        return (month_normal[month]);
    }
}
refreshDate();