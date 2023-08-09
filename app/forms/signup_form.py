from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS
# from app.routes.aws_helpers import ALLOWED_EXTENSIONS
from wtforms import StringField, DateField, TextAreaField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def is_valid_email(form, field):
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    email = field.data
    if not re.match(email_pattern, email):
        raise ValidationError('Invalid email address.')



class SignUpForm(FlaskForm):
    first_name = StringField('First Name', validators=[DataRequired()])
    last_name = StringField('Last Name', validators=[DataRequired()])
    about_me = TextAreaField('About Me')
    email = StringField('email', validators=[DataRequired(), user_exists, is_valid_email])
    password = StringField('password', validators=[DataRequired()])
    birthdate = DateField('Birthdate', validators=[DataRequired()])
    image = FileField("Image", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])


