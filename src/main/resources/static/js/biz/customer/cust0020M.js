/*****************************************************************************
 *  File Name      : cust0020M.js
 *  Description    : 거래처승인 리스트
 *  Author         : peter
 *  Date Created   : 2022.09.14
 *--------------------------------------------------------------
 *  [변경 내역]
 *  [YY.MM.DD] [변경자] [변경내역]
 ******************************************************************************/

$(function() {

    var screen = {

        /**
         * 내부 전역변수
         *
         * @memberOf screen
         */
        v : {

        },

        /**
         * 통신 객체- call
         *
         * @memberOf screen
         */
        c : {

            /**
             * 거래처승인 리스트 호출.
             *
             * @memberOf screen.c
             * @param {int} page 조회할 페이지
             */
            getBiacAvpList : function() {

                var options = {
                    url : "/getBiacAvpList",
                    formData : $("#frm").serialize(),
                    success : function(data) {

                        data.emptyTxt = "검색 조건에 맞는 승인대기 업체가 없습니다.";

                        // 테이블 데이터 설정.
                        $sTable.dataBind($("#custTable"), data, screen.c.getBiacAvpList);
                    }
                };

                $cmm.ajax(options);
            },

            /**
             * 거래처보류 처리 호출.
             *
             * @memberOf screen.c
             * @param {int} page 조회할 페이지
             */
            modBiacSspn : function() {

                var options = {
                    url : "/modBiacSspn",
                    formData : $("#frm").serialize(),
                    success : function(data) {

                        // 거래처 리스트 호출.
                        screen.c.getBiacAvpList();
                    }
                };

                $cmm.ajax(options);
            }
        },

        /**
         * Event 정의 객체.
         *
         * @memberOf screen
         */
        event : function() {

            // 검색 버튼 클릭
            $("#btnSearch").on("click", function() {

                // 거래처 리스트 호출.
                screen.c.getBiacAvpList();
            });

            // 보류 버튼 클릭
            $("#btnSspn").on("click", function() {

                if($("input[name=custNo]:checked").length === 0) {

                    alert("하나이상의 거래처를 선택하여 주세요.");
                } else {

                    if(confirm("선택업체를 보류처리 하시겠습니까?")) {

                        // 거래처보류 처리 호출.
                        screen.c.modBiacSspn();
                    }
                }
            });

            // 전체 체크박스 클릭
            $("#chkAll").on("click", function() {

                $(this).parents("table").find("tbody input[type=checkbox]").prop("checked", $(this).prop("checked"));
            });

            // 거래처명 클릭
            $("#custTable").find("tbody").on("click", "td", function() {

                if($(this).index() > 0) {

                    var item = $(this).parents("tr").data();

                    var options = {

                        url		: "/customer/cust0012P",
                        width	: 960,
                        height	: 820,
                        name	: "cust0012P",
                        data	: {
                            custNo : item.custNo,
                            authorize : "Y"
                        }
                    };

                    $sPopup.open(options);
                }
            });

            // 화면에서 엔터 이벤트
            $("body").enter(screen.c.getBiacAvpList);
        },

        /**
         * Init 최초 실행.
         *
         * @memberOf screen
         */
        init: function() {

            // 이벤트 호출.
            screen.event();
            // 거래처승인 리스트 호출.
            screen.c.getBiacAvpList();
        }
    };

    // init 호출.
    screen.init();
});