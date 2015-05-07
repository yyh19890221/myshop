package com.zjut.myshop.dao.order;

import org.springframework.stereotype.Component;
import org.springside.modules.orm.hibernate.HibernateDao;

import com.zjut.myshop.entity.order.Order;

@Component
public class OrderDao extends HibernateDao<Order, Long> {

}
