(function(){
    var submit = document.getElementById('btnSubmit');
    var inputCnfrmPassword = document.getElementById('inputCnfrmPassword');
    var inputPassword = document.getElementById('inputPassword');
    var pwdCnfrmError = document.getElementById('pwdCnfrmError');
    var inputEmail = document.getElementById('inputEmail');
    var inputName = document.getElementById('inputName');
    var roleSelect = document.getElementById('roleSelect');
    var error = document.querySelector('.error');
    
    function onsubmit(event){
        if(!inputPassword.value || !inputCnfrmPassword.value || !inputEmail || !inputName.value|| !roleSelect.value){
            error.innerHTML = "All the details are required.";
            pwdCnfrmError.style.display = 'block';
            event.preventDefault();
        } else if(inputPassword.value !== inputCnfrmPassword.value){
            error.innerHTML = "Both passwords do not match.";
            pwdCnfrmError.style.display = 'block';
            event.preventDefault();
        }
    }

    function init(){
        submit.addEventListener('click', onsubmit);
    }

    init();
})();