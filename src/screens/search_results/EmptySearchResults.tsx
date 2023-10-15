import React from 'react';
import { Typography as Typ } from '@mui/material';
import ShowCarousel from '../../components/ShowCarousel';
import useTrendingShows from '../../hooks/useTrendingShows';
import Button from '../../components/Button';
import { Home } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface EmptySearchResultsProps {
    /**
     * String of query searched by user
     */
    query: string;
    /**
     * Search results screen header
     */
    header: JSX.Element;
}

/**
 * Rendered when MDB returns no results for a search.
 *
 * @returns {JSX.Element} | Search Error
 */
const EmptySearchResults: React.FC<EmptySearchResultsProps> = ({ query, header }): JSX.Element => {
    const navigate = useNavigate();
    const { trendingShows } = useTrendingShows();

    return (
        <>
            {header}
            <section className='flex flex-col m-auto text-left px-6'>
                <div className='flex flex-col items-center mt-6 m-2'>
                    <img src='/images/no-search-results.png' className='mb-5 w-64 inline'></img>
                    <Typ sx={{ fontSize: 30 }}>No results found!</Typ>
                    <div className='m-2'>
                        <Typ display='inline'>We couldn&apos;t find any search results for</Typ>
                        <Typ fontWeight={700} display='inline'>
                            {' ' + query + '! '}
                        </Typ>
                        <Typ display='inline'>
                            Please try again with a different keyword or check your spelling.
                        </Typ>
                    </div>
                    <Button
                        StartIcon={Home}
                        title='Return Home'
                        onClick={() => navigate('/')}
                        sx={{ width: 210 }}
                    />
                </div>
                {trendingShows && (
                    <>
                        <Typ sx={{ fontSize: 20, my: 2 }}>
                            These popular shows might interest you:
                        </Typ>
                        <div className='flex w-full justify-center items-center pb-6'>
                            <ShowCarousel data={trendingShows} />
                        </div>
                    </>
                )}
            </section>
        </>
    );
};

export default EmptySearchResults;
