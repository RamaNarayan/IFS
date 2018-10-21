package com.hackjedis.controller;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class DemoApplication {

	@RequestMapping(value = "/searchQuery", method = RequestMethod.POST,consumes = "application/json")
	String hello(@RequestBody JSONObject payload) {
		try {
			System.out.println("payload "+payload.getString("searchQuery"));
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "Hello World !";
	}

	@RequestMapping("/testme")
	String helloAgain() {
		return "You can't see me";
	}

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}
