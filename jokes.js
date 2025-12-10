// „ €Ì—«  ⁄«„…
let currentCountry = 'egypt';
let currentJokeIndex = 0;
let jokesShown = 0;
let totalLikes = 0;
let reactions = { funny: 0, neutral: 0, notfunny: 0 };

//  ÂÌ∆… «·„Êﬁ⁄ ⁄‰œ «· Õ„Ì·
document.addEventListener('DOMContentLoaded', function() {
    //  ÕœÌÀ «·≈Õ’«∆Ì«  «·√Ê·Ì…
    updateStatistics();
    
    // ≈⁄œ«œ √“—«— «Œ Ì«— «·»·œ
    setupCountryButtons();
    
    // ≈⁄œ«œ √“—«— «· ›«⁄·
    setupReactionButtons();
    
    // ≈⁄œ«œ √“—«— «·√›⁄«·
    document.getElementById('get-joke-btn').addEventListener('click', getRandomJoke);
    document.getElementById('copy-joke-btn').addEventListener('click', copyJokeToClipboard);
    document.getElementById('share-joke-btn').addEventListener('click', shareJoke);
    
    // ⁄—÷ ‰ﬂ … ⁄‘Ê«∆Ì…  ·ﬁ«∆Ì« ⁄‰œ «· Õ„Ì·
    getRandomJoke();
});

// ≈⁄œ«œ √“—«— «Œ Ì«— «·»·œ
function setupCountryButtons() {
    const countryButtons = document.querySelectorAll('.country-btn');
    
    countryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // ≈“«·… «·‰‘«ÿ „‰ Ã„Ì⁄ «·√“—«—
            countryButtons.forEach(btn => btn.classList.remove('active'));
            
            // ≈÷«›… «·‰‘«ÿ ··“— «·„Œ «—
            this.classList.add('active');
            
            //  €ÌÌ— «·»·œ «·Õ«·Ì
            currentCountry = this.getAttribute('data-country');
            
            //  €ÌÌ— «·⁄·„ Ê«·⁄‰Ê«‰ ›Ì »ÿ«ﬁ… «·‰ﬂ …
            updateCountryIndicator();
            
            // ⁄—÷ ‰ﬂ … ⁄‘Ê«∆Ì… „‰ «·»·œ «·ÃœÌœ
            getRandomJoke();
        });
    });
}

//  ÕœÌÀ „ƒ‘— «·»·œ ›Ì »ÿ«ﬁ… «·‰ﬂ …
function updateCountryIndicator() {
    const countryIndicator = document.querySelector('.country-indicator');
    const countryName = document.querySelector('.country-indicator span');
    const countryFlag = document.querySelector('.country-indicator img');
    const jokeTitle = document.querySelector('.joke-header h3');
    
    let countryArabicName = '';
    let flagURL = '';
    
    switch(currentCountry) {
        case 'egypt':
            countryArabicName = '„’—';
            flagURL = 'https://flagcdn.com/w20/eg.png';
            jokeTitle.innerHTML = '<i class="fas fa-joke"></i> ‰ﬂ … „’—Ì…';
            break;
        case 'saudi':
            countryArabicName = '«·”⁄ÊœÌ…';
            flagURL = 'https://flagcdn.com/w20/sa.png';
            jokeTitle.innerHTML = '<i class="fas fa-joke"></i> ‰ﬂ … ”⁄ÊœÌ…';
            break;
        case 'uae':
            countryArabicName = '«·≈„«—« ';
            flagURL = 'https://flagcdn.com/w20/ae.png';
            jokeTitle.innerHTML = '<i class="fas fa-joke"></i> ‰ﬂ … ≈„«—« Ì…';
            break;
        case 'lebanon':
            countryArabicName = '·»‰«‰';
            flagURL = 'https://flagcdn.com/w20/lb.png';
            jokeTitle.innerHTML = '<i class="fas fa-joke"></i> ‰ﬂ … ·»‰«‰Ì…';
            break;
    }
    
    countryName.textContent = countryArabicName;
    countryFlag.src = flagURL;
    countryFlag.alt = countryArabicName;
}

// «·Õ’Ê· ⁄·Ï ‰ﬂ … ⁄‘Ê«∆Ì…
function getRandomJoke() {
    const jokes = jokesDatabase[currentCountry];
    
    if (!jokes || jokes.length === 0) {
        document.getElementById('joke-text').textContent = '⁄–—«° ·«  ÊÃœ ‰ﬂ  „ «Õ… ·Â–« «·»·œ Õ«·Ì«. Ã—» »·œ« ¬Œ—!';
        document.getElementById('joke-category').textContent = '€Ì— „ Ê›—';
        document.getElementById('joke-id').textContent = '#0';
        return;
    }
    
    // «Œ Ì«— ‰ﬂ … ⁄‘Ê«∆Ì…
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const selectedJoke = jokes[randomIndex];
    
    // ⁄—÷ «·‰ﬂ …
    document.getElementById('joke-text').textContent = selectedJoke.text;
    document.getElementById('joke-category').textContent = selectedJoke.category;
    document.getElementById('joke-id').textContent = `#${selectedJoke.id}`;
    
    //  ÕœÌÀ «·›Â—” «·Õ«·Ì
    currentJokeIndex = randomIndex;
    
    //  ÕœÌÀ «·≈Õ’«∆Ì« 
    jokesShown++;
    updateStatistics();
    
    // ≈⁄«œ…  ⁄ÌÌ‰ √“—«— «· ›«⁄·
    resetReactionButtons();
}

// ≈⁄œ«œ √“—«— «· ›«⁄·
function setupReactionButtons() {
    const funnyBtn = document.querySelector('.funny-btn');
    const neutralBtn = document.querySelector('.neutral-btn');
    const notfunnyBtn = document.querySelector('.notfunny-btn');
    
    funnyBtn.addEventListener('click', function() {
        reactions.funny++;
        updateReactionCounts();
        this.style.backgroundColor = '#C8E6C9';
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
    
    neutralBtn.addEventListener('click', function() {
        reactions.neutral++;
        updateReactionCounts();
        this.style.backgroundColor = '#FFE0B2';
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
    
    notfunnyBtn.addEventListener('click', function() {
        reactions.notfunny++;
        updateReactionCounts();
        this.style.backgroundColor = '#FFCDD2';
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
    });
}

//  ÕœÌÀ ⁄œ«œ «· ›«⁄·« 
function updateReactionCounts() {
    document.querySelector('.funny-btn .count').textContent = reactions.funny;
    document.querySelector('.neutral-btn .count').textContent = reactions.neutral;
    document.querySelector('.notfunny-btn .count').textContent = reactions.notfunny;
    
    //  ÕœÌÀ ≈Ã„«·Ì «· ›«⁄·« 
    totalLikes = reactions.funny + reactions.neutral + reactions.notfunny;
    document.getElementById('total-likes').textContent = totalLikes;
}

// ≈⁄«œ…  ⁄ÌÌ‰ √“—«— «· ›«⁄·
function resetReactionButtons() {
    document.querySelector('.funny-btn').style.backgroundColor = '';
    document.querySelector('.neutral-btn').style.backgroundColor = '';
    document.querySelector('.notfunny-btn').style.backgroundColor = '';
}

// ‰”Œ «·‰ﬂ … ≈·Ï «·Õ«›Ÿ…
function copyJokeToClipboard() {
    const jokeText = document.getElementById('joke-text').textContent;
    
    navigator.clipboard.writeText(jokeText).then(() => {
        // ≈ŸÂ«— —”«·…  √ﬂÌœ
        const copyBtn = document.getElementById('copy-joke-btn');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>  „ «·‰”Œ!';
        copyBtn.style.backgroundColor = '#4CAF50';
        copyBtn.style.color = 'white';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.backgroundColor = '';
            copyBtn.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('›‘· ‰”Œ «·‰’: ', err);
        alert('⁄–—«°  ⁄–— ‰”Œ «·‰ﬂ …. Õ«Ê· „—… √Œ—Ï.');
    });
}

// „‘«—ﬂ… «·‰ﬂ …
function shareJoke() {
    const jokeText = document.getElementById('joke-text').textContent;
    const shareText = `‰ﬂ … „÷Õﬂ… „‰ „Êﬁ⁄ ‰ﬂ  »·œÌ:\n\n${jokeText}\n\nÃ—» «·„Êﬁ⁄: „Êﬁ⁄-‰ﬂ -»·œÌ.com`;
    
    if (navigator.share) {
        navigator.share({
            title: '‰ﬂ … „÷Õﬂ…',
            text: jokeText,
            url: window.location.href
        }).then(() => {
            console.log(' „  «·„‘«—ﬂ… »‰Ã«Õ');
        }).catch(error => {
            console.log('Œÿ√ ›Ì «·„‘«—ﬂ…:', error);
            fallbackShare(shareText);
        });
    } else {
        fallbackShare(shareText);
    }
}

// ÿ—Ìﬁ… »œÌ·… ··„‘«—ﬂ…
function fallbackShare(shareText) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            alert(' „ ‰”Œ «·‰ﬂ … ··„‘«—ﬂ…! Ì„ﬂ‰ﬂ „‘«—ﬂ Â« «·¬‰ ›Ì √Ì  ÿ»Ìﬁ.');
        });
    } else {
        prompt('«‰”Œ «·‰’ «· «·Ì ·„‘«—ﬂ Â:', shareText);
    }
}

//  ÕœÌÀ «·≈Õ’«∆Ì« 
function updateStatistics() {
    const stats = getJokesStats();
    
    document.getElementById('total-jokes').textContent = stats.totalJokes;
    document.getElementById('jokes-shown').textContent = jokesShown;
    document.getElementById('total-likes').textContent = totalLikes;
    
    //  ÕœÌÀ ⁄œœ «·»·œ«‰
    document.querySelectorAll('.stat-card')[2].querySelector('h3').textContent = stats.countriesCount;
}