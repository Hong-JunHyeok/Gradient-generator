const template = /* html */ `
<div class="flex items-center justify-center flex-col">
  <div>
    {{#if isLinear}}
    <div id="angle-container" class="flex py-5 plain-angle default-input">
      <div class="flex flex-col items-center justify-center h-10 w-full rounded-lg relative bg-transparent mt-1">
        <h1 class="text-lg font-bold">Angle</h1>
        <input id="change-angle" value="{{this.angle}}" class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128" type="range" min="0" max="360"></input>
      </div>
    </div>
    {{/if}}
  </div>
  <div>
    <button id="linear" class="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Linear</button>
    <button id="radial" class="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Radial</button>
  </div>
</div>
`;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

export default insecureHandlebars.compile(template);
