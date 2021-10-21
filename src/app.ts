const container = document.getElementById("root");

let headerComponent: string[] = [];

headerComponent.push("<ul>");

[1, 2, 3, 4].forEach((item) => headerComponent.push(`<li>${item}</li>`));

headerComponent.push("</ul>");

container.innerHTML = headerComponent.join("");
