const template = /* html */ `
    <div class="flex items-center justify-center ">
        <button id="linear" class="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Linear</button>
        <button id="radial" class="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Radial</button>
    </div>
`;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

export default insecureHandlebars.compile(template);
