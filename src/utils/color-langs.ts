export default async function getColorLangs() {
  const res = await fetch(
    'https://raw.githubusercontent.com/aderepas/WeekGolf/main/Server/src/api/v1/data/colorLang.json'
  );
  const json: { [lang: string]: string } = await res.json();
  json['c#'] = json.cs;
  json.fs = json['f#'];
  json.cpp = json['c++'];
  return json;
};
