/**
 * Created by zhangnan on 15/1/11.
 */
define(['config', 'jquery'], function (config, $) {
    var Bingo = function (dataSource) {
        var timer;
        var drawer;

        return {
            draw: function (_drawer) {
                drawer = _drawer;
            },
            start: function () {
                dataSource.total() < 2 || timer || this.avatar();
            },
            end: function () {
                return dataSource.total() < 2 || this.randit();
            },
            avatar: function () {
                var result = Math.round(Math.random() * dataSource.total() + .5) - 1;
                var guy = dataSource.get(result);
                drawer(guy.nickname, guy.avatar);

                timer = setTimeout(arguments.callee, 100);
            },
            randit: function () {
                clearTimeout(timer);
                timer = null;

                var lucyNumber = Math.round(Math.random() * dataSource.total() + .5) - 1;
                var luckyGuy = dataSource.get(lucyNumber);
                drawer(luckyGuy.nickname, luckyGuy.avatar);

                dataSource.addLuckyGuy(luckyGuy);
                dataSource.remove(lucyNumber);
            },
            remove: function (id) {
                var guy = dataSource.getLuckGuy(id);
                dataSource.removeLuckGuy(id);
                dataSource.add(guy);
            },
            reset: function () {
                $.each(dataSource.getLuckGuys(), function (i, e) {
                    dataSource.add(e);
                });
                dataSource.clearLuckyGuy();
            }
        };
    };

    return Bingo;
});

/**
 * Created by zhangnan on 15/1/11.
 */
define(['config', 'jquery'], function (config, $) {
    var Message = function () {
        return{
            fetch: function (_callBack) {
                $.ajax({
                    type: 'GET',
                    url: config.backend + 'message',
                    dataType: "json",
                    success: function (data) {
                        _callBack(data);
                    }
                });
            }
        }
    };

    return Message;
});

/**
 * Created by zhangnan on 15/1/11.
 */
define(['config', 'jquery'], function (config, $) {
    var Shake = function () {
        return{
            score: function (_callBack) {
                $.ajax({
                    type: 'GET',
                    url: config.backend + 'shake/score',
                    dataType: "json",
                    success: function (data) {
                        _callBack(data);
                    }
                });
            },
            start: function () {
                $.get(config.backend + 'shake/start');
            },
            end: function (_callBack) {
                $.ajax({
                    type: 'GET',
                    url: config.backend + 'shake/end',
                    dataType: "json",
                    success: function (data) {
                        _callBack(data);
                    }
                });
            }
        }
    };

    return Shake;
});

/**
 * Created by zhangnan on 15/1/11.
 */
define(['config', 'jquery'], function (config, $) {
    var User = function () {
        var _arr = [
            {
                "nickname": "赵荣",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYdjGKVSqbGQLWF0wGxxS9TggTod5c6ichWE4sicF0Gaia6rQ/"
            },
            {
                "nickname": "张楠",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYf43yjhA9UiboQSvq9YvrSic6fgh9unjj2zgAq4u3kkibuUw/"
            },
            {
                "nickname": "陆章其",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYf43yjhA9UiboQSvq9YvrSic6mibjJ61wJZ5jFyLKe3aKSNw/"
            },
            {
                "nickname": "尹振宇",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYdUib6tcics38F5gbiaLCgqY31AEicuic8WP8tFzD0Z045MAAQ/"
            },
            {
                "nickname": "王海滨",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYfZ6lO9OiaJziczsO8ibl9aJTxl2MXDAHUeOmO124rib4zlbg/"
            },
            {
                "nickname": "钟成",
                "avatar": ""
            },
            {
                "nickname": "李知远",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYclIpDbMrVTgD06G9yGffYtrgNAtCMWp6sDLekyFxNX9w/"
            },
            {
                "nickname": "顾黎明",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYf43yjhA9UiboQSvq9YvrSic6j5kSbcML1Riay5cKx7lmNGA/"
            },
            {
                "nickname": "王东",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYf43yjhA9UiboQSvq9YvrSic6mq6Sd51dLDoLE661xnndbA/"
            },
            {
                "nickname": "黄俊鑫",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYf43yjhA9UiboQSvq9YvrSic6kMfxnMRN9rhr9oicUoJEOUQ/"
            },
            {
                "nickname": "张航",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYdUib6tcics38F5gbiaLCgqY31JIic3fkq3xL1rcQKkTnZsqw/"
            },
            {
                "nickname": "宋振豪",
                "avatar": ""
            },
            {
                "nickname": "李豪杰",
                "avatar":"http://shp.qpic.cn/bizmp/EIxjZcrBHYdUib6tcics38F5gbiaLCgqY31VuibCpW2BBX2QiclPahKojsg/"
            },
            {
                "nickname": "李鑫凌",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYcCflgLqDiaTwJX9prg7CDvjJEUqXtenFDfsCYxkAkOPhQ/"
            },
            {
                "nickname": "黄明",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYfZ6lO9OiaJziczsO8ibl9aJTxKlibqheh1wPUK5WDtHuibXZg/"
            },
            {
                "nickname": "范旭东",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYcCflgLqDiaTwJX9prg7CDvjiaicU0qJ4wOkS4CORZed0DoQ/"
            },
            {
                "nickname": "徐海东",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYdUib6tcics38F5gbiaLCgqY31MV3IgYHqicONFoRGaqoDicbg/"
            },
            {
                "nickname": "陈崎峰",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYf43yjhA9UiboQSvq9YvrSic6nUH6LdIV9K0Mlh9cQEBQLw/"
            },
            {
                "nickname": "彭煕",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYfZ6lO9OiaJziczsO8ibl9aJTxpw7OzBibNP0r6hticibYMSY4w/"
            },
            {
                "nickname": "刘冰",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYdUib6tcics38F5gbiaLCgqY315ORiaxficP0bdV7zUh6AEtSg/"
            },
            {
                "nickname": "齐闻",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYclIpDbMrVTgD06G9yGffYtia9X8GnSeTojtrXEG0LxW1Q/"
            },
            {
                "nickname": "吴品彦",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYf43yjhA9UiboQSvq9YvrSic6XcNzicCHrrtru6XicwYKQTSA/"
            },
            {
                "nickname": "刘霖",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYf43yjhA9UiboQSvq9YvrSic6nia2S1RicmbV3uVaeJPYstaA/"
            },
            {
                "nickname": "戢汉邦",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYdUib6tcics38F5gbiaLCgqY31xFqhaZlyw7dhDbgwibLWQnQ/"
            },
            {
                "nickname": "王艺萌",
                "avatar":"http://shp.qpic.cn/bizmp/EIxjZcrBHYfZ6lO9OiaJziczsO8ibl9aJTxKjlzZlpzsBDrCYZx7yPQsQ/"
            },
            {
                "nickname": "宋泽明",
                "avatar":"http://shp.qpic.cn/bizmp/EIxjZcrBHYclIpDbMrVTgD06G9yGffYtVibjmYk9vABF1gu1ichRHLpA/"
            },
            {
                "nickname": "孙健",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYdUib6tcics38F5gbiaLCgqY31EC1kDrSicTAV8ycNLYianVBQ/"
            },
            {
                "nickname": "张培培",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYdUib6tcics38F5gbiaLCgqY31rSKGCr3yc3Jzx7ZjoVN62g/"
            },
            {
                "nickname": "曹晓明",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYfZ6lO9OiaJziczsO8ibl9aJTxvI12BrMYo3lYDpaT3iaKufQ/"
            },
            {
                "nickname": "刘皋",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYf43yjhA9UiboQSvq9YvrSic6NZ5oJAVy2WaKibnOgYGkTow/"
            },
            {
                "nickname": "季云培",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYf43yjhA9UiboQSvq9YvrSic6fyeheaficteHXQYfYagJJGA/"
            },
            {
                "nickname": "童梅",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYf43yjhA9UiboQSvq9YvrSic6FvsicvdRcslTm6MJuxdmpiaA/"
            },
            {
                "nickname": "施家奇",
                "avatar": ""
            },
            {
                "nickname": "王晓迪",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYclIpDbMrVTgD06G9yGffYtbAY5GzGZgyHWr0MNuKguhQ/"
            },
            {
                "nickname": "皇甫绍钧",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYclIpDbMrVTgD06G9yGffYtBcssicCuHfINKb3ezJ3sYYA/"
            },
            {
                "nickname": "李坤",
                "avatar": "http://shp.qpic.cn/bizmp/EIxjZcrBHYcCflgLqDiaTwJX9prg7CDvjehxUEcw7ic0AuajjLGzMhvw/"
            }
        ];

        $.each(_arr, function (i, e) {
            e.id = i;
        });

        function _getFromStorage(key) {
            return JSON.parse(window.localStorage.getItem(key) || '[]');
        }

        function _setByStorage(key, val) {
            window.localStorage.setItem(key, JSON.stringify(val));
        }

        function _removeByStorage(key, val) {
            window.localStorage.setItem(key, JSON.stringify(val));
        }

        return{
            clearLuckyGuy: function () {
                _setByStorage('award', []);
            },
            addLuckyGuy: function (guy) {
                var guys = _getFromStorage('award') || [];
                guys.push(guy);
                _setByStorage('award', guys);
            },
            getLuckGuy: function (id) {
                var guys = _getFromStorage('award') || [];
                var guy = null;
                $.each(guys, function (i, e) {
                    if (e.id == id) {
                        guy = e;
                        return;
                    }
                });
                return guy;
            },
            getLuckGuys: function () {
                return _getFromStorage('award');
            },
            removeLuckGuy: function (id) {
                var guys = _getFromStorage('award') || [];
                $.each(guys, function (i, e) {
                    if (e && e.id == id) {
                        guys.splice(i, 1);
                        return;
                    }
                });
                _setByStorage('award', guys);
            },
            all: function () {
                return _arr;
            },
            add: function (guy) {
                if (!this.maxId) {
                    this.maxId = _arr.length;
                }
                guy.id = this.maxId++;
                _arr.push(guy);
            },
            get: function (index) {
                return _arr[index];
            },
            remove: function (index) {
                _arr.splice(index, 1);
            },
            total: function () {
                return _arr.length;
            }
        }
    };

    return User;
});

/**
 * Created by zhangnan on 15/1/11.
 */
define(['models/user', 'models/bingo', 'models/message', 'lottery/views/appView', 'wall/views/appView', '../utils', 'config', 'jquery'
], function (User, Bingo, Message, AppView, WallView, utils, config, $) {
    var $el = $('.container');
    var $bingoAvatar = $el.find('.bingo .guy img');
    var $bingoNickName = $el.find('.bingo .guy .nickname');
    var $awards = $el.find('.result ul');
    var $users = $el.find('.users ul');
    var $hudong = $el.find('.header .hudong');

    var user = new User();
    // TODO
    $.each(user.getLuckGuys(), function (i, e) {
        $.each(user.all(), function (ai, ae) {
            if (ae && e.id == ae.id) {
                user.remove(ai);
                return;
            }
        });
    });

    var wallView = new WallView($hudong);
    var message = new Message();
    utils.thread.run({
        callback: function () {
            message.fetch(wallView.drawOne);
        },
        interval: config.wall.interval
    });

    var bingo = new Bingo(user, $el);
    bingo.draw(function (name, url) {
        $bingoAvatar.attr('src', url);
        $bingoNickName.html(name);
    });

    function loadAwards() {
        $users.html('');
        $awards.html('');

        $.each(user.getLuckGuys(), function (index, element) {
            $awards.append($('<li>').append('<div class="row"><div class="name col-md-10">' + element.nickname + '</div><div class="col-md-2"><a href="#" data-id="' + element.id + '"> <i class="fa fa-remove"> </div></i></a>'));
        });
        $('.result li a').click(function () {
            bingo.remove(parseInt($(this).data('id')));
            $(this).parent().remove();
            loadAwards();
        });

        $.each(user.all(), function (index, element) {
            $users.append($('<li>').append('<img src="' + element.avatar + '" height="15px"/><span class="name">' + element.nickname + '</span><a href="#" data-id="' + index + '"> <i class="fa fa-remove"> </i></a>'));
        });
        $('.users li a').click(function () {
            user.remove(parseInt($(this).data('id')));
            $(this).parent().remove();
            loadAwards();
        });
    };

    var $startBtn = $('.bingo button.start');
    var $endBtn = $('.bingo button.end');
    $endBtn.hide();

    $startBtn.click(function () {
        bingo.start();
        $startBtn.toggle();
        $endBtn.toggle();
    });
    $endBtn.click(function () {
        bingo.end();
        loadAwards();
        $startBtn.toggle();
        $endBtn.toggle();
    });

    $('.result button.reset').click(function () {
        bingo.reset();
        loadAwards();
    });

    $('.users a.add').click(function () {
        var nickname = prompt('输入姓名');
        if (nickname) {
            var guy = {nickname: nickname, avatar: 'avatar/default.png'};
            $.each(user.all(), function (i, e) {
                if (e.nickname == nickname) {
                    guy.avatar = e.avatar;
                    return;
                }
            });
            user.add(guy);
        }
        loadAwards();
    });

    loadAwards();
});
require.config({
    baseUrl: '.',
    map: {
        '*': {
            // 这个是一个很脏的把戏， 因为压缩时，r.js必须依靠text.js, 所以不能
            // 将text设置成为"empty:", 为了避免将text.js压缩到r.js中， 必须将其
            // 加入到excludes中, 具体看https://github.com/jrburke/r.js/issues/221
            text: "bower_components/text/text",
            css: "bower_components/require-css/css"
        }
    },
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'jquery': "bower_components/jquery/dist/jquery.min",
        'underscore': "bower_components/underscore/underscore",
        'bootstrap': "bower_components/bootstrap/dist/js/bootstrap.min",
        'underscore.string': "bower_components/underscore.string/lib/underscore.string",
        'lottery': "js/lottery",
        'wall': 'js/wall',
        'models': "js/models",
        'utils': "js/utils",
        'config': "js/config",
        'localconfig': "js/localconfig",
        'text': "bower_components/text/text",
        'css': "bower_components/require-css/css"
    },
    shim: {
        'underscore.string': {"deps": ["underscore"]}
    }
});
require(['lottery/app'], function () {});
/**
 * Created by zhangnan on 15/1/11.
 */
define(['models/shake', 'shake/views/scoreView', 'shake/views/userView', '../utils', 'config', 'jquery'
], function (Shake, ScoreView, UserView, utils, config, $) {
    var $el = $('.container');
    var $users = $el.find('.users ul');
    var $score = $el.find('.score ul');
    var $timer = $el.find('.timer');
    var $timer2 = $el.find('.timer2');
    var $timerBg = $el.find('.bg');

    var shake = new Shake();
    var userView = new UserView($users);
    var scoreView = new ScoreView($score);


    utils.thread.run({
        callback: function(){
            shake.score(userView.draw);
        },
        interval: 2000
    });


    var $startBtn = $('.action button.start');
    $startBtn.click(function () {
        $users.show();
        scoreView.clear();
        $startBtn.toggle();
        $timerBg.show();

        // 倒计时开始，时间到后再启动一个结束倒计时
        utils.countDown.run({
            finished: function () {
                $users.hide();
                //$('.score').css('display', 'none');

                $timerBg.toggle();
                // 正式开始，隐藏入口 -> 清空倒计时 -> 请求服务开始
                $timer.empty();
                shake.start();

                var scoreThread = utils.thread;
                scoreThread.run({
                    callback: function(){
                        shake.score(scoreView.draw);
                    },
                    interval: 1000
                });

                utils.countDown.run({
                    finished: function () {
                        // 结束, 清空倒计时 -> 请求服务结束 -> 显示入口
                        $timerBg.hide();
                        $timer2.empty();
                        $timer.empty();

                        scoreThread.stop();

                        shake.end(scoreView.draw);
                        $startBtn.toggle();
                    },
                    every: function (countDownTime) {
                        if (countDownTime < 7){
                            $timerBg.show();
                            $timer2.html('');
                            $timer.html('结束倒计时: ' + countDownTime);
                        }else{
                            $timer2.html('结束倒计时: ' + countDownTime);
                        }

                    },
                    period: config.shake.period
                });
            },
            every: function (countDownTime) {
                $timer.html(countDownTime);
            },
            period: 10
        });
    });
});
require.config({
    baseUrl: '.',
    map: {
        '*': {
            // 这个是一个很脏的把戏， 因为压缩时，r.js必须依靠text.js, 所以不能
            // 将text设置成为"empty:", 为了避免将text.js压缩到r.js中， 必须将其
            // 加入到excludes中, 具体看https://github.com/jrburke/r.js/issues/221
            text: "bower_components/text/text",
            css: "bower_components/require-css/css"
        }
    },
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'jquery': "bower_components/jquery/dist/jquery.min",
        'underscore': "bower_components/underscore/underscore",
        'bootstrap': "bower_components/bootstrap/dist/js/bootstrap.min",
        'underscore.string': "bower_components/underscore.string/lib/underscore.string",
        'shake': "js/shake",
        'models': "js/models",
        'utils': "js/utils",
        'config': "js/config",
        'localconfig': "js/localconfig",
        'text': "bower_components/text/text",
        'css': "bower_components/require-css/css"
    },
    shim: {
        'underscore.string': {"deps": ["underscore"]}
    }
});
require(['shake/app'], function () {});
/**
 * Created by zhangnan on 15/1/11.
 */
define(['models/message', 'wall/views/appView', '../utils', 'config', 'jquery'
], function (Message, AppView, utils, config, $) {
    var $el = $('.container');
    var $message = $el.find('.messages ul');

    var message = new Message();
    var appView = new AppView($message);


    utils.thread.run({
        callback: function () {
            message.fetch(appView.draw);
        },
        interval: config.wall.interval
    });
});
require.config({
    baseUrl: '.',
    map: {
        '*': {
            // 这个是一个很脏的把戏， 因为压缩时，r.js必须依靠text.js, 所以不能
            // 将text设置成为"empty:", 为了避免将text.js压缩到r.js中， 必须将其
            // 加入到excludes中, 具体看https://github.com/jrburke/r.js/issues/221
            text: "bower_components/text/text",
            css: "bower_components/require-css/css"
        }
    },
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        'jquery': "bower_components/jquery/dist/jquery.min",
        'underscore': "bower_components/underscore/underscore",
        'bootstrap': "bower_components/bootstrap/dist/js/bootstrap.min",
        'underscore.string': "bower_components/underscore.string/lib/underscore.string",
        'wall': "js/wall",
        'models': "js/models",
        'utils': "js/utils",
        'config': "js/config",
        'localconfig': "js/localconfig",
        'text': "bower_components/text/text",
        'css': "bower_components/require-css/css"
    },
    shim: {
        'underscore.string': {"deps": ["underscore"]}
    }
});
require(['wall/app'], function () {});