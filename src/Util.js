class Util {
  static ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      document.attachEvent('onreadystatechange', () => {
        if (document.readyState !== 'loading') {
          fn();
        }
      });
    }
  }

  static removeChildren(element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  }
}

export default Util;
