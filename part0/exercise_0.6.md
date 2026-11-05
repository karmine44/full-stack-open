sequenceDiagram
    actor user as User
    participant browser as Browser
    participant server as Server
    

    user->>browser: New note contents
    Note right of browser: At this point, the submit button renders the note into the list.<br> It only sends the note to the server afterwards.
    browser->>server: POST	https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: The callback function's action depends on what the status code returned is.
    alt Note is fine
        Note right of server: Server adds the note to its list.
        server->>browser: HTTP status code 201
    else Note is offensive
        Note right of server: Server refuses to add the note to the list.
        server->>browser: HTTP status code 400
        Note right of browser: The offensive note is removed from the client-side array. <br> Then, the list is redrawn.
    end
    deactivate server

    
    