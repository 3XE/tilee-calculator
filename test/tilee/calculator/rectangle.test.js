import getRectangle2 from '../../../src/tilee/calculator/rectangle';

var assert = require('assert');


describe('Rectangular coverage calculator- on square tiles, with no spacing', function() {
  
    describe('When the tiles are larger than the size of the wall, we should only need one tile', function() {
      // most basic scenario for a square
      it('should return 1 when the wall height and width is 1 and tile height and width is 2', function(){
        let expected = 1;
        let actual = getRectangle2(1,1,2,2,0);
        assert.equal(expected,actual);
      });
    });
    describe('When the total area of the wall matches exactly the number of tiles required to cover the wall', function() {
      // most basic scenario for a square
      it('should return 1 when wall size is (1,1) by tile size (1,1)', function(){
        let expected = 1;
        let actual = getRectangle2(1,1,1,1,0);
        assert.equal(expected,actual);
      });
  
      // most basic scenario for a square
      it('should return 4 when Wall(W,H):4,4 \t\t Tile(W,H):2,2', function(){
        let expected = 4;
        let actual = getRectangle2(4,4,2,2,0);
        assert.equal(expected,actual);
      });
  
      //for higher target surface area
      it('should return 16 when Wall(W,H):12,12 \t\t Tile(W,H):3,3', function(){
        let expected = 16;
        let actual = getRectangle2(12,12,3,3,0);
        assert.equal(expected,actual);
      });
  
      // testing for tiles with fractional values as size
      it('should return 4 when Wall(W,H):1,1 \t\t Tile(W,H):0.5,0.5', function(){
        let expected = 4;
        let actual = getRectangle2(1,1,0.5,0.5,0);
        assert.equal(expected,actual);
      });
    });
  
      ///////////////////even and odd tiles
      describe('When the column of tiles gets cut off by the size of the wall', function() {
        // testing when the width of the wall is just under a tile to fit
        it('should return 6 when Wall(W,H):2,2.9 \t\t Tile(W,H):1,1', function(){
          let expected = 6;
          let actual = getRectangle2(2,2.9,1,1,0);
          assert.equal(expected,actual);
        });
      });
    
  
  
    ///////////////////even and odd tiles
    describe('When the column of tiles gets cut off by the size of the wall', function() {
      // testing when the width of the wall is slightly bigger
      it('should return 5 when Wall(W,H):2,2.45 \t\t Tile(W,H):1,1', function(){
        let expected = 5;
        let actual = getRectangle2(2,2.45,1,1,0);
        assert.equal(expected,actual);
      });
  
  
      // testing when the width of the wall is just under a tile to fit
      it('should return 6 when Wall(W,H):2,2.9 \t\t Tile(W,H):1,1', function(){
        let expected = 6;
        let actual = getRectangle2(2,2.9,1,1,0);
        assert.equal(expected,actual);
      });
    });
      
    describe('When the row of tiles gets cut off by the size of the wall', function() {
      // testing when the height of the wall is bigger
      it('should return 5 when Wall(W,H):2.5,2,1 \t\t Tile(W,H):1,1', function(){
        let expected = 5;
        let actual = getRectangle2(2.5,2,1,1,0);
        assert.equal(expected,actual);
      });
  
      it('should return 6 when Wall(W,H):2.6,2 \t\t Tile(W,H):3,3', function(){
        let expected = 6;
        let actual = getRectangle2(2.6,2,1,1,0);
        assert.equal(expected,actual);
      });
    });
  
  
    describe('When both the row and column of tiles gets cut off by the size of the wall,\n    for even number of tiles fitting both ways', function() {
      // testing when the height of the wall is bigger
      it('should return 12 Wall(W,H):4.1,2.1 \t\t Tile(W,H):1,1', function(){
        let expected = 12;
        let actual = getRectangle2(4.1,2.1,1,1,0);
        assert.equal(expected,actual);
      });
  
      it('should return 14 Wall(W,H):4.1,2.7 \t\t Tile(W,H):1,1', function(){
        let expected = 14;
        let actual = getRectangle2(4.1,2.7,1,1,0);
        assert.equal(expected,actual);
      });
  
      it('should return 13 Wall(W,H):4.8,2.35 \t\t Tile(W,H):1,1', function(){
        let expected = 13;
        let actual = getRectangle2(4.8,2.35,1,1,0);
        assert.equal(expected,actual);
      });
  
      it('should return 15 Wall(W,H):4.8,2.7 \t\t Tile(W,H):1,1', function(){
        let expected = 15;
        let actual = getRectangle2(4.8,2.7,1,1,0);
        assert.equal(expected,actual);
      });
    });
  
    describe('When both the row and column of tiles gets cut off by the size of the wall,\n    for odd number of tiles fitting both ways', function() {
      // testing when the height of the wall is bigger
      it('should return 7 when Wall(W,H):3.1,1.1 \t\t Tile(W,H):1,1', function(){
        let expected = 7;
        let actual = getRectangle2(3.1,1.1,1,1,0);
        assert.equal(expected,actual);
      });
  
      it('should return 8 when Wall(W,H):3.1,3.7 \t\t Tile(W,H):1,1', function(){
        let expected = 15;
        let actual = getRectangle2(3.1,3.7,1,1,0);
        assert.equal(expected,actual);
      });
  
      it('should return 7 when Wall(W,H):3.8,1.35 \t Tile(W,H):1,1', function(){
        let expected = 7;
        let actual = getRectangle2(3.8,1.35,1,1,0);
        assert.equal(expected,actual);
      });
  
      it('should return 8 when Wall(W,H):3.8,1.7 \t\t Tile(W,H):1,1', function(){
        let expected = 8;
        let actual = getRectangle2(3.8,1.7,1,1,0);
        assert.equal(expected,actual);
      });
  
    });
  
    describe('When both the row and column of tiles gets cut off by the size of the wall,\n    for odd and even number of tiles fitting both ways', function() {
      // testing when the height of the wall is bigger
      it('should return 10 when Wall(W,H):3.1,2.1 \t Tile(W,H):1,1', function(){
        let expected = 10;
        let actual = getRectangle2(3.1,2.1,1,1,0);
        assert.equal(expected,actual);
      });
  
      it('should return 10 when Wall(W,H):4.1,1.7 \t Tile(W,H):1,1', function(){
        let expected = 10;
        let actual = getRectangle2(4.1,1.7,1,1,0);
        assert.equal(expected,actual);
      });
  
      it('should return 11 when Wall(W,H):3.8,2.3 \t Tile(W,H):1,1', function(){
        let expected = 11;
        let actual = getRectangle2(3.8,2.35,1,1,0);
        assert.equal(expected,actual);
      });
  
      it('should return 12 when Wall(W,H):3.8,2.7 \t Tile(W,H):1,1', function(){
        let expected = 12;
        let actual = getRectangle2(3.8,2.7,1,1,0);
        assert.equal(expected,actual);
      });
  
    });
  
  });
  
  describe('Rectangular coverage calculator- on rectangular tiles, with no spacing', function() {
    
    describe('When the tiles are larger than the size of the wall, we should only need one tile', function() {
  
      it('should return 1 when Wall(W,H):1,1 \t Tile(W,H):2,1', function(){
        let expected = 1;
        let actual = getRectangle2(1,1,2,1);
        assert.equal(expected,actual);
      });
    });
    
    describe('When the total area of the wall matches exactly the number of tiles required to cover the wall', function() {
  
      it('should return 1 when Wall(W,H):2,1 \t Tile(W,H):2,1', function(){
        let expected = 1;
        let actual = getRectangle2(2,1,2,1);
        assert.equal(expected,actual);
      });
  
      it('should return 9 when Wall(W,H):6,3 \t Tile(W,H):2,1', function(){
        let expected = 9;
        let actual = getRectangle2(6,3,2,1);
        assert.equal(expected,actual);
      });
  
      it('should return 12 when Wall(W,H):2,16 \t Tile(W,H):2,4', function(){
        let expected = 4;
        let actual = getRectangle2(2,16,2,4);
        assert.equal(expected,actual);
      });
  
    });
  
    describe('When both the row and column of tiles gets cut off by the size of the wall', function() {
  
      it('should return 7 when Wall(W,H):10,2 \t Tile(W,H):3,1', function(){
        let expected = 7;
        let actual = getRectangle2(10,2,3,1);
        assert.equal(expected,actual);
      });
  
      it('should return 7 when Wall(W,H):5,7 \t Tile(W,H):2,3', function(){
        let expected = 7;
        let actual = getRectangle2(5,7,2,3);
        assert.equal(expected,actual);
      });
  
      it('should return 17 when Wall(W,H):21,4.5 \t Tile(W,H):2,4', function(){
        let expected = 17;
        let actual = getRectangle2(21,4.5,2,4);
        assert.equal(expected,actual);
      });
  
    });
  
});
  
describe('Rectangular coverage calculator- any rectangular shape with spacing', function() {
    // we assume that the tiles have the same spacing in between them
    // building up the target surface, first comes a tile, then the spacing
    // then another tile then another spacing and so on
    // there is three ways in which the rows/ columns of tiles can end
    // 1. in an uniterrupted spacing, with length equal to the other spacings
    // 2. in an interrupted spacing, with length less than the other spacings
    // 3. in a tile that could be a whole or cut tile
    // the tests cover all the combinantions of these 3 scenarios
  
    describe('We assume that tile comes first, then spacing, then the pattern repeats itself \n    Where the pattern finishes with uninterrupted spacing at the end of the wall', function() {
      // the spacing is present at the end of the last row of tiles
      // there is no spacing at the end of the last column of tiles
      it('should return 3 when Wall(W,H):3,1 \t\t Tile(W,H):0.8,1 and spacing:0.2', function(){
        let expected = 3;
        let actual = getRectangle2(3,1,0.8,1,0.2);
        assert.equal(expected,actual);
      });
  
      // the spacing is present in both directions
      it('should return 8 when Wall(W,H):4,2 \t\t Tile(W,H):0.9,0.9 and spacing:0.1', function(){
          let expected = 8;
          let actual = getRectangle2(4,2,0.9,0.9,0.1);
          assert.equal(expected,actual);
        });
    });
  
    describe('Where the pattern finishes with an interrupted spacing at the end of the wall', function() {
      // the uniterrupted spacing is present at the end of the last row of tiles
      // there iterrupted spacing is present at the end of the last column of tiles
      it('should return 9 when Wall(W,H):2.4,2.3 \t\t Tile(W,H):0.6,0.6 and spacing:0.2', function(){
          let expected = 9;
          let actual = getRectangle2(24,23,6,6,2);
          assert.equal(expected,actual);
        });
      
      // the iterrupted spacing is present at the end of the last row of tiles
      // there is no spacing at the end of the last column of tiles
      it('should return 3 when Wall(W,H):2,1 \t\t Tile(W,H):0.5,1 and spacing:0.2', function(){
        let expected = 3;
        let actual = getRectangle2(2,1,0.5,1,0.2);
        assert.equal(expected,actual);
      });
  
      // there is an interrupted spacing in both directions
      it('should return 4 when Wall(W,H):13,9 \t\t Tile(W,H):5,3 and spacing:2', function(){
          let expected = 4;
          let actual = getRectangle2(13,9,5,3,2);
          assert.equal(expected,actual);
        });
    });
  
    describe('Where the pattern finishes with a tile and no spacing at the end of the wall', function() {
      // the end of the last row of tiles has a cut tile 
      // there is no spacing at the end of the last column of tiles
      it('should return 3 when Wall(W,H):2.2,1 \t\t Tile(W,H):0.6,1 and spacing:0.2', function(){
        let expected = 3;
        let actual = getRectangle2(2.2,1,0.6,1,0.2);
        assert.equal(expected,actual);
      });
  
      // there is no spacing in both directions
      // the tiles in both direction are whole tiles 
      it('should return 6 when Wall(W,H):13,11 \t\t Tile(W,H):6,3 and spacing:1', function(){
          let expected = 6;
          let actual = getRectangle2(13,11,6,3,1);
          assert.equal(expected,actual);
      });
  
      // there is no spacing in both directions as the end contains cut tiles
      // the function should still pair up the corresponding cut tiles 
      it('should return 12 when Wall(W,H):3,1 \t\t Tile(W,H):0.7,0.5 and spacing:0.1', function(){
          let expected = 10;
          let actual = getRectangle2(5.1,3.5,2,1,0.1);
          assert.equal(expected,actual);
      });
  
    });
  
  });