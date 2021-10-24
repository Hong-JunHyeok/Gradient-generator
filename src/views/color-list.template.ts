import { AnyObject } from "../types/common";

const template = /* html */ `
    <ul class="space-y-4">
        {{#each colorList}}
            <li class="flex shadow rounded {{#ifEquals this.index ../activeColor.index}}ring-4 ring-indigo-300{{/ifEquals}}">
                <button class="w-12 font-bold">&times;</button>
                <div style="background: {{this.color}}" class="p-8"></div>
                <input value="{{this.stop}}" class="w-18 " type="number" min="0" max="100"></input>
            </li>
        {{/each}}
    </ul>
`;

window.Handlebars.registerHelper(
  "ifEquals",
  function (arg1: any, arg2: any, options: AnyObject) {
    return arg1 == arg2 ? options.fn(this) : options.inverse(this);
  }
);

export default window.Handlebars.compile(template);
