const kort = document.querySelectorAll(".Vende-kort");

const btnCon = document.querySelector(".Vende-spil");

let harVendtKort = false;
let LåsBord = false;
let førsteKort, AndetKort;
let match = 0;

let winnerContain = document.getElementById("winnerBox");

const TimeWaitFunction = async () => {
  await delay(5000);
  console.log("Waited 5s");
};

const delay = ms => new Promise(res => setTimeout(res, ms));

function vendKort() {
  if (LåsBord) return;
  if (this === førsteKort) return;

  this.classList.add("vend");

  if (!harVendtKort) {
    //Første Tryk
    harVendtKort = true;
    førsteKort = this;
  } else {
    //Anden Tryk
    harVendtKort = false;
    AndetKort = this;

    tjekForSpil();
  }
}

function tjekForSpil() {
  //Passer kortene
  if (førsteKort.dataset.samler === AndetKort.dataset.samler) {
    deaktiverKort();
  } else {
    uvendKort();
  }
}

const deaktiverKort = async () => {
  førsteKort.removeEventListener("click", vendKort);
  AndetKort.removeEventListener("click", vendKort);
  LåsBord = true;
  await delay(700);
  førsteKort.classList.add("match");
  AndetKort.classList.add("match");
  await delay(400);
  førsteKort.classList.add("rotate")
  AndetKort.classList.add("rotate")
  await delay(900);
  førsteKort.classList.add("small")
  AndetKort.classList.add("small")
  førsteKort.style.opacity="0.8";
  AndetKort.style.opacity="0.8";
  førsteKort.style.filter = "grayscale(70%)";
  AndetKort.style.filter = "grayscale(70%)";
  match++;
  console.log(match);
  genstartBord();
  if (match === 3) {
    await delay(1000);
    winnerContain.style.display = "flex";
  }
}

function uvendKort() {
  // Kortene passer ikke
  LåsBord = true;

  setTimeout(() => {
    førsteKort.classList.remove("vend");
    AndetKort.classList.remove("vend");

    LåsBord = false;
  }, 1500);
}

function genstartBord() {
  [harVendtKort, LåsBord] = [false, false];
  [førsteKort, AndetKort] = [null, null];
}

(function bland() {
  kort.forEach((kort) => {
    let tilfældigPos = Math.floor(Math.random() * 12);
    kort.style.order = tilfældigPos;
  });
})();

kort.forEach((kort) => kort.addEventListener("click", vendKort));
