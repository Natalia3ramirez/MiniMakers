from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField, BooleanField, SubmitField
from wtforms.validators import DataRequired, URL, NumberRange, Length


class UpdatePinForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired()])
  description = description = StringField('Description')
  alt_text = StringField('Alt text')
  website = StringField('Website')
