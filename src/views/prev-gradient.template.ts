const template = /* html */ `
    <div 
    id="prev-gradient"
    style="background: {{#if isLinear}}linear{{else}}radial{{/if}}-gradient({{#if isLinear}}90deg{{else}}circle{{/if}},{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})"
    class="h-full">
    </div>
`;

export default window.Handlebars.compile(template);
