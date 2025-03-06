import { c as pop, d as stringify, p as push } from './index-42YinwoM.js';
import { a as attr, e as escape_html } from './attributes-fXPlUtWZ.js';

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
//# sourceMappingURL=_page.svelte-oqHH15Fv.js.map
