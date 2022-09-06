package kr.co.allbakery.mapper;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

public interface CustomerMapper {
    List<Map<String, String>> getCustomerList(Map<String, String> param);
}
