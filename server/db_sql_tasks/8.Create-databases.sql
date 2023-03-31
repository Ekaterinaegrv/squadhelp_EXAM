CREATE TABLE conversations(
    id serial PRIMARY KEY,
    participants int NOT NULL REFERENCES users(id),
    black_list boolean DEFAULT false, 
    favorite_list boolean DEFAULT false, 
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE messages(
    id serial PRIMARY KEY,
    sender int NOT NULL REFERENCES users(id),
    body text NOT NULL CHECK (body != '') CHECK (body != ' '),
    created_at timestamp DEFAULT current_timestamp,
    updated_at timestamp DEFAULT current_timestamp
);

CREATE TABLE catalogs(
    id serial PRIMARY KEY,
    user_id int NOT NULL REFERENCES users(id),
    catalog_name varchar(64) NOT NULL CHECK (catalog_name !=''),
    chats int REFERENCES conversations(id)
);

CREATE TABLE messages_to_users(
    message_id int REFERENCES messages(id),
    user_id int REFERENCES users(id),
    PRIMARY KEY(message_id, user_id)
);

CREATE TABLE conversations_to_users (
    conversation_id int REFERENCES conversations(id),
    user_id int REFERENCES users(id),  
    PRIMARY KEY(conversation_id, user_id)
);

CREATE TABLE conversations_to_messages (
    conversation_id int REFERENCES conversations(id),
    message_id int REFERENCES messages(id),
    PRIMARY KEY(message_id, conversation_id)
);