
function degreeEvaluation () {
    let degreeBtn = document.querySelectorAll(".degree-btn");
    let degree90Content = document.getElementById("degree-90");
    let degree180Content = document.getElementById("degree-180");
    let degree270Content = document.getElementById("degree-270");
    let degree360Content = document.getElementById("degree-360");


    let degre90 = degreeBtn[0];
    let degre180 = degreeBtn[1];
    let degre270 = degreeBtn[2];
    let degre360 = degreeBtn[3];


    degre90.addEventListener("click", () => {
        degree90Content.style = "display: block";
        degree180Content.style = "display: none";
        degree270Content.style = "display: none";
        degree360Content.style = "display: none";
    })

    degre180.addEventListener("click", () => {
        degree90Content.style = "display: none";
        degree180Content.style = "display: block";
        degree270Content.style = "display: none";
        degree360Content.style = "display: none";
    })

    degre270.addEventListener("click", () => {
        degree90Content.style = "display: none";
        degree180Content.style = "display: none";
        degree270Content.style = "display: block";
        degree360Content.style = "display: none";
    })

    degre360.addEventListener("click", () => {
        degree90Content.style = "display: none";
        degree180Content.style = "display: none";
        degree270Content.style = "display: none";
        degree360Content.style = "display: block";
    })

}
export {degreeEvaluation}