const app = {

    base_url: 'http://localhost:3000',
    defaultErrorMessage: 'Désolé un problème est survenu, veuillez réessayer ultérieurement',

    init: function () {
    console.log('app.init !');

    app.addListenerToActions();
    app.getPlayFromAPI();
    },

    addListenerToActions: function () {
        const addPlay = document.getElementById('add--play');
        addPlay.addEventListener('click', function(){
            app.showAddPlayModal()
        });

        const closeModalButtons = document.querySelectorAll('.close');
        for (const button of closeModalButtons) {
          button.addEventListener('click', app.hideModals);
        };

        const playForm = document.querySelector('#addPlayModal form');
        const inputs = document.querySelectorAll('.input');
        playForm.addEventListener('submit', async function(event){
        event.preventDefault();
        await app.addPlayForm(event);
        for (const input of inputs) {
            input.value = "";
        }
        app.hideModals();
        });

        const finishForm = document.querySelector('#finishPlayModal form');
        const inputScore = document.querySelectorAll('.input-score');
        finishForm.addEventListener('submit', async function(event){
        event.preventDefault();
        const id = finishForm.getAttribute('play_id')
        await app.finishPlay(event, id);
        for (const input of inputScore) {
            input.value = "";
        }
        app.hideModals();
        });
    },

    getPlayFromAPI: async function () {
        try {
            const response = await fetch(app.base_url + '/api/');

            if (response.status !== 200) {
                const error = await response.json();
                throw error;
            }

            const lists = await response.json();
            for (const list of lists) {
                app.makePlayInDOM(list);
                }

        } catch (error) {
            alert(app.defaultErrorMessage);
            console.error(error);
        }
    },
    
    showAddPlayModal: function () {
        const addPlayModal = document.getElementById('addPlayModal');
        addPlayModal.classList.remove('none');
        addPlayModal.classList.add('active');
    },
    
    addPlayForm: async function (event) {
        try {
            const formData = new FormData(event.target);
        
            const response = await fetch(app.base_url + '/api/add', {
                method: 'POST',
                body: formData,
            });
        
            if (response.status !== 200) {
                throw list;
            }

            const list = await response.json();
    
            app.makePlayInDOM(list[0]);
        } catch (error) {
          alert(app.defaultErrorMessage);
          console.error(error);
        }
    },

    hideModals: function () {
        const modals = document.querySelectorAll('.modal');
        for (const modal of modals) {
          modal.classList.remove('active');
          modal.classList.add('none');
        }
    },

    makePlayInDOM: function (list) {
        const playTemplate = document.getElementById('template-play');
        const playTemplateContent = playTemplate.content;
        const newPlay = document.importNode(playTemplateContent, true);

        const playId = newPlay.querySelector('[play_id]');
        playId.setAttribute('play_id', list.id)
   
        const separateDateAndHour = list.created_at.split('T');
        const rawDate = separateDateAndHour[0].split('-');
        const date = rawDate[2] + '-' + rawDate[1] + '-' + rawDate[0];
        const rawHour = separateDateAndHour[1].split(':');
        const hour = rawHour[0] + ':' + rawHour[1];
        const parsedTime = "Play begin the " + date + " at " + hour;

        const time = newPlay.querySelector('.time');
        time.textContent = parsedTime

        if(list.team_A === ""){
            list.team_A = "Unknown"
        }
        const nameTeam_A = newPlay.querySelector('.team_A');
        nameTeam_A.textContent = list.team_A
    
        if(list.team_B === ""){
            list.team_B = "Unknown"
        }
        const nameTeam_B = newPlay.querySelector('.team_B');
        nameTeam_B.textContent = list.team_B
     
        const score_A = newPlay.querySelector('.score_A');
        score_A.textContent = list.score_A

        const score_B = newPlay.querySelector('.score_B');
        score_B.textContent = list.score_B

        const playContainer = document.querySelector('.lists');

        if (list.status === true) {
            const validateBtn = newPlay.querySelector('.validate--btn');
            validateBtn.style.display = 'none';
            const playFinished = newPlay.querySelector('.container--play--teams');
            if(list.score_A > list.score_B) {
                playFinished.style.backgroundColor = 'none';
                playFinished.style.background = 'linear-gradient(0.25turn, #00b600, #ebf8e1, #c50000)';
            } else if (list.score_A < list.score_B) {
                playFinished.style.backgroundColor = 'none';
                playFinished.style.background = 'linear-gradient(0.25turn, #c50000, #ebf8e1, #00b600)';
            } else {
                playFinished.style.background = 'linear-gradient(0.25turn, rgb(134, 134, 134), #ebf8e1, rgb(134, 134, 134))';
            };
        }
        
        const buttonTrash = newPlay.querySelector('.remove--btn');
        buttonTrash.addEventListener('click', app.deletePlay);

        const buttonFinish = newPlay.querySelector('.validate--btn');
        buttonFinish.addEventListener('click', function () {
            app.showfinishPlayModal(list.id)
        });
        
        playContainer.append(newPlay);
        
    },

    showfinishPlayModal: function (id) {
        const finishPlayModal = document.getElementById('finishPlayModal');
        const finishForm = document.querySelector('#finishPlayModal form');
        finishForm.setAttribute('play_id', id)
        finishPlayModal.classList.remove('none');
        finishPlayModal.classList.add('active');
    },

    deletePlay: async function (event){
        const currentPlay = event.target.closest('[play_id]');
        const id = currentPlay.getAttribute("play_id");
        
        try {
            const response = await fetch(app.base_url + '/api/delete' + `/${id}`, {
                method: 'DELETE',
            });
        
            currentPlay.remove();
            
            if (response.status !== 200) {
                throw app.defaultErrorMessage;
            }
            
        } catch (error) {
            alert(app.defaultErrorMessage);
            console.error(error);
        }
    },

    finishPlay: async function (event, id) {

        try {
            const formData = new FormData(event.target);
            formData.append('id', id);

            let currentPlay;
            const plays = document.querySelectorAll(`.container--play`)
            for (const play of plays) {
                if (play.getAttribute('play_id') === id){
                    currentPlay = play;
                }
            }
            console.log(`currentPlay`, currentPlay)
            currentPlay.remove();
        
            const response = await fetch(app.base_url + '/api/finish', {
                method: 'PATCH',
                body: formData,
            });
            
            if (response.status !== 200) {
                throw app.defaultErrorMessage;
            }

            const list = await response.json();
            app.makePlayInDOM(list[0])
            
        } catch (error) {
            alert(app.defaultErrorMessage);
            console.error(error);
        }
    },

};


document.addEventListener('DOMContentLoaded', app.init);