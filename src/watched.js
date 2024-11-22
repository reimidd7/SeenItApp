import React from "react";
import theme from "./theme";

const Watched = ({ watched }) => {
    return (
        <div style={styles.container}>
             <h2 style={styles.title}>Watched Shows</h2>
            {watched.length === 0 ? (
                <p style={styles.emptyMessage}>You haven't added any shows yet.</p>
            ) : (
                <ul style={styles.list}>
                    {watched.map((show) => (
                        <li key={show.id} style={styles.listItem}>
                            {show.name}
                        </li>
                    ))}
                </ul>
            )}
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
        backgroundColor: theme.colors.mainColor,
    
    },
    title: {
        fontSize: theme.fonts.size.large,
        fontFamily: theme.fonts.family, // Font style
        color: theme.colors.lightShade,
        marginBottom: '20px',
    },
    emptyMessage: {
        fontSize: theme.fonts.size.small,
        fontFamily: theme.fonts.family, // Font style
        color: theme.colors.lightShade,
    },
    list: {
        listStyle: 'none',
        padding: '10px',
        margin: 0,
       
    },
    listItem: {
        backgroundColor: theme.colors.darkShade,
        padding: '10px',
        margin: '5px 0',
        borderRadius: '10px',
        textAlign: 'center',
        color: theme.colors.lightShade,
        fontFamily: theme.fonts.family, // Font style
        fontSize: theme.fonts.size.small,
    },
};

export default Watched;