import React, { useState, useEffect } from 'react';
import Home from './home';
import Header from './header';
import Search from './search';
import Watched from './watched';

// main app component
const App = () => {
    // state variables
    const [currentTab, setCurrentTab] = useState('home'); // tracks currently selected tab
    const [watched, setWatched] = useState([]); // stores watched shows
    const [isLoading, setIsLoading] = useState(true); // tracks loading state

    // useEffect hook to load shows when app starts
    useEffect(() => {
        const loadShows = async () => {
            try {
                // Try to load from file first
                const fileResult = await window.api.loadShowsFromFile();

                if (fileResult.success && fileResult.shows.length > 0) {
                    setWatched(fileResult.shows);
                } else {
                    // If no file data, try localStorage as backup
                    const localData = localStorage.getItem('watchedShows');
                    if (localData) {
                        const localShows = JSON.parse(localData);
                        setWatched(localShows);
                        // Save localStorage data to file for future use
                        await window.api.saveShowsToFile(localShows);
                    }
                }
            } catch (error) {
                console.error('Error loading shows:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadShows();
    }, []);

    // adds a show to the watch list
    const addToWatched = async (show) => {
        if (!watched.some((item) => item.id === show.id)) {
            const updatedWatched = [...watched, { ...show, seasonsWatched: [] }];

            // Update state
            setWatched(updatedWatched);

            try {
                // Save to localStorage
                localStorage.setItem('watchedShows', JSON.stringify(updatedWatched));

                // Save to file
                await window.api.saveShowsToFile(updatedWatched);
            } catch (error) {
                console.error('Error saving shows:', error);
            }
        }
    };

    // removes a show from the watch list
    const removeFromWatched = async (showId) => {
        const updatedWatched = watched.filter(show => show.id !== showId);

        // Update state
        setWatched(updatedWatched);

        try {
            // Save to localStorage
            localStorage.setItem('watchedShows', JSON.stringify(updatedWatched));

            // Save to file
            await window.api.saveShowsToFile(updatedWatched);
        } catch (error) {
            console.error('Error saving shows after removal:', error);
        }
    };

    // updates the seasons watched for a show
    const updateShowSeasons = async (showId, season) => { 
        const updatedWatched = watched.map(show => { 
            if (show.id === showId) { 
                const updatedSeasons = show.seasonsWatched.includes(season) 
                ? show.seasonsWatched.filter(s => s !== season) 
                : [...show.seasonsWatched, season]; 
                
                return { ...show, seasonsWatched: updatedSeasons }; 
            } 
            return show; 
        }); 
        
        setWatched(updatedWatched); 
        
        try { 
            localStorage.setItem('watchedShows', JSON.stringify(updatedWatched)); 
            await window.api.saveShowsToFile(updatedWatched); 
        } catch (error) { 
            console.error('Error updating seasons watched:', error); 
        } 
    };

    // incomplete shows filter
    const incompleteShows = watched.filter(show => show.seasonsWatched.length < show.number_of_seasons);

    if (isLoading) {
        return <div>Loading your shows...</div>;
    }

    return (
        <div>
            <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {currentTab === 'home' && (
                <Home setCurrentTab={setCurrentTab} incompleteShows={incompleteShows}/>
            )}
            {currentTab === 'search' && (
                <Search addToWatched={addToWatched} />
            )}
            {currentTab === 'watched' && (
                <Watched
                    watched={watched}
                    onRemoveShow={removeFromWatched}
                    updateShowSeasons={updateShowSeasons}
                />
            )}
        </div>
    );
};

const styles = {

}

export default App;
