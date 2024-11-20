import React from "react";

const Search = () => {
    return (
        <div style={styles.container}>
             <input
                type="text"
                placeholder="Search..."
                style={styles.searchBar}
            />
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
    
    }
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