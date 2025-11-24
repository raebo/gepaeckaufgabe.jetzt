"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

  // ns-hugo-imp:/home/borisr/development/projects/juja/gepaeckaufgabe.jetzt/assets/ts/components/navigation.ts
  var Navigation = class {
    constructor(config = {}) {
      __publicField(this, "config");
      __publicField(this, "navLinks");
      this.config = __spreadValues({
        smoothScroll: true,
        highlightActive: true,
        offset: 100
      }, config);
      this.navLinks = document.querySelectorAll('nav a[href^="#"]');
    }
    init() {
      if (this.config.smoothScroll) {
        this.initSmoothScroll();
      }
      if (this.config.highlightActive) {
        this.initActiveSectionTracking();
      }
    }
    initSmoothScroll() {
      this.navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          this.scrollToSection(link.hash);
        });
      });
    }
    scrollToSection(sectionId) {
      const target = document.querySelector(sectionId);
      if (!target) return;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - this.config.offset;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });
    }
    initActiveSectionTracking() {
      window.addEventListener("scroll", this.throttle(() => {
        this.updateActiveLink();
      }, 100));
    }
    updateActiveLink() {
      const scrollPosition = window.scrollY + this.config.offset;
      this.navLinks.forEach((link) => {
        link.classList.remove("active");
        const section = document.querySelector(link.hash);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
          const sectionBottom = sectionTop + section.clientHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            link.classList.add("active");
          }
        }
      });
    }
    throttle(func, limit) {
      let inThrottle;
      return ((...args) => {
        if (!inThrottle) {
          func.apply(this, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      });
    }
  };
  function initNavigation(config) {
    const navigation = new Navigation(config);
    navigation.init();
    return navigation;
  }

  // ns-hugo-imp:/home/borisr/development/projects/juja/gepaeckaufgabe.jetzt/assets/ts/components/animations.ts
  var ScrollAnimator = class {
    constructor(config = {}) {
      __publicField(this, "observer");
      __publicField(this, "config");
      this.config = __spreadValues({
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
      }, config);
      this.observer = new IntersectionObserver(
        this.handleIntersection.bind(this),
        this.config
      );
    }
    observeElements(selector = ".animate-on-scroll") {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.classList.add("animate-ready");
        this.observer.observe(element);
      });
    }
    handleIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-active");
        } else {
          entry.target.classList.remove("animate-active");
        }
      });
    }
    disconnect() {
      this.observer.disconnect();
    }
  };
  function initAnimations(config) {
    const animator = new ScrollAnimator(config);
    animator.observeElements();
    return animator;
  }

  // <stdin>
  var App = class {
    constructor() {
      __publicField(this, "sections", []);
      this.init();
    }
    init() {
      document.addEventListener("DOMContentLoaded", () => {
        this.detectSections();
        initNavigation();
        initAnimations();
      });
    }
    detectSections() {
      const sectionElements = document.querySelectorAll("section");
      sectionElements.forEach((section) => {
        var _a;
        const id = section.id;
        if (id) {
          this.sections.push({
            id,
            title: ((_a = section.querySelector("h1, h2")) == null ? void 0 : _a.textContent) || id,
            visible: false
          });
        }
      });
      console.log("Detected sections:", this.sections);
    }
    getSections() {
      return this.sections;
    }
  };
  var app = new App();
  window.App = app;
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibnMtaHVnby1pbXA6L2hvbWUvYm9yaXNyL2RldmVsb3BtZW50L3Byb2plY3RzL2p1amEvZ2VwYWVja2F1ZmdhYmUuamV0enQvYXNzZXRzL3RzL2NvbXBvbmVudHMvbmF2aWdhdGlvbi50cyIsICJucy1odWdvLWltcDovaG9tZS9ib3Jpc3IvZGV2ZWxvcG1lbnQvcHJvamVjdHMvanVqYS9nZXBhZWNrYXVmZ2FiZS5qZXR6dC9hc3NldHMvdHMvY29tcG9uZW50cy9hbmltYXRpb25zLnRzIiwgIjxzdGRpbj4iXSwKICAic291cmNlc0NvbnRlbnQiOiBbImV4cG9ydCBpbnRlcmZhY2UgTmF2Q29uZmlnIHtcbiAgc21vb3RoU2Nyb2xsOiBib29sZWFuO1xuICBoaWdobGlnaHRBY3RpdmU6IGJvb2xlYW47XG4gIG9mZnNldDogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbiB7XG4gIHByaXZhdGUgY29uZmlnOiBOYXZDb25maWc7XG4gIHByaXZhdGUgbmF2TGlua3M6IE5vZGVMaXN0T2Y8SFRNTEFuY2hvckVsZW1lbnQ+O1xuICBcbiAgY29uc3RydWN0b3IoY29uZmlnOiBQYXJ0aWFsPE5hdkNvbmZpZz4gPSB7fSkge1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgc21vb3RoU2Nyb2xsOiB0cnVlLFxuICAgICAgaGlnaGxpZ2h0QWN0aXZlOiB0cnVlLFxuICAgICAgb2Zmc2V0OiAxMDAsXG4gICAgICAuLi5jb25maWdcbiAgICB9O1xuICAgIFxuICAgIHRoaXMubmF2TGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCduYXYgYVtocmVmXj1cIiNcIl0nKTtcbiAgfVxuICBcbiAgcHVibGljIGluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY29uZmlnLnNtb290aFNjcm9sbCkge1xuICAgICAgdGhpcy5pbml0U21vb3RoU2Nyb2xsKCk7XG4gICAgfVxuICAgIFxuICAgIGlmICh0aGlzLmNvbmZpZy5oaWdobGlnaHRBY3RpdmUpIHtcbiAgICAgIHRoaXMuaW5pdEFjdGl2ZVNlY3Rpb25UcmFja2luZygpO1xuICAgIH1cbiAgfVxuICBcbiAgcHJpdmF0ZSBpbml0U21vb3RoU2Nyb2xsKCk6IHZvaWQge1xuICAgIHRoaXMubmF2TGlua3MuZm9yRWFjaChsaW5rID0+IHtcbiAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZTogRXZlbnQpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGlzLnNjcm9sbFRvU2VjdGlvbihsaW5rLmhhc2gpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIHByaXZhdGUgc2Nyb2xsVG9TZWN0aW9uKHNlY3Rpb25JZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWN0aW9uSWQpO1xuICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgdGFyZ2V0UG9zaXRpb24gPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnBhZ2VZT2Zmc2V0IC0gdGhpcy5jb25maWcub2Zmc2V0O1xuICAgIFxuICAgIHdpbmRvdy5zY3JvbGxUbyh7XG4gICAgICB0b3A6IHRhcmdldFBvc2l0aW9uLFxuICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnIGFzIFNjcm9sbEJlaGF2aW9yXG4gICAgfSk7XG4gIH1cbiAgXG4gIHByaXZhdGUgaW5pdEFjdGl2ZVNlY3Rpb25UcmFja2luZygpOiB2b2lkIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdGhpcy50aHJvdHRsZSgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUFjdGl2ZUxpbmsoKTtcbiAgICB9LCAxMDApKTtcbiAgfVxuICBcbiAgcHJpdmF0ZSB1cGRhdGVBY3RpdmVMaW5rKCk6IHZvaWQge1xuICAgIGNvbnN0IHNjcm9sbFBvc2l0aW9uID0gd2luZG93LnNjcm9sbFkgKyB0aGlzLmNvbmZpZy5vZmZzZXQ7XG4gICAgXG4gICAgdGhpcy5uYXZMaW5rcy5mb3JFYWNoKGxpbmsgPT4ge1xuICAgICAgbGluay5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKTtcbiAgICAgIGNvbnN0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGxpbmsuaGFzaCk7XG4gICAgICBcbiAgICAgIGlmIChzZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNlY3Rpb25Ub3AgPSBzZWN0aW9uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICAgICAgY29uc3Qgc2VjdGlvbkJvdHRvbSA9IHNlY3Rpb25Ub3AgKyBzZWN0aW9uLmNsaWVudEhlaWdodDtcbiAgICAgICAgXG4gICAgICAgIGlmIChzY3JvbGxQb3NpdGlvbiA+PSBzZWN0aW9uVG9wICYmIHNjcm9sbFBvc2l0aW9uIDwgc2VjdGlvbkJvdHRvbSkge1xuICAgICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBcbiAgcHJpdmF0ZSB0aHJvdHRsZTxUIGV4dGVuZHMgKC4uLmFyZ3M6IGFueVtdKSA9PiBhbnk+KGZ1bmM6IFQsIGxpbWl0OiBudW1iZXIpOiBUIHtcbiAgICBsZXQgaW5UaHJvdHRsZTogYm9vbGVhbjtcbiAgICByZXR1cm4gKCguLi5hcmdzOiBhbnlbXSkgPT4ge1xuICAgICAgaWYgKCFpblRocm90dGxlKSB7XG4gICAgICAgIGZ1bmMuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGluVGhyb3R0bGUgPSB0cnVlO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGluVGhyb3R0bGUgPSBmYWxzZSwgbGltaXQpO1xuICAgICAgfVxuICAgIH0pIGFzIFQ7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXROYXZpZ2F0aW9uKGNvbmZpZz86IFBhcnRpYWw8TmF2Q29uZmlnPik6IE5hdmlnYXRpb24ge1xuICBjb25zdCBuYXZpZ2F0aW9uID0gbmV3IE5hdmlnYXRpb24oY29uZmlnKTtcbiAgbmF2aWdhdGlvbi5pbml0KCk7XG4gIHJldHVybiBuYXZpZ2F0aW9uO1xufVxuIiwgImV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uQ29uZmlnIHtcbiAgdGhyZXNob2xkOiBudW1iZXI7XG4gIHJvb3RNYXJnaW46IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFNjcm9sbEFuaW1hdG9yIHtcbiAgcHJpdmF0ZSBvYnNlcnZlcjogSW50ZXJzZWN0aW9uT2JzZXJ2ZXI7XG4gIHByaXZhdGUgY29uZmlnOiBBbmltYXRpb25Db25maWc7XG4gIFxuICBjb25zdHJ1Y3Rvcihjb25maWc6IFBhcnRpYWw8QW5pbWF0aW9uQ29uZmlnPiA9IHt9KSB7XG4gICAgdGhpcy5jb25maWcgPSB7XG4gICAgICB0aHJlc2hvbGQ6IDAuMSxcbiAgICAgIHJvb3RNYXJnaW46ICcwcHggMHB4IC01MHB4IDBweCcsXG4gICAgICAuLi5jb25maWdcbiAgICB9O1xuICAgIFxuICAgIHRoaXMub2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoXG4gICAgICB0aGlzLmhhbmRsZUludGVyc2VjdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgdGhpcy5jb25maWdcbiAgICApO1xuICB9XG4gIFxuICBwdWJsaWMgb2JzZXJ2ZUVsZW1lbnRzKHNlbGVjdG9yOiBzdHJpbmcgPSAnLmFuaW1hdGUtb24tc2Nyb2xsJyk6IHZvaWQge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgXG4gICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgIC8vIFNldCBpbml0aWFsIHN0YXRlXG4gICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGUtcmVhZHknKTtcbiAgICAgIHRoaXMub2JzZXJ2ZXIub2JzZXJ2ZShlbGVtZW50KTtcbiAgICB9KTtcbiAgfVxuICBcbiAgcHJpdmF0ZSBoYW5kbGVJbnRlcnNlY3Rpb24oZW50cmllczogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJFbnRyeVtdKTogdm9pZCB7XG4gICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xuICAgICAgICBlbnRyeS50YXJnZXQuY2xhc3NMaXN0LmFkZCgnYW5pbWF0ZS1hY3RpdmUnKTtcbiAgICAgICAgLy8gT3B0aW9uYWw6IHVub2JzZXJ2ZSBhZnRlciBhbmltYXRpb25cbiAgICAgICAgLy8gdGhpcy5vYnNlcnZlci51bm9ic2VydmUoZW50cnkudGFyZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVudHJ5LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdhbmltYXRlLWFjdGl2ZScpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIFxuICBwdWJsaWMgZGlzY29ubmVjdCgpOiB2b2lkIHtcbiAgICB0aGlzLm9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEFuaW1hdGlvbnMoY29uZmlnPzogUGFydGlhbDxBbmltYXRpb25Db25maWc+KTogU2Nyb2xsQW5pbWF0b3Ige1xuICBjb25zdCBhbmltYXRvciA9IG5ldyBTY3JvbGxBbmltYXRvcihjb25maWcpO1xuICBhbmltYXRvci5vYnNlcnZlRWxlbWVudHMoKTtcbiAgcmV0dXJuIGFuaW1hdG9yO1xufVxuIiwgIi8vIEltcG9ydCBvdGhlciBUUyBmaWxlc1xuaW1wb3J0IHsgaW5pdE5hdmlnYXRpb24gfSBmcm9tICcuL2NvbXBvbmVudHMvbmF2aWdhdGlvbic7XG5pbXBvcnQgeyBpbml0QW5pbWF0aW9ucyB9IGZyb20gXCIuL2NvbXBvbmVudHMvYW5pbWF0aW9uc1wiO1xuXG4vLyBUeXBlIGRlZmluaXRpb25zXG5pbnRlcmZhY2UgU2VjdGlvbiB7XG4gIGlkOiBzdHJpbmc7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIHZpc2libGU6IGJvb2xlYW47XG59XG5cbmNsYXNzIEFwcCB7XG4gIHByaXZhdGUgc2VjdGlvbnM6IFNlY3Rpb25bXSA9IFtdO1xuICBcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cbiAgXG4gIHByaXZhdGUgaW5pdCgpOiB2b2lkIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgICAgdGhpcy5kZXRlY3RTZWN0aW9ucygpO1xuICAgICAgaW5pdE5hdmlnYXRpb24oKTtcbiAgICAgIGluaXRBbmltYXRpb25zKCk7XG4gICAgfSk7XG4gIH1cbiAgXG4gIHByaXZhdGUgZGV0ZWN0U2VjdGlvbnMoKTogdm9pZCB7XG4gICAgY29uc3Qgc2VjdGlvbkVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnc2VjdGlvbicpO1xuICAgIFxuICAgIHNlY3Rpb25FbGVtZW50cy5mb3JFYWNoKHNlY3Rpb24gPT4ge1xuICAgICAgY29uc3QgaWQgPSBzZWN0aW9uLmlkO1xuICAgICAgaWYgKGlkKSB7XG4gICAgICAgIHRoaXMuc2VjdGlvbnMucHVzaCh7XG4gICAgICAgICAgaWQsXG4gICAgICAgICAgdGl0bGU6IHNlY3Rpb24ucXVlcnlTZWxlY3RvcignaDEsIGgyJyk/LnRleHRDb250ZW50IHx8IGlkLFxuICAgICAgICAgIHZpc2libGU6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIFxuICAgIGNvbnNvbGUubG9nKCdEZXRlY3RlZCBzZWN0aW9uczonLCB0aGlzLnNlY3Rpb25zKTtcbiAgfVxuICBcbiAgcHVibGljIGdldFNlY3Rpb25zKCk6IFNlY3Rpb25bXSB7XG4gICAgcmV0dXJuIHRoaXMuc2VjdGlvbnM7XG4gIH1cbn1cblxuLy8gSW5pdGlhbGl6ZSBhcHBcbmNvbnN0IGFwcCA9IG5ldyBBcHAoKTtcblxuLy8gRXhwb3J0IGZvciBwb3RlbnRpYWwgdXNlIGluIGJyb3dzZXIgY29uc29sZVxuZGVjbGFyZSBnbG9iYWwge1xuICBpbnRlcmZhY2UgV2luZG93IHtcbiAgICBBcHA6IEFwcDtcbiAgfVxufVxuXG53aW5kb3cuQXBwID0gYXBwO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTU8sTUFBTSxhQUFOLE1BQWlCO0FBQUEsSUFJdEIsWUFBWSxTQUE2QixDQUFDLEdBQUc7QUFIN0MsMEJBQVE7QUFDUiwwQkFBUTtBQUdOLFdBQUssU0FBUztBQUFBLFFBQ1osY0FBYztBQUFBLFFBQ2QsaUJBQWlCO0FBQUEsUUFDakIsUUFBUTtBQUFBLFNBQ0w7QUFHTCxXQUFLLFdBQVcsU0FBUyxpQkFBaUIsa0JBQWtCO0FBQUEsSUFDOUQ7QUFBQSxJQUVPLE9BQWE7QUFDbEIsVUFBSSxLQUFLLE9BQU8sY0FBYztBQUM1QixhQUFLLGlCQUFpQjtBQUFBLE1BQ3hCO0FBRUEsVUFBSSxLQUFLLE9BQU8saUJBQWlCO0FBQy9CLGFBQUssMEJBQTBCO0FBQUEsTUFDakM7QUFBQSxJQUNGO0FBQUEsSUFFUSxtQkFBeUI7QUFDL0IsV0FBSyxTQUFTLFFBQVEsVUFBUTtBQUM1QixhQUFLLGlCQUFpQixTQUFTLENBQUMsTUFBYTtBQUMzQyxZQUFFLGVBQWU7QUFDakIsZUFBSyxnQkFBZ0IsS0FBSyxJQUFJO0FBQUEsUUFDaEMsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUVRLGdCQUFnQixXQUF5QjtBQUMvQyxZQUFNLFNBQVMsU0FBUyxjQUFjLFNBQVM7QUFDL0MsVUFBSSxDQUFDLE9BQVE7QUFFYixZQUFNLGlCQUFpQixPQUFPLHNCQUFzQixFQUFFLE1BQU0sT0FBTyxjQUFjLEtBQUssT0FBTztBQUU3RixhQUFPLFNBQVM7QUFBQSxRQUNkLEtBQUs7QUFBQSxRQUNMLFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFFUSw0QkFBa0M7QUFDeEMsYUFBTyxpQkFBaUIsVUFBVSxLQUFLLFNBQVMsTUFBTTtBQUNwRCxhQUFLLGlCQUFpQjtBQUFBLE1BQ3hCLEdBQUcsR0FBRyxDQUFDO0FBQUEsSUFDVDtBQUFBLElBRVEsbUJBQXlCO0FBQy9CLFlBQU0saUJBQWlCLE9BQU8sVUFBVSxLQUFLLE9BQU87QUFFcEQsV0FBSyxTQUFTLFFBQVEsVUFBUTtBQUM1QixhQUFLLFVBQVUsT0FBTyxRQUFRO0FBQzlCLGNBQU0sVUFBVSxTQUFTLGNBQWMsS0FBSyxJQUFJO0FBRWhELFlBQUksU0FBUztBQUNYLGdCQUFNLGFBQWEsUUFBUSxzQkFBc0IsRUFBRSxNQUFNLE9BQU87QUFDaEUsZ0JBQU0sZ0JBQWdCLGFBQWEsUUFBUTtBQUUzQyxjQUFJLGtCQUFrQixjQUFjLGlCQUFpQixlQUFlO0FBQ2xFLGlCQUFLLFVBQVUsSUFBSSxRQUFRO0FBQUEsVUFDN0I7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBRVEsU0FBNEMsTUFBUyxPQUFrQjtBQUM3RSxVQUFJO0FBQ0osY0FBUSxJQUFJLFNBQWdCO0FBQzFCLFlBQUksQ0FBQyxZQUFZO0FBQ2YsZUFBSyxNQUFNLE1BQU0sSUFBSTtBQUNyQix1QkFBYTtBQUNiLHFCQUFXLE1BQU0sYUFBYSxPQUFPLEtBQUs7QUFBQSxRQUM1QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVPLFdBQVMsZUFBZSxRQUF5QztBQUN0RSxVQUFNLGFBQWEsSUFBSSxXQUFXLE1BQU07QUFDeEMsZUFBVyxLQUFLO0FBQ2hCLFdBQU87QUFBQSxFQUNUOzs7QUN2Rk8sTUFBTSxpQkFBTixNQUFxQjtBQUFBLElBSTFCLFlBQVksU0FBbUMsQ0FBQyxHQUFHO0FBSG5ELDBCQUFRO0FBQ1IsMEJBQVE7QUFHTixXQUFLLFNBQVM7QUFBQSxRQUNaLFdBQVc7QUFBQSxRQUNYLFlBQVk7QUFBQSxTQUNUO0FBR0wsV0FBSyxXQUFXLElBQUk7QUFBQSxRQUNsQixLQUFLLG1CQUFtQixLQUFLLElBQUk7QUFBQSxRQUNqQyxLQUFLO0FBQUEsTUFDUDtBQUFBLElBQ0Y7QUFBQSxJQUVPLGdCQUFnQixXQUFtQixzQkFBNEI7QUFDcEUsWUFBTSxXQUFXLFNBQVMsaUJBQWlCLFFBQVE7QUFFbkQsZUFBUyxRQUFRLGFBQVc7QUFFMUIsZ0JBQVEsVUFBVSxJQUFJLGVBQWU7QUFDckMsYUFBSyxTQUFTLFFBQVEsT0FBTztBQUFBLE1BQy9CLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFFUSxtQkFBbUIsU0FBNEM7QUFDckUsY0FBUSxRQUFRLFdBQVM7QUFDdkIsWUFBSSxNQUFNLGdCQUFnQjtBQUN4QixnQkFBTSxPQUFPLFVBQVUsSUFBSSxnQkFBZ0I7QUFBQSxRQUc3QyxPQUFPO0FBQ0wsZ0JBQU0sT0FBTyxVQUFVLE9BQU8sZ0JBQWdCO0FBQUEsUUFDaEQ7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFFTyxhQUFtQjtBQUN4QixXQUFLLFNBQVMsV0FBVztBQUFBLElBQzNCO0FBQUEsRUFDRjtBQUVPLFdBQVMsZUFBZSxRQUFtRDtBQUNoRixVQUFNLFdBQVcsSUFBSSxlQUFlLE1BQU07QUFDMUMsYUFBUyxnQkFBZ0I7QUFDekIsV0FBTztBQUFBLEVBQ1Q7OztBQzFDQSxNQUFNLE1BQU4sTUFBVTtBQUFBLElBR1IsY0FBYztBQUZkLDBCQUFRLFlBQXNCLENBQUM7QUFHN0IsV0FBSyxLQUFLO0FBQUEsSUFDWjtBQUFBLElBRVEsT0FBYTtBQUNuQixlQUFTLGlCQUFpQixvQkFBb0IsTUFBTTtBQUNsRCxhQUFLLGVBQWU7QUFDcEIsdUJBQWU7QUFDZix1QkFBZTtBQUFBLE1BQ2pCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFFUSxpQkFBdUI7QUFDN0IsWUFBTSxrQkFBa0IsU0FBUyxpQkFBaUIsU0FBUztBQUUzRCxzQkFBZ0IsUUFBUSxhQUFXO0FBN0J2QztBQThCTSxjQUFNLEtBQUssUUFBUTtBQUNuQixZQUFJLElBQUk7QUFDTixlQUFLLFNBQVMsS0FBSztBQUFBLFlBQ2pCO0FBQUEsWUFDQSxTQUFPLGFBQVEsY0FBYyxRQUFRLE1BQTlCLG1CQUFpQyxnQkFBZTtBQUFBLFlBQ3ZELFNBQVM7QUFBQSxVQUNYLENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRixDQUFDO0FBRUQsY0FBUSxJQUFJLHNCQUFzQixLQUFLLFFBQVE7QUFBQSxJQUNqRDtBQUFBLElBRU8sY0FBeUI7QUFDOUIsYUFBTyxLQUFLO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFHQSxNQUFNLE1BQU0sSUFBSSxJQUFJO0FBU3BCLFNBQU8sTUFBTTsiLAogICJuYW1lcyI6IFtdCn0K
