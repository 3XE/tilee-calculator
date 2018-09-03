/**
 * Calculate number of tiles required to fill a surface with a square diamond
 * pattern
 * 
 * @description on a square wall the diamond pattern could be repeated like]
 * this ⛋ but in order to check how many diamonds can fit in any other wall
 * shape we take a smaller measure and check how many shapes like this ⍃ (half 
 * of the original pattern) can fit in the given wall. 
 * this is our unit of measure as it would require one square physical tile to
 * form this pattern (imagining that we cut a square tile and fit it
 * accordingly).
 * 
 * we can see that the height of ⍃ is twice as big as the width. If the width
 * was measured in terms of x, then the height would be 2 * x.
 * This is because the triangles inscribed in the shape are isosceles right-
 * angled triangles, e.g. ◸. Looking back at ⛋, the leftmost triangle ◸
 * has two sides of equal length and the hypotenuse is the length of the
 * diamond shape.
 * 
 * @author https://github.com/09sugara
 * 
 * @param {*} wallH  wall height
 * @param {*} wallW  wall width
 * @param {*} length the tiles have a square diamond shape therefore we only
 *                   need the length of the tile (see function description)
 * @param {*} spacing
 */
function getDiamondShape2 (wallH,wallW, tileLength, spacing) {
    let pi, x, halfDiamond, rows, cols, totalCrosses;
    
    pi = Math.PI; 

    // if the diamond shaped tiles contain spacing in between each other adjust
    // the size of the tile to include the spacing.
    if (spacing > 0) {
      tileLength += (spacing / 2); // half as spacing is 'shared' between edges
    }
    
    /*
    where the pattern is ⛋ and 
    x is the length of this side --> ◸...
    In ◸ we know that the hypotenuse is tileLength, that there is one right
    angle and two congruent 45 degree angles; thus use trigonometry to calculate
    the length "x"
    */
    x = tileLength * Math.cos(pi / 4);

    /*
    rounding the answer to 2 decimal places is done at this stage 
    because the precision at which tilers can measure tiles in real life 
    cannot be done for more than two decimal places.  E.g. if we keep the
    side length as 1.999999 instead of 2.00, in large tile calculations it
    will affect of the number of tiles needed
    */
    halfDiamond = Math.round(x * 100) / 100;

    /*
    we check how many halfDiamond values fit into the wall height and width
    we take the rounded up value to account for tiles that get cut off by the 
    side of the wall
    */
    rows = Math.ceil(wallH / halfDiamond);
    cols  = Math.ceil(wallW / halfDiamond);
    
    totalCrosses = rows * cols;
    
    // we need to account for any wall sizes smaller than our unit pattern
	  // in that case only one tile is required to cover the eventuality
    if(rows<=1 && cols<=1){
        return 1;
    }

    // if we get an odd number for the totalCrosses we need to round the 
    // number up after dividing it by 2 using ceil. Because the number isn't 
    // divisible by 2, and we would need enough tiles to cover the wall area
    return Math.ceil(totalCrosses / 2);
}

export default getDiamondShape2;