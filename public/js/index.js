/**
 * Created by baidu on 16/3/5.
 */
$(function() {
    $('.urlSubmit').on('click', function() {
        $.ajax({
            url:'/inputUrl',
            method: 'get',
            data: {url: $('.urlInput').val()}
        }).done(function(data) {
            var appendString = '';
            if(data.status === 0) {
                if(data.result.number === 0) {
                    appendString = '<h1>未搜到表格,可能目标网页无table元素.或者输入的网址有误!</h1>';
                }
                else {
                    appendString += '<h1>一共搜到了' + data.result.number + '个表格</h1>';
                    appendString += '<ol class="tableList">';
                    data.result.table.forEach(function(value) {
                        appendString += '<li>'
                            + '<div><button type="button" class="dlCsv">点击下载</div>'
                            + value
                            + '</li>'
                    });
                    appendString += '</ol>';
                }
            }
            else {
                appendString += '<h1>出现了一些错误,请检查URL是否正确输入!稍等一下再重试</h1>';
            }

            $('.tableWrapper').html(appendString);

        })
            .error(function() {
                $('.tableWrapper').html('<h1>哦啊,出错了!可能是输入的网址有误,或者服务器出了问题~</h1>');
            })
    });

    $('.tableWrapper').delegate('.dlCsv', 'click', function() {
        var matrix = tableToArray($(this).closest('li').find('table'));
        downloadExcelCsv(matrix, 'data.csv');
    })
});