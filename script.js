// ==========================================================================
// Haydar Mühendislik - Tanıtım Sitesi Script'i
// Saf JavaScript, herhangi bir build aracı veya bağımlılık gerektirmez.
// ==========================================================================

document.addEventListener("DOMContentLoaded", function () {
  // ---------- Mobil menü aç/kapat ----------
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Bir menü linkine tıklanınca mobil menüyü kapat
    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Footer: güncel yılı otomatik yaz ----------
  var yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- İletişim formu: Web3Forms ile doğrudan e-postaya gönderim ----------
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    var submitBtn = contactForm.querySelector(".form-submit");
    var statusEl = document.getElementById("formStatus");

    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var formData = new FormData(contactForm);
      var originalBtnText = submitBtn.textContent;

      submitBtn.disabled = true;
      submitBtn.textContent = "Gönderiliyor...";
      if (statusEl) {
        statusEl.textContent = "";
        statusEl.className = "form-status";
      }

      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          if (result.success) {
            contactForm.reset();
            if (statusEl) {
              statusEl.textContent =
                "Mesajınız gönderildi. En kısa sürede size dönüş yapacağız.";
              statusEl.classList.add("form-status-success");
            }
          } else {
            throw new Error(result.message || "Gönderim başarısız oldu.");
          }
        })
        .catch(function () {
          if (statusEl) {
            statusEl.textContent =
              "Mesaj gönderilemedi. Lütfen tekrar deneyin ya da doğrudan e-posta ile ulaşın.";
            statusEl.classList.add("form-status-error");
          }
        })
        .finally(function () {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        });
    });
  }
});
