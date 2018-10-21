package com.hackjedis.controller;

import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.util.Properties;

import org.apache.spark.launcher.SparkAppHandle;
import org.apache.spark.launcher.SparkLauncher;
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
	String search(@RequestBody String payload) throws IOException, ClassNotFoundException {
		try {
			JSONObject obj = new JSONObject(payload);
			String searchQuery = obj.getString("searchQuery");
			
			FileInputStream in;
			Properties props = new Properties();
			String sparkHome ;
	        String appResource;
	        String mainClass = "streaming.TwitterProducer";

				in = new FileInputStream(System.getProperty("user.dir")+"/../resources/main/config/spark.properties");
				props.load(in);
				in.close();
				sparkHome = props.getProperty("sparkHome");
				appResource = props.getProperty("appResource"); 
				System.out.println(appResource);
				System.out.println(sparkHome);
		
			
		        String[] appArgs = new String[]{
		        		"sentiment", 
		        		"negative",
		        		"neutral",
		        		"positive",
		        		searchQuery
		        };
		        
		        SparkLauncher spark = new SparkLauncher()
		                .setVerbose(true)
		                .setSparkHome(sparkHome)
		                .setAppResource(appResource)    // "/my/app.jar"
		                .setMainClass(mainClass)        // "my.spark.app.Main"
		                .setMaster("local")
		                .setDeployMode("client")
		                .setConf(SparkLauncher.DRIVER_MEMORY, "4g")
		                .addAppArgs(appArgs);
		        //
		        // Launches a sub-process that will start the configured Spark application.
		        SparkAppHandle proc = spark.startApplication();
			
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return "Success";
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
