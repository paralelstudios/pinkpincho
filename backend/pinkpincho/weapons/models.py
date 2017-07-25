# -*- coding: utf-8 -*-
"""
    pinkpincho.weapons.models
    ~~~~~~

"""

from ..core import db
from ..helpers import Dictable


class Weapon(db.Model, Dictable):
    __tablename__ = 'weapon'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String, nullable=False, unique=True)
    image_url = db.Column(db.String)
