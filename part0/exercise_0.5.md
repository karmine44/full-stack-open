sequenceDiagram
    participant browser as Browser
    participant server as Server

    browser->>server: GET	https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server->>browser: HTML file
    deactivate server

    browser->>server: GET	https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: CSS file
    deactivate server

    browser->>server: GET	https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server->>browser: JS file
    deactivate server

    Note right of browser: Browser runs portion of JS file that gets the data.

    browser->>server: GET	https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser: [{"content":"","date":"2026-11-05T03:27:35.427Z"}, ...]
    deactivate server

    Note right of browser: Browser executes callback function that renders the notes.
    