
var addRippleEffect = function (event) {
    var _target = event.target;
    if(!_target.classList.contains('rt-action-ripple')){
        return false;
    }
    var _rect = _target.getBoundingClientRect(),
        _ripple = _target.querySelector('.rt-ripple');

    if (!_ripple) {
        _ripple = document.createElement('span');
        _ripple.className = 'rt-ripple';
        _ripple.style.height = _ripple.style.width = Math.max(_rect.width, _rect.height) + 'px';
        _target.appendChild(_ripple);
    }
    _ripple.classList.remove('show');


    var _top = event.pageY - _rect.top - _ripple.offsetHeight / 2 - document.body.scrollTop;
    var _left = event.pageX - _rect.left - _ripple.offsetWidth / 2 - document.body.scrollLeft;
    _ripple.style.top = _top + 'px';
    _ripple.style.left = _left + 'px';
    _ripple.classList.add('show');
    return false;
}

document.addEventListener('click', addRippleEffect, false);

module.exports = {

}
