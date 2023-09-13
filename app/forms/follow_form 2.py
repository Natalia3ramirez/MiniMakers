from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired


class FollowForm(FlaskForm):
    current_id = IntegerField('pin_id', validators=[DataRequired()])
    following_id = IntegerField('user_id', validators=[DataRequired()])
