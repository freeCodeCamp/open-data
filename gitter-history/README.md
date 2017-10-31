# gitter-history
An open dataset of all chat activity in Free Code Camp's Gitter.im chatrooms

# Archive Format

### TSV Files

Delimeter: tab  
Header Row: Not present  
Column Order: `['room_id', 'room_uri', 'sent_at', 'from_userid', 'from_username', 'message_id', 'text']`

- **room_id**: Unique Room ID of the room
- **room_uri**: Room URI of the room
- **sent_at**: The timestamp of message sent at
- **from_userid**: Unique gitter ID of the user
- **from_username**: Unique username of the user
- **message_id**: Unique message id of the message
- **text**: The raw text of the message
