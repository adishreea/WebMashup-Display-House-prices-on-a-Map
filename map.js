var zwsid = "X1-ZWz1f6ancdms5n_55f1z"; //Zillow API key
var request = new XMLHttpRequest();
var gc;   
var mp2;
var ifw;   
var value;

function initialize () 
{ 
    var mylocation = new google.maps.LatLng(32.75, -97.13);
    var mp1 = { 
        center: mylocation, zoom:17, mapTypeId: google.maps.MapTypeId.HYBRID 
    };
    mp2 = new google.maps.Map(document.getElementById("map"), mp1);
    var marker = new google.maps.Marker( {
        map: mp2, position: mylocation, draggable: true, animation: google.maps.Animation.DROP,
    } );
    gc = new google.maps.Geocoder();
    marker.setMap(mp2);	
}
function displayResult () 
{
    var add = encodeURI(document.getElementById("address").value);
    if (request.readyState == 4) 
    {
        var xml = request.responseXML.documentElement;
   
        value = xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
        document.getElementById("output").innerHTML = value;
   } 
}
function sendRequest () 
{  
    request.onreadystatechange = displayResult;
    var add1 = document.getElementById("address").value;
    var str = add1+value;
    
    gc.geocode( {
        'address' : add1
    }, 
    function(results, status) 
    { 
        if (status == google.maps.GeocoderStatus.OK) 
        {
            mp2.setCenter(results[0].geometry.location);           
            var marker = new google.maps.Marker( { map: mp2, position: results[0].geometry.location, draggable: true, animation: google.maps.Animation.DROP,} );
        }
        else
        {
            alert("Geocode was not successful for the following reason: " + status);
        } 
    } );
    
    ifw = new google.maps.InfoWindow({ 
        content: str
    });
    mp2.addListener('click', function() {
        ifw.open(mp2, marker);
    } );
    var add2 = add1.split(",");
    var address = add2[0];
    var cs = add2[1];
    request.open("GET","proxy.php?zws-id="+zwsid+"&address="+address+"&citystatezip="+cs);
    request.withCredentials = "true";
    request.send(null);    
}