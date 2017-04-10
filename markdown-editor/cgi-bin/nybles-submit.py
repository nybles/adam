#!/usr/bin/python3

import cgi, cgitb
import json
from sys import exit

cgitb.enable() # for debugging

SHARE_CAP = 10737418240 # 10 GB
USER_DB = "21lane_db.json"

form = cgi.FieldStorage()

response = {
    "title": form.getvalue("title"),
    "author": form.getvalue("author"),
    "categories": list( map(lambda cat : cat.strip() ,form.getvalue("categories").split(",")) ),
    "content": form.getvalue("content")
}

if ( (not response["title"]) or
     (not response["author"]) or
     (not response["categories"]) or
     (not response["content"]) ):
    print ("Content-type: text/plain")
    print ()
    print ("Incomplete submission")
    exit(0)


# everything's fine
print ("Content-type: application/json")
print ()
print (json.dumps(response, indent=4))
