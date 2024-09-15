package com.sizibotix.sizibox;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@OpenAPIDefinition(
		info = @Info(
				title = "Sizibox API",
				version = "1",
				description = "Sizibox API",
				contact = @io.swagger.v3.oas.annotations.info.Contact(
						name = "Johnson Andrew Siziba",
						email = "jsiziba.zw@gmail.com"
				)
		)
)
public class SiziboxApplication {

	public static void main(String[] args) {
		SpringApplication.run(SiziboxApplication.class, args);
	}

}
