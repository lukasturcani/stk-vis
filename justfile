# list available recipes
default:
  @just --list

# set up hot reloading for Electron development
electron:
  cd electron; npm start &
  cd elm; watchexec -e js,css,html,elm 'elm make src/Main.elm --output=../electron/output/main.js'
