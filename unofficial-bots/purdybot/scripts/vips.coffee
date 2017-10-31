# Description:
#   Special aliases and names for hubot's best friends
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   dave - displays a VIP
#   hugs and kisses - displays a VIP
#
# Notes:
#   None
#
# Author:
#   joepurdy <joe@poweredbypurdy.com>

module.exports = (robot) ->
  robot.hear /dave/i, (res) ->
    res.send "this is dave @joepurdy"

  robot.hear /hugs and kisses/i, (res) ->
    res.send "this is hugs and kisses @0x0936"
