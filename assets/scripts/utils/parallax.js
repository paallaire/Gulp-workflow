import Rellax from 'rellax';

export default function parallax() {
    if (document.querySelectorAll('.rellax').length > 0) {
        var rellax = new Rellax('.rellax', {
            speed: -4
        });
    }
}