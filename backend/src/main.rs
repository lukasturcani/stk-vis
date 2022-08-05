use mongodb::{bson::doc, sync::Client};
use serde::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Atom(u8, i8);

#[derive(Debug, Serialize, Deserialize)]
struct Periodicity(i8, i8, i8);

#[derive(Debug, Serialize, Deserialize)]
struct Bond(i32, i32, f32, Periodicity);

#[derive(Debug, Serialize, Deserialize)]
struct Molecule {
    a: Vec<Atom>,
    b: Vec<Bond>,
}

fn main() -> mongodb::error::Result<()> {
    let client = Client::with_uri_str("mongodb://localhost:27017/")?;
    let database = client.database("_stk_pytest_database");
    let collection = database.collection::<Molecule>("molecules");
    let mut cursor = collection.find(doc! {}, None)?;
    for _ in 0..2 {
        println!("{:#?}", cursor.deserialize_current());
        cursor.advance()?;
    }
    Ok(())
}
