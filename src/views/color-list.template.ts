import { AnyObject } from "../types/common";

const template = /* html */ `
    <hr />
      <table class="table-auto space-y-4 min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
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
          <tr id="color-item" data-index="{{this.index}}" class="{{#ifEquals this.index ../activeColor.index}}rounded ring-4 ring-indigo-300{{/ifEquals}} cursor-pointer">
              <td class="px-6 py-4 whitespace-nowrap"><button class="w-12 font-bold" data-index="{{this.index}}">&times;</button></td>
              <td class="px-6 py-4 whitespace-nowrap">
                <label style="background: {{this.color}}; cursor: copy;" class="p-3 rounded-full" for="color-picker">
                <input id="color-picker" type="color" class="hidden">
                </input>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <input id="change-stop" value="{{this.stop}}" class="input-{{this.index}} rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128" type="range" min="0" max="100" data-index="{{this.index}}"></input>
              </td>
          </tr>
        {{/each}}
        </tbody>
      </table>
      <div id="new-color" class="mt-2 text-green-500 px-6 py-4 whitespace-nowrap text-center bg-gray-200 rounded-lg cursor-pointer">+ New Color Set</div>
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
