import template from './template.js';

function fillContainerWithEmptyValues(container) {
    const containerType = container.getAttribute('DOMMaker');
    const options = {
        string: `<input type="text" placeholder="string" DOMMaker="string"/>`,
        boolean: `<input type="checkbox" DOMMaker="boolean"/>`,
        number: `<input type="number" placeholder="123" DOMMaker="number"/>`,
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

    function addChild(e, lastValue) {
        const value = lastValue || e.target.value;
        console.log(options, value, options[value]);
        const newElement = template(`
            <li>
                <button DOMMaker="delete">Delete</button>
                ${
                    containerType === 'object' ?
                    `<b contenteditable>${newInput.value}</b>` : ''
                }
                ${options[value]}
                <button DOMMaker="duplicate">Duplicate</button>
            </li>
        `);

        disabled().selected = true;

        container.appendChild(newElement);

        const deleteButton = newElement.querySelector('[DOMMaker="delete"]');
        const duplicateButton = newElement.querySelector('[DOMMaker="duplicate"]');
        const removeFromDOM = () => {
            newElement.remove();
            deleteButton.removeEventListener('click', removeFromDOM);
        };

        duplicateButton.addEventListener('click', () => addChild(null, value));
        deleteButton.addEventListener('click', removeFromDOM);

        [...newElement.querySelectorAll(
            '[DOMMaker="object"], [DOMMaker="array"]'
        )].forEach(fillContainerWithEmptyValues);
    }
  
    newSelect.addEventListener('input', addChild, false);
}

fillContainerWithEmptyValues(document.querySelector('[DOMMaker]'));
