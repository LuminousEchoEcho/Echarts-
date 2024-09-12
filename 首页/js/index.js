// 零配件监控区域模块制作
(function () {
    $('.monitor .tabs').on('click', 'a', function () {
        $(this).addClass('active').siblings('a').removeClass('active');
        $('.monitor .content').eq($(this).index()).show().siblings('.content').hide();
    });
    $('.marquee-view .marquee').each(function () {
        var rows = $(this).children().clone();
        $(this).append(rows);
    })
})();

// 维修监控区域模块制作
(function () {
    $('.monitor1 .tabs').on('click', 'a', function () {
        $(this).addClass('active').siblings('a').removeClass('active');
        $('.monitor1 .content').eq($(this).index()).show().siblings('.content').hide();
    });
    $('.marquee-view .marquee').each(function () {
        var rows = $(this).children().clone();
        $(this).append(rows);
    })
})();

// 设备状态模块
(function () {
    var myChart = echarts.init(document.querySelector('.pie'));
    var option = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            top: '5%',
            left: 'center'
        },
        series: [
            {
                name: '设备状态',
                type: 'pie',
                radius: ['40%', '55%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 40,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: [
                    { value: 1985, name: '正常' },
                    { value: 68, name: '变卖' },
                    { value: 38, name: '闲置' },
                    { value: 13, name: '禁用' },
                ]
            }
        ]
    };
    myChart.setOption(option);
    // 图表缩放
    window.addEventListener('resize', function () {
        myChart.resize()
    })
})();

// 维修单统计模块
(function () {
    // tab栏切换效果(1)准备数据
    var data = {
        year: [
            [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
            [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
            [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
        ],
        month: [
            [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
            [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
        ],
        week: [
            [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
            [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
        ]
    }
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".line"));
    // 2. 指定配置和数据
    var option = {
        tooltip: {
            trigger: "axis"
        },
        // 图例组件
        legend: {
            textStyle: {
                color: '#4c9bfd' // 图例文字颜色
            },
            right: '10%', // 距离右边10%
        },

        grid: {
            top: "20%",
            left: "3%",
            right: "4%",
            bottom: "3%",
            show: true,
            borderColor: "#012f4a",
            containLabel: true
        },

        xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
            axisTick: {
                show: false // 去除刻度线
            },
            axisLabel: {
                color: '#4c9bfd' // 文本颜色
            },
            axisLine: {
                show: false // 去除轴线
            },
            axisLabel: {
                color: '#333' // 文字颜色
            },
            boundaryGap: false  // 去除轴内间距
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false  // 去除刻度
            },
            axisLabel: {
                color: '#333' // 文字颜色
            },
            splitLine: {
                lineStyle: {
                    color: '#dbdbdc' // 分割线颜色
                }
            }
        },

        color: ['#00f2f1', '#ed3f35'],
        series: [{
            name: '上次维修单',
            data: data.year[0],
            type: 'line',
            // 折线修饰为圆滑
            smooth: true,
        }, {
            name: '本次维修单',
            data: data.year[1],
            type: 'line',
            smooth: true,
        }]
    };

    // 3. 把配置和数据给实例对象
    myChart.setOption(option);
    // 4. tab栏切换效果
    // (2) 点击切换
    $('.repair_data .caption').on('click', 'a', function () {
        index = $(this).index() - 1;
        $(this).addClass('active').siblings('a').removeClass('active');
        var arr = data[this.dataset.type];
        option.series[0].data = arr[0];
        option.series[1].data = arr[1];
        myChart.setOption(option);
    });
    // 5. tab栏自动切换效果
    var as = $('.repair_data .caption a');
    var index = 0;
    var timer = setInterval(function () {
        index++;
        if (index >= 4) index = 0;
        as.eq(index).click();
    }, 1000);
    $('.repair_data').hover(function () {
        clearInterval(timer);
    }, function () {
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            if (index >= 4) index = 0;
            as.eq(index).click();
        }, 1000);
    });
    myChart.setOption(option);
    // 图表缩放
    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();

// 设备点检统计模块
(function () {
    var myChart = echarts.init(document.querySelector('.pie1'));
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#006cff', '60cda0', 'ed8884', '#ff9f7f', '0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        series: [
            {
                name: '设备点检',
                type: 'pie',
                radius: ['25%', "90%"],
                center: ['50%', '50%'],
                roseType: 'radius',
                label: {
                    show: false
                },
                itemStyle: {
                    borderRadius: 5
                },
                data: [
                    { value: 200, name: '内层线路科' },
                    { value: 260, name: '压合科' },
                    { value: 348, name: '钻孔科' },
                    { value: 125, name: '一铜科' },
                    { value: 220, name: '二铜科' },
                    { value: 325, name: '外层线路科' },
                    { value: 230, name: '防焊科' },
                    { value: 142, name: '文字科' },
                    { value: 136, name: '外层AOI科' },
                    { value: 117, name: '文字科' },
                    { value: 89, name: '树脂塞孔科' },
                    { value: 106, name: '包装科' },
                    { value: 86, name: '品质一部' },
                    { value: 77, name: '终检科' },
                    { value: 153, name: '表面处理科' },
                    { value: 142, name: '治工具科' },
                    { value: 122, name: '无铅喷锡' },
                ]
            }
        ]
    };
    myChart.setOption(option);
    // 图表缩放
    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();

// 保养数字模块
(function () {
    var index = 0;
    var data1 = ["75", "100"];
    var data2 = ["321", "412"];
    var data3 = ["100%", "100%"];
    var as = $(".quarter .filter a");
    var h4s = $(".order .data h4");
    load(index);
    $(".quarter .filter").on("click", "a", function () {
        $(this).addClass("active").siblings().removeClass();
        index = $(this).index();
        load(index);
    });
    var timer = setInterval(function () {
        if (index >= 2) index = 0;
        as.eq(index).click();
    }, 1000);
    $(".quarter").hover(function () {
        clearInterval(timer);
    }, function () {
        clearInterval(timer);
        timer = setInterval(function () {
            if (index >= 2) index = 0;
            as.eq(index).click();
        }, 1000);
    })

    function load(index) {
        index--;
        $(".quarter .chart h4").eq(0).html(data1[index]);
        $(".quarter .chart h4").eq(1).html(data2[index]);
        $(".quarter .chart h4").eq(2).html(data3[index]);
    }
})();
// 保养模块
(function () {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".radar"));
    // 2.指定配置
    var lineStyle = {
        normal: {
            color: "#999",
            width: 1,
            opacity: 0.5
        }
    };
    var option = {
        tooltip: {
            show: true,
            position: ["60%", "10%"],
            textStyle: { fontSize: 10 }
        },
        radar: {
            // 雷达图的指示器 内部填充数据
            indicator: [
                { name: '待开始', max: 100 },
                { name: '保养中', max: 100 },
                { name: '待验收', max: 100 },
                { name: '已完成', max: 100 },
                { name: '月计划', max: 100 },
                { name: '周计划', max: 100 },
                { name: '日计划', max: 100 }
            ],
            //修改雷达图的大小
            radius: "59%",
            shape: "circle",
            splitNumber: 4,
            name: {
                textStyle: {
                    color: "#4c9bfd"
                }
            },
            splitLine: {
                lineStyle: {
                    color: "rgba(51,51,51,0.5)"
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: "rgba(51, 51, 51, 0.5)"
                }
            }
        },
        series: [
            {
                name: "5月",
                type: "radar",
                lineStyle: lineStyle,
                data: [[90, 69, 56, 81, 44, 50, 72]],
                symbol: "circle",
                symbolSize: 5,
                itemStyle: {
                    color: "#999"
                },
                label: {
                    show: true,
                    color: "999",
                    fontSize: 10
                },
                areaStyle: {
                    color: "rgba(238,197,102,0.6)"
                }
            }
        ]
    };
    var index = 0;
    var as = $(".channel .filter a");
    $(".channel .filter").on("click", "a", function () {
        $(this).addClass("active").siblings().removeClass();
        index = $(this).index();
    });
    var timer = setInterval(function () {
        if (index >= 2) index = 0;
        as.eq(index).click();
    }, 1000);
    $(".channel").hover(function () {
        clearInterval(timer);
    }, function () {
        clearInterval(timer);
        timer = setInterval(function () {
            if (index >= 2) index = 0;
            as.eq(index).click();
        }, 1000);
    })
    // 3.把配置和数据给对象
    myChart.setOption(option);
    // 图表缩放
    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();

// 饼形图半圆形
(function () {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".gauge"));
    // 2. 指定数据和配置
    var option = {
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['130%', '150%'],
                center: ['46%', '80%'],
                // adjust the start angle
                startAngle: 180,
                label: {
                    show: false,
                },
                hoverOffset: 0,
                data: [
                    {
                        value: 75,
                        itemStyle: {
                            //颜色渐变 #00c9e0->#005fc1
                            color: new echarts.graphic.LinearGradient(
                                //（x1,y1)点到点(x2,y2)之间进行渐变
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: "#00c9e0" },
                                    { offset: 1, color: "#005fc1" }
                                ]
                            )
                        }
                    },
                    { value: 25, itemStyle: { color: "#12274d" } },
                    {
                        // make an record to fill the bottom 50%
                        value: 100,
                        itemStyle: {
                            // stop the chart from rendering this piece
                            color: 'none',
                            decal: {
                                symbol: 'none'
                            }
                        },
                        label: {
                            show: false
                        }
                    }
                ]
            }
        ]
    };
    // 3. 把数据和配置给实例对象
    myChart.setOption(option);
    // 图表缩放
    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();

// 保养日历
(function () {
    var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var month_name = ["January", "Febrary", "March", "April", "May", "June", "July", "Auguest", "September", "October", "November", "December"];

    var holder = document.getElementById("days");
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");
    var ctitle = document.getElementById("calendar-title");
    var cyear = document.getElementById("calendar-year");

    var my_date = new Date();
    var my_year = my_date.getFullYear();
    var my_month = my_date.getMonth();
    var my_day = my_date.getDate();

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

    function refreshDate() {
        var str = "";
        var totalDay = daysMonth(my_month, my_year); //获取该月总天数
        var firstDay = dayStart(my_month, my_year); //获取该月第一天是星期几
        var myclass;
        for (var i = 1; i < firstDay; i++) {
            str += "<li></li>"; //为起始日之前的日期创建空白节点
        }
        for (var i = 1; i <= totalDay; i++) {
            if ((i < my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) || my_year < my_date.getFullYear() || (my_year == my_date.getFullYear() && my_month < my_date.getMonth())) {
                myclass = " class='lightgrey'"; //当该日期在今天之前时，以浅灰色字体显示
            } else if (i == my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) {
                myclass = " class='green greenbox'"; //当天日期以绿色背景突出显示
            } else {
                myclass = " class='darkgrey'"; //当该日期在今天之后时，以深灰字体显示
            }
            str += "<li" + myclass + ">" + i + "</li>"; //创建日期节点
        }
        holder.innerHTML = str; //设置日期显示
        ctitle.innerHTML = month_name[my_month]; //设置英文月份显示
        cyear.innerHTML = my_year; //设置年份显示
    }
    refreshDate(); //执行该函数


    // 添加交互
    prev.onclick = function (e) {
        e.preventDefault();
        my_month--;
        if (my_month < 0) {
            my_year--;
            my_month = 11;
        }
        refreshDate();
    }
    next.onclick = function (e) {
        e.preventDefault();
        my_month++;
        if (my_month > 11) {
            my_year++;
            my_month = 0;
        }
        refreshDate();
    }

})()
