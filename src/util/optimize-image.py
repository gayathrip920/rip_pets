import os
import sys
import tinify
tinify.key = os.environ["TINIFY_KEY"]
filename = sys.argv[1]
source = tinify.from_file(filename)
resized = source.resize(method="scale", width=640)
resized.to_file(filename)