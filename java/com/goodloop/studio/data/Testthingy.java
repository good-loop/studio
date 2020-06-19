package com.goodloop.studio.data;

import com.winterwell.data.AThing;

public class Testthingy extends AThing {

	public String mytext;

	@Override
	public String toString() {
		return "TestThingy [mytext=" + mytext + ", name=" + name + ", id=" + id + ", status=" + getStatus() + "]";
	}
	
	
}
