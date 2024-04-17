import sqlite3

def create_connection():
    conn = None
    try:
        conn = sqlite3.connect('filepaths.db')  # This will create the database file if it doesn't exist
        return conn
    except Exception as e:
        print(e)
    return conn

def create_table(conn):
    try:
        c = conn.cursor()
        c.execute("""CREATE TABLE IF NOT EXISTS file_paths (
                     id INTEGER PRIMARY KEY,
                     user_id TEXT NOT NULL,
                     file_path TEXT NOT NULL
                 )""")
        conn.commit()
    except Exception as e:
        print(e)

def store_file_path(conn, user_id, file_path):
    try:
        c = conn.cursor()
        c.execute("INSERT INTO file_paths (user_id, file_path) VALUES (?, ?)", (user_id, file_path))
        conn.commit()
    except Exception as e:
        print(e)

def retrieve_file_paths(conn, user_id):
    try:
        c = conn.cursor()
        c.execute("SELECT file_path FROM file_paths WHERE user_id=?", (user_id,))
        paths = c.fetchall()
        return [path[0] for path in paths]
    except Exception as e:
        print(e)
        return []
