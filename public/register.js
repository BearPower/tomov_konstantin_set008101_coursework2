var userName;
var firstName;
var lastName;
var email;
var password;
var passwordVal;
var testvar;



function getInfo(){
	
	//Validating the User Name
	
	userName=document.getElementById("UserName").value;
	testvar = userName.replace(/\s+ /g, '');
	if(testvar == ""){
		alert ("Sorry !\nMissing User Name.");
		return;
	}
	
	//Validating the first Name
	
		firstName=document.getElementById("FirstName").value;
	testvar = firstName.replace(/\s+ /g, '');
	if(testvar == ""){
		alert ("Sorry !\nMissing First Name.");
		return;
	}
	
	//Validating the Last Name
	
		lastName=document.getElementById("LastName").value;
	testvar = lastName.replace(/\s+ /g, '');
	if(testvar == ""){
		alert ("Sorry !\nMissing Last Name.");
		return;
	}
	
	//Validating the Email
	
		email=document.getElementById("Email").value;
	testvar = email.replace(/\s+ /g, '');
	if(testvar == ""){
		alert ("Sorry !\nMissing email.");
		return;
	}
	
	//Validating the Password
	
		password=document.getElementById("Password").value;
	testvar = password.replace(/\s+ /g, '');
	if(testvar == ""){
		alert ("Sorry !\nMissing password.");
		return;
	}
	
	//Validating the Pasword validation
	
		passwordVal=document.getElementById("PasswordV").value;
	testvar = passwordVal.replace(/\s+ /g, '');
	if(testvar == ""){
		alert ("Sorry !\nMissing Password Validation.");
		return;
	}
	//Validating the pasword
	if(password !=passwordVal)
	{
		alert ("Password dasn't match the Validation fuild.");
		return;
	}
	document.getElementById("registerForm").submit(function(){
		$(this).children('#ConfirmPassword').remove();
	});
}