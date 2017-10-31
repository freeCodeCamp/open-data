# Description:
#   Evangelizing the Book of Purdy.
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   Speak as The Purdy - Get evangelized randomly
#
# Notes:
#   The responses only occur when joepurdy speaks and are at random.
#
# Author:
#   joepurdy <joe@poweredbypurdy.com>
#
#module.exports = (robot) ->
#  robot.hear /./, (msg) ->
#    praises = [
#      'Praise be to Purdy',
#      'So it is written in the Book of Purdy',
#      'The Purdy has spoken',
#      'So is the word of The Purdy',
#      'So sayeth the Book of Purdy'
#    ]
#
#    if msg.message.user.name == 'joepurdy' || 'Shell'
#      probability = Math.floor(Math.random() * (10 - 1) + 1)
#      praise = praises[Math.floor(Math.random() * (praises.length - 0) + 0)]
#
#      if (probability == 1)
#        msg.send praise
