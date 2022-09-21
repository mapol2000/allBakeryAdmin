/*****************************************************************************
 *  File Name      : cust0010M-1.js
 *  Description    : 거래처리스트
 *  Author         : peter
 *  Date Created   : 2022.09.05
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
             *
             * @memberOf screen.c
             */
            getCustomerList : function(page) {

                const options = {
                    queryId  : "/getCustomerList",
                    formData : $("#frm").serialize() + "&page=" + page,
                    success  : function (data) {

                        // 연락처 설정을 위한 로직
                        if(!!data.list) {
                            const len = data.list.length;

                            for (let i = 0; i < len; i++) {

                                // 연락처 설정
                                data.list[i].telHp = data.list[i].compTel + " /<br>" + data.list[i].confirmhp;
                            }
                        }

                        data.emptyTxt = "검색조건에 맞는 거래처가 없습니다.";

                        // 테이블 데이터 설정
                        $sTable.dataBindPaging($("#custTable"), data, cust0010M.c.getCustomerList);

                        // 메일 설정을 위한 로직
                        if (!!data.list) {

                            const len = data.list.length;
                            let $a;

                            for (let i = 0; i < len; i++) {

                                $a = $(document.createElement("a"));
                                $a.attr("href", "mailto:" + data.list[i].email);
                                $a.html(data.list[i].owner);

                                $("#custTable").find("[data-column=owner]").eq(i + 1).html($a);
                            }
                        }
                    }
                };

                $cmm.ajax(options);
            }
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

            // 검색 버튼 클릭
            $("#btnSearch").on("click", function() {

                screen.c.getCustomerList(1);
            });

            // 거래처명 클릭
            $("#custTable").find("tbody").on("click", "a[data-name=custLink]", function() {

                var item = $(this).parents("tr").data();

                var options = {

                    url		: "/customer/cust0012P",
                    width	: 1000,
                    height	: 820,
                    name	: "cust0012P",
                    data	: {
                        custNo : item.custNo
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

            // Event 정의 실행
            screen.event();

            // 거래처 리스트 호출.
            // screen.c.getCustomerList(1);

            console.log("cust0010M 화면");

        }
    };

    $cmm.addScreen(screen);
});