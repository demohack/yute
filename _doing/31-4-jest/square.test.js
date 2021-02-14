const {square} = require('./square');

describe('square function', function () {

	test('square should return X*X', function () {
		const res = square(3);
		expect(res).toEqual(9);
	})
	
	test('square of -9 should return 81', function () {
		const res = square(9);
		expect(res).toEqual(81);
	})
	
})

