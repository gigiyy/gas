CREATE TABLE gasolines (
    id SERIAL PRIMARY KEY,
    buy_date VARCHAR(10) NOT NULL,
    distance INTEGER NOT NULL,
    value INTEGER NOT NULL
);