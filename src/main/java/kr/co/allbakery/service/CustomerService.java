package kr.co.allbakery.service;

import kr.co.allbakery.mapper.CustomerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class CustomerService {

    @Autowired
    private CustomerMapper customerMapper;

    /**
     * 거래처 조회.
     *
     * @param param
     * @return
     * @throws Exception
     */
    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public List<Map<String, String>> getCustomerList(Map<String, String> param) throws Exception {

        List<Map<String, String>> customers = customerMapper.getCustomerList(param);

        // DB에 value에 null이 있을시 타임리프에서 처리를 못해서(왜 못하는지 이해불가) 여기서 처리
        for (Map<String, String> customer : customers) {

            // 연락처
            if (customer.get("comptel") == null || !customer.containsKey("comptel")) {
                customer.put("comptel", "--");
            }

            if (customer.get("confirmhp") == null || !customer.containsKey("confirmhp")) {
                customer.put("confirmhp", "--");
            }

            // 입금자
            if (!customer.containsKey("sendName") || !customer.containsValue(null)) {
                customer.putIfAbsent("sendName", " ");
            }

            // 영업구분
            if (!customer.containsKey("saleCommNm") || !customer.containsValue(null)) {
                customer.putIfAbsent("saleCommNm", " ");
            }

            // 영업유형
            if (!customer.containsKey("closedDay") || !customer.containsValue(null)) {
                customer.putIfAbsent("closedDay", " ");
            }

            // 계약일
            // 현재 날짜 구하기 (시스템 시계, 시스템 타임존)
            LocalDate now = LocalDate.now();
            if (!customer.containsKey("joinDate") || !customer.containsValue(null)) {
                customer.putIfAbsent("joinDate", "" + now);
            }

        }

        return customerMapper.getCustomerList(param);
    }

    @Transactional(readOnly = true, propagation = Propagation.SUPPORTS)
    public int getBiacDplc(Map<String, String> param) throws Exception {

        return customerMapper.getBiacDplc(param);
    }

}
