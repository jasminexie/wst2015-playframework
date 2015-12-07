$("#form").keyup(function (e) {
      if (e.keyCode == 13) {
        var name = $("#name").val();
        var age = $("#age").val();
        var email = $("#email").val();
        var gender = $("input[name='gender']:checked").val();

        if (age&&name&&gender&&email) {
          send();
        }
      }
    });
    
		
		function send(){
			
			$("#submit").attr("disabled", true);
			$("#reset").attr("disabled", true);
			$("#error").css("display", "none");
			$("#success").css("display", "none");
			$("#info").css("display", "block");
			$("#info").html("Submitting, please wait...");
			
			var name = $("#name").val();
			var age = $("#age").val();
			var email = $("#email").val();
			var gender = $("input[name='gender']:checked").val();
			
//			alert(name + gender + email + age);
			
			if (name.length < 1 || age.length < 1 ||email.length < 1 || !gender){
  			error_msg("No field can be empty!")
				return false;
			};
			if (name.length > 30 || email.length > 50) {
  			error_msg("Name and/or email length exceeds server limit.")
				return false;
			};
			if (!/^[a-z0-9A-Z_.]+@[a-z0-9A-Z._\-]+\.[a-zA-Z]+$/.test(email)) {
  			error_msg("Invalid email format.")
				return false;
			};
			if (!/^\d{1,2}$/.test(age)) {
  			error_msg("Please input an age within the range 0~99.")
				return false;
			};
			if (/\d|<|>|\//.test(name)) {
  			//error_msg("Your name must not consist of numbers or HTML tag characters.")
				//return false;
			};
			
			
			
			$.ajax({ url:"http://162.105.146.180:8122/homework/hw4/gateway.php?action=addguest", type:"POST", dataType:"json", data:{
				name:name, age:age, gender:gender, email:email
			}, success: function(data){
				if(data.code != -1){
					$("#info").css("display", "none");
					$("#error").css("display", "none");
          $("#success").css("display", "block");
          $("#success").html("Your information has been saved. Thank you! The Big Green Snake lovesssssss you <3 Please scroll down to the end of the page and choose parties to attend.");
          $("#submit").removeAttr("disabled");
          $("#reset").removeAttr("disabled");
          reset();
				} else {
					error_msg(data.msg);
					reset();
					return false;
				}
			}, error: function(){
				error_msg("Error. Please check your internet connection.");
				return false;
			}})
			return true;
		}
		
		function error_msg(msg) {
  		$("#info").css("display", "none");
      $("#error").css("display", "block");
      $("#error").html(msg);
      $("#submit").removeAttr("disabled");
      $("#reset").removeAttr("disabled");
		}
		
		function reset() {
  		$(':input')
  		.not(':button, :submit, :reset, :hidden, :radio')
  		.val(''); 
  		$('input[type=radio]').removeAttr('checked');
		}
		