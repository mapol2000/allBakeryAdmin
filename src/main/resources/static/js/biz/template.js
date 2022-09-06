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
			getNow: function() {

				const options = {

					url : '/selectOne.ax',
					queryId: 'getNow,getNow2',
					data : {
					},
					success : function(res) {
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

		},

		/**
		 * Init 최초 실행.
		 *
		 * @memberOf screen
		 */
		init: function() {

			// Event 정의 실행
			screen.event();
		}
	};

	$cmm.addScreen(screen);
});