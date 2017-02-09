/*
!!! DO NOT UPDATE UNLESS YOU ARE FAMILIAR WITH JAVASCRIPT !!!
*/

//Visa Checkout Information place your own API key here 
var apikey = "[Visa Checkout API Key]";
var visacheckoutpaymentdata;


// CyberSource Data populate with your CyberSource MID
var cybsmid = "[CyberSource Merchnat ID]";
var callID;
var tamount;
var currency;


function successFunction(payment) {
        
  
        document.getElementById("edata").innerHTML =  "Encrypted Data: <br>" +         JSON.stringify(payment,null,2);
  $("#encryptedData").show("slow");    
        $("#visaRetriveCallID").show("slow");                     
  visacheckoutpaymentdata = payment;
  

}


// This parses the information from the Visa Checkout response payload needed for the CyberSource request
$("#visaGetCallIDButton").click(function(){
  
  $("#CallIDResult").show("slow");
  $("#visaCYBSauth").show("slow");

  callID = visacheckoutpaymentdata.callid;
  tamount = visacheckoutpaymentdata.vInitRequest.paymentRequest.total;
  currency = visacheckoutpaymentdata.vInitRequest.paymentRequest.currencyCode;
  
  document.getElementById("CallIDResult").innerHTML = "CallID Data: "+ callID + "<br>" + "paymentRequest total: " + tamount
    + "<br>" + "paymentRequest currencyCode: " + currency;

})


 
/* Formatting SOAP auth request 
   Example

<requestMessage xmlns="urn:schemas-cybersource-com:transaction-data-1.130">
<merchantID>[CyberSource MID]</merchantID>
<merchantReferenceCode>[Merchnat assigned code]</merchantReferenceCode>
<purchaseTotals>
<currency>[Currency Code]</currency>
<grandTotalAmount>[Total Amount]</grandTotalAmount>
</purchaseTotals>
<ccAuthService run="true">
<commerceIndicator>internet</commerceIndicator>
</ccAuthService>
<paymentSolution>visacheckout</paymentSolution>
<vc>
<orderID>[VisaCheckout CallID]</orderID>
</vc>
</requestMessage>

*/
$("#visaCYBSsoapButton").click(function(){
  $("#resultAuth").show("slow");

  document.getElementById("resultAuth").innerHTML ='<textarea rows="20" cols="60" style="border:none;">'+'&#13;&#10;'+
    '<requestMessage xmlns="urn:schemas-cybersource-com:transaction-data-1.130">'+'&#13;&#10;'+
    '<merchantID>'+cybsmid+'</merchantID>'+'&#13;&#10;'+
    '<merchantReferenceCode>123456</merchantReferenceCode>'+'&#13;&#10;'+
    '<purchaseTotals>'+'&#13;&#10;'+
    '<currency>'+currency+'</currency>'+'&#13;&#10;'+
    '<grandTotalAmount>'+tamount+'</grandTotalAmount>'+'&#13;&#10;'+
    '</purchaseTotals>'+'&#13;&#10;'+
    '<ccAuthService run="true">'+'&#13;&#10;'+
    '<commerceIndicator>internet</commerceIndicator>'+'&#13;&#10;'+
    '</ccAuthService>'+'&#13;&#10;'+
    '<paymentSolution>visacheckout</paymentSolution>'+'&#13;&#10;'+
    '<vc>'+'&#13;&#10;'+
    '<orderID>'+callID+'</orderID>'+'&#13;&#10;'+
    '</vc>'+'&#13;&#10;'+
    '</requestMessage>'+'&#13;&#10;'+
          '</textarea>'; 
})



/* Formatting Simple Order auth request 
   Example

ccAuthService_run=true
merchantID=[CyberSource MID]
merchantReferenceCode=[Merchnat assigned code]
purchaseTotals_currency=[Currency Code]
purchaseTotals_grandTotalAmount=[Total Amount]
paymentSolution=visacheckout
vc_orderID=[VisaCheckout CallID]

*/
$("#visaCYBSsonvpButton").click(function(){
  $("#resultAuth").show("slow");
  document.getElementById("resultAuth").innerHTML ='<textarea rows="20" cols="60" style="border:none;">'+'&#13;&#10;'+
    "ccAuthService_run=true" +'&#13;&#10;'+
    "merchantID=" +cybsmid +'&#13;&#10;'+
    "merchantReferenceCode=123456"+'&#13;&#10;'+
    "purchaseTotals_currency="+currency +'&#13;&#10;'+
    "purchaseTotals_grandTotalAmount="+tamount +'&#13;&#10;'+
    "paymentSolution=visacheckout"+'&#13;&#10;'+
  "vc_orderID="+callID+'&#13;&#10;'+
  '</textarea>'; 
})


/* Formatting SCMP auth request 
   Example

ics_applications=ics_auth
merchant_id=[CyberSource MID]
merchant_ref_number=[Merchant assigned code]
currency=[Currency Code]
grand_total_amount=[Total Amount]
payment_solution=visacheckout
vc_order_id=[VisaCheckout CallID]


*/
$("#visaCYBSscmpnvpButton").click(function(){
  $("#resultAuth").show("slow");
  document.getElementById("resultAuth").innerHTML ='<textarea rows="20" cols="60" style="border:none;">'+'&#13;&#10;'+
    "ics_applications=ics_auth"+'&#13;&#10;'+
    "merchant_id=" +cybsmid+'&#13;&#10;'+
    "merchant_ref_number=123456"+'&#13;&#10;'+
    "currency="+currency+'&#13;&#10;'+
    "grand_total_amount=" +tamount+'&#13;&#10;'+
    "payment_solution=visacheckout"+'&#13;&#10;'+
  "vc_order_id="+callID+'&#13;&#10;'+
'</textarea>'; 
})

