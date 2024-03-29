$(document).ready(function() {

	$('.treeview_container').hide();
	$('.info_container').hide();

	load_controls();
	
	function load_controls() {
    	
    	var table = "<div class='btn-group btn-group-toggle' data-toggle='buttons'>"
			      + "<button id='viewer-home' class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Default Camera Position'><span class='material-icons mt-1'>view_in_ar</span></button>"
    			  + "<label class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Prespective/Orthographic' ><input id='viewer-orthographic' type='checkbox' autocomplete='off'><span class='material-icons mt-1'>videocam</span></label>"
    			  + "<label class='btn btn-lg' data-toggle='tooltip' data-placement='top' title='Model Explorer'><input id='viewer-tree' type='checkbox' autocomplete='off'><span class='material-icons mt-1'>schema</span></label>"
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
			//cameraFlight.flyTo(model1);
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
			//if($("[id='viewer-sbd']:checked").val() == 'on'){
			//show_sbd(model3,node_project);
			//}else{
			//show(model1,node_project);
			//}		
		});
		
		/* Hide Non-Physical Elements */
	
		$(document).on('change',"[id='viewer-hide-non-physical']", function() {
			if(camera !== null){			
				if($("[id='viewer-hide-non-physical']:checked").val() == 'on') {
					hide_non_physical = true;
					//
					//hide_sbd(model3,node_project);
					//show(model1,node_project);
				}else{
					hide_non_physical = false;
					//$("[id='viewer-sbd']").prop('checked', false);					
					//$("[id='viewer-sbd']").parent().removeClass("active");
					//					
					//hide_sbd(model3,node_project);
					//show(model1,node_project);
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
				var mesh = null;//getSelected(model1);
				if(mesh != null){
					var id = mesh.id.substring(mesh.id.indexOf("#") + 1);
					var node = $('.treeview').tree('getNodeById', id);
					//hide(model1,node);
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
        		//if($("[id='viewer-sbd']:checked").val() == 'on'){
        		//	hide_sbd(model3,node);
        		//}else{
					//hide(model1,node);
				}
    		}else{        		
        		//if($("[id='viewer-sbd']:checked").val() == 'on'){
        		//	show_sbd(model3,node);
        		//}else{
					//show(model1,node);
				//}
    		}
		}
	});

	$('.treeview').bind('tree.click', function(e) {
		
		e.preventDefault();
 		
 		//unhighlight(model1);
 		//unselect(model1);
 		
		var node = e.node;
		
		if(node.children.length > 0){
			highlight(node);
		}else{
			//select(model1,node);
		}
    });
	
	// ----

	

  

	


});