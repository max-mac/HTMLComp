function webservice(success,error,options){

	var paramsXML=convertObjectToXML(options.params);
	
	if(options.version=="110" || options.version=="1.1"){
		var soapContent='<?xml version="1.0" encoding="utf-8"?>'
					   +'<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
					   +	'<soap:Body>'
					   +		'<'+options.methodName+' xmlns="'+options.namespace+'">'
					   +			paramsXML
					   +		'</'+options.methodName+'>'
					   +	'</soap:Body>'
					   +'</soap:Envelope>';
		var contentType="text/xml; charset=utf-8";
	}
	else if(options.version=="120" || options.version=="1.2"){
		var soapContent='<?xml version="1.0" encoding="utf-8"?>'
					   +'<soap12:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">'
					   +	'<soap12:Body>'
					   +		'<'+options.methodName+' xmlns="'+options.namespace+'">'
					   +			paramsXML
					   +		'</'+options.methodName+'>'
					   +	'</soap12:Body>'
					   +'</soap12:Envelope>';
		var contentType="application/soap+xml; charset=utf-8";
	}
	
	$.ajax({
		url: options.serviceUrl,
		type: "POST",
		dataType: "text",
		contentType: contentType,
		data: soapContent,
		success: success,
		error: error
	});
	
	return false;
}
function convertObjectToXML(obj){
	var str=""
	for(var name in obj){
		if(typeof obj[name]=="string")
			str+="<"+name+">"+handleXMLString(obj[name])+"</"+name+">";
		else if(typeof obj[name]=="number" || typeof obj[name]=="boolean")
			str+="<"+name+">"+obj[name]+"</"+name+">";
		else if(typeof obj[name]=="undefined")
			str+="<"+name+"></"+name+">";
		else if(typeof obj[name]=="object" && obj[name].constructor==Array)
			str+=convertArrayToXML(name,obj[name]);
		else if(typeof obj[name]=="object")
			str+=convertObjectToXML(obj);
	}
	
	return str;
}
function convertArrayToXML(name,array){
	var str="";
	for(var i=0;i<array.length;i++){
		if(typeof array[i]=="string")
			str+="<"+name+">"+handleXMLString(array[i])+"</"+name+">";
		else if(typeof array[i]=="number" || typeof array[i]=="boolean")
			str+="<"+name+">"+array[i]+"</"+name+">";
		else if(typeof array[i]=="object" && array[i].constructor!=Array)
			str+="<"+name+">"+convertObjectToXML(array[i])+"</"+name+">";
	}
	
	return str;
}
function handleXMLString(str){
	return str.replace(/&/g,"&amp;")
			  .replace(/</g,"&lt;")
			  .replace(/>/g,"&gt;")
			  .replace(/"/g,"&quot;")
			  .replace(/'/g,"&apos;");
}