# list available recipes
default:
  @just --list

# set up hot reloading for Electron development
electron:
  cd electron; npm start &
  cd typescript; rm -fr .parcel-cache; watchexec -e ts,json -- npx parcel build --target lib --dist-dir ../electron/output &
  cd elm; watchexec -e js,css,html,elm 'elm make src/Main.elm --output=../electron/output/main.js'

install-dev:
  cd typescript; npm install
  cd electron; npm install
