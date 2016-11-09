
/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 */
 
 // Global Variables
 
//// User defined Function

// Get Age คำนวณอายุ
function getAge(dateString, dateCal) {
		if (dateCal == undefined) {dateCal = "";}
		if (dateCal.length == 0)
		{
			var now = new Date();
		  	var today = new Date(now.getYear(),now.getMonth(),now.getDate());
		  	var yearNow = now.getFullYear();
		  	var monthNow = now.getMonth() + 1;
		  	var dateNow = now.getDate();
		}
		else
		{
			var yearNow = parseInt(dateCal.substr(0, 4));
			var monthNow = parseInt(dateCal.substr(5, 2));
			var dateNow = parseInt(dateCal.substr(8, 2));
		}
		var yearDob = parseInt(dateString.substr(0, 4));
		var monthDob = parseInt(dateString.substr(5, 2));
		var dateDob = parseInt(dateString.substr(8, 2));
		var age = {};
		var ageString = "";
		var yearString = "";
		var monthString = "";
		var dayString = "";
	
	
		yearAge = yearNow - yearDob;
		if (monthNow >= monthDob)
		  var monthAge = monthNow - monthDob;
		else {
		  yearAge--;
		  var monthAge = 12 + monthNow -monthDob;
		}
		
		if (dateNow >= dateDob)
			var dateAge = dateNow - dateDob;
		else {
		    monthAge--;
		    var dateAge = 31 + dateNow - dateDob;
		
		    if (monthAge < 0) {
		      monthAge = 11;
		      yearAge--;
		    }
		}
	
	  age = {
	      years: yearAge,
	      months: monthAge,
	      days: dateAge
	      };
	
	  yearString = " ปี";
	  monthString = " เดือน";
	  dayString = " วัน";
	
	
	  if ( (age.years > 0) &&(age.years < 5) && (age.months > 0) && (age.days > 0) )
	    	ageString = age.years + yearString + " " + age.months + monthString + " " + age.days + dayString;
	  else if ( (age.years > 0) &&(age.years > 5) && (age.months > 0) && (age.days > 0))
	    	ageString = age.years + yearString + " " + age.months + monthString;
	  else if ( (age.years == 0) && (age.months == 0) && (age.days > 0) )
	    	ageString = age.days + dayString;
	  else if ( (age.years > 0) && (age.months == 0) && (age.days == 0) )
	    	ageString = age.years + yearString + " Happy Birthday!!";
	  else if ( (age.years > 0) && (age.months > 0) && (age.days == 0) )
	    	ageString = age.years + yearString + " " + age.months + monthString;
	  else if ( (age.years == 0) && (age.months > 0) && (age.days > 0) )
	    	ageString = age.months + monthString + " " + age.days + dayString;
	  else if ( (age.years > 0) && (age.months == 0) && (age.days > 0) )
	    	ageString = age.years + yearString + " " + age.days + dayString;
	  else if ( (age.years == 0) && (age.months > 0) && (age.days == 0) )
	    	ageString = age.months + monthString;
	  else ageString = "Oops! ไม่สามารถคำนวณอายุได้ !";
	
	  return ageString;
}

function d2d_diff(date1,date2,interval) {
    var second=1000, minute=second*60, hour=minute*60, day=hour*24, week=day*7;
    date1 = new Date(date1);
    date2 = new Date(date2);
    var timediff = date2 - date1;
    if (isNaN(timediff)) return NaN;
    switch (interval) {
        case "years": return date2.getFullYear() - date1.getFullYear();
        case "months": return (
            ( date2.getFullYear() * 12 + date2.getMonth() )
            -
            ( date1.getFullYear() * 12 + date1.getMonth() )
        );
        case "weeks"  : return Math.floor(timediff / week);
        case "days"   : return Math.floor(timediff / day); 
        case "hours"  : return Math.floor(timediff / hour); 
        case "minutes": return Math.floor(timediff / minute);
        case "seconds": return Math.floor(timediff / second);
        default: return undefined;
    }
}

function min2hm(nmin) {
	var lcreturn = "";
	var lnhour = parseInt(nmin/60);
	if (lnhour > 0) { lcreturn = lnhour.toString() + " ชม.";}
	var lnmin = parseInt(nmin - (lnhour*60));
	if (lnmin > 0) {lcreturn = lcreturn + " " + lnmin.toString() + " นาที";}
	return lcreturn;
}

// TsDate แสดงวันที่ไทย แบบย่อ
function tsdate(edate, withtime)
 {
 	if (edate == "") { return "-";}
 	else {
		 if (typeof(edate) == "string") {edate = new Date(edate);}
	 	var tday = edate.getDate();
	 	var tmonth0 = edate.getMonth();
	 	var tmonth = "";
	 		if (tmonth0 == 0) {tmonth = "มค.";}
	 		else if (tmonth0 == 1){ tmonth = "กพ.";}
	 		else if (tmonth0 == 2){ tmonth = "มีค.";}
	 		else if (tmonth0 == 3){ tmonth = "เมย.";}
	 		else if (tmonth0 == 4){ tmonth = "พค.";}
	 		else if (tmonth0 == 5){ tmonth = "มิย.";}
	 		else if (tmonth0 == 6){ tmonth = "กค.";}
	 		else if (tmonth0 == 7){ tmonth = "สค.";}
	 		else if (tmonth0 == 8){ tmonth = "กย.";}
	 		else if (tmonth0 == 9){ tmonth = "ตค.";}
	 		else if (tmonth0 == 10){ tmonth = "พย.";}
	 		else{ tmonth = "ธค.";}
	 	var tyear = edate.getFullYear() +543;
	 	var nhour = edate.getHours();
	 	var thour = nhour.toString();
	 	if(thour.length == 1){thour = "0" + thour;}
	 	var nmin = edate.getMinutes();
	 	var tmin = nmin.toString();
	 	if(tmin.length == 1){tmin = "0" + tmin;}
	 	if (typeof(withtime) == 'undefined')
	 	{
	 	return tday.toString() + " " + tmonth + " " + tyear.toString();
	 	}
	 	else
	 	{
	 	return tday.toString() + " " + tmonth + " " + tyear.toString() + "  " + thour.toString() + ":" + tmin + " น.";
	 	}
	 }
 }
 
 // tldate แสดงวันที่ไทย แบบยาว
 function tldate(edate)
 {
 	var tday = edate.getDate();
 	if (tday != 0) {
 	var tmonth0 = edate.getMonth();
 	var tmonth = "";
 		if (tmonth0 == 0) {tmonth = "มกราคม";}
 		else if (tmonth0 == 1){ tmonth = "กุมภาพันธ์";}
 		else if (tmonth0 == 2){ tmonth = "มีนาคม";}
 		else if (tmonth0 == 3){ tmonth = "เมษายน";}
 		else if (tmonth0 == 4){ tmonth = "พฤษภาคม";}
 		else if (tmonth0 == 5){ tmonth = "มิถุนายน";}
 		else if (tmonth0 == 6){ tmonth = "กรกฎาคม";}
 		else if (tmonth0 == 7){ tmonth = "สิงหาคม";}
 		else if (tmonth0 == 8){ tmonth = "กันยายน";}
 		else if (tmonth0 == 9){ tmonth = "ตุลาคม";}
 		else if (tmonth0 == 10){ tmonth = "พฤศจิกายน";}
 		else{ tmonth = "ธันวาคม";}
 	var tyear = edate.getFullYear() +543;
 	return tday.toString() + " " + tmonth + " พ.ศ." + tyear.toString();}
 	else {return "-";}
 }
 
 // แปลง Javascript Date  เป็น Character
 function d2txt(dDate, withtime) {
 	if (dDate == "") {return "0000.00.00 00:00";}
 	else {
		var cYear = dDate.getFullYear().toString();
		var cMonth = (dDate.getMonth() + 1).toString();
		var cDate = dDate.getDate().toString();
		var cTime = dDate.getHours().toString() + ":" + dDate.getMinutes().toString();
		var cReturn = cYear + "." + cMonth + "." + cDate;
		if (withtime != undefined) {cReturn = cReturn + " " + cTime;}
		return cReturn;
	}
}

// แสดงผล Number เป็น 1,000,000.00
function s1000(nnumber) {
	var cRetVal = nnumber.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
	return cRetVal;
}

// แสดงผล Array ของการเลือกรายการใน EdgetoEdgeDataList
function selected(cList) {
	var arr = [];
	require([
		"dojo/ready",
		"dijit/registry",
 		"dojo/_base/array"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg, array){
		ready(function(){
			var Listobj = reg.byId(cList);
			arr = array.filter(Listobj.getChildren(), function(w){return w.checked;});
		});
	});
	return arr[0];
}

// Function สำหรับ search_box ////////////////////
function search(cbox, cpane, clist) {
	require([
 	"dojo/ready",
 	"dijit/registry",
 	"dojo/data/ItemFileReadStore",
 	"dojo/data/ItemFileWriteStore",
 	"dojo/on",
 	"dojo/_base/xhr"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg, ifrs, ifws, on, xhr){
		ready(function(){
			var search_box = reg.byId(cbox);
			var search_pane = reg.byId(cpane);
			var search_list = reg.byId(clist);

			// Click ที่ Box เพื่อค้นหา
			on(search_box, "click", function() {
				search_list.setQuery({label:"*"});
				search_pane.set('open', true);
			});
			// Search Lab List
			on(search_box, "keyup", function() {
				lcsearchtext = search_box.get("value").trim().toUpperCase();
	    		search_list.setQuery({label:lcsearchtext + "*"});
			});
		});
	});
}
////////////////////////////////////////////////////////

//// Function for ProgressIndicator
function pgstart() {
	require([
 	"dojo/ready",
	"dojo/_base/window",
	"dojox/mobile/ProgressIndicator"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, win, ProgressIndicator){
		ready(function(){
			var prog = ProgressIndicator.getInstance();
    		win.body().appendChild(prog.domNode);
			prog.start();
		});
	 });
}

//// Function for ProgressIndicator
function pgstop() {
	require([
 	"dojo/ready",
	"dojo/_base/window",
	"dojox/mobile/ProgressIndicator"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, win, ProgressIndicator){
		ready(function(){
			var prog = ProgressIndicator.getInstance();
    		win.body().appendChild(prog.domNode);
			prog.stop();
		});
	 });
}
////////////////////////////////////////////////////////////

//// Fill EdgetoEdgeDataList ด้วยข้อมูลจาก PHP
// Function สำหรับ Fill EdgetoEdge List ////////////////////
function list(cobject, cphp, cheader) {
	require([
 	"dojo/ready",
 	"dijit/registry",
	"dojo/_base/window",
	"dojox/mobile/ProgressIndicator",
 	"dojo/data/ItemFileReadStore",
 	"dojo/data/ItemFileWriteStore",
 	"dojo/_base/xhr"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg, win, ProgressIndicator, ifrs, ifws, xhr){
		ready(function(){
			//var prog = new ProgressIndicator({size:40, colors:['#E60012','#F39800','#FFF100','#8FC31F','#009944','#009E96',
            //  '#00A0E9','#0068B7','#1D2088','#920783','#E4007F','#E5004F']});
			var prog = ProgressIndicator.getInstance();
    		win.body().appendChild(prog.domNode);
    		prog.start(); // start the progress indicator
			var listObj = reg.byId(cobject);
			var new_store = new ifws({data:{items:[]}});
			listObj.setStore(new_store);
			xhr.get({
				url: ip_address + cphp,
				headers: { "X-Requested-With": null },
				content: {},
				load: function(result) {
					//if (cobject == "staff_list") {alert (result);}
					// ไม่ควรมี Field ชื่อ id
					if (typeof(cheader) == "undefined") {var head = "items:[";}
					else {var head = 'items:[{unique_id: 0, label: cheader, value : "0", header: true}, ';}
					php_return = result.replace(/[\n\r]*/g,'');
					php_return = php_return.replace("items:[", head);
					cMacro = eval('storeData = ' + php_return);
					listStore = new ifrs({data:storeData});
					listObj.setStore(listStore);
					prog.stop(); // stop the progress indicator
					return listObj;
				},
				error: function() {	}
			});
		});
	});
}
////////////////////////////////////////////////////////
//// Fill EdgetoEdgeDataList ด้วยข้อมูลจาก PHP
// Function สำหรับ Fill EdgetoEdge List ////////////////////
function list1(cobject, cphp, cheader) {
	require([
	"dojo/ready",
	"dijit/registry",
	"dojo/_base/window",
	"dojox/mobile/ProgressIndicator",
	"dojo/data/ItemFileReadStore",
	"dojo/data/ItemFileWriteStore",
	"dojo/_base/xhr"
	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	], function(ready, reg, win, ProgressIndicator, ifrs, ifws, xhr){
		return ready(function(){
			var prog = ProgressIndicator.getInstance();
			win.body().appendChild(prog.domNode);
			prog.start(); // start the progress indicator
			var listObj = reg.byId(cobject);
			var new_store = new ifws({data:{items:[]}});
			listObj.setStore(new_store);
			var cret = xhr.get({
				url: ip_address + cphp,
				headers: { "X-Requested-With": null },
				content: {},
				load: function(result) {
					//if (cobject == "staff_list") {alert (result);}
					// ไม่ควรมี Field ชื่อ id
					if (typeof(cheader) == "undefined") {var head = "items:[";}
					else {var head = 'items:[{unique_id: 0, label: cheader, value : "0", header: true}, ';}
					php_return = result.replace(/[\n\r]*/g,'');
					php_return = php_return.replace("items:[", head);
					cMacro = eval('storeData = ' + php_return);
					listStore = new ifrs({data:storeData});
					listObj.setStore(listStore);
					prog.stop(); // stop the progress indicator
					return php_return;
				},
				error: function() {}
			});
			alert (cret);
			debugger;
			return cret;
		});
	});
}

function store(cobject) {
	require([
 	"dojo/ready",
 	"dijit/registry",
 	"dojo/data/ItemFileWriteStore"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg, ifws){
		ready(function(){
			var listObj = reg.byId(cobject);
			var new_store = new ifws({data:{items:[]}});
			listObj.setStore(new_store);
		});
	});
}
////////////////////////////////////////////////////////

//// Delete Item จาก RoundRectDataList ต้องระบุ obj_name ก่อนใช้ function
function deleteOneItem(cobject) {
 	require([
 	"dojo/ready",
 	"dijit/registry"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg){
		ready(function(){
			var list_obj = reg.byId(cobject);
		 	function deleteAction(items){
		    	if(items){
		 	       	var i;
					for(i = 0; i < items.length; i++){
			       		var item = items[i];
			       		list_obj.store.deleteItem(item);
		    		}
		       	}
		    }
			var all_list = list_obj.getChildren();
			var list_selected = '';
			for (i=0; i<all_list.length; i++){
				if (all_list[i].checked == true){
					list_selected = all_list[i].label;
				}
			}
			var pitems = list_obj.store._arrayOfAllItems[i];
		    list_obj.store.fetch({query:{label: list_selected}, onComplete: deleteAction, queryOptions: {ignoreCase:true}});
		});
	});
}

//// ลบรายการจาก List ทุกรายการ
function clearList(pcObject) {
	 require([
 	"dojo/ready",
 	"dojo/data/ItemFileWriteStore",
 	"dijit/registry"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, ifws, reg){
		ready(function(){
			var active_list = reg.byId(pcObject);
			var active_store = new ifws({data:{items:[]}});
			active_list.store = null;
			active_list.setStore(active_store);
			function deleteFromList(items, request){
		    	if(items ){
		       		var del;
					for(del = 0; del < items.length; del++){
			   			var item = items[del];
						active_list.store.deleteItem(item);
			   			active_list.store.save();
		    		}
		    	}
	   		}
			var all_list = active_list.getChildren();
	    	var list_selected = '';
		    for (nlist=0; nlist<all_list.length; nlist++){
	   			list_selected = all_list[nlist].label;
	   			eval("active_list.store.fetch({query:{label: list_selected}, onComplete: deleteFromList, queryOptions: {ignoreCase:true}});");
	       	}
		});
	});
}

//// Pad String Parameter pad = รูปแบบเต็ม 00000000
function pad(str, pad) {
  if (typeof str === 'undefined') 
    return pad;
else {
    return (pad + str).slice(-pad.length);
  }
}

//// Select List Item Parameter1 List Object คืนค่า Obj ที่มี Field ตาม Record ที่เลือก, Parameter2 = 1 แสดงเฉพาะ record number ที่เลือก เริ่มต้นจาก 0
function selected_row(clist, nrec) {
	var s = 0;
	var nsel = 0;
	var return_obj = [];
	require([
 	"dojo/ready",
 	"dijit/registry"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg){
		ready(function(){
			var active_list = reg.byId(clist);
			return_obj = active_list.getChildren();
		    for (s=0; s<return_obj.length; s++){
		    	var itemx = reg.byId(return_obj[s]);
		   		if (return_obj[s].get("focused") == true) {
		   			nsel = s;
		   			itemx.set("selected", true);}
		   		else {itemx.set("selected", false);}
		   	}
		});
	});
	if (nrec == 1) {return nsel;}
	else {return return_obj[nsel];}
}

//// Select List Item Parameter1 List Object คืนค่า Obj ที่มี Field ตาม Record ที่เลือก, Parameter2 = 1 แสดงเฉพาะ record number ที่เลือก เริ่มต้นจาก 0
function row_mark(clist, nrec) {
	var s = 0;
	var return_obj = [];
	require([
 	"dojo/ready",
 	"dijit/registry"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg){
		ready(function(){
			var active_list = reg.byId(clist);
			return_obj = active_list.getChildren();
		    for (s=0; s<return_obj.length; s++){
		    	var itemx = reg.byId(return_obj[s]);
	    		if (s == nrec) {
	   				itemx.set("selected", true);
	   				break;
	   			}
		   	}
		});
	});
}

// highlight row ของ clist ที่มี field cfield = cval
function highlight(clist, cfield, cval) {
	var s = 0;
	var return_obj = [];
	require([
 	"dojo/ready",
 	"dijit/registry"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg){
		ready(function(){
			var active_list = reg.byId(clist);
			return_obj = active_list.getChildren();
		    for (s=0; s<return_obj.length; s++){
		    	var itemx = reg.byId(return_obj[s]);
		    	var cmacro = "var chk = itemx." + cfield;
		    	eval(cmacro);
	    		if (chk == cval) {
	   				itemx.set("selected", true);
	   				break;
		   		}
		   	}
		});
	});
}

//// Clear Selection
function selected_clear(clist) {
	var s = 0;
	var return_obj = [];
	require([
 	"dojo/ready",
 	"dijit/registry"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg){
		ready(function(){
			var active_list = reg.byId(clist);
			return_obj = active_list.getChildren();
		    for (s=0; s<return_obj.length; s++){
		    	var itemx = reg.byId(return_obj[s]);
		   		itemx.set("selected", false);
		   	}
		});
	});
}
//////////////////////////////////////////////////////////////////////////
// Function สำหรับ Query ข้อมูลจาก mySQL                                ////
// Parameter = php และ เงื่อนไข xxx.php?yyy=999                         ////
// nrow = จำนวน Record ที่ Return เป็น Object ที่มีชื่อ Field เป็น Properties ////
//////////////////////////////////////////////////////////////////////////

function php2obj(cphp, nrow) {
//	require([
// 	"dojo/ready",
// 	"dijit/registry",
//	"dojo/_base/window",
//	"dojox/mobile/ProgressIndicator"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
//	 ], function(ready, reg, win, ProgressIndicator){
//		var prog = ProgressIndicator.getInstance();
//		win.body().appendChild(prog.domNode);
//		prog.start(); // start the progress indicator
//	 });
 	var xhrArgs = {
    	url: ip_address + cphp,
    	handleAs: "text",
    	sync: true,
    	load: function(data){},
    	error: function(error){}
  	}
  	// Call the asynchronous xhrGet
  	var deferred = dojo.xhrGet(xhrArgs);
  	var creturn = deferred.results;
  	ccheck = creturn.toString();
  	ccheck = ccheck.trim();
	if (typeof(nrow) == "undefined") {
		if (ccheck.substr(0, 1) == "{") {
			var creturn = creturn[0].replace(/[\n\r]*/g,'');
			var cmacro = "ret_obj = " + creturn;
			eval(cmacro);
			var n = ccheck.search("items");
			if (n > 0) {
				if (typeof(ret_obj.items[0]) == "undefined") {
				return "";}
				else {return ret_obj.items[0];}
			}
			else {return ret_obj;}
		}
		else {return ccheck.replace(",", "").trim();}
	} else {
		var nstart = ccheck.search("items");
		var nlen = ccheck.search("]");
		var creturn = ccheck.substr(nstart, nlen-nstart+1);
		return eval(creturn);
	}
}

//// Fill EdgetoEdgeDataList ด้วยข้อมูลจาก PHP
// Function สำหรับ Fill EdgetoEdge List ////////////////////
function php2obj1(cphp, nrow) {
	require([
 	"dojo/ready",
 	"dijit/registry",
	"dojo/_base/window",
	"dojox/mobile/ProgressIndicator"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg, win, ProgressIndicator){
		ready(function(){
			//var prog = new ProgressIndicator({size:40, colors:['#E60012','#F39800','#FFF100','#8FC31F','#009944','#009E96',
            //  '#00A0E9','#0068B7','#1D2088','#920783','#E4007F','#E5004F']});
			var prog = ProgressIndicator.getInstance();
    		win.body().appendChild(prog.domNode);
    		prog.start(); // start the progress indicator
			var xhrArgs = {
				url: ip_address + cphp,
				handleAs: "text",
				sync: true,
				load: function(data){},
				error: function(error){}
			}
			// Call the asynchronous xhrGet
			var deferred = dojo.xhrGet(xhrArgs);
			var creturn = deferred.results;
			ccheck = creturn.toString();
			ccheck = ccheck.trim();
			if (typeof(nrow) == "undefined") {
				if (ccheck.substr(0, 1) == "{") {
					var creturn = creturn[0].replace(/[\n\r]*/g,'');
					var cmacro = "ret_obj = " + creturn;
					eval(cmacro);
					var n = ccheck.search("items");
					if (n > 0) {
						if (typeof(ret_obj.items[0]) == "undefined") {
						return "";}
						else {return ret_obj.items[0];}
					}
					else {return ret_obj;}
				}
				else {return ccheck.replace(",", "").trim();}
			} else {
				var nstart = ccheck.search("items");
				var nlen = ccheck.search("]");
				var creturn = ccheck.substr(nstart, nlen-nstart+1);
				return eval(creturn);
			}
		});
	});
}
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//// แสดงกราฟ ส่งค่า DataList, Field ค่าที่จะแสดง, ชื่อ div ที่จะแสดงกราฟ, ประเภทของกราฟ, interval major and interval minor, Field ที่จะเป็น Label ถ้าไม่ระบุจะใช้ Field ชื่อ label
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function graph(clistobj, cvalfield, cdiv, ctype, nstep1, nstep2, clabel) {
	if (nstep1 == undefined) {nstep1 = 10};
	if (nstep2 == undefined) {nstep2 = 1};
	require([
 	"dojo/ready",
 	"dijit/registry",
 	"dojo/dom",
    "dojox/charting/Chart",
    "dojox/charting/axis2d/Default",
    "dojox/charting/plot2d/Lines",	
    "dojox/charting/plot2d/StackedColumns",	
	"dojox/charting/plot2d/Grid",
	"dojox/charting/plot2d/Pie",
	"dojox/charting/action2d/Tooltip",
	"dojox/charting/Chart2D",
	"dojox/charting/themes/Chris",
	"dojox/charting/action2d/MoveSlice",
	"dojox/charting/action2d/Highlight"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg, dom, Chart, Axis, Lines, Columns, Grid, Pie, Tooltip, Chart2D, MiamiNice, MoveSlice, Highlight){
		ready(function(){
			var dc = dojox.charting;
			var list_obj = reg.byId(clistobj);
			var item = list_obj.getChildren();
		   	var item_list = [];
		   	var item_label = [];
		   	var item_cnt = item.length;
			for (i = 0; i < item_cnt; i++)
			{
				var glabel = item[i].label;
				if (clabel != undefined) {
					var cmacro = "glabel = item[i]." + clabel;
					eval(cmacro);
				}
				item_list[i] = {y: parseFloat(item[i][cvalfield]), text: glabel, tooltip: glabel + "=" + parseFloat(item[i][cvalfield])};
				item_label[i] = {value: i, text: glabel};
			}
			var x_chart = Chart(dom.byId(cdiv));
			x_chart.destroy();
			var x_chart = Chart(dom.byId(cdiv)).setTheme(dc.themes.Chris).
		        addAxis("x", { fixLower: "minor", fixUpper: "minor", natural: true, majorTickStep: nstep1, minorTickStep: nstep2, labels: item_label }).
		        addAxis("y", { vertical: true, fixLower: "major", fixUpper: "major", includeZero: true }).
		        addPlot("default", { type: ctype }).
		        addPlot("grid", { type: Grid, renderOnAxis: false, majorVLine: { color: "black", width: 1 }, majorHLine: { color: "black", width: 1 } }).
				addSeries("Series A", item_list, {stroke: {color: "blue", width: 3}});
		    var anim_a = new dc.action2d.MoveSlice(x_chart, "default");
		    var anim_b = new dc.action2d.Tooltip(x_chart, "default");
		    var anim_c = new dc.action2d.Highlight(x_chart, "default");
		    x_chart.render();
		});
	});
}

// Function สำหรับ Save to mySQL and Run ccode เพื่อ update ข้อมูลใน List กรณีมีการคำนวณ เปลี่ยนค่า ////////////////////
function mysave(cphp, ccode) {
	require([
 	"dojo/_base/xhr"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(xhr){
		xhr.get({
			url: ip_address + cphp,
			headers: { "X-Requested-With": null },
			content: {},
			load: function(result) {
				//alert (result);
				var cmacro = ccode;
				eval(cmacro);
			},
			error: function() {alert ("บันทึกข้อมูลไม่สำเร็จ !!!");}
		});
		
	});
}
////////////////////////////////////////////////////////
function ctot(cdate) {
	var lcdate = cdate.split(/\-|\s/);
    var ldReturn = new Date(lcdate.slice(0,3).join('/')+' '+lcdate[3]);
    if (ldReturn == "Invalid Date") {return "";}
    else {return ldReturn;}
}

///////////////////////////////////////////////////////

function sw_status(clist, cswitch) {
	var cmacro = "ctext = " + clist + ".children." + cswitch + ".innerHTML";
	eval(cmacro);
	var nposition = ctext.search("value=") + 6;
	var creturn0 = ctext.substr(nposition, 5).replace(/"/g, '').trim();
	var creturn = creturn0.replace(/>/g, '').trim();
	return creturn;
}


// Function สำหรับเพิ่ม switch ใน List โดยมี Parameter ชื่อ List, ID switch, ข้อความ Label, ค่าที่จะแสดง (0,1), text1, text2
// text1 และ text2 จะถูกเก็บไว้ในตัวแปรชื่อ var1 และ var2 เมื่อคลิกเลือก list จะสามารถนำค่า var1 และ var2 ไปใช้ได้ กรณีแทนค่าตัวแปร 

function sw2list(clist, cswitch, clabel, nvalue, ctext1, ctext2) {
	require([
 	"dojo/ready",
 	"dijit/registry"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg){
		ready(function() {
			var active_list = reg.byId(clist);
			var item = new dojox.mobile.ListItem({
			        id: cswitch,
			        label: clabel,
			        var1: ctext1,
			        var2: ctext2
			});
			var cmacro1 = "var " + cswitch + " = new dojox.mobile.Switch({class: 'mblSwRoundShape1 color1'})";
			eval(cmacro1);
//			var cmacro0 = cswitch + ".on('stageChange', function() {" + clist + ".click();})";
//			eval(cmacro0);
			var cmacro2 = cswitch + ".set('leftLabel', 'YES')";
			eval(cmacro2);
			var cmacro3 = cswitch + ".set('rightLabel', 'NO')";
			eval(cmacro3);
			if (nvalue == 1) {
				var cmacro4 = cswitch + ".set('value', 'on')";
				eval(cmacro4);}
			else {
				var cmacro5 = cswitch + ".set('value', 'off')";
				eval(cmacro5);}
			var cmacro6 = "item.addChild(" + cswitch + ")";
			eval(cmacro6);
			active_list.addChild(item);
		});
	});
}

// Read Text File
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    rawFile.send(null);
}
///////////////////////////////////////////////////////

// Function สำหรับ search_box ////////////////////
function txt_search(cbox, clist) {
	require([
 	"dojo/ready",
 	"dijit/registry",
 	"dojo/data/ItemFileReadStore",
 	"dojo/data/ItemFileWriteStore",
 	"dojo/on",
 	"dojo/_base/xhr"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg, ifrs, ifws, on, xhr){
		ready(function(){
			var search_box = reg.byId(cbox);
			var search_list = reg.byId(clist);

			// Click ที่ Box เพื่อค้นหา
			on(search_box, "click", function() {
				search_list.setQuery({label:"*"});
			});
			// Search Lab List
			on(search_box, "keyup", function() {
				lcsearchtext = search_box.get("value").trim().toUpperCase();
	    		search_list.setQuery({label:lcsearchtext + "*"});
			});
		});
	});
}

// Function สำหรับ search_box ////////////////////
function box_search(cbox, clist) {
	require([
 	"dojo/ready",
 	"dijit/registry",
 	"dojo/data/ItemFileReadStore",
 	"dojo/data/ItemFileWriteStore",
 	"dojo/on",
 	"dojo/_base/xhr"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg, ifrs, ifws, on, xhr){
		ready(function(){
			var search_box = reg.byId(cbox);
			var search_list = reg.byId(clist);

			// Click ที่ Box เพื่อค้นหา
			on(search_box, "click", function() {
				search_list.setQuery({label:"*"});
			});
			// Search Lab List
			on(search_box, "keyup", function() {
				lcsearchtext = search_box.get("value").trim().toUpperCase();
	    		search_list.setQuery({label:lcsearchtext + "*"});
			});
		});
	});
}

// Decode Password
function decode(ccode) {
	var pnumber = parseInt(ccode.substr(0, 1));
	var lnLength = ccode.length;
	var psw = '';
	for (lnCnt = 1;  lnCnt <= lnLength -1; lnCnt++)
		{psw = psw + String.fromCharCode(ccode.charCodeAt(lnCnt) - 17 - pnumber - lnCnt - 1);}
	// All Upper Case
	return psw
}
///////////////////////////////////////////////////////
// Function สำหรับ Back list /////////////////////////////
// clist = EdgetoEdgeDataList ที่ต้องการรกดปุ่ม Back
// cback = Label ที่ต้องการในปุ่ม <
// cnext = Header ที่ต้องการของ List ข้อมูล ที่อยู่ด้านล่าง 
// cfrom = View ปัจจุบัน
// cto = View ที่ต้องการย้อนไป
// cval = ค่าที่ระบุกรณีต้องการเปลี่ยนแปลง view เป้าหมายให้แตกต่างกัน
//////////////////////////////////////////////////////
function back_list(clist, cback, cnext, cfrom, cto, cval) {
	require([
 	"dojo/ready",
 	"dijit/registry",
 	"dojo/data/ItemFileReadStore",
 	"dojo/data/ItemFileWriteStore",
 	"dojo/on",
 	"dojo/_base/xhr"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg, ifrs, ifws, on, xhr){
		ready(function() {
			if (cval == undefined) {cval = "1";}
			var back_list = reg.byId(clist);
			var back_store = new ifws({data:{items:[]}});
			back_list.store = null;
			back_list.setStore(back_store);
			var list_add = back_list.store.newItem({label: "<", rightText: cback, value : cval});
			var list_add = back_list.store.newItem({label: cnext, value : "2", header : true, clickable: false});
			var vfrom = reg.byId(cfrom);
			on(back_list, "click", function () {
				var obj = selected_row(clist);
				var lcselect = obj.value;
				if (lcselect == cval) {
					vfrom.performTransition(cto, -1, "slide", null);
				}
			});
		});
	});
}
///////////////////////////////////////////////////////////
// Back (Parameter ชื่อปุ่ม Back, ชื่อ View ต้นทาง, ชื่อ View ปลายทาง, ชื่อ List ที่ต้องการ clear selection)
///////////////////////////////////////////////////////////
function back(cbtn, cfrom, cto, cclear) {
	require([
 	"dojo/ready",
 	"dijit/registry",
 	"dojo/on"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg, on){
		ready(function() {
			var back_btn = reg.byId(cbtn);
			cmacro = "var " + cfrom + " = reg.byId('" + cfrom + "')";
			eval(cmacro);
			cmacro = "var " + cto + " = reg.byId('" + cto + "')";
			eval(cmacro);
			var isback = back_btn.get("focused");
			if (isback == true) {
				if (cclear != undefined) {selected_clear(cclear);}
				cmacro = cfrom + ".performTransition('" + cto + "', -1, 'slide', null)";
				eval(cmacro);
			}
		});
	});
}
////////////////////////////////////////////////////////
//// Function สร้าง Dialog รับค่า Parameters ccaption=หัวช้อ, ccode=คำสั่งที่ต้องการให้ run เมื่อกดปุ่ม OK, cvar1=ตัวแปร 1, ctype1=ประเภทตัวแปร C/N/D/T, clabel1=label ของตัวแปร 1
////////////////////////////////////////////////////////
function dialog(ccaption, ccode, cvar1, ctype1, clabel1, cvar2, ctype2, clabel2, cvar3, ctype3, clabel3, cvar4, ctype4, clabel4, 
				cvar5, ctype5, clabel5, cvar6, ctype6, clabel6, cvar7, ctype7, clabel7, cvar8, ctype8, clabel8) {
	ccode = ccode.trim();
	require([
 	"dojo/ready",
 	"dijit/registry",
 	"dijit/Dialog",
   	"dijit/form/TextBox",
	"dijit/form/Textarea",
   	"dijit/form/Button",
	"dijit/form/DateTextBox", 
    "dijit/form/TimeTextBox",
 	"dojo/on"
 	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ ตั้งชื่อใหม่ได้
	 ], function(ready, reg, Dialog, TextBox, Textarea, Button, DateTextBox, TimeTextBox, on){
		ready(function() {
			// สร้าง Diaqlog
			var myDialog = new Dialog({
		        title: ccaption,
		        content: "",
		        style: "width: 85%"
		    })
		    // สร้าง Content Pane
		    var contentPane = dojo.create("div", {
		        class: "dijitDialogPaneContentArea", width: "100%", height: "auto"
			    }, myDialog.containerNode);
		    
			// Variable 1 //////////////////////////////////////////////////////////////
			if (cvar1 != "" && cvar1 != undefined) {
				if (ctype1.trim().toUpperCase() == "D") {
					var box1 = new DateTextBox({placeHolder: clabel1}).placeAt(contentPane);
				} else if (ctype1.trim().toUpperCase() == "T") {
					var box1 = new TimeTextBox({placeHolder: clabel1}).placeAt(contentPane);
				} else {
					var calert = ccode.substr(0, 5);
					if(calert.toUpperCase()=="ALERT") {
						ccode = ccode.substr(5);
						var box1 = new Textarea({placeHolder: clabel1}).placeAt(contentPane);
						box1.domNode.style.border = "none";
						box1.domNode.style.fontSize = "20px";
						box1.set("displayedValue", clabel1);
						box1.set("disabled", true);
						box1.textbox.style.color = "Blue";
						box1.textbox.style.textAlign="center";
					} else {
						var box1 = new TextBox({placeHolder: clabel1}).placeAt(contentPane);
					}
				}
				box1.domNode.style.width = "100%";
			}
			////////////////////////////////////////////////////////////////////////////
			// Variable 2 //////////////////////////////////////////////////////////////
			if (cvar2 != "" && cvar2 != undefined) {
				if (ctype2.trim().toUpperCase() == "D") {
					var box2 = new DateTextBox({placeHolder: clabel2}).placeAt(contentPane);
				} else if (ctype2.trim().toUpperCase() == "T") {
					var box2 = new TimeTextBox({placeHolder: clabel2}).placeAt(contentPane);
				} else {
					var box2 = new TextBox({placeHolder: clabel2}).placeAt(contentPane);
				}
				box2.domNode.style.width = "100%";
			}
			////////////////////////////////////////////////////////////////////////////
		    // Variable 3 //////////////////////////////////////////////////////////////
			if (cvar3 != "" && cvar3 != undefined) {
				if (ctype3.trim().toUpperCase() == "D") {
					var box3 = new DateTextBox({placeHolder: clabel3}).placeAt(contentPane);
				} else if (ctype3.trim().toUpperCase() == "T") {
					var box3 = new TimeTextBox({placeHolder: clabel3}).placeAt(contentPane);
				} else {
					var box3 = new TextBox({placeHolder: clabel3}).placeAt(contentPane);
				}
				box3.domNode.style.width = "100%";
			}
			////////////////////////////////////////////////////////////////////////////
			// Variable 4 //////////////////////////////////////////////////////////////
			if (cvar4 != "" && cvar4 != undefined) {
				if (ctype4.trim().toUpperCase() == "D") {
					var box4 = new DateTextBox({placeHolder: clabel4}).placeAt(contentPane);
				} else if (ctype4.trim().toUpperCase() == "T") {
					var box4 = new TimeTextBox({placeHolder: clabel4}).placeAt(contentPane);
				} else {
					var box4 = new TextBox({placeHolder: clabel4}).placeAt(contentPane);
				}
				box4.domNode.style.width = "100%";
			}
			////////////////////////////////////////////////////////////////////////////
			// Variable 5 //////////////////////////////////////////////////////////////
			if (cvar5 != "" && cvar5 != undefined) {
				if (ctype5.trim().toUpperCase() == "D") {
					var box5 = new DateTextBox({placeHolder: clabel5}).placeAt(contentPane);
				} else if (ctype5.trim().toUpperCase() == "T") {
					var box5 = new TimeTextBox({placeHolder: clabel5}).placeAt(contentPane);
				} else {
					var box5 = new TextBox({placeHolder: clabel5}).placeAt(contentPane);
				}
				box5.domNode.style.width = "100%";
			}
			////////////////////////////////////////////////////////////////////////////
			// Variable 6 //////////////////////////////////////////////////////////////
			if (cvar6 != "" && cvar6 != undefined) {
				if (ctype6.trim().toUpperCase() == "D") {
					var box6 = new DateTextBox({placeHolder: clabel6}).placeAt(contentPane);
				} else if (ctype6.trim().toUpperCase() == "T") {
					var box6 = new TimeTextBox({placeHolder: clabel6}).placeAt(contentPane);
				} else {
					var box6 = new TextBox({placeHolder: clabel6}).placeAt(contentPane);
				}
				box6.domNode.style.width = "100%";
			}
			////////////////////////////////////////////////////////////////////////////
			// Variable 7 //////////////////////////////////////////////////////////////
			if (cvar7 != "" && cvar7 != undefined) {
				if (ctype7.trim().toUpperCase() == "D") {
					var box7 = new DateTextBox({placeHolder: clabel7}).placeAt(contentPane);
				} else if (ctype7.trim().toUpperCase() == "T") {
					var box7 = new TimeTextBox({placeHolder: clabel7}).placeAt(contentPane);
				} else {
					var box7 = new TextBox({placeHolder: clabel7}).placeAt(contentPane);
				}
				box7.domNode.style.width = "100%";
			}
			////////////////////////////////////////////////////////////////////////////
			// Variable 8 //////////////////////////////////////////////////////////////
			if (cvar8 != "" && cvar8 != undefined) {
				if (ctype8.trim().toUpperCase() == "D") {
					var box8 = new DateTextBox({placeHolder: clabel8}).placeAt(contentPane);
				} else if (ctype8.trim().toUpperCase() == "T") {
					var box8 = new TimeTextBox({placeHolder: clabel8}).placeAt(contentPane);
				} else {
					var box8 = new TextBox({placeHolder: clabel8}).placeAt(contentPane);
				}
				box8.domNode.style.width = "100%";
			}
			////////////////////////////////////////////////////////////////////////////

			// สร้าง Action Pane   
			var actionBar = dojo.create("div", {
	        class: "dijitDialogPaneContentArea", width: "90%"
		    }, myDialog.domNode);
			// สร้างปุ่ม OK, Cancel
			var btn_ok = new Button({label: "OK"}).placeAt(actionBar);
			btn_ok.containerNode.style.width = "100px";
			
		    var btn_cancel = new Button({label: "Cancel"}).placeAt(actionBar);
			btn_cancel.containerNode.style.width = "100px";
			btn_cancel.domNode.style.float = "right";

			//alert("OK");
			//debugger;
			
			myDialog.autofocus = false;
			btn_ok.focus(true);
		    myDialog.show();
	
		    on(btn_ok, "click", function() {
				// var1
				if (cvar1 != "" && cvar1!= undefined) {
					if (ctype1.trim().toUpperCase() == "D") {
						var ddate0 = new Date(box1.get("value"));
						var cdate = "'" + ddate0.getFullYear().toString() + "-" + (ddate0.getMonth()+1).toString() + "-" + ddate0.getDate().toString() + "'"
						var cmacro = cvar1 + "=" + cdate;
					} else if (ctype1.trim().toUpperCase() == "T") {
						var ddate0 = new Date(box1.get("value"));
						var cdate = "'" + ddate0.getHours().toString() + ":" + ddate0.getMinutes().toString() + "'"
						var cmacro = cvar1 + "=" + cdate;
					} else {
						var cmacro = cvar1 + "='" + box1.get("value") + "'";
					}
					eval(cmacro);
				}
				// var2
				if (cvar2 != "" && cvar2 != undefined) {
					if (ctype2.trim().toUpperCase() == "D") {
						var ddate0 = new Date(box2.get("value"));
						var cdate = "'" + ddate0.getFullYear().toString() + "-" + (ddate0.getMonth()+1).toString() + "-" + ddate0.getDate().toString() + "'"
						var cmacro = cvar2 + "=" + cdate;
					} else if (ctype2.trim().toUpperCase() == "T") {
						var ddate0 = new Date(box2.get("value"));
						var cdate = "'" + ddate0.getHours().toString() + ":" + ddate0.getMinutes().toString() + "'"
						var cmacro = cvar2 + "=" + cdate;
					} else {
						var cmacro = cvar2 + "='" + box2.get("value") + "'";
					}
					eval(cmacro);
				}
				// var3
				if (cvar3 != "" && cvar3 != undefined) {
					if (ctype3.trim().toUpperCase() == "D") {
						var ddate0 = new Date(box3.get("value"));
						var cdate = "'" + ddate0.getFullYear().toString() + "-" + (ddate0.getMonth()+1).toString() + "-" + ddate0.getDate().toString() + "'"
						var cmacro = cvar3 + "=" + cdate;
					} else if (ctype3.trim().toUpperCase() == "T") {
						var ddate0 = new Date(box3.get("value"));
						var cdate = "'" + ddate0.getHours().toString() + ":" + ddate0.getMinutes().toString() + "'"
						var cmacro = cvar3 + "=" + cdate;
					} else {
						var cmacro = cvar3 + "='" + box3.get("value") + "'";
					}
					eval(cmacro);
				}
				// var4
				if (cvar4 != "" && cvar4 != undefined) {
					if (ctype4.trim().toUpperCase() == "D") {
						var ddate0 = new Date(box4.get("value"));
						var cdate = "'" + ddate0.getFullYear().toString() + "-" + (ddate0.getMonth()+1).toString() + "-" + ddate0.getDate().toString() + "'"
						var cmacro = cvar4 + "=" + cdate;
					} else if (ctype4.trim().toUpperCase() == "T") {
						var ddate0 = new Date(box4.get("value"));
						var cdate = "'" + ddate0.getHours().toString() + ":" + ddate0.getMinutes().toString() + "'"
						var cmacro = cvar4 + "=" + cdate;
					} else {
						var cmacro = cvar4 + "='" + box4.get("value") + "'";
					}
					eval(cmacro);
				}
				// var5
				if (cvar5 != "" && cvar5 != undefined) {
					if (ctype5.trim().toUpperCase() == "D") {
						var ddate0 = new Date(box5.get("value"));
						var cdate = "'" + ddate0.getFullYear().toString() + "-" + (ddate0.getMonth()+1).toString() + "-" + ddate0.getDate().toString() + "'"
						var cmacro = cvar5 + "=" + cdate;
					} else if (ctype5.trim().toUpperCase() == "T") {
						var ddate0 = new Date(box5.get("value"));
						var cdate = "'" + ddate0.getHours().toString() + ":" + ddate0.getMinutes().toString() + "'"
						var cmacro = cvar5 + "=" + cdate;
					} else {
						var cmacro = cvar5 + "='" + box5.get("value") + "'";
					}
					eval(cmacro);
				}
				// var6
				if (cvar6 != "" && cvar6 != undefined) {
					if (ctype6.trim().toUpperCase() == "D") {
						var ddate0 = new Date(box6.get("value"));
						var cdate = "'" + ddate0.getFullYear().toString() + "-" + (ddate0.getMonth()+1).toString() + "-" + ddate0.getDate().toString() + "'"
						var cmacro = cvar6 + "=" + cdate;
					} else if (ctype6.trim().toUpperCase() == "T") {
						var ddate0 = new Date(box6.get("value"));
						var cdate = "'" + ddate0.getHours().toString() + ":" + ddate0.getMinutes().toString() + "'"
						var cmacro = cvar6 + "=" + cdate;
					} else {
						var cmacro = cvar6 + "='" + box6.get("value") + "'";
					}
					eval(cmacro);
				}
				// var7
				if (cvar7 != "" && cvar7 != undefined) {
					if (ctype7.trim().toUpperCase() == "D") {
						var ddate0 = new Date(box7.get("value"));
						var cdate = "'" + ddate0.getFullYear().toString() + "-" + (ddate0.getMonth()+1).toString() + "-" + ddate0.getDate().toString() + "'"
						var cmacro = cvar7 + "=" + cdate;
					} else if (ctype7.trim().toUpperCase() == "T") {
						var ddate0 = new Date(box7.get("value"));
						var cdate = "'" + ddate0.getHours().toString() + ":" + ddate0.getMinutes().toString() + "'"
						var cmacro = cvar7 + "=" + cdate;
					} else {
						var cmacro = cvar7 + "='" + box7.get("value") + "'";
					}
					eval(cmacro);
				}
				// var8
				if (cvar8 != "" && cvar8 != undefined) {
					if (ctype8.trim().toUpperCase() == "D") {
						var ddate0 = new Date(box8.get("value"));
						var cdate = "'" + ddate0.getFullYear().toString() + "-" + (ddate0.getMonth()+1).toString() + "-" + ddate0.getDate().toString() + "'"
						var cmacro = cvar8 + "=" + cdate;
					} else if (ctype8.trim().toUpperCase() == "T") {
						var ddate0 = new Date(box8.get("value"));
						var cdate = "'" + ddate0.getHours().toString() + ":" + ddate0.getMinutes().toString() + "'"
						var cmacro = cvar8 + "=" + cdate;
					} else {
						var cmacro = cvar8 + "='" + box8.get("value") + "'";
					}
					eval(cmacro);
				}

				eval(ccode);
		    	myDialog.hide();
		    });
			
		    on(btn_cancel, "click", function() {
		    	myDialog.hide();
		    });
		});
	});
}