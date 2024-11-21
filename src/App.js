import React from 'react';
import { useState } from 'react'; // kinda like action listeners
import Home from './home';
import Header from './header';
import Search from './search';
import Watched from './watched';


const App = () => {
    const [currentTab, setCurrentTab] = useState('home');
    const [watched, setWatched] = useState([]);

    const addToWatched = (show) => {
        if (!watched.some((item) => item.id === show.id)) {
            setWatched([...watched, show]);
        }
    };

    return (
        <div>
            <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {currentTab === 'home' && (
                <Home setCurrentTab={setCurrentTab}/>
            )}
            {currentTab === 'search' && (
                <Search addToWatched={addToWatched}/>
            )}
            {currentTab === 'watched' && (
                <Watched watched={watched}/>
            )}
        </div>
    );
};

const styles = {
   
}

export default App;
