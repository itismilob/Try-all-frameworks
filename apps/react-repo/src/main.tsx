import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// compoenents
import List from '@/pages/List';
import Content from '@/pages/Content';
import NotFound from '@/pages/NotFound';
import Layout from '@/pages/Layout';
import Write from '@/pages/Write';
import NotAuth from '@/pages/NotAuth';

// css
import '@styles/main.css';
import '@styles/framework.css';

createRoot(document.getElementById('root')!).render(
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
