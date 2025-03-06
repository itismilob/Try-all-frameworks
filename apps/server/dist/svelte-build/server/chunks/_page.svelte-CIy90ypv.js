import { a as attr, e as escape_html } from './attributes-fXPlUtWZ.js';
import { c as pop, p as push } from './index-42YinwoM.js';
import './client-CGL0aXpS.js';
import './exports-BJMB-Z8X.js';

function _page($$payload, $$props) {
  push();
  let titleRef = "";
  let contentRef = "";
  $$payload.out += `<h1>Create Post</h1> <input class="title-input default-shadow" placeholder="Title"${attr("value", titleRef)}> <textarea class="content-input default-shadow" placeholder="Content">`;
  const $$body = escape_html(contentRef);
  if ($$body) {
    $$payload.out += `${$$body}`;
  }
  $$payload.out += `</textarea> <div class="button-container"><button>Submit</button> <a href="/svelte/">Discard</a></div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CIy90ypv.js.map
