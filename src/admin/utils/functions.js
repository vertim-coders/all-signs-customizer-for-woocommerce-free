const toastMessage = (text, action = 'success') => {
    toastr.options = {
        'closeButton': true,
        'debug': false,
        'newestOnTop': false,
        'progressBar': false,
        'positionClass': 'toast-bottom-right',
        'preventDuplicates': false,
        'showDuration': '300',
        'hideDuration': '200',
        'timeOut': '100',
        'extendedTimeOut': '100',
        'showEasing': 'swing',
        'hideEasing': 'linear',
        'showMethod': 'fadeIn',
        'hideMethod': 'fadeOut',
    }
    if (action == 'success') {
        toastr.success(text);
    } else if (action == "warning") {
        toastr.warning(text);
    } else {
        toastr.error(text);
    }

}
export default toastMessage;