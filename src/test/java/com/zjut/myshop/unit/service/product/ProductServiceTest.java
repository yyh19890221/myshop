package com.zjut.myshop.unit.service.product;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.annotation.Rollback;

import com.zjut.myshop.entity.product.Product;
import com.zjut.myshop.service.product.ProductService;
import com.zjut.myshop.unit.service.BaseTest;

public class ProductServiceTest extends BaseTest{
	
	@Autowired
	private ProductService productService;
	
	@Test
	public void testGetProductById() {
		Product p = productService.getProductById(1L);
        System.out.println(p.getName());
	}
	
	@Test
	@Rollback(false)
	public void testSaveProduct() {
		Product p = new Product();
		p.setName("123");
		productService.saveProduct(p);		

	}

//	private IMocksControl control = EasyMock.createControl();
//
//	private ProductService productService;
//	private ProductDao mockProductDao;
//
//	@Before
//	public void setUp() {
//		productService = new ProductService();
//		mockProductDao = control.createMock(ProductDao.class);
//		productService.setProductDao(mockProductDao);
//	}
//
//	@After
//	public void tearDown() {
//	//	control.verify();
//	}
//
//	@Test
//	public void testSaveProduct() {
//		
//		Product p = new Product();
//		p.setName("123");
//		productService.saveProduct(p);		
//
//	}
//	
//	@Test
//	public void testGetProductById() {
//		System.out.println(productService.getProductById(1L));
//	}
//	
	
	
//	@Autowired 
//	ApplicationContext ctx;
//	
//	//private ProductService ProductService;
//	
//	private ProductService userManager;
//
//    @Before
//    public void setUp() {
//    	userManager = ctx.getAutowireCapableBeanFactory()
//                .createBean(ProductService.class);
//    }
//    
//    @Test
//    public void testSaveProduct(){
////    	Product p = new Product();
////    	p.setName("123");
////    	ProductService.saveProduct(p);
//    	userManager.saveUser(new User());
//    }
//    

}
