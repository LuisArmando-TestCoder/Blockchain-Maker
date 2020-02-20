const getDOMMakerData = document.getElementById('getDOMMakerData');

function getDOMMakerInput(container) {
    const string = container.querySelector('[DOMMaker="string"]');
    const number = container.querySelector('[DOMMaker="number"]');
    const boolean = container.querySelector('[DOMMaker="boolean"]');

    return boolean || number || string;
}

function getContainerType(container) {
    const object = container.querySelector('[DOMMaker="object"]');
    const array = container.querySelector('[DOMMaker="array"]');
    const element = (
        array || object || getDOMMakerInput(container) || container
    );
    const containerType = element.getAttribute('DOMMaker');
    console.log("element", element);
    console.log("containerType", containerType);
    return containerType;
}

function getDataByType(type, container) {
    const input = getDOMMakerInput(container);
    // console.log('getDataByType input', input);
    return ({
        object: {},
        array: [],
        string: input && input.value,
        number: input && input.value,
        boolean: input && input.checked,
    })[type];
}

function getDataName(container) {
    const dataNameElement = container.querySelector('b[contenteditable]');
    return dataNameElement ? dataNameElement.innerText : '';
}

function JSONLikeDOMTaker(container, parentData) {
    const treeIndex = container.getAttribute('DOMMakerTreeLevel');
    const children = container.querySelectorAll(`[DOMMakerTreeLevel="${treeIndex}"] > li`);
    const type = getContainerType(container);
    const data = getDataByType(type, container);
    const name = getDataName(container);

    if (typeof parentData === 'object' && parentData.length) { // parentData is an array
        parentData.push(data);
    } else if (parentData) { // parentData is an object
        parentData[name] = data;
    }

    if (children.length) [...children].forEach(child => {
        JSONLikeDOMTaker(child, data);
    });

    // console.log('container', container);
    // console.log('type', type);
    // console.log('data', data);
    // console.log('name', name);
    // console.log('children', children);

    return data;
}

getDOMMakerData.addEventListener('click', e => 
    console.log(
        JSONLikeDOMTaker(
            document.querySelector('[DOMMaker]')
        )
    )
);