rm -r bin/static
rm -f bin/* 2>/dev/null
yarn --cwd ./website react-scripts build
cp -r ./website/build/ ./bin
rm -r ./website/build
