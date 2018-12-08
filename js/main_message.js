//account vars
var aType;
var aName;
var aUMID;
var gEventData;

var config = {
  apiKey: "AIzaSyBPODNqG9ENaZjIfT2OAabKNOL6kVyXekE",
  authDomain: "wolverine-connnect.firebaseapp.com",
  databaseURL: "https://wolverine-connnect.firebaseio.com",
  projectId: "wolverine-connnect",
  storageBucket: "wolverine-connnect.appspot.com",
  messagingSenderId: "443614493984"
};
firebase.initializeApp(config);

$(document).on('click','#send',function(e){
  //alphanumeric(username);
  //var username = document.getElementById('username').value;
  //console.log(username);
	
		var rootRef = firebase.database().ref();
	var urlRef = rootRef.child("Messages");
	urlRef.once("value", function(snapshot) {
  snapshot.forEach(function(child) {
//    console.log("Messages/"+child.key);
	  var current = "Messages/"+child.key;
	 		var msgs = rootRef.child(current);  
	  		msgs.once("value", function(snapshot) {
					if(snapshot.child("rec_umid").val()=="33333")
						document.getElementById('shw_mesage').innerHTML= snapshot.child("text").val();
		//				console.log(snapshot.child("rec_umid").val());
			});
	  
	  
  });
});
	
	/*
	var rootRef = firebase.database().ref();
	var urlRef = rootRef.child("Messages/1");
urlRef.once("value", function(snapshot) {
	console.log(snapshot.child("rec_umid").val());
	});*/
 // snapshot.forEach(function(child) {
	 // if(child.key=="rec_umid" && child.val() =="444444")
		//  document.getElementById('shw_mesage').innerHTML= child.val();
//    console.log(child.key+": "+child.val());
//  });

	
	/*document.getElementById('shw_mesage').innerHTML= "bbb";
*/
		
		var message_text = document.getElementById('text_message').value;
	
	  firebase.database().ref('Messages/' + '4').set({
    send_umid: '456123',
    rec_umid: '321456',
    text: message_text
});
document.getElementById('text_message').value="";	
	 alert('You send '+message_text +" to your friend.");
  //console.log(pword);
/*
  firebase.database().ref(`users/${username}`).once("value", snapshot => {
    if (snapshot.exists()){
       console.log('exists');
     }
     else {
       console.log('DNE');
       alert('Invalid username or password.');
     }
 });

  var ref = firebase.database().ref().child('users/');
    ref.orderByChild("username").equalTo(username).on("child_added", function(snapshot) {
      //console.log(snapshot.key);
      //alert(JSON.stringify(snapshot)); 
      if (username == snapshot.key && pword == snapshot.child("password").val()) {
        localStorage.setItem('liusername',snapshot.key);
        localStorage.setItem('lifirstname',snapshot.child("namefirst").val());
        localStorage.setItem('lilastname',snapshot.child("namelast").val());
        var a = document.createElement('a');
			    a.href = 'home.html';
			    a.click();
        }
      else {
          alert('Invalid username or password.');
      }
  });
*/

});


$(document).on('click','#input',function(e){

  var username = document.getElementById('username').value;
  var pword = document.getElementById('password').value;
  var umid = document.getElementById('umid').value;
  var namefirst = document.getElementById('namefirst').value;
  var namelast = document.getElementById('namelast').value;
  var type = document.getElementById('type').value;
  var enabled = document.getElementById('enabled').value;
  //console.log(username);
  //console.log(pword);
  //console.log(umid);
  //console.log(namefirst);
  //console.log(namelast);
  //console.log(type);
  //console.log(type);


  firebase.database().ref('users/' + username).set({
    username: username,
    password: pword,
    umid: umid,
    namefirst: namefirst,
    namelast: namelast,
    type: type,
    enabled: enabled
  });
});

$(document).on('click','#get',function(e){
  var username = document.getElementById('username').value;
  //console.log(username);

  var ref = firebase.database().ref().child('users/');
    ref.orderByChild("username").equalTo(username).on("child_added", function(snapshot) {
      console.log(snapshot.key);
      alert(JSON.stringify(snapshot));
  });
});

function alphanumeric(inputtxt)
{
 var letterNumber = /^[0-9a-zA-Z]+$/;
 if((inputtxt.value.match(letterNumber))) 
    {
      return true;
    }
  else
    { 
      alert("message"); 
      return false; 
    }
  }

  function printEventInfo(eventdata)
  {
    writeout = document.getElementById('eventinfo');
    writeout.innerHTML = "Event: " + eventdata.title + "<br>" + eventdata.location + "<br>" + "From " + eventdata.start + " to " + eventdata.end + "<br>" + "Description: " + eventdata.description + "<br>" + "<div><input type='checkbox' id='rsvp' name='rsvp'><label for='rsvp'>RSVP</label></div>";
    rsvpLoadToggle(eventdata);
    gEventData = eventdata;
  }

  function rsvpLoadToggle(eventdata)
  {
    var username = localStorage.getItem('liusername');
    firebase.database().ref(`events/${eventdata.id}`).once("value", username => {
      if (username.exists()){
         console.log('exists');
         document.getElementById("rsvp").checked = true;
       }
       else {
         console.log('DNE');
         document.getElementById("rsvp").checked = false;
       }
   });
  }

 $(document).on('click','#rsvp',function(e){
  validateRSVP(gEventData);
  });

  function validateRSVP(eventdata){
    var username = localStorage.getItem('liusername');
    if (document.getElementById("rsvp").checked == true){
      //console.log('checked is true');
      firebase.database().ref('users/' + username + '/events/' + eventdata.id).set({
        attending: 1
      });
      firebase.database().ref('events/' + eventdata.id + '/' + username).set({
        attending: 1
      });

    }
    else if (document.getElementById("rsvp").checked == false){
      //console.log('checked is false');
      firebase.database().ref('users/' + username + '/events/' + eventdata.id).set({
        attending: null
      });
      firebase.database().ref('events/' + eventdata.id + '/' + username).set({
        attending: null
      });
    }
  }