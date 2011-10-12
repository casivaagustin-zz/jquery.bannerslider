
$.fn.bannerSlider = function (foward, backward, direction) {
  $.fn.bannerSlider.addClasses.apply(this);
  this.firstElement = this.banners[0];
  this.currentBanner = 0;
  this.current_height = this.firstElement.height();
  this.containerWidth = this.width();
  this.foward = $(foward);
  this.backward = $(backward);
  
  if (this.banners.length <= 1) {
    //Is there is no elements hide the buttons
    this.foward.hide();
    this.backward.hide();
  }
  
  if(direction == 'y') {
    this.backward.hide();
    $(foward).bind('click', {
      container: this
    },  function(event) {
      $.fn.bannerSlider.slide.call(event.data.container,'up');
    });
    $(backward).bind('click', {
      container: this
    }, function(event) {
      $.fn.bannerSlider.slide.call(event.data.container,'down');
    });
  } else {
    this.foward.hide();
    $.fn.bannerSlider.addHorizontalAtributes.apply(this);
    $(foward).bind('click', {
      container: this
    },  function(event) {
      $.fn.bannerSlider.slide.call(event.data.container,'left');
    });
    $(backward).bind('click', {
      container: this
    }, function(event) {
      $.fn.bannerSlider.slide.call(event.data.container,'right');
    });
  }
}

/**
 * If is Horizontal sets a customs atributes 
 */
$.fn.bannerSlider.addHorizontalAtributes = function () {
  for(var i = 0; i < this.numberOfBanners; i++) {
    //this.banners[i].css('float','left');
    this.banners[i].css('position','absolute');    
    this.banners[i].css('width', this.containerWidth);
    this.banners[i].css('left', (this.width() * i));    
    this.banners[i].css('top', 0);  
  }
}

$.fn.bannerSlider.addClasses = function() {
  var childrens = this.children();
  this.numberOfBanners = childrens.length;
  this.banners = new Array();
  for(var i = 0; i < this.numberOfBanners; i++) {
    this.banners[i] = $(childrens[i]);
    this.banners[i].addClass('banner_item');
    this.banners[i].addClass('banner_item_' + i);
  }
  this.addClass('banner_container');
}

$.fn.bannerSlider.slide = function(direction) {
  var operator = '';
  var size = 0;
  var property = '';
  
  switch(direction) {
    case 'up':
      if (this.currentBanner >= this.numberOfBanners - 1) {
        return;
      }
      this.currentBanner += 1;
      operator = '-=';
      size = this.banners[this.currentBanner].height();
      
      property = {
        'margin-top' : operator + size
      };
      
      this.firstElement.animate(property, 500, function() { });
      this.backward.show();
      
      if(this.currentBanner >= this.numberOfBanners - 1 ) {
        this.foward.hide();
      }      
      
      return;
      break;
    case 'down':
      if (this.currentBanner <= 0) {
        return;
      }      
      this.currentBanner -= 1;
      operator = '+=';
      size = this.banners[this.currentBanner + 1].height();
      
      property = {
        'margin-top' : operator + size
      };
      
      this.firstElement.animate(property, 500, function() { });
      this.foward.show();
      if (this.currentBanner <= 0 ) {
        this.backward.hide();
      }      
      return;
      break;
    case 'right':      
      if (this.currentBanner >= this.numberOfBanners - 1) {        
        return;
      }
      
      this.currentBanner += 1;
      operator = '-=';           
      size = this.banners[this.currentBanner].width();
      
      property = {
        'left' : operator + size
      };
      
      for(i = 0; i < this.banners.length; i++) {
        this.banners[i].animate(property, 500, function() { });
      }
      this.foward.show();    
      
      if(this.currentBanner >= this.numberOfBanners - 1 ) {
        this.backward.hide();
      }      
      
      return;
      break;
    case 'left':
      if (this.currentBanner <= 0) {
        return;
      }
      this.backward.show();
      this.currentBanner -= 1;
      operator = '+=';      
      size = this.banners[this.currentBanner + 1].width();
      
      property = {
        'left' : operator + size
      };
      
      for(i = 0;  i <  this.banners.length; i++) {
        this.banners[i].animate(property, 500, function() { });
      }     
      
      if (this.currentBanner <= 0 ) {
        this.foward.hide();
      }      
      
      return;
      break;
  }
      
}
