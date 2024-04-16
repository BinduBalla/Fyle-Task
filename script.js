$(document).ready(function () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    /* DISABLING SUBMIT BUTTON UNTIL INPUT IS TYPED */
    $(".submit-btn").prop("disabled", true);

    /* INPUT VALIDATION */
    $("input").keyup(function () {
        if ($(this).val() != "") {
            let isNumber = $.isNumeric($(this).val());
            if (!isNumber) {
                $(this).next().css("display", "inline");
            }
            else {
                $(this).next().css("display", "none");
                $("input").each(function () {
                    var $emptyFields = $('input').filter(function () {
                        return $.trim(this.value) === "";
                    });
                    
                    if (!$emptyFields.length) {
                        $(".submit-btn").prop("disabled", false);
                    }
                });
            }
        }
        else {
            $(this).next().css("display", "none");
        }
    });


    $(".submit-btn").click(function () {
        if (($("select option:selected").val()).length === 0) {
            $("select").next().css("display", "inline");
            $('select').on('change', function () {
                $("select").next().css("display", "none");
            });
        }
        else {
            let annualIncome = parseInt($("#grossIncome").val());
            let extraIncome = parseInt($("#extraIncome").val());
            let age = $("#age option:selected").val();
            let deductions = parseInt($("#deductions").val());

            let totalIncome = ((annualIncome + extraIncome) - deductions);
            let exemptedIncome = totalIncome - 800000;

            if (totalIncome < 800000) {
                $(".tax").html(annualIncome + extraIncome);
            }
            else {
                if (age == 1) {
                    $(".tax").html(totalIncome - (0.3 * exemptedIncome));
                }
                else if (age == 2) {
                    $(".tax").html(totalIncome - (0.4 * exemptedIncome));
                }
                else {
                    $(".tax").html(totalIncome - (0.1 * exemptedIncome));
                }
            }

            $("#exampleModal").modal("show");
            $("input").val("");
            $("select").prop("selectedIndex", 0);

        }
    })

})