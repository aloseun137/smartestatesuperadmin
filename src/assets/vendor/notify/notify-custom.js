// Notify examples

function notify2(type, status, title, msg) {

var notes = $('#notes').notify({
	removeIcon: '<i class="icon-close"></i>'
});

if (type == 'fader' && status == '') {
  notes.show("I'm a notification I will quickly alert you as well!", {
		title: title,
	});
}

if (type == 'fader' && status == 'success') {
  notes.show(msg, {
		type: 'success',
		title: title,
		icon: '<i class="icon-sentiment_satisfied"></i>'
	});
}

if (type == 'fader' && status == 'info') {
  notes.show(msg, {
		type: 'info',
		title: title,
		icon: '<i class="icon-alert-circle"></i>'
	});
}

if (type == 'fader' && status == 'warning') {
  notes.show(msg, {
		type: 'warning',
		title: title,
		icon: '<i class="icon-alert-octagon"></i>'
	});
}

if (type == 'fader' && status == 'error') {
  notes.show(msg, {
		type: 'danger',
		title: title,
		icon: '<i class="icon-alert-triangle"></i>'
	});
}

if (type == 'fader' && status == 'hello') {
  notes.show("I'm a notification I will quickly alert you as well!", {
		title: title,
		icon: '<i class="icon-info-outline"></i>',
		sticky: true
	});
}

/*************************
	*************************
	*************************
	*************************
	Fixed on Top
	*************************
	*************************
	*************************
	*************************/

var messages = $('#messages').notify({
	type: 'messages',
	removeIcon: '<i class="icon-close"></i>'
});

$('.add-message').on('click', function() {
	messages.show("I'm a message and I will quickly alert you", {
		title: 'Hello,',
	});
});

$('.add-success-message').on('click', function() {
	messages.show("I'm a message and I will quickly alert you", {
		type: 'success',
		title: 'Hello,',
		icon: '<i class="icon-sentiment_satisfied"></i>'
	});
});

$('.add-info-message').on('click', function() {
	messages.show("I'm a message and I will quickly alert you", {
		type: 'info',
		title: 'Hello,',
		icon: '<i class="icon-alert-circle"></i>'
	});
});

$('.add-warning-message').on('click', function() {
	messages.show("I'm a message and I will quickly alert you", {
		type: 'warning',
		title: 'Hello,',
		icon: '<i class="icon-alert-octagon"></i>'
	});
});

$('.add-danger-message').on('click', function() {
	messages.show("I'm a message and I will quickly alert you", {
		type: 'danger',
		title: 'Hello,',
		icon: '<i class="icon-alert-triangle"></i>'
	});
});

$('.add-sticky-message').on('click', function() {
	messages.show("I'm a message and I will quickly alert you", {
		title: 'Hello,',
		sticky: true
	});
});
}
