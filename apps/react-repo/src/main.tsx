import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// compoenents
import List from "@/components/List";
import Content from "@/components/Content";
import NotFound from "@/components/NotFound";
import Layout from "@/components/Layout";
import Write from "@/components/Write";

// css
import "@styles/main.css";
import "@styles/framework.css";
import NotAuth from "@/components/NotAuth";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route path="react">
          <Route index element={<List />} />
          <Route path="content/:contentID" element={<Content />} />
          <Route path="write" element={<Write />} />
          <Route path="not-auth" element={<NotAuth />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
