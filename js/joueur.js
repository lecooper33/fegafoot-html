const boutons = document.querySelectorAll(".btns-filtre");
const joueurs = document.querySelectorAll(".grid-joueur > div");

boutons.forEach(bouton => {
  bouton.addEventListener("click", () => {
    const role = bouton.getAttribute("data-role");

    joueurs.forEach(joueur => {
      if (role === "tous") {
        joueur.style.display = "block";
      } else if (joueur.classList.contains(`role-${role}`)) {
        joueur.style.display = "block";
      } else {
        joueur.style.display = "none";
      }
    });
  });
});
