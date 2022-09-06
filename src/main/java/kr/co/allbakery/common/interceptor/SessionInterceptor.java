package kr.co.allbakery.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import kr.co.allbakery.common.session.SessionData;

/**
 * @packageName	kr.co.allbakery.common.interceptor
 * @fileName	SessionInterceptor.java
 * @date		2022.08.29
 * @description
 *
 * ================================================
 * DATE			NOTE
 * ------------------------------------------------
 * 2022.08.29	최초 생성
 */
@Component
public class SessionInterceptor implements HandlerInterceptor {

    @Autowired
    private HttpSession session;
	@Autowired
	private SessionData sessionData;

    /**
     *
     * @param request current HTTP request
     * @param response current HTTP response
     * @param handler chosen handler to execute, for type and/or instance evaluation
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

    	System.out.println("skebinse : " + sessionData.isSession());

    	// TODO : 임시 로그인
        if(!sessionData.isSession()) {

        	sessionData.init();

        	sessionData.set(SessionData.Name.USER_ID, "userId");
        	sessionData.set(SessionData.Name.USER_NM, "유저");
        	session.setAttribute("userId", "userId");
        }

    	if(!sessionData.isSession()) {

        	if("Y".equals(request.getHeader("X-IS-AJAX"))) {

                response.getWriter().write("{\"resultCode\":\"9980\"}");
        	}

        	return false;
        }

        return true;
    }
}
