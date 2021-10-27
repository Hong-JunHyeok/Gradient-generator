import { AnyObject } from "../types/common";

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
          <li id="code-toggle" data-index="{{this.type}}" class="p-3 cursor-pointer select-none" style="background: {{#ifEquals this.type ../codeData}}{{this.specialColor}}{{else}}bg-gray-300{{/ifEquals}}; color: bg-gray-500">{{this.type}}</li>
        {{/each}}
      </ul>
    </header>
    <pre class="flex flex-col">
        <code class="{{codeData}}">
          {{#ifEquals codeData "css"}}
            <!--CSS Case-->
background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}{{angle}}deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})
          {{/ifEquals}}
          {{#ifEquals codeData "xml"}}
            <!--XML Case-->
&lt;shape
xmlns:android="http://schemas.android.com/apk/res/android"
android:shape="rectangle"
&gt;
  &lt;gradient
  android:angle="{{#if isLinear}}90{{else}}circle{{/if}}"
  android:centerColor="#b4b4b4"
  android:endColor="#FFFFFF"
  android:startColor="#000000"
  android:type="{{#if isLinear}}linear{{else}}radial{{/if}}" /&gt;
&lt;/shape &gt;
          {{/ifEquals}}
        </code>
        <button id="copy-text" class="w-full py-1" style="">Copy {{codeData}}</button>
    </pre>
    `;

// <code class="{{codeData}}">
//   background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})
// </code>
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

insecureHandlebars.registerHelper(
  "ifEquals",
  function (arg1: any, arg2: any, options: AnyObject) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  }
);

export default insecureHandlebars.compile(template);

//CSS
//background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})

//XML
// <shape
//         xmlns:android="http://schemas.android.com/apk/res/android"
//         android:shape="rectangle"
//         >
//           <gradient
//           android:angle="90"
//           android:centerColor="#b4b4b4"
//           android:endColor="#FFFFFF"
//           android:startColor="#000000"
//           android:type="linear" />
//         </shape>
