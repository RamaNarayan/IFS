package com.hackjedis.controller;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.hackjedis.service.ApplicationService;

@SpringBootApplication
@RestController
public class ApplicationController {

	@RequestMapping(value = "/search", method = RequestMethod.POST)
	String search(@RequestBody String payload) {
		try {
			JSONObject obj = new JSONObject(payload);
			System.out.println("payload "+obj.getString("searchQuery"));
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return "Hello World !";
	}

	@RequestMapping(value = "/config", method = RequestMethod.GET)
	String config() {
		ApplicationService service = new ApplicationService();
		String dashboardUrl = service.getDashboardUrl();
		return dashboardUrl;
	}

	public static void main(String[] args) {
		SpringApplication.run(ApplicationController.class, args);
	}
}
