import template from './template.js';

function getComponents(container, isContainerSet) {
    const containerType = container.getAttribute('DOMMaker');
    const options = {
        string: `<input type="text" placeholder="string" DOMMaker="string"/>`,
        boolean: `<input type="checkbox" DOMMaker="boolean"/>`,
        number: `<input type="number" placeholder="123" DOMMaker="number"/>`,
        object: `<ul DOMMaker="object"></ul>`,
        array: `<ol DOMMaker="array"></ol>`
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

    if(!isContainerSet) container.appendChild(emptyValues);

    const input = emptyValues.querySelector('input[DOMMaker]');
    const select = emptyValues.querySelector('select[DOMMaker]');
    const disabled = () => emptyValues.querySelector('option[disabled]');
    const components = {
        containerType,
        input,
        options,
        disabled,
        container,
        select
    };

    return components;
}

function removeFromDOM(e) {
    // when a I remove a parent element from the DOM,
    // do the listeners attached to their children get removed as well?
    e.target.parentElement.remove();
    e.target.removeEventListener('click', removeFromDOM);
};

function duplicate(e, treeLevel) {
    const element = e.target.parentElement;
    const clone = template(element.outerHTML);
    const deleteButtons = clone.querySelectorAll('[DOMMaker="delete"]');
    const duplicateButtons = clone.querySelectorAll('[DOMMaker="duplicate"]');
    const selects = clone.querySelectorAll('select[DOMMaker]');
    const components = getComponents(clone, true);

    if(selects.length) selects.forEach(select => {
        select.addEventListener('input', e => addChild(e, Object.assign(components, {
            container: select.parentElement
        }), treeLevel), false);
    });

    [...deleteButtons].forEach(btn => btn.addEventListener('click', removeFromDOM));
    [...duplicateButtons].forEach(btn => btn.addEventListener('click', duplicate));
    
    element.parentElement.appendChild(clone);
};

function addChild(e, components, treeLevel) {
    const { value } = e.target;
    const newElement = template(`
        <li DOMMakerTreeLevel="${treeLevel}">
            <button DOMMaker="delete">Delete</button>
            ${
                components.containerType === 'object' ?
                `<b contenteditable>${components.input.value}</b>` : ''
            }
            ${components.options[value]}
            <button DOMMaker="duplicate">Duplicate</button>
        </li>
    `);

    components.disabled().selected = true;

    components.container.appendChild(newElement);

    const deleteButton = newElement.querySelector('[DOMMaker="delete"]');
    const duplicateButton = newElement.querySelector('[DOMMaker="duplicate"]');
    duplicateButton.addEventListener('click', e => duplicate(e, treeLevel));
    deleteButton.addEventListener('click', removeFromDOM);

    [...newElement.querySelectorAll(
        '[DOMMaker="object"], [DOMMaker="array"]'
    )].forEach(e => fillContainerWithEmptyValues(e, treeLevel));
}

function fillContainerWithEmptyValues(container, treeLevel = 0) {
    const components = getComponents(container);

    components.select.addEventListener('input', e => addChild(e, components, treeLevel + 1), false);
}

fillContainerWithEmptyValues(document.querySelector('[DOMMaker]'));
