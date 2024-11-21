import React from "react";

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
        backgroundColor: '#718F94',
    
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    emptyMessage: {
        fontSize: '16px',
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        width: '100%',
    },
    listItem: {
        backgroundColor: '#94A4A4',
        padding: '10px',
        margin: '5px 0',
        borderRadius: '10px',
        textAlign: 'center',
    },
};

export default Watched;