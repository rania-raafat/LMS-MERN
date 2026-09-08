import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const language = i18n.language === "ar" ? "ar" : "en";

    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const toggleLanguage = () => {
    const nextLanguage = i18n.language === "en" ? "ar" : "en";

    i18n.changeLanguage(nextLanguage);
    localStorage.setItem("language", nextLanguage);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="
        rounded-full
        border
        border-[#d8d1ca]
        px-3
        py-1.5
        text-sm
        font-medium
        text-[var(--main-color)]
        transition
        hover:bg-white
      "
      aria-label="Change language"
    >
      {i18n.language === "ar" ? "AR" : "EN"}
    </button>
  );
};

export default LanguageSwitcher;