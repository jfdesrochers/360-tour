AFRAME.registerSystem('images', {
  current: 0,
  images: [],
  init: function() {
    this.images = document.getElementsByClassName('img-360')
    
    var previous = document.querySelector('#previous')
    previous.setAttribute('src', this.images[this.images.length - 1].src)
    
    var sky = document.querySelector('a-sky')
    sky.setAttribute('src', this.images[0].src)
    
    var next = document.querySelector('#next')
    next.setAttribute('src', this.images[1].src)
  },
  getNext: function() {
    if (this.current < this.images.length - 1) {
      return this.current + 1
    } else {
      return 0
    }
  },
  getPrevious: function() {
    if (this.current > 0) {
      return this.current - 1
    } else {
      return this.images.length - 1
    }
  }
})

AFRAME.registerComponent('previous', {
  init: function() {
    var el = this.el
    var system = document.querySelector('a-scene').systems['images']
    var sky = document.querySelector('a-sky')
    var next = document.querySelector('#next')
    el.addEventListener('click', function() {
      system.current = system.getPrevious()
      sky.setAttribute('src', system.images[system.current].src)
      el.setAttribute('src', system.images[system.getPrevious()].src)
      next.setAttribute('src', system.images[system.getNext()].src)
    })
  }
})

AFRAME.registerComponent('next', {
  init: function() {
    var el = this.el
    var system = document.querySelector('a-scene').systems['images']
    var sky = document.querySelector('a-sky')
    var previous = document.querySelector('#previous')
    el.addEventListener('click', function() {
      system.current = system.getNext()
      sky.setAttribute('src', system.images[system.current].src)
      el.setAttribute('src', system.images[system.getNext()].src)
      previous.setAttribute('src', system.images[system.getPrevious()].src)
    })
  }
})