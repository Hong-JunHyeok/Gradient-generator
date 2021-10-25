const template = /* html */ `
    <header class="flex">
        <h1 class="text-2xl font-black">그라데이션 타입 설정</h1>
        <p class="leading-8 px-1">밑의 옵션을 클릭해서 그라데이션의 타입을 설정해보세요.</p>
    </header>
    <div class="flex items-center">
        <button id="linear" class="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Linear</button>
        <button id="radial" class="mx-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Radial</button>
    </div>
`;

export default window.Handlebars.compile(template);
