const $cmm = {

    screen: null,
    /**
     * 전역 변수 및 상수
     */
    Cont: {
        lodingCnt: 0,
        LOING_INFO: 'loginInfo',
        ADMIN_LOING_INFO: 'adminLoginInfo',
    },

    /**
     * 화면 추가
     */
    addScreen: function (screen) {

        if(!$cmm.screen) {

            $cmm.screen = screen;
        } else {

            $cmm.screen = [$cmm.screen];
            $cmm.screen.push(screen);
        }

        if(!!screen.init) {

            screen.init();
        }

        // 템플릿 엘리먼트 복제
        $cmm.util.cloneTemplate(screen.v);
    },

    /**
     * 화면 조회
     */
    getScreen: function () {

        return $cmm.screen;
    },

    /**
     * init
     */
    init: function() {

		$('a[href="#"]').attr('href', 'javascript:void(0)');

        /** Evnet */
        // href 이동
        $('body').on('click.href', '[data-href]', function () {

            top.location.href = $(this).data('href');
        });

        // href 이동
        $('body').on('click.href', '.imageExpand', function () {

            $cmm.image.expand($(this).attr('src'));
        });

        // 팝으로 href 이동
        $('[data-popup-href]').on('click.href', function () {

            top.window.open($(this).data('popupHref'));
        });

        // 포커스 아웃
        $('[data-amt=true]').on('focusout.amt', function() {

            $(this).val($cmm.util.comma($(this).val()));
        });

        // 포커스 아웃
        $('[data-enter-id]').on('keyup', e => {

            if(e.keyCode === 13) {

				$('#' + $(e.currentTarget).data('enterId')).trigger('click');
			}
        });
    },

    /**
     * 로딩바를 호출한다.
     *
     * @memberOf $cmm
     * @param {Object} options 로딩바 화면 속성
     */
    loadingShow : function(options) {

        $cmm.Cont.lodingCnt++;

        let _options = {
            message: '<div class="loadingBox">' +
                        '<div class="dim"></div>' +
                        '<div class="circle"></div>' +
                     '</div>',
            overlayCSS: {
                backgroundColor: '#FFF',
                opacity: 0.4,
                "z-index": 10000,
                cursor: 'wait'
            },
            css: {
                border: 0,
                padding: 0,
                "z-index": 10001,
                backgroundColor: 'transparent'
            },
        };

        // 기본 옵션에 커스텀 옵션 추가
        if (!!options) {
            for (var key in options) {
                if(typeof options[key] !== "undefined") {
                    _options[key] = options[key];
                }
            }
        }

        // window 객체.
        var windowBlock = window;

        // iframe일 경우 최상위 부모 객체까지 올라간다.
        while(windowBlock.location != windowBlock.parent.location) {
            windowBlock = window.parent;
        }

        if($cmm.Cont.lodingCnt === 1) {

            $('input,button,a').blur();
            // show loading bar
            windowBlock.$.blockUI(_options);
        }
    },

    /**
     * 로딩바를 감춘다.
     *
     * @memberOf $cmm
     */
    loadingHide : function(){

        $cmm.Cont.lodingCnt--;

        $cmm.Cont.lodingCnt = $cmm.Cont.lodingCnt < 0 ? 0 : $cmm.Cont.lodingCnt;

        if($cmm.Cont.lodingCnt === 0) {

            // window 객체.
            var windowBlock = window;

            // iframe일 경우 최상위 부모 객체까지 올라간다.
            while(windowBlock.location != windowBlock.parent.location) {
                windowBlock = window.parent;
            }

            // hide loading bar
            windowBlock.$.unblockUI();
        }
    },

    /**
     * alert
     *
     * @memberOf $cmm
     */
    alert: function (txt, func) {

		alert(txt);
        if(!!func) { func(); }
    },

    /**
     * confirm
     *
     * @memberOf $cmm
     */
    confirm: function (txt, func) {

		if(confirm(txt)) {

        	if(!!func) { func(); }
		}
    },

    /**
     * 로그인 여부
     */
    checkLogin: function (isMove) {

        const isLogin = !!$cmm.util.getLs($cmm.Cont.LOING_INFO) && !!$cmm.util.getLs($cmm.Cont.LOING_INFO).userId;
        if(!isLogin && !!isMove) {

            $cmm.alert('로그인 후 이용가능합니다.\n로그인 화면으로 이동합니다.', function () {
                location.href = '/join/login.qq';
            });
        }

        return isLogin;
    },

    /**
     * 로그인 정보
     */
    getLoginInfo: function (key) {

        const loginInfo = !!$cmm.util.getLs($cmm.Cont.LOING_INFO) ? $cmm.util.getLs($cmm.Cont.LOING_INFO) : {};
        if(!!key) {

            return loginInfo[key];
        } else {

            return loginInfo;
        }
    },

    /**
     * 이벤트 정의
     *
     * @memberOf $cmm
     */
    event: {

        /**
         * 뒤로가로 화면 진입 이벤트
         * @memberOf $cmm.event
         */
        pageShowBack: function (callback) {

            window.addEventListener('pageshow', (event) => {
                if (event.persisted) {
                    !!callback ? callback() : '';
                }
            });
        }
    },

    /**
     * 유틸
     *
     * @memberOf $cmm
     */
    util: {

        /**
         * iframe 여부.
         * @memberOf $cmm.util
         */
        isIframe: function () {

            return top != self;
        },

        /**
         * 문자열이 공백또는 Null 인지 체크한다.
         * @memberOf $cmm.util
         * @param {String} selValue 문자열
         * @returns {Boolean}
         */
        isEmpty : function(selValue) {
            if (selValue == null || typeof (selValue) == "undefined" || selValue === ""
                || selValue === "NULL" || selValue === "null") {
                return true;
            }

            if(typeof (selValue) == "string" && selValue.replace(/ /g, '') === "") {
                return true;
            }

            return false;
        },

        /**
         * 로컬 스토리지에서 조회.
         *
         * @memberOf $cmm.util
         * @param {String} key 로컬 스토리지 키
         */
        getLs : function(key) {
            return JSON.parse(localStorage.getItem(key));
        },

        /**
         * 로컬 스토리지에 저장.
         *
         * @memberOf $cmm.util
         * @param {String} key 로컬 스토리지 키
         * @param {Object} val 로컬 스토리지에 저장할 값
         */
        setLs : function(key, val) {
            localStorage.setItem(key, JSON.stringify(val));
        },

        /**
         * 로컬 스토리지에 삭제
         *
         * @memberOf $cmm.util
         * @param {String} key 로컬 스토리지 키
         */
        rmLs : function(key) {
            localStorage.removeItem(key);
        },

        /**
         * 콤마
         *
         * @memberOf $cmm.util
         * @param val
         * @returns {*|string}
         */
        comma: function (val) {

            val = $cmm.util.isEmpty(val) ? '' : String(val);
            let dec = '';

            if(val.indexOf('.') > -1) {
                dec = val.substring(val.indexOf('.'));
                val = val.replaceAll(dec, '');
            }

            return !!val ? String(this.getNumber(val)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + dec : '';
        },

        /**
         * 다음 우편번호 팝업을 호출한다.
         *
         * @memberOf $cmm.util
         * @param {Element} $post 우편번호 객체
         * @param {Element} $addr1 기본주소 객체
         * @param {Element} $addr2 상세주소 객체
         * @param {Function} callback 선택 후 콜백
         */
        daumPostOpen : function($post, $addr1, $addr2, callback) {

            new daum.Postcode({

                oncomplete: function (data) {

                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var fullAddr = ''; // 최종 주소 변수
                    var extraAddr = ''; // 조합형 주소 변수

                    fullAddr = data.roadAddress;

                    // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        fullAddr = data.roadAddress;

                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        fullAddr = data.jibunAddress;
                    }

                    // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
                    if (data.userSelectedType === 'R') {
                        //법정동명이 있을 경우 추가한다.
                        if (data.bname !== '') {
                            extraAddr += data.bname;
                        }
                        // 건물명이 있을 경우 추가한다.
                        if (data.buildingName !== '') {
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                        // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                        fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                    }

                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    $post.val(data.zonecode);
                    $addr1.val(fullAddr);

                    // 커서를 상세주소 필드로 이동한다.
                    $addr2.val("");
                    $addr2.focus();

                    if(!!callback) {
                        callback(data);
                    }
                }
            }).open();
        },

        /**
         * 숫자만 추출
         *
         * @memberOf $cmm.util
         * @param val
         * @returns {*|string}
         */
        getNumber: function (val) {

            return !!val ? Number(String(val).replace(/[^-0-9]/g, "")) : 0;
        },

        /**
         * 전화번호 체크
         *
         * @memberOf $cmm.util
         * @param val
         * @returns {*|string}
         */
        checkTel: function(str) {
            let regExp = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
            return regExp.test(str);
        },

        /**
         * 문자열에 앞에 특정문자를 붙여 정해진 길이 문자열을 반환한다.
         * <per>
         * <br>
         * String result = $sStringUtil.lpad("123", 5, "#");
         * <br>
         * result == > ##123
         * </per>
         * @memberOf $cmm.util
         * @param {String} str 변경할 문자
         * @param {Number} len 새로 만들 문자열 길
         * @param {String} padStr 문자열 길이만큼 채울 문자
         * @return{String} 변환된 문자열
         */
        lpad : function(str, len, padStr){
            if(str == null){return str;};

            str = String(str);

            if(str.length >= len){
                return str;
            }

            var sb = [];
            for(var i=0;i < len-str.length; i+=padStr.length){
                sb.push(padStr);
            }
            sb.push(str);
            return sb.join('');
        },

        /**
         * 한글만 입력 여부
         * @memberOf $cmm.util
         * @param value
         * @returns {boolean}
         */
        isOnlyKor: function(value) {

            return /^[ㄱ-ㅎ|가-힣]+$/.test(value);
        },

        /**
         * 특수문자 제외
         * @memberOf $cmm.util
         * @param value
         * @returns {boolean}
         */
        isSpcmLtchEcpt: function(value) {

            return /^[ㄱ-ㅎ|가-힣|0-9|a-z]+$/.test(value);
        },

        /**
         * 전화번호 하이픈
         * @memberOf $cmm.util
         * @param value
         */
        hyphenTel: function (value) {

            if(!!value) {

                return value.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
            } else {

                return '';
            }
        },

        /**
         * 영어 소문자와 숫자 유효성 검사를 체크 한다..
         * @memberOf $cmm.util
         * @param {String} value 값
         * @returns {boolean} true/false
         */
        checkSmEngNum : function(value) {

            var regExpEng = /[a-z]/;
            var regExpNum = /[0-9]/;

            return regExpEng.test(value) && regExpNum.test(value);
        },

        /**
         * 이메일 유효성 검사를 체크 한다..
         * @memberOf $cmm.util
         * @param {String} mail 이메일
         * @returns {boolean} true/false
         */
        checkMail : function(mail) {

            var regExp=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

            return regExp.test(mail);
        },

        /**
         * GUID 생성
         * @memberOf $cmm.util
         * @param value
         */
        guid: function() {
            function _s4() {
                return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
            }
            return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + _s4() + _s4();
        },

        /**
         * 템플릿 엘리먼트 복제
         * @memberOf $cmm.util
         * @param vars
         */
        cloneTemplate: function (vars) {

            let tempId;
            $('body').find('[data-template-id]').each(function() {

                tempId = $(this).data('templateId');

                if(tempId.indexOf('$') === -1) {

                    tempId = '$' + tempId;
                }

                vars[tempId] = $(this).clone().removeClass('d-none').removeAttr('data-template-id');
                $(this).remove();
            });
        },

        /**
         * 필수 입력 값 validate 체크.
         *
         * @memberOf $cmm.util
         * @param {Element} element 객체
         * @param {function} callbackFunc 콜백 함수
         */
        inputValidate : function(element, callbackFunc) {

            var isValidate = true;
            element = !!element ? element : "";

            // data-validate에 값이 있을 경우 체크.
            $(element + "[data-validate]").each(function() {

                if($(this).isEmpty() && !!$(this).data("validate")) {

                    alert($(this).data("validate") + "은(는) 필수 입력값 입니다.");
                    $(this).focus();
                    isValidate = false;

                    return false;
                }
            });

            if(isValidate) {

                var validateLen;

                // data-min-length에 값이 있을 경우 체크.
                $(element + "[data-min-length]").each(function() {

                    validateLen = !!$(this).data("min-length") ? Number($(this).data("min-length")) : 0;

                    // 글자수 최소 length 체크.
                    if(validateLen > 0 && validateLen > $(this).val().length) {

                        alert($(this).data("validate") + "은(는) " + validateLen + "자 이상 입력하셔야 합니다.");
                        $(this).focus();
                        isValidate = false;

                        return false;
                    }
                });
            }

            if(isValidate) {

                var validateLen;

                // data-max-length에 값이 있을 경우 체크.
                $(element + "[data-max-length]").each(function() {

                    validateLen = !!$(this).data("max-length") ? Number($(this).data("max-length")) : 0;

                    // 글자수 최대 length 체크.
                    if(validateLen > 0 && validateLen < $(this).val().length) {

                        alert($(this).data("validate") + "은(는) " + validateLen + "자 이내로 입력하셔야 합니다.");
                        $(this).focus();
                        isValidate = false;

                        return false;
                    }
                });
            }

            // validate통과 후 콜백 함수가 있을 경우 실행
            if(isValidate && !!callbackFunc) {

                callbackFunc();
            }

            return isValidate;
        },

        /**
         * 데이터 매핑
         * @memberOf $cmm.util
         * @param $elet
         * @param item
         */
        bindName: function ($elet, item) {

            for(let key in item) {

                if($elet.find(`[name=${key}]`).isBe()) {

                    if($elet.find(`[name=${key}]`)[0].tagName.toUpperCase() === 'INPUT' && $elet.find(`[name=${key}]`).attr('type').toUpperCase() === 'CHECKBOX') {

                        $elet.attr('checked', $elet.find(`[name=${key}]`).val() === item[key]);
                    } else {

                        $elet.find(`[name=${key}]`).val(item[key]);
                    }
                }
            }
        },

        /**
         * base64 to file
         *
         * @memberOf $cmm.util
         */
        dataURLtoFile: function (dataurl, fileName) {

            var arr = dataurl.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);

            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }

            return new File([u8arr], fileName, {type:mime});
        },

        /**
         * 위도 경도 두거리상의 직선 거리 Km
         *
         * @memberOf $cmm.util
         */
        getDistanceFromLatLonInKm: function (lat1, lng1, lat2, lng2, point) {
            function deg2rad(deg) {
                return deg * (Math.PI/180)
            }

            const R = 6371; // Radius of the earth in km
            const dLat = deg2rad(lat2-lat1);  // deg2rad below
            const dLon = deg2rad(lng2-lng1);
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            const d = R * c; // Distance in km

            point = !!point ? point : 0;

            return Math.floor(d * Math.pow(10, point)) / Math.pow(10, point);
        },

        /**
         * 위도 경도 두거리상의 자동차 거리
         *
         * @memberOf $cmm.util
         */
        getCarDistanceFromLatLon: function (lat1, lng1, lat2, lng2, callback) {

            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    appKey: 'l7xx7eddba679e184d3287a0a2a7b191d865'
                },
                body: JSON.stringify({
                    directionOption: 1,
                    endX: lat2,
                    endY: lng2,
                    reqCoordType: 'WGS84GEO',
                    startX: lat1,
                    startY: lng1,
                    resCoordType: 'WGS84GEO',
                })
            };

            fetch('https://apis.openapi.sk.com/tmap/routes?version=1&callback=function', options)
                .then(response => response.json())
                .then(response => callback(response))
                .catch(err => console.error(err));
        },

        /**
         * 배달 금액 계산
         *
         * @memberOf $cmm.util
         */
        delyAmtCal: function (delyDtc) {

            // 기본 금액
            const delyAmt = 3800;
            delyDtc *= 1000;

            if(delyDtc > 3000) {
                // 3km 이상부턴 100m 당 50원
                return delyAmt + ((delyDtc - 3000) / 100 * 50);
            } else if(delyDtc === 0){

                return 0;
            } else {

                return delyAmt;
            }

        },

        /**
         * URL의 파라미터를 객체로 변환하여 반환
         *
         * @memberOf $cmm.util
         */
        getUrlParams: function (key) {

            let params= {}, tempValue;
            window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (str, key, value) {

                if(!params[key]) {

                    params[key] = value;
                } else {

                    if(typeof params[key] === 'string') {

                        tempValue = params[key];
                        params[key] = [tempValue];
                    }

                    params[key].push(value);
                }
            });

            return !!key ? params[key] : params;
        },

        /**
         * 서브 페이지로 이동
         *
         * @memberOf $cmm.util
         */
        goSubPage: function(url, param) {

			const div = url.indexOf('?') > -1 ? '&' : '?';

			$('.subPage').find('iframe').src(url + div + 'header=N&footer=N');

			setTimeout(() => {

				$('.subPage').addClass('on');
				var state = param;
				history.pushState(state, null, location.origin + '?page=' + url);
				setTimeout(() => {

    				$('body').addClass('closeHidden').css({'top': -documentScrollTop, 'height': window.innerHeight});
				}, 500);
			}, 100);

			if(!window.onpopstate) {

				// 뒤로,앞으로 가기
				window.onpopstate = function(e) {

					if(!!e.state) {

						$('.subPage').find('iframe').src(url + div + 'header=N&footer=N');
						$('.subPage').addClass('on');
					} else {

						$('.subPage').removeClass('on');
	    				$('body').removeClass('closeHidden').removeAttr('style');
					}
				}
			}
		},

        /**
         * 서브 페이지 닫기
         *
         * @memberOf $cmm.util
         */
        closeSubPage: function() {

			history.back();
			$('body').removeClass('closeHidden').removeAttr('style');
		},

		/**
		 * 한글 받침 여부
		 *
         * @memberOf $cmm.util
		 */
		isKorProp: function(value) {

			//value 의 마지막 음절의 유니코드(UTF-16)
		    const charCode = value.charCodeAt(name.length - 1);

		    //유니코드의 한글 범위 내에서 해당 코드의 받침 확인
		    const consonantCode = (charCode - 44032) % 28;

			return consonantCode !== 0;
		},

		/**
		 * 한글 받침 여부
		 *
         * @memberOf $cmm.util
		 */
		isKorProp: function() {

			//name의 마지막 음절의 유니코드(UTF-16)
		    const charCode = name.charCodeAt(name.length - 1);

		    //유니코드의 한글 범위 내에서 해당 코드의 받침 확인
		    const consonantCode = (charCode - 44032) % 28;

			return consonantCode !== 0;
		},


		/**
		 * validate 체크
		 *
         * @memberOf $cmm.util
		 */
		validate: function($elet) {

			let isValidate = true;
			if(!$elet) {
				$elet = $('body');
			}

            $($elet + "[data-validate]").each(function() {
            // $elet.find('[data-validate]').each(function() {

				if($(this).isEmpty()) {

					$cmm.alert($(this).data('validate') +
						($cmm.util.isKorProp($(this).data('validate')) ? '을' : '를') + ' 입력해 주세요.', () => {

						$(this).focus();
					});

					isValidate = false;
					return false;
				}
			});

			return isValidate;
		}
    },

    /**
     * Ajax 통신을 한다.
     *
     * @memberOf $cmm
     * @param {Object} options ajax 통신을 위한 객체.
     */
    ajax : function(options) {

        // iframe일 경우
        if($cmm.util.isIframe()) {

            window.parent.$cmm.ajax(options);
            return;
        }

        let _options = {

            method: "POST",
            isValidate: true,
            loading: true,
            dataType: "json",
            error : function(res) {

                $cmm.alert('네트워크 오류가 발생했습니다.');
            }
        };

        // 기본 객체에 파라미터 객체를 추가.
        for(var val in options) {
            if(!$cmm.util.isEmpty(options[val])) {
                _options[val] = options[val];
            }
        }
        _options.beforeSend = function(xhr) {

			xhr.setRequestHeader('X-IS-AJAX', 'Y');
        };
        _options.complete = function(xhr) {
            if(!!_options.loading) {
                $cmm.loadingHide();
            }
        };

        // data 초기화
        if(!_options.data) {

            _options.data = {};
        }

        if(!!options.queryId) {
            if(!!_options.data.append) {

                _options.data.append('queryId', options.queryId);
            } else {

                _options.data.queryId = options.queryId;
            }
        }

        // form serialize 유무
        if(!!_options.formData) {

            let formJson = _options.formData.serializeJSON();

            for(let key in formJson) {

                _options.data[key] = formJson[key];
            }
        }

        if(!!_options.isJsonParam) {

            _options.data = JSON.stringify(_options.data);
            _options.contentType = "application/json; charset=UTF-8";
        }

        _options.success = function(data) {

            let resultCode	= data.resultCode;
            let resultMsg	= data.resultMsg;

            if(!!data.length && data.length > 0) {

                resultCode	= data[0].resultCode;
                resultMsg	= data[0].resultMsg;
            }

            if(resultCode == '0000') {

                if (!!_options.sAlert) {

                    $cmm.alert(_options.sAlert);
                }
                options.success(data);
            } else if(resultCode == '8000') {

                location.reload();
            } else if(resultCode == '9980') {

                $cmm.alert('로그인 후 이용 가능합니다.', () => {

                    location.href = '/login.all';
                });
            } else if(resultCode == '9990') {

                $cmm.checkLogin(true);
            } else {

                if(!_options.errorCallback) {

                    if(!!resultMsg) {

                        $cmm.alert(resultMsg);
                    } else {

                        $cmm.alert('시스템 오류가 발생했습니다.');
                    }
                } else {

                    _options.errorCallback(data);
                }
            }
        };

		if(_options.isValidate && $cmm.util.validate()) {

        	$.ajax(_options);
		}
    },

    /**
     * 컴포넌트 - 테이블
     *
     * @memberOf $cmm
     */
    table: {

        /**
         * datatable init
         *
         * @memberOf $cmm.table
         * @param {Element} $elet 테이블 객체
         * @param {Object} options 테이블 생성 옵션
         */
        init: function ($elet, options) {

            const _options = {
                lengthChange: false,
                dom: '<"top"if>rt<"bottom"p>',
                aaSorting:[],
                ordering:true,
                language: {
                    info: '전체 _TOTAL_ 건',
                    infoEmpty: '',
                    search: '검색',
                    infoFiltered : '',
                    emptyTable: '조회된 데이터가 없습니다.',
                    zeroRecords : '검색된 데이터가 없습니다.',
                    paginate: {
                        previous: '<'
                        , next: '>'
                    },
                    select: {
                        rows: ''
                    },
                },
            };

            // 기본 객체에 파라미터 객체를 추가.
            for(var val in options) {
                if(!$cmm.util.isEmpty(options[val])) {
                    _options[val] = options[val];
                }
            }

            return $elet.DataTable(_options);
        }
    },

    /**
     * 컴포넌트 - 날짜
     *
     * @memberOf $cmm
     */
    date: {

        /**
         * 현재 날짜 를 YYYYMMDD 형태로 반환한다.
         *
         * @memberOf $cmm.date
         * @param {String} div  옵션  : 계산 후 반환될 년, 월, 일 사이 구분자(구분자가 필요없으면 "")
         * @param {String} optValue 시간, 분, 초까지 표시. 옵션 : M:분 , S:초
         *
         * @returns 현재 날짜 기간
         */
        getToday : function(div, optValue) {

            let dt = new Date();
            let returnVal = "";

            div = div == null ? "" : div;

            // 년도 설정.
            returnVal = "" + dt.getFullYear() + div;
            // 월 설정.
            returnVal += $cmm.util.lpad(String(dt.getMonth() + 1), 2, "0") + div;
            // 일 설정.
            returnVal += $cmm.util.lpad(String(dt.getDate()), 2, "0");

            if(!!optValue) {

                if(optValue.toUpperCase() === "M" || optValue.toUpperCase() === "S") {

                    // 시간 설정.
                    returnVal += " " + $cmm.util.lpad(String(dt.getHours()), 2, "0");
                    // 분 설정.
                    returnVal += ":" + $cmm.util.lpad(String(dt.getMinutes()), 2, "0");

                    if(optValue.toUpperCase() === "S") {

                        // 초 설정.
                        returnVal += ":" + $sStringUtil.lpad(String(dt.getSeconds()), 2, "0");
                    }
                }
            }

            return returnVal;
        },
    },
};

window.$cmm = $cmm;
window.__ = console.log;
$cmm.init();