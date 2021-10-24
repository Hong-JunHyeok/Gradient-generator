const template = /* html */ `
    <div 
    id="prev-gradient"
    style="background: linear-gradient(90deg,{{#each colorList}}{{color}} {{stop}}%{{#if @last}}{{else}},{{/if}}{{/each}})"
    class="h-full">
    </div>
`;

export default window.Handlebars.compile(template);
