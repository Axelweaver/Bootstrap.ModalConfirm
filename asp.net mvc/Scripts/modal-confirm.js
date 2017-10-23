(function (window) {

    var modalFormSelector = "div#ModalConfirmForm";
    var  modalForm = $(modalFormSelector);
    // Убирает обработчики событий с кнопок "Да" и "Отмена"
    $(modalFormSelector).bind("hidden.bs.modal", function () {
        $("button[data-role='confirm-button']").unbind();
        $("button[data-role='cancel-button']").unbind();
    });

    $(modalFormSelector).bind("hidden.bs.modal",
        function () {
            modalForm.isShown = false;
        });
    $(modalFormSelector).bind("shown.bs.modal",
        function () {
            modalForm.isShown = true;
        });
    var setButtonsText = function(text) {
        var buttons = ["confirm-button", "alert-button"];
        var buttonsText = ["Да", "ОК"];
        for (var k = 0; k < buttons.length; k++) {
            var textToButton = text || buttonsText[k];
            $(modalFormSelector + " [data-role='" + buttons[k] + "']").text(textToButton);
        }
    };
    var fn = {
        icons: {
            success: {
                title: "glyphicon-ok-sign text-success",
                button: "btn-success"
            },
            danger: {
                title: "glyphicon-remove-sign text-danger",
                button: "btn-danger"
            },
            warning: {
                title: "glyphicon-question-sign text-warning",
                button: "btn-warning"
            },
            info: {
                title: "glyphicon-info-sign text-info",
                button: "btn-info"
            }
        },
        showAlert: function (icon) {
            $("[data-role='alert-buttons']").removeClass("hidden");
            fn.setIcons(icon, "alert-button");
            show();
        },
        showConfirm: function(funct, cancelFunct, icon) {
            $("[data-role='confirm-buttons']").removeClass("hidden");
            $(modalFormSelector + " button[data-role='confirm-button']").click(funct);
            if (cancelFunct) {
                $(modalFormSelector + " button[data-role='cancel-button']").click(cancelFunct);
            }
            fn.setIcons(icon, "confirm-button");
            show();
        },
        showProcessing: function (text) {
            if (text && text.length > 0) {
                $(".back-processing > span").text(text);
            }
            $(".back-processing").addClass("show");
        },
        hideProcessing: function() {
            $(".back-processing").removeClass("show");
            $(".back-processing > span").text("Подождите..");
        },
        setIcons: function(icon, roleButton) {

            $(modalFormSelector + " [data-role='confirm-header'] > span:first")
                .removeAttr("class")
                .addClass("glyphicon")
                .addClass(icon.title);
                
            $(modalFormSelector + " button[data-role='" + roleButton + "']")
                .removeAttr("class")
                .addClass("btn")
                .addClass(icon.button)
                .addClass("btn-block");
        }
    };

    var Init = function (header, text, description, buttonText) {
        setButtonsText(buttonText);
        $(modalFormSelector).on("hidden.bs.modal", function () {
            var buttonsBlocks = ["confirm-buttons", "alert-buttons"];
            for (var i = 0; i < buttonsBlocks.length; i++) {
                $(modalFormSelector + " [data-role='" + buttonsBlocks[i] + "']").addClass("hidden");
            }
            setButtonsText();
            $(modalFormSelector + " [data-role='confirm-header'] > span:first").removeAttr("class");
            var texts = [" [data-role='confirm-header'] > span:last", " [data-role='confirm-text'] > span:last", " p[data-role='description']"];
            for (var j = 0; j < texts.length; j++) {
                $(modalFormSelector + texts[j]).text("");
            }

        });
        if (!header || header.length == 0) {
            $(modalFormSelector + " .modal-header").addClass("hidden");
        } else {
            $(modalFormSelector + " .modal-header").removeClass("hidden");
        }
        $(modalFormSelector + " [data-role='confirm-header'] > span:last").text(header);
        if (text) {
            $(modalFormSelector + " [data-role='confirm-text'] > span:last").text(text);
        }
        if (description) {
            $(modalFormSelector + " p[data-role='description']").text(description);
        }
    };
    Init.prototype = {
        info: {
            alert: function() { fn.showAlert(fn.icons.info) },
            confirm: function (funct, cancFunct) { fn.showConfirm(funct, cancFunct, fn.icons.info); }
        },
        danger: {
            alert: function() { fn.showAlert(fn.icons.danger) },
            confirm: function (funct, cancFunct) { fn.showConfirm(funct, cancFunct, fn.icons.danger); }
        },
        warning: {
            alert: function() { fn.showAlert(fn.icons.warning) },
            confirm: function (funct, cancFunct) { fn.showConfirm(funct, cancFunct, fn.icons.warning); }
        },
        success: {
            alert: function() { fn.showAlert(fn.icons.success) },
            confirm: function(funct, cancFunct) { fn.showConfirm(funct, cancFunct, fn.icons.success); }
        },
        processing: {
            show: function(text) {
                fn.showProcessing(text);
            },
            hide: function() {
                fn.hideProcessing();
            } 
        }

    };
    var modalConfirmForm = function (header, text, description, textButton) {
        return new Init(header, text, description, textButton);
    };

    modalConfirmForm.modalForm = modalForm;
    modalConfirmForm.isShown = false;
    function show() {
        if (modalConfirmForm.isShown) {
            modalConfirmForm.close();
        }

        modalConfirmForm.isShown = true;
        modalForm.modal("show");
    };
    modalConfirmForm.close = function() {
        modalForm.modal("hide");
    };

    window.modalConfirm = modalConfirmForm;

})(window);

function ErrorDisplay(jqxhr, status, errorMsg) {

    var json = jqxhr.responseJSON;
    var message;
    var stack = undefined;
    if (json) {
        message = json.errorMessage;
        stack = json.errorStack;
    } else {
        message = "Статус:" + status + " " + errorMsg;
    }
    if (modalConfirm.isShown) {
        modalConfirm.close();
    }
    setTimeout(function() { modalConfirm("Ошибка!", message, stack).danger.alert(); }, 500);
}