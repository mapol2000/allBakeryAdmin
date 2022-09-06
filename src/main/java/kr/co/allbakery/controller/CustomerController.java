package kr.co.allbakery.controller;

import kr.co.allbakery.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping("/cust0010M.all")
    @Transactional(readOnly = true, propagation= Propagation.SUPPORTS)
    public String listCustomers(@RequestParam Map<String, String> param, Model theModel) throws Exception {

        List<Map<String, String>> theCustomer = customerService.getCustomerList(param);
        theModel.addAttribute("allCustomers", theCustomer);

        // DB에 null이 있을시 이상하게 타임리프에서 체크 로직이 작동이 안되어 컨트롤러에서 변경
        for (Map<String, String> customer : theCustomer) {

            // 연락처
            if (customer.get("comptel") == null) {
                customer.put("comptel", "--");
            }

            // 입금자 컬럼이 없는 경우도 null로 나오기 때문에 널체크
            if (!customer.containsKey("sendName") || customer.get("sendName") == null) {
                customer.put("sendName", " ");
            }
        }

        return "views/customer/cust0010M";
    }

}
