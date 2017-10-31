# Description:
#   Provides Purdybot with a marriage interface
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot marry me - Propose matrimony to hubot
#
# Notes:
#   None
#
# Authors:
#   joepurdy <joe@poweredbypurdy.com>

module.exports = (robot) ->
  robot.respond /marry me/i, (msg) ->
    user = msg.message.user.name

    if user == 'Shifthawke' || 'Shell'
      msg.send "I accept. When shall we be wed dearest @#{user}?"
    else
      msg.send "No thank you @#{user}, my :heart: only has room for @Shifthawke."
