import React, { useState } from "react";

const Search = ({addToWatched}) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        if (query.trim() === "") return;

        const apiKey = "a4d85f4a0138ffbd06d3be2bfb02dbcf";
        const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(query)}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setResults(data.results || []);

        } catch (error) {
            console.error("Error fetching search results:", error);
        }
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
            <button onClick={handleSearch} style={styles.resultItem}>
                Search
            </button>

            <div style={styles.results}>
                {results.map((show) => (
                    <div key={show.id} style={styles.resultItem}>
                        <p>{show.name}</p>
                        <button
                        onClick={() => addToWatched(show)}
                        style={styles.addButton}
                        >
                            Add to Watched
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
        height: 'calc(100vh - 94px)',          // Full height of the content container
        boxSizing: 'border-box', // Include padding in dimensions
        display: 'flex',         // Flexbox for alignment
        justifyContent: 'center', // Center children horizontally
        alignItems: 'center',    // Center children vertically
        backgroundColor: '#718F94',
    
    },

    searchBar: {
        width: '300px', // Width of the search bar
        padding: '10px', // Padding inside the input
        border: '1px solid #F2F2EE', // Border color
        borderRadius: '20px', // Rounded corners
        fontSize: '16px', // Text size
        outline: 'none', // Remove outline on focus
        background: '#F2F2EE',
        fontFamily: 'Arial, sans-serif', // Font style
        color: '#455861',
    
    },
    searchButton: {
        padding: "10px 15px",
        borderRadius: "20px",
        backgroundColor: "#5D737E",
        color: "#F2F2EE",
        border: "none",
        cursor: "pointer",
    },
    results: {
        marginTop: "20px",
        width: "300px",
        display: "flex",
        flexDirection: "column",
    },
    resultItem: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#94A4A4",
        margin: "5px 0",
        borderRadius: "10px",
    },
    addButton: {
        padding: "5px 10px",
        borderRadius: "10px",
        backgroundColor: "#5D737E",
        color: "#F2F2EE",
        border: "none",
        cursor: "pointer",
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