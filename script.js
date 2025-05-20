document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    //dati
    const gender = document.getElementById("gender").value;
    const weight = parseFloat(document.getElementById("weight").value);
    const stomach = document.getElementById("stomach").value;
    const time = document.getElementById("time").value;

    //costanti
    const beverages = document.querySelectorAll(".beverage input");
    const result = document.getElementById("result");
    const drivingStatus = document.getElementById("drivingstatus");

    //tabella alcool per volume
    const beverageValues = [
        { alcoholPercentage: 0.5, volume: 330 },
        { alcoholPercentage: 3.5, volume: 330 },
        { alcoholPercentage: 5, volume: 330 },
        { alcoholPercentage: 12, volume: 125 },
        { alcoholPercentage: 18, volume: 70 },
        { alcoholPercentage: 35, volume: 40 },
        { alcoholPercentage: 60, volume: 40 },
        { alcoholPercentage: 11, volume: 100 }
    ];

    let totalAlcoholGrams = 0;

    //calcola l'alcol totale
    beverages.forEach((input, index) => {
        const quantity = parseInt(input.value) || 0;
        const beverage = beverageValues[index];
        const alcohol = beverage.volume * (beverage.alcoholPercentage / 100);
        const gramsPerUnit = alcohol * 0.789;
        totalAlcoholGrams += gramsPerUnit * quantity;
    });

    //applica i parametri seguendo la formula
    let r = gender == "female" ? 0.6 : 0.7;
    let bac = totalAlcoholGrams / (weight * r);
    let metabolizedAlcohol = time * 0.0025;

    if (stomach == "full") {
        bac *= 0.85;
    }

    bac -= metabolizedAlcohol;
    bac = bac.toFixed(3);

    drivingStatus.textContent = bac > 0.5 
    ? "Attenzione: Sei oltre il limite legale per la guida!"
    : "Puoi guidare";

    //error check
    if(bac < 0){
        bac = 0;
    }else if (bac == Infinity){
        bac = "Errore!";
        result.classList.add("red");
        drivingStatus.textContent = ""
    }else{
        drivingStatus.classList.toggle("red", bac > 0.5);
        result.classList.toggle("red", bac > 0.5);
    }

    result.textContent = `Tasso alcolemico stimato: ${bac} g/L`;
});