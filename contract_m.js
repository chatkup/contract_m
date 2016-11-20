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
var reagent_id = 0;
var lmonth = "";

var getlogin = false;
var lfname = '';
var llname = '';
var lusername = '';
var lpassw = '';
var llevel = '';
var lchospn = '';



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
				list("view2_list", "show_contract.php?hosp_id=" + lchosp, "สัญญาทั้งหมด");
				list("view3_list", "contract_lists.php?hosp_id=" + lchosp, "เลือกสัญญาที่ต้องการบันทึกข้อมูล");
				list("view_user_list", "user_list.php");
				list("add_user_list", "hosp_list.php", "เลือกชื่อโรงพยาบาล");
				list("add_reagent_list", "show_reagent.php");
				list("hosp_contract_list", "show_hosp_contract.php");
				list("add_hosp_contract_list", "hosp_list.php");
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

		on(view_menu_title,"click",function(){
			getlogin=false;
			back("view_menu_logout","view_menu","view1");
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
		var view2_add = reg.byId("view2_add");

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
			c_start = tsdate(cd2obj.start_date);
			c_stop = tsdate(cd2obj.stop_date);
			n_vol = cd2obj.sum_vol;
			n_cost = cd2obj.sum_cost;
			var new_store = new ifws({ data: { items: [] } });
			view_contract_list.setStore(new_store);
			var List_add = view_contract_list.store.newItem({ label: "รายละเอียดสัญญา", header: true });
			var List_add = view_contract_list.store.newItem({ label: "รายละเอียด", value: "004", rightText: c_comment });
			var List_add = view_contract_list.store.newItem({ label: "เลขที่สัญญา", value: "001", rightText: c_no });
			var List_add = view_contract_list.store.newItem({ label: "วันเริ่มต้น", value: "002", rightText: c_start });
			var List_add = view_contract_list.store.newItem({ label: "วันสิ้นสุด", value: "003", rightText: c_stop });
			var List_add = view_contract_list.store.newItem({ label: "จำนวน", value: "005", rightText: n_vol + ' Test' });
			var List_add = view_contract_list.store.newItem({ label: "มูลค่า", value: "006", rightText: n_cost + ' บาท' });
			///แสดงยอดสั่งซื้อใน view_contract_list2
			list("view_contract_list2", "sum_by_reagent.php?hosp_id=" + lchosp + "&contract_id=" + lccontract_id, "มูลค่าซื้อแล้ว");
			view2.performTransition("view_contract", 1, "slide");
		});
		on(view2_title, "click", function () {
			back("view2_back", "view2", "view_menu");
		});
		on(view2_add, "click", function () {
			dialog("เพิ่มสัญญา", 'var csave="add_contract.php?contract_no="+lcontract_no+"&comment="+lcomment+"&sign_date="+lsign+"&start_date="+lstart+"&stop_date="+lstop+"&hosp_id="+lchosp;mysave(csave);list("view2_list", "show_contract.php?hosp_id=" + lchosp, "สัญญาทั้งหมด")', "lcontract_no", "C", "เลขที่สัญญา", "lcomment", "C", "รายละเอียดสัญญา", "lsign", "D", "วันเซ็นสัญญา", "lstart", "D", "วันเริ่มสัญญา", "lstop", "D", "วันสิ้นสุดสัญญา");
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
		var view_contract_list2 = reg.byId("view_contract_list2");

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
		//ถ้าคลิกแถว "จำนวนหรือมูลค่า" จะเข้าสู่หน้าเพิ่มน้ำยา รพ.ในสัญญา
		on(view_contract_list, "click", function () {
			var vobj = selected_row('view_contract_list');
			lrow = vobj.value;
			if (lrow == '005' || lrow == '006') {
				list("reagent_contract_list", "reagent_contract.php?contract_id=" + lccontract_id);
				view_contract.performTransition("reagent_contract", 1, "slide");
			}
		});
		// ถ้าคลิกแถว "รายละเอียด" จะเข้าสู่หน้าเพิ่มรายชื่อ รพ.ในสัญญา
		on(view_contract_list, "click", function () {
			var vobj = selected_row('view_contract_list');
			lrow = vobj.value;
			if (lrow == '004') {
				//view_contract.performTransition("add_reagent", 1, "slide");
				list("hosp_contract_list", "show_hosp_contract.php?contract_id=" + lccontract_id);
				view_contract.performTransition("hosp_contract", 1, "slide");
			}
		});

		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////
		//// add_reagent   /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var add_reagent = reg.byId("add_reagent");
		var add_reagent_title = reg.byId("add_reagent_title");
		var add_reagent_back = reg.byId("add_reagent_back");
		var add_reagent_list = reg.byId("add_reagent_list");
		var add_reagent_list2 = reg.byId("add_reagent_list2");
		var add_reagent_save = reg.byId("add_reagent_save");
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(add_reagent_title, "click", function () {
			back("add_reagent_back", "reagent_contract", "view_contract")
		});
		/// กดปุ่ม SAVE บันทึกรายการน้ำยา
		on(add_reagent_save, "click", function () {
			list2list("add_reagent_list", "add_reagent_list2", "label", "rightText", "reagent_id");

		});
		on(add_reagent_list2, "click", function () {
			var csel = selected_row("add_reagent_list2");
			reagent_id = csel.reagent_id;
			dialog('ใส่ข้อมูลจัดซื้อตามสัญญา', 'var csave = "add_contract_detail.php?contract_id=" + lccontract_id + "&reagent_id=" + reagent_id + "&vol=" + vol+ "&cost=" + cost + "&user_id=" + lnuser_id ;mysave(csave)', "vol", "N", "จำนวน Test", "cost", "N", "มูลค่า (บาท)");
		});

		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////
		//// reagent_contract   /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var reagent_contract = reg.byId("reagent_contract");
		var reagent_contract_back = reg.byId("reagent_contract_back");
		var reagent_contract_title = reg.byId("reagent_contract_title");
		var reagent_contract_list = reg.byId("reagent_contract_list");
		var reagent_contract_add = reg.byId("reagent_contract_add");

		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(reagent_contract_title, "click", function () {
			back("reagent_contract_back", "reagent_contract", "view_contract")
		});
		//คลิก เพิ่มรายการน้ำยาในสัญญา
		on(reagent_contract_add, "click", function () {
			reagent_contract.performTransition("add_reagent", 1, "slide");
		});

		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////
		//// hosp_contract   /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var hosp_contract = reg.byId("hosp_contract");
		var hosp_contract_back = reg.byId("hosp_contract_back");
		var hosp_contract_title = reg.byId("hosp_contract_title");
		var hosp_contract_list = reg.byId("hosp_contract_list");
		var hosp_contract_add = reg.byId("hosp_contract_add");

		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(hosp_contract_title, "click", function () {
			back("hosp_contract_back", "hosp_contract", "view_contract")
		});
		//คลิก เพิ่มรายการน้ำยาในสัญญา
		on(hosp_contract_add, "click", function () {
			hosp_contract.performTransition("add_hosp_contract", 1, "slide");
		});

		/////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////
		//// add_hosp_contract   /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var add_hosp_contract = reg.byId("add_hosp_contract");
		var add_hosp_contract_title = reg.byId("add_hosp_contract_title");
		var add_hosp_contract_back = reg.byId("add_hosp_contract_back");
		var add_hosp_contract_list = reg.byId("add_hosp_contract_list");
		var add_hosp_contract_list2 = reg.byId("add_hosp_contract_list2");
		var add_hosp_contract_save = reg.byId("add_hosp_contract_save");
		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(add_hosp_contract_title, "click", function () {
			back("add_hosp_contract_back", "add_hosp_contract", "view_contract")
		});
		/// กดปุ่ม SAVE บันทึกรายการน้ำยา
		on(add_hosp_contract_save, "click", function () {
			list2list("add_hosp_contract_list", "add_hosp_contract_list2", "label", "rightText", "hosp_id");

			var list0 = reg.byId(add_hosp_contract_list);
			obj0 = list0.getChildren();
			for (s = 0; s < obj0.length; s++) {
				if (obj0[s].checked == true) {
					var newhosp_id = obj0[s].hosp_id;
					var csave = "add_hosp_contract.php?contract_id=" + lccontract_id + "&hosp_id=" + newhosp_id;
					mysave(csave);
				}
			}

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
		var ldmonth = "";
		//////////////////
		//// Events //////
		//////////////////
		on(view3_list, "click", function () {
			var cobj = selected_row('view3_list');
			lccontract = cobj.contract_id
			list("view4_list", "reagent_lists.php?contract_id=" + lccontract, "แสดงรายการน้ำยาในสัญญา");
			dialog('เลือกเดือนที่จัดซื้อ', "", "lmonth", "D", 'เลือกเดือน');
			view3.performTransition("view4", 1, "slide");
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
			lccontract_id = cobj.contract_id;
			reagent_id = cobj.reagent_id;
			dialog('ใส่ข้อมูลจัดซื้อ', 'var csave = "add_purchase_detail.php?contract_id=" + lccontract_id + "&reagent_id=" + reagent_id + "&vol=" + vol+ "&cost=" + cost + "&lmonth=" + lmonth + "&user_id=" + lnuser_id + "&hosp_id=" + lchosp;mysave(csave)', "vol", "N", "จำนวน Test", "cost", "N", "ราคา");
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
			view_user.performTransition('add_user', 1, 'slide')
		});
		///////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////////////////////
		//// add_user  /////////////////
		///////////////////////////////
		//////////////////
		//// Register ////
		//////////////////
		var add_user = reg.byId("add_user");
		var add_user_title = reg.byId("add_user_title");
		var add_user_back = reg.byId("add_user_back");
		var add_user_list = reg.byId("add_user_list");


		//////////////////
		//// Function ////
		//////////////////

		//////////////////
		//// Variables ///
		//////////////////

		//////////////////
		//// Events //////
		//////////////////
		on(add_user_title, "click", function () {
			list("view_user_list", "user_list.php");
			back("add_user_back", "add_user", "view_user");
		});

		on(add_user_list, "click", function () {
			var uobj = selected_row('add_user_list');
			lchospn = uobj.hosp_id;
			dialog('เพิ่มผู้ใช้', 'var csave="add_user.php?fname="+lfname+"&lname="+llname+"&user_name="+lusername+"&password="+lpassw+"&level_id="+llevel+"&hosp_id="+lchospn;mysave(csave)', 'lfname', 'C', 'ชื่อ', 'llname', 'C', 'นามสกุล', 'lusername', 'C', 'User name', 'lpassw', 'C', 'รหัสผ่าน', 'llevel', 'N', 'ระดับ');
		});


		//////////////////////////////////////////////////////////////////////////////////////////////////////////
		//// ส่วนล่าง 2 บรรทัด ห้ามลบ ห้ามแก้ไข ///////////////////////////////////////////////////////////////////////
	});
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////