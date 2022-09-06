package kr.co.allbakery.config;

import org.jasypt.encryption.StringEncryptor;
import org.jasypt.encryption.pbe.PooledPBEStringEncryptor;
import org.jasypt.encryption.pbe.config.SimpleStringPBEConfig;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @packageName	kr.co.allbakery.config
 * @fileName	JasyptConfig.java
 * @date		2022.08.29
 * @description
 *
 * ================================================
 * DATE			NOTE
 * ------------------------------------------------
 * 2022.08.29	최초 생성
 */
@Configuration
public class JasyptConfig {

	/**
	 * application.properties 파일에 사용되는 암호화 키
	 */
	public static final String jasyptPassword = "s^nH!@xBxPaN_$allbakery";

    /**
     * 암호화 설정
     *
     * @return
     */
    @Bean("jasyptStringEncryptor")
    public StringEncryptor stringEncryptor() {
        PooledPBEStringEncryptor encryptor = new PooledPBEStringEncryptor();
        SimpleStringPBEConfig config = new SimpleStringPBEConfig();

        // 암호화에 사용할 키
        config.setPassword(JasyptConfig.jasyptPassword);
        // 사용할 알고리즘
        config.setAlgorithm("PBEWithMD5AndDES");
        config.setKeyObtentionIterations("1000");
        config.setPoolSize("1");
        config.setProviderName("SunJCE");
        config.setSaltGeneratorClassName("org.jasypt.salt.RandomSaltGenerator");
        config.setStringOutputType("base64");
        encryptor.setConfig(config);

        return encryptor;
    }
}
