const template = /* html */ `
  <button id="export-button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
      <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
    </svg>
    <span>Export to PNG</span>
  </button>
`;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

export default insecureHandlebars.compile(template);
