$(function () {
	var setElm = $('.tissot'),
		delaySpeed = 100,
		fadeSpeed = 300;
	setText = setElm.html();
	setElm.css({
		visibility: 'visible'
	}).children().addBack().contents().each(function () {
		var elmThis = $(this);
		if (this.nodeType == 3) {
			var $this = $(this);
			$this.replaceWith($this.text().replace(/(\S)/g, '<span class="tissot">$&</span>'));
		}
	});
	$(window).load(function () {
		splitLength = $('.tissot').length;
		setElm.find('.tissot').each(function (i) {
			splitThis = $(this);
			splitTxt = splitThis.text();
			splitThis.delay(i * (delaySpeed)).css({
				display: 'inline-block',
				opacity: '0'
			}).animate({
				opacity: '1'
			}, fadeSpeed);
		});
	});
});