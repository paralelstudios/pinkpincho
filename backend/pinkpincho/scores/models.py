# -*- coding: utf-8 -*-
"""
    pinkpincho.scores.models
    ~~~~~~

"""

from ..core import db
from ..helpers import Dictable


class Score(db.Model, Dictable):
    __tablename__ = 'scores'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    player_name = db.Column(db.String, nullable=False)
    score = db.Column(db.Integer)
