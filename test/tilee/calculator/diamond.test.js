import getDiamondShape2 from '../../../src/tilee/calculator/diamond';

var assert = require('assert');


describe('diamond coverage calculator \n    the width of the TILE is √2 for simplicity in all tests', function() {
    /**
     * see https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Square_root_of_2_triangle.svg/200px-Square_root_of_2_triangle.svg.png 
     * to understand why √2 was chosen as a simplification for testing
     */
    
    describe('When the total area of the wall matches exactly the number of tiles required to cover the wall', function() {
      // most basic scenario
      it('should return 1 when the wall height is 2 and width is 1', function(){
        let expected = 1;
        let actual = getDiamondShape2(2,1,Math.sqrt(2),0);
        assert.equal(expected,actual);
      });
      
      // checking for the case of a square wall, with even wall dimensions
      it('should return 18 when the wall height and width are 6', function(){
        let expected = 18;
        let actual = getDiamondShape2(6,6,Math.sqrt(2),0);
        assert.equal(expected,actual);
      });
  
      // checking for the case of a square wall, with odd wall dimensions
      it('should return 5 when the wall height and width are 3', function(){
        let expected = 5;
        let actual = getDiamondShape2(3,3,Math.sqrt(2),0);
        assert.equal(expected,actual);
      });
    });
  
    describe('When the shape of the wall is rectangular', function() {
      // checking size of the wall with one odd and one even dimension
      it('should return 3 when the wall height is 3 and wall width is 2', function(){
        let expected = 3;
        let actual = getDiamondShape2(3,2,Math.sqrt(2),0);
        assert.equal(expected,actual);
      });
  
      it('should return 3 when the wall height is 2 and wall width is 3', function(){
        let expected = 3;
        let actual = getDiamondShape2(2,3,Math.sqrt(2),0);
        assert.equal(expected,actual);
      });
    });
  
    // checking the case where the size of the wall cuts off a tile
    // checking if there are enough tiles to cover this eventuality
    describe('When the tiles get cut off by the size of the wall', function() {
      // testing when the height has a decimal point
      it('should return 10 when the wall height is 4.2 and wall width is 4', function(){
        let expected = 10;
        let actual = getDiamondShape2(4.2,4,Math.sqrt(2),0);
        assert.equal(expected,actual);
      });
      
      // testing when the width has a decimal point
      it('should return 10 when the wall height is 4 and wall width is 4.7', function(){
        let expected = 10;
        let actual = getDiamondShape2(4,4.7,Math.sqrt(2),0);
        assert.equal(expected,actual);
      });
      
      // testing when the width and height have a decimal point
      it('should return 10 when the wall height is 3.65 and wall width is 4.71', function(){
        let expected = 10;
        let actual = getDiamondShape2(3.65,4.71,Math.sqrt(2),0);
        assert.equal(expected,actual);
      });
  
      // testing when one of the dimensions have a decimal point, less than 1
      it('should return 2 when the wall height is 0.6 and the wall width is 4', function(){
        let expected = 2;
        let actual = getDiamondShape2(0.6,4,Math.sqrt(2),0);
        assert.equal(expected,actual);
      });
    });
  
    describe('If the wall dimension are both <=1, only one tile is required to cover the extent of the wall ', function() {  
      it('should return 1 when wall height is 0.2 and wall width is 0.5 ', function(){
        let expected = 1;
        let actual = getDiamondShape2(0.2,0.5,Math.sqrt(2),0);
        assert.equal(expected,actual);
      });
  
      it('should return 1 when wall height is 1 and wall width is 1 ', function(){
        let expected = 1;
        let actual = getDiamondShape2(1,1,Math.sqrt(2),0);
        assert.equal(expected,actual);
      });
    });
  });

// if we included spacing inbetween the tiles
describe('diamond coverage calculator with spacing included \n    the spacing in between the TILES is 0.1 for simplicity in all tests', function() {
  
  // checking the simplest wall size
  it('should return 1 when wall height and wall width are 1 ', function(){
    let expected = 1;
    let actual = getDiamondShape2(1,1,Math.sqrt(2)-0.05,0.1);
    assert.equal(expected,actual);
  });


  // checking for the case of a square wall, with even wall dimensions
  it('should return 18 when the wall height and width are 6', function(){
    let expected = 18;
    let actual = getDiamondShape2(6,6,Math.sqrt(2)-0.05,0.1);
    assert.equal(expected,actual);
  });

  // checking for the case of a square wall, with odd wall dimensions
  it('should return 5 when the wall height and width are 3', function(){
    let expected = 5;
    let actual = getDiamondShape2(3,3,Math.sqrt(2)-0.05,0.1);
    assert.equal(expected,actual);
  });

  it('should return 1 when wall height is 0.2 and wall width is 0.5 ', function(){
    let expected = 1;
    let actual = getDiamondShape2(0.2,0.5,Math.sqrt(2)-0.05,0.1);
    assert.equal(expected,actual);
  });


  it('should return 10 when the wall height is 4 and wall width is 4.7', function(){
    let expected = 10;
    let actual = getDiamondShape2(4,4.7,Math.sqrt(2)-0.05,0.1);
    assert.equal(expected,actual);
  });
  
  // testing when the width and height have a decimal point
  it('should return 10 when the wall height is 3.65 and wall width is 4.71', function(){
    let expected = 10;
    let actual = getDiamondShape2(3.65,4.71,Math.sqrt(2)-0.05,0.1);
    assert.equal(expected,actual);
  });
});