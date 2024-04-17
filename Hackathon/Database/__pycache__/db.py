import sqlite3
from sqlite3 import Error

import os

def create_connection():
    """ create a database connection to the SQLite database specified by db_file """
    base_dir = os.path.abspath(os.path.dirname(__file__))  # Get the absolute path of the directory where this script is located
    db_path = os.path.join(base_dir, 'filepaths.db')
    conn = None
    try:
        conn = sqlite3.connect(db_path)
    except Error as e:
        print(e)
    return conn

def create_table(conn):
    """ create a table from the create_table_sql statement """
    try:
        c = conn.cursor()
        c.execute("""
            CREATE TABLE IF NOT EXISTS file_paths (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT NOT NULL,
                file_path TEXT NOT NULL
            );
        """)
        c.execute("""
            ALTER TABLE file_paths ADD COLUMN nature TEXT NOT NULL DEFAULT ''
        """)
        conn.commit()
    except Error as e:
        print(e)

def store_file_path(conn, user_id, file_path, nature):
    """ Create a new file_path into the file_paths table """
    try:
        print("storing file")
        sql = ''' INSERT INTO file_paths(user_id, file_path, nature)
                  VALUES(?,?,?) '''
        cur = conn.cursor()
        cur.execute(sql, (user_id, file_path, nature))
        conn.commit()
        return cur.lastrowid
    except Error as e:
        print(e)

def retrieve_file_paths(conn, user_id, nature):
    """ Query all file paths by user_id """
    try:
        cur = conn.cursor()
        cur.execute("SELECT file_path FROM file_paths WHERE user_id=? AND nature=?", (user_id, nature))
        rows = cur.fetchall()
        print(rows)
        result = [row[0] for row in rows]
        return result[0]
    except Error as e:
        print(e)
        return []
    

def main():
    # Create a database connection
    conn = create_connection()
    if conn is not None:
        # Create file_paths table
        create_table(conn)
    else:
        print("Error! cannot create the database connection.")

if __name__ == '__main__':
    main()
