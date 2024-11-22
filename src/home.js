import React from "react";

const Home = ({ setCurrentTab }) => {
    return (
        <div style={styles.container}>

        </div>
    );
};

const styles = {
    container: {
        width: '100%',           // Full width
        height: 'calc(100vh - 94px)',          // Full height of the content container
        boxSizing: 'border-box', // Include padding in dimensions
        display: 'flex',         // Flexbox for alignment
        justifyContent: 'center', // Center children horizontally
        alignItems: 'center',    // Center children vertically
        backgroundColor: '#718F94',
    
    },
}

export default Home;