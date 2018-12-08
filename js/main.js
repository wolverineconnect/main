// database config
var config = {
  apiKey: " ...",
  authDomain: " ... ",
  databaseURL: " ... ",
  projectId: " ... ",
  storageBucket: " ... ",
  messagingSenderId: " ... "
};
// init database
firebase.initializeApp(config);
// alphanumeric validator
function alphanumeric(inputtxt)
{
 var letterNumber = /^[0-9a-zA-Z]+$/;
 if (inputtxt.match(letterNumber)) {
   return true;
  }
else { 
   console.log('Invalid input.'); 
   return false; 
  }
}
// numeric validator
function numeric(inputtxt)
{
 var letterNumber = /^[0-9]+$/;
 if (inputtxt.match(letterNumber)) {
   return true;
  }
else { 
   console.log('Invalid input.'); 
   return false; 
  }
}
// date/time function
function getCurrentDateTime() {
  var currentdate = new Date();
  var datetime = currentdate.getFullYear() + "-"
                  + (currentdate.getMonth()+1)  + "-" 
                  + currentdate.getDate() + "-"  
                  + addZero(currentdate.getHours()) + ":"  
                  + addZero(currentdate.getMinutes()) + ":" 
                  + addZero(currentdate.getSeconds());
  return datetime;
  }
// sidenav toggles
var toggle = 0;
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    toggle = 1;
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    toggle = 0;
}
function toggleNav() {
  if (toggle == 0){
    openNav();
  }
  else {
    closeNav();
  }
}
// logout function (clear sessionstorage)
function logout() {
  sessionStorage.clear()
}
// check permissions (for sidenav)
function permCheck() {
  // get elements
  var x = document.getElementsByClassName('noguest');
  // check for guest/null accounts
  if (sessionStorage.getItem('liusername') != "guest" && sessionStorage.getItem('liusername') != null && sessionStorage.getItem('litype') != "guest") {
    // for statement to iterate, change styles
    for (i = 0; i < x.length; i++) {
      if (x[i].style.display === "none") {
          x[i].style.display = "block";
      } else {
          x[i].style.display = "none";
      }
    }
  }
}

  