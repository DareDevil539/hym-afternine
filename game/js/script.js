Vue.use(VueResource)

new Vue({
	el: "#container",
	data:{
		isRules: true,
		isChosingCharacter: false,
		image: './img/startimg.jpg',
		questText: '',
		characters: {
			1: ["шарить в аудиторіях","ввічливий","відмінник"],
			2: ["знає, де 'стрєльнути сіжку'","добре орієнтується в околицях","завжди є на каву"],
			3: ["завжди хоче домовитися","улюбленець викладачів","спритний"],
			4: ["легко вибиває двері","витривалий","завжди в 'смєнці'"],
			5: ["не любить коменда", "охмурить любого", "приваблива зовнішність", "популярна в соц мережах"],
			6: ["вирішує питання","привабливий","добре ладить з жінками"],
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
		questionID: 22,
		nextQuestions: {},
		checkedID: [],
		response: {},
		scores: 0,
	},
	methods:{
		getQuestion: function () {
			params: {

			}
			this.$http.get('http://138.68.89.19:8080/api/question/' + this.questionID + '/').then(function (response) {
			console.log(response);	
			let tempObj = response.data.data.answers;
				this.response = response;
				console.log(response.body.data.question.background);
				this.image = "img/" + this.response.body.data.question.background;
				console.log(this.image);
				this.questText = response.data.data.question.text;
				for (const key in tempObj) {
					let tmpKey = tempObj[key];
					console.log(tmpKey.u_id);
					if (this.checkedID.indexOf("" + tmpKey.id) == -1 && tmpKey.u_id == 0) {
						this.answers[tmpKey.id] = tmpKey.text;
						this.scores += tmpKey.grade;
					} else if (this.checkedID.indexOf("" + tmpKey.id) == -1 && tmpKey.u_id != 0) {
						if (this.selectedPersons.indexOf(this.persons[tmpKey.u_id]) != -1) {
							this.answers[tmpKey.id] = tmpKey.text;
						}
					}
					this.nextQuestions[tmpKey.id] = tmpKey.next_question_id;
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
			console.log(qstId);
			this.$http.get("http://138.68.89.19:8080/api/answer/" + qstId + "/").then(function (response) {
				console.log(response);
			}, function (error) {
				
			})
			if (this.checkedID.indexOf(qstId) == -1 || qstId == 22) {
				this.checkedID[qstId] = qstId;
				console.log(this.checkedID);
				this.answers = {};
				qstId = this.nextQuestions[qstId];
				this.questionID = qstId;
				this.getQuestion();
			}
		}
	},
	created: function () {

		this.getQuestion();
	}
});