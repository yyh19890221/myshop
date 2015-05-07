package com.zjut.myshop.entity.order;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.zjut.myshop.entity.IdEntity;



@Entity
@Table(name="T_ORDER")
public class Order extends IdEntity {
	private static final long serialVersionUID = 1L;
	
	private String userName;
	private Float amount;
	private Date createDate;
	
	private List<OrderItem> itemList = new ArrayList<OrderItem>();


	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Float getAmount() {
		return amount;
	}

	public void setAmount(Float amount) {
		this.amount = amount;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
    @OneToMany(cascade={CascadeType.ALL},fetch=FetchType.EAGER,mappedBy="order")
	public List<OrderItem> getItemList() {
		return itemList;
	}
    
	public void setItemList(List<OrderItem> itemList) {
		this.itemList = itemList;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Order other = (Order) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
   	
	
}
