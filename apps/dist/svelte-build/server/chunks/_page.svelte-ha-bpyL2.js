import { c as pop, d as stringify, p as push } from './index-CPDq-rzA.js';
import { e as escape_html } from './escaping-CqgfEcN3.js';

const replacements = {
  translate: /* @__PURE__ */ new Map([
    [true, "yes"],
    [false, "no"]
  ])
};
function attr(name, value, is_boolean = false) {
  if (value == null || !value && is_boolean || value === "" && name === "class") return "";
  const normalized = name in replacements && replacements[name].get(value) || value;
  const assignment = is_boolean ? "" : `="${escape_html(normalized, true)}"`;
  return ` ${name}${assignment}`;
}
function _page($$payload, $$props) {
  push();
  let userData = void 0;
  $$payload.out += `<div${attr("class", `user-container ${stringify(userData?.framework)}-shadow`)}><div><img${attr("src", userData?.profile)} alt="user profile"> <h1>${escape_html(userData?.username)}</h1></div></div> <div class="contents-container default-shadow"><div class="contents-header"><h2>Contents</h2> <a href="/svelte/write"><img src="/public/pen.svg" alt="pen|"> write</a></div> <ol>`;
  {
    $$payload.out += "<!--[!-->";
    $$payload.out += `<div>No contents</div>`;
  }
  $$payload.out += `<!--]--></ol></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-ha-bpyL2.js.map
