import { compile } from "handlebars";

const template = /* html */ `
    <div 
    id="prev-gradient"
    style="
      text-align: center;
    "
    class="h-full grid place-content-center">
      <p 
        id="text-container" 
        style="
          display: inline-block;
          font-size: 12rem;
          color: {{textData.textColor}};
        "
      >
        {{textData.textValue}}
      </p>
    </div>
`;

export default compile(template);
