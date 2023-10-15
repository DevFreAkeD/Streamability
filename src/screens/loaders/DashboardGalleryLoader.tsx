import React from 'react';
import { ShowPosterLoader } from '../../components';

/**
 * Displayed when the dashboard gallery is fetching users shows
 */
const DashboardGalleryLoader: React.FC = () => {
    return (
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 p-6'>
            <ShowPosterLoader count={15} />
        </section>
    );
};

export default DashboardGalleryLoader;
