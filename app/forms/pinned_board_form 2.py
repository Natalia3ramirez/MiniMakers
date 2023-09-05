from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField, BooleanField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, NumberRange, Length
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class PinnedBoardForm(FlaskForm):
  board_id = IntegerField('BoardId', validators=[DataRequired()])
  pin_id = IntegerField('PinId', validators=[DataRequired()])
