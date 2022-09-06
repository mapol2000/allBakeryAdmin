package kr.co.allbakery.service;

import kr.co.allbakery.mapper.CustomerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CustomerService {

    @Autowired
    private CustomerMapper customerMapper;

    public List<Map<String, String>> getCustomerList(Map<String, String> param) throws Exception {

        return customerMapper.getCustomerList(param);
    }

}
