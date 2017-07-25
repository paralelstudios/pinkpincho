# -*- coding: utf-8 -*-
"""
    pinkpincho.scores
    ~~~~~~~~~~~~~~~~
    pinkpincho scores service module
"""

from ..core import Service
from .models import Score


class ScoreService(Service):
    __model__ = Score
