package kr.co.allbakery.common.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import kr.co.allbakery.common.interceptor.SessionInterceptor;

/**
 * @packageName	kr.co.allbakery.common.config
 * @fileName	WebMvcConfig.java
 * @date		2022.08.29
 * @description
 *
 * ================================================
 * DATE			NOTE
 * ------------------------------------------------
 * 2022.08.29	최초 생성
 */
@Configuration
@MapperScan("kr.co.allbakery.mapper")
public class WebMvcConfig implements WebMvcConfigurer {

	@Autowired
	SessionInterceptor sessionInterceptor;
	@Value("${spring.config.activate.on-profile}")
	private String activeProfile;
	@Value("${file.upload.location}")
	private String uploadLocation;
	@Value("${file.upload.path-pattern}")
	private String uploadPathPattern;
	@Value("${spring.datasource.username}")
	private String port;


	@Override
	public void addInterceptors (InterceptorRegistry registry) {

		registry.addInterceptor(sessionInterceptor).addPathPatterns(new String[] {"/**.all", "/**.ax"})
				.excludePathPatterns(new String[]{"/login.ax", "/join.ax", "/adminLogin.ax", "/"});
	}

	// Spring boot에서 외부경로 매핑
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {

		// 로컬일 경우
		if("local".equals(activeProfile)) {
			registry.addResourceHandler(uploadPathPattern)
					.addResourceLocations("file:///" + uploadLocation)
					.setCachePeriod(0);
		} else {

			registry.addResourceHandler("/upload/**").addResourceLocations("/upload/");
		}
	}
}
