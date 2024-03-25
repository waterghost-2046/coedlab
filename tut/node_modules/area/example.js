
var Area = require('./area')
  , area = new Area()

function delay(cb) {
  setTimeout(cb,Math.random() * 1000)
}

function nodelay(cb) {
  return cb()
}

var i;
for (i = 0; i < 12; i ++)
  (function(id) {
    delay(function() {
      console.log('%d', id)
      if (id % 2)
        // async
        delay(function() {
          console.log('\t%d+', id)
        }.join(area))
      else
        // sync
        nodelay(function() {
          console.log('\t%d', id)
          delay(function() {
            console.log('\t\t%d', id)
          }.join(area))
        }.join(area))
    }.join(area))
  }) (i)

area.join(function() {
  console.log("\nDone!")
})

