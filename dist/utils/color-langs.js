var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default function getColorLangs() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield fetch('https://raw.githubusercontent.com/aderepas/WeekGolf/main/Server/src/api/v1/data/colorLang.json');
        const json = yield res.json();
        json['c#'] = json.cs;
        json.fs = json['f#'];
        json.cpp = json['c++'];
        return json;
    });
}
;
