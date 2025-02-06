let translations;
let currentLanguage = localStorage.getItem("language") || "tr";

async function loadTranslations() {
  try {
    const response = await fetch("../assets/data/translation.json");
    translations = await response.json();
    updateTexts();
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

function updateTexts() {
  if (!translations) return;

  const elementsToTranslate = document.querySelectorAll("[data-translate]");
  elementsToTranslate.forEach((element) => {
    const translationKey = element.getAttribute("data-translate");
    if (translations[currentLanguage][translationKey]) {
      element.textContent = translations[currentLanguage][translationKey];
    }
  });

  const selectedLanguage = document.getElementById("selectedLanguage");
  if (selectedLanguage) {
    const languageTexts = {
      en: "English",
      tr: "Türkçe",
    };
    selectedLanguage.textContent = languageTexts[currentLanguage];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadTranslations();

  const languageButton = document.getElementById("languageButton");
  const languageDropdown = document.getElementById("languageDropdown");
  const dropdownArrow = document.getElementById("dropdownArrow");

  if (languageButton && languageDropdown) {
    languageButton.addEventListener("click", () => {
      languageDropdown.classList.toggle("hidden");
      dropdownArrow?.classList.toggle("rotate-90");
    });

    languageDropdown.addEventListener("click", (e) => {
      const langButton = e.target.closest("[data-lang]");
      if (langButton) {
        currentLanguage = langButton.getAttribute("data-lang");
        localStorage.setItem("language", currentLanguage);
        updateTexts();
        languageDropdown.classList.add("hidden");
        dropdownArrow?.classList.remove("rotate-90");
      }
    });

    document.addEventListener("click", (e) => {
      if (
        !languageButton.contains(e.target) &&
        !languageDropdown.contains(e.target)
      ) {
        languageDropdown.classList.add("hidden");
        dropdownArrow?.classList.remove("rotate-90");
      }
    });
  }
});

window.translations = translations;
window.currentLanguage = currentLanguage;
window.updateTexts = updateTexts;
