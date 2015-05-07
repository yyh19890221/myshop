package com.zjut.myshop.unit.service.order;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

import com.zjut.myshop.entity.order.Order;
import com.zjut.myshop.entity.order.OrderItem;
import com.zjut.myshop.service.order.OrderService;
import com.zjut.myshop.unit.service.BaseTest;


public class OrderServiceTest extends BaseTest{
	
	@Autowired
	private OrderService orderService;
	
	@Test
	@Rollback(false)
	public void testSaveOrder() {
		Order o = new Order();
		o.setUserName("admin");
		
		OrderItem i = new OrderItem();
		i.setProductId(1l);
		i.setOrder(o);
		
		o.getItemList().add(i);
		orderService.saveOrder(o);
		
	}

}
