/**
 * @author chenqi14
 */
// 将table转化为二维数组
// table参数是dom节点或字符串或jquery节点
function tableToArray(table) {
    var tableArr = [];
    var tableElement = {};
    //检测table类型
    if((typeof table === 'string') || !table[0]) {
        tableElement = $(table);
    }
    else{
        tableElement = table;
    }

    // 检查是否有thead,tbody,tfoot
    if(tableElement.has('thead, tbody, tfoot').length !== 0) {
        tableElement.find('thead tr, tbody tr, tfoot tr').each(function() {
            var tArray = [];
            $(this).find('td').each(function() {
                tArray.push($(this).text());
            });
            tableArr.push(tArray)
        })
    }
    else {
        table.children('tr').each(function() {
            var tArray = [];
            $(this).find('td').each(function() {
                tArray.push($(this).text());
            });
            tableArr.push(tArray)
        })
    }

    return tableArr;

}