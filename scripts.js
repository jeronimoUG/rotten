//
// GLOBALS
var canvas, context, $;
//
// EXECUTE AFTER LOAD
window.onload = function(e) {
	//
	// MAIN CODE AFTER LOADING
	//
	$ = new R('screen', 'wrap');
	//
	$.G.isoGizmo(600);
	//
	vec1 = new Vector(-50,-50,-50);
	vec2 = new Vector(50,-50,-50);
	//
	cube = function() {
		
		var cnt = new Vector(0,0,0);
		
		var vec1 = new Vector(-50,-50,-50);
		var vec2 = new Vector(50,-50,-50);
		var vec3 = new Vector(50,50,-50);
		var vec4 = new Vector(-50,50,-50);
		var vec5 = new Vector(-50,-50,50);
		var vec6 = new Vector(50,-50,50);
		var vec7 = new Vector(50,50,50);
		var vec8 = new Vector(-50,50,50);
		
		$.G.isoLine(vec1, vec2, cnt, '#FFFF00');
		$.G.isoLine(vec2, vec3, cnt, '#FFFF00');
		$.G.isoLine(vec3, vec4, cnt, '#FFFF00');
		$.G.isoLine(vec4, vec1, cnt, '#FFFF00');
		$.G.isoLine(vec1, vec5, cnt, '#FFFF00');
		$.G.isoLine(vec5, vec6, cnt, '#FFFF00');
		$.G.isoLine(vec6, vec7, cnt, '#FFFF00');
		$.G.isoLine(vec7, vec8, cnt, '#FFFF00');
		$.G.isoLine(vec8, vec5, cnt, '#FFFF00');
		$.G.isoLine(vec6, vec2, cnt, '#FFFF00');
		$.G.isoLine(vec3, vec7, cnt, '#FFFF00');
		$.G.isoLine(vec8, vec4, cnt, '#FFFF00');
		
		return 'cube drawed';
	};
	//
	plot = function(x1,y1,z1,x2,y2,z2) {
		var cnt = new Vector(0,0,0);
		return $.G.isoLine(new Vector(x1,y1,z1), new Vector(x2,y2,z2), cnt, '#FFFF00');
	};
	//
};
//
