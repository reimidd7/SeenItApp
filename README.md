# SeenIt
SeenIt is a desktop application built with React, Electron, and Webpack that allows users to search, track, and manage their favorite TV shows.

## Description
SeenIt provides a simple and intuitive way to keep track of TV shows you've watched or plan to watch. 
Users can search for shows, add them to their watched list, update seasons watched, and remove shows from the list. 
All data is stored locally on the user's device in a JSON file.

## Installation
Currently, no public installation due to limited API access.

## Usage
- **Home Tab:** Indicated be SeenIt logo. Displays TV shows that have seasons left to watch
- **Search Tab:** Allows users to search for TV Shows and add them to their watched list.
- **Watched Tab:** Displays the list of watched shows with options to update seasons watched or removed shows. Shows that have all seasons watched change colors and move to bottom of the list.
![Screenshot of Home Tab](https://github.com/user-attachments/assets/17fef2ae-fbd9-4b4b-8d73-56a8d158159c)
![Screenshot of Search Tab](https://github.com/user-attachments/assets/404bdb03-e888-44a6-8296-fb42af00ea4c)
![Screenshot of Watched Tab](https://github.com/user-attachments/assets/44000289-d343-428b-bd4f-3b479eba1258)

## Features
- Search TV shows using The Movie Database (TMDb) API.
- Add shows to a watched list.
- Update the seasons watched for each show.
- Remove shows from the watched list.
- Data storage using both local storage and a JSON file on the user's desktop.

## Technologies Used
- **React:** For building the user interface.
- **Electron:** For creating the desktop application.
- **Webpack:** For bundling the application.
- **Babel:** For JavaScript transpilation.
- **TMDb API:** For retrieving TV show data.

### Acknowledgements
SeenIt uses the TMDb API but is not endorsed or certified by TMDb.

**The Movie Database (TMDb)**
This product uses the TMDb API but is not endorsed or certified by TMDb.
For more information about TMDb, visit [The Movie Database (TMDb) website](https://www.themoviedb.org/)
