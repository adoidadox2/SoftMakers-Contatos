import stringFormatter from "./stringFormatter";
import ObjectFormatterDTO from "../dtos/ObjectFormatterDTO";

export default function objectFormatter(obj: ObjectFormatterDTO) {
  Object.keys(obj).forEach(function (item) {
    if (typeof obj[item] === "string") {
      obj[item] = stringFormatter(obj[item]);
    }
  });
  return obj;
}
