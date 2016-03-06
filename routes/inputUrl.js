/**
 * @author chenqi14
 */
var express = require('express');
var router = express.Router();

var jsdom = require('jsdom');

router.get('/', function (req, res, next) {

    console.log(req.query.url);
    //if (req.query.url.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g).length === 0) {
    //    console.log('no match');
    //    res.send({state: 1})
    //}
    //else {
        console.log('match');

        jsdom.env(
            req.query.url,
            ["http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js"],
            function (err, window) {
                var $ = window.$;
                var tableList = [];
                var tableLength = $('table').length;
                if(tableLength !== 0) {
                    $('table').each(function() {
                        tableList.push('<table cellpadding="6" cellspacing="0">' + $(this).html() + '</table>')
                    })
                }
                res.send({status: 0, result: {number: tableLength,table: tableList}})

            }
        )


    //}
});

module.exports = router;