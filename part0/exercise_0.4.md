sequenceDiagram
    actor user as User
    participant browser as Browser
    participant server as Server
    

    user->>browser: New note contents
    browser->>server: POST  https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server->>browser: HTTP status code 302 (URL Redirect)
    deactivate server

    browser->>server: GET   ttps://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>browser: HTML File
    deactivate server

    browser->>server: GET  	https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: CSS file
    deactivate server

    browser->>server: GET	https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server->>browser: JS file
    deactivate server

    Note right of browser: Browser runs portion of JS file that gets the data. <br> This time, it gets the updated data.

    browser->>server: GET	https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server->>browser: [{"content":"","date":"2026-11-05T03:27:35.427Z"},{"content":"hello world","date":"2026-11-05T03:47:25.939Z"}, ...]
    deactivate server

    Note right of browser: Browser executes callback function that renders the notes.
    