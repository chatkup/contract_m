////////////////////////////////
//// Public Variables //////////
////////////////////////////////
//// ส่วนนี้ไม่ต้องแก้ไข ///////////////////////////////////////////////////////////////////////////////////
// parameter สำหรับ view select_dt / Text_input
var lddate = new Date();
var ltime = true;
var lcvar = "x";
// View ที่ต้องการกลับหลังเสร็จงาน
var gcsource_view = "main_view";
// กลับสู่ View ทันทีเมื่อทำการเลือกรายการ ไม่ต้องกดปุ่ม Back
var lautoback = false;
// ชื่อ field ที่ต้องการเก็บค่า code แทนข้อความ ถ้า lcfield = "" จะเก็บค่าเป็นข้อความ
var lcfield = "";
// Function ที่ต้องการ run เมื่อกลับสู่ gcsource_view
var gcfunction = "";
var lccontract = 0;
var lcuser = "";
var lcpassw = "";
var lchosp = "";
var lnuser_id = 0;
var ip_address = '';
var lccontract_id = '';
var ld1 = "";
var getlogin = false;
///////////////////////////////////////////////////////////////////////////////////////////////////////

/*
 * This file is provided for custom JavaScript logic that your HTML files might need.
 * Maqetta includes this JavaScript file by default within HTML pages authored in Maqetta.
 * ส่วนนี้ไม่ต้องแก้ไข เป็นการเรียก JavaScript มาตรฐานของ Maqetta มาใช้งานโดยอัตโนมัติ
 */

require([
	"dijit/PopupMenuBarItem",
	"dijit/MenuItem",
	"dijit/Menu",
	"dojox/mobile/_base",
	"dojox/mobile/Heading",
	"dojox/mobile/ToolBarButton",
	"dojox/mobile",
	"dojox/mobile/parser",
	"gridx/modules/VirtualVScroller",
	"dijit/layout/ContentPane",
	"dijit/form/Button",
	"dijit/form/ComboButton",
	"dojo/ready",
	"dojo/data/ItemFileWriteStore",
	"dojo/data/ItemFileReadStore",
	"dijit/registry",
	"dojo/on",
	"dojo/dom",
	"dojox/charting/Chart",
	"dojox/charting/axis2d/Default",
	"dojox/charting/plot2d/Lines",
	"dojox/charting/plot2d/StackedColumns",
	"dojox/charting/plot2d/Grid",
	"dojo/_base/xhr", // use xhr to make ajax call to remote server
		"dojo/CryptoJS"
	// ชื่อ Function ที่จะนำไปใช้ มาจาก Require เรียงตามลำดับ
], function (popup, mitem, menu, _base, heading, tool, mobile, parser, VirtualVScroller, pane, button, combobtn, ready, ifws, ifrs, reg, on, dom, Chart, Axis, Lines, Columns, Grid, xhr, Crypto) {
		ready(function () {
		///////////////////////////////
		//// User Defined Function ////
		///////////////////////////////

		///////////////////////////////////////////////////////////////////////////////////////////////////////	
		///////////////////////////////
		//// Loading Code /////////////
		///////////////////////////////


		///////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////
		//// Datetime    //////////////
		///////////////////////////////
		//// ส่วนนี้ไม่ต้องแก้ไข ใช้สำหรับ view ชื่อ select_dt เพื่อการกรอกข้อมูลที่เป็นวัน เวลา 						
		//// การใช้ view select_dt 																		
		//// 1. กำหนดค่า gcsource_view เพื่อให้ทราบว่า เมื่อระบุวัน เวลาแล้ว จะให้กลับไปที่ view ใด 					 
		//// 2. กำหนดค่า lcvar เพื่อระลุว่า ค่าวัน-เวลาที่เลือก จะถูกเก็บไว้ในตัวแปรชื่ออะไร
		//// 3. กำหนดค่า gcfunction กรณีที่ต้องการ run Function เมื่อเลือกวันเวลาเสร็จ										 
		//////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var select_dt = reg.byId("select_dt");
		var select_dt_title = reg.byId("select_dt_title");
		var back_select_dt = reg.byId("back_select_dt")
		var calendar1 = reg.byId("calendar1");
		calendar1.set("value", lddate);
		var show_dt = reg.byId("show_dt");
		var clear_dt = reg.byId("clear_dt");

		///////////////////
		//// Variables ////
		///////////////////
		var hr1 = reg.byId("hr1");
		var min1 = reg.byId("min1");
		var lnhr1 = 0;
		var lnmin1 = 0;
		lcvar = "purchase_date";
		gcsource_view = 'view3';

		//////////////////
		//// Events //////
		//////////////////

		on(select_dt, "beforeTransitionIn", function () {
			calendar1.set("value", lddate);
			lchour = lddate.getHours().toString();
			hr1.set("value", pad(lchour, "00"));
			lcmin = lddate.getMinutes().toString();
			min1.set("value", pad(lcmin, "00"));
			show_dt.set("label", tsdate(lddate, 1));
		});

		on(select_dt_title, "click", function () {
			var isback = back_select_dt.get("focused");
			if (isback == true) {
				var cmacro = lcvar + " = lddate";
				eval(cmacro);
				eval(gcfunction);
				select_dt.performTransition(gcsource_view, -1, "slide", null);
			}
			var isclear = clear_dt.get("focused");
			if (isclear == true) {
				lddate = "";
				hr1.set("value", "");
				min1.set("value", "");
				show_dt.set("label", tsdate(lddate));
				if (lautoback == true) {
					var cmacro = lcvar + " = lddate";
					eval(cmacro);
					eval(gcfunction);
					select_dt.performTransition(gcsource_view, -1, "slide", null);
				}
			}
		});

		on(calendar1, "change", function () {
			lnhr1 = lddate.getHours();
			lnmin1 = lddate.getMinutes();
			lddate = calendar1.get("value");
			lddate.setHours(lnhr1);
			lddate.setMinutes(lnmin1);
			show_dt.set("label", tsdate(lddate, 1));
			if (calendar1.hovering == true) {
				if (lautoback == true || ltime == false) {
					var cmacro = lcvar + " = lddate";
					eval(cmacro);
					eval(gcfunction);
					select_dt.performTransition(gcsource_view, -1, "slide", null);
				}
			}
		});

		on(hr1, "click", function () {
			hr1.domNode.selectionStart = 0;
			hr1.domNode.selectionEnd = 2;
		});

		on(min1, "click", function () {
			min1.domNode.selectionStart = 0;
			min1.domNode.selectionEnd = 2;
		});

		on(hr1, "keyup", function () {
			lnhr1 = hr1.get("value");
			if (lnhr1 > 23) {
				alert("ข้อมูลผิดพลาด !!!");
			}
			else {
				var lchr1 = lnhr1.toString();
				var lnlength = lchr1.length;
				if (lnlength == 2 || lchr1 > "2") {
					lddate.setHours(lnhr1);
					hr1.set("value", pad(lchr1, "00"));
					min1.focus(true);
					min1.domNode.selectionStart = 0;
					min1.domNode.selectionEnd = 2;
				}
			}
		});

		on(min1, "keyup", function () {
			lnmin1 = min1.get("value");
			if (lnmin1 > 59) {
				alert("ข้อมูลผิดพลาด !!!");
			}
			else {
				var lcmin1 = lnmin1.toString();
				var lnlength = lcmin1.length;
				if (lnlength == 2 || lcmin1 > "6" || lcmin1 == "6" && lnlength == 1) {
					lddate.setMinutes(lnmin1);
					min1.set("value", pad(lcmin1, "00"));

					if (lautoback == true) {
						var cmacro = lcvar + " = lddate";
						eval(cmacro);
						eval(gcfunction);
						select_dt.performTransition(gcsource_view, -1, "slide", null);
					} else { calendar1.focus(true); }
				}
			}
		});
		///////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////
		//// text_input    ////////////
		///////////////////////////////
		//// ส่วนนี้ไม่ต้องแก้ไข ใช้สำหรับ view ชื่อ Text_input เพื่อการกรอกข้อมูลที่เป็นข้อความ	
		//// การใช้ view Text_input															
		//// 1. กำหนดค่า gcsource_view เพื่อให้ทราบว่า เมื่อระบุข้อความแล้ว จะให้กลับไปที่ view ใด 
		//// 2. กำหนดค่า lcvar ว่าค่าข้อความที่เลือก จะให้เก็บไว้ในตัวแปรชื่ออะไร
		//// 3. กำหนดค่า lcfield คือค่า column ใน txt_list ที่ต้องการให้คืนค่าแทนข้อความที่เลือก ถ้า lcfiend = "" จะคืนค่าเป็นข้อความที่เลือกโดยตรง
		//// 4. กำหนดค่า gcfunction กรณีที่ต้องการ run Function หลังจากเลือกข้อความ
		//// 5. กำหนดค่า lautoback : true=คลิกเลือกข้อความแล้ว back กลับ gcsource_view เลย, 
		////						false=ต้องกดปุ่ม back ถึงจะกลับ gcsource_view							
		//////////////////////////////////////////////////////////////////////////////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var text_input = reg.byId("text_input");
		var txt_search = reg.byId("txt_search");
		var txt_list = reg.byId("txt_list");
		var txt_return = reg.byId("txt_return");
		var back_txt = reg.byId("back_txt");
		var txt_clear = reg.byId("txt_clear");
		var txt_title = reg.byId("txt_title");

		//////////////////
		//// Variables ///
		//////////////////
		var lcnewtxt = "";

		//////////////////
		//// Events //////
		//////////////////

		on(txt_search, "keyup", function () {
			lcsearchtext = txt_search.get("value").trim().toUpperCase();
			txt_list.setQuery({ label: lcsearchtext + "*" });
		});

		on(txt_title, "click", function () {
			var isdel = txt_clear.get("focused");
			if (isdel == true) { txt_return.set("value", ""); }

			var isback = back_txt.get("focused");
			if (isback == true) {
				if (lcfield == "") {
					lcnewtxt = txt_return.get("Value").trim();
					var cmacro = lcvar + "= '" + lcnewtxt + "'";
					eval(cmacro);
				}
				eval(gcfunction);
				lautoback = false;
				gcfunction = "";
				lcfield = "";
				txt_return.set("value", "");
				txt_search.set("value", "");
				text_input.performTransition(gcsource_view, -1, "slide", null);
			}
		});

		on(txt_list, "click", function () {
			lcnewtxt = "";
			var lcoldtxt = txt_return.get("value");
			var obj = selected_row("txt_list");
			// แทนค่าตัวแปรด้วย value ที่ได้จากการเลือก List
			if (lcoldtxt.trim() == "") { lcnewtxt = obj.label; }
			else { lcnewtxt = lcoldtxt + " " + obj.label; }
			txt_return.set("value", lcnewtxt);
			if (lcfield != "") { var cmacro = lcvar + "=" + "obj." + lcfield; }
			else { var cmacro = lcvar + "= '" + lcnewtxt + "'"; }
			eval(cmacro);
			if (lautoback == true) {
				if (lcfield == "") {
					lcnewtxt = txt_return.get("Value").trim();
					var cmacro = lcvar + "= '" + lcnewtxt + "'";
					eval(cmacro);
				}
				eval(gcfunction);
				lautoback = false;
				gcfunction = "";
				lcfield = "";
				txt_return.set("value", "");
				txt_search.set("value", "");
				text_input.performTransition(gcsource_view, -1, "slide", null);
			}
		});
		///////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////
		//// View Graph   /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view_graph = reg.byId("view_graph");
		var back_graph = reg.byId("back_graph");
		var graph_title = reg.byId("graph_title");
		var graph_box = reg.byId("graph_box");
		var clear_graph = reg.byId("clear_graph");
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(graph_title, "click", function () {
			back("back_graph", "view_graph", gcsource_view);
		});
		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		//// ส่วนนี้ เป็น code ที่ต้องเขียน เพื่อควบคุมการทำงานของ view ต่างๆ ใน Project //////////////////////////////////
		///////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////
		//// View 1   /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view1 = reg.byId("view1");
		var view1_title = reg.byId("view1_title");
		var view1_user = reg.byId("view1_user");
		var view1_passw = reg.byId("view1_passw");
		var view1_login = reg.byId("view1_login");

		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(view1_login, "click", function () {
			//เช็ค username,password
			lcuser = view1_user.get("value");
			lcpassw = view1_passw.get("value");

			// test encrypt

			//var encrypted = CryptoJS.AES.encrypt(lcpassw, "12345678");
			//var aaaa = CryptoJS.AES.encrypt(lcpassw, "12345677");
			//var decrypted = CryptoJS.AES.decrypt(encrypted, "12345678");
			//alert(encrypted);
			//alert(decrypted);
			///

			uobj = php2obj("login.php?lcuser=" + lcuser + "&lcpassw=" + lcpassw);
			if (uobj == undefined) {
				alert('Username หรือ Password ไม่ถูกต้อง');
			} else {
				lnuser_id = uobj.user_id;
				lchosp = uobj.hosp_id;
				var lcname = uobj.fname;
				getlogin = true;
				list("view2_list", "sum_buy.php?hosp_id=" + lchosp, "จำนวนและมูลค่าที่ซื้อแล้ว");
				list("view3_list", "contract_lists.php?hosp_id=" + lchosp, "เลือกสัญญาที่ต้องการบันทึกข้อมูล");
				list("view_user_list", "user_list.php");
				view1.performTransition("view_menu", 1, "slide");
			}
		});

		///////////////////////////////
		//// View_menu   /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view_menu = reg.byId("view_menu");
		var view_menu_title = reg.byId("view_menu_title");
		var view_menu_list = reg.byId("view_menu_list");
		var view_menu_list2 = reg.byId("view_menu_list2");
		var view_menu_right = reg.byId("view_menu_right");
		var view_menu_logout = reg.byId("view_menu_logout");

		var new_store = new ifws({ data: { items: [] } });
		view_menu_list.setStore(new_store);
		var menu = view_menu_list.store.newItem({ label: "เลือกการทำงาน", header: true });
		var menu = view_menu_list.store.newItem({ label: "ดูรายละเอียดสัญญา", value: "001", rightText: ">", icon: "../contract_m/pic/search.jpg" });
		var menu = view_menu_list.store.newItem({ label: "ลงข้อมูลจัดซื้อ", value: "002", rightText: ">", icon: "../contract_m/pic/dollar.jpg" });

		var new_store = new ifws({ data: { items: [] } });
		view_menu_list2.setStore(new_store);
		var menu2 = view_menu_list2.store.newItem({ label: "สำหรับผู้ดูแลระบบ", header: true });
		var menu2 = view_menu_list2.store.newItem({ label: "เพิ่มผู้ใช้งาน", value: "101", icon: "../contract_m/pic/person.jpg" });
		var menu2 = view_menu_list2.store.newItem({ label: "เพิ่มสัญญา", value: "102", icon: "../contract_m/pic/add.jpg" });
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(view_menu_list, "click", function () {
			newobj = selected_row(view_menu_list);
			var x = newobj.value;
			if (x == "001") {
				view_menu.performTransition("view2", 1, "slide");
			}
			if (x == "002") {
				view_menu.performTransition("view3", 1, "slide");
			}
		});
		on(view_menu_list2, "click", function () {
			newobj2 = selected_row(view_menu_list2);
			var y = newobj2.value;
			if (y == "101") {
				view_menu.performTransition("view_user", 1, "slide");
			}
		});

		on(view_menu_title, "click", function () {
			view_menu.performTransition("view2", 1, "slide");
		});

		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////
		//// View 2   /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view2 = reg.byId("view2");
		var back_view2 = reg.byId("back_view2");
		var view2_title = reg.byId("view2_title");
		var view2_list = reg.byId("view2_list");
		var view2_choose = reg.byId("view2_choose");
		var view2_back = reg.byId("view2_back");

		var new_store = new ifws({ data: { items: [] } });
		view2_choose.setStore(new_store);
		var List_choose = view2_choose.store.newItem({ label: "เลือก", header: true });
		var List_choose = view2_choose.store.newItem({ label: "ลงข้อมูลจัดซื้อ", value: '1', rightText: ">" });
		var List_choose = view2_choose.store.newItem({ label: "กราฟสรุป", value: '2', rightText: ">" });


		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(view2_title, "click", function () {
			back("back_view2", "view2", "view1");
		});
		on(view2_choose, "click", function () {
			var chooseobj = selected_row('view2_choose');
			lchoose = chooseobj.value;
			if (lchoose == 1) {
				view2.performTransition("view3", 1, "slide");
			} else if (lchoose == 2) {
				gcsource_view = "view2";
				graph("view2_list", "purchase_costs", "graph_box", "Columns");
				view2.performTransition("view_graph", 1, "slide");
			}
		});

		on(view2_list, "click", function () {
			var cdobj = selected_row('view2_list');
			lchosp = cdobj.hosp_id;
			lccontract_id = cdobj.contract_id;
			cd2obj = php2obj("contract_detail_lists.php?hosp_id=" + lchosp + "&contract_id=" + lccontract_id);
			var c_no = "";
			c_no = cd2obj.contract_no;
			c_comment = cd2obj.comment;
			c_start = cd2obj.start_date;
			c_stop = cd2obj.stop_date;
			var new_store = new ifws({ data: { items: [] } });
			view_contract_list.setStore(new_store);
			var List_add = view_contract_list.store.newItem({ label: "รายละเอียดสัญญา", header: true });
			var List_add = view_contract_list.store.newItem({ label: "รายละเอียด", value: "004", rightText: c_comment });
			var List_add = view_contract_list.store.newItem({ label: "เลขที่สัญญา", value: "001", rightText: c_no });
			var List_add = view_contract_list.store.newItem({ label: "วันเริ่มต้น", value: "002", rightText: c_start });
			var List_add = view_contract_list.store.newItem({ label: "วันสิ้นสุด", value: "003", rightText: c_stop });

			view2.performTransition("view_contract", 1, "slide");
		});
		on(view2_title, "click", function () {
			back("view2_back", "view2", "view_menu");
		});

		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////
		//// view-contract   /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view_contract = reg.byId("view_contract");
		var back_view_contract = reg.byId("back_view_contract");
		var view_contract_title = reg.byId("view_contract_title");
		var view_contract_list = reg.byId("view_contract_list");


		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(view_contract_title, "click", function () {
			back("back_view_contract", "view_contract", "view2");
		});


		///////////////////////////////
		//// View 3   /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view3 = reg.byId("view3");
		var view3_title = reg.byId("view3_title");
		var view3_list = reg.byId("view3_list");
		var back_view3 = reg.byId("back_view3");

		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(view3_list, "click", function () {
			var cobj = selected_row('view3_list');
			lccontract = cobj.contract_id
			list("view4_list", "reagent_lists.php?contract_id=" + lccontract, "แสดงรายการน้ำยาในสัญญา");
			gcsource_view = "view4";
			lcvar = 'ld1';
			ltime = false;
			view3.performTransition("select_dt", 1, "slide");
		});
		on(view3_title, "click", function () {
			back("back_view3", "view3", "view2");
		});

		///////////////////////////////
		//// View 4   /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view4 = reg.byId("view4");
		var view4_title = reg.byId("view4_title");
		var view4_list = reg.byId("view4_list");
		var back_view4 = reg.byId("back_view4");

		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(view4_list, "click", function () {
			var cobj = selected_row('view4_list');
			var contract_id = cobj.contract_id;
			var reagent_id = cobj.reagent_id;
			var vol = prompt("ระบุจำนวนซื้อ (Test)..");
			if (vol > 0) {
				var cost = prompt("ระบุมูลค่าซื้อ (บาท)...");
				if (cost <= 0) {
					alert("กรุณาระบุมูลค่าที่ซื้อ");
				} else {
					/////บันทึกข้อมูลการจัดซื้อ
					var csave = "add_purchase_detail.php?contract_id=" + contract_id + "&reagent_id=" + reagent_id + "&vol=" + vol
						+ "&cost=" + cost + "&ld1=" + lcd1 + "&user_id=" + lnuser_id + "&hosp_id=" + lchosp + "";
					mysave(csave);
				}
			} else {
				alert("กรุณาระบุจำนวนที่ซื้อ");
			}
			lcd1 = d2txt(ld1);



			//view4.performTransition("view2", 1, "slide");
		});
		on(view4_title, "click", function () {
			back("back_view4", "view4", "view3");
		});

		///////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////
		//// View_user  /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var view_user = reg.byId("view_user");
		var view_user_title = reg.byId("view_user_title");
		var view_user_back = reg.byId("view_user_back");
		var view_user_add = reg.byId("view_user_add");
		var view_user_list = reg.byId("view_user_list");


		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(view_user_title, "click", function () {
			back("view_user_back", "view_user", "view_menu");
		});
	//	on(view_user_list, "click", function () {
	//		alert("view_user");
	//		//view_user.performTransition("view_user_back", 1, "slide");
	//		//back("view_user_back", "view_user", "view_menu");
	//	});
			
			
		on(view_user_title, "click", function () {
			view_user.performTransition("add_user",1,"slide");
	});



		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		//// ส่วนล่าง 2 บรรทัด ห้ามลบ ห้ามแก้ไข ///////////////////////////////////////////////////////////////////////
	});
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////