var customerName = prompt("Indtast venlist dit navn", "");

if (customerName!= null) {


    document.getElementById("welcome").innerHTML = 

    "Velkommen til vendespillet " + customerName + "!";

    document.getElementById("TitleScreen").play();
} 
else {
    location.reload();
}