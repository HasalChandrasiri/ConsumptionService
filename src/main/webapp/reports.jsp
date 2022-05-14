<%@page import="com.Report"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>

	<head>
		<meta charset="ISO-8859-1">
		<title>Reports Management</title>
		<link rel="stylesheet" href="Views/bootstrap.min.css">
		<script src="Components/jquery-3.6.0.min.js"></script>
		<script src="Components/reports.js"></script>
	</head>
	
	<body> 
		<div class="container"><div class="row"><div class="col-6"> 
		
		<h1>Consumption Service</h1>
		
		<form id="formReport" name="formReport" >
		
			 Report Number: 
			 <input id="reportNo" name="reportNo" type="text" 
			 class="form-control form-control-sm">
			 
			 <br> Category: 
			 <input id="category" name="category" type="text" 
			 class="form-control form-control-sm">
			 
			 <br> Units: 
			 <input id="units" name="units" type="text" 
			 class="form-control form-control-sm">
			 
			 <br> Report description: 
			 <input id="reportDescription" name="reportDescription" type="text" 
			 class="form-control form-control-sm">
			 <br>
			 
			 <input id="btnSave" name="btnSave" type="button" value="Save" 
			 class="btn btn-primary">
			 
			 <input type="hidden" id="hidReportIDSave" 
			 name="hidReportIDSave" value="">
			 
		</form>
		<br>
		
		<div id="alertSuccess" class="alert alert-success"></div>
		<div id="alertError" class="alert alert-danger"></div>
		<br>
		
		<div id="divReportsGrid">
			 <%
			 Report reportObj = new Report(); 
			 out.print(reportObj.readReports()); 
			 %>
		</div>
		</div> </div> </div> 
		
	</body>
</html>