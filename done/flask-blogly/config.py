from dotenv import dotenv_values
settings = dotenv_values("/Users/yu/sb/conf/.env")

DB_CONFIG = {
    'driver': settings['PGDRIVER'],
    'user': settings['PGUSER'],
    'pw': settings['PGPASSWORD'],
    'db': settings['PGDATABASE'],
    'host': settings['PGHOST'],
    'port': settings['PGPORT'],
}

def config_app(app):
    # app.config['SQLALCHEMY_DATABASE_URI'] = '{driver}://{user}:{pw}@{host}:{port}/{db}'.format_map(DB_CONFIG)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///blogly.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ECHO'] = True
    app.config['SECRET_KEY'] = 'testtest'
    app.config['TESTING'] = True
    app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

