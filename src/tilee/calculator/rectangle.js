class Dimension {
    constructor(name, tileSpan, targetSurfaceSpan, spacing) {
        this.name = name;
        this.tileSpan = tileSpan;
        this.targetSurfaceSpan = targetSurfaceSpan;
        this.spacing = spacing;
    }
  
    /**
     * get count of spacings
     * 
     * @description spacing is considered indivisble by target
     * surface bounds. E.g. 
     * 
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * ██████ss██████ss██████ss██████ss   returns 4
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * 
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * ██████ss██████ss██████ss██████ss   returns 3
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * 
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * ██████ss██████ss██████ss██████ss   returns 3
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * 
     * ░ = span
     * █ = tile
     * ss = spacing
     * 
     * (diagram should be viewed with fixed-width font)
     */
    get uncutSpacingCount() {
        let spacedTileWidth, fittingTiles;
         
        if (this.spacing === 0) {
            return 0;
        } else {
            spacedTileWidth = this.tileSpan + this.spacing;
            fittingTiles = this.targetSurfaceSpan / spacedTileWidth;
            return Math.trunc(fittingTiles);
        }
    }

    get spacedTileSpan() {
        return this.tileSpan + this.spacing;
    }

    /**
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * ██████ss██████ss██████ss██████ss
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * ▒────────────────────────────▒ 
     * 
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * ██████ss██████ss██████ss██████ss
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * ▒────────────────────────────▒ 
     
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * ██████ss██████ss██████ss██████ss
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * ▒────────────────────────────▒ 
     * 
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * ██████ss██████ss██████ss██████ss 
     * ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
     * ▒────────────────────────────▒ 
     * 
     *    * 
     * ░ = span
     * █ = tile
     * ss = spacing
     * ▒─▒ = returned length
     * no tiles cut by target surface bounds
     * no 
     */
    get totalUncutSpacedTileSpan() {
        return (this.uncutSpacingCount * this.spacedTileSpan) + this.tileSpan;
    }

    /**
     * The span within the target surface which may be covered by tiles after 
     * adjusting for spacing
     */
    get tileableSpan() {      
        let spacedTileWidth, spaceCovered, wallWithNoSpacing, _tileableSpan;

        // if there is no spacing, the whole of the target surface is tileable
        if (this.spacing == 0) {
            return this.targetSurfaceSpan;
        }
        
        if (!this.hasFragmentedSpacing) {
            //spacing is not cut by target span
            wallWithNoSpacing = this.targetSurfaceSpan - (this.uncutSpacingCount * this.spacing);
            _tileableSpan = wallWithNoSpacing;
        } else {
            // we aslo subtract the cut off spacing
            wallWithNoSpacing = this.targetSurfaceSpan - (this.uncutSpacingCount * this.spacing);
            spaceCovered = (this.uncutSpacingCount * this.spacedTileSpan) + this.tileSpan;
            _tileableSpan = wallWithNoSpacing - (this.targetSurfaceSpan - spaceCovered);
        }
        
        return Math.round(_tileableSpan * 100) / 100;
        
/*
        wallWithNoSpacing = this.targetSurfaceSpan - (this.uncutSpacingCount * this.spacing);
        
        
        if(!this.hasFragmentedSpacing){
            _tileableSpan = wallWithNoSpacing;
        } else{
            // we aslo subtract the cut off spacing
            spaceCovered = (this.uncutSpacingCount * this.spacedTileSpan) + this.tileSpan;
            _tileableSpan = wallWithNoSpacing - (this.targetSurfaceSpan - spaceCovered);
        }
        */
        // rounding the new wall size with no spacings to two 
        // decimal places
        return Math.round(_tileableSpan * 100) / 100;
    }

    /**
    * given the tile span and tile spacing the function returns the tiles span plus the spacing
    *
	* @return {number}
	*
	*/
    get hasFragmentedSpacing()
    {
        return this.totalUncutSpacedTileSpan < this.targetSurfaceSpan;
    }

    /**
     * represents the number of uncut tiles that fit in this direction
     * 
     * @description by dividing the target surface span by the tile span
     *              the returned number shows how many tiles fit.
     * @return {number}
     */
    get uncutTileCount() {
        // Math.trunc gives us the integer part of the number
        return this.tileableSpan / this.tileSpan;
    }
  
    /**
     * finds the percentage size (represented as a fractional value) 
     * of the fragment needed to cover the whole extent of the 
     * target surface  
     * 
     * @return {number}
     */
    get fragmentSpan() {
        // e.g. 10 / 4 = 2.5
        let dividend = this.tileableSpan / this.tileSpan;
//        let dividend = this.targetSurfaceSpan / this.tileSpan;
  
        // 2.5 - trunc(2.5) = 2.5 - 2 = 0.5
        return dividend - Math.trunc(dividend);
    }    
  
    /**
     * the function checks if the fragment is smaller than or equal 
     * to half of the initial tile size 
     * 
     * @return {boolean}
     */
    get hasReusableOffcut() {
        // a tile is reusable if the fragment span is <= 50% of the span
        // of the tile
        return (this.fragmentSpan <= 0.5) && (this.fragmentSpan !== 0);
    }
  }
  

  
function getRectangle2(wH,wW,h,w,s) {
    s = s || 0;
    let numberOfTiles; 
    let row = new Dimension("row", h, wH, s);
    let col = new Dimension("col", w, wW, s);
    let dimensions = [row, col];
    

    // if the tiles will fit exactly within the target surface without cutting
    // OR...if the fit is not exact and the target surface would mean the tile
    // would have to be cut in such a way that the offcut cannot be used
    // elsewhere
    // OR... if on only one dimension of the target surface tiles fit exactly
    // and the other has an offcut that cannot be reused because it is greater
    // than 50% of the span
    numberOfTiles = Math.ceil(row.uncutTileCount) * Math.ceil(col.uncutTileCount);
    //function to reduce numberOfTiles if dimension has reusable offcuts
    let makeRequiredAdjustments = function (dimension) {
        if (dimension.hasReusableOffcut) {
        let otherDimension = dimension.name === "row" ? col : row;
        let noOfTilesToFillEndGaps = 0;
        // for every two end gaps to be filled a single tile can be used 
        // to fill both
        let pairedTiles = Math.trunc(otherDimension.uncutTileCount) / 2;
        noOfTilesToFillEndGaps = Math.floor(pairedTiles);
        numberOfTiles -= noOfTilesToFillEndGaps;
    }
};

// loop over each dimension to see it has reusable offcuts (end gap is 
// <= 50% of the tile span)
dimensions.forEach(makeRequiredAdjustments);
    
    return numberOfTiles;
  };

  export default getRectangle2;