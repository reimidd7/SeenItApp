import React from "react";
import theme from './theme';

const Header = ({ currentTab, setCurrentTab }) => {
    return (
        <header style={styles.header}>
            <button onClick={() => setCurrentTab('home')} style={styles.title}>
                    SeenIt
                </button>
            <nav style={styles.nav}>
                <button onClick={() => setCurrentTab('search')} style={styles.navButton}>
                    Search Shows
                </button>
                <button onClick={() => setCurrentTab('watched')} style={styles.navButton}>
                    Watched Shows 
                </button>
            </nav>
        </header>
    );
};

const styles = {
    header: {
        background: theme.colors.mainColor,   // Header background
        height: '56px',
        color: theme.colors.lightShade,       // Text color
        padding: '10px ',    // Inner spacing
        display: 'flex',         // Enable flexbox
        justifyContent: 'space-between', // Space between title and nav
        alignItems: 'center',    // Center items vertically
        borderBottom: '2px solid #455861', // Visual separator
        
    },
    navButton: {
        margin: '0 10px', // Space between buttons
        padding: '10px 15px', // Increase padding for larger background
        color: theme.colors.lightShade, // Text color
        background: theme.colors.lightAccent, // Button background color
        border: 'none', // Remove default border
        cursor: 'pointer', // Change cursor to pointer on hover
        borderRadius: '18px', // Make the button round (higher values make it more oval)
        fontSize: theme.fonts.size.medium, // Adjust font size if needed
        fontFamily: theme.fonts.family, // Sets font style
        textShadow: `-1px -1px 0 #8790A1, 
                     1px -1px 0 #8790A1, 
                     -1px 1px 0 #8790A1, 
                     1px 1px 0 #8790A1` , // Creates outline effect around text
        WebkitTextStroke: theme.colors.darkShade,

    },
    title: {
        margin: 0,               // Removes default margins
        fontSize: theme.fonts.size.large,        // Sets title text size
        background: 'transparent', // Makes button background transparent
        color: theme.colors.lightShade,        // Title text color
        padding: '5px',          // Adds space inside button
        border: 'none',          // Removes default button border
        cursor: 'pointer',       // Changes cursor to hand on hover
        fontFamily: 'verdana, sans-serif', // Sets font style
        fontWeight: 550,         // Sets text thickness
        textShadow: `-1px -1px 0 #8790A1, 
                     1px -1px 0 #8790A1, 
                     -1px 1px 0 #8790A1, 
                     1px 1px 0 #8790A1`,  // Creates outline effect around text
        WebkitTextStroke: '#8790A1',
        
    },
    nav: {
        display: 'flex',
    }
};

export default Header;