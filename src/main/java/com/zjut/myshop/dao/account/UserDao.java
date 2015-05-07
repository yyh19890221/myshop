package com.zjut.myshop.dao.account;

import org.springframework.stereotype.Component;
import com.zjut.myshop.entity.account.User;
import org.springside.modules.orm.hibernate.HibernateDao;

/**
 * 用户对象的泛型DAO类.
 * 
 * @author calvin
 */
@Component
public class UserDao extends HibernateDao<User, Long> {
}
