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

    const inputs = Array.from(document.querySelectorAll('.c-form input[type="text"], .c-form input[type="email"], .c-form textarea'));

    inputs.map((el, index) => {

        el.addEventListener('keyup', (e) => {

            const el = e.currentTarget;
            const elGroup = el.closest('.group-input');

            if (el.value != "") {
                classList(elGroup).remove("is-empty").add("is-filled");
            } else {
                classList(elGroup).remove("is-filled").add("is-empty");
            }

        });

    });

}
