
var Area = module.exports = function Area() {
  // nothing
}

Area.prototype = {
  count: 0
, callback: null

, join: function(callback) {
    if(this.count == 0) {
      this._reset()
      return callback()
    }
    this.callback = callback
  }

, increase: function(n) {
    if(!n) n = 1
    this.count += n
  }

, decrease: function(n) {
    if(!n) n = 1
    this.count -= n
    if(this.count <= 0 && this.callback) {
      var cb = this.callback
      this._reset()
      cb()
    }
  }

, _reset: function() {
    this.count = 0
    this.callback = null
  }
}

Area.prototype.inc = Area.prototype.increase
Area.prototype.dec = Area.prototype.decrease

Function.prototype.join = function(area) {
  var self = this
  area.increase()
  return function() {
    self.apply(this, Array.prototype.slice.call(arguments))
    area.decrease()
  }
}

