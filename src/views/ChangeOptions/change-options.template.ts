import { compile } from 'handlebars';

const template = /* html */ `
<div class="flex items-center justify-center flex-col">
  <div>
    {{#if isLinear}}
    <div id="angle-container" class="flex py-5">
      <div class="flex flex-col items-center justify-center h-10 w-full rounded-lg relative bg-transparent mt-1">
        <h1 id="angle" class="text-lg font-bold">Angle : {{angle}}</h1>
        <div class="flex">
          <button id="decrease" data-value="-1" class="w-4 mx-2 rounded bg-gray-300 text-black">-<button>
          <input id="change-angle" value="{{this.angle}}" class="rounded-lg overflow-hidden appearance-none bg-gray-400 h-3 w-128" type="range" min="0" max="360"></input>
          <button id="increase" data-value="1" class="w-4 mx-2 rounded bg-gray-300 text-black">+<button>
        </div>
      </div>
    </div>
    {{/if}}
  </div>
  <div>
    <button id="linear" class="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Linear</button>
    <button id="radial" class="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Radial</button>
  </div>
</div>
`;

export default compile(template);
