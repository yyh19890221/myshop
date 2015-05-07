<%@tag pageEncoding="UTF-8"%>
<%@attribute name="title" type="java.lang.String" required="false" %>
<%@attribute name="index" type="java.lang.Boolean" required="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html lang="lang" xmlns="http://www.w3.org/1999/html"> <!--<![endif]-->
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
	<meta name="keywords" content="">
	<meta name="description" content="">
 	<meta name="author" content="">
	<meta name="robots" content="all">
	<meta name="application-name" content="">

    <meta http-equiv="Cache-Control" content="no-store" />
    <meta http-equiv="Pragma" content="no-cache" />
    <meta http-equiv="Expires" content="0" />

    <title>${title}</title>
    <link rel="icon" href="${ctx}/img/base/favicon.ico">
    <link rel="shortcut icon" href="${ctx}/img/base/favicon.ico">
    <%@include file="/common/import-css.jspf"%>
    <script type="text/javascript">
        var currentURL = "${requestScope.currentURL}";
    </script>
</head>
<!--[if lt IE 7]><body  class="ie6"><![endif]-->
<!--[if IE 7]><body  class="ie7"><![endif]-->
<!--[if IE 8]><body  class="ie8"><![endif]-->
<!--[if IE 9]><body  class="ie9"><![endif]-->
<!--[if !IE]><!--><body <c:if test="${index eq true}">class="index"</c:if>><!--<![endif]-->
