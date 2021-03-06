
"use strict"

var YAP = ( function () {

	var self = {}






	const scrollLeft = string => {
		// string -> [string]

		const lastChar = /.{1}$/g

		var frames = []
		var charIth = string.length

		// create an empty frame of fixed length.
		frames[0] = Array(charIth).join(' ')

		for (var ith = 1; ith < string.length; ith++) {

			// select each character in turn, from right to left.
			var newChar = string.charAt(charIth)
			charIth--

			// remove the last character, and prepend.
			frames[ith] = newChar + frames[ith - 1].replace(lastChar, '')
		}

		return frames
	}






	// -- repeat a value several times.

	const repeat = (num, val) => {
		// number -> any -> [any]

		var out = []

		for (var ith = 0; ith < num; ith++) {
			out[ith] = val
		}

		return out
	}







	// our protagonist. Don't bother encoding.

	const happy = {
		normal:
			'Σ ◕ ◡ ◕',
		talking:
			'Σ ◕ ヮ ◕'
	}






	// the actual animation.

	const frames =
		scrollLeft(happy.normal)
		.concat(repeat(4, happy.talking + ' -- Hi!'))
		.concat(repeat(8, happy.talking + ' -- very internet.'))
		.concat(repeat(8, happy.talking + ' -- much URL.'))
		.concat(happy.normal)






	self.run = ( function () {

		// this is closed over and side-effectfully updated.
		var frameIth = 0

		return function () {
			var pid = setInterval(function () {

				var frame = frames[frameIth]
				frameIth += 1

				if (frameIth > frames.length) {
					frameIth = 0
					clearInterval(pid)
				} else {
					history.pushState(null, '', '/' + frame);
				}

			}, 250)

		}
	})()

	return self

} )();
