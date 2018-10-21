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
		return "http://localhost:5601/app/kibana#/dashboard/AWaTpJ1byuUaWgAAZyzJ?embed=true&_g=(refreshInterval:('$$hashKey':'object:303',display:'5+seconds',pause:!f,section:1,value:5000),time:(from:now-15m,mode:quick,to:now))&_a=(description:'',filters:!(),options:(darkTheme:!f),panels:!((col:1,id:AWYl-8PyIxk6pAbfNNyW,panelIndex:1,row:1,size_x:6,size_y:3,type:visualization),(col:7,id:AWaTo4QEyuUaWgAAZyy9,panelIndex:2,row:1,size_x:6,size_y:3,type:visualization)),query:(match_all:()),timeRestore:!f,title:'Sentiments+Dashboard',uiState:(),viewMode:view)";
	}

	public static void main(String[] args) {
		SpringApplication.run(ApplicationController.class, args);
	}
}
