(function ($) {
  $(document).ready(function () {
    window.tinymce.init({
      selector: "#aso-admin-tinymce",
      plugins: ["link image", "media paste"],
      toolbar:
        "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code",
      menubar: "file edit insert format table",
      relative_urls: false,
      remove_script_host: false,
      convert_urls: true,
      height: 200,
      width: "100%",
      branding: false,
    });
  });
})(jQuery);
