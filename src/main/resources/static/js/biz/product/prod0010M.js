/*****************************************************************************
 *  File Name      : prod0010M.js
 *  Description    : 제품리스트
 *  Author         : peter
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
             * 재품리스트 호출.
             *
             * @memberOf screen.c
             * @param {int} page 조회할 페이지
             */
            getProdList : function(page) {

                var options = {
                    url : "/getProdList",
                    formData : $("#frm").serialize() + "&page=" + page,
                    success : function(data) {

                        data.emptyTxt = "검색 조건에 맞는 제품이 없습니다.";

                        // 테이블 데이터 설정.
                        $sTable.dataBindPaging($("#prodTable"), data, prod0010M.c.getProdList);
                    }
                };

                $cmm.ajax(options);
            },

            /**
             * 제품 삭제 호출.
             *
             * @memberOf screen.c
             */
            delProduct : function() {

                var options = {
                    url : "/delProduct",
                    formData : $("#bodyFrm").serialize(),
                    success : function(data) {

                        // 거래처 리스트 호출.
                        screen.c.getProdList(1);
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
                screen.c.getProdList(1);
            });

            // 제품명 검색 엔터
            $("#searchKey").enter(function() {

                // 거래처 리스트 호출.
                screen.c.getProdList(1);
            });

            // 엑셀 버튼 클릭
            $("#btnExcel").on("click", function() {

                if(confirm("엑셀 다운로드를 하시겠습니까?")) {

                    // 엑셀 다운로드.
                    $cmm.excelDownload("excelProdList",$("#frm").serialize());
                }
            });

            // 전체 체크박스 클릭
            $("#chkAll").on("click", function() {

                $(this).parents("table").find("tbody input[type=checkbox]").prop("checked", $(this).prop("checked"));
            });

            // 추가 버튼 클릭
            $("#btnAdd").on("click", function() {

                var options = {

                    url		: "/product/prod0011P",
                    width	: 980,
                    height	: 670,
                    name	: "prod0011P",
                    data	: {}
                };

                $sPopup.open(options);
            });

            // 삭제 버튼 클릭
            $("#btnDel").on("click", function() {

                if($("input[name=prodNo]:checked").length === 0) {

                    alert("하나이상의 제품을 선택하여 주세요.");
                } else {

                    if(confirm("선택한 제품들을 삭제 하시겠습니까?")) {

                        // 제품 삭제 호출.
                        prod0010M.c.delProduct();
                    }
                }
            });

            // 제품번호 클릭
            $("#prodTable").find("tbody").on("click", "a", function() {

                var item = $(this).parents("tr").data();

                var options = {

                    url		: "/product/prod0011P",
                    width	: 980,
                    height	: 670,
                    name	: "prod0011P",
                    data	: {
                        prodNo : item.prodNo
                    }
                };

                $sPopup.open(options);
            });
        },

        /**
         * Init 최초 실행.
         *
         * @memberOf screen
         */
        init: function() {

            console.log("prod0010M 화면");

            // 이벤트 호출.
            screen.event();
            // 재품리스트 호출.
            screen.c.getProdList(1);
        }
    };

    // init 호출.
    screen.init();
});