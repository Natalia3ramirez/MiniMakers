from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from sqlalchemy.sql import func



class Follow(db.Model):
    __tablename__ = 'follows'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    # foreign key
    current_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    following_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

    # Relationships go here
    follower = db.relationship("User", foreign_keys=[current_id], back_populates='follows')
    following = db.relationship("User", foreign_keys=[following_id], back_populates='followee')


    def to_dict(self):
        return {
            'id': self.id,
            'current_id': self.current_id,
            'following_id': self.following_id
        }

