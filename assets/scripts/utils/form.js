// chain classlist
function classList(elt) {
    var list = elt.classList;

    return {
        toggle: function (c) {
            list.toggle(c);
            return this;
        },
        add: function (c) {
            list.add(c);
            return this;
        },
        remove: function (c) {
            list.remove(c);
            return this;
        }
    };

}

export default function () {

    const inputs = Array.from(document.querySelectorAll('.form-control.form-control--floating-label input[type="text"], .form-control.form-control--floating-label input[type="email"], .form-control.form-control--floating-label textarea'));

    console.log(inputs);

    inputs.forEach((el, index) => {

        el.addEventListener('keyup', (e) => {

            const el = e.currentTarget;
            const elGroup = el.closest('.form-control');

            if (el.value != "") {
                classList(elGroup).add("has-value");
            } else {
                classList(elGroup).remove("has-value");
            }

        });

    });

}
