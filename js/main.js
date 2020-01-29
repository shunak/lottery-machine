(function(){

	'use strict';

	// define global scope valuables.
	//  -----------------------
	// 抽選人数配列格納ボタン
	var button = document.getElementById("button");
		
	// カスタムボタン
	var except_button = document.getElementById("except_button");

	// 結果確保配列の設定
	var deme = [];

	// div要素をオブジェクトとして取得
	var pl = document.getElementById('panel');
	var st = document.getElementById('stop');
	var timer;
	var num = [];
	var newArr = [];
	var resultForm;
	var cstmval =[];
	//  -----------------------
	

	// 入力をクリックした時の配列格納処理
	button.addEventListener("click", function(e) {
 	
	 	var textForm;

	    e.preventDefault();
	 
	    // フォームの値を取得
	    textForm = document.getElementById("textForm").value;
	 	
	    console.log(textForm);

	    // 取得した値を別のフォームに表示

	    var resultForm;

	    resultForm = document.getElementById("textForm");
	    resultForm.value = textForm;

	    num = [];
		for(var i=1; i<=resultForm.value; i++){
			num.push(i);
		}

		console.log(num);

	});

	// const numlen = num.length;

	// // 抽選配列の設定
	// var num = [];
	// for(var i=1; i<=document.getElementById('textForm'); i++){
	// 	num.push(i);
	// }

	// console.log(num);

	// const numlen = num.length;

	// console.log(numlen);

	// // undefinedのフラグが付いた配列を除く
	// function isMinusVal(value) {
	// 	return value <= -1;
	// }


	// 抽選から除くをクリックした時の処理(かならずクリックする必要があるボタンではない)
	except_button.addEventListener("click", function(e) {

		var textForm2;
		var customs;

		e.preventDefault();

	    // フォームの値を取得
		textForm2 = document.getElementById("textForm2").value;
		// // フォームの値は文字データとして取得されているので、数値型として取得しなおす
		// console.log(textForm2);

		// 抽選から除くフォームにカンマ区切りで入力された値を配列データcustomsとして取得
		customs = [];
		var customs = textForm2.split(',');
		customs = customs.map(function (element) { return parseInt(element); });
		console.log(customs);

		// 配列numの中からcustomsと重複する値にフラグ（-1）を付ける
		for(var i=0; i<customs.length; i++){

			for(var j=0; j<num.length; j++){

				if(num[j]===customs[i]){
					num[j]=-1;
				}

			}

		}

		// console.log(num);
		// フラグ（-1）のついていない値を新たな配列newArrに取り出す
		for(var i=0; i<num.length; i++){

			if(num[i]!=-1){
				newArr.push(num[i]);
			}

		}

		num=[];
		// console.log(newArr);
		// console.log(newArrlen);


	});

	// カスタム抽選の処理
	custom_button.addEventListener("click", function(e) {

		var textForm3;

		e.preventDefault();

	    // フォームの値を取得
		textForm3 = document.getElementById("textForm3").value;
		// // フォームの値は文字データとして取得されているので、数値型として取得しなおす
	 	// textForm2=parseInt(textForm2);
		console.log(textForm3);

		// 抽選から除くフォームにカンマ区切りで入力された値を配列データをcstmvalとして取得
		cstmval = textForm3.split(',');
		cstmval = cstmval.map(function (element) { return parseInt(element); });
		console.log(cstmval);//ABC

		// 残り抽選回数に回数を表示
		// resultForm.value = cstmval.length;



	    // customs.push(textForm2);
		// for(var i=1; i<=resultForm.value; i++){
		// 	num.push(i);
		// }

		// console.log(customs);
		// console.log(num);
		// console.log(newArr);
		
	});



	// // 抽選配列の設定
	// var num = [];
	// for(var i=1; i<=document.getElementById('textForm'); i++){
	// 	num.push(i);
	// }

	// console.log(num);












	// スロットをスタートする処理
	start.addEventListener('click', function(){

		if(this.className.indexOf('inactive')!==-1){
			return;
		}

		// ボタン色の制御
		if(newArr.length>0||num.length>0){
			if(textForm.value!==''){
				this.className = 'inactive';
				st.className = '';
			}
		}

		if(cstmval.length>0&&newArr.length==0&&num.length==0){
			if(textForm.value===''){
				this.className = 'inactive';
				st.className = '';
			}
		}
		

		// if(num.length>0&&newArr.length==0){
		// 	var arg = num;
		// }else{
		// 	var arg = newArr;
		// }
	
	
		runslot();

	});


	// newFunction(newArr, num);




	// スロット内の描画関数
	function runslot(){
		if(newArr.length>0||num.length>0){
			if(textForm.value===''){
				return;
			}	
		}
		
		timer = setTimeout(function(){

			// pl.innerHTML=newArr[Math.floor(Math.random()*newArrlen)];
			console.log(newArr);
			if(newArr.length<=0&&num.length>0){
			// if(num.length>0&&newArr.length==0){
				pl.innerHTML=num[Math.floor(Math.random()*num.length)];
			}else{
				pl.innerHTML = newArr[Math.floor(Math.random() * newArr.length)];
			}

			console.log(cstmval);

			if(cstmval.length>0&&newArr.length==0&&num.length==0){

				pl.innerHTML = cstmval[Math.floor(Math.random() * cstmval.length)];
	
			}

			// pl.innerHTML=arg[Math.floor(Math.random()*arg.length)];
			// pl.innerHTML=num[Math.floor(Math.random()*num.length)];

			runslot();

			// 残り抽選回数の表示
			var last = document.getElementById('resultForm');
			// last.innerHTML = arg.length-1;

			// last.innerHTML = newArrlen-1;

			if(newArr.length<=0&&num.length>0){
			// if(num.length>0&&newArr==0){

				last.innerHTML = num.length-1;

			}else{

				last.innerHTML = newArr.length-1;

			}


			if(cstmval.length>0&&newArr.length==0&&num.length==0){

				last.innerHTML = cstmval.length-1;
	
			}



			console.log(last.innerHTML);

			// last.innerHTML = num.length-1;

			// くじがおわってもスタートボタンを押してしまった場合の処理
			if(last.innerHTML==-1){
				last.innerHTML = "おしまい";
				ima.innerHTML = "おしまい";
				pl.innerHTML = "終";
			}

		},1);


	}




	// スロットを止める関数
	function initPanel(){
		

		st.addEventListener('click',function(){
		
		
		if(this.className.indexOf('inactive')!==-1){
			return;
		}
		

		clearTimeout(timer);

		// 結果の取得
		var res;
		res = document.getElementById('ima');
		res.innerHTML = pl.innerHTML;

		var deta = document.getElementById('deta');

		// var ky = arg.indexOf(parseInt(res.innerHTML));

		

		if(newArr.length<=0&&num.length>0){
			var ky = num.indexOf(parseInt(res.innerHTML));
		}else{
			var ky = newArr.indexOf(parseInt(res.innerHTML));

		}

		if(cstmval.length>0&&newArr.length==0&&num.length==0){
			var ky = cstmval.indexOf(parseInt(res.innerHTML));

		}



		// var ky = num.indexOf(parseInt(res.innerHTML));
		
		// 出目の保持
		if(ky != -1){

			// arg.splice(ky, 1);
			if(newArr.length<=0&&num.length>0){
			// if(num.length>0&&newArr.length==0){
				num.splice(ky, 1);

			}else{
				// num=[];//numのほうは空配列にしておく
				newArr.splice(ky, 1);
				// ここでnewArrが空になったときの制御が必要になる
				// スタートを押したときにどう制御するかで決まる
			}

			if(cstmval.length>0&&newArr.length==0&&num.length==0){

				cstmval.splice(ky,1);
			}





			// newArr.splice(ky, 1);
		
			deme.push(parseInt(res.innerHTML));
		}


		// 出目の表示
		deta.innerHTML = deme;

		// ボタン色の制御
		if(newArr.length>0||num.length>0){
	
			if(textForm.value!==''){
				this.className = 'inactive';
				start.className = '';
			}

		}
		console.log(num);
		if(cstmval.length>0&&newArr.length==0&&num.length==0){
		
			if(textForm.value===''){
				this.className = 'inactive';
				start.className = '';
			}

		}



		});
	}

	initPanel();

	


})();

