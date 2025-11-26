import i18n from "i18next";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const useSetLanguage = () => {
  const userLang = useSelector((state:any) => state.auth.currentUser?.language_preference);

  useEffect(() => {
    if (userLang) {
      i18n.changeLanguage(userLang); 
    }
  }, [userLang]);
};

export default useSetLanguage;
