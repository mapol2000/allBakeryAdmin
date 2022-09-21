/*****************************************************************************
 *  Description    : 로그인
 *  Author         : peter
 ******************************************************************************/

$(function() {

    /**
     * 아이디 엔터 이벤트 - 패스워드로 이동
     */
    $("#id").enter(function() {

        $("#pw").focus();
    });

    /**
     * 패스워드 엔터 이벤트 - 로그인 실행
     */
    $("#pw").enter(function() {

        $("#btnLogin").trigger("click");
    });

    /**
     * 로그인 버튼 클릭 이벤트.
     */
    $("#btnLogin").on("click", function() {
        console.log("로그인 버튼 누름");

        var options = {

            url : "/getLogin",
            contentType: "application/json",
            isValidate : true,
            data : JSON.stringify({
                id : $("#id").val(),
                pw : $("#pw").val()
            }),
            success : function(data) {
                console.log("통신 성공");

                if(!!opener) {

                    $sPopup.closeValue();
                } else {

                    if($("#id").val().toLocaleUpperCase() === "DL1005") {

                        $sBizCommon.goPage("/prodDeli/prDe0050M");
                    } else {

                        if(!!location.search) {
                            $sBizCommon.goPage(location.search.replace('?path=', ''));
                        } else {

                            $sBizCommon.goPage("/");
                        }
                    }
                }
            }
        };

        $cmm.ajax(options);
    });

    // 화면 로딩 후 이벤트 설정.
    // $(window).load(function() {
    //
    //     console.log("화면 로딩 성공");
    //
    //     $("#id").focus();
    //
    //     console.log("아이디 포커스 완료");
    //
    //     $(window).resize(function(){
    //         console.log("리사이즈 성공");
    //         $('#loginWrap').height($(window).height())
    //     }).resize();
    // });
})