
(function ($) {

	$.fn.extend({
		/**
		 * 객체 존재 여부를 리턴한다.
		 * 객체가 있을 경우 true 반환
		 *
		 */
		isBe : function(){

			return $(this).length > 0;
		},
		/**
		 * 객체 존재 여부를 리턴한다.
		 * 객체가 없을 경우 true 반환
		 *
		 */
		isNone : function(){

			return $(this).length === 0;
		},
		/**
		 * Enter Key 이벤트를 처리한다.
		 * Enter Key 이벤트 발생시 processFunc 을 실행한다.
		 */
		enter : function(processFunc){
			$(this).on("keydown", function(event){
				if (event.keyCode == 13) {
					$(this).blur();
					if(!!processFunc){
						processFunc();
					}

					return false;
				}
			});
		},
		/**
		 * Input Tag 에 대해서 값이 입력 되어 있는지 여부를 반환한다.
		 * 공백도 값이 없는것으로 간주한다.
		 * @return {Boolean} false/true
		 */
		isEmpty : function(){
			var result = false;

			if($(this).length == 0){
				return true;
			}

			this.each(function(){
				var tagName = this.tagName.toUpperCase();
				if(tagName == "INPUT" || tagName == "SELECT"){

					if($cmm.util.isEmpty($(this).val())) {

						result = true;
						return false;
					}
				}
			});// each

			return result;
		},

		/**
		 * Input type checkbox, radio 에 대해 checked 를 설정한다.
		 * @param {Boolean} flag 체크여부
		 */
		checked : function(flag){

			this.each(function(){
				var tagName = this.tagName.toUpperCase();
				var type = $(this).prop("type").toUpperCase();
				if(tagName == "INPUT" && (type == "CHECKBOX" || type == "RADIO")){
					if(!!flag){
						if(type === "RADIO") {

							var rdoNm = $(this).attr("name");

							$(this).parents(".chkArea").find(".chkTypeRadio").each(function() {

								if(rdoNm === $(this).find("input[type=radio]").attr("name")) {
									$(this).removeClass("on");
									$(this).find("input[type=radio]").checked(false);
								}
							});
						}

						$(this).prop("checked", true);
						$(this).parent().addClass("on");
					}else{
						$(this).prop("checked", false);
						$(this).parent().removeClass("on");
					}
				}
			});// each

		},

		/**
		 * Input type checkbox, radio, calendar 에 대해 diabled 를 설정한다.
		 * @param {Boolean} flag 체크여부
		 */
		disabled : function(flag) {

			this.each(function() {

				var tagName = this.tagName.toUpperCase();
				var type = $(this).prop("type").toUpperCase();

				// calendar
				if(tagName == "INPUT" && $(this).attr("data-component") === "calendar") {

					if(typeof flag === "undefined" || !!flag) {

						$(this).prop("disabled", true);
						$(this).next().prop("disabled", true);
						$(this).next().addClass("fDefault");
					} else {

						$(this).prop("disabled", false);
						$(this).next().prop("disabled", false);
						$(this).next().removeClass("fDefault");
					}
				// checkbox, radio
				} else if(tagName == "INPUT" && (type == "CHECKBOX" || type == "RADIO")) {

					if(typeof flag === "undefined" || !!flag) {
						$(this).parent().addClass("dis");
						$(this).prop("disabled", true);
						$(this).addClass("fDefault");
						$(this).parent().addClass("fDefault");
					} else {
						$(this).prop("disabled", false);
						$(this).parent().removeClass("dis");
						$(this).removeClass("fDefault");
						$(this).parent().removeClass("fDefault");
					}
				}else{
					if(typeof flag === "undefined" || !!flag) {
						$(this).prop("disabled", true);
						$(this).addClass("fDefault");
					} else {
						$(this).prop("disabled", false);
						$(this).removeClass("fDefault");
					}
				}
			});
		},

		/**
		 * FORM 객체 내부 INPUT 객체들의 값을 JSON으로 변환하여 반환한다.
		 */
		serializeJSON : function() {


			if(this[0].tagName.toUpperCase() === "FORM") {

				var o = {};
		        var a = this.serializeArray();

		        $.each(a, function () {

		        	if (o[this.name]) {

		                if (!o[this.name].push) {

		                    o[this.name] = [o[this.name]];
		                }

		                o[this.name].push(this.value || '');
		            } else {

		                o[this.name] = this.value || '';
		            }
		        });

		        return o;
			}
		},

		/**
		 * attribute src tag.
		 */
		src : function(val) {

			$(this).attr('src', val);
		},

		/**
		 * FORM 객체 내부 INPUT 객체들의 값을 초기화한다.
		 */
		reset : function() {

			if(this[0].tagName.toUpperCase() === "FORM") {

				this[0].reset();
			}
		},
	});

})(jQuery);

Array.prototype.move = function(from, to) {

	if(!!$.isArray(this)) {

		this.splice(to, 0, this.splice(from, 1)[0]);
	}
};