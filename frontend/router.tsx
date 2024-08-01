import { createBrowserRouter } from 'react-router-dom';
import AncestorsList from './src/AncestorsList';
import AncestorView from './src/AncestorView';

const router = createBrowserRouter({
    // {
    //     path: '/',
    //     element: <home />,
    // },
    {
        path: '/ancestors',
        element: <AncestorsList />,
    },
    {
        path: '/ancestors/:id',
        element: <AncestorView />,
    },
});

export default router;