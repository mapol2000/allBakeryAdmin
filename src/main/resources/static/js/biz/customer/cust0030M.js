/*****************************************************************************
 *  File Name      : cust0030M.js
 *  Description    : 거래처정보 등록
 *  Author         : peter
 *  Date Created   : 2022.09.07
 *--------------------------------------------------------------
 *  [변경 내역]
 *  [YY.MM.DD] [변경자] [변경내역]
 ******************************************************************************/

$(function() {

    const screen = {

        /**
         * 내부 전역변수
         *
         * @memberOf screen
         */
        v: {

        },

        /**
         * 통신 객체- call
         *
         * @memberOf screen
         */
        c: {

            /**
             * 거래처명 중복 조회.
             *
             * @memberOf cust0030M.c
             */
            getBiacDplc : function(page) {

                // validate 체크.
                // if($cmm.util.validate("#custNm")) {

                    var options = {
                        url : "/getBiacDplc",
                        data : {
                            custNm : $("#custNm").val()
                        },
                        success : function(data) {

                            // 거래처 .
                            if(data.totoalCnt > 0) {

                                alert('이미 등록된 거래처 명입니다');
                                $("#custNm").data("nameChecked", "N");
                                $("#custNm").focus();
                            } else {

                                alert('사용가능한 거래처 명입니다');
                                $("#custNm").data("nameChecked", "Y");
                            }
                        }
                    };

                    $cmm.ajax(options);
                // }
            },

        },

        /**
         * 내부 함수
         *
         * @memberOf screen
         */
        f: {

        },

        /**
         * Event 정의 객체.
         *
         * @memberOf screen
         */
        event: function() {

            // 거래처명 중복체크 클릭 이벤트
            $("#btnCustNmDplc").on("click", function() {

                // 거래처명 중복 조회.
                screen.c.getBiacDplc();
            });

            // 거래처명 엔터 이벤트
            $("#custNm").enter(function() {

                // 거래처명 중복 조회.
                screen.c.getBiacDplc();
            });

            // 사업자등록번호 중복체크 클릭 이벤트
            $("#btnBizNoDplc").on("click", function() {

                // 사업자등록번호 중복 조회.
                screen.c.getBmrnoDplc();
            });

            // 사업자등록번호 엔터 이벤트
            $("#bizNo").enter(function() {

                // 사업자등록번호 중복 조회.
                screen.c.getBmrnoDplc();
            });

            // 사업자등록번호 수정
            $("#bizNo").on("change", function() {

                $("#bizNo").data("nameChecked", "N");
            });

            // 사업자등록번호 포커스 아웃
            $("#bizNo").on("focusin", function() {

                $("#bizNo").val($("#bizNo").val().replace(/-/g, ""));
            });

            // 사업자등록번호 포커스 아웃
            $("#bizNo").on("focusout", function() {

                var value = $(this).val();
                value = value.replace(/-/g, "");

                if(value.length > 3) {

                    value = value.substring(0, 3) + "-" + value.substring(3);
                }

                if(value.length > 6) {

                    value = value.substring(0, 6) + "-" + value.substring(6);
                }

                $(this).val(value);
            });

            // 배송지 우편번호 찾기 클릭 이벤트
            $("#btnSearchPost").on("click", function() {

                $cmm.util.daumPostOpen($("#zipcode"), $("#address1"), $("#address2"), function(item) {

                    $('#stdoCd').val(item.bcode);
                });
            });

            // 사업장 우편번호 찾기 클릭 이벤트
            $("#btnSearchBizPost").on("click", function() {

                $cmm.util.daumPostOpen($("#bZipcode"), $("#bAddress1"), $("#bAddress2"), function(item) {

                    $('#bStdoCd').val(item.bcode);
                });
            });

            // 주소복사 클릭 이벤트
            $("#chkCopy").on("click", function() {

                $("#bStdoCd").val($(this).prop("checked") ? $("#stdoCd").val() : "");
                $("#bZipcode").val($(this).prop("checked") ? $("#zipcode").val() : "");
                $("#bAddress1").val($(this).prop("checked") ? $("#address1").val() : "");
                $("#bAddress2").val($(this).prop("checked") ? $("#address2").val() : "");
            });

            // 배송불가요일 전체 클릭 이벤트
            $("#expressWeekAll").on("click", function() {

                $(this).closest("div").find("input[type=checkbox]").prop("checked", $(this).prop("checked"));
            });

            // 거래처 저장 클릭 이벤트
            $("#btnSave").on("click", function() {

                // validate 체크.
                if($cmm.util.inputValidate() && screen.f.validateIns()) {

                    if(confirm("거래처 등록하시겠습니까?")) {

                        // 주소 -> 좌펴 변환 호출.
                        screen.c.getAddrApi();
                    }
                }
            });

        },

        /**
         * Init 최초 실행.
         *
         * @memberOf screen
         */
        init: function() {

            // Event 정의 실행
            screen.event();

            console.log("cust0030M 화면");

        }

    }
    $cmm.addScreen(screen);
});