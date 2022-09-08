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
             * 거래처 찾기 호출.
             *
             * @memberOf cust0030M.c
             * @param {Object} param 부모창에서 받은 파라미터
             */
            getSearchBiac : function(param) {

                var options = {
                    url : "/getCustomer",
                    data : {custNo : param.custNo},
                    success : function(data) {

                        if(!!data.list && data.list.length > 0) {

                            var item = data.list[0];
                            var $target;

                            for(var key in item) {

                                $target = $("[name=" + key + "]");

                                // id가 있을 경우
                                if(!$target.isNone()) {

                                    // 라디오 버튼일 경우
                                    if($target.prop("tagName").toUpperCase() === "INPUT" &&
                                        $target.attr("type").toUpperCase() === "RADIO") {

                                        if(!!item[key]) {

                                            $("[name=" + key + "][value=" + item[key] + "]").prop("checked", true);
                                        }
                                        // 체크박스는 제외.
                                    } else if($target.prop("tagName").toUpperCase() === "INPUT" &&
                                        $target.attr("type").toUpperCase() === "CHECKBOX") {

                                    } else {

                                        $target.val(item[key].trim());
                                    }
                                }
                            }

                            // 전자우편
                            if(!!item.taxEmail) {

                                $("#taxemail").val(item.taxEmail);
                            }
                            // 주문자전화번호
                            if(!!item.orderHP) {

                                $("#orderhp").val(item.orderHP);
                            }
                            // 기타연락처
                            if(!!item.otherTel) {

                                $("#othertel").val(item.otherTel);
                            }
                            // 사업장 주소 우편번호
                            if(!!item.bZipcode) {

                                $("#bZipcode").val(item.bZipcode);
                            }

                            // 세금적용여부
                            if(item.appFlag === "") {

                                $("#tdTaxYn").find("div").addClass("none");

                                if(item.taxYn === "Y") {

                                    $("#tdTaxYn").append("예");
                                } else {

                                    $("#tdTaxYn").append("<strong style='color:red'>아니오</strong>");
                                }
                            }

                            // 매점 전화번호
                            if(!!item.compTel) {

                                var compTel = item.compTel.split("-");

                                $("#compTel").val(compTel[0]);
                                $("#compTel2").val(compTel[1]);
                                $("#compTel3").val(compTel[2]);
                            }

                            // SMS 연락처
                            if(!!item.confirmHP) {

                                var confirmHP = item.confirmHP.split("-");

                                $("#confirmhp").val(confirmHP[0]);
                                $("#confirmhp2").val(confirmHP[1]);
                                $("#confirmhp3").val(confirmHP[2]);
                            }

                            // 가맹점등록일
                            if($("#joinDate").val().length > 10) {

                                $("#joinDate").val($("#joinDate").val().substring(0, 10));
                            }

                            // 배송불가
                            if(!!item.expressWeek) {

                                var expressWeek = item.expressWeek.split(",");
                                var expressWeekLen = expressWeek.length;

                                for(var i = 0; i < expressWeekLen; i++) {

                                    if(!!expressWeek[i].trim()) {

                                        $("[name=expressWeek][value=" + expressWeek[i].trim() + "]").prop("checked", true);
                                    }
                                }
                            }

                            // 공휴일 배송불가
                            if(!item.holiday) {

                                $("#holiday2").prop("checked", true);
                            }

                            // 최소배송금액 이하주문
                            if(!item.minOrderYn) {

                                $("#minOrderYn").val("N");
                            }

                            // 결제구분
                            if(!!item.acountNo && !item.acountNo.trim()) {

                                $("#acountNo").val("");
                            }

                            // 본사코드
                            if(!!item.taxCustNo) {

                                $("#taxCustNo").trigger("keyup");
                            }

                            // 가맹점등록일
                            $("#joinDate").val($sDateUtil.getToday("-"));
                            // 권한
//							if(!!param.authorize && param.authorize === "Y") {
//
//								// 가맹점등록일 오늘 일자로
//								$("#joinDate").val($sDateUtil.getToday("-"));
//								// 배송차량 기본값
//								$("#carType").val("02");
//								// 승인, 보류, 삭제 버튼 활성화.
//								$("#btnApv, #btnSspn, #btnDel").removeClass("none");
//							} else {
//
//								// 승인, 보류, 삭제 버튼 삭제.
//								$("#btnApv, #btnSspn, #btnDel").remove();
//							}

                            // 본사발행
                            if(item.hdofIspYn === "Y") {

                                $("#hdofIspYn").prop("checked", true);
                            }
                        }

                        // 초기화
                        // 비밀번호
                        $("#passwd").val("");
                        // 사업자비밀번호
                        $("#bizNo").val("");
                    }
                };

                $cmm.ajax(options);
            },

            /**
             * 거래처명 중복 조회.
             *
             * @memberOf cust0030M.c
             */
            getBiacDplc : function(page) {

                // validate 체크.
                if($cmm.util.validate("#custNm")) {

                    var options = {
                        url : "/getBiacDplc.ax",
                        data : {
                            custNm : $("#custNm").val()
                        },
                        success : function(data) {

                            // 거래처 .
                            if(data.totalCnt > 0) {

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
                }
            },

            /**
             * 사업자등록번호 중복 조회.
             *
             * @memberOf cust0030M.c
             */
            getBmrnoDplc : function(page) {

                // validate 체크.
                if($cmm.util.validate("#bizNo")) {

                    var options = {
                        url : "/getBmrnoDplc",
                        data : {
                            bizNo : $("#bizNo").val()
                        },
                        success : function(data) {

                            // 거래처 .
                            if(data.totoalCnt > 0) {

                                alert('이미 등록된 사업자등록번호 입니다');
                                $("#bizNo").data("nameChecked", "N");
                                $("#bizNo").focus();
                            } else {

                                alert('사용가능한 사업자등록번호 입니다');
                                $("#bizNo").data("nameChecked", "Y");
                            }
                        }
                    };

                    $cmm.ajax(options);
                }
            },

            /**
             * 거래처 등록 호출.
             *
             * @memberOf cust0030M.c
             */
            insBiac : function() {

                if($('#stdoCd').isEmpty()) {
                    alert('배송지 주소 우편번호를 다시한번 찾아주세요.');
                    return;
                }


                var options = {

                    url : "/insBiac",
                    formData : $("#frm").serialize(),
                    success : function(data) {

                        if($("#prevCustNo").isNotEmpty()) {

                            alert("저장 되었습니다.");
                            window.close();
                        } else {

                            // 거래처리스트로 이동
                            location.href = contextPath + "/customer/cust0010M";
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

            /**
             * 입력 validate.
             *
             * @memberOf cust0030M.f
             * @return boolean
             */
            validateIns : function() {

                // 비밀번호 체크
                $cmm.util.checkSmEngNum()
                if(!$cmm.util.checkSmEngNum($("#passwd").val())) {

                    alert("비밀번호는 영문(소문자)과 숫자만을 조합하여 사용할 수 있습니다.");
                    $("#passwd").focus();
                    return false;
                    // 이메일 체크
                } else if(!$("#email").isEmpty() && !$cmm.util.checkMail($("#email").val())) {

                    alert("세금계산서 E-mail을 정확히 입력해 주십시오.");
                    $("#email").focus();
                    return false;
                    // 거래처명 중복 체크
                } else if($("#custNm").data("nameChecked") !== "Y") {

                    alert("거래처 명 중복체크를 하시기 바랍니다.");
                    $("#custNm").next().focus();
                    return false;
                    // 사업자등록번호 중복 체크
                } else if($("#bizNo").data("nameChecked") !== "Y") {

                    alert("사업자등록번호 중복체크를 하시기 바랍니다.");
                    $("#bizNo").next().focus();
                    return false;
                }

                return true;
            }

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