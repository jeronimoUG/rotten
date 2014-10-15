//////
// ROTTEN ENGINE
//////
//
// THE ROTTEN OBJECT
//
function R(canvas, context) {
	////
	// CORE
	////
	//
	var c = canvas;
	var ctx = context;
	var o = {x:(c.width/2), y:(c.height/2)};
	//
	////
	// GRAPHICS
	////
	//
	this.G = new function() {
		// PIXEL DRAWIG FUNCTION
		this.pixel = function(point, color) {
			if (color!=undefined) {
				ctx.fillStyle=color;
				if (point.x!=undefined && point.y!=undefined) {
					ctx.fillRect(o.x+point.x,o.y+point.y,1,1);
					//trace('pixel drawed.');
				}else {
					trace('please especify a point to draw (and object with x and y properties).');
				}
			}else {
				trace('please especify a point (and object with x and y properties) to draw the pixel and a color as a string in HEX, RGB(r,g,b) or RGBA(r,g,b,a) format. G.pixel(point, color){...}.');
			}
		};
		// LINE DRAWING FUNCTION
		this.line = function(point1, point2, color) {
			var x, y, x1, x2, y1, y2, deltax, deltay, xinc1, xinc2, yinc1, yinc2, den, num, numadd, numpixels;
			x1 = point1.x+o.x;
			x2 = point2.x+o.x;
			y1 = point1.y+o.y;
			y2 = point2.y+o.y;
			deltax = Math.abs(x2 - x1);
			deltay = Math.abs(y2 - y1);
			x = x1;
			y = y1;
			if (x2 >= x1) {
				xinc1 = 1;
				xinc2 = 1;
			}else {
				xinc1 = -1;
				xinc2 = -1;
			}
			if (y2 >= y1) {
				yinc1 = 1;
				yinc2 = 1;
			}else {
				yinc1 = -1;
				yinc2 = -1;
			}
			if (deltax >= deltay) {
				xinc1 = 0;
				yinc2 = 0;
				den = deltax;
				num = deltax / 2;
				numadd = deltay;
				numpixels = deltax;
			}else {
				xinc2 = 0;
				yinc1 = 0;
				den = deltay;
				num = deltay / 2;
				numadd = deltax;
				numpixels = deltay;
			}
			for (curpixel = 0; curpixel <= numpixels; curpixel++) {
				this.pixel({x: x-o.x, y: y-o.y}, color);
				num += numadd;
				if (num >= den) {
					num -= den;
					x += xinc1;
					y += yinc1;
				}
				x += xinc2;
				y += yinc2;
			}
			return 'line drawed';
		};
		// ISOMETRIC LINE FROM 3D DATA DRAWING FUNCTION
		this.isoLine = function(point1, point2, center, color) {
			// ANGLES
			var x1, x2, y1, y2, z1, z2;
			var angz = 0*(Math.PI/180);
			var angy = 45*(Math.PI/180);
			var angx = 45*(Math.PI/180);
			// ROTATE ALONG Z
			x1 = (point1.x-center.x)*Math.cos(angz)-(point1.y-center.y)*Math.sin(angz)+center.x;
			x2 = (point2.x-center.x)*Math.cos(angz)-(point2.y-center.y)*Math.sin(angz)+center.x;
			y1 = (point1.x-center.x)*Math.sin(angz)+(point1.y-center.y)*Math.cos(angz)+center.y;
			y2 = (point2.x-center.x)*Math.sin(angz)+(point2.y-center.y)*Math.cos(angz)+center.y;
			// ROTATE ALONG Y
			x1 = (x1-center.x)*Math.cos(angy)-(point1.z-center.z)*Math.sin(angy)+center.x;
			x2 = (x2-center.x)*Math.cos(angy)-(point2.z-center.z)*Math.sin(angy)+center.x;
			z1 = (point1.z-center.z)*Math.sin(angy)+(x1-center.x)*Math.cos(angy)+center.z;
			z2 = (point2.z-center.z)*Math.sin(angy)+(x2-center.x)*Math.cos(angy)+center.z;
			// ROTATE ALONG X
			y1 = (y1-center.y)*Math.cos(angx)-(z1-center.z)*Math.sin(angx)+center.y;
			y2= (y2-center.y)*Math.cos(angx)-(z2-center.z)*Math.sin(angx)+center.y;
			z1 = (z1-center.z)*Math.sin(angx)+(y1-center.y)*Math.cos(angy)+center.z;
			z2 = (z2-center.z)*Math.sin(angx)+(y2-center.y)*Math.cos(angy)+center.z;
			// NEW POINTS
			var vec1 = new Vector(x1, y1, z1);
			var vec2 = new Vector(x2, y2, z2);
			// DRAW LINE
			return this.line(vec1, vec2, color);
		};
		// ISOMETRIC GIZMO
		this.isoGizmo = function(size) {
			var ct = new Vector(0,0,0);
			var x1 = new Vector(-size,0,0);
			var x2 = new Vector(size,0,0);
			var y1 = new Vector(0,-size,0);
			var y2 = new Vector(0,size,0);
			var z1 = new Vector(0,0,size);
			var z2 = new Vector(0,0,-size);
			this.isoLine(x1, x2, ct, '#FF0000');
			this.isoLine(y1, y2, ct, '#00FF00');
			this.isoLine(z1, z2, ct, '#0000FF');
		};
		// CLEAR SCREEN
		this.clear = function(color) {
			if (color===undefined) {
				color = '#000000';
			}
			ctx.fillStyle=color;
			ctx.fillRect(0,0,o.x*2,o.y*2);
			return 'screen cleared';
		};
	};
	//
	this.M = new function() {
		// ZEROING A VECTOR, REALLY?
		this.zero = function(vector){
			var vec = vector;
			var lgh = Object.keys(vec).length;
			for (aa in vec) {
				vec[aa] = 0;
			}
			trace('A '+lgh+'D Vector was "zeroed".');
			return vec;
		};
		// VECTOR NEGATION
		this.negate = function(vector) {
			var vec = vector;
			var lgh = Object.keys(vec).length;
			for (aa in vec) {
				vec[aa] = -vec[aa];
			}
			trace('A '+lgh+'D Vector was negated.');
			return vec;
		};
		// VECTOR ADDITION
		this.add = function(vector1, vector2) {
			var vec = vector1;
			var lgh = Object.keys(vec).length;
			if (lgh == Object.keys(vector2).length) {
				for (aa in vec) {
					vec[aa] = vector1[aa]+vector2[aa];
				}
				trace('Two '+lgh+'D vectors was added.');
				return vec;
			}else {
				trace('Vectors was not added, both of them must have same dimension!');
				return null;
			}
		};
		// VECTOR SUBSTRACTION
		this.substract = function(vector1, vector2) {
			var vec = vector1;
			var lgh = Object.keys(vec).length;
			if (lgh == Object.keys(vector2).length) {
				for (aa in vec) {
					vec[aa] = vector1[aa]-vector2[aa];
				}
				trace('Two '+lgh+'D vectors was substracted.');
				return vec;
			}else {
				trace('Vectors was not substracted, both of them must have same dimension!');
				return null;
			}
		};
		// VECTOR SCALAR MULTIPLY
		this.multiply = function(vector, scalar) {
			var vec = vector;
			var lgh = Object.keys(vec).length;
			for (aa in vec) {
				vec[aa] = vec[aa]*scalar;
			}
			trace('A '+lgh+'D Vector was multiplyed.');
			return vec;
		};
		// VECTOR SCALAR DIVIDE
		this.divide = function(vector, scalar) {
			var vec = vector;
			var lgh = Object.keys(vec).length;
			for (aa in vec) {
				vec[aa] = vec[aa]/scalar;
			}
			trace('A '+lgh+'D Vector was divided.');
			return vec;
		};
		// VECTOR DOT PRODUCT
		this.dot = function(vector1, vector2) {
			var sum = 0;
			var vec1 = this.normalize(vector1);
			var vec2 = this.normalize(vector2);
			for (aa in vec1) {
				sum += (vec1[aa]*vec2[aa]);
			}
			sum = this.magnitude(vector1)*this.magnitude(vector2)*Math.cos(Math.acos(sum));
			trace('Dot product for two vectors is: '+sum+'!');
			return sum;
		};
		// VECTOR NORMALIZATION
		this.normalize = function(vector) {
			var vec = vector;
			var val = this.dot(vec,vec);
			if (val>0) {
				vec = this.multiply(vec,1/Math.sqrt(val));
			}
			trace('A '+lgh+'D Vector was normalized.');
			return vec;
		};
		// VECTOR MAGNITUDE
		this.magnitude = function(vector) {
			var sum = 0;
			var lgh = Object.keys(vector).length;
			for (aa in vector) {
				sum += Math.pow(vector[aa], 2);
			}
			var mag = Math.sqrt(sum);
			trace('The magnitude of '+lgh+'D Vector is: '+mag+'.');
			return mag;
		};
		// VECTOR FROM ONE POINT TO ANOTHER
		this.fromTo = function(vector2, vector1) {
			var vec = this.substract(vector1, vector2);
			return vec;
		};
		// VECTOR DOT PRODUCT
		this.fuck = function(vector1, vector2) {
			var sum = 0;
			var vec1 = this.normalize(vector1);
			var vec2 = this.normalize(vector2);
			for (aa in vec1) {
				sum += (vec1[aa]*vec2[aa]);
			}
			sum = this.magnitude(vector1)*this.magnitude(vector2)*Math.cos(Math.acos(sum));
			trace('Dot product for two vectors is: '+sum+'!');
			return sum;
		};
		// DISTANCE FROM POINT OT POINT
		this.distance = function(vector1, vector2) {
			return this.magnitude(this.fromTo(vector1, vector2));
		};
		// PEOJECT A VECTOR
		this.project= function(vector1, vector2) {
			return this.dot(vector2,this.dot(vector1,vector2));
		};
		// DEEGREES TO RADIANS
		this.radian = function(value) {
			return value*(Math.PI/180);
		};
	};
	//
	////
	// GEOMETRY CLASSES
	////
	//
	Vector = function() {
		// INTERNAL PROPERTIES
		var o = {};
		var l = arguments.length;
		// ASSEMBLING THE VECTOR
		if (l!=0) {
			for (var arg in arguments) {
				switch (l) {
					case 1 :
						trace(arg);
						if (arg==0) {
							trace(arguments[arg]);
							this['x'] = arguments[arg];
						}
						break;
					case 2 :
						if (arg==0) {
							this['x'] = arguments[arg];
						}else if (arg==1) {
							this['y'] = arguments[arg];
						}
						break;
					case 3 :
						if (arg==0) {
							this['x'] = arguments[arg];
						}else if (arg==1) {
							this['y'] = arguments[arg];
						}else {
							this['z'] = arguments[arg];
						}
						break;
					case 4 :
						if (arg==0) {
							this['x'] = arguments[arg];
						}else if (arg==1) {
							this['y'] = arguments[arg];
						}else {
							if (arg==2) {
								this['z'] = arguments[arg];
							}else if (arg==3) {
								this['w'] = arguments[arg];
							}
						}
						break;
					default :
						if (arg==0) {
							this['x'] = arguments[arg];
							this[arg] = arguments[arg];
						}else if (arg==1) {
							this['y'] = arguments[arg];
							this[arg] = arguments[arg];
						}else {
							if (arg==2) {
								this['z'] = arguments[arg];
								this[arg] = arguments[arg];
							}else if (arg==3) {
								this['w'] = arguments[arg];
								this[arg] = arguments[arg];
							}else {
								this[arg] = arguments[arg];
							}
						}
						break;
				}
			}
			//trace('a vector with dimension of '+l+' has been created.');
		}else {
			trace('vector creation failed, it need at least one argument.');
		}
		Vector.prototype.toString = function() {
			return '[vector Rotten.Math]';
		};
	};
	//
	////
	// MATTER CLASSES
	////
	//
	// UNIVERSE CLASS, HOLDER OF ALL DATA
	Universe = function() {
		this.atoms = [];
		trace('An Universe was created!');
	};
	//
	// ATOM CLASS, BASIC MATTER UNIT IN UNIVERSE
	Atom = function(uni) {
		this.x = 0;
		this.y = 0;
		this.z = 0;
		uni.atoms.push(this);
		trace('An Atom was created!');
	};
	//
	// PROTON CLASS, RESEMBLE A PROTON
	Proton = function() {
		trace('A Proton was created!');
	};
	//
	// NEUTRON CLASS, RESEMBLE A PROTON
	Neutron = function() {
		trace('A Neutron was created!');
	};
	//
	// ELECTRON CLASS, RESEMBLE A PROTON
	Electron = function() {
		trace('An Electron was created!');
	};
	//
	// I CLASS, A CONSCIENCE TO TRAVEL THE UNIVERSE
	I = function(uni) {
		this.uni = uni;
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.xt = 0;
		this.yt = 0;
		this.zt = 0;
		this.width = 640;
		this.height = 480;
		this.depth = 480;
		trace('An I was created!');
		this.view = function(point) {
			
		};
	};
	//
	R.prototype.toString = function() {
		return '[engine Rotten]';
	};
	//
	trace('♠ rotten is ready, let\'s rot! ♠');
	//
};
