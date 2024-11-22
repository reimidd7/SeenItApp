import React, { useState, useEffect } from "react";
import theme from "./theme";

const Search = ({addToWatched}) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [addedShows, setAddedShows] = useState({});

    useEffect(() => {
        const fetchResults = async () => {
            if (!query.trim()) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            const apiKey = "a4d85f4a0138ffbd06d3be2bfb02dbcf";
            const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                setResults(data.results || []);
            } catch (error) {
                console.error("Error fetching search results: ", error);
            } finally {
                setIsLoading(false);
            }
        };

        const delayDebounce = setTimeout(fetchResults, 300);

        return () => clearTimeout(delayDebounce);
    }, [query]);

    const handleAddToWatched = (show) => {
        addToWatched(show);
        setAddedShows((prev) => ({
            ...prev,
            [show.id]: true, // mark show as added
        }));

        // revert button to normal after 2 sec
        setTimeout(() => {
            setAddedShows((prev) => ({
                ...prev,
                [show.id]: false,
            }));
        }, 2000);
    };

    return (
        <div style={styles.container}>
             <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={styles.searchBar}
            />

            {isLoading && <p style={styles.loadingMessage}>Loading...</p>}

            <div style={styles.results}>
                {results.map((show) => (
                    <div key={show.id} style={styles.resultItem}>
                        <p>{show.name}</p>
                        <button
                        onClick={() => handleAddToWatched(show)}
                        style={{
                            ...styles.addButton,
                            ...(addedShows[show.id] ? styles.addedButton : {}),
                        }}
                    >
                        {addedShows[show.id] ? "Added" : "Add to Watched"}
                    </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        width: '100%',           // Full width
        height: 'calc(100vh - 100px)',          // Full height of the content container
        display: 'flex',         // Flexbox for alignment
        flexDirection: 'column',
        alignItems: 'center',    // Center children vertically
        justifyContent: 'flex-start', // Align content towards the top
        backgroundColor: theme.colors.mainColor,
    
    },

    searchBar: {
        width: '300px', // Width of the search bar
        padding: '10px', // Padding inside the input
        marginBottom: '5px',
        marginTop: '15px',
        border: '1px solid #F2F2EE', // Border color
        borderRadius: '20px', // Rounded corners
        fontSize: theme.fonts.size.medium, // Text size
        outline: 'none', // Remove outline on focus
        backgroundColor: theme.colors.lightShade,
        fontFamily: theme.fonts.family, // Font style
        color: theme.colors.darkAccent,
    
    },
    results: {
        marginTop: "10px",
        width: "500px",
        maxHeight: '400px',
        overflowY: 'auto',
        backgroundColor: theme.colors.lightAccent,
        borderRadius: '10px',
        padding:' 10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    resultItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "5px",
        backgroundColor: theme.colors.darkShade,
        margin: "5px 0",
        borderRadius: "10px",
        color: theme.colors.lightShade,
        fontFamily: theme.fonts.family, // Font style
        fontSize: theme.fonts.size.small,
    },
    addButton: {
        padding: "5px 10px",
        borderRadius: "5px",
        backgroundColor: theme.colors.darkAccent,
        color: theme.colors.lightShade,
        fontSize: '14px',
        border: "none",
        cursor: "pointer",
        marginRight: '10px',
    },
    addedButton: {
        backgroundColor: 'green',
        color: theme.colors.lightShade,
    },
    loadingMessage: {
        color: theme.colors.lightShade,
        marginTop: '10px',
    },

};

// Add custom styling for the placeholder text using the `::placeholder` pseudo-element
const globalStyles = `
    input::placeholder {
        color: #455861; /* Placeholder text color */
        font-style: italic; /* Optional: Italicize the placeholder */
    }
`;

// Inject global styles for the placeholder into the document
if (typeof document !== "undefined") {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = globalStyles;
    document.head.appendChild(styleSheet);
}


export default Search;