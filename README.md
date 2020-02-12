# ZestyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.3.

The docker image is present at `https://hub.docker.com/r/sreenivas007/zesty-app`

To run the image, run `docker run -p 80:80 sreenivas007/zesty-app:prod` and simply navigate to `localhost`

Important:- I faced some issues with `CORS`, so I ran the application in Google Chrome with disabled web security mode, probably you will have to run it the same way.
In order to run Google Chrome by disabling web security run this command on a mac, `open -na /Applications/Google\ Chrome.app/ --args --disable-web-security --user-data-dir=""` 

# Demo of the product
You can view the demo of the product here, in my own voice: 

# Features implemented

1) Search: Prompts the user for a longitude, latitude, and search radius (default 10000 meters) and display, in a tabular format, the results of the search, including the image of the property and its geographic location (longitude and latitude)

2) Detail Page: Shows detailed information about a given property, including its image, geographic location, and statistics.

3) Freestyle: Implemented a `Show Overlays` checkbox which will display overlays on the property.

# Folder Structure
Components - Includes all the typescript code and templates
Interfaces - Interfaces used
Services - Service for remote call
State Management - State management using ngrx and rxjs libraries


