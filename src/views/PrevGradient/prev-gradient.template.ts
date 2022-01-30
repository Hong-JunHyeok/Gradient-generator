const template = /* html */ `
    <div 
    id="prev-gradient"
    style="
      background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}{{angle}}deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}});
      overflow: hidden;
    "
    class="h-full grid place-content-center">
      <p 
        id="text-container" 
        style="
          height: 100%;
          text-align: center;
          font-size: 80px;
        "
      >
        {{textData}}
      </p>
    </div>
`;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

export default insecureHandlebars.compile(template);
