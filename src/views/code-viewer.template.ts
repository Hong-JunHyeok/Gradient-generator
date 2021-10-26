const template = /* html */ `
    <style>
      #copy-text {
        transition: ease-in .2s;
        background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})
      }
      #copy-text:hover {
        color :white
      }
    </style>
    <pre class="flex flex-col my-6">
      <code class="css">
      background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})
      </code>
      <button id="copy-text" class="w-full	rounded py-1" style="">Copy</button>
    </pre>
`;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

export default insecureHandlebars.compile(template);
