const template = /* html */ `
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <div class="px-6 py-4">
    <ul class="flex">
      {{#each colorSet}}
        <li 
          class="pallete_color w-8 h-8 rounded cursor-pointer shadow-md" 
          style="background-color: {{ this }};"
          data-colorHex="{{this}}"
          >
        </li>
      {{/each}}
    </ul>  
  </div>
  <div class="px-6 pt-4 pb-2 ">
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Choose</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#the_color_of</span>
    <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#the_text</span>
  </div>
  </div>
`;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

export default insecureHandlebars.compile(template);
