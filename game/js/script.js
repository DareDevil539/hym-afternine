Vue.use(VueResource)

new Vue({
	el: "#container",
	data:{
		isRules: true,
		isChosingCharacter: false,
		image: './img/startimg.jpg',
		questText: '',
		characters: {
			1: ["test1","test1","test1"],
			2: ["test2","test2","test2"],
			3: ["test3","test3","test3"],
		},
		persons: {
			1:"Ботан",
			2:"Прогульщик",
			3:"Підлиза",
			4:"Спортсмен",
			5:"Красуня",
			6:"Мажор",
		},
		answers: {
			1: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
			2: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
			3: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do",
		},
		selectedChars:[],
		selectedPersons:[],
		isHovered: false,
		isError: false,
	},
	methods:{
		getQuestion: function () {
			params: {

			}
			this.$http.get('https://afternine.herokuapp.com/api/question/1/').then(function (response) {
				let tempObj = response.data.data;
				console.log(tempObj);
				this.questText = tempObj.attributes.text;
			},
			function (error) {
				
			})
		},
		changeScene: function(){
			this.isRules = false;
			this.isChosingCharacter = true;
			// this.image = './img/cabinet.jpg';
		},
		showCharc: function(key){
			let obj = this.characters[key];
			this.selectedChars = this.selectedChars.concat(obj);
			this.isHovered = true;
		},
		clearDesc: function(){
			this.selectedChars = [];
			this.isHovered = false;
		},
		selectPersons: function() {
			if (this.selectedPersons.length >= 1 && this.selectedPersons.length <= 3) {
				this.isRules = false;
				this.isChosingCharacter = false;
			} else {
				this.isError = true;
			}
		},
	},
	created: function () {

		this.getQuestion();
	}
});