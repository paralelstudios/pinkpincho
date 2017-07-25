# -*- coding: utf-8 -*-
"""
    pinkpincho.weapons
    ~~~~~~~~~~~~~~~~
    pinkpincho weapons service module
"""

from ..core import Service
from .models import Weapon


class WeaponService(Service):
    __model__ = Weapon
