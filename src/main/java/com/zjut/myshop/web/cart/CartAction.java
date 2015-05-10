package com.zjut.myshop.web.cart;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringUtils;
import org.apache.struts2.convention.annotation.Namespace;
import org.springframework.beans.factory.annotation.Autowired;
import org.springside.modules.security.springsecurity.SpringSecurityUtils;
import org.springside.modules.utils.web.struts2.Struts2Utils;

import com.zjut.myshop.entity.account.User;
import com.zjut.myshop.entity.product.Cart;
import com.zjut.myshop.entity.product.Product;
import com.zjut.myshop.service.account.AccountManager;
import com.zjut.myshop.service.product.ProductService;
import com.zjut.myshop.web.CrudActionSupport;

@Namespace("/cart")
public class CartAction extends CrudActionSupport<Cart> {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Autowired
	private ProductService productService;
	@Autowired
	private AccountManager accountManager;
	
	//页面属性
	private Float cartTotalCast;  //总价 
	private Float cartOffCast;    //会员优惠
	private Float cartMemberCast; //会员价
	
	private String userName;
	private String address;
	private String tel;
	
	
	public String mycart(){
		
		User user = accountManager.findUserByLoginName(SpringSecurityUtils.getCurrentUser().getUsername());
		userName = user.getName();
		address = user.getAddress();
		tel = user.getTel();
		
		return "mycart";
	}
	
	
	/**
	 * 加入购物车
	 * @return
	 * @throws IOException 
	 */
	public void addCart() throws IOException{
		Long proId = Long.valueOf(Struts2Utils.getRequest().getParameter("id"));
		Integer proNum = Integer.valueOf(Struts2Utils.getRequest().getParameter("proNum"));
		Product p = productService.getProductById(proId);
		Cart cart = new Cart(p.getId(),p.getName(),proNum,p.getPicture(),p.getPrice());
		
		HttpSession session = Struts2Utils.getRequest().getSession();
		HashMap<Long,Cart> cartMap = (HashMap)session.getAttribute("cartMap");
		
 		if(cartMap == null){
 			cartMap = new HashMap<Long,Cart>();
		}else if(cartMap.containsKey(proId)){
			cart.setProductNum(cart.getProductNum()+cartMap.get(proId).getProductNum());
			cart.setProductTotal(cart.getProductTotal()+cartMap.get(proId).getProductTotal());
		}	
 		cartMap.put(proId, cart);
		session.setAttribute("cartMap", cartMap);
		
		
		HttpServletResponse response=Struts2Utils.getResponse();
	    /*
	     * 在调用getWriter之前未设置编码(既调用setContentType或者setCharacterEncoding方法设置编码),
	     * HttpServletResponse则会返回一个用默认的编码(既ISO-8859-1)编码的PrintWriter实例。这样就会
	     * 造成中文乱码。而且设置编码时必须在调用getWriter之前设置,不然是无效的。
	     * */
	    response.setContentType("text/html;charset=utf-8");
	    //response.setCharacterEncoding("UTF-8");
	    PrintWriter out = response.getWriter();
	    //JSON在传递过程中是普通字符串形式传递的，这里简单拼接一个做测试
	    out.println(cartMap.size());
	    out.flush();
	    out.close();
	}

	@Override
	public Cart getModel() {
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

	/**
	 * 从购物车删除
	 */
	@Override
	public String delete() throws Exception {
		
		Long proId = Long.valueOf(Struts2Utils.getRequest().getParameter("proId"));
		HttpSession session = Struts2Utils.getRequest().getSession();
		HashMap<Long,Cart> cartMap = (HashMap)session.getAttribute("cartMap");
		cartMap.remove(proId);
		
		return "mycart";
	}
	/**
	 * 清空购物车
	 * @return
	 * @throws Exception
	 */
	public String clear() throws Exception {
		HttpSession session = Struts2Utils.getRequest().getSession();
		HashMap<Long,Cart> cartMap = (HashMap)session.getAttribute("cartMap");
		if(cartMap != null){
			cartMap.clear();
		}
		return "mycart";
	}
	
	@Override
	protected void prepareModel() throws Exception {
		
	}

	public Float getCartTotalCast() {
		HttpSession session = Struts2Utils.getRequest().getSession();
		HashMap<Long,Cart> cartMap = (HashMap)session.getAttribute("cartMap");
		if(cartMap == null){
			return 0f;
		}else{
			Float price = 0f;
			for (Cart c : cartMap.values()) {
				price = price+c.getProductTotal();
			}
			return price;
		}
	}
	

	public Float getCartOffCast() {
		
		if(SpringSecurityUtils.getCurrentUser() == null){
			return 0f;
		}else{
			User user = accountManager.findUserByLoginName(SpringSecurityUtils.getCurrentUser().getUsername());
			return getCartTotalCast()-getCartTotalCast()*user.getMemberOff();
		}
	}

	public Float getCartMemberCast() {
		if(SpringSecurityUtils.getCurrentUser() == null){
			return getCartTotalCast();
		}else{
			User user = accountManager.findUserByLoginName(SpringSecurityUtils.getCurrentUser().getUsername());
			return getCartTotalCast()*user.getMemberOff();
		}
	}

	public ProductService getProductService() {
		return productService;
	}

	public void setProductService(ProductService productService) {
		this.productService = productService;
	}


	public AccountManager getAccountManager() {
		return accountManager;
	}


	public void setAccountManager(AccountManager accountManager) {
		this.accountManager = accountManager;
	}


	@Override
	protected void prepareModel(Boolean isEdit) throws Exception {
		// TODO Auto-generated method stub
		
	}

	public String getUserName() {
		return userName;
	}

	public String getAddress() {
		return address;
	}


	public String getTel() {
		return tel;
	}

	
}
