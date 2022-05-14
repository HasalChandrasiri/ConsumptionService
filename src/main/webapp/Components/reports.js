$(document).on("click", "#btnSave", function(event)
{ 
// Clear alerts---------------------
 $("#alertSuccess").text(""); 
 $("#alertSuccess").hide(); 
 $("#alertError").text(""); 
 $("#alertError").hide(); 
 
// Form validation-------------------
var status = validateReportForm(); 
if (status != true) 
	 { 
	 $("#alertError").text(status); 
	 $("#alertError").show(); 
	 return; 
	 } 
 
// If valid------------------------
var type = ($("#hidReportIDSave").val() == "") ? "POST" : "PUT"; 
	 $.ajax( 
	 { 
	 url : "ReportsAPI", 
	 type : type, 
	 data : $("#formReport").serialize(), 
	 dataType : "text", 
	 complete : function(response, status) 
	 { 
	 onReportSaveComplete(response.responseText, status); 
	 } 
	 }); 
	});

function onReportSaveComplete(response, status)
{ 
if (status == "success") 
	 { 
	 var resultSet = JSON.parse(response); 
	 if (resultSet.status.trim() == "success") 
	 { 
	 $("#alertSuccess").text("Successfully saved."); 
	 $("#alertSuccess").show(); 
	 $("#divReportsGrid").html(resultSet.data); 
	 } else if (resultSet.status.trim() == "error") 
	 { 
	 $("#alertError").text(resultSet.data); 
	 $("#alertError").show(); 
	 } 
 } else if (status == "error") 
	 { 
	 $("#alertError").text("Error while saving."); 
	 $("#alertError").show(); 
	 } else
 { 
 $("#alertError").text("Unknown error while saving.."); 
 $("#alertError").show(); 
 }
 
$("#hidReportIDSave").val(""); 
$("#formReport")[0].reset(); 
}


// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event)
		{ 
		$("#hidReportIDSave").val($(this).data("reportid")); 
		 $("#reportNo").val($(this).closest("tr").find('td:eq(0)').text()); 
		 $("#category").val($(this).closest("tr").find('td:eq(1)').text()); 
		 $("#units").val($(this).closest("tr").find('td:eq(2)').text()); 
		 $("#reportDescription").val($(this).closest("tr").find('td:eq(3)').text()); 
		});


$(document).on("click", ".btnRemove", function(event)
		{ 
		 $.ajax( 
		 { 
		 url : "ReportsAPI", 
		 type : "DELETE", 
		 data : "reportID=" + $(this).data("reportid"),
		 dataType : "text", 
		 complete : function(response, status) 
		 { 
		 onReportDeleteComplete(response.responseText, status); 
		 } 
		 }); 
		});
		
function onReportDeleteComplete(response, status)
{ 
if (status == "success") 
	 { 
	 var resultSet = JSON.parse(response); 
	 if (resultSet.status.trim() == "success") 
		 { 
		 $("#alertSuccess").text("Successfully deleted."); 
		 $("#alertSuccess").show(); 
		 $("#divReportsGrid").html(resultSet.data); 
	 } else if (resultSet.status.trim() == "error") 
		 { 
		 $("#alertError").text(resultSet.data); 
		 $("#alertError").show(); 
		 } 
	 } else if (status == "error") 
	 { 
		 $("#alertError").text("Error while deleting."); 
		 $("#alertError").show(); 
	 } else
		 { 
		 $("#alertError").text("Unknown error while deleting.."); 
		 $("#alertError").show(); 
		 } 
}


// CLIENT-MODEL================================================================
function validateReportForm()
{
	// REPORT NUMBER
	if ($("#reportNo").val().trim() == "")
		{
		return "Insert Report Number.";
		}
	// CATEGORY
		if ($("#category").val().trim() == "")
		{
		return "Insert Category.";
	}

// UNITS-------------------------------
if ($("#units").val().trim() == ""){
	return "Insert Units.";
}
		// is numerical value
		var tmpUnits = $("#units").val().trim();
		if (!$.isNumeric(tmpUnits))
			{
			return "Insert a numerical value for Units.";
			}
		
// convert to decimal price
$("#units").val(parseFloat(tmpUnits).toFixed(2));

// REPORT DESCRIPTION------------------------
	if ($("#reportDescription").val().trim() == ""){
		
		return "Insert Report Description.";
	}
	return true;
}