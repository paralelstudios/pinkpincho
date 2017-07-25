# -*- coding: utf-8 -*-
"""
    pinkpincho.people
    ~~~~~~~~~~~~~~~~
    pinkpincho people service module
"""

from ..core import Service
from .models import Person


class PeopleService(Service):
    __model__ = Person
