import { createContext } from "react";

function importAllFiles(r) {
    let files = {};
    r.keys().forEach((item) => {
      files[item.replace('./', '').replace('.json', '')] = r(item);
    });
    return files;
  }

const languageInfo = importAllFiles(require.context('../configuration/language/es_MX', false, /\.json$/));
const LanguageContext = createContext(languageInfo);

export default LanguageContext;