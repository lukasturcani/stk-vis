var app = Elm.Main.init();

app.ports.sendSelectedMolecule.subscribe(function (message) {
  console.log(message);
});
app.ports.sendDatabaseRequest.subscribe(function (message) {
  console.log(message);
});
