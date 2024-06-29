# `waterjug_challenge`

### This is a version of the water jug challenge built on Aurelia.js

It consists of a single html view with a form and 3 inputs (`x, y, z` respectively) on the top. When the form is submitted the bottom part fills with the corresponding steps required to measure `z`.

Regarding the algorithm used to solve the problem I must say I couldn't make one algorithm for all cases. I'd like to point out that I did a little research because I needed better constraints for the algorithm. I found out two additional constraints:

`z < x + y`
`z % GCD(x, y) = 0`

Which perfectly fit with the constraints defined in the document: {x, y, z} must be natural numbers

Concerning the solution to the problem itself, I made a heuristic solution. Actually 2 solutions, if `z` is less than half of the capacity of the two jugs combined, then we use the 'smaller jug solution' which is basically a procedural addition to the bigger jug. On the contrary, the 'bigger jug solution' is a procedural substraction to the bigger jug.

### Run
To run the program run `au run --open` on the root directory

### Test
To test program run `au test`
