# Description:
#   Provides Purdybot with an emotion engine
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot I love you - Retrieves hubot's love for you.
#
# Notes:
#   None
#
# Authors:
#   joepurdy <joe@poweredbypurdy.com>
#   jondcoleman <https://github.com/jondcoleman>
#   iheartcode <https://github.com/iheartcode>
#   jurgenzz <https://github.com/jurgenzz>

module.exports = (robot) ->
  robot.respond /I love you/i, (msg) ->
    user = msg.message.user.name

    if user == 'joepurdy' || 'Shifthawke' || 'Shell'
      msg.send "^.^ I love you too @#{user}"
    else if user == 'jondcoleman'
      msg.send "Thx @#{user}, love you too!"
    else if user == 'iheartcode'
      msg.send "Oh, I love you so much @#{user}"
    else if user == 'jurgenzz'
      msg.send "Get lost @#{user}"
    else
      msg.send "0.0 Maybe we should just stay friends @#{user}"
