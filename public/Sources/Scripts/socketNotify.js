io(window.location.origin).on("newSupportRequest", (answer) => {
  toastr.options.closeButton = true;
  toastr.options.positionClass = "toast-absolute toast-top-left";
  toastr.success("Support request created!");
});