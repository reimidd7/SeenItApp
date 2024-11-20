import React from 'react';
import { useState } from 'react'; // kinda like action listeners
import Home from './home';
import Header from './header';
import Search from './search';


const App = () => {
    const [currentTab, setCurrentTab] = useState('home');

    return (
        <div>
            <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
            {currentTab === 'home' && (
                <Home/>
            )}
            {currentTab === 'search' && (
                <Search/>
            )}
            {currentTab === 'watched' && (
                <p>Watched Shows Component Goes Here</p>
            )}
        </div>
    );
};

const styles = {
   
}

export default App;
