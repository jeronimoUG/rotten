// SETUP CONSOLE/TRACER
function setConsole(tracer, bash) {
	//
	// CAPTURING TRACER
	var trc = document.getElementById(tracer);
	//
	// CAPTURING CONSOLE INPUT
	var csl = document.getElementById(bash);
	//
	// CAPTURING CONOLE HISTORY
	var htr = [];
	var tle = 0;
	// TRACES COUNTER
	traces = 0;
	//
	// FUNCTIONS
	//
	// FINDING TYPE OF AN ELEMENT AND RETURN VALUE(S)
	var type = function(val) {
		var newVal;
		switch(true) {
			case (!!val) && (val.constructor === Number) :
				newVal = val.toString()+':Number';
				break;
			case (!!val) && (val.constructor === String) :
				newVal = val.toString()+':String';
				break;
			case (!!val) && (val.constructor === Array) :
				newVal = '';
				for (var aa in val) {
					if (aa < (val.length-1)) {
						newVal += val[aa].toString()+', ';
					}else {
						newVal += val[aa].toString()+':Array';
					}
				}
				break;
			case (!!val) && (val.constructor === Vector) :
				newVal = '';
				var bb = 0;
				for (item in val) {
					bb++;
					if (bb < Object.keys(val).length) {
						newVal += '"'+item.toString()+'" = '+val[item].toString()+', ';
					}else {
						newVal += '"'+item.toString()+'" = '+val[item].toString()+':Vector';
					}
				}
				break;
			default :
				newVal = val+':default';
				break;
		}
		return newVal;
	};
	//
	// WRITING VALUE(S) ON TRACER
	trace = function() {
		traces++;
		for (var arg in arguments) {
			if (arguments.length > 1) {
				trc.innerHTML += '<span class="number" >['+traces+'.'+(1+parseInt(arg))+'</span>]<span class="base" > '+arguments[arg]+'</span><br>';
			}else {
				trc.innerHTML += '<span class="number" >['+traces+']</span><span class="base" > '+arguments[arg]+'</span><br>';
			}
		}
		trc.scrollTop = trc.scrollHeight;
	};
	//
	// CONSOLE INTERPRETER
	function read(val) {
		var ret;
		var val = val.toString();
		if (val=='') {
			ret = 'no string to evaluate.';
		}else {
			trace('<span class="response" >evaluating <span class="expression" >'+val+'</span> with JS.</span>');
			try {
				ret = eval(val);
				trace(type(ret)+':result');
			} catch (e) {
				ret = e.message;
				ret = ret.replace(val,'<span class="expression" >'+val+'</span>');
				trace(ret+'<span class="error" >:error</span>');
			}
		}
		return ret;
	};
	//
	// CONSOLE INPUT
	csl.addEventListener('keydown', function(e) {
		var val = this.value;
		if (e.keyCode == 13) {
			read(val);
			htr.unshift(val);
			this.value = '';
		}else if (e.keyCode == 38) {
			e.preventDefault();
			if (htr.length>=1) {
				this.value = htr[tle];
			}else {
				this.value = '';
			}
			if (tle<(htr.length-1)) {
				tle++;
			}
		}else {
			if (e.keyCode == 40) {
				e.preventDefault();
				if (htr.length>=1) {
					this.value = htr[tle];
				}else {
					this.value = '';
				}
				if (tle>=0) {
					tle--;
				}
			}
		}
	});
	//
}
//