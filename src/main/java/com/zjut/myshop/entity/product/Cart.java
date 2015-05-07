package com.zjut.myshop.entity.product;


//购物车
public class Cart {
	private static final long serialVersionUID = 1L;
	private Long productId; //产品Id
	private String productName; //产品名称
	private Integer productNum; //产品数量
	private String productImg;  //产品图片
	private Float productPrice; // 单价
	private Float productTotal; // 单价
	
	
	
	
	public Cart(Long productId, String productName, Integer productNum,
			String productImg, Float productPrice) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.productNum = productNum;
		this.productImg = productImg;
		this.productPrice = productPrice;
		this.productTotal = productPrice*productNum;
	}
	public Long getProductId() {
		return productId;
	}
	public void setProductId(Long productId) {
		this.productId = productId;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Integer getProductNum() {
		return productNum;
	}
	public void setProductNum(Integer productNum) {
		this.productNum = productNum;
	}
	public String getProductImg() {
		return productImg;
	}
	public void setProductImg(String productImg) {
		this.productImg = productImg;
	}
	public Float getProductPrice() {
		return productPrice;
	}
	public void setProductPrice(Float productPrice) {
		this.productPrice = productPrice;
	}
	public Float getProductTotal() {
		return productTotal;
	}
	public void setProductTotal(Float productTotal) {
		this.productTotal = productTotal;
	}
	
}
