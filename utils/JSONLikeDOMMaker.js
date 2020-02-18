import template from './template.js';

const parent = document.querySelector('[DOMMaker]');
// needs to be array or object at first

function fillContainerWithEmptyValues(container) {
    // delete field
    // password, date, phone, location ...(etc data types)
    const containerType = container.getAttribute('DOMMaker');
    const options = {
        string: `<input type="text" value="string" DOMMaker="string"/>`,
        boolean: `<input type="checkbox" DOMMaker="boolean"/>`,
        number: `<input type="number" value="123" DOMMaker="number"/>`,
        object: `<ul DOMMaker="object"></ul>`,
        array: `<ul DOMMaker="array"></ul>`
    };
    const optionName = `<input DOMMaker type="text" value="value"/>`;
    const emptyValues = template(`
        <div DOMMaker>
            <p>${containerType === 'object' ? optionName : ''}</p>
            <select DOMMaker>
                <option disabled selected>Choose your value type</option>
                ${
                    Object.keys(options).map(
                        key => `
                            <option value="${key}">
                                ${key}
                            </option>
                        `
                    )
                }
            </select>
        </div>
    `);

    container.appendChild(emptyValues);

    const newInput = emptyValues.querySelector('input[DOMMaker]');
    const newSelect = emptyValues.querySelector('select[DOMMaker]');
    const disabled = () => emptyValues.querySelector('option[disabled]');

    newSelect.addEventListener('input', e => {
        const { value } = e.target;
        const newElement = template(`
            <li>
                <button>Delete</button>
                ${
                    containerType === 'object' ?
                    `<b contenteditable>${newInput.value}</b>` : ''
                }
                ${options[value]}
            </li>
        `);

        disabled().selected = true;

        container.appendChild(newElement);

        const deleteButton = newElement.querySelector('button');
        const removeFromDOM = () => {
            newElement.remove();
            deleteButton.removeEventListener('click', removeFromDOM);
        };

        deleteButton.addEventListener('click', removeFromDOM);

        [...newElement.querySelectorAll(
            '[DOMMaker="object"], [DOMMaker="array"]'
        )].forEach(fillContainerWithEmptyValues);
    }, false);
}

fillContainerWithEmptyValues(parent);