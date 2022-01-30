const template = /* html */ `
    <main>
        <header class="w-full shadow font-bold fixed top-0 left-0">
            <h1 class="text-2xl text-purple-700 text-opacity-50 container mx-auto p-4">
                {{title}}
            </h1>
            <div id="prev-gradient" class="w-full h-80 bg-gray-100">
            </div>
        </header>
        <section id="palette" class="relative container mx-auto rounded-lg shadow bg-gray-50 flex flex-col md:flex-wrap-reverse p-3" style="margin-top: 22rem;">
            <div class="flex justify-between">
                <ul class="flex">
                    <li class="mr-3">
                        <a class="inline-block border shadow-lg rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3" href="#pallete">Pallete</a>
                    </li>
                    <li class="mr-3">
                        <a class="inline-block border shadow-lg rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3" href="#text">Text</a>
                    </li>
                    <li class="mr-3">
                        <a class="inline-block border shadow-lg rounded hover:border-gray-200 text-blue-500 hover:bg-gray-200 py-1 px-3" href="#code">Code Viewer</a>
                    </li>
                </ul>
                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
                    <span>Export to PNG</span>
                </button>
            </div>
            <div id="text-input"></div>
            <section id="palette-gradient">
                <div id="gradient-bar"></div>
            </section>
            <section>
                <div id="color-list"></div>
            </section>
            <section id="palette-options">
                <div id="change-option" class="p-2 flex flex-col"></div>
            </section>
            <div id="code-viewer"></div>
            <div id="md-viewer"></div>
        </section>
    </main>
`;

const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const insecureHandlebars = allowInsecurePrototypeAccess(window.Handlebars);

export default insecureHandlebars.compile(template);
