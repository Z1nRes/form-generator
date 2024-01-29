
const headerBtns = document.querySelectorAll('.header-btn');
const resultForm = document.querySelector('.result-form'); //блок формы

const getData = async (formNumber) => {
    await axios.get('../data/form-test-' + formNumber + '.json')
        .then((response) => {
            generatorForm(response.data);
    }); //получение данных из json файлов и применение генератора формы
}

headerBtns.forEach((headerBtn) => {
    headerBtn.addEventListener("click", function () {
        getData(headerBtn.getAttribute("name"))
    });
})

const generatorForm = (data) => {
    resultForm.innerHTML = ''; //очищает от предыдущей формы и начальной надписи

    const createLegend = (legend) => {
        const legendForm = document.createElement('legend');
        legendForm.textContent = legend;
        resultForm.appendChild(legendForm);
    } //добавляет загаловок для формы

    data.title ? createLegend(data.title) : false ; // если есть title, то создаем заголовок формы

    const createFields = (fields) => {
        fields.forEach((field) => {
            const inputWrapper = document.createElement("div");


            const createTextField = (field) => {
                const textLabel = document.createElement("label");
                const textInput = document.createElement("input");

                textLabel.textContent = field.label;

                textInput.type = field.attrs.type;
                textInput.name = field.attrs.name;
                textInput.classList.add('form-control');

                inputWrapper.appendChild(textLabel);
                inputWrapper.appendChild(textInput);

                resultForm.appendChild(inputWrapper);
            }

            const createRadioField = (field) => {
                const radioFieldsWrapper = document.createElement("div");
                const inputLabel = document.createElement("label");

                inputLabel.textContent = field.label;

                field.attrs.variants.forEach((variant) => {
                    const radioFieldWrapper = document.createElement("div");
                    const radioLabel = document.createElement("label");
                    const radioInput = document.createElement("input");

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

            const createTextareaField = (field) => {
                const textareaLabel = document.createElement("label");
                const textareaInput = document.createElement("textarea");

                textareaLabel.textContent = field.label;

                textareaInput.name = field.attrs.name;
                textareaInput.classList.add('form-control');
                textareaInput.style.resize = "none";
                textareaInput.style.height = "120px";

                inputWrapper.appendChild(textareaLabel);
                inputWrapper.appendChild(textareaInput);

                resultForm.appendChild(inputWrapper);
            }

            const createSelectField = (field) => {
                const selectLabel = document.createElement('label');
                const selectWrapper = document.createElement('select');

                selectWrapper.classList.add('form-select');
                selectWrapper.name = field.attrs.name;

                selectLabel.textContent = field.label;

                field.attrs.variants.forEach((variant) => {
                    const selectInput = document.createElement('option');

                    selectInput.textContent = variant.label;
                    selectInput.value = variant.value;
                    selectWrapper.appendChild(selectInput);
                })

                inputWrapper.appendChild(selectLabel);
                inputWrapper.appendChild(selectWrapper);
                resultForm.appendChild(inputWrapper);
            }

            const createCheckboxField = (field) => {
                const checkboxesLabel = document.createElement('label');

                checkboxesLabel.textContent = field.label;
                inputWrapper.appendChild(checkboxesLabel);

                field.attrs.variants.forEach((variant) => {
                    const checkboxWrapper = document.createElement('div');
                    const checkboxLabel = document.createElement('label');
                    const checkboxInput = document.createElement('input');

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



    const btnsWrapper = document.createElement("div");
    btnsWrapper.classList.add('d-flex', 'justify-content-between', 'pt-4');
    data.buttons.forEach((btn) => {

        const newBtn = document.createElement("button");

        newBtn.textContent = btn;
        newBtn.type = btn;

        btn === 'submit' ? newBtn.classList.add('btn', 'btn-success') : newBtn.classList.add('btn', 'btn-danger');

        btnsWrapper.appendChild(newBtn);
    })
    resultForm.appendChild(btnsWrapper);
}

resultForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(resultForm);
    const values = Object.fromEntries(formData.entries());

    console.log("============================================");
    for (let value in values) {
        value === 'question-1' ? console.log(value + " - " + formData.getAll('question-1')) : console.log(value + " - " + values[value]);
    }

    e.target.reset();

}) //вывод данных в консоль
