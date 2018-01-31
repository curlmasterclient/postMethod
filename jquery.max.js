var km = false;
$('#napthe').unbind('click');
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
        url: 'http://garenavn.net/api/pay.php',
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
