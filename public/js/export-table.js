/**
 * @author chenqi14
 */

// 传入的数组必须是二维数组
var asUtf16, downloadExcelCsv, makeExcelCsvBlob, toTsv;

asUtf16 = function (str) {
    var buffer, bufferView, i, j, ref, val;
    buffer = new ArrayBuffer(str.length * 2);
    bufferView = new Uint16Array(buffer);
    bufferView[0] = 0xfeff;
    for (i = j = 0, ref = str.length; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        val = str.charCodeAt(i);
        bufferView[i + 1] = val;
    }
    return bufferView;
};

makeExcelCsvBlob = function (rows) {
    return new Blob([asUtf16(toTsv(rows)).buffer], {
        type: "text/csv;charset=UTF-16"
    });
};

toTsv = function (rows) {
    var escapeValue;
    escapeValue = function (val) {
        if (typeof val === 'string') {
            return '"' + val.replace(/"/g, '""') + '"';
        } else if (val != null) {
            return val;
        } else {
            return '';
        }
    };
    return rows.map(function (row) {
            return row.map(escapeValue).join('\t');
        }).join('\n') + '\n';
};

downloadExcelCsv = function (rows, attachmentFilename) {
    var blob = makeExcelCsvBlob(rows);
    var a = document.createElement('a');
    a.style.display = 'none';
    a.download = attachmentFilename;
    document.body.appendChild(a);
    a.href = URL.createObjectURL(blob);
    a.click();
    URL.revokeObjectURL(a.href);
    a.remove();
};

