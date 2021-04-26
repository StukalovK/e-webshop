function example1() {
        alert('Привет, пользователь!');
        let client = prompt('Как Вас зовут?');
        alert('Будем знакомы, ' + client + '!');
}

function example2() {
        let answer = confirm('Вы хотите посетить сайт Bing.com?');
        if (answer === true)    {
        window.location = 'https://www.bing.com';
        } else {
            alert('Ну не хотите, и не надо!');
        }
}

$(document).ready(() => {
        // Сценарий Валидации данных, вводимых в форму регистрации
        //========================================================
        let validateResult1 = false; // - результат валидации логина
        let validateResult2 = false;  // - результат валидации первого пароля
        let validateResult3 = false;  // - результат валидации второго пароля
        let validateResult4 = false;  // - результат валидации эл.почты

        // Валидация логина
        //============================================================
        $('#login').blur(() => {
            let loginX = $('#login').val();
            let loginRe = /^[a-zA-Z][a-zA-Z0-9_\-]{5,15}$/;
            if (loginRe.test(loginX)) {
                    // проверка занятости логина
                    $.ajax({
                        url: '/accounts/ajax_reg',
                        data: 'login=' + loginX,
                        success: (result) => {
                            if (result.message == 'занят') {
                                $('#login_err').text('Логин-занят!');
                                validateResult1 = false;
                            } else {
                                validateResult1 = true;
                            }
                        }
                    });

            } else
            {
                    validateResult1 = false;
                    $('#login_err').text('Ошибка формата ввода => от 6 до 16 симоволов: буквы, цифры, _, -');
            }
        });

           // Валидация первого пароля
        //============================================================
        $('#pass1').blur(() => {
            let pass1X = $('#pass1').val();
            let passRe = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/;
            if (passRe.test(pass1X)) {
                  validateResult2 = true;
                  $('#pass1_err').text('');
                  } else {
                    validateResult2 = false;
                   $('#pass1_err').text('Должна быть одна большая буква и хотя бы один спецсимвол');
                }
            });

            // Валидация второго пароля
        //============================================================
        $('#pass2').blur(() => {
            let pass1X = $('#pass1').val();
            let pass2X = $('#pass2').val();
            if (pass1X === pass2X) {
                    validateResult3 = true;
                    $('#pass2_err').text('');
                } else {
                    validateResult3 = false;
                    $('#pass1_err').text('пароли не совпадают');
                }
            });

            // Валидация первого email
        //============================================================
        $('#email').blur(() => {
            let emailX = $('#email').val();
            let emailRe = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
            if (emailRe.test(emailX)) {
                                validateResult4 = true;
                                $('#email_err').text('');
                            } else {
                                validateResult4 = false;
                                $('#email_err').text('Стандартная электроннвя почта: username@host.domain')
                            }
                    });

        // Итоговая проверка результатов валидации и триггер канала submit
        //===============================================================
        $('#submit').click(() => {
            if (validateResult1 === true &&
                validateResult2 === true &&
                validateResult3 === true &&
                validateResult4 === true
                ) {
                $('#form-1').attr('onsubmit', 'return true');
            } else {
                $('#form-1').attr('onsubmit', 'return false');
                alert('Форма содержит некоректные данные! \nОтправка данных заблокирована');
            }
        });

        // обработка сброса сообщений об ошибках:
        //=======================================
        $('#login').focus(() => {
            // - login
            $('#login_err').text('');
        });

        $('#pass1').focus(() => {
            // - pass1
            $('#pass1_err').text('');
        });

        $('#pass2').focus(() => {
            // - pass2
            $('#pass2_err').text('');
        });

        $('#email').focus(() => {
            // - email
            $('#email_err').text('');
        });
});
