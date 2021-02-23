$(() => {
    //   实现注册登录切换
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义校验规则
    // 从layui中获取form对象
    const form = layui.form;
    // 定义校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码不符合校验规则'],
        repwd: function (value) {
            const password = $('.reg-box [name=password]').val();
            if (password !== value) {
                return `两次输入密码不一致`
            }
        }
    })

    // 监听注册表单事件
    $('#reg_form').on('submit', function (e) {

        // 阻止默认行为
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            // data:$(this).serialize(),
            success(res) {

                // if(res.status !== 0) {
                //     return layer.msg('注册失败！');
                // }
                console.log(res);
                layer.msg('注册成功！')
                console.log('success');

                // 模拟人的点击行为
                $('#link_login').click();

            }
        });
    });

    // 监听登录表单事件
    $('#login_form').on('submit', function (e) {

        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                };
                layer.msg('登录成功！');
                console.log(res);
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token);
                location.href = '/index.html'
            }

        });

    });
});