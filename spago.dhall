{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "my-project"
, dependencies =
  [ "console"
  , "effect"
  , "mol-draw"
  , "ordered-collections"
  , "promises"
  , "psci-support"
  , "tuples"
  , "validated-molecule"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
