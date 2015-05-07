package com.zjut.myshop.service.product;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springside.modules.orm.Page;
import org.springside.modules.orm.PropertyFilter;

import com.zjut.myshop.dao.product.ProductDao;
import com.zjut.myshop.entity.product.Product;

//Spring Bean的标识.
@Component("productService")
//默认将类中的所有函数纳入事务管理.
@Transactional
public class ProductService {
	
	private static Logger logger = LoggerFactory.getLogger(ProductService.class);
	
	@Autowired
	private ProductDao productDao;
	
	/**
	 * 保存产品
	 */
	public void saveProduct(Product entity) {
		productDao.save(entity);
	}
	
	/**
	 * 删除产品
	 */
	public void deleteProduct(Long id) {
		productDao.delete(id);
	}
    
	/**
	 * 使用属性过滤条件查询产品.
	 */
	@Transactional(readOnly = true)
	public Page<Product> searchUser(final Page<Product> page, final List<PropertyFilter> filters) {
		return productDao.findPage(page, filters);
	}
	
	public Product getProductById(Long id){
		return productDao.get(id);
	}
	
	public ProductDao getProductDao() {
		return productDao;
	}

	public void setProductDao(ProductDao productDao) {
		this.productDao = productDao;
	}
	
	/**
	 * 使用属性过滤条件查询产品.
	 */
	@Transactional(readOnly = true)
	public Page<Product> searchProduct(final Page<Product> page,final List<PropertyFilter> filters) {
		return productDao.findPage(page, filters);
	}

}
