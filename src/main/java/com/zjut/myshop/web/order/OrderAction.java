package com.zjut.myshop.web.order;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.security.springsecurity.SpringSecurityUtils;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import com.zjut.myshop.entity.order.Order;
import com.zjut.myshop.entity.order.OrderItem;
import com.zjut.myshop.entity.product.Cart;
import com.zjut.myshop.entity.product.Product;
import com.zjut.myshop.service.account.AccountManager;
import com.zjut.myshop.service.order.OrderService;
import com.zjut.myshop.web.CrudActionSupport;

@Namespace("/order")
@Results( { @Result(name = CrudActionSupport.RELOAD, location = "/login.action", type = "redirect") })
public class OrderAction extends CrudActionSupport<Product> {
	
	
	@Autowired
	private OrderService orderService;
	@Autowired
	private AccountManager accountManager;
	
	//页面属性
	private Float cartMemberCast; //会员价
	private Long orderId;
	
	private List<Order> orderList;
	
	public String addOrder(){
		if(SpringSecurityUtils.getCurrentUser()==null){
			return RELOAD;
		}
		HttpSession session = Struts2Utils.getRequest().getSession();
		HashMap<Long,Cart> cartMap = (HashMap)session.getAttribute("cartMap");
		
		Order order = new Order();
		order.setAmount(cartMemberCast);
		order.setUserName(SpringSecurityUtils.getCurrentUserName());
		order.setCreateDate(new Date());
		
		for (Cart c : cartMap.values()) {
			OrderItem item = new OrderItem();
			item.setOrder(order);
			item.setProductId(c.getProductId());
			item.setProductName(c.getProductName());
			item.setProductPrice(c.getProductPrice());
			item.setProductNum(c.getProductNum());
			order.getItemList().add(item);
		}
		orderService.saveOrder(order);
		cartMap.clear();
		accountManager.addScore(cartMemberCast);
		Struts2Utils.renderText("购买成功");
		return null;
	}
	
	public String myOrder(){
		if(SpringSecurityUtils.getCurrentUser()==null){
			return RELOAD;
		}
		orderList = orderService.findOrderByUserName(SpringSecurityUtils.getCurrentUserName());
		return "myorder";
	}

	@Override
	public Product getModel() {
		return null;
	}

	@Override
	public String list() throws Exception {
		return null;
	}

	@Override
	public String input() throws Exception {
		return null;
	}

	@Override
	public String save() throws Exception {
		return null;
	}

	@Override
	public String delete() throws Exception {
		
		if(orderId!=null){
             orderService.deleteOrderById(orderId);
		}
		Struts2Utils.renderText("删除订单成功！");
		return null;
	}

	@Override
	protected void prepareModel() throws Exception {
		
	}
   
	public OrderService getOrderService() {
		return orderService;
	}

	public void setOrderService(OrderService orderService) {
		this.orderService = orderService;
	}


	public Float getCartMemberCast() {
		return cartMemberCast;
	}

	public void setCartMemberCast(Float cartMemberCast) {
		this.cartMemberCast = cartMemberCast;
	}

	public List<Order> getOrderList() {
		return orderList;
	}

	public void setOrderList(List<Order> orderList) {
		this.orderList = orderList;
	}

	public AccountManager getAccountManager() {
		return accountManager;
	}

	public void setAccountManager(AccountManager accountManager) {
		this.accountManager = accountManager;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
	}

	@Override
	protected void prepareModel(Boolean isEdit) throws Exception {
		// TODO Auto-generated method stub
		
	}
}
