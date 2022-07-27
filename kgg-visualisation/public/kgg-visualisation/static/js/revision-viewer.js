$(document).ready(function() {

	$('.treeview_container').hide();
	$('.mvd_container').hide();
	$('.ged_container').hide();
	$('.info_container').hide();

	load_controls();
	
	function load_controls() {
    	var table = "<div class='btn-group btn-group-toggle' data-toggle='buttons'>"
			      + "<button id='viewer-home' class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Default Camera Position'><span class='material-icons mt-1'>view_in_ar</span></button>"
    			  + "<label class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Prespective/Orthographic' ><input id='viewer-orthographic' type='checkbox' autocomplete='off'><span class='material-icons mt-1'>videocam</span></label>"
    			  + "<label class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Model Explorer'><input id='viewer-tree' type='checkbox' autocomplete='off'><span class='material-icons mt-1'>schema</span></label>"
    			  + "<label class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Geometry Checker'><input id='viewer-report-ged' type='checkbox' autocomplete='off'><span class='material-icons mt-1'>report_problem</span></label>"
    			  + "<label class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Completeness Checker'><input id='viewer-report-mvd' type='checkbox' autocomplete='off'><span class='material-icons mt-1'>summarize</span></label>"
    			  + "<label class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Geometry/Space Boundaries'><input id='viewer-sbd' type='checkbox' autocomplete='off'><span class='material-icons mt-1'>layers</span></label>"
    			  + "<button id='viewer-show-all' class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Show All'><span class='material-icons mt-1'>visibility</span></button>"
    			  + "<button id='viewer-hide-selected' class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Hide Selected Element'><span class='material-icons mt-1'>visibility_off</span></button>"
    			  + "<label class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Disable Non-Physical'><input id='viewer-hide-non-physical' type='checkbox' autocomplete='off'><span class='material-icons mt-1'>hide_source</span></label>"
    			  + "<label class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Selected Element Info'><input id='viewer-info' type='checkbox' autocomplete='off'><span class='material-icons mt-1'>info</span></label>"
    			  + "</div>";
    	$(".control").html(table);

    	if($('[data-toggle="tooltip"]')[0]) {
    		$('[data-toggle="tooltip"]').tooltip({
    		    trigger : 'hover'
    		});
    	}  	 	

		$("[id='viewer-hide-non-physical']").prop('checked', true);					
		$("[id='viewer-hide-non-physical']").parent().addClass("active");

		/* Default Camera Position */

		$(document).on('click',"button[id='viewer-home']", function() {
			$(this).button('toggle');		
			camera.eye = [0.0, -90.0, 20.0];
			camera.look = [0.0, 0.0, 3.0];
			camera.up = [0, 1, 0];
			cameraFlight.flyTo(model1);
		});

		/* Orthographic - Prespective */

		$(document).on('change',"[id='viewer-orthographic']", function() {
			if(camera !== null){			
				if($("[id='viewer-orthographic']:checked").val() == 'on'){
					camera.projection = "ortho";
				}else{
					camera.projection = "perspective";
				}
			}
		});
	
		/* Space Boundaries View */
		
		$(document).on('change',"[id='viewer-sbd']", function() {
			if(camera !== null) {
				var selected = $('.treeview').tree('isNodeSelected', node_project);
				if($("[id='viewer-sbd']:checked").val() == 'on') {								
					if(selected){
						hide(model1,node_project);
						show_sbd(model3,node_project);
					}else{						
						var nodeList = $('.treeview').tree('getSelectedNodes');
		 				for(var i=0;i<nodeList.length;i++){
							hide(model1,nodeList[i]);
							show_sbd(model3,nodeList[i]);
						}
					}
				}else{
					if(selected){
						hide_sbd(model3,node_project);
						show(model1,node_project);
					}else{	
						var nodeList = $('.treeview').tree('getSelectedNodes');
		 				for(var i=0;i<nodeList.length;i++){
							hide_sbd(model3,nodeList[i]);
							show(model1,nodeList[i]);
						}
					}
				}
			}
		});
	
		/* Navigation Panel */
	
		$(document).on('change',"[id='viewer-tree']", function() {
			if(camera !== null){			
				if($("[id='viewer-tree']:checked").val() == 'on'){
					$('.treeview_container').show();	
				}else{
					$('.treeview_container').hide();
				}
			}
		});
	
		/* GED Checking */
	
		$(document).on('change',"[id='viewer-report-ged']", function() {
			if(geddata != null) {
				$("[id='ged_cle_num']").text(geddata.clash);
				$("[id='ged_spe_num']").text(geddata.space);
				$("[id='ged_cne_num']").text(geddata.containment);			
			}
			if(camera !== null) {
				if($("[id='viewer-report-ged']:checked").val() == 'on') {
					$('.ged_container').show();	
				}else{
					$('.ged_container').hide();
				}
			}
		});
	
		/* MVD Checking */

		$(document).on('change',"[id='viewer-report-mvd']", function() {
			if(camera !== null){			
				if($("[id='viewer-report-mvd']:checked").val() == 'on'){
					$('.mvd_container').show();	
				}else{
					$('.mvd_container').hide();
				}
			}
		});
	
		/* Information */
	
		$(document).on('change',"[id='viewer-info']", function() {
			if(camera !== null){			
				if($("[id='viewer-info']:checked").val() == 'on'){
					$('.info_container').show();	
				}else{
					$('.info_container').hide();
				}
			}
		});
	
		/* Show All */
	
		$(document).on('click',"button[id='viewer-show-all']", function() {
			$(this).button('toggle');
			if($("[id='viewer-sbd']:checked").val() == 'on'){
				show_sbd(model3,node_project);
			}else{
				show(model1,node_project);
			}		
		});
		
		/* Hide Non-Physical Elements */
	
		$(document).on('change',"[id='viewer-hide-non-physical']", function() {
			if(camera !== null){			
				if($("[id='viewer-hide-non-physical']:checked").val() == 'on') {
					hide_non_physical = true;
					$("[id='viewer-sbd']").prop('checked', false);					
					$("[id='viewer-sbd']").parent().removeClass("active");
					//
					hide_sbd(model3,node_project);
					show(model1,node_project);
				}else{
					hide_non_physical = false;
					$("[id='viewer-sbd']").prop('checked', false);					
					$("[id='viewer-sbd']").parent().removeClass("active");
					//					
					hide_sbd(model3,node_project);
					show(model1,node_project);
				}
			}
		});
	
		/* Hide Selected Element */
	
		$(document).on('click',"button[id='viewer-hide-selected']", function() {
			$(this).button('toggle');
			if($("[id='viewer-sbd']:checked").val() == 'on'){
				var mesh = getSelected(model3);
				if(mesh != null){
					mesh.visible = false;
				}
			}else{
				var mesh = getSelected(model1);
				if(mesh != null){
					var id = mesh.id.substring(mesh.id.indexOf("#") + 1);
					var node = $('.treeview').tree('getNodeById', id);
					hide(model1,node);
					$('.treeview').tree('refresh');
				}
			}
		});
    }
	
	// ----
	
	$('.treeview').on('click','.edit', function(e) {
		var node_id = $(e.target).parent().data('node-id');	
		var node = $('.treeview').tree('getNodeById', node_id);
		if(node){
			if($('.treeview').tree('isNodeSelected', node)){
        		if($("[id='viewer-sbd']:checked").val() == 'on'){
        			hide_sbd(model3,node);
        		}else{
					hide(model1,node);
				}
    		}else{        		
        		if($("[id='viewer-sbd']:checked").val() == 'on'){
        			show_sbd(model3,node);
        		}else{
					show(model1,node);
				}
    		}
		}
	});

	$('.treeview').bind('tree.click', function(e) {
		
		e.preventDefault();
 		
 		unhighlight(model1);
 		unselect(model1);
 		
		var node = e.node;
		
		if(node.children.length > 0){
			highlight(node);
		}else{
			select(model1,node);
		}
    });
	
	// ----

	function highlight(node){
		if(node){
			if(node.children.length > 0){
				for(var i=0;i<node.children.length;i++){
	 				var child = node.children[i];
	 				if(child){
	 					var mesh = meshes['model1#' + child.id];	
	 					if(mesh){
	 						mesh.highlighted = true;
	 					}
	 					highlight(child);
					}
				}
			}else{	
				var mesh = meshes['model1#' + node.id];
	 			if(mesh){
	 				mesh.highlighted = true;
	 			}					
			}
		}
	}

    // ----

	function show_sbd(model,node){
		if(model != null){
			var meshes = model.meshes;
			if(node){
				$('.treeview').tree('addToSelection', node, false);
				if(node.children.length > 0){
					for(var i=0;i<node.children.length;i++){
		 				var child = node.children[i];
		 				if(child){
							var elementObj = elementMetaData[child.id];
							if(elementObj !== undefined){
								if('sb' in elementObj){
									var ar = elementObj.sb;
									if(ar instanceof Array){
		 								for(var j=0;j<ar.length;j++){
											var mesh = meshes[model.id + '#' + ar[j]];	
			 								if(mesh){
			 									mesh.visible = true;
			 								}
										}
									}
								}
							}
							show_sbd(model,child);
						}
					}
				}else{
					var elementObj = elementMetaData[node.id];
					if(elementObj !== undefined){
						if('sb' in elementObj){
							var ar = elementObj.sb;
		 					if(ar instanceof Array){
								for(var j=0;j<ar.length;j++){
									var mesh = meshes[model.id + '#' + ar[j]];	
			 						if(mesh){
			 							mesh.visible = true;
			 						}
								}
							}
						}
					}
				}
			}
		}
	}

	function hide_sbd(model,node){
		if(model != null){
			var meshes = model.meshes;
			if(node){
				$('.treeview').tree('removeFromSelection', node);
				if(node.children.length > 0){
					for(var i=0;i<node.children.length;i++){
		 				var child = node.children[i];
		 				if(child){
							var elementObj = elementMetaData[child.id];
							if(elementObj !== undefined){
								if('sb' in elementObj){
									var ar = elementObj.sb;
									if(ar instanceof Array){
		 								for(var j=0;j<ar.length;j++){
											var mesh = meshes[model.id + '#' + ar[j]];	
			 								if(mesh){
			 									mesh.visible = false;
			 								}
										}
									}
								}
							}
							hide_sbd(model,child);
						}
					}
				}else{
					var elementObj = elementMetaData[node.id];
					if(elementObj !== undefined){
						if('sb' in elementObj){
							var ar = elementObj.sb;
		 					if(ar instanceof Array){
								for(var j=0;j<ar.length;j++){
									var mesh = meshes[model.id + '#' + ar[j]];	
			 						if(mesh){
			 							mesh.visible = false;
			 						}
								}
							}
						}
					}
				}
			}
		}
	}

	// ---- MVD

	$(document).on('change',"[name='report']", function() {
		var mvd = $("[name='report']:checked").val();
		hide(model1,node_project);
		hide_sbd(model3,node_project);
		if(mvd !== '') {
			$.getJSON('/file/' + mvd + '/download', function(data) {
			    mvddata = data;
			    for(var d of data) {
					for(var e of d.entities) {
						var node = $('.treeview').tree('getNodeById', e.global);
						if(!e.valid){
							show(model1, node);
						}
					}
				}
			});
		}
	});
	
	// ---- GED

	function ged_refresh(){
		var ged_cle = false;
		var ged_spe = false;
		var ged_cne = false;
		if($("[name='ged_cle']").length){
			if($("[name='ged_cle']:checked").val() == 'on'){
				ged_cle = true;	
			}
		}
		if($("[name='ged_spe']").length){
			if($("[name='ged_spe']:checked").val() == 'on'){
				ged_spe = true;	
			}		
		}
		if($("[name='ged_cne']").length){
			if($("[name='ged_cne']:checked").val() == 'on'){
				ged_cne = true;	
			}	
		}
		if(model2 != null){
			var meshes = model2.meshes;
			for (m in meshes) {
				var mesh = meshes[m];
				var obj = JSON.parse(mesh.id.substring(mesh.id.indexOf("#") + 1));
				if(obj.type == 'CLE_cl' && ged_cle){
					mesh.visible = true;		
				}else if(obj.type == 'SPE' && ged_spe){
					mesh.visible = true;
				}else if(obj.type == 'CNE' && ged_cne){
					mesh.visible = true;
				}else{
					mesh.visible = false;
				}
			}
		}
	}
		
	$(document).on('change',"[name='ged_cle']",function(){
		ged_refresh();			
	});
	
	$(document).on('change',"[name='ged_spe']",function(){
		ged_refresh();			
	});
	
	$(document).on('change',"[name='ged_cne']",function(){
		ged_refresh();			
	});

});