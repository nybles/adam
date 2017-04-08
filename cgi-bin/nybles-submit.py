#!/usr/bin/python3

import cgi, cgitb
import json
import os
from sys import exit

# for debugging
cgitb.enable()

target_directory = "/data/geekhaven/nybles-submissions"

form = cgi.FieldStorage()
try:
    if ((not form.getvalue("title")) or
        (not form.getvalue("author")) or
        (not form.getvalue("categories")) or
        (not form.getvalue("content"))):
        raise AttributeError
except AttributeError:
    print ("Content-type: text/plain")
    print ()
    print ("Incomplete submission")
    exit(0)


try:
    response = {
        "title": form.getvalue("title"),
        "author": form.getvalue("author"),
        "categories": list(map(lambda cat: cat.strip(),
                            form.getvalue("categories").split(","))),
        "content": form.getvalue("content")
    }

    # form submitted
    filename = response["author"] + '-' + response["title"] + ".md"
    target = os.path.join(target_directory, filename)
    with open(target, 'w+') as f:
        f.write(json.dumps(response, indent=4))
except Exception as e:
    print ("Content-type: text/plain")
    print ()
    print ("Some error occured. Please try again later")
    print (e)
    exit(1)


# everything went fine
print ("Content-type: text/html")
print ()

print ("""
<html>
<body>
Response received.
Redirecting...
<script>
document.location = "https://nybles.github.io/"
</script>
</body>
</html>
""")
