import React, { useState } from "react";
import theme from "./theme";

const Watched = ({ watched, onRemoveShow, updateShowSeasons }) => {
    const [showToDelete, setShowToDelete] = useState(null);

    const handleDeleteClick = (show) => {
        setShowToDelete(show);
    };

    const confirmDelete = () => {
        if (showToDelete) {
            onRemoveShow(showToDelete.id);
            setShowToDelete(null);
        }
    };

    const handleSeasonChange = (showId, season) => {
        updateShowSeasons(showId, season);
    };

    const isShowComplete = (show) => {
        return show.seasonsWatched.length === show.number_of_seasons;
    };

    const sortShows = (shows) => {
        return shows.sort((a, b) => {
            const isAComplete = a.seasonsWatched.length === a.number_of_seasons;
            const isBComplete = b.seasonsWatched.length === b.number_of_seasons;

            // Sort incomplete shows before complete ones
            if (isAComplete && !isBComplete) return 1;
            if (!isAComplete && isBComplete) return -1;
            return 0;
        });
    };

    const sortedWatched = sortShows(watched);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Watched List</h2>
            {watched.length === 0 ? (
                <p style={styles.emptyMessage}>You haven't added any shows yet.</p>
            ) : (
                <div style={styles.list}>
                    {sortedWatched.map((show) => (
                        <div 
                        key={show.id} 
                        style={{
                            ...styles.listItem,
                            backgroundColor: isShowComplete(show) ? theme.colors.complete : theme.colors.darkShade
                        }}
                        >
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
                                <div style={styles.seasonsContainer}>
                                <h4 style={styles.seasonTitle}>Seasons:</h4>
                                <div style={styles.seasonsList}> 
                                    {Array.from({ length: show.number_of_seasons }, (_, i) => (
                                        <label key={i} style={styles.seasonLabel}>
                                            <input
                                                type="checkbox"
                                                checked={show.seasonsWatched && show.seasonsWatched.includes(i + 1)}
                                                onChange={() => handleSeasonChange(show.id, i + 1)}
                                            />
                                            {i + 1}
                                        </label>
                                    ))}
                                    </div>
                                </div>
                                <button style={styles.deleteButton} onClick={() => handleDeleteClick(show)}>
                                    delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showToDelete && (
                <div style={styles.popup}>
                    <p> Are you sure you want to delete {showToDelete.name}?</p>
                    <button style={styles.popupButton} onClick={confirmDelete}>Yes</button>
                    <button style={styles.popupButton} onClick={() => setShowToDelete(null)}>No</button>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        width: '100%',           // Full width
        height: 'calc(100vh - 94px)',          // Full height of the content container
        overflowY: 'auto',
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
        position: "relative",
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
        justifyContent: "center", 
        flex: 1,
    },
    titleText: {
        fontSize: theme.fonts.size.medium,
        fontFamily: theme.fonts.family,
        color: theme.colors.lightShade,
        margin: '5px 0',
    },
    subDetails: {
        fontSize: theme.fonts.size.small,
        color: theme.colors.lightAccent,
        margin: '5px 0',
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
    seasonsContainer: {
      display: 'flex',
      alignItems: 'center',
      margin: '5px 0',
    },
    seasonTitle : {
        fontSize: theme.fonts.size.medium,
        color: theme.colors.lightAccent,
        fontFamily: theme.fonts.family,
        marginRight: '10px',
    },
    seasonsList: {
        display: 'flex',
        flexWrap: 'wrap',  
    },
    seasonLabel: {
        margin: '0 10px 0px 0',
        display: 'flex',
        alignItems: 'center',
        color: theme.colors.lightShade,
    },

    deleteButton: {
        position: "absolute",
        right: "10px",
        top: "10px",
        backgroundColor: "#f44336",
        color: theme.colors.lightShade,
        border: "none",
        borderRadius: "20px",
        padding: "5px 10px",
        cursor: "pointer",
        opacity: '0.5',
    },
    
    popup: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: theme.colors.darkAccent,
        padding: "20px",
        border: "1px solid #718F94",
        color: theme.colors.lightShade,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        zIndex: 1000,
    },
    popupButton: {
        backgroundColor: theme.colors.lightShade,
        border: "none",
        cursor: "pointer",
        marginRight: '15px',
        color: theme.colors.darkShade,

    },
};

export default Watched;