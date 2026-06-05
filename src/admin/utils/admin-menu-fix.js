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

  const getRouteKey = () => {
    const hash = window.location.hash || "#/";
    const route = hash.replace(/^#/, "").split("?")[0];

    if (route.startsWith("/templates") || route.startsWith("/configs/template")) {
      return "templates";
    }
    if (route.startsWith("/settings") || route.startsWith("/global-settings")) {
      return "global-settings";
    }
    if (route.startsWith("/manage-font") || route.startsWith("/manage-fonts")) {
      return "manage-fonts";
    }
    if (route.startsWith("/manage-cliparts")) {
      return "manage-cliparts";
    }
    if (route.startsWith("/request-quotes")) {
      return "request-quotes";
    }
    if (route === "/configuration" || route.startsWith("/configuration/") || route.startsWith("/configurations") || route.startsWith("/configs")) {
      return "configurations";
    }
    return "home";
  };

  const setActiveFromLocation = () => {
    const currentPath = normalize(getCurrentPath());
    const submenuItems = $("ul.wp-submenu li", menuRoot);
    const submenuLinks = $("ul.wp-submenu a", menuRoot);
    submenuItems.removeClass("current");

    let matched = false;
    submenuLinks.each(function (index, el) {
      const href = normalize($(el).attr("href"));
      if (href === currentPath) {
        $(el).parent().addClass("current");
        matched = true;
        return false;
      }
    });

    if (!matched) {
      const routeKey = getRouteKey();
      const routeMatch = {
        home: "#/",
        configurations: "#/configuration",
        templates: "#/templates/main",
        "global-settings": "#/settings",
        "manage-fonts": "#/manage-font",
        "manage-cliparts": "#/manage-cliparts",
        "request-quotes": "#/request-quotes",
      }[routeKey];

      if (routeMatch) {
        submenuLinks.each(function (index, el) {
          const href = String($(el).attr("href") || "");
          if (href.indexOf(routeMatch) !== -1) {
            $(el).parent().addClass("current");
            matched = true;
            return false;
          }
        });
      }
    }

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
