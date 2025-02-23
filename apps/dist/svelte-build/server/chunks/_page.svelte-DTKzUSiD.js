import { e as escape_html } from './escaping-CqgfEcN3.js';
import { c as pop, p as push } from './index-CPDq-rzA.js';

function _page($$payload, $$props) {
  push();
  let { data } = $$props;
  $$payload.out += `<div>CONTENT!!! ${escape_html(data.id)}</div>`;
  pop();
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DTKzUSiD.js.map
