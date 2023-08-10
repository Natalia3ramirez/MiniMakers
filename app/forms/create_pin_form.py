from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField, BooleanField, SubmitField
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms.validators import DataRequired, URL, NumberRange, Length
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class PinForm(FlaskForm):
  user_id = IntegerField('UserId', validators=[DataRequired()])
  title = StringField('Title', validators=[DataRequired()])
  images = FileField('Image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
  description = description = StringField('Description')
  alt_text = StringField('Alt text')
  website = StringField('Website')
