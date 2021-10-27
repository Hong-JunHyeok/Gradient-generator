import { AnyObject } from "../types/common";

const template = /* html */ `
    <header id="color-info-container">
      <div id="color-info" class="flex flex-col items-center">
        <div id="color-box" style="background-color: {{activeColor.color}}" class="p-4 w-20 h-20 rounded-full shadow-md"></div>
        <span id="rgb" class="font-bold">{{activeColor.color}}</span>
      </div>
    </header>
    <hr />
      <table class="border-separate p-4 table-auto space-y-4 min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Color</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stop</th>
          </tr>
        </thead>
        <tbody class="pb-6">
        {{#each colorList}}
          <style>
            @media screen and (-webkit-min-device-pixel-ratio: 0) {
            .input-{{this.index}}[type="range"]::-webkit-slider-thumb {
                box-shadow: -405px 0 0 400px {{this.color}};
            }
          </style>
          <tr id="color-item" data-index="{{this.index}}" class="{{#ifEquals this.index ../activeColor.index}}rounded ring-4 ring-indigo-300{{/ifEquals}} cursor-pointer ring-inset">
              <td class="px-6 py-4 whitespace-nowrap"><button class="w-12 font-bold" data-index="{{this.index}}">&times;</button></td>
              <td class="px-6 py-5" data-index="{{this.index}}">                
                <input id="color-picker" data-index="{{this.index}}" name="color-picker" type="color" class="w-0 p-5 rounded" style="background: {{this.color}};">
              </td>
              <td class="px-6 py-4 whitespace-nowrap" data-index="{{this.index}}">
                <input id="change-stop" data-index="{{this.index}}" value="{{this.stop}}" class="input-{{this.index}} rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128" type="range" min="0" max="100"></input>
              </td>
          </tr>
        {{/each}}
        </tbody>
      </table>
      <div id="new-color" class="mt-2 text-green-500 px-6 py-4 whitespace-nowrap text-center bg-gray-200 rounded-lg" style="cursor: copy;" >+ New Color Set</div>
      <hr />
`;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

insecureHandlebars.registerHelper(
  "ifEquals",
  function (arg1: any, arg2: any, options: AnyObject) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  }
);

export default insecureHandlebars.compile(template);
