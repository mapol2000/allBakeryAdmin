package kr.co.allbakery.service;

import kr.co.allbakery.common.session.SessionData;
import kr.co.allbakery.mapper.CommonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Service
public class CommonService {

    @Autowired
    private CommonMapper commonMapper;

    @Autowired
    private SessionData sessionData;

    /**
     * 세션 생성.
     *
     * @param request
     * @param loginVO
     */
    private void createSession(HttpServletRequest request, Map<String, String> loginVO) {

        // 세션 Data 값 설정.
        sessionData.set(SessionData.Name.USER_ID,		loginVO.get("userId"));
        sessionData.set(SessionData.Name.USER_LEVEL,		loginVO.get("memberLevel"));
        sessionData.set(SessionData.Name.USER_ROLE,		loginVO.get("memberRole"));
        sessionData.set(SessionData.Name.USER_NM,		loginVO.get("memberName"));
//        sessionData.set(SessionData.CUSTOM_NAME.getCode(),		loginVO.getCustomName());
        sessionData.set(SessionData.Name.TAX_YN,			loginVO.get("taxYn"));
        /*sessionData.set(SessionData.EMAIL.getCode(),			loginVO.getEmail());
        sessionData.set(SessionData.ORDER_YESORNO.getCode(),	loginVO.getOrderYesorno());
        sessionData.set(SessionData.GAMANG_NUM.getCode(),		loginVO.getGamangNum());*/
    }

    /**
     * 로그인 처리.
     *
     * @return 단일 String
     * @throws Exception
     */
    @Transactional(readOnly = true, propagation= Propagation.SUPPORTS)
    public Map<String, String> getLogin(HttpServletRequest request, Map<String, String> param) throws Exception {

        Map<String, String> loginVO = commonMapper.getLogin(param);

        // loginVO.getIS_LOGIN() = 0(정상)
        switch (loginVO.get("isLogin")) {
            case "0":

                // 세션 생성.
                createSession(request, loginVO);
                break;
            case "1":

                System.out.println("Login ID가 등록되지 않았습니다.");
                /*loginVO.setResultCode("9999");
                loginVO.setResultMsg("Login ID가 등록되지 않았습니다.");*/
                break;
            case "2":

                System.out.println("비밀번호가 일치하지 않습니다.");
                /*loginVO.setResultCode("9999");
                loginVO.setResultMsg("비밀번호가 일치하지 않습니다.");*/
                break;
            default:

                break;
        }

        return loginVO;
    }
}
