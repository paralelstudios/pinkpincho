# -*- coding: utf-8 -*-
"""
    pinkpincho.people.models
    ~~~~~~

"""

from ..core import db
from ..helpers import Dictable


class Person(db.Model, Dictable):
    __tablename__ = 'people'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)
    dead_face_url = db.Column(db.String, nullable=False)
    fart_face_url = db.Column(db.String, nullable=False)
    normal_face_url = db.Column(db.String, nullable=False)
