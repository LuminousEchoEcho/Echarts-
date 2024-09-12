// 维修排名监控区域模块制作
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

// 预见性维修单监控区域模块制作
(function () {
    $('.monitors .tabs').on('click', 'a', function () {
        $(this).addClass('active').siblings('a').removeClass('active');
        $('.monitors .content').eq($(this).index()).show().siblings('.content').hide();
    });
    $('.marquee-view .marquee').each(function () {
        var rows = $(this).children().clone();
        $(this).append(rows);
    })
})();

// 关键设备数字模块
(function () {
    var index = 0;
    var data1 = ["5时21分", "6时34分", "1时9分", "4时52分"];
    var data2 = ["21%", "6%", "19%", "12%"];
    var as = $(".key_device .filter a");
    var h4s = $(".order .data h4");
    load(index);
    $(".key_device .filter").on("click", "a", function () {
        $(this).addClass("active").siblings().removeClass();
        index = $(this).index();
        load(index);
    });
    var timer = setInterval(function () {
        if (index >= 4) index = 0;
        as.eq(index).click();
    }, 1000);
    $(".key_device").hover(function () {
        clearInterval(timer);
    }, function () {
        clearInterval(timer);
        timer = setInterval(function () {
            if (index >= 4) index = 0;
            as.eq(index).click();
        }, 1000);
    })

    function load(index) {
        index--;
        $(".key_device .chart h4").eq(0).html(data1[index]);
        $(".key_device .chart h4").eq(1).html(data2[index]);
    }
})();

// 关键设备图表模块
(function () {
    var myChart = echarts.init(document.querySelector('.depaetment_pie'));
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            top: '5%'
        },
        grid: {
            left: '0%',
            top: '15%',
            right: '4%',
            containLabel: true
        },
        xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        yAxis: {
            type: 'category',
            data: ['钻孔科', '压合科', '防焊科', '表面处理科']
        },
        series: [
            {
                name: '本月',
                type: 'bar',
                data: [53, 89, 34, 70]
            },
            {
                name: '上月',
                type: 'bar',
                data: [32, 38, 30, 94]
            }
        ]
    };
    myChart.setOption(option);
    // 图表缩放
    window.addEventListener('resize', function () {
        myChart.resize();
    })
})();


// 维修工单模块
(function () {
    // 4. tab栏切换效果
    // (2) 点击切换
    $('.repair_tabs ').on('click', 'a', function () {
        index1 = $(this).index() - 1;
        $(this).addClass('active').siblings('a').removeClass('active');
        $('.repair_tabs .content').eq($(this).index()).show().siblings('.content').hide();
    });
    // 5. tab栏自动切换效果
    var as = $('.repair_tabs  a');
    var index1 = 0;
    var timer = setInterval(function () {
        index1++;
        if (index1 >= 4) index1 = 0;
        as.eq(index1).click();
    }, 1000);
    $('.overview .content').hover(function () {
        clearInterval(timer);
    }, function () {
        clearInterval(timer);
        timer = setInterval(function () {
            index1++;
            if (index1 >= 4) index1 = 0;
            as.eq(index1).click();
        }, 1000);
    });
})();


// 维修类型数据统计模块
(function () {
    // tab栏切换效果(1)准备数据
    var data = {
        year: [
            [35, 44, 46, 48, 22, 10, 34, 10, 30],
            [19.75, 15.75, 17.32, 15.32, 9.52, 4.23, 16.06, 14.33, 10.73]
        ],
        quarter: [
            [23, 75, 12, 97, 21, 67, 98, 21, 43],
            [13.5, 11, 15, 13.5, 18, 20, 14.25, 14.75, 9]
        ],
        month: [
            [34, 47, 32, 47, 38, 12, 32, 47, 39],
            [15, 13, 18, 20, 16, 17, 14, 12.5, 13.5]
        ],
        week: [
            [41, 41, 40, 40, 22, 19, 14, 10, 4],
            [17.75, 17.75, 17.32, 17.32, 9.52, 8.23, 6.06, 4.33, 1.73]
        ]
    }
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".line1"));
    // 2. 指定配置和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['报修数量', '维修占比']
        },
        xAxis: [
            {
                type: 'category',
                data: ['配件故障', '机械故障', '操作故障', '电气故障', '信息化故障', '管道故障', '气动故障', '维修中', '其它'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '报修数量',
                min: 0,
                max: 50,
                interval: 5,
                axisLabel: {
                    formatter: '{value} 单'
                }
            },
            {
                type: 'value',
                name: '维修占比',
                min: 0,
                max: 20,
                interval: 5,
                axisLabel: {
                    formatter: '{value} %'
                }
            }
        ],
        series: [
            {
                name: '报修数量',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 单';
                    }
                },
                data: data.year[0]
            },
            {
                name: '维修占比',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' %';
                    }
                },
                data: data.year[0]
            }
        ]
    };

    // 3. 把配置和数据给实例对象
    myChart.setOption(option);
    // 4. tab栏切换效果
    // (2) 点击切换
    $('.repair_data1 .caption').on('click', 'a', function () {
        index = $(this).index() - 1;
        $(this).addClass('active').siblings('a').removeClass('active');
        var arr = data[this.dataset.type];
        option.series[0].data = arr[0];
        option.series[1].data = arr[1];
        myChart.setOption(option);
    });
    // 5. tab栏自动切换效果
    var as = $('.repair_data1 .caption a');
    var index = 0;
    var timer = setInterval(function () {
        index++;
        if (index >= 4) index = 0;
        as.eq(index).click();
    }, 1000);
    $('.repair_data1').hover(function () {
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

// 维修科室数据统计模块
(function () {
    // tab栏切换效果(1)准备数据
    var data = {
        year: [
            [14, 31, 23, 27, 12, 19, 17, 16, 34, 44, 24, 34, 38],
            [19.77, 15.93, 26, 15, 10.64, 10.28, 15.54, 10.14, 21.97, 31.49, 20.00, 20.00, 31.78, 40.00],
            [19, 17, 15, 14, 12, 8, 7, 4, 3, 4, 4.73, 5, 3.3, 13]
        ],
        quarter: [
            [34, 47, 32, 47, 38, 12, 32, 47, 39, 35, 36, 25, 49],
            [9.77, 13.93, 21.6, 11.15, 1.64, 0.28, 1.54, 0.14, 1.97, 1.49, 0.00, 0.00, 1.78, 0.00],
            [15, 21.88, 24.29, 12.99, 19.69, 16.49, 16.06, 23.03, 2.60, 1.73, 1.73, 1.73, 1.73, 1.3]
        ],
        month: [
            [42, 47, 38, 12, 32, 47, 39, 35, 36, 25, 49, 17, 43],
            [9.77, 13.93, 21.6, 11.15, 1.64, 0.28, 1.54, 0.14, 1.97, 1.49, 0.00, 0.00, 1.78, 0.00],
            [20.75, 22.88, 24.29, 12.99, 11.69, 16.49, 6.06, 3.03, 12.60, 1.73, 1.73, 1.73, 1.73, 1.3]
        ],
        week: [
            [41, 39, 33, 27, 15, 14, 7, 6, 4, 4, 4, 4, 3],
            [9.77, 13.93, 21.6, 11.15, 1.64, 0.28, 1.54, 0.14, 1.97, 1.49, 0.00, 0.00, 1.78, 0.00],
            [17.75, 16.88, 14.29, 12.99, 11.69, 6.49, 6.06, 3.03, 2.60, 1.73, 1.73, 1.73, 1.73, 1.3]
        ]
    }
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".line2"));
    // 2. 指定配置和数据
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['报修数量', '维修占比', '停机维修时间']
        },
        xAxis: [
            {
                type: 'category',
                data: ['内层线路科', '防焊科', '成型科', '压合科', '一铜科', '外层线路科', '表面处理科', '电测科', '外层AOI科', '二铜科', '文字科', '治工具科', '终检科', '树脂塞孔科'],
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '报修数量',
                min: 0,
                max: 50,
                interval: 5,
                axisLabel: {
                    formatter: '{value} 单'
                }
            },
            {
                type: 'value',
                name: '维修占比',
                min: 0,
                max: 25,
                interval: 5,
                axisLabel: {
                    formatter: '{value} %'
                }
            }
        ],
        series: [
            {
                name: '报修数量',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 单';
                    }
                },
                data: data.year[0]
            },
            {
                name: '维修占比',
                type: 'bar',
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' %';
                    }
                },
                data: data.year[1]
            },
            {
                name: '停机维修时间',
                type: 'line',
                yAxisIndex: 1,
                tooltip: {
                    valueFormatter: function (value) {
                        return value + ' 分';
                    }
                },
                data: data.year[2]
            }
        ]
    };

    // 3. 把配置和数据给实例对象
    myChart.setOption(option);
    // 4. tab栏切换效果
    // (2) 点击切换
    $('.repair_data2 .caption').on('click', 'a', function () {
        index = $(this).index() - 1;
        $(this).addClass('active').siblings('a').removeClass('active');
        var arr = data[this.dataset.type];
        option.series[0].data = arr[0];
        option.series[1].data = arr[1];
        option.series[2].data = arr[2]
        myChart.setOption(option);
    });
    // 5. tab栏自动切换效果
    var as = $('.repair_data2 .caption a');
    var index = 0;
    var timer = setInterval(function () {
        index++;
        if (index >= 4) index = 0;
        as.eq(index).click();
    }, 1000);
    $('.repair_data2').hover(function () {
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
