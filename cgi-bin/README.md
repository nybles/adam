### The working of submissions

As of now, submissions are stored on Geekhaven's servers.
This directory contains the cgi-scripts for server-side scripting.

You can get information about available posts from following routes:

* https://geekhaven.iiita.ac.in/cgi-bin/nybles-get-submissions.py
  **Response**: A JSON of list of available submissions. The structure is:
```
{
     "filename.md": {
            "author": "Author's name",
            "filename": "filename",
            "title": "The title of post",
            "categoriers": [ "list", "of", "categories" ]
     },
     ...
}
```

* https://geekhaven.iiita.ac.in/nybles-submissions
  **Response**: Lists all the submissions available. The people submitting can view their submissions.
 
 
* https://geekhaven.iiita.ac.in/nybles-submissions/filename.md
  **Response**: Gives the filename asked. The name is available from above JSON.
