function getNumber() {
    var letterScores = {
        'A': 1,
        'B': 2,
        'C': 3,
        'D': 4,
        'E': 5,
        'F': 8,
        'G': 3,
        'H': 5,
        'I': 1,
        'J': 1,
        'K': 2,
        'L': 3,
        'M': 4,
        'N': 5,
        'O': 7,
        'P': 8,
        'Q': 1,
        'R': 2,
        'S': 3,
        'T': 4,
        'U': 6,
        'V': 6,
        'W': 6,
        'X': 6,
        'Y': 1,
        'Z': 7
    };
    var input = document.getElementById('input');
    var name = input.value.trim();
    var errorSpan = document.getElementById('errorSpan');
    var numberBox = document.getElementById("number");
    var meaningBox = document.getElementById("meaning");
    var nameDisplay = document.getElementById("displayName");

    if (name.search(/[^A-Za-z\s]/) != -1) {
        errorSpan.innerHTML = "Please remove any numbers or symbols and try again."
        numberBox.innerHTML = "";
        meaningBox.innerHTML = "";
        nameDisplay.innerHTML = "";
    } else if (name == '') {
        errorSpan.innerHTML = "Please enter a name and try again."
        numberBox.innerHTML = "";
        meaningBox.innerHTML = "";
        nameDisplay.innerHTML = "";
    }
    else {
        errorSpan.innerHTML = '';
        var sum = 0;
        name = name.toUpperCase();
        for (i = 0; i < name.length; i++) {
            var letter = name.charAt(i);
            if (letter == ' ') {
                continue
            }
            sum += letterScores[letter];
        };

        var stringSum = sum.toString();
        while (sum != 11 && sum != 22 && stringSum.length > 1) {
            sum = 0;
            for (i = 0; i < stringSum.length; i++) {
                sum += parseInt(stringSum.charAt(i));
            };
            stringSum = sum.toString();
        };
        
        nameDisplay.innerHTML = name;
        numberBox.innerHTML = stringSum;
        meaningBox.innerHTML = getResult(sum);
    }
}

function getResult(num) {
    var meaningList = {
        1: "is the pioneer, the leader, strong-willed and sometimes self-centered. 1 is also associated with material wealth,\
        loneliness and isolation.",
        2: "is the number of passive, receptive people, kind and sensitive, but who often get their own way by gentle \
        persuasion. It is also linked to psychic powers.",
        3: "is a potent lucky number, representing extrovert, creative, and witty people. They may be extravagant and unable \
        to persevere at one thing for long.",
        4: "is for dependable, loyal, hard-working people who are good organizers. 4 people are the guardian angels, fair in \
        all their dealings, and often pay a high price for any success they achieve.",
        5: "is the number of radical, fast-moving people, curious and impulsive, who hate to be tied down. 5 is also the \
        number of sex and can lead to problematic relationships.",
        6: "is the perfect number, and represents harmony, beauty, sincerity, and affection. 6 people are creative and\
         artistic, but they can sometimes be fussy and a little conceited.",
        7: "is the magical number, representing the scholar an the mystic, the dignified and the self-possessed. 7 people \
        may appear aloof, as they have difficulty putting their thoughts into words.",
        8: "symbolizes intuition, prosperity, and organization. Solid, strong, and fertile, 8 people’s success is built on \
        hard work, which can make them seem pessimistic.",
        9: "is for intellectuals and idealists. It is a number of great strength, self-discipline, and ambition. 9 people\
         may seek the limelight and be jealous or fickle.",
        11: "is the number of people who are idealists. 11 people have a strong vocation for their work and often suffer for \
        the sake of others.",
        22: "is the master number and incorporates the supreme qualities and attributes of all other numbers."
    };
    return meaningList[num];
}

function fetchZodiac(zodiac) {
    var dropButton = document.getElementById("dropButton");
    dropButton.innerHTML = zodiac
    dropButton.style.textTransform = "capitalize"
    const fetchPromise = fetch("https://rapidapi.p.rapidapi.com/?day=today&sign=" + zodiac,
    {
        method: "POST",
        headers: {
            "x-rapidapi-key": "7f8048b893mshf79ed5facf6560ep1b398djsn9b33f6deb4e8",
            "x-rapidapi-host": "sameer-kumar-aztro-v1.p.rapidapi.com",
        }
    });
    const streamPromise = fetchPromise.then(res => res.json())
    streamPromise.then((res) => getZodiac(res, zodiac));
}

function getZodiac(data, zodiac) {
    console.log(data);
    var dateRange = data.date_range;
    var desc = data.description;
    var luckyNum = data.lucky_number;
    var luckyTime = data.lucky_time;
    var cont = document.getElementById("horoContainer")
    var zod = document.getElementById("zodiacSign")
    var dates = document.getElementById("dates");
    var text = document.getElementById("text");
    var close = document.getElementById("close")
    var luckyN = document.getElementById("luckyN");
    var luckyT = document.getElementById("luckyT");
    cont.style.display = "block";
    text.innerHTML = desc;
    zod.innerHTML = zodiac;
    dates.innerHTML = dateRange;
    luckyN.innerHTML = "Lucky Number: " + luckyNum;
    luckyT.innerHTML = "Lucky Time: " + luckyTime;
    close.onclick = function() {
        cont.style.display = "none";
    }
    
}