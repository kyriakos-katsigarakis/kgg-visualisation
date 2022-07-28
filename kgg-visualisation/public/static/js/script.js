$(document).ready(function(){

	$("#btn_top_login").click(function(){
		location.href = '/user/login';
	});
	
	$("#btn_top_signup").click(function(){
		location.href = '/user/signup';
	});
	
	$("#btn_frm_login").click(function(){
		$("#frm_login").submit();	
	});

	$("#btn_frm_signup").click(function(){
		$("#frm_signup").submit();	
	});
	
	$("#btn-user-edit").click(function(){
		location.href = '/user/edit';
	});
	
	$('#tbl_zone tr').click(function() {
        var href = $(this).find("a").attr("href");
        if(href){
            window.location = href;
        }
    });

	$(document).on("change","select[name='project']", function() {
		var projectId = this.value;
		$.get('/project/' + projectId + '/enable', function(){
			location.href = '/project/' + projectId + '/page';
		});
	});
	
	$('a[href="#sync"]').click(function() {
		console.log('trigger sync');
		$.get('/sync', function() {
			notify("","Sync has been completed succesfully","","success");
		});
	});

	function notify(title, message, icon, type) {
        $.notify({
            icon: icon,
            title: title,
            message: message,
            url: ''
        	},{
            element: 'body',
            type: type,
            allow_dismiss: true,
            placement:{
            },
            offset:{
                x: 15,
                y: 15
            },
            spacing: 10,
            z_index: 1031,
            delay: 3500,
            timer: 1000,
            url_target: '_blank',
            mouse_over: false,
            animate:{
            },
            template: '<div data-notify="container" class="alert alert-dismissible alert-{0} alert--notify" role="alert">' +
                      '<span data-notify="icon"></span> ' +
                      '<span data-notify="title">{1}</span> ' +
                      '<span data-notify="message">{2}</span>' +
                      '<div class="progress" data-notify="progressbar">' +
                      '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width:0%;"></div>' +
                      '</div><a href="{3}" target="{4}" data-notify="url"></a>' +
                      '<button type="button" aria-hidden="true" data-notify="dismiss" class="alert--notify__close">Close</button>' +
                      '</div>'
        });
	}

});