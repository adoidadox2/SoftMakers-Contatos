export default function stringFormatter(text: string) {
  text = text.replace(new RegExp("[ÀÁÂÃÄÅÆ]", "gi"), "a");
  text = text.replace(new RegExp("[ÈÉÊË]", "gi"), "e");
  text = text.replace(new RegExp("[ÍÌÎÏ]", "gi"), "i");
  text = text.replace(new RegExp("[ÒÓÔÕÖØ]", "gi"), "o");
  text = text.replace(new RegExp("[ÚÙÛÜ]", "gi"), "u");
  text = text.replace(new RegExp("[Ç]", "gi"), "c");
  text = text.replace(new RegExp("[ÑŃǸ]", "gi"), "n");
  text = text.replace(new RegExp("[ÝỲỸŶŸ]", "gi"), "y");
  text = text.toUpperCase().trim();

  return text;
}
