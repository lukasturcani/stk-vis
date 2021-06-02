#!/usr/bin/env bash

rm -r pack
yarn electron-packager dist stk-vis --all --out pack
cd pack
mv stk-vis-darwin-x64 stk-vis-apple-darwin-x64
for FOLDER in *
do
    tar -czf "${FOLDER}.tar.gz" "$FOLDER"
    zip -r "${FOLDER}.zip" "$FOLDER"
done
