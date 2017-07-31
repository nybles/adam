#!/usr/bin/python3

import json
import os

submissions_db = "/data/geekhaven/nybles-submissions/submissions.json"


def getSubmissions():
    d = {}
    if (os.path.exists(submissions_db)):
        with open(submissions_db) as f:
            d = json.loads(f.read())
    return d


print("Content-type: application/json")
print()
try:
    print(json.dumps(getSubmissions()))
except Exception as e:
    print("{ 'error': " + e + " }")
