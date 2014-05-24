
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






	// selectors.

	const take = (num, coll) => {
		// number -> [any] -> [any]

		if (num <= 0 || coll.length === 0) {
			return []
		} else {
			return coll.slice(0, Math.min(num, coll.length))
		}
	}

	const drop = (num, coll) => {
		// number -> [any] -> [any]

		if (coll.length === 0) {
			return []
		} else {
			return coll.slice(num, coll.length)
		}
	}

	const lastOf = coll => {
		// [any] -> any

		return coll[coll.length - 1]
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

	var happy = {
		normal:
			'Σ ◕ ◡ ◕',
		talking:
			'Σ ◕ ヮ ◕'
	}






	// the actual animation.

	// scroll our happy face from the left to the right.
	var frames  = take(10, scrollLeft(happy.normal))

	// now make him speak.
	frames = frames
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
