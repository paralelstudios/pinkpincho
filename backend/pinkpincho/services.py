# -*- coding: utf-8 -*-
"""
    pinkpincho.services
    ~~~~~~~~~~~~~~~~~

    services module
"""

from .people import PeopleService
from .scores import ScoreService
from .weapons import WeaponService

people = PeopleService()
scores = ScoreService()
weapons = WeaponService()
