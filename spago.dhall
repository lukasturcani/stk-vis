{-
Welcome to a Spago project!
You can edit this file as you like.
-}
{ name = "my-project"
, dependencies =
  [ "console"
  , "debug"
  , "effect"
  , "foreign-object"
  , "mol-draw"
  , "ordered-collections"
  , "promises"
  , "psci-support"
  , "tuples"
  , "unordered-collections"
  , "validated-molecule"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs", "test/**/*.purs" ]
}
