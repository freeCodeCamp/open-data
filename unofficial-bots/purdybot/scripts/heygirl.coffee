# Description:
#   Gives hubot the ability to interact with Ryan Gosling memes
#
# Dependencies:
#   None
#
# Configuration:
#   None
#
# Commands:
#   heygirl - Retrieves a Ryan Gosling meme
#
# Notes:
#   None
#
# Authors:
#   iheartcode <https://github.com/iheartcode>
#   joepurdy <joe@poweredbypurdy.com>

module.exports = (robot) ->

  robot.hear /heygirl/i, (msg) ->
    heygirlMe msg, (url) ->
      msg.send "![heygirl](#{url})"

heygirlMe = (msg, cb) ->
# Using deprecated Google image search API
  q =
    v: '1.0'
    rsz: '8'
    q: 'hey girl meme programming'
    safe: process.env.HUBOT_GOOGLE_SAFE_SEARCH || 'active'
  msg.http('https://ajax.googleapis.com/ajax/services/search/images')
  .query(q)
  .get() (err, res, body) ->
    if err
      msg.send "Encountered an error :( #{err}"
      return
    if res.statusCode isnt 200
      msg.send "Bad HTTP response :( #{res.statusCode}"
      return
    images = JSON.parse(body)
    images = images.responseData?.results
    if images?.length > 0
      image = msg.random images
      cb ensureImageExtension(image.unescapedUrl)
    else
      msg.send "Sorry, I found no results for '#{query}'."

# Forces the URL look like an image URL by adding `#.png`
ensureImageExtension = (url) ->
  if /(png|jpe?g|gif)$/i.test(url)
    url
  else
    "#{url}#.png"
