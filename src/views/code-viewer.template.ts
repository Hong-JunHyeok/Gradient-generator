const template = /* html */ `
    <style>
      #copy-text {
        background: white;
        transition: ease-in .2s;
      }
      #copy-text:hover{
        background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})
      }
    </style>
    <pre class="flex flex-col my-6">
      <code class="css">
      background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})
      </code>
      <button id="copy-text" class="w-full	rounded hover:text-gray-100 py-1" style="">Copy</button>
    </pre>
`;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

export default insecureHandlebars.compile(template);
