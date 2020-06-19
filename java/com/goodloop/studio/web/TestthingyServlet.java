package com.goodloop.studio.web;

import com.goodloop.studio.data.Testthingy;
import com.winterwell.web.app.CrudServlet;
import com.winterwell.web.app.WebRequest;

public class TestthingyServlet extends CrudServlet<Testthingy> {

	@Override
	protected void doSecurityCheck(WebRequest state) {
		return; // no security
	}
	
	public TestthingyServlet() {
		super(Testthingy.class);
	}

}
