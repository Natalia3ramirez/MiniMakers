from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class UpdateBoardForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired()])
  description = StringField('Description')
