# Description:
#   Gives hubot commands from a long time ago that belong in a galaxy far far away
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot R2D2 - Searches for a droid
#   hubot what are you doing hiding back there? - hubot quotes a droid
#
# Notes:
#   None
#
# Author:
#   jondcoleman <https://github.com/jondcoleman>
#   joepurdy <joe@poweredbypurdy.com>

module.exports = (robot) ->
  robot.respond /R2D2/i, (res) ->
    res.send "R2D2 where are you?"

  robot.respond /what are you doing hiding back there/i, (res) ->
    res.send "It wasn't my fault, sir, please don't deactivate me. I told him not to go, but he's faulty, malfunctioning. Kept babbling on about his mission."
