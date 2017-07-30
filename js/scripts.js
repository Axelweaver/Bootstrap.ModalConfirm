$(document).delegate("button[data-toggle='alert-success-simple']", "click", function (e) {
    e.preventDefault();

    modalConfirm("", "Простое оповещение").success.alert();
});
$(document).delegate("button[data-toggle='alert-success-header']", "click", function (e) {
    e.preventDefault();

    modalConfirm("Заголовок", "Текст под заголовком").success.alert();
});
$(document).delegate("button[data-toggle='alert-success-full']", "click", function (e) {
    e.preventDefault();

    modalConfirm("Заголовок", "Текст под заголовком", "Текст с подробностями").success.alert();
});

$(document).delegate("button[data-toggle='alert-warning-simple']", "click", function (e) {
    e.preventDefault();

    modalConfirm("", "Простое оповещение").warning.alert();
});
$(document).delegate("button[data-toggle='alert-warning-header']", "click", function (e) {
    e.preventDefault();

    modalConfirm("Заголовок", "Текст под заголовком").warning.alert();
});
$(document).delegate("button[data-toggle='alert-warning-full']", "click", function (e) {
    e.preventDefault();

    modalConfirm("Заголовок", "Текст под заголовком", "Текст с подробностями").warning.alert();
});

$(document).delegate("button[data-toggle='alert-danger-simple']", "click", function (e) {
    e.preventDefault();

    modalConfirm("", "Простое оповещение").danger.alert();
});
$(document).delegate("button[data-toggle='alert-danger-header']", "click", function (e) {
    e.preventDefault();

    modalConfirm("Заголовок", "Текст под заголовком").danger.alert();
});
$(document).delegate("button[data-toggle='alert-danger-full']", "click", function (e) {
    e.preventDefault();

    modalConfirm("Заголовок", "Текст под заголовком", "Текст с подробностями").danger.alert();
});

