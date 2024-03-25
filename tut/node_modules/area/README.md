
Area
====
Area is an extremely simple synchronization mechanism for asynchronous jobs.
This is basically a slightly improved version of job counter, and is usually for
synchronizing arbitrary number of jobs.

How to Use
----------
First, of course, we have to create an area.

	var Area = require('area')
	  , area = new Area()

Then, let functions join `area`.

	do_something(arg, function(err, ret) {
	  ...
	  do_more(function() { ... }.join(area))
	  ...
	}.join(area))

Note that `join` must be called only when a function is passed as a callback.

	// This code is WRONG
	var callback = function () { ...  }.join(area) // <--- DONT DO THIS
	do_something(callback)

Last, set the callback to be called after the completion of all the function in `area`.

	area.join(function() {
	  console.log('Done!')
	})

Caveat
------
`Function#join` should *NOT* be used on asynchronous callbacks which are called
multiple times. In this case, you must use `Area#increase` and `Area#decrease`
to manually adjust counter. However, if you can set on-complete callback, use
`join` on it.

	// Correct
	arr.asyncMap(do_something, on_complete.join(area))
	// WRONG
	arr.asyncMap(do_something.join(area))

How It Works
------------
Area is really just a job counter. I merely rephrased crude integer expressions
to something "looks" better.

Here's what happens under the hood:  
`Function#join` increments counter, and wraps the function with some extra code.
When your function returns, the extra code decrements counter. Once the counter
reaches zero, the callback for the corresponding Area is called.

If you're still confused, please read the following code snippets, which are
(almost) the same:

	// Area
	do_something(function() {
	  ...
	}.join(area))

	// integer counter
	cnt ++
	do_something(function() {
	  ...
	  cnt --
	})

License
-------
Public domain. See LICENSE or [http://unlicense.org/] for more details.

