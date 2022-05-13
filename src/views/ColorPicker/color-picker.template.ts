import { compile } from 'handlebars'

const template = /* html */ `
  <div class="max-w-sm rounded-full overflow-hidden shadow-2xl">
    <div class="px-6 py-4">
      <ul class="flex">
        {{#each colorSet}}
          <li 
            style="background-color: {{this}};"
            class="pallete_color w-8 h-8 rounded cursor-pointer shadow-md hover:bg-violet-400" 
            data-colorHex="{{this}}"
            >
          </li>
        {{/each}}
      </ul>  
    </div>
  </div>
`;

export default compile(template);
