// this script handles the security ticker
$(document).ready(function(e){
    // update ticker on load
    updateTicker();
}); 
//adds zero to single-digit time items (hours, minutes, seconds)
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
// update ticker function
function updateTicker() {
    // reference latest entry    
    var lastPostRef = firebase.database().ref('security/').orderByKey().limitToLast(1);
    // listen
    lastPostRef.on('child_added', function(data) {
        // write title to ticker
        document.getElementById('secalerttitle').innerHTML = "<strong>Security Alert!</strong> " + data.child("title").val();
        // check for active alert
        if (data.child('status').val() == 'Enabled'){
            // make ticker visible if active
            document.getElementById('secalertbox').style.display='block';
        }
    })
}