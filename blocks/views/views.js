function createSelect(fd) {
  const select = document.createElement('select');
  select.id = `${fd.Field}`;
  if (fd.Placeholder) {
    const ph = document.createElement('option');
    ph.textContent = fd.Placeholder;
    ph.setAttribute('selected', '');
    ph.setAttribute('disabled', '');
    select.append(ph);
  }
  fd.Options.split(',').forEach((o) => {
    const option = document.createElement('option');
    const currentUrl = window.location.href;
    option.textContent = o.trim();
    if (o.trim() === 'url') {
      option.value = currentUrl.trim();
    } else {
      option.value = o.trim();
    }
    select.append(option);
  });
  if (fd.Mandatory === 'x') {
    select.setAttribute('required', 'required');
  }
  return select;
}

function constructPayload(form) {
  const payload = {};
  [...form.elements].forEach((fe) => {
    if (fe.type === 'checkbox') {
      if (fe.checked) payload[fe.id] = fe.value;
    } else if (fe.id) {
      payload[fe.id] = fe.value;
    }
  });
  return payload;
}

async function submitForm(form) {
  const payload = constructPayload(form);
  const resp = await fetch(form.dataset.action, {
    method: 'POST',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: payload }),
  });
  await resp.text();
  return payload;
}

function createButton(fd) {
  const button = document.createElement('button');
  button.textContent = fd.Label;
  button.classList.add('button');
  button.id = 'viewsbutton';
  if (fd.Type === 'submit') {
    button.addEventListener('click', async (event) => {
      const form = button.closest('form');
      if (form.checkValidity()) {
        event.preventDefault();
        button.setAttribute('disabled', '');
        await submitForm(form);
      }
    });
  }
  return button;
}

function createInput(fd) {
  const input = document.createElement('input');
  input.type = fd.Type;
  input.id = fd.Field;
  input.setAttribute('placeholder', fd.Placeholder);
  if (fd.Mandatory === 'x') {
    input.setAttribute('required', 'required');
  }
  return input;
}

function createLabel(fd) {
  const label = document.createElement('label');
  label.setAttribute('for', fd.Field);
  label.textContent = fd.Label;
  if (fd.Mandatory === 'x') {
    label.classList.add('required');
  }
  return label;
}

function applyRules(form, rules) {
  const payload = constructPayload(form);
  rules.forEach((field) => {
    const { type, condition: { key, operator, value } } = field.rule;
    if (type === 'visible') {
      if (operator === 'eq') {
        if (payload[key] === value) {
          form.querySelector(`.${field.fieldId}`).classList.remove('hidden');
        } else {
          form.querySelector(`.${field.fieldId}`).classList.add('hidden');
        }
      }
    }
  });
}

async function createForm() {
  // const { pathname } = new URL(formURL);
  const pathname = '/views-form.json';
  // Write the pathname to the console
  // console.log(pathname);
  const resp = await fetch(pathname);
  // Write resp to the console
  // console.log(resp);
  const json = await resp.json();
  // Write json to the console
  // console.log(json);
  const form = document.createElement('form');
  const rules = [];
  // eslint-disable-next-line prefer-destructuring
  form.dataset.action = pathname.split('.json')[0];
  // Write form.dataset.action to the console
  // console.log(form.dataset.action);
  // const viewspathnameurl = new URL(viewsURL);
  // Write the viewspathname to the console
  // console.log(viewspathnameurl.pathname);
  // console.log(viewsURL);
  // const viewspathname = viewspathnameurl.pathname;
  const viewspathname = '/views.json';
  const viewsresp = await fetch(viewspathname);
  // Write viewsresp to the console
  // console.log(viewsresp);
  // Get the json from the viewsresp
  const viewsjson = await viewsresp.json();
  // Write viewsjson to the console
  // console.log(viewsjson);
  // set the variable siteurl to the current URL
  const siteurl = window.location.href;
  // Write siteurl to the console
  // console.log(siteurl);
  // set the variable viewline by parsing the json viewjson
  // for the key "site" with a value of siteurl
  const viewline = viewsjson.data.find((view) => view.site === siteurl);
  let viewsCount = 0;
  if (!viewline) {
    viewsCount = 0;
  } else {
    // Write viewline to the console
    // console.log(viewline);
    // set the variable viewsCount to the value of the key "views" in the viewline variable
    // const views = viewline.views;
    const { views: Count } = viewline;
    viewsCount = Count;
  }
  // Write views to the console
  // console.log(viewsCount);
  // create a text div with the id "views" and the text content of the views variable
  const viewslabel = document.createElement('label');
  viewslabel.id = 'views';
  viewslabel.textContent = viewsCount;
  json.data.forEach((fd) => {
    fd.Type = fd.Type || 'text';
    const fieldWrapper = document.createElement('div');
    const style = fd.Style ? ` form-${fd.Style}` : '';
    const fieldId = `form-${fd.Field}-wrapper${style}`;
    fieldWrapper.className = fieldId;
    fieldWrapper.classList.add('field-wrapper');
    switch (fd.Type) {
      case 'select':
        fieldWrapper.append(createLabel(fd));
        fieldWrapper.append(createSelect(fd));
        break;
      case 'submit':
        fieldWrapper.append(viewslabel);
        fieldWrapper.append(createButton(fd));
        break;
      default:
        fieldWrapper.append(createLabel(fd));
        fieldWrapper.append(createInput(fd));
    }

    if (fd.Rules) {
      try {
        rules.push({ fieldId, rule: JSON.parse(fd.Rules) });
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`Invalid Rule ${fd.Rules}: ${e}`);
      }
    }
    form.append(fieldWrapper);
  });

  form.addEventListener('change', () => applyRules(form, rules));
  applyRules(form, rules);

  return (form);
}

export default async function decorate(block) {
  // const viewsdiv = document.getElementsByClassName('views block');
  // viewsdiv.id = 'viewsdivid';
  const container = document.createElement('div');
  container.classList.add('container');
  block.appendChild(container);
  container.replaceWith(await createForm());
  // click the button with the label id "views" to increment the views count
  const viewsbutton = document.getElementById('viewsbutton');
  // Write viewsbutton to the console
  // console.log(viewsbutton);
  viewsbutton.click();
}
