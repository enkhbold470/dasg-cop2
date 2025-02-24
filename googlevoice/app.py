import os
from googlevoice import Voice
from bs4 import BeautifulSoup
import requests
from dotenv import load_dotenv

load_dotenv()

# Authenticate with Google Voice
voice = Voice()
voice.login(email=os.getenv('GOOGLE_VOICE_EMAIL'), passwd=os.getenv('GOOGLE_VOICE_PASSWORD'))

# Function to extract SMS messages
def extractsms(htmlsms):
    msgitems = []
    tree = BeautifulSoup(htmlsms, 'html.parser')
    conversations = tree.findAll("div", attrs={"id": True}, recursive=False)
    for conversation in conversations:
        rows = conversation.findAll(attrs={"class": "gc-message-sms-row"})
        for row in rows:
            msgitem = {"id": conversation["id"]}
            spans = row.findAll("span", attrs={"class": True}, recursive=False)
            for span in spans:
                cl = span["class"].replace('gc-message-sms-', '')
                msgitem[cl] = (" ".join(span.findAll(text=True))).strip()
            msgitems.append(msgitem)
    return msgitems

# Function to get a cat fact
def get_cat_fact():
    response = requests.get("https://cat-fact.herokuapp.com/facts/random")
    if response.status_code == 200:
        return response.json()['text']
    else:
        return "Failed to fetch a cat fact."

# Fetch and parse SMS messages
voice.sms()
messages = extractsms(voice.sms.html)

# Check messages for "INKY" and respond
for msg in messages:
    if "INKY" in msg.get("text", ""):
        print(f"Found 'INKY' in message from {msg.get('from', 'Unknown')}")
        cat_fact = get_cat_fact()
        phone_number = msg.get("from", "").strip()
        if phone_number:
            voice.send_sms(phone_number, cat_fact)
            print(f"Sent cat fact to {phone_number}: {cat_fact}")
        else:
            print("Could not determine the sender's phone number.")
