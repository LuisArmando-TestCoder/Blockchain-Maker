import blockchain from './blockChainMaker.js';

const getDOMMakerDataButton = document.getElementById('getDOMMakerData');
const pushToBlockchainButton = document.getElementById('pushToBlockchain');
const JSONDataTextarea = document.getElementById('JSONData');
const blockchainDataTextarea = document.getElementById('blockchainData');

function getDOMMakerInput(container) {
    const string = container.querySelector('[DOMMaker="string"]');
    const number = container.querySelector('[DOMMaker="number"]');
    const boolean = container.querySelector('[DOMMaker="boolean"]');

    return boolean || number || string;
}

function getParentTreeLevel(element) {
    return element ? +element.parentElement.getAttribute('DOMMakerTreeLevel') : Infinity;
}

function getAlternativeChild(container) {
    const getDOMMaker = type => container.querySelector(`[DOMMaker=${type}]`);
    const object = getDOMMaker('object');
    const array = getDOMMaker('array');
    const objectLevel = getParentTreeLevel(object);
    const arrayLevel = getParentTreeLevel(array);

    return objectLevel < arrayLevel ? object : array;
}

function getDOMMakerWrapper(container) {
    const wrapper = ['object', 'array'].includes(
            container.getAttribute('DOMMaker')
        ) && container ||
        getAlternativeChild(container);

    return wrapper;
}

function getContainerType(container) {
    const element = (
        getDOMMakerWrapper(container) || getDOMMakerInput(container)
    );
    const containerType = element.getAttribute('DOMMaker');
    return containerType;
}

function getDataByType(type, container) {
    const input = getDOMMakerInput(container);
    return ({
        object: {},
        array: [],
        string: input && input.innerText,
        number: input && +input.value,
        boolean: input && input.checked,
    })[type];
}

function getDataName(container) {
    const dataNameElement = container.querySelector('b[contenteditable]');
    return dataNameElement ? dataNameElement.innerText : '';
}

function getContainerChildren(container) {
    const treeIndex = container.getAttribute('DOMMakerTreeLevel');
    const children = container.querySelectorAll(`[DOMMakerTreeLevel="${treeIndex}"] > li`);
    const inmediateChildren = container.querySelectorAll(`[DOMMakerTreeLevel="${treeIndex}"] > [DOMMaker] > li`);

    return children.length && children ||
        inmediateChildren.length && inmediateChildren;
}

function JSONLikeDOMTaker(container, parentData) {
    const children = getContainerChildren(container);
    const type = getContainerType(container);
    const data = getDataByType(type, container);
    const name = getDataName(container);

    if (Array.isArray(parentData)) { // watch out
        parentData.push(data);
    } else if (typeof parentData === 'object') {
        parentData[name] = data;
    }

    if (children.length)[...children].forEach(child => {
        JSONLikeDOMTaker(child, data);
    });

    return data;
}

JSONDataTextarea.addEventListener('focus', e => {
    const data = JSONLikeDOMTaker(
        document.querySelector('[DOMMaker]')
    );
    JSONDataTextarea.innerHTML = JSON.stringify(data, null, 4);
});

blockchainDataTextarea.addEventListener('focus', e => {
    const data = JSONLikeDOMTaker(
        document.querySelector('[DOMMaker]')
    );
    blockchain.setBlock(data);
    blockchainDataTextarea.innerHTML = JSON.stringify(blockchain.chain, null, 4);
});