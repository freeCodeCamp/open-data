# Description:
#   Random hubot commands specific to purdybot that don't fit well elsewhere
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   hubot what does it say? - hubot reads back warning signs
#   hubot what does the fox say? - hubot educates you on the common cries of the fox
#
# Notes:
#   None
#
# Author:
#   jondcoleman <https://github.com/jondcoleman>
#   jurgenzz <https://github.com/jurgenzz>
#   joepurdy <joe@poweredbypurdy.com>

module.exports = (robot) ->
  robot.respond /what does it say/i, (res) ->
    res.send "Danger, Will Robinson, danger."

  robot.respond /what does the fox say/i, (res) ->
    res.send "Ring-ding-ding-ding-dingeringeding! Gering-ding-ding-ding-dingeringeding! Gering-ding-ding-ding-dingeringeding! Wa-pa-pa-pa-pa-pa-pow! Wa-pa-pa-pa-pa-pa-pow! Wa-pa-pa-pa-pa-pa-pow! Hatee-hatee-hatee-ho! Hatee-hatee-hatee-ho! Hatee-hatee-hatee-ho! Joff-tchoff-tchoffo-tchoffo-tchoff! Tchoff-tchoff-tchoffo-tchoffo-tchoff! Joff-tchoff-tchoffo-tchoffo-tchoff! Jacha-chacha-chacha-chow! Chacha-chacha-chacha-chow! Chacha-chacha-chacha-chow! Fraka-kaka-kaka-kaka-kow! Fraka-kaka-kaka-kaka-kow! Fraka-kaka-kaka-kaka-kow! A-hee-ahee ha-hee! A-hee-ahee ha-hee! A-hee-ahee ha-hee! A-oo-oo-oo-ooo! Woo-oo-oo-ooo! Wa-wa-way-do Wub-wid-bid-dum-way-do Wa-wa-way-do"

  robot.respond /I\'?m batman/i, (res) ->
    res.send "https://www.youtube.com/watch?v=Y85wj59S94U"
