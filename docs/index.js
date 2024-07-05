const basicInfo = require ('./basicinfo');
const server = require ('./server');
const tags = require ('./tags');
const components = require ('./components');
const omnivox = require ('./omnivox');

module.exports = {
    ...basicInfo,
    ...server,
    ...tags,
    ...components,
    ...omnivox,

}