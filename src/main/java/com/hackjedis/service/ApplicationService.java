package com.hackjedis.service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;

public class ApplicationService {
	public String getDashboardUrl() {
		Properties props = new Properties();
		FileInputStream in;
		try {
			in = new FileInputStream(System.getProperty("user.dir")+"/../resources/main/config/kibana.properties");
			props.load(in);
			in.close();
			return props.getProperty("dashboardUrl");
		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return null;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}		
	}
}
