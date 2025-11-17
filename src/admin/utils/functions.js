const toastMessage = (text, action = "success") => {
  toastr.options = {
    closeButton: true,
    debug: false,
    newestOnTop: false,
    progressBar: false,
    positionClass: "toast-bottom-right",
    preventDuplicates: false,
    showDuration: "1500",
    hideDuration: "1000",
    timeOut: "1500",
    extendedTimeOut: "300",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut",
  };
  if (action == "success") {
    toastr.success(text);
  } else if (action == "warning") {
    toastr.warning(text);
  } else {
    toastr.error(text);
  }
};
export default toastMessage;
