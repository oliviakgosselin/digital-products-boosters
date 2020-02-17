#!/bin/bash
rm -r bin
mkdir bin
for file in $(find ./decks -path ./decks/node_modules -prune -false -o -name "*.mdx"); do
    fileName=$(echo $file | cut -f 4 -d '/' | cut -f 1 -d '.')
    dir=$(echo $file | cut -f 3 -d '/')
    outputDir="${dir}-${fileName}"
    file=$(echo $file | cut -f 1,3- -d '/')
    yarn --cwd ./decks mdx-deck build $file -d dist/$outputDir --basepath="/${outputDir}"
done
cp -r ./decks/dist/ ./bin
rm -r ./decks/dist
