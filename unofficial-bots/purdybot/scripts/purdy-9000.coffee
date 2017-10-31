# Description:
#   Heuristically programmed algorithmic computer functions
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot open the (pod bay|other) doors - Commands hubot to open doors for you. Probably.
#   hubot what's the problem? - hubot tells you what's wrong
#   hubot sing it for me - hubot sings you a lullaby
#
# Notes:
#   None
#
# Author:
#   joepurdy <joe@poweredbypurdy.com>

module.exports = (robot) ->
  robot.respond /open the (.*) doors/i, (res) ->
   doorType = res.match[1]
   user = res.message.user.name
   if doorType is "pod bay"
     res.send "I'm sorry @#{user}, I'm afraid I can't do that."
   else
     res.send "Opening #{doorType} doors for you now @#{user}"

  robot.respond /what\'?s the problem/i, (res) ->
    res.send "I think you know what the problem is just as well as I do."

  robot.respond /sing it for me/i, (res) ->
    res.send "It's called \"Daisy\".\nhttps://soundcloud.com/joe-purdy-786791700/deactivation-of-hal-9000/s-8JL06"
