package kr.co.allbakery.common.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.co.allbakery.common.session.SessionData;

@Controller
public class PathController {

	@Autowired
	private HttpSession session;

	@Autowired
	private SessionData sessionData;

	/**
	 * 메인
	 *
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/")
	public String index(Model model, HttpServletRequest request) throws Exception {

		model.addAttribute("header", "main");

		String url = "/views/cmm/index";

		model.addAttribute("screenUri", url.substring(7));

		return page(url, request, model);
	}

	/**
	 * 로그인
	 *
	 * @param model
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/login.all")
	public String login(Model model, HttpServletRequest request) throws Exception {

		String url = "";
		url = "/views/cmm/login";

		return page(url, request, model);
	}

	/**
	 * 페이지
	 *
	 * @param model
	 * @param request
	 * @param folder
	 * @param screen
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/{folder}/{screen}.all")
	public String screen(Model model, HttpServletRequest request, @PathVariable("folder") String folder, @PathVariable("screen") String screen) throws Exception {

		String screenUrl = folder + "/" + screen;
		String url = "";

		model.addAttribute("header", "sub");
		model.addAttribute("screen", screen);
		model.addAttribute("screenUri", screenUrl);
		url= "/views/" + screenUrl;

		return page(url, request, model);
	}

	/**
	 * 이동할 페이지 설정
	 * @param page
	 * @param request
	 * @param model
	 * @return
	 */
	private String page(String page, HttpServletRequest request, Model model) {

		return page;
	}
}