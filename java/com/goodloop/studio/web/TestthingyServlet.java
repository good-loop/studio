package com.goodloop.studio.web;

import com.goodloop.studio.data.Testthingy;
import com.winterwell.web.app.CrudServlet;

public class TestthingyServlet extends CrudServlet<Testthingy> {

	public TestthingyServlet() {
		super(Testthingy.class);
	}

}
