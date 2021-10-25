import { AnyObject } from "../types/common";

const template = /* html */ `
      <table class="table-auto space-y-4 min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">색</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stop</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">색 변경</th>
          </tr>
        </thead>
        <tbody>
        {{#each colorList}}
          <tr id="color-item" class="{{#ifEquals this.index ../activeColor.index}}rounded ring-4 ring-indigo-300{{/ifEquals}}">
              <td class="px-6 py-4 whitespace-nowrap"><button class="w-12 font-bold">&times;</button></td>
              <td class="px-6 py-4 whitespace-nowrap"><div style="background: {{this.color}}" class="p-8 rounded-full"></div></td>
              <td class="px-6 py-4 whitespace-nowrap"><input id="change-stop" value="{{this.stop}}" class="w-18 " type="number" min="0" max="100" data-index="{{this.index}}"></input></td>
              <td class="px-6 py-4 whitespace-nowrap"><button id="change-color" class="bg-purple-600 w-20 bg-opacity-75 rounded h-12 text-gray-100" data-index="{{this.index}}">색 설정</button></td>
          </tr>
            {{/each}}
        </tbody>
      </table>
`;

window.Handlebars.registerHelper(
  "ifEquals",
  function (arg1: any, arg2: any, options: AnyObject) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  }
);

export default window.Handlebars.compile(template);
