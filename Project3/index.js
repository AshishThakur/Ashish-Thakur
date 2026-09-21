 const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");

      const icon = menuBtn.querySelector("i");
      icon.classList.toggle("fa-bars");
      icon.classList.toggle("fa-xmark");
    });



document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    alert("Right-click is disabled on this site!");
});


document.addEventListener('keydown', function(e) {
    // F12 key
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+U
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) {
        e.preventDefault();
        return false;
    }
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
});
