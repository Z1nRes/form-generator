var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var headerBtns = document.querySelectorAll('.header-btn');
var getData = function (formNumber) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, axios.get('../data/form-test-' + formNumber + '.json')
                    .then(function (response) {
                    generatorForm(response.data);
                })];
            case 1:
                _a.sent(); //получение данных из json файлов и применение генератора формы
                return [2 /*return*/];
        }
    });
}); };
headerBtns.forEach(function (headerBtn) {
    headerBtn.addEventListener("click", function () {
        getData(headerBtn.getAttribute("name"));
    });
});
var generatorForm = function (data) {
    var resultForm = document.querySelector('.result-form'); //блок формы
    resultForm.innerHTML = ''; //очищает от предыдущей формы и начальной надписи
    var createLegend = function (legend) {
        var legendForm = document.createElement('legend');
        legendForm.textContent = legend;
        resultForm.appendChild(legendForm);
    }; //добавляет загаловок для формы
    data.title ? createLegend(data.title) : false; // если есть title, то создаем заголовок формы
    var createFields = function (fields) {
        fields.forEach(function (field) {
            var inputWrapper = document.createElement("div");
            var createTextField = function (field) {
                var textLabel = document.createElement("label");
                var textInput = document.createElement("input");
                textLabel.textContent = field.label;
                textInput.type = field.attrs.type;
                textInput.name = field.attrs.name;
                textInput.classList.add('form-control');
                inputWrapper.appendChild(textLabel);
                inputWrapper.appendChild(textInput);
                resultForm.appendChild(inputWrapper);
            };
            var createRadioField = function (field) {
                var radioFieldsWrapper = document.createElement("div");
                var inputLabel = document.createElement("label");
                inputLabel.textContent = field.label;
                field.attrs.variants.forEach(function (variant) {
                    var radioFieldWrapper = document.createElement("div");
                    var radioLabel = document.createElement("label");
                    var radioInput = document.createElement("input");
                    radioInput.type = field.attrs.type;
                    radioInput.name = field.attrs.name;
                    radioLabel.textContent = variant.label;
                    radioLabel.classList.add('ps-2');
                    radioFieldWrapper.classList.add('ps-2');
                    radioFieldWrapper.appendChild(radioInput);
                    radioFieldWrapper.appendChild(radioLabel);
                    radioFieldsWrapper.appendChild(radioFieldWrapper);
                });
                inputWrapper.appendChild(inputLabel);
                inputWrapper.appendChild(radioFieldsWrapper);
                resultForm.appendChild(inputWrapper);
            };
            var createTextareaField = function (field) {
                var textareaLabel = document.createElement("label");
                var textareaInput = document.createElement("textarea");
                textareaLabel.textContent = field.label;
                textareaInput.name = field.attrs.name;
                textareaInput.classList.add('form-control');
                textareaInput.style.resize = "none";
                textareaInput.style.height = "120px";
                inputWrapper.appendChild(textareaLabel);
                inputWrapper.appendChild(textareaInput);
                resultForm.appendChild(inputWrapper);
            };
            var createSelectField = function (field) {
                var selectLabel = document.createElement('label');
                var selectWrapper = document.createElement('select');
                selectWrapper.classList.add('ms-2', 'mt-2');
                selectLabel.textContent = field.label;
                field.attrs.variants.forEach(function (variant) {
                    var selectInput = document.createElement('option');
                    selectInput.textContent = variant.label;
                    selectInput.value = variant.value;
                    selectWrapper.appendChild(selectInput);
                });
                inputWrapper.appendChild(selectLabel);
                inputWrapper.appendChild(selectWrapper);
                resultForm.appendChild(inputWrapper);
            };
            var createCheckboxField = function (field) {
                var checkboxesLabel = document.createElement('label');
                checkboxesLabel.textContent = field.label;
                inputWrapper.appendChild(checkboxesLabel);
                field.attrs.variants.forEach(function (variant) {
                    var checkboxWrapper = document.createElement('div');
                    var checkboxLabel = document.createElement('label');
                    var checkboxInput = document.createElement('input');
                    checkboxInput.type = field.attrs.type;
                    checkboxInput.value = variant.value;
                    checkboxLabel.textContent = variant.label;
                    checkboxLabel.classList.add('ms-2');
                    checkboxWrapper.classList.add('ms-2');
                    checkboxWrapper.appendChild(checkboxInput);
                    checkboxWrapper.appendChild(checkboxLabel);
                    inputWrapper.appendChild(checkboxWrapper);
                });
                resultForm.appendChild(inputWrapper);
            };
            field.attrs.type === "text" ? createTextField(field) : false;
            field.attrs.type === "radio" ? createRadioField(field) : false;
            field.attrs.type === "textarea" ? createTextareaField(field) : false;
            field.attrs.type === "select" ? createSelectField(field) : false;
            field.attrs.type === "checkbox" ? createCheckboxField(field) : false;
        });
    };
    data.fields ? createFields(data.fields) : false;
    var btnsWrapper = document.createElement("div");
    btnsWrapper.classList.add('d-flex', 'justify-content-between', 'pt-4');
    data.buttons.forEach(function (btn) {
        var newBtn = document.createElement("button");
        newBtn.textContent = btn;
        btn === 'submit' ? newBtn.classList.add('btn', 'btn-success') : newBtn.classList.add('btn', 'btn-danger');
        btnsWrapper.appendChild(newBtn);
    });
    resultForm.appendChild(btnsWrapper);
};
