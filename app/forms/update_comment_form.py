from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, DecimalField, BooleanField, SubmitField
from wtforms.validators import DataRequired, URL, NumberRange, Length


class UpdateCommentForm(FlaskForm):
  message = StringField('Message', validators=[DataRequired()])

