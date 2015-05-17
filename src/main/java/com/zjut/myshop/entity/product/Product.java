package com.zjut.myshop.entity.product;

import javax.persistence.Entity;
import javax.persistence.Table;

import com.zjut.myshop.entity.IdEntity;


@Entity
@Table(name="T_PRODUCT")
public class Product extends IdEntity {
	
	private static final long serialVersionUID = 1L;
	
	private String name;
	private String description;
	private String introduce;
	private Float price;
	private Float nowprice;
	private String picture;
	private String catalogId;
	private String sellcount;
	private String leftcount;
	
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getIntroduce() {
		return introduce;
	}
	public void setIntroduce(String introduce) {
		this.introduce = introduce;
	}
	public Float getPrice() {
		return price;
	}
	public void setPrice(Float price) {
		this.price = price;
	}
	public Float getNowprice() {
		return nowprice;
	}
	public void setNowprice(Float nowprice) {
		this.nowprice = nowprice;
	}
	public String getPicture() {
		return picture;
	}
	public void setPicture(String picture) {
		this.picture = picture;
	}
	public String getCatalogId() {
		return catalogId;
	}
	public void setCatalogId(String catalogId) {
		this.catalogId = catalogId;
	}
	public String getSellcount() {
		return sellcount;
	}
	public void setSellcount(String sellcount) {
		this.sellcount = sellcount;
	}
	public String getLeftcount() {
		return leftcount;
	}
	public void setLeftcount(String leftcount) {
		this.leftcount = leftcount;
	}
	
	
	
}
