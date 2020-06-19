/**
 * 
 */
package com.goodloop.studio.web;

import java.util.Map;

import com.goodloop.studio.data.Testthingy;
import com.winterwell.data.KStatus;
import com.winterwell.datalog.DataLog;
import com.winterwell.es.ESType;
import com.winterwell.utils.containers.ArrayMap;
import com.winterwell.web.app.AMain;
import com.winterwell.web.app.AppUtils;
import com.winterwell.web.app.BasicSiteConfig;
import com.winterwell.web.app.JettyLauncher;
import com.winterwell.web.app.MasterServlet;

/**
 * @author daniel
 *
 */
public class StudioMain extends AMain<BasicSiteConfig> {

	public static void main(String[] args) {
		StudioMain amain = new StudioMain();
		amain.doMain(args);
	}
	
	@Override
	protected void init2(BasicSiteConfig config) {
		config.port = 8552;
		super.init2(config);
		// datalog
		DataLog.init();
		// for tasks
		init3_gson();
		
		init3_ES();
		Class[] dbclasses = new Class[] {
				Testthingy.class,
		};
		AppUtils.initESIndices(KStatus.main(), dbclasses);
		// Don't index Task url as its a bogus thing to search on
		Map<Class, Map> mappingFromClass = new ArrayMap(
		);
		AppUtils.initESMappings(KStatus.main(), 
				dbclasses, mappingFromClass);
	}
	
	public StudioMain() {
		super("studio", BasicSiteConfig.class);
	}
	
	@Override
	protected void addJettyServlets(JettyLauncher jl) {
		super.addJettyServlets(jl);
		MasterServlet ms = jl.addMasterServlet();
		ms.addServlet("testthingy", TestthingyServlet.class);
	}
}
