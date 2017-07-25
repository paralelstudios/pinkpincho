# -*- coding: utf-8 -*-
"""
    pinkpincho.api.base
    ~~~~~~~~~~~~~~~~~~

    PinkPincho base API
"""
from werkzeug.exceptions import ServiceUnavailable
from sqlalchemy.exc import OperationalError
from ..services import people
from ..core import db


def _test_db():
    try:
        people.first()
        return True
    except OperationalError:
        db.session.rollback()
        return False


def ping():
    if _test_db():
        return 'OK'
    else:
        raise ServiceUnavailable


def add_resource(api, resource):
    api.add_resource(resource, resource.uri)
