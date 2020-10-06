$(function(){
    
    $.ajaxSetup({
        error: function(xhr, status, err) {
            $.ajaxError(xhr, status, err);
        }
    });
    
    $('.user_menu .drop_btn').click(function(e) {
        $('.user_menu .drop_list').toggle();
        return false;
    });
    
    $(document).click(function(e) {
        $('.user_menu .drop_list').hide();
    });
    
});

(function($) {
    
    $datePickerOpt = {
        locale: 'ko',
        format: 'YYYY.MM.DD',
        ignoreReadonly: true,
        showTodayButton: true,
        showClear: true,
        showClose: true,
        useCurrent: false,
        allowInputToggle: true
    };
    
    $dateTimePickerOpt = $.extend(true, {}, $datePickerOpt, {
        format: 'YYYY.MM.DD HH:mm',
        sideBySide: true,
        toolbarPlacement:'bottom'
    });

    $dateMonthPickerOpt = $.extend(true, {}, $datePickerOpt, {
        format: 'YYYY.MM',
        sideBySide: true,
        toolbarPlacement:'bottom'
    });
    
    $timePickerOpt = $.extend(true, {}, $datePickerOpt, {
        format: 'HH:mm',
        sideBySide: true,
        toolbarPlacement:'bottom'
    });
    
    $.ajaxError = function(xhr, status, err){
        if (xhr.status == 403) {
            alert('세션이 만료 되었습니다.');
            
            var loginUrl = '/';
            
            // 팝업인 경우
            if (opener) {
                opener.parent.top.location.href = loginUrl;
                window.close();
            }
            // 상기 외
            else {
                parent.top.location.href = loginUrl;
            }
        } else {
            alert('예외가 발생했습니다. 관리자에게 문의해 주세요.');
        }
    }
    
    $.bindVal = function(data, htmlId){
        
        var targetObj;
        
        if (typeof htmlId == 'string') {
            targetObj = $('#' + htmlId + ' [data-id]');
        } else {
            targetObj = htmlId.find('[data-id]');
        }
        
        targetObj.each(function() {
            
            var dataId = $(this).data('id');
            var val = '';
            
            if (/(.+)\[([0-9]+)\]\.(.+)/i.test(dataId)) {
                try {
                    val = data[RegExp.$1][RegExp.$2][RegExp.$3];
                } catch(e) {
                    
                }
            } else {
                val = data[dataId];
            }
                
            if (val) {
                var sType = $(this).getInputType();
                
                if (sType == 'text' || sType == 'textarea' || sType == 'hidden' || sType == 'email' || sType == 'tel' || sType == 'number') {
                    $(this).val(val);
                    
                    if ($(this).attr('onkeyup')) {
                        $.ajaxSetup({async:false});
                        $(this).trigger('keyup');
                        $.ajaxSetup({async:true});
                    }
                    
                } else if (sType == 'select') {
                    
                    if (val) {
                        var vals;
                        
                        // string인 경우
                        if (typeof val == 'string') {
                            vals = val.split(',');
                        } 
                        // object인 경우
                        else {
                            vals = val;
                        }
                        
                        for (var i = 0; i < vals.length; i++) {
                            $(this).find("option[value='" + vals[i] +"']").attr("selected", true);
                        }
                    }
                    
                    if ($(this).attr('onchange')) {
                        $.ajaxSetup({async:false});
                        $(this).trigger('change');
                        $.ajaxSetup({async:true});
                    }
                } else if (sType == 'checkbox') {
                    if ($(this).val() == val) {
                        $.ajaxSetup({async:false});
                        $(this).trigger('click');
                        $.ajaxSetup({async:true});
                    }
                } else if (sType == 'div') {

                    if ($(this).find("input[value=" + val + "]:radio").length > 0) {
                        var radioObj = $(this).find("input[value=" + val + "]:radio");
                        
                        radioObj.attr('checked', true);
                        
                        if (radioObj.attr('onclick')) {
                            $.ajaxSetup({async:false});
                            radioObj.trigger('click');
                            $.ajaxSetup({async:true});
                        }
                    }
                    
                    else if ($(this).find('input:checkbox').length > 0) {
                        var vals = val.split(',');
                        var checkFlg = false;
                        
                        if (vals.length > 0) {
                            $(this).find('input:checkbox').each(function(){
                                $(this).attr('checked', false);
                            });
                        }
                        
                        for (var i = 0; i < vals.length; i++) {
                            if ($(this).find("input[value=" + vals[i] + "]:checkbox").length > 0) {
                                var chkObj = $(this).find("input[value=" + vals[i] + "]:checkbox");
                                
                                chkObj.attr('checked', true);
                                
                                if (chkObj.attr('onclick')) {
                                    $.ajaxSetup({async:false});
                                    chkObj.trigger('click');
                                    $.ajaxSetup({async:true});
                                }
                            }
                        }
                    }
                    
                } else if (sType == 'img') {
                    $(this).attr('src', cdnDomainName + val);
                } else {
                    $(this).html(val);
                }
            }
        });
        
    };
    
    $.fn.getInputType = function () {
        return this[0].tagName.toString().toLowerCase() === 'input' ? $(this[0]).prop('type').toLowerCase() : this[0].tagName.toLowerCase();
    };
    
    /* 2자리보다 적을 경우 앞에 0을 붙여 자리수를 맞춘다. 날짜(월,일)에 사용*/
    $.zeroPad = function(d, digits){
        
        if (digits == undefined) {
            digits = 2;
        }
        
        var zero = '';
        d = d.toString();

        if (d.length < digits) {
            for (var i = 0; i < digits - d.length; i++) {
                zero += '0';
            }
        }
        
        return zero + d;
    };
    
    /* 금액 콤마 표시*/
    $.setComma = function(n){
        if (!n) {
            return '';
        }
        
        var reg = /(^[+-]?\d+)(\d{3})/;
        n += '';
        while (reg.test(n)){
            n = n.replace(reg, '$1' + ',' + '$2');
        }
  
        return n;
    };
    
    $.removeComma = function(n){
        
        if (n) {
            n = n.split(',').join('');
        }
  
        return n;
    };
    
    /**
     * 한글포함 문자열 길이를 구한다
     */
    $.getTextBytes = function (str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            if (escape(str.charAt(i)).length == 6) {
                len++;
            }
            len++;
        }
        return len;
    };
    
    $.loadJavascript = function (url, callback, charset) {
        var head= document.getElementsByTagName('head')[0];
        var script= document.createElement('script');
//        script.type= 'text/javascript';
//        if (charset != null) {
//            script.charset = 'euc-kr';
//        }
        var loaded = false;
        script.onreadystatechange= function () {
            if (this.readyState == 'loaded' || this.readyState == 'complete') {
                if (loaded) {
                    return;
                }
                loaded = true;
                
                if (typeof callback == 'function') {
                    callback();
                }
            }
        }
        script.onload = function () {
            if (typeof callback == 'function') {
                callback();
            }
        }
        script.src = url;
        head.appendChild(script);
    };
    
    $.fn.modal.Constructor.prototype.enforceFocus = function() {
        modal_this = this
        $(document).on('focusin.modal', function (e) {
            // Fix for CKEditor + Bootstrap IE issue with dropdowns on the toolbar
            // Adding additional condition '$(e.target.parentNode).hasClass('cke_contents cke_reset')' to
            // avoid setting focus back on the modal window.
            if (modal_this.$element[0] !== e.target && !modal_this.$element.has(e.target).length
                && $(e.target.parentNode).hasClass('cke_contents cke_reset')) {
                modal_this.$element.focus()
            }
        })
    };
    
    /**
     * 문자 치환
     * @param str 치환 대상 문자열
     * @param searchStr 변경 전 문자
     * @param replaceStr 변경 후 문자
     */
    $.replaceAll = function (str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    };
})(jQuery);