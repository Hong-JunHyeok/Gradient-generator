import Handlebars from "handlebars";
import { AnyObject } from "@src/types/common";

const template = /* html */ `
    <style>
      #copy-text {
        transition: ease-in .2s;
        background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}{{angle}}deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})
      }
      #copy-text:hover {
        color :white
      }
    </style>
    <header>
      <ul class="flex">
        {{#each codeTypes}}
          <li id="code-toggle" data-index="{{this.type}}" class="p-3 cursor-pointer select-none text-gray-100" style="background: {{#ifEquals this.type ../codeData}}{{this.specialColor}}{{else}}bg-gray-300{{/ifEquals}}; color: bg-gray-500;">{{this.type}}</li>
        {{/each}}
      </ul>
    </header>
    <pre class="flex flex-col">
        <code class="{{codeData}}">
          {{#ifEquals codeData "css"}}
background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}{{angle}}deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})
          {{/ifEquals}}
        </code>
        <button id="copy-text" class="w-full py-1" style="">Copy {{codeData}}</button>
    </pre>
    `;

Handlebars.registerHelper(
  "ifEquals",
  function (arg1: any, arg2: any, options: AnyObject) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  }
);

export default Handlebars.compile(template);
