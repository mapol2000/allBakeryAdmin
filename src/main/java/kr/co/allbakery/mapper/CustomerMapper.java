package kr.co.allbakery.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

public interface CustomerMapper {

    /**
     * 거래처리스트 조회.
     * @param param
     * @return
     */
    List<Map<String, String>> getCustomerList(Map<String, String> param);

    /**
     * 거래처명 중복 조회.
     * @param param
     * @return
     */
    public Integer getBiacDplc(Map<String, String> param);
}
