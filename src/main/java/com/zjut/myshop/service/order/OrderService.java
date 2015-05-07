package com.zjut.myshop.service.order;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.PropertyFilter.MatchType;

import com.zjut.myshop.dao.order.OrderDao;
import com.zjut.myshop.entity.order.Order;


//Spring Bean的标识.
@Component("orderService")
//默认将类中的所有函数纳入事务管理.
@Transactional
public class OrderService {
	
private static Logger logger = LoggerFactory.getLogger(OrderService.class);
	
	@Autowired
	private OrderDao orderDao;
	
	/**
	 * 保存订单
	 */
	public void saveOrder(Order entity) {
		orderDao.save(entity);
	}

	public OrderDao getOrderDao() {
		return orderDao;
	}

	public void setOrderDao(OrderDao orderDao) {
		this.orderDao = orderDao;
	}
    
	/**
	 * 根据用户name查找订单
	 * @param currentUserName
	 * @return
	 */
	public List<Order> findOrderByUserName(String userName) {
		List<Order> list = orderDao.findBy("userName", userName, MatchType.EQ);
		List<Order> newList = new ArrayList<Order>();
		for(Order o :list){
			if(!newList.contains(o)) 
				newList.add(o);
		}
		return newList;
	}
    /**
     * 删除订单
     * @param orderId
     */
	public void deleteOrderById(Long orderId) {
		orderDao.delete(orderId);
	}
	
	/**
     * 删除订单
     * @param orderId
     */
	public void deleteOrder(Order order) {
		orderDao.delete(order);
	}

	public Order findOrderById(Long orderId) {
		return orderDao.get(orderId);
	}
	
}
