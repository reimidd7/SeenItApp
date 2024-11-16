import React from 'react';
import { useState } from 'react'; // kinda like action listeners
import Header from './header';

const App = () => {
    const [currentTab, setCurrentTab] = useState('home');

    return (
        <div>
           <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
           {currentTab === 'home' && (
                <p>Welcome to SeenIt! Use the navigation to get started.</p>
            )}
            {currentTab === 'search' && (
                <p>Search Shows Component Goes Here</p>
            )}
            {currentTab === 'watched' && (
                <p>Watched Shows Component Goes Here</p>
            )}
        </div>
    );
};

export default App;
