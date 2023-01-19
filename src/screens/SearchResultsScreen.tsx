import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getMoviesByName } from '../helpers/getMovieUtils';
import { ShowCard } from '../components';
import { ShowData } from '../types';
import { getTvByName } from '../helpers/getTvUtils';

/**
 * This loader is mostly built straight from the react-router docs
 * https://reactrouter.com/en/main/components/form#get-submissions
 *
 * @param request | HTTP GET request from the SearchInput component
 * @returns {Promise<string>} | the users query
 */
export async function loader({ request }: { request: Request }): Promise<string> {
    // get the query parameters from the URL
    const url = new URL(request.url);
    const query = url.searchParams.get('q')?.trim();
    if (!query) {
        throw new Response('Bad Request', { status: 400 });
    }
    return query as string;
}

/**
 * @returns {JSX.Element} results page after user input
 */
export default function SearchResultsScreen(): JSX.Element {
    const query: string = useLoaderData() as string;
    const [movieDetails, setMovieDetails] = useState<ShowData[] | null>(null);
    const [tvDetails, setTvDetails] = useState<ShowData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const handler = async () => {
            const movieData: ShowData[] | null = await getMoviesByName(query);
            const tvData: ShowData[] | null = await getTvByName(query);
            setMovieDetails(movieData);
            setTvDetails(tvData);
            setLoading(false);
        };
        handler();
    }, [query]);

    // TODO: #194 Make skeleton loading screen
    if (loading) return <p data-testid='search-results-loader'>Loading...</p>;

    return (
        <>
            <h1 data-testid='search-results-heading'>Search Results Page</h1>
            <p>Query: {query}</p>
            <div className='flex flex-wrap justify-center'>
                {movieDetails?.map((item, i) => item && <ShowCard key={i} details={item} />)}
                {tvDetails?.map((item, i) => item && <ShowCard key={i} details={item} />)}
            </div>
        </>
    );
}
