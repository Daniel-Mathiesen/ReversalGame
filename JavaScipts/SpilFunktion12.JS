const kort = document.querySelectorAll('.Vende-kort');

let harVendtKort = false
let LåsBord = false;
let førsteKort, AndetKor

window.onload= function(MusikSpiller){
    document.getElementById("addwater").play(); 
}

function vendKort() {
    if (LåsBord) return;
    if (this === førsteKort) return;

    this.classList.add('vend');

    if (!harVendtKort) {
        //Første Tryk
        harVendtKort = true
        førsteKort = this;
    } else {
        //Anden Tryk
        harVendtKort = false;
        AndetKort = this;  
        
        tjekForSpil();
    }
};


function tjekForSpil() {
         //Passer kortene
         if (førsteKort.dataset.samler === 
            AndetKort.dataset.samler) {
               deaktiverKort();
            } else {
                uvendKort();
    }
}

function deaktiverKort () {
    førsteKort.removeEventListener('click', vendKort);
    AndetKort.removeEventListener('click',  vendKort);
    førsteKort.style.filters.alpha.opacity=90
    AndetKort.style.filters.alpha.opacity=90
    genstartBord()
}

function uvendKort () {
    // Kortene passer ikke
    LåsBord = true; 

    setTimeout(() => {
        førsteKort.classList.remove('vend')
        AndetKort.classList.remove('vend')

        LåsBord = false;
        }, 1500);
}

function genstartBord() {
    [harVendtKort, LåsBord] = [false, false];
    [førsteKort, AndetKort] = [null, null];
}

(function bland (){
    kort.forEach(kort =>{
        let tilfældigPos = Math.floor (Math.random() * 12)
        kort.style.order = tilfældigPos;
    });
})();


kort. forEach(kort => kort.addEventListener('click', vendKort));

