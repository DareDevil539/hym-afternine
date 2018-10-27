new Vue({
	el: "#container",
	data:{
		isRules: false,
		isChosingCharacter: true,
		image: './img/mainp.jpg',
		characters: {
			first: ["test1test1","test1","test1"],
			second: ["test2","test2","test2"],
			third: ["test3","test3","test3"],
		},
		persons: {
			1:"Ботан",
			2:"Прогульщик",
			3:"Підлиза",
			4:"Спортсмен",
			5:"Красуня",
			6:"Мажор",
		},
		selectedChars:[],
		isHovered: false,
	},
	methods:{
		changeScene: function(){
			this.isRules = false;
			this.image = './img/cabinet.jpg';
		},
		showCharc: function(key){
			let obj = this.characters[key];
			this.selectedChars = this.selectedChars.concat(obj);
			this.isHovered = true;
		},
		clearDesc: function(){
			this.selectedChars = [];
			this.isHovered = false;
		}
	}
});