(function($) {
  /**
   * Makes a Slide from a several elements on a container.
   * 
   * foward : Selector for the Element thats controls the foward
   * backward : Selector for the Element thats controls the Backwards
   * direction : Direction of the animation, x for horizontal, y for vertical
   * 
   * The a proper visualization set customs styles.
  */
  $.fn.bannerSlider = function (foward, backward, direction) {
  
    this.addHorizontalAtributes = function () {
      for(var i = 0; i < this.numberOfBanners; i++) {
        this.banners[i].css('position','absolute');    
        this.banners[i].css('width', this.containerWidth);
        this.banners[i].css('left', (this.width() * i));    
        this.banners[i].css('top', 0);  
      }
    }

    this.addClasses = function() {
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
  
    this.isLast = function() {
      if (this.currentBanner >= this.numberOfBanners - 1) {
        return true;
      }
      return false;
    }
  
    this.isFirst = function() {
      if (this.currentBanner <= 0) {
        return true;
      }
      return false;
    }
  
    this.animateHorizontal = function (property) {
      for(var i = 0; i < this.banners.length; i++) {
        this.banners[i].animate(property, 500, function() { });
      }
    }

    this.slide = function(direction) {
    
      var operator = '';
      var size = 0;
      var property = '';
    
      property = {
        'margin-top' : null,
        'left': null
      };
   
      if (direction == 'up' || direction == 'right') {
        if (this.isLast()) {
          return ;
        }
        this.backward.show();    
        this.currentBanner += 1;
        operator = '-=';
      } else if (direction == 'down' || direction == 'left') {
        if (this.isFirst()) {
          return;
        }
        this.foward.show();
        this.currentBanner -= 1;
        operator = '+=';
      }
    
      switch(direction) {
        case 'up':
          size = this.banners[this.currentBanner].height();
          property['margin-top'] = operator + size;
          this.firstElement.animate(property, 500, function() { });
          return;
        case 'right':
          size = this.banners[this.currentBanner].width();    
          property['left'] = operator + size;
          this.animateHorizontal(property);
          return;
        case 'down':
          size = this.banners[this.currentBanner + 1].height();
          property['margin-top'] = operator + size;
          this.firstElement.animate(property, 500, function() { });
          return;
        case 'left':
          size = this.banners[this.currentBanner + 1].width();
          property['left'] = operator + size;
          this.animateHorizontal(property);   
          return;
      }
    
      if(this.isLast()) {
        this.foward.hide();
      }     
    
      if (this.isFirst()) {
        this.backward.hide();
      }
    }

    this.addClasses(this);
    this.firstElement = this.banners[0];
    this.currentBanner = 0;
    this.current_height = this.firstElement.height();
    this.containerWidth = this.width();
    this.foward = $(foward);
    this.backward = $(backward);
    this.backward.hide();
    this.container = $(this);
    this.container.css('overflow','hidden');
    this.container.css('position','relative');
  
    if (this.banners.length <= 1) {
      //Is there is no elements hide control buttons
      this.foward.hide();
      this.backward.hide();
      return this;
    } 
  
    if(direction == 'y') {
      $(foward).bind('click', {
        container: this
      },  function(event) {
        event.data.container.slide('up');
      });
    
      $(backward).bind('click', {
        container: this
      }, function(event) {
        event.data.container.slide('down');
      });
    
    } else {
      this.addHorizontalAtributes(this);
      $(foward).bind('click', {
        container: this
      },  function(event) {
        event.data.container.slide('right');
      });
    
      $(backward).bind('click', {
        container: this
      }, function(event) {
        event.data.container.slide('left');
      }); 
    }
  
    return this;
  }
})(jQuery);