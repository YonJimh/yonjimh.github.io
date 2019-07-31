/* global NexT, CONFIG */

$(document).ready(function() {

  var sidebarInner = $('.sidebar-inner');
  var sidebarOffset = CONFIG.sidebar.offset ? CONFIG.sidebar.offset : 12;

  function getHeaderOffset() {
    return $('.header-inner').height() + sidebarOffset;
  }

  function getFooterOffset() {
    var footerInner = $('.footer-inner');
    var footerMargin = footerInner.outerHeight(true) - footerInner.outerHeight();
    var footerOffset = footerInner.outerHeight(true) + footerMargin;
    return footerOffset;
  }

  function initAffix() {
    // console.log(getFooterOffset(), 'getFooterOffset');

    var headerOffset = getHeaderOffset();
    var footerOffset = getFooterOffset();
    var sidebarHeight = $('#sidebar').height() + NexT.utils.getSidebarb2tHeight();
    var contentHeight = $('#content').height();

    // Not affix if sidebar taller then content (to prevent bottom jumping).
    // if (headerOffset + sidebarHeight < contentHeight) {
    //   sidebarInner.affix({
    //     offset: {
    //       top   : headerOffset - sidebarOffset,
    //       bottom: footerOffset
    //     }
    //   });
    //   sidebarInner.affix('checkPosition');
    // }
    if ( sidebarHeight < contentHeight) {
      console.log('pisces initAffix');
        // 2 * sidebarOffset 才不会显得那么生硬
        sidebarInner.affix({
          offset: {
            top   : headerOffset - 2 * sidebarOffset,
            bottom: 540
          }
        });
        // sidebarInner.affix('checkPosition');
      }
    // $('#sidebar').css({ 'margin-top': headerOffset, 'margin-left': 'initial' });
  }

  function recalculateAffixPosition() {
    $(window).off('.affix');
    sidebarInner.removeData('bs.affix').removeClass('affix affix-top affix-bottom');
    initAffix();
  }

  function resizeListener() {
    var mql = window.matchMedia('(min-width: 992px)');
    mql.addListener(function(e) {
      if (e.matches) {
        recalculateAffixPosition();
      }
    });
  }

  initAffix();
  resizeListener();
});
