import React, { useState, useEffect } from 'react';
import Home from './home';
import Header from './header';
import Search from './search';
import Watched from './watched';

const App = () => {
    const [currentTab, setCurrentTab] = useState('home');
    const [watched, setWatched] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load shows when app starts
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
                // Optionally show error to user
            }
        }
    };

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

    if (isLoading) {
        return <div>Loading your shows...</div>;
    }

    return (
        <div>
            <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {currentTab === 'home' && (
                <Home setCurrentTab={setCurrentTab} />
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
