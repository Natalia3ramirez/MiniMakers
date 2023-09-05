from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class BoardForm(FlaskForm):
  user_id = IntegerField('UserId', validators=[DataRequired()])
  name = StringField('Name', validators=[DataRequired()])
  description = StringField('Description')

