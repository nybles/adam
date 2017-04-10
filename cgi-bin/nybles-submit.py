#!/usr/bin/python3

import cgi, cgitb
import json
import os
from sys import exit
from time import time
from hashlib import md5

# for debugging
cgitb.enable()

target_directory = "/data/geekhaven/nybles-submissions"
submissions_db =   "/data/geekhaven/nybles-submissions/submissions.json"


def getSubmissions():
    d = {}
    if (os.path.exists(submissions_db)):
        with open(submissions_db) as f:
            d = json.loads(f.read())
    return d


def saveSubmissions(dic):
    with open(submissions_db, 'w+') as f:
        f.write(json.dumps(dic))


def getSubmissionId(content):
    return md5(content.encode()).hexdigest()


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
                            form.getvalue("categories").split(",")))
    }
    content = form.getvalue("content")

    # form submitted
    encoding = response["author"] + '-' + response["title"] + ".json"
    filename = getSubmissionId(encoding)+".md"
    response["filename"] = filename
    target = os.path.join(target_directory, filename)
    currentDb = getSubmissions()
    currentDb = {}
    currentDb[filename] = response
    saveSubmissions(currentDb)

    with open(target, 'w+') as f:
        f.write(content)
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
