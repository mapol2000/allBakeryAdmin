package kr.co.allbakery.common.session;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;
import org.thymeleaf.util.StringUtils;

/**
 * @packageName	kr.co.allbakery.common.session
 * @fileName	SessionData.java
 * @date		2022.08.29
 * @description
 *
 * ================================================
 * DATE			NOTE
 * ------------------------------------------------
 * 2022.08.29	최초 생성
 */
@SessionScope
@Component
public class SessionData implements Serializable {

	private static final long serialVersionUID = -1520349919362099199L;
	private Map<Name, Object> sessionMap = null;

	public static enum Name {

		USER_ID,
		USER_NM,
		USER_ROLE,
		USER_LEVEL,
		TAX_YN,
		MENU_LIST,
	}

	/**
	 * 세션 Data 초기화.
	 */
	public void init() {

		sessionMap = new HashMap<Name, Object>();
	}

	/**
	 * 세션 Data 삭제.
	 */
	public void remove() {

		sessionMap = null;
	}

	/**
	 * 세션 Data 값 설정
	 *
	 * @param sessionEnum 필드명
	 * @param value 값
	 * @return
	 */
	public void set(Name sessionEnum, String value) {

		sessionMap.put(sessionEnum, value);
	}


	/**
	 * 세션 Data 값 반환
	 *
	 * @param sessionEnum Enum 필드명
	 * @return
	 */
	public String getString(Name sessionEnum) {

		// 세션 설정 전일 경우.
		if(sessionMap == null || !sessionMap.containsKey(sessionEnum)) {

			return "";
		}

		return sessionMap.get(sessionEnum).toString();
	}


	/**
	 * 세션 유지 여부
	 * @return
	 */
	public boolean isSession() {

		return !(sessionMap == null || StringUtils.isEmpty(getString(Name.USER_ID)));
	}
}
