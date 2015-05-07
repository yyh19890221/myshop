package com.zjut.myshop.dao.product;

import org.springframework.stereotype.Component;
import org.springside.modules.orm.hibernate.HibernateDao;

import com.zjut.myshop.entity.product.Product;

@Component
public class ProductDao extends HibernateDao<Product, Long> {

}
