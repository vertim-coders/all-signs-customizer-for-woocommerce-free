function menuFix(slug) {
  var $ = jQuery;

  let menuRoot = $("#toplevel_page_" + slug);

  const getCurrentPath = () => {
    const url = window.location.href || "";
    const adminIndex = url.indexOf("admin.php");
    if (adminIndex !== -1) {
      return url.substring(adminIndex);
    }
    return window.location.pathname + window.location.search + window.location.hash;
  };

  const normalize = (path) => String(path || "").replace(/#\/?$/, "#/");

  const setActiveFromLocation = () => {
    const currentPath = normalize(getCurrentPath());
    const submenuItems = $("ul.wp-submenu li", menuRoot);
    submenuItems.removeClass("current");

    let matched = false;
    $("ul.wp-submenu a", menuRoot).each(function (index, el) {
      const href = normalize($(el).attr("href"));
      if (href === currentPath) {
        $(el).parent().addClass("current");
        matched = true;
        return false;
      }
    });

    if (!matched) {
      $("li.wp-first-item", menuRoot).addClass("current");
    }
  };

  menuRoot.on("click", "a", function () {
    var self = $(this);

    $("ul.wp-submenu li", menuRoot).removeClass("current");

    if (self.hasClass("wp-has-submenu")) {
      $("li.wp-first-item", menuRoot).addClass("current");
    } else {
      self.parents("li").addClass("current");
    }
  });

  setActiveFromLocation();
  window.addEventListener("hashchange", setActiveFromLocation);
}

export default menuFix;
