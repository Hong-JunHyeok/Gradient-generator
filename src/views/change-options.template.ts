const template = /* html */ `
    <header class="flex">
        <h1 class="text-2xl font-black">그라데이션 타입 설정</h1>
        <p class="leading-8 px-1">밑의 옵션을 클릭해서 그라데이션의 타입을 설정해보세요.</p>
    </header>
    <button id="linear" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Linear</button>
    <button id="radial" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Radial</button>
`;

export default window.Handlebars.compile(template);
