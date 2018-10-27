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
			4: ["test3","test3","test3"],
			5: ["test3","test3","test3"],
			6: ["мажик","test3","test3"],
		},
		persons: {
			1:"Ботан",
			2:"Прогульщик",
			3:"Підлиза",
			4:"Спортсмен",
			5:"Красуня",
			6:"Мажор",
		},
		curName: '',
		answers: {
			
		},
		selectedChars:[],
		selectedPersons:[],
		isHovered: false,
		isError: false,
		questionID: 4,
		nextQuestions: {}
	},
	methods:{
		getQuestion: function () {
			params: {

			}
			this.$http.get('https://afternine.herokuapp.com/api/question/' + this.questionID + '/').then(function (response) {
				let tempObj = response.data.data.answers;
				this.questText = response.data.data.question.text;
				for (const key in tempObj) {
					let tmpKey = tempObj[key];
					this.answers[tmpKey.id] = tmpKey.text;
					this.nextQuestions[tmpKey.id] = tmpKey.next_question_id;
					console.log(this.nextQuestions);
					console.log(response.data);
				}
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
			this.curName = '';
		
			let obj = this.characters[key];
			this.selectedChars = this.selectedChars.concat(obj);
			this.isHovered = true;
			this.curName = this.persons[key]
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

		nextQuest: function (qstId) {
			this.answers = {};
			qstId = this.nextQuestions[qstId];
			this.questionID = qstId;
			this.getQuestion();
		}
	},
	created: function () {

		this.getQuestion();
	}
});