package com.zjut.myshop.web.product;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.orm.Page;
import org.springside.modules.orm.PropertyFilter;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import com.zjut.myshop.entity.product.Product;
import com.zjut.myshop.service.product.ProductService;
import com.zjut.myshop.web.CrudActionSupport;

import freemarker.template.utility.StringUtil;

@Namespace("/product")
public class ProductAction extends CrudActionSupport<Product> {
	
	@Autowired
	private ProductService productService;
	
	//页面属性
	private Long id;
	private Product entity;
	private Page<Product> page = new Page<Product>(12);//每页5条记录
	
	@Override
	public Product getModel() {
		return entity;
	}

	@Override
	public String list() throws Exception {
		
		List<PropertyFilter> filters = PropertyFilter.buildFromHttpRequest(Struts2Utils.getRequest());
		
		//设置默认排序方式
		if (!page.isOrderBySetted()) {
			page.setOrderBy("id");
			page.setOrder(Page.ASC);
		}
		page = productService.searchProduct(page, filters);
		
		HttpSession session = Struts2Utils.getRequest().getSession();
		if(session.getAttribute("hotList")==null){
			List<Product> hotList = new ArrayList();
			hotList.addAll(page.getResult().subList(0, 5));
			session.setAttribute("hotList", hotList);
		}
		
		return SUCCESS;
	}
	
	@Override
	public String input() throws Exception {
		return "detail";
	}

	@Override
	public String save() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String delete() throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	protected void prepareModel() throws Exception {
		if (id != null) {
			entity = productService.getProductById(id);
		} else {
			entity = new Product();
		}		
	}

	public ProductService getProductService() {
		return productService;
	}

	public void setProductService(ProductService productService) {
		this.productService = productService;
	}

	public Page<Product> getPage() {
		return page;
	}

	public void setPage(Page<Product> page) {
		this.page = page;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Product getEntity() {
		return entity;
	}

	public void setEntity(Product entity) {
		this.entity = entity;
	}

	@Override
	protected void prepareModel(Boolean isEdit) throws Exception {
		
	}

}
