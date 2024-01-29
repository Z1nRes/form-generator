const headerBtns: NodeListOf<HTMLButtonElement> = document.querySelectorAll('.header-btn'), //кнопки шапки
      resultForm: HTMLFormElement = document.querySelector('.result-form'); //блок формы

interface Idata {
    title: string,
    description?: string,
    fields: Ifields,
    buttons: string[]
}

interface Ifields {
    label: string,
    attrs: Iattrs
}

interface Iattrs {
    name: string,
    type: string,
    variants?: Ivariants
}

interface Ivariants {
    value: string,
    label: string
}

const getData = async (formNumber: string) => {
    await axios.get('../data/form-test-' + formNumber + '.json')
        .then((response: any) => {
            generatorForm(response.data);
    }); //получение данных из json файлов и применение генератора формы
}

headerBtns.forEach((headerBtn: Element) => {
    headerBtn.addEventListener("click", function () {
        getData(String(headerBtn.getAttribute("name")))
    });
}) // При нажатии на кнопку меняется номер формы в запросе и выводится другая форма

const generatorForm = (data: Idata) => {
    resultForm.innerHTML = ''; //очищает от предыдущей формы и начальной надписи

    const createLegend = (legend: string) => {
        const legendForm: HTMLLegendElement = document.createElement('legend');
        legendForm.textContent = legend;
        resultForm.appendChild(legendForm);
    } //добавляет загаловок для формы

    const createDescription = (desc: string) => {
        const descriptionForm: HTMLParagraphElement = document.createElement('p');
        descriptionForm.textContent = desc;
        resultForm.appendChild(descriptionForm);
    } //добавляет описание для формы

    data.title ? createLegend(data.title) : false ; // если есть title, то создаем заголовок формы
    data.description ? createLegend(data.description) : false ; // если есть description, то создаем описание формы

    const createFields = (fields: Ifields) => {
        fields.forEach((field: Ifields) => {
            const inputWrapper: HTMLDivElement = document.createElement("div");

            const createTextField = (field: Ifields) => {
                const textLabel: HTMLLabelElement = document.createElement("label");
                const textInput: HTMLInputElement = document.createElement("input");

                textLabel.textContent = field.label;

                textInput.type = field.attrs.type;
                textInput.name = field.attrs.name;
                textInput.classList.add('form-control');

                inputWrapper.appendChild(textLabel);
                inputWrapper.appendChild(textInput);

                resultForm.appendChild(inputWrapper);
            }

            const createRadioField = (field: Ifields) => {
                const radioFieldsWrapper: HTMLDivElement = document.createElement("div");
                const inputLabel: HTMLLabelElement = document.createElement("label");

                inputLabel.textContent = field.label;

                field.attrs.variants.forEach((variant: Ivariants) => {
                    const radioFieldWrapper: HTMLDivElement = document.createElement("div");
                    const radioLabel: HTMLLabelElement = document.createElement("label");
                    const radioInput: HTMLInputElement = document.createElement("input");

                    radioInput.type = field.attrs.type;
                    radioInput.name = field.attrs.name;
                    radioInput.value = variant.value;

                    radioLabel.textContent = variant.label;
                    radioLabel.classList.add('ps-2');

                    radioFieldWrapper.classList.add('ps-2');
                    radioFieldWrapper.appendChild(radioInput);
                    radioFieldWrapper.appendChild(radioLabel);
                    radioFieldsWrapper.appendChild(radioFieldWrapper);
                })

                inputWrapper.appendChild(inputLabel);
                inputWrapper.appendChild(radioFieldsWrapper);
                resultForm.appendChild(inputWrapper);
            }

            const createTextareaField = (field: Ifields) => {
                const textareaLabel: HTMLLabelElement = document.createElement("label");
                const textareaInput: HTMLTextAreaElement = document.createElement("textarea");

                textareaLabel.textContent = field.label;

                textareaInput.name = field.attrs.name;
                textareaInput.classList.add('form-control');
                textareaInput.style.resize = "none";
                textareaInput.style.height = "120px";

                inputWrapper.appendChild(textareaLabel);
                inputWrapper.appendChild(textareaInput);

                resultForm.appendChild(inputWrapper);
            }

            const createSelectField = (field: Ifields) => {
                const selectLabel: HTMLLabelElement = document.createElement('label');
                const selectWrapper: HTMLSelectElement = document.createElement('select');

                selectWrapper.classList.add('form-select');
                selectWrapper.name = field.attrs.name;

                selectLabel.textContent = field.label;

                field.attrs.variants.forEach((variant: Ivariants) => {
                    const selectInput: HTMLOptionElement = document.createElement('option');

                    selectInput.textContent = variant.label;
                    selectInput.value = variant.value;
                    selectWrapper.appendChild(selectInput);
                })

                inputWrapper.appendChild(selectLabel);
                inputWrapper.appendChild(selectWrapper);
                resultForm.appendChild(inputWrapper);
            }

            const createCheckboxField = (field: Ifields) => {
                const checkboxesLabel: HTMLLabelElement = document.createElement('label');

                checkboxesLabel.textContent = field.label;
                inputWrapper.appendChild(checkboxesLabel);

                field.attrs.variants.forEach((variant: Ivariants) => {
                    const checkboxWrapper: HTMLDivElement = document.createElement('div');
                    const checkboxLabel: HTMLLabelElement = document.createElement('label');
                    const checkboxInput: HTMLInputElement = document.createElement('input');

                    checkboxInput.type = field.attrs.type;
                    checkboxInput.value = variant.value;
                    checkboxInput.name = field.attrs.name;
                    checkboxLabel.textContent = variant.label;
                    checkboxLabel.classList.add('ms-2');

                    checkboxWrapper.classList.add('ms-2');
                    checkboxWrapper.appendChild(checkboxInput);
                    checkboxWrapper.appendChild(checkboxLabel);

                    inputWrapper.appendChild(checkboxWrapper);
                })

                resultForm.appendChild(inputWrapper);
            }


            field.attrs.type === "text" ? createTextField(field) : false;
            field.attrs.type === "radio" ? createRadioField(field) : false;
            field.attrs.type === "textarea" ? createTextareaField(field) : false;
            field.attrs.type === "select" ? createSelectField(field) : false;
            field.attrs.type === "checkbox" ? createCheckboxField(field) : false;

        })
    }

    data.fields ? createFields(data.fields) : false;

    const btnsWrapper: Element = document.createElement("div");
    btnsWrapper.classList.add('d-flex', 'justify-content-between', 'pt-4');
    data.buttons.forEach((btn: string) => {

        const newBtn: HTMLButtonElement = document.createElement("button");

        newBtn.textContent = btn;
        btn === "submit" ? newBtn.type = "submit" : newBtn.type = "reset";

        btn === 'submit' ? newBtn.classList.add('btn', 'btn-success') : newBtn.classList.add('btn', 'btn-danger');

        btnsWrapper.appendChild(newBtn);
    }) //добавление кнопок форме

    resultForm.appendChild(btnsWrapper);
}

resultForm.addEventListener("submit", (e: SubmitEvent) => {
    e.preventDefault();
    const formData: FormData = new FormData(resultForm);
    const values = Object.fromEntries(formData.entries());

    console.log("============================================");
    for (let value in values) {
        value === 'question-1' ? console.log(value + " - " + formData.getAll('question-1')) : console.log(value + " - " + values[value]);
    }

    e.target.reset();
}) //вывод данных в консоль
