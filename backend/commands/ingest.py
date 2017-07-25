# -*- coding: utf-8 -*-
from pinkpincho.core import db
from pinkpincho.models import Person, Weapon
from flask_script import Command, Option
import csv


def make_person(row):
    pass


def make_weapon(row):
    pass


class Ingest(Command):
    """From a CSV ingest some plants"""
    MODELS = {
        'people': {
            "cols": ["primary_name", "image_url", "places", "months_available"],
            "key": "primary_name",
            "class": Person,
            "make": make_person
        },
        'weapons': {
            "cols": ["name", "description", "category", "primary_image"],
            "key": "name",
            "class": Weapon,
            "make": make_weapon
        }
    }

    option_list = (
        Option('--filename', '-f', dest='filename', help='an csv file path'),
        Option('--model', '-m', dest='model_name'))

    def _isunique(self, row):
        return self.model["class"].query.filter_by(
            **{self.model["key"]: row[self.model["key"]]}).first() is None

    def run(self, filename, model_name):
        self.model = self.MODELS[model_name]
        with open(filename) as csvfile:
            reader = csv.DictReader(csvfile, self.model["cols"])
            models = list(map(self.model["make"], filter(self._isunique, list(reader))))

        db.session.bulk_insert_mappings(self.model["class"], models)
        db.session.commit()

        if self.model.get("post"):
            [self.model["post"](model) for model in models]
            db.session.commit()
        print("created {} items".format(len(models)))
