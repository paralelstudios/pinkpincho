# -*- coding: utf-8 -*-
"""
    pinkpincho.settings
    ~~~~~~~~~~~~~~~~
    Global backend package settings
"""

import os

ENVIRONMENT = os.environ.get('ENVIRONMENT', 'local')
DEBUG = True
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# DB and SQLAlchemy settings
DB_NAME = os.environ.get('POSTGRES_USER', 'pinkpincho')
DB_USER = os.environ.get('POSTGRES_USER', 'pinkpincho')
DB_PASSWORD = os.environ.get('POSTGRES_PASSWORD', 'pinkpincho')
DB_HOST = os.environ.get('POSTGRES_PORT_5432_TCP_ADDR', 'localhost')
DB_PORT = int(os.environ.get('POSTGRES_PORT_5432_TCP_PORT', 5432))
SQLALCHEMY_DATABASE_URI = 'postgresql://{}:{}@{}:{}/{}'.format(
    DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME)

SQLALCHEMY_LOG_QUERIES = False
SQLALCHEMY_TRACK_MODIFICATIONS = False

# API settings
SECRET_KEY = os.environ.get('PINKPINCHO_API_SECRET_KEY', 'secret-key-so-secret')
BCRYPT_LOG_ROUNDS = 12
