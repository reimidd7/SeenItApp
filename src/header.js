import React from "react";

const Header = ({ currentTab, setCurrentTab }) => {
    return (
        <header style={styles.header}>
            <h1 style={styles.title} >SeenIt</h1>
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
        background: '#718F94',
        color: '#F2F2EE',
        padding: '10px',
        textAlign: 'center',
        display: 'flex', // Enable Flexbox
        justifyContent: 'space-between', // Spread items (title on the left, buttons on the right)
        alignItems: 'center', // Vertically center items
    },
    navButton: {
        margin: '0 10px', // Space between buttons
        padding: '10px 15px', // Increase padding for larger background
        color: '#F2F2EE', // Text color
        background: '#94A4A4', // Button background color
        border: 'none', // Remove default border
        cursor: 'pointer', // Change cursor to pointer on hover
        borderRadius: '18px', // Make the button round (higher values make it more oval)
        fontSize: '16px', // Adjust font size if needed

    },
    title: {
        margin: 0,
        fontSize: '32px',
    },
    nav: {
        display: 'flex',
    }
};

export default Header;