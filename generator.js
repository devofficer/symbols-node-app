const tabStr = '  ';
const blacklist = [
  'tag',
  'text',
  'children'
];

function getHypenAttrStr(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

const generate = (obj, indent = '') => {
  let htmlStr = `${indent}<${obj.tag}`;

  const propertyStrArr = Object.keys(obj).map((property) => {
    // check if current property is in blacklist = not a valid html element attribute
    if(blacklist.includes(property)) return '';

    // check if current value is an object
    if(typeof obj[property] === 'object') {
      const keyStr = Object.keys(obj[property])
        .map(key => {
          const attr = getHypenAttrStr(key);
          return `${attr}: ${obj[property][key]}`;
        })
        .join('; ');
      return ` ${property}="${keyStr}"`
    }

    // check if current value is a single value
    return ` ${property}="${obj[property]}"`;
  });
  
  // add start tag
  htmlStr = `${indent}<${obj.tag}${propertyStrArr.join('')}>`

  if(obj.text || obj.children) {
    htmlStr += '\n';
  }

  // add text content
  if(obj.text) {
    htmlStr += `${indent + tabStr}`;
    htmlStr += obj.text;
    htmlStr += '\n';
  }

  // add children
  if (obj.children) {
    for (const child of obj.children) {
      htmlStr += generate(child, indent + tabStr) + '\n';
    }
  }

  if(obj.text || obj.children) 
    htmlStr += indent; 

  // add end tag
  htmlStr += `</${obj.tag}>`;
  return htmlStr;
}

export default generate;