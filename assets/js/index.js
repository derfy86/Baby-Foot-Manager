const app = {

    base_url: 'http://localhost:3000',
    defaultErrorMessage: 'Désolé un problème est survenu, veuillez réessayer ultérieurement',

    init: function () {
    console.log('app.init !');

    app.addListenerToActions();
    app.getPlayFromAPI();
    },

    addListenerToActions: function () {
    },

    getPlayFromAPI: async function () {
        try {

            const response = await fetch(app.base_url + '/api/');

            if (response.status !== 200) {
                const error = await response.json();
                throw error;
            }

            const lists = await response.json();
            console.log(`lists`, lists)
            for (const list of lists) {
                app.makeListInDOM(list);
                }

        } catch (error) {
            alert(app.defaultErrorMessage);
            console.error(error);
        }
    },

    makeListInDOM: function (list) {
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

        const nameTeam_A = newPlay.querySelector('.team_A');
        nameTeam_A.textContent = list.team_A

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
                playFinished.style.backgroundColor = 'rgb(134, 134, 134)';
            };
        }
        
        const buttonTrash = newPlay.querySelector('.remove--btn');
        buttonTrash.addEventListener('click', app.deletePlay);

        const buttonFinish = newPlay.querySelector('.validate--btn');
        buttonFinish.addEventListener('click', app.finishPlay);
        
        playContainer.append(newPlay);
        
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

    finishPlay: function () {
    },

};


document.addEventListener('DOMContentLoaded', app.init);