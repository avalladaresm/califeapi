export const isEmpty = (value: any) =>
  value === undefined ||
  value === "undefined" ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const jsonParse = (string_json: string) => {
  if (isEmpty(string_json) || typeof string_json != "string") return {};

  let response = {};
  try {
    response = JSON.parse(string_json);
  } catch (err) {
    response = {};
  }
  return response;
};

export const parseSingleElement = (element: any) => {
  if (!element) return element;
  element.notesRTFBenefits = jsonParse(element.notesRTFBenefits);

  return element;
}