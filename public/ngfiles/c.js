
app.controller('cide',function($scope,$http,$interval,$q,ModalService,$rootScope,session,usercode){
	
	session.then(function(){
		$scope.show_input = false;
	$scope.show_error = false;
	$scope.show_loading_gif = false;
	var promise;
	var timeout_time = 5;
	var output_notify;
	var canceller = $q.defer();
	


	$scope.execute = function(data){
		if(data.content.trim()!=='') {
		$scope.show_loading_gif = true;
		$scope.show_error = false;
		output_notify = false;
		$http.post('/code',data)	
		.success(function(data){
			$scope.show_loading_gif = false;
			output_notify = true;
			if(data.err){
				$scope.show_error = true
				$scope.output = data.err
			}
			else{
				$scope.output = data.out_data
			}
		})

		promise = $interval(function(){
			if(output_notify == false){
				stop_notify()
			}
		}, timeout_time*1000);

		var stop_notify = function(){
			$interval.cancel(promise);
			$scope.show_error = false;
			$scope.show_loading_gif = false;
			$scope.output = 'error in output'
		}
		}
		else{
			alert("please enter something");
		}
	}


	$scope.show_input_box = function(){
		$scope.show_input = !$scope.show_input
		console.log($rootScope.currentUser)

	}

	$scope.reset = function(){

		$scope.code.content = '';
		$scope.code.data = '';
		$scope.output = '';
		$scope.show_error = false;
		$scope.show_loading_gif = false;
	}

	$scope.showLogin = function() {
        ModalService.showModal({
            templateUrl: 'modalLogin.html',
            controller: "loginController"
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
                
            });
        });
    };
	$scope.logout = function(){
		$http.post('/login/logout')
		.success(function(){
			$rootScope.currentUser = null;
			$location.url('/#/login')
		})
	}

	$scope.showSave = function() {
        ModalService.showModal({
            templateUrl: 'modalSave.html',
            controller: "saveController"
        }).then(function(modal) {
            modal.element.modal();
        });
    }
	
	$rootScope.savefile = function(name){
		var newUserCode = new usercode;
		newUserCode.userid= $rootScope.currentUser._id;
		newUserCode.name = name;
		newUserCode.content = $scope.code.content
		newUserCode.$save(function(data){
			$scope.files.unshift(data)
		})

	}

	if($rootScope.currentUser){
		$scope.files = usercode.query({userid:$rootScope.currentUser._id})
		console.log(typeof($scope.files))
	}
	
	$scope.delete_content = function(id,name,index){
		var r = confirm('Sure you want to delete '+name);
		if(r == true ){
			$scope.files.splice(index,1);
			usercode.delete({
				codeid:id
			},function(data){
				console.log(data)
			})
		}	
	}
	 
	$scope.open_in_window = function(data){
		$scope.code = {
			content : data,
			data:null
		}
	}

	 $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
       	extraKeys: {
        "F11": function(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc": function(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
      }
       
    };


  })
})


app.controller('loginController', function($scope, close) {
 	$scope.close = function(result) {
 		close(result, 500); // close, but give 500ms for bootstrap to animate
 	};
 

});

app.controller('saveController', function($scope, close,$rootScope) {
 	$scope.close = function(result) {
 		close(result, 500); // close, but give 500ms for bootstrap to animate
 	};
 	$scope.getname = function(){
 		$scope.close('Cancel');
 		$rootScope.savefile($scope.codename)
 		
 	}
});