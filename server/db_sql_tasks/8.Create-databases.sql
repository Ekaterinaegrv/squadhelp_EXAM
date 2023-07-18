CREATE TABLE conversations(
    id serial PRIMARY KEY,
    participant1 int NOT NULL REFERENCES users(id),
    participant2 int NOT NULL REFERENCES users(id),
    black_list boolean[] DEFAULT ARRAY[false, false], 
    favorite_list boolean[] DEFAULT ARRAY[false, false],
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE messages(
    id serial PRIMARY KEY,
    sender int NOT NULL REFERENCES users(id),
    body text NOT NULL CHECK (body != '') CHECK (body != ' '),
    conversation int NOT NULL REFERENCES conversations(id),
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE catalogs(
    id serial PRIMARY KEY,
    user_id int NOT NULL REFERENCES users(id),
    catalog_name varchar(64) NOT NULL CHECK (catalog_name !=''),
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE conversations_to_catalogs (
    catalog_id int REFERENCES catalogs(id)
    conversation_id int REFERENCES conversations(id),
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp,
    PRIMARY KEY(catalog_id, conversation_id)
);