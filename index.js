var x1,y1,x2,y2;
	let video = document.getElementById("video");
	function getMedia() {
		let constraints = {
			video: {width: 500, height: 500},
			audio: true
		};

		let promise = navigator.mediaDevices.getUserMedia(constraints);
		promise.then(function (MediaStream) {
			video.srcObject = MediaStream;
			video.play();
		}).catch(function (PermissionDeniedError) {
			console.log(PermissionDeniedError);
		})
	}
	function takePhoto() {
		let canvas = document.getElementById("canvas");
		let ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, 500, 500);
		
		let reseter = document.getElementById("reseter");
		let ctx2 = reseter.getContext('2d');
		ctx2.drawImage(video, 0, 0, 500, 500);
	}

	function getCursorPosition(canvas, event) {
		const rect = canvas.getBoundingClientRect()
		const x = event.clientX - rect.left
		const y = event.clientY - rect.top
		var ary=[x,y]
		return ary;
	}
	var mouseState=0;
	const canvas = document.querySelector('canvas')
	canvas.addEventListener('mousedown', function(e) {
		this.getContext('2d').drawImage(document.getElementById('reseter'),0,0,500,500);
		cor1=getCursorPosition(canvas, e)
		console.log("Start\t->("+cor1[0]+","+cor1[1]+")")
		
		mouseState=1
		
	})
	canvas.addEventListener('mouseup', function(e) {
		cor2=getCursorPosition(canvas, e)
		console.log("End  \t->("+cor2[0]+","+cor2[1]+")")
		console.log('...')
		mouseState=0;

	})
	canvas.addEventListener('mousemove',function(e){
		const draw = document.getElementById('draw')
		var ctx = draw.getContext("2d");
		ctx.lineWidth = "3";
		ctx.strokeStyle ='rgb(0,255,0,0.5)';
		if(mouseState==1){
			this.getContext('2d').drawImage(document.getElementById('reseter'),0,0,500,500);
			cor3=getCursorPosition(canvas, e)
			const draw = document.getElementById('draw')
			var ctx = draw.getContext("2d");
			ctx.clearRect(0, 0, draw.width, draw.height);//clear canvas
			ctx.lineWidth = "3";
			ctx.strokeStyle ='rgb(0,255,0,0.5)';
			ctx.fillStyle='rgb(0,255,0,0.5)';
			ctx.beginPath();
			ctx.moveTo(cor1[0], cor1[1]);
			ctx.rect(cor1[0],cor1[1], cor3[0] - cor1[0],cor3[1] - cor1[1]);
			ctx.stroke();
			ctx.closePath();
			this.getContext('2d').drawImage(document.getElementById('draw'),0,0,500,500);
		}else{
			
		}
	})