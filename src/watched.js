import React from "react";
import theme from "./theme";

const Watched = ({ watched }) => {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Watched List</h2>
            {watched.length === 0 ? (
                <p style={styles.emptyMessage}>You haven't added any shows yet.</p>
            ) : (
                <div style={styles.list}>
                    {watched.map((show) => (
                        <div key={show.id} style={styles.listItem}>
                            {/*poster*/}
                            <img
                                src={`https://image.tmdb.org/t/p/w200${show.poster_path}`}
                                alt={`${show.name} Poster`}
                                style={styles.poster}
                            />
                            {/*details*/}
                            <div style={styles.details}>
                                <h3 style={styles.titleText}>{show.name}</h3>
                                <p style={styles.subDetails}>
                                    <span style={styles.year}>{show.first_air_date?.slice(0, 4) || "Unknown"}</span>{" "}
                                    <span style={styles.network}>{show.networks?.join(", ") || "Unknown"}</span>{" "}
                                    <span style={styles.seasons}>{show.number_of_seasons} Seasons</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
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
        flexDirection: 'column',
        alignItems: 'center',    // Center children vertically
        justifyContent: 'flex-start', // Align content towards the top
        backgroundColor: theme.colors.mainColor,
        padding: "20px",

    },
    title: {
        fontSize: theme.fonts.size.large,
        fontFamily: theme.fonts.family, // Font style
        color: theme.colors.lightShade,
        marginBottom: '10px',
    },
    emptyMessage: {
        fontSize: theme.fonts.size.small,
        fontFamily: theme.fonts.family, // Font style
        color: theme.colors.lightShade,
    },
    list: {
        display: "flex",
        flexDirection: "column",
        overflowY: 'auto',
        gap: "20px",
        width: "100%",
        maxWidth: "800px",

    },
    listItem: {
        display: "flex",
        backgroundColor: theme.colors.darkShade,
        borderRadius: "10px",
        padding: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    poster: {
        width: "100px",
        height: "150px",
        objectFit: "cover",
        borderRadius: "8px",
    },
    details: {
        marginLeft: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
    },
    titleText: {
        fontSize: theme.fonts.size.medium,
        fontFamily: theme.fonts.family,
        color: theme.colors.lightShade,
    },
    subDetails: {
        fontSize: theme.fonts.size.small,
        color: theme.colors.lightAccent,
    },
    year: {
        fontStyle: "italic",
    },
    network: {
        color: theme.colors.lightShade,
    },
    seasons: {
        fontWeight: "bold",
    },
};

export default Watched;