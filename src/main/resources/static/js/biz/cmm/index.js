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
			getDate: function() {

				const options = {

					url : '/selectOne.ax',
					queryId: 'getDate',
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

			screen.c.getDate();

			console.log("index.js 파일 불려짐");

		}
	};

	$cmm.addScreen(screen);
});