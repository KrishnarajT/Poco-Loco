import os

import sqlalchemy


def connect_tcp_socket() -> sqlalchemy.engine.base.Engine:
    """ Initializes a TCP connection pool for a Cloud SQL instance of MySQL. """
    # Note: Saving credentials in environment variables is convenient, but not
    # secure - consider a more secure solution such as
    # Cloud Secret Manager (https://cloud.google.com/secret-manager) to help
    # keep secrets safe.
    db_host = '35.200.182.124'
    db_user = 'Admin'
    db_pass = '4123'
    db_name = 'Poco-loco-db'
    db_port = '3306'


# os.environ["INSTANCE_HOST"]  # e.g. '127.0.0.1' ('172.17.0.1' if deployed to GAE Flex)
# os.environ["DB_USER"]  # e.g. 'my-db-user'
# os.environ["DB_PASS"]  # e.g. 'my-db-password'
# os.environ["DB_NAME"]  # e.g. 'my-database'
# os.environ["DB_PORT"]  # e.g. 3306


    pool = sqlalchemy.create_engine(
        # Equivalent URL:
        # mysql+pymysql://<db_user>:<db_pass>@<db_host>:<db_port>/<db_name>
        sqlalchemy.engine.url.URL.create(
            drivername="mysql+pymysql",
            username=db_user,
            password=db_pass,
            host=db_host,
            port=db_port,
            database=db_name,
        ),
        # ...
    )
    return pool

pool = connect_tcp_socket()
pool.connect()
print(pool.execute("SELECT * FROM users"))
