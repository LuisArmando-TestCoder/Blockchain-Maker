import template from './template.js';

function getDataByType(type, container) {
    const input = container.querySelector('input');
    return ({
        object: {},
        array: [],
        string: input.value,
        number: input.value,
        boolean: input.checked,
    })[type];
}

function JSONLikeDOMTaker(container, wrapper = {}) {
    // dataWrapper = previous parent data
    // wrapper = {data, type}
    const assistantType = () => container.querySelector('[DOMMaker]').getAttribute('DOMMaker');
    const type = container.getAttribute('DOMMaker') || assistantType();
    const isWrapperObject = wrapper.type === 'object';
    const data = getDataByType(type, container);
    const name = container.querySelector('b[contenteditable]');
    const children = [...container.querySelectorAll('[DOMMaker] > li')];

    if(wrapper.data && isWrapperObject) {
        wrapper.data[name] = data;
    } else if(wrapper.type === 'array') {
        // more verbose than else if(wrapper.data)
        wrapper.data.push(data);
    }

    for (let child of children) {
        return JSONLikeDOMTaker(child, { data, type });
    }

    return data;
}

const container = template`
<ul dommaker="object">
  <div dommaker="">
    <p><input dommaker="" type="text" value="value" /></p>
    <select dommaker="">
      <option disabled="" selected="">Choose your value type</option>

      <option value="string">
        string
      </option>
      ,
      <option value="boolean">
        boolean
      </option>
      ,
      <option value="number">
        number
      </option>
      ,
      <option value="object">
        object
      </option>
      ,
      <option value="array">
        array
      </option>
    </select>
  </div>
  <li>
    <button dommaker="delete">Delete</button>
    <b contenteditable="">s</b>
    <input type="text" placeholder="string" dommaker="string" />
    <button dommaker="duplicate">Duplicate</button>
  </li>
  <li>
    <button dommaker="delete">Delete</button>
    <b contenteditable="">b</b>
    <input type="checkbox" dommaker="boolean" />
    <button dommaker="duplicate">Duplicate</button>
  </li>
  <li>
    <button dommaker="delete">Delete</button>
    <b contenteditable="">n</b>
    <input type="number" placeholder="123" dommaker="number" />
    <button dommaker="duplicate">Duplicate</button>
  </li>
  <li>
    <button dommaker="delete">Delete</button>
    <b contenteditable="">o</b>
    <ul dommaker="object">
      <div dommaker="">
        <p><input dommaker="" type="text" value="value" /></p>
        <select dommaker="">
          <option disabled="" selected="">Choose your value type</option>

          <option value="string">
            string
          </option>
          ,
          <option value="boolean">
            boolean
          </option>
          ,
          <option value="number">
            number
          </option>
          ,
          <option value="object">
            object
          </option>
          ,
          <option value="array">
            array
          </option>
        </select>
      </div>
      <li>
        <button dommaker="delete">Delete</button>
        <b contenteditable="">s</b>
        <input type="text" placeholder="string" dommaker="string" />
        <button dommaker="duplicate">Duplicate</button>
      </li>
      <li>
        <button dommaker="delete">Delete</button>
        <b contenteditable="">b</b>
        <input type="checkbox" dommaker="boolean" />
        <button dommaker="duplicate">Duplicate</button>
      </li>
      <li>
        <button dommaker="delete">Delete</button>
        <b contenteditable="">n</b>
        <input type="number" placeholder="123" dommaker="number" />
        <button dommaker="duplicate">Duplicate</button>
      </li>
      <li>
        <button dommaker="delete">Delete</button>
        <b contenteditable="">o</b>
        <ul dommaker="object">
          <div dommaker="">
            <p><input dommaker="" type="text" value="value" /></p>
            <select dommaker="">
              <option disabled="" selected="">Choose your value type</option>

              <option value="string">
                string
              </option>
              ,
              <option value="boolean">
                boolean
              </option>
              ,
              <option value="number">
                number
              </option>
              ,
              <option value="object">
                object
              </option>
              ,
              <option value="array">
                array
              </option>
            </select>
          </div>
        </ul>
        <button dommaker="duplicate">Duplicate</button>
      </li>
      <li>
        <button dommaker="delete">Delete</button>
        <b contenteditable="">a</b>
        <ol dommaker="array">
          <div dommaker="">
            <p></p>
            <select dommaker="">
              <option disabled="" selected="">Choose your value type</option>

              <option value="string">
                string
              </option>
              ,
              <option value="boolean">
                boolean
              </option>
              ,
              <option value="number">
                number
              </option>
              ,
              <option value="object">
                object
              </option>
              ,
              <option value="array">
                array
              </option>
            </select>
          </div>
        </ol>
        <button dommaker="duplicate">Duplicate</button>
      </li>
    </ul>
    <button dommaker="duplicate">Duplicate</button>
  </li>
  <li>
    <button dommaker="delete">Delete</button>
    <b contenteditable="">b</b>
    <ol dommaker="array">
      <div dommaker="">
        <p></p>
        <select dommaker="">
          <option disabled="" selected="">Choose your value type</option>

          <option value="string">
            string
          </option>
          ,
          <option value="boolean">
            boolean
          </option>
          ,
          <option value="number">
            number
          </option>
          ,
          <option value="object">
            object
          </option>
          ,
          <option value="array">
            array
          </option>
        </select>
      </div>
      <li>
        <button dommaker="delete">Delete</button>

        <input type="text" placeholder="string" dommaker="string" />
        <button dommaker="duplicate">Duplicate</button>
      </li>
      <li>
        <button dommaker="delete">Delete</button>

        <input type="checkbox" dommaker="boolean" />
        <button dommaker="duplicate">Duplicate</button>
      </li>
      <li>
        <button dommaker="delete">Delete</button>

        <input type="number" placeholder="123" dommaker="number" />
        <button dommaker="duplicate">Duplicate</button>
      </li>
      <li>
        <button dommaker="delete">Delete</button>

        <ul dommaker="object">
          <div dommaker="">
            <p><input dommaker="" type="text" value="value" /></p>
            <select dommaker="">
              <option disabled="" selected="">Choose your value type</option>

              <option value="string">
                string
              </option>
              ,
              <option value="boolean">
                boolean
              </option>
              ,
              <option value="number">
                number
              </option>
              ,
              <option value="object">
                object
              </option>
              ,
              <option value="array">
                array
              </option>
            </select>
          </div>
          <li>
            <button dommaker="delete">Delete</button>
            <b contenteditable="">value</b>
            <input type="text" placeholder="string" dommaker="string" />
            <button dommaker="duplicate">Duplicate</button>
          </li>
          <li>
            <button dommaker="delete">Delete</button>
            <b contenteditable="">value</b>
            <input type="checkbox" dommaker="boolean" />
            <button dommaker="duplicate">Duplicate</button>
          </li>
          <li>
            <button dommaker="delete">Delete</button>
            <b contenteditable="">value</b>
            <input type="number" placeholder="123" dommaker="number" />
            <button dommaker="duplicate">Duplicate</button>
          </li>
        </ul>
        <button dommaker="duplicate">Duplicate</button>
      </li>
      <li>
        <button dommaker="delete">Delete</button>

        <ol dommaker="array">
          <div dommaker="">
            <p></p>
            <select dommaker="">
              <option disabled="" selected="">Choose your value type</option>

              <option value="string">
                string
              </option>
              ,
              <option value="boolean">
                boolean
              </option>
              ,
              <option value="number">
                number
              </option>
              ,
              <option value="object">
                object
              </option>
              ,
              <option value="array">
                array
              </option>
            </select>
          </div>
          <li>
            <button dommaker="delete">Delete</button>

            <input type="text" placeholder="string" dommaker="string" />
            <button dommaker="duplicate">Duplicate</button>
          </li>
          <li>
            <button dommaker="delete">Delete</button>

            <input type="checkbox" dommaker="boolean" />
            <button dommaker="duplicate">Duplicate</button>
          </li>
          <li>
            <button dommaker="delete">Delete</button>

            <input type="number" placeholder="123" dommaker="number" />
            <button dommaker="duplicate">Duplicate</button>
          </li>
          <li>
            <button dommaker="delete">Delete</button>

            <input type="text" placeholder="string" dommaker="string" />
            <button dommaker="duplicate">Duplicate</button>
          </li>
        </ol>
        <button dommaker="duplicate">Duplicate</button>
      </li>
    </ol>
    <button dommaker="duplicate">Duplicate</button>
  </li>
</ul>
`

console.log(JSONLikeDOMTaker(container));