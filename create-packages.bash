#!/usr/bin/env bash

rm -r pack
electron-packager dist stk-vis --all --out pack
mv pack/stk-vis-darwin-x64 pack/stk-vis-apple-darwin-x64
for FOLDER in pack/*
do
    tar -czf "${FOLDER}.tar.gz" "$FOLDER"
done
