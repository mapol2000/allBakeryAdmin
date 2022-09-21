package kr.co.allbakery.mapper;

import java.util.Map;

public interface CommonMapper {

    /**
     * 로그인 처리.
     * @param param
     * @return
     */
    public Map<String, String> getLogin(Map<String, String> param);

}
