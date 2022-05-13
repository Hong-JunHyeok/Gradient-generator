const template = /* html */ `
    <main>
        <header class="w-full shadow font-bold fixed top-0 left-0">
            <div id="prev-gradient-container" class="w-full h-80 bg-gray-100">
            </div>
        </header>
        <section id="palette" class="relative container mx-auto rounded-lg shadow bg-gray-50 flex flex-col md:flex-wrap-reverse p-3" style="margin-top: 18rem;">
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
                <div id="export-button-flag"></div>
            </div>
            <div id="color-picker" class="grid place-content-center"></div>
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
