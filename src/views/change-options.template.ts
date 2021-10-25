const template = /* html */ `
    <header>
        <h1 class="text-2xl font-black">Gradient type setting</h1>
        <p>Click the option below to set the type of gradation.</p>
    </header>
    <div class="flex items-center">
        <button id="linear" class="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Linear</button>
        <button id="radial" class="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Radial</button>
    </div>
`;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

export default insecureHandlebars.compile(template);
