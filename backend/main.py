#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
    api.main
    ~~~~~~~~~~~~~~
    api WSGI main entry point
"""
from pinkpincho.api import create_app


app = create_app()


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=8080)
