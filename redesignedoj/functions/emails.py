from mailjet_rest import Client
from dotenv import load_dotenv
import os
import re

load_dotenv()



api_key = os.getenv("MAILJET_API_KEY")
api_secret = os.getenv("MAILJET_SECRET_KEY")

FROM_NAME = os.getenv("OWNER_FROM_NAME")
FROM_EMAIL = os.getenv("OWNER_FROM_EMAIL")

mailjet = Client(auth=(api_key, api_secret), version='v3.1')

email_regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'


class Email():

  to_email:str
  from_email:str
  subject:str
  text_content:str
  html_content:str
  email_group:str
  content_type:bool
  to_name:str

  response = {}


  def __init__(self,to_email:str, subject:str, text_content:str,html_content, email_group:str ,content_type:bool=False , to_name:str='' ):

    self.to_email = to_email
    self.subject = subject
    self.text_content = text_content
    self.html_content = html_content
    self.email_group = email_group
    self.content_type = content_type
    self.to_name = to_name

    self.from_name = FROM_NAME
    self.from_email = FROM_EMAIL




  def check(self,email):
    if(re.fullmatch(email_regex, email)):
      return True
    else:
      return False
  

  def send_email(self):
    if(not self.check(self.to_email) or not self.check(self.to_email)):
      return False

    data = {
      'Messages': [
        {
          "From": {
            "Email": self.from_email,
            "Name": self.from_name
            },
          "To": [
            {
              "Email": self.to_email,
              "Name": self.to_name
            }
            ],
          "Subject": self.subject,
          "TextPart": self.text_content,
          "HTMLPart": self.html_content,
          "CustomID": self.email_group
        }
      ]
    }
    result = mailjet.send.create(data=data)
    self.response = result
    print(result.json())
    return result


# result = mailjet.send.create(data=data)
# print(result.status_code)
# print(result.json())

# emailobj = Email(to_email="u19ee003@eed.svnit.ac.in", subject="Account Verification Email - Redesigned OJ", text_content='Your Account verification Link is - https://pushpendrahpx.me', html_content='',email_group='Account Verification',content_type=False, to_name='Pushpendra Vishwakarma SVNIT')
# result = emailobj.send_email()
# print(result.json())