var j = jQuery.noConflict();
var defaultPagePath='app/pages/';
var headerMsg = "Physiotheropy";
//var urlPath = "http://1.255.255.122:8080/TnEV1_0AWeb/WebService/Login/";

j(document).ready(function(){ 
document.addEventListener("deviceready",loaded,false);
});
function loaded() {
                pictureSource=navigator.camera.PictureSourceType;
                destinationType=navigator.camera.DestinationType;
            }
function login()
   {
   	if(document.getElementById("userName")!=null){
    	var userName = document.getElementById("userName").value;
	}else if(document.getElementById("userName")!=null){
		var userName = document.getElementById("userNameId").value;
	}
	var password = document.getElementById("password");
    
   	var headerBackBtn=defaultPagePath+'categoryMsgPage.html';
	var pageRef=defaultPagePath+'category.html';

	j('#loading').show();
   if(userName == 'yashashreezope'){
   		alert("Hello Dr. yashashree Zope. \n  Welcome to Your Physiotheropy App");
				j('#mainHeader').load(headerBackBtn);
				j('#mainContainer').load(pageRef);
      appPageHistory.push(pageRef);
   }else if(userName == 'gauravzope'){
		alert("Hello Mr. Gaurav Zope. \n  Welcome to Your Physiotheropy App");
				j('#mainHeader').load(headerBackBtn);
				j('#mainContainer').load(pageRef);
      appPageHistory.push(pageRef);
   }else{
   		alert("Please follow registration process for new enrollment");
   }


 }
 


  function createBusinessExp(){
	resetImageData();
	var headerBackBtn=defaultPagePath+'backbtnPage.html';
    var pageRef=defaultPagePath+'addAnExpense.html';
			j(document).ready(function() {
				j('#mainHeader').load(headerBackBtn);
				j('#mainContainer').load(pageRef);
			});
      appPageHistory.push(pageRef);
	 }


	 function displayBusinessExp(){
		 
    var headerBackBtn=defaultPagePath+'headerPageForBEOperation.html';
     var pageRef=defaultPagePath+'fairClaimTable.html';
			j(document).ready(function() {
				j('#mainHeader').load(headerBackBtn);
				j('#mainContainer').load(pageRef);
			});
      appPageHistory.push(pageRef);
	 }

	 function displayTSExp(){
		 
		 var headerBackBtn=defaultPagePath+'headerPageForTSOperation.html';
		var pageRef=defaultPagePath+'travelSettlementTable.html';
			j(document).ready(function() {
				j('#mainHeader').load(headerBackBtn);
				j('#mainContainer').load(pageRef);
			});
		appPageHistory.push(pageRef);
	 }


 function init() {
	 var pgRef;
	var headerBackBtn;
	if(window.localStorage.getItem("EmployeeId")!= null){
		if(window.localStorage.getItem("UserStatus")=='Valid'){
			pgRef=defaultPagePath+'category.html';
			headerBackBtn=defaultPagePath+'categoryMsgPage.html';
		}else{
			headerBackBtn=defaultPagePath+'welcomePage.html';
			pgRef=defaultPagePath+'loginPage.html';
		}

	}else{
		headerBackBtn=defaultPagePath+'welcomePage.html';
		pgRef=defaultPagePath+'loginPage.html';
	}
	
	j(document).ready(function() {
		j('#mainHeader').load(headerBackBtn);
			j('#mainContainer').load(pgRef);
			j('#mainContainer').load(pgRef,function() {
  						if(window.localStorage.getItem("UserStatus")!=null
  							&& window.localStorage.getItem("UserStatus")=='ResetPswd'){
  							document.getElementById("userName").value=window.localStorage.getItem("UserName");
  						}
		 			  
					});
			j('#mainContainer').swipe({
				swipe:function(event,direction,distance,duration,fingercount){
					switch (direction) {
						case "right":
								goBack();
								break;
						default:

					}
				},
				 threshold:200,
				allowPageScroll:"auto"
			});
	});
	appPageHistory.push(pgRef);
 }
 
  function loaddate(){
	j(function(){
		window.prettyPrint && prettyPrint();
		j('.dp1').datepicker({
			format: 'dd-mm-yyyy'
		});		
	});

	j('.dp1').on('changeDate', function(ev){
		j(this).datepicker('hide');
	});

}
 

function isJsonString(str) {
	try {
		JSON.parse(str);
	} catch (e) {
		return false;
	}
	return true;
}
				
 
function viewBusinessExp(){
    var pageRef=defaultPagePath+'fairClaimTable.html';
    var headerBackBtn=defaultPagePath+'headerPageForBEOperation.html';
	j(document).ready(function() {	
		j('#mainHeader').load(headerBackBtn);
		j('#mainContainer').load(pageRef);
	});
    appPageHistory.push(pageRef);
    resetImageData();
    j('#loading_Cat').hide();
}


function viewTravelSettlementExp(){
	resetImageData();
    var pageRef=defaultPagePath+'travelSettlementTable.html';
    var headerBackBtn=defaultPagePath+'headerPageForTSOperation.html';
			j(document).ready(function() {
				
				j('#loading_Cat').hide();
				j('#mainHeader').load(headerBackBtn);
				j('#mainContainer').load(pageRef);
			});
      appPageHistory.push(pageRef);
     }


function createAccHeadDropDown(jsonAccHeadArr){
	var jsonArr = [];
			if(jsonAccHeadArr != null && jsonAccHeadArr.length > 0){
				for(var i=0; i<jsonAccHeadArr.length; i++ ){
					var stateArr = new Array();
					stateArr = jsonAccHeadArr[i];
					jsonArr.push({id: stateArr.Label,name: stateArr.Value});
				}
			}
			jsonArr.sort(function(a, b){ // sort object by Account Head Name
			var nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
			if (nameA < nameB) //sort string ascending
				return -1 
			if (nameA > nameB)
				return 1
			return 0 //default return value (no sorting)
			})
			j("#accountHead").select2({
				data:{ results: jsonArr, text: 'name' },
				placeholder: "Account Head",
				minimumResultsForSearch: -1,
				initSelection: function (element, callback) {
					callback(jsonArr[1]);
					getExpenseNamesBasedOnAccountHead();
				},
				formatResult: function(result) {
					if ( ! isJsonString(result.id))
						result.id = JSON.stringify(result.id);
						return result.name;
				}
			});
			
}
function getFormattedDate(input){
    var inputDate=input.split('-');
    var month = inputDate[1];
    var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    return inputDate[0]+"-"+months[(month-1)]+"-"+inputDate[2];
   
}

function validateExpenseDetails(exp_date,exp_from_loc,exp_to_loc,exp_narration,exp_unit,exp_amt,acc_head_id,exp_name_id,currency_id,location_id){
	if(exp_date == ""){
		alert("Expense Date is invalid");
		return false;
	}
	if(acc_head_id == "-1"){
		alert("Account Head is invalid");
		return false;
	}
	if(exp_name_id == "-1"){
		alert("Expense Name is invalid");
		return false;
	}
	if(flagForUnitEnable == true){
		if(isZero(exp_unit,"Unit")==false){
			document.getElementById("expUnit").value = "";
			return false;
		}
	}	
	if(isZero(exp_amt,"Amount")==false){
		document.getElementById("expAmt").value = "";
		return false;
	}
	if(perUnitDetailsJSON.expenseIsfromAndToReqd!='N'){
		if(exp_from_loc == ""){
			alert("From Location is invalid");
			return false;
		}
		if(exp_to_loc == ""){
			alert("To Location is invalid");
			return false;
		}
	}

	if(exp_narration == ""){
		alert("Narration is invalid");
		return false;
	}
	
	if(perUnitDetailsJSON.expIsUnitReq == 'Y'){

		if(exp_unit != ""){
			if(isOnlyNumeric(exp_unit,"Unit")==false)
			{
				return false;
			}
			
		}else{
			alert("Unit is invalid");
			return false;
		}
	}
		

		if(exp_amt != ""){
			if(isOnlyNumeric(exp_amt,"Amount")==false)
			{
				return false;
			}
			
		}else{
			alert("Amount is invalid");
			return false;
		}
	
	if(currency_id == "-1"){
		alert("Currency Name is invalid");
		return false;
	}
    
    	if(location_id == "-1"){
		alert("Location Name is invalid");
		return false;
	}
	
		return true;
	}



function hasClass(ele,cls) {
	  return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}


function onloadTimePicker(){
 	
 	if (top.location != location) {
    top.location.href = document.location.href ;
  }
		
	j('.timepicker1').timepicki();
 }

function setDelayMessage(returnJsonData,jsonToBeSend,busExpDetailsArr){
		var pageRef=defaultPagePath+'success.html';
		if(returnJsonData.DelayStatus=='Y'){
			exceptionMessage = "This voucher has exceeded Time Limit.";
			
		      j('#displayError').children('span').text(exceptionMessage);
		      j('#displayError').hide().fadeIn('slow').delay(2000).fadeOut('slow');
		    
		}else{

			if(confirm("This voucher has exceeded Time Limit. Do you want to proceed?")==false){
						return false;
					}
			 jsonToBeSend["DelayAllowCheck"]=true;
			 callSendForApprovalServiceForBE(jsonToBeSend,busExpDetailsArr,pageRef);
		}			
}
