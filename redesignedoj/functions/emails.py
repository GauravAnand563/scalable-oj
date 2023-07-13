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

    to_email: str
    from_email: str
    subject: str
    text_content: str
    link: str
    email_group: str
    content_type: bool
    to_name: str

    response = {}

    def __init__(self, to_email: str, subject: str, text_content: str, token_link, email_group: str, content_type: bool = False, to_name: str = ''):

        self.to_email = to_email
        self.subject = subject
        self.text_content = text_content
        self.link = token_link
        self.email_group = email_group
        self.content_type = content_type
        self.to_name = to_name

        self.from_name = FROM_NAME
        self.from_email = FROM_EMAIL

    def check(self, email):
        if (re.fullmatch(email_regex, email)):
            return True
        else:
            return False

    def send_email(self):
        if (not self.check(self.to_email) or not self.check(self.to_email)):
            return False

        data = {
            'Messages': [
                {
                    "From": {
                        "Email": self.from_email,
                        "Name": str.title(self.from_name)
                    },
                    "To": [
                        {
                            "Email": self.to_email,
                            "Name": str.title(self.to_name)
                        }
                    ],
                    "Subject": self.subject,
                    "TextPart": self.text_content,
                    "HTMLPart": html_content,
                    "TemplateLanguage": True,
                    "CustomID": self.email_group,
                    "Variables": {
                        "user": str.title(self.to_name),
                        "link": self.link
                    }
                }
            ]
        }
        result = mailjet.send.create(data=data)
        self.response = result
        # print(result.json())
        return result


html_content = """ 

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="width:100%; height:100%;">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Scalable OJ</title>
</head>

<body style="width:100%; height:100%; margin:0; padding:32px; font: normal normal normal 14px/21px Arial,sans-serif; color:#333; background-color:#f1f1f1; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%;">
    <table class="email-wrapper" style="width:100%; height:100%; margin:auto; padding:0; text-align:center; vertical-align:middle; border-spacing:0; border-collapse:collapse;">
        <tr>
            <td>

                <table class="email-layout" style="width:450px; height:300px; margin:auto; padding:0; vertical-align:middle; border-spacing:0; border-collapse:collapse;">
                    <thead class="email-header" style="text-align: center;">
                        <tr>
                            <th style="padding-bottom: 32px; text-align: center; font-weight: normal;">
                                <a href target="_blank">
                                    <img style="width: 60px; border: none;" src="https://img.icons8.com/external-flatarticons-blue-flatarticons/65/external-judge-auction-flatarticons-blue-flatarticons-1.png" alt="Logo">
                                </a>
                                <span style="display: inline-block; border-left: 5px solid #ABC; height: 60px; padding-left: 12px; margin-left: 12px;">
                                    <strong style="display: block; background-color: blue; color: white; padding: 8px 12px; border-radius: 4px;">Scalable OJ</strong>
                                </span>
                            </th>
                        </tr>
                    </thead>

                    <tbody class="email-body">
                        <tr>
                            <td style="text-align:left;">
                                <div style="padding:21px 32px; background-color:#fff; border-bottom:2px solid #e1e1e1; border-radius:3px;">
                                    <h1 style="font-size:21px; line-height:30px; font-weight:bold;">Almost there! Just confirm your email</h1>
                                    <p>
                                        Hi {{var:user:\"User\"}}, Please confirm your email to start practicing DSA problem solving on Scalable OJ platform.
                                    </p>
                                    <p style="padding:11px 0; text-align:left;">
                                        <a href="{{var:link:\"\"}}" style="padding:11px 21px; text-decoration:none; color:#fff !important; background-color:#42af5b; border:1px solid #358d49; border-radius:3px;">Confirm email</a>
                                    </p>
                                    <p>
                                        Cheers,<br>
                                        Gaurav Anand.
                                    </p>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                    <tfoot class="email-footer" style="text-align:center; font-weight:normal;">
                        <tr>
                            <td style="padding-top:32px;">
                                <div style="color:#999;">
                                    <a href target="_blank" style="text-decoration:none; color:#446cb3 !important;">Get in touch</a>
                                    <small style="font-size:12px; color:#999;">© 2023 Scalable OJ, Made with ❤️ by Gaurav Anand<small>
                            </td>
                        </tr>
                    </tfoot>
                </table>

            </td>
        </tr>
    </table>
</body>

</html>


"""
